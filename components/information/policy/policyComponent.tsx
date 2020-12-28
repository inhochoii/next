import * as React from 'react';
import styled from 'styled-components';

const PolicyComponent: React.FC = () => {
	return (
		<PolicyWrap>
			<PolicyContainer>
				<h1>베리스토어 개인정보 처리방침</h1>
				<PolicyContent>
					<div>
						<div>
							<p style={{ textAlign: 'center' }}>
								<strong>주식회사 베리컬처</strong>
							</p>
							<p>&nbsp;</p>
							<p style={{ textAlign: 'center' }}>베리스토어 개인정보 처리방침</p>
						</div>
						<p>&nbsp;</p>
						<p>
							주식회사 베리컬처(이하 &ldquo;회사&rdquo;)는 회사가 운영하는 인터넷 사이트(http://berrystore.co.kr) 및
							모바일 애플리케이션(이하 &ldquo;베리스토어&rdquo;)를 이용하는 이용자님들의 개인정보를 매우 중요하게
							생각하며 아래와 같은 개인 정보처리방침을 가지고 있습니다. 이 개인정보처리방침은 개인정보와 관련한 법령
							또는 지침의 변경이 있는 경우 갱신되고, 베리스토어 정책의 변화에 따라 달라질 수 있으니 이용자께서는
							베리스토어를 방문시 수시로 확인하여 주시기 바랍니다. 베리스토어의 개인정보처리방침은 다음과 같은 내용을
							담고 있습니다.
						</p>
						<p>&nbsp;</p>
						<p>1. 개인정보의 수집&middot;이용</p>
						<p>2. 개인정보 제3자 제공</p>
						<p>3. 개인정보 처리위탁</p>
						<p>4. 이용자 개인정보의 보유</p>
						<p>： 이용기간 및 파기</p>
						<p>5. 스마트폰 앱 관리</p>
						<p>6. 쿠키(Cookie)의 운용 및 거부</p>
						<p>7. 이용자 및 법정대리인의 권리</p>
						<p>8. 이용자의 의무</p>
						<p>9. 링크 사이트에 대한 책임</p>
						<p>10. 개인정보의 기술적／관리적 보호 대책</p>
						<p>11. 개인정보 보호책임자</p>
						<p>12. 고지의 의무</p>
						<p>&nbsp;</p>
						<p>&nbsp;</p>
						<p>1. 개인정보의 수집&middot;이용</p>
						<p>&nbsp;</p>
						<p>
							가. 회사가 개인정보를 수집하는 목적은 이용자의 신분과 서비스 이용의사를 확인하여 최적화되고 맞춤화된
							서비스를 제공하기 위함입니다. 회사는 최초 회원가입 시 서비스의 본질적 기능을 수행하기 위해 반드시 필요한
							최소한의 정보만을 수집하고 있으며 회사가 제공하는 서비스 이용에 따른 대금결제, 물품배송 및 환불 등에
							필요한 정보를 추가로 수집할 수 있습니다.
						</p>
						<p>
							나. 회사는 개인정보를 수집&middot;이용목적 이외에 다른 용도로 이를 이용하거나 이용자의 동의 없이 제3자에게
							이를 제공하지 않습니다.
						</p>
						<p>
							다. 회사는 다음과 같은 목적으로 개인정보를 수집하여 이용할 수 있습니다.다만, 전자상거래 등에서의
							소비자보호에 관한 법률, 국세기본법, 전자금융거래법 등 관계법령에 따라 주민등록번호 및 은행계좌번호의
							수집&middot;보관이 불가피한 경우에는 이용자에게 고지하여 해당 정보를 수집할 수 있습니다.
						</p>
						<p>&nbsp;</p>
						<p>1) 구매회원/판매회원</p>
						<p>&nbsp;</p>
						<table>
							<tbody>
								<tr>
									<td>
										<p>&nbsp;</p>
									</td>
									<td>
										<p>목 적</p>
									</td>
									<td>
										<p>항 목</p>
									</td>
								</tr>
								<tr>
									<td rowSpan={6}>
										<p>구매회원/판매회원</p>
									</td>
									<td>
										<p>
											본인여부 확인, SSO연동, 계약이행 및 약관 변경 등의 고지를 위한 연락, 본인의사확인 및 민원 등의
											고객불만처리
										</p>
									</td>
									<td>
										<p>이름, ID, 비밀번호, 휴대폰번호, 이메일 주소, 외국인등록번호(외국인인 경우)</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>주문, 결제 및 배송서비스</p>
									</td>
									<td>
										<p>
											이름, 전화번호, 주소, 은행계좌정보, 휴대폰결제 시 휴대폰번호, 현금영수증 신청 시 현금영수증 정보
										</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>신규 서비스 개발, 맞춤 서비스 제공 및 마케팅,서비스 이용 통계 및 설문</p>
									</td>
									<td>
										<p>성별, 생년월일, 휴대폰번호, 이메일 주소</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>
											본인인증 식별 , 본인여부 , 연령 확인 , 부정이용 방지, 맞춤 서비스 등 통합서비스 운영
											<br /> ( * ID/PW찾기와 성인상품의 열람 등 )
										</p>
									</td>
									<td>
										<p>
											이름,성별,생년월일, 휴대폰번호, CI/DI,아이핀 인증결과, 통신사, 내/외국인정보, 서비스이용기록,
											기기정보
										</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>14세 미만 회원의 경우 법정대리인 확인</p>
									</td>
									<td>
										<p>법정대리인 이름, 휴대폰 번호, 이메일주소, CI/DI, 베리스토어 ID</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>해외 직배송 상품 통관업무처리</p>
									</td>
									<td>
										<p>개인고유통관부호, 생년월일</p>
									</td>
								</tr>
								<tr>
									<td rowSpan={3}>
										<p>판매회원</p>
									</td>
									<td>
										<p>부가가치세법 제32조에 따른 세금계산서 등의 발행</p>
									</td>
									<td>
										<p>주민등록번호</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>물품대금 송금 및 대금결제서비스의 제공 등</p>
									</td>
									<td>
										<p>신용카드정보, 은행계좌정보</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>판매회원 서비스 제공 등</p>
									</td>
									<td>
										<p>담당자명, 담당자연락처, 주소</p>
									</td>
								</tr>
							</tbody>
						</table>
						<p>&nbsp;</p>
						<p>2) 제휴서비스</p>
						<p>
							회사는 제휴서비스 제공의 목적으로 제휴사를 통해 개인정보를 추가 수집하게 되는 경우 별도 이용자의 동의를
							얻어 수집합니다.
						</p>
						<p>3) 기타</p>
						<p>
							서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이 자동으로 생성되어
							수집&middot;저장&middot;조합&middot;분석 될 수 있습니다.
						</p>
						<p>
							- 서비스 이용기록(IP Address, 쿠키, 방문 일시 등) 및 기기 정보(단말기식별번호, OS정보 등)등 이용내역정보:
							부정 이용 방지, 비인가 사용 방지, 신규 서비스 개발 및 맞춤서비스 제공 등
						</p>
						<p>
							라. 회사는 이용자의 개인정보를 수집할 경우 법령상 근거가 없는 한 반드시 이용자의 동의를 얻어 수집하며,
							이용자의 기본적 인권을 침해할 우려가 있는 인종, 출신지, 본적지, 사상, 정치적 성향, 범죄기록, 건강상태 등의
							정보는 이용자의 동의 또는 법령의 규정에 의한 경우 이외에는 수집하지 않습니다.
						</p>
						<p>
							마. 회사는 회원 가입을 만 14세 이상인 경우에 가능하도록 하며 개인정보의 수집&middot;이용에 법정대리인의
							동의가 필요한 만 14세 미만 아동의 개인정보는 원칙적으로 수집하지 않습니다. 단, 법정대리인의 동의를 얻은
							경우에는 만 14세 미만 이용자의 개인정보를 수집&middot;이용할 수 있습니다.
						</p>
						<p>바. 회사는 다음과 같은 방법으로 개인정보를 수집할 수 있습니다.</p>
						<p>1) 홈페이지, 모바일 어플리케이션, 모바일 웹페이지, 서면, 팩스, 전화, 고객센터 문의하기, 이벤트 응모</p>
						<p>2) 생성정보 수집 툴을 통한 자동 수집</p>
						<p>
							사. 회사는 개인정보를 수집함에 있어, 서비스 제공에 필요한 최소한의 개인정보를 &lsquo;필수동의
							항목&rsquo;으로, 그 외 개인정보는 &lsquo;선택동의 항목&rsquo;으로 구분하여 이에 대해 개별적으로 동의할 수
							있는 절차를 마련합니다. 회사는 이용자가 필요한 최소한의 개인정보 이외의 개인정보를 제공하지 아니한다는
							이유로 그 서비스의 제공을 거부하지 않습니다.
						</p>
						<p>&nbsp;</p>
						<p>&nbsp;</p>
						<p>2. 개인정보 제3자 제공</p>
						<p>&nbsp;</p>
						<p>
							가. 회사는 원칙적으로 이용자의 사전 동의를 받아 이용자들의 개인정보를 외부에 제공합니다. 다만, 아래의
							경우에는 예외로 합니다.
						</p>
						<p>
							1) 법령의 규정에 의거하거나, 수사, 조사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관 및 감독당국의
							요구가 있는 경우
						</p>
						<p>2) 요금 정산을 위하여 필요한 경우</p>
						<p>
							3) 이용자 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요함에도 불구하고 동의를 받을 수 없는
							경우
						</p>
						<p>
							나. 회사는 원칙적으로 「개인정보의 수집&middot;이용」에서 고지한 범위 내에서 개인정보를 이용하거나
							제3자에게 제공하며, 동 범위를 초과하여 이용하거나 제3자에게 제공하지 않습니다. 다만, 아래의 경우에는
							예외로 합니다.
						</p>
						<p>1) 이용자들이 사전에 공개 또는 제3자 제공에 동의한 경우</p>
						<p>
							2) 법령의 규정에 의거하거나, 수사, 조사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관 및 감독당국의
							요구가 있는 경우
						</p>
						<p>
							다. 그 밖에 개인정보 제3자 제공이 필요한 경우에는 이용자의 동의를 얻는 등 적법한 절차를 통하여 제3자에게
							개인정보를 제공할 수 있습니다. 회사는 이용자들의 거래 이행을 위하여 필요한 경우 이용자의 동의를 얻는 등
							적법한 절차를 통하여 아래와 같이 개인정보를 제공할 수 있습니다.
						</p>
						<p>&nbsp;</p>
						<table>
							<tbody>
								<tr>
									<td style={{ width: '12%' }}>
										<p>공유받는 자</p>
									</td>
									<td>
										<p>공유하는 항목</p>
									</td>
									<td>
										<p>공유받는 자의 이용목적</p>
									</td>
									<td style={{ width: '18%' }}>
										<p>보유 및 이용기간</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>판매자</p>
									</td>
									<td>
										<p>
											ID, 성명, 전화번호, 휴대폰번호, 배송지 주소, 이메일주소(선택시), 통관고유부호(선택시),
											생년월일(선택시)
										</p>
									</td>
									<td>
										<p>
											상품 및 경품(서비스) 배송(전송), 제품 설치, 반품, 환불, 고객상담 등 정보통신 서비스제공 계약 및
											전자상거래(통신판매)계약의 이행을 위해 필요한 업무의 처리
										</p>
									</td>
									<td>
										<p>구매 서비스 종료 후 1개월</p>
									</td>
								</tr>
							</tbody>
						</table>
						<p>&nbsp;</p>
						<p>※ 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 해당 보유 기간에 따라 보유할 수 있습니다.</p>
						<p>&nbsp;</p>
						<p>
							라. 이용자는 개인정보의 제3자 제공에 대하여 동의를 하지 않을 수 있고, 언제든지 제3자 제공 동의를 철회할 수
							있습니다. 동의를 거부하시는 경우에도 회원가입서비스는 이용하실 수 있으나, 제 3자 제공에 기반한 관련
							서비스의 이용/제공이 제한될 수 있습니다. 기타 개인정보 제3자 제공에 대한 변동사항은 공지 및 별도 통지를 할
							예정입니다.
						</p>
						<p>&nbsp;</p>
						<p>&nbsp;</p>
						<p>3. 개인정보의 처리위탁</p>
						<p>&nbsp;</p>
						<p>
							가. 회사는 원활하고 향상된 서비스를 제공하기 위해 개인정보 처리를 타인에게 위탁할 수 있습니다. 이 경우
							회사는 사전에 다음 각 호의 사항 모두를 이용자에게 미리 알리고 동의를 받습니다. 다음 각 호의 어느 하나의
							사항이 변경되는 경우에도 같습니다.
						</p>
						<p>1) 개인정보 처리위탁을 받는 자</p>
						<p>2) 개인정보 처리위탁을 하는 업무의 내용</p>
						<p>
							나. 회사는 정보통신서비스의 제공에 관한 계약을 이행하고 이용자 편의 증진 등을 위하여 필요한 경우
							개인정보처리방침에 따라 가항 각 호의 사항을 공개함으로써 고지절차와 동의절차를 거치지 아니하고 개인정보
							처리를 타인에게 위탁할 수 있습니다.
						</p>
						<p>
							다. 회사는 개인정보의 처리와 관련하여 아래와 같이 업무를 위탁하고 있으며, 관계법령에 따라 위탁 계약 시
							개인정보가 안전하게 관리될 수 있도록 필요한 조치를 하고 있습니다. 회사는 위탁 계약 시 수탁자의 개인정보
							보호조치 능력을 고려하고, 개인정보의 안전한 관리 및 파기 등 수탁자의 의무 이행 여부를 주기적으로
							확인합니다. 또한 위탁처리하는 정보는 원활한 서비스를 제공하기 위하여 필요한 최소한의 정보에 국한됩니다.
						</p>
						<p>1) 개인정보 국내처리 위탁현황</p>
						<table style={{ width: '100%' }}>
							<tbody>
								<tr>
									<td>
										<p>수탁업체</p>
									</td>
									<td>
										<p>위탁업무 내용</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>
											NICE
											<br />
											평가정보
										</p>
									</td>
									<td>
										<p>
											본인확인(실명인증, 실명/계좌인증, 휴대폰인증, 아이핀(I-PIN), 중복가입확인정보, 연계정보 확인,
											신용카드인증)
										</p>
										<p>결제처리(휴대폰, 계좌이체 등)</p>
									</td>
								</tr>
							</tbody>
						</table>
						<p>&nbsp;</p>
						<p>&nbsp;</p>
						<p>4. 이용자 개인정보의 보유 : 이용기간 및 파기</p>
						<p>&nbsp;</p>
						<p>
							회사는 이용자의 개인정보를 원칙적으로 고지 및 약정한 기간 동안 보유 및 이용하며 개인정보의 수집 및
							이용목적이 달성되거나 이용자의 파기 요청이 있는 경우 지체 없이 파기합니다. 단, 다음의 정보에 대해서는
							아래의 이유로 명시한 기간 동안 보존합니다.
						</p>
						<p>&nbsp;</p>
						<p>가. 관계법령 및 회사 방침에 의한 정보보유 사유</p>
						<p>
							상법 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 법령에서 규정한 바에 따라 이용자의 개인정보를
							보관하며 마케팅 등 다른 목적으로 이용하지 않습니다.
						</p>
						<p>1) 관계법령에 따른 정보보유 사유</p>
						<p>&nbsp;</p>
						<table style={{ width: '100%' }}>
							<tbody>
								<tr>
									<td>
										<p>관계 법령</p>
									</td>
									<td>
										<p>목적</p>
									</td>
									<td>
										<p>수집항목</p>
									</td>
									<td>
										<p>보유기간</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>통신비밀보호법</p>
									</td>
									<td>
										<p>법원의 영장을 받아 수사기관이 요청시 제공</p>
									</td>
									<td>
										<p>로그기록, IP 등</p>
									</td>
									<td>
										<p>3개월</p>
									</td>
								</tr>
								<tr>
									<td rowSpan={3}>
										<p>
											전자상거래등에서의
											<br /> 소비자보호에 관한 법률
										</p>
									</td>
									<td>
										<p>소비자의 불만 또는 분쟁처리에 관한 기록</p>
									</td>
									<td>
										<p>
											소비자 식별정보,
											<br /> 분쟁처리 기록 등
										</p>
									</td>
									<td>
										<p>3년</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>대금결제 및 재화 등의 공급에 관한 기록</p>
									</td>
									<td rowSpan={2}>
										<p>
											소비자 식별정보,
											<br /> 계약/청약철회 기록 등
										</p>
									</td>
									<td rowSpan={2}>
										<p>5년</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>계약 또는 청약철회 등에 관한 기록</p>
									</td>
								</tr>
								<tr>
									<td rowSpan={2}>
										<p>국세기본법</p>
									</td>
									<td>
										<p>국세 부과 제척기간 계산</p>
									</td>
									<td>
										<p>국세 증빙자료&nbsp; 등</p>
									</td>
									<td>
										<p>10년</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>국세징수권 등 소멸시효 계산</p>
									</td>
									<td>
										<p>과세표준과 세액의 신고자료&nbsp; 등</p>
									</td>
									<td>
										<p>5년</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>부가가치세법</p>
									</td>
									<td>
										<p>장부, 세금계산서, 수입세금계산서, 영수증 등</p>
									</td>
									<td>
										<p>부가가치세의 과세표준과 세액의 신고자료 등</p>
									</td>
									<td>
										<p>5년</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>전자금융거래법</p>
									</td>
									<td>
										<p>전자금융거래기록 확인</p>
									</td>
									<td>
										<p>전자금융거래에 관한 기록, 상대방에 관한 정보 등</p>
									</td>
									<td>
										<p>5년</p>
									</td>
								</tr>
							</tbody>
						</table>
						<p>&nbsp;</p>
						<p>2) 회사 방침에 의한 정보보유 사유</p>
						<p>부정거래기록</p>
						<p>보존 이유: 부정거래의 배제</p>
						<p>보존 기간: 1년</p>
						<p>보존 항목: 이름, ID, CI/DI, 휴대폰번호, 이메일주소, 생년월일</p>
						<p>
							*부정거래 : 법령, 회사와 이용자 간의 서비스 이용 약관 또는 공서양속을 위반하거나 기타 회사, 회원 또는
							타인의 권리나 이익을 침해하는 방법이나 내용의 거래를 말함.
						</p>
						<p>&nbsp;</p>
						<p>
							나. 수집된 개인정보의 보유&middot;이용기간은 서비스이용계약체결(회원가입)시부터
							서비스이용계약해지(탈퇴신청, 직권탈퇴 포함)입니다. 또한 동의 해지 시 회사는 이용자의 개인정보를 상기
							명시한 정보보유 사유에 따라 일정 기간 저장하는 자료를 제외하고는 지체 없이 파기하며 개인정보처리가
							제3자에게 위탁된 경우에는 수탁자에게도 파기하도록 지시합니다.
						</p>
						<p>
							다. 2020년 09월 21일부터, 회사는 1년 동안 회사의 서비스를 이용하지 않은 이용자의 개인정보는
							&lsquo;정보통신망 이용촉진 및 정보보호등에 관한 법률 제29조&rsquo; 에 근거하여 이용자에게 사전통지하고
							개인정보를 파기하거나 별도로 분리하여 저장 합니다. 단, 통신비밀보호법, 전자상거래 등에서의 소비자보호에
							관한 법률 등의 관계법령의 규정에 의하여 보존할 필요가 있는 경우 관계법령에서 규정한 일정한 기간 동안
							이용자 개인정보를 보관합니다.
						</p>
						<p>
							라. 회사는 다항 기간 만료 30일 전까지 개인정보가 파기되거나 분리되어 저장&middot;관리되는 사실과 기간 만일
							및 해당 개인정보의 항목을 공지사항, 전자우편 등의 방법으로 이용자에게 알립니다. 이를 위해 이용자는 회사에
							정확한 연락처 정보를 제공/수정하여야 합니다.
						</p>
						<p>마. 파기방법</p>
						<p>
							이용자의 개인정보는 수집 및 이용목적이 달성된 후에는 지체 없이 파기됩니다. 종이에 출력된 개인정보는
							분쇄기로 분쇄하거나 소각 등을 통하여 파기하고, 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는
							기술적 방법 또는 물리적 방법을 사용하여 파기합니다.
						</p>
						<p>&nbsp;</p>
						<p>&nbsp;</p>
						<p>5. 스마트폰 앱 관리</p>
						<p>&nbsp;</p>
						<p>
							스마트폰 앱을 통해 서비스 이용 시, 이용자에게 개인정보 수집&middot;이용 동의를 받은 범위 내에서 단말기정보
							등에 접근한다는 것을 고지하고 승인을 획득한 후 정보가 수집되거나 전송됩니다. 앱 상에서 이용자가 단말기
							접근 권한을 허용하였다고 하여 허용권한과 관련된 모든 정보가 즉시 수집되거나 전송되는 것은 아닙니다. 서비스
							제공을 위하여 스마트폰 앱의 접근 권한을 필수 또는 선택적으로 이용자에게 요청하고 있으며, 단말기 내
							&quot;설정&quot; 메뉴를 통하여 이용자가 직접 권한을 변경할 수 있습니다. 앱 권한에 대한 자세한 사항은
							애플리케이션 스토어를 통해 확인하실 수 있습니다.
						</p>
						<p>&nbsp;</p>
						<p>
							스마트폰 상에서 앱을 삭제하더라도 이용자의 회원계정은 유지되므로, 회원탈퇴를 원하실 경우 베리스토어 PC
							웹페이지 상에서 &ldquo;회원탈퇴&rdquo; 기능을 이용하시거나 FAX(02-541-0416)로 연락하여 주시기 바랍니다.
						</p>
						<p>&nbsp;</p>
						<p>&nbsp;</p>
						<p>6. 쿠키(Cookie)의 운용 및 거부</p>
						<p>가. 쿠키의 사용 목적</p>
						<p>
							1) 회사는 회사가 운영하는 인터넷 사이트에서 개인 맞춤 서비스를 제공하기 위해 이용 정보를 저장하는
							&lsquo;쿠키(cookie)&rsquo;를 사용합니다. 쿠키는 웹사이트 서버가 이용자의 브라우저에게 전송하는 소량의
							정보로서 이용자 컴퓨터의 하드디스크에 저장됩니다.
						</p>
						<p>2) 회사는 쿠키의 사용을 통해서만 가능한 특정된 맞춤형 서비스를 제공할 수 있습니다.</p>
						<p>3) 회사는 회원을 식별하고 회원의 로그인 상태를 유지하기 위해 쿠키를 사용할 수 있습니다.</p>
						<p>나. 쿠키의 설치/운용 및 거부</p>
						<p>
							1) 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 이용자는 웹브라우저에서 옵션을 조정함으로써
							모든 쿠키를 허용/거부하거나, 쿠키가 저장될 때마다 확인을 거치도록 할 수 있습니다.
						</p>
						<p>- 쿠키 설치 허용 여부를 지정하는 방법(Internet Explorer의 경우)은 다음과 같습니다.</p>
						<p>o[도구] 메뉴에서 [인터넷 옵션]을 선택합니다.</p>
						<p>o[개인정보 탭]을 클릭합니다.</p>
						<p>o[개인정보처리 수준]을 설정하시면 됩니다.</p>
						<p>
							2) 쿠키의 저장을 거부할 경우에는 개인 맞춤서비스 등 회사가 제공하는 일부 서비스는 이용이 어려울 수
							있습니다.
						</p>
						<p>&nbsp;</p>
						<p>&nbsp;</p>
						<p>7. 이용자 및 법정대리인의 권리</p>
						<p>&nbsp;</p>
						<p>
							가. 이용자 및 법정 대리인은 언제든지 베리스토어의 &ldquo;정보수정&rdquo;을 통하여 회원님의 개인정보를
							열람, 정정 처리하실 수 있으며, 전자우편 또는 서면으로 요청하신경우 열람, 정정, 삭제 처리해드리겠습니다.
							이용자의 개인정보가 제3자에게 제공되거나 처리위탁된 경우 이용자는 회사 또는
							&lsquo;제3자&rsquo;/&rsquo;수탁자&rsquo;에게 파기를 요청할 수 있습니다. 단, 회원 아이디(ID), 성명,
							주민등록번호, 외국인등록번호는 정정이 불가능하며, 개명으로 인한 성명 변경 및 행정상의 문제로 인한
							주민(사업자)등록번호 변경은 예외적으로 허용 될 수 있습니다. 기타 법률에 따라 정정 또는 삭제가 금지되거나
							제한되어 있는 경우에는 해당 처리가 제한될 수 있습니다. 또한 개인정보 오류에 대한 정정요청한 경우에는 다른
							법률에 따라 개인정보의 제공을 요청받는 경우가 아닌 한 정정을 완료하기 전까지 해당 개인정보를 이용 또는
							제공하지 않습니다. 만약 잘못된 개인정보를 이미 제공한 경우에는 정정 처리 결과를 제 3자에게 통지하여 정정이
							이루어지도록 하겠습니다.
						</p>
						<p>
							나. 이용자 및 법정 대리인은 언제든지 베리스토어의 개인정보에 대하여 처리의 정지를 요구할 수 있습니다. 다만
							아래의 경우에 해당하는 경우 처리정지 요구를 거절할 수 있습니다.
						</p>
						<p>1) 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우</p>
						<p>
							2) 다른 사람의 생명&middot;신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할
							우려가 있는 경우
						</p>
						<p>
							3) 개인정보를 처리하지 아니하면 정보주체와 약정한 서비스를 제공하지 못하는 등 계약의 이행이 곤란한
							경우로서 정보주체가 그 계약의 해지 의사를 명확하게 밝히지 아니한 경우
						</p>
						<p>
							다. 회원가입 등을 통해 개인정보의 수집&middot;이용&middot;제공에 대해 회원님께서 동의하신 내용을 언제든지
							철회할 수 있습니다. 동의철회는 회사 사이트 내 &ldquo;회원 탈퇴 신청&rdquo;을 클릭하거나 서면, 이메일
							등으로 연락하시면 지체 없이 개인정보의 삭제 등 필요한 조치를 하겠습니다. 다만 법률 또는 약관의 규정에 따라
							회사가 회원님의 개인정보를 보존하여야 하는 경우에는 해당 처리가 제한될 수 있습니다. 이 경우 회원님은 본인
							식별을 위하여 반드시 회원아이디(ID)와 본인확인 식별정보를 밝히셔야 하며, 철회로 인해 서비스에 다소 제약이
							있거나 일부 서비스를 이용하지 못하실 수 있습니다.
						</p>
						<p>&nbsp;</p>
						<p>&nbsp;</p>
						<p>8. 이용자의 의무</p>
						<p>&nbsp;</p>
						<p>
							이용자는 자신의 개인정보를 보호할 의무가 있으며, 회사의 귀책사유가 없이 ID, 비밀번호, 접근매체 등의
							양도&middot;대여&middot;분실이나 로그인 상태에서 이석 등 이용자 본인의 부주의나 관계법령에 의한 보안조치로
							차단할 수 없는 방법이나 기술을 사용한 해킹 등 회사가 상당한 주의에도 불구하고 통제할 수 없는 인터넷상의
							문제 등으로 개인정보가 유출되어 발생한 문제에 대해 회사는 책임을 지지 않습니다.
						</p>
						<p>&nbsp;</p>
						<p>
							가. 이용자는 자신의 개인정보를 최신의 상태로 유지해야 하며, 이용자의 부정확한 정보 입력으로 발생하는
							문제의 책임은 이용자 자신에게 있습니다.
						</p>
						<p>
							나. 타인의 개인정보를 도용한 회원가입 또는 ID 등을 도용하여 결제 처리시 이용자자격 상실과 함께 관계법령에
							의거하여 처벌될 수 있습니다.
						</p>
						<p>
							다. 이용자는 ID, 비밀번호 등에 대해 보안을 유지할 책임이 있으며 제3자에게 이를 양도하거나 대여할 수
							없습니다. 이용자는 회사의 개인정보보호정책에 따라 보안을 위해 비밀번호의 주기적 변경에 협조할 의무가
							있습니다.
						</p>
						<p>
							라. 이용자는 회사의 서비스를 이용한 후에는 반드시 로그인 계정을 종료하고 웹 브라우저 프로그램을 종료해야
							합니다.
						</p>
						<p>
							마. 이용자는 &quot;정보 통신망 이용촉진 및 정보보호 등에 관한 법률&quot;, &ldquo;개인정보보호법&rdquo;,
							&quot;주민등록법&quot; 등 기타 개인정보에 관한 법률을 준수하여야 합니다.
						</p>
						<p>&nbsp;</p>
						<p>&nbsp;</p>
						<p>9. 링크 사이트에 대한 책임</p>
						<p>&nbsp;</p>
						<p>
							회사는 이용자에게 다른 웹사이트에 대한 링크를 제공할 수 있습니다. 다만, 링크되어 있는 웹사이트들이
							개인정보를 수집하는 행위에 대해서는 본 &quot;개인정보처리방침&quot;이 적용되지 않습니다.
						</p>
						<p>&nbsp;</p>
						<p>&nbsp;</p>
						<p>10. 개인정보의 기술적／관리적 보호 대책</p>
						<p>&nbsp;</p>
						<p>
							회사는 이용자들의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 안전성
							확보를 위하여 다음과 같은 기술적/관리적 보호대책을 강구하고 있습니다.
						</p>
						<p>&nbsp;</p>
						<p>가. 개인정보의 암호화</p>
						<p>
							이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고 있으며, 개인정보의 확인 및 변경은 비밀번호를 알고
							있는 본인에 의해서만 가능합니다. 비밀번호는 이용자의 생일, 전화번호 등 타인이 추측하기 쉬운 숫자 등을
							이용하지 않도록 비밀번호 생성규칙을 수립하여 적용하고 있습니다. 주민등록번호, 외국인 등록번호,
							은행계좌번호 및 신용카드번호 등의 개인정보는 안전한 암호 알고리즘으로 암호화되어 저장 및 관리되고
							있습니다.
						</p>
						<p>나. 해킹 등에 대비한 대책</p>
						<p>
							회사는 해킹 등 회사 정보통신망 침입에 의해 이용자의 개인정보가 유출되는 것을 방지하기 위해 협력사인
							(주)람다256을 통하여 침입탐지 및 침입차단 시스템을 24시간 가동하고 있습니다. 만일의 사태에 대비하여 모든
							침입탐지 시스템과 침입차단 시스템은 이중화로 구성하여 운영하고 있으며, 민감한 개인정보는 암호화 통신 등을
							통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다.
						</p>
						<p>다. 개인정보 취급자의 최소화 및 교육</p>
						<p>
							회사는 회사의 개인정보 취급자를 최소한으로 제한하며, 개인정보 취급자에 대한 교육 등 관리적 조치를 통해
							개인정보보호의 중요성을 인식시키고 있습니다.
						</p>
						<p>라. 개인정보보호 전담부서의 운영</p>
						<p>
							회사는 개인정보의 효율적 보호를 위해 개인정보보호전담부서를 운영하고 있으며, 개인정보처리방침의 이행사항
							및 개인정보 취급자의 준수여부를 확인하여 문제가 발견될 경우 즉시 수정할 수 있도록 노력하고 있습니다.
						</p>
						<p>&nbsp;</p>
						<p>&nbsp;</p>
						<p>11. 개인정보 보호책임자</p>
						<p>&nbsp;</p>
						<p>
							회사는 이용자가 회사의 서비스를 안전하게 이용할 수 있도록 최선을 다하고 있습니다. 이용자는 회사의 서비스
							이용과 관련한 모든 개인정보보호 민원을 전담부서로 신고하실 수 있으며, 회사는 이용자의 신고사항에 대해
							신속하고 성실하게 답변해드리고 있습니다.
						</p>
						<p>&nbsp;</p>
						<p>[개인정보 보호책임자]</p>
						<p>성명 : 안 요 한</p>
						<p>소속부서 : 전략기획본부</p>
						<p>전자우편 : cs@fandomberry.com</p>
						{/* <p>전화번호 : 02-541-0415</p>
						<p>FAX : 02-541-0416</p> */}
						<p>※ 상기 연락처 등은 &ldquo;개인정보보호 전담 고객센터&rdquo;로 연결됩니다.</p>
						<p>기타 개인정보침해에 대한 신고 또는 상담이 필요하신 경우에는 아래 기관으로 문의하시기 바랍니다.</p>
						<p>&nbsp;</p>
						<p>- 개인정보분쟁조정위원회/www.kopico.go.kr/1833-6972</p>
						<p>- 개인정보침해신고센터/privacy.kisa.or.kr/(국번없이) 118</p>
						<p>- 대검찰청 첨단범죄수사센터/www.spo.go.kr/(국번없이) 1301</p>
						<p>- 경찰청 사이버안전국/cyberbureau.police.go.kr(국번없이) 182</p>
						<p>&nbsp;</p>
						<p>&nbsp;</p>
						<p>12. 고지의 의무</p>
						<p>&nbsp;</p>
						<p>
							본 개인정보처리방침은 관계법령 및 지침의 변경 또는 회사의 필요 등에 의하여 내용의 추가, 삭제 및 수정이
							생길 수 있습니다. 이 경우 최소 7일 전에 홈페이지 또는 이메일을 통해 사전 공지하고 사전 공지가 곤란한 경우
							지체 없이 공지하며, 별도 공지가 없는 한 7일이 경과된 후에 시행됩니다. 다만, 중대한 내용이 변경되는
							경우에는 최소 30일 전에 공지하고, 별도 공지가 없는 한 30일이 경과된 후에 시행됩니다. 또한 당사는
							관계법령에 따라 필요한 경우 고객의 별도 동의를 받을 수 있습니다.
						</p>
						<p>&nbsp;</p>
						<p>공고일자 : 2020년 09월 21일</p>
						<p>시행일자 : 2020년 09월 21일</p>
						<div id="hwpEditorBoardContent">&nbsp;</div>
					</div>
				</PolicyContent>
			</PolicyContainer>
		</PolicyWrap>
	);
};

const PolicyWrap = styled.div`
	height: auto;
	width: 1280px;
	margin: 0px auto 100px auto;
	max-width: 100%;

	@media screen and (max-width: 1310px) {
		width: calc(100% - 30px);
	}
`;

const PolicyContainer = styled.div`
	margin-top: 70px;

	& > h1 {
		font-size: 24px;
		font-weight: 500;
		border-bottom: 2px solid;
		height: 60px;
	}

	@media screen and (max-width: 414px) {
		& > h1 {
			text-align: center;
		}
	}
`;

const PolicyContent = styled.div`
	& > iframe {
		border: none;
		height: 1050vh;
	}
	& > div {
		& > div {
			& > p {
				font-size: 18px;
			}
		}
		& > p {
			font-size: 12px;
		}
		& > table {
			font-size: 12px;
			border: 1px solid;
			& > tbody {
				& > tr {
					& > td {
						border: 1px solid;
						& > p {
							margin: 10px 0;
						}
					}
				}
			}
		}
	}
`;
export default PolicyComponent;