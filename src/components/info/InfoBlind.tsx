interface InfoBlindProps {
  blinds: { name: string; score: number }[];
  currentBlind: number;
  score: number;
}

export default function InfoBlind({
  blinds,
  currentBlind,
  score,
}: InfoBlindProps) {
  return (
    <>
      <div>Name: {blinds[currentBlind].name}</div>
      <div className="text-4xl text-orange-400">
        Blind: {blinds[currentBlind].score}
      </div>
      <div className="text-2xl text-green-400">Score: {score}</div>
    </>
  );
}
