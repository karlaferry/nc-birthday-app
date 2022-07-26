import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import { postUser } from "../utils/dbCalls";
import { extractErrorMsg, formatDate, validEmail } from "../utils/helperFuncs";

export default function Register() {
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
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
		setBirthdate(formatDate(e.target.value));
	};

	const register = async (e) => {
		try {
			e.preventDefault();
			if (!firstName || !registerPassword || !birthdate) {
				setErrorMsg("PLEASE FILL OUT ALL FIELDS.");
			} else if (!validEmail(registerEmail)) {
				setErrorMsg("AUTHORIZED USERS ONLY.");
			} else {
				await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
				await postUser(auth.currentUser.uid, firstName, birthdate);
				await sendEmailVerification(auth.currentUser);
				navigate("/verify");
			}
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
			<h2 className={h2}>Register</h2>
			{/* <form>
				<input type="email" placeholder="E-mail" onChange={handleEmail} />
				<input type="password" placeholder="Password" onChange={handlePassword} />
				<input placeholder="First Name" onChange={handleFirstName} />
				<label>Birthdate:</label>
				<input type="date" name="birthdate" onChange={handleBirthdate} />
				<button onClick={register}>Sign Up</button>
			</form> */}
			<form className="px-12 pt-2 pb-6 mb-1">
				<div className="mb-4">
					<label
						className="block text-primary3 text-sm font-varela lowercase mb-2"
						htmlFor="regEmail"
					>
						email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="regEmail"
						type="email"
						onChange={handleEmail}
						placeholder="Email"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-primary3 text-sm font-varela lowercase mb-2"
						htmlFor="firstName"
					>
						first name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="firstName"
						type="text"
						onChange={handleFirstName}
						placeholder="First Name"
					/>
				</div>
				<div className="mb-2">
					<label
						className="block text-primary3 text-sm font-varela lowercase mb-2"
						htmlFor="regPassword"
					>
						password
					</label>
					<input
						className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="regPassword"
						type="password"
						onChange={handlePassword}
						placeholder="******************"
					/>
				</div>
				<div className="mb-2">
					<label
						className="block text-primary3 text-sm font-varela lowercase mb-2"
						htmlFor="birthdate"
					>
						birthdate
					</label>
					<input
						className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="birthdate"
						type="date"
						onChange={handleBirthdate}
					/>
				</div>
				<div className="flex items-center justify-between">
					<button className={buttons} type="button" onClick={register}>
						Register
					</button>
				</div>
			</form>
			{errorMsg && <p>{errorMsg}</p>}
		</div>
	);
}
