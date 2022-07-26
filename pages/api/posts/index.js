import db from "../../../libs/db";
import excerptHtml from "excerpt-html";
import moment from "moment";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res
			.status(405)
			.json({ message: `Method ${req.method} are not allowed` });
	}

	let currentPage = 1;
	let perPage = 10;
	let dataOffset = 0;

	const { page, per_page } = req.query;

	if (page && typeof parseInt(page) === "number" && parseInt(page) > 0) {
		currentPage = parseInt(page);
	}

	if (
		per_page &&
		typeof parseInt(per_page) === "number" &&
		parseInt(per_page) > 0
	) {
		perPage = parseInt(per_page);
	}

	dataOffset = (currentPage - 1) * perPage;

	const posts = await db("posts")
		.offset(dataOffset)
		.limit(perPage)
		.orderBy("id", "desc");

	moment.locale("id");
	posts.map((post) => {
		post.excerpt = excerptHtml(post.content);
		post.created_at_from_now = moment(post.created_at).fromNow();
		post.updated_at_from_now = moment(post.updated_at).fromNow();
		post.created_at = moment(post.created_at).format("DD MMMM YYYY HH:mm");
		post.updated_at = moment(post.updated_at).format("DD MMMM YYYY HH:mm");
	});

	return res.status(200).json({
		message: "Success",
		count: posts.length,
		page: parseInt(currentPage),
		perPage: parseInt(perPage),
		data: posts,
	});
}
