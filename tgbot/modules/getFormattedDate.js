module.exports = function getFormattedDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("ru-RU", {
    timeZone: "UTC",
    dateStyle: "long",
    timeStyle: "long",
  });
};
