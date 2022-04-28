import React, { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/User";

export default function Dashboard() {
	const { user } = useContext(UserContext);

	// Handler for when a user tries to access dashboard via path when they haven't logged in
	// useEffect(() => {
	// 	if (!isLoggedIn) {
	// 		alert("Please login.");
	// 		navigate("/login");
	// 	}
	// }, []);

	return (
		<div>
			<h2>Dashboard</h2>
			<h3>Welcome, {user.email}</h3>
		</div>
	);
}
