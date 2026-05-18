import type { Metadata } from "next";

import {
  PageActions,
  PanelGrid,
  ProductAppShell,
  RailCard,
  SectionTitle,
  SuiteCard,
} from "@/app/_components/future-suite";

export const metadata: Metadata = {
  title: "Sprints | Bugslinter",
  description: "Sprint planning and carry-forward design in the Bugslinter future suite.",
};

export default function SprintsPage() {
  return (
    <ProductAppShell
      currentPath="/sprints"
      eyebrow="Sprint planning"
      title="Plan the sprint around delivery risk, not just issue count"
      description="Sprint planning should make carry-forward work, testing pressure, and release-note coordination visible before the sprint starts."
      actions={<PageActions primary="Create sprint" secondary="Move issues into sprint" />}
      sidePanel={
        <div className="space-y-5">
          <SectionTitle
            eyebrow="Planning pressure"
            title="Carry-forward and release risk"
            body="The sprint page should show what rolls over, what blocks testing, and where approval debt is building."
          />
          <RailCard
            title="Planning cues"
            lines={[
              "12 issues ready for assignment",
              "3 unfinished issues from the last sprint",
              "2 release-note candidates depend on sprint closure",
            ]}
          />
        </div>
      }
    >
      <PanelGrid>
        <SuiteCard
          eyebrow="Active sprint"
          title="Sprint 18 - Quality loop"
          body="Goal: remove noisy release friction and restore cleaner testing handoffs."
        >
          <div className="space-y-3 text-sm text-[var(--foreground-subtle)]">
            <p>Date range: Apr 22 to May 2</p>
            <p>In sprint: 12 issues</p>
            <p>Ready for testing: 5</p>
          </div>
        </SuiteCard>
        <SuiteCard
          eyebrow="Carry forward"
          title="What rolls if the sprint closes now"
          body="Carry-forward must be explicit so backlog, testing, and release visibility do not get reconstructed later."
        >
          <div className="space-y-3 text-sm text-[var(--foreground-subtle)]">
            <p>Release note export hardening</p>
            <p>Knowledge search reliability patch</p>
            <p>Slack digest dedupe follow-up</p>
          </div>
        </SuiteCard>
        <SuiteCard
          eyebrow="Upcoming"
          title="Planned sprint queue"
          body="Future sprints should show intent and pressure, not just names and dates."
        >
          <div className="space-y-3 text-sm text-[var(--foreground-subtle)]">
            <p>Sprint 19 - Adoption cleanup</p>
            <p>Sprint 20 - Approval and publish loop</p>
          </div>
        </SuiteCard>
      </PanelGrid>
    </ProductAppShell>
  );
}
