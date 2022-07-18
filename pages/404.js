import Layout from "../components/layout";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

export default function Home() {
	return (
		<Layout>
			<div className="flex items-center justify-center h-screen py-8">
				<div>
					<Player autoplay loop src="/404.json" />
					<div className="text-center text-gray-700">
						<p className="text-xl mb-10">
							Oops, halaman yang kamu cari gak ditemukan.
						</p>
						<Link href="/">
							<a className="py-3 px-5 bg-red-600 text-white font-bold">Kembali ke Home</a>
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
}
