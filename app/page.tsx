import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bugslinter",
  description: "AI-assisted workflow management for software delivery, built for teams that want simpler delivery control without Jira overhead.",
};

const workflowSteps = [
  {
    eyebrow: "1. Intake",
    title: "Bug intake lands with real issue context",
    body: "Capture bugs, constraints, and delivery pressure in one flow before context gets lost across threads.",
  },
  {
    eyebrow: "2. Assist",
    title: "AI assistance adds direction, not chaos",
    body: "Bugslinter frames issue context for teams and coding agents, while human approval stays in control.",
  },
  {
    eyebrow: "3. Deliver",
    title: "Release status stays connected to the work",
    body: "Move from fix to testing, release notes, and live status without rebuilding the same story in five tools.",
  },
];

const productPillars = [
  {
    title: "Coding-agent integrations (MCP compatible)",
    body: "Connect issue context to coding-agent workflows without turning the product into an agent toy.",
  },
  {
    title: "Slack and channel awareness",
    body: "Tie delivery updates to communication channels so decisions stop disappearing into side threads.",
  },
  {
    title: "Release notes from Git activity",
    body: "Turn Git commit intent into cleaner release tracking, GitHub pull request context, and spreadsheet-ready visibility.",
  },
];

const comparisonPoints = [
  "Less operational bloat, more delivery signal",
  "Private code context with human approval",
  "AI-assisted delivery without losing team judgment",
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-[1400px] px-5 py-6 sm:px-8 lg:px-10">
        <header className="sticky top-4 z-20 rounded-full border border-white/10 bg-[rgba(7,10,20,0.82)] px-5 py-3 shadow-[0_24px_70px_rgba(3,6,18,0.32)] backdrop-blur animate-fade-up">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-4">
              <Link className="text-lg font-semibold tracking-[-0.04em]" href="/">
                Bugslinter
              </Link>
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[var(--muted)] sm:flex">
                Simplicity with AI-assisted project delivery
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-3 text-sm text-[var(--foreground-subtle)]">
              <a className="hover:text-[var(--foreground)]" href="#workflow">
                Workflow
              </a>
              <a className="hover:text-[var(--foreground)]" href="#integrations">
                Integrations
              </a>
              <a className="hover:text-[var(--foreground)]" href="#contrast">
                Why it lands
              </a>
              <Link className="hover:text-[var(--foreground)]" href="/login">
                Login
              </Link>
              <Link className="btn-secondary text-sm font-medium" href="#workflow">
                Learn more
              </Link>
              <Link className="btn-primary text-sm font-medium" href="/book-demo">
                Book a demo
              </Link>
            </nav>
          </div>
        </header>

        <section className="relative overflow-hidden px-1 pb-10 pt-12 sm:pt-16 animate-fade-up">
          <div className="landing-glow landing-glow-left" />
          <div className="landing-glow landing-glow-right" />

          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div className="relative z-10 max-w-2xl animate-stagger">
              <p className="section-kicker">AI-assisted workflow management for software delivery</p>
              <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-[var(--foreground)] sm:text-6xl xl:text-7xl">
                Simplicity for teams that ship bugs to resolution, without Jira overhead.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--foreground-subtle)]">
                Bugslinter gives dev leads and delivery teams a sharper loop between issue context,
                team execution, coding-agent assistance, and release visibility.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="btn-primary text-sm font-medium" href="/book-demo">
                  Book a demo
                </Link>
                <a className="btn-secondary text-sm font-medium" href="#workflow">
                  Learn more
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3 animate-stagger">
                <HeroSignal
                  label="Private code context"
                  body="Issue details stay close to the engineering reality."
                />
                <HeroSignal
                  label="Human approval"
                  body="AI suggestions support delivery, they do not bypass judgment."
                />
                <HeroSignal
                  label="Channel aware"
                  body="Slack-style team communication stays in the delivery loop."
                />
              </div>
            </div>

            <div className="relative">
              <div className="hero-frame animate-fade-up">
                <div className="hero-header animate-stagger">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--muted)]">Future-facing workflow view</p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                      AI issue context stays central, the team still decides.
                    </h2>
                  </div>
                  <div className="hero-header-pills">
                    <span>Human approved</span>
                    <span>Release linked</span>
                  </div>
                </div>

                <div className="hero-grid animate-stagger">
                  <div className="hero-stack">
                    <WorkflowNode
                      title="Incoming bug"
                      body="Support and channel updates land with issue summary, owner, and urgency."
                      tone="accent"
                    />
                    <WorkflowNode
                      title="Project knowledge base"
                      body="Delivery history, issue context, and prior decisions stay readable to humans and coding agents."
                    />
                    <WorkflowNode
                      title="Team notification"
                      body="The right team sees the bug context directly in flow, not as disconnected chatter."
                    />
                  </div>

                  <div className="hero-bridge">
                    <div className="hero-ai-core animate-fade-up">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-200/80">AI workflow core</p>
                      <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em]">
                        Context before code generation
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--foreground-subtle)]">
                        Bugslinter prepares the issue description, links the relevant workflow state,
                        and hands a structured brief into connected coding-agent flows.
                      </p>
                      <div className="mt-5 grid gap-3 animate-stagger">
                        <MiniPanel
                          title="Coding-agent integrations (MCP compatible)"
                          value="Fix bugs with structured issue context"
                        />
                        <MiniPanel
                          title="Git and PR summary layer"
                          value="Release notes summarized from Git commit intent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="hero-stack">
                    <WorkflowNode
                      title="Fix and testing flow"
                      body="Team works the bug with direct context, moves it to testing, then to live status."
                    />
                    <WorkflowNode
                      title="Release note tracking"
                      body="GitHub pull request activity and Google Sheets visibility stay aligned to the same issue flow."
                    />
                    <WorkflowNode
                      title="Live delivery state"
                      body="The shipping story is readable without the operational sludge of a bloated tracker."
                      tone="muted"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" className="grid gap-6 py-10 lg:grid-cols-[0.78fr_1.22fr] animate-fade-up">
          <div className="panel rounded-[2rem] px-6 py-7 sm:px-8">
            <p className="section-kicker">Why it lands</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Better AI-assisted delivery, not more process theater.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--foreground-subtle)]">
              Bugslinter is built for teams that already know the pain: bug context scattered
              across trackers, chat, pull requests, and release spreadsheets. The page sells a
              delivery system that brings that loop back under control.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 animate-stagger">
            {workflowSteps.map((step) => (
              <div key={step.title} className="panel rounded-[1.8rem] px-5 py-6">
                <p className="section-kicker">{step.eyebrow}</p>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em]">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--foreground-subtle)]">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="integrations" className="py-10 animate-fade-up">
          <div className="panel rounded-[2rem] px-6 py-7 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="section-kicker">Integrations that matter</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                  Built around how software delivery already moves.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-8 text-[var(--foreground-subtle)]">
                  Buyer language stays clear, technical language stays available. The product can
                  talk to dev leads without pretending the engineering layer does not exist.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 animate-stagger">
                {productPillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] px-5 py-6">
                    <h3 className="text-lg font-semibold tracking-[-0.03em]">{pillar.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--foreground-subtle)]">{pillar.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contrast" className="py-10">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="panel rounded-[2rem] px-6 py-7 sm:px-8">
              <p className="section-kicker">Contrast without the brand wall</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                The point is not another tracker, it is a cleaner delivery layer between bugs, teams, and code.
              </h2>
              <div className="mt-7 grid gap-3">
                {comparisonPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-[var(--foreground-subtle)]"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="panel rounded-[2rem] px-6 py-7 sm:px-8">
              <p className="section-kicker">Current proof</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                Built from a working product surface, presented as the sharper version buyers need to see.
              </h2>
              <div className="mt-6 rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,28,0.92),rgba(8,12,24,0.96))] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">Current workspace base</p>
                    <p className="mt-2 text-sm text-[var(--foreground-subtle)]">
                      Existing issue board, sprint planning, and activity tracking already exist in the product.
                    </p>
                  </div>
                  <Link className="btn-secondary text-sm font-medium" href="/dashboard">
                    Open product suite
                  </Link>
                </div>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  <MiniPanel title="Projects" value="Workflow-aware project switching" />
                  <MiniPanel title="Execution board" value="Backlog to done status movement" />
                  <MiniPanel title="Issue detail" value="Comments and delivery history" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="panel rounded-[2.2rem] px-6 py-8 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="section-kicker">Next step</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                  If delivery context keeps collapsing between tracker, chat, and code, that is the demo conversation.
                </h2>
                <p className="mt-5 text-base leading-8 text-[var(--foreground-subtle)]">
                  Bugslinter is for teams that want simplicity with AI-assisted project delivery, without pretending the human delivery loop no longer matters.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link className="btn-primary text-sm font-medium" href="/book-demo">
                  Book a demo
                </Link>
                <Link className="btn-secondary text-sm font-medium" href="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function HeroSignal({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] px-4 py-4">
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--foreground-subtle)]">{body}</p>
    </div>
  );
}

function WorkflowNode({
  title,
  body,
  tone = "default",
}: {
  title: string;
  body: string;
  tone?: "default" | "accent" | "muted";
}) {
  return (
    <div
      className={`workflow-node ${
        tone === "accent"
          ? "workflow-node-accent"
          : tone === "muted"
            ? "workflow-node-muted"
            : ""
      }`}
    >
      <p className="text-sm font-medium tracking-[-0.02em]">{title}</p>
      <p className="mt-3 text-sm leading-6 text-[var(--foreground-subtle)]">{body}</p>
    </div>
  );
}

function MiniPanel({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{title}</p>
      <p className="mt-2 text-sm text-[var(--foreground-subtle)]">{value}</p>
    </div>
  );
}
