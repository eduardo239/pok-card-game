import { useCallback, useEffect, useState } from "react";
import { useToast } from "./context/ToastProvider";
import { blindList } from "./helper/blind";

import {
  ICard,
  drawCards,
  generateDeck,
  shuffleDeck,
  sortByRankThenSuit,
  sortBySuitThenRank,
} from "./helper";

import CardList from "./components/CardList";
import InfoCalc from "./components/info/InfoCalc";
import InfoBlind from "./components/info/InfoBlind";
import InfoOptions from "./components/info/InfoOptions";
import InputBasic from "./components/form/InputBasic";
import SelectedCardList from "./components/SelectedCardList";
import Modal from "./components/ui/Modal";
import Button from "./components/Button";
import Straight from "./components/handrank/Straight";
import FullHouse from "./components/handrank/FullHouse";
import Pair from "./components/handrank/Pair";
import HighCard from "./components/handrank/HighCard";
import TwoPair from "./components/handrank/TwoPair";
import ThreeOfAKind from "./components/handrank/ThreeOfAKind";
import Flush from "./components/handrank/Flush";
import FourOfAKind from "./components/handrank/FourOfAKind";
import Divider from "./components/ui/Divider";

import {
  evaluatePair,
  evaluateThreeOfAKind,
  evaluateFourOfAKind,
  evaluateFlush,
  evaluateStraightFlush,
  evaluateTwoPair,
  evaluateFullHouse,
} from "./helper/handrank";

const defaultHandRank = {
  multiply: 0,
  chips: 0,
  total: 0,
  name: "",
};

interface IResult {
  multiply: number;
  chips: number;
  total: number;
  name: string;
}
const defaultHandSize = 50;
const defaultHands = 1;
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
  const [handRank, setHandRank] = useState<IResult>(defaultHandRank);
  const [sortedBy, setSortedBy] = useState<"rank" | "suit">("rank");
  //

  const [score, setScore] = useState<number>(0);
  const [blinds] = useState(blindList);
  const [currentBlind, setCurrentBlind] = useState(0);
  //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWon, setIsWon] = useState(false);

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
      addToast("Select at least one card", "warning");
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

  const sort = (by: "rank" | "suit") => {
    if (by === "rank") {
      setSortedBy("rank");
      setUserDeck(sortByRankThenSuit(userDeck));
      setSelectedCards(sortByRankThenSuit(selectedCards));
    } else if (by === "suit") {
      setSortedBy("suit");
      setUserDeck(sortBySuitThenRank(userDeck));
      setSelectedCards(sortBySuitThenRank(selectedCards));
    }
  };

  const draw = () => {
    setIsWon(false);
    setUserDeck(sortByRankThenSuit(drawCards(deck, handSize)));
  };

  const validateWin = useCallback(() => {
    if (blinds[currentBlind].score < score) {
      addToast("You won!", "success");
      setIsWon(true);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blinds, currentBlind, score, reset]);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    validateWin();
  }, [validateWin]);

  useEffect(() => {
    setDeck(shuffleDeck(generateDeck()));
  }, []);

  useEffect(() => {
    // const high = evaluateHighCard(selectedCards);
    const high = null;
    const pair = evaluatePair(selectedCards);
    const three = evaluateThreeOfAKind(selectedCards);
    const four = evaluateFourOfAKind(selectedCards);
    const twoPairs = evaluateTwoPair(selectedCards);
    const flush = evaluateFlush(selectedCards);
    // const straight = evaluateStraight(selectedCards);
    const straight = null;
    const fullHouse = evaluateFullHouse(selectedCards);
    const straightFlush = evaluateStraightFlush(selectedCards);

    if (straightFlush) {
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
      <section className="grid grid-cols-4">
        {/* - - - - - - - - - - - - */}

        <div className="bg-gray-800 p-4 border-r border-r-gray-700 font-mono text-lg">
          <div>Deck: {deck.length}</div>

          <Divider />

          <InfoCalc handRank={handRank} />

          <hr className="border-t border-gray-600 my-4" />

          <InfoBlind
            blinds={blinds}
            currentBlind={currentBlind}
            score={score}
          />

          <Divider />

          <InfoOptions hands={hands} discards={discards} />

          <Divider />

          <div>Number of Cards: {handSize}</div>

          <Divider />

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
          <Button
            type="info"
            value="Run Info"
            onClick={() => setIsModalOpen(true)}
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
              disabled={hands <= 0 || userDeck.length === 0 || isWon}
            />

            <Button
              type="warning"
              value="sort by rank"
              onClick={() => sort("rank")}
            />
            <Button
              type="warning"
              value="sort by suit"
              onClick={() => sort("suit")}
            />

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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">HandRank</h2>
        <p className="mb-4">
          The hand rank is the best possible combination of cards in a hand.
        </p>

        <div className="flex flex-col gap-4 mb-4">
          <FourOfAKind />
          <FullHouse />
          <Flush />
          <Straight />
          <ThreeOfAKind />
          <TwoPair />
          <Pair />
          <HighCard />
        </div>
      </Modal>
    </main>
  );
}
