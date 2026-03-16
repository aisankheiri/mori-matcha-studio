"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <Container className="pt-2">
          <div className="flex items-center justify-between rounded-full border border-white/60 bg-white/65 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-xl md:px-5">
            <a
              href="#"
              className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-dark)] md:text-base"
            >
              Mori Matcha
            </a>

            <nav className="hidden items-center gap-6 md:flex">
              <a
                href="#"
                className="text-sm text-[var(--color-text-soft)] transition hover:text-[var(--color-text)]"
              >
                Home
              </a>
              <a
                href="#"
                className="text-sm text-[var(--color-text-soft)] transition hover:text-[var(--color-text)]"
              >
                Story
              </a>
              <a
                href="#"
                className="text-sm text-[var(--color-text-soft)] transition hover:text-[var(--color-text)]"
              >
                Products
              </a>
              <a
                href="#"
                className="text-sm text-[var(--color-text-soft)] transition hover:text-[var(--color-text)]"
              >
                Contact
              </a>
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <button className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-text)]">
                EN
              </button>
              <button className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-[var(--color-text-soft)]">
                TR
              </button>
              <Button className="ml-2">Order Now</Button>
            </div>

            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-[var(--color-text)] backdrop-blur-md md:hidden"
            >
              ☰
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}