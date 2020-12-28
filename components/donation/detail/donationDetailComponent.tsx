import React from 'react';
import { useState, useEffect } from 'react';
import { donation } from '../../../stores/product/types';
import styled from 'styled-components';
import moment from 'moment';
import Parser from 'html-react-parser';
import { balance } from '../../../stores/user/types';
import * as bcrypt from 'bcryptjs';
import Modal from 'react-modal';
import danger_image from '../../../public/images/danger_image.png';
import profile_password_setting from '../../../public/images/profile_password_setting.png';

interface Props {
	donationDetail: donation[];
	balance?: balance;
	donation: (amount: number) => void;
	pincode: string;
}

const DonationDetailComponent: React.FC<Props> = ({ donationDetail, balance, donation, pincode }) => {
	const [donationState] = useState<number>(1);
	const [donaAmount, setDonaAmount] = useState<string>('');

	const [modal, setModal] = useState<boolean>(false);
	const [sendCheckModal, setSendCheckModal] = useState<boolean>(false);

	const onChnageInput = (e: any) => {
		const { id, value } = e.target;
		if (id === 'donaAmount') {
			if (!isNaN(Number(value))) {
				setDonaAmount(value);
			}
		}
	};

	const onClickDonation = () => {
		if (donaAmount === '') {
			alert('후원 금액을 입력해주세요.');
		} else if (Number(balance?.data.balance.slice(0, balance.data.balance.length - 18)) < Number(donaAmount)) {
			alert('보유 BERRY를 확인해주세요.');
		} else {
			// donation(Number(donaAmount));
			setSendCheckModal(!sendCheckModal);
		}
	};

	//핀코드 및 랜덤 배열
	const [inputPincode, setInputPincode] = useState<string>('');
	const initArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	const shuffle = (arr: any) => {
		for (let i = 0; i < arr.length; i++) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
	};
	const [shuffleArray, setShuffleAraay] = useState<any>(shuffle(initArray));

	// 모달 스타일
	const customStyles = {
		overlay: {
			backgroundColor: 'rgba(0,0,0,0.5)',
		},
		content: {
			margin: 'auto',
			width: '295px',
			height: '305px',
			padding: '0',
			overflow: 'hidden',
			borderRadius: '0',
			border: '1px solid #fcfcfc',
		},
	};
	//전송 여부 체크 모달 true
	const onClickSendCheck = () => {
		setSendCheckModal(false);
		setModal(!modal);
	};

	//핀코드 입력
	const onClickPincode = (num: number) => {
		if (inputPincode.length < 6) {
			if (num < 10) {
				setInputPincode(inputPincode + num);
			}
		}
	};

	//핀코드 모달 close 누르면 초기화(입력, 배열 섞기)
	const closeModal = () => {
		setModal(false);
		setInputPincode('');
		setShuffleAraay(shuffle(initArray));
	};
	useEffect(() => {
		if (inputPincode.length === 6) {
			if (bcrypt.compareSync(inputPincode, pincode)) {
				donation(Number(donaAmount));
			} else {
				setInputPincode('');
				alert('핀코드가 일치하지 않습니다.');
			}
		}
	}, [inputPincode]);

	return (
		<>
			{donationDetail.length > 0 && (
				<DonationDetailWrap>
					<DonationDetailTopImage>
						<div className="donation_detail_image" />
						<div className="donation_detail_content">
							<div>
								<p className="donation_detail_category_name">{donationDetail[0].category_nm}</p>
								<p className="donation_detail_org_name">{donationDetail[0].org_name}</p>
								<p className="donation_detail_title">{donationDetail[0].dona_title}</p>
							</div>
						</div>
					</DonationDetailTopImage>
					<DonationDetailTopSub>
						<div>
							<p className="donation_detail_sub_title">모금 기간</p>
							<p className="donation_detail_sub_content">{`${moment(donationDetail[0].dona_started_at).format(
								'YYYY.MM.DD'
							)} - ${moment(donationDetail[0].dona_ended_at).format('YYYY.MM.DD')}`}</p>
						</div>
						<div className="donation_detail_sub_center_wrap">
							<p className="donation_detail_sub_title">참여인원</p>
							<p className="donation_detail_sub_content">{donationDetail[0].dona_person}명</p>
						</div>
						<div>
							<p className="donation_detail_sub_title">비영리 법인 고유번호</p>
							<p className="donation_detail_sub_content">
								{donationDetail[0].org_unique_num ? donationDetail[0].org_unique_num : '-'}
							</p>
						</div>
					</DonationDetailTopSub>
					<TotalDonationAmountContent>
						<p className="total_donation_amount_title">누적 모금액</p>
						<div>
							<h4>
								{Number(donationDetail[0].dona_amount)
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							</h4>
							<p>BERRY</p>
						</div>
					</TotalDonationAmountContent>
					<DonationDetailContainer>
						<DonationDetailHeader>
							<h4>모금함 소개</h4>
						</DonationDetailHeader>
						<DonationDetailContent>{Parser(String(donationDetail[0].dona_content))}</DonationDetailContent>
					</DonationDetailContainer>
					{/* <DonationSubDetailContainer>
                <DonationDetailHeader>
                    <h4>{donationDetail[0].org_name}</h4>
                </DonationDetailHeader>
            </DonationSubDetailContainer> */}
					<ActivityDonationContaner>
						<DonationDetailHeader>
							<div>
								<h4>기부방법</h4>
								<p style={donationState === 1 ? { fontWeight: 500 } : {}}>BERRY</p>
								<small>|</small>
								<p onClick={() => alert('B.POINT 기능 추가 예정입니다.')}>B.POINT</p>
							</div>
						</DonationDetailHeader>
						<ActivityDonationContent>
							{sessionStorage.getItem('uuid') ? (
								Number(balance?.data.balance) > 0 ? (
									<p>{balance?.data.balance.slice(0, balance.data.balance.length - 18)} BERRY 보유</p>
								) : (
									<p>0 BERRY 보유</p>
								)
							) : (
								<p>로그인 후 이용 가능합니다.</p>
							)}
							{sessionStorage.getItem('uuid') ? (
								<input
									type="text"
									id="donaAmount"
									value={donaAmount}
									onChange={onChnageInput}
									placeholder="기부하실 금액을 입력해주세요."
								/>
							) : (
								<input type="text" placeholder="로그인 후 이용 가능합니다." readOnly />
							)}
						</ActivityDonationContent>
					</ActivityDonationContaner>
					<ButtonContainer>
						<button onClick={onClickDonation}>후원하기</button>

						{/* 송금 진행 여부 확인 모달 */}
						<Modal isOpen={sendCheckModal} style={customStyles} ariaHideApp={false}>
							<ModalHeader>
								<div className="modal_header_top">
									<p onClick={() => setSendCheckModal(false)}>닫기</p>
								</div>
							</ModalHeader>
							<SendCheckModalContent>
								<img src={danger_image} alt="danger_image" />
								<h5>주의</h5>
								<p className="modal_content_danger1">후원하기 전 입력하신 BERRY를 확인하셨나요?</p>
								<p className="modal_content_danger2">후원하기 후 변경 및 취소는 불가능합니다.</p>
								<div>
									<button className="modal_content_cancle_btn" onClick={() => setSendCheckModal(false)}>
										취소
									</button>
									<button className="modal_content_complete_btn" onClick={onClickSendCheck}>
										확인
									</button>
								</div>
							</SendCheckModalContent>
						</Modal>

						{/* 핀번호 입력 모달 */}
						<Modal isOpen={modal} style={customStyles} ariaHideApp={false}>
							<ModalHeader>
								<div className="modal_header_top">
									<h1>결제암호 설정</h1>
									<p onClick={closeModal}>닫기</p>
								</div>
								<p>설절된 비밀번호를 입력해주세요.</p>
							</ModalHeader>
							<PassWordSettingContainer>
								<div className="password_setting_content1">
									<div className="password_dot">
										<p style={inputPincode.length >= 1 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={inputPincode.length >= 2 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={inputPincode.length >= 3 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={inputPincode.length >= 4 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={inputPincode.length >= 5 ? { backgroundColor: '#8f0ee5' } : {}} />
										<p style={inputPincode.length >= 6 ? { backgroundColor: '#8f0ee5' } : {}} />
									</div>
								</div>
								<div className="password_setting_content2">
									{shuffleArray.map((item: any, index: number) => (
										<div
											key={index}
											className={`password_setting_${index}`}
											onClick={() => onClickPincode(item)}
											style={item < 10 ? { cursor: 'pointer' } : {}}
										>
											<p>{item < 10 ? item : ''}</p>
										</div>
									))}
									<div id="delete" onClick={() => setInputPincode('')}>
										<p>전체삭제</p>
									</div>
									<div id="remove" onClick={() => setInputPincode(inputPincode.slice(0, inputPincode.length - 1))}>
										<img id="remove_image" src={profile_password_setting} alt="" />
									</div>
								</div>
							</PassWordSettingContainer>
						</Modal>
					</ButtonContainer>
				</DonationDetailWrap>
			)}
		</>
	);
};

const DonationDetailWrap = styled.div`
	width: 1280px;
	margin: 0 auto;
	max-width: 100%;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const DonationDetailTopImage = styled.div`
	position: relative;
	width: 100%;
	height: 300px;
	& > .donation_detail_image {
		background-color: #323232;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	& > .donation_detail_content {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		& > div {
			margin: 0 auto;
			& > p {
				color: #ffffff;
				text-align: center;
			}
			& > .donation_detail_category_name {
				width: 180px;
				font-size: 16px;
				padding: 8px 0px;
				margin: 87px auto 0px auto;
				border: 2px solid #ffffff;
				border-radius: 60px;
			}
			& > .donation_detail_org_name {
				margin: 10px auto 0px auto;
				font-size: 26px;
				font-weight: 400;
			}
			& > .donation_detail_title {
				font-size: 18px;
				margin: 30px auto 0px auto;
			}
		}
	}

	@media screen and (max-width: 880px) {
		height: 200px;
		& > .donation_detail_content {
			& > div {
				& > .donation_detail_category_name {
					margin: 30px auto 0px auto;
					font-size: 14px;
				}
				& > .donation_detail_org_name {
					font-size: 22px;
				}
				& > .donation_detail_title {
					font-size: 16px;
				}
			}
		}
	}

	@media screen and (max-width: 530px) {
		& > .donation_detail_content {
			& > div {
				& > .donation_detail_category_name {
					font-size: 12px;
				}
				& > .donation_detail_org_name {
					font-size: 16px;
				}
				& > .donation_detail_title {
					font-size: 12px;
				}
			}
		}
	}
`;

const DonationDetailTopSub = styled.div`
	height: 90px;
	width: 100%;
	background-color: #f6f6f6;
	display: flex;
	justify-content: center;
	& > div {
		display: flex;
		margin: 0;
		& > p {
			margin: auto 0;
			font-size: 16px;
			font-weight: 500;
		}
		& > .donation_detail_sub_title {
			color: #b4b2b2;
			margin-right: 10px;
		}
		& > .donation_detail_sub_content {
			color: #333333;
		}
	}
	& > .donation_detail_sub_center_wrap {
		margin: 0px 80px;
	}

	@media screen and (max-width: 880px) {
		justify-content: space-around;
		& > div {
			& > p {
				font-size: 14px;
			}
		}
		& > .donation_detail_sub_center_wrap {
			margin: 0;
		}
	}

	@media screen and (max-width: 630px) {
		flex-wrap: wrap;
		& > div {
			width: 100%;
			justify-content: left;
			padding-left: 20px;
		}
	}
`;

const TotalDonationAmountContent = styled.div`
	margin: 40px 0px 0px 0px;
	text-align: center;
	& > .total_donation_amount_title {
		margin: 0;
		font-size: 16px;
		font-weight: 500;
	}
	& > div {
		display: flex;
		justify-content: center;
		margin: 10px 0px 0px 0px;
		color: #8f0ee5;
		& > h4 {
			margin: 0;
			font-size: 26px;
		}
		& > p {
			margin: 0;
			font-size: 14px;
			margin: auto 0px 3px 2px;
		}
	}
`;

const DonationDetailContainer = styled.div`
	margin: 30px 0px 0px 0px;
`;

const DonationDetailHeader = styled.div`
	border-bottom: 0.5px solid #b4b2b2;
	padding-bottom: 10px;
	& > h4 {
		margin: 0;
		font-size: 18px;
	}
	& > div {
		display: flex;
		& > h4 {
			margin: auto 10px -2px 0px;
			font-size: 20px;
			font-weight: 400;
		}
		& > p {
			font-size: 12px;
			margin: auto 0px 0px 0px;
			cursor: pointer;
		}
		& > small {
			font-size: 12px;
			margin: auto 6.5px 1px 6.5px;
		}
	}
`;

const DonationDetailContent = styled.div`
	font-size: 14px;
	margin: 35px 0px 0px 0px;
	& > h1 {
		font-size: 22px;
		font-weight: 400;
		margin: 0;
	}
	& > h2 {
		font-size: 16px;
		font-weight: 400;
		margin: 0;
	}
	& > p {
		font-size: 16px;
		color: rgba(128, 128, 128, 0.6);
		font-weight: 400;
		margin: 30px 0px 0px 0px;
	}

	@media screen and (max-width: 630px) {
		font-size: 12px;
		& > h1 {
			font-size: 16px;
		}
		& > h2 {
			font-size: 14px;
		}
		& > p {
			font-size: 14px;
		}
	}
`;

// const DonationSubDetailContainer = styled.div`
//     margin:75px 0px 100px 0px;
// `;

const ActivityDonationContaner = styled.div`
	margin: 75px 0px 50px 0px;
`;

const ActivityDonationContent = styled.div`
	margin: 31.5px 0px 0px 0px;
	& > p {
		color: #56b0ff;
		font-size: 14px;
		margin: 0;
	}
	& > input {
		margin: 10px 0px 0px 0px;
		width: 420px;
		height: 50px;
		border: 1px solid #b4b2b2;
		font-size: 14px;
		padding: 0 10px;
		outline: none;
	}

	@media screen and (max-width: 630px) {
		& > input {
			width: 90%;
		}
	}
`;

const ButtonContainer = styled.div`
	margin: 60px 0px 100px 0px;
	text-align: center;
	& > button {
		width: 350px;
		height: 55px;
		background-color: #8f0ee5;
		border: 1px solid #8f0ee5;
		outline: none;
		cursor: pointer;
		color: #ffffff;
		font-size: 18px;
		font-weight: 500;
	}
	@media screen and (max-width: 630px) {
		& > button {
			width: 60%;
		}
	}
`;

const ModalHeader = styled.div`
	& > .modal_header_top {
		display: flex;
		justify-content: center;
		position: relative;

		& > h1 {
			font-size: 14px;
			margin: 25px 0px 0px 0px;
		}
		& > p {
			font-size: 9px;
			margin: 0px;
			position: absolute;
			right: 10px;
			top: 10px;
			cursor: pointer;
		}
	}
	& > p {
		font-size: 11px;
		text-align: center;
	}
`;

const SendCheckModalContent = styled.div`
	text-align: center;
	& > img {
		margin: 63px 0px 0px 0px;
	}
	& > h5 {
		margin: 10px 0px 13px 0px;
		font-size: 14px;
		color: #ff0000;
		font-weight: normal;
	}
	& > p {
		margin: 0;
		font-size: 11px;
	}
	& > div {
		margin: 39px 0px 0px 0px;
		display: flex;
		justify-content: center;
		& > button {
			margin: 0px 10px;
			color: #fcfcfc;
			font-size: 12px;
			width: 85px;
			height: 35px;
			outline: none;
			cursor: pointer;
		}
		& > .modal_content_cancle_btn {
			border: 1px solid #d89eff;
			background-color: #d89eff;
		}
		& > .modal_content_complete_btn {
			border: 1px solid #8f0ee5;
			background-color: #8f0ee5;
		}
	}
`;

const PassWordSettingContainer = styled.div`
	margin: 40px 0px 0px 0px;
	& > .password_setting_content1 {
		text-align: center;
		& > .password_dot {
			margin: 0 auto;
			width: 40%;
			display: flex;
			justify-content: space-around;
			& > p {
				margin: auto 0;
				width: 10px;
				height: 10px;
				border: none;
				background-color: #b4b2b2;
				border-radius: 50%;
			}
		}
		& > p {
			font-size: 10px;
			margin: -20px 0px 5px 0px;
		}
	}
	& > .password_setting_content2 {
		margin-top: 25px;
		background-color: #dfafff;
		display: flex;
		flex-wrap: wrap;
		& > div {
			width: 24.7%;
			height: 40px;
			display: flex;
			& > p {
				font-size: 22px;
				color: white;
				font-weight: 500;
				margin: auto;
			}
		}
		& > .password_setting_0 {
			border-right: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_1 {
			border-right: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_2 {
			border-right: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_3 {
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_4 {
			border-right: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_5 {
			border-right: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_6 {
			border-right: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_7 {
			border-bottom: 1px solid #e5e5e5;
		}
		& > .password_setting_8 {
			border-right: 1px solid #e5e5e5;
		}
		& > .password_setting_9 {
			border-right: 1px solid #e5e5e5;
		}
		& > .password_setting_10 {
			border-right: 1px solid #e5e5e5;
		}
		& > #delete,
		#delete2,
		#delete3 {
			border-top: 1px solid #e5e5e5;
			border-right: 1px solid #e5e5e5;
			width: 49.8%;
			cursor: pointer;
			& > p {
				font-size: 16px;
			}
		}
		& > #remove,
		#remove2,
		#remove3 {
			border-top: 1px solid #e5e5e5;
			width: 49.8%;
			cursor: pointer;
			& > img {
				height: 25px;
				margin: auto;
			}
		}
	}
`;

export default DonationDetailComponent;
