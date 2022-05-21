import React from "react";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center m-6 uppercase text-primary1">
        🎂 NC Birthdays
      </h1>
      <NavBar />
    </div>
  );
}
