"use client";

import {useParams} from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const pageId = params?.id;

  return (
    <span>
      Router {pageId} is not implemented yet.
    </span>
  );
}