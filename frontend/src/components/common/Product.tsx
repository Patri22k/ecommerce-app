import Image from "next/image";
import {ShoppingCart} from "lucide-react";

export interface ProductProps {
  id?: string;
  name: string;
  description: string;
  category?: string[];
  imageUrl: string;
  price: number;
}

export default function Product(props: ProductProps) {
  const {name, price, imageUrl=""} = props;

  return (
    <div className={"flex flex-col justify-center items-center text-center text-xs w-full " +
    "shadow rounded pt-2 gap-y-2 bg-white"}>
      <div className={"flex flex-col justify-center items-center text-left gap-y-2 pb-1"}>
        <Image
          src={imageUrl}
          className="w-full h-auto py-2"
          alt="Product Image"
          width="0"
          height="0"
          sizes="100vw"
        />
        <span className={"w-[90%] mx-auto text-cyan-800"}>{name}</span>
        <span className={"text-base font-bold w-[90%] mx-auto text-red-600"}>{price} €</span>
      </div>
      <button className={"flex items-center justify-center gap-x-2 text-emerald-500 " +
        "border-t border-t-black/20 w-full py-2 font-semibold"}>
        <ShoppingCart className={"w-5 h-5"}/>
        <span className={"text-xs"}>To Cart</span>
      </button>
    </div>
  );
}