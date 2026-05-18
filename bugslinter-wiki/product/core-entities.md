---
type: concept
tags: [product, entities, data-model, scrum]
source:
  - ingested/2026-05-01-ai-augmented-issue-tracking-deep-research-report.md
  - ingested/2026-05-02-DB-setup.md
last_updated: 2026-05-18T00:00:00+05:30
confidence: high
---

# Core Entities

## Summary

Bugslinter's v1 entity model is intentionally narrow: organization, membership, user, project, sprint, workflow status, workflow transition, issue, comment, and issue activity.

## Key Facts

- **Organization** is the tenant boundary and primary workspace container.
- **User** belongs to a tenant and participates through **membership** with a role such as admin, member, or viewer.
- **Project** is the main delivery container with its own key, workflow, backlog, and sprint cycle.
- **Sprint** belongs to a project and has a status (`planned`, `active`, `completed`), optional goal, and schedule dates.
- **Workflow Status** defines board columns and valid issue progression.
- **Workflow Transition** controls which issue moves are allowed from one status to another.
- **Issue** supports only `task`, `bug`, and `feature` in v1, with assignee, reporter, priority, sprint assignment, and ordering rank.
- **Comment** captures issue discussion.
- **Issue Activity** is the durable record of changes such as creation, status movement, assignee changes, priority changes, sprint changes, and description edits.

## Implications

- Sprint planning and board execution should reuse the same issue model rather than inventing separate sprint-task entities.
- Activity history is a first-class product capability because it supports debugging, retrospectives, and auditability.
- Epics, subtasks, releases, and Git integrations can remain out of scope until the core flow is stable.

## Relationships

- [[product/user-flow|User Flow]]
- [[product/roadmap|Roadmap]]
- [[concepts/database-design|Database Design]]
- [[concepts/multi-tenant-architecture|Multi-Tenant Architecture]]

## Source Notes

Compiled from the wiki's architecture guidance and aligned to the current repo schema direction.
