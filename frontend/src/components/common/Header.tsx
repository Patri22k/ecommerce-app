import React from "react";

interface HeaderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  children?: React.ReactNode;
}

export default function Header(props: HeaderProps) {
  return (
    <header className={`flex items-start justify-between w-full ${props.className}`} {...props}>
      {props.children}
    </header>
  )
}