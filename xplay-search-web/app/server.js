// Предположим, что вы используете Express.js и redis npm-пакет
const express = require("express");
const redis = require("redis");
const { promisify } = require("util");
const { getAllData } = require("./api/api-utils"); // Путь к вашему файлу с функцией получения данных

const app = express();
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

app.get("/api/data", async (req, res) => {
  try {
    const cachedData = await getAsync("cachedData");

    if (cachedData) {
      console.log("Данные взяты из кеша");
      res.json(JSON.parse(cachedData));
    } else {
      console.log("Данные загружены из API и закешированы");
      const newData = await getAllData();
      await setAsync("cachedData", JSON.stringify(newData), "EX", 86400);
      res.json(newData);
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
