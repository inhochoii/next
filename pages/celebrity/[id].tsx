import LayoutTemplate from '../../components/template/base';
import CelebDetailContainer from '../../containers/celeb/detail/celebDetailContainer';
const CelebDetail = ({data}) => {
	return (
			<LayoutTemplate>
				<CelebDetailContainer celeb_id={data.id}/>
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
export default CelebDetail;
