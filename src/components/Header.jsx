import React from "react";
import NavBar from "./NavBar";

export default function Header() {
  const headerContainer = `
  flex 
  mobile:flex-col 
  mobile:justify-center
  laptop:flex-row
  flex-grow
  `;

  const headerStyle = `
  font-bold 
  pb-6 
  uppercase 
  text-primary1 
  font-varela
  mobile:text-4xl 
  mobile:px-4 
  mobile:pt-10 
  laptop:text-4xl
  laptop:pl-16
  laptop:pt-20 
  laptop:w-full
  `;
  return (
    <div className={headerContainer}>
      <h1 className={headerStyle}>🎂 NC Birthdays</h1>
      <NavBar />
    </div>
  );
}
