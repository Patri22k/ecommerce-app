import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default async function fetchingProducts(count: number = 10) {
  return axios.get(`${BACKEND_URL}/api/product?count=${count}`);
}