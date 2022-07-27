import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<NextNProgress color="#da1e25" />
			<Component {...pageProps} />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				className="text-sm"
			/>
		</>
	);
}

export default MyApp;
