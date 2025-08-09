"use client";

import Navbar from "@/components/common/navbar";
import RedirectLink from "@/components/common/link/redirect-link";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import SmartHubLogo from "@/components/ui/smarthub-logo";
import MainBase from "@/components/common/main";
import LogOutButton from "@/components/common/button/log-out-button";
import useIsLoggedIn from "@/hooks/use-is-logged-in";

export default function ProfilePage() {
  const loggedIn = useIsLoggedIn();

  return (
    <>
      <Header>
        <SmartHubLogo/>
      </Header>
      <MainBase>
        {loggedIn ? (
            <div className={"flex flex-col items-center justify-center w-full gap-y-3"}>
              {/* TODO: Implement profile info like name, email, etc. */}
              <span>You are currently logged in!</span>
              <LogOutButton/>
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