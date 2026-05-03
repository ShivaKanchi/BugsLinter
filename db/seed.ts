import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  comments,
  issueActivities,
  issues,
  memberships,
  organizations,
  projects,
  users,
  workflowStatuses,
  workflowTransitions,
} from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to seed the database");
}

const client = postgres(databaseUrl, { max: 1, prepare: false });
const db = drizzle(client);

const tenantId = "11111111-1111-4111-8111-111111111111";
const adminUserId = "22222222-2222-4222-8222-222222222222";
const developerUserId = "33333333-3333-4333-8333-333333333333";
const viewerUserId = "44444444-4444-4444-8444-444444444444";
const projectId = "55555555-5555-4555-8555-555555555555";

const backlogStatusId = "66666666-6666-4666-8666-666666666666";
const todoStatusId = "77777777-7777-4777-8777-777777777777";
const inProgressStatusId = "88888888-8888-4888-8888-888888888888";
const reviewStatusId = "99999999-9999-4999-8999-999999999999";
const doneStatusId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";

const firstIssueId = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const secondIssueId = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
const firstCommentId = "dddddddd-dddd-4ddd-8ddd-dddddddddddd";
const secondCommentId = "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee";

async function main() {
  await db
    .insert(organizations)
    .values({
      id: tenantId,
      name: "Bugslinter Labs",
      slug: "bugslinter-labs",
    })
    .onConflictDoNothing();

  await db
    .insert(users)
    .values([
      {
        id: adminUserId,
        tenantId,
        email: "admin@bugslinter.test",
        name: "Asha Rao",
      },
      {
        id: developerUserId,
        tenantId,
        email: "dev@bugslinter.test",
        name: "Dev Patel",
      },
      {
        id: viewerUserId,
        tenantId,
        email: "viewer@bugslinter.test",
        name: "Mira Sen",
      },
    ])
    .onConflictDoNothing();

  await db
    .insert(memberships)
    .values([
      {
        id: "12121212-1212-4121-8121-121212121212",
        tenantId,
        organizationId: tenantId,
        userId: adminUserId,
        role: "admin",
      },
      {
        id: "13131313-1313-4131-8131-131313131313",
        tenantId,
        organizationId: tenantId,
        userId: developerUserId,
        role: "member",
      },
      {
        id: "14141414-1414-4141-8141-141414141414",
        tenantId,
        organizationId: tenantId,
        userId: viewerUserId,
        role: "viewer",
      },
    ])
    .onConflictDoNothing();

  await db
    .insert(projects)
    .values({
      id: projectId,
      tenantId,
      organizationId: tenantId,
      name: "Bugslinter Platform",
      key: "BUG",
      description: "Core issue tracking workspace for the Bugslinter MVP.",
      createdBy: adminUserId,
    })
    .onConflictDoNothing();

  await db
    .insert(workflowStatuses)
    .values([
      {
        id: backlogStatusId,
        tenantId,
        projectId,
        name: "Backlog",
        category: "start",
        position: 0,
      },
      {
        id: todoStatusId,
        tenantId,
        projectId,
        name: "Todo",
        category: "intermediate",
        position: 1,
      },
      {
        id: inProgressStatusId,
        tenantId,
        projectId,
        name: "In Progress",
        category: "intermediate",
        position: 2,
      },
      {
        id: reviewStatusId,
        tenantId,
        projectId,
        name: "Review",
        category: "intermediate",
        position: 3,
      },
      {
        id: doneStatusId,
        tenantId,
        projectId,
        name: "Done",
        category: "end",
        position: 4,
      },
    ])
    .onConflictDoNothing();

  await db
    .insert(workflowTransitions)
    .values([
      {
        id: "15151515-1515-4151-8151-151515151515",
        tenantId,
        projectId,
        fromStatusId: backlogStatusId,
        toStatusId: todoStatusId,
        name: "Prioritize",
      },
      {
        id: "16161616-1616-4161-8161-161616161616",
        tenantId,
        projectId,
        fromStatusId: todoStatusId,
        toStatusId: inProgressStatusId,
        name: "Start work",
      },
      {
        id: "17171717-1717-4171-8171-171717171717",
        tenantId,
        projectId,
        fromStatusId: inProgressStatusId,
        toStatusId: reviewStatusId,
        name: "Request review",
      },
      {
        id: "18181818-1818-4181-8181-181818181818",
        tenantId,
        projectId,
        fromStatusId: reviewStatusId,
        toStatusId: doneStatusId,
        name: "Complete",
      },
    ])
    .onConflictDoNothing();

  await db
    .insert(issues)
    .values([
      {
        id: firstIssueId,
        tenantId,
        projectId,
        number: 1,
        title: "Create tenant-safe issue model",
        description: "Define the first durable schema for projects, workflows, issues, comments, and audit history.",
        issueType: "task",
        statusId: inProgressStatusId,
        priority: "high",
        reporterId: adminUserId,
        assigneeId: developerUserId,
      },
      {
        id: secondIssueId,
        tenantId,
        projectId,
        number: 2,
        title: "Document the local database workflow",
        description: "Make the database setup reproducible for new contributors.",
        issueType: "task",
        statusId: todoStatusId,
        priority: "medium",
        reporterId: developerUserId,
        assigneeId: developerUserId,
      },
    ])
    .onConflictDoNothing();

  await db
    .insert(comments)
    .values([
      {
        id: firstCommentId,
        tenantId,
        issueId: firstIssueId,
        authorId: adminUserId,
        content: "Keep this core-only for now; AI and custom fields can come after the base workflow is stable.",
      },
      {
        id: secondCommentId,
        tenantId,
        issueId: secondIssueId,
        authorId: developerUserId,
        content: "The Docker setup should use pgvector so the next AI phase does not need a local DB swap.",
      },
    ])
    .onConflictDoNothing();

  await db
    .insert(issueActivities)
    .values([
      {
        id: "19191919-1919-4191-8191-191919191919",
        tenantId,
        issueId: firstIssueId,
        actorId: adminUserId,
        actionType: "created",
        metadata: { statusId: backlogStatusId },
      },
      {
        id: "20202020-2020-4202-8202-202020202020",
        tenantId,
        issueId: firstIssueId,
        actorId: developerUserId,
        actionType: "status_changed",
        metadata: {
          fromStatusId: todoStatusId,
          toStatusId: inProgressStatusId,
        },
      },
      {
        id: "21212121-2121-4212-8212-212121212121",
        tenantId,
        issueId: secondIssueId,
        actorId: developerUserId,
        actionType: "created",
        metadata: { statusId: todoStatusId },
      },
    ])
    .onConflictDoNothing();
}

try {
  await main();
  console.log("Seeded Bugslinter core data.");
} finally {
  await client.end();
}
