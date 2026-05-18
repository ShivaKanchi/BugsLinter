import type { Metadata } from "next";

import {
  IssueList,
  PageActions,
  ProductAppShell,
  RailCard,
  SectionTitle,
  SuiteCard,
  TwoColumn,
} from "@/app/_components/future-suite";

export const metadata: Metadata = {
  title: "Backlog | Bugslinter",
  description: "Issue intake and grooming in the Bugslinter future suite.",
};

export default function BacklogPage() {
  return (
    <ProductAppShell
      currentPath="/backlog"
      eyebrow="Backlog"
      title="Issue intake should preserve context before work disappears into a tracker queue"
      description="The backlog design keeps priority, assignee, channel context, and AI hints visible so intake is more than a title dump."
      actions={<PageActions primary="Create issue" secondary="Run AI triage" />}
      sidePanel={
        <div className="space-y-5">
          <SectionTitle
            eyebrow="Backlog rules"
            title="What must stay visible"
            body="Issue intake should always carry delivery intent, who owns it, where it came from, and what the next workflow move is."
          />
          <RailCard
            title="AI hints"
            lines={[
              "Suggest related issues and past fixes",
              "Flag missing acceptance criteria",
              "Link likely release impact before sprint assignment",
            ]}
          />
        </div>
      }
    >
      <TwoColumn
        left={
          <SuiteCard
            eyebrow="Open intake"
            title="Backlog list with AI triage context"
            body="This list shows how issues should feel when grooming: compact, readable, and structured around delivery usefulness."
          >
            <IssueList />
          </SuiteCard>
        }
        right={
          <div className="space-y-4">
            <SuiteCard
              eyebrow="Filters"
              title="Priority, sprint, owner, channel"
              body="Filtering should help the team find the next decision, not just shrink the list."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {["Critical only", "Unassigned", "Needs sprint", "Release risk"].map((pill) => (
                  <div key={pill} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm">
                    {pill}
                  </div>
                ))}
              </div>
            </SuiteCard>
            <SuiteCard
              eyebrow="New issue"
              title="Structured intake form"
              body="The creation surface should collect title, summary, urgency, owner, affected channel, and enough context for AI-assisted review."
            >
              <div className="space-y-3">
                <div className="field">Issue title</div>
                <div className="field">Affected project or delivery path</div>
                <div className="field">Channel and release impact</div>
              </div>
            </SuiteCard>
          </div>
        }
      />
    </ProductAppShell>
  );
}
