import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import Modal from 'react-modal';
import bcrypt from 'bcryptjs';
import DaumPostcode from 'react-daum-postcode';
import profile_none_image from '../../../../public/images/profile_none_image.png';
import profile_password_setting from '../../../../public/images/profile_password_setting.png';
import { user } from '../../../../stores/user/types';
import { aes256Decrypt } from '../../../../lib/crypto';

interface Props {
	userImageUpdate: (data: any) => void;
	userInfo?: user;
	pincode: string;
	userPincodeUpdate: (pin_code: string) => void;
	userAddress: any;
	userAddressUpdate: (
		user_id: string,
		addr_prop: string,
		addr_road: string,
		addr_detail: string,
		address_id: string
	) => void;
	userNicknameUpdate: (user_id: string, nickname: string) => void;
	userPasswordUpdate: (password: string) => void;
	userNickNameConfirm: (nickName: string) => void;
	nickNameCheck: string;
}
const MypageProfileComponent: React.FC<Props> = ({
	userImageUpdate,
	userInfo,
	pincode,
	userPincodeUpdate,
	userAddress,
	userAddressUpdate,
	userNicknameUpdate,
	userPasswordUpdate,
	userNickNameConfirm,
	nickNameCheck,
}) => {
	const check: any = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&]).{7,}.$/;
	const [email, setEmail] = useState('');
	const [profilePassword1, setProfilePassword1] = useState('');
	const [profilePassword2, setProfilePassword2] = useState('');
	const [name, setName] = useState('');
	const [nickName, setNickName] = useState('');
	const [basicAddress, setBasicAddress] = useState<string>('');
	const [detailAddress, setDetailAddress] = useState<string>('');
	const [address_id, setAddress_id] = useState<string>('');
	// const [changePhoneNumber, setChangePhoneNumber] = useState('');
	// const [phoneNumberChangeState, setPhoneNumberChangeState] = useState(false);

	// const [certificationNumber, setCertificationNumber] = useState('');
	// const [inputCertification, setInputCertification] = useState('');
	const [passwordState, setPasswordState] = useState<number>(0);

	const [modal, setModal] = useState<boolean>(false);

	useEffect(() => {
		if (userAddress === undefined) {
			setBasicAddress('');
			setDetailAddress('');
		} else {
			for (let i = 0; i < userAddress.length; i++) {
				if (userAddress[i].addr_prop === 'd') {
					setBasicAddress(userAddress[i].addr_road);
					setDetailAddress(userAddress[i].addr_detail);
					setAddress_id(userAddress[i].address_id);
				}
			}
		}
	}, [userAddress]);

	useEffect(() => {
		if (userInfo !== undefined) {
			setEmail(userInfo.email);
			setName(userInfo.name);
			setNickName(userInfo.nickname);
		}
	}, [userInfo]);

	const onChange = (e: any) => {
		const { id, value } = e.target;

		if (id === 'profile_password1') {
			setProfilePassword1(value);
			if (check.test(value)) {
				setPasswordState(1);
			} else if (!check.test(value) && value.length > 0) {
				setPasswordState(-1);
			} else if (value.length === 0) {
				setPasswordState(0);
			}
		}
		if (id === 'profile_password2') {
			setProfilePassword2(value);
		}
		if (id === 'profile_name') {
			setName(value);
		}
		if (id === 'profile_nickname') {
			setNickName(value);
		}
		if (id === 'profile_address2') {
			setDetailAddress(value);
		}
		// if(id==='inputCertification'){
		//     setInputCertification(value);
		// }
		// if(id==='change_phoneNumber'){
		//     setChangePhoneNumber(value);
		// }
	};

	const toggle = () => {
		setModal(!modal);
		setSettingPassword1('');
		setSettingPassword2('');
		setInputPincode('');
		setPincodeState(0);
		setSettingState(0);
	};

	const initArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	const shuffle = (arr: any) => {
		for (let i = 0; i < arr.length; i++) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
	};
	const [shuffleArray, setShuffleAraay] = useState<any>(shuffle(initArray));

	const [settingPassword1, setSettingPassword1] = useState<string>('');
	const [settingPassword2, setSettingPassword2] = useState<string>('');
	const [settingState, setSettingState] = useState<number>(0);

	const [inputPincode, setInputPincode] = useState<string>('');
	const [pincodeState, setPincodeState] = useState<number>(0);

	const onClickSetting = (num: number) => {
		if (settingPassword1.length < 6) {
			if (num < 10) {
				setSettingPassword1(settingPassword1 + num);
			}
		}

		if (settingPassword1.length === 5) {
			setShuffleAraay(shuffle(initArray));
		}
	};
	const onClickSettingCheck = (num: number) => {
		if (settingPassword2.length < 6) {
			if (num < 10) {
				setSettingPassword2(settingPassword2 + num);
			}
		}
		if (settingPassword2.length === 5) {
			setShuffleAraay(shuffle(initArray));
		}
	};

	const onClickPincode = (num: number) => {
		if (inputPincode.length < 6) {
			if (num < 10) {
				setInputPincode(inputPincode + num);
			}
		}
		if (inputPincode.length === 5) {
			setShuffleAraay(shuffle(initArray));
		}
	};
	useEffect(() => {
		if (settingPassword1.length === 6 && settingPassword2.length === 6) {
			if (settingPassword1 !== settingPassword2) {
				setSettingPassword2('');
				setSettingState(-1);
			} else {
				setSettingState(1);
				setModal(false);
			}
		}
	}, [settingPassword1, settingPassword2]);

	useEffect(() => {
		if (inputPincode.length === 6) {
			if (bcrypt.compareSync(inputPincode, pincode)) {
				setPincodeState(1);
			} else {
				setPincodeState(-1);
				setInputPincode('');
			}
		}
	}, [inputPincode, pincode]);
	const [imgBase64, setImgBase64] = useState<string>('');
	const [imgFile, setImgFile] = useState<any>(null);
	const handleChangeFile = (e: any) => {
		const reader = new FileReader();

		reader.onloadend = () => {
			// 2. 읽기가 완료되면 아래코드가 실행됩니다.
			const base64 = reader.result;
			if (base64) {
				setImgBase64(base64.toString()); // 파일 base64 상태 업데이트.
			}
		};
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장.
			setImgFile(e.target.files[0]); // 파일 상태 업데이트.
		}
	};

	const onClickChange = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const formData = new FormData();
		const uuid: any = sessionStorage.getItem('uuid');

		if (passwordState === -1 || profilePassword1 !== profilePassword2) {
			alert('비밀번호를 다시 확인해주세요.');
		} else if (nickNameCheck === 'dup') {
			alert('닉네임 중복 체크를 해주세요.');
		} else {
			if (userAddress !== undefined) {
				for (let i = 0; i < userAddress.length; i++) {
					if (userAddress[i].addr_prop === 'd') {
						if (userAddress[i].addr_detail !== detailAddress) {
							userAddressUpdate(
								userInfo !== undefined ? userInfo.user_id : '',
								'd',
								basicAddress,
								detailAddress,
								address_id
							);
						}
					}
				}
			}
			if (imgFile) {
				formData.append('user_id', aes256Decrypt(uuid));
				formData.append('userfile', imgFile);
				userImageUpdate(formData);
				// userImageUpdate(imgBase64)
				// userImageUpdate(imgFile);
			}
			if (pincodeState === 1 && settingState === 1) {
				userPincodeUpdate(bcrypt.hashSync(settingPassword1, 10));
			}
			if (passwordState === 1) {
				if (profilePassword1 !== profilePassword2) {
					alert('비밀번호가 일치하는지 확인해주세요.');
				} else if (profilePassword1 === profilePassword2) {
					userPasswordUpdate(bcrypt.hashSync(profilePassword1, 12));
				}
			}
			if (nickNameCheck === 'suc') {
				userNicknameUpdate(userInfo !== undefined ? userInfo.user_id : '', nickName);
			}
		}
	};

	const onClickNickNameConfirm = () => {
		userNickNameConfirm(nickName);
	};

	const [addressModal, setAddressModal] = useState<boolean>(false);
	const addressToggle = () => {
		setAddressModal(!addressModal);
	};
	const handleComplete = (data: any) => {
		if (data.buildingName === '') {
			setBasicAddress(data.address);
		} else {
			setBasicAddress(`${data.address} (${data.buildingName})`);
		}
		setAddressModal(false);
		document.getElementById('profile_address2')?.focus();
	};

	const customStyles = {
		overlay: {
			backgroundColor: 'rgba(0,0,0,0.5)',
		},
		content: {
			margin: 'auto',
			width: '295px',
			height: '305px',
			padding: '0',
			overflow: 'hidden',
			borderRadius: '0',
			border: '1px solid #fcfcfc',
		},
	};

	const addressStyles = {
		overlay: {
			backgroundColor: 'rgba(0,0,0,0.5)',
		},
		content: {
			left: '0',
			margin: 'auto',
			width: globalThis.innerWidth <= 414 ? '100%' : '500px',
			height: '600px',
			padding: '0',
			overflow: 'hidden',
		},
	};

	const closeModal = () => {
		setModal(false);
	};
	const closeAddressModal = () => {
		setAddressModal(false);
	};

	return (
		<MypageProfileWrap>
			<UserInfoContainer>
				<MypageProfileHeader>
					<p>회원정보 변경</p>
				</MypageProfileHeader>
				<table>
					<tbody>
						<tr className="user_info_table_email">
							<td className="user_info_title">아이디</td>
							<td className="user_info_content">
								<p>{email}</p>
							</td>
						</tr>
						<tr className="user_info_table_nickName">
							<td className="user_info_title">닉네임</td>
							<td className="user_info_content">
								<input type="text" value={nickName} id="profile_nickname" onChange={onChange} />
								<button onClick={onClickNickNameConfirm}>중복확인</button>
								{nickNameCheck === 'suc' ? (
									<small>변경 가능한 닉네임 입니다.</small>
								) : nickNameCheck === 'dup' ? (
									<small style={{ color: 'red' }}>이미 사용중인 닉네임 입니다.</small>
								) : (
									''
								)}
							</td>
						</tr>
						<tr className="user_info_table_password">
							<td className="user_info_title">새 비밀번호</td>
							<td className="user_info_content">
								<input type="password" id="profile_password1" value={profilePassword1} onChange={onChange} />
								{profilePassword1.length > 0 ? (
									passwordState === 1 ? (
										''
									) : (
										<small style={{ color: 'red' }}>영문, 숫자, 특수문자를 포함 8자 이상을 입력해주세요.</small>
									)
								) : (
									''
								)}
							</td>
						</tr>
						<tr className="user_info_table_password_check">
							<td className="user_info_title">새 비밀번호 확인</td>
							<td className="user_info_content">
								<input type="password" id="profile_password2" value={profilePassword2} onChange={onChange} />
								{profilePassword2.length === 0 ? (
									''
								) : profilePassword2 === profilePassword1 ? (
									<small>비밀번호가 일치합니다.</small>
								) : (
									<small style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</small>
								)}
							</td>
						</tr>
						<tr className="user_info_table_name">
							<td className="user_info_title">이름(실명)</td>
							<td className="user_info_content">
								<p>{name}</p>
							</td>
						</tr>
						<tr className="user_info_table_image">
							<td className="user_info_title">프로필 이미지</td>
							<td className="user_info_content">
								{userInfo?.user_img !== null ? (
									<div
										style={
											imgBase64.length > 0
												? { backgroundImage: `url(${imgBase64})` }
												: { backgroundImage: `url(${userInfo?.user_img})` }
										}
									/>
								) : (
									<div
										style={
											imgBase64.length > 0
												? { backgroundImage: `url(${imgBase64})` }
												: { backgroundImage: `url(${profile_none_image})` }
										}
									/>
								)}
								<label>
									업로드
									<input type="file" id="userfile" name="userfile" onChange={handleChangeFile} />
								</label>
							</td>
						</tr>
						<tr className="user_info_table_address">
							<td rowSpan={2} className="user_info_title">
								주소(기본 배송지)
							</td>
							<td className="user_info_content">
								<input type="text" id="profile_address1" value={basicAddress} readOnly />
								<button onClick={addressToggle} id="post_search">
									우편번호 검색
								</button>
								<Modal
									isOpen={addressModal}
									ariaHideApp={false}
									style={addressStyles}
									onRequestClose={closeAddressModal}
								>
									<ModalHeader>
										<div className="modal_header_top">
											<h1>우편번호 검색</h1>
											<p onClick={closeAddressModal}>닫기</p>
										</div>
									</ModalHeader>
									<DaumPostcode onComplete={handleComplete} height="100%" />
								</Modal>
							</td>
						</tr>
						<tr className="user_info_table_address">
							<td className="user_info_content">
								<input type="text" id="profile_address2" value={detailAddress} onChange={onChange} />
							</td>
						</tr>
					</tbody>
				</table>
			</UserInfoContainer>
			<UserPincodeContainer>
				<MypageProfileHeader>
					<p>결제 암호 설정</p>
				</MypageProfileHeader>
				<table>
					<tbody>
						<tr>
							<td className="user_pincode_title">결제 암호 설정</td>
							<td className="user_pincode_content">
								<button onClick={toggle}>결제 암호 변경</button>
							</td>
						</tr>
					</tbody>
				</table>

				<Modal isOpen={modal} ariaHideApp={false} style={customStyles} onRequestClose={closeModal}>
					<ModalHeader>
						<div className="modal_header_top">
							<h1>결제암호 설정</h1>
							<p onClick={closeModal}>닫기</p>
						</div>
						<p>설절된 비밀번호를 입력해주세요.</p>
					</ModalHeader>
					{pincodeState === 1 ? (
						settingPassword1.length < 6 ? (
							<PassWordSettingContainer>
								<div className="password_setting_content1">
									<div className="password_dot">
										<p style={settingPassword1.length >= 1 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={settingPassword1.length >= 2 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={settingPassword1.length >= 3 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={settingPassword1.length >= 4 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={settingPassword1.length >= 5 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={settingPassword1.length >= 6 ? { backgroundColor: '#8f0ee5' } : {}} />
									</div>
								</div>
								<div className="password_setting_content2">
									{shuffleArray.map((item: any, index: number) => (
										<div
											key={index}
											className={`password_setting_${index}`}
											onClick={() => onClickSetting(item)}
											style={item < 10 ? { cursor: 'pointer' } : {}}
										>
											<p>{item < 10 ? item : ''}</p>
										</div>
									))}
									<div id="delete" onClick={() => setSettingPassword1('')}>
										<p>전체삭제</p>
									</div>
									<div
										id="remove"
										onClick={() => setSettingPassword1(settingPassword1.slice(0, settingPassword1.length - 1))}
									>
										<img id="remove_image" src={profile_password_setting} alt="" />
									</div>
								</div>
							</PassWordSettingContainer>
						) : (
							<PassWordSettingContainer>
								<div className="password_setting_content1">
									{settingState === -1 && <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>}
									<div className="password_dot">
										<p style={settingPassword2.length >= 1 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={settingPassword2.length >= 2 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={settingPassword2.length >= 3 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={settingPassword2.length >= 4 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={settingPassword2.length >= 5 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={settingPassword2.length >= 6 ? { backgroundColor: '#8f0ee5' } : {}} />
									</div>
								</div>
								<div className="password_setting_content2">
									{shuffleArray.map((item: any, index: number) => (
										<div
											key={index}
											className={`password_setting_${index}`}
											onClick={() => onClickSettingCheck(item)}
											style={item < 10 ? { cursor: 'pointer' } : {}}
										>
											<p>{item < 10 ? item : ''}</p>
										</div>
									))}
									<div id="delete2" onClick={() => setSettingPassword2('')}>
										<p>전체삭제</p>
									</div>
									<div
										id="remove2"
										onClick={() => setSettingPassword2(settingPassword2.slice(0, settingPassword2.length - 1))}
									>
										<img id="remove2_image" src={profile_password_setting} alt="" />
									</div>
								</div>
							</PassWordSettingContainer>
						)
					) : (
						<PassWordSettingContainer>
							<div className="password_setting_content1">
								{pincodeState === 0 ? (
									''
								) : pincodeState === 1 ? (
									''
								) : (
									<p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
								)}
								<div className="password_dot">
									<p style={inputPincode.length >= 1 ? { backgroundColor: '#8f0ee5' } : {}} />
									<p style={inputPincode.length >= 2 ? { backgroundColor: '#8f0ee5' } : {}} />
									<p style={inputPincode.length >= 3 ? { backgroundColor: '#8f0ee5' } : {}} />
									<p style={inputPincode.length >= 4 ? { backgroundColor: '#8f0ee5' } : {}} />
									<p style={inputPincode.length >= 5 ? { backgroundColor: '#8f0ee5' } : {}} />
									<p style={inputPincode.length >= 6 ? { backgroundColor: '#8f0ee5' } : {}} />
								</div>
							</div>
							<div className="password_setting_content2">
								{shuffleArray.map((item: any, index: number) => (
									<div
										key={index}
										className={`password_setting_${index}`}
										onClick={() => onClickPincode(item)}
										style={item < 10 ? { cursor: 'pointer' } : {}}
									>
										<p>{item < 10 ? item : ''}</p>
									</div>
								))}
								<div id="delete3" onClick={() => setInputPincode('')}>
									<p id="delete3_p">전체삭제</p>
								</div>
								<div id="remove3" onClick={() => setInputPincode(inputPincode.slice(0, inputPincode.length - 1))}>
									<img id="remove3_image" src={profile_password_setting} alt="" />
								</div>
							</div>
						</PassWordSettingContainer>
					)}
				</Modal>
			</UserPincodeContainer>
			<ButtonContainer>
				<button className="cancle_button" onClick={() => Router.push('/mypage/history')}>
					취소
				</button>
				<button className="complete_button" onClick={onClickChange}>
					적용
				</button>
			</ButtonContainer>
		</MypageProfileWrap>
	);
};

const MypageProfileWrap = styled.div`
	margin: 0px 0px 0px 36px;
	max-width: 100%;

	@media screen and (max-width: 930px) {
		margin: 20px 0px 0px 0px;
	}
`;

const MypageProfileHeader = styled.div`
	& > p {
		margin: 0;
		font-size: 14px;
		font-weight: 500;
	}
`;

const UserInfoContainer = styled.div`
	& > table {
		margin: 10px 0px 0px 0px;
		width: 100%;
		border-top: 0.5px solid #b4b2b2;
		border-bottom: 0.5px solid #b4b2b2;
		border-spacing: 0;
		& > tbody {
			& > tr {
				& > .user_info_title {
					text-align: left;
					border-right: 0.5px solid #b4b2b2;
					font-size: 12px;
					width: 110px;
				}
				& > .user_info_content {
					padding-left: 18px;
					& > p {
						margin: 0;
					}
					& > input {
						height: 36px;
						border: 1px solid #b4b2b2;
						padding: 0px 9px;
						outline: none;
						font-size: 12px;
					}
					& > button {
						margin-right: 7px;
						width: 90px;
						height: 36px;
						border: 1px solid #8f0ee5;
						background-color: #8f0ee5;
						color: #fcfcfc;
						font-size: 12px;
						cursor: pointer;
						outline: none;
					}
					& > small {
						font-size: 11px;
					}
				}
			}

			& > .user_info_table_email {
				& > .user_info_content {
					& > p {
						font-size: 12px;
						margin: 30px 0px;
					}
				}
			}
			& > .user_info_table_nickName,
			.user_info_table_password,
			.user_info_table_password_check {
				& > .user_info_content {
					& > input {
						width: 170px;
						margin: 10px 7px 10px 0px;
					}
				}
			}
			& > .user_info_table_name {
				& > .user_info_content {
					& > p {
						font-size: 12px;
						margin: 10px 0px;
					}
				}
			}
			& > .user_info_table_image {
				& > .user_info_content {
					margin: 30px 0px;
					display: flex;
					& > div {
						background-size: 100% 100%;
						width: 100px;
						height: 100px;
						border-radius: 50%;
						margin: auto 0;
					}
					& > label {
						border: 1px solid;
						width: 80px;
						height: 35px;
						line-height: 35px;
						text-align: center;
						border: 1px solid #e5e5e5;
						color: gray;
						font-size: 12px;
						margin: auto 0px auto 10px;
						& > input[type='file'] {
							display: none;
						}
					}
				}
			}
			& > .user_info_table_address {
				& > .user_info_content {
					& > input {
						width: 325px;
						margin: 7px 0px;
						margin-right: 7px;
					}
					& > #profile_address2 {
						margin-bottom: 25px;
					}
				}
			}
		}
	}

	@media screen and (max-width: 680px) {
		& > table {
			& > tbody {
				& > tr {
					& > .user_info_content {
						& > button {
							width: 80px;
							font-size: 10px;
						}
					}
				}
				& > .user_info_table_nickName,
				.user_info_table_password,
				.user_info_table_password_check {
					& > .user_info_content {
						& > input {
							width: 60%;
						}
					}
				}
				& > .user_info_table_address {
					& > .user_info_content {
						& > input {
							width: 60%;
						}
					}
				}
			}
		}
	}

	@media screen and (max-width: 470px) {
		& > table {
			& > tbody {
				& > tr {
					& > .user_info_title {
						width: 85px;
						font-size: 10px;
					}
					& > .user_info_content {
						& > button {
							width: 80px;
							font-size: 10px;
						}
					}
				}
				& > .user_info_table_nickName,
				.user_info_table_password,
				.user_info_table_password_check {
					& > .user_info_content {
						& > input {
							width: 90%;
						}
					}
				}
				& > .user_info_table_address {
					& > .user_info_content {
						& > input {
							width: 90%;
						}
					}
				}
			}
		}
	}
`;

const UserPincodeContainer = styled.div`
	margin-top: 65px;
	& > table {
		margin: 7px 0px 0px 0px;
		border-spacing: 0px;
		width: 100%;
		border-top: 0.5px solid #b4b2b2;
		border-bottom: 0.5px solid #b4b2b2;
		& > tbody {
			& > tr {
				& > .user_pincode_title {
					width: 110px;
					text-align: left;
					font-size: 12px;
					border-right: 0.5px solid #b4b2b2;
				}
				& > .user_pincode_content {
					padding: 14px 0px 14px 18px;
					& > button {
						font-size: 12px;
						color: #fcfcfc;
						background-color: #8f0ee5;
						border: 1px solid #8f0ee5;
						padding: 0px 23px;
						height: 36px;
						cursor: pointer;
						outline: none;
					}
				}
			}
		}
	}

	@media screen and (max-width: 470px) {
		& > table {
			& > tbody {
				& > tr {
					& > .user_pincode_title {
						width: 85px;
						font-size: 10px;
					}
				}
			}
		}
	}
`;
const ModalHeader = styled.div`
	& > .modal_header_top {
		display: flex;
		justify-content: center;
		position: relative;

		& > h1 {
			font-size: 14px;
			margin: 25px 0px 0px 0px;
		}
		& > p {
			font-size: 9px;
			margin: 0px;
			position: absolute;
			right: 10px;
			top: 10px;
			cursor: pointer;
		}
	}
	& > p {
		font-size: 11px;
		text-align: center;
	}
`;

const PassWordSettingContainer = styled.div`
	margin: 40px 0px 0px 0px;
	& > .password_setting_content1 {
		text-align: center;
		& > .password_dot {
			margin: 0 auto;
			width: 40%;
			display: flex;
			justify-content: space-around;
			& > p {
				margin: auto 0;
				width: 10px;
				height: 10px;
				border: none;
				background-color: #b4b2b2;
				border-radius: 50%;
			}
		}
		& > p {
			font-size: 10px;
			margin: -20px 0px 5px 0px;
		}
	}
	& > .password_setting_content2 {
		margin-top: 25px;
		background-color: #dfafff;
		display: flex;
		flex-wrap: wrap;
		& > div {
			width: 24.7%;
			height: 40px;
			display: flex;
			& > p {
				font-size: 22px;
				color: white;
				font-weight: 500;
				margin: auto;
				object-fit: contain;
			}
		}
		& > .password_setting_0 {
			border-right: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_1 {
			border-right: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_2 {
			border-right: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_3 {
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_4 {
			border-right: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_5 {
			border-right: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_6 {
			border-right: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_7 {
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_8 {
			border-right: 1px solid #e5e5e5;
		}
		& > .password_setting_9 {
			border-right: 1px solid #e5e5e5;
		}
		& > .password_setting_10 {
			border-right: 1px solid #e5e5e5;
		}
		& > #delete,
		#delete2,
		#delete3 {
			border-top: 1px solid #e5e5e5;
			border-right: 1px solid #e5e5e5;
			width: 49.8%;
			cursor: pointer;
			& > p {
				font-size: 16px;
			}
		}
		& > #remove,
		#remove2,
		#remove3 {
			border-top: 1px solid #e5e5e5;
			width: 49.8%;
			cursor: pointer;
			& > img {
				height: 25px;
				margin: auto;
			}
		}
	}
`;

const ButtonContainer = styled.div`
	margin: 85px 0px 145px 0px;
	display: flex;
	justify-content: center;

	& > button {
		width: 87px;
		height: 36px;
		margin: 0px 10px;
		outline: none;
		cursor: pointer;
		color: white;
		font-size: 12px;
	}
	& > .cancle_button {
		border: 1px solid #d89eff;
		background-color: #d89eff;
	}
	& > .complete_button {
		border: 1px solid #8f0ee5;
		background-color: #8f0ee5;
	}
`;

export default MypageProfileComponent;
