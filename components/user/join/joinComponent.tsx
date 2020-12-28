import React from 'react';
import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { createUser } from '../../../stores/user/types';

import JoinPersonComponent from './joinPersonComponent';
import JoinCompanyComponent from './joinCompanyComponent';
import JoinForegionComponent from './joinForegionComponent';

interface Props {
	nickNameStatus: string;
	emailStatus: string;
	nickNameCheck: (nickname: string) => void;
	emailCheck: (email: string) => void;
	businessCheck: (business_num: string) => void;
	businessStatus: number;
	createUser: (user: createUser) => void;
	snsEmail: string;
	snsEmailStatus: number;
	smsCert: (receiver: string) => void;
	smsCertCheck: (receiver: string, cert_code: string) => void;
	sendStatus: any;
	certStatus: any;
	initStatus: () => void;
	randomNum: string;
	createUserByForegion:(user:any)=>void;
}
const JoinComponent: React.FC<Props> = ({
	nickNameStatus,
	nickNameCheck,
	emailStatus,
	emailCheck,
	createUser,
	businessStatus,
	businessCheck,
	snsEmail,
	snsEmailStatus,
	smsCert,
	smsCertCheck,
	sendStatus,
	certStatus,
	initStatus,
	randomNum,
	createUserByForegion
}) => {
	const [joinPerson, setJoinPerson] = useState<boolean>(true);
	const [joinCompany, setJoinCompany] = useState<boolean>(false);
	const [joinForegion, setJoinForegion] = useState<boolean>(false);

	const onChangeJoinType = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === 'person') {
			setJoinPerson(true);
			setJoinCompany(false);
			setJoinForegion(false);
			initStatus();
		} else if (e.target.value === 'company') {
			setJoinPerson(false);
			setJoinCompany(true);
			setJoinForegion(false);
			initStatus();
		} else {
			setJoinPerson(false);
			setJoinCompany(false);
			setJoinForegion(true);
			initStatus();
		}
	}, []);
	return (
		<JoinWrap>
			<JoinTitle>
				<h1>SIGN UP</h1>
				<span>투명한 기부 경매 플랫폼 베리스토어에 오신것을 환영합니다.</span>
			</JoinTitle>
			<JoinContent>
				<JoinSection>
					<table>
						<tbody>
							<tr>
								<td className="table_title">
									<span>회원구분</span>
								</td>
								<td className="table_content">
									<label className="section_label">
										개인 회원가입
										<input type="radio" checked={joinPerson} onChange={onChangeJoinType} name="radio" value="person" />
										<span className="checkmark"></span>
									</label>
									<label className="section_label2">
										사업자 회원가입
										<input
											type="radio"
											checked={joinCompany}
											onChange={onChangeJoinType}
											name="radio"
											value="company"
										/>
										<span className="checkmark"></span>
									</label>
									<label className="section_label2">
										외국인(FOREGION)
										<input
											type="radio"
											checked={joinForegion}
											onChange={onChangeJoinType}
											name="radio"
											value="foregion"
										/>
										<span className="checkmark"></span>
									</label>
								</td>
							</tr>
						</tbody>
					</table>
				</JoinSection>
				{joinPerson && (
					<JoinPersonComponent
						nickNameCheck={nickNameCheck}
						nickNameStatus={nickNameStatus}
						emailCheck={emailCheck}
						emailStatus={emailStatus}
						createUser={createUser}
						snsEmail={snsEmail}
						snsEmailStatus={snsEmailStatus}
						smsCert={smsCert}
						smsCertCheck={smsCertCheck}
						sendStatus={sendStatus}
						certStatus={certStatus}
						randomNum={randomNum}
					/>
				)} 
				{
					joinCompany&&
					<JoinCompanyComponent
						nickNameCheck={nickNameCheck}
						nickNameStatus={nickNameStatus}
						emailCheck={emailCheck}
						emailStatus={emailStatus}
						createUser={createUser}
						businessStatus={businessStatus}
						businessCheck={businessCheck}
						snsEmail={snsEmail}
						snsEmailStatus={snsEmailStatus}
						smsCert={smsCert}
						smsCertCheck={smsCertCheck}
						sendStatus={sendStatus}
						certStatus={certStatus}
						randomNum={randomNum}
					/>
				}
				{joinForegion && (
					<JoinForegionComponent
						nickNameCheck={nickNameCheck}
						nickNameStatus={nickNameStatus}
						emailCheck={emailCheck}
						emailStatus={emailStatus}
						randomNum={randomNum}
						createUserByForegion={createUserByForegion}
					/>
				)}
				
			</JoinContent>
		</JoinWrap>
	);
};

const JoinWrap = styled.div`
	width: 1280px;
	margin: 0 auto;
	max-width: 100%;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const JoinTitle = styled.div`
	& > h1 {
		margin: 84px 0px 10px 0px;
		font-size: 20px;
		font-weight: 500;
	}
	& > span {
		font-size: 15px;
	}

	@media screen and (max-width: 557px) {
		& > span {
			font-size: 13px;
		}
	}
`;

const JoinContent = styled.div`
	& > .join_person,
	.join_company {
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
				& > .table_zipcode_content {
					& > p {
						& > input {
							width: 50%;
						}
					}
				}
				& > .table_content {
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
						& > #phone1,
						#phone2,
						#phone3,
						#company_number1,
						#company_number2,
						#company_number3,
						#phone_number1,
						#phone_number2,
						#phone_number3 {
							width: 70px;
							margin: 0px;
						}
						& > #email,
						#email1,
						#email2,
						#company_name,
						#manager {
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
						& > #phone3,
						#company_number3,
						#phone_number3,
						#nickName,
						#inputEmailCert,
						#postCode,
						#manager {
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
	}

	@media screen and (max-width: 978px) {
		& > .join_person,
		.join_company {
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
	}
	@media screen and (max-width: 840px) {
		& > .join_person,
		.join_company {
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
	}
	@media screen and (max-width: 810px) {
		& > .join_person,
		.join_company {
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
						& > .send_sms_button,
						.company_confirm_button {
						}
						& > #phone1,
						#phone2,
						#phone3,
						#phone_number1,
						#phone_number2,
						#phone_number3,
						#company_number1,
						#company_number2,
						#company_number3 {
							width: 50px;
						}

						& > #certification,
						#nickName {
							width: 115px;
						}
						& > #email,
						#email1,
						#email2,
						#company_name,
						#manager,
						#user_name {
							width: 115px;
						}
						& > #passWord,
						#passWord1,
						#passWord2,
						#passWordCheck {
							width: 30%;
						}
						& > #postCode {
							width: 120px;
						}
						& > #post_search {
							margin: auto 10px;
						}
					}
				}
				& > .table_zipcode_content {
					& > p {
						& > input {
							width: 220px;
						}
					}
				}
			}
		}
	}

	@media screen and (max-width: 615px) {
		& > .join_person,
		.join_company {
			& > table {
				& > tbody {
					& > tr {
						& > td {
							& > p {
								& > #email,
								#email2,
								#phone1,
								#phone2,
								#phone3,
								#nickName,
								#phone_number1,
								#phone_number2,
								#phone_number3,
								#company_number1,
								#company_number2,
								#company_number3,
								#inputEmailCert {
									margin-bottom: 5px;
								}
							}
						}
					}
				}
			}
		}
	}
	@media screen and (max-width: 557px) {
		& > .join_person,
		.join_company {
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
						& > #phone1,
						#phone2,
						#phone3,
						#phone_number1,
						#phone_number2,
						#phone_number3,
						#company_number1,
						#company_number2,
						#company_number3 {
							width: 50px;
						}
						& > #certification,
						#nickName {
							width: 60%;
							margin-right: 10px;
						}
						& > #email,
						#email1,
						#email2,
						#company_name {
							width: 40%;
							/* margin-bottom: 5px; */
						}
						& > #passWord,
						#passWord1,
						#passWord2,
						#passWordCheck {
							width: 60%;
							margin-right: 10px;
						}
						& > #postCode {
							width: 120px;
							margin: 0px 10px 0px 0px;
						}
						& > #post_search {
							margin: 0px;
						}
					}
				}
				& > .table_zipcode_content {
					& > p {
						& > input {
							width: 220px;
						}
					}
				}
			}
		}
	}
`;

const JoinSection = styled.section`
	margin-top: 17.5px;
	& > table {
		width: 100%;
		border-top: 1px solid #b4b2b2;
		border-bottom: 1px solid #b4b2b2;
		border-spacing: 0px;
		& > tbody > tr {
			height: 60px;
			& > .table_title {
				width: 15%;
				border-right: 1px solid #b4b2b2;
				& > span {
					font-size: 14px;
				}
			}
			& > .table_content {
				padding: 0px 0px 0px 19.2px;
				display: flex;
				& > label {
					margin-top: 19px;
					font-size: 14px !important;
					color: #333333;
					display: block;
					position: relative;
					padding-left: 30px;
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
					}
					& > .checkmark {
						margin-top: -3px;
						position: absolute;
						top: 0;
						left: 0;
						height: 23px;
						width: 23px;
						background-color: #ffffff;
						border-radius: 50%;
						border: 1px solid #b4b2b2;
						&::after {
							content: '';
							position: absolute;
							display: none;
						}
					}
					& > input:checked ~ .checkmark:after {
						display: block;
					}
					& > .checkmark::after {
						top: 5px;
						left: 5px;
						width: 13px;
						height: 13px;
						border-radius: 50%;
						background: #8f0ee5;
					}
				}
				& > .section_label2 {
					margin-left: 63px;
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

	@media screen and (max-width: 710px) {
		& > table {
			& > tbody {
				& > tr {
					& > .table_title {
						width: 100px;
						& > span {
							font-size: 12px;
						}
					}
					& > .table_content {
						height: 60px;
						padding: 0px 5px 0px 11.5px;
						justify-content: space-between;
						& > label {
							margin-top: 20px;
							font-size: 12px !important;
							padding-left: 25px;
							& > .checkmark {
								margin-top: -2px;
								height: 18px;
								width: 18px;
							}
							& > .checkmark::after {
								top: 5px;
								left: 5px;
								width: 8px;
								height: 8px;
								border-radius: 50%;
								background: #8f0ee5;
							}
						}
						& > .section_label2 {
							margin-left: 0px;
						}
					}
				}
			}
		}
	}

	@media screen and (max-width: 500px) {
		& > table {
			& > tbody {
				& > tr {
					& > .table_content {
						height: auto;
						padding: 0px 5px 20px 11.5px;
						display: block;
						& > label {
							margin-top: 20px;
							font-size: 12px !important;
							padding-left: 25px;
							& > .checkmark {
								margin-top: -2px;
								height: 18px;
								width: 18px;
							}
							& > .checkmark::after {
								top: 5px;
								left: 5px;
								width: 8px;
								height: 8px;
								border-radius: 50%;
								background: #8f0ee5;
							}
						}
						& > .section_label2 {
							margin-left: 0px;
						}
					}
				}
			}
		}
	}
`;

export default JoinComponent;
