import {User} from "lucide-react";
import React from "react";
import Link from "next/link";

interface LogInButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export default function LogInButton({ children, className = "", ...rest}: LogInButtonProps) {
  return (
    <Link
      href="/auth/login"
      className={`flex items-center justify-start pl-4 gap-x-2 p-2 rounded shadow-xl bg-gray-100 
      ${className}`}
      {...rest}
    >
      {children ?? (
        <>
          <User/>
          <span>Log In</span>
        </>
        )
      }
    </Link>
  );
}