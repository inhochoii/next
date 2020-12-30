import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { product, productDetail } from '../../../../stores/product/types';
import Parser from 'html-react-parser';
import { calculDate } from '../../../../lib/calculDate';
import PersonIcon from '@material-ui/icons/Person';
import ShareIcon from '@material-ui/icons/Share';
import CopyToClipboard from 'react-copy-to-clipboard';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
	productDetail?: productDetail;
	product: product[];
}

const StoreDetailComponent: React.FC<Props> = ({ productDetail, product }) => {

	const [shareState, setShareState] = useState<boolean>(false);
	const onClickImage = (item: string) => {
		setImage(item);
	};
	const [image, setImage] = useState<string>('');
	useEffect(() => {
		if (productDetail !== undefined) {
			setImage(productDetail.image !== undefined ? productDetail.image[0] : '');
		} else {
			setImage('');
		}
	}, [productDetail]);

	const [date, setDate] = useState<any>('');

	useEffect(() => {
		setDate(calculDate(Number(moment(productDetail?.end_dt)) - Number(moment())));
		const value = setInterval(() => {
			setDate(calculDate(Number(moment(productDetail?.end_dt)) - Number(moment())));
		}, 1000);
		return () => clearInterval(value);
	}, [productDetail]);

	const [recommendProduct, setRecommendProduct] = useState<product[]>([]);
	useEffect(() => {
		setRecommendProduct([]);
		if (productDetail !== undefined) {
			for (let i = 0; i < product.length; i++) {
				if (
					productDetail.donor === product[i].donor &&
					product[i].status !== '2' &&
					productDetail.product_id !== product[i].product_id
				) {
					setRecommendProduct((state) => [...state, product[i]]);
				}
			}
		}
	}, [product, productDetail]);

	const [bidPrice, setBidPrice] = useState<string>('');

	const onClickBid = () => {
		alert('그랜드 오픈 후, 입찰이 가능합니다.');
	};

	const onChangePrice = (e: any) => {
		const { value } = e.target;
		setBidPrice(comma(uncomma(value)));
	};

	const comma = (str: string) => {
		str = String(str);
		return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	};

	const uncomma = (str: string) => {
		str = String(str);
		return str.replace(/[^\d]+/g, '');
	};

	return (
		<ProductWrap>
			<DdayContainer>
				{productDetail?.category_id==='6'?
				<p>오픈예정</p>:
				productDetail?.status === '0' ? (
					<p>경매예정</p>
				) : productDetail?.status === '1' ? (
					<p>{`D-${date.replace(/일/gi, ' ')}`}</p>
				) : (
					<p>경매종료</p>
				)
				}
			</DdayContainer>
			<ProductContainer>
				<ProductImageContent>
					<ProductMainImage>
						<div style={{ backgroundImage: `url(${image})` }}>
							<div></div>
						</div>
					</ProductMainImage>
					<ProductImageList>
						{productDetail?.image !== undefined &&
							productDetail.image.map((item, index) => (
								<article
									key={index}
									style={image === item ? { border: '1px solid' } : {}}
									onClick={() => onClickImage(item)}
								>
									<div style={{ backgroundImage: `url(${item})` }}></div>
								</article>
							))}
					</ProductImageList>
				</ProductImageContent>
				<ProductInfoContent>
					<div className="product_info_top_wrap">
						<h3 className="product_info_donor">{`${productDetail?.donor}`}</h3>
						<ShareIcon
							style={shareState ? { color: '#8f0ee5' } : { color: '#333333' }}
							onClick={() => setShareState(!shareState)}
						/>
						{shareState && (
							<CopyToClipboard text={window.location.href}>
								<div onClick={() => alert('URL 주소가 복사되었습니다.')}>
									<div>
										<p>URL</p>
									</div>
									<p>URL 복사하기</p>
								</div>
							</CopyToClipboard>
						)}
					</div>
					<p className="product_info_name">{productDetail?.product_nm}</p>
					<div className="product_info_bid_person">
						{productDetail?.category_id==='6'?<p></p>:
							<>
							<PersonIcon />
							<p>0명이 경매에 입찰하였습니다.</p>
							</>
						}
					</div>
					<div className="product_info_bid_content">
						<div>
						{
								productDetail?.category_id==='6'?
								<>
								<p>참여 가능 베리</p>
								<p>{productDetail.price} BERRY</p>
								</>:
								<>
								<p>시작 입찰가</p>
								<p>{productDetail?.price} B.POINT</p>
								</>
							}
						</div>
						{Number(productDetail?.category_id) !== 6 && (
							<div>
								<p>현재 최고 입찰가</p>
								<p>{productDetail?.price} B.POINT</p>
							</div>
						)}
						{
							productDetail?.category_id==='6'?
							<div>
								<p>오픈 예정일</p>
								<p>{moment(productDetail.end_dt).format('YYYY-MM-DD')}</p>
							</div>
							:
							<div>
							<p>경매기간</p>
							<p>{`${moment(productDetail?.start_dt).format('YYYY.MM.DD')} ~ ${moment(productDetail?.end_dt).format(
								'YYYY.MM.DD'
							)}`}</p>
						</div>
						}
					</div>
					{Number(productDetail?.category_id) !== 3 ? (
						<>
							<div className="product_info_delivery_content1">
								<p className="delivery_text">택배배송</p>
								<small className="delivery_text_line">|</small>
								<p className="delivery_text">무료배송</p>
								<p className="delivery_more_text">제주, 도서지역 추가 3,000원</p>
							</div>
							{productDetail?.category_id==='6'?
							<div></div>:
							<div className="product_info_delivery_content2">
								<p>출고기간</p>
								<small>|</small>
								<p>경매 낙찰일로 부터 1일</p>
								<small>|</small>
								<p>주말, 공휴일 제외</p>
							</div>}
							<div className="product_info_bid_price_wrap">
								<input
									id="bidPrice"
									value={bidPrice}
									placeholder={productDetail?.category_id==='6'?"참여하실 BERRY의 양을 입력해 주세요.":"입찰하실 B.POINT의 양을 입력해 주세요."}
									onChange={onChangePrice}
								></input>
								<button onClick={onClickBid}>{productDetail?.category_id==='6'?"참여하기":"입찰하기"}</button>
							</div>
						</>
					) : (
						<>
							<div className="product_info_enter_content">
								<h5>재능사용권이란?</h5>
								<p>셀럽의 재능을 원하는 날, 원하는 장소로 요청할 수 있는 사용권 입니다.</p>
							</div>
							<div className="product_info_buy_process">
								<h5>구매절차</h5>
								<div>
									상호 일정조율이 필요한 상품으로 절차에 따라 '선택판매' 됩니다.
									<br />
									<b>
										구매의향서 제시 {`->`} 판매대상자 선택 {`->`} 확정
									</b>
									<br />
									판매마감일이 되면 셀럽이 직접 구매의향서를 확인하고 판매대상자를 선택합니다. (개별안내)
									<br />
									교통비(수도권 외), 숙박비(필요 시), 식비 등 실비는 사전협의를 통해 확인 후 별도 청구됩니다.
									<br />
									개별안내를 받으실 날로부터 3일 이내 결제를 완료하셔야 하며, 초과 시 취소될 수 있습니다.
									<br />
									최저 20% ~ 최대 70%가 기부되는 상품으로 희망가격을 구매 의향서에 직접 기재 해 주세요.
								</div>
							</div>
						</>
					)}
				</ProductInfoContent>
			</ProductContainer>
			<ProductDetailInfoContainer>
				<h3 className="detail_info_title">상품 상세설명</h3>
				<DetailInfoContent>
					<div className="product_summary_wrap">
						<h4>소개</h4>
						<TextareaAutosize value={productDetail?.summary} readOnly />
					</div>
					<div className="product_content_wrap">
						<h4>상세설명</h4>
						{Parser(String(productDetail?.content))}
					</div>
				</DetailInfoContent>
			</ProductDetailInfoContainer>
			{Number(productDetail?.category_id) === 3 && 
				<WantBuyEnterContainer>
					<WantBuyEnterHeader>
						<h4>구매의향서 작성</h4>
					</WantBuyEnterHeader>
					<WantBuyEnterContent>
						<p>구매의향서 작성 준비중입니다.</p>
					</WantBuyEnterContent>
				</WantBuyEnterContainer>
			}
			{Number(productDetail?.category_id) ===2&&
			recommendProduct.length > 0 && (
				<RecommendProductContainer>
					<RecommendProductHeader>
						<h4>{recommendProduct[0].donor}님의 이런 상품(재능)은 어떠세요?</h4>
					</RecommendProductHeader>
					<RecommendProductContent>
						{recommendProduct.map((item) => (
							<article key={item.product_id}>
								<a href={`/store/product/${item.product_id}`}>
									<div className="recommend_product_image_wrap">
										<div style={{ backgroundImage: `url(${item.image})` }} />
									</div>
									<div className="recommend_product_content_wrap">
										<h3>{item.donor}</h3>
										<h4>{item.product_nm}</h4>
										<h5>{`${item.price} B.POINT`}</h5>
									</div>
								</a>
							</article>
						))}
					</RecommendProductContent>
				</RecommendProductContainer>
				)
			}
		</ProductWrap>
	);
};

const ProductWrap = styled.div`
	width: 1280px;
	margin: 0 auto;
	max-width: 100%;
	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const DdayContainer = styled.div`
	margin: 115px 0px 5px 0px;
	& > p {
		margin: 0;
		color: #ff0000;
		font-size: 15px;
		font-weight: 500;
	}

	@media screen and (max-width: 880px) {
		margin: 30px 0px 5px 0px;
	}
`;
// 상품 이미지 및 정보들에 대한 flex 값
const ProductContainer = styled.div`
	display: flex;

	@media screen and (max-width: 880px) {
		flex-wrap: wrap;
	}
`;

const ProductImageContent = styled.div`
	width: 35%;
	@media screen and (max-width: 880px) {
		width: 100%;
	}
`;

const ProductMainImage = styled.div`
	& > div {
		position: relative;
		width: 100%;
		padding-bottom: 100%;
		background-size: cover !important;
		& > div {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}

	@media screen and (max-width: 880px) {
		& > div {
			padding-bottom: 60%;
			background-size: 100% 100% !important;
			border-radius: 10px;
			& > div {
			}
		}
	}

	@media screen and (max-width: 644px) {
		& > div {
			padding-bottom: 100%;
			background-size: cover !important;
		}
	}
`;

const ProductImageList = styled.div`
	margin: 10px 0px 0px 0px;
	display: flex;
	flex-wrap: wrap;

	& > article {
		width: 18.5%;
		margin: 0px 1.4% 6px 0px;
		cursor: pointer;
		overflow: hidden;
		& > div {
			width: 100%;
			padding-bottom: 100%;
			background-size: cover !important;
		}
	}

	@media screen and (max-width: 880px) {
		& > article {
			width: 10%;
		}
	}
`;

const ProductInfoContent = styled.div`
	width: 60%;
	margin: 0px 0px 0px 50px;
	& > .product_info_top_wrap {
		position: relative;
		display: flex;
		& > .product_info_donor {
			margin: 0;
			font-size: 24px;
			font-weight: 500;
		}
		& > svg {
			margin: auto 0px auto 10px;
			cursor: pointer;
			width: 20px;
			height: 20px;
		}
		& > div {
			position: absolute;
			top: 30px;
			left: 80px;
			border: 1px solid #d6d6d6;
			background-color: #ffffff;
			width: 160px;
			display: flex;
			padding: 10px 0px;
			cursor: pointer;
			&:hover {
				background-color: #8f0ee5;
				& > p {
					color: #ffffff;
				}
			}
			& > div {
				margin: 0px 0px 0px 15px;
				width: 24px;
				height: 24px;
				background-color: #d6d6d6;
				border-radius: 50%;
				display: flex;
				font-size: 7px;
				& > p {
					margin: 5px auto auto auto;
				}
			}
			& > p {
				margin: auto 0px auto 8px;
				font-size: 12px;
				font-weight: 500;
			}
		}
	}
	& > .product_info_name {
		margin: 10px 0px 0px 0px;
		color: #333333;
		font-size: 16px;
	}
	& > .product_info_bid_person {
		margin-top: 20px;
		display: flex;
		color: #b4b2b2;
		& > svg {
			width: 18px;
			height: 18px;
		}
		& > p {
			margin: 0px 2px 0px 0px;
			font-size: 12px;
		}
	}
	& > .product_info_bid_content {
		margin: 10px 0px 0px 0px;
		padding: 25px 0px 6px 0px;
		border-top: 1px solid #b4b2b2;
		border-bottom: 1px solid #b4b2b2;
		& > div {
			display: flex;
			justify-content: space-between;
			margin: 0px 0px 19px 0px;
			& > p {
				margin: 0;
				color: #333333;
				font-size: 15px;
				font-weight: 500;
			}
		}
	}
	& > .product_info_delivery_content1 {
		margin: 33.5px 0px 0px 0px;
		font-size: 12px;
		display: flex;
		& > .delivery_text {
			margin: 0;
			color: #56b0ff;
		}
		& > .delivery_text_line {
			margin: 0 3px;
			color: #56b0ff;
		}
		& > .delivery_more_text {
			margin: 0px 0px 0px 10px;
			color: #b4b2b2;
		}
	}
	& > .product_info_delivery_content2 {
		margin: 8px 0px 0px 0px;
		display: flex;
		font-size: 12px;
		& > p {
			margin: 0;
		}
		& > small {
			margin: 0 3px;
			font-weight: 500;
		}
	}
	& > .product_info_bid_price_wrap {
		margin: 10px 0px 0px 0px;
		height: 45px;
		display: flex;
		justify-content: space-between;
		& > input {
			width: 60%;
			height: 96%;
			border: 1px solid #b4b2b2;
			padding: 0 10px;
			font-size: 12px;
			outline: none;
		}
		& > button {
			width: 35%;
			height: 100%;
			border: none;
			background-color: #8f0ee5;
			color: #fcfcfc;
			font-size: 16px;
			outline: none;
			cursor: pointer;
		}
	}
	& > .product_info_enter_content {
		border-bottom: 1px solid #b4b2b2;
		padding: 20px 0px 30px 0px;
		& > h5 {
			font-weight: normal;
			color: #56b0ff;
			font-size: 16px;
			margin: 0;
		}
		& > p {
			margin: 15px 0px 0px 0px;
			font-size: 14px;
		}
	}
	& > .product_info_buy_process {
		padding-top: 20px;
		& > h5 {
			font-weight: normal;
			color: #56b0ff;
			font-size: 16px;
			margin: 0;
		}
		& > div {
			margin-top: 15px;
			font-size: 14px;
			line-height: 27.5px;
		}
	}

	@media screen and (max-width: 880px) {
		width: 100%;
		margin: 10px 0px 0px 0px;
	}
	@media screen and (max-width: 644px) {
		& > .product_info_bid_price_wrap {
			& > input {
				width: 65%;
			}
			& > button {
				width: 25%;
				font-size: 13px;
			}
		}
		& > .product_info_enter_content {
			& > p {
				font-size: 12px;
			}
		}
		& > .product_info_buy_process {
			& > div {
				font-size: 12px;
			}
		}
	}
`;

const ProductDetailInfoContainer = styled.div`
	margin: 150px 0px 100px 0px;
	text-align: left;
	& > .detail_info_title {
		font-size: 22px;
		margin: 0;
	}

	@media screen and (max-width: 880px) {
		margin: 80px 0px 100px 0px;
	}
`;

const DetailInfoContent = styled.div`
	border-top: 0.5px solid #b4b2b2;
	margin-top: 31.5px;

	& > .product_summary_wrap {
		margin: 46.5px 0px 0px 0px;
		& > h4 {
			font-size: 18px;
		}
		& > textarea {
			width:100%;
			margin: 20px 0px 0px 0px;
			font-size: 14px;
			line-height:25px;
			border:none;
			outline:none;
			resize:none;
			font-family: 'Noto Sans KR', sans-serif;
			font-weight:300;
			color:#333333;
		}
	}
	& > .product_content_wrap {
		margin: 100px 0px 0px 0px;
		& > h4 {
			font-size: 18px;
		}
		& > p {
			margin: 20px 0px 0px 0px;
			font-size: 14px;
		}
	}

	@media screen and (max-width: 880px) {
		& > .product_summary_wrap {
			& > p {
				font-size: 12px;
			}
		}
		& > .product_content_wrap {
			margin: 50px 0px 0px 0px;
			& > p {
				font-size: 12px;
			}
		}
	}
`;

const RecommendProductContainer = styled.div`
	margin: 0px 0px 130px 0px;
`;
const RecommendProductHeader = styled.div`
	& > h4 {
		font-size: 18px;
		font-weight: 500;
		margin: 0;
	}
`;
const RecommendProductContent = styled.div`
	margin: 10px 0px 0px 0px;
	display: flex;
	flex-wrap: wrap;
	& > article {
		width: 18%;
		margin: 0px 10px 10px 0px;
		cursor: pointer;
		&:hover {
			& > a {
				& > .recommend_product_image_wrap {
					& > div {
						transform: scale(1.1);
						transition: transform 0.2s;
					}
				}
				& > .recommend_product_content_wrap {
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
			& > .recommend_product_image_wrap {
				position: relative;
				padding-bottom: 100%;
				overflow: hidden;
				& > div {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					background-size: 100% 100% !important;
				}
			}
			& > .recommend_product_content_wrap {
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
			width: 24%;
			& > a {
				& > .recommend_product_image_wrap {
					border-radius: 5px;
				}
				& > .recommend_product_content_wrap {
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

	@media screen and (max-width: 530px) {
		justify-content: space-between;
		& > article {
			margin: 0px 0px 10px 0px;
			width: 45%;
		}
	}
`;

const WantBuyEnterContainer = styled.div``;
const WantBuyEnterHeader = styled.div`
	border-bottom: 0.5px solid #b4b2b2;
	padding-bottom: 20px;
	& > h4 {
		font-size: 20px;
		font-weight: 500;
		margin: 0;
	}
`;

const WantBuyEnterContent = styled.div`
	margin: 49.5px 0px 100px 0px;
	& > p {
		margin: 0;
		font-size: 14px;
		color: #b4b2b2;
		font-weight: 500;
	}
`;

export default StoreDetailComponent;
