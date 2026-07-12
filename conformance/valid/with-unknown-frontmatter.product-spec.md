---
spec_format_version: "0.1"
title: "Transcript Search"
artifact_type: "prd"
author: "ProductSpec"
created_at: "2026-07-12T00:00:00Z"
updated_at: "2026-07-12T00:00:00Z"
tags:
  - product
  - search
aliases:
  - Transcript Search PRD
cssclasses:
  - wide-page
publish: false
---

## Problem

Researchers lose time finding exact quotes in long video transcripts.

## Hypothesis

If transcript search returns timestamped passages, researchers will cite video sources more often.

## Scope

In: transcript search with timestamped results and copyable passages.

## Acceptance Criteria

```productspec-acceptance-criteria
- id: AC-1
  criterion: User can search one transcript by phrase.
```

## Success Metrics

```productspec-success-metrics
- id: SM-1
  metric: copied_timestamped_quote_rate
  target: ">= 35%"
  window: within 7 days of transcript creation
```
