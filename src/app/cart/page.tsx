"use client";

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

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

  const shipping = totalPrice >= 500 ? 0 : 80;
  const finalTotal = totalPrice + shipping;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--color-bg)] pt-8 pb-16 md:pt-12 md:pb-20">
        <Container>
          <div className="mx-auto w-full max-w-[var(--container-width)]">
            {items.length === 0 ? (
              <div className="mt-3 rounded-[24px] border border-white/60 bg-white/70 p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl md:rounded-[28px] md:p-6">
                <div className="text-base font-semibold text-[var(--color-text)] md:text-lg">
                  Sepetiniz şu an boş
                </div>

                <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                  Ürünler sayfasından matcha, bowl, bambu whisk veya matcha kaşığı ekleyebilirsiniz.
                </p>
              </div>
            ) : (
              <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_380px] lg:gap-6">
                {/* SOL TARAF - ÜRÜNLER */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[22px] border border-white/60 bg-white/70 p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl md:rounded-[24px]"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        {/* Görsel */}
                        <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-[16px] bg-[var(--color-bg)] md:h-[82px] md:w-[82px] md:rounded-[18px]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={100}
                            height={100}
                            className="h-[56px] w-auto object-contain md:h-[58px]"
                          />
                        </div>

                        {/* Bilgiler */}
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-[var(--color-text)] md:text-base">
                            {item.title}
                          </div>

                          {item.meta && (
                            <div className="mt-1 text-xs text-[var(--color-text-soft)]">
                              {item.meta}
                            </div>
                          )}

                          <div className="mt-1 text-sm text-[var(--color-primary-dark)]">
                            ₺{item.price}
                          </div>
                        </div>

                        {/* Sağ aksiyonlar */}
                        <div className="flex items-center justify-between gap-3 sm:justify-end">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#6B8F71]/15 text-sm text-[var(--color-text)] transition hover:bg-white"
                            >
                              -
                            </button>

                            <span className="w-6 text-center text-sm font-medium text-[var(--color-text)]">
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
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#6B8F71]/15 text-sm text-[var(--color-text)] transition hover:bg-white"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="rounded-full px-3 py-1.5 text-xs text-[var(--color-text-soft)] transition hover:bg-white hover:text-[var(--color-text)]"
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SAĞ TARAF - SİPARİŞ ÖZETİ */}
                <aside className="h-fit rounded-[24px] border border-white/60 bg-white/70 p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl md:rounded-[28px] md:p-6 lg:sticky lg:top-24">
                  <div className="text-base font-semibold text-[var(--color-text)] md:text-lg">
                    Sipariş Özeti
                  </div>

                  <div className="mt-5 space-y-3 text-sm text-[var(--color-text-soft)] md:mt-6">
                    <div className="flex items-center justify-between">
                      <span>Toplam Ürün</span>
                      <span>{totalItems}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Ara Toplam</span>
                      <span>₺{totalPrice.toLocaleString("tr-TR")}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Kargo</span>
                      <span className={shipping === 0 ? "font-medium text-green-600" : ""}>
                        {shipping === 0 ? "Ücretsiz" : "₺80"}
                      </span>
                    </div>

                    <div className="my-2 h-px bg-[#6B8F71]/20" />

                    <div className="flex items-center justify-between text-base font-semibold text-[var(--color-text)]">
                      <span>Toplam</span>
                      <span className="text-[var(--color-primary-dark)]">
                        ₺{finalTotal.toLocaleString("tr-TR")}
                      </span>
                    </div>

                    {shipping === 0 ? (
                      <div className="text-xs text-green-600">
                        ✓ Kargo ücretsiz
                      </div>
                    ) : (
                      <div className="text-xs text-[var(--color-text-soft)]">
                        500 TL üzeri alışverişlerde ücretsiz kargo
                      </div>
                    )}
                  </div>

                  <div className="mt-5 space-y-3 md:mt-6">
                    <Button className="w-full">Ödemeye Geç</Button>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={clearCart}
                    >
                      Sepeti Temizle
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