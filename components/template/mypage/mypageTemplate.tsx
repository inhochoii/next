import * as React from 'react';
import styled from 'styled-components';

interface Props {
	left: React.ReactChild;
	title: React.ReactChild;
}
const MypageTemplate: React.FC<Props> = ({ left, children, title }) => {
	return (
		<Template>
			<h1>{title}</h1>
			<Container>
				<Left>{left}</Left>
				<Content>{children}</Content>
			</Container>
		</Template>
	);
};

const Template = styled.div`
	height: 100%;
	width: 1280px;
	margin: 83.5px auto 100px auto;
	max-width: 100%;

	& > h1 {
		margin: 0px 0px 10px 0px;
		font-size: 22px;
		font-weight: 500;
	}
	& > button {
		display: none;
	}

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}

	@media screen and (max-width: 930px) {
		margin: 30px auto 100px auto;
		& > h1 {
			font-size: 18px;
		}
	}
`;
const Container = styled.div`
	display: flex;

	@media screen and (max-width: 930px) {
		flex-wrap: wrap;
	}
`;
const Left = styled.div`
	width: 200px;

	@media screen and (max-width: 930px) {
		width: 100%;
	}
`;
const Content = styled.div`
	width: 100%;
`;
export default MypageTemplate;
