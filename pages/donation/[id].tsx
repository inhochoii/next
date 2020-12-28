import LayoutTemplate from '../../components/template/base';
import DonationDetailContainer from '../../containers/donation/detail/donationDetailContainer';

const DonationDetail = ({data}) => {
	return (
		<LayoutTemplate>
			<DonationDetailContainer donation_id={data.id} />
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

export default DonationDetail;
