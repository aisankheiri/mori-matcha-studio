import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type OrderItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  meta?: string;
};

type OrderPayload = {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    district: string;
    address: string;
    note?: string;
  };
  items: OrderItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
};

function generateOrderNumber() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `MM-${yyyy}${mm}${dd}-${random}`;
}

function validatePayload(body: Partial<OrderPayload>) {
  if (!body.customer) return "Customer data is required.";
  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return "At least one item is required.";
  }

  const { firstName, lastName, email, phone, city, district, address } =
    body.customer;

  if (!firstName?.trim()) return "First name is required.";
  if (!lastName?.trim()) return "Last name is required.";
  if (!email?.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email.";
  if (!phone?.trim()) return "Phone is required.";
  if (phone.replace(/\D/g, "").length < 10) return "Invalid phone.";
  if (!city?.trim()) return "City is required.";
  if (!district?.trim()) return "District is required.";
  if (!address?.trim()) return "Address is required.";

  return null;
}

function buildItemsRows(items: OrderItem[]) {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e9ece7;font-size:14px;color:#243127;">
            ${item.title}${item.meta ? ` <span style="color:#6b7a70;">(${item.meta})</span>` : ""}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #e9ece7;font-size:14px;color:#243127;text-align:center;">
            ${item.quantity}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #e9ece7;font-size:14px;color:#243127;text-align:right;">
            ₺${item.price}
          </td>
        </tr>
      `
    )
    .join("");
}

function customerEmailHtml({
  orderNumber,
  customer,
  items,
  subtotal,
  shipping,
  total,
}: {
  orderNumber: string;
  customer: OrderPayload["customer"];
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}) {
  const itemsRows = buildItemsRows(items);

  return `
    <div style="margin:0;padding:0;background:#f6f4ef;font-family:Arial,sans-serif;">
      <div style="max-width:680px;margin:0 auto;padding:32px 20px;">
        <div style="background:#ffffff;border:1px solid #e7e7e2;border-radius:24px;padding:32px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#6b8f71;font-weight:700;">
            Mori Matcha
          </div>

          <h1 style="margin:18px 0 10px;font-size:28px;line-height:1.2;color:#1f2f2a;">
            Siparişiniz alındı
          </h1>

          <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#5f6f66;">
            Merhaba ${customer.firstName} ${customer.lastName}, siparişiniz başarıyla alındı.
          </p>

          <div style="background:#f7f6f2;border-radius:18px;padding:16px 18px;margin-bottom:24px;">
            <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8b988f;margin-bottom:6px;">
              Sipariş Numarası
            </div>
            <div style="font-size:20px;font-weight:700;color:#426b4d;">
              ${orderNumber}
            </div>
          </div>

          <h2 style="margin:0 0 14px;font-size:18px;color:#1f2f2a;">Sipariş Özeti</h2>

          <table style="width:100%;border-collapse:collapse;border:1px solid #edf0ea;border-radius:16px;overflow:hidden;">
            <thead>
              <tr style="background:#f9faf8;">
                <th style="padding:12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#6b7a70;">Ürün</th>
                <th style="padding:12px;text-align:center;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#6b7a70;">Adet</th>
                <th style="padding:12px;text-align:right;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#6b7a70;">Fiyat</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
          </table>

          <div style="margin-top:22px;">
            <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;color:#5f6f66;">
              <span>Ara Toplam</span>
              <span>₺${subtotal}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;color:#5f6f66;">
              <span>Kargo</span>
              <span>${shipping === 0 ? "Ücretsiz" : `₺${shipping}`}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:10px 0 0;margin-top:8px;border-top:1px solid #e9ece7;font-size:16px;font-weight:700;color:#1f2f2a;">
              <span>Toplam</span>
              <span style="color:#426b4d;">₺${total}</span>
            </div>
          </div>

          <h2 style="margin:28px 0 12px;font-size:18px;color:#1f2f2a;">Teslimat Bilgileri</h2>

          <div style="font-size:14px;line-height:1.8;color:#5f6f66;">
            <div><strong>Ad Soyad:</strong> ${customer.firstName} ${customer.lastName}</div>
            <div><strong>E-posta:</strong> ${customer.email}</div>
            <div><strong>Telefon:</strong> ${customer.phone}</div>
            <div><strong>Adres:</strong> ${customer.address}</div>
            <div><strong>Bölge:</strong> ${customer.district} / ${customer.city}</div>
            ${customer.note ? `<div><strong>Not:</strong> ${customer.note}</div>` : ""}
          </div>

          <p style="margin:28px 0 0;font-size:14px;line-height:1.8;color:#5f6f66;">
            Teşekkür ederiz. Siparişinizle ilgili gelişmeler olduğunda sizinle tekrar paylaşacağız.
          </p>
        </div>
      </div>
    </div>
  `;
}

function adminEmailHtml({
  orderNumber,
  customer,
  items,
  totalItems,
  subtotal,
  shipping,
  total,
}: {
  orderNumber: string;
  customer: OrderPayload["customer"];
  items: OrderItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
}) {
  const itemsRows = buildItemsRows(items);

  return `
    <div style="font-family:Arial,sans-serif;padding:24px;background:#f6f4ef;">
      <div style="max-width:720px;margin:0 auto;background:#fff;border:1px solid #e7e7e2;border-radius:20px;padding:28px;">
        <h1 style="margin:0 0 18px;font-size:24px;color:#1f2f2a;">Yeni Sipariş</h1>

        <div style="margin-bottom:18px;font-size:14px;line-height:1.8;color:#425046;">
          <div><strong>Sipariş No:</strong> ${orderNumber}</div>
          <div><strong>Müşteri:</strong> ${customer.firstName} ${customer.lastName}</div>
          <div><strong>E-posta:</strong> ${customer.email}</div>
          <div><strong>Telefon:</strong> ${customer.phone}</div>
          <div><strong>Adres:</strong> ${customer.address}</div>
          <div><strong>Bölge:</strong> ${customer.district} / ${customer.city}</div>
          ${customer.note ? `<div><strong>Not:</strong> ${customer.note}</div>` : ""}
        </div>

        <table style="width:100%;border-collapse:collapse;border:1px solid #edf0ea;">
          <thead>
            <tr style="background:#f9faf8;">
              <th style="padding:12px;text-align:left;">Ürün</th>
              <th style="padding:12px;text-align:center;">Adet</th>
              <th style="padding:12px;text-align:right;">Fiyat</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>

        <div style="margin-top:18px;font-size:14px;line-height:1.8;color:#425046;">
          <div><strong>Toplam Ürün:</strong> ${totalItems}</div>
          <div><strong>Ara Toplam:</strong> ₺${subtotal}</div>
          <div><strong>Kargo:</strong> ${shipping === 0 ? "Ücretsiz" : `₺${shipping}`}</div>
          <div><strong>Genel Toplam:</strong> ₺${total}</div>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<OrderPayload>;
    const validationError = validatePayload(body);

    if (validationError) {
      return NextResponse.json(
        { success: false, message: validationError },
        { status: 400 }
      );
    }

    const orderNumber = generateOrderNumber();

    const orderData = {
      orderNumber,
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    console.log("NEW_ORDER", orderData);

    const customer = body.customer!;
    const items = body.items!;
    const subtotal = body.subtotal!;
    const shipping = body.shipping!;
    const total = body.total!;
    const totalItems = body.totalItems!;

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is missing. Emails were not sent.");
    } else {
      await resend.emails.send({
        from: "Mori Matcha <orders@matchaora.com>",
        to: customer.email,
        subject: `Siparişiniz alındı - ${orderNumber}`,
        html: customerEmailHtml({
          orderNumber,
          customer,
          items,
          subtotal,
          shipping,
          total,
        }),
      });

      if (process.env.ADMIN_ORDER_EMAIL) {
        await resend.emails.send({
          from: "Mori Matcha <orders@matchaora.com>",
          to: process.env.ADMIN_ORDER_EMAIL,
          subject: `Yeni Sipariş - ${orderNumber}`,
          html: adminEmailHtml({
            orderNumber,
            customer,
            items,
            totalItems,
            subtotal,
            shipping,
            total,
          }),
        });
      }
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      message: "Order created successfully.",
    });
  } catch (error) {
    console.error("ORDER_CREATE_ERROR", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong while creating order." },
      { status: 500 }
    );
  }
}