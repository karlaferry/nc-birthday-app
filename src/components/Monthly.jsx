import React, { useEffect, useState } from "react";
import SingleMonthlyCelebrant from "./SingleMonthlyCelebrant";
import { getMonthAndYear, sortBirthdays } from "../utils/helperFuncs";
import { getMonthlyCelebrants } from "../utils/dbCalls";

export default function Monthly() {
  const [monthlyCelebs, setMonthlyCelebs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPage() {
      setIsLoading(true);
      const users = await getMonthlyCelebrants();
      setIsLoading(false);
      setMonthlyCelebs((curr) => {
        const current = [...curr];
        for (let celeb in users) {
          current.push(users[celeb]);
        }
        return sortBirthdays(current);
      });
    }
    loadPage();
  }, []);
  return (
    <div>
      <h1>{getMonthAndYear()}</h1>
      <h2>This Month's Celebrants</h2>
      {isLoading ? (
        <p>Celebrants loading...</p>
      ) : (
        monthlyCelebs.map((monthlyCeleb) => {
          return (
            <SingleMonthlyCelebrant
              monthlyCeleb={monthlyCeleb}
              key={`${monthlyCeleb.id}`}
            />
          );
        })
      )}
    </div>
  );
}
