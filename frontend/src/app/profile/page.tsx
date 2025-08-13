"use client";

import Navbar from "@/components/common/navbar";
import RedirectLink from "@/components/common/link/redirect-link";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import SmartHubLogo from "@/components/ui/smarthub-logo";
import MainBase from "@/components/common/main";
import LogOutButton from "@/components/common/button/log-out-button";
import useIsLoggedIn from "@/hooks/use-is-logged-in";
import {useEffect, useState} from "react";
import {ClientProps} from "@/hooks/use-admin-access";
import getUser from "@/lib/get-user";
import ClientProfile from "@/components/client/client-profile";
import {AxiosError} from "axios";

export default function ProfilePage() {
  const loggedIn = useIsLoggedIn();
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<ClientProps | null>(null);

  useEffect(() => {
    if (loggedIn) return;

    const token = localStorage.getItem("token");

    if (!token) return;

    const fetchUserData = async () => {
      const response = await getUser(token);
      setUser(response.data.data);
    };

    fetchUserData().catch((err) => {
      if (err instanceof AxiosError) {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(err.response.data.message || "An error occurred while fetching products.");
        } else if (err.request) {
          // The request was made but no response was received
          setError("No response received from the server.");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(err.message);
        }
      } else {
        // Handle non-Axios errors
        setError("An unexpected error occurred while fetching products.");
      }
    });
  }, [loggedIn]);

  return (
    <>
      <Header>
        <SmartHubLogo/>
      </Header>
      <MainBase>
        {loggedIn ? (
            <div className={"flex flex-col items-center justify-center w-full gap-y-2"}>
              {error ? (
                <span className={"text-red-500"}>
                  Error fetching user data.
                </span>
              ) : user ? (
                <ClientProfile client={user}/>
              ) : (
                <span className={"text-red-600"}>
                  No user data available.
                </span>
              )}
              <LogOutButton className={"absolute !w-[90%] !mx-auto bottom-20"}/>
            </div>
        ) : (
          <RedirectLink href={"/auth/login"} />
        )}
      </MainBase>
      <Footer>
        <Navbar/>
      </Footer>
    </>
  );
}