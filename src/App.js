import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CelebrantCard from "./components/CelebrantCard";
import { UserContext } from "./Contexts/User";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { getSingleUser } from "./utils/dbCalls";

function App() {
	const { user, setUser, setUserData } = useContext(UserContext);
	onAuthStateChanged(auth, (currentUser) => {
		currentUser && setUser(currentUser);
	});
	useEffect(() => {
		async function loadPage() {
			const singleUser = await getSingleUser(user.uid);
			setUserData(singleUser);
		}
		user.uid && loadPage();
	}, [setUserData, user.uid]);

	return (
		<div>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/celebrant/:id" element={<CelebrantCard />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
