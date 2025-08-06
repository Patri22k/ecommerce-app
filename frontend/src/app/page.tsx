import { Search } from 'lucide-react';
import Navbar from "@/components/common/navbar";
import Product from "@/components/product/product";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import SmartHubLogo from "@/components/ui/smarthub-logo";
import MainBase from "@/components/common/main";
import Heading2 from "@/components/ui/heading2";

export default function HomePage() {
  return (
    <>
      <Header>
        <SmartHubLogo/>
        <Search className="mx-3 mt-2 mr-4" />
      </Header>
      <MainBase>
        {/* JUST FOR TESTING */}
        {/* END OF TESTING */}
        <Heading2>The best products for you</Heading2>
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
      </MainBase>
      <Footer>
        <Navbar/>
      </Footer>
    </>
  );
}
