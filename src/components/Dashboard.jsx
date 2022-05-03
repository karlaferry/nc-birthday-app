import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/User";

export default function Dashboard() {
	const { user, isLoggedIn, userData } = useContext(UserContext);
	const navigate = useNavigate();

	return (
		<div>
			{isLoggedIn === true ? (
				<>
					<h2>Dashboard</h2>
					<h3>Welcome, {userData.first_name}!</h3>
					<h2>Account Info</h2>
					<img src={`${userData.avatar_url}`} alt="user default" />
					<p>Name: {userData.first_name}</p>
					<p>Email: {user.email}</p>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							console.log(e.target.value);
						}}
					>
						<label>Change Avatar:</label>
						<input type="file" accept="image/*" />
						<button>Upload</button>
					</form>
					<br />
					<button onClick={() => navigate(`/celebrant/${user.uid}`)}>
						My Birthday Page
					</button>
				</>
			) : (
				<p>Please login or register.</p>
			)}
		</div>
	);
}
