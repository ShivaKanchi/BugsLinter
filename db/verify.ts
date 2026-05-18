import { asc, count, eq } from "drizzle-orm";

import { issues, organizations, sprints, workflowStatuses } from "@/db/schema";
import { databaseClient } from "@/lib/db/client";
import { withTenant } from "@/lib/db/tenant-core";

const tenantId = "11111111-1111-4111-8111-111111111111";

try {
  const result = await withTenant(tenantId, async (tx) => {
    const [organization] = await tx
      .select({
        id: organizations.id,
        name: organizations.name,
        slug: organizations.slug,
      })
      .from(organizations)
      .where(eq(organizations.id, tenantId));

    const issueRows = await tx
      .select({
        number: issues.number,
        title: issues.title,
        priority: issues.priority,
      })
      .from(issues)
      .orderBy(asc(issues.number));

    const [statusCount] = await tx.select({ value: count() }).from(workflowStatuses);
    const [sprintCount] = await tx.select({ value: count() }).from(sprints);

    return {
      organization,
      issueCount: issueRows.length,
      statusCount: statusCount.value,
      sprintCount: sprintCount.value,
      issues: issueRows,
    };
  });

  console.log(JSON.stringify(result, null, 2));
} finally {
  await databaseClient.end();
}
