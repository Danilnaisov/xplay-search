import { CardList } from "../components/CardList/CardList";
import Styles from "../page.module.css";

export default function all() {
  return (
    <div className={Styles["cardList"]}>
      <CardList />
    </div>
  );
}
