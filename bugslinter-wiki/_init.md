---
type: operating-doc
tags: [wiki, bootstrap, reusable-workflow]
source: []
last_updated: 2026-05-01T20:30:00+05:30
confidence: high
---

# Init Workflow

Use this file to create this wiki pattern in a new project or reset an empty wiki.

## Required Structure

Create these root files:

- `_idea.md` - philosophy and operating model.
- `_init.md` - bootstrap workflow for new projects.
- `_update.md` - repeatable ingest/update workflow.
- `_template.md` - page templates, metadata, and linking rules.
- `index.md` - human and AI entrypoint.
- `log.md` - append-only history.

Create these core folders:

- `raw/` - inbox for unprocessed source files.
- `ingested/` - consumed source archive.
- `summaries/` - source and synthesis summaries.
- `entities/` - people, products, companies, tools, standards, systems, or other named things.
- `concepts/` - durable ideas, patterns, definitions, and reusable knowledge.

## Folder Directory Pages

Do not create `index.md` inside topic folders. Create a same-name directory page instead:

- `summaries/summaries.md`
- `entities/entities.md`
- `concepts/concepts.md`

Each directory page should link every generated markdown page in that folder except itself.

## Bootstrap Steps

1. Create the root operating files and core folders.
2. Add same-name directory pages for every topic folder.
3. Move any already-consumed raw sources into `ingested/` with dated filenames.
4. Compile the first source into durable wiki pages using `_template.md`.
5. Update `index.md` with the most important entrypoints.
6. Append a `log.md` entry describing the initialization.

## Reuse Guidance

Keep the core workflow stable and add domain folders only when needed. A product wiki may add `product/`, `market/`, `risks/`, and `comparisons/`; an engineering wiki may add `architecture/`, `decisions/`, and `incidents/`; a legal research wiki may add `cases/` and `statutes/`.
