import React from "react";

interface MainProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  children?: React.ReactNode;
}

export default function Main({ children, className = "", ...rest }: MainProps) {
  return (
    <main className={`flex flex-col flex-grow w-full pb-6 ${className}`} {...rest}>
      {children}
    </main>
  );
}