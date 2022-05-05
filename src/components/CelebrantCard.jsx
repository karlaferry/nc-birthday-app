import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MessageField from "./MessageField";
import { getSingleUser } from "../utils/dbCalls";
export default function CelebrantCard() {
  const { id } = useParams();
  const [currentCeleb, setCurrentCeleb] = useState({});
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true);
    async function loadPage() {
      const singleCeleb = await getSingleUser(id);
      setCurrentCeleb(singleCeleb);
    }
    loadPage();
    // setIsLoading(false);
  }, []);

  return (
    <div>
      <h1>{currentCeleb.first_name}</h1>
      <img
        src={`${currentCeleb.avatar_url}`}
        alt="daily celebrant"
        width="20%"
      />
      <MessageField />
    </div>
  );
}
