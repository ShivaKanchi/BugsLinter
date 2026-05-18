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
  title: "Team | Bugslinter",
  description: "Roles, ownership, and communication loops in the Bugslinter future suite.",
};

export default function TeamPage() {
  return (
    <ProductAppShell
      currentPath="/team"
      eyebrow="Team, roles, and communication"
      title="Ownership should be visible enough that delivery work never depends on memory or hallway context"
      description="This page combines team directory, role clarity, channel linkage, and activity framing so ownership stays explicit across bugs, testing, and release work."
      actions={<PageActions primary="Invite teammate" secondary="Review channels" />}
      sidePanel={
        <div className="space-y-5">
          <SectionTitle
            eyebrow="Role clarity"
            title="Who owns what in delivery"
            body="Team and communication are one design in this round because ownership and channel routing should be read together."
          />
          <RailCard
            title="Channels"
            lines={[
              "#delivery-sync owned by sprint execution",
              "#release-watch owned by QA and release review",
              "#project-knowledge owned by delivery operations",
            ]}
          />
        </div>
      }
    >
      <PanelGrid>
        <SuiteCard
          eyebrow="Delivery roles"
          title="Team directory"
          body="Each teammate card should make role, area of ownership, and delivery channel visible."
        >
          <div className="space-y-3 text-sm text-[var(--foreground-subtle)]">
            <p>Amina Shah - delivery owner - #release-watch</p>
            <p>Jordan Vale - sprint execution - #delivery-sync</p>
            <p>Nora Kim - QA and testing - #release-watch</p>
          </div>
        </SuiteCard>
        <SuiteCard
          eyebrow="Communication"
          title="Channel linkage"
          body="Channel surfaces should prove that delivery discussion belongs next to issues and release state."
        >
          <div className="space-y-3 text-sm text-[var(--foreground-subtle)]">
            <p>Slack escalation digest for critical bugs</p>
            <p>Testing-ready prompt stream</p>
            <p>Knowledge summary broadcast after fixes land</p>
          </div>
        </SuiteCard>
        <SuiteCard
          eyebrow="Activity"
          title="Recent ownership events"
          body="Activity should explain reassignment, handoff, and approval movement without duplicating issue history."
        >
          <div className="space-y-3 text-sm text-[var(--foreground-subtle)]">
            <p>Release review ownership moved to Nora Kim</p>
            <p>Critical issue triage escalated in #delivery-sync</p>
            <p>Knowledge note published after Sprint 17 patch</p>
          </div>
        </SuiteCard>
      </PanelGrid>
    </ProductAppShell>
  );
}
