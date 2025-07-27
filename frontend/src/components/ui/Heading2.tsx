import React from "react";

interface Heading2Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Heading2 ({children, className=""}: Heading2Props) {
  const content = children ?? "Default Heading2 Text";

  return (
    <h2
      className={`text-xl font-semibold mb-4 ${className}`}
    >
      {content}
    </h2>
  );
}