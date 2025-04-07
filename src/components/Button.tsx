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
      className={`p-4 min-w-[120px] text-sm rounded-md text-white ${
        type === "error"
          ? "bg-red-500 hover:bg-red-600"
          : type === "success"
          ? "bg-green-500 hover:bg-green-600"
          : type === "info"
          ? "bg-blue-500 hover:bg-blue-600"
          : type === "warning"
          ? "bg-yellow-500 hover:bg-yellow-600"
          : "bg-gray-500 hover:bg-gray-600"
      } disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500
      hover:cursor-pointer`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
