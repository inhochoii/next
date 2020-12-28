import * as React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Router from 'next/router';

import main_banner_next_btn from '../../../../public/images/main_banner_next_btn.png';
import main_banner_prev_btn from '../../../../public/images/main_banner_prev_btn.png';

interface Props {
	bannerType: string;
}
const DonationBanner: React.FC<Props> = ({ bannerType }) => {
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
		centerMode:  widthLength > 1280 && true,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: widthLength > 1280 && true,
		autoplay: true,
		autoplaySpeed: 5000,
	};

	const banner =
		bannerType === 'donation'
			? [
					{ id: 1, image: `./images/donation_banner1.png`, url: '/donation/1'},
					{ id: 2, image: `./images/donation_banner4.png`, url: '/donation/4'},
					{ id: 3, image: `./images/donation_banner3.png`, url: '/donation/3'},
					{ id: 4, image: `./images/donation_banner2.png`, url: '/donation/2'},
			  ]
			: bannerType === 'celeb'
			? [
					{ id: 1, image: `./images/celeb_banner1.png`, url: '/donation/history'},
					{ id: 2, image: `./images/celeb_banner2.png`, url: '/donation'},
					{ id: 3, image: `./images/celeb_banner3.png`, url: '/store'},
			  ]
			: [];

	const move = (url: string) => {
		Router.push(url);
	};
	return (
		<TopBannerContainer>
			<Slider {...settings}>
				{banner.map((item) => (
					<div key={item.id} onClick={() => move(item.url)}>
						<div
							style={{ backgroundImage: `url(${item.image})`, cursor: 'pointer' }}
							className="main_banner_background_image"
						/>
					</div>
				))}
			</Slider>
		</TopBannerContainer>
	);
};

export const TopBannerContainer = styled.div`
	overflow: hidden;
	margin: 0 auto;
	height: 300px;
	width: 100%;

	.variable-width .slick-slide div {
		height: 300px;
		margin: 0 1px;
		background-size: 1280px 300px;
		outline: none;
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
		height: 300px;
		.variable-width .slick-slide div {
			margin: 0;
			background-size: 100% 300px;
		}
		.slick-arrow {
			top: 50%;
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

	@media screen and (max-width: 830px) {
		height: 250px;
		.variable-width .slick-slide div {
			margin: 0;
			background-size: 100% 250px;
		}
		.slick-arrow {
			top: 40%;
		}
	}
	@media screen and (max-width: 500px) {
		height: 200px;
		.variable-width .slick-slide div {
			margin: 0;
			background-size: 100% 200px;
		}
		.slick-arrow {
			top: 30%;
		}
	}
`;


export default DonationBanner;
