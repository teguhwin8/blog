import db from "../../../libs/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config({ path: ".env.local" });

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ message: `Method ${req.method} are not allowed` });
	}

	const { email, password } = req.body;

	// if email or password is empty
	if (!email || !password || email == "" || password == "") {
		return res.status(400).json({ message: "Email dan password wajib diisi" });
	}

	// check if user already exists
	const user = await db("users").where({ email }).first();
	if (!user) {
		return res.status(400).json({ message: "Akun tidak ditemukan" });
	} else {
		const isMatch = bcrypt.compareSync(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Email atau password tidak valid" });
		} else {
			const token = jwt.sign(
				{ id: user.id, name: user.name, email: user.email },
				process.env.JWT_SECRET,
			);
			delete user.password;
			delete user.created_at;
			delete user.updated_at;
			return res.status(200).json({
				message: "Success",
				data: user,
				token,
			});
		}
	}
}
