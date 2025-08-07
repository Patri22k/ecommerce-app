import {AdminProductProps} from "@/components/product/admin-product";
import Heading1 from "@/components/ui/heading1";
import Image from "next/image";

interface DetailedAdminProductProps {
  content: AdminProductProps;
}

export default function DetailedAdminProduct({content}: DetailedAdminProductProps) {
  return (
    <div className={"flex flex-col items-center justify-start gap-y-6 w-full min-h-screen p-4"}>
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
        <div className={"w-full h-64 bg-gray-200 flex items-center justify-center"}>
          <span className={"text-gray-500"}>No image available</span>
        </div>
      )}
      <p>{content.description}</p>
      <p>{content.status}</p>
      <p>{content.price}</p>
    </div>
  );
}