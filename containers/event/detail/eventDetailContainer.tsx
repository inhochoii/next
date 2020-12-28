import React from 'react';
import { inject, observer } from 'mobx-react';
import ProductStore from '../../../stores/product';
import EventDetailComponent from '../../../components/event/detail';
interface Props {
	productStore?: ProductStore;
	event_id: string;
}
@inject('productStore')
@observer
class EventDetailContainer extends React.Component<Props> {
	private productStore = this.props.productStore as ProductStore;

	componentDidMount() {
		this.productStore.readEvent(this.props.event_id);
	}

	render() {
		return <EventDetailComponent event={this.productStore.eventItem} />;
	}
}

export default EventDetailContainer;
