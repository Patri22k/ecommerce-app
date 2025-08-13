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
import React, {useState} from "react";
import TextInput from "@/components/common/input/text-input";

export default function HomePage() {
  const {loading, products, error} = useFetchMultipleProducts();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const router = useRouter();

  const handleSearchProduct = () => {
    // TODO: Implement search functionality
    console.log("Searching for product:", searchQuery);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchProduct();
    } else if (event.key === "Escape") {
      setIsSearching(false);
      setSearchQuery("");
    }
  }

  if (loading) return <LoadPage/>;
  if (error) return <GlobalError name={"Error fetching product"} message={error} />;

  return (
    <div className={"w-full"} onClick={() => setIsSearching(false)}>
      <Header onClick={(e) => e.stopPropagation()}>
        {isSearching ? (
          <div className={"flex items-center justify-center w-[90%] mx-auto"}>
            <TextInput
              id={"search-product"}
              label={""}
              placeholder={"Samsung Galaxy S23 Ultra"}
              className={"w-full"}
              value={searchQuery}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchQuery(e.target.value)}
            >
              <Search className="absolute right-2 top-1/3 -translate-y-1/2 cursor-pointer" onClick={handleSearchProduct} />
            </TextInput>
          </div>
        ) : (
          <>
            <SmartHubLogo/>
            <Search className="mx-3 mt-2 mr-4" onClick={() => setIsSearching(!isSearching)} />
          </>
        )}
      </Header>
      <MainBase onClick={() => setIsSearching(false)}>
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
      <Footer onClick={() => setIsSearching(false)}>
        <Navbar/>
      </Footer>
    </div>
  );
}
