# Decision Trace Authoring Checklist

Use a Decision Trace when implementation, evidence, or outcomes challenge committed intent.

Do not use it as a meeting diary. A useful trace records the decision someone later needs to trust.

## Before You Write

Ask:

- What changed or drifted?
- Which Product Spec revision, acceptance criterion, success metric, pull request, issue, eval run, design, or dashboard proves it?
- What decision was made?
- Who approved it?
- Does the Product Spec need to change, or does the implementation need to change?

If you cannot answer those questions, the trace is probably premature.

## Good Trace Events

A good event has:

- a specific `event_type`
- a short summary of the drift, decision, revision, tradeoff, or outcome
- links to evidence
- a decision outcome, when a decision was made
- `approved_by` for consequential changes
- a connection back to the relevant Product Spec revision or artifact

## Common Mistakes

**Recording every discussion**

Weak: every Slack thread, meeting note, and reviewer comment becomes an event.

Better: one event records the decision that changed intent, accepted a tradeoff, or reconciled drift.

**Missing evidence**

Weak: "The team decided search quality was good enough."

Better: link the eval run, user interview note, pull request, dashboard, or support ticket that made the decision credible.

**No explicit outcome**

Weak: the event explains what happened but not what the team decided.

Better: choose the decision outcome: update the spec, update the implementation, accept the tradeoff, reopen the work, record the learning, or take no action.

**No revision link**

Weak: a trace says intent changed, but no one can tell which Product Spec revision it applies to.

Better: cite the Product Spec path and `spec_revision`, plus affected IDs like `AC-2`, `SM-1`, or `EVAL-1`.

**Using traces to avoid updating the Product Spec**

Weak: the trace documents new intent, but the Product Spec remains stale.

Better: if current intent changed, update the Product Spec and use the Decision Trace to explain why.

## Copy-Paste Review

Before committing a trace, check:

- [ ] The trace is about a consequential decision, drift, revision, tradeoff, or outcome.
- [ ] The event has evidence links.
- [ ] The event names the decision or learning.
- [ ] The event says who approved the consequential change.
- [ ] The event cites the relevant Product Spec revision or artifact.
- [ ] The Product Spec was updated if current intent changed.

## Example

Weak:

```json
{
  "event_type": "scope_drift",
  "summary": "Engineering added speaker labels.",
  "decision": {
    "outcome": "accept_tradeoff",
    "rationale": "Seems useful."
  }
}
```

Better:

```json
{
  "event_id": "speaker-labels-drift",
  "event_type": "scope_drift",
  "occurred_at": "2026-07-10T00:00:00Z",
  "summary": "Implementation branch added speaker label extraction even though speaker labels were cut from v1 scope.",
  "links": [
    {
      "type": "pull_request",
      "url": "https://github.com/example/transcript-search/pull/58"
    }
  ],
  "drift": {
    "spec_claim": "Speaker labels are listed as cut from Product Spec revision 1.",
    "observed_reality": "The pull request adds speaker label extraction to transcript processing."
  },
  "decision": {
    "outcome": "update_implementation",
    "rationale": "Speaker labels add evaluation and UX complexity outside the intended first release.",
    "approved_by": ["Product lead", "Engineering lead"]
  }
}
```
