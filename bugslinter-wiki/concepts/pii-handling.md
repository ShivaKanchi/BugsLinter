---
type: concept
tags: [privacy, security, compliance, pii, gdpr]
source:
  - ingested/2026-05-01-ai-augmented-issue-tracking-deep-research-report.md
last_updated: 2026-05-01T20:30:00+05:30
confidence: high
---

# Personal Identifying Information (PII) Handling

## Summary

PII handling refers to techniques and processes for collecting, storing, and protecting personally identifiable information (names, emails, phone numbers, etc.) in compliance with privacy regulations like GDPR and CCPA.

## Key Facts

- **Data Minimization**: Only collect personal data that is necessary for the application; avoid collecting optional/unused fields
- **Storage Security**: Encrypt PII at rest (column-level or row-level encryption) and in transit (TLS)
- **Hashing**: Hash passwords and never store plain-text credentials
- **Right to Be Forgotten**: Under GDPR, users can request deletion; system must anonymize or delete all PII fields (names, avatars, emails) throughout database
- **Access Controls**: Restrict who can access PII; use role-based access to sensitive fields
- **Audit Logs**: Log access to PII and changes for compliance auditing
- **Training Data**: When using customer data to train ML models, anonymize PII or obtain explicit consent
- **Data Retention**: Set retention policies to auto-delete old personal data or allow customers to configure retention

## Implications

- **Compliance**: Mandatory for GDPR, CCPA, and other privacy regulations; violations incur significant fines
- **User Trust**: Users increasingly expect strong privacy protection; transparent PII handling builds trust
- **Operations**: Implementing PII anonymization and deletion can be complex (many tables/services to coordinate)
- **ML Models**: Cannot train on customer PII without anonymization or consent; limits personalization

## Relationships

- [[concepts/multi-tenant-architecture|Multi-Tenant Architecture]]
- [[concepts/permissions-rbac|Permissions & RBAC]]
- [[concepts/compliance|Compliance]]

## Source Notes

Based on GDPR compliance guidance and PII handling best practices described in the issue-tracking research report and Atlassian's GDPR documentation.
