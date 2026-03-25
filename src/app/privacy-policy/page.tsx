"use client";

import Navbar from "@/components/layout/Navbar";
import Container from "@/components/ui/Container";
import { useLang } from "@/context/LangContext";
import { dict } from "@/i18n/dict";

export default function PrivacyPolicyPage() {
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
                {t.privacy.title}
              </h1>

              <p className="mt-4 text-sm text-[var(--color-text-soft)]">
                {t.privacy.updated}
              </p>

              <div className="mt-8 space-y-6 text-sm leading-7 text-[var(--color-text-soft)]">

                <Section title={t.privacy.sections.intro.title}>
                  {t.privacy.sections.intro.text}
                </Section>

                <Section title={t.privacy.sections.data.title}>
                  {t.privacy.sections.data.text}
                </Section>

                <Section title={t.privacy.sections.use.title}>
                  {t.privacy.sections.use.text}
                </Section>

                <Section title={t.privacy.sections.share.title}>
                  {t.privacy.sections.share.text}
                </Section>

                <Section title={t.privacy.sections.security.title}>
                  {t.privacy.sections.security.text}
                </Section>

                <Section title={t.privacy.sections.cookies.title}>
                  {t.privacy.sections.cookies.text}
                </Section>

                <Section title={t.privacy.sections.rights.title}>
                  {t.privacy.sections.rights.text}
                </Section>

                <Section title={t.privacy.sections.contact.title}>
                  {t.privacy.sections.contact.text}
                </Section>

              </div>
            </div>

          </div>
        </Container>
      </main>
    </>
  );
}

function Section({ title, children }: any) {
  return (
    <div>
      <h2 className="text-base font-semibold text-[var(--color-text)] md:text-lg">
        {title}
      </h2>
      <p className="mt-2">{children}</p>
    </div>
  );
}