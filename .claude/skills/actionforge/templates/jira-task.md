# Jira Task Template

Use this template to produce Jira-ready issues. Copy each issue block into Jira.

---

## Epic (if creating a new epic)

---
**Issue type:** Epic
**Title:** [Action-oriented epic title — e.g., "User Authentication System"]
**Priority:** Highest / High / Medium / Low
**Labels:** [comma-separated labels — e.g., backend, security, v2]
**Target version:** [version or sprint range]

**Description:**
[3–5 sentences. What is this epic? What business problem does it solve? What is the expected outcome when all stories in this epic are complete?]

**Epic goal:**
[One sentence: what is the measurable outcome when this epic ships?]

**Stories in this epic:**
- [Story 1 title]
- [Story 2 title]
- [Story 3 title]

---

## Story

---
**Issue type:** Story
**Title:** [User-value title — e.g., "Allow users to reset their password via email"]
**Epic:** [Epic name]
**Priority:** Highest / High / Medium / Low
**Story points:** 1 / 2 / 3 / 5 / 8 / 13
**Labels:** [comma-separated — e.g., frontend, auth, sprint-14]
**Sprint:** [Sprint name or "Backlog"]
**Reporter:** [Name]
**Assignee:** [Name or Unassigned]

**Description:**
[2–4 sentences. What does the user need to do? Why does it matter? What is the expected outcome?]

**User story:**
As a [user type], I want to [action], so that [benefit].

**Acceptance Criteria:**
- Given [context], when [action], then [observable outcome with specific values]
- Given [context], when [action], then [error outcome — specific status and message]
- Given [context], when [action], then [edge case outcome]

**Sub-tasks:**
- [ ] [Sub-task 1 — e.g., "Implement password reset request endpoint"]
- [ ] [Sub-task 2 — e.g., "Send password reset email via SendGrid"]
- [ ] [Sub-task 3 — e.g., "Implement token validation and password update"]
- [ ] [Sub-task 4 — e.g., "Write integration tests for reset flow"]
- [ ] [Sub-task 5 — e.g., "Update UI with reset password form"]

**Linked issues:**
- Blocks: [issue key or N/A]
- Blocked by: [issue key or N/A]
- Relates to: [issue key or N/A]

**Notes:**
[Any additional context for the developer or reviewer. Implementation hints, links to design, relevant documentation.]

---

## Task

---
**Issue type:** Task
**Title:** [Action-oriented title — e.g., "Upgrade Node.js to v20 LTS"]
**Epic:** [Epic name or N/A]
**Priority:** High / Medium / Low
**Story points:** 1 / 2 / 3 / 5
**Labels:** [comma-separated — e.g., devops, maintenance, sprint-14]
**Sprint:** [Sprint name or "Backlog"]
**Reporter:** [Name]
**Assignee:** [Name or Unassigned]

**Description:**
[2–3 sentences. What needs to be done? Why is it needed? What is the expected state after completion?]

**Checklist:**
- [ ] [Step 1]
- [ ] [Step 2]
- [ ] [Step 3]
- [ ] [Verify: specific test or check that confirms task is done]

**Definition of done:**
[One sentence: what observable condition marks this task complete?]

---

## Bug

---
**Issue type:** Bug
**Title:** [Clear description of the broken behavior — e.g., "Users are logged out after 30 minutes despite active session"]
**Epic:** [Epic name or N/A]
**Priority:** Highest / High / Medium / Low
**Story points:** 1 / 2 / 3 / 5 / 8
**Labels:** [comma-separated — e.g., auth, regression, sprint-14]
**Sprint:** [Current sprint or "Backlog"]
**Reporter:** [Name]
**Assignee:** [Name or Unassigned]
**Environment:** Production / Staging / Development
**Severity:** P0 / P1 / P2 / P3

**Description:**
[2–4 sentences. What is the bug? When does it occur? What is the impact on the user?]

**Steps to reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected behavior:**
[What should happen]

**Actual behavior:**
[What actually happens]

**Acceptance Criteria (definition of fix):**
- Given [context], when [action], then [behavior that confirms the bug is fixed]
- Given [context], when [action], then [regression: the fix has not broken adjacent behavior]

**Sub-tasks:**
- [ ] Investigate root cause
- [ ] Implement fix
- [ ] Write regression test
- [ ] Verify fix in staging
- [ ] Deploy and verify in production

**Linked issues:**
- Relates to: [issue key or N/A]

---

## Sub-task

---
**Issue type:** Sub-task
**Title:** [Specific, executable task — e.g., "Implement JWT validation middleware"]
**Parent issue:** [Story or Task issue key]
**Priority:** High / Medium / Low
**Story points:** 1 / 2 / 3
**Assignee:** [Name or Unassigned]

**Description:**
[1–2 sentences. What specifically needs to be done in this sub-task?]

**Completion criteria:**
[One or two specific, verifiable conditions that mark this sub-task done.]

---

## Multiple issues output (Jira sprint planning format)

When generating multiple issues for sprint planning, use this format:

```
SPRINT: [Sprint name]
GOAL: [Sprint goal — one sentence]

---

[Issue 1 block]

---

[Issue 2 block]

---

[Issue 3 block]

---

TOTAL STORY POINTS: [Sum]
TEAM CAPACITY: [Available points this sprint]
BUFFER: [Capacity - committed points — should be ≥15%]
```
