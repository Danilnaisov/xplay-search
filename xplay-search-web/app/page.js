import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles["main"]}>
      <div className={styles["card"]}>
        <h1>Все</h1>
        <h2>Найдено: 254</h2>
        <img src="../images/all_card.svg" alt="" />
      </div>
      <div className={styles["card"]}>
        <h1>Все</h1>
        <h2>Найдено: 254</h2>
        <img src="../images/knife_card.svg" alt="" />
      </div>
      <div className={styles["card"]}>
        <h1>Все</h1>
        <h2>Найдено: 254</h2>
        <img src="../images/pistol_card.svg" alt="" />
      </div>
      <div className={styles["card"]}>
        <h1>Все</h1>
        <h2>Найдено: 254</h2>
        <img src="../images/riffle_card.svg" alt="" />
      </div>
      <div className={styles["card"]}>
        <h1>Все</h1>
        <h2>Найдено: 254</h2>
        <img src="../images/sniperriffle_card.svg" alt="" />
      </div>
      <div className={styles["card"]}>
        <h1>Все</h1>
        <h2>Найдено: 254</h2>
        <img src="../images/smg_card.svg" alt="" />
      </div>
      <div className={styles["card"]}>
        <h1>Все</h1>
        <h2>Найдено: 254</h2>
        <img src="../images/shotgun_card.svg" alt="" />
      </div>
    </main>
  );
}
