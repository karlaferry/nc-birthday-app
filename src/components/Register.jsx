import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";
import { postUser } from "../utils/dbCalls";
import { extractErrorMsg, formatDate, validEmail } from "../utils/helperFuncs";

export default function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setRegisterEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setRegisterPassword(e.target.value);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleBirthdate = (e) => {
    setBirthdate(formatDate(e.target.value));
  };

  const register = async (e) => {
    try {
      e.preventDefault();
      if (!firstName || !registerPassword || !birthdate) {
        setErrorMsg("PLEASE FILL OUT ALL FIELDS.");
      } else if (!validEmail(registerEmail)) {
        setErrorMsg("AUTHORIZED USERS ONLY.");
      } else {
        await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        await postUser(auth.currentUser.uid, firstName, birthdate);
        await sendEmailVerification(auth.currentUser);
        navigate("/verify");
      }
    } catch (e) {
      setErrorMsg(extractErrorMsg(e.code));
      console.log(e);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <input type="email" placeholder="E-mail" onChange={handleEmail} />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePassword}
        />
        <input placeholder="First Name" onChange={handleFirstName} />
        <label>Birthdate:</label>
        <input type="date" name="birthdate" onChange={handleBirthdate} />
        <button onClick={register}>Sign Up</button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
}
