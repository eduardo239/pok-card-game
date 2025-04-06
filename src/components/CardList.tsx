import { ICard } from "../helper";
import Card from "./Card";

export default function CardList({
  selectedCards,
  select,
  disabled,
}: {
  selectedCards: ICard[];
  select: (card: ICard) => void;
  disabled?: boolean;
}) {
  return (
    <div className="bg-gray-800 p-4 flex flex-wrap gap-0.5 items-center min-h-[172px] overflow-x-auto">
      {selectedCards.map((card) => (
        <Card
          disabled={disabled}
          onClick={() => select(card)}
          card={card}
          key={card.id}
        />
      ))}
    </div>
  );
}
