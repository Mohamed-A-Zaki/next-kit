import { fonts } from "@/utils/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "your project name",
    template: "%s | your project name",
  },
  description: "your project description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fonts.roboto.className}>{children}</body>
    </html>
  );
}
