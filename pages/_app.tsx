import { AppProps } from 'next/app';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { wrapper } from '../store';
import GlobalStyle from '../styles/GlobalStyle';

const app = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<GlobalStyle />
			<Header />
			<Dashboard />
			<Component {...pageProps} />
		</>
	);
};

export default wrapper.withRedux(app);
