exports.getMonthAndYear = () => {
	const date = new Date();
	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return `${month[date.getMonth()]} ${date.getFullYear()}`;
};

exports.getMonthNum = () => {
	const date = new Date();
	return date.getMonth() + 1;
};

exports.getDay = () => {
	const date = new Date();
	return date.getDate();
};

exports.sortBirthdays = (array) => {
	return array.sort((a, b) => {
		const previousBirthday = +a.birth_date.split("/")[0];
		const currentBirthday = +b.birth_date.split("/")[0];
		let comparison = 0;
		if (previousBirthday > currentBirthday) {
			comparison = 1;
		} else if (previousBirthday < currentBirthday) {
			comparison = -1;
		}
		return comparison;
	});
};

exports.extractErrorMsg = (str) => {
	const splitMsg = str.split("/")[1].split("-");
	const errorMsg = splitMsg.join(" ").toUpperCase() + ".";
	return errorMsg;
};

exports.removeZero = (str) => {
	if (str[0] === "0"){
		return str[1]
	} 
	return str
}