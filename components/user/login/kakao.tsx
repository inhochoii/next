import React from 'react';
import KaKaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import Router from 'next/router';
import kakao_image from '../../../public/images/kakao_image.png';

interface Props {
	kakaoLogin: (email: string, kakao_token: string) => void;
}

const Kakao: React.FC<Props> = ({ kakaoLogin }) => {
	const responseKaKao = (res: any) => {
		const { email } = res.profile.kakao_account;
		const token = res.response.access_token;
		kakaoLogin(email, token);
	};

	const responseFail = (err: any) => {
		console.log(err);
		alert('등록되지 않은 kakao 계정입니다.');
		Router.push('/login');
	};

	return (
		<KakaoWrap>
			<KaKaoBtn jsKey="30f25b099777f36e8e15743f8543067d" onSuccess={responseKaKao} onFailure={responseFail} getProfile>
				<img src={kakao_image} alt="" />
				<p>KAKAO</p>
			</KaKaoBtn>
		</KakaoWrap>
	);
};

const KakaoWrap = styled.div`
	& > button {
		outline: none;
	}
`;

const KaKaoBtn = styled(KaKaoLogin)`
	display: flex;
	background: none;
	border: none;
	& > p {
		margin: auto 0px auto 5px;
		font-size: 13px;
	}
`;

export default Kakao;
