import React, { useContext } from "react";
import { UserContext } from "../Contexts/User";

export default function MessageField() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <div>
      <h2>Send an Anonymous Birthday Greeting:</h2>
      <form>
        <textarea
          placeholder="Make them smile!"
          cols="50"
          rows="10"
          disabled={!isLoggedIn}
        />
        <br />
        <button disabled={!isLoggedIn}>Submit</button>
      </form>
    </div>
  );
}
