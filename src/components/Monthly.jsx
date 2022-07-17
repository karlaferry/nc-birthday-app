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
      <h2 className="text-3xl font-bold text-center mt-6 px-4 uppercase text-primary3 font-varela">
        {getMonthAndYear()}
      </h2>
      <h3 className="text-l font-bold text-center px-4 mb-6 lowercase text-primary1 font-varela">
        This Month's Celebrants
      </h3>
      {!isLoading && (
        <div className="flex flex-wrap justify-evenly gap-y-6">
          {monthlyCelebs.map((monthlyCeleb) => {
            return (
              <SingleMonthlyCelebrant
                monthlyCeleb={monthlyCeleb}
                key={`month${monthlyCeleb.id}`}
              />
            );
          })}
        </div>
      )}
      {!monthlyCelebs.length && (
        <h4 className="text-xs font-bold text-center px-4 mb-6 text-primary3 font-varela">
          No Northcoders were born this month.
        </h4>
      )}
    </div>
  );
}
