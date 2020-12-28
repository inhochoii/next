import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';
import Modal from 'react-modal';
import { isIE } from 'react-device-detect';

const DonationHistoryComponent: React.FC = () => {
	const [price] = useState<number>(42424880);
	const sampleData = [
		{ title: '1:1 기부 결연', price: '5,400,000원' },
		{ title: '아라월드', price: '10,560,000원' },
		{ title: '해피피플', price: '690,200원' },
		{ title: '한국 NGO레인보우', price: '171,000원' },
		{ title: `만안종합사회복지관(안양시)`, price: '5,000,000원' },
		{ title: 'NGO 한바라기', price: '236,900원' },
		{ title: '사단법인 동물구조 119', price: '151,800원' },
	];
	const modalData = [
		{
			image: '',
			title: '1:1 기부 결연',
			date: '2020/12/02',
			d_id: '-',
			price: '5,400,000원',
			percent: '5,400,000 / 100%',
			content1: `기부내역 : 베리서포터즈 1기 9팀(더블비, 구공탄, 삼삼삼, 걸깝스, 조충현, 권민제, 조제알통, 푸들커플, 뷰티풀너드) 1:1 결연후원`,
			content2: '5만원 * 9팀 * 12개월 = 540만원',
		},
		{
			image: '',
			title: '아라월드',
			date: '2020/08/15',
			d_id: '-',
			price: '10,560,000원',
			percent: '10,560,000 / 100%',
			content1: `8/8 아라월드 지역경제 활성화`,
			content2: '8/15 아라월드 지역경제 활성화',
		},
		{
			image: '',
			title: '해피피플',
			date: '2020/06/26',
			d_id: '0000000195',
			price: '690,200원',
			percent: '483,140 / 70%',
			content1: '',
			content2: '',
		},
		{
			image: '',
			title: '한국 NGO레인보우',
			date: '2020/06/25',
			d_id: '0000000196',
			price: '171,000원',
			percent: '119,700 / 70%',
			content1: '',
			content2: '',
		},
		{
			image: '',
			title: '만안종합사회복지관(안양시)',
			date: '2020/06/24',
			d_id: '0000000197',
			price: '5,000,000원',
			percent: '5,000,000 / 100%',
			content1: '',
			content2: '',
		},
		{
			image: '',
			title: 'NGO 한바라기',
			date: '2020/06/23',
			d_id: '0000000198',
			price: '236,900원',
			percent: '165,830 / 70%',
			content1: '',
			content2: '',
		},
		{
			image: '',
			title: '사단법인 동물구조 119',
			date: '2020/06/22',
			d_id: '0000000199',
			price: '151,800원',
			percent: '106,260 / 70%',
			content1: '',
			content2: '',
		},
	];
	const [testModalData, setTestModalData] = useState<any>('');

	const [modal, setModal] = useState<boolean>(false);
	const toggle = (num: number) => {
		setModal(!modal);
		setTestModalData(modalData[num]);
	};
	const customStyles = {
		overlay: {
			backgroundColor: 'rgba(0,0,0,0.5)',
		},
		content: {
			left: '0',
			margin: 'auto',
			width: globalThis.innerWidth <= 500 ? '100%' : '500px',
			height: '600px',
			padding: '0',
			overflow: 'hidden',
		},
	};
	const closeModal = () => {
		setModal(false);
	};
	return (
		<DonationWrap>
			<DonationContainer>
				<DonationContentHeader>
					<HeaderItem style={isIE ? { height: '100px' } : {}}>
						<div className="donation_header1">
							<h1>공개합니다.</h1>
							<p>베리스토어의 기부 현황을 공개합니다.</p>
						</div>
						<div className="donation_header2" />
						<div className="donation_header3">
							<h1>
								<CountUp start={0} end={price} separator="," />
							</h1>
							<p>현재 누적 기부금(단위:원)</p>
						</div>
					</HeaderItem>
				</DonationContentHeader>
				<DonationDetailContainer>
					<div className="donation_detail_title">
						<p>기부금 상세내역</p>
						{/* <img src={donation_detail_title_image} alt="" /> */}
					</div>
					<div className="line" />
					<DonationDetailContent>
						<div>
							{sampleData.map((item, index) => (
								<article
									className="donation_content"
									key={index}
									onClick={() => toggle(index)}
									style={{ cursor: 'pointer' }}
								>
									<div className="donation_item">
										<div>
											<h3>{item.title}</h3>
											<p>
												<span>{item.price}</span>
												<span>＞</span>
											</p>
										</div>
									</div>
								</article>
							))}
						</div>
						<Modal isOpen={modal} style={customStyles} onRequestClose={closeModal} ariaHideApp={false}>
							{testModalData !== undefined ? (
								<DonationHistoryContainer>
									<div className="modal_header">
										<p>
											<span>수령처</span>
											<small onClick={() => toggle(-1)}>닫기</small>
										</p>
										<div>{testModalData.title}</div>
									</div>
									<div className="modal_content">
										<table>
											<thead>
												<tr>
													<th style={{ borderRight: '1px solid #e5e5e5' }}>전달일시</th>
													<th style={{ borderRight: '1px solid #e5e5e5' }}>경매번호</th>
													<th style={{ borderRight: '1px solid #e5e5e5' }}>낙찰금</th>
													<th>기부금 / 비율</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td style={{ borderRight: '1px solid #e5e5e5' }}>{testModalData.date}</td>
													<td style={{ borderRight: '1px solid #e5e5e5' }}>{testModalData.d_id}</td>
													<td style={{ borderRight: '1px solid #e5e5e5', color: '#8f0ee5', fontWeight: 500 }}>
														{testModalData.price}
													</td>
													<td style={{ color: '#de00d1', fontWeight: 500 }}>{testModalData.percent}</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div className="modal_bottom">
										<p>기부내역</p>
										<div>
											<p>- {testModalData.content1}</p>
											<p>- {testModalData.content2}</p>
										</div>
									</div>
								</DonationHistoryContainer>
							) : (
								''
							)}
						</Modal>
					</DonationDetailContent>
				</DonationDetailContainer>
			</DonationContainer>
		</DonationWrap>
	);
};

const DonationWrap = styled.div`
	height: 100%;
`;

const DonationContainer = styled.div``;

const DonationContentHeader = styled.div`
	background-color: #fffdf5;
	height: 400px;
	display: flex;
`;

const HeaderItem = styled.div`
	display: flex;
	margin: auto;
	flex-wrap: wrap;
	& > div {
		margin: 0 30px;
	}
	& > .donation_header2 {
		border: 2px solid;
	}
	& > .donation_header1 {
		text-align: right;
		& > h1 {
			font-size: 38px;
			font-weight: 500;
			margin-bottom: 20px;
		}
		& > p {
			margin-bottom: 0px;
			font-size: 14px;
		}
	}
	& > .donation_header3 {
		text-align: left;
		& > h1 {
			font-size: 38px;
			font-weight: 500;
			color: #8f0ee5;
			margin-bottom: 20px;
		}
		& > p {
			margin-bottom: 0px;
			font-size: 14px;
		}
	}

	@media screen and (max-width: 440px) {
		justify-content: center;
		& > .donation_header2 {
			display: none;
		}
		& > .donation_header3 {
			margin-top: 30px;
		}
	}
`;

const DonationDetailContainer = styled.div`
	width: 1280px;
	max-width: 100%;
	margin: 0px auto 100px auto;

	& > .donation_detail_title {
		display: flex;
		justify-content: space-between;
		& > p {
			margin-bottom: 0;
			font-size: 24px;
			font-weight: 500;
			height: 80px;
			line-height: 90px;
		}
		& > img {
			height: 80px;
		}
	}

	& > .line {
		border-bottom: 3px solid #8f0ee5;
		width: 100px;
	}

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const DonationDetailContent = styled.div`
	margin: 100px -10px 0px -10px;
	& > div {
		margin-left: 10px;
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		& > .donation_content {
			width: 23.8%;
			margin-right: 1%;
			margin-bottom: 10px;
			position: relative;
			padding-bottom: 15%;
			& > .donation_item {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				border: 1px solid #e5e5e5;
				padding: 20px;
				& > div {
					height: 100%;
					position: relative;
					& > h3 {
						color: #be75ee;
						font-size: 22px;
						font-weight: 500;
						margin: 0;
					}
					& > p {
						position: absolute;
						bottom: 0;
						margin: 0;
						display: flex;
						& > span {
							color: #8d8d8d;
							font-weight: 500;
						}
					}
				}
				&:hover {
					background-color: #f2f2f2;
					cursor: pointer;

					& > div {
						& > h3 {
							color: #8f0ee5;
							font-weight: 500;
						}
					}
				}
			}
		}
	}

	@media screen and (max-width: 880px) {
		margin: 100px 0px 0px 0px;
		& > div {
			justify-content: space-between;
			width: 100%;
			margin: 0;
			& > .donation_content {
				padding-bottom: 30%;
				width: 48%;
				margin: 0px 0px 10px 0px;
				& > .donation_item {
					border-radius: 10px;
					& > div {
						& > h3 {
							font-size: 18px;
						}
						& > p {
						}
					}
				}
			}
		}
	}

	@media screen and (max-width: 530px) {
		margin: 30px 0px 0px 0px;
		& > div {
			& > .donation_content {
				width: 100%;
				height: 130px;
				padding-bottom: 0;
				margin-right: 0;
				& > .donation_item {
					border-radius: 10px;
					& > div {
						& > h3 {
							font-size: 18px;
						}
						& > p {
						}
					}
				}
			}
		}
	}
`;

const DonationHistoryContainer = styled.div`
	& > .modal_header {
		& > p {
			width: 100%;
			height: 60px;
			background-color: #f2f2f2;
			line-height: 60px;
			border-bottom: 1px solid #e5e5e5;
			font-size: 14px;
			font-weight: 500;
			display: flex;
			& > span {
				margin: 0 auto;
			}
			& > small {
				font-size: 14px;
				cursor: pointer;
			}
		}
		& > div {
			text-align: center;
			height: 150px;
		}
	}
	& > .modal_content {
		& > table {
			width: 100%;
			border-spacing: 0px;
			& > thead {
				text-align: center;
				& > tr {
					height: 60px;
					& > th {
						background-color: #f2f2f2;
						border-top: 1px solid #e5e5e5;
						width: 25%;
						font-size: 12px;
					}
				}
			}
			& > tbody {
				text-align: center;
				& > tr {
					height: 100px;
					& > td {
						border-top: 1px solid #e5e5e5;
						border-bottom: 1px solid #e5e5e5;
						width: 25%;
						font-size: 12px;
					}
				}
			}
		}
	}
	& > .modal_bottom {
		& > p {
			width: 100%;
			height: 60px;
			background-color: #e5e5e5;
			text-align: center;
			line-height: 60px;
			border-bottom: 1px solid #e5e5e5;
			font-size: 14px;
			font-weight: 500;
		}
		& > div {
			& > p {
				font-size: 14px;
				margin-left: 6%;
			}
		}
	}
`;
export default DonationHistoryComponent;
