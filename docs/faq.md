# ProductSpec FAQ

## Is ProductSpec just a PRD?

No. A classic PRD is mostly a human handoff. A Product Spec is a human-readable, machine-parseable intent document that can be used by teams, review tools, engineering-spec systems, and AI agents.

ProductSpec keeps the useful parts of a PRD: problem, hypothesis, scope, acceptance criteria, and success metrics. It adds enough structure for downstream tools to preserve intent.

## How is ProductSpec different from OpenSpec or Spec Kit?

ProductSpec sits one layer earlier.

```text
Product Spec -> Engineering Spec -> Code
what / why      how / plan / tasks   implementation
```

OpenSpec and Spec Kit help turn intent into technical plans and tasks. ProductSpec captures the software intent before that planning starts.

## Why Markdown?

Markdown works in Git, pull requests, issues, docs, editors, and agent workflows. It is readable without a special app, easy to diff, and simple for tools to parse.

## Why not just use Jira or Linear?

Jira and Linear are excellent work trackers. They are not the durable source of product intent.

A Product Spec can become epics, issues, or tasks, but the spec should remain the record of the problem, hypothesis, scope, acceptance criteria, and success metrics those tasks serve.

## Where do AI evals live?

AI eval thresholds belong in `acceptance_criteria`.

Acceptance Criteria are the build contract: what must be true before launch. Success Metrics are the market contract: what user or business behavior proves the shipped product mattered after launch.

When an AI eval should be parsed by tools, write it as a fenced `productspec-ai-evals` block inside Acceptance Criteria. Keep post-launch usage, retention, revenue, or quality outcomes in Success Metrics.

## What is `spec_revision`?

`spec_revision` is an optional positive integer in frontmatter:

```yaml
spec_revision: 2
```

It tracks the revision of this specific Product Spec's intent. It is separate from `spec_format_version`, which tracks the ProductSpec standard version.

Use `spec_revision` when scope, user experience, acceptance criteria, or success metrics materially change. Git remains the detailed history.

## When should I not use ProductSpec?

Do not use ProductSpec for every act of building.

For a quick solo script, throwaway prototype, or tiny internal tweak, it may be faster to build directly. ProductSpec is for consequential software work where intent needs to survive handoff across people, tools, or AI agents.

## Does ProductSpec define product quality?

No. ProductSpec defines a portable structure. It does not define product taste or decide whether a spec is good.

Teams and products can build opinionated review layers on top of the standard.

## Can ProductSpec live in Git?

Yes. That is one of the best starting points.

Put Product Specs in a `specs/` directory, validate them in CI, and link issues, engineering specs, and pull requests back to the Product Spec revision they implement.
