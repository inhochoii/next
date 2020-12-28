import React from 'react';
import { observer, inject } from 'mobx-react';
import ProductStore from '../../stores/product';
import CelebComponent from '../../components/celeb';

interface Props {
	productStore?: ProductStore;
}
@inject('productStore')
@observer
class CelebContainer extends React.Component<Props> {
	private productStore = this.props.productStore as ProductStore;

	componentDidMount() {
		this.productStore.getCeleb();
	}

	render() {
		const { celeb } = this.productStore;
		return <CelebComponent celeb={celeb} />;
	}
}

export default CelebContainer;
