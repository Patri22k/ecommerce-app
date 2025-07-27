import React from "react";

interface TextInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  className?: string;
  label?: string;
  placeholder?: string;
  error?: string;
}

export default function TextInput({
  id,
  className = "",
  label = "Label Text",
  placeholder="Placeholder Text",
  error = "",
  ...next
  } : TextInputProps) {
  return (
    <div className={"relative w-full py-2"}>
      <span
        className="w-full block mb-1 font-medium text-gray-700"
      >
        {label}
      </span>
      <input
        id={id}
        className={`bg-gray-100 w-full border rounded p-2 mb-8 focus:outline-none
        focus:border-blue-500 focus:border
         ${error ? "border-red-500" : ""}
         ${className}`}
        placeholder={placeholder}
        {...next}
      />

      {error && (
        <span className={"absolute left-2 bottom-3 text-red-500 text-sm"}>
          {error}
        </span>
      )}
    </div>
  );
}