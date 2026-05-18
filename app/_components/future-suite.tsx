import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
  short: string;
};

type Project = {
  id: string;
  name: string;
  key: string;
  description: string;
  status: string;
  activeSprint: string;
  releaseWindow: string;
};

type Issue = {
  id: string;
  key: string;
  title: string;
  priority: string;
  status: string;
  assignee: string;
  channel: string;
  summary: string;
};

type ReleaseNote = {
  id: string;
  title: string;
  branch: string;
  testing: string;
  approval: string;
  summary: string;
};

const APP_NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", short: "Dash" },
  { href: "/projects/northstar-core", label: "Project", short: "Proj" },
  { href: "/backlog", label: "Backlog", short: "Back" },
  { href: "/sprints", label: "Sprints", short: "Spr" },
  { href: "/board", label: "Board", short: "Board" },
  { href: "/issues/bug-214", label: "Issue", short: "Issue" },
  { href: "/knowledge", label: "Knowledge", short: "Know" },
  { href: "/release-notes", label: "Release Notes", short: "Rel" },
  { href: "/team", label: "Team", short: "Team" },
  { href: "/settings/integrations", label: "Integrations", short: "Int" },
];

const projects: Project[] = [
  {
    id: "northstar-core",
    name: "Northstar Core",
    key: "NS",
    description: "The core delivery engine for incoming issues, AI assist, and release coordination.",
    status: "Needs testing handoff",
    activeSprint: "Sprint 18 - Quality loop",
    releaseWindow: "Thu 4:00 PM",
  },
  {
    id: "signal-ops",
    name: "Signal Ops",
    key: "SIG",
    description: "Channel-aware delivery visibility and team communication alignment.",
    status: "Stable",
    activeSprint: "Sprint 09 - Adoption",
    releaseWindow: "Tue 11:00 AM",
  },
];

const issues: Issue[] = [
  {
    id: "bug-214",
    key: "NS-214",
    title: "Release note export misses merged fix context",
    priority: "Critical",
    status: "In review",
    assignee: "Amina Shah",
    channel: "#release-watch",
    summary: "AI assist found the likely commit cluster, but human approval is still blocking publish.",
  },
  {
    id: "bug-198",
    key: "NS-198",
    title: "Slack delivery digest posts duplicate testing prompts",
    priority: "High",
    status: "Ready for testing",
    assignee: "Jordan Vale",
    channel: "#delivery-sync",
    summary: "Issue context already links the last three duplicate channel events and the fix candidate.",
  },
  {
    id: "bug-183",
    key: "SIG-183",
    title: "Knowledge base search drops previous incident summaries",
    priority: "Medium",
    status: "Backlog",
    assignee: "No owner",
    channel: "#project-knowledge",
    summary: "The bug affects how delivery context is surfaced to coding-agent workflows and reviewers.",
  },
];

const releaseNotes: ReleaseNote[] = [
  {
    id: "rel-18",
    title: "Sprint 18 candidate release",
    branch: "release/sprint-18",
    testing: "QA signoff pending",
    approval: "Human approval required",
    summary: "Summarized from 7 commits across bug-fix, notification cleanup, and release export hardening.",
  },
  {
    id: "rel-17",
    title: "Slack digest stabilization patch",
    branch: "fix/slack-digest-noise",
    testing: "Verified",
    approval: "Ready to publish",
    summary: "Commit history shows one channel fix, one dedupe guard, and one delivery-copy adjustment.",
  },
];

export function getProjects() {
  return projects;
}

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id) ?? projects[0];
}

export function getIssues() {
  return issues;
}

export function getIssueById(id: string) {
  return issues.find((issue) => issue.id === id) ?? issues[0];
}

export function getReleaseNotes() {
  return releaseNotes;
}

export function ProductAppShell({
  currentPath,
  eyebrow,
  title,
  description,
  children,
  sidePanel,
  actions,
}: {
  currentPath: string;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  sidePanel?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="suite-shell mx-auto grid max-w-[1600px] gap-4 px-4 py-4 lg:grid-cols-[250px_minmax(0,1fr)_330px] lg:px-6">
        <aside className="suite-sidebar panel rounded-[2rem] p-5 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] overflow-auto">
          <div className="space-y-3">
            <div className="meta-mono inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
              Northstar Labs
            </div>
            <div>
              <p className="meta-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                Workspace context
              </p>
              <h1 className="display-title mt-2 text-2xl font-semibold tracking-[-0.05em]">
                Bugslinter future suite
              </h1>
              <p className="mt-2 text-sm leading-7 text-[var(--foreground-subtle)]">
                A split product IA for delivery teams, AI issue context, release visibility,
                and human-approved execution.
              </p>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {APP_NAV.map((item) => {
              const selected = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`suite-nav-item flex items-center justify-between rounded-[1.25rem] px-4 py-3 text-sm ${
                    selected
                      ? "suite-nav-item-active text-[var(--foreground)]"
                      : "text-[var(--foreground-subtle)]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="meta-mono rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em]">
                    {item.short}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 space-y-3 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="meta-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Shared delivery rules
            </p>
            <ul className="space-y-3 text-sm leading-7 text-[var(--foreground-subtle)]">
              <li>AI assist prepares issue context, humans approve what ships.</li>
              <li>Channel updates belong in the delivery loop, not beside it.</li>
              <li>Release notes inherit commit intent and testing state.</li>
            </ul>
          </div>
        </aside>

        <section className="space-y-4">
          <div className="panel-strong rounded-[2rem] px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <p className="section-kicker">{eyebrow}</p>
                <h2 className="display-title mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                  {title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--foreground-subtle)]">
                  {description}
                </p>
              </div>
              {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            </div>
          </div>

          {children}
        </section>

        <aside className="panel rounded-[2rem] p-5 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
          {sidePanel ?? <DefaultContextRail />}
        </aside>
      </div>
    </main>
  );
}

export function DefaultContextRail() {
  return (
    <div className="space-y-5">
      <SectionTitle
        eyebrow="Delivery context"
        title="Always-visible product signals"
        body="Every future page keeps project, sprint, issue state, ownership, and release impact visible."
      />

      <RailCard
        title="Active sprint"
        lines={[
          "Sprint 18 - Quality loop",
          "12 issues in motion",
          "2 fixes waiting on release-note approval",
        ]}
      />
      <RailCard
        title="Channel loop"
        lines={[
          "#delivery-sync for team coordination",
          "#release-watch for publish approval",
          "#project-knowledge for searchable decisions",
        ]}
      />
      <RailCard
        title="AI-assist promise"
        lines={[
          "Issue context prepared before code generation",
          "Knowledge base linked into delivery surfaces",
          "Human approval preserved at decision points",
        ]}
      />
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="meta-mono text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">{eyebrow}</p>
      <h3 className="display-title mt-3 text-xl font-semibold tracking-[-0.04em]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--foreground-subtle)]">{body}</p>
    </div>
  );
}

export function PanelGrid({
  children,
  columns = "three",
}: {
  children: React.ReactNode;
  columns?: "two" | "three";
}) {
  return (
    <div
      className={`grid gap-4 ${
        columns === "two" ? "xl:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"
      }`}
    >
      {children}
    </div>
  );
}

export function SuiteCard({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="panel rounded-[1.8rem] px-5 py-5">
      {eyebrow ? (
        <p className="meta-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{eyebrow}</p>
      ) : null}
      <h3 className="display-title mt-3 text-xl font-semibold tracking-[-0.04em]">{title}</h3>
      {body ? <p className="mt-3 text-sm leading-7 text-[var(--foreground-subtle)]">{body}</p> : null}
      {children ? <div className="soft-rule mt-5 pt-5">{children}</div> : null}
    </section>
  );
}

export function MetricRow({
  metrics,
}: {
  metrics: Array<{ label: string; value: string; note: string }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-4">
          <p className="meta-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{metric.label}</p>
          <p className="display-title mt-3 text-2xl font-semibold tracking-[-0.04em]">{metric.value}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-subtle)]">{metric.note}</p>
        </div>
      ))}
    </div>
  );
}

export function RailCard({
  title,
  lines,
}: {
  title: string;
  lines: string[];
}) {
  return (
    <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] px-4 py-4">
      <p className="text-sm font-medium">{title}</p>
      <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--foreground-subtle)]">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export function IssueList({ selectedIssueId }: { selectedIssueId?: string }) {
  return (
    <div className="space-y-3">
      {issues.map((issue) => {
        const selected = selectedIssueId === issue.id;
        return (
          <Link
            key={issue.id}
            href={`/issues/${issue.id}`}
            className={`block rounded-[1.4rem] border px-4 py-4 ${
              selected
                ? "border-[color:var(--accent)] bg-[var(--accent-soft)]"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="meta-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{issue.key}</p>
                <h4 className="mt-2 text-base font-medium">{issue.title}</h4>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-subtle)]">{issue.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                <StatusPill value={issue.priority} tone="alert" />
                <StatusPill value={issue.status} />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--foreground-subtle)]">
              <span>Owner: {issue.assignee}</span>
              <span>Channel: {issue.channel}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function StatusPill({
  value,
  tone = "default",
}: {
  value: string;
  tone?: "default" | "alert" | "success";
}) {
  const toneClass =
    tone === "alert"
      ? "border-amber-300/20 bg-amber-300/10 text-amber-100"
      : tone === "success"
        ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
        : "border-white/10 bg-white/[0.03] text-[var(--foreground-subtle)]";

  return (
    <span className={`meta-mono rounded-full border px-3 py-1 ${toneClass}`}>{value}</span>
  );
}

export function BoardLane({
  title,
  issues,
}: {
  title: string;
  issues: Issue[];
}) {
  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="meta-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Workflow</p>
          <h4 className="display-title mt-2 text-lg font-semibold">{title}</h4>
        </div>
        <span className="meta-mono rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--foreground-subtle)]">
          {issues.length}
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {issues.map((issue) => (
          <div key={issue.id} className="rounded-[1.25rem] border border-white/10 bg-[var(--surface-strong)] p-4">
            <p className="meta-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{issue.key}</p>
            <p className="mt-2 font-medium">{issue.title}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-subtle)]">{issue.assignee}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TwoColumn({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">{left}{right}</div>;
}

export function PageActions({ primary, secondary }: { primary: string; secondary?: string }) {
  return (
    <>
      <button className="btn-primary text-sm font-medium" type="button">
        {primary}
      </button>
      {secondary ? (
        <button className="btn-secondary text-sm font-medium" type="button">
          {secondary}
        </button>
      ) : null}
    </>
  );
}

export function IntegrationMatrix() {
  const integrations = [
    {
      name: "Coding-agent layer",
      detail: "MCP compatible issue context, structured handoff, and human approval checkpoints.",
    },
    {
      name: "Slack channels",
      detail: "Channel-aware delivery updates, bug context posts, and release prompt routing.",
    },
    {
      name: "GitHub and Sheets",
      detail: "Release-note summaries from Git commit intent, PR review state, and export tracking.",
    },
  ];

  return (
    <div className="space-y-3">
      {integrations.map((integration) => (
        <div key={integration.name} className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-4 py-4">
          <p className="font-medium">{integration.name}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-subtle)]">{integration.detail}</p>
        </div>
      ))}
    </div>
  );
}
