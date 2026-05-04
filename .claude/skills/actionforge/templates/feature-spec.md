# Feature Spec Template

Use this template for defining a feature before implementation begins.

---

## Feature: [Feature Name]

**Type:** New feature / Enhancement / Redesign
**Priority:** Must have / Should have / Could have
**Target release:** [version or sprint]
**Author:** [Name]
**Last updated:** [YYYY-MM-DD]

---

### Summary

[2–3 sentences. What is this feature? Who is it for? What problem does it solve?]

---

### Problem

[Describe the problem this feature solves from the user's perspective. Include any supporting data: user feedback, support tickets, analytics, error rates. Be specific about the pain.]

**Who is affected:**
- [User type 1: how they are affected]
- [User type 2: how they are affected]

**Current workaround (if any):**
[What do users do today to work around this problem? What is the cost of that workaround?]

---

### Proposed solution

[Describe the feature at a behavioral level. What does the user see and do? What happens in the system? Do not describe implementation — describe behavior.]

---

### User stories

**Primary:**
As a [user type], I want to [action], so that [outcome].

**Secondary (if applicable):**
As a [user type], I want to [action], so that [outcome].

---

### User flows

#### Flow 1: [Flow name — e.g., "Happy path: user completes action"]

1. User [does X]
2. System [responds with Y]
3. User [does Z]
4. System [confirms or completes]

#### Flow 2: [Flow name — e.g., "Error path: invalid input"]

1. User [does X with invalid data]
2. System [shows error message: "[exact error text]"]
3. User [corrects and resubmits]

---

### Functional requirements

| ID | Requirement | Priority |
|----|------------|---------|
| FR-01 | [The system must...] | Must have |
| FR-02 | [The system must...] | Must have |
| FR-03 | [The system should...] | Should have |
| FR-04 | [The system could...] | Could have |

---

### Non-functional requirements

| Category | Requirement |
|----------|------------|
| Performance | [e.g., "API response time p95 ≤ 400ms under 1000 concurrent users"] |
| Accessibility | [e.g., "WCAG 2.1 AA compliant"] |
| Security | [e.g., "All inputs sanitized, output encoded, CSRF protected"] |
| Availability | [e.g., "Feature must not reduce overall system uptime below 99.9%"] |
| Scalability | [e.g., "Must support 10x current load without architectural changes"] |

---

### Acceptance criteria

**Scenario 1: [Scenario name]**
- Given [precondition]
- When [user action or system event]
- Then [observable outcome with specific values]

**Scenario 2: [Error path]**
- Given [precondition]
- When [invalid action]
- Then [error response with specific message and status code]

**Scenario 3: [Edge case]**
- Given [edge condition]
- When [action]
- Then [expected behavior — may differ from happy path]

---

### Out of scope

The following are explicitly excluded from this feature:
- [Item 1 — and brief reason why]
- [Item 2]
- [Item 3]

---

### UI / UX notes

[Link to design mockups if available. Describe any key UX decisions or constraints. If no designer is involved, describe the expected behavior in text.]

**Key UX decisions:**
- [Decision 1 and rationale]
- [Decision 2]

---

### API contract (if applicable)

**Endpoint:** `[METHOD] /api/[path]`

Request:
```json
{
  "field1": "string",
  "field2": 123
}
```

Response (success):
```json
{
  "id": "uuid",
  "field1": "string",
  "createdAt": "ISO8601"
}
```

Response (error):
```json
{
  "error": "error_code",
  "message": "Human-readable description"
}
```

---

### Data model changes (if applicable)

**New fields:**
- `[table_name].[column_name]`: `[type]` — [description]

**Modified fields:**
- `[table_name].[column_name]`: changed from `[old_type]` to `[new_type]` — [reason]

**Migration required:** Yes / No
**Backward compatible:** Yes / No — [explain if no]

---

### Dependencies

**Requires:**
- [Other feature, system, or external API that must exist before this can ship]

**Blocks:**
- [Other feature or work that cannot proceed until this ships]

---

### Risks and open questions

**Risks:**
- [Risk 1: description and mitigation]
- [Risk 2: description and mitigation]

**Open questions:**
- [Question 1 — who needs to answer it, by when]
- [Question 2]

---

### Definition of done

- [ ] All functional requirements implemented
- [ ] All acceptance criteria pass
- [ ] Non-functional requirements verified
- [ ] Design review completed (if UI changes)
- [ ] Security review completed (if auth/data changes)
- [ ] Feature documentation updated
- [ ] Monitoring and alerting in place
- [ ] Deployed to production and smoke-tested
