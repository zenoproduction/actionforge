# Thinking Frameworks

Reference for ActionForge's internal reasoning approaches when decomposing inputs.

---

## Framework 1: Input-First Scoping

Before generating any output, establish:

1. **What is this?** (idea / task / bug / product / AI feature)
2. **What is the desired end state?** (what does "done" look like)
3. **What is the smallest slice of that end state worth delivering?**
4. **What is blocking delivery?** (unknowns, dependencies, risks)

This prevents generating plans that are either too abstract to execute or too detailed to be useful at the current stage.

---

## Framework 2: Problem-Solution Separation

When a user presents input that mixes problem description with an implied solution, separate them:

**Problem:** What is actually broken, missing, or suboptimal?
**Assumed solution:** What approach has the user already decided on?
**Alternative solutions:** Are there simpler approaches worth surfacing?

Only challenge the user's assumed solution if there is a clearly better alternative and it would change the plan. Do not second-guess every decision.

Example:

Input: "I want to add Redis caching to fix slow API responses"

Problem: API responses are slow (latency issue)
Assumed solution: Redis caching
Check: Is the bottleneck actually the DB, or is it compute, network, or missing indexes? Flag this before producing the Redis plan.

---

## Framework 3: Dependency Graph Thinking

When generating implementation steps, build a mental dependency graph before ordering tasks:

1. List all tasks
2. Mark which tasks block others
3. Identify tasks with no dependencies (can start immediately)
4. Order by: unblocked → blocking → cleanup

Never list tasks in the order they were thought of. Order them by execution dependency.

Example dependency chain:
```
Define DB schema
  → Write migration
    → Implement model layer
      → Write API endpoint
        → Write integration tests
```

---

## Framework 4: Hypothesis-Driven Debugging

When analyzing a bug, generate hypotheses before diagnostic steps.

A hypothesis is a falsifiable statement:
"If X is true, then Y behavior is explained."

Bad hypothesis: "Something is wrong with auth"
Good hypothesis: "If the JWT expiry is set to 30 minutes and the refresh token is not being sent on tab resume, then users would be logged out after exactly 30 minutes of inactivity."

Rate each hypothesis by:
- **Probability:** How likely is this given the symptoms?
- **Impact:** If true, how serious is it?
- **Testability:** How quickly can it be confirmed or ruled out?

Start with high-probability, high-testability hypotheses.

---

## Framework 5: Constraint-First MVP Scoping

When generating MVP plans, apply constraints before features:

**Time constraint:** What can be built in 2 weeks by 1–2 people?
**Value constraint:** What is the one thing users come back for?
**Scope constraint:** What can be removed without destroying the core value?

Apply in order:
1. Define the riskiest assumption to validate
2. Define the smallest thing that tests that assumption
3. Cut everything that doesn't test the assumption
4. Add only what is needed to make the test credible

---

## Framework 6: Acceptance Criteria as Behavior Contracts

Acceptance criteria are not descriptions of what code does. They are contracts that specify behavior from the outside.

Format: **Given** [precondition], **when** [action], **then** [observable outcome]

Rules:
- Each criterion must be independently verifiable
- Use concrete values, not vague terms ("within 2 seconds", not "quickly")
- Cover: happy path, error path, edge case
- If a criterion cannot be tested, it is not a valid criterion

Bad: "The login should work correctly"
Good: "Given a valid email and password, when the user submits the login form, then they are redirected to the dashboard within 1 second"

---

## Framework 7: Scope Boundary Enforcement

Every plan must have explicit boundaries.

**In scope:** What will this plan address?
**Out of scope:** What is explicitly excluded (and why)?
**Dependencies:** What must exist before this work can start?

This prevents scope creep during execution and makes handoffs cleaner.

When a user's input is ambiguous about scope, pick the narrower interpretation and state the assumption. It is easier to expand scope than to renegotiate a bloated plan.

---

## Framework 8: Risk Surface Mapping

For any plan, identify risks across three dimensions:

**Technical risks:** Unknown libraries, integration complexity, performance unknowns
**Execution risks:** Team capacity, unclear requirements, external dependencies
**Product risks:** Wrong target user, unvalidated assumptions, market timing

For each risk, produce:
- A description (what could go wrong)
- A trigger (what would make this risk materialize)
- A mitigation (what reduces the probability or impact)

Do not generate risks for the sake of completeness. Only include risks that could realistically derail the plan.
