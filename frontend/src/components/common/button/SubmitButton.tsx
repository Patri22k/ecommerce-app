import React from "react";

interface SubmitButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
  label?: string;
}

export default function SubmitButton({className = "", label="Submit", ...next}: SubmitButtonProps) {
  return (
    <button
      className={`bg-gray-100 border rounded w-full py-2 hover:outline-none hover:bg-gray-300
      transition duration-500 ${className}`}
      type={"submit"}
      {...next}
    >
      {label}
    </button>
  );
}