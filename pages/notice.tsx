import React from 'react';
import LayoutTemplate from '../components/template/base';
import NoticeContainer from '../containers/notice/noticeContainer';
const Notice: React.FC = () => {
	return (
		<LayoutTemplate>
			<NoticeContainer />
		</LayoutTemplate>
	);
};

export default Notice;
