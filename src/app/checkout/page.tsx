"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { dict } from "@/i18n/dict";
import Image from "next/image";

type CheckoutForm = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    district: string;
    address: string;
    note: string;
};

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalItems, totalPrice } = useCart();
    const { lang } = useLang();
    const t = dict[lang];

    const [form, setForm] = useState<CheckoutForm>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        district: "",
        address: "",
        note: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const shipping = totalPrice >= 500 ? 0 : 80;
    const finalTotal = totalPrice + shipping;

    const isCartEmpty = items.length === 0;

    const pageText = useMemo(
        () => ({
            stepCart: lang === "TR" ? "Sepet" : "Cart",
            stepInfo: lang === "TR" ? "Bilgiler" : "Details",
            stepConfirm: lang === "TR" ? "Onay" : "Confirmation",

            title: lang === "TR" ? "Teslimat ve Sipariş Bilgileri" : "Delivery and Order Details",
            subtitle:
                lang === "TR"
                    ? "Siparişinizi tamamlamak için bilgilerinizi girin."
                    : "Enter your details to complete your order.",

            firstName: lang === "TR" ? "Ad" : "First Name",
            lastName: lang === "TR" ? "Soyad" : "Last Name",
            email: lang === "TR" ? "E-posta" : "Email",
            phone: lang === "TR" ? "Telefon" : "Phone",
            city: lang === "TR" ? "Şehir" : "City",
            district: lang === "TR" ? "İlçe" : "District",
            address: lang === "TR" ? "Açık Adres" : "Full Address",
            note: lang === "TR" ? "Sipariş Notu" : "Order Note",

            notePlaceholder:
                lang === "TR"
                    ? "Kapı no, teslimat notu veya ek bilgi yazabilirsiniz."
                    : "You can add apartment number, delivery note, or extra information.",

            summary: lang === "TR" ? "Sipariş Özeti" : "Order Summary",
            completeOrder: lang === "TR" ? "Siparişi Tamamla" : "Complete Order",
            emptyCart:
                lang === "TR"
                    ? "Sepetiniz boş. Devam etmek için önce ürün ekleyin."
                    : "Your cart is empty. Add products before continuing.",
            backToProducts: lang === "TR" ? "Ürünlere Dön" : "Back to Products",

            required: lang === "TR" ? "Bu alan zorunludur." : "This field is required.",
            invalidEmail: lang === "TR" ? "Geçerli bir e-posta girin." : "Enter a valid email.",
            invalidPhone:
                lang === "TR" ? "Geçerli bir telefon numarası girin." : "Enter a valid phone number.",

            subtotal: lang === "TR" ? "Ara Toplam" : "Subtotal",
            shipping: lang === "TR" ? "Kargo" : "Shipping",
            freeShipping: lang === "TR" ? "Ücretsiz" : "Free",
            total: lang === "TR" ? "Toplam" : "Total",
            totalItems: lang === "TR" ? "Toplam Ürün" : "Total Items",
        }),
        [lang]
    );

    const validate = () => {
        const nextErrors: Partial<Record<keyof CheckoutForm, string>> = {};

        if (!form.firstName.trim()) nextErrors.firstName = pageText.required;
        if (!form.lastName.trim()) nextErrors.lastName = pageText.required;
        if (!form.email.trim()) {
            nextErrors.email = pageText.required;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            nextErrors.email = pageText.invalidEmail;
        }

        if (!form.phone.trim()) {
            nextErrors.phone = pageText.required;
        } else if (form.phone.replace(/\D/g, "").length < 10) {
            nextErrors.phone = pageText.invalidPhone;
        }

        if (!form.city.trim()) nextErrors.city = pageText.required;
        if (!form.district.trim()) nextErrors.district = pageText.required;
        if (!form.address.trim()) nextErrors.address = pageText.required;

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const updateField = (key: keyof CheckoutForm, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: "" }));
        }
    };

    const handleSubmit = async () => {
        if (isCartEmpty) return;
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customer: form,
                    items,
                    totalItems,
                    subtotal: totalPrice,
                    shipping,
                    total: finalTotal,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Order could not be created.");
            }

            router.push(`/order-success/${data.orderNumber}`);
        } catch (error) {
            console.error(error);
            alert(lang === "TR"
                ? "Sipariş oluşturulurken bir hata oluştu."
                : "An error occurred while creating the order.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-[var(--color-bg)] pt-20 pb-20 md:pt-24">
                <Container>
                    <div className="mx-auto w-full max-w-[var(--container-width)]">
                        <div className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)] md:mb-10">
                            <span>{pageText.stepCart}</span>
                            <span>/</span>
                            <span className="font-semibold text-[var(--color-primary-dark)]">
                                {pageText.stepInfo}
                            </span>
                            <span>/</span>
                            <span>{pageText.stepConfirm}</span>
                        </div>

                        {isCartEmpty ? (
                            <div className="rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                                <div className="text-lg font-semibold text-[var(--color-text)]">
                                    {pageText.emptyCart}
                                </div>

                                <div className="mt-5">
                                    <Button onClick={() => router.push("/products")}>
                                        {pageText.backToProducts}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                                <section className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl md:p-6">
                                    <div>
                                        <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text)] md:text-3xl">
                                            {pageText.title}
                                        </h1>

                                        <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                                            {pageText.subtitle}
                                        </p>
                                    </div>

                                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                                        <Field
                                            label={pageText.firstName}
                                            value={form.firstName}
                                            onChange={(v) => updateField("firstName", v)}
                                            error={errors.firstName}
                                        />

                                        <Field
                                            label={pageText.lastName}
                                            value={form.lastName}
                                            onChange={(v) => updateField("lastName", v)}
                                            error={errors.lastName}
                                        />

                                        <Field
                                            label={pageText.email}
                                            type="email"
                                            value={form.email}
                                            onChange={(v) => updateField("email", v)}
                                            error={errors.email}
                                        />

                                        <Field
                                            label={pageText.phone}
                                            type="tel"
                                            value={form.phone}
                                            onChange={(v) => updateField("phone", v)}
                                            error={errors.phone}
                                        />

                                        <Field
                                            label={pageText.city}
                                            value={form.city}
                                            onChange={(v) => updateField("city", v)}
                                            error={errors.city}
                                        />

                                        <Field
                                            label={pageText.district}
                                            value={form.district}
                                            onChange={(v) => updateField("district", v)}
                                            error={errors.district}
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <Field
                                            label={pageText.address}
                                            value={form.address}
                                            onChange={(v) => updateField("address", v)}
                                            error={errors.address}
                                            textarea
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <Field
                                            label={pageText.note}
                                            value={form.note}
                                            onChange={(v) => updateField("note", v)}
                                            textarea
                                            placeholder={pageText.notePlaceholder}
                                        />
                                    </div>
                                </section>

                                <aside className="h-fit rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                                    <div className="text-lg font-semibold text-[var(--color-text)]">
                                        {pageText.summary}
                                    </div>

                                    <div className="mt-5 space-y-4">
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-3 rounded-[20px] bg-white/60 p-3"
                                            >
                                                <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[16px] bg-[var(--color-bg)]">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        width={90}
                                                        height={90}
                                                        className="h-[46px] w-auto object-contain"
                                                    />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="truncate text-sm font-semibold text-[var(--color-text)]">
                                                        {item.title}
                                                    </div>

                                                    {item.meta && (
                                                        <div className="mt-1 text-[11px] text-[var(--color-text-soft)]">
                                                            {item.meta}
                                                        </div>
                                                    )}

                                                    <div className="mt-1 text-xs text-[var(--color-primary-dark)]">
                                                        {item.quantity} × ₺{item.price}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 space-y-3 text-sm text-[var(--color-text-soft)]">
                                        <div className="flex items-center justify-between">
                                            <span>{pageText.totalItems}</span>
                                            <span>{totalItems}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span>{pageText.subtotal}</span>
                                            <span>₺{totalPrice.toLocaleString("tr-TR")}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span>{pageText.shipping}</span>
                                            <span className={shipping === 0 ? "font-medium text-green-600" : ""}>
                                                {shipping === 0 ? pageText.freeShipping : "₺80"}
                                            </span>
                                        </div>

                                        <div className="my-2 h-px bg-[#6B8F71]/20" />

                                        <div className="flex items-center justify-between text-base font-semibold text-[var(--color-text)]">
                                            <span>{pageText.total}</span>
                                            <span className="text-[var(--color-primary-dark)]">
                                                ₺{finalTotal.toLocaleString("tr-TR")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <Button
                                            className="w-full"
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "..." : pageText.completeOrder}
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

type FieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    type?: string;
    textarea?: boolean;
    placeholder?: string;
};

function Field({
    label,
    value,
    onChange,
    error,
    type = "text",
    textarea = false,
    placeholder,
}: FieldProps) {
    const baseClass =
        "w-full rounded-[18px] border bg-white/90 px-4 py-3 text-sm text-[var(--color-text)] outline-none transition duration-300 placeholder:text-[var(--color-text-muted)]/70";
    const normalClass =
        "border-[#6B8F71]/22 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] focus:border-[#6B8F71]/55 focus:ring-4 focus:ring-[#6B8F71]/10";
    const errorClass =
        "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100";

    return (
        <label className="block">
            <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-dark)]">
                {label}
            </div>

            {textarea ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={4}
                    className={`${baseClass} ${error ? errorClass : normalClass} resize-none`}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`${baseClass} ${error ? errorClass : normalClass}`}
                />
            )}

            {error ? (
                <div className="mt-2 text-xs font-medium text-red-500">{error}</div>
            ) : null}
        </label>
    );
}