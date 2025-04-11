import CardSimple from "../CardSimple";
import CalcPoints from "./CalcPoints";

export default function FourOfAKind() {
  return (
    <>
      <h2 className="text-xl text-gray-800 font-semibold">Four of a Kind</h2>
      <CalcPoints chips={60} multiply={7} />

      <div className="flex justify-center gap-0.5">
        <CardSimple suit="hearts" value="2" disabled={true} />
        <CardSimple suit="diamonds" value="11" />
        <CardSimple suit="hearts" value="11" />
        <CardSimple suit="clubs" value="11" />
        <CardSimple suit="spades" value="11" />
      </div>
    </>
  );
}
