"use client";

import axios from "axios";
import {useRouter} from "next/navigation";
import React, {FormEvent, useState} from "react";
import {LoaderCircle} from "lucide-react";
import Header from "@/components/common/header";
import SmartHubLogo from "@/components/ui/smarthub-logo";
import SubmitButton from "@/components/common/button/submit-button";
import PasswordInput from "@/components/common/input/password-input";
import EmailInput from "@/components/common/input/email-input";
import RedirectLink from "@/components/common/link/redirect-link";
import MainBase from "@/components/common/main";
import Heading1 from "@/components/ui/heading1";
import useAutoClearError from "@/hooks/use-auto-clear-error";
import getUser from "@/lib/get-user";
import loginUser from "@/lib/auth/login";


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

  useAutoClearError(fieldErrors.general, setFieldErrors);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});
    setLoading(true);

    try {
      const response = await loginUser(email, password);

      if (response.data?.status === "success") {
        const token = response.data.token;
        localStorage.setItem("token", token);

        const user = await getUser(token);
        const userData = user.data.data;

        if (userData.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/profile");
        }
      } else {
        // Handle unexpected response
        setFieldErrors({
          general: "Login failed. Please try again."
        });
      }

    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message;

        if (typeof errorMessage === "object") {
          const newErrors: { general?: string; email?: string; password?: string } = {};

          for (const issue of errorMessage) {
            const field = issue.path?.[0] as "email" | "password";

            // Prioritize "required" (e.g., too_small) over format/length errors
            if (!newErrors[field]) {
              newErrors[field] = issue.message;
            }
          }

          setFieldErrors(newErrors);
        } else if (typeof errorMessage === "string") {
          setFieldErrors({
            general: errorMessage
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
      <MainBase.Form>
        <form
          id={"login-form"}
          onSubmit={handleSubmit}
          className={"flex flex-col items-center justify-center w-full pb-8 bg-white"}
        >
          <Heading1>Login</Heading1>
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
      </MainBase.Form>
    </>
  );
}