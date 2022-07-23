import db from "../../../libs/db";
var slugify = require("slugify");

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
		await db("posts").insert({
			title: title + "-" + i,
			slug: slug + "-" + i,
			content,
		});
	} catch (error) {
		return res
			.status(400)
			.json({ message: error.sqlMessage ?? "Server error" });
	}

	return res.status(201).json({
		message: "Berhasil menyimpan artikel",
	});
}
