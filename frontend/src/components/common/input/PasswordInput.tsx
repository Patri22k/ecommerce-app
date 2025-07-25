"use client";

import {Eye, EyeOff} from "lucide-react";
import React, {useState} from "react";

interface PasswordInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  className?: string;
  label?: string;
  placeholder?: string;
  visibleIcon?: boolean;
  error?: string;
}

export default function PasswordInput({
                                        id,
                                        className = "",
                                        label = "Password",
                                        placeholder = "heslo123",
                                        visibleIcon = false,
  error="",
                                        ...next
                                      }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  return (
    <div className={"relative w-full py-2"}>
      <span
        className="w-full block mb-1 font-medium text-gray-700"
      >
        {label}
      </span>
      <input
        id={id}
        className={`bg-gray-100 w-full border rounded pl-2 pr-8 py-2 mb-8 focus:outline-none
        focus:border-blue-500 focus:border
         ${error ? "border-red-500" : ""}
         ${className}`}
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        {...next}
      />

      {visibleIcon && (
        <button
          type={"button"}
          onClick={toggleVisibility}
          className={"absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"}
          tabIndex={-1}
        >
          {isVisible ? (<EyeOff size={20}/>) : (<Eye size={20}/>)}
        </button>
      )}

      {error && (
        <span className={"absolute left-2 bottom-3 text-red-500 text-sm"}>
          {error}
        </span>
      )}
    </div>

  );
}