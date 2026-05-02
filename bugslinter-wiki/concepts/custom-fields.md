---
type: concept
tags: [product-feature, customization, fields, schema]
source:
  - ingested/2026-05-01-ai-augmented-issue-tracking-deep-research-report.md
last_updated: 2026-05-01T20:30:00+05:30
confidence: high
---

# Custom Fields

## Summary

Custom fields allow organizations to extend the standard issue schema with project-specific or domain-specific field types. This enables flexible issue tracking tailored to each team's unique workflows and data requirements.

## Key Facts

- **Standard Fields**: Summary, description, status, priority, assignee, labels, attachments (all issues have these)
- **Custom Field Types**: Text, dropdown (select list), checkboxes, date, number, user picker, linked issues
- **Per-Project Configuration**: Different projects can have different custom field schemas
- **Per-Issue-Type Configuration**: Different issue types (Bug, Feature, Epic) can have different custom fields
- **Database Implementation**: Typically stored as JSONB columns or separate custom_field/custom_value tables
- **Searchable & Filterable**: Custom fields should be indexed and included in search/filter queries
- **Jira Example**: Supports "custom fields" for flexibility; admins create fields per project and issue type

## Implications

- **User Flexibility**: Teams can tailor tracking to their specific needs (not one-size-fits-all)
- **Complexity**: Too many custom fields can overwhelm users and slow performance
- **Query Performance**: Dynamic field queries slower than fixed schema; careful indexing required
- **Data Consistency**: Without validation, users can populate fields inconsistently; field constraints help

## Relationships

- [[concepts/agile-boards|Agile Boards]]
- [[concepts/workflow-automation|Workflow Automation]]
- [[concepts/permissions-rbac|Permissions & RBAC]]

## Source Notes

Based on custom field implementation patterns in Atlassian Jira and issue-tracking best practices described in the research report.
