import Head from "next/head";
import Avatar from "./avatar";
import Logo from "./logo";
import Menu from "./menu";

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<title>Blog</title>
			</Head>
			<div className="max-w-screen-2xl bg-white mx-auto min-h-screen flex">
				<div className="w-[79px] h-screen">
					<div className="flex w-[79px] py-8 h-screen flex-col justify-between items-center fixed bg-white">
						<Logo />
						<Menu />
						<Avatar />
					</div>
				</div>
				<div className="flex-1 px-8 border-x border-gray-200 ">
					<main className="max-w-2xl mx-auto">{children}</main>
				</div>
				<div className="bg-white w-[394px] p-8">
					<div className="fixed">Right Sidebar</div>
				</div>
			</div>
		</>
	);
}
