import React from 'react';
import { inject, observer } from 'mobx-react';
import ProductStore from '../../stores/product';
import EventComponent from '../../components/event';
interface Props {
	productStore?: ProductStore;
}

@inject('productStore')
@observer
class EventContainer extends React.Component<Props> {
	private productStore = this.props.productStore as ProductStore;

	async componentDidMount() {
		await this.productStore.getEventList();
	}

	render() {
		return <EventComponent event={this.productStore.event} />;
	}
}

export default EventContainer;
