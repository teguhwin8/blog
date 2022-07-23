import db from "../../../libs/db";

export const config = {
	api: {
		responseLimit: false,
	},
};

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res
			.status(405)
			.json({ message: `Method ${req.method} are not allowed` });
	}

	const posts = await db("posts").select(["id", "slug", "title", "content"]);

	return res.status(200).json({
		message: "Success",
		count: posts.length,
		data: posts,
	});
}
