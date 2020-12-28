import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { isIE } from 'react-device-detect';
import Router from 'next/router';

interface Props {
	findSendSms: (receiver: string, find_type: string, find_value: string) => void;
	findSendStatus: any;
	findConfirmSms: (receiver: string, cert_code: string, mail_find_yn: string) => void;
	findConfirmStatus: any;
}
const UserPasswordFindComponent: React.FC<Props> = ({
	findSendSms,
	findSendStatus,
	findConfirmSms,
	findConfirmStatus,
}) => {
	const [email, setEmail] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [inputCert, setInputCert] = useState<string>('');
	const [countSeconds, setCountSeconds] = useState<any>('60');
	const regExp = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // email 유효성검사

	const onChange = (e: any) => {
		const { id, value } = e.target;

		if (id === 'email') {
			setEmail(value);
		} else if (id === 'phone') {
			setPhone(value);
		} else if (id === 'inputCert') {
			setInputCert(value);
		}
	};

	const onClickFind = () => {
		if (findConfirmStatus.status === '1') {
			Router.push('/login/userPasswordFind/confirm');
		} else {
			alert('인증되지 않았습니다.');
		}
	};
	const sendSMS = () => {
		if (phone.length !== 11) {
			alert('휴대폰번호를 정확히 입력해주세요.');
		} else if (!regExp.test(email)) {
			alert('아이디를 정확이 입력해주세요.');
		} else {
			findSendSms(phone, 'email', email);
			if (findSendStatus.status === '1') {
				setCountSeconds('60');
			}
		}
	};
	const smsCert = () => {
		if (findSendStatus.status !== '1') {
			alert('인증번호가 전송되지 않았습니다.');
		} else {
			findConfirmSms(phone, inputCert, '');
		}
	};
	useEffect(() => {
		if (findSendStatus.status === '1') {
			if (Number(countSeconds) > 0) {
				const value = setInterval(() => {
					setCountSeconds(countSeconds > 10 ? Number(countSeconds - 1) : `0${Number(countSeconds - 1)}`);
				}, 1000);
				return () => clearInterval(value);
			}
		}
	}, [countSeconds, findSendStatus]);

	return (
		<FindWrap>
			<FindHeader>
				<h2>비밀번호 찾기</h2>
				<div>
					가입 시 입력한 휴대폰 번호를 통해 인증 후<br />새 비밀번호를 등록해주세요.
				</div>
			</FindHeader>
			<FindContent>
				<div>
					<p>아이디</p>
					<input type="text" placeholder="가입된 아이디를 입력해주세요." value={email} id="email" onChange={onChange} />
				</div>
				<div>
					<p>핸드폰 번호</p>
					<div className="input_phone_div">
						<input
							type="text"
							placeholder="휴대폰 번호 '-'없이 입력해주세요."
							value={phone}
							id="phone"
							onChange={onChange}
						/>
						<button onClick={sendSMS}>인증번호 발송</button>
					</div>
					{findSendStatus.status === '1' ? <span style={{ color: '#56b0ff' }}>인증번호가 전송되었습니다.</span> : ''}
				</div>
				<div>
					<p>인증번호</p>
					<div className="input_cert_div">
						<div>
							<input
								type="text"
								id="inputCert"
								value={inputCert}
								onChange={onChange}
								placeholder="인증번호를 입력해주세요."
							/>
							{findSendStatus.status === '1' && findConfirmStatus.status !== '1' ? (
								<span>{countSeconds > 0 ? `00:${countSeconds}` : '만료'}</span>
							) : (
								''
							)}
						</div>
						<button onClick={smsCert}>인증하기</button>
					</div>
					{findConfirmStatus.status === '1' ? (
						<span style={{ color: '#56b0ff' }}>인증되었습니다.</span>
					) : (
						<span style={{ color: 'red' }}>{findConfirmStatus.msg}</span>
					)}
				</div>
			</FindContent>
			<FindButton>
				<button onClick={onClickFind}>비밀번호 변경</button>
			</FindButton>
		</FindWrap>
	);
};

const FindWrap = styled.div`
	width: 460px;
	max-width: 100%;
	margin: 0 auto;

	@media screen and (max-width: 490px) {
		width: calc(100% - 30px);
	}
`;

const FindHeader = styled.div`
	margin: 115px 0px 0px 0px;
	text-align: center;
	& > h2 {
		margin: 0;
		font-size: 20px;
	}
	& > div {
		margin-top: 10px;
		font-size: 12px;
		color: #b4b2b2;
	}
`;

const FindContent = styled.div`
	margin: 50px 0px 0px 0px;
	& > div {
		margin: 0px 0px 30px 0px;
		& > p {
			margin: 0px 0px 10px 0px;
			font-size: 12px;
		}
		& > span {
			font-size: 11px;
		}
		& > #email {
			border: 1px solid #b4b2b2;
			height: 40px;
			outline: none;
			padding: 0 10px;
			width: calc(100% - 20px);
		}
		& > .input_cert_div {
			display: flex;
			justify-content: space-between;
			height: 40px;
			& > div {
				border: 1px solid #b4b2b2;
				height: 95%;
				width: 75%;
				margin: auto 0;
				& > input {
					width: 80%;
					border: none;
					outline: none;
					height: 100%;
					padding: 0 10px;
				}
				& > span {
					margin: auto 0px;
					line-height: ${isIE && '40px'};
					font-size: 12px;
					color: red;
				}
			}
			& > button {
				width: 105px;
				margin-left: 5px;
				background-color: #333333;
				color: #fcfcfc;
				font-size: 11px;
				border: none;
				outline: none;
				cursor: pointer;
				height: 40px;
				font-weight: 500;
			}
		}
		& > .input_phone_div {
			display: flex;
			justify-content: space-between;
			height: 40px;
			& > input {
				margin: auto 0;
				width: calc(75% - 20px);
				outline: none;
				height: 95%;
				border: 1px solid #b4b2b2;
				padding: 0 10px;
			}
			& > button {
				margin: auto 0;
				width: 105px;
				margin-left: 5px;
				background-color: #333333;
				color: #fcfcfc;
				font-size: 11px;
				border: none;
				outline: none;
				cursor: pointer;
				height: 100%;
				font-weight: 500;
			}
		}
	}
`;

const FindButton = styled.div`
	margin: 20px 0px 200px 0px;
	width: 100%;
	& > button {
		width: 100%;
		background-color: #333333;
		color: #fcfcfc;
		font-size: 11px;
		border: 1px solid #333333;
		outline: none;
		cursor: pointer;
		height: 40px;
		font-weight: 500;
	}
`;

export default UserPasswordFindComponent;
