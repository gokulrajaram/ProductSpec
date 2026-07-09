# ProductSpec Examples

Start here if you want to see ProductSpec as a working artifact rather than a schema.

`minimal.product-spec.md` stays plain Markdown by design. The richer examples use structured Scope, Success Metrics, and AI eval blocks where tools or agents benefit from parsed data.

## Which Example Should I Read?

| Example | Use this when you want to see |
| --- | --- |
| [`minimal.product-spec.md`](minimal.product-spec.md) | The smallest complete Product Spec. |
| [`ai-support-triage.product-spec.md`](ai-support-triage.product-spec.md) | Structured AI evals inside Acceptance Criteria. |
| [`agent-coded-feature.product-spec.md`](agent-coded-feature.product-spec.md) | A feature intended to be handed to an AI coding agent. |
| [`consumer-family-calendar.product-spec.md`](consumer-family-calendar.product-spec.md) | A consumer UX feature with a prototype link. |
| [`enterprise-approval-workflow.product-spec.md`](enterprise-approval-workflow.product-spec.md) | A cross-functional enterprise workflow. |
| [`internal-webhook-replay-api.product-spec.md`](internal-webhook-replay-api.product-spec.md) | A non-UI internal API. |
| [`platform-cache-migration.product-spec.md`](platform-cache-migration.product-spec.md) | Platform work with no conventional user-facing UI. |
| [`full-prd.product-spec.md`](full-prd.product-spec.md) | Optional sections and a richer PRD-style artifact. |
| [`hypothesis.product-spec.md`](hypothesis.product-spec.md) | A smaller bet framed as a hypothesis artifact. |
| [`revisions/`](revisions/) | A Product Spec evolving from `spec_revision: 1` to `spec_revision: 2`. |
| [`decision-traces/`](decision-traces/) | Companion Decision Trace examples for decisions, drift, and revisions. |

## What To Notice

- `problem` and `hypothesis` explain the product bet.
- `scope` separates what ships now from what is deliberately excluded. Use `productspec-scope` when tools should parse it.
- `acceptance_criteria` defines the build contract. For AI products, structured eval thresholds live here.
- `success_metrics` defines the market contract after launch. Use `productspec-success-metrics` when tools should compare targets to outcomes.
- `user_experience` is optional and points to the externally observable experience when one exists.
- `spec_revision` in frontmatter tracks the revision of this Product Spec's intent, separate from `spec_format_version`.

## Validate An Example

```bash
npm exec --package @productspec/parser -- productspec validate examples/minimal.product-spec.md
```

From a repo checkout:

```bash
npm run validate -- examples/minimal.product-spec.md
```
