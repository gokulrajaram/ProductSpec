# Decision Trace: Recording How Intent Changed

Decision Trace is the optional companion standard. The Product Spec holds the current committed intent. The Decision Trace records how that intent changed, drifted, or was reconciled. Full definition: https://github.com/gokulrajaram/ProductSpec/blob/main/docs/decision-trace.md and https://github.com/gokulrajaram/ProductSpec/blob/main/schema/decision-trace.schema.json.

## Layout

```text
docs/
  product-specs/
    checkout-redesign.product-spec.md
  decision-traces/
    checkout-redesign.decision-trace.json
```

Use different folders if the repo already has a convention. Keep the trace next to the spec it belongs to, named after it.

## When an agent should write a trace event

Write an event when implementation, evidence, or outcomes challenge the committed intent, and a human or agent makes an explicit call about it. Meeting notes and routine commits do not qualify.

| Situation | Event type |
|---|---|
| A product decision changes the spec's intent | `intent_decision` |
| Implementation diverged from declared scope | `scope_drift` |
| A build check no longer matches the spec | `acceptance_criteria_drift` |
| The shipped experience diverged from the UX section | `ux_drift` |
| An eval threshold or dataset moved | `ai_eval_drift` |
| A metric was reviewed against its target | `success_metric_review` |
| A tradeoff was accepted knowingly | `implementation_tradeoff` |
| The spec's intent was formally revised | `spec_revision` |
| Outcomes were reviewed after launch | `outcome_review` |

## What an event records

Each event records the explicit choice. The schema's `decision.outcome` enum: `update_spec`, `update_implementation`, `accept_tradeoff`, `reopen_work`, `record_learning`, `no_action`. Git already keeps the diff. The trace records the decision and who made it. When a trace event revises intent, bump `spec_revision` in the Product Spec frontmatter so downstream consumers can cite which revision they built against.

## Validating a trace

```bash
npm exec --yes --package @productspec/parser -- productspec validate-trace docs/decision-traces/checkout-redesign.decision-trace.json
```

The Action validates traces too, through its optional `decision_traces` input. Errors are their own family: `invalid_json`, `unsupported_trace_version`, `missing_required_trace_field`, `invalid_trace_id`, `invalid_trace_subject`, `invalid_trace_events`, `invalid_trace_event`, `invalid_trace_decision`, `invalid_trace_link`, `invalid_trace_revision`. See [validating.md](validating.md).

Example trace: https://github.com/gokulrajaram/ProductSpec/blob/main/examples/decision-traces/transcript-search.decision-trace.json.
