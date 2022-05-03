import React, { useContext } from "react";
import { UserContext } from "../Contexts/User";

export default function Dashboard() {
	const { userData } = useContext(UserContext);

	return (
		<div>
			<h2>Dashboard</h2>
			{userData.first_name && <h3>Welcome, {userData.first_name}!</h3>}
		</div>
	);
}
