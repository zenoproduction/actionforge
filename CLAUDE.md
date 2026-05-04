# ActionForge — Claude Code Behavior

This is the ActionForge repository. It contains a Claude Code skill/plugin that turns vague inputs into structured execution plans.

## What this repository is

ActionForge is a reusable skill for Claude Code. It is not an application. It does not run a server. It does not have a build step beyond packaging.

The primary deliverable is the content inside `.claude/skills/actionforge/`. Everything else (CLI, package.json, templates, references) supports the distribution and documentation of that skill.

## How to work in this repo

### Making changes to the skill

The skill behavior is defined in:
- `.claude/skills/actionforge/SKILL.md` — core skill definition, modes, and examples
- `.claude/skills/actionforge/references/` — supporting frameworks and rules
- `.claude/skills/actionforge/templates/` — output templates

When editing these files:
- Do not add motivational language
- Do not add placeholder content
- All content must be immediately usable — no "fill this in later" sections
- Follow the output standards defined in `references/output-standards.md`

### Testing the skill

To test the skill locally:
1. Copy `.claude/skills/actionforge/` to `~/.claude/skills/actionforge/`
2. Open Claude Code in any project directory
3. Run `/actionforge <your input>`

Or run the CLI installer:
```
node cli/install.js
```

### Making changes to the CLI installer

The CLI is a single file: `cli/install.js`

It uses only Node.js standard library (`fs`, `path`, `os`). Do not introduce external dependencies.

Test it by running:
```
node cli/install.js help
node cli/install.js install
node cli/install.js uninstall
```

## What Claude should NOT do in this repo

- Do not refactor working code without a specific reason
- Do not generate new template files unless explicitly asked
- Do not add dependencies to `package.json`
- Do not modify the skill trigger names without updating all references
- Do not change the marketplace.json schema structure — external tooling depends on it

## Repository structure summary

```
.claude-plugin/
  marketplace.json          Plugin marketplace metadata

.claude/skills/actionforge/
  SKILL.md                  Core skill definition (entry point)
  references/               Supporting reference documents
    thinking-frameworks.md  How to reason about inputs
    decomposition-rules.md  How to break down work
    prioritization.md       How to order and prioritize
    output-standards.md     Formatting and quality rules
    mode-system.md          How modes work
  templates/                Output templates
    task-breakdown.md
    project-plan.md
    feature-spec.md
    debugging-flow.md
    jira-task.md
    mvp-plan.md

cli/
  install.js                npm CLI installer

package.json                npm package definition
skill.json                  Skill metadata
CLAUDE.md                   This file
README.md                   Public-facing documentation
CHANGELOG.md                Version history
LICENSE                     MIT license
```

## Contribution rules

When contributing to this repo, follow these rules:

1. All skill content must be actionable. No vague guidance.
2. Templates must be usable without modification (no `[FILL THIS IN]` placeholders).
3. Reference documents must contain real, applicable rules — not aspirational descriptions.
4. The SKILL.md must remain self-contained. A user reading only SKILL.md must understand how to use ActionForge.
5. Changes to modes or triggers must be reflected in: SKILL.md, mode-system.md, skill.json, and README.md.
