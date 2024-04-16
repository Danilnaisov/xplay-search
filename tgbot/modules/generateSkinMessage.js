const getFormattedDate = require("./getFormattedDate");

const API_KEYS = [
  "XSY5ZS1SG5J95GGN", //Денчик 5000/m
  "8GPNNO47GPJIWDA0", //Ferma203 5000/m
];

module.exports = function generateSkinMessage(item) {
  const premiumMessage = `Доступно только для премиум пользователей: ${
    item.ForPremium === 0 ? "нет" : "да"
  }`;
  const link = `${encodeURIComponent(
    item.WeaponName
  )}%20%7C%20${encodeURIComponent(item.SkinName)}%20%28${encodeURIComponent(
    item.Exterior
  )}%29`;
  const tradeBanMessage = `Имеется трейд бан: ${
    item.TradeBan === 0 ? "нет" : "да"
  }`;
  const additionalMessage = `\n${premiumMessage}\n${tradeBanMessage}`;
  const viewLinkMessage = `https://xplay.gg/ru/store?itemId=${item.ID}`;
  const shopLinkMessage = `https://steamcommunity.com/market/listings/730/${link}`;
  const apiKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];

  const priceInfo = ""; //getPriceInfo(link, apiKey);

  const updateDateMessage = `Обновленно в API: ${getFormattedDate(
    item.ParseDate
  )}`;

  const message = `Название скина: ${item.WeaponName} - ${item.SkinName}\nКачество: ${item.Exterior}\n\nЦена в баллах: ${item.XPrice} XCoin\n\n${priceInfo}\n\nFloat: ${item.Float}\n\nДоп информация: ${additionalMessage}\n\nСсылка Steam:\n${shopLinkMessage}\nСсылка для покупки:\n${viewLinkMessage}\n\n${updateDateMessage}`;

  return message;
};
