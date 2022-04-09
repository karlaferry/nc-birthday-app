import React from "react";

export default function SingleDailyCelebrant({ dailyCeleb }) {
  console.log(dailyCeleb);
  return (
    <div>
      <h3>
        {dailyCeleb.first_name} {dailyCeleb.last_name}
      </h3>
    </div>
  );
}
