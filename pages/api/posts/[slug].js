import db from "../../../libs/db";
import moment from "moment";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res
			.status(405)
			.json({ message: `Method ${req.method} are not allowed` });
	}

	const { slug } = req.query;

	const post = await db("posts").where({ slug }).first();

	if (!post) {
		return res.status(404).json({ message: "Post not found" });
	}

	moment.locale("id");
	post.created_at_from_now = moment(post.created_at).fromNow();
	post.updated_at_from_now = moment(post.updated_at).fromNow();
	post.created_at = moment(post.created_at).format("DD MMMM YYYY HH:mm");
	post.updated_at = moment(post.updated_at).format("DD MMMM YYYY HH:mm");

	return res.status(200).json({
		message: "Success",
		data: post,
	});
}
