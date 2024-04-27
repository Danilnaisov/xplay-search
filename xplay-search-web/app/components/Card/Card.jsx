import Styles from "./Card.module.css";
import { useRouter } from "next/navigation";

export const Card = (props) => {
  const steamClick = (e) => {
    e.preventDefault();
    window.open(
      `https://steamcommunity.com/market/listings/730/${link}`,
      "_blank"
    );
  };

  const xplayClick = (e) => {
    e.preventDefault();
    window.open(`https://xplay.gg/ru/store?itemId=${props.ID}`, "_blank");
  };

  const link = `${encodeURIComponent(
    props.WeaponName
  )}%20%7C%20${encodeURIComponent(props.SkinName)}%20%28${encodeURIComponent(
    props.Exterior
  )}%29`;

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
          className={Styles["preview__image"]}
          src={`https://cdn.xplay.cloud/img/store/${props.ID}_icon.png`}
          alt="skinpreview"
        />
        <img
          className={Styles["rarity__image"]}
          src={`/images/${props.Rarity.replace(" ", "")}.svg`}
          alt="raritypreview"
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
      <div className={Styles["item__links"]}>
        <img src="/images/steam.svg" alt="" onClick={steamClick} />
        <img src="/images/link.svg" alt="" onClick={xplayClick} />
      </div>
    </div>
  );
};
