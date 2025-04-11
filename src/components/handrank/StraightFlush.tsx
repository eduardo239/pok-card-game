import CardSimple from "../CardSimple";
import CalcPoints from "./CalcPoints";

export default function StraightFlush() {
  return (
    <>
      <h2 className="text-xl text-gray-800 font-semibold">Straight Flush</h2>
      <CalcPoints chips={100} multiply={8} />

      <div className="flex justify-center gap-0.5">
        <CardSimple suit="clubs" value="8" />
        <CardSimple suit="clubs" value="9" />
        <CardSimple suit="clubs" value="10" />
        <CardSimple suit="clubs" value="11" />
        <CardSimple suit="clubs" value="12" />
      </div>
    </>
  );
}
