import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ email template
function shippedEmailHtml({
  firstName,
  orderNumber,
  trackingNumber,
}: {
  firstName: string;
  orderNumber: string;
  trackingNumber?: string | null;
}) {
  return `
    <div style="font-family:Arial;padding:24px;background:#f6f4ef;">
      <div style="max-width:600px;margin:auto;background:#fff;border-radius:20px;padding:24px;">
        <h2>Siparişiniz Kargoya Verildi</h2>
        <p>Merhaba ${firstName},</p>
        <p><strong>${orderNumber}</strong> numaralı siparişiniz kargoya verildi.</p>

        ${
          trackingNumber
            ? `<p><strong>Kargo Takip No:</strong> ${trackingNumber}</p>`
            : ""
        }

        <p>İyi günlerde kullanın 🌿</p>
      </div>
    </div>
  `;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const body = await request.json();

    const status = body.status;
    const trackingNumber = body.trackingNumber;

    const allowedStatuses = ["pending", "preparing", "shipped", "completed"];

    // ❌ status kontrol
    if (!status || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    // ❌ shipped ise tracking zorunlu
    if (status === "shipped" && !trackingNumber?.trim()) {
      return NextResponse.json(
        { success: false, message: "Tracking number required" },
        { status: 400 }
      );
    }

    // ✅ order çek
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // ✅ update
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status,
        trackingNumber:
          status === "shipped"
            ? trackingNumber?.trim()
            : existingOrder.trackingNumber,
      },
    });

    // ✅ sadece ilk kez shipped olunca mail gönder
    if (
      status === "shipped" &&
      existingOrder.status !== "shipped" &&
      process.env.RESEND_API_KEY
    ) {
      const result = await resend.emails.send({
        from: "Matchaora <orders@matchaora.com>",
        to: updatedOrder.email,
        subject: `Siparişiniz kargoya verildi - ${updatedOrder.orderNumber}`,
        html: shippedEmailHtml({
          firstName: updatedOrder.firstName,
          orderNumber: updatedOrder.orderNumber,
          trackingNumber: updatedOrder.trackingNumber,
        }),
      });

      console.log("SHIPPED EMAIL:", result);
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("PATCH ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 }
    );
  }
}