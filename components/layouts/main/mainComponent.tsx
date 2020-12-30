import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { product } from '../../../stores/product/types';
import MainBanner from '../../layouts/banner/main/MainBanner';
import more_btn from '../../../public/images/more_btn.png';
import Truncate from 'react-truncate';
interface Props {
	product: product[];
	newProduct: product[];
	getMainProduct: (categoryNum: number) => void;
}
const MainComponent: React.FC<Props> = ({ product, newProduct, getMainProduct }) => {
	const [mainProductCategory, setMainProductCategory] = useState<number>(0);
	const onClickProductCategory = (categoryNum: number) => {
		setMainProductCategory(categoryNum);
		getMainProduct(categoryNum);
	};

	const [productLength, setProductLength] = useState<number>(0);
	useEffect(() => {
		if (product.length > 0) {
			if (product.length > 20) {
				setProductLength(20);
			} else {
				for (let i = 1; i < product.length+1; i++) {
					if (i % 5 === 0) {
						setProductLength(i);
					}
				}
			}
		}
	}, [product]);
	return (
		<Wrap>
			<MainBanner />
			<DeadLineItemsContainer>
				<NewProductHeader>
					<p>New product</p>
					<Link href={`/store?sortBy=product_id-desc&&category=2`}>
						<a>
							더보기
							<span />
							<img src={more_btn} />
						</a>
					</Link>
				</NewProductHeader>
				<NewProductContent>
					{newProduct
						? newProduct.slice(0, 5).map((item) => (
								<article key={item.product_id}>
									<Link href="/store/product/[id]" as={`/store/product/${item.product_id}`}>
										<a>
											<div className="new_item_image">
												<div style={{ backgroundImage: `url(${item.image})` }}></div>
											</div>
											<div className="new_item_content">
												<h3>{item.donor}</h3>
												<h4><Truncate lines={1}>{item.product_nm}</Truncate></h4>
												<h5>{`${item.price} B.POINT`}</h5>
											</div>
										</a>
									</Link>
								</article>
						  ))
						: ''}
				</NewProductContent>
			</DeadLineItemsContainer>
			<SmallBanner>
				<div style={{ backgroundImage: `url("./images/main_home_small_banner.png")` }}>
					<p>베리스토어, (사)환경미술협회와 함께하는 특별한 첫번째 캠페인</p>
				</div>
			</SmallBanner>
			<ProductContainer>
				<ProductHeader>
					<div className="main_product_header_left">
						<h2 onClick={() => onClickProductCategory(0)}>기부경매</h2>
						<p onClick={() => onClickProductCategory(2)} style={mainProductCategory === 2 ? { fontWeight: 500 } : {}}>
							애장품
						</p>
						<span>|</span>
						<p onClick={() => onClickProductCategory(3)} style={mainProductCategory === 3 ? { fontWeight: 500 } : {}}>
							재능
						</p>
						<span>|</span>
						<p onClick={() => onClickProductCategory(6)} style={mainProductCategory === 6 ? { fontWeight: 500 } : {}}>
							럭키굿즈
						</p>
					</div>
					<div className="main_product_header_right">
						<Link href="/store">
							<a>
								더보기
								<span />
								<img src={more_btn} />
							</a>
						</Link>
					</div>
				</ProductHeader>
				<ProductContent>
					{product
						? product.slice(0, productLength).map(
								(item) =>
									item.status !== '2' && (
										<article key={item.product_id}>
											<Link href="/store/product/[id]" as={`/store/product/${item.product_id}`}>
												<a>
													<div className="new_item_image">
														<div style={{ backgroundImage: `url(${item.image})` }}></div>
													</div>
													<div className="new_item_content">
														<h3>{item.donor}</h3>
														<h4><Truncate lines={1}>{item.product_nm}</Truncate></h4>
														<h5>{item.price} {item.category_id==='6'?'BERRY':'B.POINT'}</h5>
													</div>
												</a>
											</Link>
										</article>
									)
						  )
						: ''}
				</ProductContent>
			</ProductContainer>
		</Wrap>
	);
};

const Wrap = styled.div`
	height: 100%;
	margin-bottom: 130px;
`;

const DeadLineItemsContainer = styled.div`
	width: 1280px;
	margin: 0 auto;
	z-index: 100;
	max-width: 100%;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const NewProductHeader = styled.div`
	margin: 80px 0px 15px 0px;
	display: flex;
	justify-content: space-between;

	& > p {
		margin: 0;
		font-size: 20px;
		font-weight: 500;
	}
	& > a {
		margin-top: auto;
		cursor: pointer;
		color: #333333;
		text-decoration: none;
		font-size: 11px;
		font-weight: 500;
		& > span {
			margin-right: 5px;
		}
		& > img {
			vertical-align: bottom;
		}
	}
`;
const NewProductContent = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	& > article {
		width: 18.5%;
		margin-bottom: 20px;
		cursor: pointer;
		&:hover {
			& > a {
				& > .new_item_image {
					& > div {
						transform: scale(1.1);
						transition: transform 0.2s;
					}
				}
				& > .new_item_content {
					& > h3,
					h4 {
						color: #b4b2b2;
					}
				}
			}
		}
		& > a {
			text-decoration: none;
			color: black;
			& > .new_item_image {
				position: relative;
				width: 100%;
				padding-bottom: 100%;
				overflow: hidden;
				& > div {
					background-size: cover !important;
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
				}
			}
			& > .new_item_content {
				& > h3 {
					margin: 10px 0px 0px 0px;
					font-size: 15px;
					font-weight: 500;
					letter-spacing: normal;
				}
				& > h4 {
					margin: 0;
					font-size: 12px;
					font-weight: 300;
				}
				& > h5 {
					margin: 10px 0px 0px 0px;
					color: #8f0ee5;
					font-size: 15px;
				}
			}
		}
	}
	@media screen and (max-width: 1250px) {
		& > article {
			width: 18.5%;
			& > a {
				& > .new_item_content {
					& > h3 {
						font-size: 13px;
					}
					& > h4 {
						font-size: 10px;
					}
					& > h5 {
						font-size: 13px;
					}
				}
			}
		}
	}

	@media screen and (max-width: 880px) {
		& > article {
			width: 48.5%;
			& > a {
				& > .new_item_image {
					width: 100%;
					padding-bottom: 100%;
					position: relative;
					& > div {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
					}
				}
				& > .new_item_content {
					& > h3 {
						font-size: 16px;
					}
					& > h4 {
						font-size: 14px;
					}
					& > h5 {
						font-size: 16px;
					}
				}
			}
		}
	}

	@media screen and (max-width: 530px) {
		& > article {
			& > a {
				& > .new_item_content {
					& > h3 {
						font-size: 12px;
					}
					& > h4 {
						font-size: 10px;
					}
					& > h5 {
						font-size: 12px;
					}
				}
			}
		}
	}
`;
const SmallBanner = styled.div`
	margin: 80px 0px 0px 0px;
	& > div {
		width: 100%;
		height: 60px;
		background-size: 100% 60px;
		display: flex;
		& > p {
			margin: auto;
			color: white;
			font-size: 16px;
		}
	}
	@media screen and (max-width: 600px) {
		margin-top: 80px;
		& > div {
			& > p {
				font-size: 13px;
			}
		}
	}
	@media screen and (max-width: 400px) {
		margin-top: 80px;
		& > div {
			& > p {
				font-size: 11px;
			}
		}
	}
`;

const ProductContainer = styled.div`
	width: 1280px;
	max-width: 100%;
	margin: 0 auto;
	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const ProductHeader = styled.div`
	margin: 80px 0px 15px 0px;
	display: flex;
	justify-content: space-between;
	& > .main_product_header_left {
		display: flex;
		& > h2 {
			margin: auto 10px -2.5px 0px;
			color: #333333;
			font-size: 20px;
			font-weight: 500;
			cursor: pointer;
		}
		& > p {
			margin: auto 0px 0px 0px;
			font-size: 12px;
			cursor: pointer;
		}
		& > span {
			font-size: 10px;
			margin: auto 10.5px 2px 10.5px;
			font-weight: 500;
		}
	}
	& > .main_product_header_right {
		margin-top: auto;
		& > a {
			cursor: pointer;
			color: #333333;
			text-decoration: none;
			font-size: 11px;
			font-weight: 500;
			& > span {
				margin-right: 5px;
			}
			& > img {
				vertical-align: middle;
			}
		}
	}
`;

const ProductContent = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	& > article {
		width: 18.5%;
		margin-bottom: 20px;
		cursor: pointer;
		&:hover {
			& > a {
				& > .new_item_image {
					& > div {
						transform: scale(1.1);
						transition: transform 0.2s;
					}
				}
				& > .new_item_content {
					& > h3,
					h4 {
						color: #b4b2b2;
					}
				}
			}
		}
		& > a {
			text-decoration: none;
			color: #333333;
			& > .new_item_image {
				overflow: hidden;
				width: 100%;
				padding-bottom: 100%;
				position: relative;
				& > div {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					background-size: cover;
				}
			}
			& > .new_item_content {
				& > h3 {
					margin: 10px 0px 0px 0px;
					font-size: 15px;
					font-weight: 500;
					letter-spacing: normal;
				}
				& > h4 {
					margin: 0;
					font-size: 12px;
					font-weight: 300;
				}
				& > h5 {
					margin: 10px 0px 0px 0px;
					color: #8f0ee5;
					font-size: 15px;
				}
			}
		}
	}

	@media screen and (max-width: 880px) {
		& > article {
			width: 48.5%;
			& > a {
				& > .new_item_image {
					width: 100%;
					padding-bottom: 100%;
					position: relative;
					& > div {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
					}
				}
				& > .new_item_content {
					& > h3 {
						font-size: 16px;
					}
					& > h4 {
						font-size: 14px;
					}
					& > h5 {
						font-size: 16px;
					}
				}
			}
		}
	}

	@media screen and (max-width: 530px) {
		& > article {
			& > a {
				& > .new_item_content {
					& > h3 {
						font-size: 12px;
					}
					& > h4 {
						font-size: 10px;
					}
					& > h5 {
						font-size: 12px;
					}
				}
			}
		}
	}
`;
export default MainComponent;
