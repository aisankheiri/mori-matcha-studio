"use client";

import Container from "@/components/ui/Container";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import Image from "next/image";

export default function FooterDark() {
  const { lang } = useLang();

  return (
    <footer className="relative bg-[#1F2F2A] text-[#E8EFEA]">

      {/* glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(107,143,113,0.12),transparent_40%)]" />

      <Container>
        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">

          {/* BRAND */}
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A9C3B0] text-center md:text-left md:text-sm">
            Matchaora
          </div>

          {/* LINKS */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#A9B8B0] md:text-xs">
            <Link href="/about" className="hover:text-white transition">
              {lang === "TR" ? "Hakkımızda" : "About"}
            </Link>

            <Link href="/privacy-policy" className="hover:text-white transition">
              {lang === "TR" ? "Gizlilik" : "Privacy"}
            </Link>

            <Link href="/distance-sales-agreement" className="hover:text-white transition">
              {lang === "TR" ? "Sözleşme" : "Agreement"}
            </Link>

            <Link href="/delivery-return" className="hover:text-white transition">
              {lang === "TR" ? "Teslimat & İade" : "Delivery & Return"}
            </Link>
          </div>

          {/* LOCATION */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-[#A9B8B0] md:text-xs">
            <MapPin size={14} />
            <span>Turkey, Istanbul</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-[#6B8F71]/20 py-4 text-[10px] text-[#7F938A]">




          {/* COPYRIGHT */}
          <div className="mt-1">
            © 2026 Matchaora
          </div>

        </div>
      </Container>
    </footer>
  );
}