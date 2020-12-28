import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Footer: React.FC = () => {
	return (
		<FooterWrap>
			<FooterTopContainer></FooterTopContainer>
			<FooterContainer>
				<FooterContent>
					<FooterContentLogo>
						<p>BERRY STORE</p>
					</FooterContentLogo>
					<FooterContentItem>
						<FooterContentItemCompany>
							<p className="footer_content_company_name">(주)베리컬처</p>
							<div>
								<Link href="/terms">
									<a>이용약관</a>
								</Link>
								<span>|</span>
								<Link href="/policy">
									<a>법적고지 및 주의사항</a>
								</Link>
							</div>
						</FooterContentItemCompany>
						<FooterContentItemInfo>
							<p>
								대표 : 한호주 <span>|</span> 사업자등록번호 : 618-87-01290
								{/* <span>|</span> 팩스 : 02-541-0416 */}
							</p>
							<p>
								이메일 : berry@officialhelp.co.kr <span>|</span> 홈페이지 : www.berrystore.co.kr
							</p>
							<p>주소 : 서울특별시 강남구 도산대로 16길 13-20</p>
							<p>Copyright © BERRYSTORE. All rights reserved.</p>
						</FooterContentItemInfo>
					</FooterContentItem>
					<FooterContentItemSubInfo>
						{/* <p>
							<span className="footer_content_sub_info_1">대표전화 </span>
							<span className="footer_content_sub_info_2">02-541-0415</span>
						</p> */}
						<div>
							<p>문의 가능 시간</p>
							<small>평일 9:00~19:00 / 점심시간 13:00~14:00</small>
						</div>
					</FooterContentItemSubInfo>
				</FooterContent>
			</FooterContainer>
		</FooterWrap>
	);
};
const FooterWrap = styled.footer``;

const FooterTopContainer = styled.div`
	display: flex;
	border-top: 1px solid #e5e5e5;
	/* border-bottom: 2px solid #e5e5e5; */
`;

const FooterContainer = styled.div`
	padding: 34.5px 0px 68px 0px;
	display: flex;
`;

const FooterContent = styled.div`
	width: 1280px;
	padding: 0px 20px;
	display: flex;
	justify-content: space-between;
	margin: 0 auto;

	@media screen and (max-width: 880px) {
		flex-wrap: wrap;
		justify-content: left;
		margin: 0;
	}
`;

const FooterContentLogo = styled.div`
	& > P {
		font-stretch: normal;
		font-style: normal;
		margin: 0px;
		font-size: 25px;
		font-weight: 500;
	}
	@media screen and (max-width: 1020px) {
		& > p {
			font-size: 22px;
		}
	}
	@media screen and (max-width: 880px) {
		width: 100%;
	}
`;

const FooterContentItem = styled.div`
	@media screen and (max-width: 880px) {
		width: 100%;
	}
`;

// footer 회사이름
const FooterContentItemCompany = styled.div`
	display: flex;
	& > .footer_content_company_name {
		margin: 0px 7px 0px 0px;
		font-size: 22px;
		font-weight: 500;
		font-stretch: normal;
		color: #333333;
	}
	& > div {
		display: flex;
		& > a {
			text-decoration: none;
			color: #333333;
			margin: auto 0px 0px 0px;
			font-size: 12px;
			&:hover {
				font-weight: 500;
				cursor: pointer;
			}
		}
		& > span {
			margin: auto 6px 1px 6px;
			font-size: 12px;
			font-weight: 500;
		}
	}

	@media screen and (max-width: 1020px) {
		& > p {
			font-size: 18px;
		}
	}

	@media screen and (max-width: 530px) {
		flex-wrap: wrap;
		& > div {
			margin: 10px 0px 0px 0px;
		}
	}
`;

// footer 중간측 정보
const FooterContentItemInfo = styled.div`
	margin-top: 36px;
	& > p {
		margin: 0px 0px 13px 0px;
		display: flex;
		font-size: 14px;
		& > span {
			margin: -1px 5px 0px 3px;
		}
	}

	@media screen and (max-width: 1020px) {
		& > p {
			font-size: 12px;
		}
	}
	@media screen and (max-width: 530px) {
		& > p {
			font-size: 11px;
			& > span {
				display: none;
			}
		}
	}
`;

// footer 대표전화 및 근무시간
const FooterContentItemSubInfo = styled.div`
	& > div {
		margin: 0px 0px 10px 0px;
		font-weight: 500;
		& > .footer_content_sub_info_1 {
			font-size: 16px;
			color: #333333;
		}
		& > .footer_content_sub_info_2 {
			color: #8f0ee5;
			font-size: 26px;
		}
		& > p {
			margin: 0px 0px 10px 0px;
			font-size: 18px;
		}
		& > small {
			font-size: 14px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			color: #333333;
			letter-spacing: -0.56px;
			font-weight: 500;
		}
	}

	@media screen and (max-width: 1020px) {
		& > div {
			& > .footer_content_sub_info_1 {
				font-size: 14px;
			}
			& > .footer_content_sub_info_2 {
				font-size: 16px;
			}
			& > p {
				font-size: 14px;
			}
			& > small {
				font-size: 12px;
			}
		}
	}
`;
export default Footer;
