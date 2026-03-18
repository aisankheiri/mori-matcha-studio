"use client";

import Container from "@/components/ui/Container";

export default function FooterDark() {
  return (
    <footer className="relative overflow-hidden bg-[#1F2F2A] text-[#E8EFEA]">
      
      {/* subtle gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(107,143,113,0.15),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(107,143,113,0.12),transparent_40%)]" />

      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[1.3fr_0.85fr_0.85fr] md:py-20">
          
          {/* BRAND */}
          <div>
            <div className="inline-flex rounded-full border border-[#6B8F71]/30 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#A9C3B0]">
              Mori Matcha
            </div>

            <h3 className="mt-6 text-3xl font-semibold leading-tight">
              Pure matcha.
              <br />
              Calm ritual.
            </h3>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#A9B8B0]">
              Seremonik matcha, bambu whisk ve özel tasarım bowl koleksiyonuyla
              geleneksel deneyimi modern estetikle buluşturuyoruz.
            </p>
          </div>

          {/* MENU */}
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#CFE2D6]">
              Navigation
            </div>

            <nav className="mt-5 flex flex-col gap-3 text-sm text-[#A9B8B0]">
              <a href="#" className="transition hover:text-white">
                Ana Sayfa
              </a>
              <a href="#" className="transition hover:text-white">
                Ürünler
              </a>
              <a href="#" className="transition hover:text-white">
                Tarifler
              </a>
              <a href="#" className="transition hover:text-white">
                Koleksiyon
              </a>
            </nav>
          </div>

          {/* CONTACT */}
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#CFE2D6]">
              Contact
            </div>

            <div className="mt-5 flex flex-col gap-3 text-sm text-[#A9B8B0]">
              
              <a
                href="mailto:hello@morimatcha.com"
                className="transition hover:text-white"
              >
                hello@morimatcha.com
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                className="transition hover:text-white"
              >
                Instagram
              </a>

              <a
                href="https://wa.me/905528618606?text=Merhaba%20matcha%20ürünleri%20hakkında%20bilgi%20almak%20istiyorum"
                target="_blank"
                className="mt-2 inline-flex items-center gap-2 text-[#6B8F71] transition hover:text-[#9EC5A8]"
              >
                WhatsApp ile iletişime geç →
              </a>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="border-t border-[#6B8F71]/20 py-6">
          <div className="flex flex-col gap-3 text-xs text-[#7F938A] md:flex-row md:items-center md:justify-between">
            <p>© 2026 Mori Matcha</p>
            <p className="tracking-wide">designed for a calm experience</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}