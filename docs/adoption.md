# Adopting ProductSpec In A Team

ProductSpec works best when intent needs to survive handoff across people, tools, and agents.

This guide describes a practical team setup.

## Store Product Specs Near The Work

Keep Product Specs in Git when the work is tied to a codebase.

Common patterns:

```text
specs/<feature>.product-spec.md
product-specs/<feature>.product-spec.md
docs/product-specs/<feature>.product-spec.md
```

Use whichever folder matches your repo conventions. The important thing is that the Product Spec is versioned, reviewable, and linkable from pull requests, tickets, and engineering specs.

## Link From Jira Or Linear

Jira and Linear should track work, not replace intent.

Recommended pattern:

- Create one epic or parent issue for the work.
- Link the Product Spec from the epic description.
- Create implementation tickets from the Product Spec's scope and acceptance criteria.
- Link each ticket back to the Product Spec.

The Product Spec should remain the durable statement of what and why. Tickets can change as implementation details are discovered.

## Link To Figma Or Other Design Artifacts

Use the optional `user_experience` section when the work has an externally observable surface.

Examples:

```md
## User Experience

https://figma.com/proto/example
```

```md
## User Experience

https://staging.example.com/new-flow
```

Figma, staging links, screenshots, API docs, CLI demos, or Loom walkthroughs can all work. ProductSpec does not replace those artifacts. It explains what they need to accomplish.

## Feed Engineering Specs

ProductSpec sits upstream of engineering spec systems such as OpenSpec and Spec Kit.

Recommended handoff:

1. Product Spec defines problem, hypothesis, scope, acceptance criteria, and success metrics.
2. Engineering spec translates that intent into architecture, implementation plan, tasks, and tests.
3. AI coding agents or humans implement against the engineering spec.
4. Pull requests report which acceptance criteria are satisfied.
5. Success metrics are measured after launch.

Acceptance criteria are the build contract. Success metrics are the market contract.

## Reference From Git

Pull requests should link back to the Product Spec.

Example PR description:

```md
Implements acceptance criteria from `specs/webhook-replay-api.product-spec.md`.

Acceptance criteria covered:

- permissioned replay endpoint
- idempotency guard
- audit log entry
- expired event error
```

The Product Spec can also be updated through pull request review when product intent changes.

## Validate In CI

Use the published CLI in CI:

```bash
npm exec --package @productspec/parser -- productspec validate specs/my-feature.product-spec.md
```

For multiple specs:

```bash
find specs -name '*.product-spec.md' -print0 | xargs -0 -n1 npm exec --package @productspec/parser -- productspec validate
```

Recommended policy:

- Validate Product Specs on every pull request.
- Treat validator errors as blocking.
- Treat warnings as non-blocking until the team chooses a stricter policy.
- Validate examples and templates in the same CI job.

You can also use the ProductSpec GitHub Action:

```yaml
name: ProductSpec

on:
  pull_request:

jobs:
  validate-product-specs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: gokulrajaram/ProductSpec@main
        with:
          files: "docs/product-specs/**/*.product-spec.md"
```

## Suggested Team Convention

For consequential work, require a Product Spec before creating implementation tickets.

A lightweight team rule:

```text
No epic without a Product Spec.
No engineering plan without acceptance criteria.
No launch review without success metrics.
```

This keeps intent visible without turning ProductSpec into ceremony for every small change.
