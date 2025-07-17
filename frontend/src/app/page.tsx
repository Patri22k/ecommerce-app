import Image from "next/image";
import { Search } from 'lucide-react';
import Navbar from "@/components/common/Navbar";
import Product from "@/components/common/Product";
import Main from "@/components/common/Main";
import Header from "@/components/common/Header";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen py-2">
      <Header>
        <Image
          src="/logo/SmartHub-logo.png"
          className={"w-1/4 h-auto ml-2"}
          alt="SmartHub Logo"
          width="0"
          height="0"
          sizes="100vw"
          priority={true}
        />
        <Search className="mx-3 mt-2 mr-4" />
      </Header>
      <Main>
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
      </Main>
      <footer className="w-full fixed bottom-0 left-0 bg-white z-10">
        <Navbar/>
      </footer>
    </div>
  );
}
