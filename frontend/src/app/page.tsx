"use client";

import { Search } from 'lucide-react';
import Navbar from "@/components/common/navbar";
import Product from "@/components/product/product";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import SmartHubLogo from "@/components/ui/smarthub-logo";
import MainBase from "@/components/common/main";
import Heading2 from "@/components/ui/heading2";
import useFetchMultipleProducts from "@/hooks/use-fetch-multiple-products";
import LoadPage from "@/components/common/load-page";
import GlobalError from "@/components/common/error/global-error";
import {useRouter} from "next/navigation";

export default function HomePage() {
  const {loading, products, error} = useFetchMultipleProducts();

  const router = useRouter();

  if (loading) return <LoadPage/>;
  if (error) return <GlobalError name={"Error fetching product"} message={error} />;

  return (
    <>
      <Header>
        <SmartHubLogo/>
        <Search className="mx-3 mt-2 mr-4" />
      </Header>
      <MainBase>
        <Heading2>The best products for you</Heading2>
        <div className="grid grid-cols-2 gap-3">
          {products && products.length > 0
            && products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              moreInfo={() => router.push(`/product/${product.slug}-d${product.id}`)}
            />
          ))}
        </div>
      </MainBase>
      <Footer>
        <Navbar/>
      </Footer>
    </>
  );
}
