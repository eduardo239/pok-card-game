export default function InfoOptions({
  hands,
  discards,
}: {
  hands: number;
  discards: number;
}) {
  return (
    <>
      <div>Hands: {hands}</div>
      <div>Discards: {discards}</div>
    </>
  );
}
