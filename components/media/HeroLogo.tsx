// components/media/HeroLogo.tsx
"use client";

import Image from "next/image";

export default function HeroLogo() {
  return (
    <div className="w-40 h-40 relative">
      <Image
        src="/logo-white.png"   // <-- updated filename
        alt="Green Sky logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}