import React from "react";

export default function SingleMonthlyCelebrant({ monthlyCeleb }) {
  return (
    <div className="mobile:w-5/12 laptop:w-16 border border-black border-solid">
      <h4>{monthlyCeleb.birth_date.day}</h4>
      <img
        src={`${monthlyCeleb.avatar_url}`}
        alt="monthly celebrant avatar"
        width="100"
      />
      <p>{monthlyCeleb.first_name}</p>
    </div>
  );
}

// mx-3 p-4.5
