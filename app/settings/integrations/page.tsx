import type { Metadata } from "next";

import {
  PageActions,
  ProductAppShell,
  RailCard,
  SectionTitle,
  SuiteCard,
  TwoColumn,
} from "@/app/_components/future-suite";

export const metadata: Metadata = {
  title: "Integrations | Bugslinter",
  description: "Integration settings for the Bugslinter future suite.",
};

export default function IntegrationsPage() {
  return (
    <ProductAppShell
      currentPath="/settings/integrations"
      eyebrow="Settings and integrations"
      title="Integrations should be configured in product language first, with technical credibility where it matters"
      description="This route keeps buyer-readable connection setup for coding agents, channels, GitHub, and release tracking, while preserving the technical terms advanced teams expect."
      actions={<PageActions primary="Save integration settings" secondary="Test connection" />}
      sidePanel={
        <div className="space-y-5">
          <SectionTitle
            eyebrow="Integration stance"
            title="Readable first, technical when useful"
            body="Teams should understand what is being connected before they care about how MCP-compatible or export-aware the plumbing is."
          />
          <RailCard
            title="Configured surfaces"
            lines={[
              "Coding-agent integrations",
              "Slack and channel connections",
              "GitHub pull request and Google Sheets release tracking",
            ]}
          />
        </div>
      }
    >
      <TwoColumn
        left={
          <SuiteCard
            eyebrow="Coding-agent layer"
            title="Agent connection and approval model"
            body="Expose issue-context handoff, MCP-compatible workflow language, and explicit human approval points."
          >
            <div className="space-y-3">
              <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-[var(--foreground-subtle)]">
                Coding-agent integrations (MCP compatible)
              </div>
              <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-[var(--foreground-subtle)]">
                Require approval before shipping generated fixes
              </div>
            </div>
          </SuiteCard>
        }
        right={
          <SuiteCard
            eyebrow="Delivery surfaces"
            title="GitHub, Sheets, and channels"
            body="These settings explain where release notes, PR review state, and channel updates should move after the issue changes state."
          >
            <div className="space-y-3">
              <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-[var(--foreground-subtle)]">
                GitHub pull request state and commit summary sync
              </div>
              <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-[var(--foreground-subtle)]">
                Google Sheets release-note export visibility
              </div>
              <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-[var(--foreground-subtle)]">
                Slack channel routing for delivery and release prompts
              </div>
            </div>
          </SuiteCard>
        }
      />
    </ProductAppShell>
  );
}
