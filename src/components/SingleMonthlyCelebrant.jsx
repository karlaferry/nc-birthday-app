import React from "react";

export default function SingleMonthlyCelebrant({ monthlyCeleb }) {
  console.log(monthlyCeleb);
  return (
    <div>
      <h3>{monthlyCeleb.first_name}</h3>
    </div>
  );
}
