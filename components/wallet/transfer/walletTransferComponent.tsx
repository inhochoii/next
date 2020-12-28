import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { balance } from '../../../stores/user/types';
import bcrypt from 'bcryptjs';
import Modal from 'react-modal';
import { toJS } from 'mobx';
import profile_password_setting from '../../../public/images/profile_password_setting.png';
import danger_image from '../../../public/images/danger_image.png';

interface Props {
	checkDapp: (toWalletAddress: string, amount: string) => void;
	pincode: string;
	confirmSend: (amount: string) => void;
	confirmSendAmountStatus: any;
	balance?: balance;
}

const WalletTransferComponent: React.FC<Props> = ({
	checkDapp,
	pincode,
	confirmSend,
	confirmSendAmountStatus,
	balance,
}) => {
	const [transferState] = useState<number>(1);
	const [amount, setAmount] = useState<string>('');
	const [toWalletAddress, setToWalletAddress] = useState<string>('');
	const [modal, setModal] = useState<boolean>(false);
	const [sendCheckModal, setSendCheckModal] = useState<boolean>(false);

	const onChangeText = (e: any) => {
		const { id, value } = e.target;
		if (id === 'amount') {
			if (!isNaN(Number(value))) {
				setAmount(value);
			}
		} else if (id === 'toWalletAddress') {
			setToWalletAddress(value);
		}
	};

	const onClickTransfer = () => {
		if (amount === '') {
			alert('송금하실 금액을 입력해주세요.');
		} else if (toWalletAddress === '') {
			alert('지갑주소를 입력해주세요.');
		} else if (Number(balance?.data.balance.slice(0, balance.data.balance.length - 18)) < Number(amount)) {
			alert('보유하신 BERRY를 확인해주세요.');
		} else {
			confirmSend(amount);
			// setSendCheckModal(!sendCheckModal);
		}
	};
	/////////////////////////////////////////////////////////////////////////////////////////////

	//전송 여부 체크 모달 true
	const onClickSendCheck = () => {
		setSendCheckModal(false);
		setModal(!modal);
	};

	//2500베리 이상 api check 후 true 일때 전송 여부 모달 띄움
	useEffect(() => {
		if (confirmSendAmountStatus !== '') {
			if (confirmSendAmountStatus.status === 1) {
				setSendCheckModal(!sendCheckModal);
			} else {
				alert(toJS(confirmSendAmountStatus.msg));
			}
		}
	}, [confirmSendAmountStatus]);

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
			zIndex: 2,
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

	//핀코드 모달 close 누르면 초기화(입력, 배열 섞기)
	const closeModal = () => {
		setModal(false);
		setInputPincode('');
		setShuffleAraay(shuffle(initArray));
	};

	//핀코드 입력
	const onClickPincode = (num: number) => {
		if (inputPincode.length < 6) {
			if (num < 10) {
				setInputPincode(inputPincode + num);
			}
		}
	};

	//핀코드 6자리일때 pincode hash 값 비교
	useEffect(() => {
		if (inputPincode.length === 6) {
			if (bcrypt.compareSync(inputPincode, pincode)) {
				checkDapp(toWalletAddress, amount + '000000000000000000');
			} else {
				setInputPincode('');
				alert('핀코드가 일치하지 않습니다.');
			}
		}
	}, [inputPincode]);
	////////////////////////////////////////////////////////////
	return (
		<TransferWrap>
			<TransferContainer>
				<TransferHeader>
					<h4>송금하기</h4>
					<p style={transferState === 1 ? { fontWeight: 500 } : {}}>BERRY</p>
					<small>|</small>
					<p onClick={() => alert('B.POINT 기능 추가 예정입니다.')}>B.POINT</p>
				</TransferHeader>
				<TransferAmountContent>
					<h4>송금 금액</h4>
					<p>송금할 금액을 입력해주세요.</p>
					<input
						type="text"
						placeholder="송금하실 금액을 입력해주세요."
						value={amount}
						id="amount"
						onChange={onChangeText}
					/>
				</TransferAmountContent>
			</TransferContainer>
			<TransferAddressWrap>
				<TransferAddressContainer>
					<TransferAddressContent>
						<h4>지갑주소</h4>
						<h5>송금 받는 분의 지갑주소를 입력해주세요.</h5>
						<p>
							송금하시는 지갑주소를 반드시 재확인하세요. <br />
							잘못된 지갑주소로 송금 시 암호화폐의 손실을 발생할 수 있습니다.
						</p>
						<input
							type="text"
							placeholder="지갑주소를 입력해주세요."
							value={toWalletAddress}
							id="toWalletAddress"
							onChange={onChangeText}
						/>
					</TransferAddressContent>
					<TransferButton>
						<button onClick={onClickTransfer}>송금하기</button>

						{/* 송금 진행 여부 확인 모달 */}
						<Modal isOpen={sendCheckModal} ariaHideApp={false} style={customStyles}>
							<ModalHeader>
								<div className="modal_header_top">
									<p onClick={() => setSendCheckModal(false)}>닫기</p>
								</div>
							</ModalHeader>
							<SendCheckModalContent>
								<img src={danger_image} alt="danger_image" />
								<h5>주의</h5>
								<p className="modal_content_danger1">송금 전 입력하신 정보를 확인하셨나요?</p>
								<p className="modal_content_danger2">송금 후 변경 및 취소는 불가능합니다.</p>
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
						<Modal isOpen={modal} ariaHideApp={false} style={customStyles}>
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
					</TransferButton>
				</TransferAddressContainer>
			</TransferAddressWrap>
		</TransferWrap>
	);
};

const TransferWrap = styled.div`
	max-width: 100%;
`;
const TransferContainer = styled.div`
	width: 1280px;
	max-width: 100%;
	margin: 0 auto;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const TransferHeader = styled.div`
	display: flex;
	border-bottom: 0.5px solid #b4b2b2;
	padding-bottom: 15.5px;
	& > h4 {
		margin: auto 10px -2px 0px;
		font-size: 20px;
		font-weight: 500;
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
`;

const TransferAmountContent = styled.div`
	margin-bottom: 35px;
	& > h4 {
		margin: 40.5px 0px 0px 0px;
		font-size: 16px;
		font-weight: 500;
	}
	& > p {
		margin: 8px 0px 0px 0px;
		font-size: 14px;
	}
	& > input {
		margin: 18px 0px 0px 0px;
		width: 420px;
		height: 46px;
		border: 1px solid #b4b2b2;
		padding: 0px 15px;
		font-size: 12px;
		outline: none;
	}

	@media screen and (max-width: 530px) {
		& > input {
			width: 90%;
		}
	}
`;

const TransferAddressWrap = styled.div`
	background-color: #f8f8f8;
	max-width: 100%;
`;

const TransferAddressContainer = styled.div`
	width: 1280px;
	max-width: 100%;
	margin: 0 auto;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;
const TransferAddressContent = styled.div`
	padding-top: 35px;
	& > h4 {
		margin: 0;
		font-size: 16px;
		font-weight: 500;
	}
	& > h5 {
		margin: 8px 0px 0px 0px;
		font-size: 14px;
		font-weight: normal;
	}
	& > p {
		margin: 12px 0px 0px 0px;
		font-size: 12px;
		color: #b4b2b2;
	}
	& > input {
		margin: 18px 0px 0px 0px;
		width: 420px;
		height: 46px;
		border: 1px solid #b4b2b2;
		background-color: #f8f8f8;
		padding: 0px 15px;
		font-size: 12px;
		outline: none;
	}

	@media screen and (max-width: 530px) {
		& > input {
			width: 90%;
		}
	}
`;

const TransferButton = styled.div`
	margin: 95px 0px 0px 0px;
	text-align: center;
	& > button {
		margin: 0px 0px 170px 0px;
		width: 290px;
		height: 46px;
		font-size: 16px;
		color: #fcfcfc;
		border: 1px solid #8f0ee5;
		background-color: #8f0ee5;
		cursor: pointer;
		outline: none;
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
				margin: auto;
				object-fit: contain;
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
export default WalletTransferComponent;
