import React from 'react';
import { inject, observer } from 'mobx-react';
import ProductStore from '../../../stores/product';
import router from 'next/router';
import StoreComponent from '../../../components/store/auction';

interface Props {
	productStore?: ProductStore;
	query: any;
}

@inject('productStore')
@observer
class StoreContainer extends React.Component<Props> {
	private productStore = this.props.productStore as ProductStore;

	getProductList = () => {
		if (this.props.query.category === undefined) {
			this.productStore.getProduct(2);
		} else {
			this.productStore.getProductSortBy(String(this.props.query.sortBy), Number(this.props.query.category));
		}
	};

	componentDidMount() {
		this.getProductList();
	}
	pageUpdate = (pageNum: number) => {
		this.productStore.pageUpdate(pageNum);
	};

	componentDidUpdate(prev: any) {
		if (router.query.category !== prev.query.category || router.query.sortBy !== prev.query.sortBy) {
			this.getProductList();
		}
	}

	render() {
		const { product, productPage } = this.productStore;
		return (
			<StoreComponent
				product={product}
				productPage={productPage}
				pageUpdate={this.pageUpdate}
				query={this.props.query}
			/>
		);
	}
}

export default StoreContainer;
