export default function Button({
  value,
  onClick,
  type,
  disabled,
}: {
  onClick: () => void;
  value: string;
  type?: "error" | "success" | "warning" | "info";
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className={`p-4 min-w-[120px] rounded-sm text-amber-50 ${
        type === "error"
          ? "bg-red-500 hover:bg-red-600"
          : type === "success"
          ? "bg-green-500 hover:bg-green-600"
          : type === "info"
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-yellow-500 hover:bg-yellow-600"
      } disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
