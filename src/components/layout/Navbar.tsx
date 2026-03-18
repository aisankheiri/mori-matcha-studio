"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [lang, setLang] = useState<"TR" | "EN">("TR");
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();

  const navItemClass = (href: string) =>
    [
      "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
      pathname === href
        ? "bg-[var(--color-primary)] text-white shadow-[0_8px_22px_rgba(107,143,113,0.28)]"
        : "text-[var(--color-text-soft)] hover:bg-white/80 hover:text-[var(--color-text)]",
    ].join(" ");

  const mobileNavItemClass = (href: string) =>
    [
      "inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-all duration-300",
      pathname === href
        ? "bg-[var(--color-primary)] text-white shadow-[0_8px_22px_rgba(107,143,113,0.22)]"
        : "bg-white/70 text-[var(--color-text-soft)] hover:bg-white hover:text-[var(--color-text)]",
    ].join(" ");

  const cartButtonClass =
    pathname === "/cart"
      ? "relative flex items-center justify-center rounded-full bg-[var(--color-primary)] p-2.5 text-white shadow-[0_8px_22px_rgba(107,143,113,0.28)] transition-all duration-300"
      : "relative flex items-center justify-center rounded-full border border-[#6B8F71]/15 bg-white/85 p-2.5 text-[var(--color-primary-dark)] transition-all duration-300 hover:bg-white hover:shadow-[0_8px_22px_rgba(107,143,113,0.15)]";

  return (
    <header className="sticky top-0 z-50 w-full">
      <Container>
        <div className="mt-4 rounded-[28px] border border-white/60 bg-white/70 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-xl md:rounded-full md:px-6">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="shrink-0 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-dark)] transition hover:opacity-80"
              onClick={() => setMenuOpen(false)}
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

            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden items-center rounded-full border border-[#6B8F71]/20 bg-white/80 p-1 backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.04)] sm:flex">
                <button
                  onClick={() => setLang("TR")}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    lang === "TR"
                      ? "bg-[var(--color-primary)] text-white shadow-[0_6px_16px_rgba(107,143,113,0.28)]"
                      : "text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
                  }`}
                >
                  TR
                </button>

                <button
                  onClick={() => setLang("EN")}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    lang === "EN"
                      ? "bg-[var(--color-primary)] text-white shadow-[0_6px_16px_rgba(107,143,113,0.28)]"
                      : "text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
                  }`}
                >
                  EN
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

              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6B8F71]/15 bg-white/85 text-[var(--color-primary-dark)] transition hover:bg-white md:hidden"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="mt-4 border-t border-[#6B8F71]/10 pt-4 md:hidden">
              <div className="mb-4 flex items-center justify-center rounded-full border border-[#6B8F71]/20 bg-white/80 p-1 backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.04)] sm:hidden">
                <button
                  onClick={() => setLang("TR")}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    lang === "TR"
                      ? "bg-[var(--color-primary)] text-white shadow-[0_6px_16px_rgba(107,143,113,0.28)]"
                      : "text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
                  }`}
                >
                  TR
                </button>

                <button
                  onClick={() => setLang("EN")}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    lang === "EN"
                      ? "bg-[var(--color-primary)] text-white shadow-[0_6px_16px_rgba(107,143,113,0.28)]"
                      : "text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
                  }`}
                >
                  EN
                </button>
              </div>

              <nav className="flex flex-col gap-3">
                <Link
                  href="/"
                  className={mobileNavItemClass("/")}
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>

                <Link
                  href="/products"
                  className={mobileNavItemClass("/products")}
                  onClick={() => setMenuOpen(false)}
                >
                  Products
                </Link>

                <Link
                  href="/cart"
                  className={mobileNavItemClass("/cart")}
                  onClick={() => setMenuOpen(false)}
                >
                  Cart
                </Link>
              </nav>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}