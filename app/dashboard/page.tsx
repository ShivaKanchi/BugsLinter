import type { Metadata } from "next";
import Link from "next/link";

import {
  MetricRow,
  PageActions,
  PanelGrid,
  ProductAppShell,
  RailCard,
  SectionTitle,
  SuiteCard,
  TwoColumn,
  getIssues,
  getProjects,
} from "@/app/_components/future-suite";

export const metadata: Metadata = {
  title: "Dashboard | Bugslinter",
  description: "Cross-project delivery overview for the Bugslinter future suite.",
};

export default function DashboardPage() {
  const issues = getIssues();
  const projects = getProjects();

  return (
    <ProductAppShell
      currentPath="/dashboard"
      eyebrow="Dashboard"
      title="Delivery health stays visible before the team gets dragged into status theater"
      description="The dashboard is the future control room: cross-project health, AI-assist summary, blockers, testing pressure, release readiness, and knowledge continuity in one view."
      actions={<PageActions primary="Start triage review" secondary="Open release notes" />}
      sidePanel={
        <div className="space-y-5">
          <SectionTitle
            eyebrow="Key-state design"
            title="Dashboard empty state is built in"
            body="This route intentionally shows both a populated overview and the zero-state logic the suite should use when no meaningful activity exists yet."
          />
          <RailCard
            title="First-use empty state"
            lines={[
              "No active sprint yet",
              "No release candidate assembled",
              "Prompt the team to create project, define sprint, and add first issue",
            ]}
          />
          <RailCard
            title="AI-assist summary"
            lines={[
              "2 issues ready for structured coding-agent handoff",
              "1 release note draft needs human approval",
              "Knowledge base surfaced 4 matching past fixes",
            ]}
          />
        </div>
      }
    >
      <MetricRow
        metrics={[
          { label: "Open issues", value: "37", note: "Across two active delivery projects." },
          { label: "Critical blockers", value: "3", note: "All three linked to release timing." },
          { label: "Testing queue", value: "8", note: "Five are waiting on release-note clarity." },
          { label: "Release confidence", value: "84%", note: "Drops when human approval or test evidence is missing." },
        ]}
      />

      <TwoColumn
        left={
          <PanelGrid>
            {projects.map((project) => (
              <SuiteCard
                key={project.id}
                eyebrow={project.key}
                title={project.name}
                body={project.description}
              >
                <div className="space-y-3 text-sm text-[var(--foreground-subtle)]">
                  <p>Status: {project.status}</p>
                  <p>Active sprint: {project.activeSprint}</p>
                  <p>Release window: {project.releaseWindow}</p>
                </div>
                <div className="mt-5">
                  <Link className="btn-secondary text-sm font-medium" href={`/projects/${project.id}`}>
                    Open project view
                  </Link>
                </div>
              </SuiteCard>
            ))}
            <SuiteCard
              eyebrow="Channel pulse"
              title="Delivery communication loop"
              body="Channel-aware summaries show where release pressure, bug noise, and approval stalls are actually happening."
            >
              <div className="space-y-3 text-sm text-[var(--foreground-subtle)]">
                <p>#delivery-sync has 4 unresolved bug escalations.</p>
                <p>#release-watch has 2 pending approval prompts.</p>
                <p>#project-knowledge has 3 new reusable fix summaries.</p>
              </div>
            </SuiteCard>
          </PanelGrid>
        }
        right={
          <SuiteCard
            eyebrow="Zero-state design"
            title="When a team has not started meaningful delivery yet"
            body="The first-use dashboard should not fake metrics. It should teach the correct sequence: create project, define sprint, add first issue, then start working."
          >
            <div className="rounded-[1.5rem] border border-dashed border-white/12 bg-white/[0.03] px-5 py-6 text-center">
              <p className="text-lg font-semibold">No delivery activity yet</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--foreground-subtle)]">
                Start with workspace setup, define the first sprint, and add one issue with
                enough context for team handoff and AI-assisted review.
              </p>
            </div>
            <div className="mt-5 space-y-3">
              {issues.slice(0, 2).map((issue) => (
                <div key={issue.id} className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                  <p className="font-medium">{issue.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-subtle)]">{issue.summary}</p>
                </div>
              ))}
            </div>
          </SuiteCard>
        }
      />
    </ProductAppShell>
  );
}
