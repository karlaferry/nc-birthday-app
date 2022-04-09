import "./App.css";
import Header from "./components/Header";
import Monthly from "./components/Monthly";
import Daily from "./components/Daily";
import { getUsers } from "./utils/dbCalls";

function App() {
  getUsers();
  return (
    <>
      <Header />
      <Monthly />
      <Daily />
    </>
  );
}

export default App;
