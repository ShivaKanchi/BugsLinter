import type { Metadata } from "next";
import Link from "next/link";

import {
  PageActions,
  PanelGrid,
  ProductAppShell,
  RailCard,
  SectionTitle,
  SuiteCard,
  getIssueById,
  getProjectById,
} from "@/app/_components/future-suite";

export const metadata: Metadata = {
  title: "Project | Bugslinter",
  description: "Project overview in the Bugslinter future suite.",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  const highlightedIssue = getIssueById("bug-214");

  return (
    <ProductAppShell
      currentPath="/projects/northstar-core"
      eyebrow="Project overview"
      title={`${project.name} keeps workflow, sprint state, and release pressure in one place`}
      description="Project overview should show the selected project's delivery condition at a glance: workflow shape, sprint state, ownership, knowledge continuity, and the issue most likely to disrupt the release loop."
      actions={<PageActions primary="Review active sprint" secondary="Open board" />}
      sidePanel={
        <div className="space-y-5">
          <SectionTitle
            eyebrow={project.key}
            title="Selected project context"
            body={project.description}
          />
          <RailCard
            title="Project signals"
            lines={[
              `Status: ${project.status}`,
              `Sprint: ${project.activeSprint}`,
              `Release: ${project.releaseWindow}`,
            ]}
          />
        </div>
      }
    >
      <PanelGrid>
        <SuiteCard
          eyebrow="Workflow shape"
          title="Status breakdown"
          body="The project route should show how work is distributed, where blockers sit, and what stage most needs intervention."
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Backlog", value: "14" },
              { label: "In progress", value: "9" },
              { label: "Testing and review", value: "5" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </SuiteCard>
        <SuiteCard
          eyebrow="Members"
          title="Project ownership"
          body="Roles, assignees, and escalation paths should remain obvious without opening separate admin views."
        >
          <div className="space-y-3 text-sm text-[var(--foreground-subtle)]">
            <p>Amina Shah - delivery owner</p>
            <p>Jordan Vale - sprint execution</p>
            <p>Nora Kim - release and testing loop</p>
          </div>
        </SuiteCard>
        <SuiteCard
          eyebrow="Hot issue"
          title={highlightedIssue.title}
          body={highlightedIssue.summary}
        >
          <div className="flex flex-wrap gap-3">
            <Link className="btn-secondary text-sm font-medium" href={`/issues/${highlightedIssue.id}`}>
              Open issue detail
            </Link>
            <Link className="btn-secondary text-sm font-medium" href="/knowledge">
              View related knowledge
            </Link>
          </div>
        </SuiteCard>
      </PanelGrid>
    </ProductAppShell>
  );
}
