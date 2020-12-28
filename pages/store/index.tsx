import LayoutTemplate from '../../components/template/base';
import StoreContainer from '../../containers/store/auction/storeContainer';
import {useRouter} from 'next/router';
const Store = () => {
	const router  = useRouter();
	const query = router.query;
	return (
		<LayoutTemplate>
			<StoreContainer query={query} />
		</LayoutTemplate>
	);
};

export default Store;
