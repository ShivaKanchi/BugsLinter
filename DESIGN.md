# Bugslinter Design System

This file is the design source of truth for Bugslinter.

The visual reference is `https://www.clutch.security/`, but the goal is not to clone that brand. The goal is to borrow its discipline: sparse composition, strong typography, structural diagrams, thin separators, and a serious enterprise tone, then translate that language into Bugslinter's delivery-management product.

## Design Intent

Bugslinter should feel:

- calm, precise, and high-trust
- operational rather than promotional
- dark, structured, and information-led
- AI-assisted without looking experimental or gimmicky

Bugslinter should not feel:

- like a bloated admin dashboard
- like a crypto or neon AI startup
- like a generic SaaS page built from repeated feature cards
- like a security vendor clone with shields, locks, or threat-war-room theatrics

## Core Visual Direction

The closest useful references from the Clutch site are:

- oversized headlines with tight line length
- a near-black canvas with restrained cool accents
- very thin dividers instead of heavy card chrome
- diagram-led hero storytelling
- modular sections that alternate between narrative, proof, and system explanation
- strong use of logos, relationship maps, and flow structures instead of decorative illustration

For Bugslinter, that translates to:

- a workflow-led hero instead of a security topology hero
- issue, sprint, release, and knowledge relationships as the primary visual language
- approval, ownership, and state transitions as the recurring UI motif

## Color System

Use dark mode as the primary product and marketing theme.

### Base neutrals

- `--bg-0`: `#060912`
- `--bg-1`: `#0b1120`
- `--bg-2`: `#11192b`
- `--surface-0`: `rgba(14, 20, 35, 0.84)`
- `--surface-1`: `rgba(18, 26, 44, 0.92)`
- `--surface-2`: `rgba(24, 34, 58, 0.96)`
- `--line-subtle`: `rgba(198, 214, 255, 0.12)`
- `--line-strong`: `rgba(198, 214, 255, 0.2)`

### Text roles

- `--text-strong`: `#edf2ff`
- `--text-body`: `#c6d0ea`
- `--text-muted`: `#91a0c4`
- `--text-faint`: `#6f7da0`

### Accent roles

- `--accent-primary`: `#90a8ff`
- `--accent-secondary`: `#79d8f5`
- `--accent-mint`: `#79efc5`
- `--accent-amber`: `#f2c879`
- `--accent-danger`: `#ff7d8f`

### Accent usage rules

- Default state uses neutrals first, accent second.
- Accent should guide meaning, not decorate empty space.
- Blue-cyan is the primary brand lane for navigation, selection, and key calls to action.
- Mint is reserved for approved, healthy, or shipped states.
- Amber is reserved for review, dependency, or caution states.
- Red is reserved for blockers, regressions, or destructive actions.
- Do not use rainbow gradients or multicolor glow stacks.

## Background Strategy

The page background should feel atmospheric, not flat.

Approved approach:

- layered dark background
- one or two large radial glows
- faint grid/noise/scan texture only if it stays subtle
- sectional tonal shifts to separate content blocks

Avoid:

- glossy glassmorphism
- heavy blur panels everywhere
- loud aurora gradients
- purple default AI lighting

## Typography

Typography needs to do most of the brand work.

### Recommended stack

- UI/body: `Inter`, `Geist`, or another neutral grotesk with strong legibility
- Display: `Space Grotesk` is acceptable for hero and section headlines if kept controlled
- Mono: `IBM Plex Mono` or equivalent for issue keys, commit references, labels, and system metadata

### Rules

- Headlines should be large, tight, and compact.
- Body copy should stay readable and measured.
- Do not use gradient text.
- Do not rely on uppercase for whole paragraphs.
- Uppercase should be reserved for labels, kicker text, and metadata.

### Type scale

- Hero H1: `clamp(3.5rem, 7vw, 7rem)`
- Section H2: `clamp(2rem, 4vw, 3.75rem)`
- Card H3: `1.125rem` to `1.5rem`
- Body L: `1.05rem`
- Body M: `0.95rem`
- Meta: `0.72rem` to `0.78rem`

### Tracking and line height

- Large headings: slightly negative tracking
- Meta labels: generous positive tracking
- Body copy: `1.6` to `1.8` line height
- Max paragraph width: `60ch` to `72ch`

## Layout Principles

### Global rhythm

- Prefer wide composition with clear negative space.
- Sections should feel editorial, not boxed into one repeated container.
- Use asymmetry where it improves focus.
- Let hero and key proof sections breathe.

### Container behavior

- Marketing content can use a wide frame around `1200px` to `1320px`.
- Product shell can stretch wider, around `1440px` to `1600px`.
- Avoid centering every element in one narrow stack.

### Spacing

- Section top/bottom spacing should be generous and visibly different between section types.
- Inside panels, keep padding dense enough to feel operational, not loose like a brochure.
- Use spacing changes to indicate hierarchy before adding more borders.

## Shape Language

- Corners should be rounded, but not bubbly.
- Marketing surfaces: `20px` to `32px`
- Product panels: `16px` to `24px`
- Pills and small status tokens: full radius

The UI should feel engineered, not playful.

## Borders, Depth, and Surfaces

The Clutch reference uses linework and contrast more than stacked card treatments. Bugslinter should do the same.

### Surface rules

- Default panel borders should be hairline or near-hairline.
- Depth should come from tonal contrast and restrained shadow, not thick outlines.
- Use one strong surface for a section, then quieter inner subdivisions.
- Avoid card-within-card-within-card nesting unless the inner unit is clearly interactive.

### Shadow rules

- Use deep ambient shadow on hero and major spotlight surfaces.
- Use minimal shadows in dense app views.
- Never use bright outer glow as a default focus state.

## Motion

Motion should clarify flow and state, not show off.

Approved motion:

- fade-up section entry
- staggered reveal for grouped rows
- panel highlight on hover
- lane or issue-state transitions
- subtle graph-line or workflow-line animation

Avoid:

- bouncing counters
- floating blobs
- elastic interactions
- decorative parallax without information value

Use `prefers-reduced-motion` support by default.

## Navigation

### Marketing navigation

- fixed or sticky top navigation
- concise item count
- clear primary CTA
- light visual weight until scroll or hover demands emphasis

### Product navigation

- left rail for major product areas
- current page and current project context always visible
- right rail only when it adds live context, approval state, or AI-assist relevance

## Marketing Page Rules

The landing page should follow this sequence:

1. sharp headline and workflow claim
2. visual workflow map or structured product composition
3. trust or proof strip
4. capability sections grouped by delivery outcome
5. product approach section
6. integration/system context
7. CTA close

### Landing-page content pattern

- Lead with delivery clarity, not feature sprawl.
- Show the issue-to-release workflow visually.
- Use product language grounded in bugs, ownership, testing, release notes, and team coordination.
- Explain AI as context assembly, workflow assistance, and approval support.

### Marketing components

- diagram hero
- proof/logo strip
- capability tab groups
- workflow sequence
- integration wall
- approach/value narrative blocks
- CTA section

Avoid generic three-up feature grids unless they are transformed into a more structured system block.

## Product UI Rules

The product UI should extend the marketing language instead of switching to a different visual identity.

### Product shell

- dark structural shell
- clear page heading zone
- persistent project and sprint context
- sparse but high-value side rails

### Information hierarchy

- state first
- ownership second
- supporting analysis third

Every major view should help the user answer:

- what is blocked
- who owns it
- what changed
- what needs approval
- what ships next

### AI-assist presentation

- AI suggestions belong in contextual side panels, inline support blocks, or review modules
- AI content must feel subordinate to the workflow
- approvals, source context, and confidence should be visible

Do not frame AI as an autonomous primary actor.

## Component Guidance

### Buttons

- Primary CTA: filled cool accent, dark text, strong contrast
- Secondary CTA: outlined or low-fill
- Tertiary CTA: text-plus-arrow or text-plus-icon

### Inputs

- dark surfaces
- subtle border
- clear focus halo
- no overly bright inset glow

### Badges and status pills

- small, quiet, and semantic
- use color sparingly
- always readable on dark backgrounds

### Tables and lists

- prefer structured rows with strong spacing
- allow row highlighting and inline meta clusters
- use subtle separators instead of heavy boxed cells

### Panels

- one dominant idea per panel
- do not fill every panel with icon, heading, paragraph, CTA by default
- some panels should be metric-led, some workflow-led, some narrative-led

### Diagrams

- use diagrams heavily in marketing and selectively in product
- nodes should represent issues, agents, knowledge, releases, or communication channels
- connectors should represent workflow and dependency, not abstract decoration

## Iconography and Imagery

- Use line icons or geometric filled icons sparingly.
- Prefer product diagrams, screenshots, release flows, and relationship maps over stock illustration.
- If screenshots are used, they should be embedded in controlled frames with strong cropping and legible focal points.

## Copy Direction

- Short, declarative, and informed
- No empty hype words
- No vague AI claims
- No fake social proof language
- No overuse of exclamation marks

Preferred tone:

- direct
- observant
- operational
- credible

## What To Borrow From Clutch

- typographic confidence
- dark editorial polish
- structural page pacing
- proof-through-system diagrams
- restrained accent usage
- thin-line enterprise finish

## What Not To Borrow From Clutch

- security-specific metaphors
- identity graphs as-is
- pure black-and-white minimalism without delivery semantics
- excessive vendor logo dependence
- sections that describe security categories irrelevant to Bugslinter's workflow domain

## Direct Implementation Notes For This Repo

The current repo already leans toward this direction in `app/globals.css`, especially:

- dark layered backgrounds
- cool accent palette
- rounded structural panels
- workflow-style hero framing
- operational right-rail context

The next iteration should refine that work by:

- reducing glass-like blur dependence
- tightening typography around fewer, larger headline statements
- making marketing sections more diagram-led and less panel-repetitive
- using more thin-line separators and fewer generic card stacks
- making the app shell feel closer to a serious operating surface

## Design Review Checklist

Before shipping a page, confirm:

- the page can be identified by its workflow purpose in under 5 seconds
- the most important action is obvious without loud color overuse
- the section rhythm is varied
- the page does not collapse into repeated feature cards
- AI is visible but not theatrical
- all status colors carry meaning
- dark surfaces remain legible at every hierarchy level
- the design still feels like Bugslinter, not a security-company copy
