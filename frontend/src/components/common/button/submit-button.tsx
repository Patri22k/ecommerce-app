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
      className={`bg-gray-100 border rounded w-full py-2 hover:outline-none
      transition duration-500 ${className}`}
      type={"submit"}
      {...next}
    >
      {label}
    </button>
  );
}