import Image from "next/image";
import Link from "next/link";
import { VscBookmark, VscComment } from "react-icons/vsc";

export default function Post(props) {
	const { post } = props;
	const { fields, metadata } = post;
	const { author, image, slug, title, date, excerpt } = fields;
	return (
		<div className=" py-6 border-y border-gray-200 border-b-0">
			<div className="flex items-center gap-3">
				<Image
					src={'https:' + author.fields.avatar.fields.file.url}
					alt={author.fields.name}
					className="rounded-full"
					width={32}
					height={32}
				/>
				<div className="text-gray-700 text-sm">{author.fields.name}</div>
				<div className="text-gray-400 text-sm">{date}</div>
			</div>
			<Link href={slug}>
				<a>
					<div className="py-6">
						<div className="aspect-w-16 aspect-h-9 block md:hidden mb-5">
							<Image
								className="rounded-xl"
								src={'https:' + image.fields.file.url}
								alt={title}
								layout="fill"
								objectFit="cover"
							/>
						</div>
						<div className="flex justify-between">
							<div className="flex-1">
								<h1 className="text-2xl font-medium ellipsis ellipsis-2 mb-3">
									{title}
								</h1>
								<p className="text-gray-500 ellipsis ellipsis-3">
									{excerpt}
								</p>
							</div>
							<div className="pl-3 hidden md:block">
								<Image
									className="rounded-xl object-cover"
									src={'https:' + image.fields.file.url}
									alt={title}
									width={140}
									height={140}
								/>
							</div>
						</div>
					</div>
				</a>
			</Link>
			<div className="flex items-center jusfity-between gap-6 text-sm">
				<div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-none">
					{metadata.tags.map((tag, index) => (
						<Link href={'tag/' + tag.sys.id} key={index}>
							<a className="tag">{tag.sys.id}</a>
						</Link>
					))}
				</div>
				<div className="flex items-center gap-6">
					<div className="cursor-pointer flex text-gray-500 hover:text-black items-center gap-1">
						<VscBookmark className="w-6 h-6 " />
						<div className="text-xs">Simpan artikel</div>
					</div>
					<Link href="post/slug#comments">
						<a className="cursor-pointer flex items-center gap-1 text-gray-500 hover:text-black">
							<VscComment className="w-6 h-6" />
							<div className="text-xs">Komentar</div>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
