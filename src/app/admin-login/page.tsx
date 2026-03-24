"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/admin");
      return;
    }

    alert("Şifre yanlış");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--color-bg)] pt-28 pb-20 md:pt-32">
        <Container>
          <div className="mx-auto max-w-md rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
            <h1 className="text-2xl font-semibold text-[var(--color-text)]">
              Admin Giriş
            </h1>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-5 w-full rounded-[18px] border border-[#6B8F71]/20 bg-white/90 px-4 py-3"
              placeholder="Şifre"
            />

            <div className="mt-4">
              <Button className="w-full" onClick={submit}>
                Giriş Yap
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}