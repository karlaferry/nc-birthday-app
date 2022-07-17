import React from "react";

export default function SingleMonthlyCelebrant({ monthlyCeleb }) {
  return (
    <div className="w-5/12">
      <div className="py-1 px-2.5 bg-accent1 rounded-t-md text-primary3 font-varela font-bold text-lg flex flex-row justify-between">
        <h4>{monthlyCeleb.birth_date.day}</h4>
        <h4>{monthlyCeleb.first_name.toUpperCase()}</h4>
      </div>
      <img
        src={`${monthlyCeleb.avatar_url}`}
        alt="monthly celebrant avatar"
        className="rounded-b-md"
      />
    </div>
  );
}

// mx-3 p-4.5
