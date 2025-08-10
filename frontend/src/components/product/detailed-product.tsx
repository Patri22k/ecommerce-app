import Heading1 from "@/components/ui/heading1";
import Image from "next/image";
import {ProductProps} from "@/components/product/product";
import NoImageAvailable from "@/components/common/no-image-available";

interface DetailedProductProps {
  content: ProductProps;
}

export default function DetailedProduct({content}: DetailedProductProps) {
  return (
    <div className={"flex flex-col items-center justify-start gap-y-6 mx-auto w-[80%] min-h-full p-4"}>
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
      <p>{content.price} €</p>
    </div>
  );
}