---
spec_format_version: "0.1"
title: "AI Support Triage"
artifact_type: "prd"
spec_revision: 1
author: "ProductSpec"
created_at: "2026-07-06T00:00:00Z"
updated_at: "2026-07-06T00:00:00Z"
linked_github_repo: "productspec/example-support-triage"
---

## Problem

Support leads at B2B SaaS companies lose their morning planning window because urgent tickets are buried among routine product questions.

## Hypothesis

If incoming tickets are automatically labeled by urgency and likely owner, support leads will respond to urgent customer issues faster because the queue starts each day pre-sorted by consequence.

## Scope

In: ticket ingestion from the helpdesk API, urgency labels, owner recommendation, confidence score, and reviewer override.

Out: auto-replies, direct ticket reassignment, customer-visible status changes, and custom routing rules.

Cut from this version: customer-tier lookup and audit-log export.

## Acceptance Criteria

- New tickets receive urgency, suggested owner, confidence score, and model version within 60 seconds.
- Reviewers can override any urgency label before it changes downstream workflow state.
- Labels below 0.70 confidence are marked `needs_review` and do not trigger escalation.

```productspec-ai-evals
- id: urgent_ticket_precision
  type: rubric
  input_set: evals/urgent-ticket-golden-set.jsonl
  evaluator: llm_judge
  pass_threshold: 0.88
  checks:
    - urgency classification identifies urgent tickets
    - non-urgent tickets are not escalated
```

## Success Metrics

- Median time to first human response for urgent tickets falls below 30 minutes during business hours.
- At least 60% of urgent tickets are reviewed by the suggested owner without manual queue search.
- False urgent escalations stay below 8% of escalated tickets.
