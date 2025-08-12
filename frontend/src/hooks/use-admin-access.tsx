"use client";

import {useEffect, useState} from "react";
import handleGetUser from "@/lib/get-user";

export interface ClientProps {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

interface UseAdminAccessResult {
  initialized: boolean;
  admin: ClientProps | null;
  adminError: string | null;
}

export default function useAdminAccess(): UseAdminAccessResult {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [admin, setAdmin] = useState<ClientProps | null>(null);
  const [adminError, setAdminError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      setInitialized(false);
      const token = localStorage.getItem("token");

      if (!token) {
        setAdminError("You must be logged in to access the admin page.");
        setInitialized(true);
        return;
      }

      try {
        const response = await handleGetUser(token);

        if (response.data.data.role !== "ADMIN") {
          setAdminError("You do not have permission to access the admin page.");
          return;
        }

        setAdmin(response.data.data);
      } catch {
        setAdminError("An adminError occurred while fetching admin data. Please try again.");
      } finally {
        setInitialized(true);
      }
    }

    fetchAdminData().catch(() => {
      setAdminError("An adminError occurred while fetching admin data. Please try again.");
      setInitialized(true);
    });
  }, []);

  return {initialized, admin, adminError};
}