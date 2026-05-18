import type { Metadata } from "next";
import Link from "next/link";

import { IntegrationMatrix, PanelGrid, ProductAppShell, RailCard, SectionTitle, SuiteCard } from "@/app/_components/future-suite";

export const metadata: Metadata = {
  title: "Login | Bugslinter",
  description: "Workspace entry for the Bugslinter future product shell.",
};

export default function LoginPage() {
  return (
    <ProductAppShell
      currentPath="/login"
      eyebrow="Workspace entry"
      title="Choose the right way into the delivery system"
      description="Keep login and workspace access product-focused: no marketing replay, just clear entry paths into the future Bugslinter suite and the current working workspace."
      actions={
        <>
          <Link className="btn-primary text-sm font-medium" href="/workspace">
            Open current workspace
          </Link>
          <Link className="btn-secondary text-sm font-medium" href="/">
            Back to landing page
          </Link>
        </>
      }
      sidePanel={
        <div className="space-y-5">
          <SectionTitle
            eyebrow="What login should signal"
            title="A clean handoff, not another brochure"
            body="This page exists to move delivery teams into the product with confidence and no repeated sales framing."
          />
          <RailCard
            title="Workspace access"
            lines={[
              "Open current working workspace",
              "Use seeded demo when evaluating flows",
              "Keep future suite routes visible as product direction",
            ]}
          />
        </div>
      }
    >
      <PanelGrid columns="two">
        <SuiteCard
          eyebrow="Primary path"
          title="Continue into the working workspace"
          body="Use the current route for issue intake, sprint planning, comments, and delivery state while the future IA evolves."
        >
          <div className="space-y-3">
            <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4">
              <p className="text-sm font-medium">Current app route</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-subtle)]">
                `/workspace` remains the active product surface for real flows and seeded demo access.
              </p>
            </div>
            <Link className="btn-primary text-sm font-medium" href="/workspace">
              Go to workspace
            </Link>
          </div>
        </SuiteCard>

        <SuiteCard
          eyebrow="Future shell"
          title="Browse the split product IA"
          body="The design system now covers dashboard, backlog, board, issue detail, knowledge base, release notes, team, and integrations as separate pages."
        >
          <IntegrationMatrix />
        </SuiteCard>
      </PanelGrid>
    </ProductAppShell>
  );
}
