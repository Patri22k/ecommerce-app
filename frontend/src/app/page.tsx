import { Search } from 'lucide-react';
import Navbar from "@/components/common/Navbar";
import Product from "@/components/common/Product";
import Main from "@/components/common/Main";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SmartHubLogo from "@/components/ui/SmartHubLogo";

export default function HomePage() {
  return (
    <>
      <Header>
        <SmartHubLogo/>
        <Search className="mx-3 mt-2 mr-4" />
      </Header>
      <Main className={"!w-[90%] !mx-auto"}>
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
      <Footer>
        <Navbar/>
      </Footer>
    </>
  );
}
