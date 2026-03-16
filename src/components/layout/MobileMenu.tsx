"use client";

import Button from "@/components/ui/Button";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/20 backdrop-blur-sm md:hidden">
      <div className="absolute inset-x-4 top-20 rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-[var(--shadow-premium)] backdrop-blur-2xl">
        <div className="flex flex-col gap-3">
          <a
            href="#"
            className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-text)] transition hover:bg-black/[0.04]"
            onClick={onClose}
          >
            Home
          </a>

          <a
            href="#"
            className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-text)] transition hover:bg-black/[0.04]"
            onClick={onClose}
          >
            Story
          </a>

          <a
            href="#"
            className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-text)] transition hover:bg-black/[0.04]"
            onClick={onClose}
          >
            Products
          </a>

          <a
            href="#"
            className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-text)] transition hover:bg-black/[0.04]"
            onClick={onClose}
          >
            Contact
          </a>

          <div className="mt-2 flex items-center gap-2 px-2">
            <button className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-text)]">
              EN
            </button>
            <button className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-[var(--color-text-soft)]">
              TR
            </button>
          </div>

          <div className="mt-3">
            <Button className="w-full">Order Now</Button>
          </div>
        </div>
      </div>

      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 -z-10"
      />
    </div>
  );
}