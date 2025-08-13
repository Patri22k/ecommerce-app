"use client";

import {useEffect, useState} from "react";
import fetchingProducts from "@/lib/product/fetch-multiple-products";
import {ProductProps} from "@/components/product/product";
import {AxiosError} from "axios";

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
        if (err instanceof AxiosError) {
          if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            setError(err.response.data.message || "An error occurred while fetching products.");
          } else if (err.request) {
            // The request was made but no response was received
            setError("No response received from the server.");
          } else {
            // Something happened in setting up the request that triggered an Error
            setError(err.message);
          }
        } else {
          // Handle non-Axios errors
          setError("An unexpected error occurred while fetching products.");
        }
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