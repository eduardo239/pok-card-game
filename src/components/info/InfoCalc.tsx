import { THandRank } from "../../helper/handrank";

export default function InfoCalc({ handRank }: { handRank: THandRank }) {
  return (
    <>
      <div>Handrank: {handRank.name}</div>
      <div>
        Chips: <span className="text-blue-500">{handRank.chips}</span>
        <span className="text-green-500"> ✕ </span>
        Multiply: <span className="text-red-500">{handRank.multiply}</span>
      </div>
      <div>Chips: {handRank.chips}</div>
      <div>Multiply: {handRank.multiply}</div>
      <div>Total: {handRank.total}</div>
    </>
  );
}
