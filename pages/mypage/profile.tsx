import LayoutTemplate from '../../components/template/base';
import MypageTemplate from '../../components/template/mypage';
import MypageSideNavContainer from '../../containers/user/mypage/sideNav/mypageSideNavContainer';
import MypageProfileContainer from '../../containers/user/mypage/profile/mypageProfileContainer';

const MypageProfile = () => {
	return (
		<LayoutTemplate>
			<MypageTemplate left={<MypageSideNavContainer />} title="마이 페이지">
				<MypageProfileContainer />
			</MypageTemplate>
		</LayoutTemplate>
	);
};

export default MypageProfile;
