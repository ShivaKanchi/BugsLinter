# Bugslinter

Bugslinter is a Next.js issue-tracking app backed by PostgreSQL and Drizzle. The current data layer is tenant-aware: each organization is treated as a tenant, tenant-owned records carry a `tenant_id`, and PostgreSQL Row-Level Security (RLS) keeps tenant data isolated at the database level.

## Prerequisites

- [Bun](https://bun.sh/) for package scripts and dependency management.
- Docker Desktop for the local PostgreSQL database.
- Dependencies installed with `bun install`.

On Windows PowerShell, `bun.ps1` may be blocked by execution policy. If a `bun ...` command fails with a script policy error, use the `cmd /c bun.cmd ...` version shown below.

## Local Setup

Create your local environment file:

```powershell
Copy-Item .env.example .env
```

Start the local PostgreSQL database:

```powershell
docker compose up -d postgres
```

Apply database migrations:

```powershell
bun run db:migrate
```

Seed demo data:

```powershell
bun run db:seed
```

Verify tenant-scoped database access:

```powershell
bun run db:verify
```

Start the Next.js development server:

```powershell
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Windows Bun Fallback

Use these commands if PowerShell blocks the Bun shim:

```powershell
cmd /c bun.cmd run db:migrate
cmd /c bun.cmd run db:seed
cmd /c bun.cmd run db:verify
cmd /c bun.cmd run dev
```

## Local Services

- App: [http://localhost:3000](http://localhost:3000)
- PostgreSQL: `localhost:5438`
- Docker container: `bugslinter-postgres`
- Database image: `pgvector/pgvector:pg16`

The local database uses the pgvector image so future AI embedding work can use the same Postgres setup without changing the service.

## Database Workflow

The Drizzle schema is the source of truth for the database model:

```powershell
bun run db:generate
```

Generates SQL migrations from `db/schema.ts`.

```powershell
bun run db:migrate
```

Applies pending migrations to PostgreSQL using `DATABASE_URL`.

```powershell
bun run db:seed
```

Inserts demo organization, users, memberships, project, workflow statuses, issues, comments, and activity records.

```powershell
bun run db:studio
```

Opens Drizzle Studio for database inspection.

## Validation

Run these before handing off changes:

```powershell
bun run lint
bun run typecheck
bun run db:verify
```

Use the `cmd /c bun.cmd ...` fallback if needed on Windows PowerShell.

## Codebase Structure

- `app/`: Next.js App Router UI shell.
- `db/schema.ts`: Drizzle tables, enums, indexes, constraints, and RLS policies.
- `db/migrations/`: Generated SQL migrations applied by Drizzle Kit.
- `db/seed.ts`: Demo data for the local development database.
- `db/verify.ts`: Tenant-scoped database verification script.
- `lib/db/client.ts`: Drizzle and Postgres runtime client.
- `lib/db/index.ts`: Server-only app database entrypoint.
- `lib/db/tenant.ts`: Server-only tenant transaction helper for app code.
- `lib/db/tenant-core.ts`: CLI-safe tenant helper used by verification scripts.
- `docker-compose.yml`: Local pgvector PostgreSQL service.
- `drizzle.config.ts`: Drizzle Kit configuration.
- `.env.example`: Local environment variable template.

## Tenant And RLS Model

`organizations.id` is the tenant root. Tenant-owned tables include a `tenant_id` column that points back to an organization.

Application database work should go through `withTenant(tenantId, callback)`. That helper sets `app.tenant_id` for the current transaction. PostgreSQL RLS policies then only allow rows matching that tenant id.

This means a query like `select * from issues` still returns only the current tenant's issues when it runs through the tenant helper.
