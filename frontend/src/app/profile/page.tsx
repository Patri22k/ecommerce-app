"use client";

import Navbar from "@/components/common/Navbar";
import RedirectLink from "@/components/common/link/RedirectLink";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import SmartHubLogo from "@/components/ui/SmartHubLogo";
import {useEffect, useState} from "react";
import MainBase from "@/components/common/Main";

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
      <MainBase>
        {loggedIn ? (
          <RedirectLink href={"/auth/login"} />
        ) : (
          <div>
            {/* TODO: Implement profile info like name, email, etc. */}
            <span>You are currently logged in!</span>
          </div>
        )}
      </MainBase>
      <Footer>
        <Navbar/>
      </Footer>
    </>
  );
}