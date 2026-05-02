# LLM Wiki Generator

A generic, AI-maintained markdown wiki starter that turns raw documents into a persistent, structured knowledge base with summaries, entities, concepts, source attribution, and maintenance logs.

## What is an LLM Wiki?

An LLM Wiki is a knowledge base that compounds over time. Instead of forcing future agents to rediscover facts from every new document, sources are read once, distilled into durable pages (summaries, entities, concepts), and linked together. The raw sources stay immutable in an archive; the generated wiki grows and improves with each new source. Humans curate sources and review outputs; AI agents maintain structure and handle ingestion.

---

## Why Use It?

- **Compounding Knowledge**: Each source improves the persistent synthesis, not a temporary retrieval. New facts build on previous understanding.
- **Structured Attribution**: Every claim is traceable to source files. Contradictions are explicit. Confidence is tracked.
- **AI-Ready Metadata**: Frontmatter and Obsidian links make pages queryable and traversable for AI agents maintaining the wiki.
- **Obsidian Integration**: Full markdown format works in Obsidian; use graph view to explore relationships across summaries, entities, and concepts.
- **Source Immutability**: Ingested sources never change, creating an audit trail. Generated pages can evolve as understanding improves.

---

## The Pattern

```
raw/
├── your-new-document.pdf
└── research-report.md
     ↓
    (AI agent ingests)
     ↓
ingested/
├── 2026-05-01-your-new-document.pdf
└── 2026-05-01-research-report.md

Generated wiki pages:
summaries/
├── summaries.md
└── your-new-document.md (one-page synthesis)

entities/
├── entities.md
├── person-name.md
└── company-name.md

concepts/
├── concepts.md
└── durable-idea.md
```

**Flow**: Put raw sources in `raw/` → Ask your AI agent to ingest → Agent reads, extracts, creates/updates wiki pages → Agent moves source to `ingested/` with timestamp → Human reviews and refines.

---

## Core Concepts

### Ownership Model

- **Humans**: Curate sources, ask questions, review generated pages, decide what topics matter.
- **AI Agents**: Maintain structure, ingest sources, create and update wiki pages, manage links and logs.

### Folder Structure

- **`raw/`** — Inbox for new, unprocessed source files. Never edit contents.
- **`ingested/`** — Archive of consumed sources with datestamps: `YYYY-MM-DD-original-name.md`. Immutable.
- **`summaries/`** — One-page extractions and syntheses of source documents.
- **`entities/`** — Named things: people, products, companies, tools, standards, systems, organizations.
- **`concepts/`** — Durable ideas, patterns, definitions, and reusable knowledge.
- **`index.md`** — Wiki entry point; links to topic folders and log.
- **`log.md`** — Append-only history of every ingest, maintenance pass, and structural change.

### Operating Files (for AI agents)

- **`_init.md`** — Bootstrap workflow for new projects.
- **`_update.md`** — Repeatable ingest and maintenance workflow.
- **`_template.md`** — Page templates, metadata rules, linking conventions.
- **`AGENTS.md`** — Agent-specific rules and constraints.
- **`_idea.md`** — Operating model and philosophy.

---

## Getting Started

### For New Projects

1. **Fork or copy this repository** into your project.
2. **Read the setup guide**: Point your AI agent to [\_init.md](_init.md).

   **Example prompt to agent**:

   ```
   Follow the init workflow in _init.md to bootstrap the wiki.
   ```

3. **Verify structure**: Confirm these folders and files exist:
   - `raw/`, `ingested/`, `summaries/`, `entities/`, `concepts/`
   - `_init.md`, `_update.md`, `_template.md`, `AGENTS.md`, `_idea.md`
   - `index.md`, `log.md`, `README.md`

### For Adding Sources

1. **Place your source files in `raw/`**.
   - Examples: research PDFs, markdown reports, documentation, analysis.

2. **Ask your AI agent to ingest**:

   **Example prompt to agent**:

   ```
   Follow the update workflow in _update.md to ingest sources from raw/.
   ```

3. **Review the generated pages** in `summaries/`, `entities/`, and `concepts/`.

4. **The agent will**:
   - Read each source once
   - Extract durable summaries, entities, and concepts
   - Create new wiki pages or update existing ones
   - Move processed sources to `ingested/` with timestamps
   - Update folder directory pages and `index.md`
   - Log all changes in `log.md`

---

## Workflows

### New Projects: \_init.md

Use [\_init.md](_init.md) to bootstrap the wiki structure. The workflow:

1. Creates root files and core folders.
2. Sets up folder directory pages (`entities/entities.md`, `concepts/concepts.md`, `summaries/summaries.md`).
3. Archives any pre-existing sources into `ingested/` with timestamps.
4. Compiles the first source into durable wiki pages.
5. Initializes `log.md` with bootstrap entry.

**Tell your agent**: "Follow the init workflow in \_init.md to bootstrap this wiki."

### Adding Sources: \_update.md

Use [\_update.md](_update.md) whenever new files are dropped into `raw/` or when the wiki needs maintenance. The workflow:

1. Scan `raw/` for processable files.
2. Read each source and extract:
   - Summaries (one-page extractions)
   - Entities (named things: people, products, companies, tools, systems)
   - Concepts (durable ideas, patterns, definitions, reusable knowledge)
   - Decisions, assumptions, contradictions, open questions
3. Update existing pages first when a topic already exists.
4. Create new pages only for durable topics likely to be reused.
5. Use Obsidian links to connect pages: `[[entities/entities|Entities]]`.
6. Refresh `index.md` and folder directory pages.
7. Move consumed sources to `ingested/YYYY-MM-DD-original-name.md`.
8. Append a log entry with files processed, issues, and changed files.

**Tell your agent**: "Follow the update workflow in \_update.md to ingest raw/ sources."

---

## Examples

### Real Workflow: AI-Augmented Issue Tracker with Deep Research

Here's a concrete walkthrough of how the LLM Wiki helped an AI-augmented issue tracking system incorporate deep research findings.

#### Setup

The project `ai-augmented-issue-tracking` forked this wiki boilerplate into its codebase. The goal: turn a deep research report into a structured knowledge base that informs issue categorization and prioritization.

#### Source Document

A 50-page research report `deep-research-report.md` was placed in `raw/`:

```
ai-augmented-issue-tracking/
├── wiki/
│   ├── raw/
│   │   └── deep-research-report.md
│   ├── ingested/
│   ├── summaries/
│   ├── entities/
│   ├── concepts/
│   └── ...
├── src/
│   ├── issue-tracker/
│   └── agent/
└── README.md
```

#### Agent Invocation

The project's AI coding agent (Codex) was given:

```
Follow the update workflow in _update.md to ingest raw/ sources.
```

#### What the Agent Did

1. **Read** the entire deep-research-report.md.
2. **Extracted** key entities:
   - `entities/research-framework.md` — The meta-methodology
   - `entities/stakeholder-groups.md` — People/roles mentioned
   - `entities/tools-and-standards.md` — Technologies referenced

3. **Extracted** durable concepts:
   - `concepts/issue-severity-taxonomy.md` — How to classify severity based on research
   - `concepts/multi-stakeholder-prioritization.md` — Balancing different stakeholder needs
   - `concepts/research-driven-triage.md` — Using research to inform triage

4. **Created** a summary:
   - `summaries/deep-research-report.md` — One-page synthesis

5. **Updated** `index.md` and folder directory pages with links.

6. **Archived** the source:
   - Moved `raw/deep-research-report.md` → `ingested/2026-05-01-deep-research-report.md`

7. **Logged** the operation:

   ```
   2026-05-01T14:30:00+05:30 | Ingested deep-research-report.md
   unresolved issues: None

   create - summaries/deep-research-report.md
   create - entities/research-framework.md
   create - entities/stakeholder-groups.md
   create - entities/tools-and-standards.md
   create - concepts/issue-severity-taxonomy.md
   create - concepts/multi-stakeholder-prioritization.md
   create - concepts/research-driven-triage.md
   update - index.md
   update - summaries/summaries.md
   update - entities/entities.md
   update - concepts/concepts.md
   update - log.md
   ```

#### Outcome

The issue tracker's agent could now reference structured, linked concepts when categorizing new issues. Instead of re-reading the 50-page report, the agent could query `concepts/issue-severity-taxonomy.md` and traverse related entities and summaries.

#### Result Structure

The team could now:

- Use Obsidian to browse research findings and cross-references.
- Query the wiki to answer research questions without re-reading sources.
- Version the research knowledge separately from the codebase.
- Accumulate more research reports over time, compounding the knowledge.

---

## Detailed Reference

### Folder Directory Pages

Do not create `index.md` inside topic folders. Instead, create a same-name directory page:

- `summaries/summaries.md`
- `entities/entities.md`
- `concepts/concepts.md`

Each directory page should link every generated markdown page in that folder (except itself) and include one-line descriptions. Example:

```markdown
# Entities

- [[entities/research-framework|Research Framework]] — The meta-methodology
- [[entities/stakeholder-groups|Stakeholder Groups]] — People and roles mentioned
- [[entities/tools-and-standards|Tools and Standards]] — Referenced technologies
```

### Metadata and Frontmatter

Every generated wiki page must include frontmatter:

```yaml
---
type: concept
tags: [example, reusable]
source:
  - ingested/2026-05-01-example-source.md
last_updated: 2026-05-01T20:30:00+05:30
confidence: medium
---
```

- **`type`**: `concept`, `entity`, `summary`
- **`tags`**: Searchable keywords for the page
- **`source`**: List of ingested files that informed this page (can be empty)
- **`last_updated`**: Local ISO datetime with timezone offset
- **`confidence`**: `high`, `medium`, or `low` (reflects how well-sourced the page is)

### Page Shape

Generated pages should follow this structure:

```markdown
# Page Title

## Summary

One short paragraph explaining this page.

## Key Facts

- Durable facts extracted from source files.

## Implications

- What the facts mean for the project, research direction, or future work.

## Relationships

- [[related-page|Description of relationship]].

## Source Notes

- Compiled from archived sources under `ingested/`.
```

See [\_template.md](_template.md) for full templates and citation rules.

### Logging

Use `log.md` as the append-only maintenance history. Every content change must be logged with one action line per file:

```text
2026-05-01T14:30:00+05:30 | Ingested deep-research-report.md
unresolved issues: None

create - summaries/example-source.md
update - concepts/example-concept.md
update - index.md
update - log.md
```

Use `create - <file-path>` for new files and `update - <file-path>` for existing files.

### Optional Domain Folders

Create extra folders only when your project domain clearly needs them. Common examples:

- **`product/`** — requirements, personas, roadmap, and product decisions
- **`market/`** — competitors, pricing, positioning, and go-to-market
- **`risks/`** — risks, mitigations, assumptions, and open questions
- **`architecture/`** — system design, data models, APIs, security, infrastructure
- **`comparisons/`** — side-by-side evaluations
- **`decisions/`** — architectural or strategic decisions with rationale
- **`incidents/`** — postmortems and learnings from past issues

If you add one, also add a same-name directory page, such as `architecture/architecture.md`.

### Validation Checklist

Before considering ingestion complete:

- ✅ Every Obsidian link resolves to an existing markdown file
- ✅ Every `source:` entry points to a file under `ingested/` or is empty
- ✅ No topic folder contains `index.md`; use folder-name directory pages instead
- ✅ `raw/` is empty except for placeholders after ingestion
- ✅ `ingested/` contains only consumed, immutable source files with `YYYY-MM-DD-` prefix
- ✅ Generated pages summarize and synthesize instead of copying large source sections
- ✅ All `last_updated` values use local ISO datetime with timezone offset
- ✅ Contradictions between sources are documented explicitly on affected pages

---

## Learn More

- **[\_idea.md](_idea.md)** — Operating model, why this pattern exists, ownership model
- **[\_init.md](_init.md)** — Bootstrap workflow for new projects
- **[\_update.md](_update.md)** — Repeatable ingest and maintenance workflow
- **[\_template.md](_template.md)** — Page templates, metadata rules, citation conventions
- **[AGENTS.md](AGENTS.md)** — AI agent-specific rules and constraints
- **[index.md](index.md)** — Wiki entry point and navigation

---

## Credits

This project is inspired by Andrej Karpathy's LLM Wiki idea. See his profile at [gist.github.com/karpathy](https://gist.github.com/karpathy) and the original gist [karpathy/llm-wiki.md](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).
