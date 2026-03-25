"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { useLang } from "@/context/LangContext";
import { dict } from "@/i18n/dict";

export default function MatchaJourneySection() {
  const { lang } = useLang();
  const t = dict[lang];

  const steps = [
    {
      number: "01",
      title: t.matchaJourney.steps.oneTitle,
      text: t.matchaJourney.steps.oneText,
      image: "/images/matcha-journey/matcha-leaf.jpg",
      alt: t.matchaJourney.steps.oneAlt,
    },
    {
      number: "02",
      title: t.matchaJourney.steps.twoTitle,
      text: t.matchaJourney.steps.twoText,
      image: "/images/matcha-journey/shaded-tea.jpg",
      alt: t.matchaJourney.steps.twoAlt,
    },
    {
      number: "03",
      title: t.matchaJourney.steps.threeTitle,
      text: t.matchaJourney.steps.threeText,
      image: "/images/matcha-journey/tencha-process.jpg",
      alt: t.matchaJourney.steps.threeAlt,
    },
    {
      number: "04",
      title: t.matchaJourney.steps.fourTitle,
      text: t.matchaJourney.steps.fourText,
      image: "/images/matcha-journey/matcha-powder.jpg",
      alt: t.matchaJourney.steps.fourAlt,
    },
  ];

  return (
    <section className="relative overflow-hidden py-[100px] md:py-[140px]">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#f7f6f2_0%,#f2efe9_100%)]" />
      <div className="absolute left-[10%] top-[10%] -z-10 h-[220px] w-[220px] rounded-full bg-[#dce8d8]/30 blur-3xl md:h-[320px] md:w-[320px]" />
      <div className="absolute right-[8%] top-[25%] -z-10 h-[180px] w-[180px] rounded-full bg-[#e8dfcf]/30 blur-3xl md:h-[260px] md:w-[260px]" />

      <Container>
        <div className="mx-auto max-w-[1100px]">
          {/* HEADER */}
          <div className="text-center">
            <span className="inline-flex rounded-full border border-[#6B8F71]/15 bg-white/75 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary-dark)] shadow-[var(--shadow-soft)] backdrop-blur-md md:text-[11px]">
              {t.matchaJourney.badge}
            </span>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--color-text)] md:text-5xl">
              {t.matchaJourney.title}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
              {t.matchaJourney.text}
            </p>
          </div>

          {/* STEPS */}
          <div className="mt-14 space-y-8 md:mt-20 md:space-y-10">
            {steps.map((step, index) => {
              const isReverse = index % 2 === 1;

              return (
                <article
                  key={step.number}
                  className={`grid items-center gap-6 rounded-[30px] border border-white/60 bg-white/70 p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl md:grid-cols-2 md:gap-10 md:p-7 ${
                    isReverse ? "md:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  {/* IMAGE */}
                  <div className="relative">
                    <div className="absolute inset-x-1/2 top-1/2 -z-10 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dce8d8]/35 blur-3xl md:h-[240px] md:w-[240px]" />

                    <div className="overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,#f8f6f1_0%,#f1ede6_100%)] p-3 md:p-4">
                      <Image
                        src={step.image}
                        alt={step.alt}
                        width={900}
                        height={700}
                        className="h-[240px] w-full rounded-[22px] object-cover md:h-[320px]"
                      />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div>
                    <div className="inline-flex rounded-full border border-[#6B8F71]/15 bg-[var(--color-bg)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-dark)]">
                      {t.matchaJourney.stepLabel} {step.number}
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-text)] md:text-3xl">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
                      {step.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}