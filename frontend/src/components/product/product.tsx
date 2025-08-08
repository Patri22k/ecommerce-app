import Image from "next/image";
import {ShoppingCart} from "lucide-react";
import React from "react";

export interface ProductProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id?: string;
  title?: string;
  description?: string;
  category?: string[];
  imageUrl?: string;
  price?: number;
  moreInfo?: () => void;
}

export default function Product({title,price,imageUrl, moreInfo, ...next}: ProductProps) {
  return (
    <div className={"flex flex-col justify-center items-center text-center text-xs w-full " +
    "shadow rounded pt-2 gap-y-2 bg-white"} onClick={() => moreInfo?.()} {...next}>
      <div className={"flex flex-col justify-center items-center w-[90%] mx-auto gap-y-2 pb-1"}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            className="w-full h-auto py-2"
            alt="Product Image"
            width="0"
            height="0"
            sizes="100vw"
          />
        ) : (
          <div className={"w-full py-10 bg-gray-200 flex items-center justify-center"}>
            <span className={"text-gray-500"}>No image available</span>
          </div>
        )}
        <span className={"w-[90%] mx-auto text-cyan-800"}>{title}</span>
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