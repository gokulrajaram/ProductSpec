---
spec_format_version: "0.1"
title: "Enterprise Contract Approval Workflow"
artifact_type: "prd"
spec_revision: 1
author: "ProductSpec"
created_at: "2026-07-06T00:00:00Z"
updated_at: "2026-07-06T00:00:00Z"
linked_github_repo: "productspec/example-approvals"
---

## Problem

Enterprise sales teams lose late-stage deals when discount approvals sit in email threads and nobody can tell who owns the next decision.

## Hypothesis

If discount approvals move into a visible workflow with owners, due dates, and escalation rules, sales teams will close approved deals faster because blockers are explicit before the customer deadline.

## Scope

```productspec-scope
in:
  - approval request form
  - deal and customer context
  - approver chain
  - SLA clock
  - reminder emails
  - escalation to manager
  - approval history export
out:
  - contract redlining
  - CPQ price calculation
  - billing-system updates
  - legal clause approval
cut:
  - custom approval policies by region
```

## User Experience

https://example.com/contract-approval-flow

## Acceptance Criteria

```productspec-acceptance-criteria
- id: AC-1
  criterion: A sales rep can submit an approval request with account, opportunity, requested discount, close date, and reason.
- id: AC-2
  criterion: The system routes requests to the configured approver chain based on discount band.
- id: AC-3
  criterion: Approvers can approve, reject, or request changes with a required comment.
- id: AC-4
  criterion: SLA timers pause while the request is waiting on the sales rep for changes.
- id: AC-5
  criterion: Escalation email sends to the approver's manager when an approval is more than 24 business hours overdue.
- id: AC-6
  criterion: Approval history export includes every actor, action, timestamp, and comment.
```

## Success Metrics

```productspec-success-metrics
- id: SM-1
  metric: median_approval_cycle_time
  target: "< 24 business hours"
  window: monthly
- id: SM-2
  metric: visible_next_owner_rate
  target: ">= 90%"
  window: within 5 minutes of submission
- id: SM-3
  metric: approval_ownership_delay_rate
  target: "< 5%"
  window: monthly
- id: SM-4
  metric: sales_ops_manual_status_chasing_time_reduction
  target: ">= 40%"
  window: monthly
```
