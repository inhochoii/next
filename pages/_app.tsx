import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';
import RootStore from '../stores';
import { configure } from 'mobx';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
	height:100%;
	margin:0;
	padding:0;
	width:100%;
	background-color: #FEFEFE;
	color:#333333;
	font-family: 'Noto Sans KR', sans-serif;
	font-weight:300;
  }
`;

const theme = {
	colors: {
		primary: '#0070f3',
	},
};

interface Props {
	Component: any;
	pageProps: any;
}

configure({
	useProxies: 'never',
	enforceActions: 'never',
});

const stores = new RootStore();

class App extends React.Component<Props> {
	componentDidMount() {
		globalThis.Kakao.init('30f25b099777f36e8e15743f8543067d');
	}
	render() {
		const { Component, pageProps } = this.props;
		return (
			<Provider {...stores}>
				<Head>
					<title>BERRY STORE</title>
					<link rel="icon" href="/favicon.ico" />
					<script src="https://smtpjs.com/v3/smtp.js"></script>
					<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
					<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
					<link
						href={`https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap`}
						rel="stylesheet"
					></link>
				</Head>
				<GlobalStyle />
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</Provider>
		);
	}
}

export default App;
