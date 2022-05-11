import React, { useContext } from "react";
import Monthly from "./Monthly";
import Daily from "./Daily";
import { UserContext } from "../Contexts/User";

export default function Home() {
  const { isLoggedIn } = useContext(UserContext);
  console.log(isLoggedIn);
  return (
    <div>
      <Monthly />
      <Daily />
    </div>
  );
}
