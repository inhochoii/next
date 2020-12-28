import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import arrow_first from '../../public/images/arrow_first.png';
import arrow_last from '../../public/images/arrow_last.png';
import arrow_next from '../../public/images/arrow_next.png';
import arrow_prev from '../../public/images/arrow_prev.png';
const WalletComponent: React.FC = () => {
	const [bpointSort, setBpointSort] = useState<number>(1);
	const [berrySort, setBerrySort] = useState<number>(1);

	return (
		<WalletWrap>
			<TransactionBpointHistoryContainer>
				<BpointHistoryHeader>
					<h4>B.POINT 최근 거래내역</h4>
					<p onClick={() => setBpointSort(1)} style={bpointSort === 1 ? { fontWeight: 500 } : {}}>
						전체
					</p>
					<span>|</span>
					<p onClick={() => setBpointSort(2)} style={bpointSort === 2 ? { fontWeight: 500 } : {}}>
						입금
					</p>
					<span>|</span>
					<p onClick={() => setBpointSort(3)} style={bpointSort === 3 ? { fontWeight: 500 } : {}}>
						출금
					</p>
				</BpointHistoryHeader>
				<TransactionHistoryContent>
					<table>
						<thead>
							<tr>
								<th>일시</th>
								<th>구분</th>
								<th>입금</th>
								<th>출금</th>
								<th>잔액</th>
							</tr>
						</thead>
						<tbody>
							<tr className="transaction_content_table">
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
							</tr>
							<tr className="transaction_content_bottom">
								<td>총금액</td>
								<td></td>
								<td></td>
								<td></td>
								<td>-</td>
							</tr>
						</tbody>
					</table>
				</TransactionHistoryContent>
				<TransactionHistoryPage>
					<p>
						<img src={arrow_first} />
					</p>
					<p>
						<img src={arrow_prev} />
					</p>
					<p>1</p>
					<p>
						<img src={arrow_next} />
					</p>
					<p>
						<img src={arrow_last} />
					</p>
				</TransactionHistoryPage>
			</TransactionBpointHistoryContainer>
			<TransactionBerryHistoryWrap>
				<TransactionBerryHistoryContainer>
					<BerryHistoryHeader>
						<h4>BERRY 최근 거래내역</h4>
						<p onClick={() => setBerrySort(1)} style={berrySort === 1 ? { fontWeight: 500 } : {}}>
							전체
						</p>
						<span>|</span>
						<p onClick={() => setBerrySort(2)} style={berrySort === 2 ? { fontWeight: 500 } : {}}>
							입금
						</p>
						<span>|</span>
						<p onClick={() => setBerrySort(3)} style={berrySort === 3 ? { fontWeight: 500 } : {}}>
							출금
						</p>
					</BerryHistoryHeader>
					<TransactionHistoryContent>
						<table>
							<thead>
								<tr>
									<th>일시</th>
									<th>구분</th>
									<th>입금</th>
									<th>출금</th>
									<th>잔액</th>
								</tr>
							</thead>
							<tbody>
								<tr className="transaction_content_table">
									<td>-</td>
									<td>-</td>
									<td>-</td>
									<td>-</td>
									<td>-</td>
								</tr>
								<tr className="transaction_content_bottom">
									<td>총금액</td>
									<td></td>
									<td></td>
									<td></td>
									<td>-</td>
								</tr>
							</tbody>
						</table>
					</TransactionHistoryContent>
					<TransactionHistoryPage>
						<p>
							<img src={arrow_first} />
						</p>
						<p>
							<img src={arrow_prev} />
						</p>
						<p>1</p>
						<p>
							<img src={arrow_next} />
						</p>
						<p>
							<img src={arrow_last} />
						</p>
					</TransactionHistoryPage>
				</TransactionBerryHistoryContainer>
			</TransactionBerryHistoryWrap>
		</WalletWrap>
	);
};

const WalletWrap = styled.div``;

const TransactionBpointHistoryContainer = styled.div`
	width: 1280px;
	margin: 0 auto;
	max-width: 100%;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const BpointHistoryHeader = styled.div`
	margin: 0;
	display: flex;
	& > h4 {
		font-size: 20px;
		font-weight: 500;
		margin: 0px 10px 0px 0px;
	}
	& > p,
	span {
		font-size: 12px;
		margin: auto 0px 2px 0px;
	}
	& > p {
		cursor: pointer;
	}
	& > span {
		margin-left: 5px;
		margin-right: 5px;
		margin-bottom: 3px;
	}

	@media screen and (max-width: 880px) {
		& > h4 {
			font-size: 16px;
		}
		& > p,
		span {
			font-size: 11px;
			margin: auto 0px 0px 0px;
		}
		& > span {
			margin: 5px 3px 0px 3px;
		}
	}
`;

const TransactionHistoryContent = styled.div`
	margin: 15.5px 0px 0px 0px;
	& > table {
		width: 100%;
		border-top: 0.5px solid #b4b2b2;
		border-bottom: 0.5px solid #b4b2b2;
		border-spacing: 0px;
		& > thead {
			& > tr {
				height: 40px;
				& > th {
					border-bottom: 0.5px solid #b4b2b2;
					font-size: 12px;
					font-weight: 300;
				}
			}
		}
		& > tbody {
			& > .transaction_content_table {
				height: 70px;
				& > td {
					border-bottom: 0.5px solid #b4b2b2;
					text-align: center;
				}
			}
			& > .transaction_content_bottom {
				height: 40px;
				& > td {
					text-align: center;
					font-size: 14px;
				}
			}
		}
	}
`;

const TransactionHistoryPage = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 20px;
	& > p {
		margin: 0px 10px;
		cursor: pointer;
		font-size: 15px;
	}
`;

const TransactionBerryHistoryWrap = styled.div`
	margin: 50px 0px 0px 0px;
	background-color: #f8f8f8;
	padding: 80px 0px 165px 0px;
`;

const TransactionBerryHistoryContainer = styled.div`
	width: 1280px;
	margin: 0 auto;
	max-width: 100%;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const BerryHistoryHeader = styled.div`
	margin: 0;
	display: flex;
	& > h4 {
		font-size: 20px;
		font-weight: 500;
		margin: 0px 10px 0px 0px;
	}
	& > p,
	span {
		font-size: 12px;
		margin: auto 0px 2px 0px;
	}
	& > p {
		cursor: pointer;
	}
	& > span {
		margin-left: 5px;
		margin-right: 5px;
		margin-bottom: 3px;
	}

	@media screen and (max-width: 880px) {
		& > h4 {
			font-size: 16px;
		}
		& > p,
		span {
			font-size: 11px;
			margin: auto 0px 0px 0px;
		}
		& > span {
			margin: 5px 3px 0px 3px;
		}
	}
`;

export default WalletComponent;
