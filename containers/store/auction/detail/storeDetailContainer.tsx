import React from 'react';
import { inject, observer } from 'mobx-react';
import ProductStore from '../../../../stores/product';
import StoreDetailComponent from '../../../../components/store/auction/detail';

interface Props {
	productStore?: ProductStore;
	product_id: any;
}

@inject('productStore')
@observer
class StoreDetailContainer extends React.Component<Props> {
	private productStore = this.props.productStore as ProductStore;

	async componentDidMount() {
		await this.productStore.getProductDetail(this.props.product_id);
		await this.productStore.getMainProduct(0);
	}
	render() {
		const { productDetail, product } = this.productStore;
		return <StoreDetailComponent productDetail={productDetail} product={product} />;
	}
}

export default StoreDetailContainer;
