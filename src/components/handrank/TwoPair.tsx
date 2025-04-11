import CardSimple from "../CardSimple";
import CalcPoints from "./CalcPoints";

export default function TwoPair() {
  return (
    <>
      <h2 className="text-xl text-gray-800 font-semibold">Two Pair</h2>
      <CalcPoints chips={20} multiply={2} />

      <div className="flex justify-center gap-0.5">
        <CardSimple suit="clubs" value="12" />
        <CardSimple suit="hearts" value="12" />
        <CardSimple suit="diamonds" value="8" />
        <CardSimple suit="spades" value="8" />
        <CardSimple suit="spades" value="9" disabled={true} />
      </div>
    </>
  );
}
