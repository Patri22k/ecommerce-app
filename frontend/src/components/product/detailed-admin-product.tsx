import {AdminProductProps} from "@/components/product/admin-product";
import Heading1 from "@/components/ui/heading1";
import Image from "next/image";
import NoImageAvailable from "@/components/common/no-image-available";
import RedirectLink from "@/components/common/link/redirect-link";

interface DetailedAdminProductProps {
  content: AdminProductProps;
}

export default function DetailedAdminProduct({content}: DetailedAdminProductProps) {
  return (
    <div className={"flex flex-col items-center justify-start gap-y-6 min-h-screen w-[80%] mx-auto p-4"}>
      <Heading1>{content.title}</Heading1>
      {content.imageUrl ? (
        <Image
          src={content.imageUrl}
          alt={"Product Image"}
          width={500}
          height={500}
          className={"w-full h-auto rounded-lg"}
        />
      ) : (
        <NoImageAvailable/>
      )}
      <p>{content.description}</p>
      <p>{content.status}</p>
      <p>{content.price}</p>
      <RedirectLink className={"w-full"} href={"/admin"} label={"Back to Admin Panel"}/>
    </div>
  );
}