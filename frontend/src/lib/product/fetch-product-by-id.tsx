import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default async function fetchProductById(productId: string) {
  return axios.get(`${BACKEND_URL}/api/product/${productId}`);
}