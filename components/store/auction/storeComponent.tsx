import React from 'react';
import { product } from '../../../stores/product/types';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import MainBanner from '../../layouts/banner/main/MainBanner';
import styled from 'styled-components';
import Link from 'next/link';
import arrow_first from '../../../public/images/arrow_first.png';
import arrow_prev from '../../../public/images/arrow_prev.png';
import arrow_next from '../../../public/images/arrow_next.png';
import arrow_last from '../../../public/images/arrow_last.png';
import Truncate from 'react-truncate';

interface Props {
	product: product[];
	productPage: number;
	pageUpdate: (pageNum: number) => void;
	query: any;
}

const StoreComponent: React.FC<Props> = ({ product, productPage, pageUpdate, query }) => {
	const [category, setCategory] = useState<any>();
	const [categoryList] = useState<{ id: number; title: string; category: string }[]>([
		{ id: 1, title: '애장품', category: '2' },
		{ id: 2, title: '재능', category: '3' },
		{ id: 3, title: '럭키박스', category: '6' },
	]);
	const [sortByList] = useState<{ id: number; title: string; sort: string; queryType: boolean }[]>([
		{ id: 1, title: `전체보기`, sort: 'all', queryType: true },
		{ id: 2, title: '마감임박순', sort: 'end_dt-asc', queryType: false },
		{ id: 3, title: '신상품순', sort: 'product_id-desc', queryType: false },
		{ id: 4, title: '높은 입찰가순', sort: 'price-desc', queryType: false },
		{ id: 5, title: '낮은 입찰가순', sort: 'price-asc', queryType: false },
	]);
	useEffect(() => {
		if (query.category === undefined) {
			setCategory('2');
		} else {
			setCategory(query.category);
		}
	}, [query]);

	const [calcProduct, setCalcProduct] = useState<product[]>([]);
	useEffect(() => {
		setCalcProduct([]);
		if (query.sortBy === undefined || query.sortBy === 'all') {
			setCalcProduct(product);
		} else {
			for (let i = 0; i < product.length; i++) {
				if (product[i].status !== '2') {
					setCalcProduct((state) => [...state, product[i]]);
				}
			}
		}
	}, [product]);

	const data: product[] = calcProduct;
	const [postsPerPage] = useState<number>(20);
	const indexOfLastPost = productPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts: product[] = data.slice(indexOfFirstPost, indexOfLastPost);
	const page: number = data.length / postsPerPage;
	const pageArr: number[] = [];
	for (let i = 1; i <= Math.ceil(page); i++) {
		pageArr.push(i);
	}

	const onClickCategory = (categoryNum: string) => {
		setCategory(categoryNum);
		pageUpdate(1);
		Router.push({
			pathname: '/store',
			query: {
				sortBy: 'all',
				category: categoryNum,
			},
		});
	};

	const onClickSortBy = (sortBy: string) => {
		pageUpdate(1);
		Router.push({
			pathname: '/store',
			query: {
				category: category,
				sortBy: sortBy,
			},
		});
	};
	const pageArrows = (data: string) => {
		scrollTo(0, 0);
		if (data === 'first') {
			pageUpdate(1);
		} else if (data === 'last') {
			pageUpdate(pageArr[pageArr.length - 1]);
		} else if (data === 'next') {
			if (productPage < pageArr[pageArr.length - 1]) {
				pageUpdate(productPage + 1);
			}
		} else if (data === 'prev') {
			if (productPage > 1) {
				pageUpdate(productPage - 1);
			}
		}
	};

	const onClickPage = (number: number) => {
		scrollTo(0, 0);
		pageUpdate(number);
	};

	return (
		<AuctionWrap>
			<MainBanner />
			<AuctionContainer id="auctionContainer">
				<AuctionHeader>
					<AuctionHeaderCategory>
						{categoryList.map((item) => (
							<p
								key={item.id}
								onClick={() => onClickCategory(item.category)}
								style={category === item.category ? { color: '#8f0ee5', fontWeight: 500 } : {}}
							>
								{item.title}
							</p>
						))}
					</AuctionHeaderCategory>
					<AuctionHeaderSort>
						{sortByList.map((item) => (
							<p
								key={item.id}
								onClick={() => onClickSortBy(item.sort)}
								style={
									query.sortBy === item.sort
										? { color: '#333333', fontWeight: 500 }
										: query.sortBy === undefined && item.queryType
										? { color: '#333333', fontWeight: 500 }
										: {}
								}
							>
								{item.title}
							</p>
						))}
					</AuctionHeaderSort>
				</AuctionHeader>
				<AuctionContent>
					{currentPosts &&
						currentPosts.map((item) => (
							<article key={item.product_id}>
								<Link href="/store/product/[id]" as={`/store/product/${item.product_id}`}>
									<a>
										<div className="auction_content_product_image_wrap">
											<div className="auction_content_product_image" style={{ background: `url(${item.image})` }}></div>
											<div
												className={
													item.status === '1'
														? 'auction_content_product_sortBy_deadLine'
														: 'auction_content_product_status'
												}
											>
												<p>{item.category_id==='6'?"오픈예정":item.status === '0' ? '경매예정' : item.status === '1' ? `D-${item.d_day}` : '경매종료'}</p>
											</div>
										</div>
										<div className="auction_content_product_info">
											<h3>{item.donor}</h3>
											<h4><Truncate>{item.product_nm}</Truncate></h4>
											<h5>{item.price} {item.category_id==='6'?"BERRY":"B.POINT"}</h5>
										</div>
									</a>
								</Link>
							</article>
						))}
				</AuctionContent>
				<AuctionPage>
					<p onClick={() => pageArrows('first')}>
						<img src={arrow_first} />
					</p>
					<p onClick={() => pageArrows('prev')}>
						<img src={arrow_prev} />
					</p>
					{pageArr.map((item) => (
						<p key={item} onClick={() => onClickPage(item)} style={productPage === item ? { fontWeight: 500 } : {}}>
							{item}
						</p>
					))}
					<p onClick={() => pageArrows('next')}>
						<img src={arrow_next} />
					</p>

					<p onClick={() => pageArrows('last')}>
						<img src={arrow_last} />
					</p>
				</AuctionPage>
			</AuctionContainer>
		</AuctionWrap>
	);
};

const AuctionWrap = styled.div`
	margin-bottom: 85px;
`;

const AuctionContainer = styled.div`
	width: 1280px;
	margin: 0 auto;
	max-width: 100%;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const AuctionHeader = styled.div`
	margin: 80px 0px 0px 0px;
`;

const AuctionHeaderCategory = styled.div`
	display: flex;
	justify-content: center;
	& > p {
		margin: 0 15px;
		font-size: 22px;
		cursor: pointer;
	}

	@media screen and (max-width: 800px) {
		& > p {
			font-size: 18px;
		}
	}
	@media screen and (max-width: 486px) {
		& > p {
			font-size: 16px;
		}
	}
`;

const AuctionHeaderSort = styled.div`
	margin-top: 30px;
	border-top: 0.5px solid #b4b2b2;
	border-bottom: 0.5px solid #b4b2b2;
	height: 50px;
	display: flex;
	justify-content: center;
	& > p {
		margin: auto 30px;
		font-size: 14px;
		cursor: pointer;
		text-decoration: none;
		color: #333333;
	}

	@media screen and (max-width: 800px) {
		& > p {
			margin: auto 15px;
			font-size: 14px;
		}
	}

	@media screen and (max-width: 592px) {
		& > p {
			font-size: 12px;
			margin: auto 10px;
		}
	}
	@media screen and (max-width: 486px) {
		& > p {
			font-size: 10px;
			margin: auto 5px;
		}
	}
`;

const AuctionContent = styled.div`
	margin: 40.5px 0px 0px 0;
	display: flex;
	flex-wrap: wrap;
	padding-left: 1.5%;
	& > article {
		width: 18.5%;
		margin-bottom: 20px;
		margin-right: 1.5%;
		cursor: pointer;
		&:hover {
			& > a {
				& > .auction_content_product_image_wrap {
					& > .auction_content_product_image {
						transform: scale(1.1);
						transition: transform 0.2s;
					}
				}
				& > .auction_content_product_info {
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
			& > .auction_content_product_image_wrap {
				position: relative;
				width: 100%;
				padding-bottom: 100%;
				overflow: hidden;
				background-color: #ededed;
				& > .auction_content_product_image {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					background-size: cover !important;
				}
				& > .auction_content_product_sortBy_deadLine {
					position: absolute;
					top: 10px;
					right: 10px;
					& > p {
						margin: 0;
						font-size: 15px;
						color: #ff0000;
						font-weight: 500;
					}
				}
				& > .auction_content_product_status {
					position: absolute;
					bottom: 0;
					right: 0;
					background-color: #8f0ee5;
					width: 65px;
					height: 25px;
					color: #fcfcfc;
					font-size: 12px;
					display: flex;
					& > p {
						margin: auto;
					}
				}
			}
			& > .auction_content_product_info {
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

	@media screen and (max-width: 1030px) {
		& > article {
			width: 23.5%;
			& > a {
				& > .auction_content_product_info {
					& > h3,
					h5 {
						font-size: 13px;
					}
					& > h4 {
						font-size: 11px;
					}
				}
			}
		}
	}

	@media screen and (max-width: 880px) {
		justify-content: space-between;
		padding-left: 0;
		& > article {
			width: 48.5%;
			margin-right: 0;
			& > a {
				& > .auction_content_product_info {
					& > h3,
					h5 {
						font-size: 16px;
					}
					& > h4 {
						font-size: 13px;
					}
				}
			}
		}
	}

	@media screen and (max-width: 440px) {
		& > article {
			& > a {
				& > .auction_content_product_info {
					& > h3,
					h5 {
						font-size: 13px;
					}
					& > h4 {
						font-size: 11px;
					}
				}
			}
		}
	}
`;

const AuctionPage = styled.div`
	margin-top: 40px;
	display: flex;
	justify-content: center;
	& > p {
		margin: 0px 10px;
		cursor: pointer;
		font-size: 15px;
	}
`;

export default StoreComponent;
