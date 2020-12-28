import React from 'react';
import UserIdFindComponent from '../../../../components/user/find/id';
import { observer, inject } from 'mobx-react';
import UserStore from '../../../../stores/user';

interface Props {
	userStore?: UserStore;
}

@inject('userStore')
@observer
class UserIdFindContainer extends React.Component<Props> {
	private userStore = this.props.userStore as UserStore;

	componentDidMount() {
		this.userStore.initFind();
	}

	findSendSms = async (receiver: string, find_type: string, find_value: string) => {
		await this.userStore.findSendSMS(receiver, find_type, find_value);
		if (this.userStore.success.FIND_SEND_SMS) {
			if (this.userStore.findSendStatus.status !== '1') {
				alert(this.userStore.findSendStatus.msg);
			}
		}
	};

	findConfirmSms = async (receiver: string, cert_code: string, mail_find_yn: string) => {
		await this.userStore.findConfirmSms(receiver, cert_code, mail_find_yn);
		if (this.userStore.success.FIND_CONFIRM_SMS) {
			if (this.userStore.findConfirmStatus.status === '1') {
				alert('인증되었습니다.');
			} else {
				alert(this.userStore.findConfirmStatus.msg);
			}
		}
	};

	render() {
		return (
			<UserIdFindComponent
				findSendSms={this.findSendSms}
				findSendStatus={this.userStore.findSendStatus}
				findConfirmSms={this.findConfirmSms}
				findConfirmStatus={this.userStore.findConfirmStatus}
			/>
		);
	}
}

export default UserIdFindContainer;
