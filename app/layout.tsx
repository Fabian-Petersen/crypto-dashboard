import type { Metadata } from "next";
import "./globals.css";
import RootLayout from "./rootLayout";

export const metadata: Metadata = {
  title: "Crypto App",
  description: "A dashboard to track stocks and cryptocurrencies",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
