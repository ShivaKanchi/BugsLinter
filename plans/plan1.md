Based on the wiki and the current repo state, our next plan should be a **lean MVP**, not the full Jira-scale architecture yet.

The wiki points to core issue tracking first: issue CRUD, projects, users/auth, roles, basic Kanban/Scrum boards, search, notifications, and only then AI features like summarization, work breakdown, and triage. The current app is still the default Next.js shell, so we should start with product foundation.

**Recommended Next Plan**

1. **Lock MVP scope**
   Focus on a developer-first issue tracker:
   - Projects
   - Issues
   - Status workflow: `Backlog`, `Todo`, `In Progress`, `Review`, `Done`
   - Kanban board
   - Basic users/roles
   - Search/filtering
   - Activity/comments

2. **Defer heavy architecture**
   Do not start with Kubernetes, microservices, vector DB, marketplace, advanced dashboards, or model training. The wiki names these as later-stage concerns. For now, use a modular Next.js app with clean domain boundaries and a simple persistence layer.

3. **Design the data model**
   Start with:
   - `Organization`
   - `User`
   - `Project`
   - `Issue`
   - `Comment`
   - `IssueActivity`
   - `WorkflowStatus`

   Include `tenantId` from day one so we do not paint ourselves into a corner on multi-tenancy.

4. **Build the first usable prototype**
   Replace the default homepage with:
   - project sidebar
   - issue list
   - issue detail drawer/page
   - Kanban board
   - create/edit issue flow
   - seeded demo data

5. **Add AI only after core flows work**
   First AI feature should be low-risk and assistive:
   - summarize long issue threads
   - rewrite issue description
   - suggest issue type/priority

   Avoid auto-triage decisions until we have enough data and human-review UX.

6. **Create durable wiki pages**
   The plan itself should be saved back into the wiki, probably as:
   - `product/mvp-scope.md`
   - `architecture/initial-architecture.md`
   - `product/roadmap.md`

Main source pages I used: [Deep Research Report](/C:/Shiva/Projects/bugslinter/llm-wiki/summaries/deep-research-report.md:1), [AI-Augmented Issue Tracking](/C:/Shiva/Projects/bugslinter/llm-wiki/concepts/ai-augmented-issue-tracking.md:1), [AI Triage](/C:/Shiva/Projects/bugslinter/llm-wiki/concepts/ai-triage.md:1), and [Multi-Tenancy](/C:/Shiva/Projects/bugslinter/llm-wiki/concepts/multi-tenancy.md:1).

The immediate next implementation step should be: **turn the app into a polished static MVP prototype with seeded issue/project data**, then add persistence and auth after the UX is clear.
