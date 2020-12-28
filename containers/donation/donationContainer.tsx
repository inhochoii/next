import React from 'react';
import DonationComponent from '../../components/donation';
import { inject, observer } from 'mobx-react';
import ProductStore from '../../stores/product';

interface Props {
	productStore?: ProductStore;
}

@inject('productStore')
@observer
class DonationContainer extends React.Component<Props> {
	private productStore = this.props.productStore as ProductStore;

	async componentDidMount() {
		await this.productStore.getDonationList('all');
	}
	render() {
		return <DonationComponent donation={this.productStore.donation} />;
	}
}

export default DonationContainer;
