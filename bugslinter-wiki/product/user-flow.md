---
type: concept
tags: [product, workflow, jira-like, onboarding]
source:
  - ingested/2026-05-01-ai-augmented-issue-tracking-deep-research-report.md
  - ingested/2026-05-02-DB-setup.md
last_updated: 2026-05-18T00:00:00+05:30
confidence: high
---

# User Flow

## Summary

Bugslinter v1 should be used in the same sequence a delivery team operates: create an account, create a workspace, create a project, populate backlog, create a sprint, execute work on a board, and inspect issue change history in context.

## Key Facts

- The entry flow is `account -> workspace -> first project`, not a generic dashboard landing.
- Each project owns its workflow statuses, transitions, backlog, sprint list, and issue numbering.
- Backlog issues can exist before any sprint is active.
- Sprint planning assigns backlog issues into a named sprint with dates and a goal.
- The active sprint renders the execution board using workflow status columns as the source of truth.
- Issue detail includes editable planning fields, comments, and durable activity history for changes.
- `changes` in the current product vocabulary means issue activity history such as status moves, priority edits, assignee updates, sprint assignment, and description updates.

## Implications

- The first implemented UI should expose the working surface immediately instead of leading with dashboard cards.
- Auth can remain lightweight in the early slice, but tenant-safe session resolution must exist before real multi-workspace use.
- Sprint support is not a visual-only feature; it requires durable schema and lifecycle rules.

## Relationships

- [[product/core-entities|Core Entities]]
- [[product/roadmap|Roadmap]]
- [[concepts/agile-boards|Agile Boards]]
- [[concepts/permissions-rbac|Permissions & RBAC]]

## Source Notes

Derived from the repo's current implementation direction plus the ingested research and database design guidance.
