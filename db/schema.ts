import {
  foreignKey,
  index,
  integer,
  jsonb,
  pgEnum,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  unique,
  uuid,
  check,
} from "drizzle-orm/pg-core";
import { sql, type InferInsertModel, type InferSelectModel } from "drizzle-orm";

const currentTenantId = sql`nullif(current_setting('app.tenant_id', true), '')::uuid`;

export const membershipRoleEnum = pgEnum("membership_role", [
  "admin",
  "member",
  "viewer",
]);

export const issueTypeEnum = pgEnum("issue_type", [
  "bug",
  "feature",
  "task",
]);

export const issuePriorityEnum = pgEnum("issue_priority", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const sprintStatusEnum = pgEnum("sprint_status", [
  "planned",
  "active",
  "completed",
]);

export const workflowStatusCategoryEnum = pgEnum("workflow_status_category", [
  "start",
  "intermediate",
  "end",
]);

export const issueActivityTypeEnum = pgEnum("issue_activity_type", [
  "created",
  "updated",
  "status_changed",
  "commented",
  "assigned",
  "priority_changed",
  "sprint_changed",
  "title_changed",
  "description_changed",
]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const organizations = pgTable(
  "organizations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("organizations_slug_unique").on(table.slug),
    pgPolicy("organizations_tenant_isolation", {
      for: "all",
      to: "public",
      using: sql`${table.id} = ${currentTenantId}`,
      withCheck: sql`${table.id} = ${currentTenantId}`,
    }),
  ],
).enableRLS();

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    name: text("name"),
    avatarUrl: text("avatar_url"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("users_email_unique").on(table.email),
    unique("users_tenant_id_id_unique").on(table.tenantId, table.id),
    index("users_tenant_idx").on(table.tenantId),
    pgPolicy("users_tenant_isolation", {
      for: "all",
      to: "public",
      using: sql`${table.tenantId} = ${currentTenantId}`,
      withCheck: sql`${table.tenantId} = ${currentTenantId}`,
    }),
  ],
).enableRLS();

export const memberships = pgTable(
  "memberships",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    role: membershipRoleEnum("role").notNull().default("member"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("memberships_tenant_user_unique").on(table.tenantId, table.userId),
    index("memberships_organization_idx").on(table.organizationId),
    check("memberships_tenant_matches_organization", sql`${table.tenantId} = ${table.organizationId}`),
    foreignKey({
      name: "memberships_tenant_user_fk",
      columns: [table.tenantId, table.userId],
      foreignColumns: [users.tenantId, users.id],
    }).onDelete("cascade"),
    pgPolicy("memberships_tenant_isolation", {
      for: "all",
      to: "public",
      using: sql`${table.tenantId} = ${currentTenantId}`,
      withCheck: sql`${table.tenantId} = ${currentTenantId}`,
    }),
  ],
).enableRLS();

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    key: text("key").notNull(),
    description: text("description"),
    createdBy: uuid("created_by").notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("projects_tenant_key_unique").on(table.tenantId, table.key),
    unique("projects_tenant_id_id_unique").on(table.tenantId, table.id),
    index("projects_organization_idx").on(table.organizationId),
    check("projects_tenant_matches_organization", sql`${table.tenantId} = ${table.organizationId}`),
    foreignKey({
      name: "projects_tenant_created_by_fk",
      columns: [table.tenantId, table.createdBy],
      foreignColumns: [users.tenantId, users.id],
    }).onDelete("restrict"),
    pgPolicy("projects_tenant_isolation", {
      for: "all",
      to: "public",
      using: sql`${table.tenantId} = ${currentTenantId}`,
      withCheck: sql`${table.tenantId} = ${currentTenantId}`,
    }),
  ],
).enableRLS();

export const workflowStatuses = pgTable(
  "workflow_statuses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    projectId: uuid("project_id").notNull(),
    name: text("name").notNull(),
    category: workflowStatusCategoryEnum("category").notNull(),
    position: integer("position").notNull(),
  },
  (table) => [
    uniqueIndex("workflow_statuses_tenant_project_name_unique").on(
      table.tenantId,
      table.projectId,
      table.name,
    ),
    unique("workflow_statuses_tenant_project_id_unique").on(
      table.tenantId,
      table.projectId,
      table.id,
    ),
    index("workflow_statuses_project_idx").on(table.tenantId, table.projectId),
    foreignKey({
      name: "workflow_statuses_tenant_project_fk",
      columns: [table.tenantId, table.projectId],
      foreignColumns: [projects.tenantId, projects.id],
    }).onDelete("cascade"),
    pgPolicy("workflow_statuses_tenant_isolation", {
      for: "all",
      to: "public",
      using: sql`${table.tenantId} = ${currentTenantId}`,
      withCheck: sql`${table.tenantId} = ${currentTenantId}`,
    }),
  ],
).enableRLS();

export const workflowTransitions = pgTable(
  "workflow_transitions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    projectId: uuid("project_id").notNull(),
    fromStatusId: uuid("from_status_id").notNull(),
    toStatusId: uuid("to_status_id").notNull(),
    name: text("name").notNull(),
    condition: jsonb("condition")
      .$type<Record<string, unknown>>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("workflow_transitions_tenant_project_path_unique").on(
      table.tenantId,
      table.projectId,
      table.fromStatusId,
      table.toStatusId,
    ),
    index("workflow_transitions_project_idx").on(table.tenantId, table.projectId),
    foreignKey({
      name: "workflow_transitions_tenant_project_fk",
      columns: [table.tenantId, table.projectId],
      foreignColumns: [projects.tenantId, projects.id],
    }).onDelete("cascade"),
    foreignKey({
      name: "workflow_transitions_from_status_fk",
      columns: [table.tenantId, table.projectId, table.fromStatusId],
      foreignColumns: [workflowStatuses.tenantId, workflowStatuses.projectId, workflowStatuses.id],
    }).onDelete("restrict"),
    foreignKey({
      name: "workflow_transitions_to_status_fk",
      columns: [table.tenantId, table.projectId, table.toStatusId],
      foreignColumns: [workflowStatuses.tenantId, workflowStatuses.projectId, workflowStatuses.id],
    }).onDelete("restrict"),
    pgPolicy("workflow_transitions_tenant_isolation", {
      for: "all",
      to: "public",
      using: sql`${table.tenantId} = ${currentTenantId}`,
      withCheck: sql`${table.tenantId} = ${currentTenantId}`,
    }),
  ],
).enableRLS();

export const sprints = pgTable(
  "sprints",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    projectId: uuid("project_id").notNull(),
    name: text("name").notNull(),
    goal: text("goal"),
    status: sprintStatusEnum("status").notNull().default("planned"),
    startDate: timestamp("start_date", { withTimezone: true }),
    endDate: timestamp("end_date", { withTimezone: true }),
    createdBy: uuid("created_by").notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("sprints_tenant_project_name_unique").on(table.tenantId, table.projectId, table.name),
    unique("sprints_tenant_project_id_unique").on(table.tenantId, table.projectId, table.id),
    index("sprints_project_idx").on(table.tenantId, table.projectId),
    index("sprints_status_idx").on(table.tenantId, table.projectId, table.status),
    foreignKey({
      name: "sprints_tenant_project_fk",
      columns: [table.tenantId, table.projectId],
      foreignColumns: [projects.tenantId, projects.id],
    }).onDelete("cascade"),
    foreignKey({
      name: "sprints_tenant_created_by_fk",
      columns: [table.tenantId, table.createdBy],
      foreignColumns: [users.tenantId, users.id],
    }).onDelete("restrict"),
    pgPolicy("sprints_tenant_isolation", {
      for: "all",
      to: "public",
      using: sql`${table.tenantId} = ${currentTenantId}`,
      withCheck: sql`${table.tenantId} = ${currentTenantId}`,
    }),
  ],
).enableRLS();

export const issues = pgTable(
  "issues",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    projectId: uuid("project_id").notNull(),
    number: integer("number").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    issueType: issueTypeEnum("issue_type").notNull().default("task"),
    statusId: uuid("status_id").notNull(),
    priority: issuePriorityEnum("priority").notNull().default("medium"),
    reporterId: uuid("reporter_id").notNull(),
    assigneeId: uuid("assignee_id"),
    sprintId: uuid("sprint_id"),
    rank: integer("rank").notNull().default(0),
    dueDate: timestamp("due_date", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("issues_project_number_unique").on(table.tenantId, table.projectId, table.number),
    unique("issues_tenant_id_id_unique").on(table.tenantId, table.id),
    index("issues_tenant_project_idx").on(table.tenantId, table.projectId),
    index("issues_assignee_idx").on(table.tenantId, table.assigneeId),
    index("issues_status_idx").on(table.tenantId, table.statusId),
    index("issues_sprint_idx").on(table.tenantId, table.projectId, table.sprintId),
    index("issues_rank_idx").on(table.tenantId, table.projectId, table.rank),
    foreignKey({
      name: "issues_tenant_project_fk",
      columns: [table.tenantId, table.projectId],
      foreignColumns: [projects.tenantId, projects.id],
    }).onDelete("cascade"),
    foreignKey({
      name: "issues_tenant_project_status_fk",
      columns: [table.tenantId, table.projectId, table.statusId],
      foreignColumns: [workflowStatuses.tenantId, workflowStatuses.projectId, workflowStatuses.id],
    }).onDelete("restrict"),
    foreignKey({
      name: "issues_tenant_reporter_fk",
      columns: [table.tenantId, table.reporterId],
      foreignColumns: [users.tenantId, users.id],
    }).onDelete("restrict"),
    foreignKey({
      name: "issues_tenant_assignee_fk",
      columns: [table.tenantId, table.assigneeId],
      foreignColumns: [users.tenantId, users.id],
    }).onDelete("set null"),
    foreignKey({
      name: "issues_tenant_project_sprint_fk",
      columns: [table.tenantId, table.projectId, table.sprintId],
      foreignColumns: [sprints.tenantId, sprints.projectId, sprints.id],
    }).onDelete("set null"),
    pgPolicy("issues_tenant_isolation", {
      for: "all",
      to: "public",
      using: sql`${table.tenantId} = ${currentTenantId}`,
      withCheck: sql`${table.tenantId} = ${currentTenantId}`,
    }),
  ],
).enableRLS();

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    issueId: uuid("issue_id").notNull(),
    authorId: uuid("author_id").notNull(),
    content: text("content").notNull(),
    ...timestamps,
  },
  (table) => [
    index("comments_issue_idx").on(table.tenantId, table.issueId),
    foreignKey({
      name: "comments_tenant_issue_fk",
      columns: [table.tenantId, table.issueId],
      foreignColumns: [issues.tenantId, issues.id],
    }).onDelete("cascade"),
    foreignKey({
      name: "comments_tenant_author_fk",
      columns: [table.tenantId, table.authorId],
      foreignColumns: [users.tenantId, users.id],
    }).onDelete("restrict"),
    pgPolicy("comments_tenant_isolation", {
      for: "all",
      to: "public",
      using: sql`${table.tenantId} = ${currentTenantId}`,
      withCheck: sql`${table.tenantId} = ${currentTenantId}`,
    }),
  ],
).enableRLS();

export const issueActivities = pgTable(
  "issue_activities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    issueId: uuid("issue_id").notNull(),
    actorId: uuid("actor_id"),
    actionType: issueActivityTypeEnum("action_type").notNull(),
    metadata: jsonb("metadata")
      .$type<Record<string, unknown>>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("issue_activities_issue_idx").on(table.tenantId, table.issueId),
    foreignKey({
      name: "issue_activities_tenant_issue_fk",
      columns: [table.tenantId, table.issueId],
      foreignColumns: [issues.tenantId, issues.id],
    }).onDelete("cascade"),
    foreignKey({
      name: "issue_activities_tenant_actor_fk",
      columns: [table.tenantId, table.actorId],
      foreignColumns: [users.tenantId, users.id],
    }).onDelete("set null"),
    pgPolicy("issue_activities_tenant_isolation", {
      for: "all",
      to: "public",
      using: sql`${table.tenantId} = ${currentTenantId}`,
      withCheck: sql`${table.tenantId} = ${currentTenantId}`,
    }),
  ],
).enableRLS();

export type Organization = InferSelectModel<typeof organizations>;
export type NewOrganization = InferInsertModel<typeof organizations>;

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Membership = InferSelectModel<typeof memberships>;
export type NewMembership = InferInsertModel<typeof memberships>;

export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;

export type WorkflowStatus = InferSelectModel<typeof workflowStatuses>;
export type NewWorkflowStatus = InferInsertModel<typeof workflowStatuses>;

export type WorkflowTransition = InferSelectModel<typeof workflowTransitions>;
export type NewWorkflowTransition = InferInsertModel<typeof workflowTransitions>;

export type Sprint = InferSelectModel<typeof sprints>;
export type NewSprint = InferInsertModel<typeof sprints>;

export type Issue = InferSelectModel<typeof issues>;
export type NewIssue = InferInsertModel<typeof issues>;

export type Comment = InferSelectModel<typeof comments>;
export type NewComment = InferInsertModel<typeof comments>;

export type IssueActivity = InferSelectModel<typeof issueActivities>;
export type NewIssueActivity = InferInsertModel<typeof issueActivities>;
