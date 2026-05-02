---
type: operating-doc
tags: [wiki, llm, knowledge-management]
source: []
last_updated: 2026-05-01T20:30:00+05:30
confidence: high
---

# LLM Wiki Idea

This wiki uses an LLM-maintained knowledge base instead of one-off retrieval from raw documents. Raw sources are read once, compiled into linked markdown pages, and preserved as immutable evidence in `ingested/`.

## Core Pattern

- `raw/` is the inbox for new, unprocessed source files.
- `ingested/` stores consumed source files with dated filenames.
- Human-facing wiki pages live in reusable topic folders such as `summaries/`, `entities/`, and `concepts/`.
- Each topic folder has a same-name directory page, such as `entities/entities.md`.
- AI-facing operating instructions live in root underscore files: `_init.md`, `_update.md`, and `_template.md`.
- `index.md` is the root navigation entrypoint.
- `log.md` is the append-only history of ingests, queries, lint passes, and restructures.
- The linked graph uses two hubs: `index.md` links generated wiki directories and `log.md`; `README.md` links setup and agent instruction files.

## Why This Exists

The goal is to make knowledge compound. Each new source should update the persistent synthesis, not force future agents to rediscover the same facts from scratch. The wiki should accumulate cross-links, contradictions, unresolved questions, decisions, and reusable summaries.

## Ownership Model

- Humans curate sources, ask questions, and review the wiki.
- The LLM maintains structure, page updates, links, directory pages, and logs.
- Raw sources are never edited after ingestion.
- Generated wiki pages can be rewritten when newer sources improve or contradict earlier understanding.

## Operating Principles

- Prefer durable topic pages over duplicating large source sections.
- Use Obsidian links for relationships.
- Preserve source attribution on every generated page.
- Flag weak claims, contradictions, and missing evidence.
- Keep pages useful to humans first, while giving AI agents enough metadata and links to operate safely.
