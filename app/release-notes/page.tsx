import type { Metadata } from "next";

import {
  PageActions,
  ProductAppShell,
  RailCard,
  SectionTitle,
  SuiteCard,
  TwoColumn,
  getReleaseNotes,
} from "@/app/_components/future-suite";

export const metadata: Metadata = {
  title: "Release Notes | Bugslinter",
  description: "Commit-derived release summaries and approval flow in the Bugslinter future suite.",
};

export default function ReleaseNotesPage() {
  const releaseNotes = getReleaseNotes();

  return (
    <ProductAppShell
      currentPath="/release-notes"
      eyebrow="Release notes"
      title="Release summaries should inherit commit intent, testing state, and human approval without becoming a separate manual ritual"
      description="This page is the key-state design for release-note review and approval. It shows draft notes, testing evidence, approval state, and export readiness in one surface."
      actions={<PageActions primary="Approve release draft" secondary="Export to Google Sheets" />}
      sidePanel={
        <div className="space-y-5">
          <SectionTitle
            eyebrow="Approval state"
            title="Human review stays explicit"
            body="Release notes are AI-assisted, commit-informed, and still subject to human approval before publish or export."
          />
          <RailCard
            title="Current blockers"
            lines={[
              "One QA note still missing",
              "One summary line needs approval wording",
              "Publish should stay disabled until both are resolved",
            ]}
          />
        </div>
      }
    >
      <TwoColumn
        left={
          <SuiteCard
            eyebrow="Draft stack"
            title="Release candidates"
            body="The release list should show what changed, where it came from, and what still blocks publish."
          >
            <div className="space-y-3">
              {releaseNotes.map((note) => (
                <div key={note.id} className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-medium">{note.title}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--foreground-subtle)]">{note.summary}</p>
                    </div>
                    <div className="space-y-2 text-xs text-[var(--foreground-subtle)]">
                      <p>{note.branch}</p>
                      <p>{note.testing}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SuiteCard>
        }
        right={
          <SuiteCard
            eyebrow="Review state"
            title="Approval detail"
            body="This detail card shows the exact design state where publish is close, but still gated by review and testing evidence."
          >
            <div className="space-y-3 text-sm text-[var(--foreground-subtle)]">
              <p>Source: 7 commits grouped into bug fix, channel cleanup, and release export hardening.</p>
              <p>Testing note: QA signoff pending one explicit reproduction sentence.</p>
              <p>Approval note: product delivery owner must confirm publish-safe wording.</p>
            </div>
          </SuiteCard>
        }
      />
    </ProductAppShell>
  );
}
