import { endpoints } from "./config";

export const getAllData = async () => {
  try {
    const response = await fetch(endpoints.data);
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных");
    }
    const data = await response.json();

    if (!data || !data.items || !Array.isArray(data.items)) {
      throw new Error("Ошибка: неверный формат данных");
    }

    return data.items;
  } catch (error) {
    console.error("Произошла ошибка:", error);
    return null;
  }
};

export const getNoneDropData = async () => {
  try {
    const response = await fetch(endpoints.data);
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных");
    }
    const data = await response.json();

    const items = data.items.filter((item) => item.IsDrop === 0);

    return items;
  } catch (error) {
    console.error("Произошла ошибка:", error);
    return null;
  }
};
