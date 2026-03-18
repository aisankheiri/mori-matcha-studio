"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

type MatchaSize = "50g" | "100g";

const simpleProducts = [
    {
        slug: "bamboo-whisk",
        title: "Bambu Whisk",
        price: 349,
        description:
            "Daha yumuşak köpük ve geleneksel hazırlık hissi için tasarlanmış özel bambu whisk.",
        image: "/images/hero/whisk.png",
        tag: "Ritüel Aracı",
    },
    {
        slug: "matcha-bowl",
        title: "Matcha Bowl",
        price: 649,
        description:
            "Hazırlama ve sunum deneyimini daha zarif hale getiren premium bowl koleksiyonu.",
        image: "/images/products/bowl-product.png",
        tag: "Zarif Sunum",
    },
    {
        slug: "matcha-spoon",
        title: "Matcha Kaşığı",
        price: 199,
        description:
            "Doğru ölçü ve daha estetik hazırlık deneyimi için zarif matcha kaşığı.",
        image: "/images/products/matcha-spoon.png",
        tag: "Hazırlık Aksesuarı",
    },
];

export default function ProductsPage() {
    const [matchaSize, setMatchaSize] = useState<MatchaSize>("50g");
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const matchaPrice = matchaSize === "50g" ? 399 : 599;
    const matchaPriceLabel = matchaSize === "50g" ? "₺399" : "₺599";
    const matchaDescription =
        matchaSize === "50g"
            ? "Günlük kullanım için ideal, premium seremonik matcha."
            : "Daha uzun süreli kullanım için ekonomik ve premium 100 gr seremonik matcha.";

    return (
        <>
            <Navbar />


            <main className="min-h-screen bg-[var(--color-bg)] pt-12 pb-16 md:pt-16 md:pb-24">
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#f7f6f2_0%,#f2efe9_100%)]" />
                    <div className="absolute left-[12%] top-[10%] -z-10 h-[220px] w-[220px] rounded-full bg-[#dce8d8]/25 blur-3xl md:h-[280px] md:w-[280px]" />
                    <div className="absolute right-[8%] top-[32%] -z-10 h-[180px] w-[180px] rounded-full bg-[#e9dfcf]/25 blur-3xl md:h-[240px] md:w-[240px]" />

                    <Container>
                        <div className="space-y-8 md:space-y-10">

                            <article className="rounded-[28px] border border-white/50 bg-white/60 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-lg transition duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] md:p-6">

                                <div className="grid items-center gap-6 md:grid-cols-[220px_1px_1fr] md:gap-8">
                                    <div className="relative flex h-[170px] items-center justify-center overflow-hidden">

                                        <div className="absolute inset-x-1/2 top-1/2 -z-10 h-[90px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dce8d8]/28 blur-3xl" />
                                        <Image
                                            src="/images/products/matcha-pack.png"
                                            alt="Seremonik Matcha"
                                            width={300}
                                            height={300}
                                            className="h-[120px] w-auto object-contain transition duration-300 hover:scale-105 md:h-[140px]"
                                        />
                                    </div>

                                    <div className="hidden h-full w-px bg-[#6B8F71]/22 md:block" />

                                    <div className="pt-1">
                                        <span className="inline-flex rounded-full border border-[#6B8F71]/15 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--color-primary-dark)]">
                                            Premium Matcha
                                        </span>

                                        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-text)] md:text-3xl">
                                            Seremonik Matcha
                                        </h2>

                                        <div className="mt-4 flex flex-col gap-3">
                                            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-dark)]">
                                                Gramaj Seçin
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
                                                    50 gr
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
                                                    100 gr
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
                                                        title: "Seremonik Matcha",
                                                        price: matchaPrice,
                                                        image: "/images/products/matcha-pack.png",
                                                        meta: matchaSize === "50g" ? "50 gr" : "100 gr",
                                                    });

                                                    showToast("Sepete eklendi");
                                                }}
                                            >
                                                Sepete Ekle
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
                                    <div className="grid items-center gap-6 md:grid-cols-[220px_1px_1fr] md:gap-8">
                                        <div className="relative flex h-[170px] items-center justify-center overflow-hidden">
                                            <div className="absolute inset-x-1/2 top-1/2 -z-10 h-[90px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dce8d8]/28 blur-3xl" />
                                            <Image
                                                src={product.image}
                                                alt={product.title}
                                                width={300}
                                                height={300}
                                                className="h-[120px] w-auto object-contain transition duration-300 hover:scale-105 md:h-[140px]"
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

                                                        showToast("Sepete eklendi");
                                                    }}
                                                >
                                                    Sepete Ekle
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