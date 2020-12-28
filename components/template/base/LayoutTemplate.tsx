import React, { ReactNode } from 'react';
import styled from 'styled-components';
import HeaderContainer from '../../../containers/layout/headerContainer';
import Footers from '../../layouts/footer';
import 'video-react/dist/video-react.css';
import ScrollTop from '../../layouts/scroll/scrollTop';

type Props = {
	children?: ReactNode;
};

const Layout = ({ children }: Props) => (
	<Wrap>
		<Header>
			<HeaderContainer />
		</Header>
		{children}
		<ScrollTop />
		<footer>
			<Footers />
		</footer>
	</Wrap>
);

const Wrap = styled.div``;

const Header = styled.header``;

export default Layout;
