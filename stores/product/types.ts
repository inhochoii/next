export type product = {
	product_id: string;
	product_nm: string;
	image: string;
	donor: string;
	price: string;
	d_day: string;
	status: string;
	category_id:string;
};

export type videos = {
	description: string;
	model_nm: string;
	thumb_url: string;
	title: string;
	video_id: string;
	video_url: string;
};

export type productDetail = {
	category_id: string;
	category_nm: string;
	product_id: string;
	product_nm: string;
	summary: string;
	content: string;
	donor: string;
	price: string;
	start_dt: string;
	end_dt: string;
	image: string[];
	status: string;
};

export type celebItem = {
	celeb_id: string;
	celeb_nm: string;
	celeb_img: string;
	video_url: string;
	description: string;
	dona_items: product[];
	videos: videos[];
};

export type celeb = {
	celeb_id: string;
	celeb_nm: string;
	celeb_img: string;
};

export type event = {
	event_id: number;
	title: string;
	type: string;
	image: string;
	product_id: string;
	url: string;
	content: string;
	start_dt: string;
	end_dt: string;
	active_yn: string;
	summary: string;
};

export type donation = {
	donation_id: number;
	dona_thumb_image: string;
	dona_title: string;
	dona_guide: string;
	dona_content: string;
	dona_amount: number;
	dona_person: number;
	dona_started_at: Date;
	dona_ended_at: Date;
	category_nm: string;
	org_name: string;
	org_intro: string;
	org_unique_num: number;
	status: number;
	msg: string;
};
