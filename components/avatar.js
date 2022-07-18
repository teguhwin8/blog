import Link from "next/link";
import { VscAccount } from "react-icons/vsc";

export default function Avatar() {
	return (
		<div className="w-full text-center">
			<Link href="/auth/login">
				<a className="py-6 w-100 text-gray-500 hover:text-gray-900 transition-all duration-150">
					<VscAccount className="w-6 h-6 mx-auto" />
				</a>
			</Link>
		</div>
	);
}
