"use client";

import Container from "@/components/ui/Container";
import { MapPin } from "lucide-react";

export default function FooterDark() {
  return (
    <footer className="relative bg-[#1F2F2A] text-[#E8EFEA]">
      
      {/* subtle glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(107,143,113,0.12),transparent_40%)]" />

      <Container>
        <div className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row md:py-8">
          
          {/* BRAND */}
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A9C3B0] md:text-sm">
            Mori Matcha
          </div>

          {/* LOCATION */}
          <div className="flex items-center gap-2 text-[11px] text-[#A9B8B0] md:text-xs">
            <MapPin size={14} />
            <span>Turkey, Istanbul</span>
          </div>

        </div>

        {/* bottom tiny */}
        <div className="border-t border-[#6B8F71]/20 py-3 text-center text-[10px] text-[#7F938A]">
          © 2026 Mori Matcha
        </div>
      </Container>
    </footer>
  );
}