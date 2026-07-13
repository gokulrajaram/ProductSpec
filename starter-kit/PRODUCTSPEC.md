# Product Specs

This repo uses ProductSpec for consequential software work where intent needs to survive handoff.

Product Specs live in `docs/product-specs/`.

Agent Runs live in `docs/agent-runs/` when an AI agent leaves a receipt for one execution against a pinned Product Spec revision.

Decision Traces live in `docs/decision-traces/` when intent changes, implementation drifts, or launch outcomes create a learning.

Before implementation begins, the Product Spec should answer:

- Who is hurting?
- What behavior do we expect to change?
- What is in scope, out of scope, and cut?
- What must be true before launch?
- How will we know whether the work mattered after launch?

Validate a Product Spec:

```bash
npm exec --package @productspec/parser -- productspec validate docs/product-specs/my-feature.product-spec.md
```

Validate an Agent Run:

```bash
npm exec --package @productspec/parser -- productspec validate-run docs/agent-runs/my-feature.agent-run.json
```
