# Prioritization

Frameworks and rules for ordering work by value, risk, and dependencies.

---

## Primary framework: RICE

Use RICE when prioritizing features or tasks across a product or backlog.

**Reach:** How many users or requests does this affect per period?
**Impact:** How much does it improve the outcome for each person? (0.25 / 0.5 / 1 / 2 / 3)
**Confidence:** How confident are we in reach and impact estimates? (expressed as %)
**Effort:** How many person-weeks does it take?

**Score = (Reach × Impact × Confidence) / Effort**

Higher score = higher priority.

Use RICE for:
- Product backlogs
- Feature prioritization
- Sprint planning input

---

## Secondary framework: MoSCoW

Use MoSCoW for scoping MVP and release content.

**Must have:** The product cannot launch without this. Users cannot accomplish their core goal without it.
**Should have:** High value, but the product can ship without it. Include in v1.1.
**Could have:** Nice to have. Only include if time and resources permit.
**Won't have (this time):** Explicitly excluded from this release. Document why.

Rules for applying MoSCoW:
- A "Must have" list that covers 80% of the work is a sign of scope creep. Reduce it.
- Never use "Should have" as a way to avoid hard scoping decisions.
- "Won't have" is not failure — it is a deliberate decision to protect delivery.

---

## Risk-adjusted priority

When standard priority scoring gives equal weight to safe and risky tasks, apply risk adjustment.

Move any task up in priority if:
- Its outcome is highly uncertain (you don't know if it's possible)
- It blocks multiple downstream tasks
- It involves external dependencies you don't control
- It requires a decision from a third party

The cost of discovering a blocker late is higher than the cost of doing a less impactful task earlier.

---

## Prioritization anti-patterns

### The "everything is P0" trap
When all items are marked critical, nothing is prioritized. Force-rank: for every P0 added, something else must drop to P1.

### The "nice sequence" trap
Tasks ordered to look logical on paper, but not ordered by actual dependencies or risk. Always ask: "If we only got through the first three tasks, what would we have?"

### The "completionist" trap
Adding tasks to cover every possible edge case before shipping the core. Ship the core first. Edge cases belong in v1.1.

### The "low-hanging fruit" first trap
Doing easy tasks first to show progress, while the hard, risky tasks keep being deferred. Move the hard task to the top.

---

## Priority for bug fixes

Apply this order for bug triage:

1. **Data loss or corruption** — fix immediately, no exceptions
2. **Security vulnerabilities** — fix immediately, no exceptions
3. **Complete feature failure** (users cannot complete a core flow) — fix this sprint
4. **Partial feature failure** (workaround exists) — schedule in next sprint
5. **UI/cosmetic issues** — schedule in backlog

When multiple bugs are at the same severity level, prioritize by:
- Frequency of occurrence (how many users hit it)
- Reproducibility (can it be reproduced consistently)
- Time to fix (faster fixes that unblock users first)

---

## Sequencing for implementation plans

Within a single implementation plan, order tasks by this logic:

1. **Foundation first:** Database schema, data models, types, interfaces — anything that everything else depends on.
2. **Core business logic second:** The part that actually solves the problem. Write and test this before building around it.
3. **Integration third:** Connect the core logic to its inputs (APIs, UI events, message queues).
4. **Presentation fourth:** UI, API responses, outputs — these can change without touching core logic.
5. **Hardening last:** Error handling, retries, monitoring, observability — add these after the happy path works.

This order minimizes rework because each layer is built on a stable foundation.

---

## Dependency-aware sequencing example

Given these tasks for a user authentication feature:

```
A: Define User schema
B: Write DB migration
C: Implement password hashing utility
D: Implement register endpoint
E: Implement login endpoint
F: Implement session/JWT creation
G: Add auth middleware
H: Write integration tests
```

Correct order:
```
A → B → C → D → F → E → G → H
```

Why:
- Schema (A) must exist before migration (B)
- Password hashing (C) must exist before register (D)
- Session creation (F) must exist before login (E), since login creates a session
- Auth middleware (G) depends on session/JWT format defined in F
- Tests (H) are written last to cover the full integrated flow
