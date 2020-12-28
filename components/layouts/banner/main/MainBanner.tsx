import * as React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';

import main_banner_next_btn from '../../../../public/images/main_banner_next_btn.png';
import main_banner_prev_btn from '../../../../public/images/main_banner_prev_btn.png';
import Router from 'next/router';
const MainBanner: React.FC = () => {
	
	const [widthLength, setWidthLength] = useState<number>();
	useEffect(() => {
		if (typeof window !== 'undefined') {
		  const handleResize = () =>{
			setWidthLength(window.innerWidth);
		  }
		  window.addEventListener("resize", handleResize);
		  handleResize();
		  return () => window.removeEventListener("resize", handleResize);
		}
	  }, []);
	const settings = widthLength&&{
		className: 'slider variable-width',
		dots: true,
		infinite: true,
		centerMode: widthLength > 1280 && true,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: widthLength > 1280 && true,
		autoplay: true,
		autoplaySpeed: 5000,
	};

	return (
		<TopBannerContainer>
			<Slider {...settings}>
				<div onClick={() => Router.push("/event/44")}>
					<div style={{ backgroundImage: `url(${`./bannerImages/event_banner10.png`})`}} className="main_banner_background_image" />
				</div>
				<div onClick={() => Router.push("/event/41")}>
					<div style={{ backgroundImage: `url(${`./bannerImages/event_banner6.png`})`}} className="main_banner_background_image" />
				</div>
				<div onClick={() => Router.push("/event/40")}>
				<div style={{ backgroundImage: `url(${`./bannerImages/event_banner5.png`})`}} className="main_banner_background_image" />
				</div>
				<div onClick={() => Router.push("/event/37")}>
				<div style={{ backgroundImage: `url(${`./bannerImages/event_banner7.png`})`}} className="main_banner_background_image" />
				</div>
				<div onClick={() => Router.push("/event/35")}>
				<div style={{ backgroundImage: `url(${`./bannerImages/event_banner4.png`})`}} className="main_banner_background_image" />
				</div>
				<div onClick={() => Router.push("/event/33")}>
				<div style={{ backgroundImage: `url(${`./bannerImages/event_banner8.png`})`}} className="main_banner_background_image" />
				</div>
				<div onClick={() => Router.push("/event/29")}>
				<div style={{ backgroundImage: `url(${`./bannerImages/event_banner2.png`})`}} className="main_banner_background_image" />
				</div>
				<div onClick={() => Router.push("/event/27")}>
				<div style={{ backgroundImage: `url(${`./bannerImages/event_banner1.png`})`}} className="main_banner_background_image" />
				</div>
			</Slider>
		</TopBannerContainer>
	);
};

export const TopBannerContainer = styled.div`
	overflow: hidden;
	margin: 0 auto;
	height: 470px;
	width: 100%;

	.variable-width .slick-slide div {
		height: 470px;
		margin: 0 1px;
		background-size: 1280px 470px;
		outline: none;
		cursor: pointer;
	}
	.slick-dots {
		bottom: 20px;
		& > li {
			& > button::before {
				color: white;
				opacity: 1;
				font-size:25px;
			}
		}
		& > .slick-active {
			& > button:before {
				color: #8f0ee5;
				opacity: 1;
			}
		}
	}

	& > .slick-slider {
		& > .slick-next {
			left: 50%;
			margin-left: 596px;
			z-index: 100;
		}
		& > .slick-next::before {
			content: url(${main_banner_next_btn});
		}
		& > .slick-prev {
			left: auto;
			right: 50%;
			margin-right: 596px;

			z-index: 100;
		}
		& > .slick-prev::before {
			content: url(${main_banner_prev_btn});
		}
		& > .slick-list {
			& > .slick-track {
				& > .slick-slide {
					& > div {
						width: 1280px;
					}
				}
			}
		}
	}
	@media screen and (max-width: 1398px) {
		.slick-arrow {
			top: 25%;
		}
	}
	@media screen and (max-width: 1280px) {
		height: 380px;
		.variable-width .slick-slide div {
			margin: 0;
			background-size: 100% 380px;
		}
		.slick-arrow {
			top: 40%;
		}
		& > .slick-slider {
			& > .slick-next {
				right: 1%;
				margin: 0px 0px 0px auto;
				z-index: 100;
			}

			& > .slick-prev {
				left: 1%;
				margin: 0px auto 0px 0px;

				z-index: 100;
			}

			& > .slick-list {
				& > .slick-track {
					& > .slick-slide {
						& > div {
							width: 100%;
						}
					}
				}
			}
		}
	}

	@media screen and (max-width: 880px) {
		height: 250px;
		.variable-width .slick-slide div {
			margin: 0;
			background-size: 100% 250px;
		}
		.slick-arrow {
			top: 25%;
		}
	}
	@media screen and (max-width: 500px) {
		height: 200px;
		.variable-width .slick-slide div {
			margin: 0;
			background-size: 100% 200px;
		}
		.slick-arrow {
			top: 20%;
		}
	}
`;

export default MainBanner;
