import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type RouteContext = {
  params: Promise<{ id: string }>;
};

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
    <div style="margin:0;padding:0;background:#f6f4ef;font-family:Arial,sans-serif;">
      <div style="max-width:680px;margin:0 auto;padding:32px 20px;">
        <div style="background:#ffffff;border:1px solid #e7e7e2;border-radius:24px;padding:32px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#6b8f71;font-weight:700;">
            Matchaora
          </div>

          <h1 style="margin:18px 0 10px;font-size:28px;line-height:1.2;color:#1f2f2a;">
            Siparişiniz kargoya verildi
          </h1>

          <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#5f6f66;">
            Merhaba ${firstName}, <strong>${orderNumber}</strong> numaralı siparişiniz kargoya verildi.
          </p>

          ${
            trackingNumber
              ? `
            <div style="background:#f7f6f2;border-radius:18px;padding:16px 18px;margin-bottom:24px;">
              <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8b988f;margin-bottom:6px;">
                Kargo Takip Numarası
              </div>
              <div style="font-size:20px;font-weight:700;color:#426b4d;">
                ${trackingNumber}
              </div>
            </div>
          `
              : ""
          }

          <p style="margin:0;font-size:14px;line-height:1.8;color:#5f6f66;">
            Siparişinizin teslimat sürecini takip edebilirsiniz. Bizi tercih ettiğiniz için teşekkür ederiz.
          </p>
        </div>
      </div>
    </div>
  `;
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as {
      status?: string;
      trackingNumber?: string;
    };

    const allowedStatuses = ["pending", "preparing", "shipped", "completed"];

    if (!body.status || !allowedStatuses.includes(body.status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status." },
        { status: 400 }
      );
    }

    if (body.status === "shipped" && !body.trackingNumber?.trim()) {
      return NextResponse.json(
        { success: false, message: "Tracking number is required for shipped orders." },
        { status: 400 }
      );
    }

    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found." },
        { status: 404 }
      );
    }

 const updatedOrder = await prisma.order.update({
  where: { id },
  data: {
    status: body.status,
    trackingNumber:
      body.status === "shipped"
        ? body.trackingNumber?.trim() || null
        : existingOrder.trackingNumber ?? null,
  },
});

    if (
      body.status === "shipped" &&
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

      console.log("SHIPPED_EMAIL_RESULT", result);
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("ADMIN_ORDER_STATUS_UPDATE_ERROR", error);

    return NextResponse.json(
      { success: false, message: "Failed to update order status." },
      { status: 500 }
    );
  }
}