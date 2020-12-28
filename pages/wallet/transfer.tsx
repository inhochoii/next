import LayoutTemplate from '../../components/template/base';
import WalletTemplate from '../../components/template/wallet';
import WalletTopContainer from '../../containers/wallet/top/walletTopContainer';
import WalletTransferContainer from '../../containers/wallet/transfer/walletTransferContainer';
const Wallet = () => {
	return (
		<LayoutTemplate>
			<WalletTemplate top={<WalletTopContainer />}>
				<WalletTransferContainer />
			</WalletTemplate>
		</LayoutTemplate>
	);
};

export default Wallet;
