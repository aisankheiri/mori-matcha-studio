import { NextResponse } from "next/server";

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

    // Şimdilik sadece logluyoruz.
    // Sonraki adımda veritabanına kaydedeceğiz.
    console.log("NEW_ORDER", {
      orderNumber,
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

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