"use client";

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/ui/Container";
import { useLang } from "@/context/LangContext";
import { dict } from "@/i18n/dict";

export default function AboutPage() {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--color-bg)] pt-28 pb-20 md:pt-32 md:pb-24">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#f7f6f2_0%,#f2efe9_100%)]" />
          <div className="absolute left-[8%] top-[8%] -z-10 h-[220px] w-[220px] rounded-full bg-[#dce8d8]/30 blur-3xl md:h-[320px] md:w-[320px]" />
          <div className="absolute right-[8%] top-[22%] -z-10 h-[180px] w-[180px] rounded-full bg-[#e8dfcf]/30 blur-3xl md:h-[260px] md:w-[260px]" />

          <Container>
            <div className="mx-auto max-w-[var(--container-width)]">
              {/* HERO */}
              <div className="grid items-center gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
                <div>
                  <span className="inline-flex rounded-full border border-[#6B8F71]/15 bg-white/75 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary-dark)] shadow-[var(--shadow-soft)] backdrop-blur-md md:text-[11px]">
                    {t.about.badge}
                  </span>

                  <h1 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-tight text-[var(--color-text)] md:mt-6 md:text-6xl">
                    {t.about.title}
                  </h1>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
                    {t.about.text}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[22px] border border-white/60 bg-white/70 p-4 shadow-[var(--shadow-soft)] backdrop-blur-lg">
                      <div className="text-lg font-semibold text-[var(--color-text)]">
                        {t.about.stats.oneTitle}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        {t.about.stats.oneText}
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-white/60 bg-white/70 p-4 shadow-[var(--shadow-soft)] backdrop-blur-lg">
                      <div className="text-lg font-semibold text-[var(--color-text)]">
                        {t.about.stats.twoTitle}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        {t.about.stats.twoText}
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-white/60 bg-white/70 p-4 shadow-[var(--shadow-soft)] backdrop-blur-lg">
                      <div className="text-lg font-semibold text-[var(--color-text)]">
                        {t.about.stats.threeTitle}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        {t.about.stats.threeText}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-x-1/2 top-1/2 -z-10 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dce8d8]/45 blur-3xl md:h-[420px] md:w-[420px]" />

                  <div className="rounded-[32px] border border-white/60 bg-white/65 p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl md:p-6">
                    <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#f8f6f1_0%,#f1ede6_100%)] p-6">
                      <Image
                        src="/images/products/matcha-pack.png"
                        alt={t.about.heroImageAlt}
                        width={460}
                        height={460}
                        className="mx-auto h-auto w-[200px] object-contain md:w-[280px]"
                      />
                    </div>

                    <div className="mt-5 rounded-[24px] bg-[var(--color-bg)] p-4">
                      <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        {t.about.cardTitle}
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
                        {t.about.cardText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* STORY + PHILOSOPHY */}
              <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2">
                <article className="rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl md:p-7">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-dark)]">
                    {t.about.storyBadge}
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-text)] md:text-3xl">
                    {t.about.storyTitle}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
                    {t.about.storyText}
                  </p>
                </article>

                <article className="rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl md:p-7">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-dark)]">
                    {t.about.philosophyBadge}
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-text)] md:text-3xl">
                    {t.about.philosophyTitle}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
                    {t.about.philosophyText}
                  </p>
                </article>
              </div>

              {/* VALUES */}
              <div className="mt-10 md:mt-14">
                <div className="mb-6 text-center md:mb-8">
                  <span className="inline-flex rounded-full border border-[#6B8F71]/15 bg-white/75 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary-dark)] shadow-[var(--shadow-soft)] backdrop-blur-md md:text-[11px]">
                    {t.about.valuesBadge}
                  </span>

                  <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--color-text)] md:text-5xl">
                    {t.about.valuesTitle}
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
                    {t.about.valuesText}
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <article className="rounded-[26px] border border-white/60 bg-white/75 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                    <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-dark)]">
                      {t.about.values.qualityTitle}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
                      {t.about.values.qualityText}
                    </p>
                  </article>

                  <article className="rounded-[26px] border border-white/60 bg-white/75 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                    <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-dark)]">
                      {t.about.values.ritualTitle}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
                      {t.about.values.ritualText}
                    </p>
                  </article>

                  <article className="rounded-[26px] border border-white/60 bg-white/75 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                    <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-dark)]">
                      {t.about.values.designTitle}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
                      {t.about.values.designText}
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}