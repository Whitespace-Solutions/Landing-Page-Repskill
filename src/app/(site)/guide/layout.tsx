import { GuideShell } from "@/components/sections/guide/guide-shell";
import { FinalCta } from "@/components/sections/shared/final-cta";
import { guideCta } from "@/content/guide";

export default function GuideLayout({ children }: LayoutProps<"/guide">) {
  return (
    <>
      <GuideShell>{children}</GuideShell>
      <FinalCta {...guideCta} />
    </>
  );
}
