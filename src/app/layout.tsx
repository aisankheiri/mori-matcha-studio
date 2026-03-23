import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { LangProvider } from "@/context/LangContext";

export const metadata: Metadata = {
  title: "Mori Matcha",
  description: "Premium matcha experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <LangProvider>
          <CartProvider>
            <ToastProvider>{children}</ToastProvider>
          </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}