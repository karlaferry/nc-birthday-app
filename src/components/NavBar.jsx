import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { UserContext } from "../Contexts/User";
import { ScreenSizeContext } from "../Contexts/ScreenSize";

export default function NavBar() {
  const { isLoggedIn } = useContext(UserContext);
  const { screenSize, isValidScreenSize } = useContext(ScreenSizeContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isValidScreenSize) {
      navigate("/uh-oh");
    }
  }, [screenSize, navigate]);

  const navContainer = `
  flex 
  mobile:flex-col
  mobile:items-center 
  `;
  const menuContainer = `
  flex 
  mobile:flex-col
  mobile:justify-center
  mobile:mt-0
  mobile:pr-0
  mt-10 
  pr-16
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
  px-16
  mr-4
  mt-8
  rounded-md 
  whitespace-nowrap
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
