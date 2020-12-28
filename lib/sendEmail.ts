export const sendMail = (email: string, randomNum: string) => {
	window.globalThis.Email.send({
		SecureToken: '3ab72334-74a4-481b-8160-1b0da1bdc4f7',
		To: email,
		From: 'dev@fandomberry.com',
		Subject: '베리스토어 인증번호',
		Body: `
        <html>
            <div style="width:60%">
                <div style="margin:0 20%">
                    <div style="padding-top:30px">
                        <h1>이메일 <br /> 주소 인증</h1>
                    </div>
                    <br />
                    <div>
                        <p>투명한 기부의 첫 시작, 베리스토어입니다.</p>
                    </div>
                    <br />
                    <div>
                        <p>안녕하세요 회원님. <br /> 가입을 진심으로 축하드립니다. <br />아래의 인증 번호를 회원가입의 인증 번호란에 입력해주세요.</p>
                    </div>
                    <div>
                        <h2>회원가입 인증 번호 : ${randomNum}</h2>
                    </div>
                    <div>
                        <p>만약 회원님 본인의 요청이 아닐 경우, <br />반드시 고객센터로 문의해 주시기 바랍니다.</p>
                    </div>
                    <br />
                    <div>
                        <p>감사합니다. <br />베리스토어 드림.</p>
                    </div>
                    <br />
                    <div style="border-top:2px solid">
                    <br />
                        <a href="https://berrystore.co.kr">베리스토어 바로가기</a>
                    </div>
                </div>
            </div>
        </html>
        `,
	});
};
