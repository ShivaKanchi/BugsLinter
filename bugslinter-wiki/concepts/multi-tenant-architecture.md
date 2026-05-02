---
type: concept
tags: [architecture, multi-tenancy, isolation, security]
source:
  - ingested/2026-05-01-ai-augmented-issue-tracking-deep-research-report.md
last_updated: 2026-05-01T20:30:00+05:30
confidence: high
---

# Multi-Tenant Architecture

## Summary

Multi-tenant architecture is a design pattern where a single instance of a software application serves multiple customers (tenants), each with isolated data and configuration. It balances resource efficiency with strict data isolation and security for enterprise SaaS products.

## Key Facts

- **Isolation Strategies**: Either separate database per tenant or shared database with tenant_id columns on every table and row-level security
- **Shared DB Approach**: Requires strict encryption (column-level or per-row) and row-level security policies to prevent cross-tenant access
- **Per-Tenant Encryption Keys**: Using KMS to generate and rotate keys per customer adds security layer for potential breaches
- **Least Privilege Design**: Each microservice only accesses its own datastore; no "superuser" with global read access
- **Data Minimization**: Collect only necessary personal data (names, emails) to reduce PII exposure
- **GDPR Compliance**: Implement right-to-be-forgotten by anonymizing all PII (names, avatars, emails) throughout database or providing data deletion tools
- **Network Isolation**: Use private VPCs per customer or well-defined IAM roles to prevent cross-tenant network access

## Implications

- **Security**: Multi-tenancy requires defense-in-depth; single point of failure can affect all customers
- **Compliance**: Mandatory for GDPR, SOC2, ISO 27001 certification when serving regulated industries
- **Operational**: Separate databases simplify isolation but increase infrastructure cost; shared databases reduce cost but require more careful engineering
- **Performance**: Shared resources can be noisy neighbor problem; monitoring and resource quotas help mitigate

## Relationships

- [[concepts/microservices-architecture|Microservices Architecture]]
- [[concepts/permissions-rbac|Permissions & RBAC]]
- [[concepts/pii-handling|Personal Identifying Information (PII) Handling]]
- [[concepts/compliance|Compliance]]

## Source Notes

Based on architectural best practices for multi-tenant SaaS platforms discussed in the issue-tracking research report and WorkOS security guidance on data isolation strategies.
