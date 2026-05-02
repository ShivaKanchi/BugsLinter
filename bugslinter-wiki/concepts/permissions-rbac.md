---
type: concept
tags: [security, authorization, permissions, roles]
source:
  - ingested/2026-05-01-ai-augmented-issue-tracking-deep-research-report.md
last_updated: 2026-05-01T20:30:00+05:30
confidence: high
---

# Permissions & RBAC

## Summary

Role-based access control (RBAC) provides fine-grained authorization by assigning roles to users and mapping roles to allowed actions. This ensures users can only perform operations within their responsibility scope.

## Key Facts

- **Standard Roles**: Project Admin, Developer, Reporter, Stakeholder, QA Engineer
- **Role Mapping**: Define which actions each role can perform (create, view, edit, close, delete issues)
- **Scope Levels**: Global organization roles, project-level roles, and potentially issue-level roles
- **Permission Schemes**: Reusable permission definitions that can be applied to multiple projects
- **Delegated Admin**: Project owners configure their own projects' permissions without global admin involvement
- **Least Privilege**: Default to minimal permissions; explicitly grant needed access
- **Integration**: Integrate with enterprise identity providers (LDAP, SAML, OAuth) for centralized access management
- **Audit**: Log all permission changes and access attempts for compliance

## Implications

- **Security**: Prevents unauthorized access and data leaks by enforcing principle of least privilege
- **Usability**: Users see only issues and actions they're authorized for; reduces UI clutter
- **Administration**: Adding new roles or changing permissions requires careful planning to avoid breaking workflows
- **Compliance**: Required for SOC2, ISO 27001, GDPR compliance in regulated industries

## Relationships

- [[concepts/multi-tenant-architecture|Multi-Tenant Architecture]]
- [[concepts/workflow-automation|Workflow Automation]]
- [[concepts/compliance|Compliance]]

## Source Notes

Based on RBAC patterns and enterprise permission schemes described in the issue-tracking research report and Atlassian security documentation.
