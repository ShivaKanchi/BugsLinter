---
type: concept
tags: [product, roadmap, implementation, phases]
source:
  - ingested/2026-05-01-ai-augmented-issue-tracking-deep-research-report.md
  - ingested/2026-05-02-DB-setup.md
last_updated: 2026-05-18T00:00:00+05:30
confidence: high
---

# Roadmap

## Summary

The delivery sequence should favor the durable project workflow first, then collaboration and reporting, then AI capability once the product has enough trustworthy issue data and behavior.

## Key Facts

### Phase 1: Core Workflow

- Account and workspace onboarding
- Project creation with default workflow
- Backlog issue creation
- Sprint creation, activation, and completion
- Board execution based on workflow transitions
- Comments and issue activity history
- Tenant-safe session resolution and RLS-aligned access patterns

### Phase 2: Collaboration And Reporting

- Stronger project and member permissions
- Better issue filtering, grouping, and ranking
- Sprint reporting, velocity, and burndown views
- Notifications and workflow automation hooks
- Custom field design only after the base workflow proves stable

### Phase 3: AI

- Automated triage and suggested priority
- Semantic issue linking and duplicate detection
- Comment and issue summarization
- Retrieval-grounded project assistance

## Implications

- The next build slices should prove the end-to-end operational workflow before adding adjacent platform features.
- AI work should wait until enough issue lifecycle data exists to support useful and safe outputs.

## Relationships

- [[product/user-flow|User Flow]]
- [[product/core-entities|Core Entities]]
- [[summaries/ai-augmented-issue-tracking|AI-Augmented Issue Tracking Deep Research Report]]

## Source Notes

Based on the wiki roadmap guidance, current repo state, and the decision to prioritize a narrow Jira-like core before broader platform scope.
