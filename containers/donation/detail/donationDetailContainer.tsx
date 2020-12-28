import React from 'react';
import { inject, observer } from 'mobx-react';
import ProductStore from '../../../stores/product';
import UserStore from '../../../stores/user';
import DonationDetailComponent from '../../../components/donation/detail';
import { aes256Decrypt } from '../../../lib/crypto';
import { toJS } from 'mobx';

interface Props {
	productStore?: ProductStore;
	userStore?: UserStore;
	donation_id: string;
}

@inject('productStore', 'userStore')
@observer
class DonationDetailContainer extends React.Component<Props> {
	private productStore = this.props.productStore as ProductStore;
	private userStore = this.props.userStore as UserStore;

	private uuid: any = process.browser && sessionStorage.getItem('uuid');

	initWallet = async () => {
		await this.userStore.bridgeWallet(aes256Decrypt(this.uuid));
		await this.userStore.getWallet(aes256Decrypt(this.uuid));
		if (this.userStore.success.BRIDGE_WALLET) {
			if (this.userStore.bridge?.result) {
				await this.userStore.balanceWallet(this.userStore.bridge.data.address);
			}
		}
	};

	async componentDidMount() {
		await this.productStore.getDonationList(this.props.donation_id);
		if (this.uuid) {
			await this.initWallet();
			await this.userStore.getPincode(this.uuid);
		}
	}

	donation = async (amount: number) => {
		await this.userStore.donate(Number(this.props.donation_id), String(this.userStore.bridge?.data.address), amount);
		if (this.userStore.success['DONATION_COMPLETE']) {
			if (this.userStore.donationStatus.status === 1) {
				alert(`${amount} BERRY가 기부되었습니다. `);
				setTimeout(() => (window.location.href = '/donation'), 1000);
			} else {
				alert(toJS(this.userStore.donationStatus.msg));
			}
		}
	};

	render() {
		return (
			<DonationDetailComponent
				donationDetail={this.productStore.donationDetail}
				balance={this.userStore.balance}
				donation={this.donation}
				pincode={this.userStore.pincode}
			/>
		);
	}
}

export default DonationDetailContainer;
