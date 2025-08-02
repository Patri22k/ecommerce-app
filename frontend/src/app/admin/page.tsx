"use client";

import Header from "@/components/common/Header";
import SmartHubLogo from "@/components/ui/SmartHubLogo";
import Main from "@/components/common/Main";
import RedirectLink from "@/components/common/link/RedirectLink";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import handleGetUser from "@/lib/me";
import GlobalError from "@/components/common/error/GlobalError";
import LoadPage from "@/components/common/LoadPage";
import Heading1 from "@/components/ui/Heading1";
import Product, {ProductProps} from "@/components/common/Product";
import handleFetchingProducts from "@/lib/fetchProducts";

export interface AdminProps {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

export default function AdminPage() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [admin, setAdmin] = useState<AdminProps | null>(null);
  const [products, setProducts] = useState<ProductProps[] | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    general?: string;
    adminData?: string;
  }>({});

  const router = useRouter();

  useEffect(() => {
    const fetchAdminData = async () => {
      setInitialized(false);
      const token = localStorage.getItem("token");

      if (!token) {
        setFieldErrors({
          adminData: "You must be logged in to access the admin page."
        });
        setInitialized(true);
        return;
      }

      try {
        const adminData = await handleGetUser(token);

        if (adminData.data.data.role !== "ADMIN") {
          setFieldErrors({
            adminData: "You do not have permission to access the admin page."
          });
          return;
        }

        setAdmin(adminData.data.data);
      } catch {
        setFieldErrors({
          adminData: "Invalid token or you are not logged in."
        });
      } finally {
        setInitialized(true);
      }
    }

    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setFieldErrors({
          adminData: "You do not have permission to access the admin page."
        });
        return;
      }

      try {
        const response = await handleFetchingProducts(token);

        console.log("Fetched products:", response.data.data);

        setProducts(response.data.data);
      } catch (error) {
        console.log("Error fetching products:", error);

        setFieldErrors({
          general: "An error occurred while fetching products. Please try again."
        })
      }
    }

    fetchAdminData().catch(() => {
      setFieldErrors({
        adminData: "An error occurred while fetching admin data. Please try again."
      });
      setInitialized(true);
    });

    fetchProducts().catch(() => {
      setFieldErrors({
        general: "An error occurred while fetching products. Please try again."
      });
    });
  }, [router]);

  if (!initialized) {
    return (
      <LoadPage/>
    );
  }

  if (fieldErrors.adminData) {
    return (
      <GlobalError name={"general-error"} message={fieldErrors.adminData}/>
    );
  }

  // TODO: Style to products and add X button to delete products

  return (
    <>
      <Header>
        <SmartHubLogo/>
      </Header>
      <Main>
        <Heading1>Welcome back {
          fieldErrors.adminData ? (
            fieldErrors.adminData
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
              />
            )
            })
        ) : (
          <span className={"text-red-700"}>
            {fieldErrors.general ?? fieldErrors.adminData}
          </span>
        )}
        <RedirectLink href={"/admin/product"} label={"Create Product"}/>
      </Main>
    </>
  );
}