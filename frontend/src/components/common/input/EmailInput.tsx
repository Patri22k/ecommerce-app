import React from "react";

interface EmailInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  className?: string;
  label?: string;
}

export default function EmailInput({className="", label="Email", id, ...next}: EmailInputProps) {
  return (
    <>
      <label
        htmlFor={id}
        className="w-full block mb-1 font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={id}
        className={`bg-gray-100 w-full border rounded pl-2 py-2 mb-8 focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:border-none ${className}`}
        type={"email"}
        placeholder={"jozko@mrkvicka.sk"}
        {...next}
      >
      </input>
    </>
  )
}