---
name: productspec-authoring
description: Writes, validates, and converts ProductSpec files (.product-spec.md), the Markdown format for recording product intent before implementation. Use when authoring a new Product Spec, converting an existing PRD or feature doc into one, validating spec files locally or in CI, or recording how a spec's intent changed over time in a Decision Trace. For implementing code against a Product Spec that already exists, use the productspec skill instead.
license: MIT
metadata:
  version: "0.1"
---

# Authoring ProductSpec Files

ProductSpec is a Markdown format for the product decision that comes before tickets, engineering plans, and code. One file per feature holds the committed intent.

This skill covers producing that file. Reading a finished spec and building against it is a different job, and the `productspec` skill covers it. This skill ends when the file validates.

## Always true

- Files use the extension `.product-spec.md`: YAML frontmatter between `---` markers, then `## Section` headings.
- Five sections are mandatory, in order: `problem`, `hypothesis`, `scope`, `acceptance_criteria`, `success_metrics`.
- Headings match case- and separator-insensitively. `## Acceptance Criteria` and `## acceptance_criteria` are the same section. Title case is the convention.
- Frontmatter requires `spec_format_version: "0.1"`, `title`, `artifact_type` (`hypothesis` | `prd` | `openspec_proposal`), `author`, `created_at`, `updated_at`. Optional: `spec_revision`, `linked_github_repo`, `applies_to`, `custom_sections`, `tool_metadata`.
- `acceptance_criteria` and `success_metrics` each carry a required fenced block. Prose alone fails validation. Structured scope, AI evals, and related artifacts are optional.
- Structured items carry durable ids: `AC-<number>`, `SM-<number>`, `EVAL-<number>`. Other documents cite them.
- AI evals live inside `## Acceptance Criteria`, never in a section of their own. Related artifacts live inside `## Related Artifacts`.
- Validate any file with: `npm exec --yes --package @productspec/parser -- productspec validate <file>` (`--yes` suppresses npm's interactive install prompt, which hangs CI and non-interactive agents).
- The full normative definition is SPEC.md in the ProductSpec repository: https://github.com/gokulrajaram/ProductSpec/blob/main/SPEC.md. When this skill and SPEC.md disagree, SPEC.md wins.

## Pick the task, read one reference

| Task | Read |
|---|---|
| Write a new spec from scratch | [references/authoring.md](references/authoring.md) |
| Validate files and fix errors | [references/validating.md](references/validating.md) |
| Convert an existing PRD or feature doc | [references/converting.md](references/converting.md) |
| Record drift, revisions, and outcomes | [references/decision-trace.md](references/decision-trace.md) |

Read only the reference the task needs.

## Ground rules

- Never renumber a durable id. `AC-2` means the same criterion tomorrow as it does today, because a ticket, an engineering spec, or another agent may cite it. Add new ids at the end.
- A success metric needs a target and a window, and the block is required. When the number depends on a baseline that only exists after launch, write `target: tbd` with `target_status: provisional` and a named `target_owner`. Never invent a number to clear the validator.
- Preserve the author's Markdown inside sections. Tables, lists, and links survive the format. Do not flatten them.
- `spec_revision` increments only when product intent materially changes, never for typo or formatting edits.
