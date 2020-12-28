import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import bcrypt from 'bcryptjs';
import { aes256Decrypt } from '../../../../../lib/crypto';

interface Props {
	userId: string;
	updatePassword: (user_id: number, password: string) => void;
}
const UserPasswordFindConfirmComponent: React.FC<Props> = ({ userId, updatePassword }) => {
	const [password, setPassword] = useState<string>('');
	const [passwordCheck, setPasswordCheck] = useState<string>('');
	const check: any = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&]).{7,}.$/;
	const onChange = (e: any) => {
		const { id, value } = e.target;
		switch (id) {
			case 'password':
				return setPassword(value);
			case 'password_check':
				return setPasswordCheck(value);
		}
	};
	const changePassword = () => {
		if (userId !== undefined) {
			if (password !== passwordCheck) {
				alert('비밀번호가 맞는지 확인해주세요.');
			} else if (check.test(password) === false) {
				alert('특수문자 포함 8자리 이상인지 확인해주세요.');
			} else {
				updatePassword(Number(aes256Decrypt(userId)), bcrypt.hashSync(password, 12));
			}
		} else {
			alert('올바른 방법으로 접근되지 않았습니다.');
		}
	};

	return (
		<ConfirmWrap>
			<ConfirmHeader>
				<h2>비밀번호 찾기 결과</h2>
				<div>
					본인인증이 완료되었습니다. <br />
					새로운 비밀번호를 설정해주세요.
				</div>
			</ConfirmHeader>
			<ConfirmContent>
				<div>
					<p>새 비밀번호</p>
					<input type="password" value={password} id="password" onChange={onChange} />
					{password.length > 0 ? (
						check.test(password) ? (
							''
						) : (
							<span>숫자, 영문, 특수문자 포함 8자 이상을 입력해주세요.</span>
						)
					) : (
						''
					)}
				</div>
				<div>
					<p>새 비밀번호 확인</p>
					<input type="password" value={passwordCheck} id="password_check" onChange={onChange} />
					{passwordCheck.length > 0 ? (
						password === passwordCheck ? (
							''
						) : (
							<span>새 비밀번호가 일치하지 않습니다.</span>
						)
					) : (
						''
					)}
				</div>
			</ConfirmContent>
			<ConfirmButton>
				<button onClick={changePassword}>비밀번호 변경</button>
			</ConfirmButton>
		</ConfirmWrap>
	);
};

const ConfirmWrap = styled.div`
	width: 460px;
	max-width: 100%;
	margin: 0 auto;

	@media screen and (max-width: 490px) {
		width: calc(100% - 30px);
	}
`;

const ConfirmHeader = styled.div`
	margin: 115px 0px 0px 0px;
	text-align: center;
	& > h2 {
		margin: 0;
		font-size: 20px;
	}
	& > div {
		margin: 10px 0px 0px 0px;
		font-size: 12px;
		color: #b4b2b2;
	}
`;

const ConfirmContent = styled.div`
	margin: 50px 0px 0px 0px;
	& > div {
		margin: 18px 0px 0px 0px;
		& > p {
			margin: 0;
			font-size: 12px;
			font-weight: 500;
		}
		& > input {
			margin: 10px 0px 7px 0px;
			height: 40px;
			padding: 0px 10px;
			width: calc(100% - 20px);
			outline: none;
			border: 1px solid #b4b2b2;
		}
		& > span {
			color: #ff0000;
			font-size: 10px;
		}
	}
`;

const ConfirmButton = styled.div`
	margin: 25px 0px 150px 0px;
	width: 100%;
	& > button {
		width: 100%;
		height: 40px;
		border: 1px solid #333333;
		background-color: #333333;
		font-size: 11px;
		color: #fcfcfc;
		font-weight: 500;
		outline: none;
		cursor: pointer;
	}
`;
export default UserPasswordFindConfirmComponent;
