import db from "../../../../libs/db";
import moment from "moment";

export default async function handler(req, res) {
	if (req.method !== "PUT") {
		return res
			.status(405)
			.json({ message: `Method ${req.method} are not allowed` });
	}

	const { id } = req.query;
	const { title, content } = req.body;

	if (!id) {
		return res.status(404).json({ message: "Post not found" });
	}

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

	try {
		const post = await db("posts").where({ id }).update({ title, content, updated_at: new Date() });
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
	} catch (error) {
		return res
			.status(400)
			.json({ message: error.sqlMessage ?? "Server error" });
	}

    const postUpdated = await db("posts").where({ id }).first();
    moment.locale("id");
	postUpdated.created_at_from_now = moment(postUpdated.created_at).fromNow();
	postUpdated.updated_at_from_now = moment(postUpdated.updated_at).fromNow();
	postUpdated.created_at = moment(postUpdated.created_at).format("DD MMMM YYYY HH:mm");
	postUpdated.updated_at = moment(postUpdated.updated_at).format("DD MMMM YYYY HH:mm");

	return res.status(200).json({
		message: "Post successfully updated",
        data: postUpdated
	});
}
