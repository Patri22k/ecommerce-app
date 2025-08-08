"use client";

import {useEffect, useState} from "react";
import fetchingProducts from "@/lib/product/fetch-multiple-products";
import {ProductProps} from "@/components/product/product";

export default function useFetchMultipleProducts() {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchingProducts();
        setProducts(response.data.data);
      } catch (err) {
        setError(err as string);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts().catch((err) => {
      setError(err as string);
    });
  }, [setProducts]);

  return { loading, products, error };
}