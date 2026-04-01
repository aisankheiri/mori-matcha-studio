import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function emailHtml(code: string) {
  return `
    <div style="margin:0;padding:0;background:#f6f4ef;font-family:Arial,sans-serif;">
      <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
        <div style="background:#ffffff;border:1px solid #e7e7e2;border-radius:24px;padding:32px;text-align:center;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#6b8f71;font-weight:700;">
            Matchaora
          </div>

          <h1 style="margin:18px 0 10px;font-size:28px;line-height:1.2;color:#1f2f2a;">
            E-posta Doğrulama Kodu
          </h1>

          <p style="margin:0 0 18px;font-size:15px;line-height:1.8;color:#5f6f66;">
            Siparişinizi tamamlamadan önce e-posta adresinizi doğrulamanız gerekiyor.
          </p>

          <div style="background:#f7f6f2;border-radius:18px;padding:18px 20px;margin:22px 0;text-align:center;">
            <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8b988f;margin-bottom:8px;">
              Doğrulama Kodu
            </div>
            <div style="font-size:32px;font-weight:700;letter-spacing:0.18em;color:#426b4d;">
              ${code}
            </div>
          </div>

           <p style="margin:14px 0 0;text-align:center;font-size:13px;line-height:1.8;color:#5f6f66;">
            Bu kod 10 dakika boyunca geçerlidir.
          </p>

          <div style="margin-top:28px;text-align:center;">
            <img 
              src="https://matchaora.com/logo.png" 
              alt="Matchaora"
              style="display:block;height:40px;margin:0 auto;opacity:0.95;"
            />
          </div>

         
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email." },
        { status: 400 }
      );
    }

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.emailVerificationCode.deleteMany({
      where: { email },
    });

    await prisma.emailVerificationCode.create({
      data: {
        email,
        code,
        expiresAt,
      },
    });

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, message: "Mail service is not configured." },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: "Matchaora <orders@matchaora.com>",
      to: email,
      subject: "E-posta doğrulama kodunuz",
      html: emailHtml(code),
    });

    return NextResponse.json({
      success: true,
      message: "Verification code sent.",
    });
  } catch (error) {
    console.error("SEND_VERIFICATION_ERROR", error);

    return NextResponse.json(
      { success: false, message: "Failed to send verification code." },
      { status: 500 }
    );
  }
}