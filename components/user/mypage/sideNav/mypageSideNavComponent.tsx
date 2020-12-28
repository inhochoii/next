import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import profile_none_image from '../../../../public/images/profile_none_image.png';
import { user } from '../../../../stores/user/types';
import { kakaoChat } from '../../../../lib/kakaoChat';
import Router from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Modal from 'react-modal';

interface Props {
	user?: user;
	registerCoupon: (coupon_code: string) => void;
}
const MypageSideNavComponent: React.FC<Props> = ({ user, registerCoupon }) => {
	const [moreBtn, setMoreBtn] = useState<boolean>(false);
	const [couponModal, setCouponModal] = useState<boolean>(false);
	const [inputCoupon, setInputCoupon] = useState<string>('');
	const customStyles = {
		overlay: {
			backgroundColor: 'rgba(0,0,0,0.5)',
			zIndex: 2,
		},
		content: {
			margin: 'auto',
			width: '295px',
			height: '305px',
			padding: '10px',
			overflow: 'hidden',
			borderRadius: '0',
			border: '1px solid #fcfcfc',
		},
	};

	const closeCouponModal = () => {
		setCouponModal(false);
		setInputCoupon('');
	};

	const onChnageInput = (e: any) => {
		const { id, value } = e.target;
		if (id === 'inputCoupon') {
			setInputCoupon(value);
		}
	};

	const onClickRegisterCoupon = () => {
		if (inputCoupon === '') {
			alert('쿠폰번호를 입력해주세요.');
		} else {
			registerCoupon(inputCoupon);
			closeCouponModal();
		}
	};
	return (
		<MypageSideWrap>
			<UserInfoContainer>
				{user ? (
					<UserInfoContent>
						<h4 className="user_info_name">{user.name}</h4>
						<div className="user_info_image_wrap">
							<div
								className="user_info_image"
								style={
									user.user_img
										? { backgroundImage: `url(${user.user_img})` }
										: { backgroundImage: `url(${profile_none_image})` }
								}
							/>
						</div>
						<p className="user_info_nickName">{user.nickname}</p>
						<p className="user_info_email">{user.email}</p>
						<div className="user_info_more_btn" onClick={() => setMoreBtn(!moreBtn)}>
							<MoreVertIcon />
						</div>
						{moreBtn && (
							<div className="user_info_more_menu">
								<p onClick={() => Router.push('/mypage/profile')}>회원정보 수정</p>
								<p onClick={kakaoChat}>카카오문의</p>
								<p onClick={() => setCouponModal(true)}>쿠폰등록</p>
								<p onClick={() => Router.push('/mypage/basket')}>찜한상품</p>
							</div>
						)}
					</UserInfoContent>
				) : (
					<CircularProgress />
				)}
			</UserInfoContainer>
			<UserMenuContainer>
				<p onClick={() => Router.push('/mypage/profile')}>회원정보 수정</p>
				<p onClick={kakaoChat}>카카오문의</p>
				<p onClick={() => setCouponModal(true)}>쿠폰등록</p>
				<p onClick={() => Router.push('/mypage/basket')}>찜한 상품</p>
			</UserMenuContainer>
			<Modal isOpen={couponModal} ariaHideApp={false} style={customStyles}>
				<ModalHeader>
					<div className="modal_header_top">
						<h1>쿠폰등록</h1>
						<p onClick={closeCouponModal}>닫기</p>
					</div>
					<p>쿠폰번호를 정확히 입력해주세요.</p>
				</ModalHeader>
				<ModalContent>
					<input
						type="text"
						placeholder="쿠폰번호를 입력해주세요."
						value={inputCoupon}
						id="inputCoupon"
						onChange={onChnageInput}
					/>
					<div className="modal_info_content">
						<div>
							<div className="modal_polycon" />
							<span>쿠폰에 하이픈("-")이 포함되어 있을경우 하이픈("-")을 반드시 입력해주세요.</span>
						</div>
						<div>
							<div className="modal_polycon" />
							<span>중복된 쿠폰은 등록이 안됩니다.</span>
						</div>
						<div>
							<div className="modal_polycon" />
							<span>쿠폰은 쿠폰 등록 후 일주일이내로 지급됩니다.</span>
						</div>
					</div>
					<div className="modal_button">
						<button onClick={onClickRegisterCoupon}>쿠폰등록</button>
					</div>
				</ModalContent>
			</Modal>
		</MypageSideWrap>
	);
};

const MypageSideWrap = styled.div`
	width: 200px;
	@media screen and (max-width: 930px) {
		width: 100%;
	}
`;

const UserInfoContainer = styled.div`
	background-color: #848992;
	display: flex;
	position: relative;
`;

const UserInfoContent = styled.div`
	margin: 0 auto;
	padding: 35.7px 0px 32.8px 0px;
	text-align: center;
	& > .user_info_name {
		font-size: 18px;
		color: #ffffff;
		font-weight: 400;
		margin: 0;
	}
	& > .user_info_image_wrap {
		display: flex;
		margin: 6px 0px 17.5px 0px;
		& > .user_info_image {
			margin: 0 auto;
			width: 116px;
			height: 116px;
			background-size: 100% 100%;
			border-radius: 50%;
		}
	}
	& > .user_info_nickName {
		font-size: 14px;
		color: #ffffff;
		margin: 7px 0px 0px 0px;
	}
	& > .user_info_email {
		font-size: 14px;
		color: #ffffff;
		margin: 0;
	}
	& > .user_info_more_btn,
	.user_info_more_menu {
		display: none;
	}

	@media screen and (max-width: 930px) {
		padding: 15px 0px 15px 0px;
		& > .user_info_name {
			font-size: 14px;
		}
		& > .user_info_nickName,
		.user_info_email {
			font-size: 12px;
		}
		& > .user_info_more_btn {
			display: block;
			position: absolute;
			color: white;
			top: 10px;
			right: 10px;
			cursor: pointer;
		}
		& > .user_info_more_menu {
			display: block;
			position: absolute;
			top: 10px;
			right: 30px;
			background-color: #ffffff;
			width: 150px;
			text-align: left;
			padding: 5px;
			& > p {
				margin: 0;
				padding: 10px 0px;
				font-size: 12px;
				cursor: pointer;
				&:hover {
					background-color: #f8f8f8;
				}
			}
		}
	}
`;

const UserMenuContainer = styled.div`
	border: 0.5px solid #b4b2b2;
	padding: 29.5px 0px 17.5px 27px;
	& > p {
		margin: 0px 0px 19px 0px;
		font-size: 13px;
		cursor: pointer;
		&:hover {
			font-weight: 500;
		}
	}

	@media screen and (max-width: 930px) {
		display: none;
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
			right: 0px;
			top: 0px;
			cursor: pointer;
		}
	}
	& > p {
		font-size: 11px;
		text-align: center;
		margin: 10px 0px 0px 0px;
	}
`;

const ModalContent = styled.div`
	margin: 22.5px 0px 0px 0px;
	& > input {
		width: 270px;
		height: 35px;
		border: 1px solid #b4b2b2;
		padding: 0px 10px;
		font-size: 11px;
		outline: none;
	}
	& > .modal_info_content {
		margin-top: 21px;
		& > div {
			display: flex;
			margin-bottom: 8px;
			& > .modal_polycon {
				width: 6.5px;
				height: 7px;
				border: 1px solid #ff0000;
				background-color: #ff0000;
				clip-path: polygon(100% 50%, 0 0, 0 100%);
				margin: 3.5px 3.5px 0px 0px;
			}
			& > span {
				font-size: 11px;
				font-weight: 300;
			}
		}
	}

	& > .modal_button {
		margin: 20px 0px 0px 0px;
		text-align: center;
		& > button {
			width: 120px;
			height: 35px;
			border: 1px solid #8f0ee5;
			background-color: #8f0ee5;
			color: #fcfcfc;
			font-size: 12px;
			cursor: pointer;
			outline: none;
		}
	}
`;

export default MypageSideNavComponent;
