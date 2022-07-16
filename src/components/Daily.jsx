import React, { useState, useEffect } from "react";
import SingleDailyCelebrant from "./SingleDailyCelebrant";
import { getDailyCelebrants } from "../utils/dbCalls";

export default function Daily() {
  const [dailyCelebs, setDailyCelebs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPage() {
      setIsLoading(true);
      const users = await getDailyCelebrants();
      setIsLoading(false);
      setDailyCelebs((curr) => {
        const current = [...curr];
        for (let celeb in users) {
          current.push(users[celeb]);
        }
        return current;
      });
    }
    loadPage();
  }, []);

  // Styling
  const dailyH2 =
    "text-3xl font-bold text-center px-4 uppercase text-primary3 font-varela";
  const dailyH3 =
    "text-l font-bold text-center px-4 mb-6 lowercase text-primary1 font-varela";

  return (
    <div>
      <h2 className={dailyH2}>Today</h2>
      {dailyCelebs.length > 1 ? (
        <h3 className={dailyH3}>Daily Celebrants</h3>
      ) : (
        <h3 className={dailyH3}>Daily Celebrant</h3>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap justify-evenly gap-y-6">
          {dailyCelebs.map((dailyCeleb) => {
            return (
              <SingleDailyCelebrant
                dailyCeleb={dailyCeleb}
                key={`daily${dailyCeleb.id}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
