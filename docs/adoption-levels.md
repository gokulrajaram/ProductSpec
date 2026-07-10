# ProductSpec Adoption Levels

ProductSpec should be easy to adopt one step at a time.

Teams do not need to connect every downstream system on day one. Start with the smallest level that makes intent clearer, then add structure when handoffs get more expensive.

## Level 1: Write Product Specs

Store `.product-spec.md` files in a repo, shared docs folder, or product workspace.

This level is enough when the goal is to make the product decision readable, durable, and portable.

Fastest setup: copy [`starter-kit/`](../starter-kit/) into a repository and rename the example Product Spec.

Recommended practice:

- Use the canonical sections.
- Include `spec_revision: 1`.
- Link designs, issues, data, or research in the relevant sections.

## Level 2: Validate Product Specs

Run the ProductSpec validator locally or in CI.

This level catches structural problems before downstream tools depend on the file.

Recommended practice:

- Validate every Product Spec before review.
- Treat validator errors as blocking.
- Treat warnings as prompts for human review.

## Level 3: Review Product Specs In Git

Open pull requests for meaningful Product Spec revisions.

This level makes product intent reviewable by product, design, engineering, data, and leadership without forcing everyone into a new tool.

Recommended practice:

- Keep Product Specs near the code or implementation work.
- Ask reviewers to comment on intent, scope, acceptance criteria, and success metrics.
- Merge the Product Spec before major implementation begins.

## Level 4: Link Product Specs To Work

Connect Product Spec sections to Jira or Linear issues, Figma files, engineering specs, pull requests, tests, evals, dashboards, and launch reviews.

This level turns the Product Spec into the shared upstream artifact for the work.

Recommended practice:

- Link tickets to a specific `spec_revision`.
- Link pull requests to acceptance criteria.
- Link success metrics to launch reviews.
- Link AI evals to their input sets and evaluator runs.

## Level 5: Record Decision Traces

Use Decision Trace documents when intent changes, implementation drifts, or outcomes force a learning.

This level preserves why the team changed direction over time.

Recommended practice:

- Record meaningful scope, acceptance criteria, UX, eval, and success metric drift.
- Record whether the team updated the Product Spec, changed implementation, accepted a tradeoff, or reopened work.
- Link Decision Trace events back to Product Spec revisions, pull requests, issues, experiments, and outcome evidence.
- Use `starter-kit/docs/decision-traces/example.decision-trace.json` as the smallest starting shape.

## Level 6: Reconcile Drift

Use tooling or team review rituals to compare Product Spec intent against implementation reality.

This level is the long-term control loop:

```text
Intent -> Implementation -> Drift -> Decision -> Revised Intent
```

Recommended practice:

- Review linked implementation before launch.
- Revisit success metrics after launch.
- Open explicit decisions when shipped behavior differs from approved intent.
- Keep the Product Spec as current committed intent, not as an accidental mirror of code.
