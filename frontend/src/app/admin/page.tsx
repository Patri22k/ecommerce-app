"use client";

import Header from "@/components/common/header";
import SmartHubLogo from "@/components/ui/smarthub-logo";
import Main from "@/components/common/main";
import RedirectLink from "@/components/common/link/redirect-link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import GlobalError from "@/components/common/error/global-error";
import LoadPage from "@/components/common/load-page";
import Heading1 from "@/components/ui/heading1";
import fetchingProducts from "@/lib/product/fetch-multiple-products";
import useAdminAccess from "@/hooks/use-admin-access";
import AdminProduct, {AdminProductProps} from "@/components/product/admin-product";
import deleteProduct from "@/lib/product/delete-product";

export default function AdminPage() {
  const {initialized, admin, adminError} = useAdminAccess();
  const [products, setProducts] = useState<AdminProductProps[] | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    general?: string;
  }>({});

  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!initialized || !admin || adminError) return;

    const fetchProducts = async () => {

      if (!token) return;

      try {
        const response = await fetchingProducts(token);
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
  }, [router, token, initialized, admin, adminError]);

  const handleDeleteProduct = async (productId?: string) => {
    if (!token) {
      setFieldErrors({
        general: "You must be logged in to delete a product."
      });
      return;
    }

    if (!productId) {
      setFieldErrors({
        general: "Product ID is required to delete a product."
      });
      return;
    }

    try {
      await deleteProduct(token, productId);
      setProducts((prev) => {
        if (!prev) return null;
        return prev.filter((product) => product.id !== productId);
      });
    } catch {
      setFieldErrors({
        general: "An error occurred while deleting the product. Please try again."
      });
    }
  }

  if (!initialized) return <LoadPage/>;

  if (adminError) return <GlobalError name={"general-error"} message={adminError}/>;

  // TODO: Style to products and add X button to delete products

  return (
    <>
      <Header>
        <SmartHubLogo/>
      </Header>
      <Main>
        <Heading1>Welcome back, {
          adminError ? (
            adminError
          ) : (
            (admin?.name || "Admin") + "!"
          )
        }
        </Heading1>
        <div
          className={"flex flex-col justify-center items-center w-full gap-y-2 py-2"}
        >
          {products && products.length > 0 ? (
            products.map((product) => {
              return (
                <AdminProduct
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  imageUrl={product.imageUrl}
                  price={product.price}
                  moreInfo={() => router.push(`/admin/product/${product.id}`)}
                  onDelete={() => handleDeleteProduct(product.id)}
                />
              )
            })
          ) : (
            <span className={"text-red-700"}>
            {fieldErrors.general ?? adminError}
          </span>
          )}
        </div>
        <RedirectLink href={"/admin/product"} label={"Create Product"}/>
      </Main>
    </>
  );
}