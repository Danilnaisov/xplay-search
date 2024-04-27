"use client";

import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import Styles from "./CardList.module.css";
import { getAllData } from "@/app/api/api-utils";
import { Preloader } from "../Preloader/Preloader";

export const CardList = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllData();
        setData(result);
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => props.types.includes(item.Type));

  return (
    <div className={Styles["page"]}>
      {filteredData.length === 0 ? (
        <div className={Styles["data__not-found"]}>
          <Preloader />
        </div>
      ) : (
        <>
          <div className={Styles["cardList"]}>
            {filteredData.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
          <div className={Styles["filter"]}>
            <div className={Styles["filter__category"]}>
              <h2>Фильтр</h2>
              <div className={Styles["filter__quality"]}>
                <h3>Качество:</h3>
                <ul>
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        id="factory_new"
                        name="quality"
                        value="factory_new"
                      />{" "}
                      Прямо с завода
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        id="minimal_wear"
                        name="quality"
                        value="minimal_wear"
                      />{" "}
                      Немного поношенное
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        id="field_tested"
                        name="quality"
                        value="field_tested"
                      />{" "}
                      После полевых испытаний
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        id="well_worn"
                        name="quality"
                        value="well_worn"
                      />{" "}
                      Поношенное
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        id="battle_scarred"
                        name="quality"
                        value="battle_scarred"
                      />{" "}
                      Закаленное в боях
                    </label>
                  </li>
                </ul>
              </div>
              <div className={Styles["filter__type"]}>
                <h3>Тип:</h3>
                <ul>
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        id="withdrawable"
                        name="type"
                        value="withdrawable"
                      />{" "}
                      Доступные к выводу
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        id="market"
                        name="type"
                        value="market"
                      />{" "}
                      Магазин
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        id="premium"
                        name="type"
                        value="premium"
                      />{" "}
                      Премиум
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        id="drop"
                        name="type"
                        value="drop"
                      />{" "}
                      Дроп
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
