import React from 'react';
import { inject, observer } from 'mobx-react';
import UserStore from '../../../stores/user';
import { aes256Decrypt } from '../../../lib/crypto';
import { toJS } from 'mobx';
import Router from 'next/router';
import WalletTopComponent from '../../../components/wallet/top';

interface Props {
	userStore?: UserStore;
}

@inject('userStore')
@observer
class WalletTopContainer extends React.Component<Props> {
	private uuid: any = process.browser && sessionStorage.getItem('uuid');
	private userStore = this.props.userStore as UserStore;

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
		if (this.uuid) {
			await this.userStore.getUser(this.uuid);
			await this.initWallet();
		} else {
			Router.push('/login');
		}
	}
	createWallet = async (walletName: string) => {
		if (this.userStore.userInfo !== undefined) {
			await this.userStore.createWallet(this.userStore.userInfo?.user_id, walletName);
			if (this.userStore._success.CREATE_WALLET) {
				alert('지갑이 생성되었습니다.');
				Router.push('/wallet');
				await this.initWallet();
			}
		}
	};

	updateWalletName = async (wallet_nm: string) => {
		await this.userStore.changeWalletName(aes256Decrypt(this.uuid), wallet_nm);
		if (this.userStore.success['UPDATE_WALLET_NAME']) {
			alert(toJS(this.userStore.changeWalletStatus.msg));
			await this.initWallet();
		}
	};

	render() {
		return (
			<WalletTopComponent
				bridge={this.userStore.bridge}
				balance={this.userStore.balance}
				wallet_nm={this.userStore.wallet_nm}
				userInfo={this.userStore.userInfo}
				createWallet={this.createWallet}
				updateWalletName={this.updateWalletName}
			/>
		);
	}
}
export default WalletTopContainer;
