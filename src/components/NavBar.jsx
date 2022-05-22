import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { UserContext } from "../Contexts/User";

export default function NavBar() {
  const { isLoggedIn } = useContext(UserContext);
  const navContainer = `
  flex 
  flex-wrap 
  mobile:flex-col
  mobile:items-center 
  `;
  const menuContainer = `
  flex 
  mobile:flex-col
  mobile:justify-center
  tablet:flex-row
  tablet:mt-10 
  tablet:justify-end 
  tablet:w-full
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
  mobile:px-20 
  tablet:px-2 
  my-2 
  min-w-full 
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
