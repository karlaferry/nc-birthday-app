import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/User";

export default function SingleDailyCelebrant({ dailyCeleb }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="w-10/12 m-auto">
      <img
        src={`${dailyCeleb.avatar_url}`}
        alt="celebrant avatar"
        className="rounded-t-lg"
      />
      <div className="rounded-b-lg py-3 px-5 bg-accent1 text-primary3 font-varela font-bold text-lg flex flex-row justify-between items-center">
        <h4 className="uppercase">{dailyCeleb.first_name}</h4>
        <button
          onClick={() => navigate(`/celebrant/${dailyCeleb.id}`)}
          disabled={!user.emailVerified}
          className="bg-primary3 text-primary2 lowercase text-sm font-bold py-1.5 px-4 rounded"
        >
          {user.uid === dailyCeleb.id ? "See Your Greetings" : "greet me"}
        </button>
      </div>
    </div>
  );
}
