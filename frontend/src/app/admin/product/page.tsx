"use client";

import axios from "axios";
import {toast, Toaster} from "sonner";
import {LoaderCircle} from "lucide-react";
import React, {useState} from "react";
import Header from "@/components/common/header";
import SmartHubLogo from "@/components/ui/smarthub-logo";
import MainBase from "@/components/common/main";
import TextInput from "@/components/common/input/text-input";
import ArrayInput from "@/components/common/input/array-input";
import SubmitButton from "@/components/common/button/submit-button";
import GlobalError from "@/components/common/error/global-error";
import LoadPage from "@/components/common/load-page";
import useAdminAccess from "@/hooks/use-admin-access";
import RedirectLink from "@/components/common/link/redirect-link";
import useAutoClearError from "@/hooks/use-auto-clear-error";

export default function CreateProductPage() {
  const {initialized, adminError} = useAdminAccess();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  // TODO: const [imageUrl, setImageUrl] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{
    general?: string;
    title?: string;
    description?: string;
    categories?: string;
    price?: string;
  }>({});

  const [loading, setLoading] = useState<boolean>(false);

  useAutoClearError(fieldErrors.general, setFieldErrors);

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

  if (!initialized) return <LoadPage/>;

  if (adminError) return <GlobalError name={"admin-error"} message={adminError}/>;

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
        <form
          id={"admin-form"}
          className={"flex flex-col items-center justify-center w-full pb-8"}
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
            className={fieldErrors.general ? "bg-red-700" : ""}
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
        <RedirectLink href={"/admin"} label={"Back to Admin Dashboard"}/>
      </MainBase.Form>
    </>
  );
}