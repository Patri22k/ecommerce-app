import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function handleGetUser(token: string) {
  return axios.get(`${BACKEND_URL}/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}