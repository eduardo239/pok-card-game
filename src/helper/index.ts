export type TSuit = "hearts" | "diamonds" | "clubs" | "spades";
export type TRank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export interface ICard {
  id: string;
  suit: TSuit;
  rank: TRank;
  value: number;
  toString: () => string;
}

const rankOrder: Record<TRank, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const suitOrder: Record<TSuit, number> = {
  diamonds: 1,
  clubs: 2,
  hearts: 3,
  spades: 4,
};

export function generateDeck(): ICard[] {
  const suits: TSuit[] = ["hearts", "diamonds", "clubs", "spades"];
  const ranks: TRank[] = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  const deck: ICard[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        id: `${suit}-${rank}`,
        suit,
        rank,
        value: ranks.indexOf(rank) + 2,
        toString: function () {
          return `${this.rank} of ${this.suit}`;
        },
      });
    }
  }

  return deck;
}

export function shuffleDeck(deck: ICard[]): ICard[] {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function sortBySuitThenRank(deck: ICard[]): ICard[] {
  return [...deck].sort((a, b) => {
    // First compare suits
    const suitComparison = suitOrder[a.suit] - suitOrder[b.suit];
    if (suitComparison !== 0) return suitComparison;

    // If suits are equal, compare ranks
    return rankOrder[a.rank] - rankOrder[b.rank];
  });
}

export function sortByRankThenSuit(deck: ICard[]): ICard[] {
  return [...deck].sort((a, b) => {
    // First compare ranks
    const rankComparison = rankOrder[a.rank] - rankOrder[b.rank];
    if (rankComparison !== 0) return rankComparison;

    // If ranks are equal, compare suits
    return suitOrder[a.suit] - suitOrder[b.suit];
  });
}

export function drawCards(deck: ICard[], n: number): ICard[] {
  if (n > deck.length) {
    throw new Error(
      `Cannot draw ${n} cards from a deck with only ${deck.length} cards remaining`
    );
  }

  // Remove n cards from the beginning of the deck
  const drawnCards = deck.splice(0, n);

  return drawnCards;
}
