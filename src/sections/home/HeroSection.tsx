"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useLang } from "@/context/LangContext";
import { dict } from "@/i18n/dict";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [heroMatchaSize, setHeroMatchaSize] = useState<"50g" | "100g">("50g");
  const { lang } = useLang();
  const t = dict[lang];

  const [screenType, setScreenType] = useState<
    "mobile" | "iphone12" | "ipadair" | "desktop"
  >("mobile");

  useEffect(() => {
    const updateScreen = () => {
      const w = window.innerWidth;

      if (w >= 1020) {
        setScreenType("desktop");
      } else if (w >= 760 && w <= 900) {
        setScreenType("ipadair");
      } else if (w >= 380 && w <= 550) {
        setScreenType("iphone12");
      } else {
        setScreenType("mobile");
      }
    };

    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  const heroMatchaPrice = heroMatchaSize === "50g" ? 399 : 599;
  const heroMatchaPriceLabel = heroMatchaSize === "50g" ? "₺399" : "₺599";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const bgOpacityA = useTransform(scrollYProgress, [0, 1], [0.95, 0.45]);
  const bgOpacityB = useTransform(scrollYProgress, [0, 1], [0.2, 0.9]);

  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const whiskX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.6, 0.7, 0.92, 1],
    screenType === "desktop"
      ? [-160, -150, -700, -790, -560, -580, -450]
      : screenType === "ipadair"
      ? [0, -140, -420, -330, -300, -10, -250]
      : screenType === "iphone12"
      ? [-150, -150, -240, -120, -20, -150, -150]
      : [-150, -150, -240, -120, -20, -150, -150]
  );

  const whiskY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.6, 0.7, 0.92, 1],
    screenType === "desktop"
      ? [-100, 390, 900, 1100, 1600, 1570, 2100]
      : screenType === "ipadair"
      ? [-120, 440, 920, 1920, 2330, 2280, 2220]
      : screenType === "iphone12"
      ? [-225, 500, 1130, 1350, 1600, 1750, 1650]
      : [-225, 500, 1130, 1350, 1600, 1750, 1650]
  );

  const whiskRotate = useTransform(
    scrollYProgress,
    [0, 0.4, 0.55, 0.6, 0.75, 1],
    screenType === "desktop"
      ? [-8, 100, 360, 360, 0, 210]
      : screenType === "ipadair"
      ? [-8, 70, 180, 180, 360, 180]
      : screenType === "iphone12"
      ? [-8, 200, 200, 180, 360, 80]
      : [-8, 200, 200, 180, 360, 80]
  );

  const whiskScale = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    screenType === "desktop"
      ? [1, 0.96, 0.52]
      : screenType === "ipadair"
      ? [0.6, 0.78, 0.68]
      : screenType === "iphone12"
      ? [0.9, 1.5, 1.1]
      : [0.9, 1.5, 1.1]
  );

  const powderY = useTransform(
    scrollYProgress,
    [0, 1],
    screenType === "desktop"
      ? [70, 80]
      : screenType === "ipadair"
      ? [10, 80]
      : [140, 110]
  );

  const powderRotate = useTransform(scrollYProgress, [0, 1], [0, 6]);

  const leavesY = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const leavesX = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const leavesRotate = useTransform(scrollYProgress, [0, 1], [0, -4]);

  const bowlY = useTransform(
    scrollYProgress,
    [0, 1],
    screenType === "desktop"
      ? [0, 18]
      : screenType === "ipadair"
      ? [-210, 80]
      : [70, 90]
  );

  const bowlScale = useTransform(scrollYProgress, [0, 1], [1, 1.015]);

  const handleAddToCart = (
    id: string,
    title: string,
    price: number,
    image: string,
    meta?: string
  ) => {
    addToCart({ id, title, price, image, meta });
    showToast(t.products.toastAdded);
  };

  return (
    <section
      ref={sectionRef}
      className="relative -mt-1 min-h-[250vh] overflow-hidden bg-[var(--color-bg)] md:-mt-14 md:min-h-[330vh]"
    >
      <motion.div
        style={{ opacity: bgOpacityA }}
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_16%,rgba(107,143,113,0.20),transparent_22%),radial-gradient(circle_at_82%_14%,rgba(231,225,216,0.98),transparent_26%),linear-gradient(180deg,#f7f6f2_0%,#f2efe9_100%)]"
      />

      <motion.div
        style={{ opacity: bgOpacityB }}
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_46%,rgba(107,143,113,0.18),transparent_18%),radial-gradient(circle_at_50%_90%,rgba(62,90,71,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(214,231,214,0.30)_100%)]"
      />

      <Container>
        <div className="grid min-h-[calc(100vh-72px)] items-start gap-5 pb-6 pt-0 md:grid-cols-[1fr_1fr] md:items-center md:gap-8 md:pb-8 md:pt-4">
          <div className="order-1 relative flex min-h-[300px] items-center justify-center sm:min-h-[420px] md:order-2 md:min-h-[860px]">
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute h-[220px] w-[220px] rounded-full bg-[#dce8d8] blur-3xl sm:h-[280px] sm:w-[280px] md:h-[500px] md:w-[500px]"
            />

            <motion.div
              style={{ y: sceneY }}
              className="relative h-[280px] w-full max-w-[260px] sm:h-[420px] sm:max-w-[360px] md:h-[760px] md:max-w-[640px]"
            >
              <motion.div
                style={{ y: powderY, rotate: powderRotate }}
                className="absolute left-[32%] top-[-20%] z-10 w-[54%] sm:left-[32%] sm:top-[22%] sm:w-[54%] md:left-[30%] md:top-[22%] md:w-[50%]"
              >
                <Image
                  src="/images/hero/powder.png"
                  alt={t.hero.powderImageAlt}
                  width={520}
                  height={520}
                  priority
                  className="h-auto w-full object-contain opacity-90 drop-shadow-[0_18px_30px_rgba(62,90,71,0.10)] md:drop-shadow-[0_20px_40px_rgba(62,90,71,0.10)]"
                />
              </motion.div>

              <motion.div
                style={{ x: leavesX, y: leavesY, rotate: leavesRotate }}
                className="absolute left-[4%] bottom-[12%] z-30 w-[18%] sm:left-[4%] sm:bottom-[12%] sm:w-[18%] md:left-[6%] md:bottom-[10%] md:w-[18%]"
              >
                <Image
                  src="/images/hero/leaves.png"
                  alt={t.hero.leavesImageAlt}
                  width={240}
                  height={240}
                  className="h-auto w-full object-contain"
                />
              </motion.div>

              <motion.div
                style={{ y: bowlY, scale: bowlScale }}
                className="absolute bottom-[5%] left-1/2 z-30 w-[84%] -translate-x-1/2 sm:w-[78%] md:bottom-[4%] md:w-[68%]"
              >
                <Image
                  src="/images/hero/bowl.png"
                  alt={t.hero.bowlImageAlt}
                  width={520}
                  height={360}
                  priority
                  className="h-auto w-full object-contain drop-shadow-[0_26px_40px_rgba(62,90,71,0.14)] sm:drop-shadow-[0_30px_50px_rgba(62,90,71,0.15)] md:drop-shadow-[0_36px_70px_rgba(62,90,71,0.16)]"
                />
              </motion.div>

              <div className="absolute bottom-[4%] left-1/2 z-10 h-[46px] w-[62%] -translate-x-1/2 rounded-full bg-[#b7d19f]/35 blur-3xl sm:h-[54px] md:bottom-[3%] md:h-[80px] md:w-[56%]" />
            </motion.div>
          </div>

          <motion.div
            style={{ y: textY }}
            className="order-2 relative z-10 max-w-2xl md:order-1 md:-mt-24 md:pl-10 lg:pl-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex rounded-full border border-[#6B8F71]/15 bg-white/75 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary-dark)] shadow-[var(--shadow-soft)] backdrop-blur-md md:text-[11px]"
            >
              {t.hero.badge}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="mt-3 text-[28px] font-semibold leading-[0.95] tracking-tight text-[var(--color-text)] sm:text-4xl md:mt-6 md:text-7xl xl:text-[84px]"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14 }}
              className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-text-soft)] sm:text-[15px] md:mt-6 md:text-lg"
            >
              {t.hero.text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap md:mt-8 md:gap-4"
            >
              <Link href="/products" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">{t.hero.cta}</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-5 grid max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-3 md:mt-10"
            >
              <div className="rounded-[22px] border border-white/60 bg-white/60 p-4 shadow-[var(--shadow-soft)] backdrop-blur-lg">
                <div className="text-lg font-semibold text-[var(--color-text)]">
                  {t.hero.features.oneTitle}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                  {t.hero.features.oneText}
                </div>
              </div>

              <div className="rounded-[22px] border border-white/60 bg-white/60 p-4 shadow-[var(--shadow-soft)] backdrop-blur-lg">
                <div className="text-lg font-semibold text-[var(--color-text)]">
                  {t.hero.features.twoTitle}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                  {t.hero.features.twoText}
                </div>
              </div>

              <div className="rounded-[22px] border border-white/60 bg-white/60 p-4 shadow-[var(--shadow-soft)] backdrop-blur-lg">
                <div className="text-lg font-semibold text-[var(--color-text)]">
                  {t.hero.features.threeTitle}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                  {t.hero.features.threeText}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      <motion.div
        style={{
          x: whiskX,
          y: whiskY,
          rotate: whiskRotate,
          scale: whiskScale,
        }}
        className="pointer-events-none absolute right-[2%] top-[10%] z-[80] w-[120px] sm:right-[4%] sm:top-[10%] sm:w-[150px] md:right-[10%] md:top-[7%] md:w-[340px]"
      >
        <Image
          src="/images/hero/whisk.png"
          alt={t.hero.whiskImageAlt}
          width={420}
          height={520}
          priority
          className="h-auto w-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.12)] md:drop-shadow-[0_22px_40px_rgba(0,0,0,0.14)]"
        />
      </motion.div>

      <div className="relative z-20 mt-[-55px] pb-[50px] sm:mt-[90px] sm:pb-[90px] md:mt-[260px] md:pb-[140px]">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div className="min-h-[80px] md:min-h-[260px]" />

            <div className="max-w-lg">
              <span className="inline-flex rounded-full border border-[#6B8F71]/15 bg-white/75 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary-dark)] shadow-[var(--shadow-soft)] backdrop-blur-md md:text-[11px]">
                {t.hero.whiskBadge}
              </span>

              <h2 className="mt-5 text-2xl font-semibold leading-tight text-[var(--color-text)] sm:text-3xl md:mt-6 md:text-5xl whitespace-pre-line">
                {t.hero.whiskTitle}
              </h2>

              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)] sm:text-base md:mt-6">
                {t.hero.whiskText}
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="relative z-20 mt-[-50px] md:mt-[220px]">
        <Container>
          <div className="relative flex justify-center">
            <div className="absolute inset-x-1/2 top-[58%] -z-10 h-[180px] w-[280px] -translate-x-1/2 rounded-full bg-[#dce8d8]/60 blur-3xl md:h-[240px] md:w-[420px]" />

            <Image
              src="/images/hero/matcha-collection.png"
              alt={t.hero.collectionImageAlt}
              width={1600}
              height={900}
              priority
              className="h-auto w-[420px] max-w-full object-contain sm:w-[520px] md:w-[700px]"
            />
          </div>
        </Container>
      </div>

      <div className="relative z-20 mt-[80px] pb-[10px] md:mt-[140px] md:pb-[220px]">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex h-full flex-col rounded-[28px] border border-white/60 bg-white/65 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <div className="flex h-[180px] items-center justify-center">
                <Image
                  src="/images/products/matcha-pack.png"
                  alt={t.hero.cards.matchaTitle}
                  width={260}
                  height={260}
                  className="h-[180px] w-auto object-contain"
                />
              </div>

              <div className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-primary-dark)]">
                {t.hero.cards.matchaTitle}
              </div>

              <div className="mt-3 flex flex-1 flex-col">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-3xl font-semibold text-[var(--color-text)]">
                    {heroMatchaPriceLabel}
                  </div>

                  <div className="flex items-center gap-1 rounded-full border border-[#6B8F71]/15 bg-white/70 p-1 backdrop-blur-md">
                    <button
                      onClick={() => setHeroMatchaSize("50g")}
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition ${
                        heroMatchaSize === "50g"
                          ? "bg-[var(--color-primary)] text-white shadow"
                          : "text-[var(--color-text-soft)]"
                      }`}
                    >
                      {t.products.weight50}
                    </button>

                    <button
                      onClick={() => setHeroMatchaSize("100g")}
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition ${
                        heroMatchaSize === "100g"
                          ? "bg-[var(--color-primary)] text-white shadow"
                          : "text-[var(--color-text-soft)]"
                      }`}
                    >
                      {t.products.weight100}
                    </button>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                  {t.hero.cards.matchaText}
                </p>

                <div className="mt-auto pt-5">
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleAddToCart(
                        `matcha-${heroMatchaSize}`,
                        t.products.ceremonialMatcha,
                        heroMatchaPrice,
                        "/images/products/matcha-pack.png",
                        heroMatchaSize === "50g"
                          ? t.products.weight50
                          : t.products.weight100
                      )
                    }
                  >
                    {t.products.addToCart}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col rounded-[28px] border border-white/60 bg-white/65 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <div className="relative flex h-[180px] items-center justify-center">
                <div className="absolute inset-x-1/2 top-1/2 -z-10 h-[120px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dce8d8]/60 blur-3xl" />
              </div>

              <div className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-primary-dark)]">
                {t.hero.cards.whiskTitle}
              </div>

              <div className="mt-3 flex flex-1 flex-col">
                <div className="text-3xl font-semibold text-[var(--color-text)]">
                  ₺349
                </div>

                <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                  {t.hero.cards.whiskText}
                </p>

                <div className="mt-auto pt-5">
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleAddToCart(
                        "bamboo-whisk",
                        t.products.bambooWhisk,
                        349,
                        "/images/hero/whisk.png"
                      )
                    }
                  >
                    {t.products.addToCart}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col rounded-[28px] border border-white/60 bg-white/65 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <div className="flex h-[180px] items-center justify-center">
                <Image
                  src="/images/products/bowl-product.png"
                  alt={t.hero.cards.bowlTitle}
                  width={260}
                  height={260}
                  className="h-[180px] w-auto object-contain"
                />
              </div>

              <div className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-primary-dark)]">
                {t.hero.cards.bowlTitle}
              </div>

              <div className="mt-3 flex flex-1 flex-col">
                <div className="text-3xl font-semibold text-[var(--color-text)]">
                  ₺649
                </div>

                <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                  {t.hero.cards.bowlText}
                </p>

                <div className="mt-auto pt-5">
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleAddToCart(
                        "matcha-bowl",
                        t.products.matchaBowl,
                        649,
                        "/images/products/bowl-product.png"
                      )
                    }
                  >
                    {t.products.addToCart}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}