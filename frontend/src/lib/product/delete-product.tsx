import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default async function deleteProduct(token: string, id: string) {
  return axios.delete(`${BACKEND_URL}/api/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}