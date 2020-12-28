import LayoutTemplate from '../../components/template/base';
import WalletTemplate from '../../components/template/wallet';
import WalletTopContainer from '../../containers/wallet/top/walletTopContainer';
import WalletContainer from '../../containers/wallet/walletContainer';
const Wallet = () => {
	return (
		<LayoutTemplate>
			<WalletTemplate top={<WalletTopContainer />}>
				<WalletContainer />
			</WalletTemplate>
		</LayoutTemplate>
	);
};

export default Wallet;
