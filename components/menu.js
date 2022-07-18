import Link from "next/link";
import { VscBell, VscBookmark, VscHome, VscNewFile } from "react-icons/vsc";

export default function Menu() {
	return (
		<>
			<div className="w-full text-center flex flex-col">
				<Link href="/">
					<a className="py-6 w-100 text-gray-500 hover:text-gray-900 transition-all duration-150">
						<VscHome className="w-6 h-6 mx-auto" />
					</a>
				</Link>
				<Link href="/notification">
					<a className="py-6 w-100 text-gray-500 hover:text-gray-900 transition-all duration-150">
						<VscBell className="w-6 h-6 mx-auto" />
					</a>
				</Link>
				<Link href="/lists">
					<a className="py-6 w-100 text-gray-500 hover:text-gray-900 transition-all duration-150">
						<VscBookmark className="w-6 h-6 mx-auto" />
					</a>
				</Link>
                <hr className="my-6" />
                <Link href="/write">
					<a className="py-6 w-100 text-gray-500 hover:text-gray-900 transition-all duration-150">
						<VscNewFile className="w-6 h-6 mx-auto" />
					</a>
				</Link>
			</div>
		</>
	);
}
