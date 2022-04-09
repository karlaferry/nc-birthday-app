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
      setMonthlyCelebs(users);
    }
    loadPage();
  }, []);
  return (
    <div>
      <h2>{getMonthAndYear()} Celebrants</h2>
      {isLoading ? (
        <p>Celebrants loading...</p>
      ) : (
        sortBirthdays(monthlyCelebs).map((monthlyCeleb) => {
          return (
            <SingleMonthlyCelebrant
              monthlyCeleb={monthlyCeleb}
              key={monthlyCeleb.birth_date}
            />
          );
        })
      )}
    </div>
  );
}
