import React from 'react';
import LayoutTemplate from '../../components/template/base';
import EventDetailContainer from '../../containers/event/detail/eventDetailContainer';

const EventDetail = ({data}) => {
	
	return (
		<LayoutTemplate>
			<EventDetailContainer event_id={data.id} />
		</LayoutTemplate>
	);
};

export async function getServerSideProps(context){
	const data = context.query;
	if(!data){
		return{
			notFound: true
		}
	}
	return{
		props:{
			data
		}
	}
}


export default EventDetail;
