import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<NextNProgress color="#da1e25" />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
