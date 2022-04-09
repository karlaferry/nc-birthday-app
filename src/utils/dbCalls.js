import {
  ref,
  child,
  get,
  push,
  set,
  update,
  query,
  orderByKey,
} from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import { getMonthNum } from "./helperFuncs";

export const getUsers = () => {
  const usersDb = ref(database);
  return get(child(usersDb, `/users`)).then((snapshot) => {
    return snapshot.val();
  });
};

export const getMonthlyCelebrants = async () => {
  const users = await getUsers();
  const monthlyCelebs = [];
  for (let user in users) {
    const userMonth = +users[user]["birth_date"].split("/")[1];
    userMonth === getMonthNum() && monthlyCelebs.push(users[user]);
  }
  return monthlyCelebs;
};
