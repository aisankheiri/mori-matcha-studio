"use client";

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";

export default function OrderSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const orderNumber = params.orderNumber as string;
  const { clearCart } = useCart();
  const { lang } = useLang();

  const pageText = useMemo(
    () => ({
      title:
        lang === "TR"
          ? "Siparişiniz başarıyla alındı"
          : "Your order has been received successfully",

      subtitle:
        lang === "TR"
          ? "Sipariş özetiniz e-posta adresinize gönderilecektir."
          : "Your order summary will be sent to your email address.",

      orderNumberLabel:
        lang === "TR" ? "Sipariş Numarası" : "Order Number",

      backHome:
        lang === "TR" ? "Ana Sayfaya Dön" : "Back to Home",

      viewProducts:
        lang === "TR" ? "Ürünleri İncele" : "Explore Products",
    }),
    [lang]
  );

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--color-bg)] pt-20 pb-20 md:pt-24">
        <Container>
          <div className="mx-auto max-w-2xl rounded-[32px] border border-white/60 bg-white/70 p-8 text-center shadow-[var(--shadow-soft)] backdrop-blur-xl md:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#6B8F71]/12 text-2xl text-[var(--color-primary-dark)]">
              ✓
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-[var(--color-text)]">
              {pageText.title}
            </h1>

            <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
              {pageText.subtitle}
            </p>

            <div className="mt-6 rounded-[20px] bg-[var(--color-bg)] px-5 py-4">
              <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {pageText.orderNumberLabel}
              </div>

              <div className="mt-2 text-lg font-semibold text-[var(--color-primary-dark)]">
                {orderNumber}
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                className="w-full sm:w-auto"
                onClick={() => router.push("/")}
              >
                {pageText.backHome}
              </Button>

              <Button
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => router.push("/products")}
              >
                {pageText.viewProducts}
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}