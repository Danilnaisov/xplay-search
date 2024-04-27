import Styles from "./Card.module.css";

export const Card = (props) => {
  return (
    <div className={Styles["card"]}>
      <div className={Styles["item__header"]}>
        <div className={Styles["item__info"]}>
          <p className={Styles["item__gunname"]}>
            {props.WeaponName.replace("StatTrak™", "ST™")}
          </p>
          <p className={Styles["item__skinname"]}>{props.SkinName}</p>
          <p className={Styles["item__skinexterior"]}>{props.Exterior}</p>
        </div>
        <div className={Styles["item__price"]}>
          <p>{props.XPrice}</p>
          <img src="/images/xcoin.svg" alt="xcoin" />
          <p>|</p>
          <p>
            1.93 <span className={Styles["currency"]}>$</span>
          </p>
        </div>
      </div>
      <div className={Styles["item__image"]}>
        <img
          src={`https://cdn.xplay.cloud/img/store/${props.ID}_icon.png`}
          alt="skinpreview"
        />
      </div>
      <div className={Styles["item__additional"]}>
        <p>
          {[
            { condition: props.IsDrop, text: "ДРОП" },
            { condition: props.ForPremium, text: "ПРЕМИУМ" },
            { condition: props.TradeBan, text: "Трейд Бан" },
          ]
            .filter((item) => item.condition === 1)
            .map((item) => item.text)
            .join(" & ")}
        </p>
      </div>
    </div>
  );
};
