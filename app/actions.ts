"use server";

import { randomUUID } from "node:crypto";

import { and, asc, eq, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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
import { clearSession, setSession } from "@/lib/auth/session";
import { demoAdminUserId, demoProjectId, demoTenantId } from "@/lib/bugslinter/constants";
import { buildDefaultWorkflow, createDefaultWorkflowIds } from "@/lib/bugslinter/default-workflow";
import { db } from "@/lib/db";
import { withTenant } from "@/lib/db/tenant";

const uuidSchema = z.string().uuid();
const redirectSchema = z.string().default("/");

const createWorkspaceSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email(),
  organizationName: z.string().trim().min(2).max(80),
  organizationSlug: z.string().trim().min(2).max(80),
  projectName: z.string().trim().min(2).max(80),
  projectKey: z.string().trim().min(2).max(10),
});

const inviteMemberSchema = z.object({
  tenantId: uuidSchema,
  name: z.string().trim().min(2).max(80),
  email: z.email(),
});

const createProjectSchema = z.object({
  tenantId: uuidSchema,
  userId: uuidSchema,
  name: z.string().trim().min(2).max(80),
  key: z.string().trim().min(2).max(10),
  description: z.string().trim().max(280).optional().default(""),
});

const createSprintSchema = z.object({
  tenantId: uuidSchema,
  userId: uuidSchema,
  projectId: uuidSchema,
  name: z.string().trim().min(2).max(80),
  goal: z.string().trim().max(280).optional().default(""),
  startDate: z.string().optional().default(""),
  endDate: z.string().optional().default(""),
});

const createIssueSchema = z.object({
  tenantId: uuidSchema,
  userId: uuidSchema,
  projectId: uuidSchema,
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().max(4000).optional().default(""),
  issueType: z.enum(["task", "bug", "feature"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  assigneeId: z.string().optional().default(""),
  sprintId: z.string().optional().default(""),
});

const transitionIssueSchema = z.object({
  tenantId: uuidSchema,
  userId: uuidSchema,
  projectId: uuidSchema,
  issueId: uuidSchema,
  toStatusId: uuidSchema,
  redirectTo: redirectSchema,
});

const updateIssueSchema = z.object({
  tenantId: uuidSchema,
  userId: uuidSchema,
  projectId: uuidSchema,
  issueId: uuidSchema,
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().max(4000).optional().default(""),
  priority: z.enum(["low", "medium", "high", "critical"]),
  assigneeId: z.string().optional().default(""),
  sprintId: z.string().optional().default(""),
  redirectTo: redirectSchema,
});

const addCommentSchema = z.object({
  tenantId: uuidSchema,
  userId: uuidSchema,
  issueId: uuidSchema,
  content: z.string().trim().min(1).max(2000),
  redirectTo: redirectSchema,
});

const sprintStateSchema = z.object({
  tenantId: uuidSchema,
  userId: uuidSchema,
  projectId: uuidSchema,
  sprintId: uuidSchema,
  redirectTo: redirectSchema,
});

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeProjectKey(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]+/g, "").slice(0, 10);
}

function parseOptionalDate(value: string) {
  return value ? new Date(value) : null;
}

async function ensureMembership(tenantId: string, userId: string) {
  return withTenant(tenantId, async (tx) => {
    const [membership] = await tx
      .select({ role: memberships.role })
      .from(memberships)
      .where(and(eq(memberships.tenantId, tenantId), eq(memberships.userId, userId)));

    if (!membership) {
      throw new Error("Unauthorized workspace access.");
    }

    return membership;
  });
}

async function createProjectWithWorkflow(
  tenantId: string,
  userId: string,
  name: string,
  key: string,
  description: string,
) {
  const projectId = randomUUID();
  const workflowIds = createDefaultWorkflowIds();
  const { statuses, transitions } = buildDefaultWorkflow(workflowIds);

  await withTenant(tenantId, async (tx) => {
    await tx.insert(projects).values({
      id: projectId,
      tenantId,
      organizationId: tenantId,
      name,
      key,
      description: description || null,
      createdBy: userId,
    });

    await tx.insert(workflowStatuses).values(
      statuses.map((status) => ({
        id: status.id,
        tenantId,
        projectId,
        name: status.name,
        category: status.category,
        position: status.position,
      })),
    );

    await tx.insert(workflowTransitions).values(
      transitions.map((transition) => ({
        id: transition.id,
        tenantId,
        projectId,
        fromStatusId: transition.fromStatusId,
        toStatusId: transition.toStatusId,
        name: transition.name,
      })),
    );
  });

  return projectId;
}

export async function useSeededWorkspaceAction() {
  await ensureMembership(demoTenantId, demoAdminUserId);
  await setSession({ tenantId: demoTenantId, userId: demoAdminUserId });
  redirect(`/?project=${encodeURIComponent(demoProjectId)}`);
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}

export async function createWorkspaceAction(formData: FormData) {
  const parsed = createWorkspaceSchema.parse({
    name: readString(formData, "name"),
    email: readString(formData, "email"),
    organizationName: readString(formData, "organizationName"),
    organizationSlug: readString(formData, "organizationSlug"),
    projectName: readString(formData, "projectName"),
    projectKey: readString(formData, "projectKey"),
  });

  const tenantId = randomUUID();
  const userId = randomUUID();
  const projectId = randomUUID();
  const workflowIds = createDefaultWorkflowIds();
  const { statuses, transitions } = buildDefaultWorkflow(workflowIds);

  await db.transaction(async (tx) => {
    await tx.execute(sql`select set_config('app.tenant_id', ${tenantId}, true)`);

    await tx.insert(organizations).values({
      id: tenantId,
      name: parsed.organizationName,
      slug: normalizeSlug(parsed.organizationSlug),
    });

    await tx.insert(users).values({
      id: userId,
      tenantId,
      email: parsed.email.toLowerCase(),
      name: parsed.name,
    });

    await tx.insert(memberships).values({
      id: randomUUID(),
      tenantId,
      organizationId: tenantId,
      userId,
      role: "admin",
    });

    await tx.insert(projects).values({
      id: projectId,
      tenantId,
      organizationId: tenantId,
      name: parsed.projectName,
      key: normalizeProjectKey(parsed.projectKey),
      description: "Initial project created during workspace setup.",
      createdBy: userId,
    });

    await tx.insert(workflowStatuses).values(
      statuses.map((status) => ({
        id: status.id,
        tenantId,
        projectId,
        name: status.name,
        category: status.category,
        position: status.position,
      })),
    );

    await tx.insert(workflowTransitions).values(
      transitions.map((transition) => ({
        id: transition.id,
        tenantId,
        projectId,
        fromStatusId: transition.fromStatusId,
        toStatusId: transition.toStatusId,
        name: transition.name,
      })),
    );
  });

  await setSession({ tenantId, userId });
  redirect(`/?project=${encodeURIComponent(projectId)}`);
}

export async function inviteMemberAction(formData: FormData) {
  const parsed = inviteMemberSchema.parse({
    tenantId: readString(formData, "tenantId"),
    name: readString(formData, "name"),
    email: readString(formData, "email"),
  });

  const session = await ensureMembership(parsed.tenantId, readString(formData, "userId"));

  if (session.role === "viewer") {
    throw new Error("Viewers cannot invite members.");
  }

  await withTenant(parsed.tenantId, async (tx) => {
    const newUserId = randomUUID();

    await tx.insert(users).values({
      id: newUserId,
      tenantId: parsed.tenantId,
      email: parsed.email.toLowerCase(),
      name: parsed.name,
    });

    await tx.insert(memberships).values({
      id: randomUUID(),
      tenantId: parsed.tenantId,
      organizationId: parsed.tenantId,
      userId: newUserId,
      role: "member",
    });
  });

  revalidatePath("/");
}

export async function createProjectAction(formData: FormData) {
  const parsed = createProjectSchema.parse({
    tenantId: readString(formData, "tenantId"),
    userId: readString(formData, "userId"),
    name: readString(formData, "name"),
    key: readString(formData, "key"),
    description: readString(formData, "description"),
  });

  const membership = await ensureMembership(parsed.tenantId, parsed.userId);

  if (membership.role === "viewer") {
    throw new Error("Viewers cannot create projects.");
  }

  const projectId = await createProjectWithWorkflow(
    parsed.tenantId,
    parsed.userId,
    parsed.name,
    normalizeProjectKey(parsed.key),
    parsed.description,
  );

  redirect(`/?project=${encodeURIComponent(projectId)}`);
}

export async function createSprintAction(formData: FormData) {
  const parsed = createSprintSchema.parse({
    tenantId: readString(formData, "tenantId"),
    userId: readString(formData, "userId"),
    projectId: readString(formData, "projectId"),
    name: readString(formData, "name"),
    goal: readString(formData, "goal"),
    startDate: readString(formData, "startDate"),
    endDate: readString(formData, "endDate"),
  });

  const membership = await ensureMembership(parsed.tenantId, parsed.userId);

  if (membership.role === "viewer") {
    throw new Error("Viewers cannot create sprints.");
  }

  await withTenant(parsed.tenantId, async (tx) => {
    await tx.insert(sprints).values({
      id: randomUUID(),
      tenantId: parsed.tenantId,
      projectId: parsed.projectId,
      name: parsed.name,
      goal: parsed.goal || null,
      status: "planned",
      startDate: parseOptionalDate(parsed.startDate),
      endDate: parseOptionalDate(parsed.endDate),
      createdBy: parsed.userId,
    });
  });

  redirect(`/?project=${encodeURIComponent(parsed.projectId)}`);
}

export async function activateSprintAction(formData: FormData) {
  const parsed = sprintStateSchema.parse({
    tenantId: readString(formData, "tenantId"),
    userId: readString(formData, "userId"),
    projectId: readString(formData, "projectId"),
    sprintId: readString(formData, "sprintId"),
    redirectTo: readString(formData, "redirectTo") || "/",
  });

  const membership = await ensureMembership(parsed.tenantId, parsed.userId);

  if (membership.role === "viewer") {
    throw new Error("Viewers cannot activate sprints.");
  }

  await withTenant(parsed.tenantId, async (tx) => {
    await tx
      .update(sprints)
      .set({ status: "planned", updatedAt: sql`now()` })
      .where(and(eq(sprints.projectId, parsed.projectId), eq(sprints.status, "active")));

    await tx
      .update(sprints)
      .set({ status: "active", updatedAt: sql`now()` })
      .where(and(eq(sprints.projectId, parsed.projectId), eq(sprints.id, parsed.sprintId)));
  });

  redirect(parsed.redirectTo);
}

export async function completeSprintAction(formData: FormData) {
  const parsed = sprintStateSchema.parse({
    tenantId: readString(formData, "tenantId"),
    userId: readString(formData, "userId"),
    projectId: readString(formData, "projectId"),
    sprintId: readString(formData, "sprintId"),
    redirectTo: readString(formData, "redirectTo") || "/",
  });

  const membership = await ensureMembership(parsed.tenantId, parsed.userId);

  if (membership.role === "viewer") {
    throw new Error("Viewers cannot complete sprints.");
  }

  await withTenant(parsed.tenantId, async (tx) => {
    const completedIssues = await tx
      .select({
        id: issues.id,
      })
      .from(issues)
      .innerJoin(
        workflowStatuses,
        and(
          eq(workflowStatuses.tenantId, issues.tenantId),
          eq(workflowStatuses.projectId, issues.projectId),
          eq(workflowStatuses.id, issues.statusId),
        ),
      )
      .where(
        and(
          eq(issues.projectId, parsed.projectId),
          eq(issues.sprintId, parsed.sprintId),
          eq(workflowStatuses.category, "end"),
        ),
      );

    const completedIssueIds = new Set(completedIssues.map((issue) => issue.id));
    const sprintIssues = await tx
      .select({
        id: issues.id,
        title: issues.title,
      })
      .from(issues)
      .where(and(eq(issues.projectId, parsed.projectId), eq(issues.sprintId, parsed.sprintId)));

    const carryForward = sprintIssues.filter((issue) => !completedIssueIds.has(issue.id));

    if (carryForward.length > 0) {
      await tx
        .update(issues)
        .set({ sprintId: null, updatedAt: sql`now()` })
        .where(
          and(
            eq(issues.projectId, parsed.projectId),
            inArray(
              issues.id,
              carryForward.map((issue) => issue.id),
            ),
          ),
        );

      await tx.insert(issueActivities).values(
        carryForward.map((issue) => ({
          id: randomUUID(),
          tenantId: parsed.tenantId,
          issueId: issue.id,
          actorId: parsed.userId,
          actionType: "sprint_changed" as const,
          metadata: {
            field: "sprint",
            from: parsed.sprintId,
            to: null,
            note: "Returned to backlog when sprint completed.",
          },
        })),
      );
    }

    await tx
      .update(sprints)
      .set({ status: "completed", updatedAt: sql`now()` })
      .where(and(eq(sprints.projectId, parsed.projectId), eq(sprints.id, parsed.sprintId)));
  });

  redirect(parsed.redirectTo);
}

export async function createIssueAction(formData: FormData) {
  const parsed = createIssueSchema.parse({
    tenantId: readString(formData, "tenantId"),
    userId: readString(formData, "userId"),
    projectId: readString(formData, "projectId"),
    title: readString(formData, "title"),
    description: readString(formData, "description"),
    issueType: readString(formData, "issueType"),
    priority: readString(formData, "priority"),
    assigneeId: readString(formData, "assigneeId"),
    sprintId: readString(formData, "sprintId"),
  });

  await ensureMembership(parsed.tenantId, parsed.userId);

  const issueId = await withTenant(parsed.tenantId, async (tx) => {
    const [firstStatus] = await tx
      .select({
        id: workflowStatuses.id,
        name: workflowStatuses.name,
      })
      .from(workflowStatuses)
      .where(eq(workflowStatuses.projectId, parsed.projectId))
      .orderBy(asc(workflowStatuses.position));

    if (!firstStatus) {
      throw new Error("Project has no workflow statuses.");
    }

    const [nextNumberRow] = await tx
      .select({
        nextNumber: sql<number>`coalesce(max(${issues.number}), 0) + 1`,
        nextRank: sql<number>`coalesce(max(${issues.rank}), 0) + 1000`,
      })
      .from(issues)
      .where(eq(issues.projectId, parsed.projectId));

    const newIssueId = randomUUID();

    await tx.insert(issues).values({
      id: newIssueId,
      tenantId: parsed.tenantId,
      projectId: parsed.projectId,
      number: nextNumberRow?.nextNumber ?? 1,
      rank: nextNumberRow?.nextRank ?? 1000,
      title: parsed.title,
      description: parsed.description || null,
      issueType: parsed.issueType,
      priority: parsed.priority,
      statusId: firstStatus.id,
      reporterId: parsed.userId,
      assigneeId: parsed.assigneeId || null,
      sprintId: parsed.sprintId || null,
    });

    await tx.insert(issueActivities).values({
      id: randomUUID(),
      tenantId: parsed.tenantId,
      issueId: newIssueId,
      actorId: parsed.userId,
      actionType: "created",
      metadata: {
        status: firstStatus.name,
        sprintId: parsed.sprintId || null,
      },
    });

    return newIssueId;
  });

  redirect(`/?project=${encodeURIComponent(parsed.projectId)}&issue=${encodeURIComponent(issueId)}`);
}

export async function transitionIssueAction(formData: FormData) {
  const parsed = transitionIssueSchema.parse({
    tenantId: readString(formData, "tenantId"),
    userId: readString(formData, "userId"),
    projectId: readString(formData, "projectId"),
    issueId: readString(formData, "issueId"),
    toStatusId: readString(formData, "toStatusId"),
    redirectTo: readString(formData, "redirectTo") || "/",
  });

  await ensureMembership(parsed.tenantId, parsed.userId);

  await withTenant(parsed.tenantId, async (tx) => {
    const [issue] = await tx
      .select({
        statusId: issues.statusId,
      })
      .from(issues)
      .where(and(eq(issues.projectId, parsed.projectId), eq(issues.id, parsed.issueId)));

    if (!issue) {
      throw new Error("Issue not found.");
    }

    const [transition] = await tx
      .select({
        id: workflowTransitions.id,
      })
      .from(workflowTransitions)
      .where(
        and(
          eq(workflowTransitions.projectId, parsed.projectId),
          eq(workflowTransitions.fromStatusId, issue.statusId),
          eq(workflowTransitions.toStatusId, parsed.toStatusId),
        ),
      );

    if (!transition) {
      throw new Error("Invalid workflow transition.");
    }

    const [fromStatus] = await tx
      .select({ name: workflowStatuses.name })
      .from(workflowStatuses)
      .where(eq(workflowStatuses.id, issue.statusId));

    const [toStatus] = await tx
      .select({ name: workflowStatuses.name })
      .from(workflowStatuses)
      .where(eq(workflowStatuses.id, parsed.toStatusId));

    await tx
      .update(issues)
      .set({ statusId: parsed.toStatusId, updatedAt: sql`now()` })
      .where(and(eq(issues.projectId, parsed.projectId), eq(issues.id, parsed.issueId)));

    await tx.insert(issueActivities).values({
      id: randomUUID(),
      tenantId: parsed.tenantId,
      issueId: parsed.issueId,
      actorId: parsed.userId,
      actionType: "status_changed",
      metadata: {
        field: "status",
        from: fromStatus?.name ?? null,
        to: toStatus?.name ?? null,
      },
    });
  });

  redirect(parsed.redirectTo);
}

export async function updateIssueAction(formData: FormData) {
  const parsed = updateIssueSchema.parse({
    tenantId: readString(formData, "tenantId"),
    userId: readString(formData, "userId"),
    projectId: readString(formData, "projectId"),
    issueId: readString(formData, "issueId"),
    title: readString(formData, "title"),
    description: readString(formData, "description"),
    priority: readString(formData, "priority"),
    assigneeId: readString(formData, "assigneeId"),
    sprintId: readString(formData, "sprintId"),
    redirectTo: readString(formData, "redirectTo") || "/",
  });

  await ensureMembership(parsed.tenantId, parsed.userId);

  await withTenant(parsed.tenantId, async (tx) => {
    const [existingIssue] = await tx
      .select({
        title: issues.title,
        description: issues.description,
        priority: issues.priority,
        assigneeId: issues.assigneeId,
        sprintId: issues.sprintId,
      })
      .from(issues)
      .where(and(eq(issues.projectId, parsed.projectId), eq(issues.id, parsed.issueId)));

    if (!existingIssue) {
      throw new Error("Issue not found.");
    }

    await tx
      .update(issues)
      .set({
        title: parsed.title,
        description: parsed.description || null,
        priority: parsed.priority,
        assigneeId: parsed.assigneeId || null,
        sprintId: parsed.sprintId || null,
        updatedAt: sql`now()`,
      })
      .where(and(eq(issues.projectId, parsed.projectId), eq(issues.id, parsed.issueId)));

    const activityPayloads: Array<{
      actionType:
        | "updated"
        | "assigned"
        | "priority_changed"
        | "sprint_changed"
        | "title_changed"
        | "description_changed";
      metadata: Record<string, unknown>;
    }> = [];

    if (existingIssue.title !== parsed.title) {
      activityPayloads.push({
        actionType: "title_changed",
        metadata: { field: "title", from: existingIssue.title, to: parsed.title },
      });
    }

    if ((existingIssue.description ?? "") !== parsed.description) {
      activityPayloads.push({
        actionType: "description_changed",
        metadata: {
          field: "description",
          from: existingIssue.description ?? "",
          to: parsed.description,
        },
      });
    }

    if (existingIssue.priority !== parsed.priority) {
      activityPayloads.push({
        actionType: "priority_changed",
        metadata: { field: "priority", from: existingIssue.priority, to: parsed.priority },
      });
    }

    if ((existingIssue.assigneeId ?? "") !== parsed.assigneeId) {
      activityPayloads.push({
        actionType: "assigned",
        metadata: { field: "assigneeId", from: existingIssue.assigneeId, to: parsed.assigneeId || null },
      });
    }

    if ((existingIssue.sprintId ?? "") !== parsed.sprintId) {
      activityPayloads.push({
        actionType: "sprint_changed",
        metadata: { field: "sprintId", from: existingIssue.sprintId, to: parsed.sprintId || null },
      });
    }

    if (activityPayloads.length > 0) {
      await tx.insert(issueActivities).values(
        activityPayloads.map((activity) => ({
          id: randomUUID(),
          tenantId: parsed.tenantId,
          issueId: parsed.issueId,
          actorId: parsed.userId,
          actionType: activity.actionType,
          metadata: activity.metadata,
        })),
      );
    }
  });

  redirect(parsed.redirectTo);
}

export async function addCommentAction(formData: FormData) {
  const parsed = addCommentSchema.parse({
    tenantId: readString(formData, "tenantId"),
    userId: readString(formData, "userId"),
    issueId: readString(formData, "issueId"),
    content: readString(formData, "content"),
    redirectTo: readString(formData, "redirectTo") || "/",
  });

  await ensureMembership(parsed.tenantId, parsed.userId);

  await withTenant(parsed.tenantId, async (tx) => {
    await tx.insert(comments).values({
      id: randomUUID(),
      tenantId: parsed.tenantId,
      issueId: parsed.issueId,
      authorId: parsed.userId,
      content: parsed.content,
    });

    await tx.insert(issueActivities).values({
      id: randomUUID(),
      tenantId: parsed.tenantId,
      issueId: parsed.issueId,
      actorId: parsed.userId,
      actionType: "commented",
      metadata: {
        preview: parsed.content.slice(0, 120),
      },
    });
  });

  redirect(parsed.redirectTo);
}
