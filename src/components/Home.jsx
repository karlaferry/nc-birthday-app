import React, { useContext } from "react";
import Monthly from "./Monthly";
import Daily from "./Daily";
import { UserContext } from "../Contexts/User";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function Home() {
	const { setUser } = useContext(UserContext);
	onAuthStateChanged(auth, (currentUser) => {
		currentUser && setUser(currentUser);
	});
	return (
		<div>
			<Monthly />
			<Daily />
		</div>
	);
}
