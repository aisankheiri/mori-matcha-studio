import Container from "@/components/ui/Container";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-28 pb-20 md:pt-32">
      <Container>
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[#6B8F71]/15 bg-white/75 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary-dark)] shadow-[var(--shadow-soft)] backdrop-blur-md md:text-[11px]">
            Contact
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--color-text)] md:text-6xl">
            İletişim
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
            Ürünler, siparişler ve iş birlikleri için bizimle iletişime geçin.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-white/60 bg-white/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-dark)]">
                E-posta
              </div>
              <p className="mt-3 text-sm text-[var(--color-text-soft)]">
                hello@morimatcha.com
              </p>
            </div>

            <div className="rounded-[24px] border border-white/60 bg-white/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-dark)]">
                WhatsApp
              </div>
              <a
                href="https://wa.me/905528618606?text=Merhaba%20matcha%20ürünleri%20hakkında%20bilgi%20almak%20istiyorum"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm text-[var(--color-text-soft)] transition hover:text-[var(--color-text)]"
              >
                0552 861 86 06
              </a>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}