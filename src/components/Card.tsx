import { ICard } from "../helper";

interface CardProps {
  card: ICard;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export default function Card({ card, onClick, disabled, selected }: CardProps) {
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
      } ${selected ? "brightness-50" : ""}`}
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
