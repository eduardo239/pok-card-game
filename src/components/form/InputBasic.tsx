interface InputBasicProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBasic({
  label,
  value,
  onChange,
}: InputBasicProps) {
  return (
    <div className="flex justify-between items-center p-4 border border-gray-500 rounded-sm  bg-gray-700 mb-4">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        className="text-white pl-3 py-1 pr-1 w-14  rounded-sm  bg-gray-800"
        type="number"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
