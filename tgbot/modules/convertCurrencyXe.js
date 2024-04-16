const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function convertCurrencyXe(src, dst, amount) {
  try {
    const url = `https://www.xe.com/currencyconverter/convert/?Amount=${amount}&From=${src}&To=${dst}`;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const exchangeRateHtml = $("p").eq(2).text();
    return getDigits(exchangeRateHtml);
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null;
  }
};

function getDigits(text) {
  let new_text = "";
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (!isNaN(c) || c === ".") {
      new_text += c;
    }
  }
  return parseFloat(new_text);
}
