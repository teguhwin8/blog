import React, { useState } from "react";
import Link from "next/link";
import Logo from "../../components/logo";
import { useRouter } from "next/router";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const router = useRouter();

	const inputEmailHandler = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
	};

	const inputPasswordHandler = (e) => {
		e.preventDefault();
		setPassword(e.target.value);
	};

	const inputPasswordConfirmationHandler = (e) => {
		e.preventDefault();
		setPasswordConfirmation(e.target.value);
	};

	const registerHandler = async (e) => {
		e.preventDefault();
		const payload = {
			email,
			password,
			passwordConfirmation,
		};

		const url = "/api/auth/register";
		const registerRequest = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		const response = await registerRequest.json();

		if (!registerRequest.ok) {
			setErrorMessage(response.message);
		} else {
			setErrorMessage(null);
			router.push({
				pathname: "/auth/login",
				query: { success: "true" },
			});
		}
	};

	return (
		<>
			<div className="flex items-center justify-center w-screen h-screen p-8 overflow-auto custom-scrollbar bg-slate-100">
				<div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-[400px]">
					<div className="py-6">
						<Logo />
					</div>
					{errorMessage && (
						<div className="px-3 py-2 bg-red-100 text-red-700 mb-4 text-sm rounded-lg">
							{errorMessage}
						</div>
					)}
					<form onSubmit={registerHandler}>
						<div className="mb-4">
							<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								Email
							</label>
							<input
								type="email"
								className="text-input"
								placeholder="emailkamu@domain.com"
								required
								onChange={inputEmailHandler.bind(this)}
							/>
						</div>
						<div className="mb-4">
							<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								Password
							</label>
							<input
								type="password"
								className="text-input"
								placeholder="Password"
								required
								onChange={inputPasswordHandler.bind(this)}
							/>
						</div>
						<div className="mb-4">
							<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								Konfirmasi Password
							</label>
							<input
								type="password"
								className="text-input"
								placeholder="Ulangi Password"
								required
								onChange={inputPasswordConfirmationHandler.bind(this)}
							/>
						</div>
						<div className="my-6 flex justify-center">
							<button
								type="submit"
								className="btn-default w-full tracking-widest"
							>
								DAFTAR SEKARANG
							</button>
						</div>
						<div className="mb-4">
							<p className="text-sm text-gray-400 text-center">
								{"Udah punya akun?"}
								<Link href="/auth/login">
									<a className="link mx-1">Masuk</a>
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
