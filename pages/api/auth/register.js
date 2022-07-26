import db from "../../../libs/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ message: `Method ${req.method} are not allowed` });
	}

	let { email, password, name, passwordConfirmation } = req.body;

	// if email or password is empty
	if (!email || !password || email == "" || password == "") {
		return res.status(400).json({ message: "Email dan password wajib diisi" });
	}

	// password must be at least 8 characters
	if (password.length < 8) {
		return res
			.status(400)
			.json({ message: "Password harus lebih dari 8 karakter" });
	}

	// Check if user already exists
	const user = await db("users").where({ email }).first();

	// If user already exists, return error
	if (user) {
		return res.status(400).json({ message: "Email sudah terdaftar" });
	}

	// check password confirmation
	if (password !== passwordConfirmation) {
		return res
			.status(400)
			.json({ message: "Password tidak cocok" });
	}

	// If user doesn't exist, create new user
	try {
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(password, salt);
		const userId = await db("users").insert({
			name,
			email,
			password: hash,
		});

		const user = await db("users").where({ id: userId }).first();

		delete user.password;

		return res.status(201).json({
			message: "Success",
			data: user,
		});
	} catch (error) {
		return res
			.status(400)
			.json({ message: error.sqlMessage ?? "Server error" });
	}
}
