import db from "../../../libs/db";
var slugify = require("slugify");
import moment from "moment";
import excerptHtml from "excerpt-html";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ message: `Method ${req.method} are not allowed` });
	}

	let { title, slug, content } = req.body;

	if (!title || !content || title == "" || content == "") {
		return res.status(400).json({ message: "Judul dan konten wajib diisi" });
	}

	if (title.length <= 15) {
		return res
			.status(400)
			.json({ message: "Judul harus lebih dari 15 karakter." });
	}

	if (content.length <= 100) {
		return res
			.status(400)
			.json({ message: "Konten harus lebih dari 100 karakter" });
	}

	slug = slugify(slug ? slug : title, { lower: true, strict: true });

	const posts = await db("posts")
		.whereLike("slug", "%" + slug + "%")
		.orderBy("id", "desc");

	if (posts && posts.length > 0) {
		slug += "-" + parseInt(posts.length);
	}

	try {
		const postId = await db("posts").insert({
			title: title,
			slug: slug,
			content,
		});

		let post = await db("posts").where({ id: postId }).first();

		if (post) {
			post.excerpt = excerptHtml(post.content);
			post.created_at_from_now = moment(post.created_at).fromNow();
			post.updated_at_from_now = moment(post.updated_at).fromNow();
			post.created_at = moment(post.created_at).format("DD MMMM YYYY HH:mm");
			post.updated_at = moment(post.updated_at).format("DD MMMM YYYY HH:mm");
		}

		return res.status(201).json({
			message: "Success",
			data: post,
		});
	} catch (error) {
		return res
			.status(400)
			.json({ message: error.sqlMessage ?? "Server error" });
	}
}
