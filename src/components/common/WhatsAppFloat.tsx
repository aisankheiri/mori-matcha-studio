"use client";

export default function SocialFloat() {
  return (
    <div className="fixed bottom-4 right-4 z-[90] flex flex-col items-center gap-2 md:bottom-5 md:right-5">

      {/* Instagram */}
      <a
        href="https://instagram.com/yourusername"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-[var(--color-primary)] border border-[#6B8F71]/20 shadow-[0_8px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M7.75 2h8.5C19.44 2 22 4.56 22 7.75v8.5C22 19.44 19.44 22 16.25 22h-8.5C4.56 22 2 19.44 2 16.25v-8.5C2 4.56 4.56 2 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5C4 18.32 5.68 20 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm4.5-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
        </svg>
      </a>

      {/* WhatsApp (senin önceki ikonun) */}
      <a
        href="https://wa.me/905528618606?text=Merhaba%20matcha%20ürünleri%20hakkında%20bilgi%20almak%20istiyorum"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-[0_8px_20px_rgba(107,143,113,0.25)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_28px_rgba(107,143,113,0.35)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-5 w-5 fill-current opacity-95"
        >
          <path d="M19.11 17.23c-.27-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.15-1.33-.8-.72-1.34-1.61-1.49-1.88-.16-.27-.02-.41.11-.54.11-.11.27-.29.4-.44.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.82-1.98-.22-.53-.44-.46-.6-.47h-.51c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.22s.96 2.58 1.09 2.76c.13.18 1.89 2.88 4.58 4.03.64.27 1.14.43 1.53.55.64.2 1.22.17 1.68.1.51-.08 1.58-.64 1.8-1.25.22-.62.22-1.15.16-1.25-.07-.1-.24-.16-.51-.29Z" />
          <path d="M16.03 3.2C8.97 3.2 3.25 8.88 3.25 15.9c0 2.25.6 4.44 1.73 6.37L3.14 28.8l6.7-1.75a12.85 12.85 0 0 0 6.19 1.58h.01c7.05 0 12.78-5.68 12.78-12.7 0-3.4-1.33-6.6-3.76-9-2.41-2.4-5.62-3.73-9.03-3.73Zm0 23.3h-.01a10.7 10.7 0 0 1-5.46-1.49l-.39-.23-3.98 1.04 1.06-3.88-.25-.4a10.56 10.56 0 0 1-1.62-5.63c0-5.86 4.8-10.62 10.7-10.62 2.86 0 5.55 1.1 7.57 3.11a10.53 10.53 0 0 1 3.15 7.5c0 5.86-4.8 10.61-10.72 10.61Z" />
        </svg>
      </a>
    </div>
  );
}