export const kakaoChat = () => {
	globalThis.Kakao.Channel.chat({
		channelPublicId: '_mxjxaEK', // 카카오톡 채널 홈 URL에 명시된 id로 설정합니다.
	});
};
