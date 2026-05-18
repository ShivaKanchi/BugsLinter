import Link from "next/link";

import {
  activateSprintAction,
  addCommentAction,
  completeSprintAction,
  createIssueAction,
  createProjectAction,
  createSprintAction,
  createWorkspaceAction,
  inviteMemberAction,
  logoutAction,
  transitionIssueAction,
  updateIssueAction,
  useSeededWorkspaceAction,
} from "@/app/actions";
import { demoProjectId } from "@/lib/bugslinter/constants";
import { getWorkspaceState } from "@/lib/bugslinter/workspace";

type PageProps = {
  searchParams: Promise<{
    project?: string;
    issue?: string;
  }>;
};

type ActivityMetadata = Record<string, string | null | number | boolean | undefined>;

function workspaceHref(projectId?: string | null, issueId?: string | null) {
  const params = new URLSearchParams();

  if (projectId) {
    params.set("project", projectId);
  }

  if (issueId) {
    params.set("issue", issueId);
  }

  const query = params.toString();
  return query ? `/workspace?${query}` : "/workspace";
}

function formatDate(value: Date | string | null | undefined) {
  if (!value) {
    return "Unscheduled";
  }

  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function summarizeActivity(type: string, metadata: ActivityMetadata) {
  switch (type) {
    case "status_changed":
      return `moved status from ${metadata.from ?? "unknown"} to ${metadata.to ?? "unknown"}`;
    case "priority_changed":
      return `changed priority from ${metadata.from ?? "unknown"} to ${metadata.to ?? "unknown"}`;
    case "assigned":
      return "reassigned ownership";
    case "sprint_changed":
      return metadata.to ? "moved the issue into a sprint" : "returned the issue to backlog";
    case "title_changed":
      return "renamed the issue";
    case "description_changed":
      return "updated the issue brief";
    case "commented":
      return "added a comment";
    case "created":
      return "created the issue";
    default:
      return "updated the issue";
  }
}

export async function WorkspacePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const state = await getWorkspaceState(params.project, params.issue);

  if (!state) {
    return (
      <main className="workspace-shell min-h-screen px-5 py-6 sm:px-8 lg:px-10">
        <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Bugslinter workspace</p>
            <p className="mt-1 text-sm text-[var(--foreground-subtle)]">
              Sign in, seed a demo, or create a new delivery workspace.
            </p>
          </div>
          <Link className="btn-secondary text-sm font-medium" href="/">
            Back to landing page
          </Link>
        </div>

        <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="panel flex min-h-[28rem] flex-col justify-between overflow-hidden rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Delivery workspace
              </div>
              <div className="max-w-3xl space-y-4">
                <p className="text-sm uppercase tracking-[0.26em] text-[var(--muted)]">
                  Create account, create project, plan sprint, execute work
                </p>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)] sm:text-6xl">
                  Run the working surface behind the Bugslinter delivery story.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[var(--foreground-subtle)] sm:text-lg">
                  Start with a workspace and first project, then move into backlog,
                  active sprint, board execution, and issue change history without leaving
                  the same screen.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                "1. Create workspace and admin account",
                "2. Seed a project with workflow states",
                "3. Plan backlog, sprint, and issue changes",
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-5 text-sm text-[var(--foreground)]"
                >
                  {step}
                </div>
              ))}
            </div>
          </section>

          <section className="panel rounded-[2rem] px-6 py-8 sm:px-8">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                Workspace onboarding
              </p>
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">
                Create your first account
              </h2>
            </div>

            <form action={createWorkspaceAction} className="mt-8 space-y-4">
              <input className="field" name="name" placeholder="Your name" required />
              <input className="field" name="email" placeholder="you@company.com" required type="email" />
              <input className="field" name="organizationName" placeholder="Workspace name" required />
              <input className="field" name="organizationSlug" placeholder="workspace-slug" required />
              <input className="field" name="projectName" placeholder="First project" required />
              <input className="field" name="projectKey" placeholder="PROJ" required />
              <button className="btn-primary w-full font-medium" type="submit">
                Create workspace
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <form action={useSeededWorkspaceAction}>
              <button className="btn-secondary w-full font-medium" type="submit">
                Open seeded demo workspace
              </button>
            </form>
          </section>
        </div>
      </main>
    );
  }

  const currentHref = workspaceHref(state.selectedProject?.id, state.selectedIssue?.id);
  const activeSprint = state.sprints.find((sprint) => sprint.status === "active") ?? null;
  const plannedSprints = state.sprints.filter((sprint) => sprint.status === "planned");
  const completedSprints = state.sprints.filter((sprint) => sprint.status === "completed");
  const backlogIssues = state.issues.filter((issue) => !issue.sprintId);
  const sprintIssues = activeSprint
    ? state.issues.filter((issue) => issue.sprintId === activeSprint.id)
    : [];
  const issuesByStatus = new Map(state.statuses.map((status) => [status.id, sprintIssues.filter((issue) => issue.statusId === status.id)]));
  const transitionsByFrom = new Map<string, Array<(typeof state.transitions)[number]>>();

  for (const transition of state.transitions) {
    transitionsByFrom.set(transition.fromStatusId, [
      ...(transitionsByFrom.get(transition.fromStatusId) ?? []),
      transition,
    ]);
  }

  const memberOptions = state.members.map((member) => ({
    ...member,
    label: member.name || member.email,
  }));

  return (
    <main className="workspace-shell min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-4 flex max-w-[1560px] items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Working workspace</p>
          <p className="mt-1 text-sm text-[var(--foreground-subtle)]">
            Logged-in issue delivery surface, onboarding, and workflow execution.
          </p>
        </div>
        <Link className="btn-secondary text-sm font-medium" href="/">
          View landing page
        </Link>
      </div>

      <div className="mx-auto grid max-w-[1560px] gap-4 lg:grid-cols-[220px_minmax(0,1fr)_380px]">
        <aside className="panel rounded-[2rem] p-5 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              {state.organization?.slug}
            </p>
            <h1 className="text-2xl font-semibold tracking-[-0.05em]">
              {state.organization?.name}
            </h1>
            <p className="text-sm text-[var(--foreground-subtle)]">
              Signed in as {state.currentUser?.name || state.currentUser?.email}
            </p>
          </div>

          <div className="mt-8 space-y-2 text-sm">
            {[
              "1. Account + workspace",
              "2. Project + workflow",
              "3. Sprint planning",
              "4. Board execution",
              "5. Issue change history",
            ].map((step) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                {step}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3">
            <Link className="btn-secondary text-center font-medium" href={workspaceHref(demoProjectId, state.selectedIssue?.id)}>
              Demo project
            </Link>
            <form action={logoutAction}>
              <button className="btn-secondary w-full font-medium" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </aside>

        <section className="space-y-4">
          <section className="panel overflow-hidden rounded-[2rem] px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl space-y-3">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                  Project flow
                </p>
                <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                  {state.selectedProject?.name ?? "Create your first project"}
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-[var(--foreground-subtle)] sm:text-base">
                  {state.selectedProject?.description ||
                    "Use one project as the durable container for backlog, sprint cadence, issue execution, and history."}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <MetricCard label="Members" value={String(state.members.length)} />
                <MetricCard label="Projects" value={String(state.projects.length)} />
                <MetricCard
                  label="Active sprint"
                  value={activeSprint ? activeSprint.name : "None"}
                />
              </div>
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="panel rounded-[2rem] p-5">
              <SectionHeader
                eyebrow="Projects"
                title="Switch workspace context"
                body="Each project gets its own workflow, backlog, active sprint, and issue feed."
              />
              <div className="mt-5 flex flex-wrap gap-3">
                {state.projects.map((project) => {
                  const selected = project.id === state.selectedProject?.id;
                  return (
                    <Link
                      key={project.id}
                      href={workspaceHref(project.id, project.id === state.selectedProject?.id ? state.selectedIssue?.id : null)}
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        selected
                          ? "bg-[var(--foreground)] text-[var(--background)]"
                          : "border border-white/10 bg-white/[0.04] text-[var(--foreground)]"
                      }`}
                    >
                      {project.key} - {project.name}
                    </Link>
                  );
                })}
              </div>

              <form action={createProjectAction} className="mt-6 grid gap-3 md:grid-cols-2">
                <input name="tenantId" type="hidden" value={state.session.tenantId} />
                <input name="userId" type="hidden" value={state.session.userId} />
                <input className="field" name="name" placeholder="New project name" required />
                <input className="field" name="key" placeholder="KEY" required />
                <textarea
                  className="field md:col-span-2"
                  name="description"
                  placeholder="Why this project exists"
                  rows={3}
                />
                <button className="btn-primary md:col-span-2 justify-self-start font-medium" type="submit">
                  Create project
                </button>
              </form>
            </div>

            <div className="panel rounded-[2rem] p-5">
              <SectionHeader
                eyebrow="Team"
                title="Add members before planning work"
                body="Workspace membership drives assignees, sprint ownership, and future permission checks."
              />
              <div className="mt-5 space-y-3">
                {state.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3"
                  >
                    <div>
                      <p className="font-medium">{member.name || member.email}</p>
                      <p className="text-sm text-[var(--foreground-subtle)]">{member.email}</p>
                    </div>
                    <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--foreground)]">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>

              <form action={inviteMemberAction} className="mt-6 grid gap-3">
                <input name="tenantId" type="hidden" value={state.session.tenantId} />
                <input name="userId" type="hidden" value={state.session.userId} />
                <input className="field" name="name" placeholder="New member name" required />
                <input className="field" name="email" placeholder="member@company.com" required type="email" />
                <button className="btn-secondary justify-self-start font-medium" type="submit">
                  Invite member
                </button>
              </form>
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="panel rounded-[2rem] p-5">
              <SectionHeader
                eyebrow="Sprint planning"
                title={activeSprint ? activeSprint.name : "No active sprint yet"}
                body={
                  activeSprint
                    ? activeSprint.goal || "The active sprint is the working board for execution."
                    : "Create a sprint, assign backlog issues, and activate it when the team is ready."
                }
              />

              {activeSprint ? (
                <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                        Active sprint
                      </p>
                      <p className="mt-2 text-lg font-semibold">{activeSprint.name}</p>
                      <p className="mt-1 text-sm text-[var(--foreground-subtle)]">
                        {formatDate(activeSprint.startDate)} to {formatDate(activeSprint.endDate)}
                      </p>
                    </div>
                    <form action={completeSprintAction}>
                      <input name="tenantId" type="hidden" value={state.session.tenantId} />
                      <input name="userId" type="hidden" value={state.session.userId} />
                      <input name="projectId" type="hidden" value={state.selectedProject?.id} />
                      <input name="sprintId" type="hidden" value={activeSprint.id} />
                      <input name="redirectTo" type="hidden" value={currentHref} />
                      <button className="btn-secondary font-medium" type="submit">
                        Complete sprint
                      </button>
                    </form>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 space-y-3">
                {plannedSprints.map((sprint) => (
                  <div
                    key={sprint.id}
                    className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3"
                  >
                    <div>
                      <p className="font-medium">{sprint.name}</p>
                      <p className="text-sm text-[var(--foreground-subtle)]">
                        {sprint.goal || "No sprint goal yet"}
                      </p>
                    </div>
                    <form action={activateSprintAction}>
                      <input name="tenantId" type="hidden" value={state.session.tenantId} />
                      <input name="userId" type="hidden" value={state.session.userId} />
                      <input name="projectId" type="hidden" value={state.selectedProject?.id} />
                      <input name="sprintId" type="hidden" value={sprint.id} />
                      <input name="redirectTo" type="hidden" value={currentHref} />
                      <button className="btn-secondary font-medium" type="submit">
                        Start sprint
                      </button>
                    </form>
                  </div>
                ))}
              </div>

              <form action={createSprintAction} className="mt-6 grid gap-3">
                <input name="tenantId" type="hidden" value={state.session.tenantId} />
                <input name="userId" type="hidden" value={state.session.userId} />
                <input name="projectId" type="hidden" value={state.selectedProject?.id} />
                <input className="field" name="name" placeholder="Sprint 18" required />
                <textarea className="field" name="goal" placeholder="What should ship this sprint?" rows={3} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input className="field" name="startDate" type="date" />
                  <input className="field" name="endDate" type="date" />
                </div>
                <button className="btn-primary justify-self-start font-medium" type="submit">
                  Create sprint
                </button>
              </form>

              {completedSprints.length > 0 ? (
                <div className="mt-6">
                  <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                    Completed
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {completedSprints.map((sprint) => (
                      <span
                        key={sprint.id}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm"
                      >
                        {sprint.name}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="panel rounded-[2rem] p-5">
              <SectionHeader
                eyebrow="Backlog"
                title="Create tasks, bugs, and features"
                body="The backlog is the intake point before sprint assignment. Use priority and assignee to keep grooming lightweight."
              />

              <form action={createIssueAction} className="mt-6 grid gap-3">
                <input name="tenantId" type="hidden" value={state.session.tenantId} />
                <input name="userId" type="hidden" value={state.session.userId} />
                <input name="projectId" type="hidden" value={state.selectedProject?.id} />
                <input className="field" name="title" placeholder="Issue title" required />
                <textarea className="field" name="description" placeholder="Context, acceptance, and constraints" rows={3} />
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  <select className="field" name="issueType" defaultValue="task">
                    <option value="task">Task</option>
                    <option value="bug">Bug</option>
                    <option value="feature">Feature</option>
                  </select>
                  <select className="field" name="priority" defaultValue="medium">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                  <select className="field" name="assigneeId" defaultValue="">
                    <option value="">No assignee</option>
                    {memberOptions.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.label}
                      </option>
                    ))}
                  </select>
                  <select className="field" name="sprintId" defaultValue="">
                    <option value="">Backlog only</option>
                    {state.sprints
                      .filter((sprint) => sprint.status !== "completed")
                      .map((sprint) => (
                        <option key={sprint.id} value={sprint.id}>
                          {sprint.name}
                        </option>
                      ))}
                  </select>
                </div>
                <button className="btn-primary justify-self-start font-medium" type="submit">
                  Create issue
                </button>
              </form>

              <div className="mt-6 space-y-3">
                {backlogIssues.length > 0 ? (
                  backlogIssues.map((issue) => (
                    <IssueRow
                      key={issue.id}
                      href={workspaceHref(state.selectedProject?.id, issue.id)}
                      issue={issue}
                      statusName={state.statuses.find((status) => status.id === issue.statusId)?.name ?? "Unknown"}
                      assigneeLabel={memberOptions.find((member) => member.id === issue.assigneeId)?.label ?? "Unassigned"}
                      selected={issue.id === state.selectedIssue?.id}
                    />
                  ))
                ) : (
                  <EmptyState
                    title="Backlog clear"
                    body="Create the first issue or move sprint work back here when planning changes."
                  />
                )}
              </div>
            </div>
          </section>

          <section className="panel rounded-[2rem] p-5">
            <SectionHeader
              eyebrow="Execution board"
              title={activeSprint ? `${activeSprint.name} board` : "Sprint board waits for an active sprint"}
              body={
                activeSprint
                  ? "Workflow transitions are the source of truth for moving work from backlog to done."
                  : "Start a sprint to render the active board. Planned sprints stay in backlog mode."
              }
            />

            {activeSprint ? (
              <div className="mt-6 grid gap-4 xl:grid-cols-5">
                {state.statuses.map((status) => (
                  <div key={status.id} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                          {status.category}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold">{status.name}</h3>
                      </div>
                      <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs">
                        {issuesByStatus.get(status.id)?.length ?? 0}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      {(issuesByStatus.get(status.id) ?? []).map((issue) => (
                        <div
                          key={issue.id}
                          className="rounded-[1.25rem] border border-white/10 bg-[var(--surface-strong)] p-3"
                        >
                          <Link href={workspaceHref(state.selectedProject?.id, issue.id)} className="block">
                            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                              {state.selectedProject?.key}-{issue.number}
                            </p>
                            <p className="mt-2 font-medium">{issue.title}</p>
                            <p className="mt-2 text-sm text-[var(--foreground-subtle)]">
                              {memberOptions.find((member) => member.id === issue.assigneeId)?.label ??
                                "Unassigned"}
                            </p>
                          </Link>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {(transitionsByFrom.get(issue.statusId) ?? []).map((transition) => (
                              <form key={transition.id} action={transitionIssueAction}>
                                <input name="tenantId" type="hidden" value={state.session.tenantId} />
                                <input name="userId" type="hidden" value={state.session.userId} />
                                <input name="projectId" type="hidden" value={state.selectedProject?.id} />
                                <input name="issueId" type="hidden" value={issue.id} />
                                <input name="toStatusId" type="hidden" value={transition.toStatusId} />
                                <input
                                  name="redirectTo"
                                  type="hidden"
                                  value={workspaceHref(state.selectedProject?.id, issue.id)}
                                />
                                <button className="btn-secondary px-3 py-2 text-xs font-medium" type="submit">
                                  {transition.name}
                                </button>
                              </form>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState
                  title="No active sprint"
                  body="Create a sprint, assign issues, and start it to render the execution board."
                />
              </div>
            )}
          </section>
        </section>

        <aside className="panel rounded-[2rem] p-5 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
          {state.selectedIssue ? (
            <>
              <SectionHeader
                eyebrow="Issue detail"
                title={`${state.selectedProject?.key}-${state.selectedIssue.number}`}
                body={state.selectedIssue.title}
              />

              <form action={updateIssueAction} className="mt-6 space-y-3">
                <input name="tenantId" type="hidden" value={state.session.tenantId} />
                <input name="userId" type="hidden" value={state.session.userId} />
                <input name="projectId" type="hidden" value={state.selectedProject?.id} />
                <input name="issueId" type="hidden" value={state.selectedIssue.id} />
                <input name="redirectTo" type="hidden" value={currentHref} />
                <input className="field" name="title" defaultValue={state.selectedIssue.title} required />
                <textarea
                  className="field"
                  name="description"
                  defaultValue={state.selectedIssue.description ?? ""}
                  rows={5}
                />
                <div className="grid gap-3 md:grid-cols-2">
                  <select className="field" name="priority" defaultValue={state.selectedIssue.priority}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                  <select className="field" name="assigneeId" defaultValue={state.selectedIssue.assigneeId ?? ""}>
                    <option value="">No assignee</option>
                    {memberOptions.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.label}
                      </option>
                    ))}
                  </select>
                </div>
                <select className="field" name="sprintId" defaultValue={state.selectedIssue.sprintId ?? ""}>
                  <option value="">Backlog</option>
                  {state.sprints.filter((sprint) => sprint.status !== "completed").map((sprint) => (
                    <option key={sprint.id} value={sprint.id}>
                      {sprint.name}
                    </option>
                  ))}
                </select>
                <button className="btn-primary w-full font-medium" type="submit">
                  Save issue changes
                </button>
              </form>

              <section className="mt-8">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                  Comments
                </p>
                <form action={addCommentAction} className="mt-3 space-y-3">
                  <input name="tenantId" type="hidden" value={state.session.tenantId} />
                  <input name="userId" type="hidden" value={state.session.userId} />
                  <input name="issueId" type="hidden" value={state.selectedIssue.id} />
                  <input name="redirectTo" type="hidden" value={currentHref} />
                  <textarea className="field" name="content" placeholder="Leave a concise update" rows={4} required />
                  <button className="btn-secondary w-full font-medium" type="submit">
                    Add comment
                  </button>
                </form>

                <div className="mt-4 space-y-3">
                  {state.comments.map((comment) => (
                    <div key={comment.id} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm font-medium">
                        {comment.authorName || comment.authorEmail}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                        {formatDate(comment.createdAt)}
                      </p>
                      <p className="mt-3 text-sm leading-7">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-8">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                  Change history
                </p>
                <div className="mt-4 space-y-3">
                  {state.activities.map((activity) => (
                    <div key={activity.id} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium">
                            {activity.actorName || activity.actorEmail || "System"}
                          </p>
                          <p className="mt-1 text-sm text-[var(--foreground-subtle)]">
                            {summarizeActivity(
                              activity.actionType,
                              activity.metadata as ActivityMetadata,
                            )}
                          </p>
                        </div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                          {formatDate(activity.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <EmptyState
              title="Select an issue"
              body="Choose an issue from backlog or board to edit planning fields, leave comments, and inspect change history."
            />
          )}
        </aside>
      </div>
    </main>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">{eyebrow}</p>
      <h2 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
      <p className="max-w-2xl text-sm leading-7 text-[var(--foreground-subtle)]">{body}</p>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-4">
      <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
      <p className="mt-3 text-lg font-semibold tracking-[-0.03em]">{value}</p>
    </div>
  );
}

function IssueRow({
  href,
  issue,
  statusName,
  assigneeLabel,
  selected,
}: {
  href: string;
  issue: {
    id: string;
    number: number;
    title: string;
    priority: string;
    issueType: string;
  };
  statusName: string;
  assigneeLabel: string;
  selected: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-[1.25rem] border px-4 py-4 ${
        selected
          ? "border-[color:var(--accent)] bg-[var(--accent-soft)]"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium">{issue.title}</p>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em]">
          {issue.issueType}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
        <span>{statusName}</span>
        <span>{issue.priority}</span>
        <span>{assigneeLabel}</span>
      </div>
    </Link>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/[0.03] px-5 py-8 text-center">
      <p className="text-lg font-semibold">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[var(--foreground-subtle)]">{body}</p>
    </div>
  );
}
