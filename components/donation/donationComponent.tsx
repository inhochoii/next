import React from 'react';
import styled from 'styled-components';
import { donation } from '../../stores/product/types';
import DonationBanner from '../layouts/banner/donation/DonationBanner';
import Router from 'next/router';
import Link from 'next/link';
interface Props {
	donation: donation[];
}
const DonationComponent: React.FC<Props> = ({ donation }) => {
	return (
		<DonationWrap>
			<DonationBanner bannerType={'donation'} />
			<DonationContainer>
				<DonationHeader>
					<h4>베리로 기부하기</h4>
				</DonationHeader>
				<DonationContent>
					<p onClick={() => Router.push('/donation/history')}>기부내역 보러가기</p>
					<div>
						{donation.map((item) => (
							<article key={item.donation_id}>
								<Link href="/donation/[id]" as={`/donation/${item.donation_id}`}>
									<a>
										<div className="donation_image_wrap">
											<div className="donation_image" style={{ backgroundImage: `url(${item.dona_thumb_image})` }} />
											<div className="donation_title">
												<p>{item.org_name}</p>
											</div>
										</div>
									</a>
								</Link>
							</article>
						))}
					</div>
				</DonationContent>
			</DonationContainer>
		</DonationWrap>
	);
};

const DonationWrap = styled.div`
	height: 100%;
`;

const DonationContainer = styled.div`
	width: 1280px;
	margin: 0 auto;
	max-width: 100%;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const DonationHeader = styled.div`
	text-align: center;
	margin: 47px 0px 0px 0px;
	& > h4 {
		margin: 0;
		font-weight: normal;
		font-size: 20px;
	}
`;

const DonationContent = styled.div`
	margin: 50px -10px 210px -10px;
	& > p {
		text-align: right;
		margin-right: 10px;
		font-size: 14px;
		&:hover {
			color: #8f0ee5;
			cursor: pointer;
			font-weight: 500;
		}
	}
	& > div {
		display: flex;
		flex-wrap: wrap;
		margin-left: 10px;
		& > article {
			width: 32.5%;
			margin-right: 0.8%;
			margin-bottom: 10px;
			cursor: pointer;
			&:hover {
				& > a {
					& > .donation_image_wrap {
						& > .donation_image {
							transform: scale(1.1);
							transition: transform 0.2s;
						}
					}
				}
			}
			& > a {
				text-decoration: none;
				color: #333333;
				& > .donation_image_wrap {
					width: 100%;
					position: relative;
					padding-bottom: 50%;
					overflow: hidden;
					& > .donation_image {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						background-size: 100% 100% !important;
					}

					& > .donation_title {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						display: flex;
						& > p {
							margin: auto;
							font-size: 16px;
							color: #ffffff;
							font-weight: 400;
						}
					}
				}
			}
		}
	}

	@media screen and (max-width: 880px) {
		margin: 50px 0px 210px 0px;
		& > p {
			margin-right: 0;
		}
		& > div {
			margin: 0;
			justify-content: space-between;
			& > article {
				width: 48.5%;
				margin-right: 0;
				margin-bottom: 20px;
				& > a {
					& > .donation_image_wrap {
						border-radius: 10px;

						& > .donation_title {
							& > p {
								font-size: 12px;
							}
						}
					}
				}
			}
		}
	}

	@media screen and (max-width: 644px) {
		& > p {
			font-size: 12px;
		}
		& > div {
			& > article {
				width: 100%;
				& > a {
					& > .donation_image_wrap {
						& > .donation_title {
							& > p {
								font-size: 16px;
							}
						}
					}
				}
			}
		}
	}
`;

export default DonationComponent;
