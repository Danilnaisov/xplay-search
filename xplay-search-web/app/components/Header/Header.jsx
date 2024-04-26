"use client";

import React, { useEffect, useState } from "react";
import Styles from "./Header.module.css";
import { getAllData } from "@/app/api/api-utils";
import Link from "next/link";

export const Header = () => {
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
    <div className={Styles["header"]}>
      <Link href={"/"}>
        <img src="./images/logo.svg" alt="" className={Styles["logo__img"]} />
      </Link>
      <div className={Styles["header__title"]}>
        <p className={Styles["header__subtitle"]}>Скинов найдено</p>
        <p className={Styles["header__counter"]}>
          {data.length ? data.length : "Загрузка..."}
        </p>
      </div>
    </div>
  );
};
