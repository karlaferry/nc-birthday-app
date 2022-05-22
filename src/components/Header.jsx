import React from "react";
import NavBar from "./NavBar";

export default function Header() {
  const headerContainer = `
  flex 
  mobile:flex-col 
  laptop:flex-row
  flex-grow
  justify-evenly
  `;

  const headerStyle = `
  mobile:text-4xl 
  laptop:text-5xl
  font-bold 
  text-center 
  mobile:px-4 
  pb-6 
  uppercase 
  text-primary1 
  font-varela
  w-full
  mobile:pt-10 
  laptop:pl-14
  laptop:pt-14 
  laptop:text-left
  `;
  return (
    <div className={headerContainer}>
      <h1 className={headerStyle}>🎂 NC Birthdays</h1>
      <NavBar />
    </div>
  );
}
