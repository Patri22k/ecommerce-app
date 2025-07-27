import React from "react";

interface HeaderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  children?: React.ReactNode;
}

export default function Header({ children, className = "", ...rest }: HeaderProps) {
  return (
    <header className={`flex items-start justify-between w-full mb-6 ${className}`} {...rest}>
      {children}
    </header>
  )
}