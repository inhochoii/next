import React from 'react';
import { observer, inject } from 'mobx-react';
import NoticeStore from '../../stores/notice';
import NoticeComponent from '../../components/notice';

interface Props {
	noticeStore?: NoticeStore;
}

@inject('noticeStore')
@observer
class NoticeContainer extends React.Component<Props> {
	private noticeStore = this.props.noticeStore as NoticeStore;

	async componentDidMount() {
		await this.noticeStore.getNotice();
	}
	render() {
		return <NoticeComponent notice={this.noticeStore.notice} />;
	}
}
export default NoticeContainer;
