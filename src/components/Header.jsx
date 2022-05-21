import React from "react";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center px-4 pt-10 pb-6 uppercase text-primary1 font-varela">
        🎂 NC Birthdays
      </h1>
      <NavBar />
    </div>
  );
}
