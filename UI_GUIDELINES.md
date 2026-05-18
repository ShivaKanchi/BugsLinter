# Bugslinter UI Design Guidelines

This document explains how to apply the visual direction from [DESIGN.md](/C:/Shiva/Projects/bugslinter/DESIGN.md) to the actual Bugslinter surfaces.

The reference influence comes from [Clutch Security](https://www.clutch.security/), specifically its strong type hierarchy, sparse high-trust layout, and diagram-first storytelling. These guidelines translate that approach into Bugslinter's delivery workflow product.

## Working Principle

Every Bugslinter page should answer one operational question clearly.

- Landing page: Why is this a better way to run software delivery?
- Dashboard: What needs attention right now?
- Board: What is moving, stuck, or waiting?
- Issue detail: What does this bug mean, and what should happen next?
- Knowledge base: What context already exists?
- Release notes: What is safe to ship, and what still needs review?

If a page cannot answer its core question visually, the page is too generic.

## Shared UI Behavior

### 1. Lead with structure

Do not start sections with decorative filler. Start with one of these:

- a strong headline
- a workflow map
- a proof row
- a state summary
- a context rail

### 2. Build around workflow

The recurring visual system should revolve around:

- issue intake
- assignment
- sprint movement
- AI context
- testing handoff
- release approval
- live status

### 3. Keep AI in support position

AI blocks should appear as:

- suggested issue context
- grouped evidence
- proposed release summary
- knowledge extraction
- handoff drafting

They should not dominate the page or replace ownership UI.

### 4. Prefer operational density over marketing fluff

Dense is acceptable when the density is meaningful. The user should see:

- ownership
- status
- dependencies
- next step
- confidence or approval state

## Page-Specific Guidelines

## Landing Page

### Goal

Show Bugslinter as a calmer, clearer delivery operating layer for software teams.

### Recommended structure

1. Fixed top nav with `Book a demo` and `Login`
2. Large hero statement with short supporting copy
3. Central visual workflow composition
4. Proof strip or trust row
5. Capability groups by delivery outcome
6. Product approach section
7. Integration and release-flow proof
8. Final CTA

### Hero behavior

The hero should not be a screenshot floating in space. It should be a composed system story:

- issue intake node
- AI context node
- assignee/workflow lane
- testing step
- release note approval step
- knowledge base continuity

The current `hero-frame`, `workflow-node`, and `hero-ai-core` direction in [app/globals.css](/C:/Shiva/Projects/bugslinter/app/globals.css) is the correct foundation. Push it further toward a structured diagram and away from generic stacked product cards.

### Landing-page do and don't

- Do use one large message and one strong workflow visual.
- Do show product proof with context and structure.
- Do keep sections visually distinct.
- Do not add fake customer quotes or vanity metrics.
- Do not use three identical feature cards with abstract AI copy.
- Do not turn the page into a generic SaaS template.

## Product Shell

### Goal

Make every app page feel like part of one delivery control system.

### Required shell elements

- left navigation rail
- central page heading zone
- optional right context rail
- visible workspace or project identity
- visible state/action zone

The current shell in [app/_components/future-suite.tsx](/C:/Shiva/Projects/bugslinter/app/_components/future-suite.tsx) is directionally right. The refinement target is to make it less card-based and more like an operating surface with clear structural rails and lighter separators.

### Navigation rules

- Keep nav labels short.
- Avoid excessive icons in the main rail.
- Use selection state with tone and border, not neon effects.
- Preserve visible hierarchy between workspace context, navigation, and shared rules.

## Dashboard

### Goal

Give leads an immediate understanding of delivery health.

### Layout pattern

- top summary band
- high-priority issue cluster
- sprint and release state
- AI-assist summary
- channel or communication visibility
- right rail with risks, approvals, and cross-project signals

### Visual behavior

- Metrics should be contextual, not ornamental.
- Highlight blockers and approval waits first.
- Use list modules and state groupings more than oversized number tiles.
- If metrics are shown, pair each with an operational note.

## Backlog

### Goal

Make intake and prioritization faster to scan.

### UI rules

- Rows should foreground key, title, priority, owner, and signal strength.
- Filters should stay compact and top-aligned.
- AI hints should be tucked into the row or detail preview, not interrupt the list rhythm.
- Use subtle row separators and selected-row emphasis.

## Board

### Goal

Make motion and blockage obvious.

### UI rules

- Lanes should read as structural containers, not decorative columns.
- Cards should stay compact and show only the most important metadata.
- Selected issue state should open a stronger contextual detail area.
- AI support should appear in the selected issue context, not on every card.

The `BoardLane` direction in [app/_components/future-suite.tsx](/C:/Shiva/Projects/bugslinter/app/_components/future-suite.tsx) should evolve toward thinner separators, stronger lane titles, and less generic card fill.

## Issue Detail

### Goal

Show the full bug story without overwhelming the user.

### Recommended composition

- issue heading and state row
- summary and repro/problem area
- ownership, sprint, and release linkage
- timeline or change history
- comments and decision record
- AI context panel with linked evidence

### Rules

- Keep the issue title prominent.
- Use mono styling for keys, branch names, and commit references.
- Use section dividers instead of stacking too many bordered boxes.
- Approval and testing handoff should be clearly visible if relevant.

## Knowledge Base

### Goal

Make stored context feel live and operational, not like a dead document library.

### UI rules

- Search should be visually central.
- Result summaries should show relevance, scope, and reuse value.
- Cross-links to issues, releases, and projects should be visible.
- AI summaries must reveal source linkage.

## Release Notes

### Goal

Make shipping confidence legible.

### UI rules

- Separate draft, review, approved, and published states clearly.
- Show commit and PR provenance near the note block.
- Show testing readiness and human approval as first-class states.
- Export actions should feel deliberate, not casual.

This page should feel especially aligned with the Clutch reference in tone: big clarity, serious finishing, minimal noise.

## Team and Communication

### Goal

Show ownership and delivery communication as part of the same system.

### UI rules

- Team members should be grouped by ownership and active work.
- Communication channels should appear as workflow-connected surfaces.
- Do not make this a generic HR directory.

## Responsive Rules

### Marketing

- Preserve the hero hierarchy on mobile.
- Collapse the workflow visual into a readable sequence, not a broken mini-diagram.
- Keep nav and CTA obvious.

### Product

- Mobile should prioritize issue detail, dashboard summary, and board state switching.
- Avoid forcing full multi-column app layouts onto narrow screens.
- Side rails should collapse into stacked context blocks or drawers.

## Interaction Guidelines

### Hover

- subtle brightness or border lift
- no large motion jumps

### Focus

- clear visible ring
- strong contrast against dark surfaces

### Selection

- use accent background tint plus border change
- do not rely on color alone if a dense list is in view

### Empty states

- practical and directive
- explain what to do next
- avoid cute illustrations unless they reinforce workflow understanding

## Content Guidelines

- Headlines should make one clear point.
- Subcopy should explain consequence or workflow value.
- Labels should be short and predictable.
- Metadata should feel systematic, not chatty.
- CTA copy should be direct: `Book a demo`, `Review draft`, `Assign owner`, `Approve release`.

## Current Repo Translation

These guidelines should inform the next iterations of:

- [app/globals.css](/C:/Shiva/Projects/bugslinter/app/globals.css)
- [app/_components/future-suite.tsx](/C:/Shiva/Projects/bugslinter/app/_components/future-suite.tsx)
- [docs/landing-page-context.md](/C:/Shiva/Projects/bugslinter/docs/landing-page-context.md)
- [docs/product-pages-context.md](/C:/Shiva/Projects/bugslinter/docs/product-pages-context.md)

## Review Checklist

Before approving a UI direction, verify:

- the page has one dominant purpose
- the hierarchy is visible from a zoomed-out view
- the layout uses structure, not repetitive card filler
- accent color is meaningful
- AI appears as assistance, not spectacle
- product trust is coming from clarity, not decoration
- the page still matches Bugslinter's workflow story
