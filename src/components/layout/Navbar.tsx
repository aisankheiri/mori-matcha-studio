"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { useLang } from "@/context/LangContext";
import { dict } from "@/i18n/dict";
import { ShoppingBag, House, Package } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { lang, setLang } = useLang();
  const t = dict[lang];
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

  const mobileIconClass = (href: string) =>
    [
      "relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 backdrop-blur-xl",
      pathname === href
        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_8px_18px_rgba(107,143,113,0.22)]"
        : "border-white/60 bg-white/85 text-[var(--color-primary-dark)] hover:bg-white",
    ].join(" ");

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full">
      <Container>
        <div className="mt-4 rounded-[22px] border border-white/60 bg-white/70 px-3 py-2.5 shadow-[var(--shadow-soft)] backdrop-blur-xl md:rounded-full md:px-6 md:py-3">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="flex shrink-0 items-center transition hover:opacity-80"
              aria-label="Matchaora Home"
            >
              <Image
                src="/favicon2.png"
                alt="Matchaora logo"
                width={344}
                height={144}
                className="h-13 w-27 object-contain md:h-17 md:w-38"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-2 md:flex">
              <Link href="/" className={navItemClass("/")}>
                {t.nav.home}
              </Link>

              <Link href="/products" className={navItemClass("/products")}>
                {t.nav.products}
              </Link>

              <Link href="/cart" className={navItemClass("/cart")}>
                {t.nav.cart}
              </Link>
            </nav>

            {/* Desktop right */}
            <div className="hidden items-center gap-3 md:flex">
              <div className="flex items-center rounded-full border border-[#6B8F71]/20 bg-white/80 p-1 backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
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
            </div>

            {/* Mobile nav inside navbar */}
            <div className="flex items-center gap-1.5 md:hidden">
              <Link href="/" className={mobileIconClass("/")}>
                <House size={17} />
              </Link>

              <Link href="/products" className={mobileIconClass("/products")}>
                <Package size={17} />
              </Link>

              <Link href="/cart" className={mobileIconClass("/cart")}>
                <ShoppingBag size={17} />
                {totalItems > 0 && (
                  <span
                    className={`absolute -right-1 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full px-1 text-[9px] font-semibold ${
                      pathname === "/cart"
                        ? "bg-white text-[var(--color-primary-dark)]"
                        : "bg-[var(--color-primary)] text-white"
                    }`}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>

              <div className="relative flex items-center rounded-full border border-[#6B8F71]/10 bg-white/70 p-[2px] shadow-[0_4px_12px_rgba(0,0,0,0.04)] backdrop-blur-xl">
                <div
                  className={`absolute top-[2px] bottom-[2px] w-[28px] rounded-full bg-[var(--color-primary)] shadow-[0_4px_10px_rgba(107,143,113,0.22)] transition-all duration-300 ${
                    lang === "TR" ? "left-[2px]" : "left-[30px]"
                  }`}
                />

                <button
                  onClick={() => setLang("TR")}
                  className={`relative z-10 flex h-6 w-7 items-center justify-center rounded-full text-[7px] font-semibold tracking-[0.08em] transition-all duration-300 ${
                    lang === "TR"
                      ? "text-white"
                      : "text-[var(--color-text-soft)]"
                  }`}
                >
                  TR
                </button>

                <button
                  onClick={() => setLang("EN")}
                  className={`relative z-10 flex h-6 w-7 items-center justify-center rounded-full text-[7px] font-semibold tracking-[0.08em] transition-all duration-300 ${
                    lang === "EN"
                      ? "text-white"
                      : "text-[var(--color-text-soft)]"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}