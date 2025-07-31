import {LoaderCircle} from "lucide-react";
import React from "react";

interface LoadPageProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export default function LoadPage({ className="", children, ...next}: LoadPageProps) {
  return (
    <div
      className={`w-full h-full min-h-screen flex items-center justify-center ${className}`}
      {...next}
    >
      <LoaderCircle className={"animate-spin w-20 h-auto"}/>
      {children}
    </div>
  );
}