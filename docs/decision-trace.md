# Decision Trace

Decision Trace is an optional companion standard to ProductSpec.

ProductSpec captures committed intent. Decision Trace records how consequential decisions, drift, revisions, and outcomes are handled over time.

Decision Trace is not a ProductSpec section. It can live beside a Product Spec, but it is intentionally general enough to trace other consequential software decisions.

```text
ProductSpec = current committed intent
Decision Trace = how that intent changed, drifted, or was reconciled
```

## Why It Exists

Intent does not stay fixed once implementation starts.

Code changes. Tests codify behavior. Prototypes evolve. AI eval thresholds move. Metrics get instrumented differently. Workarounds become user-visible behavior.

Some of those changes are legitimate product decisions. Some are accidental drift.

Decision Trace records the explicit decision:

- update the Product Spec
- update the implementation
- accept the tradeoff
- reopen the work
- record the learning

The goal is not to record every comment or meeting note. The goal is to make consequential decisions portable and durable.

## Relationship To ProductSpec

ProductSpec standardizes software intent before implementation.

Decision Trace standardizes how intent changes after evidence, implementation, or outcomes challenge it.

A typical Git layout:

```text
specs/
  transcript-search.product-spec.md
  transcript-search.decision-trace.json
```

The Product Spec remains the current committed intent. The Decision Trace explains how the team got there.

## Event Types

Decision Trace supports these initial event types:

- `intent_decision`
- `scope_drift`
- `acceptance_criteria_drift`
- `ux_drift`
- `ai_eval_drift`
- `success_metric_review`
- `implementation_tradeoff`
- `spec_revision`
- `outcome_review`

## Core Shape

```json
{
  "decision_trace_format_version": "0.1",
  "trace_id": "transcript-search-trace",
  "title": "Transcript Search Decision Trace",
  "created_at": "2026-07-06T00:00:00Z",
  "updated_at": "2026-07-07T00:00:00Z",
  "subject": {
    "type": "product_spec",
    "id": "ai-transcript-search",
    "product_spec_path": "../full-prd.product-spec.md",
    "product_spec_revision": 1
  },
  "events": [
    {
      "event_id": "speaker-labels-request",
      "event_type": "scope_drift",
      "occurred_at": "2026-07-07T00:00:00Z",
      "summary": "Implementation branch added speaker label extraction even though speaker labels were cut from v1 scope.",
      "drift": {
        "spec_claim": "Speaker labels are listed as cut from this version.",
        "observed_reality": "The pull request adds speaker label extraction to transcript processing."
      },
      "decision": {
        "outcome": "update_implementation",
        "rationale": "Speaker labels add evaluation and UX complexity outside the intended first release.",
        "approved_by": ["Product lead", "Engineering lead"]
      }
    }
  ]
}
```

## Files

- Schema: [`schema/decision-trace.schema.json`](../schema/decision-trace.schema.json)
- Example: [`examples/decision-traces/transcript-search.decision-trace.json`](../examples/decision-traces/transcript-search.decision-trace.json)

## Validate A Decision Trace

Use the ProductSpec CLI:

```bash
npm exec --package @productspec/parser -- productspec validate-trace docs/decision-traces/my-feature.decision-trace.json
```

In a repo checkout:

```bash
npm run build
node dist/cli.js validate-trace examples/decision-traces/transcript-search.decision-trace.json
```

## Open Standard Boundary

The open standard defines the portable trace format and link conventions.

Implementations can generate traces, detect drift, connect to tools, propose revisions, ask for approval, and build organizational memory on top of the format.

The trace format should be open. The trace generation and reconciliation system can be implemented many ways.
