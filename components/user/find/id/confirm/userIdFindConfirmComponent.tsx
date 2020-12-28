import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';

interface Props {
	findConfirmStatus: any;
}
const UserIdFindConfirmComponent: React.FC<Props> = ({ findConfirmStatus }) => {
	return (
		<ConfirmWrap>
			<ConfirmHeader>
				<h2>아이디 찾기 결과</h2>
				<p>입력하신 정보와 일치하는 아이디는 아래와 같습니다.</p>
			</ConfirmHeader>
			<ConfirmContent>
				<p>
					아이디<span>{findConfirmStatus.email}</span>
				</p>
			</ConfirmContent>
			<ConfirmButton>
				<button onClick={() => Router.push('/login')}>로그인하기</button>
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
	& > p {
		margin: 10px 0px 0px 0px;
		font-size: 12px;
		color: #b4b2b2;
	}
`;

const ConfirmContent = styled.div`
	margin: 50px 0px 0px 0px;
	width: 100%;
	display: flex;
	justify-content: center;
	background-color: #f6f6f6;
	padding: 30px 0px;
	& > p {
		font-size: 12px;
		font-weight: 500;
		& > span {
			margin-left: 15px;
		}
	}
`;

const ConfirmButton = styled.div`
	margin: 35px 0px 200px 0px;
	width: 100%;
	& > button {
		width: 100%;
		height: 40px;
		border: 1px solid #8f0ee5;
		background-color: #8f0ee5;
		color: #fcfcfc;
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		outline: none;
	}
`;

export default UserIdFindConfirmComponent;
