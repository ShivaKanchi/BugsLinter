import type { Metadata } from "next";

import {
  BoardLane,
  PageActions,
  ProductAppShell,
  RailCard,
  SectionTitle,
  SuiteCard,
  TwoColumn,
  getIssueById,
  getIssues,
} from "@/app/_components/future-suite";

export const metadata: Metadata = {
  title: "Board | Bugslinter",
  description: "Execution board with selected AI-assist state in the Bugslinter future suite.",
};

export default function BoardPage() {
  const allIssues = getIssues();
  const selectedIssue = getIssueById("bug-214");

  return (
    <ProductAppShell
      currentPath="/board"
      eyebrow="Execution board"
      title="The board should show live workflow movement and issue-selected AI context at the same time"
      description="This page is intentionally the key-state design: one issue is selected, its structured context is open, and the team still sees the full sprint flow."
      actions={<PageActions primary="Move selected issue" secondary="Open issue detail" />}
      sidePanel={
        <div className="space-y-5">
          <SectionTitle
            eyebrow="Selected issue"
            title={selectedIssue.title}
            body={selectedIssue.summary}
          />
          <RailCard
            title="AI-assist context"
            lines={[
              "Found 3 related fixes from the knowledge base",
              "Mapped likely commit cluster for release notes",
              "Human approval still required before publish",
            ]}
          />
          <RailCard
            title="Delivery continuity"
            lines={[
              `Owner: ${selectedIssue.assignee}`,
              `Channel: ${selectedIssue.channel}`,
              `Status: ${selectedIssue.status}`,
            ]}
          />
        </div>
      }
    >
      <TwoColumn
        left={
          <div className="grid gap-4 xl:grid-cols-3">
            <BoardLane title="Backlog" issues={allIssues.filter((issue) => issue.status === "Backlog")} />
            <BoardLane title="In progress" issues={allIssues.filter((issue) => issue.status === "In review" || issue.status === "Ready for testing")} />
            <BoardLane title="Testing and release" issues={allIssues.filter((issue) => issue.status !== "Backlog" && issue.status !== "In review" && issue.status !== "Ready for testing")} />
          </div>
        }
        right={
          <SuiteCard
            eyebrow="Board state"
            title="Issue-selected assist panel"
            body="This side state shows the correct future relationship between board execution, issue context, coding-agent handoff, and release-note impact."
          >
            <div className="space-y-4">
              <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                <p className="font-medium">Structured issue brief</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-subtle)]">
                  The issue already includes reproduction path, release impact, and linked prior incidents.
                </p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                <p className="font-medium">Coding-agent handoff</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-subtle)]">
                  MCP-compatible handoff is framed as context plus guardrails, not autonomous shipping.
                </p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                <p className="font-medium">Release note impact</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-subtle)]">
                  Any fix on this issue changes the draft release summary and needs approval before publish.
                </p>
              </div>
            </div>
          </SuiteCard>
        }
      />
    </ProductAppShell>
  );
}
