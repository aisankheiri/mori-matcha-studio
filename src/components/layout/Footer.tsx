"use client";

import Container from "@/components/ui/Container";
import { Instagram, MapPin, MessageCircle } from "lucide-react";

export default function FooterDark() {
  return (
    <footer className="relative bg-[#1F2F2A] text-[#E8EFEA]">
      
      {/* subtle glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(107,143,113,0.12),transparent_40%)]" />

      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row md:py-10">
          
          {/* BRAND */}
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A9C3B0]">
            Mori Matcha
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-4">
            
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#6B8F71]/25 bg-white/5 backdrop-blur-md transition hover:bg-[#6B8F71]/20"
            >
              <Instagram size={16} />
            </a>

            <a
              href="https://wa.me/905528618606"
              target="_blank"
              rel="noreferrer"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#6B8F71]/25 bg-white/5 backdrop-blur-md transition hover:bg-[#6B8F71]/20"
            >
              <MessageCircle size={16} />
            </a>

            <div className="flex items-center gap-2 text-xs text-[#A9B8B0]">
              <MapPin size={14} />
              <span>Turkey, Istanbul</span>
            </div>

          </div>
        </div>

        {/* bottom tiny */}
        <div className="border-t border-[#6B8F71]/20 py-4 text-center text-[10px] text-[#7F938A]">
          © 2026 Mori Matcha
        </div>
      </Container>
    </footer>
  );
}