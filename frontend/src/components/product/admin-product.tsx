import Image from "next/image";
import {ShoppingCart, X} from "lucide-react";
import React from "react";

export interface AdminProductProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id?: string;
  title?: string;
  description?: string;
  category?: string[];
  imageUrl?: string;
  price?: number;
  status?: "in-stock" | "out-of-stock" | "discontinued";
  moreInfo?: () => void;
  onDelete?: () => void | Promise<void>;
}

export default function AdminProduct({title,price,imageUrl="", moreInfo, onDelete, ...next}: AdminProductProps) {
  return (
    <div className={"relative flex flex-col justify-center items-center text-center text-xs w-full " +
      "shadow rounded-xl pt-2 gap-y-2 bg-white hover:bg-neutral-100"} {...next}
      onClick={() => moreInfo?.()}
    >
      <button
        className={"absolute flex justify-center items-center top-2 right-2 text-gray-800 hover:text-red-600"}
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }
      }
        aria-label={"Delete Product"}
      >
        <X className={"w-4 h-auto"}/>
      </button>

      <div
        className={"flex flex-col justify-center items-center w-[90%] mx-auto text-center gap-y-2 pb-1"}
      >
        <Image
          src={imageUrl}
          className="w-full h-auto py-2"
          alt="Product Image"
          width="0"
          height="0"
          sizes="100vw"
        />
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