---
type: concept
tags: [product-feature, workflow, agile, scrum, kanban]
source:
  - ingested/2026-05-01-ai-augmented-issue-tracking-deep-research-report.md
last_updated: 2026-05-01T20:30:00+05:30
confidence: high
---

# Agile Boards

## Summary

Agile boards (Scrum and Kanban) provide visual, interactive representations of work in progress. They enable teams to plan sprints, track status across columns, manage backlogs, and optimize workflow using work-in-progress (WIP) limits.

## Key Facts

- **Kanban Boards**: Visualize issues by status (To Do, In Progress, Done) with drag-and-drop workflow; continuous flow model
- **Scrum Boards**: Time-boxed sprints with sprint planning, backlog prioritization, and velocity tracking
- **Backlog Management**: Organize prioritized list of issues; assign to sprints or epics
- **Sprint Features**: Start/complete sprints, assign issues to sprints, track sprint velocity and burndown charts
- **WIP Limits**: Set maximum issues per column to prevent bottlenecks and encourage completion
- **Drag-and-Drop**: Update issue status by dragging across board columns
- **Filtering/Grouping**: Filter by assignee, epic, priority; group by team or component
- **Reporting**: Burndown/burnup charts, velocity trends, cycle time metrics

## Implications

- **Team Adoption**: Visual workflows increase engagement and transparency compared to spreadsheets
- **Process**: Enforces disciplined issue movement; can slow down if process is too rigid
- **Performance**: Large numbers of issues can slow board rendering; pagination or lazy-loading helps
- **Integration**: Should integrate with Git (auto-close issues on PR merge) and CI/CD for automated workflow

## Relationships

- [[concepts/workflow-automation|Workflow Automation]]
- [[concepts/custom-fields|Custom Fields]]
- [[concepts/permissions-rbac|Permissions & RBAC]]

## Source Notes

Based on Agile board features and best practices for Scrum/Kanban described in the issue-tracking research report.
