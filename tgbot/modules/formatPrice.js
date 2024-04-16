const convertCurrencyXe = require("./convertCurrencyXe");

module.exports = async function formatPrice(price) {
  const convertedPrice = await convertCurrencyXe("USD", "RUB", price);
  return `$${price} | ₽${convertedPrice.toFixed(2)}`;
};
