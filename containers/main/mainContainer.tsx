import React from 'react';
import { inject, observer } from 'mobx-react';
import MainComponent from '../../components/layouts/main';
import ProductStore from '../../stores/product';

interface Props {
	productStore?: ProductStore;
}

@inject('productStore')
@observer
class MainContainer extends React.Component<Props> {
	private productStore = this.props.productStore as ProductStore;
	async componentDidMount() {
		await this.productStore.getMainProduct(0);
		await this.productStore.getNewProduct();
	}
	getMainProduct = (categoryNum: number) => {
		this.productStore.getMainProduct(categoryNum);
	};

	render() {
		const { product, newProduct } = this.productStore;

		return <MainComponent product={product} newProduct={newProduct} getMainProduct={this.getMainProduct} />;
	}
}

export default MainContainer;
