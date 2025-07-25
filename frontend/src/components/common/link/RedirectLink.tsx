import {User} from "lucide-react";
import React from "react";
import Link from "next/link";

interface LogInButtonProps {
  href: string;
  icon?: React.ReactNode;
  label?: string;
  children?: React.ReactNode;
  className?: string;
}

// By default, the RedirectLink component is set for a login redirect link button.
export default function RedirectLink({
  href,
  icon=<User/>,
  label="Log In",
  children,
  className = "",
  ...rest
}: LogInButtonProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-start pl-4 gap-x-2 p-2 rounded shadow-xl bg-gray-100 
      ${className}`}
      {...rest}
    >
      {children ?? (
        <>
          {icon}
          <span>{label}</span>
        </>
        )
      }
    </Link>
  );
}