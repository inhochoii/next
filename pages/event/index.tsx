import React from 'react';
import LayoutTemplate from '../../components/template/base';
import EventContainer from '../../containers/event/eventContainer';
const Event: React.FC = () => {
	return (
		<LayoutTemplate>
			<EventContainer />
		</LayoutTemplate>
	);
};

export default Event;
