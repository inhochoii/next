import React from 'react';
import { inject, observer } from 'mobx-react';
import MypageSideNavComponent from '../../../../components/user/mypage/sideNav';
import UserStore from '../../../../stores/user';
import { aes256Decrypt } from '../../../../lib/crypto';
import Router from 'next/router';

interface Props {
	userStore?: UserStore;
}

@inject('userStore')
@observer
class MypageSideNavContainer extends React.Component<Props> {
	private userStore = this.props.userStore as UserStore;
	private uuid: any = process.browser && sessionStorage.getItem('uuid');

	registerCoupon = async (coupon_code: string) => {
		await this.userStore.registerCoupon(aes256Decrypt(this.uuid), coupon_code);
		if (this.userStore.success.REGISTER_COUPON) {
			alert(this.userStore.couponInfo.msg);
		}
	};

	async componentDidMount() {
		if (!this.uuid) {
			Router.push('/login');
		} else {
			await this.userStore.getUser(this.uuid);
		}
	}

	render() {
		const user = this.userStore.userInfo;
		return <MypageSideNavComponent user={user} registerCoupon={this.registerCoupon} />;
	}
}

export default MypageSideNavContainer;
