# CI Badge Demo

Use this when you want a repo to show that Product Specs are validated in CI.

ProductSpec badges should report facts, not product judgment. A good first badge is simply: "the ProductSpec validation workflow is passing."

## 1. Add A Workflow

Create `.github/workflows/productspec.yml`:

```yaml
name: ProductSpec

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "22"

      - name: Validate Product Specs
        run: |
          for f in docs/product-specs/*.product-spec.md; do
            npx --yes -p @productspec/parser@latest productspec validate "$f"
          done
```

Change `docs/product-specs/*.product-spec.md` to match where your repo stores specs.

## 2. Add A README Badge

Add this to your repo README:

```md
[![ProductSpec](https://github.com/OWNER/REPO/actions/workflows/productspec.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/productspec.yml)
```

Replace `OWNER` and `REPO`.

## 3. Validate Companion Artifacts

If your repo stores Agent Runs or Decision Traces, extend the workflow:

```yaml
      - name: Validate Agent Runs
        run: |
          for f in docs/agent-runs/*.agent-run.json; do
            npx --yes -p @productspec/parser@latest productspec validate-run "$f"
          done

      - name: Validate Decision Traces
        run: |
          for f in docs/decision-traces/*.decision-trace.json; do
            npx --yes -p @productspec/parser@latest productspec validate-trace "$f"
          done
```

## 4. Use The ProductSpec GitHub Action

You can also use the repo action directly:

```yaml
- uses: gokulrajaram/ProductSpec@main
  with:
    files: "docs/product-specs/**/*.product-spec.md"
    decision_traces: "docs/decision-traces/**/*.decision-trace.json"
    agent_runs: "docs/agent-runs/**/*.agent-run.json"
```

## What The Badge Means

A passing badge means the Product Spec files are structurally valid and portable.

It does not mean:

- the product bet is good
- the acceptance criteria are sufficient
- the implementation satisfies the spec
- post-launch success metrics have moved

For that loop, use ProductSpec as a Product Harness: validate the spec, hand it to an agent, collect evidence, record Agent Run receipts, and use Decision Trace when evidence changes intent.
