import Styles from "./Card.module.css";

export const Card = (props) => {
  return (
    <div className={Styles["card"]}>
      <div className={Styles["item__header"]}>
        <div className={Styles["item__info"]}>
          <p className={Styles["item__gunname"]}>M4A4</p>
          <p className={Styles["item__skinname"]}>Magnesium</p>
          <p className={Styles["item__skinexterior"]}>Factory New</p>
        </div>
        <div className={Styles["item__price"]}>
          <p>1790</p>
          <img src="/images/xcoin.svg" alt="xcoin" />
          <p>|</p>
          <p>
            1.93 <span className={Styles["currency"]}>$</span>
          </p>
        </div>
      </div>
      <div className={Styles["item__image"]}>
        <img src="/images/test.svg" alt="skinpreview" />
      </div>
      <div className={Styles["item__additional"]}>
        <p>Additional info</p>
      </div>
    </div>
  );
};
