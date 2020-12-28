import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import bcrypt from 'bcryptjs';
import { aes256Encrypt } from '../../../lib/crypto';
import profile_password_setting from '../../../public/images/profile_password_setting.png';
import Select from 'react-select';
import countryList from 'react-select-country-list'

interface Props {
	nickNameCheck: (nickname: string) => void;
	nickNameStatus: string;
	emailCheck: (email: string) => void;
	emailStatus: string;
	randomNum: string;
	createUserByForegion:(user:any)=>void;
}

const JoinPersonComponent: React.FC<Props> = ({
	nickNameCheck,
	nickNameStatus,
	emailCheck,
	emailStatus,
	randomNum,
	createUserByForegion
}) => {
	const option = countryList().getData();
	const [email1, setEmail1] = useState<string>(''); // 이메일 @앞
	const [email2, setEmail2] = useState<string>(''); // 이메일 @뒤

	const [nickName, setNickName] = useState<string>(''); // 닉네임
	const [passWord, setpassWord] = useState<string>(''); // 패스워드
	const [passWordCheck, setpassWordCheck] = useState<string>(''); // 패스워드 확인

	const [userName, setUserName] = useState<string>('');

	const [Allcheck, setAllCheck] = useState<boolean>(false); // 전체 동의
	const [checkTerms, setCheckTerms] = useState<boolean>(false); // 개인정보 이용 동의
	const [checkEvent, setCheckEvent] = useState<boolean>(false); // 이벤트 수신동의

	const [inputEmailCert, setInputEmailCert] = useState<string>(''); // 이메일 인증 입력값
	const [emailCertStatus, setEmailCertStatus] = useState<number>(0);

	const [passportNumber, setPassportNumber] = useState<string>('');
	const [country, setCountry] = useState<any>('');
	const [passportImage, setPassportImage] = useState<any>();
	const [typeSelection, setTypeSelection] = useState<string>('Passport');
	// 이용약관 체크
	const onChangeAllCheck = () => {
		setAllCheck(!Allcheck);
		if (!Allcheck) {
			setCheckTerms(true);
			setCheckEvent(true);
		} else {
			setCheckTerms(false);
			setCheckEvent(false);
		}
	};

	// 이메일 @앞 변경값
	const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail1(e.target.value);
	}, []);

	// email @뒤 직접 입력시 변경
	const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail2(e.target.value);
	}, []);

	// password 변경
	const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.id === 'passWord') {
			setpassWord(e.target.value);
		} else if (e.target.id === 'passWordCheck') {
			setpassWordCheck(e.target.value);
		}
	}, []);

	const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.id === 'nickName') {
			setNickName(e.target.value);
		} else if (e.target.id === 'user_name') {
			setUserName(e.target.value);
		} else if (e.target.id === 'inputEmailCert') {
			setInputEmailCert(e.target.value);
		} else if (e.target.id ==='passportNumber'){
			setPassportNumber(e.target.value);
		}
	}, []);

	const onClickButton = (count: number) => {
		const regExp = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // email 유효성검사
		const email: any = `${email1}@${email2}`;
		if (count === 1) {
			if (regExp.test(`${email1}@${email2}`) === true) {
				emailCheck(aes256Encrypt(email));
			} else {
				alert('Please set the e-mail format.');
			}
		}

		if (count === 2) {
			if (nickName === '') {
				alert('Please enter your nickname.');
			} else {
				nickNameCheck(nickName);
			}
		}

		if (count === 5) {
			if (emailStatus === 'suc') {
				if (inputEmailCert === '') {
					alert('Please enter your verification number.');
				} else {
					if (inputEmailCert === randomNum) {
						setEmailCertStatus(1);
					} else {
						setEmailCertStatus(-1);
					}
				}
			} else {
				alert('The verification number has not been sent.');
			}
		}
	};
	const onClickComplete = () => {
		const user: any ={
			email: aes256Encrypt(`${email1}@${email2}`),
			password: bcrypt.hashSync(passWord, 12),
			pin_code: bcrypt.hashSync(settingPassword1, 12),
			name: aes256Encrypt(userName),
			nickname: nickName,
			nation:String(country.value),
			phone: aes256Encrypt(""),
			fcm: 'N',
			passport: passportNumber,
			image:passportImage
		}
		const check: any = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&]).{7,}.$/;
		if (emailStatus !== 'suc') {
			alert('Your email has not been verified.');
			document.getElementById('email')?.focus();
		} else if (emailCertStatus !== 1) {
			alert('Your email has not been verified.');
			document.getElementById('inputEmailCert')?.focus();
		} else if (nickNameStatus !== 'suc') {
			alert('Please check the duplicate nickname.');
			document.getElementById('nickName')?.focus();
		} else if (passWord !== passWordCheck) {
			alert('Please check if the password is correct.');
			document.getElementById('passWord')?.focus();
		} else if (check.test(passWord) === false) {
			alert('Please enter at least 8 characters including English, numbers, and special characters.');
			document.getElementById('passWord')?.focus();
		} else if (userName === '') {
			alert('Please input your name.');
			document.getElementById('user_name')?.focus();
		} else if (settingState !== 1) {
			alert('Pincode number has not been set.');
		} else if (passportNumber===''){
			alert("Please enter your passport number.");
			document.getElementById('passportNumber')?.focus();
		} else if (country===''){
			alert("Please select a country");
		} else if(!passportImage){
			alert("Please upload a passport image.");
		} else if (!checkTerms) {
			alert('I have not agreed to the required terms and conditions.');
		} 
		else {
			createUserByForegion(user);
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
	const closePassWordModal = () => {
		setPassWordModal(false);
	};

	const countryChangeHandler = (value) =>{
		setCountry(value);
	}

	const onChangeFile = (e:any) =>{
		setPassportImage(e.target.files[0]);
	}
	const onChangeSelect = (e:any) =>{
		setTypeSelection(e.target.value);
	}
	return (
		<ForegionWrap>
			<p>
				<span className="join_person_top_info_s1">Information</span>
				<span className="join_person_top_info_s2">
					<span className="point">●</span>Required fields
				</span>
			</p>
			<table>
				<tbody>
					<tr>
						<td className="table_title" rowSpan={2}>
							<p>
								<span className="point">●</span>
								<span>ID</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								{emailCertStatus===1?
								<input type="text" value={email1} id="email" readOnly style={{ backgroundColor: '#e5e5e5' }}/>
								:
								<input type="text" onChange={onChangeId} value={email1} id="email" />
								}
								<small style={{ color: '#b4b2b2' }}>@</small>
								{emailCertStatus===1?
								<input type="text" value={email2} id="email2" readOnly style={{ backgroundColor: '#e5e5e5' }}/>
								:
								<input type="text" value={email2} onChange={onChangeEmail} id="email2" />}
								{emailCertStatus!==1&&<button onClick={() => onClickButton(1)}>Enter</button>}
								{emailStatus === '' ? (
									<span />
								) : emailStatus === 'dup' ? (
									<span style={{ color: 'red' }}>This email is already in use.</span>
								) : (
									emailCertStatus!==1&&<span style={{ color: 'rgb(31,154,8)' }}>The verification number has been sent.</span>
								)}
							</p>
						</td>
					</tr>
					<tr>
						<td className="table_content">
							<p>
								{emailCertStatus!==1&&
								<>
									<input type="text" value={inputEmailCert} id="inputEmailCert" onChange={onChangeHandler} />
									<button onClick={() => onClickButton(5)}>Confirm</button>
								</>
								}
								{emailCertStatus === 0 ? (
									''
								) : emailCertStatus === 1 ? (
									<span style={{ color: 'rgb(31,154,8)' }}>Certified</span>
								) : (
									<span style={{ color: 'red' }}>The authentication number does not match.</span>
								)}
							</p>
						</td>
					</tr>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>Nick Name</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								<input type="text" onChange={onChangeHandler} value={nickName} id="nickName" />
								<button onClick={() => onClickButton(2)}>Confirm</button>
								{nickNameStatus === '' ? (
									<span />
								) : nickNameStatus === 'dup' ? (
									<span style={{ color: 'red' }}>This Username is already using.</span>
								) : (
									<span style={{ color: 'rgb(31,154,8)' }}>Available Username</span>
								)}
							</p>
						</td>
					</tr>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>Password</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								<input type="password" onChange={onChangePassword} id="passWord" />
								<small>* Please enter at least 8 characters including English, numbers, and special characters.</small>
							</p>
						</td>
					</tr>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>
									Re-Enter
									<br />
									Password
								</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								<input type="password" onChange={onChangePassword} id="passWordCheck" />
								{passWord.length < 8 || passWordCheck.length < 8 ? (
									''
								) : passWord === passWordCheck ? (
									<span>The passwords match.</span>
								) : (
									<span style={{ color: 'red' }}>Passwords do not match.</span>
								)}
							</p>
						</td>
					</tr>
				</tbody>
			</table>
			<p style={{ marginTop: '80px' }}>
				<span className="join_person_top_info_s1">Identity verification</span>
				<span className="join_person_top_info_s2">
					<span className="point">●</span>Required fields
				</span>
			</p>
			<table>
				<tbody>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>Full Name</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								<input type="text" id="user_name" onChange={onChangeHandler} value={userName} />
							</p>
						</td>
					</tr>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>Country</span>
							</p>
						</td>
						<td className="table_content">
							<div className="country_content">
							<Select
								options={option}
								value={country}
								onChange={countryChangeHandler}
								className="country"
							/>
							</div>
						</td>
					</tr>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>Type<br />Selection</span>
							</p>
						</td>
						<td className="table_content">
							<div className="type_selection_content">
									<select value={typeSelection} onChange={onChangeSelect}>
										<option value="Passport">Passport</option>
										<option value="DriveLicense">DriveLicense</option>
										<option value="Identification">Identification</option>
									</select>
							</div>
						</td>
					</tr>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>{typeSelection}<br />Number</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								<input type="text" id="passportNumber" onChange={onChangeHandler} value={passportNumber} />
							</p>
						</td>
					</tr>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>{typeSelection}<br />Scan picture</span>
							</p>
						</td>
						<td className="table_content">
							<p>
								<span style={{color:"#333333"}}>File : {passportImage?passportImage.name:"None image"}</span>
								<label>
									<span>File search</span>
									<input type="file" onChange={onChangeFile} />
								</label>
								<span>
									(upload : png, jpg)
								</span>
							</p>
						</td>
					</tr>
				</tbody>
			</table>

			<p style={{ marginTop: '80px' }}>
				<span className="join_person_top_info_s1">Set payment password</span>
				<span className="join_person_top_info_s2">
					<span className="point">●</span>Required fields
				</span>
			</p>
			<table>
				<tbody>
					<tr>
						<td className="table_title">
							<p>
								<span className="point">●</span>
								<span>Set password</span>
							</p>
						</td>
						<td className="table_content">
							{settingState === 1 ? (
								<span style={{ marginLeft: '10px', fontSize: '12px' }}>The payment password has been set.</span>
							) : (
								<button id="table_content_password_setting" onClick={passWordSettingToggle}>
									Set password
								</button>
							)}
						</td>
					</tr>
				</tbody>
			</table>
			<Modal isOpen={passWordModal} ariaHideApp={false} style={passwordStyles} onRequestClose={closePassWordModal}>
				<ModalHeader>
					<div className="modal_header_top">
						<h1>PIN Password</h1>
						<p onClick={closePassWordModal}>cancle</p>
					</div>
					{settingPassword1.length<6?<p>Please enter the pin number.</p>:<p>Please enter the pin number again.</p>}
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
									Remove All
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
							{settingState === -1 && <p style={{ color: 'red' }}>The pin numbers do not match.</p>}
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
									Remove All
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
								{`I Agree to all Terms of Policy & Privacy Policy`}
								<input type="checkbox" id="check_all" onChange={onChangeAllCheck} />
								<span className="checkmark"></span>
							</label>
						</p>
					</div>
					<div className="join_term_select_d">
						<p>
							<label>
								{`I agree to the Privacy Policy (necessary) `}
								<input type="checkbox" id="info" checked={checkTerms} onChange={() => setCheckTerms(!checkTerms)} />
								<span className="checkmark"></span>
							</label>
							<button onClick={() => window.open('/policy', '개인 정보 수집 및 이용동의', 'width=500, height=500')}>
								See more
							</button>
						</p>
						<p>
							<label>
								{`Send me information about news, promotions, products, and exclusive offers. (Optional) `}
								<input type="checkbox" id="c_event" checked={checkEvent} onChange={() => setCheckEvent(!checkEvent)} />
								<span className="checkmark"></span>
							</label>
						</p>
					</div>
				</JoinTermContent>
			</JoinTermsContainer>
			<JoinCompleteButton>
				<button onClick={onClickComplete}>Sign Up</button>
			</JoinCompleteButton>
		</ForegionWrap>
	);
};
const ForegionWrap = styled.div`
		& > p {
			margin: 38px 0px 10px 0px;
			display: flex;
			justify-content: space-between;

			& > .join_person_top_info_s1 {
				font-size: 18px;
				font-weight: 500;
			}
			& > .join_person_top_info_s2 {
				font-size: 14px;
				color: #8f0ee5;
				display: flex;
				& > .point {
					margin: 2px 5px 0px 0px;
					font-size: 1px;
				}
			}
		}
		& > table {
			width: 100%;
			border-top: 1px solid #b4b2b2;
			border-spacing: 0px;
			& > tbody > tr {
				height: 60px;
				& > .table_title {
					width: 15%;
					border-right: 1px solid #b4b2b2;
					& > p {
						display: flex;
						margin: 0;
						& > span {
							color: #333333;
							font-size: 14px;
							margin: 0;
						}
						& > .point {
							margin: 1px 5px 0px 0px;
							font-size: 1px;
							color: #8f0ee5;
						}
					}
				}
				& > .table_content {
					&>.country_content{
						width:100%;
						&>div{
							border:none;
							width:50%;
							&>div{
								width:100%;
							}
						}
					}
					&>.type_selection_content{
						&>select{
							width:200px;
							height:35px;
							border:1px solid #b4b2b2;
							outline:none;
						}
					}
					& > div {
						margin-left: 11.5px;
						display: flex;
						flex-wrap: wrap;
						
						& > div {
							height: 40px;
							border: 1px solid #b4b2b2;
							display: flex;
							margin: 0px 10px 0px 0px;
							& > input {
								padding: 0 3px;
								margin: auto 0px;
								border: none;
								height: 30px;
								outline: none;
								width: 80%;
								background-color: #fefefe;
							}
							& > span {
								margin: auto 0px;
								color: red;
								font-size: 12px;
							}
						}
						& > button {
							height: 40px;
							margin: 0px 10px 0px 0px;
							width: 120px;
							background-color: #333333;
							border: none;
							color: #ffffff;
							font-size: 14px;
							font-weight: 500;
							cursor: pointer;
							outline: none;
						}
						& > span,
						small {
							font-size: 12px;
							color: #8d8d8d;
							margin: auto 10px;
						}
					}
				}
				& > td {
					border-bottom: 1px solid #b4b2b2;
					& > p {
						display: flex;
						flex-wrap: wrap;
						margin: 0px 0px 0px 11.5px;
						&>label{
							border:1px solid;
							height:35px;
							width:100px;
							display:flex;
							border:1px solid #333333;
							background-color:#333333;
							color:#ffffff;
							margin:0px 10px;
							&>span{
								margin:auto;
								font-size:12px;
							}
							&>input{
								display:none;
							}
						}
						& > input {
							padding: 0 3px;
							border: 1px solid #b4b2b2;
							height: 38px;
							font-size: 14px;
							outline: none;
							background-color: #fefefe;
						}
						& > small {
							font-size: 12px;
							color: #8d8d8d;
							margin: auto 10px;
						}
						& > span {
							font-size: 12px;
							color: #8d8d8d;
							margin: auto 0;
						}
						& > select {
							height: 40px;
							color: #54565a;
							width: 140px;
							margin: 0 10px;
						}
						& > button {
							height: 40px;
							margin: 0px 10px 0px 0px;
							width: 120px;
							background-color: #333333;
							border: none;
							color: #ffffff;
							font-size: 14px;
							font-weight: 500;
							cursor: pointer;
							outline: none;
						}
						& > #email,
						#email1,
						#email2{
							width: 140px;
							margin: 0;
						}
						& > #passWord,
						#passWord1,
						#passWord2,
						#passWordCheck {
							width: 270px;
							margin: 0px 10px 0px 0px;
						}
						& > #nickName,
						#inputEmailCert,
						#email2{
							margin: 0px 10px 0px 0px;
						}
					}
					& > #table_content_password_setting {
						height: 40px;
						margin-left: 10px;
						width: 120px;
						background-color: #333333;
						border: none;
						color: #ffffff;
						font-size: 14px;
						font-weight: 500;
						cursor: pointer;
						outline: none;
					}
				}
			}
		}

	@media screen and (max-width: 978px) {
		& > table {
				& > tbody {
					& > tr {
						& > .table_content {
							& > p {
								padding: 10px 0px;
								& > input {
								}
							}
						}
					}
				}
			}
	}
	@media screen and (max-width: 840px) {
		& > table {
				& > tbody {
					& > tr {
						& > .table_title {
							width: 117px;
						}
					}
				}
			}
	}
	@media screen and (max-width: 810px) {
		& > table > tbody > tr {
				& > .table_content {
					& > div {
						& > div {
							width: 120px;
							padding: 0px 3px;
							& > input {
								width: 60%;
							}
						}
						& > button {
							width: auto;
							padding: 0px 5px;
							font-size: 12px;
						}
					}
					& > p {
						& > select {
							width: 85px;
						}
						& > span {
							font-size: 10px;
						}
						& > small {
							font-size: 10px;
							margin: auto 3px;
						}
						& > button {
							font-size: 12px;
							width: auto;
							padding: 0px 5px;
						}
						& > #inputEmailCert {
							width: 120px;
						}

						& > #certification,
						#nickName {
							width: 115px;
						}
						& > #email,
						#email1,
						#email2,
						#user_name {
							width: 115px;
						}
						& > #passWord,
						#passWord1,
						#passWord2,
						#passWordCheck {
							width: 30%;
						}
					}
				}
			}
	}

	@media screen and (max-width: 615px) {
		& > table {
				& > tbody {
					& > tr {
						& > td {
							& > p {
								& > #email,
								#email2,
								#nickName,
								#inputEmailCert {
									margin-bottom: 5px;
								}
							}
						}
					}
				}
			}
	}
	@media screen and (max-width: 557px) {
		& > table > tbody > tr {
				& > .table_title {
					width: 100px;
					& > p {
						& > .point {
							margin: 0;
						}
						& > span {
							font-size: 12px;
						}
					}
				}
				& > .table_content {
					& > div {
						& > div {
							width: 120px;
							padding: 0px 3px;
							margin: 0px 10px 0px 0px;
							& > input {
								width: 60%;
							}
						}
						& > button {
							width: auto;
							padding: 0px 5px;
							font-size: 12px;
							margin: 0;
						}
					}
					& > p {
						& > select {
							width: 42%;
							margin: 0px 10px 0px 0px;
						}
						& > span {
							font-size: 10px;
						}
						& > small {
							font-size: 10px;
							margin: auto 3px;
						}
						& > #certification,
						#nickName {
							width: 60%;
							margin-right: 10px;
						}
						& > #email,
						#email1,
						#email2 {
							width: 40%;
						}
						& > #passWord,
						#passWord1,
						#passWord2,
						#passWordCheck {
							width: 60%;
							margin-right: 10px;
						}
					}
				}
			}
	}

`;
const JoinTermsContainer = styled.div`
	margin-top: 90px;
	width: 100%;
	border: 1px solid #b4b2b2;
	padding: 42px 0px 30px 0px;
`;

const JoinTermContent = styled.div`
	padding:0 20px;
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
		& > p {
			margin: auto 0;
		}
	}

	@media screen and (max-width: 450px) {
		&>div{
			&>p{
				display:block;
				&>label{
					font-size:12px !important;
				}
				&>button{
					margin:0;
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

export default JoinPersonComponent;
