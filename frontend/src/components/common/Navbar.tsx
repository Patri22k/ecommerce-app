"use client";

import NavbarLink from "@/components/common/link/NavbarLink";
import {House, ShoppingCart, User} from "lucide-react";
import {usePathname} from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isCartActive = pathname.startsWith("/cart");
  const isProfileActive = pathname.startsWith("/profile");

  return (
    <nav className="flex items-center justify-around w-full border-t border-t-black/50 py-2">
      <NavbarLink href="/" label="Home" icon={<House/>} isActive={isHomeActive} />
      <NavbarLink href="/cart" label="Cart" icon={<ShoppingCart/>} isActive={isCartActive} />
      <NavbarLink href="/profile" label="Profile" icon={<User/>} isActive={isProfileActive} />
    </nav>
  );
}