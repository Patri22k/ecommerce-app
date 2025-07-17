import {User} from "lucide-react";
import React from "react";

interface LogInButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function LogInButton({ children, className = "", ...rest}: LogInButtonProps) {
  return (
    <button className={`flex items-center justify-start pl-4 gap-x-2 p-2 rounded shadow-xl bg-gray-100 
    ${className}`} {...rest}>
      {children ?? (
        <>
          <User/>
          <span>Log In</span>
        </>
        )
      }
    </button>
  );
}