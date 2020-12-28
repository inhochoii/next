import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { celeb } from '../../stores/product/types';
import DonationBanner from '../layouts/banner/donation/DonationBanner';
import Link from 'next/link';

interface Props {
	celeb: celeb[];
}
const CelebComponent: React.FC<Props> = ({ celeb }) => {
	const [celebSort, setCelebSort] = useState<number>(1);

	return (
		<CelebWrap>
			<DonationBanner bannerType={'celeb'} />
			<CelebContainer>
				<CelebHeader>
					<h4>참여 셀럽</h4>
					<div>
						<p style={celebSort === 1 ? { fontWeight: 500 } : {}} onClick={() => setCelebSort(1)}>
							전체보기
						</p>
						<p>참여날짜순</p>
					</div>
				</CelebHeader>
				<CelebContent>
					<div>
						{celeb.map((item) => (
							<article key={item.celeb_id}>
									<Link href="/celebrity/[id]" as={`/celebrity/${item.celeb_id}`}>
										<a>
											<div className="celeb_content_image">
												<div className="celeb_image" style={{ backgroundImage: `url(${item.celeb_img})` }}></div>
												<div className="celeb_content_hover">
													<p>{item.celeb_nm}</p>
												</div>
											</div>
										</a>
									</Link>
							</article>
						))}
					</div>
				</CelebContent>
			</CelebContainer>
		</CelebWrap>
	);
};

const CelebWrap = styled.div``;

const CelebContainer = styled.div`
	width: 1280px;
	margin: 0 auto;
	max-width: 100%;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const CelebHeader = styled.div`
	text-align: center;
	& > h4 {
		margin: 47px 0px 0px 0px;
		font-size: 22px;
		font-weight: 400;
	}
	& > div {
		margin: 20.5px 0px 0px 0px;
		display: flex;
		justify-content: center;
		border-top: 0.5px solid #b4b2b2;
		border-bottom: 0.5px solid #b4b2b2;
		height: 50px;

		& > p {
			margin: 0px 15px;
			line-height: 50px;
			font-size: 16px;
			cursor: pointer;
		}
	}
`;

const CelebContent = styled.div`
	margin: 54.5px -10px 300px -10px;
	& > div {
		display: flex;
		flex-wrap: wrap;
		margin-left: 10px;
		& > article {
			width: 19%;
			margin: 0px 1% 10px 0px;
			cursor: pointer;
			&:hover {
				&>a{
					& > .celeb_content_image {
						& > .celeb_content_hover {
							display: flex;
							background-color: rgba(26, 26, 26, 0.76);
						}
					}
				}
			}
			&>a{
				& > .celeb_content_image {
						width: 100%;
						position: relative;
						padding-bottom: 100%;
						& > .celeb_image {
							position: absolute;
							top: 0;
							bottom: 0;
							left: 0;
							right: 0;
							background-size: 100% 100% !important;
						}
						& > .celeb_content_hover {
							position: absolute;
							display: none;
							top: 0;
							bottom: 0;
							left: 0;
							right: 0;
							& > p {
								margin: auto;
								font-size: 16px;
								font-weight: 400;
								color: white;
							}
						}
					}
			}
		}
	}

	@media screen and (max-width: 830px) {
		& > div {
			& > article {
				width: 23.9%;
			}
		}
	}

	@media screen and (max-width: 530px) {
		margin: 54.5px 0px 300px 0px;
		& > div {
			margin: 0;
			justify-content: space-between;
			& > article {
				margin-right: 0;
				width: 49%;
			}
		}
	}
`;

export default CelebComponent;
