import { ICard } from "../helper";

export default function Card({
  card,
  onClick,
  disabled,
}: {
  card: ICard;
  onClick: () => void;
  disabled?: boolean;
  userDeck?: ICard[];
}) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`card ${
        card.suit === "hearts"
          ? "hearts"
          : card.suit === "diamonds"
          ? "diamonds"
          : card.suit === "clubs"
          ? "clubs"
          : "spades"
      }`}
    >
      <span className="text-3xl">{card.value}</span>
      <span className="text-3xl font-bold">
        {card.suit === "hearts"
          ? "♥️"
          : card.suit === "diamonds"
          ? "♦️"
          : card.suit === "clubs"
          ? "♣️"
          : "♠️"}
      </span>
    </div>
  );
}
