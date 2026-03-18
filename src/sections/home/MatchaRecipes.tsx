"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";

export default function MatchaRecipes() {
  return (
    <section className="relative mt-[100px] overflow-hidden pb-[120px] md:mt-[140px] md:pb-[180px]">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(247,246,242,0)_0%,rgba(242,239,233,0.65)_100%)]" />
      <div className="absolute left-1/2 top-[12%] -z-10 h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-[#dce8d8]/40 blur-3xl md:h-[320px] md:w-[320px]" />

      <Container>
        <div className="mb-12 text-center md:mb-14">
          <span className="inline-flex rounded-full border border-[#6B8F71]/15 bg-white/75 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary-dark)] shadow-[var(--shadow-soft)] backdrop-blur-md md:text-[11px]">
            Fit Matcha Tarifleri
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--color-text)] md:mt-6 md:text-5xl">
            Matcha ile Hafif ve
            <br />
            Dengeli Tarifler
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
            Günlük rutininize düşük kalorili, pratik ve estetik matcha tarifleri ekleyin.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {/* CARD 1 */}
          <div className="group overflow-hidden rounded-[24px] border border-white/60 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl transition hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
            <div className="relative flex justify-center bg-[linear-gradient(180deg,#f8f6f1_0%,#f3efe8_100%)] p-4 md:p-5">
              <Image
                src="/images/recipes/matcha-cookie.jpg"
                alt="Matcha kurabiye"
                width={400}
                height={400}
                className="h-auto w-full max-w-[180px] object-contain transition duration-500 group-hover:scale-105 md:max-w-[200px]"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">
                Diyet Matcha Kurabiye
              </h3>

              <p className="mt-2 text-[13px] leading-6 text-[var(--color-text-soft)]">
                Şekersiz, düşük kalorili ve hafif içerikli sağlıklı atıştırmalık.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-dark)]">
                    Malzemeler
                  </div>
                  <ul className="mt-3 space-y-2 text-[13px] leading-6 text-[var(--color-text-soft)]">
                    <li>1 çay kaşığı matcha</li>
                    <li>1 adet olgun muz</li>
                    <li>2 yemek kaşığı yulaf unu</li>
                    <li>1 tatlı kaşığı şekersiz fıstık ezmesi</li>
                    <li>Tarçın (isteğe bağlı)</li>
                  </ul>
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-dark)]">
                    Hazırlanışı
                  </div>
                  <ol className="mt-3 space-y-2 text-[13px] leading-6 text-[var(--color-text-soft)]">
                    <li>1. Muzu bir kapta iyice ezin.</li>
                    <li>2. Matcha ve yulaf ununu ekleyin.</li>
                    <li>3. Fıstık ezmesini karışıma dahil edin.</li>
                    <li>4. Küçük parçalar halinde şekil verin.</li>
                    <li>5. 180°C’de 10-12 dakika pişirin.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="group overflow-hidden rounded-[24px] border border-white/60 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl transition hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
            <div className="relative flex justify-center bg-[linear-gradient(180deg,#f8f6f1_0%,#f3efe8_100%)] p-4 md:p-5">
              <Image
                src="/images/recipes/matcha-bowl.jpg"
                alt="Matcha smoothie bowl"
                width={400}
                height={400}
                className="h-auto w-full max-w-[180px] object-contain transition duration-500 group-hover:scale-105 md:max-w-[200px]"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">
                Matcha Smoothie Bowl
              </h3>

              <p className="mt-2 text-[13px] leading-6 text-[var(--color-text-soft)]">
                Lif ve antioksidan açısından zengin, tok tutan ve enerji veren fit bowl.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-dark)]">
                    Malzemeler
                  </div>
                  <ul className="mt-3 space-y-2 text-[13px] leading-6 text-[var(--color-text-soft)]">
                    <li>1 çay kaşığı matcha</li>
                    <li>1 adet muz</li>
                    <li>1/2 su bardağı badem sütü</li>
                    <li>Yaban mersini</li>
                    <li>Çilek</li>
                    <li>1 tatlı kaşığı chia tohumu</li>
                  </ul>
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-dark)]">
                    Hazırlanışı
                  </div>
                  <ol className="mt-3 space-y-2 text-[13px] leading-6 text-[var(--color-text-soft)]">
                    <li>1. Muzu ve badem sütünü blendera alın.</li>
                    <li>2. Matcha ekleyip pürüzsüz olana kadar karıştırın.</li>
                    <li>3. Karışımı kaseye dökün.</li>
                    <li>4. Üzerine çilek ve yaban mersini ekleyin.</li>
                    <li>5. Chia tohumu ile servis edin.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}