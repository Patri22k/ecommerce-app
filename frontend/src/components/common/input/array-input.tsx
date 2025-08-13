"use client";

import React, {useState} from "react";

interface ArrayInputProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "value" | "onChange"> {
  id: string;
  value: string[];
  onChangeAction: (updated: string[]) => void;
  label?: string;
  className?: string;
  placeholder?: string;
  error?: string;
}

export default function ArrayInput({
  id,
  value,
  onChangeAction,
  label = "Array Input",
  className = "",
  placeholder: placeholder = "Enter category and either press Enter or type a comma",
  error,
  ...next
}: ArrayInputProps) {
  const [categoryInput, setCategoryInput] = useState<string>("");

  const handleAddCategory = () => {
    const trimmedCategory = categoryInput.trim();
    if (trimmedCategory && !value.includes(trimmedCategory)) {
      onChangeAction([...value, trimmedCategory]);
    }

    setCategoryInput("");
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      handleAddCategory();
    }
  }

  const handleRemoveCategory = (index: number) => {
    const updatedCategories = value.filter((_, i) => i !== index);
    onChangeAction(updatedCategories);
  }

  return (
    <div className={"relative w-full mb-4"}>
      <span
        className={`w-full block font-medium text-gray-700 ${value.length > 0 ? "mb-2" : "mb-1"}`}
      >
        {label}
      </span>

      <div className={`flex flex-wrap gap-2 ${value.length > 0 ? "mb-2 " : ""}`}>
        {value.map((category, index) => (
          <span
            key={index}
            className={"flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm" +
              "whitespace-nowrap overflow-x-auto scrollbar-gutter:stable pb-2"}
          >
            {category}
            <button
              type={"button"}
              onClick={() => handleRemoveCategory(index)}
              className={"text-blue-500 hover:text-red-500 font-bold"}
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      <input
        id={id}
        value={categoryInput}
        onChange={(e) => setCategoryInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`w-full p-2 border rounded bg-gray-100 focus:outline-none
         focus:border-blue-500 ${error ? "bg-red-500" : ""} ${className}
        `}
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