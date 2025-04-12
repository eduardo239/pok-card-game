import { ICard } from ".";

const valueToRank: Record<string, number> = {
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

const table = {
  high: {
    chips: 5,
    multiply: 1,
  },
  pair: {
    chips: 10,
    multiply: 2,
  },
  twoPairs: {
    chips: 20,
    multiply: 2,
  },
  threeOfAKind: {
    chips: 30,
    multiply: 3,
  },
  straight: {
    chips: 30,
    multiply: 4,
  },
  flush: {
    chips: 35,
    multiply: 4,
  },
  fullHouse: {
    chips: 40,
    multiply: 4,
  },
  fourOfAKind: {
    chips: 60,
    multiply: 7,
  },
  straightFlush: {
    chips: 100,
    multiply: 8,
  },
  royalFlush: {
    chips: 100,
    multiply: 8,
  },
};

export type THandRank = {
  multiply: number;
  chips: number;
  total: number;
  name: string;
};

type THR = THandRank | null;

/**
 * Checks if there is a pair in the given selected cards and returns the computed score.
 * A pair is two cards with the same value. The computed score is the sum of all card values
 * multiplied by the score multiplier for two pairs.
 *
 * If there is no pair, it returns false and 0.
 */
export const checkPairAndScore = (selectedCards: ICard[]): THR => {
  if (selectedCards.length < 2) return null;

  const valueCount: Record<string, number> = {};

  for (const card of selectedCards) {
    valueCount[card.value] = (valueCount[card.value] || 0) + 1;
  }

  const hasPair = Object.values(valueCount).some((count) => count >= 2);

  if (!hasPair) return null;

  const total = selectedCards.reduce((sum, card) => {
    const keys = parseInt(Object.keys(valueCount)[0]);
    const values = valueCount[card.value];
    return sum + keys * values;
  }, 0);

  const computedValue = (total + table.pair.chips) * table.pair.multiply;

  return {
    multiply: table.pair.multiply,
    chips: table.pair.chips,
    total: computedValue,
    name: "Pair",
  };
};

/**
 * Checks if there are three cards with the same value in the given selected cards
 * and returns the computed score. A three-of-a-kind is three cards with the same value.
 * The computed score is the sum of all card values plus the associated chip value,
 * multiplied by the score multiplier for three-of-a-kind.
 *
 * If there is no three-of-a-kind, it returns false and 0.
 */

export const checkThreeOfAKindAndScore = (selectedCards: ICard[]): THR => {
  if (selectedCards.length < 3) return null;

  const valueCount: Record<string, number> = {};

  for (const card of selectedCards) {
    valueCount[card.value] = (valueCount[card.value] || 0) + 1;
  }

  const hasThree = Object.values(valueCount).some((count) => count >= 3);

  if (!hasThree) return null;

  const total = selectedCards.reduce(
    (sum, card) => sum + valueCount[card.value],
    0
  );
  const computedValue =
    (total + table.threeOfAKind.chips) * table.threeOfAKind.multiply;

  return {
    multiply: table.threeOfAKind.multiply,
    chips: table.threeOfAKind.chips,
    total: computedValue,
    name: "Three of a Kind",
  };
};

/**
 * Checks if there are four cards with the same value in the given selected cards
 * and returns the computed score. A four-of-a-kind is four cards with the same value.
 * The computed score is the sum of all card values plus the associated chip value,
 * multiplied by the score multiplier for four-of-a-kind.
 *
 * If there is no four-of-a-kind, it returns false and 0.
 */

export const checkFourOfAKindAndScore = (selectedCards: ICard[]): THR => {
  if (selectedCards.length < 4) return null;

  const valueCount: Record<string, number> = {};

  for (const card of selectedCards) {
    valueCount[card.value] = (valueCount[card.value] || 0) + 1;
  }

  const hasFour = Object.values(valueCount).some((count) => count >= 4);

  if (!hasFour) return null;

  const total = selectedCards.reduce(
    (sum, card) => sum + valueCount[card.value],
    0
  );
  const computedValue =
    (total + table.fourOfAKind.chips) * table.fourOfAKind.multiply;

  return {
    multiply: table.fourOfAKind.multiply,
    chips: table.fourOfAKind.chips,
    total: computedValue,
    name: "Four of a Kind",
  };
};

/**
 * Checks if there are two pairs in the given selected cards and returns the computed score.
 * Two pairs is two pairs of cards with the same value.
 * The computed score is the sum of all card values plus the associated chip value,
 * multiplied by the score multiplier for two pairs.
 *
 * If there are no two pairs, it returns false and 0.
 */
export const checkIfHasTwoPairs = (selectedCards: ICard[]): THR => {
  if (selectedCards.length < 4) {
    return null;
  }

  const valueCount: Record<string, number> = {};
  const foundPairs: string[] = [];

  for (const card of selectedCards) {
    valueCount[card.value] = (valueCount[card.value] || 0) + 1;
  }

  for (const [value, count] of Object.entries(valueCount)) {
    if (count >= 2) {
      foundPairs.push(value);
    }
  }

  const computedValue =
    (foundPairs.length + table.twoPairs.chips) * table.twoPairs.multiply;

  if (foundPairs.length >= 2) {
    return {
      multiply: table.twoPairs.multiply,
      chips: table.twoPairs.chips,
      total: computedValue,
      name: "Two Pairs",
    };
  }

  return null;
};

/**
 * Determines if the selected cards form a straight and computes the associated score.
 * A straight consists of five consecutive cards in rank.
 *
 * @param {ICard[]} selectedCards - The array of selected cards to evaluate.
 *
 * @returns {THR | null} - An object containing the score details if a straight is found,
 *                         or null if no straight exists in the selected cards.
 *
 * The score is calculated as the sum of all card ranks plus the associated chip value,
 * multiplied by the score multiplier for a straight.
 */

export const checkIfItsAStraight = (selectedCards: ICard[]): THR => {
  if (selectedCards.length < 5) {
    return null;
  }

  const sortedRanks = selectedCards
    .map((card) => card.value)
    .sort((a, b) => a - b);

  const total = sortedRanks.reduce((sum, rank) => sum + rank, 0);

  for (let i = 0; i <= sortedRanks.length - 5; i++) {
    if (
      sortedRanks[i] + 1 === sortedRanks[i + 1] &&
      sortedRanks[i] + 2 === sortedRanks[i + 2] &&
      sortedRanks[i] + 3 === sortedRanks[i + 3] &&
      sortedRanks[i] + 4 === sortedRanks[i + 4]
    ) {
      const computedValue =
        (total + table.straight.chips) * table.straight.multiply;
      return {
        multiply: table.straight.multiply,
        chips: table.straight.chips,
        total: computedValue,
        name: "Straight",
      };
    }
  }

  return null;
};

/**
 * Checks if the given selected cards form a flush, meaning all cards have the same suit.
 * @param {ICard[]} selectedCards - The cards to check.
 * @returns {THR | null} - An object containing the score details if a flush is found,
 *                         or null if no flush exists in the selected cards.
 *
 * The score is calculated as the sum of all card ranks plus the associated chip value,
 * multiplied by the score multiplier for a flush.
 */
export const checkIfItsAFlush = (selectedCards: ICard[]): THR => {
  if (selectedCards.length < 5) {
    return null;
  }

  const firstSuit = selectedCards[0].suit; // Get the suit of the first card

  if (selectedCards.every((card) => card.suit === firstSuit)) {
    const total = selectedCards.reduce((sum, card) => sum + card.value, 0);
    const computedValue = (total + table.flush.chips) * table.flush.multiply;
    return {
      multiply: table.flush.multiply,
      chips: table.flush.chips,
      total: computedValue,
      name: "Flush",
    };
  } else {
    return null;
  }
};

/**
 * Determines if the selected cards form a full house and computes the associated score.
 * A full house consists of three cards of one rank and two cards of another rank.
 *
 * @param {ICard[]} selectedCards - The array of selected cards to evaluate.
 *
 * @returns {THR | null} - An object containing the score details if a full house is found,
 *                         or null if no full house exists in the selected cards.
 *
 * The score is calculated as the sum of all card ranks plus the associated chip value,
 * multiplied by the score multiplier for a full house.
 */
export const checkIfItsAFullHouse = (selectedCards: ICard[]): THR => {
  if (selectedCards.length < 5) {
    return null;
  }

  const valueCount: Record<string, number> = {};

  // Count occurrences of each card value
  for (const card of selectedCards) {
    valueCount[card.value] = (valueCount[card.value] || 0) + 1;
  }

  let hasThree = false;
  let hasTwo = false;

  // Check for a three-of-a-kind and a pair
  for (const count of Object.values(valueCount)) {
    if (count === 3) {
      hasThree = true;
    } else if (count === 2) {
      hasTwo = true;
    }
  }

  if (hasThree && hasTwo) {
    const total = selectedCards.reduce((sum, card) => {
      const keys = parseInt(Object.keys(valueCount)[0]);
      const values = valueCount[card.value];
      return sum + keys * values;
    }, 0);

    const computedValue =
      (total + table.fullHouse.chips) * table.fullHouse.multiply;
    return {
      multiply: table.fullHouse.multiply,
      chips: table.fullHouse.chips,
      total: computedValue,
      name: "Full House",
    };
  } else {
    return null;
  }
};

/**
 * Checks if the given selected cards form a straight flush, meaning the cards have the same suit
 * and are in sequential order.
 * @param {ICard[]} selectedCards - The cards to check.
 * @returns {THR | null} - An object containing the score details if a straight flush is found,
 *                         or null if no straight flush exists in the selected cards.
 *
 * The score is calculated as the sum of all card ranks plus the associated chip value,
 * multiplied by the score multiplier for a straight flush.
 */
export const checkIfItsAStraightFlush = (selectedCards: ICard[]): THR => {
  if (selectedCards.length < 5) {
    return null;
  }

  // Group cards by suit
  const suitGroups: Record<string, number[]> = {};

  for (const card of selectedCards) {
    const rank = valueToRank[card.value];

    if (!suitGroups[card.suit]) {
      suitGroups[card.suit] = [];
    }
    suitGroups[card.suit].push(rank);
  }

  // Check if any suit group contains a straight sequence
  for (const ranks of Object.values(suitGroups)) {
    if (ranks.length >= 5) {
      // Sort and remove duplicates
      const sortedRanks = [...new Set(ranks)].sort((a, b) => a - b);

      // Check for any 5 consecutive numbers
      for (let i = 0; i <= sortedRanks.length - 5; i++) {
        if (
          sortedRanks[i] + 1 === sortedRanks[i + 1] &&
          sortedRanks[i + 1] + 1 === sortedRanks[i + 2] &&
          sortedRanks[i + 2] + 1 === sortedRanks[i + 3] &&
          sortedRanks[i + 3] + 1 === sortedRanks[i + 4]
        ) {
          const total = sortedRanks.reduce((sum, rank) => sum + rank, 0);
          const computedValue =
            (total + table.straightFlush.chips) * table.straightFlush.multiply;
          return {
            multiply: table.straightFlush.multiply,
            chips: table.straightFlush.chips,
            total: computedValue,
            name: "Straight Flush",
          };
        }
      }
    }
  }
  return null;
};

/**
 * Checks if the given selected cards form a Royal Flush and returns the computed score.
 * A Royal Flush consists of the ace, king, queen, jack, and ten of a single suit.
 *
 * @param {ICard[]} selectedCards - The array of selected cards to evaluate.
 *
 * @returns {THR | null} - An object containing the score details if a Royal Flush is found,
 *                         or null if no Royal Flush exists in the selected cards.
 *
 * The score is calculated as the sum of all card ranks plus the associated chip value,
 * multiplied by the score multiplier for a Royal Flush.
 */
export const checkIfItsARoyalFlush = (selectedCards: ICard[]): THR => {
  if (selectedCards.length < 5) {
    return null;
  }
  const hasRoyalFlush = selectedCards.every((card) => {
    const rank = valueToRank[card.value];
    return (
      rank === 10 || rank === 11 || rank === 12 || rank === 13 || rank === 14
    );
  });
  if (!hasRoyalFlush) {
    return null;
  }
  const total = selectedCards.reduce(
    (sum, card) => sum + valueToRank[card.value],
    0
  );
  const computedValue =
    (total + table.royalFlush.chips) * table.royalFlush.multiply;
  return {
    multiply: table.royalFlush.multiply,
    chips: table.royalFlush.chips,
    total: computedValue,
    name: "Royal Flush",
  };
};

/**
 * Checks if the given selected cards do not form any other known hand rank,
 * such as a pair, two pairs, three of a kind, straight, flush, full house,
 * four of a kind, straight flush, or royal flush.
 * @param {ICard[]} selectedCards - The cards to check.
 * @returns {THR | null} - An object containing the score details if a high card is found,
 *                         or null if no high card exists in the selected cards.
 *
 * The score is calculated as the sum of all card ranks plus the associated chip value,
 * multiplied by the score multiplier for a high card.
 */
export const checkIfItsAHighCard = (selectedCards: ICard[]): THR => {
  if (selectedCards.length < 1) {
    return null;
  }

  // sort cards by value
  const sortedCards = [...selectedCards].sort((a, b) => {
    const rankA = valueToRank[a.value];
    const rankB = valueToRank[b.value];
    return rankB - rankA;
  });

  const computedValue = (sortedCards[0].value + table.high.chips) * 1;

  return {
    multiply: table.high.multiply,
    chips: table.high.chips,
    total: computedValue,
    name: "High Card",
  };
};
