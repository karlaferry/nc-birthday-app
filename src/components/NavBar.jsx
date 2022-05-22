import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { UserContext } from "../Contexts/User";

export default function NavBar() {
  const { isLoggedIn } = useContext(UserContext);
  const navContainer = `
  flex 
  mobile:flex-col
  mobile:items-center 
  `;
  const menuContainer = `
  flex 
  mobile:flex-col
  mobile:justify-center
  laptop:mt-10
  laptop:pr-20
  `;
  const buttons = `
  bg-accent1 
  hover:bg-accent2 
  hover:text-primary2 
  font-varela 
  font-bold 
  text-accent2 
  text-lg 
  py-3 
  mobile:my-2 
  mobile:px-20 
  mobile:w-full
  laptop:px-16
  laptop:mr-6
  laptop:mt-8
  laptop:whitespace-nowrap
  rounded-md 
  lowercase`;
  return (
    <div className={navContainer}>
      <ul className={menuContainer}>
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
