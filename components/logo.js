import Image from "next/image";
import Link from "next/link";

export default function Logo() {
	return (
		<div className="w-full text-center">
			<Link href="/">
				<a>
					<Image src="/logo.png" width={50} height={26} alt="Logo Halo Blog" />
				</a>
			</Link>
		</div>
	);
}
