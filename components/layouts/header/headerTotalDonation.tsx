import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import cancle_btn from '../../../public/images/cancle_btn.png';

const HeaderToTalDonation: React.FC = () => {
	const [donationState, setDonationState] = useState<boolean>();
	const [price] = useState<number>(42424880); // 총 기부 누적금액 numberType

	const onClickDelete = () => {
		setDonationState(false);
		sessionStorage.setItem("header_donation","1");
	};

	useEffect(()=>{
		if(process.browser){
			setDonationState(sessionStorage.getItem("header_donation")?false:true)
		}
	},[donationState]);

	return (
			<>
			{
				donationState&&
				<HeaderTotalDonation>
				<div className="header_donation_content">
					<p className="header_donation_p">
						<b>TODAY</b> <span>|</span> 실시간 누적 기부금액{' '}
						<b style={{ marginLeft: '8px' }}>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</b>
					</p>
					<p className="header_donation_cancle" onClick={onClickDelete}>
						<img src={cancle_btn} />
					</p>
				</div>
			</HeaderTotalDonation>
			}
			</>
	);
};

const HeaderTotalDonation = styled.div`
	background-color: #8f0ee5;
	display: flex;
	height: 50px;
	& > .header_donation_content {
		width: 1280px;
		margin: 0 auto;
		display: flex;
		position: relative;
		& > p {
			font-size: 14px;
			color: #ffffff;
		}
		& > .header_donation_p {
			position: relative;
			margin: auto;
			display: flex;
			& > span {
				font-size: 12px;
				margin: auto 8px;
			}
		}
		& > .header_donation_cancle {
			position: absolute;
			right: 0;
			top: 3px;
			& > img {
				cursor: pointer;
				margin: auto 0;
			}
		}
	}
	@media screen and (max-width: 1310px) {
		& > .header_donation_content {
			width: calc(100% - 30px);
		}
	}

	@media screen and (max-width: 530px) {
		& > .header_donation_content {
			justify-content: space-between;
			& > .header_donation_p {
				margin: auto 0;
			}
			& > .header_donation_cancle {
				position: relative;
			}
		}
	}
`;
export default HeaderToTalDonation;
