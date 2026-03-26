import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function preparingEmailHtml({
  firstName,
  orderNumber,
}: {
  firstName: string;
  orderNumber: string;
}) {
  return `
    <div style="margin:0;padding:0;background:#f6f4ef;font-family:Arial,sans-serif;">
      <div style="max-width:680px;margin:0 auto;padding:32px 20px;">
        <div style="background:#ffffff;border:1px solid #e7e7e2;border-radius:24px;padding:32px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#6b8f71;font-weight:700;">
            Matchaora
          </div>

          <h1 style="margin:18px 0 10px;font-size:28px;line-height:1.2;color:#1f2f2a;">
            Ödemeniz onaylandı
          </h1>

          <p style="margin:0 0 18px;font-size:15px;line-height:1.8;color:#5f6f66;">
            Merhaba ${firstName},
          </p>

          <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:#5f6f66;">
            <strong>${orderNumber}</strong> numaralı siparişinizin ödemesi tarafımızca onaylanmıştır ve ürününüz hazırlanmaya başlamıştır.
          </p>

          <div style="background:#f7f6f2;border-radius:18px;padding:16px 18px;margin:22px 0;">
            <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8b988f;margin-bottom:6px;">
              Sipariş Durumu
            </div>
            <div style="font-size:20px;font-weight:700;color:#426b4d;">
              Hazırlanıyor
            </div>
          </div>

          <p style="margin:0 0 14px;font-size:15px;line-height:1.8;color:#5f6f66;">
            Siparişiniz en geç <strong>48 saat içerisinde</strong> kargoya teslim edilecek ve teslimat süreci başladığında size tekrar e-posta ile bilgilendirme yapılacaktır.
          </p>

          <p style="margin:0;font-size:15px;line-height:1.8;color:#5f6f66;">
            Bizi tercih ettiğiniz için teşekkür eder, Matchaora ile keyifli bir matcha deneyimi yaşamanızı dileriz.
          </p>
          <div style="margin-top:30px;text-align:center;">
  <img 
    src="https://matchaora.com/logo.png" 
    alt="Matchaora"
    style="height:40px;opacity:0.9;"
  />
</div>

          <div style="margin-top:30px;border-top:1px solid #e9ece7;padding-top:18px;text-align:center;">
            <div style="font-size:11px;color:#8b988f;letter-spacing:0.12em;">
              MATCHAORA
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

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

          <p style="margin:0 0 18px;font-size:15px;line-height:1.8;color:#5f6f66;">
            Merhaba ${firstName},
          </p>

          <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:#5f6f66;">
            <strong>${orderNumber}</strong> numaralı siparişiniz kargoya verilmiştir.
          </p>

          ${trackingNumber
      ? `
            <div style="background:#f7f6f2;border-radius:18px;padding:16px 18px;margin:22px 0;">
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

          <p style="margin:0;font-size:15px;line-height:1.8;color:#5f6f66;">
            Teslimat süreci başlamıştır. Siparişiniz en kısa sürede tarafınıza ulaştırılacaktır.
          </p>
                    <div style="margin-top:30px;text-align:center;">
  <img 
    src="https://matchaora.com/logo.png" 
    alt="Matchaora"
    style="height:40px;opacity:0.9;"
  />
</div>

          <div style="margin-top:30px;border-top:1px solid #e9ece7;padding-top:18px;text-align:center;">
            <div style="font-size:11px;color:#8b988f;letter-spacing:0.12em;">
              MATCHAORA
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

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
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    if (body.status === "shipped" && !body.trackingNumber?.trim()) {
      return NextResponse.json(
        { success: false, message: "Tracking number required" },
        { status: 400 }
      );
    }

    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
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

    if (process.env.RESEND_API_KEY) {
      if (
        body.status === "preparing" &&
        existingOrder.status !== "preparing"
      ) {
        const result = await resend.emails.send({
          from: "Matchaora <orders@matchaora.com>",
          to: updatedOrder.email,
          subject: `Ödemeniz onaylandı - ${updatedOrder.orderNumber}`,
          html: preparingEmailHtml({
            firstName: updatedOrder.firstName,
            orderNumber: updatedOrder.orderNumber,
          }),
        });

        console.log("PREPARING_EMAIL_RESULT", result);
      }

      if (
        body.status === "shipped" &&
        existingOrder.status !== "shipped"
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