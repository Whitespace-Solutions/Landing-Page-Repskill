"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import logo from "@/assets/brand/repskill-logo.png";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { mainNav, primaryCta, type NavItem } from "@/content/navigation";
import { cn } from "@/lib/cn";

const trimSlash = (path: string) => path.replace(/\/+$/, "") || "/";

const isActive = (pathname: string, href: string) => {
  const p = trimSlash(pathname);
  const h = trimSlash(href);
  return p === h || p.startsWith(`${h}/`);
};

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Kunci scroll halaman saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md backdrop-saturate-150 transition-[border-color,box-shadow] duration-300",
          scrolled ? "border-line shadow-[0_8px_24px_-20px_rgb(33_33_33/0.35)]" : "border-transparent",
        )}
      >
        <Container className="flex h-[72px] items-center gap-6">
          <Link href="/" onClick={closeAll} aria-label="Repskill home" className="flex-none">
            <Image src={logo} alt="Repskill" priority className="h-auto w-[126px]" />
          </Link>

          <nav className="ml-4 hidden flex-1 items-center gap-0.5 lg:flex" aria-label="Main">
            {mainNav.map((item) =>
              item.children ? (
                <DesktopDropdown
                  key={item.label}
                  item={item}
                  active={isActive(pathname, item.href)}
                  open={openMenu === item.label}
                  onOpenChange={(o) => setOpenMenu(o ? item.label : null)}
                  onNavigate={closeAll}
                />
              ) : (
                <NavTopLink key={item.label} href={item.href} active={isActive(pathname, item.href)}>
                  {item.label}
                </NavTopLink>
              ),
            )}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            {!isActive(pathname, primaryCta.href) && (
              <ButtonLink
                href={primaryCta.href}
                onClick={closeAll}
                className="max-lg:h-11 max-lg:px-3.5 max-lg:text-sm"
              >
                {primaryCta.label}
              </ButtonLink>
            )}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex size-11 items-center justify-center rounded-button border border-line bg-white text-brand-grey lg:hidden"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Di luar <header>: backdrop-filter membuat elemen `fixed` di dalamnya terkurung setinggi header. */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu pathname={pathname} onNavigate={closeAll} />}
      </AnimatePresence>
    </>
  );
}

function NavTopLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative rounded-lg px-3 py-2.5 text-[17px] font-medium whitespace-nowrap text-brand-charcoal transition-colors hover:bg-surface hover:text-brand-grey"
    >
      {children}
      {active && <ActiveBar />}
    </Link>
  );
}

function ActiveBar() {
  return (
    <motion.span
      layoutId="nav-active"
      className="absolute inset-x-3.5 -bottom-[15px] h-0.5 bg-brand-orange"
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    />
  );
}

function DesktopDropdown({
  item,
  active,
  open,
  onOpenChange,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: () => void;
}) {
  // `row`: semua sub menu berjajar ke samping. Selain itu: ≤3 item satu kolom, lebih dari itu dua kolom.
  const count = item.children?.length ?? 0;
  const row = item.layout === "row";
  const twoColumns = !row && count > 3;
  return (
    <div
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
    >
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        className="relative flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-[17px] font-medium whitespace-nowrap text-brand-charcoal transition-colors hover:bg-surface hover:text-brand-grey"
      >
        {item.label}
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
        {active && <ActiveBar />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full -left-3 z-60 origin-top-left pt-3.5"
          >
            <div
              className={cn(
                "rounded-card border border-line bg-white p-2.5 shadow-pop",
                row ? "w-[760px]" : twoColumns ? "w-[580px]" : "w-[380px]",
              )}
            >
              <div
                className={cn("grid gap-1", twoColumns && "grid-cols-2")}
                style={row ? { gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` } : undefined}
              >
                {item.children!.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onNavigate}
                    className="flex flex-col gap-1 rounded-xl px-4 py-3.5 transition-colors hover:bg-brand-linen"
                  >
                    {child.kicker && (
                      <span className="text-[11px] font-bold tracking-[0.12em] text-brand-orange">
                        {child.kicker}
                      </span>
                    )}
                    <span className="text-[15px] font-semibold text-brand-grey">{child.label}</span>
                    {child.description && (
                      <span className="text-[13.5px] leading-snug text-brand-charcoal">
                        {child.description}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
              {item.overview && (
                <Link
                  href={item.overview.href}
                  onClick={onNavigate}
                  className="group mt-1.5 flex items-center justify-between rounded-xl bg-surface px-4 py-3.5 text-sm font-semibold text-brand-charcoal transition-colors hover:bg-line hover:text-brand-grey"
                >
                  <span>{item.overview.label}</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-x-0 top-[72px] bottom-0 z-70 flex flex-col overflow-auto bg-white px-5 pt-3 pb-8 lg:hidden"
    >
      {mainNav.map((item) =>
        item.children ? (
          <div key={item.label} className="border-b border-line">
            <button
              type="button"
              onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
              aria-expanded={expanded === item.label}
              className="flex min-h-14 w-full items-center justify-between text-lg font-semibold text-brand-grey"
            >
              {item.label}
              <span className="text-[22px] font-normal text-brand-charcoal">
                {expanded === item.label ? "–" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {expanded === item.label && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col pb-2.5">
                    {item.overview && (
                      <Link
                        href={item.overview.href}
                        onClick={onNavigate}
                        className="py-3 pl-3.5 font-semibold text-brand-orange"
                      >
                        {item.overview.label}
                      </Link>
                    )}
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onNavigate}
                        className={cn(
                          "py-3 pl-3.5 text-brand-charcoal",
                          isActive(pathname, child.href) && "text-brand-orange",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            className="flex min-h-14 items-center border-b border-line text-lg font-semibold text-brand-grey"
          >
            {item.label}
          </Link>
        ),
      )}
      <ButtonLink href={primaryCta.href} onClick={onNavigate} size="lg" className="mt-7">
        {primaryCta.label}
      </ButtonLink>
    </motion.div>
  );
}
