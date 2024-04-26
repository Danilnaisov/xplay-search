"use client";

import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import Styles from "./CardList.module.css";
import { getAllData } from "@/app/api/api-utils";

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
  return (
    <div className={Styles["page"]}>
      {data.length === 0 ? (
        <div className={Styles["datat__not-found"]}>
          <h3>Нет скинов в данной категории</h3>
        </div>
      ) : (
        <>
          <div className={Styles["cardList"]}>
            {data.map((data) => (
              <Card type={props.type} {...data} />
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
