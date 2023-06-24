import "@/src/styles/globals.css";
import cx from "classnames";
import { cal, inter } from "@/src/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { Toaster } from "sonner";


const title =
  "Journal Saga";
const description =
  "Journal with superpowers.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "",
  },
  metadataBase: new URL("https://journal-saga.vercel.app/"),
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Toaster />
      <body className={cx(cal.variable, inter.variable)}>{children}</body>
      <Analytics />
    </html>
  );
}
