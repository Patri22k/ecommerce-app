import Navbar from "@/components/common/Navbar";
import LogInButton from "@/components/common/button/LogInButton";
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
      <Main>
        <LogInButton />
      </Main>
      <Footer>
        <Navbar/>
      </Footer>
    </>
  );
}