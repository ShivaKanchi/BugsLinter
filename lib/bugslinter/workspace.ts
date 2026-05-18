import "server-only";

import { and, asc, desc, eq } from "drizzle-orm";

import {
  comments,
  issueActivities,
  issues,
  memberships,
  organizations,
  projects,
  sprints,
  users,
  workflowStatuses,
  workflowTransitions,
} from "@/db/schema";
import { getSession, type AppSession } from "@/lib/auth/session";
import { withTenant } from "@/lib/db/tenant";

export type WorkspaceState = Awaited<ReturnType<typeof getWorkspaceState>>;

async function getAuthenticatedSession(): Promise<AppSession | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const isValidMembership = await withTenant(session.tenantId, async (tx) => {
    const [membership] = await tx
      .select({ id: memberships.id })
      .from(memberships)
      .where(and(eq(memberships.tenantId, session.tenantId), eq(memberships.userId, session.userId)));

    return Boolean(membership);
  }).catch(() => false);

  return isValidMembership ? session : null;
}

export async function getWorkspaceState(projectId?: string, issueId?: string) {
  const session = await getAuthenticatedSession();

  if (!session) {
    return null;
  }

  return withTenant(session.tenantId, async (tx) => {
    const [organization] = await tx
      .select({
        id: organizations.id,
        name: organizations.name,
        slug: organizations.slug,
      })
      .from(organizations)
      .where(eq(organizations.id, session.tenantId));

    const [currentUser] = await tx
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .from(users)
      .where(and(eq(users.tenantId, session.tenantId), eq(users.id, session.userId)));

    const members = await tx
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: memberships.role,
      })
      .from(memberships)
      .innerJoin(
        users,
        and(eq(users.tenantId, memberships.tenantId), eq(users.id, memberships.userId)),
      )
      .orderBy(asc(users.name), asc(users.email));

    const projectRows = await tx
      .select({
        id: projects.id,
        name: projects.name,
        key: projects.key,
        description: projects.description,
      })
      .from(projects)
      .orderBy(asc(projects.name));

    const selectedProject =
      projectRows.find((project) => project.id === projectId) ?? projectRows[0] ?? null;

    const statusRows = selectedProject
      ? await tx
          .select({
            id: workflowStatuses.id,
            name: workflowStatuses.name,
            category: workflowStatuses.category,
            position: workflowStatuses.position,
          })
          .from(workflowStatuses)
          .where(eq(workflowStatuses.projectId, selectedProject.id))
          .orderBy(asc(workflowStatuses.position))
      : [];

    const transitionRows = selectedProject
      ? await tx
          .select({
            id: workflowTransitions.id,
            name: workflowTransitions.name,
            fromStatusId: workflowTransitions.fromStatusId,
            toStatusId: workflowTransitions.toStatusId,
          })
          .from(workflowTransitions)
          .where(eq(workflowTransitions.projectId, selectedProject.id))
      : [];

    const sprintRows = selectedProject
      ? await tx
          .select({
            id: sprints.id,
            name: sprints.name,
            goal: sprints.goal,
            status: sprints.status,
            startDate: sprints.startDate,
            endDate: sprints.endDate,
          })
          .from(sprints)
          .where(eq(sprints.projectId, selectedProject.id))
          .orderBy(
            asc(sprints.status),
            asc(sprints.startDate),
            desc(sprints.createdAt),
          )
      : [];

    const issueRows = selectedProject
      ? await tx
          .select({
            id: issues.id,
            number: issues.number,
            title: issues.title,
            description: issues.description,
            issueType: issues.issueType,
            priority: issues.priority,
            statusId: issues.statusId,
            assigneeId: issues.assigneeId,
            reporterId: issues.reporterId,
            sprintId: issues.sprintId,
            rank: issues.rank,
            updatedAt: issues.updatedAt,
          })
          .from(issues)
          .where(eq(issues.projectId, selectedProject.id))
          .orderBy(asc(issues.rank), asc(issues.number))
      : [];

    const selectedIssue = issueRows.find((issue) => issue.id === issueId) ?? issueRows[0] ?? null;

    const commentRows = selectedIssue
      ? await tx
          .select({
            id: comments.id,
            content: comments.content,
            createdAt: comments.createdAt,
            authorName: users.name,
            authorEmail: users.email,
          })
          .from(comments)
          .innerJoin(
            users,
            and(eq(users.tenantId, comments.tenantId), eq(users.id, comments.authorId)),
          )
          .where(eq(comments.issueId, selectedIssue.id))
          .orderBy(asc(comments.createdAt))
      : [];

    const activityRows = selectedIssue
      ? await tx
          .select({
            id: issueActivities.id,
            actionType: issueActivities.actionType,
            metadata: issueActivities.metadata,
            createdAt: issueActivities.createdAt,
            actorName: users.name,
            actorEmail: users.email,
          })
          .from(issueActivities)
          .leftJoin(
            users,
            and(eq(users.tenantId, issueActivities.tenantId), eq(users.id, issueActivities.actorId)),
          )
          .where(eq(issueActivities.issueId, selectedIssue.id))
          .orderBy(desc(issueActivities.createdAt))
      : [];

    return {
      session,
      organization,
      currentUser,
      members,
      projects: projectRows,
      selectedProject,
      statuses: statusRows,
      transitions: transitionRows,
      sprints: sprintRows,
      issues: issueRows,
      selectedIssue,
      comments: commentRows,
      activities: activityRows,
    };
  });
}
