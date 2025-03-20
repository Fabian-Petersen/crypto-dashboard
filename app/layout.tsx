import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crypto App",
  description: "A dashboard to track stocks and cryptocurrencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
