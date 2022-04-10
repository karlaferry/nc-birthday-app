import React from "react";
import { Link } from "react-router-dom";

export default function SingleDailyCelebrant({ dailyCeleb }) {
  console.log(dailyCeleb);
  // const messageHandler = () => {
  //   console.log("Clicked!!!");
  // };
  return (
    <div>
      <img src={`${dailyCeleb.avatar_url}`} alt="celebrant avatar" />
      <h3>
        <Link to={`/celebrant/${dailyCeleb.id}`}>{dailyCeleb.first_name}</Link>
      </h3>
    </div>
  );
}
