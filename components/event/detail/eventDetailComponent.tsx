import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Parser from 'html-react-parser';
import { event } from '../../../stores/product/types';
import { aes256Decrypt } from '../../../lib/crypto';

interface Props {
	event: event[];
}
const EventDetailComponent: React.FC<Props> = ({ event }) => {
	const [uuid, setUuid] = useState<any>();
	useEffect(()=>{
		if(process.browser){
			if(sessionStorage.getItem('uuid')){
				const sessionData:any = sessionStorage.getItem('uuid');
				setUuid(aes256Decrypt(sessionData));
			}
		}
	},[uuid]);

	return (
		<EventReadWrap>
			{event.length > 0 ? (
				<EventReadContainer>
					<EventReadHeader>
						<h1>{event[0].title}</h1>
						<h2>{event[0].summary}</h2>
						<div>
							<p>
								{`${event[0].start_dt.slice(0, event[0].start_dt.length - 9)} - ${event[0].end_dt.slice(
									0,
									event[0].end_dt.length - 9
								)}`}
							</p>
						</div>
					</EventReadHeader>
					{event[0].content.length > 0 ? (
						<EventContent>
							<div>{Parser(event[0].content)}</div>
						</EventContent>
					) : (
						<EventContent>
							<iframe
								style={{ width: '100%' }}
								id="iframe"
								src={uuid ? `${event[0].url}?user_id=${uuid}` : event[0].url}
								scrolling="no"
								className={`iframe${event[0].event_id}`}
							/>
						</EventContent>
					)}
				</EventReadContainer>
			) : (
				''
			)}
		</EventReadWrap>
	);
};

const EventReadWrap = styled.div`
	width: 800px;
	margin: 0 auto;
	max-width: 100%;

	@media screen and (max-width: 880px) {
		width: calc(100% - 30px);
	}
`;

const EventReadContainer = styled.div`
	margin: 150px 0px;

	@media screen and (max-width: 414px) {
		margin: 30px 0px 50px 0px;
	}
`;

const EventReadHeader = styled.div`
	& > h1 {
		font-size: 20px;
		font-weight: 500;
	}
	& > h2 {
		font-size: 15px;
		font-weight: 300;
		margin-top: 15px;
	}
	& > div {
		display: flex;
		justify-content: space-between;
		& > p {
			font-size: 14px;
			line-height: 40px;
			color: gray;
		}
		& > div {
			& > img {
				width: 40px;
				height: 40px;
				margin-left: 15px;
				cursor: pointer;
			}
		}
	}

	@media screen and (max-width: 414px) {
		& > h1 {
			font-size: 14px;
		}
		& > h2 {
			font-size: 12px;
		}
		& > div {
			flex-wrap: wrap;
			& > p {
				width: 100%;
				font-size: 12px;
				line-height: 20px;
			}
			& > div {
				& > img {
					margin: 0px;
				}
			}
		}
	}
`;

const EventContent = styled.div`
	margin-top: 30px;
	text-align: center;
	& > div {
		& > img {
			width: 100%;
		}
	}
	& > iframe {
		width: 100%;
		border: none;
	}
	& > .iframe25 {
		height: 1300vh;
	}

	& > .iframe31 {
		height: 3200px;
	}
	& > .iframe33 {
		height: 5000px;
	}
	& > .iframe35 {
		height: 2500px;
	}
	& > .iframe37 {
		height: 3100px;
	}
	& > .iframe40 {
		height: 2000px;
	}
	& > .iframe29 {
		height: 3000px;
	}
	& > .iframe44 {
		height: 2500px;
	}
	@media screen and (max-width: 550px) {
		margin-top: 10px;
		& > .iframe25 {
			height: 600vh;
		}
		& > .iframe31 {
			height: 1800px;
		}
		& > .iframe33 {
			height: 3000px;
		}
		& > .iframe35 {
			height: 1500px;
		}
		& > .iframe37 {
			height: 2000px;
		}
		& > .iframe40 {
			height: 1500px;
		}
		& > .iframe29 {
			height: 1600px;
		}
		& > .iframe44 {
		height: 1600px;
	}
	}
`;

export default EventDetailComponent;
