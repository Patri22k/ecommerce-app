import Header from "@/components/common/Header";
import SmartHubLogo from "@/components/ui/SmartHubLogo";
import Main from "@/components/common/Main";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import NameInput from "@/components/common/button/NameInput";
import EmailInput from "@/components/common/button/EmailInput";

export default function LoginPage() {
  return (
    <>
      <Header>
        <SmartHubLogo/>
      </Header>
      <Main>
        {/* TODO: add onSubmit */}
        <form
          className={"flex flex-col items-center justify-center w-full"}
        >
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <NameInput/>
          <EmailInput/>
        </form>
      </Main>
      <Footer>
        <Navbar/>
      </Footer>
    </>
  );
}