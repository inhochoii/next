import React from 'react';
import UserPasswordFindConfirmComponent from '../../../../components/user/find/password/confirm';
import { inject, observer } from 'mobx-react';
import UserStore from '../../../../stores/user';
import { aes256Encrypt } from '../../../../lib/crypto';
import Router from 'next/router';

interface Props {
	userStore?: UserStore;
}

@inject('userStore')
@observer
class UserPasswordFindConfirmContainer extends React.Component<Props> {
	private userStore = this.props.userStore as UserStore;

	async componentDidMount() {
		if (this.userStore.findConfirmStatus.status === '1') {
			await this.userStore.getUserId(aes256Encrypt(this.userStore.findSaveInfo.email));
		} else {
			Router.push('/login/userPasswordFind');
		}
	}

	updatePassword = async (user_id: number, password: string) => {
		await this.userStore.updateUserPassword(user_id, password);
		if (this.userStore.success.UPDATE_PASSWORD) {
			alert('비밀번호 변경에 성공하였습니다. 변경하신 비밀번호로 다시 로그인을 시도해주세요.');
			Router.push('/login');
		}
	};
	render() {
		return (
			<UserPasswordFindConfirmComponent
				userId={this.userStore.findSaveInfo.user_id}
				updatePassword={this.updatePassword}
			/>
		);
	}
}

export default UserPasswordFindConfirmContainer;
