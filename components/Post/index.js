import Image from "next/image";
import Link from "next/link";
import { VscBookmark, VscComment } from "react-icons/vsc";

export default function Post() {
	return (
		<div className=" py-6 border-y border-gray-200 border-b-0">
			<div className="flex items-center gap-3">
				<Image
					src="/writer.jpg"
					alt="writer"
					className="rounded-full"
					width={32}
					height={32}
				/>
				<div className="text-gray-700 text-sm">Teguh Widodo</div>
				<div className="text-gray-400 text-sm">1 hour ago</div>
			</div>
			<Link href="/post/slug">
				<a>
					<div className="py-6 flex items-center justify-between">
						<div className="flex-1">
							<h1 className="text-2xl font-medium ellipsis ellipsis-2 mb-3">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
								possimus neque quod, reiciendis corporis sed officia illo dolore
								dolores, facilis numquam harum mollitia amet et sequi
								voluptates! Iste, ad ea.
							</h1>
							<p className="text-gray-500 ellipsis ellipsis-3">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
								qui dolor voluptate temporibus rem cumque vitae hic, similique
								et maiores sit fuga assumenda praesentium aliquam repellendus
								quas dolorem ea itaque. Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Quia possimus ipsam modi voluptatibus
								distinctio vero non sit officiis tenetur fuga reprehenderit
								velit ut illum facere, adipisci beatae obcaecati praesentium et?
							</p>
						</div>
						<div className="pl-3">
							<Image
								className="rounded-xl object-cover"
								src="/writer.jpg"
								alt="post image"
								width={140}
								height={140}
							/>
						</div>
					</div>
				</a>
			</Link>
			<div className="flex items-center jusfity-between gap-6 text-sm">
				<div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-none">
					<Link href="/tag/slug">
						<a className="tag">React</a>
					</Link>
				</div>
				<div className="flex items-center gap-6">
					<div className="cursor-pointer flex text-gray-500 hover:text-black items-center gap-1">
						<VscBookmark className="w-6 h-6 " />
						<div className="text-xs">Simpan artikel</div>
					</div>
					<Link href="post/slug#comments">
						<a className="cursor-pointer flex items-center gap-1 text-gray-500 hover:text-black">
							<VscComment className="w-6 h-6" />
							<div className="text-xs">40 komentar</div>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
