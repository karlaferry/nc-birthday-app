import React, { useState, useEffect, useContext } from "react";
import GreetingCard from "./GreetingCard";
import { getGreetings } from "../utils/dbCalls";
import { UserContext } from "../Contexts/User";

export default function Greetings({ id, celebGreetings, setCelebGreetings }) {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    async function loadPage() {
      const greetings = await getGreetings(id);
      setCelebGreetings((curr) => {
        const arr = [];
        for (let greeting in greetings) {
          arr.push(greetings[greeting]);
        }
        return arr.reverse();
      });
    }
    loadPage();
    setIsLoading(false);
  }, [id, setCelebGreetings]);

  const showGreetings = () => {
    if (!isLoggedIn) {
      return null;
    } else if (!isLoading && celebGreetings.length > 0) {
      return celebGreetings.map((greeting) => {
        return (
          <GreetingCard
            greeting={greeting}
            key={greeting.timestamp}
            setCelebGreetings={setCelebGreetings}
          />
        );
      });
    } else if (user.uid === id) {
      return <p>Sorry! No greetings yet. 🥺</p>;
    }
    return <p>Be the first to leave a greeting!</p>;
  };

  return (
    <>
      {user.emailVerified && (
        <div>
          {isLoggedIn && (
            <h2>{user.uid === id ? "Your Greetings" : "Greetings"}</h2>
          )}
          {showGreetings()}
        </div>
      )}
    </>
  );
}
