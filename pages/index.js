import Layout from "../components/layout";
import Post from "../components/Post";
import * as contentful from "contentful";

export default function Home(props) {
	const { posts } = props;
	return (
		<Layout>
			<div className="py-8">
				{posts.map((post, index) => (
					<Post post={post} key={index} />
				))}
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const client = contentful.createClient({
		space: process.env.SPACE_ID,
		accessToken: process.env.ACCESS_TOKEN,
	});

	const entries = await client.getEntries({
		content_type: "blogPost",
	});

	const posts = entries.items;

	return {
		props: {
			posts,
		},
	};
}
