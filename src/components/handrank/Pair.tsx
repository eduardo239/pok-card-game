import CardSimple from "../CardSimple";
import CalcPoints from "./CalcPoints";

export default function Pair() {
  return (
    <>
      <h2 className="text-xl text-gray-800 font-semibold">Pair</h2>
      <CalcPoints chips={10} multiply={2} />
      <div className="flex justify-center gap-0.5">
        <CardSimple suit="hearts" value="3" />
        <CardSimple suit="clubs" value="3" />
        <CardSimple suit="diamonds" value="4" disabled={true} />
        <CardSimple suit="spades" value="8" disabled={true} />
        <CardSimple suit="spades" value="9" disabled={true} />
      </div>
    </>
  );
}
