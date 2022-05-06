import { database, storage, auth } from "../firebase";
import { deleteUser } from "firebase/auth";
import {
	ref,
	child,
	get,
	set,
	update,
	query,
	orderByChild,
	equalTo,
} from "firebase/database";
import { getDownloadURL, ref as sRef, deleteObject } from "firebase/storage";
import { getMonthNum, getDay } from "./helperFuncs";

export const getUsers = async () => {
	try {
		const usersDb = ref(database);
		const snapshot = await get(child(usersDb, `/users`));
		return snapshot.val();
	} catch (e) {
		console.log(e);
	}
};

export const getSingleUser = async (userId) => {
	try {
		const usersDb = ref(database);
		const snapshot = await get(child(usersDb, `/users/` + userId));
		return snapshot.val();
	} catch (e) {
		console.log(e);
	}
};

export const postUser = async (userId, firstName, birthdate) => {
	try {
		const postUserDb = ref(database, "/users/" + userId);
		const newUser = {
			avatar_url:
				"https://firebasestorage.googleapis.com/v0/b/nc-birthday-app.appspot.com/o/user.png?alt=media&token=b6322e5d-7b78-4caf-884d-5aa63712a558",
			first_name: firstName,
			birth_date: birthdate,
			id: userId,
		};
		await set(postUserDb, newUser);
	} catch (e) {
		console.log(e);
	}
};

export const getMonthlyCelebrants = async () => {
	try {
		const monthlyCelebrants = await get(
			query(
				ref(database, "users"),
				orderByChild("/birth_date/month"),
				equalTo(getMonthNum())
			)
		);
		return monthlyCelebrants.val();
	} catch (e) {
		console.log(e);
	}
};

export const getDailyCelebrants = async () => {
	try {
		const dailyCelebrants = await get(
			query(
				ref(database, "users"),
				orderByChild("/birth_date/day"),
				equalTo(getDay())
			)
		);
		return dailyCelebrants.val();
	} catch (e) {
		console.log(e);
	}
};

export const patchUserAvatar = async (userId) => {
	try {
		const avatarRef = sRef(storage, `user_avatars/${userId}`);
		const url = await getDownloadURL(avatarRef);
		const dbRef = ref(database);
		const usersRef = child(dbRef, `/users/` + userId);
		await update(usersRef, {
			avatar_url: url,
		});
	} catch (e) {
		console.log(e);
	}
};

export const deleteAccount = async (userId) => {
	try {
		const dbRef = ref(database);
		const usersRef = child(dbRef, `/users/` + userId);
		const avatarRef = sRef(storage, `user_avatars/${userId}`);
		await set(usersRef, null);
		await deleteUser(auth.currentUser);
		await deleteObject(avatarRef);
	} catch (e) {
		console.log(e);
	}
};

export const postGreeting = async (authorId, emoji, message, celebId) => {
	try {
		const timestamp = Date.now();
		const greetingRef = ref(database, "/greetings/" + authorId + timestamp);
		const newGreeting = {
			authorId,
			timestamp,
			emoji,
			message,
			celebId,
		};
		await set(greetingRef, newGreeting);
	} catch (e) {
		console.log(e);
	}
};

export const getGreetings = async (celebId) => {
	try {
		const greetings = await get(
			query(
				ref(database, "greetings"),
				orderByChild("celebId"),
				equalTo(`${celebId}`)
			)
		);
		return greetings.val();
	} catch (e) {
		console.log(e);
	}
};
