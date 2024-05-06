import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className="mt-2 py-2 px-4 bg-blue-600 text-gray-100 text-center font-bold rounded"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
