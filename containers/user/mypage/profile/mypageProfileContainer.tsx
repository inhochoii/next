import React from 'react';
import MypageProfileComponent from '../../../../components/user/mypage/profile';
import { inject, observer } from 'mobx-react';
import UserStore from '../../../../stores/user';
import { aes256Decrypt } from '../../../../lib/crypto';
import Router from 'next/router';

interface Props {
	userStore?: UserStore;
}

@inject('userStore')
@observer
class MypageProfileContainer extends React.Component<Props> {
	state = {
		nickNameCheck: '',
	};

	private userStore = this.props.userStore as UserStore;

	private uuid: any = process.browser && sessionStorage.getItem('uuid');

	async componentDidMount() {
		await this.userStore.getPincode(this.uuid);
		await this.userStore.getUserAddress(aes256Decrypt(this.uuid));
	}

	userImageUpdate = async (data: any) => {
		if (this.userStore.userInfo !== undefined) {
			await this.userStore.userProfileUpdate(data);
			if (this.userStore.success.PROFILE_IMAGE_UPDATE) {
				await this.userStore.getUser(this.uuid);
				Router.push('/mypage/history');
			}
		}
	};

	userPincodeUpdate = async (pin_code: string) => {
		const user_id: any = sessionStorage.getItem('uuid');
		await this.userStore.updatePincode(user_id, pin_code);
		if (this.userStore.success.UPDATE_PINCODE) {
			// alert("핀코드 업데이트 완료");
			Router.push('/mypage/history');
		}
	};

	userAddressUpdate = async (
		user_id: string,
		addr_prop: string,
		addr_road: string,
		addr_detail: string,
		address_id: string
	) => {
		await this.userStore.updateUserAddress(user_id, addr_prop, addr_road, addr_detail, address_id);
		if (this.userStore.success.UPDATE_ADDRESS) {
			Router.push('/mypage/history');
			// alert("주소 변경 완료");
		}
	};

	userNickNameConfirm = async (nickName: string) => {
		await this.userStore.nicknameConfirm(nickName);
		this.setState({ nickNameCheck: this.userStore.nickNameStatus });
	};

	userNicknameUpdate = async (user_id: string, nickname: string) => {
		const uuid: any = sessionStorage.getItem('uuid');
		await this.userStore.updateUserNickname(user_id, nickname);
		if (this.userStore.success.UPDATE_NICKNAME) {
			await this.userStore.getUser(uuid);
			Router.push('/mypage/history');
		}
	};

	userPasswordUpdate = async (password: string) => {
		const uuid: any = sessionStorage.getItem('uuid');
		await this.userStore.updateUserPassword(Number(aes256Decrypt(uuid)), password);
		if (this.userStore.success.UPDATE_PASSWORD) {
			await this.userStore.getUser(uuid);
			Router.push('/mypage/history');
		}
	};
	render() {
		return (
			<MypageProfileComponent
				userImageUpdate={this.userImageUpdate}
				userInfo={this.userStore.userInfo}
				pincode={this.userStore.pincode}
				userPincodeUpdate={this.userPincodeUpdate}
				userAddress={this.userStore.userAddress}
				userAddressUpdate={this.userAddressUpdate}
				userNicknameUpdate={this.userNicknameUpdate}
				userPasswordUpdate={this.userPasswordUpdate}
				userNickNameConfirm={this.userNickNameConfirm}
				nickNameCheck={this.state.nickNameCheck}
			/>
		);
	}
}

export default MypageProfileContainer;
