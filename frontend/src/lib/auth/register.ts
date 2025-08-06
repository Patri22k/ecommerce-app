import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function registerUser(name: string, email: string, password: string) {
  return axios.post(`${BACKEND_URL}/auth/register`, {
    name,
    email,
    password
  });
}