import LayoutTemplate from '../../components/template/base';
import MypageTemplate from '../../components/template/mypage';
import MypageSideNavContainer from '../../containers/user/mypage/sideNav/mypageSideNavContainer';
import MypageHistoryContainer from '../../containers/user/mypage/history/MypageHistoryContainer';
import {useRouter} from 'next/router';

const MypageHistory = () => {
	const router = useRouter();
	const query = router.query;
	return (
		<LayoutTemplate>
			<MypageTemplate left={<MypageSideNavContainer />} title="마이 페이지">
				<MypageHistoryContainer query={query} />
			</MypageTemplate>
		</LayoutTemplate>
	);
};

export default MypageHistory;
