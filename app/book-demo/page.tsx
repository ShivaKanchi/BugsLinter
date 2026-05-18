import type { Metadata } from "next";
import Link from "next/link";

import { requestDemoAction } from "@/app/actions";

export const metadata: Metadata = {
  title: "Book a Demo | Bugslinter",
  description: "Book a Bugslinter walkthrough for AI-assisted workflow management and software delivery.",
};

export default async function BookDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>;
}) {
  const params = await searchParams;
  const submitted = params.submitted === "1";

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur">
          <Link className="text-lg font-semibold tracking-[-0.04em]" href="/">
            Bugslinter
          </Link>
          <div className="flex items-center gap-3">
            <Link className="btn-secondary text-sm font-medium" href="/">
              Back home
            </Link>
            <Link className="btn-secondary text-sm font-medium" href="/workspace">
              Login
            </Link>
          </div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="panel rounded-[2rem] px-6 py-7 sm:px-8">
            <p className="section-kicker">Book a demo</p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Show your delivery stack, we will show the workflow pressure Bugslinter removes.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--foreground-subtle)]">
              This walkthrough is for teams that need direct issue context, human-approved AI help,
              and a clearer handoff from bug intake to release status.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "AI-assisted workflow management for software delivery",
                "Coding-agent integrations (MCP compatible)",
                "Private code context with human approval",
              ].map((point) => (
                <div
                  key={point}
                  className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-[var(--foreground-subtle)]"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>

          <section className="panel rounded-[2rem] px-6 py-7 sm:px-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Demo request</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                  Tell us how your team ships now
                </h2>
              </div>
              {submitted ? (
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-emerald-200">
                  Request received
                </div>
              ) : null}
            </div>

            <form action={requestDemoAction} className="mt-8 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="field" name="name" placeholder="Your name" required />
                <input className="field" name="email" placeholder="you@company.com" required type="email" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="field" name="company" placeholder="Company" required />
                <input className="field" name="teamSize" placeholder="Team size" required />
              </div>
              <input className="field" name="stack" placeholder="Current stack (Jira, GitHub, Slack, Sheets)" required />
              <textarea
                className="field min-h-[160px]"
                name="pain"
                placeholder="Where does delivery break today, bug triage, context handoff, release notes, or team visibility?"
                required
              />
              <button className="btn-primary w-full justify-center font-medium" type="submit">
                Book a demo
              </button>
            </form>

            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Start with the workflow problem, not a generic sales pitch.
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}
