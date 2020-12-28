import * as React from 'react';
import { inject, observer } from 'mobx-react';

import LoginComponent from '../../../components/user/login';
import UserStore from '../../../stores/user';
import { aes256Encrypt } from '../../../lib/crypto';
interface Props {
	userStore?: UserStore;
}

@inject('userStore')
@observer
class LoginContainer extends React.Component<Props> {
	state = {
		loading: false,
	};

	private userStore = this.props.userStore as UserStore;
	login = async (email: string, password: string) => {
		await this.userStore.login(email, password);
		this.setState({ loading: true });
		await this.userStore.login(email, password);
		if (this.userStore.loginResData?.status === 1) {
			await this.userStore.getUser(this.userStore.loginResData.user_id);
			if (this.userStore.success.READ_USER) {
				window.location.href = '/';
			}
		} else {
			alert(this.userStore.loginResData?.msg);
			this.setState({ loading: false });
		}
	};

	kakaoLogin = async (email: string, kakao_token: string) => {
		const cryptoEmail: any = aes256Encrypt(email);
		await this.userStore.emailConfirm(cryptoEmail);
		if (this.userStore.success.EMAIL_CONFIRM) {
			if (this.userStore.emailStatus === 'dup') {
				await this.userStore.kakaoLogin(email, kakao_token);
				if (this.userStore.loginResData?.status === 1) {
					if (this.userStore.success.KAKAO_LOGIN) {
						await this.userStore.getUser(this.userStore.loginResData.user_id);
						window.location.href = '/';
					}
				} else {
					alert(this.userStore.loginResData?.msg);
				}
			} else if (this.userStore.emailStatus === 'suc') {
				await this.userStore.saveSnsInfo(email);
				if (this.userStore.success.SAVE_SNS_EMAIL) {
					window.location.href = '/';
				}
			}
		}
	};
	render() {
		return <LoginComponent login={this.login} kakaoLogin={this.kakaoLogin} loading={this.state.loading} />;
	}
}

export default LoginContainer;
