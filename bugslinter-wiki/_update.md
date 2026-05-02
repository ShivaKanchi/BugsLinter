---
type: operating-doc
tags: [wiki, ingestion, maintenance]
source: []
last_updated: 2026-05-01T20:30:00+05:30
confidence: high
---

# Update Workflow

Use this workflow whenever new files are dropped into `raw/` or when the wiki needs a maintenance pass.

## Read First

Before editing generated pages, read these files:

- `_template.md`
- `index.md`
- `log.md`

Then scan `raw/` for processable source files.

## Ingest Steps

1. Identify raw files and ignore placeholders such as `.gitkeep`.
2. Read each source and extract durable information:
   - summaries
   - entities
   - concepts
   - decisions
   - assumptions
   - contradictions
   - open questions
3. Update existing pages first when a topic already exists.
4. Create new pages only for durable topics that will likely be reused.
5. Use explicit Obsidian links with path aliases, for example `[[entities/entities|Entities]]`.
6. Refresh `index.md` and same-name folder directory pages after page changes.
7. Append a `log.md` entry with files processed, unresolved issues, and one changed-file line per created or updated file.
8. Move consumed sources from `raw/` to `ingested/` using `YYYY-MM-DD-original-name.md`.

## Log Entry Format

Every content change must be listed in `log.md` with one action line per file:

```text
create - summaries/example-source.md
update - concepts/example-concept.md
update - index.md
update - log.md
```

Use `create - <file-path>` for new files and `update - <file-path>` for existing files. Paths should be relative to the repository root.

## Graph Hygiene

Use Obsidian links intentionally. `index.md` should link only the main wiki directory pages and `log.md`; `README.md` should link setup and agent instruction files such as `_idea.md`, `_init.md`, `_update.md`, `_template.md`, and `AGENTS.md`.

## Link and Source Checks

After updates:

- Every generated markdown page should include frontmatter with `type`, `tags`, `source`, `last_updated`, and `confidence`.
- Every `last_updated` value should use local ISO datetime with timezone offset.
- Every source reference should point to `ingested/`, not `raw/`.
- Every Obsidian wiki link should resolve to an existing markdown file or be documented as an intentional placeholder.
- No topic folder should contain `index.md`.
- `raw/` should be empty except for placeholders.
- Large source sections should not be copied wholesale into generated pages.

## Maintenance Pass

When asked to lint or refresh the wiki:

- Find orphan pages not linked from `index.md` or a same-name folder directory page.
- Find links that do not resolve.
- Find pages whose source files no longer exist.
- Find stale claims superseded by newer sources.
- Find repeated content that should be consolidated.
- Suggest new source files or research questions where evidence is thin.
