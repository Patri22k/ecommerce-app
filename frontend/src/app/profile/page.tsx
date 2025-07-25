import Navbar from "@/components/common/Navbar";
import RedirectLink from "@/components/common/link/RedirectLink";
import Main from "@/components/common/Main";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import SmartHubLogo from "@/components/ui/SmartHubLogo";

export default function ProfilePage() {
  return (
    <>
      <Header>
        <SmartHubLogo/>
      </Header>
      <Main className={"!w-[90%] !mx-auto pt-4"}>
        <RedirectLink href={"/auth/login"} />
      </Main>
      <Footer>
        <Navbar/>
      </Footer>
    </>
  );
}