import React, { useState, useEffect } from "react";
import SingleDailyCelebrant from "./SingleDailyCelebrant";
import { getDailyCelebrants } from "../utils/dbCalls";

export default function Daily() {
	const [dailyCelebs, setDailyCelebs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function loadPage() {
			setIsLoading(true);
			const users = await getDailyCelebrants();
			setIsLoading(false);
			setDailyCelebs(users);
		}
		loadPage();
	}, []);
	return (
		<div>
			<h2>Happy birthday to:</h2>
			{isLoading ? (
				<p>Loading...</p>
			) : dailyCelebs.length < 2 ? (
				<SingleDailyCelebrant dailyCeleb={dailyCelebs[0]} />
			) : (
				dailyCelebs.map((dailyCeleb) => {
					return (
						<SingleDailyCelebrant
							dailyCeleb={dailyCeleb}
							key={`${dailyCeleb.id}`}
						/>
					);
				})
			)}
		</div>
	);
}
