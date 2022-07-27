import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../../components/logo";
import { useRouter } from "next/router";
import { VscLoading } from "react-icons/vsc";
import Head from "next/head";
import { toast } from "react-toastify";

export default function Login() {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const isSuccess = router.query.success;
		if (isSuccess) {
			toast.success("Anda berhasil mendaftar, silahkan login");
		}
	}, [router.query.success]);

	const inputEmailHandler = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
	};

	const inputPasswordHandler = (e) => {
		e.preventDefault();
		setPassword(e.target.value);
	};

	const loginHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const payload = {
			email,
			password,
		};

		const url = "/api/auth/login";
		const loginRequest = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			},
			body: JSON.stringify(payload),
		});

		const response = await loginRequest.json();

		if (!loginRequest.ok) {
			toast.error(response.message);
		} else {
			setErrorMessage(null);
			router.push({
				pathname: "/",
			});
		}

		setIsLoading(false);
	};

	return (
		<>
			<Head>
				<title>Login - HaloBlog</title>
			</Head>
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
					<form onSubmit={loginHandler}>
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
						<div className="my-6 flex justify-center">
							{isLoading ? (
								<button
									type="submit"
									className="btn-default w-full tracking-widest"
									disabled
								>
									<div className="flex items-center justify-center">
										{isLoading && (
											<VscLoading className="mr-3 animate-spin w-6 h-6" />
										)}
										LOGIN
									</div>
								</button>
							) : (
								<button
									type="submit"
									className="btn-default w-full tracking-widest"
								>
									LOGIN
								</button>
							)}
						</div>
						<div className="mb-4">
							<p className="text-sm text-gray-400 text-center">
								{"Belum punya akun?"}
								<Link href="/auth/register">
									<a className="link mx-1">Daftar</a>
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
