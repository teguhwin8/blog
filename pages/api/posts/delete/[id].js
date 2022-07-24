import db from "../../../../libs/db";
import moment from "moment";

export default async function handler(req, res) {
	if (req.method !== "DELETE") {
		return res
			.status(405)
			.json({ message: `Method ${req.method} are not allowed` });
	}

	const { id } = req.query;

	if (!id) {
		return res.status(404).json({ message: "Post not found" });
	}

	try {
		const post = await db("posts").where({ id }).del();
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		return res.status(200).json({
			message: "Post deleted successfully",
		});
	} catch (error) {
		return res
			.status(400)
			.json({ message: error.sqlMessage ?? "Server error" });
	}
}
