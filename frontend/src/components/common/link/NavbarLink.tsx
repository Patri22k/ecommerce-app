import React from "react";
import Link from "next/link";

interface NavbarLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
  icon?: React.ReactNode;
}

export default function NavbarLink(props: NavbarLinkProps) {
  const { href, label, isActive = false, icon } = props;

  return (
    <Link
      href={href}
      className={`flex items-center justify-center text-xs ${isActive ? "text-cyan-600" : "text-black"}`}
    >
      {icon && <span className="mx-2">{icon}</span> }
      <span>{label}</span>
    </Link>
  );
}