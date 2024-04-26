import Styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={Styles["header"]}>
      <img src="./images/logo.svg" alt="" className={Styles["logo__img"]} />
      <div className={Styles["header__title"]}>
        <p className={Styles["header__subtitle"]}>Скинов найдено</p>
        <p className={Styles["header__counter"]}>254</p>
      </div>
    </div>
  );
};
