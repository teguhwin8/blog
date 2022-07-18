import Layout from "../components/layout";
import Post from "../components/Post";

export default function Home() {
	return (
		<Layout>
			<div className="py-8">
				<Post />
				<Post />
				<Post />
			</div>
		</Layout>
	);
}
