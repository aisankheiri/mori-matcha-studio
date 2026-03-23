"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useLang } from "@/context/LangContext";
import { dict } from "@/i18n/dict";

type MatchaSize = "50g" | "100g";

export default function ProductsPage() {
  const [matchaSize, setMatchaSize] = useState<MatchaSize>("50g");
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { lang } = useLang();
  const t = dict[lang];

  const matchaPrice = matchaSize === "50g" ? 399 : 599;
  const matchaPriceLabel = matchaSize === "50g" ? "₺399" : "₺599";
  const matchaDescription =
    matchaSize === "50g"
      ? t.products.matchaDescription50
      : t.products.matchaDescription100;

  const simpleProducts = [
    {
      slug: "bamboo-whisk",
      title: t.products.bambooWhisk,
      price: 349,
      description: t.products.bambooWhiskDescription,
      image: "/images/hero/whisk.png",
      tag: t.products.bambooWhiskTag,
    },
    {
      slug: "matcha-bowl",
      title: t.products.matchaBowl,
      price: 649,
      description: t.products.matchaBowlDescription,
      image: "/images/products/bowl-product.png",
      tag: t.products.matchaBowlTag,
    },
    {
      slug: "matcha-spoon",
      title: t.products.matchaSpoon,
      price: 199,
      description: t.products.matchaSpoonDescription,
      image: "/images/products/matcha-spoon.png",
      tag: t.products.matchaSpoonTag,
    },
  ];

  const imageWrapClass =
    "relative flex h-[240px] items-center justify-center overflow-hidden md:h-[280px]";

  const imageClass =
    "w-[170px] object-contain transition duration-300 hover:scale-105 md:w-[220px]";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--color-bg)] pt-20 pb-16 md:pt-24 md:pb-24">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#f7f6f2_0%,#f2efe9_100%)]" />
          <div className="absolute left-[12%] top-[10%] -z-10 h-[220px] w-[220px] rounded-full bg-[#dce8d8]/25 blur-3xl md:h-[280px] md:w-[280px]" />
          <div className="absolute right-[8%] top-[32%] -z-10 h-[180px] w-[180px] rounded-full bg-[#e9dfcf]/25 blur-3xl md:h-[240px] md:w-[240px]" />

          <Container>
            <div className="space-y-8 md:space-y-10">
              <article className="rounded-[28px] border border-white/50 bg-white/60 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-lg transition duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] md:p-6">
                <div className="grid items-center gap-6 md:grid-cols-[360px_1px_1fr] md:gap-8">
                  <div className={imageWrapClass}>
                    <div className="absolute inset-x-1/2 top-1/2 -z-10 h-[140px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dce8d8]/28 blur-3xl" />
                    <Image
                      src="/images/products/matcha-pack.png"
                      alt={t.products.ceremonialMatcha}
                      width={450}
                      height={450}
                      className={imageClass}
                    />
                  </div>

                  <div className="hidden h-full w-px bg-[#6B8F71]/22 md:block" />

                  <div className="pt-1">
                    <span className="inline-flex rounded-full border border-[#6B8F71]/15 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--color-primary-dark)]">
                      {t.products.premiumMatcha}
                    </span>

                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-text)] md:text-3xl">
                      {t.products.ceremonialMatcha}
                    </h2>

                    <div className="mt-4 flex flex-col gap-3">
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-dark)]">
                        {t.products.selectWeight}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#6B8F71]/15 px-4 py-2 text-sm text-[var(--color-text)]">
                          <input
                            type="radio"
                            name="matcha-size"
                            value="50g"
                            checked={matchaSize === "50g"}
                            onChange={() => setMatchaSize("50g")}
                            className="accent-[var(--color-primary)]"
                          />
                          {t.products.weight50}
                        </label>

                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#6B8F71]/15 px-4 py-2 text-sm text-[var(--color-text)]">
                          <input
                            type="radio"
                            name="matcha-size"
                            value="100g"
                            checked={matchaSize === "100g"}
                            onChange={() => setMatchaSize("100g")}
                            className="accent-[var(--color-primary)]"
                          />
                          {t.products.weight100}
                        </label>
                      </div>
                    </div>

                    <div className="mt-4 text-xl font-semibold text-[var(--color-primary-dark)] md:text-2xl">
                      {matchaPriceLabel}
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
                      {matchaDescription}
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button
                        onClick={() => {
                          addToCart({
                            id: `matcha-${matchaSize}`,
                            title: t.products.ceremonialMatcha,
                            price: matchaPrice,
                            image: "/images/products/matcha-pack.png",
                            meta:
                              matchaSize === "50g"
                                ? t.products.weight50
                                : t.products.weight100,
                          });
                          showToast(t.products.toastAdded);
                        }}
                      >
                        {t.products.addToCart}
                      </Button>
                    </div>
                  </div>
                </div>
              </article>

              {simpleProducts.map((product) => (
                <article
                  key={product.slug}
                  className="rounded-[28px] border border-white/50 bg-white/60 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-lg transition duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] md:p-6"
                >
                  <div className="grid items-center gap-6 md:grid-cols-[360px_1px_1fr] md:gap-8">
                    <div className={imageWrapClass}>
                      <div className="absolute inset-x-1/2 top-1/2 -z-10 h-[140px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dce8d8]/28 blur-3xl" />
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={450}
                        height={450}
                        className={imageClass}
                      />
                    </div>

                    <div className="hidden h-full w-px bg-[#6B8F71]/22 md:block" />

                    <div className="pt-1">
                      <span className="inline-flex rounded-full border border-[#6B8F71]/15 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--color-primary-dark)]">
                        {product.tag}
                      </span>

                      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-text)] md:text-3xl">
                        {product.title}
                      </h2>

                      <div className="mt-2 text-xl font-semibold text-[var(--color-primary-dark)] md:text-2xl">
                        ₺{product.price}
                      </div>

                      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
                        {product.description}
                      </p>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Button
                          onClick={() => {
                            addToCart({
                              id: product.slug,
                              title: product.title,
                              price: product.price,
                              image: product.image,
                            });
                            showToast(t.products.toastAdded);
                          }}
                        >
                          {t.products.addToCart}
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}