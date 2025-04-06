export default function InfoBlind({
  blinds,
  currentBlind,
  score,
}: {
  blinds: { name: string; score: number }[];
  currentBlind: number;
  score: number;
}) {
  return (
    <>
      <div>Name: {blinds[currentBlind].name}</div>
      <div className="text-4xl text-orange-400">
        Blind: {blinds[currentBlind].score}
      </div>
      <div className="text-3xl text-green-400">Score: {score}</div>
    </>
  );
}
