import { useCallback, useEffect, useState } from "react";
import {
  ICard,
  drawCards,
  generateDeck,
  shuffleDeck,
  sortByRankThenSuit,
  sortBySuitThenRank,
} from "./helper";
import Button from "./components/Button";
import {
  checkIfItsAHighCard,
  checkIfItsAFlush,
  checkIfItsAFullHouse,
  checkIfItsARoyalFlush,
  checkIfItsAStraightFlush,
  checkFourOfAKindAndScore,
  checkIfHasTwoPairs,
  checkIfItsAStraight,
  checkPairAndScore,
  checkThreeOfAKindAndScore,
  THandRank,
} from "./helper/handrank";
import CardList from "./components/CardList";
import { blindList } from "./helper/blind";
import InfoCalc from "./components/info/InfoCalc";
import InfoBlind from "./components/info/InfoBlind";
import InfoOptions from "./components/info/InfoOptions";
import InputBasic from "./components/form/InputBasic";
import SelectedCardList from "./components/SelectedCardList";
import { useToast } from "./context/ToastProvider";

const defaultHandRank = {
  multiply: 0,
  chips: 0,
  total: 0,
  name: "",
};

const defaultHandSize = 8;
const defaultHands = 10;
const defaultDiscards = 10;

export default function App() {
  const { addToast } = useToast();
  //
  const [handSize, setHandSize] = useState<number>(defaultHandSize);
  const [hands, setHands] = useState<number>(defaultHands);
  const [discards, setDiscards] = useState<number>(defaultDiscards);
  //
  const [deck, setDeck] = useState<ICard[]>([]);
  const [userDeck, setUserDeck] = useState<ICard[]>([]);
  const [selectedCards, setSelectedCards] = useState<ICard[]>([]);
  //
  const [handRank, setHandRank] = useState<THandRank>(defaultHandRank);
  const [sortedBy, setSortedBy] = useState<"rank" | "suit">("rank");
  //

  const [score, setScore] = useState<number>(0);
  const [blinds] = useState(blindList);
  const [currentBlind, setCurrentBlind] = useState(0);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const reset = useCallback(() => {
    // next blind
    setCurrentBlind(currentBlind + 1);
    // reset score
    setScore(0);
    // reset game
    setDeck(shuffleDeck(generateDeck()));
    setSelectedCards([]);
    setUserDeck([]);

    setHands(defaultHands);
    setDiscards(defaultDiscards);

    setHandRank(defaultHandRank);
    console.log("reset game");
  }, [currentBlind]);

  const play = () => {
    if (selectedCards.length === 0) {
      console.log("no cards selected");
      return;
    }

    if (hands === 0) {
      console.log("no more hands");
      return;
    }
    setScore(score + handRank.total);
    if (discards > 0) discard();
    setHands(hands - 1);

    // remove selected cards from deck
    const filtered = deck.filter((card) => !selectedCards.includes(card));
    setDeck(filtered);

    // empty selected cards
    setSelectedCards([]);
  };

  const discard = () => {
    // remove selected cards from user deck
    const filtered = userDeck.filter((card) => !selectedCards.includes(card));
    setUserDeck(filtered);
    // replace selected cards with new cards
    const newOnes = drawCards(deck, selectedCards.length);

    if (sortedBy === "rank") {
      setUserDeck(sortByRankThenSuit([...filtered, ...newOnes]));
    } else {
      setUserDeck(sortBySuitThenRank([...filtered, ...newOnes]));
    }
    // empty selected cards
    setSelectedCards([]);
    setDiscards(discards - 1);
  };

  const select = (card: ICard) => {
    // check if cards is already selected
    if (selectedCards.includes(card)) {
      setSelectedCards(selectedCards.filter((c) => c !== card));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const sortByRank = () => {
    setSortedBy("rank");
    setUserDeck(sortByRankThenSuit(userDeck));
    setSelectedCards(sortByRankThenSuit(selectedCards));
  };

  const sortBySuit = () => {
    setSortedBy("suit");
    setUserDeck(sortBySuitThenRank(userDeck));
    setSelectedCards(sortBySuitThenRank(selectedCards));
  };

  const draw = () => {
    setUserDeck(sortByRankThenSuit(drawCards(deck, handSize)));
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    if (blinds[currentBlind].score < score) {
      addToast("You win!", "success");
      reset();
    }
  }, [blinds, currentBlind, score, addToast, reset]);

  useEffect(() => {
    setDeck(shuffleDeck(generateDeck()));
  }, []);

  useEffect(() => {
    const high = checkIfItsAHighCard(selectedCards);
    const pair = checkPairAndScore(selectedCards);
    const three = checkThreeOfAKindAndScore(selectedCards);
    const four = checkFourOfAKindAndScore(selectedCards);
    const twoPairs = checkIfHasTwoPairs(selectedCards);
    const flush = checkIfItsAFlush(selectedCards);
    const straight = checkIfItsAStraight(selectedCards);
    const fullHouse = checkIfItsAFullHouse(selectedCards);
    const straightFlush = checkIfItsAStraightFlush(selectedCards);
    const royalFlush = checkIfItsARoyalFlush(selectedCards);

    if (royalFlush) {
      setHandRank(royalFlush);
    } else if (straightFlush) {
      setHandRank(straightFlush);
    } else if (four) {
      setHandRank(four);
    } else if (fullHouse) {
      setHandRank(fullHouse);
    } else if (flush) {
      setHandRank(flush);
    } else if (straight) {
      setHandRank(straight);
    } else if (twoPairs) {
      setHandRank(twoPairs);
    } else if (three) {
      setHandRank(three);
    } else if (pair) {
      setHandRank(pair);
    } else if (high) {
      setHandRank(high);
    }
  }, [selectedCards]);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  return (
    <main className="text-white bg-gray-800 min-h-screen border-4 border-gray-700">
      <section className="grid grid-cols-4 ">
        {/* - - - - - - - - - - - - */}

        <div className="bg-gray-800 p-4 border-r border-r-gray-700 font-mono text-lg">
          <div>Deck: {deck.length}</div>

          <hr className="border-t border-gray-600 my-4 " />

          <InfoCalc handRank={handRank} />

          <hr className="border-t border-gray-600 my-4" />

          <InfoBlind
            blinds={blinds}
            currentBlind={currentBlind}
            score={score}
          />

          <hr className="border-t border-gray-600 my-4" />

          <InfoOptions hands={hands} discards={discards} />

          <hr className="border-t border-gray-600 my-4" />

          <div>Number of Cards: {handSize}</div>

          <hr className="border-t border-gray-600 my-4" />

          <InputBasic
            label="Hands"
            value={hands}
            onChange={(e) => setHands(Number(e.target.value))}
          />

          <InputBasic
            label="Discards"
            value={discards}
            onChange={(e) => setDiscards(Number(e.target.value))}
          />

          <InputBasic
            label="Hand Size"
            value={handSize}
            onChange={(e) => setHandSize(Number(e.target.value))}
          />
        </div>

        {/* - - - - - - - - - - - - */}
        <div className="col-span-3  min-h-screen p-4">
          {/*  */}

          <SelectedCardList selectedCards={selectedCards} select={select} />

          {/*  */}

          <CardList
            disabled={selectedCards.length >= 5}
            userDeck={userDeck}
            selectedCards={selectedCards}
            select={select}
          />

          {/*  */}
          <div className="bg-gray-800 p-4 flex flex-wrap gap-1 items-center">
            <Button
              type="success"
              value={`play: ${hands}`}
              onClick={play}
              disabled={hands <= 0 || userDeck.length === 0}
            />

            <Button type="warning" value="sort by suit" onClick={sortBySuit} />
            <Button type="warning" value="sort by rank" onClick={sortByRank} />

            <Button
              type="error"
              value={`discard: ${discards}`}
              onClick={discard}
              disabled={discards <= 0}
            />

            <Button
              type="info"
              value={currentBlind === 0 ? "start" : "next blind"}
              onClick={draw}
              disabled={deck.length !== 52}
            />
          </div>

          {/* - - - - - - - - - - - - */}
        </div>
      </section>
    </main>
  );
}
