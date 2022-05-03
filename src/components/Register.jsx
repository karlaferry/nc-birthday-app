import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { UserContext } from "../Contexts/User";
import { postUser } from "../utils/dbCalls";
import { extractErrorMsg } from "../utils/helperFuncs";

export default function Register() {
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const handleEmail = (e) => {
		setRegisterEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setRegisterPassword(e.target.value);
	};

	const handleFirstName = (e) => {
		setFirstName(e.target.value);
	};

	const handleBirthdate = (e) => {
		const date = e.target.value.split("-");
		const formattedDate = `${date[2]}/${date[1]}/${date[0]}`;
		setBirthdate(formattedDate);
	};

	const register = async (e) => {
		try {
			e.preventDefault();
			await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			);
			await postUser(auth.currentUser.uid, firstName, birthdate);
			navigate("/dashboard");
		} catch (e) {
			setErrorMsg(extractErrorMsg(e.code));
			console.log(e);
		}
	};

	return (
		<div>
			<h1>Register</h1>
			<form>
				<input type="email" placeholder="E-mail" onChange={handleEmail} />
				<input
					type="password"
					placeholder="Password"
					onChange={handlePassword}
				/>
				<input placeholder="First Name" onChange={handleFirstName} />
				<label>Birthdate:</label>
				<input type="date" name="birthdate" onChange={handleBirthdate} />
				<button onClick={register}>Sign Up</button>
			</form>
			{errorMsg && <p>{errorMsg}</p>}
		</div>
	);
}
