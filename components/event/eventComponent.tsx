import React from 'react';
import styled from 'styled-components';
import { event } from '../../stores/product/types';
import moment from 'moment';
import MainBanner from '../layouts/banner/main/MainBanner';
import Link from 'next/link';

interface Props {
	event: event[];
}
const EventComponent: React.FC<Props> = ({ event }) => {
	return (
		<EventWrap>
			<MainBanner />
			<EventContainer>
				<EventHeader>
					<h4>이벤트</h4>
				</EventHeader>
				<EventContent>
					{event.map((item) => (
						<article key={item.event_id}>
							<Link href="/event/[id]" as={`/event/${item.event_id}`}>
								<a>
									<div className="event_content_image" style={{ backgroundImage: `url(${item.image})` }}>
										<div>
											<div>
												<h3>{item.title}</h3>
												<p>{item.summary}</p>
											</div>
										</div>
									</div>
									<div className="event_content_info">
										<p>{`${moment(item.start_dt).format('YYYY.MM.DD')}~${moment(item.end_dt).format('YYYY.MM.DD')}`}</p>
									</div>
								</a>
							</Link>
						</article>
					))}
				</EventContent>
			</EventContainer>
		</EventWrap>
	);
};

const EventWrap = styled.div``;

const EventContainer = styled.div`
	width: 1280px;
	max-width: 100%;
	margin: 0 auto;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const EventHeader = styled.div`
	margin: 80px 0px 0px 0px;
	text-align: center;
	& > h4 {
		font-size: 20px;
		color: #333333;
	}
`;

const EventContent = styled.div`
	margin: 65px 0px 100px 0px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	& > article {
		cursor: pointer;
		width: 48.5%;
		margin: 0px 0px 38px 0px;
		&:hover {
			& > a {
				& > .event_content_image {
					& > div {
						background-color: rgba(26, 26, 26, 0.86);
						display: flex;
						& > div {
							margin: auto;
							display: block;
							color: white;
							text-align: center;
							& > h3 {
								font-size: 20px;
								margin: 0;
							}
							& > p {
								font-size: 14px;
								margin: 5px 0px 0px 0px;
							}
						}
					}
				}
			}
		}
		& > a {
			text-decoration: none;
			color: #333333;
			& > .event_content_image {
				width: 100%;
				position: relative;
				padding-bottom: 45%;
				background-size: 100% 100%;
				& > div {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					& > div {
						display: none;
					}
				}
			}
			& > .event_content_info {
				border: 1px solid #efefef;
				height: 44px;
				display: flex;
				& > p {
					margin: auto;
					font-size: 13px;
					color: #8f0ee5;
				}
			}
		}
	}
	@media screen and (max-width: 880px) {
		justify-content: center;
		& > article {
			width: 80%;
			&:hover {
				& > a {
					& > .event_content_image {
						& > div {
							border-radius: 6px 6px 0px 0px;
						}
					}
				}
			}
			& > a {
				& > .event_content_image {
					border-radius: 6px 6px 0px 0px;
				}
				& > .event_content_info {
					border-radius: 0px 0px 6px 6px;
				}
			}
		}
	}

	@media screen and (max-width: 644px) {
		& > article {
			width: 100%;
		}
	}
`;

export default EventComponent;
