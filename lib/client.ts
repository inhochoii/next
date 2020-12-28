import axios from 'axios';

export default axios.create({
	baseURL: `https://berrystore.cafe24.com`,
	timeout: 10000,
});
