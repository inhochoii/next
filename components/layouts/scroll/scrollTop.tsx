import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import scroll_top_btn from '../../../public/images/scroll_top_btn.png';
import ScrollToTop from 'react-scroll-to-top';

const ScrollTop = () => {
	const [scrollState, setScrollState] = useState<boolean>(false);

	const scrollEvent = () => {
		const bodyHeight = document.body.scrollHeight;
		const scrollHeight = document.documentElement.scrollTop;
		if (scrollHeight > bodyHeight / 4) {
			setScrollState(true);
		} else {
			setScrollState(false);
		}
	};
	useEffect(() => {
		window.addEventListener('scroll', scrollEvent);
		return () => window.removeEventListener('scroll', scrollEvent);
	}, []);

	return (
		<ScrollTopWrap style={scrollState ? { display: 'block' } : { display: 'none' }}>
			<ScrollToTop smooth className="scroll"></ScrollToTop>
		</ScrollTopWrap>
	);
};

const ScrollTopWrap = styled.div`
	position: fixed;
	bottom: 100px;
	right: 100px;
	z-index: 50;
	& > .scroll {
		cursor: pointer;
		display: flex;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background-color: #ffffff;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
		border: none;
		outline: none;
		&:before {
			content: url(${scroll_top_btn});
			margin: auto;
		}
	}
	& > div {
		cursor: pointer;
		display: flex;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background-color: #ffffff;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
		& > img {
			margin: auto;
		}
		&::after {
			transition: all 3s;
		}
	}

	@media screen and (max-width: 1500px) {
		right: 2%;
	}

	@media screen and (max-width: 880px) {
		bottom: 2%;
	}
`;
export default ScrollTop;
