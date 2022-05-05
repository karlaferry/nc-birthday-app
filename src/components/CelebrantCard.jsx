import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Contexts/User";
import MessageField from "./MessageField";
import { getSingleUser, getGreetings } from "../utils/dbCalls";

export default function CelebrantCard() {
  const { id } = useParams();
  const { isLoggedIn } = useContext(UserContext);
  const [currentCeleb, setCurrentCeleb] = useState({});
  const [celebGreetings, setCelebGreetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function loadPage() {
      const singleCeleb = await getSingleUser(id);
      const greetings = await getGreetings(id);
      setCelebGreetings((curr) => {
        const arr = [];
        for (let greeting in greetings) {
          arr.push(greetings[greeting]);
        }
        return arr;
      });
      setCurrentCeleb(singleCeleb);
    }
    loadPage();
    setIsLoading(false);
  }, []);

  return (
    <div>
      <h1>{currentCeleb.first_name}</h1>
      <img
        src={`${currentCeleb.avatar_url}`}
        alt="daily celebrant"
        width="20%"
      />
      <MessageField id={id} />
      {/* Make greetings component here */}
      {/* Add isLoading conditional rendering */}
      {isLoggedIn &&
        celebGreetings.map((greeting) => (
          <h3 key={`${greeting.timestamp}`}>{greeting.message}</h3>
        ))}
    </div>
  );
}
