"use client";

import RedirectLink from "@/components/common/link/redirect-link";
import {useParams} from "next/navigation";
import GlobalError from "@/components/common/error/global-error";
import DetailedProduct from "@/components/product/detailed-product";
import fetchProductById from "@/lib/product/fetch-product-by-id";
import {useEffect, useState} from "react";
import {ProductProps} from "@/components/product/product";
import LoadPage from "@/components/common/load-page";

export default function ProductPage() {
  const params = useParams<{ slugAndId: string }>();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [error, setError] = useState<string>("");

  const match = params.slugAndId.match(/^(.+)-d(\w+)$/);

  const slug = match ? match[1] : null;
  const id = match ? String(match[2]) : null;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const response = await fetchProductById(id);
      setProduct(response.data.data);
    };

    fetchProduct().catch((e) => {
      setError(e as string);
    });
  }, [id]);

  if (!params.slugAndId) return <LoadPage/>;

  if (!slug || !id) return <GlobalError name={"Invalid url format"} message={"Invalid url format."}/>;
  if (error) return <GlobalError name={"Global error"} message={error}/>;

  return (
    <div className={"flex flex-col items-center justify-center w-full h-full"}>
      {product
        ? <DetailedProduct content={product} />
        : <GlobalError name={"Product error"} message={error ?? "Unexpected error occurred."}/>
      }
      <RedirectLink className={"w-[80%] mx-auto my-6"} href={'/'} label={"Back to Menu"} />
    </div>
  );
}