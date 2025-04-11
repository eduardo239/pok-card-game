import CardSimple from "../CardSimple";
import CalcPoints from "./CalcPoints";

export default function Flush() {
  return (
    <>
      <h2 className="text-xl text-gray-800 font-semibold">Flush</h2>
      <CalcPoints chips={35} multiply={4} />

      <div className="flex justify-center gap-0.5">
        <CardSimple suit="hearts" value="2" />
        <CardSimple suit="hearts" value="6" />
        <CardSimple suit="hearts" value="8" />
        <CardSimple suit="hearts" value="10" />
        <CardSimple suit="hearts" value="11" />
      </div>
    </>
  );
}
