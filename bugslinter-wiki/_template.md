---
type: operating-doc
tags: [wiki, templates, metadata]
source: []
last_updated: 2026-05-01T20:30:00+05:30
confidence: high
---

# Wiki Templates

Use these conventions for generated wiki pages.

## Frontmatter

```yaml
---
type: concept
tags: [example]
source:
  - ingested/YYYY-MM-DD-source-name.md
last_updated: YYYY-MM-DDTHH:mm:ss+05:30
confidence: medium
---
```

Required fields:

- `type`: one of `index`, `summary`, `entity`, `concept`, or `operating-doc`.
- `tags`: short lowercase tags.
- `source`: one or more source files under `ingested/`, or an empty list for operating and directory pages.
- `last_updated`: local ISO datetime with timezone offset, such as `2026-05-01T20:30:00+05:30`.
- `confidence`: `high`, `medium`, or `low`.

## Standard Page Shape

```markdown
# Page Title

## Summary

One short paragraph explaining the page.

## Key Facts

- Durable facts extracted from sources.

## Implications

- What the facts mean for the project, research direction, or future work.

## Relationships

- Links to related pages.

## Source Notes

- Compiled from the archived source file under `ingested/`, sections X-Y.
```

## Directory Page Shape

```markdown
# Entities

- Add generated entity pages here, such as entities/example-company.md.
```

When pages exist, replace the placeholder sentence with links to every generated page in the folder.

## Link Rules

- Use explicit links with aliases when linking across folders, such as `[[entities/entities|Entities]]`.
- Prefer one canonical page per durable topic.
- Link first mentions in each page section when useful.
- Avoid links to raw files.
- If a linked page does not exist, create it or remove the link.
- Do not create `index.md` inside topic folders; use same-name directory pages instead.

## Source Attribution Rules

- Generated pages should summarize and synthesize; do not duplicate long source text.
- Preserve important numbers, claims, and caveats.
- Note contradictions when a newer source disputes an older one.
- Use `confidence: low` when claims are speculative or thinly sourced.
