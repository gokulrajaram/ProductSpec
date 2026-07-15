# Real-World ProductSpec Gallery

This gallery points to realistic Product Specs that show ProductSpec across product, platform, AI, infrastructure, and agent-led work.

Use these when you want a pattern to copy, not just a schema to read.

## Product Harness And Agent Work

| Example | What it shows |
| --- | --- |
| [`../product-harness/video-transcript.product-spec.md`](../product-harness/video-transcript.product-spec.md) | A Product Spec meant to become an Agent Handoff, Agent Run, and Decision Trace. |
| [`../harness-demo/checkout-notifications.product-spec.md`](../harness-demo/checkout-notifications.product-spec.md) | A 5-minute Product Harness loop with validation, Agent Run, and Decision Trace. |
| [`../agent-ready-repo/docs/product-specs/transcript-search.product-spec.md`](../agent-ready-repo/docs/product-specs/transcript-search.product-spec.md) | A tiny repo layout that agents can read and implement from. |
| [`../agent-coded-feature.product-spec.md`](../agent-coded-feature.product-spec.md) | A feature written so a coding agent can stay inside scope and report evidence. |

## AI And Evals

| Example | What it shows |
| --- | --- |
| [`../ai-support-triage.product-spec.md`](../ai-support-triage.product-spec.md) | Structured AI evals inside Acceptance Criteria. |
| [`../rag-answer-quality-pipeline.product-spec.md`](../rag-answer-quality-pipeline.product-spec.md) | RAG answer quality with citations, evals, and eval-run evidence. |

## Product And UX

| Example | What it shows |
| --- | --- |
| [`../consumer-family-calendar.product-spec.md`](../consumer-family-calendar.product-spec.md) | A consumer-facing UX feature with prototype evidence. |
| [`../realtime-collaborative-cursors.product-spec.md`](../realtime-collaborative-cursors.product-spec.md) | Realtime UX infrastructure with reconnect and latency criteria. |
| [`../checkout-3ds-recovery.product-spec.md`](../checkout-3ds-recovery.product-spec.md) | Checkout recovery with payment-state safety and post-launch metrics. |

## Internal Tools, APIs, And Platforms

| Example | What it shows |
| --- | --- |
| [`../internal-webhook-replay-api.product-spec.md`](../internal-webhook-replay-api.product-spec.md) | A non-UI internal API with operational acceptance criteria. |
| [`../support-sla-analytics-pipeline.product-spec.md`](../support-sla-analytics-pipeline.product-spec.md) | A data pipeline with freshness, backfill, and dashboard trust criteria. |
| [`../platform-cache-migration.product-spec.md`](../platform-cache-migration.product-spec.md) | Platform work where the user experience is operational rather than visual. |
| [`../enterprise-approval-workflow.product-spec.md`](../enterprise-approval-workflow.product-spec.md) | A cross-functional enterprise workflow. |

## Traceability And Evidence

| Example | What it shows |
| --- | --- |
| [`../evidence-loop/`](../evidence-loop/) | Product Spec evidence links across implementation, evals, metrics, and Decision Trace. |
| [`../decision-traces/`](../decision-traces/) | Companion Decision Trace examples for decisions, drift, and revisions. |
| [`../converted-customer-handoff.product-spec.md`](../converted-customer-handoff.product-spec.md) | Converted PRD content with applies-to links, related artifacts, and tool metadata. |

## Want To Contribute One?

Good examples are realistic, anonymized, and valid. Pick a domain not covered here, add one `.product-spec.md` file under `examples/`, and run:

```bash
npm run validate -- examples/your-example.product-spec.md
```

Then open a pull request and explain what product-work pattern the example teaches.
