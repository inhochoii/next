import React from 'react';
import { inject, observer } from 'mobx-react';
import ProductStore from '../../../stores/product';
import CelebDetailComponent from '../../../components/celeb/detail';

interface Props {
	productStore?: ProductStore;
	celeb_id: string;
}

@inject('productStore')
@observer
class CelebDetailContainer extends React.Component<Props> {
	private productStore = this.props.productStore as ProductStore;

	componentDidMount() {
		this.productStore.getCelebItem(this.props.celeb_id);
		this.productStore.getMainProduct(0);
		
	}
	render() {
		return <CelebDetailComponent celebItem={this.productStore.celebItem} product={this.productStore.product} />;
	}
}

export default CelebDetailContainer;
