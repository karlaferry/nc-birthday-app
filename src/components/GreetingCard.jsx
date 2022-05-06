import React, { useContext } from "react";
import { UserContext } from "../Contexts/User";
import { deleteGreeting } from "../utils/dbCalls";
import { convertDate } from "../utils/helperFuncs";

export default function GreetingCard({ greeting }) {
	const { day, month, year, hours, minutes } = convertDate(greeting.timestamp);
	const { user } = useContext(UserContext);

	const handleDelete = async () => {
		await deleteGreeting(user.uid, greeting.timestamp);
		alert("Greeting deleted!");
	};
	return (
		<div>
			<p key={greeting.timestamp}>
				{greeting.emoji} – {greeting.message}
			</p>
			<p>
				{day}-{month}-{year} | {hours}:{minutes}
			</p>
			{user.uid === greeting.authorId && <button onClick={handleDelete}>🗑</button>}
		</div>
	);
}
