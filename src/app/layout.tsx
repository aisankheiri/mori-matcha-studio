import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mori Matcha Studio",
  description: "Premium bilingual matcha and coffee brand website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}