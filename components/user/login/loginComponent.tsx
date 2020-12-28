import * as React from 'react';
import { useCallback, useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { aes256Encrypt } from '../../../lib/crypto';
import Kakao from './kakao';
interface Props {
	login: (email: string, password: string) => void;
	kakaoLogin: (email: string, kakao_token: string) => void;
	loading: boolean;
}
const LoginComponent: React.FC<Props> = ({ login, kakaoLogin, loading }) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setEmail(e.target.value);
	}, []);

	const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setPassword(e.target.value);
	}, []);

	const onClickButton = (e: any) => {
		const regExp = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; //email 유효성검사
		e.preventDefault();
		if (email === '') {
			alert('email을 입력해 주세요.');
		} else if (!regExp.test(email)) {
			alert('email 형식을 맞춰주세요.');
		} else if (password === '') {
			alert('password를 입력해주세요.');
		} else if (!sessionStorage.getItem('uuid')) {
			login(aes256Encrypt(email), password);
		}
	};
	return (
		<Wrap>
			<LoginContainer>
				<LoginTitle>
					<h1>LOGIN</h1>
					<p>투명한 기부 경매 플랫폼 베리스토어에 오신 것을 환영합니다.</p>
				</LoginTitle>
				<LoginContent>
					<LoginContentItem onSubmit={onClickButton}>
						<h1>회원 로그인</h1>
						<p className="login_content_top_p1">기존 고객님일 경우 아래 로그인을 이용해 주세요.</p>
						<input
							type="email"
							placeholder="이메일 아이디를 @까지 정확하게 입력하세요."
							value={email}
							onChange={onChangeEmail}
						/>
						<input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={onChangePassword} />
						<button type="submit">{loading ? '로그인 중...' : '로그인'}</button>
						<p className="login_content_find_user_p">
							<span onClick={() => Router.push('/join')} className="login_content_join_s1">
								회원가입
							</span>
							<small className="login_content_join_s1" />
							<span onClick={() => Router.push('/login/userIdFind')}>아이디 찾기</span>
							<small />
							<span onClick={() => Router.push('/login/userPasswordFind')}>비밀번호 찾기</span>
						</p>
						<div className="sns_login">
							<p>SNS 로그인</p>
							<div>
								{/* <Facebook /> 
                                    <Naver /> */}
								<Kakao kakaoLogin={kakaoLogin} />
							</div>
						</div>
					</LoginContentItem>
					<CenterLine />
					<LoginContentToJoin>
						<div>
							<h3>회원가입</h3>
							<p>아직 베리스토어 회원이 아니신가요?</p>
							<button onClick={() => Router.push('/join')}>베리스토어 회원가입</button>
						</div>
					</LoginContentToJoin>
				</LoginContent>
			</LoginContainer>
		</Wrap>
	);
};

const Wrap = styled.div`
	width: 1280px;
	margin: 0 auto;
	max-width: 100%;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const LoginContainer = styled.div`
	margin-top: 88px;
`;

const LoginTitle = styled.div`
	border-bottom: 1px solid #b4b2b2;
	height: 76.5px;
	margin-bottom: 52.5px;
	& > h1 {
		margin: 0;
		font-size: 20px;
		font-weight: 500;
	}
	& > p {
		margin: 10px 0px 0px 0px;
		font-size: 16px;
	}

	@media screen and (max-width: 503px) {
		& > p {
			font-size: 14px;
		}
	}
	@media screen and (max-width: 444px) {
		& > p {
			font-size: 12px;
		}
	}
`;

const LoginContent = styled.div`
	height: 450px;
	display: flex;
	margin-bottom: 140px;

	@media screen and (max-width: 1220px) {
		justify-content: space-between;
	}

	@media screen and (max-width: 1030px) {
		justify-content: none;
		flex-wrap: wrap;
		margin-bottom: 170px;
	}
`;

const LoginContentItem = styled.form`
	height: 100%;
	width: 510px;
	display: flex;
	flex-wrap: wrap;
	& > h1 {
		margin: 0;
		font-size: 18px;
		color: #8f0ee5;
		font-weight: 500;
	}

	& > .login_content_top_p1 {
		margin: 10px 0px 0px 0px;
		font-size: 16px;
		width: 100%;
		margin-bottom: 48px;
	}

	& > input {
		padding: 0px;
		width: 100%;
		height: 60px;
		margin: 0px 0px 10px 0px;
		border: 1px solid #b4b2b2;
		color: #333333;
		text-align: left;
		padding: 0px 10px;
		font-size: 13px;
		outline: none;
	}

	& > button {
		border: none;
		width: 100%;
		height: 60px;
		background-color: #8f0ee5;
		color: #ffffff;
		font-size: 18px;
		font-weight: 500;
		cursor: pointer;
		outline: none;
	}
	& > .login_content_find_user_p {
		margin: 11px 0px 0px auto;
		display: flex;
		& > .login_content_join_s1 {
			display: none;
		}
		& > span {
			font-size: 14px;
			cursor: pointer;
		}
		& > small {
			margin: auto 10px;
			color: #b4b2b2;
			border: 1px solid;
			height: 14px;
		}
	}
	& > .sns_login {
		margin-top: 30px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		& > p {
			margin: auto 0;
			font-weight: 500;
			font-size: 18px;
		}
		& > div {
			display: flex;
			margin-left: auto;
		}
	}

	@media screen and (max-width: 1030px) {
		width: 70%;
		margin: 0 auto;
		& > .login_content_find_user_p {
			& > .login_content_join_s1 {
				display: block;
			}
		}
	}

	@media screen and (max-width: 880px) {
		width: 100%;
	}

	@media screen and (max-width: 444px) {
		& > .login_content_top_p1 {
			font-size: 12px;
		}
	}
`;

const CenterLine = styled.div`
	border-left: 1px solid #b4b2b2;
	height: 100%;
	margin: 0px 130px;

	@media screen and (max-width: 1220px) {
		margin: 0px;
	}

	@media screen and (max-width: 1030px) {
		display: none;
	}
`;

const LoginContentToJoin = styled.div`
	height: 100%;
	& > div {
		& > h3 {
			margin: 0;
			color: #8f0ee5;
			font-size: 18px;
		}
		& > p {
			margin: 10px 0px 48px 0px;
			color: #333333;
			font-size: 16px;
		}
		& > button {
			border: none;
			width: 392px;
			height: 60px;
			background-color: #8f0ee5;
			font-size: 18px;
			color: #ffffff;
			font-weight: 500;
			cursor: pointer;
			outline: none;
		}
	}
	@media screen and (max-width: 1030px) {
		display: none;
	}
`;

export default LoginComponent;
