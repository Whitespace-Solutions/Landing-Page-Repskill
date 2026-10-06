import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { clients, type Client } from "@/content/clients";
import { cn } from "@/lib/cn";

/** Jumlah logo minimal per putaran agar baris tetap penuh di layar lebar. */
const MIN_PER_LOOP = 10;
/** Detik per logo — makin besar, makin pelan. */
const SECONDS_PER_LOGO = 4;

/**
 * Section "Our Clients": logo berjalan dari kiri ke kanan tanpa putus (marquee).
 * Berhenti saat di-hover; tampil sebagai grid statis bila pengguna memilih "reduce motion".
 * Daftar logo: src/content/clients.ts
 */
export function ClientLogos({ eyebrow, title }: { eyebrow: string; title: string }) {
  const repeats = Math.max(1, Math.ceil(MIN_PER_LOOP / clients.length));
  const loop = Array.from({ length: repeats }, () => clients).flat();

  return (
    <section className="border-y border-line bg-white py-14 lg:py-16">
      <Container>
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <p className="text-lg font-semibold text-ink">{title}</p>
        </Reveal>
      </Container>

      <Reveal className="mt-8 motion-reduce:hidden">
        <div className="group/marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {/* Dua salinan identik; animasi menggeser satu salinan penuh lalu mengulang. */}
          <div
            className="flex w-max animate-marquee-right group-hover/marquee:[animation-play-state:paused]"
            style={{ "--marquee-duration": `${loop.length * SECONDS_PER_LOGO}s` } as React.CSSProperties}
          >
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 gap-3 pr-3" aria-hidden={copy === 1 || undefined}>
                {loop.map((client, i) => {
                  const duplicate = copy === 1 || i >= clients.length;
                  return (
                    <li key={`${client.name}-${i}`} aria-hidden={duplicate || undefined}>
                      <LogoTile client={client} focusable={!duplicate} className="w-44 sm:w-56" />
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Versi statis untuk "reduce motion" */}
      <Container className="mt-8 hidden motion-reduce:block">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((client) => (
            <li key={client.name}>
              <LogoTile client={client} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function LogoTile({
  client,
  focusable = true,
  className,
}: {
  client: Client;
  focusable?: boolean;
  className?: string;
}) {
  const tileClass = cn(
    "group flex h-24 items-center justify-center rounded-card border border-line bg-white px-6 transition-colors",
    client.href && "hover:border-brand-slate",
    className,
  );
  // Abu-abu agar palet tetap netral; berwarna saat hover
  const logo = (
    <Image
      src={client.logo}
      alt={client.name}
      className="h-auto max-h-10 w-auto max-w-full opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
    />
  );

  return client.href ? (
    <Link href={client.href} className={tileClass} tabIndex={focusable ? undefined : -1}>
      {logo}
    </Link>
  ) : (
    <div className={tileClass}>{logo}</div>
  );
}
