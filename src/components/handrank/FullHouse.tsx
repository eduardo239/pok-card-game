import CardSimple from "../CardSimple";
import CalcPoints from "./CalcPoints";

export default function FullHouse() {
  return (
    <>
      <h2 className="text-xl text-gray-800 font-semibold">Full House</h2>
      <CalcPoints chips={40} multiply={4} />

      <div className="flex justify-center gap-0.5">
        <CardSimple suit="hearts" value="2" />
        <CardSimple suit="diamonds" value="2" />
        <CardSimple suit="clubs" value="2" />
        <CardSimple suit="spades" value="3" />
        <CardSimple suit="clubs" value="3" />
      </div>
    </>
  );
}
