"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { getAllData } from "@/app/api/api-utils";

export default function Home() {
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

  const knifesData = data.filter((item) => item.Type === "knives-gloves");
  const pistolsData = data.filter((item) => item.Type === "Pistols");
  const riflesData = data.filter((item) => item.Type === "Rifles");
  const sniperriflesData = data.filter((item) => item.Type === "Sniper Rifles");
  const smgData = data.filter((item) => item.Type === "SMGs");
  const shotgunsData = data.filter((item) => item.Type === "Shotguns");

  return (
    <main className={styles["main"]}>
      <Link href={"/all"}>
        <div className={styles["card"]}>
          <h1>Все</h1>
          <h2>Найдено: {data.length ? data.length : 0}</h2>
          <img src="../images/all_card.svg" alt="" />
        </div>
      </Link>
      <Link href={"/knifes"}>
        <div className={styles["card"]}>
          <h1>Ножи / Перчатки</h1>
          <h2>Найдено: {knifesData.length ? knifesData.length : 0}</h2>
          <img src="../images/knife_card.svg" alt="" />
        </div>
      </Link>
      <Link href={"/pistols"}>
        <div className={styles["card"]}>
          <h1>Пистолеты</h1>
          <h2>Найдено: {pistolsData.length ? pistolsData.length : 0}</h2>
          <img src="../images/pistol_card.svg" alt="" />
        </div>
      </Link>
      <Link href={"/rifles"}>
        <div className={styles["card"]}>
          <h1>Винтовки</h1>
          <h2>Найдено: {riflesData.length ? riflesData.length : 0}</h2>
          <img src="../images/rifle_card.svg" alt="" />
        </div>
      </Link>
      <Link href={"/sniperrifles"}>
        <div className={styles["card"]}>
          <h1>Снайперские винтовки</h1>
          <h2>
            Найдено: {sniperriflesData.length ? sniperriflesData.length : 0}
          </h2>
          <img src="../images/sniperrifle_card.svg" alt="" />
        </div>
      </Link>
      <Link href={"/smg"}>
        <div className={styles["card"]}>
          <h1>ПП</h1>
          <h2>Найдено: {smgData.length ? smgData.length : 0}</h2>
          <img src="../images/smg_card.svg" alt="" />
        </div>
      </Link>
      <Link href={"/shotguns"}>
        <div className={styles["card"]}>
          <h1>Дробовики</h1>
          <h2>Найдено: {shotgunsData.length ? shotgunsData.length : 0}</h2>
          <img src="../images/shotgun_card.svg" alt="" />
        </div>
      </Link>
    </main>
  );
}
