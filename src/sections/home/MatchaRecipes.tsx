"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";

export default function MatchaRecipes() {
  return (
    <section className="relative mt-[100px] overflow-hidden pb-[140px] md:mt-[140px] md:pb-[200px]">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(247,246,242,0)_0%,rgba(242,239,233,0.65)_100%)]" />
      <div className="absolute left-1/2 top-[14%] -z-10 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-[#dce8d8]/40 blur-3xl md:h-[360px] md:w-[360px]" />

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
            Matcha ürünlerini günlük rutininize ekleyebileceğiniz hafif, estetik ve sağlıklı tarifler.
          </p>
        </div>

        {/* Premium yatay akış */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f7f6f2] to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f7f6f2] to-transparent md:w-24" />

          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-center md:overflow-visible">
            {/* CARD 1 - solda geride */}
            <article className="group min-w-[290px] max-w-[290px] snap-center overflow-hidden rounded-[24px] border border-white/60 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl transition duration-500 md:min-w-[320px] md:max-w-[320px] md:scale-[0.92] md:opacity-80 md:hover:scale-[0.95] md:hover:opacity-100">
              <div className="relative flex justify-center bg-[linear-gradient(180deg,#f8f6f1_0%,#f3efe8_100%)] p-4 md:p-5">
                <Image
                  src="/images/recipes/matcha-cookie.jpg"
                  alt="Matcha kurabiye"
                  width={400}
                  height={400}
                  className="h-auto w-full max-w-[170px] object-contain transition duration-500 group-hover:scale-105 md:max-w-[185px]"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-[var(--color-text)]">
                  Diyet Matcha Kurabiye
                </h3>

                <p className="mt-2 text-[13px] leading-6 text-[var(--color-text-soft)]">
                  Şekersiz, düşük kalorili ve hafif içerikli sağlıklı atıştırmalık.
                </p>

                <div className="mt-5 grid gap-4">
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
                      <li>1. Muzu bir kapta ezin.</li>
                      <li>2. Matcha ve yulaf ununu ekleyin.</li>
                      <li>3. Fıstık ezmesini karıştırın.</li>
                      <li>4. Küçük parçalar halinde şekil verin.</li>
                      <li>5. 180°C’de 10-12 dk pişirin.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </article>

            {/* CARD 2 - ortada önde */}
            <article className="group min-w-[300px] max-w-[300px] snap-center overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-[0_18px_50px_rgba(0,0,0,0.09)] backdrop-blur-xl transition duration-500 md:min-w-[360px] md:max-w-[360px] md:-mt-3 md:scale-100 md:opacity-100">
              <div className="relative flex justify-center bg-[linear-gradient(180deg,#f8f6f1_0%,#f3efe8_100%)] p-5 md:p-6">
                <Image
                  src="/images/recipes/matcha-bowl.jpg"
                  alt="Matcha smoothie bowl"
                  width={420}
                  height={420}
                  className="h-auto w-full max-w-[185px] object-contain transition duration-500 group-hover:scale-105 md:max-w-[205px]"
                />
              </div>

              <div className="p-5 md:p-6">
                <h3 className="text-lg font-semibold text-[var(--color-text)] md:text-[20px]">
                  Matcha Smoothie Bowl
                </h3>

                <p className="mt-2 text-[13px] leading-6 text-[var(--color-text-soft)]">
                  Lif ve antioksidan açısından zengin, tok tutan ve enerji veren fit bowl.
                </p>

                <div className="mt-5 grid gap-4">
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
                      <li>1. Muz ve badem sütünü blendera alın.</li>
                      <li>2. Matcha ekleyip pürüzsüz olana kadar karıştırın.</li>
                      <li>3. Karışımı kaseye dökün.</li>
                      <li>4. Üzerine meyve ve chia ekleyin.</li>
                      <li>5. Soğuk şekilde servis edin.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </article>

            {/* CARD 3 - sağda geride */}
            <article className="group min-w-[290px] max-w-[290px] snap-center overflow-hidden rounded-[24px] border border-white/60 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl transition duration-500 md:min-w-[320px] md:max-w-[320px] md:scale-[0.92] md:opacity-80 md:hover:scale-[0.95] md:hover:opacity-100">
              <div className="relative flex justify-center bg-[linear-gradient(180deg,#f8f6f1_0%,#f3efe8_100%)] p-4 md:p-5">
                <Image
                  src="/images/recipes/strawberry-matcha-latte.jpg"
                  alt="Çilekli matcha latte"
                  width={400}
                  height={400}
                  className="h-auto w-full max-w-[170px] object-contain transition duration-500 group-hover:scale-105 md:max-w-[185px]"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-[var(--color-text)]">
                  Çilekli Matcha Latte
                </h3>

                <p className="mt-2 text-[13px] leading-6 text-[var(--color-text-soft)]">
                  Alt katmanda çilekli süt, üstte matcha ile hazırlanan hafif ve estetik içecek.
                </p>

                <div className="mt-5 grid gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-dark)]">
                      Malzemeler
                    </div>
                    <ul className="mt-3 space-y-2 text-[13px] leading-6 text-[var(--color-text-soft)]">
                      <li>1 çay kaşığı matcha</li>
                      <li>4-5 adet çilek</li>
                      <li>200 ml süt veya badem sütü</li>
                      <li>1 tatlı kaşığı bal (isteğe bağlı)</li>
                      <li>Buz</li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-dark)]">
                      Hazırlanışı
                    </div>
                    <ol className="mt-3 space-y-2 text-[13px] leading-6 text-[var(--color-text-soft)]">
                      <li>1. Çilekleri ezip bardağın tabanına alın.</li>
                      <li>2. Üzerine süt ve buz ekleyin.</li>
                      <li>3. Matchayı ayrı kapta az su ile çırpın.</li>
                      <li>4. Matchayı yavaşça sütün üstüne dökün.</li>
                      <li>5. Katmanlı şekilde servis edin.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}