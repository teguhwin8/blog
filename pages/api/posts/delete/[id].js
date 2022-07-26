import db from "../../../../libs/db";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res) {
	if (req.method !== "DELETE") {
		return res
			.status(405)
			.json({ message: `Method ${req.method} are not allowed` });
	}

	const auth = await authorization(req, res);

	const { id } = req.query;

	if (!id) {
		return res.status(404).json({ message: "Artikel tidak ditemukan" });
	}

	try {
		const post = await db("posts").where({ id }).del();
		if (!post) {
			return res.status(404).json({ message: "Artikel tidak ditemukan" });
		}
		return res.status(200).json({
			message: "Artikel berhasil dihapus",
		});
	} catch (error) {
		return res
			.status(400)
			.json({ message: error.sqlMessage ?? "Server error" });
	}
}
