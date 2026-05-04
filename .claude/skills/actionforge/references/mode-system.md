# Mode System

How ActionForge modes work, when to use each, and how they modify output.

---

## Overview

Modes are optional filters that modify ActionForge's output style for a specific audience or use case.

Invoke a mode by prefixing your input:
```
/actionforge /mode dev implement OAuth2 login with Google
/actionforge /mode jira the checkout flow breaks on mobile when the cart has more than 10 items
```

Or set a mode for the session:
```
/mode dev
```

After setting a session mode, all subsequent ActionForge calls in that conversation use that mode until explicitly changed.

---

## Mode: dev

**Audience:** Developers writing code and doing technical implementation.

**Goal:** Produce plans with enough technical detail to start writing code immediately.

**Output modifications:**
- Lists affected files and modules explicitly
- Includes function/method signatures where the interface matters
- Adds testing approach (unit / integration / e2e, with framework name)
- Includes rollback or cleanup plan for risky changes
- Notes relevant design patterns or architectural decisions
- Flags breaking changes

**When to use:**
- Implementing a feature from a specification
- Refactoring a module or system
- Integrating a third-party library
- Migrating data or schemas
- Adding observability (logging, metrics, tracing)

**Example output addition (dev mode):**
```
**Affected files:**
- `src/middleware/auth.ts` — add JWT validation logic
- `src/routes/user.ts` — protect all routes with auth middleware
- `src/types/auth.ts` — define `AuthPayload` interface
- `tests/middleware/auth.test.ts` — unit tests for JWT validation

**Testing approach:**
Unit tests with Vitest for `validateJwt()`.
Integration tests with Supertest for protected endpoints.

**Rollback plan:**
The middleware is additive — if issues are found, remove the middleware import from `src/routes/user.ts` without touching the implementation.
```

---

## Mode: product

**Audience:** Product managers, founders, and teams defining what to build.

**Goal:** Produce outputs structured around user value, acceptance criteria, and prioritization.

**Output modifications:**
- Frames features as user stories
- Adds MoSCoW priority to each feature
- Adds acceptance criteria in Given/When/Then format
- Adds success metrics (KPIs) per feature
- Structures output around user personas and jobs-to-be-done
- Avoids implementation detail (not the role of this mode)

**When to use:**
- Writing a product specification
- Defining the scope of a sprint or release
- Converting user research insights into backlog items
- Preparing for a product review or stakeholder meeting

**Example output addition (product mode):**
```
**User story:**
As a returning user, I want to save my cart across sessions so that I don't lose items I've selected if I close the browser.

**Priority:** Must have

**Acceptance criteria:**
- Given a logged-in user with items in their cart, when they close and reopen the browser, then their cart is restored with the same items and quantities.
- Given a guest user, when they close the browser, then their cart is cleared (guest cart persistence is out of scope).

**Success metrics:**
- Cart abandonment rate decreases by ≥10% within 30 days of release
- Cart restore success rate ≥99% for authenticated users
```

---

## Mode: startup

**Audience:** Founders, indie hackers, and builders validating and launching products.

**Goal:** Produce outputs focused on speed, market validation, and shipping the minimum version that tests the core hypothesis.

**Output modifications:**
- Leads with the riskiest assumption to validate
- Adds validation method before building
- Identifies what to cut from v1 to ship in 1–2 weeks
- Adds initial customer acquisition strategy
- Adds revenue model and unit economics (rough)
- Flags vanity features vs. core hypothesis features
- Uses startup vocabulary: ICP, CAC, LTV, PMF, traction, runway

**When to use:**
- Planning an MVP or side project
- Evaluating whether to build something
- Defining the first sprint of a new product
- Preparing for a co-founder or investor conversation (planning only, not pitch writing)

**Example output addition (startup mode):**
```
**Riskiest assumption:**
Developers will pay for a tool that shows them test coverage inline, vs. using free alternatives like Istanbul reports or VS Code extensions.

**Validation before building:**
1. Set up a landing page with a 2-minute product demo video and an email capture
2. Post in 3 developer communities (Hacker News, dev.to, relevant Discord servers)
3. If 200+ emails in 2 weeks → build. If not → reframe or pivot.

**What to cut from v1:**
- Historical coverage trends → cut (not needed to test core value)
- Multi-language support → cut (start with JS/TS only)
- CI integration → cut (manual trigger is enough for validation)

**ICP (Ideal Customer Profile):**
Mid-level to senior JS/TS developers on teams of 5–50, with a codebase over 20K lines, who feel anxious about refactoring untested code.

**Revenue model:**
$9/month individual, $49/month team (up to 10 devs).
Estimated CAC target: under $30 (organic + community).
```

---

## Mode: debug

**Audience:** Developers investigating and fixing bugs.

**Goal:** Produce a structured debugging plan with ranked hypotheses and actionable diagnostic steps.

**Output modifications:**
- Leads with a ranked hypothesis table (probability + confidence)
- Includes a minimal reproduction case
- Adds explicit logging/tracing plan (what to add and where)
- Structures diagnostic checks as a testable checklist
- Pairs each hypothesis with a specific fix approach
- Adds regression prevention (test to add to prevent recurrence)

**When to use:**
- Investigating a bug with unclear root cause
- Debugging a production incident
- Tracing a performance regression
- Investigating intermittent failures

**Hypothesis table format:**
```
| # | Hypothesis | Confidence | Testability |
|---|-----------|-----------|------------|
| 1 | JWT expiry is 30m, no refresh | 75% | High |
| 2 | Refresh fails on tab focus | 60% | Medium |
| 3 | Cookie SameSite mismatch | 30% | High |
| 4 | Redis session eviction | 25% | Medium |
```

---

## Mode: ai

**Audience:** Developers and ML engineers building AI-powered features.

**Goal:** Produce plans that address the specific complexity of AI systems: prompt design, context management, evaluation, cost, and failure modes.

**Output modifications:**
- Defines model role and decision boundary explicitly
- Includes input/output contract with types and examples
- Adds prompt architecture (system prompt structure, few-shot approach)
- Adds evaluation criteria with measurable thresholds
- Adds cost and latency analysis (rough)
- Adds hallucination and failure mode analysis
- Recommends model selection with rationale
- Flags where human-in-the-loop is required

**When to use:**
- Designing an LLM-powered feature
- Planning a RAG or embedding pipeline
- Evaluating model options for a use case
- Designing the eval suite for an AI feature
- Planning prompt iteration workflow

**Example output addition (ai mode):**
```
**Model role:**
Classify user-submitted text as one of: [bug report, feature request, question, other].
Not responsible for routing or response — classification only.

**Input/output contract:**
Input: plain text string, max 2000 characters
Output: { category: "bug" | "feature_request" | "question" | "other", confidence: number (0–1) }

**Prompt architecture:**
System prompt: role definition + 4 few-shot examples (one per category)
User prompt: raw user text
Temperature: 0 (deterministic classification)

**Evaluation criteria:**
- Accuracy ≥ 90% on a labeled test set of 500 examples
- Latency p95 ≤ 800ms
- "other" category used for ≤5% of real inputs (high rate = prompt needs refinement)

**Failure modes:**
- Ambiguous input classified with false confidence → add confidence threshold, route low-confidence to human review
- Prompt injection via user text → sanitize or wrap input in explicit delimiters

**Model recommendation:**
claude-haiku-4-5 (low cost, sufficient for classification, fast latency)
Fallback: claude-sonnet-4-6 for edge cases if accuracy is insufficient
```

---

## Mode: jira

**Audience:** Teams using Jira for project management.

**Goal:** Produce Jira-ready issues with all required fields filled in, ready to copy into Jira.

**Output modifications:**
- Structures output as Jira issue fields
- Adds issue type (Epic / Story / Task / Bug / Sub-task)
- Adds epic link suggestion
- Adds story points estimate
- Formats acceptance criteria as Given/When/Then
- Adds label suggestions
- Adds sprint suggestion (current or next)
- Generates sub-tasks as child issue stubs

**When to use:**
- Creating Jira issues from a development brief
- Converting a debugging session into tracked work
- Breaking a feature spec into Jira stories
- Preparing sprint planning content

**Full Jira output format:**
```
---
**Issue type:** Story
**Title:** [Action-oriented title, under 80 characters]
**Epic:** [Epic name or "New Epic: [name]"]
**Priority:** Highest / High / Medium / Low
**Story points:** 1 / 2 / 3 / 5 / 8 / 13
**Labels:** [comma-separated]
**Sprint:** Current sprint / Next sprint / Backlog
**Reporter:** [TBD or user]
**Assignee:** [TBD]

**Description:**
[2–4 sentences. What is this? Why does it matter? What is the expected outcome?]

**Acceptance Criteria:**
- Given [context], when [action], then [outcome]
- Given [context], when [action], then [outcome]
- Given [context], when [action], then [outcome — edge case]

**Sub-tasks:**
- [ ] [Sub-task 1 title]
- [ ] [Sub-task 2 title]
- [ ] [Sub-task 3 title]

**Linked issues:**
- Blocks: [issue key or TBD]
- Relates to: [issue key or TBD]
---
```

---

## Combining modes

Modes cannot be combined in a single call. If you need output that crosses modes (e.g., both Jira tasks and implementation detail), run ActionForge twice:

```
/actionforge /mode dev implement OAuth2 login
/actionforge /mode jira implement OAuth2 login
```

The two outputs are complementary: the dev output gives the team implementation guidance, and the Jira output gives the PM and project tracking system the structured issue.
