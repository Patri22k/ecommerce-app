import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function handleLoginUser(email: string, password: string) {
  return axios.post(`${BACKEND_URL}/api/auth/login`, {
    email,
    password
  });
}