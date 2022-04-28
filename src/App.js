import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CelebrantCard from "./components/CelebrantCard";
import { getUsers } from "./utils/dbCalls";

function App() {
	getUsers();
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
