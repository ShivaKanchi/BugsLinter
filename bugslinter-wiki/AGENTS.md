# LLM Wiki Agent Instructions

This repository is a generic LLM wiki starter: a personal or project knowledge base maintained by AI coding agents and curated by a human. It follows the LLM Wiki pattern popularized by Andrej Karpathy.

## Purpose

The wiki turns raw source files into a structured, interlinked markdown knowledge base. The human curates sources, asks questions, reviews outputs, and guides analysis. The agent maintains wiki structure, generated pages, links, folder directories, and logs.

Before changing wiki content, read:

- `README.md`
- `_idea.md`
- `_template.md`
- `index.md`
- `log.md`

## Folder Structure

```text
raw/                    source inbox; never edit source file contents
ingested/               consumed source archive; never edit archived source contents
summaries/              source summaries and synthesis pages
summaries/summaries.md  directory page for summaries
entities/               named things such as people, products, tools, companies, systems, or standards
entities/entities.md    directory page for entities
concepts/               durable ideas, patterns, definitions, and reusable knowledge
concepts/concepts.md    directory page for concepts
index.md                root table of contents for the wiki
log.md                  append-only record of operations
```

Do not create `index.md` inside topic folders. Folder directory pages must use the folder name, such as `entities/entities.md`.

Optional domain folders can be added only when useful, for example `product/`, `market/`, `risks/`, `comparisons/`, or `architecture/`. If you add one, also add its same-name directory page, such as `architecture/architecture.md`.

## Ingest Workflow

When the user adds a new source to `raw/` and asks you to ingest it:

1. Read the full source document.
2. Identify key takeaways before writing generated pages.
3. Create a summary page in `summaries/` named after the source.
4. Create or update concept pages for each major reusable idea.
5. Create or update entity pages for each major named person, product, company, tool, standard, system, or organization.
6. Add Obsidian links with aliases, for example `[[entities/entities|Entities]]`.
7. Update `index.md` with important new entrypoints.
8. Update every affected folder directory page with links and one-line descriptions.
9. Move the processed source from `raw/` to `ingested/YYYY-MM-DD-original-name.md` without editing its contents.
10. Append an entry to `log.md` with the timestamp, source name, unresolved issues, and one changed-file line per created or updated file.

Use this exact changed-file format in `log.md`:

```text
create - summaries/example-source.md
update - concepts/example-concept.md
update - index.md
update - log.md
```

Use `create - <file-path>` for new files and `update - <file-path>` for existing files. Paths should be relative to the repository root.

A single source may touch 10-15 wiki pages. That is normal when the source contains many durable concepts or entities.

## Page Format

Every generated wiki page should use frontmatter:

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

Use this page shape unless `_template.md` says otherwise:

```markdown
# Page Title

## Summary

One short paragraph explaining this page.

## Key Facts

- Durable facts extracted from source files.

## Implications

- What the facts mean for the project, research direction, or future work.

## Relationships

- Links to related pages.

## Source Notes

- Compiled from archived source files under `ingested/`.
```

## Citation Rules

- Every factual claim should be traceable to a source file.
- Prefer source references in frontmatter and concise source notes in the page body.
- Use `(source: ingested/file-name.md)` when a specific claim needs inline attribution.
- If two sources disagree, note the contradiction explicitly.
- If a claim has no source, mark it as needing verification.

## Question Answering

When the user asks a question:

1. Read `index.md` first to find relevant pages.
2. Read relevant folder directory pages and topic pages.
3. Synthesize an answer from the wiki.
4. Cite specific wiki pages in the response.
5. If the answer is not in the wiki, say so clearly.
6. If the answer is valuable and durable, offer to save it as a new wiki page.

Good answers should be filed back into the wiki when the user wants the knowledge to compound over time.

## Lint And Audit

When the user asks you to lint or audit the wiki:

- Check for broken Obsidian links.
- Check for source references that do not point to files under `ingested/`.
- Check for contradictions between pages.
- Find orphan pages not linked from `index.md` or folder directory pages.
- Identify important concepts or entities mentioned in pages that lack their own page.
- Flag claims that may be outdated based on newer sources.
- Check that all pages follow the required frontmatter and page format.
- Check that no topic folder contains `index.md`.
- Report findings as a numbered list with suggested fixes.

## Rules

- Never edit source file contents in `raw/` or `ingested/`.
- Always update `index.md`, relevant folder directory pages, and `log.md` after wiki content changes.
- Keep graph links intentional: `index.md` links `summaries/`, `entities/`, `concepts/`, and `log.md`; `README.md` links setup and agent instruction files.
- Keep page names lowercase with hyphens, for example `machine-learning.md`.
- Use local ISO timestamps with timezone offsets for `last_updated`.
- Write in clear, plain language.
- When uncertain about how to categorize something, ask the user.
