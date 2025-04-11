import CardSimple from "../CardSimple";
import CalcPoints from "./CalcPoints";

export default function Straight() {
  return (
    <>
      <h2 className="text-xl text-gray-800 font-semibold">Straight</h2>
      <CalcPoints chips={30} multiply={4} />

      <div className="flex justify-center gap-0.5">
        <CardSimple suit="hearts" value="2" />
        <CardSimple suit="clubs" value="3" />
        <CardSimple suit="diamonds" value="4" />
        <CardSimple suit="spades" value="5" />
        <CardSimple suit="spades" value="6" />
      </div>
    </>
  );
}
