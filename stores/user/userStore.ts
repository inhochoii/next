import { observable, action, computed, makeObservable } from 'mobx';
import bcrypt from 'bcryptjs';
import qs from 'qs';
import client from '../../lib/client';
import {
	user,
	createUser,
	loginResData,
	WalletResData,
	bridge,
	userAddress,
	inquire,
	balance,
	findSaveInfo,
} from './types';
import BaseStore from '../BaseStore';
import { aes256Decrypt, aes256Encrypt } from '../../lib/crypto';
import btoa from 'btoa';

class UserStore extends BaseStore {
	constructor() {
		super();
		makeObservable(this);
	}

	// user 정보
	@observable
	_userInfo?: user;

	// 닉네임 중복체크 확인값
	@observable
	_nickNameStatus = '';

	// email 중복체크 확인값
	@observable
	_emailStatus = '';

	// sns 회원가입
	@observable
	_snsEmail = '';

	@observable
	_snsEmailStatus = 0;

	// 사업자번호 중복체크 확인값
	@observable
	businessStatus = 0;

	@observable
	bridge?: bridge;

	// 지갑 금액
	@observable
	balance?: balance;

	// 로그인 api response 값
	@observable
	loginResData?: loginResData;

	// wallet api response 값
	@observable
	resCreateWallet?: WalletResData;

	// user의 address 정보
	@observable
	userAddress?: userAddress;

	// user의 pincode값
	@observable
	_pincode = '';

	// user 의 문의정보
	@observable
	_inquire: inquire[] = [];

	@observable
	_inquireDetail?: inquire;

	@observable
	_wallet_nm = '';

	@observable
	couponInfo: any = '';

	@observable
	sendStatus: any = ''; // 인증번호 전송 상태 (회원가입)

	@observable
	certStatus: any = ''; // 인증번호 확인 상태 (회원가입)

	@observable
	findSendStatus: any = ''; // 인증번호 상태 (유저 찾기)

	@observable
	findConfirmStatus: any = ''; // 인증번호 확인 (유저찾기)

	@observable
	findSaveInfo: findSaveInfo = {
		email: '',
		user_id: '',
	};

	@observable
	changeWalletStatus: any = '';

	@observable
	dAppStatus: any = '';

	@observable
	confirmSendAmountStatus: any = '';

	@observable
	donationStatus: any = '';

	@computed
	get userInfo() {
		return this._userInfo;
	}

	@computed
	get pincode() {
		return this._pincode;
	}

	@computed
	get inquire() {
		return this._inquire;
	}

	@computed
	get inquireDetail() {
		return this._inquireDetail;
	}

	@computed
	get snsEmail() {
		return this._snsEmail;
	}

	@computed
	get snsEmailStatus() {
		return this._snsEmailStatus;
	}

	@computed
	get emailStatus() {
		return this._emailStatus;
	}

	@computed
	get nickNameStatus() {
		return this._nickNameStatus;
	}

	@computed
	get wallet_nm() {
		return this._wallet_nm;
	}

	@action
	getUser = async (userId: string) => {
		this._userInfo = undefined;
		this._init('READ_USER');
		let sessionInfo:any = "";
		try {
			await client
				.post('/Mypage/getMypageMainData', qs.stringify({ user_id: aes256Decrypt(userId) }))
				.then((res) => (this._userInfo = res.data));
			if (this.userInfo) {
				sessionInfo = 
					{
						nickName:btoa(this.userInfo.nickname),
						email:btoa(this.userInfo.email),
						name:btoa(this.userInfo.name),
						image:btoa(this.userInfo.user_img)
					}
				sessionStorage.setItem('_user_info',JSON.stringify(sessionInfo));
			}
			this._success.READ_USER = true;
		} catch (e) {
			this._failure.READ_USER = [true, e];
		} finally {
			this._pending.READ_USER = false;
		}
	};

	@action
	userProfileUpdate = async (data: any) => {
		this._init('PROFILE_IMAGE_UPDATE');
		try {
			await client.post('/Mypage/saveUserProfile', data, { headers: { 'content-type': 'multipart/form-data' } });
			this._success.PROFILE_IMAGE_UPDATE = true;
		} catch (e) {
			this._failure.PROFILE_IMAGE_UPDATE = [true, e];
		} finally {
			this._pending.PROFILE_IMAGE_UPDATE = false;
		}
	};

	@action
	nicknameConfirm = async (nickname: string) => {
		this._nickNameStatus = '';
		await client
			.post('/User/userDupNicknameConfirm', qs.stringify({ nickname }))
			.then((res) => (this._nickNameStatus = res.data.status));
	};

	@action
	emailConfirm = async (email: string) => {
		this._emailStatus = '';
		this._init('EMAIL_CONFIRM');
		try {
			await client
				.post('/User/userDupEmailConfirm', qs.stringify({ email }))
				.then((res) => (this._emailStatus = res.data.status));
			this._success.EMAIL_CONFIRM = true;
		} catch (e) {
			this._failure.EMAIL_CONFIRM = [true, e];
		} finally {
			this._pending.EMAIL_CONFIRM = false;
		}
	};

	@action
	businessConfirm = async (business: string) => {
		this.businessStatus = 0;
		await client
			.post('/User/userDupBusinessConfirm', qs.stringify({ business_num: business }))
			.then((res) => (this.businessStatus = res.data.status));
	};

	@action
	joinUserInitStatus = () => {
		this._nickNameStatus = '';
		this._emailStatus = '';
		this.sendStatus = '';
		this.certStatus = '';
		this.businessStatus = 0;
	};

	@action
	createUser = (user: createUser) => {
		this._init('CREATE_USER');
		this._init('CREATE_USER_ADDRESS');
		if (user.business_num === '') {
			try {
				client
					.post(
						'/User/userJoin',
						JSON.stringify({
							email: user.email,
							password: user.password,
							pin_code: user.pin_code,
							name: user.name,
							nickname: user.nickname,
							nation: user.nation,
							phone: user.phone,
							fcm: user.fcm,
						})
					)
					.then((res) =>
						client.post(
							'/Mypage/saveUserAddress',
							JSON.stringify({
								user_id: res.data.user_id,
								addr_prop: 'd',
								addr_road: user.addr_road,
								addr_detail: user.addr_detail,
							})
						)
					);
				this._success.CREATE_USER = true;
			} catch (e) {
				this._failure.CREATE_USER = [true, e];
			} finally {
				this._pending.CREATE_USER = false;
			}
		} else {
			try {
				client
					.post(
						'/User/userJoin',
						JSON.stringify({
							email: user.email,
							password: user.password,
							pin_code: user.pin_code,
							name: user.name,
							nickname: user.nickname,
							nation: user.nation,
							phone: user.phone,
							fcm: user.fcm,
							business_num: Number(user.business_num),
						})
					)
					.then((res) =>
						client.post(
							'/Mypage/saveUserAddress',
							JSON.stringify({
								user_id: res.data.user_id,
								addr_prop: 'd',
								addr_road: user.addr_road,
								addr_detail: user.addr_detail,
							})
						)
					);
				this._success.CREATE_USER = true;
			} catch (e) {
				this._failure.CREATE_USER = [true, e];
			} finally {
				this._pending.CREATE_USER = false;
			}
		}
	};

	@action
	createUserByForegion = async(user:any) =>{
		this._init("CREATE_USER_FOREGION");
		let createStatus:any = "";
		let imageStatus:any ="";
		try{
			await client.post('/User/userJoin', user)
				.then(res=>createStatus= res.data);
				if(createStatus.status===1){
					const formData = new FormData();
					formData.append("user_id", createStatus.user_id);
					formData.append("userfile",user.image);
					await client.post('/User/userPassportUpload', formData)
						.then(res=>imageStatus = res.data);
						if(imageStatus.status===1){
							this._success["CREATE_USER_FOREGION"] = true;
						}
						else{
							alert(imageStatus.msg);
						}
				}
		} catch(e){
			this._failure["CREATE_USER_FOREGION"] = [true, e];
		} finally{
			this._pending["CREATE_USER_FOREGION"] = false;
		}
	}
	// 지갑생성
	@action
	createWallet = async (userKey: string, wallet_name: string) => {
		this._init('CREATE_WALLET');
		try {
			await client.post(
				'Luniverse/api/',
				qs.stringify({
					type: 'post',
					func: 'tx/v1.1/wallets',
					walletType: 'LUNIVERSE',
					userKey: userKey,
					wallet_nm: wallet_name,
				})
			);
			this._success.CREATE_WALLET = true;
		} catch (e) {
			this._failure.CREATE_WALLET = [true, e];
		} finally {
			this._pending.CREATE_WALLET = false;
		}
	};

	// 등록된 wallet 조회
	@action
	bridgeWallet = async (userKey: string) => {
		this._init('BRIDGE_WALLET');
		this.bridge = undefined;
		try {
			await client
				.get(`/Luniverse/api/?type=query&&func=tx/v1.1/wallets/bridge&&walletType=LUNIVERSE&&userKey=${userKey}`)
				.then((res) => (this.bridge = res.data));
			this._success.BRIDGE_WALLET = true;
		} catch (e) {
			this._failure.BRIDGE_WALLET = [true, e];
		} finally {
			this._pending.BRIDGE_WALLET = false;
		}
	};

	// Balace wallet 조회
	@action
	balanceWallet = async (walletAddress: string) => {
		let mainTokenStatus: any = '';
		let swapData: any = '';
		let resultRawTx: any = '';
		let resultNonce: any = '';
		let resultRemoteSign: any = '';
		let resultSignedTx: any = '';

		this._init('BALANCE_WALLET');
		try {
			await client
				.get(`/Luniverse/api/?type=path&&func=tx/v1.1/wallets/${walletAddress}/BERRY/balance`)
				.then((res) => (mainTokenStatus = res.data));
			if (mainTokenStatus.data.balance === '0') {
				await client
					.get(`/Luniverse/api/?type=path&&func=tx/v1.1/wallets/${walletAddress}/BERRY/BERRY/balance`)
					.then((res) => (this.balance = res.data));
			} else {
				await client
					.post(
						`/Luniverse/api/`,
						qs.stringify({ type: 'post', func: `mx/v1.0/swap/${walletAddress}`, symbol: 'BERRY' })
					)
					.then((res) => (swapData = res.data));
				if (swapData.result) {
					await client
						.get(
							`/Luniverse/api/?type=query&&func=mx/v1.0/token/main-tokens/BERRY/transfer/raw-tx&&fromAddress=${
								swapData.data.userAddress
							}&&toAddress=${swapData.data.swapAddress}&&amount=${
								mainTokenStatus.data.balance
							}&&isDelegated=${true}&&gasLimit=3200000`
						)
						.then((res) => (resultRawTx = res.data));
					if (resultRawTx.result) {
						await client
							.get(`/Luniverse/api/?type=path&&func=mx/v1.0/wallets/${swapData.data.userAddress}/nonce`)
							.then((res) => (resultNonce = res.data));
						client.post(
							'/Luniverse/api/',
							qs.stringify({
								type: 'delegation',
								func: 'be/chains/8555924898017198221/dc/whitelists',
								address: swapData.data.userAddress,
							})
						);
						if (resultNonce.result) {
							resultRawTx.data.rawTx.nonce = resultNonce.data.nonce;
							await client
								.post(`/Luniverse/api/`, {
									type: 'post',
									func: `mx/v1.0/wallets/${swapData.data.userAddress}/sign`,
									rawTx: resultRawTx.data.rawTx,
								})
								.then((res) => (resultRemoteSign = res.data));
							if (resultRemoteSign.result) {
								await client
									.post(
										`/Luniverse/api`,
										qs.stringify({
											type: 'post',
											func: 'mx/v1.0/transaction/send/signed-tx',
											signedTx: resultRemoteSign.data.signedTx,
										})
									)
									.then((res) => (resultSignedTx = res.data));
								if (resultSignedTx.result) {
									await client
										.get(
											`/Luniverse/api/?type=path&&func=tx/v1.1/wallets/${swapData.data.userAddress}/BERRY/BERRY/balance`
										)
										.then((res) => (this.balance = res.data));
								}
							}
						}
					}
				}
			}
			this._success.BALANCE_WALLET = true;
		} catch (e) {
			this._failure.BALANCE_WALLET = [true, e];
		} finally {
			this._pending.BALANCE_WALLET = false;
		}
	};

	@action
	dappCheck = async (toWalletAddress: string) => {
		this.dAppStatus = '';
		this._init('DAPP_CHECK');
		try {
			await client
				.post('/Wallet/confirmWalletByAddress', qs.stringify({ wallet_address: toWalletAddress }))
				.then((res) => (this.dAppStatus = res.data));
			this._success['DAPP_CHECK'] = true;
		} catch (e) {
			this._failure['DAPP_CHECK'] = [true, e];
		} finally {
			this._pending['DAPP_CHECK'] = false;
		}
	};

	@action
	confirmSendAmount = async (wallet_address: string, balance: string) => {
		this.confirmSendAmountStatus = '';
		this._init('CONFIRM_SEND_AMOUNT');
		try {
			await client
				.post('/Lock/confirmSendAmount', qs.stringify({ wallet_address: wallet_address, balance: balance }))
				.then((res) => (this.confirmSendAmountStatus = res.data));
			this._success['CONFIRM_SEND_AMOUNT'] = true;
		} catch (e) {
			this._failure['CONFIRM_SEND_AMOUNT'] = [true, e];
		} finally {
			this._pending['CONFIRM_SEND_AMOUNT'] = false;
		}
	};

	@action
	initConfirmSendAmount = async () => {
		this.confirmSendAmountStatus = '';
	};

	@action
	getWallet = async (user_id: string) => {
		this._init('READ_WALLET');
		try {
			await client
				.post('/Wallet/getUserWallet', qs.stringify({ user_id }))
				.then((res) => (this._wallet_nm = res.data.wallet_nm));
			this._success.READ_WALLET = true;
		} catch (e) {
			this._failure.READ_WALLET = [true, e];
		} finally {
			this._pending.READ_WALLET = false;
		}
	};

	@action
	transactionsWallet = async (fromWalletAddress: string, toWalletAddress: string, amount: string) => {
		const actionName = 'flexibleTransfer';
		let transactionsRes = false;
		this._init('TRANSACTION_COMPLETE');
		try {
			await client
				.post(
					'/Luniverse/api/',
					qs.stringify({
						type: 'post',
						func: `tx/v1.1/transactions/${actionName}`,
						from: fromWalletAddress,
						'inputs.receiverAddress': toWalletAddress,
						'inputs.valueAmount': amount,
					})
				)
				.then((res) => (transactionsRes = res.data.result));
			if (transactionsRes) {
				this._success.TRANSACTION_COMPLETE = true;
			}
		} catch (e) {
			this._failure.TRANSACTION_COMPLETE = [true, e];
		} finally {
			this._pending.TRANSACTION_COMPLETE = false;
		}
	};

	@action
	sideToMain = async (fromWallet: string, amount: string, toWallet: string) => {
		this._init('SIDE_TO_MAIN_COMPLETE');
		try {
			client.post(
				'/Luniverse/sideToMainTransfer',
				qs.stringify({ from_address: fromWallet, to_address: toWallet, amount: amount.slice(0, amount.length - 18) })
			);
			this._success['SIDE_TO_MAIN_COMPLETE'] = true;
		} catch (e) {
			this._failure.SIDE_TO_MAIN_COMPLETE = [true, e];
		} finally {
			this._pending.SIDE_TO_MAIN_COMPLETE = false;
		}
	};

	// 로그인
	@action
	login = async (email: string, password: string) => {
		this._init('LOGIN');
		let firstLoginResult: any = '';
		try {
			await client.post('/Auth/login', qs.stringify({ email })).then((res) => (firstLoginResult = res.data));
			if (firstLoginResult.status === '1') {
				await client
					.post(
						'/Auth/loginValidate',
						qs.stringify({ email, isCorrect: bcrypt.compareSync(password, firstLoginResult.hash) })
					)
					.then((res) => (this.loginResData = res.data));
				if (this.loginResData?.status === 1) {
					sessionStorage.setItem('uuid', this.loginResData.user_id);
					this._success.LOGIN = true;
				}
			} else {
				this.loginResData = firstLoginResult;
			}
		} catch (e) {
			this._failure.LOGIN = [true, e];
		} finally {
			this._pending.LOGIN = false;
		}
	};

	@action
	logout = async () => {
		this._init('LOGOUT');
		try {
			this.loginResData = undefined;
			this._userInfo = undefined;
			this._success.LOGOUT = true;
			this.balance = undefined;
			this.bridge = undefined;
			sessionStorage.removeItem('uuid');
			sessionStorage.removeItem('_user_info');
		} catch (e) {
			this._failure.LOGOUT = [true, e];
		} finally {
			this._pending.LOGOUT = false;
		}
	};

	@action
	getUserAddress = async (user_id: string) => {
		this._init('READ_USER_ADDRESS');
		try {
			await client
				.post('/Address/getAddressData', qs.stringify({ user_id }))
				.then((res) => (this.userAddress = res.data));
			this._success.READ_USER_ADDRESS = true;
		} catch (e) {
			this._failure.READ_USER_ADDRESS = [true, e];
		} finally {
			this._pending.READ_USER_ADDRESS = false;
		}
	};

	// sns카카오 로그인
	@action
	kakaoLogin = async (email: string, kakao_token: string) => {
		this._init('KAKAO_LOGIN');
		try {
			await client
				.post('/Auth/loginKakao', qs.stringify({ email: aes256Encrypt(email), kakao_token }))
				.then((res) => (this.loginResData = res.data));
			if (this.loginResData?.status === 1) {
				sessionStorage.setItem('uuid', this.loginResData.user_id);
				this._success.KAKAO_LOGIN = true;
			}
		} catch (e) {
			this._failure.KAKAO_LOGIN = [true, e];
		} finally {
			this._pending.KAKAO_LOGIN = false;
		}
	};

	@action
	getPincode = async (user_id: string) => {
		this._init('READ_PINCODE');
		try {
			await client
				.post('/Auth/getAuthCode', qs.stringify({ user_id }))
				.then((res) => (this._pincode = res.data.pin_code));
			this._success.READ_PINCODE = true;
		} catch (e) {
			this._failure.READ_PINCODE = [true, e];
		} finally {
			this._pending.READ_PINCODE = false;
		}
	};

	@action
	updatePincode = (user_id: string, pin_code: string) => {
		this._init('UPDATE_PINCODE');
		try {
			client.post('/Auth/getAuthCodeUpdate', qs.stringify({ user_id, pin_code })).then((res) => console.log(res.data));
			this._success.UPDATE_PINCODE = true;
		} catch (e) {
			this._failure.UPDATE_PINCODE = [true, e];
		} finally {
			this._pending.UPDATE_PINCODE = false;
		}
	};

	@action
	updateUserAddress = (
		user_id: string,
		addr_prop: string,
		addr_road: string,
		addr_detail: string,
		address_id: string
	) => {
		this._init('UPDATE_ADDRESS');
		if (address_id === '') {
			try {
				client.post('/Mypage/saveUserAddress', JSON.stringify({ user_id, addr_prop, addr_road, addr_detail }));
				this._success.UPDATE_ADDRESS = true;
			} catch (e) {
				this._failure.UPDATE_ADDRESS = [true, e];
			} finally {
				this._pending.UPDATE_ADDRESS = false;
			}
		} else {
			try {
				client.post(
					'/Mypage/saveUserAddress',
					JSON.stringify({
						user_id,
						addr_prop,
						addr_road,
						addr_detail,
						address_id,
					})
				);
				this._success.UPDATE_ADDRESS = true;
			} catch (e) {
				this._failure.UPDATE_ADDRESS = [true, e];
			} finally {
				this._pending.UPDATE_ADDRESS = false;
			}
		}
	};

	@action
	updateUserNickname = async (user_id: string, nickname: string) => {
		this._init('UPDATE_NICKNAME');
		try {
			await client.post('/Mypage/updateUserName', JSON.stringify({ user_id, nickname }));
			this._success.UPDATE_NICKNAME = true;
		} catch (e) {
			this._failure.UPDATE_NICKNAME = [true, e];
		} finally {
			this._pending.UPDATE_NICKNAME = false;
		}
	};

	@action
	updateUserPassword = async (user_id: number, password: string) => {
		this._init('UPDATE_PASSWORD');
		try {
			await client.post('/User/setPassword', JSON.stringify({ user_id, password })).then((res) => {
				if (res.data.status === 1) {
					this._success.UPDATE_PASSWORD = true;
				}
			});
			this._success.UPDATE_PASSWORD = true;
		} catch (e) {
			this._failure.UPDATE_PASSWORD = [true, e];
		} finally {
			this._pending.UPDATE_PASSWORD = false;
		}
	};

	@action
	getInquireList = async (user_id: string) => {
		this._inquire = [];
		this._init('READ_INQUIRE');
		try {
			await client
				.post('/Issue/getIssueData', qs.stringify({ user_id }))
				.then((res) => (res.data.status === 101 ? (this._inquire = []) : (this._inquire = res.data)));
			this._success.READ_INQUIRE = true;
		} catch (e) {
			this._failure.READ_INQUIRE = [true, e];
		} finally {
			this._pending.READ_INQUIRE = false;
		}
	};

	@action
	createInquire = (user_id: string, issue_type: number, title: string, content: string) => {
		this._init('CREATE_INQUIRE');
		try {
			client.post('/Issue/saveIssue', JSON.stringify({ user_id, issue_type, title, content }));
			this._success.CREATE_INQUIRE = true;
		} catch (e) {
			this._failure.CREATE_INQUIRE = [true, e];
		} finally {
			this._pending.CREATE_INQUIRE = false;
		}
	};

	@action
	getInquireDetail = async (inquire_id: string) => {
		this._init('READ_INQUIRE_DETAIL');
		try {
			await client
				.post('/Issue/getIssueData', qs.stringify({ issue_id: inquire_id }))
				.then((res) => (this._inquireDetail = res.data));
			this._success.READ_INQUIRE_DETAIL = true;
		} catch (e) {
			this._failure.READ_INQUIRE_DETAIL = [true, e];
		} finally {
			this._pending.READ_INQUIRE_DETIAL = false;
		}
	};

	@action
	updateInquire = (user_id: any, issue_id: any, issue_type: any, title: string, content: string) => {
		this._init('UPDATE_INQUIRE');

		try {
			client
				.post(
					'/Issue/saveIssue',
					JSON.stringify({
						user_id,
						issue_id,
						issue_type,
						title,
						content,
					})
				)
				.then((res) => console.log(res.data));
			this._success.UPDATE_INQUIRE = true;
		} catch (e) {
			this._failure.UPDATE_INQUIRE = [true, e];
		} finally {
			this._pending.UPDATE_INQUIRE = false;
		}
	};

	@action
	saveSnsInfo = async (email: string) => {
		this._snsEmail = '';
		this._snsEmailStatus = 0;
		this._init('SAVE_SNS_EMAIL');
		try {
			this._snsEmail = email;
			this._snsEmailStatus = 1;
			this._success.SAVE_SNS_EMAIL = true;
		} catch (e) {
			this._snsEmail = '';
			this._snsEmailStatus = 0;
			this._failure.SAVE_SNS_EMAIL = [true, e];
		} finally {
			this._pending.SAVE_SNS_EMAIL = false;
		}
	};

	@action
	registerCoupon = async (user_id: string, coupon_code: string) => {
		this._init('REGISTER_COUPON');
		try {
			await client
				.post('/Couponlog/setCouponByUser', qs.stringify({ user_id, coupon_code }))
				.then((res) => (this.couponInfo = res.data));
			this._success.REGISTER_COUPON = true;
		} catch (e) {
			this._failure.REGISTER_COUPON = [true, e];
		} finally {
			this._pending.REGISTER_COUPON = false;
		}
	};

	// 회원가입 sms 인증 전송
	@action
	smsCert = async (receiver: string) => {
		this.sendStatus = '';
		this._init('SMS_SEND_CERTIFICATION');
		try {
			await client.post('/Sms/certSend', qs.stringify({ receiver })).then((res) => (this.sendStatus = res.data));
			this._success.SMS_SEND_CERTIFICATION = true;
		} catch (e) {
			this._failure.SMS_SEND_CERTIFICATION = [true, e];
		} finally {
			this._pending.SMS_SEND_CERTIFICATION = false;
		}
	};

	// 회원가입 sms 인증 확인
	@action
	smsCertCheck = async (receiver: string, cert_code: string) => {
		this.certStatus = '';
		this._init('SMS_CERTIFICATION_CHECK');
		try {
			await client
				.post('/Sms/certMsgConfirm', qs.stringify({ receiver, cert_code }))
				.then((res) => (this.certStatus = res.data));
			this._success.SMS_CERTIFICATION_CHECK = true;
		} catch (e) {
			this._failure.SMS_CERTIFICATION_CHECK = [true, e];
		} finally {
			this._pending.SMS_CERTIFICATION_CHECK = false;
		}
	};

	// 아이디 및 비밀번호 찾기 step.1
	@action
	findSendSMS = async (receiver: string, find_type: string, find_value: string) => {
		this.findSendStatus = '';
		this._init('FIND_SEND_SMS');
		try {
			await client
				.post('/Sms/certSend', qs.stringify({ receiver, find_type, find_value }))
				.then((res) => (this.findSendStatus = res.data));
			this._success.FIND_SEND_SMS = true;
			if (this.findSendStatus.status === '1') {
				this.findSaveInfo.email = find_value;
			}
		} catch (e) {
			this._failure.FIND_SEND_SMS = [true, e];
		} finally {
			this._pending.FIND_SEND_SMS = false;
		}
	};

	// 아이디 및 비밀번호 찾기 step.2
	@action
	findConfirmSms = async (receiver: string, cert_code: string, mail_find_yn: string) => {
		this.findConfirmStatus = '';
		this._init('FIND_CONFIRM_SMS');
		try {
			await client
				.post('/Sms/certMsgConfirm', qs.stringify({ receiver, cert_code, mail_find_yn }))
				.then((res) => (this.findConfirmStatus = res.data));
			this._success.FIND_CONFIRM_SMS = true;
		} catch (e) {
			this._failure.FIND_CONFIRM_SMS = [true, e];
		} finally {
			this._pending.FIND_CONFIRM_SMS = false;
		}
	};

	@action
	getUserId = async (email: string) => {
		await client
			.post('/Auth/loginValidate', qs.stringify({ email, isCorrect: true }))
			.then((res) => (this.findSaveInfo.user_id = res.data.user_id));
	};

	@action
	initFind = () => {
		this.findSendStatus = '';
		this.findConfirmStatus = '';
	};

	@action
	changeWalletName = async (user_id: string, wallet_nm: string) => {
		this._init('UPDATE_WALLET_NAME');
		try {
			await client
				.post('/Wallet/setWallet', qs.stringify({ user_id: user_id, wallet_nm: wallet_nm, act: 'update' }))
				.then((res) => (this.changeWalletStatus = res.data));
			this._success['UPDATE_WALLET_NAME'] = true;
		} catch (e) {
			this._failure['UPDATE_WALLET_NAME'] = [true, e];
		} finally {
			this._pending['UPDATE_WALLET_NAME'] = false;
		}
	};

	@action
	donate = async (donation_id: number, wallet_address: string, amount: number) => {
		this.donationStatus = '';
		this._init('DONATION_COMPLETE');
		try {
			await client
				.post(
					'/Donation/donate',
					qs.stringify({ donation_id: donation_id, wallet_address: wallet_address, amount: amount })
				)
				.then((res) => (this.donationStatus = res.data));
			this._success['DONATION_COMPLETE'] = true;
		} catch (e) {
			this._failure['DONATION_COMPLETE'] = [true, e];
		} finally {
			this._pending['DONATION_COMPLETE'] = false;
		}
	};
}
export default UserStore;
