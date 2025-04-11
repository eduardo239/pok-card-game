import CardSimple from "../CardSimple";
import CalcPoints from "./CalcPoints";

export default function HighCard() {
  return (
    <>
      <h2 className="text-xl text-gray-800 font-semibold">High Card</h2>
      <CalcPoints chips={5} multiply={1} />

      <div className="flex justify-center gap-0.5">
        <CardSimple suit="clubs" value="12" />
        <CardSimple suit="hearts" value="3" disabled={true} />
        <CardSimple suit="diamonds" value="4" disabled={true} />
        <CardSimple suit="spades" value="8" disabled={true} />
        <CardSimple suit="spades" value="9" disabled={true} />
      </div>
    </>
  );
}
