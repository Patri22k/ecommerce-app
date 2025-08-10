"use client";

import {useParams} from "next/navigation";
import RedirectLink from "@/components/common/link/redirect-link";
import {useEffect, useState} from "react";
import fetchProductById from "@/lib/product/fetch-product-by-id";
import {ProductProps} from "@/components/product/product";
import GlobalError from "@/components/common/error/global-error";
import DetailedProduct from "@/components/product/detailed-product";

export default function ProductPage() {
  const params = useParams();
  const pageId = params?.id as string; // currently pageId is productId

  const [product, setProduct] = useState<ProductProps | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetchProductById(pageId);
      setProduct(response.data.data);
    };

    fetchProduct().catch((e) => {
      setError(e as string);
    });
  }, [pageId, setProduct, setError]);

  if (error) return <GlobalError name={"Product fetching error"} message={error} />;

  return (
    <div className={"flex flex-col items-center justify-center w-full h-full"}>
      {product
        ? <DetailedProduct content={product} />
        : <GlobalError name={"Product error"} message={error ?? "Unexpected error occurred."}/> }
      <RedirectLink className={"w-[80%] mx-auto my-6"} href={'/'} label={"Back to Menu"} />
    </div>
  );
}