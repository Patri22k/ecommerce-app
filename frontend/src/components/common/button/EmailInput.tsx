import React, {useId} from "react";

interface EmailInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  label?: string;
}

export default function EmailInput({className="", label="Email", id, ...next}: EmailInputProps) {
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
        className={`bg-gray-100 w-full border rounded pl-2 py-2 focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:border-none ${className}`}
        type={"email"}
        placeholder={"jozko@mrkvicka.sk"}
        {...next}
      >
      </input>
    </>
  )
}