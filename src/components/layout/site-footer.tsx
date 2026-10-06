import Image from "next/image";
import Link from "next/link";
import logoReverse from "@/assets/brand/repskill-logo-reverse.png";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/content/navigation";
import { FooterGraphic } from "./footer-graphic";

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-brand-grey text-white">
      <Container className="pt-16 lg:pt-20">
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

        <FooterGraphic className="mt-12 lg:mt-16" />
      </Container>
    </footer>
  );
}
