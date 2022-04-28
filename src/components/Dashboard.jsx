import React, { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/User";

export default function Dashboard() {
	const { user } = useContext(UserContext);

	return (
		<div>
			<h2>Dashboard</h2>
			<h3>Welcome, {user.email}</h3>
		</div>
	);
}
