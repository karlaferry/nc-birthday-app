import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import MessageField from "./MessageField";
import { getSingleUser } from "../utils/dbCalls";
import Greetings from "./Greetings";
import { UserContext } from "../Contexts/User";

export default function CelebrantCard() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [currentCeleb, setCurrentCeleb] = useState({});
  const [celebGreetings, setCelebGreetings] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true);
    async function loadPage() {
      const singleCeleb = await getSingleUser(id);
      setCurrentCeleb(singleCeleb);
    }
    loadPage();
    // setIsLoading(false);
  }, [id]);

  return (
    <div>
      <h1>{currentCeleb.first_name}</h1>
      <img
        src={`${currentCeleb.avatar_url}`}
        alt="daily celebrant"
        width="20%"
      />
      {user.uid !== id && (
        <MessageField
          id={id}
          celebGreetings={celebGreetings}
          setCelebGreetings={setCelebGreetings}
        />
      )}
      <Greetings
        id={id}
        celebGreetings={celebGreetings}
        setCelebGreetings={setCelebGreetings}
      />
    </div>
  );
}
