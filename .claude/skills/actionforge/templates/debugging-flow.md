# Debugging Flow Template

Use this template for structured investigation of bugs, incidents, and regressions.

---

## Bug: [Brief description]

**Reported by:** [Name or team]
**Date reported:** [YYYY-MM-DD]
**Severity:** P0 (data loss / outage) / P1 (major feature broken) / P2 (partial failure, workaround exists) / P3 (cosmetic / minor)
**Environment:** Production / Staging / Development
**Status:** Investigating / Root cause identified / Fix in progress / Resolved

---

### Symptom

[Describe exactly what the user sees or experiences. Use their words if possible. What is the observable behavior? What was the expected behavior?]

**Observed:** [What actually happens]
**Expected:** [What should happen]
**Frequency:** [Always / Intermittent (X% of the time) / Only under specific conditions]
**First seen:** [Date / after which deploy / after which event]

---

### Impact

**Users affected:** [Number or percentage — use "unknown" if not yet measured]
**Requests affected:** [Rate per minute/hour/day]
**Severity of impact:** [Data loss / Revenue impact / Blocked flow / Degraded experience]
**Workaround available:** Yes — [describe] / No

---

### Reproduction steps

1. [Step 1: precondition — e.g., "Log in as a user with role 'editor'"]
2. [Step 2: action — e.g., "Navigate to /dashboard/settings"]
3. [Step 3: action — e.g., "Click 'Save changes' with the form unchanged"]
4. [Step 4: observation — e.g., "Page returns HTTP 500 with no error message"]

**Reproducible consistently:** Yes / No / Under specific conditions: [describe]

**Minimal reproduction case:**
[The smallest, most isolated scenario that triggers the bug. Eliminate as many variables as possible.]

---

### Relevant context

**Recent changes:**
- [Deploy date and description of changes that went out before the bug was first seen]
- [Relevant infrastructure change, dependency update, or configuration change]

**Related issues or PRs:**
- [Link or description of related known issues]

**Logs or error messages:**
```
[Paste relevant log lines, stack traces, or error messages here]
```

**Metrics anomalies:**
[Describe any metric changes correlated with the bug: error rate increase, latency spike, memory growth, etc.]

---

### Hypotheses

Rate each hypothesis by confidence (probability it is the root cause) and testability (how quickly it can be confirmed or ruled out).

| # | Hypothesis | Confidence | Testability |
|---|-----------|-----------|------------|
| 1 | [Causal statement: "If X is true, then Y behavior is explained"] | High / Medium / Low | High / Medium / Low |
| 2 | [Hypothesis 2] | | |
| 3 | [Hypothesis 3] | | |

**Most likely root cause (current best guess):**
[State the top hypothesis in detail. If X is true → this is the mechanism → this explains the observed symptoms.]

---

### Diagnostic checklist

Ordered by: high confidence + high testability first.

**Hypothesis 1 checks:**
- [ ] [Check: what to look at, where, and what to expect if the hypothesis is true]
- [ ] [Log: what to add to confirm or deny the hypothesis]
- [ ] [Test: specific test to run to isolate the behavior]

**Hypothesis 2 checks:**
- [ ] [Check]
- [ ] [Log]

**Hypothesis 3 checks:**
- [ ] [Check]
- [ ] [Log]

**General checks:**
- [ ] Verify this behavior did not exist before [specific commit or deploy]
- [ ] Confirm the issue is environment-specific (production only vs. reproducible locally)
- [ ] Check for rate limits, quota exhaustion, or external API degradation

---

### Root cause

[Fill in after investigation is complete]

**Root cause:** [Precise description of what caused the bug. Which code path, which condition, which data state.]

**Why it wasn't caught earlier:**
- [Missing test coverage / Edge case not considered / Silent failure / No monitoring]

---

### Fix

**Approach:** [Describe the fix. What changes and why this is the correct fix, not just a workaround.]

**Files to change:**
- `[path/to/file.ts]` — [what changes]
- `[path/to/test.ts]` — [test to add or modify]

**Fix steps:**
- [ ] [Step 1]
- [ ] [Step 2]
- [ ] [Step 3]
- [ ] [Step 4: verify fix resolves the reproduction steps above]

**Is this a hotfix or a normal PR?**
[Hotfix = merge directly to main and deploy immediately / Normal PR = follows standard review process]

---

### Verification

After deploying the fix:
- [ ] Reproduction steps no longer produce the bug
- [ ] Error rate returns to baseline
- [ ] No new errors introduced by the fix
- [ ] Smoke test of affected user flow passes

---

### Regression prevention

- [ ] [Test to add: describe what it covers and why this scenario wasn't caught before]
- [ ] [Monitoring to add: alert or metric that would have caught this earlier]
- [ ] [Documentation to update: if a non-obvious system behavior is involved]

---

### Timeline

| Time | Event |
|------|-------|
| [YYYY-MM-DD HH:MM] | Bug first reported |
| [YYYY-MM-DD HH:MM] | Investigation started |
| [YYYY-MM-DD HH:MM] | Root cause identified |
| [YYYY-MM-DD HH:MM] | Fix deployed |
| [YYYY-MM-DD HH:MM] | Resolved and verified |

---

### Postmortem actions (P0/P1 only)

- [ ] [Process change to prevent recurrence]
- [ ] [Monitoring improvement]
- [ ] [Documentation update]
- [ ] [Team learning to share]
