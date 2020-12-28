import React from 'react';
import { useState, useCallback } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import { user } from '../../../../stores/user/types';
import moment from 'moment';

import mypage_history_all from '../../../../public/mypageImages/mypage_history_all.png';
import mypage_history_bid from '../../../../public/mypageImages/mypage_history_bid.png';
import mypage_history_dead_line from '../../../../public/mypageImages/mypage_history_dead_line.png';
import mypage_history_fail from '../../../../public/mypageImages/mypage_history_fail.png';
import mypage_history_success from '../../../../public/mypageImages/mypage_history_success.png';
interface Props {
	user?: user;
	query: any;
}
const MypageHistoryComponent: React.FC<Props> = ({ user, query }) => {
	const category = [
		{
			title: '전체',
			count: String(Number(user?.bid_cnt) + Number(user?.imm_cnt) + Number(user?.ship_cnt) + Number(user?.suc_cnt)),
			image: mypage_history_all,
			line: true,
			type: 'all',
			query_type: true,
		},
		{ title: '입찰', count: user?.bid_cnt, image: mypage_history_bid, line: true, type: 'bid', query_type: false },
		{
			title: '마감임박',
			count: user?.imm_cnt,
			image: mypage_history_dead_line,
			line: true,
			type: 'deadline',
			query_type: false,
		},
		{ title: '실패', count: user?.ship_cnt, image: mypage_history_fail, line: true, type: 'fail', query_type: false },
		{
			title: '낙찰',
			count: user?.suc_cnt,
			image: mypage_history_success,
			line: false,
			type: 'success',
			query_type: false,
		},
	];

	const date = [
		{ title: '전체', type: 'all', query_type: true },
		{ title: '1주일', type: 'week', query_type: false },
		{ title: '1개월', type: 'month', query_type: false },
		{ title: '3개월', type: '3month', query_type: false },
	];
	const [start_dt, setStart_dt] = useState<any>('2020-01-01');
	const [end_dt, setEnd_dt] = useState<any>(moment().format('YYYY-MM-DD'));

	const onClickCategory = (type: string) => {
		Router.push({
			path: '/mypage/history',
			query: {
				type: type,
				date: 'all',
			},
		});
	};

	const onChangeDate = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;

		switch (id) {
			case 'startDate':
				return setStart_dt(value);
			case 'endDate':
				return setEnd_dt(value);
		}
	}, []);

	const onClickDate = (type: string) => {
		if (query.type) {
			Router.push({
				path: '/mypage/history',
				query: {
					type: query.type,
					date: type,
				},
			});
		} else {
			Router.push({
				path: '/mypage/history',
				query: {
					type: 'all',
					date: type,
				},
			});
		}
	};

	return (
		<MypageHistoryWrap>
			<MypageHistoryCategoryContainer>
				<MypageHistoryCategoryContent>
					{category.map((item, index) => (
						<article key={index}>
							<div className="history_wrap" onClick={() => onClickCategory(item.type)}>
								<div className="history_image_wrap">
									<div
										className="history_image_circle"
										style={
											query.type === item.type
												? { backgroundColor: '#8f0ee5' }
												: query.type === undefined && item.query_type
												? { backgroundColor: '#8f0ee5' }
												: {}
										}
									>
										<img src={item.image} alt={item.image} className={`image_${item.type}`} />
									</div>
								</div>
								<p className="history_title">{item.title}</p>
								<p className="history_count">{item.count}</p>
							</div>
							{item.line && <div className="left_line" />}
						</article>
					))}
				</MypageHistoryCategoryContent>
			</MypageHistoryCategoryContainer>
			<SubInfo>
				<p>* 낙찰내역에 한해 6개월 까지만 보관됩니다.</p>
			</SubInfo>
			<HistoryProductContainer>
				<HistoryProductHeader>
					<HeaderLeft>
						{date.map((item) => (
							<p
								key={item.type}
								onClick={() => onClickDate(item.type)}
								style={
									item.type === query.date
										? { backgroundColor: '#8f0ee5', color: '#ffffff', border: '0.5px solid #8f0ee5' }
										: query.date === undefined && item.query_type
										? { backgroundColor: '#8f0ee5', color: '#ffffff', border: '0.5px solid #8f0ee5' }
										: {}
								}
							>
								{item.title}
							</p>
						))}
					</HeaderLeft>
					<HeaderRight>
						<input type="date" value={start_dt} id="startDate" onChange={onChangeDate} />
						<p>~</p>
						<input type="date" value={end_dt} id="endDate" onChange={onChangeDate} />
						<button>조회</button>
					</HeaderRight>
				</HistoryProductHeader>
				<HistoryProductContent>
					<table>
						<thead>
							<tr>
								<th>사진</th>
								<th>상품이름</th>
								<th>배송지</th>
								<th>운송장번호</th>
								<th>나의 입찰가격</th>
							</tr>
						</thead>
						<tbody>
							<tr className="history_table_content">
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
							</tr>
							<tr className="history_table_bottom">
								<td>총금액</td>
								<td></td>
								<td></td>
								<td></td>
								<td>-</td>
							</tr>
						</tbody>
					</table>
					<p>*입찰의 단위는 BERRY 입니다.</p>
				</HistoryProductContent>
			</HistoryProductContainer>
		</MypageHistoryWrap>
	);
};

const MypageHistoryWrap = styled.div`
	margin: 0px 0px 0px 30px;
	max-width: 100%;

	@media screen and (max-width: 930px) {
		margin: 0px 0px 0px 0px;
	}
`;

const MypageHistoryCategoryContainer = styled.div`
	border: 0.3px solid #b4b2b2;
`;

const MypageHistoryCategoryContent = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 21.5px 0px 16.5px 0px;
	& > article {
		width: 100%;
		text-align: center;
		display: flex;
		& > .history_wrap {
			width: 100%;
			cursor: pointer;

			&:hover {
				& > .history_image_wrap {
					& > .history_image_circle {
						background-color: #8f0ee5;
					}
				}
			}
			& > .history_image_wrap {
				display: flex;
				& > .history_image_circle {
					margin: 0 auto;
					width: 51px;
					height: 51px;
					border-radius: 50%;
					background-color: #b4b2b2;
					display: flex;
					& > img {
						margin: auto;
					}
				}
			}
			& > .history_title {
				margin: 5px 0px 0px 0px;
				font-size: 12px;
				color: #333333;
			}
			& > .history_count {
				margin: 3px 0px 0px 0px;
				font-size: 22px;
				font-weight: 500;
			}
		}
		& > .left_line {
			border-right: 0.5px solid #b4b2b2;
			height: 45px;
			margin: auto 0px;
		}
	}

	@media screen and (max-width: 580px) {
		& > article {
			& > .history_wrap {
				width: 100%;
				& > .history_image_wrap {
					& > .history_image_circle {
						width: 40px;
						height: 40px;

						& > img {
							width: 20px;
							height: 20px;
						}
						& > .image_all {
							width: 20px;
							height: 30px;
						}
					}
				}
				& > .history_title {
					font-size: 10px;
				}
				& > .history_count {
					font-size: 14px;
				}
			}
			& > .left_line {
				display: none;
			}
		}
	}
`;

const SubInfo = styled.div`
	margin: 8.5px 0px 0px 0px;
	& > p {
		margin: 0;
		font-size: 10px;
		color: #7c7c7c;
	}
`;

const HistoryProductContainer = styled.div`
	margin: 44.5px 0px 135px 0px;
`;

const HistoryProductHeader = styled.div`
	height: 26px;
	display: flex;
	justify-content: space-between;
`;

const HeaderLeft = styled.div`
	display: flex;
	& > p {
		margin: 0;
		border: 0.5px solid #d6d6d6;
		font-size: 11px;
		color: #1a1a1a;
		width: 80px;
		height: 24px;
		text-align: center;
		line-height: 24px;
		cursor: pointer;
		&:hover {
			color: #ffffff;
			border: 1px solid #8f0ee5;
			background-color: #8f0ee5;
		}
	}
`;

const HeaderRight = styled.div`
	display: flex;
	height: 100%;
	& > input {
		font-size: 11px;
		color: #333333;
		border: 0.5px solid #d6d6d6;
		width: 110px;
	}
	& > p {
		margin: 0px 7.5px;
		color: #b4b2b2;
	}
	& > button {
		margin: 0px 0px 0px 16.5px;
		width: 50px;
		height: 100%;
		border: none;
		cursor: pointer;
		outline: none;
		color: #ffffff;
		font-size: 12px;
		background-color: #8f0ee5;
	}

	@media screen and (max-width: 693px) {
		display: none;
	}
`;

const HistoryProductContent = styled.div`
	margin: 10px 0px 0px 0px;
	& > table {
		width: 100%;
		border-top: 0.5px solid #b4b2b2;
		border-bottom: 0.5px solid #b4b2b2;
		border-spacing: 0;
		& > thead {
			& > tr {
				height: 40px;
				& > th {
					font-size: 12px;
					font-weight: 300;
				}
			}
		}
		& > tbody {
			& > .history_table_content {
				height: 67px;
				text-align: center;
				& > td {
					border-top: 0.5px solid #b4b2b2;
					font-size: 13px;
					font-weight: 500;
				}
			}
			& > .history_table_bottom {
				height: 40px;
				text-align: center;
				& > td {
					border-top: 0.5px solid #b4b2b2;
					font-size: 14px;
				}
			}
		}
	}
	& > p {
		margin: 10.5px 0px 0px 0px;
		font-size: 11px;
		color: #333333;
	}
`;
export default MypageHistoryComponent;
