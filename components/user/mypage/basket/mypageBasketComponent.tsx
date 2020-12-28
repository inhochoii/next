import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const MypageBasketComponent: React.FC = () => {
	const [selectOption, setSelectOption] = useState<number>(1);

	const onClick = (e: any) => {
		const { id } = e.target;
		if (id === 'basket_recently') {
			setSelectOption(1);
		}
		if (id === 'basket_deadline') {
			setSelectOption(2);
		}
	};

	const [basketDeleteState] = useState<boolean>(true);

	return (
		<MypageWrap>
			<MypageBasketContainer>
				<MypageBasketContent>
					<MypageBasketHeader>
						<div className="basket_option">
							<span
								onClick={onClick}
								id="basket_recently"
								style={selectOption === 1 ? { color: 'black', fontWeight: 500 } : {}}
							>
								최신순
							</span>
							<span
								onClick={onClick}
								id="basket_deadline"
								style={selectOption === 2 ? { color: 'black', fontWeight: 500 } : {}}
							>
								마감임박 순
							</span>
						</div>
						{basketDeleteState ? (
							<div className="basket_option2">
								<span>
									총 <span style={{ color: '#8f0ee5', fontSize: '16px', fontWeight: 500 }}>0</span>개
								</span>
								<span>|</span>
								<span id="basket_delete">삭제</span>
							</div>
						) : (
							<div className="basket_option2">
								<span>
									총 <span style={{ color: '#8f0ee5', fontSize: '16px', fontWeight: 500 }}>{0}</span>개선택
								</span>
								<span>|</span>
								<span id="basket_delete_select">삭제</span>
							</div>
						)}
					</MypageBasketHeader>
					<MypageBasketItem>
						<p>찜한 상품 데이터가 존재하지 않습니다.</p>
					</MypageBasketItem>
				</MypageBasketContent>
			</MypageBasketContainer>
		</MypageWrap>
	);
};

const MypageWrap = styled.div`
	height: 100%;
	margin-bottom: 100px;
`;

const MypageBasketContainer = styled.div`
	display: flex;
`;

const MypageBasketContent = styled.div`
	margin-left: 2%;
	width: 100%;

	& > .toggle_button {
		display: none;
	}

	@media screen and (max-width: 414px) {
		& > .toggle_button {
			display: block;
			margin-bottom: 10px;
			& > button {
				display: block;
				border: 1px solid #8f0ee5;
				color: #8f0ee5;
				border-radius: 15px 15px;
				background: none;
				font-size: 12px;
				outline: none;
				height: 30px;
			}
		}
	}
`;

const MypageBasketHeader = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 2px solid gray;
	height: 40px;
	font-size: 15px;
	color: gray;
	& > .basket_option {
		& > span {
			cursor: pointer;
		}
	}
	& > .basket_option2 {
		& > #basket_delete,
		#basket_delete_select {
			&:hover {
				font-weight: 500;
				cursor: pointer;
				color: black;
			}
		}
	}
	& > div {
		& > span {
			margin-right: 10px;
		}
	}
`;

const MypageBasketItem = styled.div`
	text-align: center;
	margin-top: 30px;
	& > p {
		font-size: 18px;
		color: gray;
		font-weight: 500;
	}
	@media screen and (max-width: 414px) {
		& > p {
			font-size: 14px;
		}
	}
`;
export default MypageBasketComponent;
