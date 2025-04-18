interface CardSimpleProps {
  suit: "diamonds" | "hearts" | "clubs" | "spades";
  value: string;
  disabled?: boolean;
}

export default function CardSimple({ suit, value, disabled }: CardSimpleProps) {
  return (
    <div className={`card ${suit} ${disabled ? "brightness-50" : ""}`}>
      <span className="text-3xl">{value}</span>
      <span className="text-3xl font-bold">
        {suit === "hearts"
          ? "♥️"
          : suit === "diamonds"
          ? "♦️"
          : suit === "clubs"
          ? "♣️"
          : "♠️"}
      </span>
    </div>
  );
}
