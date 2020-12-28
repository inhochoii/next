import React from 'react';
import UserIdFindConfirmComponent from '../../../../components/user/find/id/confirm';
import { inject, observer } from 'mobx-react';
import UserStore from '../../../../stores/user';
import Router from 'next/router';

interface Props {
	userStore?: UserStore;
}

@inject('userStore')
@observer
class UserFindIdConfirmContainer extends React.Component<Props> {
	private userStore = this.props.userStore as UserStore;

	componentDidMount() {
		if (this.userStore.findConfirmStatus.status !== '1') {
			Router.push('/login/userIdFind');
		}
	}

	render() {
		return <UserIdFindConfirmComponent findConfirmStatus={this.userStore.findConfirmStatus} />;
	}
}

export default UserFindIdConfirmContainer;
