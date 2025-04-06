export default function InputBasic({
  value,
  onChange,
}: {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex justify-between items-center p-4 border border-gray-500 rounded-sm  bg-gray-900 mb-4">
      <label htmlFor="numberOfCards">Number of Hands</label>
      <input
        className="text-white pl-3 py-1 pr-1 w-14 border border-gray-500 rounded-sm  bg-gray-700"
        type="number"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
