import type { Metadata } from "next";
import { FeatureRequestForm } from "@/components/sections/guide/feature-request-form";
import { GuideBreadcrumb } from "@/components/sections/guide/guide-parts";
import { featureRequest, guidePage } from "@/content/guide";

export const metadata: Metadata = {
  title: featureRequest.title,
  description: featureRequest.lead,
};

export default function FeatureRequestPage() {
  return (
    <div className="max-w-[780px]">
      <GuideBreadcrumb
        items={[{ label: guidePage.home, href: "/guide/" }, { label: featureRequest.label }]}
      />
      <h1 className="mt-5 text-h1 text-balance">{featureRequest.title}</h1>
      <p className="mt-4 max-w-[620px] text-lead text-pretty text-brand-charcoal">{featureRequest.lead}</p>
      <div className="mt-8">
        <FeatureRequestForm />
      </div>
    </div>
  );
}
