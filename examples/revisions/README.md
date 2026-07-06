# Revision Example

Product Specs are living documents. They should change when the team's intent changes.

This folder shows the same Product Spec at two revisions:

- [`support-triage-v1.product-spec.md`](support-triage-v1.product-spec.md): initial bet after the team agrees the problem is worth solving.
- [`support-triage-v2.product-spec.md`](support-triage-v2.product-spec.md): revised after design and support-lead review.

## What Changed In v2?

- Scope narrowed from all incoming tickets to account-risk tickets only.
- User Experience was added after a dashboard mock became available.
- Acceptance Criteria added reviewer override and audit-log requirements.
- AI eval thresholds became more specific.
- Success Metrics shifted from broad queue speed to account-risk response time.

`spec_revision` is the portable handle for these changes. Git stores the detailed diff. `spec_revision` lets humans, tickets, engineering specs, AI agents, and decision traces reference the intent revision they are acting on.

## Validate Both Revisions

```bash
npm exec --package @productspec/parser -- productspec validate examples/revisions/support-triage-v1.product-spec.md
npm exec --package @productspec/parser -- productspec validate examples/revisions/support-triage-v2.product-spec.md
```
