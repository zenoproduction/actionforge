# Changelog

All notable changes to ActionForge are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2025-05-04

### Added

**Core skill**
- `SKILL.md`: Full skill definition with auto-detection of input type (idea, task, bug, product concept, AI feature)
- Input routing: different output structures based on detected input type
- Anti-pattern rules: explicit list of output behaviors to avoid
- Behavior rules: 8 core rules governing how ActionForge processes any input

**Mode system**
- `/mode dev`: Output for developers — affected files, testing approach, rollback plan
- `/mode product`: Output for product managers — user stories, MoSCoW priority, acceptance criteria, KPIs
- `/mode startup`: Output for founders — validation-first, MVP scope, first customer strategy, unit economics
- `/mode debug`: Output for debugging — confidence-ranked hypothesis table, diagnostic checklists, fix approaches
- `/mode ai`: Output for AI/ML features — model role, prompt architecture, evaluation criteria, failure modes
- `/mode jira`: Full Jira issue blocks — all fields, Given/When/Then acceptance criteria, sub-tasks, sprint suggestions

**Reference documents**
- `thinking-frameworks.md`: 8 reasoning frameworks used to analyze inputs
- `decomposition-rules.md`: 10 rules for breaking work into executable units
- `prioritization.md`: RICE, MoSCoW, risk-adjusted priority, and sequencing models
- `output-standards.md`: Formatting rules, content rules, task writing standards, and length calibration
- `mode-system.md`: Detailed specification for each mode including vocabulary, output modifications, and examples

**Templates**
- `task-breakdown.md`: Full development task decomposition template
- `project-plan.md`: Multi-milestone project planning template
- `feature-spec.md`: Complete feature specification template with API contract and data model sections
- `debugging-flow.md`: Structured debugging flow with hypothesis table, diagnostic checklist, and postmortem section
- `jira-task.md`: Jira issue templates for Epic, Story, Task, Bug, and Sub-task
- `mvp-plan.md`: MVP planning template with validation-first approach and competitive landscape

**CLI installer**
- `cli/install.js`: Node.js CLI using only standard library (`fs`, `path`, `os`)
- Commands: `install`, `uninstall`, `help`
- Auto-runs on `npm install` via postinstall script
- Binary: `actionforge-install`

**npm package**
- Package name: `@actionforge/claude-skill`
- Version: `1.0.0`
- Includes: CLI, skill files, README, LICENSE

**Plugin marketplace**
- `.claude-plugin/marketplace.json`: Plugin metadata for Claude Code plugin marketplace integration

**Documentation**
- `README.md`: Full public documentation with installation options, usage examples, mode reference, and contribution guide
- `CLAUDE.md`: Claude Code behavior rules for working in this repository
- `skill.json`: Machine-readable skill metadata

---

## Upcoming

Changes planned for future releases are tracked in [GitHub Issues](https://github.com/zenoproduction/actionforge/issues).

Candidates for `1.1.0`:
- `/mode security`: Output for security review — threat model, OWASP coverage, attack surface analysis
- `/mode ops`: Output for infrastructure and deployment — runbooks, rollback plans, monitoring checklists
- Template: `api-spec.md` for designing REST and GraphQL APIs
- Template: `adr.md` for Architecture Decision Records
- Improved AI mode with model comparison table and cost calculator
