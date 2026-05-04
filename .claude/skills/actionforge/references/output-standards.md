# Output Standards

Formatting and quality rules for all ActionForge output.

---

## Core principle

Every piece of output must pass the "can someone act on this right now?" test.

If the answer is no, the output is incomplete.

---

## Formatting rules

### Headings
- Use `##` for top-level sections
- Use `###` for subsections
- Never use `#` (too large, feels like a document title)
- Never use `####` or deeper (too nested, hard to scan)

### Lists
- Use `- [ ]` for tasks (checkbox format for executability)
- Use `- ` for non-task bullet points
- Use numbered lists only for ordered steps where sequence is critical
- No more than one level of nesting in lists

### Code
- Always wrap file paths, function names, and commands in backticks: `src/api/user.ts`, `fetchUser()`, `npm run test`
- Use fenced code blocks with language tags for code samples
- Keep code examples short and directly relevant — not full implementations

### Bold and italic
- Use `**bold**` for labels, section names, and key terms
- Use `_italic_` sparingly, only for genuine emphasis on a word or phrase
- Never bold entire sentences

### Tables
- Use tables for: comparison of options, priority matrices, hypothesis lists with confidence levels
- Do not use tables for simple lists — that is what bullets are for

---

## Content rules

### Never include

- Motivational openers ("Great question!", "This is exciting!")
- Meta-commentary about the output ("Here is the plan I've generated for you")
- Hedging that reduces actionability ("This might work depending on your setup")
- Passive voice in tasks ("Tests should be written" → "Write tests")
- Vague time estimates ("This might take a while")
- Obvious explanations ("This step creates the file" for a task called "Create the config file")

### Always include

- An explicit scope statement at the top of any plan
- Assumptions section at the end of output (if any assumptions were made)
- Open questions section only if the answer would materially change the plan
- Definition of done for any implementation plan
- Complexity estimate (XS/S/M/L/XL) for implementation plans

---

## Task writing standards

Every task must:
- Start with an active verb (Define, Implement, Write, Add, Remove, Configure, Test, Deploy, Review)
- Name the specific thing being acted on (`fetchUserProfile()` not "the function")
- Include location when relevant (`src/api/user.ts` not "the API file")
- Be completable independently of other tasks in the list

Task format:
```
- [ ] [Verb] [specific object] [in/at/for location if relevant] — [reason or constraint if non-obvious]
```

Examples:
```
- [ ] Add rate limiting middleware to `/api/auth/login` — max 10 req/min per IP, return 429
- [ ] Write unit tests for `parseJwt()` covering expired, malformed, and valid token cases
- [ ] Migrate `user_sessions` table to use UUID primary keys — see migration guide in CONTRIBUTING.md
```

---

## Hypothesis writing standards (debug mode)

Each hypothesis must:
- Be falsifiable (you can prove it right or wrong)
- Name the specific mechanism (not "something is wrong with auth")
- Explain the causal chain (if X is true, then Y follows, which explains Z)
- Include confidence percentage (rough: 10% / 25% / 50% / 75% / 90%)

Example:
```
**Hypothesis 2: Token refresh is not triggered on window focus** (confidence: 65%)
If the access token expires while the browser tab is in the background and the app only triggers token refresh on API calls (not on visibility change), then users who return to an idle tab would be immediately logged out on their next action.
```

---

## Acceptance criteria standards

Use Given/When/Then format:

- **Given:** The precondition or state of the system
- **When:** The action or event that triggers the behavior
- **Then:** The observable, verifiable outcome

Rules:
- Use concrete values: "within 500ms", "returns HTTP 401", "displays error message 'Invalid email'"
- Cover: one happy path, one failure path, one edge case minimum
- Never use vague outcomes: "works correctly", "handles it properly", "responds appropriately"

Example:
```
Given an authenticated user with role "viewer",
when they attempt to access /admin/settings,
then the API returns HTTP 403 with body {"error": "Insufficient permissions"}
and the frontend redirects to /dashboard.
```

---

## Length calibration

| Input complexity | Expected output length |
|-----------------|----------------------|
| Simple task (1–2 sentences) | 10–20 lines |
| Development task with context | 30–60 lines |
| Bug report with stack trace | 40–70 lines |
| Idea or product concept | 50–100 lines |
| Full MVP plan | 80–150 lines |

Do not pad output to appear more thorough. A 20-line response that answers the question is better than a 100-line response that repeats itself.

---

## Mode-specific formatting

### /mode dev
Add after tasks:
- Affected files (list of paths)
- Testing approach (unit / integration / e2e, specific test framework)

### /mode jira
Use the Jira template exactly. Do not deviate from the field structure. Include all fields even if the value is "TBD".

### /mode startup
Add at the end:
- Validation method (how to test the hypothesis before building)
- What to cut if time is limited

### /mode debug
Add before the task list:
- Confidence-ranked hypothesis table
- Minimal reproduction case instructions

---

## Surface assumptions, never hide them

When making an assumption that changes the plan, always surface it:

```
**Assumptions made:**
- PostgreSQL is the database (affects migration syntax and query approach)
- Node.js 18+ runtime (uses native fetch, no node-fetch dependency)
- The team has write access to the production environment
```

If an assumption is wrong, the reader can correct it and request an updated plan.
