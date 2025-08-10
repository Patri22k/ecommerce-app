import React from "react";

interface SubmitButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
  label?: React.ReactNode;
}

export default function SubmitButton({
  className = "",
  label=<span>Submit</span>,
  ...next
}: SubmitButtonProps) {
  return (
    <button
      className={`bg-gray-100 border rounded w-full transition duration-500 py-2 ${className}`}
      type={"submit"}
      {...next}
    >
      {label}
    </button>
  );
}