"use client";

import Navbar from "@/components/common/navbar";
import RedirectLink from "@/components/common/link/redirect-link";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import SmartHubLogo from "@/components/ui/smarthub-logo";
import {useEffect, useState} from "react";
import MainBase from "@/components/common/main";

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
            <div>
              {/* TODO: Implement profile info like name, email, etc. */}
              <span>You are currently logged in!</span>
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