import React from 'react';
import { inject, observer } from 'mobx-react';
import UserStore from '../../../../stores/user';
import MypageHistoryComponent from '../../../../components/user/mypage/history';

interface Props {
	userStore?: UserStore;
	query: any;
}

@inject('userStore')
@observer
class MypageHistoryContainer extends React.Component<Props> {
	private userStore = this.props.userStore as UserStore;
	private uuid: any = process.browser && sessionStorage.getItem('uuid');

	async componentDidMount() {
		await this.userStore.getUser(this.uuid);
	}

	render() {
		return <MypageHistoryComponent user={this.userStore.userInfo} query={this.props.query} />;
	}
}

export default MypageHistoryContainer;
