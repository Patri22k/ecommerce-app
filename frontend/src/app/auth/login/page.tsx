"use client";

import axios from "axios";
import {useRouter} from "next/navigation";
import React, {FormEvent, useEffect, useState} from "react";
import {LoaderCircle} from "lucide-react";
import Header from "@/components/common/Header";
import Main from "@/components/common/Main";
import SmartHubLogo from "@/components/ui/SmartHubLogo";
import SubmitButton from "@/components/common/button/SubmitButton";
import PasswordInput from "@/components/common/input/PasswordInput";
import EmailInput from "@/components/common/input/EmailInput";
import RedirectLink from "@/components/common/link/RedirectLink";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<{
    general?: string;
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
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      if (response.data?.status === "success") {
        localStorage.setItem("token", response.data.token);
        router.push("/profile");
      } else {
        // Handle unexpected response
        setFieldErrors({
          general: "Login failed. Please try again."
        });
      }

    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message;

        if (errorMessage instanceof Object || typeof errorMessage === "object") {
          const newErrors: { general?: string; email?: string; password?: string } = {};

          for (const issue of errorMessage) {
            const field = issue.path?.[0] as "email" | "password";

            // Prioritize "required" (e.g., too_small) over format/length errors
            if (!newErrors[field]) {
              newErrors[field] = issue.message;
            }
          }

          setFieldErrors(newErrors);
        } else if (errorMessage instanceof String || typeof errorMessage === "string") {
          setFieldErrors({
            general: err.response?.data?.message || "An error occurred during login."
          });
        } else {
          setFieldErrors({
            general: "An error occurred during login. Please try again later."
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
  }

  return (
    <>
      <Header className={"flex items-center justify-center"}>
        <SmartHubLogo/>
      </Header>
      <Main>
        <div className={"bg-white py-6"}>
          <div className={"w-[90%] mx-auto"}>
            <form
              id={"login-form"}
              onSubmit={handleSubmit}
              className={"flex flex-col items-center justify-center w-full pb-8 bg-white"}
            >
              <h1 className="text-2xl font-bold mb-4">Login</h1>
              <div className={"inputs flex flex-col items-center justify-center w-full"}>
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
              </div>
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
                    Login
                  </span>
                )}
              />
            </form>
            <RedirectLink
              href={"/auth/register"}
              label={"Register new account"}
              className={"!bg-transparent font-bold text-indigo-600 border rounded"}
            />
          </div>
        </div>
      </Main>
    </>
  );
}