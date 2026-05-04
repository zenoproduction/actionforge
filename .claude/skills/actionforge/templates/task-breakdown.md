# Task Breakdown Template

Use this template for decomposing a development task into executable steps.

---

## [Task Name]

**Input type:** Development task
**Complexity:** [XS / S / M / L / XL]
**Scope:** [One sentence describing what this task covers and where it fits in the system]

---

### Context

[2–4 sentences explaining the current state of the system and why this task is needed. What problem does it solve or what capability does it add?]

---

### Scope

**In scope:**
- [What this task covers]
- [What systems or files will be changed]

**Out of scope:**
- [What will not be addressed in this task]
- [Related work that belongs in a separate task]

---

### Prerequisites

Before starting, the following must be in place:

- [ ] [Prerequisite 1 — e.g., "The `users` table migration must be applied"]
- [ ] [Prerequisite 2 — e.g., "The authentication middleware must be merged to main"]

If no prerequisites: _None_

---

### Affected areas

**Files likely to change:**
- `[path/to/file.ts]` — [what changes here]
- `[path/to/other.ts]` — [what changes here]

**Systems affected:**
- [Database / Cache / External API / Message queue — describe the interaction]

**Potential impact on other features:**
- [Feature or module that could be affected — describe the risk]

---

### Implementation steps

- [ ] [Step 1: Define or update data model / schema / types] — [why first]
- [ ] [Step 2: Write or update migration if DB changes required]
- [ ] [Step 3: Implement core business logic]
- [ ] [Step 4: Expose via API endpoint or integrate into existing endpoint]
- [ ] [Step 5: Update UI layer or consumer]
- [ ] [Step 6: Write unit tests for core logic]
- [ ] [Step 7: Write integration tests for the end-to-end flow]
- [ ] [Step 8: Update documentation if the public interface changes]

---

### Edge cases and failure modes

| Scenario | Expected behavior |
|----------|------------------|
| [Edge case 1, e.g., empty input] | [What should happen] |
| [Edge case 2, e.g., concurrent request] | [What should happen] |
| [Failure case 1, e.g., DB timeout] | [Return value or error behavior] |
| [Failure case 2, e.g., invalid token] | [HTTP status and error message] |

---

### Acceptance criteria

- Given [precondition], when [action], then [observable outcome]
- Given [precondition], when [action], then [observable outcome — error path]
- Given [precondition], when [action], then [observable outcome — edge case]

---

### Testing approach

**Unit tests:**
[Which functions/classes to unit test and with which framework]

**Integration tests:**
[Which flows to integration test and how]

**Manual verification:**
[Steps to manually verify the feature works end-to-end before submitting for review]

---

### Rollback plan

[Describe how to revert this change if issues are discovered in production. Migrations that are hard to reverse should have a down migration. Feature flags can be used to disable behavior without a deploy.]

---

### Definition of done

This task is complete when:
- [ ] All implementation steps are merged to the main branch
- [ ] All acceptance criteria pass
- [ ] Test coverage does not decrease from baseline
- [ ] No new lint or type errors introduced
- [ ] Rollback plan is documented and tested if applicable

---

**Assumptions made:**
- [Assumption 1 — state what you assumed and why]
- [Assumption 2]

**Open questions:**
- [Question 1 — only if the answer changes the plan]
