import React from "react";
import defaultAvatar from "../defaultAvatar.png";

export default function SingleMonthlyCelebrant({ monthlyCeleb }) {
  return (
    <div>
      <h3>{monthlyCeleb.birth_date.split("/")[0]}</h3>
      <img src={defaultAvatar} width="100" />
      <p>{monthlyCeleb.first_name}</p>
    </div>
  );
}
