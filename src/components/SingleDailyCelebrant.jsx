import React from "react";
import { Link } from "react-router-dom";

export default function SingleDailyCelebrant({ dailyCeleb }) {
	return (
		<Link to={`/celebrant/${dailyCeleb.id}`}>
			<div>
				<img src={`${dailyCeleb.avatar_url}`} alt="celebrant avatar" />
				<h3>{dailyCeleb.first_name}</h3>
			</div>
		</Link>
	);
}
