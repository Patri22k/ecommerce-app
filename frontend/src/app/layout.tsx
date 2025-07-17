import "@/styles/globals.css";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-between w-full min-h-screen py-2"
      >
        {children}
      </body>
    </html>
  );
}
