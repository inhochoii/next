import React from 'react';
import LayoutTemplate from '../../../components/template/base';
import StoreDetailContainer from '../../../containers/store/auction/detail/storeDetailContainer';

const StoreProductDetail = ({data}) => {
	return (
		<LayoutTemplate>
			<StoreDetailContainer product_id={data.id} />
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
export default StoreProductDetail;
