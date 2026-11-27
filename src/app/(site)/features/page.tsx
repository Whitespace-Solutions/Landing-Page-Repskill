import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const TARGET = "/features/capture-knowledge/";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Repskill: Capture Knowledge, Learn Knowledge, and Practice with AI sales roleplay and reflection.",
  robots: { index: false, follow: true },
};

/**
 * Rute `/features/` mengarahkan langsung ke halaman fitur pertama (Capture Knowledge) agar tautan
 * langsung ke `/features/` tidak jatuh ke 404 Caddy dan memantul ke halaman login aplikasi.
 */
export default function FeaturesIndexPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=capture-knowledge/" />
      <Container className="flex min-h-[50vh] flex-col items-start justify-center gap-4 py-24">
        <h1 className="text-h2 text-brand-grey">Explore Repskill Features</h1>
        <p className="text-brand-charcoal">
          Redirecting to{" "}
          <Link href={TARGET} className="font-semibold text-brand-orange underline underline-offset-4">
            Capture Knowledge
          </Link>
          …
        </p>
      </Container>
    </>
  );
}
