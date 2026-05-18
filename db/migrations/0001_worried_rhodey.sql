CREATE TYPE "public"."sprint_status" AS ENUM('planned', 'active', 'completed');--> statement-breakpoint
ALTER TYPE "public"."issue_activity_type" ADD VALUE 'sprint_changed';--> statement-breakpoint
ALTER TYPE "public"."issue_activity_type" ADD VALUE 'title_changed';--> statement-breakpoint
ALTER TYPE "public"."issue_activity_type" ADD VALUE 'description_changed';--> statement-breakpoint
CREATE TABLE "sprints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"project_id" uuid NOT NULL,
	"name" text NOT NULL,
	"goal" text,
	"status" "sprint_status" DEFAULT 'planned' NOT NULL,
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sprints_tenant_project_id_unique" UNIQUE("tenant_id","project_id","id")
);
--> statement-breakpoint
ALTER TABLE "sprints" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "issues" ADD COLUMN "sprint_id" uuid;--> statement-breakpoint
ALTER TABLE "issues" ADD COLUMN "rank" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "sprints" ADD CONSTRAINT "sprints_tenant_id_organizations_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sprints" ADD CONSTRAINT "sprints_tenant_project_fk" FOREIGN KEY ("tenant_id","project_id") REFERENCES "public"."projects"("tenant_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sprints" ADD CONSTRAINT "sprints_tenant_created_by_fk" FOREIGN KEY ("tenant_id","created_by") REFERENCES "public"."users"("tenant_id","id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "sprints_tenant_project_name_unique" ON "sprints" USING btree ("tenant_id","project_id","name");--> statement-breakpoint
CREATE INDEX "sprints_project_idx" ON "sprints" USING btree ("tenant_id","project_id");--> statement-breakpoint
CREATE INDEX "sprints_status_idx" ON "sprints" USING btree ("tenant_id","project_id","status");--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_tenant_project_sprint_fk" FOREIGN KEY ("tenant_id","project_id","sprint_id") REFERENCES "public"."sprints"("tenant_id","project_id","id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "issues_sprint_idx" ON "issues" USING btree ("tenant_id","project_id","sprint_id");--> statement-breakpoint
CREATE INDEX "issues_rank_idx" ON "issues" USING btree ("tenant_id","project_id","rank");--> statement-breakpoint
CREATE POLICY "sprints_tenant_isolation" ON "sprints" AS PERMISSIVE FOR ALL TO public USING ("sprints"."tenant_id" = nullif(current_setting('app.tenant_id', true), '')::uuid) WITH CHECK ("sprints"."tenant_id" = nullif(current_setting('app.tenant_id', true), '')::uuid);