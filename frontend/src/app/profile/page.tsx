"use client";

import Navbar from "@/components/common/Navbar";
import RedirectLink from "@/components/common/link/RedirectLink";
import Main from "@/components/common/Main";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import SmartHubLogo from "@/components/ui/SmartHubLogo";
import {useEffect, useState} from "react";

export default function ProfilePage() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <>
      <Header>
        <SmartHubLogo/>
      </Header>
      <Main className={"!w-[90%] !mx-auto pt-4"}>
        {loggedIn ? (
          <RedirectLink href={"/auth/login"} />
        ) : (
          <div>
            {/* TODO: Implement profile info like name, email, etc. */}
          </div>
        )}
      </Main>
      <Footer>
        <Navbar/>
      </Footer>
    </>
  );
}