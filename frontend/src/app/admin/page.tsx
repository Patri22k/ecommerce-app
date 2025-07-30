"use client";

import Header from "@/components/common/Header";
import SmartHubLogo from "@/components/ui/SmartHubLogo";
import MainBase from "@/components/common/Main";
import React, {useEffect, useState} from "react";
import TextInput from "@/components/common/input/TextInput";
import ArrayInput from "@/components/common/input/ArrayInput";
import SubmitButton from "@/components/common/button/SubmitButton";
import {LoaderCircle} from "lucide-react";
import axios from "axios";
import {toast, Toaster} from "sonner";
import Heading1 from "@/components/ui/Heading1";

interface AdminProps {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

export default function AdminPage() {
  const [admin, setAdmin] = useState<AdminProps | null>(null);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  // TODO: const [imageUrl, setImageUrl] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{
    general?: string;
    adminData?: string;
    title?: string;
    description?: string;
    categories?: string;
    price?: string;
  }>({});

  const [loadingAdminData, setLoadingAdminData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // TODO: When not having a authentification token, redirect to login page
    const fetchAdminData = async () => {
      setLoadingAdminData(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setFieldErrors({
          adminData: "You must be logged in to access the admin page."
        });
        setLoadingAdminData(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAdmin(response.data.data);
      } catch {
        setFieldErrors({
          adminData: "An error occurred while fetching admin data. Please try again."
        });
      } finally {
        setLoadingAdminData(false);
      }
    }

    fetchAdminData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    setFieldErrors({});
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setFieldErrors({
          general: "You must be logged in to create a product."
        });
        return;
      }

      const response = await axios.post("http://localhost:5000/api/product", {
          title,
          description,
          categories,
          imageUrl: "", // TODO: Handle image upload separately
          price: parseFloat(price)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      if (response.data?.status === "success") {
        toast.success("Product created successfully!");
        setTitle("");
        setDescription("");
        setCategories([]);
        // setImageUrl("");
        setPrice("");
      } else {
        // Handle unexpected response
        setFieldErrors({
          general: "An error occurred while creating a product. Please try again."
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;

        if (typeof errorMessage === "object") {
          const newErrors: {
            general?: string;
            title?: string;
            description?: string;
            categories?: string;
            price?: string;
          } = {};

          for (const issue of errorMessage) {
            const path = issue.path?.[0] as keyof typeof newErrors;

            // Prioritize "required" (e.g., too_small) over format/length errors
            if (!newErrors[path]) {
              newErrors[path] = issue.message;
            }
          }

          setFieldErrors(newErrors);
        } else if (typeof errorMessage === "string") {
          setFieldErrors({
            general: errorMessage
          });
        } else {
          setFieldErrors({
            general: "An unexpected error occurred during product creation. Please try again."
          });
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster
        position={"bottom-right"}
        toastOptions={{
          classNames: {
            success: "!text-green-500 !bg-green-100",
          }
        }}
      />
      <Header>
        <SmartHubLogo/>
      </Header>
      <MainBase.Form>
        <Heading1>Welcome back {
          fieldErrors.adminData ? (
            fieldErrors.adminData
          ) : loadingAdminData ? (
          <span className={"flex items-center justify-center gap-x-2"}>
            <LoaderCircle className={"animate-spin"}/>
            <span>Loading...</span>
          </span>
          ) : (
            admin?.name || "Admin"
          )
        }
        </Heading1>
        <form
          id={"admin-form"}
          className={"flex flex-col items-center justify-center w-full"}
          onSubmit={handleSubmit}
        >
          <TextInput
            id={"title-input"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label={"Title"}
            placeholder={"Samsung Galaxy S23"}
          />
          <TextInput
            id={"description-input"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label={"Description"}
            placeholder={"A powerful smartphone with a stunning display."}
          />
          <ArrayInput
            id={"categories-input"}
            value={categories}
            customOnChange={setCategories}
            error={fieldErrors.categories}
            label={"Categories"}
            placeholder={"Smartphones, Electronics, Gadgets"}
          />
          <TextInput
            id={"price-input"}
            type={"number"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={"999.99"}
            label={"Price"}
          />
          <SubmitButton
            className={fieldErrors.general ? "bg-red-700 hover:bg-red-700" : "hover:bg-gray-300"}
            label={fieldErrors.general ? (
              <span className={"text-emerald-50 py-2"}>
                {fieldErrors.general}
              </span>
            ) : loading ? (
              <span className={"flex items-center justify-center gap-x-2"}>
                <LoaderCircle className={"animate-spin"}/><span>Loading...</span>
              </span>
            ) : (
              <span>
                Submit
              </span>
            )}
          />
        </form>
      </MainBase.Form>
    </>
  );
}