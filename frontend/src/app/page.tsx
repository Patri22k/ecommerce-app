import Image from "next/image";
import { Search } from 'lucide-react';
import Navbar from "@/components/common/Navbar";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen pb-2">
      <header className="flex items-center justify-between w-full">
        <Image
          src="/logo/SmartHub-logo.png"
          alt="SmartHub Logo"
          width={100}
          height={100}
        />
        <Search className="mx-3" />
      </header>
      <Navbar/>
    </div>
  );
}
