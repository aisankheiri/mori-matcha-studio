"use client";

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { dict } from "@/i18n/dict";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const {
        items,
        totalItems,
        totalPrice,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
    } = useCart();

    const { lang } = useLang();
    const t = dict[lang];
    const router = useRouter();

    const shipping = totalPrice >= 500 ? 0 : 80;
    const finalTotal = totalPrice + shipping;

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-[var(--color-bg)] pt-26 pb-20 md:pt-32">
                <Container>
                    <div className="mx-auto w-full max-w-[var(--container-width)]">
                        {items.length === 0 ? (
                            <div className="rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                                <div className="text-lg font-semibold text-[var(--color-text)]">
                                    {t.cart.emptyTitle}
                                </div>

                                <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                                    {t.cart.emptyText}
                                </p>
                            </div>
                        ) : (
                            <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_380px]">
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3 rounded-[24px] border border-white/60 bg-white/70 p-3 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:gap-4 sm:p-4"
                                        >
                                            <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[16px] bg-[var(--color-bg)] sm:h-[82px] sm:w-[82px] sm:rounded-[18px]">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    width={100}
                                                    height={100}
                                                    className="h-[48px] w-auto object-contain sm:h-[58px]"
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="truncate text-sm font-semibold text-[var(--color-text)] sm:text-base">
                                                    {item.title}
                                                </div>

                                                {item.meta && (
                                                    <div className="mt-1 text-[11px] text-[var(--color-text-soft)] sm:text-xs">
                                                        {item.meta}
                                                    </div>
                                                )}

                                                <div className="mt-1 text-xs text-[var(--color-primary-dark)] sm:text-sm">
                                                    ₺{item.price}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 sm:gap-2">
                                                <button
                                                    onClick={() => decreaseQuantity(item.id)}
                                                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#6B8F71]/15 text-xs text-[var(--color-text)] sm:h-8 sm:w-8 sm:text-sm"
                                                >
                                                    -
                                                </button>

                                                <span className="w-5 text-center text-xs font-medium text-[var(--color-text)] sm:w-6 sm:text-sm">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        addToCart({
                                                            id: item.id,
                                                            title: item.title,
                                                            price: item.price,
                                                            image: item.image,
                                                            meta: item.meta,
                                                        })
                                                    }
                                                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#6B8F71]/15 text-xs text-[var(--color-text)] sm:h-8 sm:w-8 sm:text-sm"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                aria-label={t.cart.remove}
                                                className="shrink-0 text-[var(--color-text-soft)] transition hover:text-[var(--color-text)]"
                                            >
                                                <Trash2 className="h-4 w-4 sm:hidden" />
                                                <span className="hidden text-xs sm:inline">{t.cart.remove}</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <aside className="h-fit rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                                    <div className="text-lg font-semibold text-[var(--color-text)]">
                                        {t.cart.orderSummary}
                                    </div>

                                    <div className="mt-6 space-y-3 text-sm text-[var(--color-text-soft)]">
                                        <div className="flex items-center justify-between">
                                            <span>{t.cart.totalItems}</span>
                                            <span>{totalItems}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span>{t.cart.subtotal}</span>
                                            <span>₺{totalPrice.toLocaleString("tr-TR")}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span>{t.cart.shipping}</span>
                                            <span
                                                className={
                                                    shipping === 0 ? "font-medium text-green-600" : ""
                                                }
                                            >
                                                {shipping === 0 ? t.cart.freeShipping : "₺80"}
                                            </span>
                                        </div>

                                        <div className="my-2 h-px bg-[#6B8F71]/20" />

                                        <div className="flex items-center justify-between text-base font-semibold text-[var(--color-text)]">
                                            <span>{t.cart.total}</span>
                                            <span className="text-[var(--color-primary-dark)]">
                                                ₺{finalTotal.toLocaleString("tr-TR")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3">

                                        <Button
                                            className="w-full"
                                            onClick={() => {
                                                if (items.length === 0) return;
                                                router.push("/checkout");
                                            }}
                                        >
                                            {t.cart.checkout}
                                        </Button>

                                        <Button
                                            variant="secondary"
                                            className="w-full"
                                            onClick={clearCart}
                                        >
                                            {t.cart.clearCart}
                                        </Button>
                                    </div>
                                </aside>
                            </div>
                        )}
                    </div>
                </Container>
            </main>
        </>
    );
}