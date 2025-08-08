"use client";

import {useParams} from "next/navigation";
import RedirectLink from "@/components/common/link/redirect-link";

export default function ProductPage() {
  const params = useParams();
  const pageId = params?.id as string; // currently pageId is productId

  // TODO
  return (
    <div>
      <h1 className="text-2xl font-bold">Product Page</h1>
      <p className="mt-4">This is the product page for product ID: {pageId}</p>
      <RedirectLink href={'/'} label={"Back to Menu"} />
    </div>
  );
}