import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <Container className="flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
          <Eyebrow>404</Eyebrow>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            This page is still being built.
          </h1>
          <p className="max-w-xl text-lg text-brand-charcoal">
            The page you are looking for doesn&apos;t exist yet or has moved.
          </p>
          <ButtonLink href="/" size="lg" withArrow>
            Back to home
          </ButtonLink>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
