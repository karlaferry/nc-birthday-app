import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { extractErrorMsg } from "../utils/helperFuncs";

export default function Login() {
	const [logInEmail, setLogInEmail] = useState("");
	const [logInPassword, setLogInPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const navigate = useNavigate();

	const handleEmail = (e) => {
		setLogInEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setLogInPassword(e.target.value);
	};

	const logIn = async (e) => {
		try {
			e.preventDefault();
			await signInWithEmailAndPassword(auth, logInEmail, logInPassword);
			navigate("/dashboard");
		} catch (e) {
			setErrorMsg(extractErrorMsg(e.code));
			console.log(e);
		}
	};
	const h2 = "text-3xl font-bold text-center px-4 uppercase text-primary3 font-varela mt-8";
	const buttons = `
  bg-accent1 
  hover:bg-accent2 
  hover:text-primary2 
  font-varela 
  font-bold 
  text-accent2 
  text-md
  py-1.5
  px-3
  rounded-md`;
	return (
		<div>
			<h2 className={h2}>Login</h2>
			<form className="px-12 pt-2 pb-6 mb-1" onSubmit={logIn}>
				<div className="mb-4">
					<label className="block text-primary3 text-sm font-varela lowercase mb-2" htmlFor="email">
						email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						onChange={handleEmail}
						placeholder="Email"
					/>
				</div>
				<div className="mb-2">
					<label
						className="block text-primary3 text-sm font-varela lowercase mb-2"
						htmlFor="password"
					>
						password
					</label>
					<input
						className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						onChange={handlePassword}
						placeholder="******************"
					/>
				</div>
				<div className="flex items-center justify-between">
					<button className={buttons} type="button">
						Log In
					</button>
				</div>
			</form>
			{errorMsg && <p>{errorMsg}</p>}
		</div>
	);
}
