import Image from "next/image";
import Link from "next/link";
import logoReverse from "@/assets/brand/repskill-logo-reverse.png";
import { Container } from "@/components/ui/container";
import { Wireframe } from "@/components/ui/wireframe";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/content/navigation";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-brand-grey text-white">
      {/* Wireframe dekoratif di pojok kanan bawah, digeser 19% ke kanan dan ke bawah sehingga ±65% bentuknya terlihat.
          Berputar pelan; berhenti bila "reduce motion" aktif. Teks tetap di atasnya karena Container dirender
          setelahnya dengan `relative`. */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 w-[min(70%,280px)] translate-x-[19%] translate-y-[19%] text-brand-orange opacity-18 sm:w-[min(45%,340px)] lg:w-[min(28%,380px)]"
        aria-hidden
      >
        <Wireframe className="h-auto w-full motion-safe:animate-spin-slow" />
      </div>

      <Container className="relative py-16 lg:py-20">
        <div className="flex flex-wrap items-start justify-between gap-12">
          {/* Tombol Book Demo tidak diulang di sini: sudah ada di FinalCta tepat di atas footer dan di kolom GET STARTED. */}
          <div className="flex max-w-xs flex-col gap-5">
            <Link href="/" aria-label="Repskill home">
              <Image src={logoReverse} alt="Repskill" className="h-auto w-[150px]" />
            </Link>
            <p className="text-lg font-semibold">{siteConfig.tagline}</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-4" aria-label="Footer">
            {footerNav.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <span className="text-xs font-bold tracking-[0.14em] text-brand-amber">{group.title}</span>
                {group.links.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className="text-[15px] text-line/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>

        {/* Tambahkan link Privacy Policy / Terms di sini setelah halamannya dibuat. */}
        <div className="mt-14 border-t border-white/10 pt-6 text-sm text-line/60">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
