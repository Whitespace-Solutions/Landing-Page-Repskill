import type { Metadata } from "next";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/reveal";
import { DemoForm } from "@/components/sections/book-demo/demo-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { bookDemoPage as page } from "@/content/book-demo";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: page.lead,
};

export default function BookDemoPage() {
  return (
    <section className="bg-grid relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 from-30% to-surface"
        aria-hidden
      />
      <Container className="relative grid items-start gap-12 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:pt-24 lg:pb-28">
        <Stagger className="flex flex-col gap-6 lg:sticky lg:top-28" stagger={0.1}>
          <StaggerItem>
            <Eyebrow accent>{page.eyebrow}</Eyebrow>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-display text-balance">{page.title}</h1>
          </StaggerItem>
          <StaggerItem>
            <p className="text-lead text-pretty text-brand-slate">{page.lead}</p>
          </StaggerItem>
          <StaggerItem className="mt-2 flex flex-col gap-3 border-t border-line pt-6">
            <span className="text-eyebrow text-brand-teal">WHAT TO EXPECT</span>
            <ul className="flex flex-col gap-3">
              {page.expectations.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink">
                  <span className="mt-2 h-1 w-3 flex-none -skew-x-[38deg] bg-brand-orange" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>

        <Reveal delay={0.2}>
          <DemoForm />
        </Reveal>
      </Container>
    </section>
  );
}
