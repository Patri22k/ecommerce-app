import React, {useId} from "react";

interface NameInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  label?: string;
}

export default function NameInput({className = "", label = "Name", id, ...next}: NameInputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <>
      <label
        htmlFor={inputId}
        className="w-full block mb-1 font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`bg-gray-100 w-full border rounded pl-2 py-2 mb-8 focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:border-none ${className}`}
        placeholder={"Jožko Mrkvička"}
        {...next}
      />
    </>
  );
}