# ActionForge

**Turn vague ideas into executable plans.**

A Claude Code skill/plugin that transforms any fuzzy input — an idea, a task, a bug, a product concept — into a structured, immediately actionable output.

---

## The problem

Most planning tools help you think. Claude is already good at thinking.

What's missing is structure at the execution layer: taking the output of thinking and turning it into something you can actually act on — tasks with dependencies, debugging flows with ranked hypotheses, MVP plans with explicit validation steps, Jira issues with acceptance criteria.

ActionForge fills that gap.

---

## Features

- **Auto-detects input type** — idea, task, bug, product concept, or AI feature. No need to specify.
- **Six execution modes** — dev, product, startup, debug, ai, jira. Each mode adapts output vocabulary and structure for its audience.
- **Production-ready templates** — task breakdowns, project plans, feature specs, debugging flows, Jira issues, MVP plans.
- **Dependency-ordered tasks** — tasks are always ordered by execution dependency, not by importance or how they were thought of.
- **Hypothesis-driven debugging** — bugs produce confidence-ranked hypotheses, diagnostic checklists, and fix approaches.
- **Jira-ready output** — full issue blocks with all required fields, acceptance criteria in Given/When/Then, sub-tasks, and sprint suggestions.
- **Startup-mode validation** — MVP plans lead with the riskiest assumption and a validation method before building.
- **No filler, no fluff** — every line of output must help someone execute.

---

## Installation

### Option 1: Claude Code Plugin Marketplace

If the ActionForge plugin is available in the Claude Code plugin marketplace:

```
/plugin marketplace add zenoproduction/actionforge
```

Then browse and install from within Claude Code's plugin interface.

> ActionForge is an independent open-source plugin and is not affiliated with or endorsed by Anthropic.

---

### Option 2: npm CLI (recommended for quick install)

```bash
npm install -g @actionforge/claude-skill
```

The installer runs automatically and copies the skill to `~/.claude/skills/actionforge/`.

To install or reinstall manually:
```bash
actionforge-install
```

To uninstall:
```bash
actionforge-install uninstall
```

---

### Option 3: Manual installation

1. Clone the repository:
```bash
git clone https://github.com/zenoproduction/actionforge.git
cd actionforge
```

2. Copy the skill to your Claude skills directory:
```bash
cp -r .claude/skills/actionforge ~/.claude/skills/actionforge
```

3. Verify the files are in place:
```bash
ls ~/.claude/skills/actionforge
# SKILL.md  references/  templates/
```

4. Open Claude Code in any project and run:
```
/actionforge hello
```

---

## Usage

### Basic usage

```
/actionforge <your input>
```

ActionForge automatically detects what kind of input you've provided and picks the appropriate output structure.

Aliases:
```
/af <your input>
/forge <your input>
```

---

### Usage with modes

Prefix your input with `/mode <name>` to use a specific output style:

```
/actionforge /mode dev implement OAuth2 login with Google
/actionforge /mode jira the checkout flow breaks on mobile when the cart has more than 10 items
/actionforge /mode startup I want to build a SaaS that helps freelancers track their invoices
/actionforge /mode debug users are getting randomly logged out after about 30 minutes
/actionforge /mode product add a dark mode to the dashboard
/actionforge /mode ai build a document classification feature using GPT-4
```

Or set a mode for the entire session:
```
/mode dev
```

All subsequent ActionForge calls in that session will use dev mode until changed.

---

## Mode reference

| Mode | Audience | Focus |
|------|---------|-------|
| `dev` | Developers | Architecture, files, implementation steps, edge cases, tests |
| `product` | Product managers | User stories, acceptance criteria, MoSCoW priority, KPIs |
| `startup` | Founders, indie hackers | Validation, MVP scope, monetization, first customers |
| `debug` | Developers | Hypotheses, reproduction, diagnostic checks, fixes |
| `ai` | ML engineers | Model role, prompt architecture, evaluation, failure modes |
| `jira` | Scrum teams | Full Jira issue blocks with all fields and sub-tasks |

---

## Example outputs

### Example: idea → MVP plan

Input:
```
/actionforge I want to build a tool that lets developers write SQL queries in plain English
```

Output (auto-detected: idea):
```
## MVP Plan: Natural Language SQL

Input interpreted as: idea
Scope: Developer tool that converts English-language questions into SQL queries for a connected database.

---

### Problem
Developers without deep SQL expertise struggle to write complex queries for reporting and ad-hoc analysis.

### Target users
- Backend developers comfortable with code but not fluent in SQL
- Data analysts who prototype queries but have limited time to optimize

### Core value
Write a question. Get runnable SQL. Copy to your DB client.

### MVP scope (in)
- Accept natural language input
- Connect to a local or remote PostgreSQL database
- Generate and display SQL (do not execute automatically in v1)
- Show the schema context used to generate the query

### MVP scope (out)
- Query execution from within the tool
- Support for MySQL, SQLite, BigQuery (add after PostgreSQL validation)
- Query history and saved queries
- Team collaboration

### First tasks
- [ ] Define the DB connection config format (connection string vs. structured fields)
- [ ] Build schema introspection: fetch table names, column names, types
- [ ] Design the prompt: system prompt with schema context + user question
- [ ] Implement Claude API call and parse the SQL response
- [ ] Build CLI interface: input question → display generated SQL

### Risks
- Generated SQL may be syntactically wrong for edge cases — add a dry-run explain mode
- Schema context may exceed context window for very large databases — scope to 20 tables max for v1

Assumptions made:
- PostgreSQL as the only supported DB for v1
- CLI tool (not web app) for v1
```

---

### Example: bug → debug plan (/mode debug)

Input:
```
/actionforge /mode debug API requests are failing with 429 after we deployed the new rate limiter
```

Output:
```
## Debug Plan: 429 Rate Limiting After Deploy

Input interpreted as: bug
Mode: debug

---

### Symptom
API requests are returning 429 (Too Many Requests) after the rate limiter was deployed. Unclear if the rate limit is misconfigured, too aggressive, or shared incorrectly across clients.

### Hypotheses

| # | Hypothesis | Confidence | Testability |
|---|-----------|-----------|------------|
| 1 | Rate limit is per-IP but deployed behind a load balancer — all requests appear to come from one IP | 80% | High |
| 2 | Rate limit window is too short (e.g., 10 req/min when usage patterns require 100 req/min) | 65% | High |
| 3 | The rate limiter is counting internal service-to-service traffic, not just external | 40% | Medium |
| 4 | Redis key TTL is not being set correctly — counter never resets | 35% | Medium |

### Diagnostic checklist
- [ ] Check what IP is being used as the rate limit key — log it per request
- [ ] Check if the load balancer sets X-Forwarded-For and if the rate limiter reads it
- [ ] Compare configured limit against actual request volume before the deploy
- [ ] Check Redis TTL on the rate limit key: `TTL ratelimit:<key>`
- [ ] Check if internal health checks and service-to-service calls share the same key space

### Proposed fix for hypothesis 1
Configure rate limiter to read client IP from X-Forwarded-For header (or X-Real-IP), not from the connection's remote address.

### Regression prevention
- [ ] Add test: rate limit is applied per client IP, not per load balancer IP
- [ ] Add test: limit resets after the configured window expires
- [ ] Add monitoring: alert if 429 rate exceeds 0.1% of all API requests
```

---

### Example: /mode jira

Input:
```
/actionforge /mode jira add two-factor authentication to the login flow
```

Output:
```
---
Issue type: Story
Title: Add two-factor authentication to the login flow
Epic: Authentication & Security
Priority: High
Story points: 8
Labels: auth, security, backend, frontend
Sprint: Next sprint

Description:
Users can enable two-factor authentication (2FA) on their account using a TOTP authenticator app. Once enabled, the login flow requires a 6-digit code in addition to the password. This reduces account compromise risk for users who choose to opt in.

User story:
As a security-conscious user, I want to enable 2FA on my account so that a stolen password alone cannot grant access.

Acceptance Criteria:
- Given a user with 2FA disabled, when they navigate to Security Settings, then they see an option to enable 2FA with a QR code for their authenticator app.
- Given a user with 2FA enabled, when they enter the correct password on login, then they are prompted for a 6-digit TOTP code before being granted access.
- Given a user with 2FA enabled who enters an incorrect TOTP code, when they submit the login form, then they receive HTTP 401 with message "Invalid authentication code" and are not granted access.

Sub-tasks:
- [ ] Implement TOTP secret generation and QR code display
- [ ] Implement TOTP verification endpoint
- [ ] Add 2FA enforcement step to login flow
- [ ] Write integration tests for enable/disable and login with 2FA
- [ ] Update security settings UI

Linked issues:
- Blocks: N/A
- Relates to: AUTH-12 (session management)
---
```

---

## Repository structure

```
actionforge/
├── .claude-plugin/
│   └── marketplace.json        Plugin marketplace metadata
├── .claude/
│   └── skills/
│       └── actionforge/
│           ├── SKILL.md         Core skill definition (entry point)
│           ├── references/
│           │   ├── thinking-frameworks.md
│           │   ├── decomposition-rules.md
│           │   ├── prioritization.md
│           │   ├── output-standards.md
│           │   └── mode-system.md
│           └── templates/
│               ├── task-breakdown.md
│               ├── project-plan.md
│               ├── feature-spec.md
│               ├── debugging-flow.md
│               ├── jira-task.md
│               └── mvp-plan.md
├── cli/
│   └── install.js              npm CLI installer
├── package.json
├── skill.json
├── CLAUDE.md
├── README.md
├── CHANGELOG.md
└── LICENSE
```

---

## Contributing

Contributions are welcome. ActionForge is designed to be community-driven.

### What to contribute

- New modes (e.g., `/mode security`, `/mode ops`)
- Improved templates with real-world field completeness
- New reference documents covering additional planning frameworks
- Bug fixes in the CLI installer
- Corrections to output standards or decomposition rules

### Rules for content contributions

1. **No placeholder content.** Every template and reference file must be immediately usable.
2. **No motivational language.** ActionForge is direct and practical.
3. **Output must be actionable.** If a step cannot be executed today, it is not a valid step.
4. **Follow output-standards.md.** Formatting and content rules apply to all new content.

### How to contribute

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-change`
3. Make your changes
4. Test the skill locally by copying to `~/.claude/skills/actionforge/` and running in Claude Code
5. Open a pull request with a clear description of what changed and why

### Reporting issues

Open an issue at: https://github.com/zenoproduction/actionforge/issues

Include:
- Input you provided to ActionForge
- Output you received
- Output you expected

---

## Author

Created by [Marco Venturelli](https://github.com/zenoproduction) — [info@marcoventurelli.com](mailto:info@marcoventurelli.com)

---

## License

MIT — see [LICENSE](./LICENSE)
