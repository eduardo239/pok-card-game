import { ICard } from "../helper";
import Card from "./Card";

interface SelectedCardListProps {
  selectedCards: ICard[];
  select: (card: ICard) => void;
  disabled?: boolean;
}

export default function SelectedCardList({
  selectedCards,
  select,
  disabled,
}: SelectedCardListProps) {
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
