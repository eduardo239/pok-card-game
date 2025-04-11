export default function CalcPoints({
  chips,
  multiply,
}: {
  chips: number;
  multiply: number;
}) {
  return (
    <p className="font-mono font-bold bg-gray-100 p-2">
      lvl. 1 - Chips: {chips} x Mult: {multiply}
    </p>
  );
}
