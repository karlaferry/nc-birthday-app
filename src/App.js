import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
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
					<Route path="/celebrant/:id" element={<CelebrantCard />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
