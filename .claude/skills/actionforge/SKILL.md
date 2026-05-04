---
name: actionforge
version: 1.0.0
description: Turn vague ideas into executable plans.
trigger: /actionforge
aliases:
  - /af
  - /forge
modes:
  - dev
  - product
  - startup
  - debug
  - ai
  - jira
author: Marco Venturelli <info@marcoventurelli.com>
license: MIT
---

# ActionForge

**Turn ambiguity into action.**

ActionForge is an execution-oriented skill for Claude Code. It takes any fuzzy input — an idea, a task, a bug, a product concept — and produces a structured, actionable output you can act on immediately.

---

## Purpose

Most tools help you think. ActionForge helps you execute.

It does not generate motivational content, vision documents, or open-ended exploration. It produces plans, steps, criteria, and tasks. Output is always concrete, scoped, and immediately usable.

---

## When to use

- You have an idea and need to know what to actually build first
- You have a development task and need a step-by-step implementation plan
- You have a bug and need a structured debugging flow
- You have a product concept and need a roadmap and positioning
- You need to convert work items into Jira-ready tasks
- You are building an AI feature and need architecture and risk assessment
- You need an MVP plan for a startup or side project

---

## When NOT to use

- You need architectural documentation (use a separate doc skill)
- You want open-ended brainstorming with no output constraints
- You need code generation only (use standard Claude Code prompting)
- You are writing marketing copy or user-facing content
- You need legal, financial, or compliance advice

---

## Behavior rules

1. **Always produce output you can act on immediately.** If a step cannot be executed, it is not a valid step.

2. **Infer the input type automatically.** Do not ask the user to categorize their own input. Detect it and pick the right output format.

3. **Clarify only what is blocking execution.** Do not ask questions that do not change the output. If a reasonable assumption can be made, make it and state it.

4. **No filler.** Remove anything that does not help someone execute. No "it's important to note that", no "this approach allows you to", no preamble.

5. **Scope before depth.** Before diving into implementation detail, establish scope. What is in? What is out? Who is affected?

6. **Expose uncertainty explicitly.** When an assumption is risky or uncertain, flag it. Do not hide it.

7. **Default to smallest viable step.** When in doubt, produce the smallest executable unit of work that delivers value.

8. **Respect active mode.** If a mode is set (e.g. `/mode jira`), adapt output format and vocabulary accordingly throughout the session.

---

## Input detection

ActionForge auto-detects input type and routes to the correct output structure:

### Idea input
Signals: "I want to build", "what if we", "idea for", "concept", "could we", "thinking about"

Output structure:
- Problem definition
- Target users
- Core value proposition
- MVP scope (what's in, what's out)
- Risks and unknowns
- First 5 executable tasks

### Development task input
Signals: "implement", "add feature", "refactor", "build", "integrate", "migrate", task descriptions, issue titles

Output structure:
- Scope analysis (affected files, systems, APIs)
- Dependencies and prerequisites
- Implementation steps (ordered, executable)
- Edge cases and failure modes
- Acceptance criteria
- Estimated complexity (S/M/L/XL)

### Bug input
Signals: "bug", "broken", "error", "crash", "not working", "unexpected", "fails", "regression", stack traces, error messages

Output structure:
- Symptom summary
- Likely hypotheses (ranked by probability)
- Reproduction steps
- Diagnostic checks (what to look at, what to log)
- Proposed fixes per hypothesis
- Regression prevention

### Product concept input
Signals: "product", "SaaS", "platform", "app", "service", "startup", "market", "users"

Output structure:
- Problem and target market
- Positioning statement
- Core features (v1 only)
- Roadmap (3 phases)
- Monetization model
- Key risks
- Go-to-market first steps

### AI feature input
Signals: "LLM", "AI", "model", "prompt", "fine-tune", "RAG", "embeddings", "agent", "tool use", "classification"

Output structure:
- Model role definition
- Input/output contract
- Data flow and pipeline
- Prompt/tool architecture
- Evaluation criteria
- Failure modes and mitigations
- Cost and latency estimates (rough)

---

## Mode system

Modes modify output style and vocabulary. Set a mode with `/mode <name>`.

### /mode dev
Focus: architecture, files, implementation steps, edge cases, code-level detail.

Vocabulary: functions, modules, classes, interfaces, tests, CI, types, schemas.

Output adds:
- File paths affected
- Function/method signatures (where relevant)
- Testing approach
- Rollback plan

### /mode product
Focus: user value, feature definition, prioritization, acceptance criteria.

Vocabulary: user stories, personas, flows, KPIs, prioritization, backlog.

Output adds:
- User story format
- Acceptance criteria per feature
- Priority (MoSCoW)
- Success metrics

### /mode startup
Focus: speed, market, MVP, validation, monetization.

Vocabulary: hypothesis, traction, ICP, CAC, LTV, runway, PMF, landing page.

Output adds:
- Validation method before building
- Revenue model
- First 10 customers strategy
- What to cut from v1

### /mode debug
Focus: hypotheses, reproduction, logs, isolation, fixes.

Vocabulary: hypothesis, reproduce, isolate, log, trace, root cause, fix, regression.

Output adds:
- Confidence level per hypothesis (%)
- Logging/tracing plan
- Minimal reproduction case
- Fix verification steps

### /mode ai
Focus: model design, prompt engineering, tool use, evaluation, data pipelines.

Vocabulary: prompt, context window, temperature, RAG, embeddings, tool call, eval, latency, hallucination.

Output adds:
- Prompt template sketch
- Evaluation rubric
- Failure mode analysis
- Model selection rationale

### /mode jira
Focus: Jira-ready tasks with all required fields.

Vocabulary: Epic, Story, Task, Sub-task, Acceptance Criteria, Priority, Labels, Sprint.

Output adds:
- Issue type
- Epic link
- Story points estimate
- Acceptance criteria in Given/When/Then
- Labels
- Sprint suggestion

---

## Output formats

### Default output (no mode set)

```
## [Output type]

**Input interpreted as:** [idea / task / bug / product / AI feature]
**Scope:** [one line scope statement]

---

### [Section 1]
[Content]

### [Section 2]
[Content]

---

**Assumptions made:**
- [assumption 1]
- [assumption 2]

**Open questions:**
- [question 1 — only if it would change the output]
```

### Task list output

```
## Tasks

- [ ] [Task 1] — [why it comes first]
- [ ] [Task 2] — [dependency or rationale]
- [ ] [Task 3]
- [ ] [Task 4]
- [ ] [Task 5]
```

### Jira output (/mode jira)

```
**Issue type:** Story
**Title:** [Title]
**Epic:** [Epic name]
**Priority:** [Highest / High / Medium / Low]
**Story points:** [1 / 2 / 3 / 5 / 8 / 13]
**Labels:** [label1, label2]

**Description:**
[2–4 sentence description]

**Acceptance Criteria:**
- Given [context], when [action], then [outcome]
- Given [context], when [action], then [outcome]

**Sub-tasks:**
- [ ] [Sub-task 1]
- [ ] [Sub-task 2]
```

---

## Examples

### Example 1 — Idea input

Input:
```
/actionforge I want to build a tool that helps developers track which parts of their codebase are tested
```

Output (auto-detected: idea):
```
## MVP Plan: Code Coverage Tracker

**Input interpreted as:** idea
**Scope:** Developer tool for tracking test coverage at the file/module level, integrated into existing dev workflows.

---

### Problem
Developers don't know which parts of their codebase lack tests without running external tools or reading CI reports. This slows down confident refactoring.

### Target users
- Individual developers on medium-to-large codebases
- Teams practicing TDD or wanting to improve test coverage incrementally

### Core value
Show exactly which files, functions, or lines have no test coverage — in the editor, not in a report.

### MVP scope (in)
- Parse coverage reports (lcov, Istanbul JSON)
- Display per-file coverage inline in Claude Code or VS Code
- Flag files below threshold

### MVP scope (out)
- Historical trends
- Multi-language support beyond JS/TS
- Coverage diffing between branches

### First tasks
- [ ] Define input format: lcov vs Istanbul JSON
- [ ] Build parser that maps coverage to file paths
- [ ] Define the display contract (which fields to show)
- [ ] Implement inline annotation in Claude Code
- [ ] Write test for parser with sample lcov fixture

### Risks
- Coverage format varies across tools — pick one format first
- Editor integration APIs vary — scope to one target first

**Assumptions made:**
- JS/TS codebase as initial target
- Claude Code plugin as first delivery surface

**Open questions:**
- Is the primary trigger CI output or manual run?
```

---

### Example 2 — Bug input (/mode debug)

Input:
```
/actionforge /mode debug users are getting logged out randomly, seems to happen after about 30 minutes
```

Output:
```
## Debug Plan: Random User Logout

**Input interpreted as:** bug
**Mode:** debug

---

### Symptom
Users are unexpectedly logged out after approximately 30 minutes. Occurrence appears non-deterministic but time-correlated.

### Hypotheses

1. **Session TTL is set to 30 minutes** (confidence: 75%)
   Session or JWT expiry is configured to 30 minutes and refresh is either missing or failing silently.

2. **Token refresh fails under specific conditions** (confidence: 60%)
   Refresh endpoint exists but returns errors in certain states (e.g., concurrent requests, tab visibility, network interruption) causing the session to expire.

3. **Cookie SameSite/Secure misconfiguration** (confidence: 30%)
   Auth cookie is dropped by the browser under certain conditions (cross-origin redirect, HTTPS enforcement).

4. **Server-side session store eviction** (confidence: 25%)
   Redis or DB session store is evicting sessions earlier than expected due to memory pressure or config mismatch.

### Reproduction steps
1. Log in as any user
2. Keep the tab open, idle
3. After 30 minutes, attempt any authenticated action
4. Observe redirect or 401

### Diagnostic checks
- [ ] Check JWT expiry (`exp` claim) — is it exactly 1800s?
- [ ] Check refresh token logic — is refresh called before expiry?
- [ ] Log all auth middleware decisions with timestamp and user ID
- [ ] Check session store TTL config (Redis `TTL` command on a session key)
- [ ] Check browser network tab for 401 responses to refresh endpoint
- [ ] Confirm if logout happens even with active user (rules out idle-only trigger)

### Proposed fixes

**For hypothesis 1:**
Increase session TTL or implement sliding expiration (reset TTL on activity).

**For hypothesis 2:**
Add error handling and retry logic to the refresh flow. Log all refresh failures with cause.

**For hypothesis 3:**
Verify cookie attributes (`SameSite=Lax`, `Secure`, `HttpOnly`). Test in Chrome DevTools Application tab.

### Regression prevention
- Add test: session remains valid after 29 minutes
- Add test: refresh endpoint renews session successfully
- Add monitoring: alert on spike in 401 responses

**Assumptions made:**
- JWT-based auth with refresh token pattern
- Web browser client (not mobile)
```

---

## Anti-patterns

Do not do any of the following:

- **Ask the user to categorize their own input.** Detect it.
- **Produce open-ended exploration.** All output must be actionable.
- **Add motivational framing.** "This is a great idea!" is noise.
- **Duplicate obvious information.** If a task title is self-explanatory, do not explain it.
- **Generate exhaustive lists.** Five precise tasks beats twenty vague ones.
- **Use passive voice for tasks.** "Tests should be written" → "Write tests for X"
- **Produce output that cannot be acted on today.** Future planning is only valid when it is scoped and timed.
- **Hide assumptions.** Always surface them at the end of output.
