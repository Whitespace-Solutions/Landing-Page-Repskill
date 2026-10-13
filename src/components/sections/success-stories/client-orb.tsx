"use client";

import Image from "next/image";
import { Floating, type Pointer } from "@/components/motion/parallax";
import { Orb } from "@/components/sections/shared/orb";
import { HexOutline } from "@/components/ui/wireframe";
import { clients } from "@/content/clients";
import { cn } from "@/lib/cn";

/**
 * Posisi kartu logo klien (% dari wadah `Orb`), di sudut-sudut luar wireframe seperti foto di hero Home: tidak boleh
 * menabrak wireframe yang berputar. Urutan mengikuti `clients`; logo ke-6 dst. tidak ditampilkan.
 */
const logoLayout = [
  { className: "left-[-10%] top-[6%]", depth: 36, duration: "8s", delay: "0s" },
  { className: "left-[-14%] top-[64%]", depth: 52, duration: "9.5s", delay: "-3s" },
  { className: "left-[80%] top-[12%]", depth: 44, duration: "8.5s", delay: "-5s" },
  { className: "left-[76%] top-[74%]", depth: 40, duration: "9s", delay: "-2s" },
  { className: "left-[30%] top-[94%]", depth: 30, duration: "10s", delay: "-6s" },
];

/**
 * Ilustrasi hero Success Stories: orb yang sama dengan hero Home, tanpa logo Repskill di tengah, dikelilingi kartu putih
 * berisi logo klien yang melayang + parallax. Dekoratif (`aria-hidden` dari `Orb`); daftar klien ada di section
 * Our Clients dan daftar case study.
 */
export function ClientOrb({ mx, my }: Pointer) {
  return (
    <Orb mx={mx} my={my}>
      <Floating
        className="top-[-6%] left-[46%] aspect-square w-[44px] text-brand-orange opacity-50"
        animation="motion-safe:animate-hex-float"
        depth={40}
        duration="9s"
        delay="0s"
        mx={mx}
        my={my}
      >
        <HexOutline className="block size-full" />
      </Floating>
      <Floating
        className="top-[44%] right-[-10%] aspect-square w-[28px] text-brand-grey opacity-42 sm:w-[38px]"
        animation="motion-safe:animate-hex-float"
        depth={64}
        duration="7.5s"
        delay="-2s"
        mx={mx}
        my={my}
      >
        <HexOutline className="block size-full" />
      </Floating>

      {clients.slice(0, logoLayout.length).map((client, i) => {
        const layout = logoLayout[i];
        return (
          <Floating
            key={client.name}
            className={cn("z-2 w-[30%] max-w-[168px]", layout.className)}
            animation="motion-safe:animate-float-soft"
            depth={layout.depth}
            duration={layout.duration}
            delay={layout.delay}
            mx={mx}
            my={my}
          >
            <div className="flex h-12 items-center justify-center rounded-xl border border-line/80 bg-white/95 px-3 shadow-pop backdrop-blur-sm sm:h-16 sm:px-4">
              <Image
                src={client.logo}
                alt=""
                sizes="168px"
                className="h-auto max-h-6 w-auto max-w-full sm:max-h-9"
              />
            </div>
          </Floating>
        );
      })}
    </Orb>
  );
}
