"use client";

import Header from "@/components/common/Header";
import SmartHubLogo from "@/components/ui/SmartHubLogo";
import Main from "@/components/common/Main";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import NameInput from "@/components/common/input/NameInput";
import EmailInput from "@/components/common/input/EmailInput";
import React, {FormEvent, useState} from "react";
import SubmitButton from "@/components/common/button/SubmitButton";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      if (response.data?.status ==="success") {
        // Handle successful login, e.g., redirect to dashboard or show success message
        console.log("Login successful:", response.data);
        // You might want to redirect the user or store the token in localStorage/sessionStorage
      } else {
        // Handle unexpected response
        setError("Login failed. Please try again.");
      }

    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.status === "fail") {
        setError(err.response?.data?.message || "An error occurred during login.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  }
  // TODO: change name to password input (I had name and email, but should be email and password)

  return (
    <>
      <Header>
        <SmartHubLogo/>
      </Header>
      <Main>
        <form
          onSubmit={handleSubmit}
          className={"flex flex-col items-center justify-center w-full"}
        >
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <NameInput
            id={"name-input"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <EmailInput
            id={"email-input"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SubmitButton/>
        </form>
        {error && (
          <span className={"text-red-600 py-2"}>
            {error}
          </span>
        )}
      </Main>
      <Footer>
        <Navbar/>
      </Footer>
    </>
  );
}