import db from "../../../libs/db";
var slugify = require("slugify");

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.status(405).json({ message: `Method ${req.method} are not allowed` }).end();
	}

	let { title, slug, content } = req.body;

	if (!title || !content || title == "" || content == "") {
		res.status(400).json({ message: "Title and content are required" }).end();
	}

	if (title.length <= 15) {
		res
			.status(400)
			.json({ message: "Judul harus lebih dari 15 karakter." })
			.end();
	}

	if (content.length <= 100) {
		res
			.status(400)
			.json({ message: "Konten harus lebih dari 100 karakter" })
			.end();
	}

	slug = slugify(slug ? slug : title, { lower: true, strict: true });

	const posts = await db("posts")
		.whereLike("slug", "%" + slug + "%")
		.orderBy("id", "desc");

	if (posts && posts.length > 0) {
		slug += "-" + parseInt(posts.length);
	}

	try {
		await db("posts").insert({
			title,
			slug,
			content,
		});
	} catch (error) {
		res
			.status(400)
			.json({ message: error.sqlMessage ?? "Server error" })
			.end();
	}

	res.status(201).json({
		message: "Berhasil menyimpan artikel",
	});
}
