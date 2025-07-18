import axios from "axios";

export default async function getProductById(productId: string) {
  try {
    const response = await axios.get(`/api/products/${productId}`);

    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {message: error.message, status: error.response?.status || 500, data: error.response?.data || "No data"};
    } else {
      return {message: "An unexpected error occurred", status: 500, data: "No data"};
    }
  }
}