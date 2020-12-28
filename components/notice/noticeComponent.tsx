import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { notice } from '../../stores/notice/types';
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment';
import { kakaoChat } from '../../lib/kakaoChat';
import Truncate from 'react-truncate';

interface Props {
	notice: notice[];
}
const NoticeComponent: React.FC<Props> = ({ notice }) => {
	const [contentNum, setContentNum] = useState<number>(-1);
	const data: notice[] = notice;
	const [posts, setPosts] = useState<notice[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);

	useEffect(() => {
		setPosts(data);
	}, [data]);

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts: notice[] = notice ? posts.slice(indexOfFirstPost, indexOfLastPost) : [];

	// Change page
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const onClickNotice = (num: number) => {
		if (contentNum === num) {
			setContentNum(-1);
		} else {
			setContentNum(num);
		}
	};

	const pageNumbers: any = [];
	for (let i = 1; i <= Math.ceil(notice && data.length / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	const pageArrows = (data: string) => {
		scrollTo(0, 0);
		if (data === 'first') {
			setCurrentPage(1);
		} else if (data === 'last') {
			setCurrentPage(pageNumbers[pageNumbers.length - 1]);
		} else if (data === 'next') {
			if (currentPage < pageNumbers[pageNumbers.length - 1]) {
				setCurrentPage(currentPage + 1);
			}
		} else if (data === 'prev') {
			if (currentPage > 1) {
				setCurrentPage(currentPage - 1);
			}
		}
	};
	return (
		<NoticeWrap>
			<NoticeContainer>
				<NoticeTopContent>
					<div className="notice_top_left_content">
						<img src={`./images/notice_image1.png`} alt="notice_image1" />
						{/* <p className="notice_top_sub_text_1">Tel. 02-541-0415</p> */}
						<p className="notice_top_sub_text_1">문의 가능 시간</p>
						<p className="notice_top_sub_text_2">평일 9:00~19:00 점심시간 13:00~14:00</p>
					</div>
					<div className="center_line" />
					<div className="notice_top_right_content" onClick={kakaoChat}>
						<img src={`./images/notice_image2.png`} alt="notice_image2" />
						<p className="notice_top_sub_text_1">카카오 문의하기</p>
						<p className="notice_top_sub_text_2">평일 9:00~19:00 점심시간 13:00~14:00</p>
					</div>
				</NoticeTopContent>
				<NoticeContent>
					<h2>공지사항</h2>
					<table>
						<thead>
							<tr>
								<th className="notice_number">번호</th>
								<th className="notice_title">제목</th>
								<th className="notice_created_at">등록일</th>
							</tr>
						</thead>
						{currentPosts.length === 0 ? (
							<tbody>
								<tr style={{ height: '60px' }}>
									<td>-</td>
									<td className="notice_content_title">-</td>
									<td>-</td>
								</tr>
							</tbody>
						) : (
							currentPosts.map((item) => (
								<tbody className="notice_table_tbody" key={item.notice_id}>
									<tr onClick={() => onClickNotice(item.notice_id)} className="notice_title_tr">
										<td>{item.notice_id}</td>
										<td className="notice_content_title"><Truncate>{item.title}</Truncate></td>
										<td>{moment(item.created_at).format('YYYY.MM.DD')}</td>
									</tr>
									{contentNum === item.notice_id && (
										<tr className="notice_content_tr">
											<td></td>
											<td>
												<TextareaAutosize value={item.content} readOnly />
											</td>
											<td></td>
										</tr>
									)}
								</tbody>
							))
						)}
					</table>
				</NoticeContent>
				<NoticePage>
					{notice
						? notice.length > 0 && (
								<>
									<p onClick={() => pageArrows('first')}>
										<img src={`./images/arrow_first.png`} />
									</p>
									<p onClick={() => pageArrows('prev')}>
										<img src={`./images/arrow_prev.png`} />
									</p>
									{pageNumbers.map((item) => (
										<p
											key={item}
											onClick={() => paginate(item)}
											style={currentPage === item ? { fontWeight: 500 } : {}}
										>
											{item}
										</p>
									))}
									<p onClick={() => pageArrows('next')}>
										<img src={`./images/arrow_next.png`} />
									</p>

									<p onClick={() => pageArrows('last')}>
										<img src={`./images/arrow_last.png`} />
									</p>
								</>
						  )
						: ''}
				</NoticePage>
			</NoticeContainer>
		</NoticeWrap>
	);
};

const NoticeWrap = styled.div`
	width: 1280px;
	max-width: 100%;
	margin: 0 auto;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const NoticeContainer = styled.div`
	margin: 90px 0px 0px 0px;
`;

const NoticeTopContent = styled.div`
	padding: 0 8%;
	display: flex;
	justify-content: space-around;
	border: 0.5px solid #b4b2b2;
	height: 255px;
	& > div {
		text-align: center;
		& > img {
			margin: 40px 0px 0px 0px;
		}
		& > .notice_top_sub_text_1 {
			font-size: 15px;
			margin: 18px 0px 0px 0px;
		}
		& > .notice_top_sub_text_2 {
			color: #56b0ff;
			font-size: 14px;
			margin: 5px 0px 0px 0px;
		}
	}
	& > .notice_top_left_content {
		& > img {
			width: 152px;
			height: 107px;
		}
	}
	& > .notice_top_right_content {
		cursor: pointer;
		& > img {
			width: 176px;
			height: 107px;
		}

		&:hover {
			& > .notice_top_sub_text_1 {
				font-weight: 500;
			}
		}
	}
	& > .center_line {
		border-right: 1px solid #b4b2b2;
		height: 155px;
		margin: auto 0px;
	}

	@media screen and (max-width: 880px) {
		padding: 0;
		& > div {
			& > img {
				margin: 30px 0px 0px 0px;
			}
			& > .notice_top_sub_text_1 {
				font-size: 14px;
			}
			& > .notice_top_sub_text_2 {
				color: #56b0ff;
				font-size: 12px;
				margin: 10px 0px 0px 0px;
			}
		}
	}

	@media screen and (max-width: 530px) {
		height: 200px;
		& > div {
			& > .notice_top_sub_text_1 {
				font-size: 12px;
			}
			& > .notice_top_sub_text_2 {
				font-size: 10px;
			}
		}
		& > .notice_top_left_content {
			& > img {
				width: 122px;
				height: 77px;
			}
		}
		& > .notice_top_right_content {
			& > img {
				width: 146px;
				height: 77px;
			}
		}
		& > .center_line {
			display: none;
		}
	}
`;

const NoticeContent = styled.div`
	& > h2 {
		margin: 47.5px 0px 0px 0px;
		font-size: 20px;
	}
	& > table {
		margin: 20px 0px 0px 0px;
		width: 100%;
		border-spacing: 0;
		border-top: 0.5px solid #b4b2b2;
		border-bottom: 0.5px solid #b4b2b2;
		& > thead {
			& > tr {
				height: 40px;
				& > th {
					font-size: 12px;
					font-weight: normal;
				}
				& > .notice_number {
					width: 17.5%;
				}
				& > .notice_title {
					width: 65%;
				}
				& > .notice_created_at {
					width: 17.5%;
				}
			}
		}
		& > tbody {
			& > tr {
				& > td {
					text-align: center;
					border-top: 0.5px solid #b4b2b2;
					font-size: 13px;
				}
				& > .notice_content_title {
					text-align: left;
				}
			}
		}
		& > .notice_table_tbody {
			& > .notice_title_tr {
				cursor: pointer;
				height: 60px;
			}
			& > .notice_content_tr {
				background-color: #f8f8f8;
				& > td {
					padding: 26px 0px;
					border-top: none;
					text-align: left;
					& > textarea {
						width: 100%;
						border: none;
						background: none;
						overflow: hidden;
						outline: none;
						font-family: 'Noto Sans KR', sans-serif;
						font-weight: 300;
					}
				}
			}
		}
	}
`;

const NoticePage = styled.div`
	margin: 40px 0px 150px 0px;
	display: flex;
	justify-content: center;
	& > p {
		margin: 0px 10px;
		cursor: pointer;
		font-size: 15px;
	}
`;

export default NoticeComponent;
