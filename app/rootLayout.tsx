"use client";

// $ Context Providers
import Providers from "./providers";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="font-poppins">
      <body className="bg-white dark:bg-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
