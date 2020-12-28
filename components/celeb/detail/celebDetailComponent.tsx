import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { celebItem, product } from '../../../stores/product/types';
import Parser from 'html-react-parser';
import { Player, BigPlayButton } from 'video-react';
import Link from 'next/link';

interface Props {
	celebItem?: celebItem;
	product: product[];
}

const CelebDetailComponent: React.FC<Props> = ({ celebItem, product }) => {
	const [celebProduct, setCelebProduct] = useState<product[]>([]);
	const [celebEndProduct, setCelebEndProduct] = useState<product[]>([]);
	const [donationAmount, setDonationAmount] = useState<string>('');
	useEffect(() => {
		setCelebProduct([]);
		setCelebEndProduct([]);
		if (celebItem !== undefined) {
			for (let i = 0; i < product.length; i++) {
				if (product[i].donor === celebItem.celeb_nm || product[i].product_nm.indexOf(celebItem.celeb_nm) > -1) {
					if (product[i].status !== '2') {
						setCelebProduct((state) => [...state, product[i]]);
					} else {
						setCelebEndProduct((state) => [...state, product[i]]);
					}
				}
			}
		}
	}, [celebItem, product]);

	const onChnageInput = () => {
		setDonationAmount('');
	};

	return (
		<CelebItemWrap>
			<CelebContainer>
				<CelebImageContent>
					<div>
						<div style={{ backgroundImage: `url(${celebItem?.celeb_img})` }} />
					</div>
				</CelebImageContent>
				<CelebInfoContent>
					<h4>{celebItem?.celeb_nm}</h4>
					<p>[상세내용]</p>
					<p style={{ whiteSpace: 'pre-wrap' }}>{Parser(String(celebItem?.description).replace(/,/gi, ''))}</p>
					<div className="celeb_dona_content">
						<input
							type="text"
							placeholder="후원할 BERRY의 양을 적어주세요."
							onChange={onChnageInput}
							id="donationAmount"
							value={donationAmount}
						/>
						<button onClick={() => alert('후원하기 기능 추가 예정입니다.')}>후원하기</button>
					</div>
				</CelebInfoContent>
			</CelebContainer>
			<CelebVideoContainer>
				<Header>
					<h4>축하영상</h4>
				</Header>
				<CelebVideoContent>
					<Player poster={celebItem?.videos[0].thumb_url} src={celebItem?.videos[0].video_url}>
						<BigPlayButton position="center" />
					</Player>
				</CelebVideoContent>
			</CelebVideoContainer>
			<ProductContainer>
				<Header>
					<h4>경매 진행중 상품</h4>
				</Header>
				<ProductContent>
					{celebProduct.length > 0 ? (
						celebProduct.map((item, index) => (
							<article key={index}>
								<Link href="/store/product/[id]" as={`/store/product/${item.product_id}`}>
									<a>
										<div className="product_content_image_wrap">
											<div className="product_image" style={{ backgroundImage: `url(${item.image})` }} />
											<div className="product_image_hover">
												<p>{item.product_nm}</p>
											</div>
										</div>
									</a>
								</Link>
							</article>
						))
					) : (
						<p className="product_none_data_text">경매 진행중 상품이 없습니다.</p>
					)}
				</ProductContent>
			</ProductContainer>
			<EndProductContainer>
				<Header>
					<h4>경매 마감 상품</h4>
				</Header>
				<ProductContent>
					{celebEndProduct.length > 0 ? (
						celebEndProduct.map((item, index) => (
							<article key={index}>
								<Link href="/store/product/[id]" as={`/store/product/${item.product_id}`}>
									<a>
										<div className="product_content_image_wrap">
											<div className="product_image" style={{ backgroundImage: `url(${item.image})` }} />
											<div className="product_image_hover">
												<p>{item.product_nm}</p>
											</div>
										</div>
									</a>
								</Link>
							</article>
						))
					) : (
						<p className="product_none_data_text">경매 진행중 상품이 없습니다.</p>
					)}
				</ProductContent>
			</EndProductContainer>
		</CelebItemWrap>
	);
};

const CelebItemWrap = styled.div`
	width: 1280px;
	max-width: 100%;
	margin: 0 auto;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const CelebContainer = styled.div`
	margin: 100px 0px 100px 0px;
	display: flex;

	@media screen and (max-width: 670px) {
		flex-wrap: wrap;
		margin: 30px 0px 50px 0px;
	}
`;

const CelebImageContent = styled.div`
	width: 19.5%;
	& > div {
		width: 100%;
		position: relative;
		padding-bottom: 100%;
		& > div {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-size: 100% 100% !important;
		}
	}
	@media screen and (max-width: 670px) {
		width: 100%;
		& > div {
			padding-bottom: 80%;
		}
	}
`;

const CelebInfoContent = styled.div`
	margin: 0px 0px 0px 42px;
	width: 78.5%;
	position: relative;
	& > h4 {
		margin: 0;
		color: #8f0ee5;
		font-size: 22px;
		font-weight: 500;
	}
	& > p {
		margin: 20px 0px 0px 0px;
		font-size: 14px;
	}
	& > .celeb_dona_content {
		position: absolute;
		bottom: 0;
		height: 38px;
		display: flex;
		& > input {
			width: 250px;
			height: 95%;
			border: 1px solid #b4b2b2;
			font-size: 11px;
			outline: none;
			padding: 0 5px;
		}
		& > button {
			height: 100%;
			border: 1px solid #8f0ee5;
			background-color: #8f0ee5;
			color: #ffffff;
			width: 90px;
			cursor: pointer;
			outline: none;
		}
	}

	@media screen and (max-width: 670px) {
		width: 100%;
		margin: 10px 0px 0px 0px;
		& > h4 {
			font-size: 18px;
		}
		& > p {
			margin: 10px 0px 0px px;
			font-size: 12px;
		}
		& > .celeb_dona_content {
			position: relative;
			margin-top: 20px;
			width: 100%;
			& > input {
				width: 80%;
			}
		}
	}
`;

const CelebVideoContainer = styled.div``;

const Header = styled.div`
	border-bottom: 0.5px solid #b4b2b2;
	& > h4 {
		margin: 0px 0px 10.5px 0px;
		font-size: 18px;
		font-weight: 500;
	}

	@media screen and (max-width: 670px) {
		& > h4 {
			font-size: 16px;
		}
	}
`;

const CelebVideoContent = styled.div`
	margin: 31.5px 0px 100px 0px;
	width: 620px;
	& > div {
		outline: none;
		& > video {
			outline: none;
		}
	}
	@media screen and (max-width: 670px) {
		width: 100%;
	}
`;

const ProductContainer = styled.div``;

const ProductContent = styled.div`
	margin: 20.5px 0px 100px 0px;
	display: flex;
	flex-wrap: wrap;
	& > .product_none_data_text {
		margin: 0;
		font-size: 14px;
		color: #333333;
	}
	& > article {
		width: 180px;
		margin: 0px 20px 0px 0px;
		cursor: pointer;
		&:hover {
			& > a {
				& > .product_content_image_wrap {
					& > .product_image_hover {
						display: flex;
					}
				}
			}
		}
		& > a {
			text-decoration: none;
			color: #333333;
			& > .product_content_image_wrap {
				position: relative;
				padding-bottom: 100%;
				& > .product_image {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					background-size: 100% 100% !important;
				}
				& > .product_image_hover {
					display: none;
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					background-color: rgba(26, 26, 26, 0.86);
					& > p {
						margin: auto;
						font-size: 14px;
						font-weight: 500;
						color: white;
						width: 80%;
					}
				}
			}
		}
	}

	@media screen and (max-width: 450px) {
		justify-content: space-between;
		& > article {
			margin: 0px 0px 15px 0px;
			width: 45%;
		}
	}
`;

const EndProductContainer = styled.div``;

export default CelebDetailComponent;
