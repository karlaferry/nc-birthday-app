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
