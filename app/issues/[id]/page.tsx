import type { Metadata } from "next";

import {
  PageActions,
  ProductAppShell,
  RailCard,
  SectionTitle,
  SuiteCard,
  TwoColumn,
  getIssueById,
} from "@/app/_components/future-suite";

export const metadata: Metadata = {
  title: "Issue Detail | Bugslinter",
  description: "Issue detail with structured context, comments, and history in the Bugslinter future suite.",
};

export default async function IssuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const issue = getIssueById(id);

  return (
    <ProductAppShell
      currentPath="/issues/bug-214"
      eyebrow="Issue detail"
      title={`${issue.key} keeps context, approvals, comments, and delivery history readable in one place`}
      description="Issue detail is the most important workflow page after the board: title, context, owner, sprint, comments, change history, and AI-linked knowledge must all work together."
      actions={<PageActions primary="Save issue changes" secondary="Open release note impact" />}
      sidePanel={
        <div className="space-y-5">
          <SectionTitle
            eyebrow={issue.key}
            title={issue.title}
            body={issue.summary}
          />
          <RailCard
            title="Issue signals"
            lines={[
              `Priority: ${issue.priority}`,
              `Owner: ${issue.assignee}`,
              `Channel: ${issue.channel}`,
            ]}
          />
          <RailCard
            title="Knowledge continuity"
            lines={[
              "3 related issue summaries",
              "2 similar release-note edits",
              "1 prior approval stall with matching symptom",
            ]}
          />
        </div>
      }
    >
      <TwoColumn
        left={
          <div className="space-y-4">
            <SuiteCard
              eyebrow="Issue brief"
              title="Structured issue context"
              body="The issue form should keep delivery context, acceptance constraints, and AI assist framing readable without switching tabs."
            >
              <div className="space-y-3">
                <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm">Title, description, priority, assignee, sprint</div>
                <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm">Channel source, affected release, testing expectations</div>
                <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm">Agent-readable context block and related knowledge references</div>
              </div>
            </SuiteCard>
            <SuiteCard
              eyebrow="Comments"
              title="Discussion stays attached to delivery work"
              body="Comments should stay compact and operational, focused on decisions, test evidence, and next actions."
            >
              <div className="space-y-3 text-sm text-[var(--foreground-subtle)]">
                <p>Amina: commit cluster looks correct, waiting on testing note.</p>
                <p>Jordan: export fix is in PR review, release summary updated.</p>
                <p>Nora: QA needs one explicit note before signoff.</p>
              </div>
            </SuiteCard>
          </div>
        }
        right={
          <SuiteCard
            eyebrow="Change history"
            title="History explains how the issue moved"
            body="History should summarize status shifts, priority changes, sprint moves, and comment events without becoming noisy."
          >
            <div className="space-y-3 text-sm text-[var(--foreground-subtle)]">
              <p>Status moved from In progress to In review</p>
              <p>Priority raised from High to Critical</p>
              <p>Release-note draft linked to issue after commit summary</p>
              <p>Testing hold added pending human approval</p>
            </div>
          </SuiteCard>
        }
      />
    </ProductAppShell>
  );
}
