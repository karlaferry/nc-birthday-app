import React from "react";
import defaultAvatar from "../defaultAvatar.png";
import { Link } from "react-router-dom";

export default function SingleDailyCelebrant({ dailyCeleb }) {
  console.log(dailyCeleb);
  // const messageHandler = () => {
  //   console.log("Clicked!!!");
  // };
  return (
    <div>
      <img src={defaultAvatar} width="100" />
      <h3>
        {/* <Link to="/celebrant"></Link> */}
        {dailyCeleb.first_name}
      </h3>
    </div>
  );
}
