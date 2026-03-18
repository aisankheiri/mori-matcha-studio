"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const bgOpacityA = useTransform(scrollYProgress, [0, 1], [0.95, 0.45]);
  const bgOpacityB = useTransform(scrollYProgress, [0, 1], [0.2, 0.9]);

  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Whisk: önce hero sahnesinde kalır, sonra aşağı iner,

  const whiskX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.6, 0.7, 0.92, 1],
    [-160, -150, -700, -790, -560, -580, -450]
  );

  const whiskY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.6, 0.7, 0.92, 1],
    [-100, 390, 900, 1100, 1600, 1570, 2100]
  );

  const whiskRotate = useTransform(
    scrollYProgress,
    [0, 0.4, 0.55, 0.75, 1],
    [-8, 100, 360, 0, 210]
  );
  const whiskScale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.96, 0.52]);


  const powderY = useTransform(scrollYProgress, [0, 1], [70, 80]);
  const powderRotate = useTransform(scrollYProgress, [0, 1], [0, 6]);

  const leavesY = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const leavesX = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const leavesRotate = useTransform(scrollYProgress, [0, 1], [0, -4]);

  const bowlY = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const bowlScale = useTransform(scrollYProgress, [0, 1], [1, 1.015]);

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
        <div className="grid min-h-[calc(100vh-72px)] items-start gap-10 pb-12 pt-0 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-8 md:pb-8 md:pt-4">
          <div className="order-1 relative flex min-h-[360px] items-center justify-center sm:min-h-[460px] md:order-2 md:min-h-[860px]">
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute h-[220px] w-[220px] rounded-full bg-[#dce8d8] blur-3xl sm:h-[280px] sm:w-[280px] md:h-[500px] md:w-[500px]"
            />

            <motion.div
              style={{ y: sceneY }}
              className="relative h-[330px] w-full max-w-[300px] sm:h-[450px] sm:max-w-[390px] md:h-[760px] md:max-w-[640px]"
            >
              <motion.div
                style={{ y: powderY, rotate: powderRotate }}
                className="absolute left-[32%] top-[26%] z-10 w-[54%] sm:left-[32%] sm:top-[25%] sm:w-[54%] md:left-[30%] md:top-[22%] md:w-[50%]"
              >
                <Image
                  src="/images/hero/powder.png"
                  alt="Matcha tozu sıçrama efekti"
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
                  alt="Matcha yaprakları"
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
                  alt="Matcha kasesi"
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
            className="order-2 relative z-10 max-w-2xl md:order-1 md:-mt-24"
          >
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex rounded-full border border-[#6B8F71]/15 bg-white/75 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary-dark)] shadow-[var(--shadow-soft)] backdrop-blur-md md:text-[11px]"
            >
              Seremonik Matcha Koleksiyonu
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="mt-5 text-3xl font-semibold leading-[0.98] tracking-tight text-[var(--color-text)] sm:text-4xl md:mt-6 md:text-7xl xl:text-[84px]"
            >
              Matcha, Bowl
              <br />
              ve Bambu Whisk.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14 }}
              className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-[15px] md:mt-6 md:text-lg"
            >
              Premium seremonik matcha, bambu whisk ve özel matcha bowl
              koleksiyonumuzla geleneksel hazırlama ritüelini modern, zarif ve
              estetik bir deneyime dönüştürün.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-8 md:gap-4"
            >
              <Button className="w-full sm:w-auto">Ürünleri İncele</Button>
              <Button variant="secondary" className="w-full sm:w-auto">
                Matcha Setlerini Gör
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3 md:mt-10"
            >
              <div className="rounded-[22px] border border-white/60 bg-white/60 p-4 shadow-[var(--shadow-soft)] backdrop-blur-lg">
                <div className="text-lg font-semibold text-[var(--color-text)]">
                  Seremonik
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                  premium kalite
                </div>
              </div>

              <div className="rounded-[22px] border border-white/60 bg-white/60 p-4 shadow-[var(--shadow-soft)] backdrop-blur-lg">
                <div className="text-lg font-semibold text-[var(--color-text)]">
                  Bambu Whisk
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                  geleneksel hazırlık
                </div>
              </div>

              <div className="rounded-[22px] border border-white/60 bg-white/60 p-4 shadow-[var(--shadow-soft)] backdrop-blur-lg">
                <div className="text-lg font-semibold text-[var(--color-text)]">
                  Matcha Bowl
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                  zarif sunum
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Whisk */}
      <motion.div
        style={{
          x: whiskX,
          y: whiskY,
          rotate: whiskRotate,
          scale: whiskScale,
        }}
        className="pointer-events-none absolute right-[-2%] top-[9%] z-[80] w-[140px] sm:right-[2%] sm:top-[9%] sm:w-[175px] md:right-[10%] md:top-[7%] md:w-[340px]"
      >
        <Image
          src="/images/hero/whisk.png"
          alt="Bambu whisk"
          width={420}
          height={520}
          priority
          className="h-auto w-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.12)] md:drop-shadow-[0_22px_40px_rgba(0,0,0,0.14)]"
        />
      </motion.div>

      {/* Whisk açıklama alanı */}
      <div className="relative z-20 mt-[100px] pb-[80px] sm:mt-[140px] sm:pb-[120px] md:mt-[260px] md:pb-[140px]">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div className="min-h-[80px] md:min-h-[260px]" />

            <div className="max-w-lg">
              <span className="inline-flex rounded-full border border-[#6B8F71]/15 bg-white/75 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-primary-dark)] shadow-[var(--shadow-soft)] backdrop-blur-md md:text-[11px]">
                Bambu Whisk
              </span>

              <h2 className="mt-5 text-2xl font-semibold leading-tight text-[var(--color-text)] sm:text-3xl md:mt-6 md:text-5xl">
                Bambu whisk ile
                <br />
                gerçek matcha ritüeli
              </h2>

              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)] sm:text-base md:mt-6">
                Bambu whisk, seremonik matcha hazırlamanın en önemli
                parçalarından biridir. Yumuşak köpük, dengeli karışım ve estetik
                sunum için tasarlanan bu özel araç, ritüelinizi tamamlar.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Matcha görsel alanı */}
      <div className="relative z-20 mt-[120px] md:mt-[220px]">
        <Container>
          <div className="relative flex justify-center">
            <div className="absolute inset-x-1/2 top-[58%] -z-10 h-[180px] w-[280px] -translate-x-1/2 rounded-full bg-[#dce8d8]/60 blur-3xl md:h-[240px] md:w-[420px]" />

            <Image
              src="/images/hero/matcha-collection.png"
              alt="Matcha, bowl ve bambu whisk koleksiyonu"
              width={1600}
              height={900}
              priority
              className="h-auto w-[420px] max-w-full object-contain sm:w-[520px] md:w-[700px]"
            />
          </div>
        </Container>
      </div>

      {/* Satış bilgi alanı */}
      {/* Satış bilgi alanı */}
      <div className="relative z-20 mt-[80px] pb-[140px] md:mt-[140px] md:pb-[220px]">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Sol ürün */}
            <div className="rounded-[28px] border border-white/60 bg-white/65 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <div className="flex h-[180px] items-center justify-center">
                <Image
                  src="/images/products/matcha-pack.png"
                  alt="Seremonik matcha ürünü"
                  width={260}
                  height={260}
                  className="h-[180px] w-auto object-contain"
                />
              </div>

              <div className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-primary-dark)]">
                Seremonik Matcha
              </div>

              <div className="mt-3 text-3xl font-semibold text-[var(--color-text)]">
                ₺799
              </div>

              <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                Yoğun aroma, dengeli tat ve premium kalite sunan seremonik matcha
                seçkisi.
              </p>

              <div className="mt-5">
                <Button className="w-full">Sepete Ekle</Button>
              </div>
            </div>

            {/* Orta ürün */}
            {/* Orta ürün */}
            <div className="relative rounded-[28px] border border-white/60 bg-white/65 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">

              {/* Görsel alanı */}
              <div className="relative flex h-[180px] items-center justify-center">
                <div className="absolute inset-x-1/2 top-1/2 -z-10 h-[120px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dce8d8]/60 blur-3xl" />
                {/* Whisk buraya geliyor */}
              </div>

              {/* TEXTLER SOLA */}
              <div className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-primary-dark)]">
                Bambu Whisk
              </div>

              <div className="mt-3 text-3xl font-semibold text-[var(--color-text)]">
                ₺349
              </div>

              <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                Daha yumuşak köpük, dengeli karışım ve geleneksel hazırlık hissi için özel
                bambu whisk.
              </p>

              <div className="mt-5">
                <Button className="w-full">Satın Al</Button>
              </div>
            </div>

            {/* Sağ ürün */}
            <div className="rounded-[28px] border border-white/60 bg-white/65 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
              <div className="flex h-[180px] items-center justify-center">
                <Image
                  src="/images/products/bowl-product.png"
                  alt="Matcha bowl ürünü"
                  width={260}
                  height={260}
                  className="h-[180px] w-auto object-contain"
                />
              </div>

              <div className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-primary-dark)]">
                Matcha Bowl
              </div>

              <div className="mt-3 text-3xl font-semibold text-[var(--color-text)]">
                ₺649
              </div>

              <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                Zarif sunum ve rahat hazırlama için özel tasarlanmış premium bowl
                koleksiyonu.
              </p>

              <div className="mt-5">
                <Button className="w-full">Ürünü İncele</Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}