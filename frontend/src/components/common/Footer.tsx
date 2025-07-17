import React from "react";

interface FooterProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  children?: React.ReactNode;
}

export default function Footer(props: FooterProps) {
  return (
    <footer className={`w-full fixed bottom-0 left-0 bg-white z-10 ${props.className}`} {...props}>
      {props.children}
    </footer>
  );
}