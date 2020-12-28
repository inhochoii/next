import React from 'react';
import Header from '../../components/layouts/header';
import { inject, observer } from 'mobx-react';
import UserStore from '../../stores/user';
import atob from 'atob';
interface Props {
	userStore?: UserStore;
}

@inject('userStore')
@observer
class HeaderContainer extends React.Component<Props> {
	private userStore = this.props.userStore as UserStore;
	state = {
		auth: '',
		user_info:{
			email:"",
			image:"",
			name:"",
			nickName:""
		}
	};
	async componentDidMount() {
		if (process.browser) {
			if (sessionStorage.getItem('uuid')) {
				this.setState({ auth: sessionStorage.getItem('uuid') });
				if (!sessionStorage.getItem('_user_info')) {
					await this.userStore.getUser(String(sessionStorage.getItem('uuid')));
				}
				else{
					const sessionData = JSON.parse(String(sessionStorage.getItem('_user_info')));
					this.setState({
						user_info:{
							email:atob(sessionData.email),
							image:atob(sessionData.image),
							name:atob(sessionData.name),
							nickName:atob(sessionData.nickName)
						}
					})
				}
			}
		}
	}

	logout = async () => {
		await this.userStore.logout();
		if (this.userStore.success.LOGOUT) {
			window.location.href = '/';
		}
	};

	render() {
		return <Header logout={this.logout} userInfo={this.state.user_info} auth={this.state.auth} />;
	}
}

export default HeaderContainer;
