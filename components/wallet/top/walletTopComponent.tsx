import React from 'react';
import { useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';

import wallet_name_setting from '../../../public/walletImages/wallet_name_setting.png';
import wallet_content_image from '../../../public/walletImages/wallet_content_image.png';
import wallet_clipboard_icon from '../../../public/walletImages/wallet_clipboard_icon.png';
import wallet_send_icon from '../../../public/walletImages/wallet_send_icon.png';
import wallet_qr_icon from '../../../public/walletImages/wallet_qr_icon.png';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { user, bridge, balance } from '../../../stores/user/types';
import QRCode from 'react-qr-code';
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
interface Props {
	bridge?: bridge;
	balance?: balance;
	userInfo?: user;
	wallet_nm: string;
	createWallet: (walletName: string) => void;
	updateWalletName: (wallet_nm: string) => void;
}

const WalletTopComponent: React.FC<Props> = ({
	bridge,
	balance,
	userInfo,
	wallet_nm,
	createWallet,
	updateWalletName,
}) => {
	const [walletInfoState, setWalletInfoState] = useState<boolean>(false);
	const [walletName, setWalletName] = useState<string>('');
	const [changeWalletName, setChangeWalletName] = useState<string>('');
	const onClickOpenWallet = () => {
		if (wallet_nm) {
			setWalletInfoState(true);
		} else {
			alert('지갑 생성 후 이용 바랍니다.');
		}
	};

	const onChangeText = (e: any) => {
		const { id, value } = e.target;
		switch (id) {
			case 'walletName':
				return setWalletName(value);
			case 'changeWalletName':
				return setChangeWalletName(value);
		}
	};

	const onClickCreateWallet = () => {
		if (walletName === '') {
			alert('지갑명을 입력해 주세요.');
		} else if (walletName.length < 3) {
			alert('지갑명이 너무 짧습니다.');
		} else {
			createWallet(walletName);
		}
	};

	const qrStyles = {
		overlay: {
			backgroundColor: 'rgba(0,0,0,0.5)',
			zIndex: 100,
		},
		content: {
			margin: '10% 25% auto auto',
			height: '236px',
			width: '172px',
			padding: '15px',
			overflow: 'hidden',
		},
	};

	const settingStyles = {
		overlay: {
			backgroundColor: 'rgba(0,0,0,0.5)',
			zIndex: 100,
		},
		content: {
			left: '0',
			margin: 'auto',
			height: '185px',
			width: globalThis.innerWidth <= 414 ? '90%' : '405px',
			padding: '15px',
			overflow: 'hidden',
		},
	};

	const [qrIsOpen, setQrIsOpen] = useState<boolean>(false);
	const [settingIsOpen, setSettingIsOpen] = useState<boolean>(false);

	const onClickChangeWalletName = () => {
		updateWalletName(changeWalletName);
		setChangeWalletName('');
		settingToggle();
	};

	const settingToggle = () => {
		setSettingIsOpen(!settingIsOpen);
	};

	const toggleQr = () => {
		setQrIsOpen(!qrIsOpen);
	};
	return (
		<WalletWrap>
			<WalletBackground />
			<WalletContainer>
				{wallet_nm ? (
					<Walletcontent>
						<div>
							<p className="wallet_content_user_name">
								{userInfo?.name}
								<span>님</span>
							</p>
							<div className="wallet_content_wallet_name">
								<p>{wallet_nm}</p>
								<img src={wallet_name_setting} onClick={settingToggle} />
								<Modal isOpen={settingIsOpen} style={settingStyles} ariaHideApp={false}>
									<ModalHeader>
										<p onClick={settingToggle}>
											<CloseIcon />
										</p>
										<h4>지갑이름 변경</h4>
										<h5>변경하실 지갑 이름을 입력해주세요.</h5>
									</ModalHeader>
									<ModalContent>
										<div>
											<input
												type="text"
												placeholder="지갑 이름을 입력해주세요."
												value={changeWalletName}
												id="changeWalletName"
												onChange={onChangeText}
											/>
											<button onClick={onClickChangeWalletName}>이름변경</button>
										</div>
									</ModalContent>
								</Modal>
							</div>
							<div className="wallet_content_point">
								<div>
									<p className="wallet_content_point_title">B.POINT</p>
									<p className="wallet_content_point_info">0 B.POINT</p>
								</div>
								<p onClick={() => alert('준비중입니다.')}>충전하러가기→</p>
							</div>
							<div className="wallet_content_point2">
								<div>
									<p className="wallet_content_point_title">BERRY</p>
									<p className="wallet_content_point_info">
										{Number(balance?.data.balance) > 0
											? balance?.data.balance.slice(0, balance.data.balance.length - 18)
											: '0'}{' '}
										BERRY
									</p>
								</div>
								<p onClick={() => alert('준비중입니다.')}>충전하러가기→</p>
							</div>
						</div>
						<img src={wallet_content_image} />
					</Walletcontent>
				) : (
					<NewWalletContent>
						<div>
							<p className="wallet_content_user_name">
								{userInfo?.name}
								<span>님</span>
							</p>
							<div className="wallet_content_wallet_name">
								<p>아직 지갑이 생성되지 않았습니다.</p>
							</div>
							<div className="wallet_content_point">
								<div>
									<p className="wallet_content_point_title">B.POINT</p>
									<p className="wallet_content_point_info">0 B.POINT</p>
								</div>
							</div>
							<div className="wallet_content_point2">
								<div>
									<p className="wallet_content_point_title">BERRY</p>
									<p className="wallet_content_point_info">0 BERRY</p>
								</div>
							</div>
							<div className="wallet_content_create">
								<div>
									<input
										type="text"
										placeholder="지갑 이름을 입력해주세요."
										value={walletName}
										onChange={onChangeText}
										id="walletName"
									/>
									<button onClick={onClickCreateWallet}>지갑생성</button>
								</div>
							</div>
						</div>
						<img src={wallet_content_image} />
					</NewWalletContent>
				)}
				{!walletInfoState ? (
					<WalletInfoOpenButton onClick={onClickOpenWallet}>
						<AddIcon />
					</WalletInfoOpenButton>
				) : (
					<WalletInfoAfter>
						<WalletInfoContent>
							<div className="wallet_info_wallet">
								<p>내주소</p>
								<div>
									<span>{bridge?.data.address}</span>
									<CopyToClipboard text={bridge?.data.address}>
										<button onClick={() => alert('주소가 복사되었습니다.')}>
											복사
											<img src={wallet_clipboard_icon} />
										</button>
									</CopyToClipboard>
								</div>
							</div>
							<div className="wallet_send" onClick={() => Router.push('/wallet/transfer')}>
								<p>송금하기</p>
								<img src={wallet_send_icon} />
							</div>
							<div className="wallet_qr" onClick={toggleQr}>
								<p>QR코드</p>
								<img src={wallet_qr_icon} />
							</div>
							<div className="user_qrcode">
								<QRCode value={String(bridge?.data.address)} size={62} />
								<Modal isOpen={qrIsOpen} style={qrStyles} ariaHideApp={false}>
									<QRheader>
										<p onClick={toggleQr}>
											<CloseIcon />
										</p>
										<h4>QR 코드</h4>
									</QRheader>
									<QRModal>
										<QRCode value={String(bridge?.data.address)} size={172} />
									</QRModal>
								</Modal>
							</div>
						</WalletInfoContent>
						<WalletInfoCloseButton onClick={() => setWalletInfoState(false)}>
							<RemoveIcon />
						</WalletInfoCloseButton>
					</WalletInfoAfter>
				)}
			</WalletContainer>
		</WalletWrap>
	);
};

const WalletWrap = styled.div``;

const WalletBackground = styled.div`
	width: 100%;
	height: 250px;
	background-color: #e9c8ff;
`;

const WalletContainer = styled.div`
	margin: -125px auto 115px auto;
	width: 1280px;
	max-width: 100%;
	display: flex;
	justify-content: center;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
	@media screen and (max-width: 880px) {
		margin: -205px auto 115px auto;
		flex-wrap: wrap;
	}
`;

const Walletcontent = styled.div`
	width: 650px;
	height: 260px;
	background-color: #ffffff;
	box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.11);
	z-index: 1;
	position: relative;
	& > img {
		position: absolute;
		left: 40%;
		bottom: 10%;
	}
	& > div {
		margin: 35px 55px 0px 45px;
		position: relative;
		z-index: 2;
		& > .wallet_content_user_name {
			margin: 0;
			font-size: 16px;
			font-weight: 500;
			& > span {
				font-size: 14px;
				font-weight: 200;
			}
		}
		& > .wallet_content_wallet_name {
			display: flex;
			margin-top: 5px;
			& > p {
				margin: 0;
				font-size: 24px;
				font-weight: 700;
				color: #8f0ee5;
			}
			& > img {
				cursor: pointer;
				margin: auto 0px 2px 5px;
			}
		}
		& > .wallet_content_point {
			margin: 25px 0px 15px 0px;
		}
		& > .wallet_content_point,
		.wallet_content_point2 {
			& > div {
				display: flex;
				justify-content: space-between;
				& > .wallet_content_point_title {
					font-size: 18px;
					font-weight: 400;
					margin: 0;
				}
				& > .wallet_content_point_info {
					font-size: 18px;
					font-weight: 400;
					margin: 0;
				}
			}
			& > p {
				margin: 5px 0px 0px 0px;
				font-size: 9px;
				color: #b4b2b2;
				cursor: pointer;
				width: 100px;
			}
		}
	}

	@media screen and (max-width: 880px) {
		width: 100%;
		& > img {
			left: 35%;
		}
	}

	@media screen and (max-width: 530px) {
		& > div {
			margin: 30px 10px 0px 10px;
			& > .wallet_content_wallet_name {
				& > p {
					font-size: 18px;
				}
			}
			& > .wallet_content_point {
				margin-top: 50px;
			}
			& > .wallet_content_point,
			.wallet_content_point2 {
				& > div {
					& > .wallet_content_point_title {
						font-size: 14px;
					}
					& > .wallet_content_point_info {
						font-size: 14px;
					}
				}
			}
		}
	}
`;

const NewWalletContent = styled.div`
	width: 650px;
	height: 260px;
	background-color: #ffffff;
	box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.11);
	z-index: 1;
	position: relative;
	& > img {
		position: absolute;
		left: 40%;
		bottom: 10%;
		z-index: 0;
	}
	& > div {
		margin: 35px 55px 0px 45px;
		& > .wallet_content_user_name {
			margin: 0;
			font-size: 15px;
			font-weight: 500;
			& > span {
				font-size: 14px;
				font-weight: 200;
			}
		}
		& > .wallet_content_wallet_name {
			display: flex;
			margin-top: 5px;
			& > p {
				margin: 0;
				font-size: 24px;
				font-weight: 500;
				color: #8f0ee5;
			}
		}
		& > .wallet_content_point {
			margin: 25px 0px 15px 0px;
		}
		& > .wallet_content_point,
		.wallet_content_point2 {
			& > div {
				display: flex;
				justify-content: space-between;
				& > .wallet_content_point_title {
					font-size: 16px;
					margin: 0;
				}
				& > .wallet_content_point_info {
					font-size: 18px;
					margin: 0;
				}
			}
		}
		& > .wallet_content_create {
			position: relative;
			z-index: 2;
			width: 100%;
			height: 40px;
			display: flex;
			& > div {
				display: flex;
				margin: 0 auto;
				& > input {
					margin: auto 0;
					width: 250px;
					height: 95%;
					border: 1px solid #d6d6d6;
					background-color: #ffffff;
					padding: 0 10px;
					outline: none;
				}
				& > button {
					margin: auto 0;
					height: 100%;
					border: none;
					background-color: #8f0ee5;
					color: #ffffff;
					font-size: 12px;
					cursor: pointer;
					outline: none;
				}
			}
		}
	}
	@media screen and (max-width: 880px) {
		width: 100%;
		& > img {
			left: 35%;
		}
	}

	@media screen and (max-width: 530px) {
		& > div {
			margin: 30px 10px 0px 10px;
			& > .wallet_content_wallet_name {
				& > p {
					font-size: 18px;
				}
			}
			& > .wallet_content_point {
				margin-top: 50px;
			}
			& > .wallet_content_point,
			.wallet_content_point2 {
				& > .wallet_content_point_title {
					font-size: 14px;
				}
				& > .wallet_content_point_info {
					font-size: 14px;
				}
			}
			& > .wallet_content_create {
				& > div {
					width: 100%;
					& > input {
						width: 75%;
					}
					& > button {
						width: 25%;
					}
				}
			}
		}
	}
`;
const WalletInfoOpenButton = styled.div`
	background-color: #f6f6f6;
	height: 230px;
	margin: auto 0;
	width: 50px;
	box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.11);
	cursor: pointer;
	display: flex;

	& > svg {
		margin: auto;
	}

	@media screen and (max-width: 880px) {
		width: 90%;
		height: 50px;
	}
`;

const WalletInfoCloseButton = styled.div`
	background-color: #f6f6f6;
	height: 230px;
	margin: auto 0;
	width: 50px;
	box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.11);
	cursor: pointer;
	display: flex;

	& > svg {
		margin: auto;
	}

	@media screen and (max-width: 880px) {
		height: 50px;
		width: 100%;
	}
`;

const WalletInfoAfter = styled.div`
	width: 450px;
	margin: auto 0;
	background-color: #ffffff;
	box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.11);
	display: flex;
	justify-content: space-between;

	@media screen and (max-width: 880px) {
		width: 90%;
		flex-wrap: wrap;
	}
`;

const WalletInfoContent = styled.div`
	padding: 25px 0px 0px 20px;

	& > .wallet_info_wallet {
		& > p {
			margin: 0;
			font-size: 12px;
			font-weight: 500;
		}
		& > div {
			& > span {
				font-size: 10px;
				margin: 0px 5px 0px 0px;
			}
			& > button {
				margin: 0px;
				border: none;
				background-color: #8f0ee5;
				color: white;
				font-size: 11px;
				outline: none;
				cursor: pointer;
				& > img {
					margin: 0px 0px -2px 2px;
				}
			}
		}
	}
	& > .wallet_send,
	.wallet_qr {
		display: flex;
		margin: 22px 0px 0px 0px;
		cursor: pointer;
		& > p {
			margin: 0;
			font-size: 12px;
			font-weight: 500;
		}
		& > img {
			margin: auto 0 auto 5px;
		}
	}
	& > .user_qrcode {
		margin: 10px 0px 0px 0px;
		width: 62px;
	}

	@media screen and (max-width: 880px) {
		padding-bottom: 20px;
		width: 90%;

		& > .wallet_info_wallet {
			& > p {
				font-size: 14px;
			}
			& > div {
				& > span {
					font-size: 12px;
					width: auto;
				}
				& > button {
					width: 30%;
					height: 30px;
					margin: 5px 0px 0px 0px;
				}
			}
		}
		& > .wallet_send,
		.wallet_qr {
			& > p {
				font-size: 14px;
			}
		}
	}
`;

const QRModal = styled.div`
	margin: 12px 0px 0px 0px;
`;

const QRheader = styled.div`
	& > p {
		margin: 0;
		text-align: right;
		cursor: pointer;
	}
	& > h4 {
		text-align: center;
		margin: 0;
	}
`;

const ModalHeader = styled.div`
	& > p {
		text-align: right;
		margin: 0;
		cursor: pointer;
	}
	& > h4 {
		text-align: center;
		margin: 10px 0px 0px 0px;
		font-size: 14px;
		font-weight: 500;
	}
	& > h5 {
		text-align: center;
		margin: 5px 0px 0px 0px;
		font-size: 12px;
		font-weight: 300;
	}
`;
const ModalContent = styled.div`
	margin: 28px 0px 0px 0px;
	& > div {
		padding: 0px 30px;
		height: 40px;
		display: flex;
		justify-content: center;
		& > input {
			border: 1px solid #d6d6d6;
			color: #333333;
			margin: auto 0;
			width: 70%;
			height: 95%;
			padding: 0px 10px;
			outline: none;
		}
		& > button {
			border: none;
			background-color: #8f0ee5;
			color: #ffffff;
			width: 25%;
			height: 100%;
			font-size: 12px;
			cursor: pointer;
			outline: none;
		}
	}
`;

export default WalletTopComponent;
