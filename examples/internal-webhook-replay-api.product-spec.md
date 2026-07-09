---
spec_format_version: "0.1"
title: "Internal Webhook Replay API"
artifact_type: "prd"
spec_revision: 1
author: "ProductSpec"
created_at: "2026-07-06T00:00:00Z"
updated_at: "2026-07-06T00:00:00Z"
linked_github_repo: "productspec/example-webhooks"
---

## Problem

Developer support engineers cannot safely replay failed customer webhooks without asking an infrastructure engineer to run manual database queries and scripts.

## Hypothesis

If support engineers have a permissioned internal API for replaying failed webhooks, customers will recover integrations faster because the support team can resolve common delivery failures without engineering escalation.

## Scope

```productspec-scope
in:
  - internal API endpoint for replaying one failed webhook event by ID
  - permission check
  - replay audit log
  - idempotency guard
  - structured success or failure response
out:
  - customer-facing UI
  - bulk replay
  - replay scheduling
  - editing payloads before replay
  - replaying events older than 30 days
cut:
  - automatic retry policy changes
  - customer self-serve replay
```

## Acceptance Criteria

- Given a support engineer with `webhook_replay` permission, when they call the replay endpoint with a failed webhook event ID, the system enqueues exactly one replay job.
- Given a user without `webhook_replay` permission, the endpoint returns `403` and does not enqueue a replay job.
- Given an event that has already been replayed in the last 10 minutes, the endpoint returns the existing replay job ID instead of creating a duplicate job.
- Given an event older than 30 days, the endpoint returns a clear `event_not_replayable` error.
- Every replay attempt records actor ID, event ID, customer ID, replay job ID, timestamp, and result in the audit log.
- API evals: on a fixture set covering success, permission failure, duplicate replay, expired event, and missing event, the endpoint returns the expected status code and machine-readable error code in 100% of cases.

## Success Metrics

```productspec-success-metrics
- id: escalation_to_replay_time
  metric: median_time_from_customer_escalation_to_replay_attempt
  target: "< 10 minutes"
  window: monthly
- id: no_infra_escalation_resolution_rate
  metric: eligible_webhook_escalation_resolution_without_infra_rate
  target: ">= 70%"
  window: monthly
- id: duplicate_replay_rate
  metric: duplicate_replay_job_rate
  target: "< 0.5%"
  window: monthly
- id: unaudited_replay_count
  metric: unaudited_replay_attempt_count
  target: "0"
  window: monthly
```
