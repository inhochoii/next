import React from 'react';
import { inject, observer } from 'mobx-react';
import UserStore from '../../../stores/user';
import { aes256Decrypt, aes256Encrypt } from '../../../lib/crypto';
import Router from 'next/router';
import WalletTransferComponent from '../../../components/wallet/transfer';

interface Props {
	userStore?: UserStore;
}

@inject('userStore')
@observer
class WalletTransferContainer extends React.Component<Props> {
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

	checkDapp = async (toWalletAddress: string, amount: string, inputPincode:string) => {
		await this.userStore.dappCheck(toWalletAddress);
		if (this.userStore.success['DAPP_CHECK']) {
			if (this.userStore.dAppStatus.status === 1) {
				await this.userStore.transactionsWallet(String(this.userStore.bridge?.data.address), toWalletAddress, amount, aes256Encrypt(inputPincode));
				if (this.userStore.success['TRANSACTION_COMPLETE']) {
					await this.initWallet();
					alert('전송 되었습니다.');
					setTimeout(() => Router.push('/wallet'), 1000);
				}
			} else if (this.userStore.dAppStatus.status === 201) {
				await this.userStore.sideToMain(String(this.userStore.bridge?.data.address), amount, toWalletAddress, aes256Encrypt(inputPincode));
				if (this.userStore.success['SIDE_TO_MAIN_COMPLETE']) {
					await this.initWallet();
					alert('전송 되었습니다.');
					setTimeout(() => (window.location.href = '/wallet'), 1000);
				}
			}
		}
	};

	confirmSend = async (amount: string) => {
		await this.userStore.confirmSendAmount(String(this.userStore.bridge?.data.address), amount);
		if (this.userStore.success['CONFIRM_SEND_AMOUNT']) {
			await this.userStore.initConfirmSendAmount();
		}
	};

	async componentDidMount() {
		scrollTo(0, 0);
		if (!this.uuid) {
			Router.push('/login');
		} else {
			await this.initWallet();
			await this.userStore.getPincode(this.uuid);
		}
	}
	render() {
		return (
			<WalletTransferComponent
				checkDapp={this.checkDapp}
				pincode={this.userStore.pincode}
				confirmSend={this.confirmSend}
				confirmSendAmountStatus={this.userStore.confirmSendAmountStatus}
				balance={this.userStore.balance}
			/>
		);
	}
}
export default WalletTransferContainer;
