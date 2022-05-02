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
import { getMonthNum, getDay } from "./helperFuncs";

export const getUsers = () => {
  const usersDb = ref(database);
  return get(child(usersDb, `/users`)).then((snapshot) => {
    return snapshot.val();
  });
};

// export const getSingleUser = (id) => {
// 	const usersDb = ref(database)
// 	return get(
//     query(ref(usersDb, `/users/` + userId + "/water"), orderByKey())
//   )
// }

export const postUser = (userId) => {
  const postUserDb = ref(database, "/users/" + userId);
  const newUser = {
    avatar_url:
      "https://firebasestorage.googleapis.com/v0/b/nc-birthday-app.appspot.com/o/user.png?alt=media&token=b6322e5d-7b78-4caf-884d-5aa63712a558",
  };
  set(postUserDb, newUser);
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

export const getDailyCelebrants = async () => {
  const users = await getUsers();
  const dailyCelebs = [];
  for (let user in users) {
    users[user].birth_date.startsWith(`${getMonthNum()}/${getDay()}`) &&
      dailyCelebs.push(users[user]);
  }
  return dailyCelebs;
};
