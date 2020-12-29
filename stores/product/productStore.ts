import { observable, action, computed, makeObservable } from 'mobx';
import client from '../../lib/client';
import { product, productDetail, celebItem, celeb, videos, event, donation } from './types';
import BaseStore from '../BaseStore';
import qs from 'qs';
class ProductStore extends BaseStore {
	constructor() {
		super();
		makeObservable(this);
	}

	@observable
	product: product[] = [];

	@observable
	deadLineProduct: product[] = [];

	@observable
	newProduct: product[] = [];

	@observable
	productDetail?: productDetail;

	@observable
	celeb: celeb[] = [];

	@observable
	celebItem?: celebItem;

	@observable
	_videos: videos[] = [];

	@observable
	productPage = 1;

	@observable
	_event: event[] = [];

	@observable
	_eventItem: event[] = [];

	@observable
	_donation: donation[] = [];

	@observable
	_donationDetail: donation[] = [];

	@computed
	get event() {
		return this._event;
	}

	@computed
	get eventItem() {
		return this._eventItem;
	}

	@computed
	get videos() {
		return this._videos;
	}

	@computed
	get donation() {
		return this._donation;
	}

	@computed
	get donationDetail() {
		return this._donationDetail;
	}

	@action
	initProduct() {
		this._init('READ_PRODUCT');
		this.product = [];
	}
	////////////////////////////////////////////////////////////////////////
	//마감임박순에 대한 상품 가져옴
	@action
	getDeadLineProduct = async () => {
		this._init('READ_DEADLINE_PRODUCT');
		this.deadLineProduct = [];
		try {
			const res = await client.post('product/getRecentBidProductList', qs.stringify({s_category_id:2, order_type:"asc", limit:"100000"}));
			this.deadLineProduct = await res.data;
			this._success.READ_DEADLINE_PRODUCT = true;
		} catch (e) {
			this._failure.READ_DEADLINE_PRODUCT = [true, e];
		} finally {
			this._pending.READ_DEADLINE_PRODUCT = false;
		}
	};
	//신상품순에 대한 상품 가져옴
	@action
	getNewProduct = async () => {
		this._init('READ_NEW_PRODUCT');
		this.newProduct = [];
		try {
			const res = await client.post('/product/getRecentBidProductList', qs.stringify({s_category_id:2, limit:"100000"}));
			this.newProduct = await res.data;
			this._success.READ_NEW_PRODUCT = true;
		} catch (e) {
			this._failure.READ_NEW_PRODUCT = [true, e];
		} finally {
			this._pending.READ_NEW_PRODUCT = false;
		}
	};

	//카테고리별 상품 가져옴
	@action
	getMainProduct = async (num: number) => {
		this.product = [];
		this._init('READ_MAIN_PRODUCT');
		try {
			if (num === 0) {
				const res = await client.post('/Product/getRecentBidProductList', qs.stringify({limit:"10000"}));
				this.product = await res.data;
			} else {
				const res = await client.post('/Product/getRecentBidProductList', qs.stringify({s_category_id:num, limit:"10000"}));
				this.product = await res.data;
			}
			this._success.READ_MAIN_PRODUCT = true;
		} catch (e) {
			this._failure.READ_MAIN_PRODUCT = [true, e];
		} finally {
			this._pending.READ_MAIN_PRODUCT = false;
		}
	};
	////////////////////////////////////////////////////////////////////////
	@action
	getProduct = async (num: number) => {
		this._init('READ_PRODUCT');
		this.product = [];

		try {
			const res = await client.post('/product/getRecentBidProductList', qs.stringify({s_category_id:num, limit:"10000"}));
			this.product = await res.data;
			this._success.READ_PRODUCT = true;
		} catch (e) {
			this._failure.READ_PRODUCT = [true, e];
		} finally {
			this._pending.READ_PRODUCT = false;
		}
	};

	// Product Sort
	@action
	getProductSortBy = async (str: string, num: number) => {
		this.product = [];
		this._init('READ_PRODUCT');

		if (str === 'all') {
			this.getProduct(num);
		} else {
			try {
				const res = await client.post('/Product/getRecentBidProductList', qs.stringify({order_type:str, s_category_id:num, limit:"10000"}));
				this.product = await res.data;
				this._success.READ_PRODUCT = true;
			} catch (e) {
				this._failure.READ_PRODUCT = [true, e];
			} finally {
				this._pending.READ_PRODUCT = false;
			}
		}
	};

	@action
	getProductDetail = async (productNum: number) => {
		this.productDetail = undefined;
		this._init('READ_PRODUCT_DETAIL');

		try {
			const res = await client.post('/product/getProductDetail', qs.stringify({product_id:productNum}));
			this.productDetail =  res.data;
			this._success.READ_PRODUCT_DETAIL = true;
		} catch (e) {
			this._failure.READ_PRODUCT_DETAIL = [true, e];
		} finally {
			this._pending.READ_PRODUCT_DETAIL = false;
		}
	};

	@action
	getCelebItem = async (celeb_id: string) => {
		this.celebItem = undefined;
		this._init('READ_CELEBRITY_DETAIL');
		try {
			const res = await client.post('/Celeb/getCelebDetailById', {celeb_id:celeb_id});
			this.celebItem = await res.data;

			this._success.READ_CELEBRITY_DETAIL = true;
		} catch (e) {
			this._failure.READ_CELEBRITY_DETAIL = [true, e];
		} finally {
			this._pending.READ_CELEBRITY_DETAIL = false;
		}
	};

	@action
	getCeleb = () => {
		this.celeb = [];
		this._init('READ_CELEBRITY');

		try {
			client.post('/Celeb/getCelebList').then((res) => (this.celeb = res.data));
			this._success.READ_CELEBRITY = true;
		} catch (e) {
			this._failure.READ_CELEBRITY = [true, e];
		} finally {
			this._pending.READ_CELEBRITY = false;
		}
	};

	@action
	getVideos = () => {
		client.post('/Video/getVideoData').then((res) => (this._videos = res.data));
	};

	@action
	pageUpdate = (pageNum: number) => {
		this.productPage = pageNum;
	};

	@action
	getEventList = async () => {
		this._init('READ_EVENT');
		try {
			const res = await client.post('/Event/getEventList', qs.stringify({type:"event"}));
			this._event = await res.data;
			this._success.READ_EVENT = true;
		} catch (e) {
			this._failure.READ_EVENT = [true, e];
		} finally {
			this._pending.READ_EVENT = false;
		}
	};

	@action
	readEvent = async (event_id: string) => {
		this._init('READ_EVENT_DETAIL');
		this._eventItem = [];

		try {
			const res = await client.post('/Event/getEventList', qs.stringify({event_id:event_id, type:"event"}));
			this._eventItem = await res.data;
			this._success.READ_EVENT_DETAIL = true;
		} catch (e) {
			this._failure.READ_EVENT_DETAIL = [true, e];
		} finally {
			this._pending.READ_EVENT_DETAIL = false;
		}
	};

	@action
	getDonationList = async (type: string) => {
		this._init('READ_DONATION');
		this._init('READ_DONATION_DETAIL');
		this._donation = [];
		this._donationDetail = [];

		if (type === 'all') {
			try {
				await client.post('/Donation/getDonationData').then((res) => (this._donation = res.data));
				this._success['READ_DONATION'] = true;
			} catch (e) {
				this._failure['READ_DONATION'] = [true, e];
			} finally {
				this._pending['READ_DONATION'] = false;
			}
		} else {
			try {
				const res = await client.post('/Donation/getDonationData', qs.stringify({donation_id:type}));
				this._donationDetail = await res.data;
				this._success['READ_DONATION_DETAIL'] = true;
			} catch (e) {
				this._failure['READ_DONATION_DETAIL'] = [true, e];
			} finally {
				this._pending['READ_DONATION_DETAIL'] = false;
			}
		}
	};
}
export default ProductStore;
