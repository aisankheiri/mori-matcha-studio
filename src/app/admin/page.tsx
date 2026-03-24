"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/ui/Container";
import { useLang } from "@/context/LangContext";

type AdminOrderItem = {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  meta?: string | null;
  image: string;
};

type AdminOrder = {
  id: string;
  orderNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  note?: string | null;
  subtotal: number;
  shipping: number;
  total: number;
  totalItems: number;
  status: "pending" | "preparing" | "shipped" | "completed" | string;
  trackingNumber?: string | null;
  createdAt: string;
  items: AdminOrderItem[];
};

type OrdersApiResponse = {
  success: boolean;
  orders?: AdminOrder[];
  message?: string;
};

export default function AdminPage() {
  const { lang } = useLang();

  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>(
    {}
  );
  const [statusInputs, setStatusInputs] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const t = useMemo(
    () => ({
      title: lang === "TR" ? "Admin Panel" : "Admin Panel",
      subtitle:
        lang === "TR"
          ? "Siparişleri buradan görüntüleyip yönetebilirsiniz."
          : "You can view and manage orders here.",
      totalOrders: lang === "TR" ? "Toplam Sipariş" : "Total Orders",
      pending: lang === "TR" ? "Bekleyen" : "Pending",
      revenue: lang === "TR" ? "Toplam Ciro" : "Revenue",
      latestOrders: lang === "TR" ? "Son Siparişler" : "Latest Orders",
      customer: lang === "TR" ? "Müşteri" : "Customer",
      contact: lang === "TR" ? "İletişim" : "Contact",
      address: lang === "TR" ? "Adres" : "Address",
      orderNo: lang === "TR" ? "Sipariş No" : "Order No",
      total: lang === "TR" ? "Toplam" : "Total",
      status: lang === "TR" ? "Durum" : "Status",
      items: lang === "TR" ? "Ürünler" : "Items",
      loading:
        lang === "TR" ? "Siparişler yükleniyor..." : "Loading orders...",
      noOrders:
        lang === "TR"
          ? "Henüz kayıtlı sipariş bulunmuyor."
          : "There are no recorded orders yet.",
      fetchError:
        lang === "TR"
          ? "Siparişler alınırken bir hata oluştu."
          : "An error occurred while fetching orders.",
      trackingNumber: lang === "TR" ? "Kargo Takip No" : "Tracking Number",
      trackingPlaceholder:
        lang === "TR" ? "Takip numarası girin" : "Enter tracking number",
      all: lang === "TR" ? "Tümü" : "All",
      save: lang === "TR" ? "Kaydet" : "Save",
      saving: lang === "TR" ? "Kaydediliyor..." : "Saving...",
      saveError:
        lang === "TR"
          ? "Sipariş durumu güncellenemedi."
          : "Order status could not be updated.",
      note: lang === "TR" ? "Not" : "Note",
      subtotal: lang === "TR" ? "Ara Toplam" : "Subtotal",
      shipping: lang === "TR" ? "Kargo" : "Shipping",
      freeShipping: lang === "TR" ? "Ücretsiz" : "Free",
      trackingRequired:
        lang === "TR"
          ? "Kargoya verildi durumu için takip numarası girin."
          : "Enter a tracking number for shipped status.",
      saved:
        lang === "TR"
          ? "Sipariş durumu güncellendi."
          : "Order status updated.",
    }),
    [lang]
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/admin/orders", {
          cache: "no-store",
        });

        const data = (await response.json()) as OrdersApiResponse;

        if (!response.ok || !data.success) {
          throw new Error(data.message || t.fetchError);
        }

        const fetchedOrders = data.orders || [];
        setOrders(fetchedOrders);

        const initialTracking: Record<string, string> = {};
        const initialStatuses: Record<string, string> = {};

        fetchedOrders.forEach((order) => {
          initialTracking[order.id] = order.trackingNumber || "";
          initialStatuses[order.id] = order.status;
        });

        setTrackingInputs(initialTracking);
        setStatusInputs(initialStatuses);
      } catch (err) {
        console.error(err);
        setError(t.fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [t.fetchError]);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  const statusLabel = (status: string) => {
    if (lang === "TR") {
      if (status === "pending") return "Bekliyor";
      if (status === "preparing") return "Hazırlanıyor";
      if (status === "shipped") return "Kargoda";
      if (status === "completed") return "Teslim Edildi";
      return status;
    }

    if (status === "pending") return "Pending";
    if (status === "preparing") return "Preparing";
    if (status === "shipped") return "Shipped";
    if (status === "completed") return "Completed";
    return status;
  };

  const statusClass = (status: string) => {
    if (status === "pending")
      return "bg-amber-50 text-amber-700 border-amber-200";
    if (status === "preparing")
      return "bg-sky-50 text-sky-700 border-sky-200";
    if (status === "shipped")
      return "bg-violet-50 text-violet-700 border-violet-200";
    if (status === "completed")
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    return "bg-zinc-50 text-zinc-700 border-zinc-200";
  };

  const statusOptions = [
    { value: "pending", label: lang === "TR" ? "Bekliyor" : "Pending" },
    {
      value: "preparing",
      label: lang === "TR" ? "Hazırlanıyor" : "Preparing",
    },
    { value: "shipped", label: lang === "TR" ? "Kargoda" : "Shipped" },
    {
      value: "completed",
      label: lang === "TR" ? "Teslim Edildi" : "Completed",
    },
  ];

  const formatDate = (dateString: string) => {
    const locale = lang === "TR" ? "tr-TR" : "en-US";

    return new Date(dateString).toLocaleString(locale, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const updateOrderStatus = async (orderId: string) => {
    try {
      setSavingId(orderId);

      const selectedStatus = statusInputs[orderId];
      const trackingNumber = trackingInputs[orderId]?.trim() || "";

      if (selectedStatus === "shipped" && !trackingNumber) {
        alert(t.trackingRequired);
        setSavingId(null);
        return;
      }

      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: selectedStatus,
          trackingNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update status.");
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: selectedStatus,
                trackingNumber:
                  selectedStatus === "shipped"
                    ? trackingNumber
                    : data.order?.trackingNumber ?? order.trackingNumber,
              }
            : order
        )
      );

      alert(t.saved);
    } catch (error) {
      console.error(error);
      alert(t.saveError);
    } finally {
      setSavingId(null);
    }
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((order) => order.status === filter);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--color-bg)] pt-28 pb-20 md:pt-32">
        <Container>
          <div className="mx-auto w-full max-w-[var(--container-width)]">
            <div className="rounded-[32px] border border-white/60 bg-white/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl md:p-8">
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text)]">
                {t.title}
              </h1>

              <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)] md:text-base">
                {t.subtitle}
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-[24px] border border-white/60 bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                  <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    {t.totalOrders}
                  </div>
                  <div className="mt-3 text-3xl font-semibold text-[var(--color-text)]">
                    {totalOrders}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/60 bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                  <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    {t.pending}
                  </div>
                  <div className="mt-3 text-3xl font-semibold text-[var(--color-text)]">
                    {pendingOrders}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/60 bg-white/75 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                  <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    {t.revenue}
                  </div>
                  <div className="mt-3 text-3xl font-semibold text-[var(--color-primary-dark)]">
                    ₺{revenue.toLocaleString("tr-TR")}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[32px] border border-white/60 bg-white/70 p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl md:p-6">
              <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="text-xl font-semibold text-[var(--color-text)]">
                  {t.latestOrders}
                </div>

                <div className="flex flex-wrap gap-2">
                  {["all", "pending", "preparing", "shipped", "completed"].map(
                    (value) => (
                      <button
                        key={value}
                        onClick={() => setFilter(value)}
                        className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                          filter === value
                            ? "bg-[var(--color-primary)] text-white"
                            : "border border-white/60 bg-white/75 text-[var(--color-text-soft)]"
                        }`}
                      >
                        {value === "all" ? t.all : statusLabel(value)}
                      </button>
                    )
                  )}
                </div>
              </div>

              {loading ? (
                <div className="rounded-[24px] bg-white/70 p-6 text-sm text-[var(--color-text-soft)]">
                  {t.loading}
                </div>
              ) : error ? (
                <div className="rounded-[24px] border border-red-200 bg-red-50 p-6 text-sm text-red-600">
                  {error}
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="rounded-[24px] bg-white/70 p-6 text-sm text-[var(--color-text-soft)]">
                  {t.noOrders}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => {
                    const selectedStatus = statusInputs[order.id] || order.status;

                    return (
                      <div
                        key={order.id}
                        className="rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div>
                            <div className="text-sm uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                              {t.orderNo}
                            </div>
                            <div className="mt-1 text-lg font-semibold text-[var(--color-text)]">
                              {order.orderNumber}
                            </div>
                          </div>

                          <div className="flex flex-col items-start gap-3 md:items-end">
                            <div className="flex flex-col gap-3 md:flex-row md:items-center">
                              <select
                                value={selectedStatus}
                                disabled={savingId === order.id}
                                onChange={(e) =>
                                  setStatusInputs((prev) => ({
                                    ...prev,
                                    [order.id]: e.target.value,
                                  }))
                                }
                                className={`rounded-full border px-3 py-2 text-xs font-medium outline-none transition ${statusClass(
                                  selectedStatus
                                )}`}
                              >
                                {statusOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>

                              <div className="text-xs text-[var(--color-text-soft)]">
                                {formatDate(order.createdAt)}
                              </div>
                            </div>

                            {selectedStatus === "shipped" && (
                              <input
                                type="text"
                                value={trackingInputs[order.id] || ""}
                                onChange={(e) =>
                                  setTrackingInputs((prev) => ({
                                    ...prev,
                                    [order.id]: e.target.value,
                                  }))
                                }
                                placeholder={t.trackingPlaceholder}
                                className="w-[220px] rounded-[14px] border border-[#6B8F71]/20 bg-white/90 px-4 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[#6B8F71]/50"
                              />
                            )}

                            <button
                              onClick={() => updateOrderStatus(order.id)}
                              disabled={savingId === order.id}
                              className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-xs font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {savingId === order.id ? t.saving : t.save}
                            </button>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-4 md:grid-cols-3">
                          <div className="rounded-[20px] bg-[var(--color-bg)] p-4">
                            <div className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                              {t.customer}
                            </div>
                            <div className="mt-2 text-sm font-semibold text-[var(--color-text)]">
                              {order.firstName} {order.lastName}
                            </div>
                            <div className="mt-1 text-sm text-[var(--color-text-soft)]">
                              {order.city} / {order.district}
                            </div>
                          </div>

                          <div className="rounded-[20px] bg-[var(--color-bg)] p-4">
                            <div className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                              {t.contact}
                            </div>
                            <div className="mt-2 text-sm text-[var(--color-text)]">
                              {order.email}
                            </div>
                            <div className="mt-1 text-sm text-[var(--color-text-soft)]">
                              {order.phone}
                            </div>
                          </div>

                          <div className="rounded-[20px] bg-[var(--color-bg)] p-4">
                            <div className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                              {t.total}
                            </div>
                            <div className="mt-2 text-lg font-semibold text-[var(--color-primary-dark)]">
                              ₺{order.total.toLocaleString("tr-TR")}
                            </div>
                            <div className="mt-1 text-sm text-[var(--color-text-soft)]">
                              {order.totalItems} {t.items.toLowerCase()}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 rounded-[20px] bg-[var(--color-bg)] p-4">
                          <div className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                            {t.address}
                          </div>
                          <div className="mt-2 text-sm leading-6 text-[var(--color-text)]">
                            {order.address}
                          </div>
                          {order.note ? (
                            <div className="mt-2 text-sm text-[var(--color-text-soft)]">
                              {t.note}: {order.note}
                            </div>
                          ) : null}
                          {order.trackingNumber ? (
                            <div className="mt-2 text-sm text-[var(--color-primary-dark)]">
                              {t.trackingNumber}: {order.trackingNumber}
                            </div>
                          ) : null}
                        </div>

                        <div className="mt-4 rounded-[20px] bg-[var(--color-bg)] p-4">
                          <div className="mb-3 text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                            {t.items}
                          </div>

                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between gap-3 rounded-[16px] border border-white/60 bg-white/70 p-3"
                              >
                                <div className="min-w-0 flex-1">
                                  <div className="truncate text-sm font-medium text-[var(--color-text)]">
                                    {item.title}
                                  </div>
                                  {item.meta ? (
                                    <div className="mt-1 text-xs text-[var(--color-text-soft)]">
                                      {item.meta}
                                    </div>
                                  ) : null}
                                </div>

                                <div className="shrink-0 text-right">
                                  <div className="text-sm font-medium text-[var(--color-text)]">
                                    {item.quantity} × ₺{item.price}
                                  </div>
                                  <div className="mt-1 text-xs text-[var(--color-primary-dark)]">
                                    ₺
                                    {(
                                      item.quantity * item.price
                                    ).toLocaleString("tr-TR")}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 space-y-2 border-t border-[#6B8F71]/12 pt-4 text-sm text-[var(--color-text-soft)]">
                            <div className="flex items-center justify-between">
                              <span>{t.subtotal}</span>
                              <span>₺{order.subtotal.toLocaleString("tr-TR")}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>{t.shipping}</span>
                              <span>
                                {order.shipping === 0
                                  ? t.freeShipping
                                  : `₺${order.shipping.toLocaleString("tr-TR")}`}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-base font-semibold text-[var(--color-text)]">
                              <span>{t.total}</span>
                              <span className="text-[var(--color-primary-dark)]">
                                ₺{order.total.toLocaleString("tr-TR")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}