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
    const previousBirthday = +a.birth_date.day;
    const currentBirthday = +b.birth_date.day;
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

exports.formatDate = (dateStr) => {
  const date = dateStr.split("-").map((day) => {
    if (day[0] === "0") {
      return day[1];
    }
    return day;
  });
  return { day: +date[2], month: +date[1], year: +date[0] };
};

exports.convertDate = (date) => {
  const d = new Date(date);
  const dateObj = {
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear(),
    hours: d.getHours(),
    minutes: d.getMinutes(),
  };
  return dateObj;
};

exports.validEmail = (email) => {
  const domain = email.split("@")[1];
  return domain === "northcoders.com" ? true : false;
};
