import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { UserContext } from "../Contexts/User";

export default function NavBar() {
	const { isLoggedIn } = useContext(UserContext);
	return (
		<div>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				{!isLoggedIn && (
					<li>
						<Link to="/register">Register</Link> /{" "}
						<Link to="/login">Login</Link>
					</li>
				)}
				{isLoggedIn && (
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
				)}
				{isLoggedIn && (
					<li>
						<a onClick={async () => await signOut(auth)} href="/">
							Logout
						</a>
					</li>
				)}
			</ul>
		</div>
	);
}
