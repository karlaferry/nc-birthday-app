import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({}); // this stores firebase auth object
	const [userData, setUserData] = useState({ first_name: null }); // this stores the whole user object
	const isLoggedIn = user.email ? true : false;

	return (
		<UserContext.Provider
			value={{ user, setUser, isLoggedIn, userData, setUserData }}
		>
			{children}
		</UserContext.Provider>
	);
};
