import CardSimple from "../CardSimple";
import CalcPoints from "./CalcPoints";

export default function ThreeOfAKind() {
  return (
    <>
      <h2 className="text-xl text-gray-800 font-semibold">Three of a Kind</h2>
      <CalcPoints chips={30} multiply={3} />

      <div className="flex justify-center gap-0.5">
        <CardSimple suit="clubs" value="12" />
        <CardSimple suit="hearts" value="12" />
        <CardSimple suit="diamonds" value="12" />
        <CardSimple suit="spades" value="8" disabled={true} />
        <CardSimple suit="spades" value="9" disabled={true} />
      </div>
    </>
  );
}
