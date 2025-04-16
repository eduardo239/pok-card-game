import { TABLE } from "./chips";

// Define the types for suits and ranks
type TSuit = "hearts" | "diamonds" | "clubs" | "spades";
type TRank =
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
  | "K"
  | "A";

// Card interface
interface ICard {
  id: string;
  suit: TSuit;
  rank: TRank;
  value: number;
  toString: () => string;
}

interface IResult {
  name: string;
  total: number;
  chips: number;
  multiply: number;
}

export function evaluatePair(cards: ICard[]): IResult | null {
  if (cards.length < 2) return null;

  const valueCount: Record<number, ICard[]> = {};

  for (const card of cards) {
    if (!valueCount[card.value]) {
      valueCount[card.value] = [];
    }
    valueCount[card.value].push(card);
  }

  const pairs = Object.values(valueCount).filter((group) => group.length === 2);

  if (pairs.length === 1) {
    const pairValueSum = pairs[0].reduce((sum, card) => sum + card.value, 0);
    const total = pairValueSum + TABLE.pair.chips * TABLE.pair.multiply;

    return {
      name: "Pair",
      total,
      chips: TABLE.pair.chips,
      multiply: TABLE.pair.multiply,
    };
  }

  return null;
}

export function evaluateThreeOfAKind(cards: ICard[]): IResult | null {
  if (cards.length < 3) return null;

  const valueCount: Record<number, ICard[]> = {};

  for (const card of cards) {
    if (!valueCount[card.value]) {
      valueCount[card.value] = [];
    }
    valueCount[card.value].push(card);
  }

  const triplets = Object.values(valueCount).filter(
    (group) => group.length === 3
  );

  if (triplets.length === 1) {
    const tripletValueSum = triplets[0].reduce(
      (sum, card) => sum + card.value,
      0
    );
    const total =
      tripletValueSum + TABLE.threeOfAKind.chips * TABLE.threeOfAKind.multiply;

    return {
      name: "Three of a Kind",
      total,
      chips: TABLE.threeOfAKind.chips,
      multiply: TABLE.threeOfAKind.multiply,
    };
  }

  return null;
}

export function evaluateFourOfAKind(cards: ICard[]): IResult | null {
  if (cards.length < 4) return null;

  const valueCount: Record<number, ICard[]> = {};

  for (const card of cards) {
    if (!valueCount[card.value]) {
      valueCount[card.value] = [];
    }
    valueCount[card.value].push(card);
  }

  const quads = Object.values(valueCount).filter((group) => group.length === 4);

  if (quads.length === 1) {
    const quadValueSum = quads[0].reduce((sum, card) => sum + card.value, 0);
    const total =
      quadValueSum + TABLE.fourOfAKind.chips * TABLE.fourOfAKind.multiply;

    return {
      name: "Four of a Kind",
      total,
      chips: TABLE.fourOfAKind.chips,
      multiply: TABLE.fourOfAKind.multiply,
    };
  }

  return null;
}

export function evaluateFlush(cards: ICard[]): IResult | null {
  if (cards.length !== 5) return null;

  const firstSuit = cards[0].suit;
  const isFlush = cards.every((card) => card.suit === firstSuit);

  if (isFlush) {
    const valueSum = cards.reduce((sum, card) => sum + card.value, 0);
    const total = valueSum + TABLE.flush.chips * TABLE.flush.multiply;

    return {
      name: "Flush",
      total,
      chips: TABLE.flush.chips,
      multiply: TABLE.flush.multiply,
    };
  }

  return null;
}

export function evaluateStraight(cards: ICard[]): IResult | null {
  if (cards.length !== 5) return null;

  const sorted = [...cards].map((card) => card.value).sort((a, b) => a - b);

  const isSequential = sorted.every((rank, i, arr) => {
    if (i === 0) return true;
    return rank === arr[i - 1] + 1;
  });

  if (!isSequential) return null;

  const total =
    cards.reduce((sum, card) => sum + card.value, 0) +
    TABLE.straight.chips * TABLE.straight.multiply;

  return {
    name: "Straight",
    total,
    chips: TABLE.straight.chips,
    multiply: TABLE.straight.multiply,
  };
}

export function evaluateStraightFlush(cards: ICard[]): IResult | null {
  if (cards.length !== 5) return null;

  // 1. Check for same suit
  const firstSuit = cards[0].suit;
  const isFlush = cards.every((card) => card.suit === firstSuit);

  if (!isFlush) return null;

  // 2. Check for sequence
  const sorted: ICard[] = [...cards].sort((a, b) => a.value - b.value);
  const isSequential = sorted.every((card, i, arr) => {
    if (i === 0) return true;
    return card.value === arr[i - 1].value + 1;
  });

  if (!isSequential) return null;

  const valueSum = cards.reduce((sum, card) => sum + card.value, 0);
  const total =
    valueSum + TABLE.straightFlush.chips * TABLE.straightFlush.multiply;

  return {
    name: "Straight Flush",
    total,
    chips: TABLE.straightFlush.chips,
    multiply: TABLE.straightFlush.multiply,
  };
}

export function evaluateTwoPair(cards: ICard[]): IResult | null {
  if (cards.length < 2 || cards.length > 5) return null;

  const valueCount: Record<number, ICard[]> = {};

  for (const card of cards) {
    if (!valueCount[card.value]) {
      valueCount[card.value] = [];
    }
    valueCount[card.value].push(card);
  }

  const pairs = Object.values(valueCount).filter((group) => group.length === 2);

  if (pairs.length >= 2) {
    const pairValueSum = pairs
      .slice(0, 2) // take only the first 2 pairs
      .flat()
      .reduce((sum, card) => sum + card.value, 0);

    const total: number =
      pairValueSum + TABLE.twoPairs.chips * TABLE.twoPairs.multiply;

    return {
      name: "Two Pair",
      total,
      chips: TABLE.twoPairs.chips,
      multiply: TABLE.twoPairs.multiply,
    };
  }

  return null;
}

export function evaluateFullHouse(cards: ICard[]): IResult | null {
  if (cards.length !== 5) return null;

  const valueCount: Record<number, ICard[]> = {};

  for (const card of cards) {
    if (!valueCount[card.value]) {
      valueCount[card.value] = [];
    }
    valueCount[card.value].push(card);
  }

  const groups = Object.values(valueCount);

  const hasThree = groups.some((group) => group.length === 3);
  const hasTwo = groups.some((group) => group.length === 2);

  if (groups.length === 2 && hasThree && hasTwo) {
    const valueSum = cards.reduce((sum, card) => sum + card.value, 0);
    const total = valueSum + TABLE.fullHouse.chips * TABLE.fullHouse.multiply;

    return {
      name: "Full House",
      total,
      chips: TABLE.fullHouse.chips,
      multiply: TABLE.fullHouse.multiply,
    };
  }

  return null;
}

export function evaluateHighCard(cards: ICard[]): IResult | null {
  if (cards.length === 0 || cards.length > 5) return null;

  const highestCard = cards.reduce((max, card) =>
    card.value > max.value ? card : max
  );

  const total = highestCard.value + TABLE.high.chips * TABLE.high.multiply;

  return {
    name: "High Card",
    total,
    chips: TABLE.high.chips,
    multiply: TABLE.high.multiply,
  };
}
