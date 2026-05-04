# Decomposition Rules

Rules for breaking down work into executable units.

---

## Rule 1: Tasks must be executable, not aspirational

A task is valid only if a person can sit down and complete it today.

**Invalid (aspirational):**
- "Improve authentication security"
- "Make the UI better"
- "Handle errors properly"

**Valid (executable):**
- "Add rate limiting to the `/auth/login` endpoint: max 5 attempts per IP per 10 minutes, return 429 on breach"
- "Replace the error boundary in `src/components/Dashboard.tsx` to show an inline error message instead of a blank screen"
- "Add try/catch to `fetchUserProfile()` in `src/api/user.ts` and return a typed `ApiError` instead of throwing"

---

## Rule 2: One task = one clear completion state

Each task must have exactly one answer to "is this done?"

If a task has two completion states, it is two tasks.

**Split this:**
"Implement user authentication and add tests"
→ Task 1: Implement user authentication (endpoint, middleware, session creation)
→ Task 2: Write integration tests for the auth flow (login, logout, invalid token)

---

## Rule 3: Order by dependency, not by importance

Tasks must be ordered so that each task's prerequisites are completed before it.

Never order by:
- Importance
- How much you care about it
- Alphabetically

Always order by:
- Which tasks unlock other tasks
- Which tasks gather information needed for downstream decisions
- Which tasks reduce risk earliest

---

## Rule 4: Five precise tasks beat twenty vague ones

A breakdown of 5 well-scoped tasks is more useful than 20 items that each require clarification before they can be started.

When tempted to add more tasks, ask: "Could this be done as a sub-step of an existing task without losing clarity?"

For large work items, produce a top-level breakdown of 5–8 tasks, then expand each one on demand.

---

## Rule 5: Surface blockers before tasks

If any task cannot start until an external condition is met, list that blocker before the task.

Format:
```
**Blocker:** [Description of what must be resolved first]
  - [ ] Task that depends on the blocker
```

Example:
```
**Blocker:** API contract for /users endpoint must be finalized with the backend team
  - [ ] Implement frontend user fetch hook using the finalized contract
```

---

## Rule 6: Use active voice and name the actor

Every task must start with a verb. The actor is the person executing the task.

- "Define the data model for user profiles"
- "Write a migration to add the `last_login_at` column"
- "Configure the retry policy on the HTTP client"
- "Review the caching strategy with the team"

Not:
- "The data model needs to be defined"
- "A migration should be added"

---

## Rule 7: Complexity labels are rough, not precise

Use T-shirt sizing for complexity estimation. Do not use hours.

| Label | Meaning |
|-------|---------|
| XS | Under 1 hour |
| S | Half a day |
| M | 1–2 days |
| L | 3–5 days |
| XL | More than a week — decompose further |

An XL task is a signal that the breakdown is incomplete. Keep breaking it down until all tasks are L or smaller.

---

## Rule 8: Group related tasks under milestones

When a breakdown has more than 8 tasks, group them into milestones.

A milestone is a coherent deliverable: something that can be shipped, tested, or reviewed independently.

Example grouping:
```
### Milestone 1: Data layer (2–3 days)
- [ ] Define schema
- [ ] Write migration
- [ ] Implement repository layer
- [ ] Write unit tests for repository

### Milestone 2: API layer (2 days)
- [ ] Implement REST endpoints
- [ ] Add input validation
- [ ] Write API integration tests

### Milestone 3: UI layer (2 days)
- [ ] Build list view component
- [ ] Build detail view component
- [ ] Connect to API
- [ ] Handle loading and error states
```

---

## Rule 9: Identify the riskiest task and do it first

The riskiest task is the one whose outcome you are least certain about.

Move the riskiest task to the top of the execution order. If it fails or invalidates the plan, it is better to discover this on day 1 than on day 14.

Examples of high-risk tasks:
- Tasks that depend on third-party APIs with unknown behavior
- Tasks that require a technology the team hasn't used
- Tasks that involve migrating live data
- Tasks whose requirements are ambiguous

---

## Rule 10: Define done for the entire plan

At the end of a task breakdown, include a single "Definition of Done" for the full plan:

```
**Definition of Done:**
[The entire plan is complete when: description of the end state that can be observed and verified]
```

This prevents drift and makes it clear when the work is actually finished.
