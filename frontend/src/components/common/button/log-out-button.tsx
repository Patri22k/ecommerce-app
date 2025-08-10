"use client";

import React from "react";
import {useRouter} from "next/navigation";

interface LogOutButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
  redirectUrl?: string;
  label?: string;
}

export default function LogOutButton({className="", redirectUrl, label, ...next}: LogOutButtonProps) {
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem("token");

    // NOTE: If redirectUrl is the same as the current page it is rendered in, the page won't reload.
    if (redirectUrl) {
      router.push(redirectUrl);
    } else {
      window.location.reload();
    }
  };

  return (
    <button
      className={"bg-gray-100 border rounded w-full py-2 " +
        "transition duration-500 " + className}
      onClick={handleLogOut}
      type="button"
      {...next}
    >
      {label ?? "Log Out"}
    </button>
  )
}