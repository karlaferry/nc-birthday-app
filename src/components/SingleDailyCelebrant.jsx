import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/User";

export default function SingleDailyCelebrant({ dailyCeleb }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="border border-black border-solid w-10/12 m-auto">
      <img src={`${dailyCeleb.avatar_url}`} alt="celebrant avatar" />
      <h4>{dailyCeleb.first_name}</h4>
      <button
        onClick={() => navigate(`/celebrant/${dailyCeleb.id}`)}
        disabled={!user.emailVerified}
      >
        {user.uid === dailyCeleb.id
          ? "See Your Greetings"
          : "Send Anon Greetings"}
      </button>
    </div>
  );
}
