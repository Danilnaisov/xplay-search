const formatPrice = require("./formatPrice");
const convertCurrencyXe = require("./convertCurrencyXe");
const axios = require("axios");

module.exports = async function getPriceInfo(skinName, apiKey) {
  try {
    const response = await axios.get(
      `https://www.steamwebapi.com/steam/api/item?key=${apiKey}&market_hash_name=${skinName}&game=csgo`
    );
    const data = response.data;

    let pricelatest = null;
    let pricemedian = null;
    let pricereal = null;

    if ("pricelatest" in data && "pricemedian" in data && "pricereal" in data) {
      pricelatest = data.pricelatest;
      pricemedian = data.pricemedian;
      pricereal = data.pricereal;
    }

    const pricelatestText =
      pricelatest !== null ? await formatPrice(pricelatest) : "N/A";
    const pricemedianText =
      pricemedian !== null ? await formatPrice(pricemedian) : "N/A";
    const pricerealText =
      pricereal !== null ? await formatPrice(pricereal) : "N/A";

    return `Latest: ${pricelatestText}\nMedian: ${pricemedianText}\nReal: ${pricerealText}`;
  } catch (error) {
    console.error("Error fetching price info:", error);
    return null;
  }
};
