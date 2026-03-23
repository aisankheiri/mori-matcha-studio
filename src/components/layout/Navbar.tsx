"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import { useState } from "react";
import { ShoppingBag, House, Package, Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [lang, setLang] = useState<"TR" | "EN">("TR");
  const { totalItems } = useCart();
  const pathname = usePathname();

  const navItemClass = (href: string) =>
    [
      "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
      pathname === href
        ? "bg-[var(--color-primary)] text-white shadow-[0_8px_22px_rgba(107,143,113,0.28)]"
        : "text-[var(--color-text-soft)] hover:bg-white/80 hover:text-[var(--color-text)]",
    ].join(" ");

  const cartButtonClass =
    pathname === "/cart"
      ? "relative flex items-center justify-center rounded-full bg-[var(--color-primary)] p-2.5 text-white shadow-[0_8px_22px_rgba(107,143,113,0.28)] transition-all duration-300"
      : "relative flex items-center justify-center rounded-full border border-[#6B8F71]/15 bg-white/85 p-2.5 text-[var(--color-primary-dark)] transition-all duration-300 hover:bg-white hover:shadow-[0_8px_22px_rgba(107,143,113,0.15)]";

  const mobileFloatItemClass = (href: string) =>
    [
      "relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.08)]",
      pathname === href
        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
        : "border-white/60 bg-white/85 text-[var(--color-primary-dark)] hover:bg-white",
    ].join(" ");

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <Container>
          <div className="mt-4 rounded-[28px] border border-white/60 bg-white/70 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-xl md:rounded-full md:px-6">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/"
                className="shrink-0 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-dark)] transition hover:opacity-80"
              >
                Mori Matcha
              </Link>

              <nav className="hidden items-center gap-2 md:flex">
                <Link href="/" className={navItemClass("/")}>
                  Home
                </Link>

                <Link href="/products" className={navItemClass("/products")}>
                  Products
                </Link>

                <Link href="/cart" className={navItemClass("/cart")}>
                  Cart
                </Link>
              </nav>

              <div className="hidden items-center gap-3 md:flex">
                <div className="flex items-center rounded-full border border-[#6B8F71]/20 bg-white/80 p-1 backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
                  <button
                    onClick={() => setLang("TR")}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                      lang === "TR"
                        ? "bg-[var(--color-primary)] text-white shadow-[0_6px_16px_rgba(107,143,113,0.28)]"
                        : "text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    <span>🇹🇷</span>
                    <span>TR</span>
                  </button>

                  <button
                    onClick={() => setLang("EN")}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                      lang === "EN"
                        ? "bg-[var(--color-primary)] text-white shadow-[0_6px_16px_rgba(107,143,113,0.28)]"
                        : "text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>EN</span>
                  </button>
                </div>

                <Link href="/cart" className={cartButtonClass}>
                  <ShoppingBag size={18} />
                  {totalItems > 0 && (
                    <span
                      className={`absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold ${
                        pathname === "/cart"
                          ? "bg-white text-[var(--color-primary-dark)]"
                          : "bg-[var(--color-primary)] text-white"
                      }`}
                    >
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* MOBILE FLOATING MINI NAV */}
      <div className="fixed right-3 top-[12%] z-[95] flex flex-col gap-3 md:hidden">
        <Link href="/" className={mobileFloatItemClass("/")}>
          <House size={18} />
        </Link>

        <Link href="/products" className={mobileFloatItemClass("/products")}>
          <Package size={18} />
        </Link>

        <Link href="/cart" className={mobileFloatItemClass("/cart")}>
          <ShoppingBag size={18} />
          {totalItems > 0 && (
            <span
              className={`absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold ${
                pathname === "/cart"
                  ? "bg-white text-[var(--color-primary-dark)]"
                  : "bg-[var(--color-primary)] text-white"
              }`}
            >
              {totalItems}
            </span>
          )}
        </Link>

        <button
          onClick={() => setLang((prev) => (prev === "TR" ? "EN" : "TR"))}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/85 text-[var(--color-primary-dark)] shadow-[0_10px_25px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:bg-white"
        >
          {lang === "TR" ? "🇹🇷" : "🇬🇧"}
        </button>
      </div>
    </>
  );
}