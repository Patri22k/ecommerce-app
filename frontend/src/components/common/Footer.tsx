import React from "react";

interface FooterProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  children?: React.ReactNode;
}

export default function Footer({ children, className = "", ...rest }: FooterProps) {
  return (
    <footer className={`w-full fixed bottom-0 left-0 bg-white z-10 mb-2 ${className}`} {...rest}>
      {children}
    </footer>
  );
}