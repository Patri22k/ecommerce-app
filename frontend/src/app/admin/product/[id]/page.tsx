"use client";

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import fetchProductById from "@/lib/product/fetch-product-by-id";
import {AdminProductProps} from "@/components/product/admin-product";
import LoadPage from "@/components/common/load-page";
import DetailedAdminProduct from "@/components/product/detailed-admin-product";

export default function ProductPage() {
  const params = useParams();
  const pageId = params?.id as string; // currently pageId is productId

  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [product, setProduct] = useState<AdminProductProps | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    general?: string;
    admin?: string;
  }>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token === null) return;

    if (!token) {
      setFieldErrors({
        general: "You must be logged in to view this product."
      });
      return;
    }

    if (!pageId) {
      setFieldErrors({
        general: "This product does not exist."
      });
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setFieldErrors({});
      const response = await fetchProductById(token, pageId);

      if (response.status === 403) {
        setFieldErrors({
          admin: "You do not have permission to view this product."
        });
        setLoading(false);
        return;
      } else if (response.status === 404) {
        setFieldErrors({
          general: "This product does not exist."
        });
        setLoading(false);
        return;
      } else if (response.status !== 200) {
        setFieldErrors({
          general: "An error occurred while fetching the product. Please try again."
        });
        setLoading(false);
        return;
      }
      setProduct(response.data.data);
    };

    fetchProduct().catch(() => {
      setFieldErrors({
        general: "An error occurred while fetching the product. Please try again."
      });
    }).finally(() => {
      setLoading(false);
    });
  }, [token, pageId]);

  if (fieldErrors?.general) return <div className="flex justify-center items-center min-h-screen w-full">{fieldErrors.general}</div>;
  if (fieldErrors?.admin) return <div className="flex justify-center items-center min-h-screen w-full">{fieldErrors.admin}</div>;
  if (loading) return <LoadPage/>;

  return (
    <DetailedAdminProduct content={product!}/>
  );
}