import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { UserContext } from "../Contexts/User";
import { extractErrorMsg } from "../utils/helperFuncs";

export default function Login() {
	const [logInEmail, setLogInEmail] = useState("");
	const [logInPassword, setLogInPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const { user } = useContext(UserContext);
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

	return (
		<div>
			<h1>Login</h1>
			<form>
				<input type="email" placeholder="E-mail" onChange={handleEmail} />
				<input
					type="password"
					placeholder="Password"
					onChange={handlePassword}
				/>
				<button onClick={logIn}>Login</button>
			</form>
			{errorMsg && <p>{errorMsg}</p>}
		</div>
	);
}
