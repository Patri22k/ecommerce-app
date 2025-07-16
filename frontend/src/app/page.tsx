import Image from "next/image";
import { Search } from 'lucide-react';
import Navbar from "@/components/common/Navbar";
import Product from "@/components/common/Product";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen py-2">
      <header className="flex items-start justify-between w-full">
        <Image
          src="/logo/SmartHub-logo.png"
          className={"ml-2"}
          alt="SmartHub Logo"
          width={100}
          height={100}
        />
        <Search className="mx-3 mt-2 mr-4" />
      </header>
      <main className="flex flex-col flex-grow w-[90%] mx-auto pt-4 pb-12">
        <h2 className="text-xl font-semibold mb-4">The best products for you</h2>
        <div className="grid grid-cols-2 gap-3">
          <Product
            id={"1"}
            name="Samsung Galaxy S6"
            description={"1"}
            price={1749.99}
            imageUrl={"/products/galaxyS6-blackSapphire.webp"}
          />
          <Product
            id={"1"}
            name="Samsung Galaxy S6"
            description={"1"}
            price={1749.99}
            imageUrl={"/products/galaxyS6-blackSapphire.webp"}
          />
          <Product
            id={"1"}
            name="Samsung Galaxy S6"
            description={"1"}
            price={1749.99}
            imageUrl={"/products/galaxyS6-blackSapphire.webp"}
          />
          <Product
            id={"1"}
            name="Samsung Galaxy S6"
            description={"1"}
            price={1749.99}
            imageUrl={"/products/galaxyS6-blackSapphire.webp"}
          />
        </div>
      </main>
      <footer className="w-full fixed bottom-0 left-0 bg-white z-10">
        <Navbar/>
      </footer>
    </div>
  );
}
