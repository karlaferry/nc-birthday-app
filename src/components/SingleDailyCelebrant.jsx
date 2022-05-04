import React from "react";
import { Link } from "react-router-dom";

export default function SingleDailyCelebrant({ dailyCeleb }) {
  console.log(dailyCeleb.birth_date);
  return (
    <Link to={`/celebrant/${dailyCeleb.id}`}>
      <div>
        <img
          src={`${dailyCeleb.avatar_url}`}
          alt="celebrant avatar"
          width="100"
        />
        <h3>{dailyCeleb.first_name}</h3>
      </div>
    </Link>
  );
}
