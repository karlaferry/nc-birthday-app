import React from "react";
import NavBar from "./NavBar";

export default function Header() {
  const headerContainer = `
  flex 
  mobile:flex-col 
  mobile:justify-center
  flex-row
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
  text-4xl
  pl-16
  pt-20 
  w-full
  `;
  return (
    <div className={headerContainer}>
      <h1 className={headerStyle}>🎂 NC Birthdays</h1>
      <NavBar />
    </div>
  );
}
