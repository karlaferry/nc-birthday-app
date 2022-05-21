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
  return (
    <div>
      <h2 className="text-3xl font-bold text-center px-4 uppercase text-primary3 font-varela">
        Today
      </h2>
      <h3 className="text-l font-bold text-center px-4 mb-6 lowercase text-primary1 font-varela">
        Daily Celebrants
      </h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        dailyCelebs.map((dailyCeleb) => {
          return (
            <SingleDailyCelebrant
              dailyCeleb={dailyCeleb}
              key={`daily${dailyCeleb.id}`}
            />
          );
        })
      )}
    </div>
  );
}
