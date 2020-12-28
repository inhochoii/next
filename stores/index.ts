import ProductStore from './product';
import UserStore from './user';
import NoticeStore from './notice';
import TestStore from './test';
class RootStore {
	productStore: ProductStore;
	userStore: UserStore;
	noticeStore: NoticeStore;
	testStore: TestStore;
	constructor() {
		this.productStore = new ProductStore();
		this.userStore = new UserStore();
		this.noticeStore = new NoticeStore();
		this.testStore = new TestStore();
	}
}

export default RootStore;
