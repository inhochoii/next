export type user = {
	user_id: string;
	name: string;
	nickname: string;
	email: string;
	user_img: string;
	bid_cnt: string;
	imm_cnt: string;
	suc_cnt: string;
	ship_cnt: string;
};

// export type createUser = {
//     email:string;
//     password:string;
//     pin_code:string;
//     name: string;
//     nickname:string;
//     nation:string;
//     phone:string;
//     fcm:string;
//     business_num:string
// }

export type createUser = {
	email: string;
	password: string;
	pin_code: string;
	name: string;
	nickname: string;
	nation: string;
	phone: string;
	fcm: string;
	addr_prop: string;
	addr_zip: string;
	addr_road: string;
	addr_detail: string;
	business_num: string;
};

export type loginResData = {
	status: any;
	hash: string;
	error: string;
	msg: string;
	user_id: string;
};

export type WalletResData = {
	status: any;
	msg: string;
	error: string;
};

export type walletData = {
	address: string;
};
export type bridge = {
	result: boolean;
	data: walletData;
};

export type userAddress = {
	status: any;
	address_id: any;
	addr_prop: string;
	recicver_nm: string;
	zipcode: string;
	addr_road: string;
	addr_detail: string;
	phone: string;
	nation: string;
	error: string;
	msg: string;
};

export type inquire = {
	issue_id: string;
	user_id: string;
	issue_type: string;
	title: string;
	content: string;
	status: string;
	created_at: string;
	updated_at: string;
};

export type balanceData = {
	balance: string;
};

export type balance = {
	data: balanceData;
	result: boolean;
};

export type findSaveInfo = {
	email: string;
	user_id: string;
};
