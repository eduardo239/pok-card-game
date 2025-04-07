import { ICard } from "../helper";
import Card from "./Card";

export default function CardList({
  userDeck,
  selectedCards,
  select,
  disabled,
}: {
  userDeck: ICard[];
  selectedCards: ICard[];
  select: (card: ICard) => void;
  disabled?: boolean;
}) {
  return (
    <div className="bg-gray-800 p-4 flex flex-wrap gap-0.5 items-center min-h-[172px] overflow-x-auto">
      {userDeck.map((card) => {
        const selected = selectedCards.some((c) => c.id === card.id);
        return (
          <Card
            disabled={disabled}
            onClick={() => select(card)}
            card={card}
            key={card.id}
            selected={selected}
          />
        );
      })}
    </div>
  );
}
