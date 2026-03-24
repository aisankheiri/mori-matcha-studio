"use client";

import Image from "next/image";

export default function BrandLogo() {
  return (
    <div className="flex justify-center">
      <div className="relative flex flex-col items-center">
        <div className="absolute inset-0 rounded-full bg-[#6B8F71]/30 blur-[120px] scale-150" />

        <Image
          src="/favicon.png"
          alt="Matchaora logo"
          width={400}
          height={400}
          className="relative object-contain
            w-[180px] h-[180px]
            sm:w-[240px] sm:h-[240px]
            md:w-[320px] md:h-[320px]
            lg:w-[400px] lg:h-[400px]
            transition duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
}