import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/db/schema";

const appDatabaseUrl = process.env.APP_DATABASE_URL;

if (!appDatabaseUrl) {
  throw new Error("APP_DATABASE_URL is required for runtime database access");
}

const globalForDb = globalThis as unknown as {
  bugslinterSql?: postgres.Sql;
};

const client =
  globalForDb.bugslinterSql ??
  postgres(appDatabaseUrl, {
    max: 10,
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.bugslinterSql = client;
}

export const databaseClient = client;
export const db = drizzle(databaseClient, { schema });
export type Database = typeof db;
