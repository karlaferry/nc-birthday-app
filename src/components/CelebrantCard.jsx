import React from "react";
import { Link, useParams } from "react-router-dom";
export default function CelebrantCard() {
	const { id } = useParams();
	return (
		<div>
			<h2>CelebrantCard</h2>
			<Link to="/">Back to Home</Link>
		</div>
	);
}
