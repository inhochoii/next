import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import Modal from 'react-modal';
import bcrypt from 'bcryptjs';
import profile_password_setting from '../../../public/images/profile_password_setting.png';
import { createUser } from '../../../stores/user/types';
import { aes256Encrypt } from '../../../lib/crypto';

interface Props {
	nickNameCheck: (nickname: string) => void;
	nickNameStatus: string;
	emailCheck: (email: string) => void;
	emailStatus: string;
	createUser: (user: createUser) => void;
	businessCheck: (business_num: string) => void;
	businessStatus: number;
	snsEmail: string;
	snsEmailStatus: number;
	smsCert: (receiver: string) => void;
	smsCertCheck: (receiver: string, cert_code: string) => void;
	sendStatus: any;
	certStatus: any;
	randomNum: string;
}
const JoinCompanyComponent: React.FC<Props> = ({
	nickNameCheck,
	nickNameStatus,
	emailCheck,
	emailStatus,
	businessCheck,
	businessStatus,
	createUser,
	snsEmail,
	snsEmailStatus,
	smsCert,
	smsCertCheck,
	sendStatus,
	certStatus,
	randomNum,
}) => {
	const [Allcheck, setAllCheck] = useState<boolean>(false); // 전체 동의
	const [checkTerms, setCheckTerms] = useState<boolean>(false); // 개인정보 이용 동의
	const [checkEvent, setCheckEvent] = useState<boolean>(false); // 이벤트 수신동의

	const [companyName, setCompanyName] = useState<string>('');
	const [companyNumber1, setcompanyNumber1] = useState<string>('');
	const [companyNumber2, setcompanyNumber2] = useState<string>('');
	const [companyNumber3, setcompanyNumber3] = useState<string>('');

	const [email1, setEmail1] = useState<string>('');
	const [email2, setEmail2] = useState<string>('');

	const [nickName, setNickName] = useState<string>('');

	const [manager, setManager] = useState<string>('');

	const [phoneNumber1, setPhoneNumber1] = useState<string>('');
	const [phoneNumber2, setPhoneNumber2] = useState<string>('');
	const [phoneNumber3, setPhoneNumber3] = useState<string>('');

	const [passWord1, setPassWord1] = useState<string>('');
	const [passWord2, setPassWord2] = useState<string>('');

	const [zipCode, setZipcode] = useState<string>(''); // 우편번호
	const [basicAddress, setBasicAddress] = useState<string>(''); // 기본주소
	const [detailAddress, setDetailAddress] = useState<string>(''); // 상세주소

	const [inputCertificationNumber, setInputCertificationNumber] = useState<string>(''); // 인증번호 입력값
	const [countSeconds, setCountSeconds] = useState<any>('60');

	const [inputEmailCert, setInputEmailCert] = useState<string>(''); // 이메일 인증 입력값
	const [emailCertStatus, setEmailCertStatus] = useState<number>(0);

	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
	useEffect(() => {
		if (snsEmail !== '') {
			const specialWordLocation = snsEmail.indexOf('@'); // @ 문자열 찾기
			setEmail1(snsEmail.slice(0, specialWordLocation));
			setEmail2(snsEmail.slice(specialWordLocation + 1, snsEmail.length));
			// setCertificationState(snsEmailStatus);
		}
	}, [snsEmail, snsEmailStatus]);
	// 이용약관 체크
	const onChangeTerms = (data: string) => {
		if (data === 'all') {
			setAllCheck(!Allcheck);
			if (!Allcheck) {
				setCheckTerms(true);
				setCheckEvent(true);
			} else {
				setCheckTerms(false);
				setCheckEvent(false);
			}
		} else if (data === 'info') {
			setCheckTerms(!checkTerms);
		} else if (data === 'c_event') {
			setCheckEvent(!checkEvent);
		}
	};

	// input change
	const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.id === 'company_name') {
			setCompanyName(e.target.value);
		} else if (e.target.id === 'company_number1') {
			setcompanyNumber1(e.target.value);
		} else if (e.target.id === 'company_number2') {
			setcompanyNumber2(e.target.value);
		} else if (e.target.id === 'company_number3') {
			setcompanyNumber3(e.target.value);
		} else if (e.target.id === 'email1') {
			setEmail1(e.target.value);
		} else if (e.target.id === 'email2') {
			setEmail2(e.target.value);
		} else if (e.target.id === 'nickName') {
			setNickName(e.target.value);
		} else if (e.target.id === 'manager') {
			setManager(e.target.value);
		} else if (e.target.id === 'phone_number1') {
			setPhoneNumber1(e.target.value);
			if (e.target.value.length === 3) {
				document.getElementById('phone_number2')?.focus();
			}
		} else if (e.target.id === 'phone_number2') {
			setPhoneNumber2(e.target.value);
			if (e.target.value.length === 4) {
				document.getElementById('phone_number3')?.focus();
			}
		} else if (e.target.id === 'phone_number3') {
			setPhoneNumber3(e.target.value);
		} else if (e.target.id === 'passWord1') {
			setPassWord1(e.target.value);
		} else if (e.target.id === 'passWord2') {
			setPassWord2(e.target.value);
		} else if (e.target.id === 'detail_Address') {
			setDetailAddress(e.target.value);
		} else if (e.target.id === 'certification') {
			setInputCertificationNumber(e.target.value);
		} else if (e.target.id === 'inputEmailCert') {
			setInputEmailCert(e.target.value);
		}
	}, []);

	const onChangeSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setEmail2(e.target.value);
	}, []);

	const onClickButton = (data: string) => {
		const regExp = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // email 유효성검사

		const totalCompanyNumber = companyNumber1 + companyNumber2 + companyNumber3;
		const totalEmail = `${email1}@${email2}`;
		if (data === 'company_number') {
			if (companyNumber1 !== '' && companyNumber2 !== '' && companyNumber3 !== '') {
				businessCheck(totalCompanyNumber);
			} else {
				alert('사업자번호를 입력해 주세요');
			}
		}
		if (data === 'email') {
			if (regExp.test(totalEmail)) {
				emailCheck(aes256Encrypt(totalEmail));
			} else {
				alert('e메일 형식을 맞춰주세요');
			}
		}

		if (data === 'nickName') {
			if (nickName === '') {
				alert('닉네임을 입력해 주세요.');
			} else {
				nickNameCheck(nickName);
			}
		}

		if (data === 'send_sms') {
			if (phoneNumber1.length !== 3 || phoneNumber2.length !== 4 || phoneNumber3.length !== 4) {
				alert('휴대폰번호를 정확하게 입력해주세요.');
			} else {
				smsCert(phoneNumber1 + phoneNumber2 + phoneNumber3);
				if (sendStatus.status === '1') {
					setCountSeconds('60');
				}
			}
		}

		if (data === 'certification_check') {
			if (sendStatus.status === '1') {
				smsCertCheck(phoneNumber1 + phoneNumber2 + phoneNumber3, inputCertificationNumber);
			} else {
				alert('인증번호가 전송되지 않았습니다.');
			}
		}

		if (data === 'inputEmailCert') {
			if (emailStatus === 'suc') {
				if (inputEmailCert === '') {
					alert('인증번호를 입력해주세요.');
				} else {
					if (inputEmailCert === randomNum) {
						setEmailCertStatus(1);
					} else {
						setEmailCertStatus(-1);
					}
				}
			} else {
				alert('인증번호가 전송되지 않았습니다.');
			}
		}
	};

	const handleComplete = (data: any) => {
		setZipcode(data.zonecode);
		if (data.buildingName === '') {
			setBasicAddress(data.address);
		} else {
			setBasicAddress(`${data.address} (${data.buildingName})`);
		}
		setModal(!modal);
		document.getElementById('detail_Address')?.focus();
	};

	const onClickComplete = () => {
		const check: any = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&]).{7,}.$/; // password 정규식
		const user: createUser = {
			email: aes256Encrypt(`${email1}@${email2}`),
			password: bcrypt.hashSync(passWord1, 12),
			pin_code: bcrypt.hashSync(settingPassword1, 12),
			name: aes256Encrypt(manager),
			nickname: nickName,
			nation: 'ko',
			phone: aes256Encrypt(phoneNumber1 + phoneNumber2 + phoneNumber3),
			fcm: 'N',
			addr_prop: 'd',
			addr_zip: zipCode,
			addr_road: basicAddress,
			addr_detail: detailAddress,
			business_num: companyNumber1 + companyNumber2 + companyNumber3,
		};
		if (companyName === '') {
			alert('회사명을 입력해 주세요.');
			document.getElementById('company_name')?.focus();
		} else if (businessStatus !== 1) {
			alert('사업자 번호가 맞는지 확인해 주세요.');
			document.getElementById('company_number1')?.focus();
		} else if (emailStatus !== 'suc' && snsEmail === '') {
			alert('email 중복확인을 해주세요.');
			document.getElementById('email1')?.focus();
		} else if (emailCertStatus !== 1 && snsEmail === '') {
			alert('email이 인증되지 않았습니다.');
			document.getElementById('inputEmailCert')?.focus();
		} else if (nickNameStatus !== 'suc') {
			alert('닉네임 중복확인을 해주세요.');
			document.getElementById('nickName')?.focus();
		} else if (manager === '') {
			alert('담당자를 입력해주세요.');
			document.getElementById('manager')?.focus();
		} else if (
			isNaN(Number(phoneNumber1 + phoneNumber2 + phoneNumber3)) ||
			(phoneNumber1 + phoneNumber2 + phoneNumber3).length !== 11
		) {
			alert('휴대폰번호를 정확히 입력해주세요.');
			document.getElementById('phone_number1')?.focus();
		} else if (certStatus.status !== '1') {
			alert('휴대폰번호를 인증해주세요.');
		} else if (passWord1 !== passWord2) {
			alert('비밀번호가 맞는지 확인해 주세요.');
			document.getElementById('passWord1')?.focus();
		} else if (check.test(passWord1) === false) {
			alert('영문, 숫자, 특수문자를 포함 8자 이상을 입력해 주세요.');
			document.getElementById('passWord1')?.focus();
		} else if (zipCode === '' || basicAddress === '' || detailAddress === '') {
			alert('주소를 입력해 주세요.');
		} else if (!checkTerms) {
			alert('필수 이용약관 동의하지 않았습니다.');
		} else if (settingState !== 1) {
			alert('결제암호가 설정되지 않았습니다.');
		} else {
			createUser(user);
		}
	};

	// 결제암호설정
	const [passWordModal, setPassWordModal] = useState<boolean>(false);
	const [settingPassword1, setSettingPassword1] = useState<string>('');
	const [settingPassword2, setSettingPassword2] = useState<string>('');
	const [settingState, setSettingState] = useState<number>(0);
	const passWordSettingToggle = () => {
		setPassWordModal(!passWordModal);
		setSettingPassword1('');
		setSettingPassword2('');
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
	const onClickDelete = (e: any) => {
		const { id } = e.target;
		if (id === 'delete') {
			setSettingPassword1('');
		}
		if (id === 'delete_p') {
			setSettingPassword1('');
		}
		if (id === 'delete2') {
			setSettingPassword2('');
		}
		if (id === 'delete2_p') {
			setSettingPassword2('');
		}
		if (id === 'remove') {
			setSettingPassword1(settingPassword1.slice(0, settingPassword1.length - 1));
		}
		if (id === 'remove_image') {
			setSettingPassword1(settingPassword1.slice(0, settingPassword1.length - 1));
		}
		if (id === 'remove2') {
			setSettingPassword2(settingPassword2.slice(0, settingPassword2.length - 1));
		}
		if (id === 'remove2_image') {
			setSettingPassword2(settingPassword2.slice(0, settingPassword2.length - 1));
		}
	};
	useEffect(() => {
		if (settingPassword1.length === 6 && settingPassword2.length === 6) {
			if (settingPassword1 !== settingPassword2) {
				setSettingPassword2('');
				setSettingState(-1);
			} else {
				setSettingState(1);
				setPassWordModal(false);
			}
		}
	}, [settingPassword1, settingPassword2]);
	const onClickSettingCheck = (num: number) => {
		if (settingPassword2.length < 6) {
			if (num < 10) {
				setSettingPassword2(settingPassword2 + num);
			}
		}
	};
	const customStyles = {
		overlay: {
			backgroundColor: 'rgba(0,0,0,0.5)',
		},
		content: {
			left: '0',
			margin: 'auto',
			width: window.innerWidth <= 414 ? '100%' : '500px',
			height: '600px',
			padding: '0',
			overflow: 'hidden',
		},
	};

	const passwordStyles = {
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

	const closeModal = () => {
		setModal(false);
	};
	const closePassWordModal = () => {
		setPassWordModal(false);
	};

	useEffect(() => {
		if (sendStatus.status === '1') {
			if (Number(countSeconds) > 0) {
				const value = setInterval(() => {
					setCountSeconds(countSeconds > 10 ? Number(countSeconds - 1) : `0${Number(countSeconds - 1)}`);
				}, 1000);
				return () => clearInterval(value);
			}
		}
	}, [countSeconds, sendStatus]);
	return (
		<div className="join_company">
			<p>
				<span className="join_person_top_info_s1">회사정보</span>
				<span className="join_person_top_info_s2">
					<span className="point">●</span>필수입력사항
				</span>
			</p>
			<table>
				<tbody>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>회사명</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								<input type="text" value={companyName} onChange={onChangeInput} id="company_name" />
							</p>
						</td>
					</tr>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>사업자번호</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								<input type="text" value={companyNumber1} onChange={onChangeInput} id="company_number1" />
								<small>-</small>
								<input type="text" value={companyNumber2} onChange={onChangeInput} id="company_number2" />
								<small>-</small>
								<input type="text" value={companyNumber3} onChange={onChangeInput} id="company_number3" />
								<button onClick={() => onClickButton('company_number')} className="company_confirm_button">
									확인
								</button>
								{businessStatus === 0 ? (
									<span />
								) : businessStatus === 1 ? (
									<span style={{ color: '#1f9a08' }}>사용가능한 사업자번호 입니다.</span>
								) : (
									<span style={{ color: 'red' }}>이미 사용중인 사업자번호 입니다.</span>
								)}
							</p>
						</td>
					</tr>
					<tr>
						<td className="table_title" rowSpan={2}>
							<p>
								<span className="point">●</span>
								<span>아이디</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								{snsEmail === '' ? (
									emailCertStatus===1?
									<input type="text" value={email1} id="email1" readOnly style={{ backgroundColor: '#e5e5e5' }}/>
									:
									<input type="text" value={email1} onChange={onChangeInput} id="email1" />
								) : (
									<input
										type="text"
										value={email1}
										onChange={onChangeInput}
										id="email1"
										readOnly
										style={{ backgroundColor: '#e5e5e5' }}
									/>
								)}
								<small>@</small>
								{snsEmail === '' ? (
									emailCertStatus===1?
									<input type="text" value={email2} id="email2" readOnly style={{ backgroundColor: '#e5e5e5' }}/>
									:
									<input type="text" value={email2} onChange={onChangeInput} id="email2" />
								) : (
									<input
										type="text"
										value={email2}
										onChange={onChangeInput}
										id="email2"
										readOnly
										style={{ backgroundColor: '#e5e5e5' }}
									/>
								)}
								{snsEmail === '' ? (
									emailCertStatus!==1&&
									<select onChange={onChangeSelect}>
										<option value="">직접입력</option>
										<option value="naver.com">naver.com</option>
										<option value="gmail.com">gmail.com</option>
										<option value="daum.net">daum.net</option>
									</select>
								) : (
									''
								)}
								{snsEmail === '' ? emailCertStatus!==1&&<button onClick={() => onClickButton('email')}>인증번호 전송</button> : ''}
								{snsEmail === '' ? (
									emailStatus === '' ? (
										<span />
									) : emailStatus === 'suc' ? (
										emailCertStatus!==1&&<span style={{ color: '#1f9a08' }}>인증번호가 전송되었습니다.</span>
									) : (
										<span style={{ color: 'red' }}>이미 사용중인 e-mail 입니다.</span>
									)
								) : (
									''
								)}
							</p>
						</td>
					</tr>
					<tr>
						<td className="table_content">
							<p>
								{snsEmail === '' ? (
									<>
										{emailCertStatus!==1&&
										<>
										<input type="text" value={inputEmailCert} id="inputEmailCert" onChange={onChangeInput} />
										<button onClick={() => onClickButton('inputEmailCert')}>인증확인</button>
										</>
										}
										{emailCertStatus === 0 ? (
											''
										) : emailCertStatus === 1 ? (
											<span style={{ color: 'rgb(31,154,8)' }}>인증되었습니다.</span>
										) : (
											<span style={{ color: 'red' }}>인증번호가 일치하지 않습니다.</span>
										)}
									</>
								) : (
									<span style={{ color: 'rgb(31,154,8)' }}>sns 계정정보가 확인되었습니다.</span>
								)}
							</p>
						</td>
					</tr>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>닉네임</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								<input type="text" style={{ width: '140px' }} id="nickName" value={nickName} onChange={onChangeInput} />
								<button onClick={() => onClickButton('nickName')}>중복확인</button>
								{nickNameStatus === '' ? (
									<span />
								) : nickNameStatus === 'suc' ? (
									<span style={{ color: '#1f9a08' }}>사용가능한 닉네임 입니다.</span>
								) : (
									<span style={{ color: 'red' }}>이미 사용된 닉네임 입니다.</span>
								)}
							</p>
						</td>
					</tr>
				</tbody>
			</table>

			<p style={{ marginTop: '80px' }}>
				<span className="join_person_top_info_s1">본인 실명인증</span>
				<span className="join_person_top_info_s2">
					<span className="point">●</span>필수입력사항
				</span>
			</p>
			<table>
				<tbody>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>담당자</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								<input type="text" value={manager} onChange={onChangeInput} id="manager" />
								<span>*담당자 이름을 입력해주세요.</span>
							</p>
						</td>
					</tr>
					<tr>
						<td rowSpan={2} className="table_title">
							<p>
								<span className="point">●</span>
								<span>핸드폰번호</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								{certStatus.status === '1' ?
								<input type="text" value={phoneNumber1} id="phone_number1" maxLength={3} readOnly style={{ backgroundColor: '#e5e5e5' }} />
								:
								<input type="text" value={phoneNumber1} onChange={onChangeInput} id="phone_number1" maxLength={3} />}
								<small>-</small>
								{certStatus.status === '1' ?
									<input type="text" value={phoneNumber2} id="phone_number2" maxLength={4} readOnly style={{ backgroundColor: '#e5e5e5' }} />
									:
									<input type="text" value={phoneNumber2} onChange={onChangeInput} id="phone_number2" maxLength={4} />
								}
								<small>-</small>
								{certStatus.status === '1' ?
									<input type="text" value={phoneNumber3} id="phone_number3" maxLength={4} readOnly style={{ backgroundColor: '#e5e5e5' }} />
									:
									<input type="text" value={phoneNumber3} onChange={onChangeInput} id="phone_number3" maxLength={4} />
								}
								{certStatus.status !=='1'&&
								<button onClick={() => onClickButton('send_sms')} className="send_sms_button">
									인증번호 전송
								</button>}
								{sendStatus.status === '1' ? (
									certStatus.status !=='1'&&<span style={{ color: 'rgb(31,154,8)' }}>인증번호가 전송되었습니다.</span>
								) : (
									<span>{sendStatus.msg}</span>
								)}
							</p>
						</td>
					</tr>
					<tr>
						<td className="table_content">
							<div>
								{certStatus.status !=='1' &&
								<>
								<div>
									<input type="text" id="certification" value={inputCertificationNumber} onChange={onChangeInput} />
									{sendStatus.status === '1' && certStatus.status !== '1' ? (
										<span>{countSeconds > 0 ? `00:${countSeconds}` : '만료'}</span>
									) : (
										''
									)}
								</div>
								<button onClick={() => onClickButton('certification_check')}>인증확인</button>
								</>}
								{certStatus.status === '1' ? (
									<span style={{ color: 'rgb(31,154,8)' }}>인증되었습니다.</span>
								) : (
									<span>{certStatus.msg}</span>
								)}
							</div>
						</td>
					</tr>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>비밀번호</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								<input type="password" id="passWord1" value={passWord1} onChange={onChangeInput} />
								<span>* 영문,숫자,특수문자를 포함 8자 이상을 입력해 주세요.</span>
							</p>
						</td>
					</tr>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>비밀번호 확인</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								<input type="password" id="passWord2" value={passWord2} onChange={onChangeInput} />
								{passWord1.length < 8 || passWord2.length < 8 ? (
									''
								) : passWord1 === passWord2 ? (
									<span>비밀번호가 일치 합니다.</span>
								) : (
									<span style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</span>
								)}
							</p>
						</td>
					</tr>
					<tr>
						<td rowSpan={3} className="table_title">
							<p>
								<span className="point">●</span>
								<span>주소</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								<input type="text" placeholder="우편번호" readOnly value={zipCode} id="postCode" />
								<button onClick={toggle} id="post_search">
									우편번호 검색
								</button>
								<Modal isOpen={modal} ariaHideApp={false} style={customStyles} onRequestClose={closeModal}>
									<ModalHeader>
										<div className="modal_header_top">
											<h1>우편번호 검색</h1>
											<p onClick={closeModal}>닫기</p>
										</div>
									</ModalHeader>
									<DaumPostcode onComplete={handleComplete} height="100%" />
								</Modal>
							</p>
						</td>
					</tr>
					<tr>
						<td className="table_zipcode_content">
							<p>
								<input type="text" placeholder="기본 주소를 입력해주세요." readOnly value={basicAddress} />
							</p>
						</td>
					</tr>
					<tr>
						<td className="table_zipcode_content">
							<p>
								<input
									type="text"
									placeholder="상세 주소를 입력해주세요."
									id="detail_Address"
									value={detailAddress}
									onChange={onChangeInput}
								/>
							</p>
						</td>
					</tr>
				</tbody>
			</table>

			<p style={{ marginTop: '80px' }}>
				<span className="join_person_top_info_s1">결제 암호 설정</span>
				<span className="join_person_top_info_s2">
					<span className="point">●</span>필수입력사항
				</span>
			</p>
			<table>
				<tbody>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>결제 암호 설정</span>
							</p>
						</td>
						<td className="table_content">
							{settingState === 1 ? (
								<span style={{ marginLeft: '10px', fontSize: '12px' }}>설정되었습니다.</span>
							) : (
								<button id="table_content_password_setting" onClick={passWordSettingToggle}>
									암호설정하기
								</button>
							)}
						</td>
					</tr>
				</tbody>
			</table>

			<Modal isOpen={passWordModal} ariaHideApp={false} style={passwordStyles} onRequestClose={closePassWordModal}>
				<ModalHeader>
					<div className="modal_header_top">
						<h1>결제암호 설정</h1>
						<p onClick={closePassWordModal}>닫기</p>
					</div>
					{settingPassword1.length<6?<p>비밀번호를 입력해주세요.</p>:<p>비밀번호를 한번 더 입력해주세요.</p>}
				</ModalHeader>
				{settingPassword1.length < 6 ? (
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
							<div id="delete" onClick={onClickDelete}>
								<p onClick={onClickDelete} id="delete_p">
									전체삭제
								</p>
							</div>
							<div id="remove" onClick={onClickDelete}>
								<img id="remove_image" src={profile_password_setting} alt="" />
							</div>
						</div>
					</PassWordSettingContainer>
				) : (
					<PassWordSettingContainer>
						<div className="password_setting_content1">
							{settingState === -1 && <p style={{ color: 'red' }}>결제 암호가 맞지않습니다.</p>}
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
							<div id="delete2" onClick={onClickDelete}>
								<p id="delete2_p" onClick={onClickDelete}>
									전체삭제
								</p>
							</div>
							<div id="remove2" onClick={onClickDelete}>
								<img id="remove2_image" onClick={onClickDelete} src={profile_password_setting} alt="" />
							</div>
						</div>
					</PassWordSettingContainer>
				)}
			</Modal>

			<JoinTermsContainer>
				<JoinTermContent>
					<div className="join_term_all_d">
						<p>
							<label>
								약관 전체 동의
								<input type="checkbox" id="all" onChange={() => onChangeTerms('all')} />
								<span className="checkmark"></span>
							</label>
						</p>
					</div>
					<div className="join_term_select_d">
						<p>
							<label>
								개인 정보 수집 및 이용 동의(필수)
								<input type="checkbox" id="info" checked={checkTerms} onChange={() => onChangeTerms('info')} />
								<span className="checkmark"></span>
							</label>
							<button onClick={() => window.open('/policy', '개인 정보 수집 및 이용동의', 'width=500, height=500')}>
								자세히보기
							</button>
						</p>
						<p>
							<label>
								이벤트 등 프로모션 알림 수신(선택)
								<input type="checkbox" id="c_event" checked={checkEvent} onChange={() => onChangeTerms('c_event')} />
								<span className="checkmark"></span>
							</label>
						</p>
					</div>
				</JoinTermContent>
			</JoinTermsContainer>
			<JoinCompleteButton>
				<button onClick={onClickComplete}>베리스토어 회원가입</button>
			</JoinCompleteButton>
		</div>
	);
};

const JoinCompleteButton = styled.div`
	margin: 122px 0px 342px 0px;
	text-align: center;
	& > button {
		width: 295px;
		height: 76px;
		border: none;
		background-color: #8f0ee5;
		color: white;
		font-weight: 500;
		font-size: 20px;
		cursor: pointer;
	}
	@media screen and (max-width: 500px) {
		margin: 50px 0px 100px 0px;
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
const JoinTermsContainer = styled.div`
	margin-top: 90px;
	width: 100%;
	border: 1px solid #b4b2b2;
	height: 172px;
	display: flex;
`;

const JoinTermContent = styled.div`
	width: 650px;
	margin: auto;
	display: flex;
	justify-content: space-between;
	& > div {
		& > p {
			display: flex;
			& > label {
				font-size: 14px !important;
				display: block;
				position: relative;
				padding-left: 35px;
				margin-bottom: 12px;
				cursor: pointer;
				font-size: 22px;
				-webkit-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;

				& > input {
					position: absolute;
					opacity: 0;
					cursor: pointer;
					height: 0;
					width: 0;
				}
				& > .checkmark {
					margin-top: -3.5px;
					position: absolute;
					top: 0;
					left: 0;
					height: 23px;
					width: 23px;
					background-color: #ffffff;
					border: 1px solid #b4b2b2;
					&::after {
						content: '';
						position: absolute;
						display: none;
					}
				}
				& > input:checked ~ .checkmark {
					background-color: #8f0ee5;
				}
				& > input:checked ~ .checkmark:after {
					display: block;
				}
				& > .checkmark::after {
					left: 8px;
					top: 4px;
					width: 5px;
					height: 10px;
					border: solid white;
					border-width: 0 3px 3px 0;
					-webkit-transform: rotate(45deg);
					-ms-transform: rotate(45deg);
					transform: rotate(45deg);
				}
			}
			& > button {
				border: 1px solid #333333;
				background-color: #333333;
				color: #ffffff;
				font-size: 12px;
				margin: -2px 0px 0px 10px;
				height: 25px;
				cursor: pointer;
				outline: none;
			}
		}
	}
	& > .join_term_all_d {
		display: flex;
		& > p {
			margin: auto 0;
		}
	}

	@media screen and (max-width: 750px) {
		width: calc(100% - 20px);
	}

	@media screen and (max-width: 550px) {
		display: block;
		& > div {
			margin: 0 auto;
			& > p {
				& > input {
					width: 20px;
					height: 20px;
				}
				& > span {
					font-size: 12px;
				}
			}
		}
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

export default JoinCompanyComponent;
