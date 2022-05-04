import { database, storage } from "../firebase";
import { ref, child, get, set, update } from "firebase/database";
import { getMonthNum, getDay } from "./helperFuncs";
import { getDownloadURL, ref as sRef } from "firebase/storage";

export const getUsers = async () => {
  const usersDb = ref(database);
  const snapshot = await get(child(usersDb, `/users`));
  return snapshot.val();
};

export const getSingleUser = async (userId) => {
  const usersDb = ref(database);
  const snapshot = await get(child(usersDb, `/users/` + userId));
  return snapshot.val();
};

export const postUser = (userId, firstName, birthdate) => {
  const postUserDb = ref(database, "/users/" + userId);
  const newUser = {
    avatar_url:
      "https://firebasestorage.googleapis.com/v0/b/nc-birthday-app.appspot.com/o/user.png?alt=media&token=b6322e5d-7b78-4caf-884d-5aa63712a558",
    first_name: firstName,
    birth_date: birthdate,
    id: userId,
  };
  set(postUserDb, newUser);
};

// ignore these next two calls, haven't figured out how to query!
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
    users[user].birth_date.startsWith(`${getDay()}/${getMonthNum()}`) &&
      dailyCelebs.push(users[user]);
  }
  return dailyCelebs;
};

export const patchUserAvatar = async (userId) => {
  const avatarRef = sRef(storage, `user_avatars/${userId}`);
  const url = await getDownloadURL(avatarRef);
  const dbRef = ref(database);
  const usersRef = child(dbRef, `/users/` + userId);
  await update(usersRef, {
    avatar_url: url,
  });
};
