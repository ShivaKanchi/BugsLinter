import { sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db/client";

const tenantIdSchema = z.string().uuid();

export type TenantTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export async function withTenant<T>(
  tenantId: string,
  callback: (tx: TenantTransaction) => Promise<T>,
): Promise<T> {
  const parsedTenantId = tenantIdSchema.parse(tenantId);

  return db.transaction(async (tx) => {
    await tx.execute(sql`select set_config('app.tenant_id', ${parsedTenantId}, true)`);
    return callback(tx);
  });
}
