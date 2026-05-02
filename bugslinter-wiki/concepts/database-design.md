---
type: concept
tags: [architecture, database, multi-tenancy, ai]
source:
  - ingested/2026-05-02-DB-setup.md
last_updated: 2026-05-02T00:00:00+05:30
confidence: high
---

# Database Design

## Stack Recommendation

Production-grade, AI-ready database architecture for the issue tracking platform.

### Technology Choices

| Concern            | Technology               | Rationale                                                                                       |
| ------------------ | ------------------------ | ----------------------------------------------------------------------------------------------- |
| **Primary DB**     | PostgreSQL               | Strong relational guarantees for workflows; JSONB for custom fields; pgvector for AI embeddings |
| **Search**         | OpenSearch/Elasticsearch | Full-text and semantic search at scale                                                          |
| **Cache/Realtime** | Redis                    | Session state and real-time notifications                                                       |
| **AI/Embeddings**  | PostgreSQL + pgvector    | No separate dependency (Pinecone) needed early                                                  |

### Anti-Patterns to Avoid

- **MongoDB**: Weak joins make reporting and workflow transitions painful
- **CQRS/Event Sourcing**: Don't introduce early; adds complexity without immediate ROI
- **Over-fragmented services**: Keep initially monolithic, separate later if needed

---

## Multi-Tenancy Strategy

### Approach: Shared DB, Shared Schema, Tenant Isolation via `tenant_id`

Add `tenant_id UUID NOT NULL` to **every table**. Enforce isolation at the database level using PostgreSQL Row-Level Security (RLS).

**Benefits:**

- Simple operational model
- Easier data portability and backups
- Row-level security prevents accidental cross-tenant data access
- Single codebase, no tenant-specific deployments

---

## Core Data Model

### Organization

```sql
organizations (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### User

```sql
users (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Membership

Critical for multi-tenancy: users belong to organizations via roles.

```sql
memberships (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  user_id UUID NOT NULL,
  organization_id UUID NOT NULL,
  role TEXT CHECK (role IN ('admin', 'member', 'viewer')),
  created_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
)
```

### AI/Embeddings Support

Design schema to support vector embeddings for issue similarity and semantic search:

- Store embedding vectors using `pgvector` type
- Index with HNSW or IVFFlat for fast similarity queries
- Update embeddings asynchronously during issue lifecycle events
