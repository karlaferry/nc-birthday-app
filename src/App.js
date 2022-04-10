import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Monthly from "./components/Monthly";
import Daily from "./components/Daily";
import CelebrantCard from "./components/CelebrantCard";
import { getUsers } from "./utils/dbCalls";

function App() {
  getUsers();
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Monthly />
        <Daily />
        <Routes>
          <Route path="/celebrant/:id" element={<CelebrantCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
