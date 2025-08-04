"use client";

import Header from "@/components/common/Header";
import SmartHubLogo from "@/components/ui/SmartHubLogo";
import Main from "@/components/common/Main";
import RedirectLink from "@/components/common/link/RedirectLink";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import GlobalError from "@/components/common/error/GlobalError";
import LoadPage from "@/components/common/LoadPage";
import Heading1 from "@/components/ui/Heading1";
import Product, {ProductProps} from "@/components/product/Product";
import handleFetchingProducts from "@/lib/fetchProducts";
import useAdminAccess from "@/hooks/useAdminAccess";

export default function AdminPage() {
  const {initialized, admin, adminError} = useAdminAccess();
  const [products, setProducts] = useState<ProductProps[] | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    general?: string;
  }>({});

  const router = useRouter();

  useEffect(() => {
    if (!initialized || !admin || adminError) return;

    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await handleFetchingProducts(token);
        setProducts(response.data.data);
      } catch {
        setFieldErrors({
          general: "An error occurred while fetching products. Please try again."
        })
      }
    }

    fetchProducts().catch(() => {
      setFieldErrors({
        general: "An error occurred while fetching products. Please try again."
      });
    });
  }, [router, initialized, admin, adminError]);

  if (!initialized) return <LoadPage/>;

  if (adminError) return <GlobalError name={"general-error"} message={adminError}/>;

  // TODO: Style to products and add X button to delete products

  return (
    <>
      <Header>
        <SmartHubLogo/>
      </Header>
      <Main>
        <Heading1>Welcome back {
          adminError ? (
            adminError
          ) : (
            (admin?.name || "Admin") + "!"
          )
        }
        </Heading1>
        {products && products.length > 0 ? (
          products.map((product) => {
            return (
              <Product
                key={product.id}
                name={product.name}
                description={product.description}
                imageUrl={product.imageUrl}
                price={product.price}
                onClick={() => router.push(`/admin/product/${product.id}`)}
              />
            )
            })
        ) : (
          <span className={"text-red-700"}>
            {fieldErrors.general ?? adminError}
          </span>
        )}
        <RedirectLink href={"/admin/product"} label={"Create Product"}/>
      </Main>
    </>
  );
}