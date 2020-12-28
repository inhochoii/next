import styled from 'styled-components';
import berry_logo from '../public/images/berry_logo.png';
import not_found_image from '../public/images/not_found_image.png';
const ErrorPage = () => {
	return (
		<NotFoundWrap>
			<Header>
				<img src={berry_logo} alt="berry_logo" />
			</Header>
			<NotFoundContent>
				<div>
					<img src={not_found_image} alt="not_found_image" />
					<h4>페이지를 찾을 수 없습니다.</h4>
					<p>
						페이지의 주소가 잘못 입력되었거나, <br />
						변경 혹은 삭제되어 사용하실 수 없습니다. <br />
						입력하신 주소가 정확한지 다시 한번 확인해 주세요.
					</p>
					<button onClick={() => (window.location.href = '/')}>베리스토어 홈</button>
				</div>
			</NotFoundContent>
		</NotFoundWrap>
	);
};

const NotFoundWrap = styled.div`
	width: 100%;
	height: 90vh;
`;

const Header = styled.div`
	height: 80px;
	background-color: #ffffff;
	display: flex;
	box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.05);
	& > img {
		width: 145px;
		height: 33.5px;
		margin: auto;
	}
`;

const NotFoundContent = styled.div`
	display: flex;
	height: 100%;
	& > div {
		margin: auto;
		text-align: center;
		& > h4 {
			font-size: 26px;
			font-weight: 500;
			margin: 29px 0px 0px 0px;
		}
		& > p {
			margin: 26.4px 0px 0px 0px;
			font-size: 14px;
			line-height: 20px;
		}
		& > button {
			margin: 42px 0px 0px 0px;
			border: none;
			background-color: #8f0ee5;
			width: 160px;
			height: 50px;
			color: #ffffff;
			font-size: 13px;
			font-weight: 500;
			outline: none;
			cursor: pointer;
		}
	}
`;

export default ErrorPage;
