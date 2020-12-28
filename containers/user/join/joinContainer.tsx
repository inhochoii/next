import React from 'react';
import JoinComponent from '../../../components/user/join';
import { inject, observer } from 'mobx-react';
import UserStore from '../../../stores/user';
import { createUser } from '../../../stores/user/types';
import { certificationNumber } from '../../../lib/certification';
import { sendMail } from '../../../lib/sendEmail';
import { aes256Decrypt } from '../../../lib/crypto';
import Router from 'next/router';

interface Props {
	userStore?: UserStore;
}

@inject('userStore')
@observer
class JoinContainer extends React.Component<Props> {
	state = {
		randomNum: '',
	};
	private userStore = this.props.userStore as UserStore;

	componentDidMount() {
		this.userStore.joinUserInitStatus();
	}
	nickNameCheck = async (nickname: string) => {
		await this.userStore.nicknameConfirm(nickname);
	};

	emailCheck = async (email: string) => {
		this.setState({ randomNum: certificationNumber() });
		await this.userStore.emailConfirm(email);
		if (this.userStore.emailStatus === 'suc') {
			sendMail(aes256Decrypt(email), this.state.randomNum);
		}
	};

	businessCheck = async (business_num: string) => {
		await this.userStore.businessConfirm(business_num);
	};

	createUser = async (user: createUser) => {
		await this.userStore.createUser(user);
		if (this.userStore.success.CREATE_USER) {
			Router.push('/login');
		}
	};

	createUserByForegion = async(user: any) =>{
		await this.userStore.createUserByForegion(user);
		if(this.userStore.success["CREATE_USER_FOREGION"]){
			alert(`Welcome!\nMembership has been completed.\nSubscription screening may take up to 2 business days.\nUpon completion, we will guide you through the your e-mail.\nThank you`);
			Router.push('/login');
		}
	}

	smsCert = async (receiver: string) => {
		await this.userStore.smsCert(receiver);
	};

	smsCertCheck = async (receiver: string, cert_code: string) => {
		await this.userStore.smsCertCheck(receiver, cert_code);
	};

	render() {
		return (
			<JoinComponent
				nickNameStatus={this.userStore.nickNameStatus}
				nickNameCheck={this.nickNameCheck}
				emailStatus={this.userStore.emailStatus}
				emailCheck={this.emailCheck}
				businessStatus={this.userStore.businessStatus}
				businessCheck={this.businessCheck}
				createUser={this.createUser}
				snsEmail={this.userStore.snsEmail}
				snsEmailStatus={this.userStore.snsEmailStatus}
				smsCert={this.smsCert}
				smsCertCheck={this.smsCertCheck}
				sendStatus={this.userStore.sendStatus}
				certStatus={this.userStore.certStatus}
				initStatus={this.userStore.joinUserInitStatus}
				randomNum={this.state.randomNum}
				createUserByForegion={this.createUserByForegion}
			/>
		);
	}
}
export default JoinContainer;
