import { GuideShell } from "@/components/sections/guide/guide-shell";

export default function GuideLayout({ children }: LayoutProps<"/guide">) {
  return <GuideShell>{children}</GuideShell>;
}
