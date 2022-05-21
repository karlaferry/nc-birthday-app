import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { UserContext } from "../Contexts/User";

export default function NavBar() {
  const { isLoggedIn } = useContext(UserContext);
  const buttons =
    "bg-accent1 hover:bg-accent2 hover:text-primary2 font-varela font-bold text-accent2 text-lg py-3 px-16 my-2 min-w-full hover:border-blue-500 rounded-md lowercase m-1";
  return (
    <div className="flex flex-col items-center content-center">
      <ul>
        <li>
          <Link to="/">
            <button className={buttons}>Home</button>
          </Link>
        </li>
        {!isLoggedIn && (
          <li>
            <Link to="/register-login">
              <button className={buttons}>Login | Register</button>
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/dashboard">
              <button className={buttons}>Dashboard</button>
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <form action="/">
              <button
                onClick={async () => {
                  console.log("clicked!");
                  await signOut(auth);
                }}
                className={buttons}
              >
                Logout
              </button>
            </form>
          </li>
        )}
      </ul>
    </div>
  );
}
