import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { UserContext } from "../Contexts/User";
import { postUser } from "../utils/dbCalls";

export default function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user.email);

  const handleEmail = (e) => {
    setRegisterEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setRegisterPassword(e.target.value);
  };

  const register = async (e) => {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      await postUser(auth.currentUser.uid);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form>
        <input type="email" placeholder="E-mail" onChange={handleEmail} />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePassword}
        />
        <button onClick={register}>Sign Up</button>
      </form>
      {user && <h2>{user.email}</h2>}
    </div>
  );
}
