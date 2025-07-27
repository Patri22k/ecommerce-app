"use client";

import Header from "@/components/common/Header";
import SmartHubLogo from "@/components/ui/SmartHubLogo";
import MainBase from "@/components/common/Main";
import React, {useState} from "react";
import TextInput from "@/components/common/input/TextInput";
import ArrayInput from "@/components/common/input/ArrayInput";

export default function AdminPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<string>("");
  const [fieldsErrors, setFieldsErrors] = useState<{
    general?: string;
    categories?: string;
  }>({});

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    // TODO: Implement form submission logic
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
            placeholder={"Samsung Galaxy S23"}
          />
          <TextInput
            id={"description-input"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"A powerful smartphone with a stunning display."}
          />

          {/* TODO: --------------------------------------------------------------- */}

          <ArrayInput
            id={"categories-input"}
            value={categories}
            onChange={setCategories}
            error={fieldsErrors.categories}
            label={"Categories"}
            placeholder={"Smartphones, Electronics, Gadgets"}
          />

          {/* TODO: --------------------------------------------------------------- */}

        </form>
      </MainBase.Form>
    </>
  );
}