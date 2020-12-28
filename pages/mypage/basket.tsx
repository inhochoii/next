import LayoutTemplate from '../../components/template/base';
import MypageTemplate from '../../components/template/mypage';
import MypageSideNavContainer from '../../containers/user/mypage/sideNav/mypageSideNavContainer';
import MypageBasketContainer from '../../containers/user/mypage/basket/mypageBasketContainer';

const MypageBasket = () => {
	return (
		<LayoutTemplate>
			<MypageTemplate left={<MypageSideNavContainer />} title="마이 페이지">
				<MypageBasketContainer />
			</MypageTemplate>
		</LayoutTemplate>
	);
};

export default MypageBasket;
