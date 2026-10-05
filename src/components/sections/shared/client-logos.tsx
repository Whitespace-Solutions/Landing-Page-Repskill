import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { successStories } from "@/content/success-stories";

/**
 * Section "Our Clients": logo klien dari src/content/success-stories.ts (abu-abu, berwarna saat hover).
 */
export function ClientLogos({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <section className="border-y border-line bg-white">
      <Container className="flex flex-col items-center gap-8 py-14 lg:py-16">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <p className="text-lg font-semibold text-ink">{title}</p>
        </Reveal>
        <Stagger className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4" stagger={0.08}>
          {successStories.map((story) => (
            <StaggerItem key={story.slug}>
              <Link
                href={`/success-stories/${story.slug}/`}
                className="group flex h-24 items-center justify-center rounded-card border border-line px-6 transition-colors hover:border-brand-slate"
              >
                {/* Abu-abu agar palet tetap netral; berwarna saat hover */}
                <Image
                  src={story.logo}
                  alt={story.name}
                  className="h-auto max-h-10 w-auto max-w-full opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
