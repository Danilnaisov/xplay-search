const express = require("express");
const app = express();

app.get("/find-prices", async (req, res) => {
  try {
    // Ваш код для поиска цен
    res.send("Prices found!");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Произошла ошибка при получении данных из API.");
  }
});
app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
