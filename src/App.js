import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CelebrantPage from "./components/CelebrantPage";
import VerifyEmail from "./components/VerifyEmail";
import NotFound from "./components/NotFound";
import { UserContext } from "./Contexts/User";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getSingleUser } from "./utils/dbCalls";

function App() {
  const { user, setUser, setUserData } = useContext(UserContext);
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      if (currentUser.emailVerified === true) {
        currentUser && setUser(currentUser);
      }
    }
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
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/celebrant/:id" element={<CelebrantPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
