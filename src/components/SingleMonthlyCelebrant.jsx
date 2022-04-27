import React from "react";

export default function SingleMonthlyCelebrant({ monthlyCeleb }) {
	return (
		<div>
			<h3>{monthlyCeleb.birth_date.split("/")[0]}</h3>
			<img src={`${monthlyCeleb.avatar_url}`} alt="monthly celebrant avatar" />
			<p>{monthlyCeleb.first_name}</p>
		</div>
	);
}
