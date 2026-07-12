---
spec_format_version: "0.1"
title: "Unified Inbox"
artifact_type: "prd"
spec_revision: 1
author: "ProductSpec"
created_at: "2026-07-11T00:00:00Z"
updated_at: "2026-07-11T00:00:00Z"
---

## Problem

Handoffs need somewhere to land, and operators need one queue instead of one tab per channel.

## Hypothesis

If every channel lands in one queue, operators stop tabbing between tools and first response time drops.

## Scope

In: one queue across channels, with handoff landings and contact records attached.

Out: analytics on queue performance.

## Acceptance Criteria

```productspec-acceptance-criteria
- id: AC-1
  criterion: Given handoffs from two different channels, when an operator opens the inbox, then both appear in one queue with their contact records attached.
```

## Success Metrics

```productspec-success-metrics
- id: SM-1
  metric: median_first_response_time
  target: "<= 5 minutes"
  window: weekly
```

## Related Artifacts

```productspec-related-artifacts
- type: product_spec
  product_spec_path: "./human-handoff.product-spec.md"
  relation: depends_on
  title: "Human Handoff"
- type: product_spec
  product_spec_path: "./contact-profiles.product-spec.md"
  relation: relates_to
  title: "Contact Profiles"
```
