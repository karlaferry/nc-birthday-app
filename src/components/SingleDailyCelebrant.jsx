import React from "react";
import { useNavigate } from "react-router-dom";

export default function SingleDailyCelebrant({ dailyCeleb }) {
  const navigate = useNavigate();
  return (
    <div>
      <img
        src={`${dailyCeleb.avatar_url}`}
        alt="celebrant avatar"
        width="100"
      />
      <h3>{dailyCeleb.first_name}</h3>
      <button onClick={() => navigate(`/celebrant/${dailyCeleb.id}`)}>
        Send Anon Greeting
      </button>
    </div>
  );
}
