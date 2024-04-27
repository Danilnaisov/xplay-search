import { CardList } from "../components/CardList/CardList";

export default function all() {
  return (
    <div>
      <CardList
        types={["Pistols", "SMGs", "Rifles", "Sniper Rifles", "Shotguns"]}
      />
    </div>
  );
}
