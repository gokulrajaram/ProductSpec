---
spec_format_version: "0.1"
title: "Signals"
artifact_type: "prd"
spec_revision: 1
author: "ProductSpec"
created_at: "2026-07-11T00:00:00Z"
updated_at: "2026-07-11T00:00:00Z"
---

## Problem

Conversations carry intent the system never captures, so nothing downstream can react to it.

## Hypothesis

If intent is extracted while the conversation is still open, downstream features can act before the customer is gone.

## Scope

In: intent extraction on live conversations, with a confidence score per signal.

Out: acting on the extracted intent, which later specs own.

## Acceptance Criteria

```productspec-acceptance-criteria
- id: AC-1
  criterion: Given a customer states an intent, when the conversation is processed, then the intent attaches to it with a confidence score.
```

## Success Metrics

```productspec-success-metrics
- id: SM-1
  metric: conversations_with_extracted_intent
  target: ">= 70%"
  window: weekly
```
