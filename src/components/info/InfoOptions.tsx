interface InfoOptionsProps {
  hands: number;
  discards: number;
}

export default function InfoOptions({ hands, discards }: InfoOptionsProps) {
  return (
    <>
      <div>Hands: {hands}</div>
      <div>Discards: {discards}</div>
    </>
  );
}
