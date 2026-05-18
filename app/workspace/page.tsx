import type { Metadata } from "next";

import { WorkspacePage } from "@/app/_components/workspace-page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Workspace | Bugslinter",
  description: "Bugslinter workspace for issue intake, sprint planning, execution, and delivery history.",
};

export default async function WorkspaceRoute({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; issue?: string }>;
}) {
  return <WorkspacePage searchParams={searchParams} />;
}
