"use client";

import Header from "@/components/common/Header";
import SmartHubLogo from "@/components/ui/SmartHubLogo";
import MainBase from "@/components/common/Main";
import React, {useState} from "react";
import TextInput from "@/components/common/input/TextInput";
import ArrayInput from "@/components/common/input/ArrayInput";
import SubmitButton from "@/components/common/button/SubmitButton";
import {LoaderCircle} from "lucide-react";
import axios from "axios";

export default function AdminPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{
    general?: string;
    title?: string;
    description?: string;
    categories?: string;
    price?: string;
  }>({});

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    setFieldErrors({});
    setLoading(true);
    // TODO: Implement form submission logic
    try {
      const response = await axios.post("/api/product", {
        title,
        description,
        categories,
        price: parseFloat(price)
      });

      if (response.data?.status === "success") {
        // TODO: Handle successful submission, e.g., redirect to product list
      } else {
        // Handle unexpected response
        setFieldErrors({
          general: "An error occurred while creating a product. Please try again."
        })
      }
    } catch (error) {
      // TODO: Handle errors properly
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;

        if (typeof errorMessage === "object") {
          // TODO
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
      <Header>
        <SmartHubLogo/>
      </Header>
      <MainBase.Form>
        <h1>{/* TODO: Add text to "Welcome back <name-of-the-admin>!" */}</h1>
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