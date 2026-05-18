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
  title: "Knowledge Base | Bugslinter",
  description: "Searchable project knowledge for delivery continuity in the Bugslinter future suite.",
};

export default function KnowledgePage() {
  return (
    <ProductAppShell
      currentPath="/knowledge"
      eyebrow="Project knowledge base"
      title="Searchable delivery knowledge should be part of workflow, not a separate forgotten archive"
      description="This route is the key-state design for search and results. It shows how prior issue learnings, release summaries, and decision history should surface during active delivery work."
      actions={<PageActions primary="Search knowledge" secondary="Create note" />}
      sidePanel={
        <div className="space-y-5">
          <SectionTitle
            eyebrow="Search result state"
            title="Results for release export context"
            body="The page is intentionally shown in a searched state because the design needs to prove how knowledge is retrieved during real work."
          />
          <RailCard
            title="Search scope"
            lines={[
              "Issue summaries",
              "Release note drafts and approvals",
              "Channel incidents and team decisions",
            ]}
          />
        </div>
      }
    >
      <TwoColumn
        left={
          <SuiteCard
            eyebrow="Search"
            title="Query and result stack"
            body="The search bar, filters, and result ranking should emphasize reusable delivery value over generic documentation volume."
          >
            <div className="space-y-3">
              <div className="rounded-[1.3rem] border border-[color:var(--accent)] bg-[var(--accent-soft)] px-4 py-4 text-sm">
                Query: release export missing merged fix context
              </div>
              {[
                "Incident summary - Sprint 16 release export mismatch",
                "Approval note - human review checklist for publish-safe summaries",
                "Issue cluster - duplicate commit context and final release copy drift",
              ].map((result) => (
                <div key={result} className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-[var(--foreground-subtle)]">
                  {result}
                </div>
              ))}
            </div>
          </SuiteCard>
        }
        right={
          <SuiteCard
            eyebrow="Result detail"
            title="Selected knowledge card"
            body="The detail view should show why the result matters to the current issue, not just display a generic note."
          >
            <div className="space-y-3 text-sm text-[var(--foreground-subtle)]">
              <p>Previous release export bug was caused by missing merge-commit intent in summary generation.</p>
              <p>Fix required commit grouping plus explicit human approval before publish.</p>
              <p>Related issue and release draft should be linked back into the current delivery flow.</p>
            </div>
          </SuiteCard>
        }
      />
    </ProductAppShell>
  );
}
