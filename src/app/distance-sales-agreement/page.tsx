"use client";

import Navbar from "@/components/layout/Navbar";
import Container from "@/components/ui/Container";
import { useLang } from "@/context/LangContext";
import { dict } from "@/i18n/dict";

export default function DistanceSalesAgreementPage() {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--color-bg)] pt-28 pb-20 md:pt-32">
        <Container>
          <div className="mx-auto max-w-[800px]">
            <div className="rounded-[32px] border border-white/60 bg-white/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl md:p-8">
              <h1 className="text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
                {t.distanceSales.title}
              </h1>

              <p className="mt-4 text-sm text-[var(--color-text-soft)]">
                {t.distanceSales.updated}
              </p>

              <div className="mt-8 space-y-6 text-sm leading-7 text-[var(--color-text-soft)]">
                <Section title={t.distanceSales.sections.parties.title}>
                  {t.distanceSales.sections.parties.text}
                </Section>

                <Section title={t.distanceSales.sections.subject.title}>
                  {t.distanceSales.sections.subject.text}
                </Section>

                <Section title={t.distanceSales.sections.product.title}>
                  {t.distanceSales.sections.product.text}
                </Section>

                <Section title={t.distanceSales.sections.payment.title}>
                  {t.distanceSales.sections.payment.text}
                </Section>

                <Section title={t.distanceSales.sections.delivery.title}>
                  {t.distanceSales.sections.delivery.text}
                </Section>

                <Section title={t.distanceSales.sections.withdrawal.title}>
                  {t.distanceSales.sections.withdrawal.text}
                </Section>

                <Section title={t.distanceSales.sections.exceptions.title}>
                  {t.distanceSales.sections.exceptions.text}
                </Section>

                <Section title={t.distanceSales.sections.disputes.title}>
                  {t.distanceSales.sections.disputes.text}
                </Section>

                <Section title={t.distanceSales.sections.acceptance.title}>
                  {t.distanceSales.sections.acceptance.text}
                </Section>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-base font-semibold text-[var(--color-text)] md:text-lg">
        {title}
      </h2>
      <p className="mt-2">{children}</p>
    </div>
  );
}