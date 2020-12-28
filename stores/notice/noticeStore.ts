import { action, observable, makeObservable } from 'mobx';
import qs from 'qs';
import { notice } from './types';
import client from '../../lib/client';
import BaseStore from '../BaseStore';
class NoticeStore extends BaseStore {
	constructor() {
		super();
		makeObservable(this);
	}

	@observable
	notice: notice[] = [];

	@observable
	noticeDetail?: notice;

	@action
	getNotice = async () => {
		this.notice = [];
		this._init('READ_NOTICE');
		try {
			const res = await client.post('/Notice/getNoticeData');
			this.notice = res.data;
			this._success['READ_NOTICE'] = true;
		} catch (e) {
			this._failure['READ_NOTICE'] = [true, e];
		} finally {
			this._pending['READ_NOTICE'] = false;
		}
	};

	@action
	readNotice = async (noticeNum: string) => {
		this.noticeDetail = undefined;
		this._init('READ_NOTICE_DETAIL');

		try {
			const res = await client.post('/Notice/getNoticeData', qs.stringify({ notice_id: noticeNum }));
			this.noticeDetail = res.data;
			this._success['READ_NOTICE_DETAIL'] = true;
		} catch (e) {
			this._failure['READ_NOTICE_DETAIL'] = [true, e];
		} finally {
			this._pending['READ_NOTICE_DETAIL'] = false;
		}
	};
}

export default NoticeStore;
