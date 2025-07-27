import React from "react";

interface HeaderTextProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Heading1({children, className = "", ...rest}: HeaderTextProps) {
  const content = children ?? "Default Header Text";

  return (
    <h1
      className={`text-2xl font-bold mb-4 ${className}`}
      {...rest}
    >
      {content}
    </h1>
  )
}