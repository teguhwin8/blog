import Head from "next/head";
import Avatar from "./avatar";
import Logo from "./logo";
import Menu from "./menu";
import Sidebar from "./sidebar";

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<title>Blog</title>
			</Head>
			<div className="max-w-screen-2xl bg-white mx-auto min-h-screen flex">
				<div className="w-[79px] h-screen">
					<div className="flex w-[79px] py-8 h-screen flex-col justify-between items-center fixed bg-white overflow-y-auto custom-scrollbar">
						<Logo />
						<Menu />
						<Avatar />
					</div>
				</div>
				<div className="h-screen bg-white flex-1 custom-scrollbar overflow-y-auto border-x border-gray-200 ">
					<main className="max-w-2xl mx-auto">{children}</main>
				</div>
				<div className="h-screen bg-white w-[394px] custom-scrollbar overflow-y-auto">
					<div className=" w-[394px] p-8">
						<Sidebar />
					</div>
				</div>
			</div>
		</>
	);
}
