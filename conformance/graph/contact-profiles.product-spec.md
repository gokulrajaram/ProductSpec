---
spec_format_version: "0.1"
title: "Contact Profiles"
artifact_type: "prd"
spec_revision: 1
author: "ProductSpec"
created_at: "2026-07-11T00:00:00Z"
updated_at: "2026-07-11T00:00:00Z"
---

## Problem

Conversations arrive without a durable record of who the customer is, so every channel starts from zero.

## Hypothesis

If every conversation resolves to one contact record, follow-ups read the history instead of asking the customer again.

## Scope

In: one contact record per customer, matched across channels.

Out: enrichment from third-party data sources.

## Acceptance Criteria

```productspec-acceptance-criteria
- id: AC-1
  criterion: Given the same customer writes on two channels, when both conversations close, then both attach to one contact record.
```

## Success Metrics

```productspec-success-metrics
- id: SM-1
  metric: repeat_customer_recognition_rate
  target: ">= 90%"
  window: monthly
```
