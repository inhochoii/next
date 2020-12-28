import * as React from 'react';
import { useState, useEffect } from 'react';
import router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import Modal from 'react-modal';
import HeaderTotalDonation from './headerTotalDonation';
import berry_logo from '../../../public/images/berry_logo.png';
import header_name_down_image from '../../../public/images/header_name_down_image.png';
import header_name_up_image from '../../../public/images/header_name_up_image.png';
import profile_none_image from '../../../public/images/profile_none_image.png';
import { kakaoChat } from '../../../lib/kakaoChat';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
type userInfo ={
	email:string;
	image:string;
	name:string;
	nickName:string;
}
interface Props {
	logout: () => void;
	userInfo:userInfo;
	auth:any;
}

const Header: React.FC<Props> = ({ logout, userInfo,auth }) => {
	const [height, setHeight] = useState<number>(0);
	const [headerMenu, setHeaderMenu] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState(false);
	const [path, setPath] = useState<any>('');

	useEffect(()=>{
		if(typeof window !== 'undefined'){
			const handleResize = () =>{
				setHeight(window.scrollY);
			}
			window.addEventListener("scroll", handleResize);
			return ()=>window.removeEventListener("scroll", handleResize);
		}
	},[height]);

	useEffect(() => {
		setPath(router.router?.pathname);
	}, [router]);

	/// ///////////Modal

	const openModal = () => {
		setIsOpen(!isOpen);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const customStyles = {
		overlay: {
			backgroundColor: 'rgba(0,0,0,0.5)',
			zIndex: 3,
		},
		content: {
			top: '0',
			left: '0',
			width: '250px',
			height: '100%',
		},
	};

	return (
		<HeaderWrap>
			<HeaderTotalDonation />
			<NavContainer className="header_nav" style={height>75?{position:"fixed", top:"0", zIndex:2}:{}}>
				<NavContent>
					<LeftSideModal>
						<button onClick={openModal}>
							<MenuIcon />
						</button>
						<Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
							<ModalContent>
								<ModalHeader>
									<p>BERRY STORE</p>
								</ModalHeader>
								<ModalUserContent>
									{auth ? (
										<div className="modal_after_login_content">
											<div className="modal_user_info">
												{userInfo.image ? (
													<img src={userInfo.image} alt="" />
												) : (
													<img src={profile_none_image} alt="" />
												)}
												<p>{userInfo.nickName}님</p>
											</div>
											<div className="modal_user_info2">
												<p>{userInfo.email}</p>
											</div>
										</div>
									) : (
										<div className="modal_before_login_content">
											<Link href="/login">
												<a className="modal_login">로그인</a>
											</Link>
											<Link href="/join">
												<a className="modal_join">회원가입</a>
											</Link>
										</div>
									)}
								</ModalUserContent>
								<ModalMenuContent>
									<div style={{ borderTop: '1px solid #e5e5e5' }}>
										<div className="modal_main_menu">
											<p
												onClick={() => router.push('/store')}
												style={path === '/store' || path.indexOf('/store/product') > -1 ? { color: '#8f0ee5' } : {}}
											>
												스토어
											</p>
										</div>
									</div>
									<div>
										<div className="modal_main_menu">
											<p
												onClick={auth ? () => router.push('/wallet') : () => router.push('/login')}
												style={path.indexOf('/wallet') > -1 ? { color: '#8f0ee5', fontWeight: 500 } : {}}
											>
												나의 지갑
											</p>
										</div>
									</div>
									<div>
										<div className="modal_main_menu">
											<p
												onClick={() => router.push('/event')}
												style={path.indexOf('/event') > -1 ? { color: '#8f0ee5' } : {}}
											>
												이벤트
											</p>
										</div>
									</div>
									<div>
										<div className="modal_main_menu">
											<p
												onClick={() => router.push('/celebrity')}
												style={path.indexOf('/celebrity') > -1 ? { color: '#8f0ee5' } : {}}
											>
												셀럽
											</p>
										</div>
									</div>
									<div>
										<div className="modal_main_menu">
											<p
												onClick={() => router.push('/donation')}
												style={path.indexOf('/donation') > -1 ? { color: '#8f0ee5' } : {}}
											>
												기부하기
											</p>
										</div>
									</div>
								</ModalMenuContent>
								{auth ? (
									<ModalUserMenuContent>
										<p
											onClick={() => router.push('/mypage/history')}
											style={path === '/mypage/history' ? { color: '#8f0ee5', fontWeight: 500 } : {}}
										>
											마이페이지
										</p>
										<p onClick={kakaoChat}>카카오 문의</p>
										<p
											onClick={() => router.push('/mypage/profile')}
											style={path === '/mypage/profile' ? { color: '#8f0ee5', fontWeight: 500 } : {}}
										>
											회원 정보 수정
										</p>
										<p onClick={logout}>로그아웃</p>
									</ModalUserMenuContent>
								) : (
									''
								)}
							</ModalContent>
						</Modal>
					</LeftSideModal>
					<ImageContainer>
						<img src={berry_logo} alt="" onClick={() => router.push('/')} />
					</ImageContainer>
					<Subnav>
						<Link href="/store">
							<a style={path === '/store' || path.indexOf('/store/product') > -1 ? { color: '#8f0ee5' } : {}}>스토어</a>
						</Link>
					</Subnav>
					<Subnav>
						<Link href={auth ? '/wallet' : '/login'}>
							<a style={path.indexOf('/wallet') > -1 ? { color: '#8f0ee5' } : {}}>나의지갑</a>
						</Link>
					</Subnav>
					<Subnav>
						<Link href="/event">
							<a style={path.indexOf('/event') > -1 ? { color: '#8f0ee5' } : {}}>이벤트</a>
						</Link>
					</Subnav>
					<Subnav>
						<Link href="/celebrity">
							<a style={path.indexOf('/celebrity') > -1 ? { color: '#8f0ee5' } : {}}>셀럽</a>
						</Link>
					</Subnav>
					<Subnav>
						<Link href="/donation">
							<a style={path.indexOf('/donation') > -1 ? { color: '#8f0ee5' } : {}}>기부하기</a>
						</Link>
					</Subnav>

					<HeaderRight>
						{!auth ? (
							<div className="before_login">
								<Link href="/login">
									<a>로그인</a>
								</Link>
								<Link href="/notice">
									<a>고객센터</a>
								</Link>
							</div>
						) : (
							<div className="after_login">
								<div>
									<ul>
										<li onClick={() => setHeaderMenu(!headerMenu)}>
											<p>{userInfo.nickName}</p>
											님{headerMenu?<img src={header_name_up_image} alt="" />:<img src={header_name_down_image} alt="" />}
										</li>
										{headerMenu && (
											<ul>
												<li onClick={() => router.push('/mypage/history')}>마이페이지</li>
												<li onClick={kakaoChat}>카카오문의</li>
												<li onClick={() => router.push('/mypage/profile')}>회원 정보 수정</li>
												<li className="logout" onClick={logout}>
													로그아웃
												</li>
											</ul>
										)}
									</ul>
									{/* <img src={header_name_down_image} alt="" /> */}
								</div>
								<p onClick={() => router.push('/notice')}>고객센터</p>
							</div>
						)}
					</HeaderRight>
				</NavContent>
			</NavContainer>
		</HeaderWrap>
	);
};

const HeaderWrap = styled.div`
	width: 100%;
`;

const LeftSideModal = styled.div`
	display: none;
	@media screen and (max-width: 880px) {
		display: block;
		height: 100%;
		& > button {
			border: none;
			background: none;
			outline: none;
			cursor: pointer;
			height: 100%;
			padding: 0;
		}
	}
`;

const ModalContent = styled.div``;

const ModalHeader = styled.div`
	margin-top: 50px;
	& > p {
		font-size: 18px;
		font-weight: 500;
	}
`;
const ModalUserContent = styled.div`
	margin-top: 30px;
	& > .modal_after_login_content {
		& > .modal_user_info {
			display: flex;
			& > img {
				width: 40px;
				height: 40px;
				margin: auto 0px;
			}
			& > p {
				font-size: 14px;
				font-weight: 500;
				margin-left: 10px;
			}
		}
		& > .modal_user_info2 {
			& > p {
				margin: 15px 0px 0px 0px;
			}
		}
	}
	& > .modal_before_login_content {
		display: flex;
		justify-content: space-between;
		& > a {
			border: 1px solid;
			text-decoration: none;
			width: 47.5%;
			text-align: center;
			height: 40px;
			line-height: 40px;
			font-size: 14px;
			border-radius: 10px;
			border: none;
			outline: none;
			font-weight: 500;
		}
		& > .modal_login {
			border: 1px solid #8f0ee5;
			color: #8f0ee5;
		}
		& > .modal_join {
			background-color: #8f0ee5;
			color: white;
		}
	}
`;

const ModalMenuContent = styled.div`
	margin-top: 35px;
	& > div {
		border-bottom: 1px solid #e5e5e5;
		& > .modal_main_menu {
			display: flex;
			justify-content: space-between;
			& > p {
				font-size: 14px;
				font-weight: 500;
				cursor: pointer;
			}
			& > svg {
				margin: auto 0px;
				cursor: pointer;
			}
		}
		& > .modal_sub_menu {
			& > a {
				font-size: 13px;
				text-decoration: none;
				line-height: 30px;
			}
			& > .active {
				color: #8f0ee5 !important;
				font-weight: 500;
			}
		}
	}
`;

const ModalUserMenuContent = styled.div`
	margin: 30px 0px;
	& > p {
		font-size: 14px;
		cursor: pointer;
		&:hover {
			font-weight: 500;
			color: #8f0ee5;
		}
	}
`;
const Subnav = styled.div`
	float: left;
	overflow: hidden;
	margin-right: 30px;
	display: flex;
	&:hover > .subnav-content {
		display: block;
		background-color: rgba(255, 255, 255, 0.9);
	}
	& > a {
		margin: auto 0px;
		font-size: 17px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		color: #333333;
		text-decoration: none;
	}
	& > .subnav-content {
		display: none;
		position: absolute;
		left: 0;
		width: 100%;
		z-index: 1;
		height: 80px;
		line-height: 60px;
		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
		& > div {
			margin-top: 10px;
			display: flex;
			vertical-align: top;
			& > .letter-spacing {
				margin-left: 5.5%;
				width: 183px;
				height: 42px;
				margin-right: 45px;
				margin-bottom: 20px;
			}
			& > a {
				color: black;
				&:hover {
					font-weight: 500;
				}
			}
			& > .active {
				color: #8f0ee5 !important;
				font-weight: 500;
			}
		}
		& > div > a {
			margin-right: 20px;
			text-decoration: none;
		}
		background-color: white;
		@media screen and (max-width: 414px) {
			& > div > a {
				font-size: 12px;
				margin-right: 7px;
				text-decoration: none;
			}
		}
	}
	@media screen and (max-width: 880px) {
		display: none;
	}
`;

const NavContainer = styled.div`
	display: flex;
	width: 100%;
	background-color: white;
	box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.05);
`;
const NavContent = styled.div`
	margin: 0px auto;
	display: flex;
	width: 1280px;
	padding: 0px 15px;
	@media screen and (max-width: 880px) {
		height: 60px;
	}
`;

const ImageContainer = styled.div`
	margin: 15px 70px 0px 0px;
	& > img {
		width: 145px;
		height: 34px;
	}
	cursor: pointer;
	@media screen and (max-width: 880px) {
		margin: 10px 0px 0px 0px;
		width: 100%;
		display: flex;
		justify-content: center;
	}
	@media screen and (max-width: 414px) {
		& > img {
			width: 120px;
			height: 30px;
		}
	}
`;

const HeaderRight = styled.div`
	margin-left: auto;
	display: flex;
	flex-wrap: wrap;
	line-height: 80px;
	& > .before_login {
		& > a {
			text-decoration: none;
			font-size: 15px;
			font-weight: 400;
			font-stretch: normal;
			color: #333333;
			font-style: normal;
			margin-left: 20px;
		}
		& > span {
			margin: 0 5px;
		}
	}
	& > .after_login {
		display: flex;
		& > div {
			display: flex;
			& > ul {
				list-style: none;
				padding-left: 0;
				margin: 0;
				width: 100px;
				font-weight: 400;
				& > li {
					cursor: pointer;
					display: flex;
					& > p {
						margin: 0px 0px 0px auto;
					}
					& > img {
						margin: auto 0 auto 5px;
					}
				}
				& > ul {
					position: absolute;
					z-index: 100;
					width: 150px;
					margin-left: -40px;
					margin-top: -20px;
					display: block;
					border: solid 1px #d6d6d6;
					background-color: #ffffff;
					/* clip-path: polygon(0 100%, 100% 100%, 100% 3%, 84% 3%, 80% 0, 76% 3%, 0 3%); */
					padding-left: 0;
					list-style: none;
					padding: 10px;
					& > li {
						padding-left: 5px;
						text-align: left;
						height: 40px;
						line-height: 40px;
						font-size: 13px;
						cursor: pointer;
						&:hover {
							background-color: #f8f8f8;
						}
					}
				}
			}
		}
		& > p {
			margin: 0px 0px 0px 20px;
			font-size: 15px;
			color: #333333;
			cursor: pointer;
			font-weight: 400;
		}
	}
	& > span {
		margin-right: 10px;
		font-size: 14px;
	}
	@media screen and (max-width: 880px) {
		padding: 0px;
		& > .after_login {
			display: none;
		}
		& > .before_login {
			display: none;
		}
	}
	@media screen and (max-width: 414px) {
		font-size: 12px;
		& > span {
			display: none;
		}
		& > a {
			font-size: 12px;
		}
	}
`;

export default Header;
