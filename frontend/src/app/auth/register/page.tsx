"use client";

import axios from "axios";
import {useRouter} from "next/navigation";
import React, {FormEvent, useEffect, useState} from "react";
import {LoaderCircle} from "lucide-react";
import Header from "@/components/common/Header";
import Main from "@/components/common/Main";
import SmartHubLogo from "@/components/ui/SmartHubLogo";
import NameInput from "@/components/common/input/NameInput";
import EmailInput from "@/components/common/input/EmailInput";
import PasswordInput from "@/components/common/input/PasswordInput";
import SubmitButton from "@/components/common/button/SubmitButton";
import RedirectLink from "@/components/common/link/RedirectLink";

export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<{
    general?: string;
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const router = useRouter();

  useEffect(() => {
    if (fieldErrors.general) {
      const timeout = setTimeout(() => {
        setFieldErrors({});
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [fieldErrors.general]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      });

      if (response.data?.status === "success") {
        localStorage.setItem("token", response.data.token);
        router.push("/profile");
      } else {
        setFieldErrors({
          general: "Registration failed. Please try again."
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message;

        if (typeof errorMessage === "object") {
          const newErrors: { general?: string; name?: string; email?: string; password?: string } = {};

          for (const issue of errorMessage) {
            const field = issue.path?.[0] as "name" | "email" | "password";

            // Prioritize "required" (e.g., too_small) over format/length errors
            if (!newErrors[field]) {
              newErrors[field] = issue.message;
            }
          }

          setFieldErrors(newErrors);
        } else if (typeof errorMessage === "string") {
          setFieldErrors({
            general: err.response?.data?.message || "An error occurred during registration."
          });
        } else {
          setFieldErrors({
            general: "An unexpected error occurred. Please try again later."
          });
        }
      } else {
        setFieldErrors({
          general: "An unexpected error occurred. Please try again later."
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header>
        <SmartHubLogo/>
      </Header>
      <Main className={"overflow-y-hidden"}>
        <div className={"bg-white py-6"}>
          <div className={"w-[90%] mx-auto"}>
            <form
              id={"register-form"}
              onSubmit={handleSubmit}
              className={"flex flex-col items-center justify-center w-full pb-8 bg-white"}
            >
              <h1 className="text-2xl font-bold mb-4">Register a new account</h1>
              <NameInput
                id={"name-input"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={fieldErrors.name}
              />
              <EmailInput
                id={"email-input"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldErrors.email}
              />
              <PasswordInput
                id={"password-input"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                visibleIcon={true}
                error={fieldErrors.password}
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
                  Register
                </span>
                )
                }
              />
            </form>
            <RedirectLink
              href={"/auth/login"}
              label={"Already have an account? Login"}
              className={"!bg-transparent font-bold text-indigo-600 border rounded"}
            />
          </div>
        </div>
      </Main>
    </>
  );
}