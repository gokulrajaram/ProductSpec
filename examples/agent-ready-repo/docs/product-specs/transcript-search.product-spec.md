---
spec_format_version: "0.1"
title: "Transcript Search"
artifact_type: "prd"
spec_revision: 1
author: "ProductSpec"
created_at: "2026-07-13T00:00:00Z"
updated_at: "2026-07-13T00:00:00Z"
linked_github_repo: "example/transcript-search"
applies_to:
  - path: "apps/web/src/transcripts/"
---

## Problem

Researchers using long video transcripts lose sourceable quotes because they must scan manually, copy text separately, and recreate the timestamp link by hand.

## Hypothesis

If researchers can search a transcript by phrase and copy a timestamped passage in one action, they will cite video evidence more often because the sourceable quote is easier to recover and share.

## Scope

```productspec-scope
in:
  - transcript phrase search
  - timestamped result snippets
  - copy passage with video URL and timestamp
  - empty state for no matches
out:
  - team transcript libraries
  - speaker labeling
  - semantic search across multiple videos
cut:
  - AI-generated transcript summaries
```

## Acceptance Criteria

```productspec-acceptance-criteria
- id: AC-1
  criterion: A researcher can search within one transcript and see matching snippets with timestamps.
- id: AC-2
  criterion: Copy passage includes the transcript text, source video URL, and timestamp.
- id: AC-3
  criterion: No-match searches show an empty state without clearing the user's query.
```

```productspec-ai-evals
- id: EVAL-1
  type: contains
  cases:
    - input: "Search query: battery chemistry. Transcript line at 00:04:12 contains battery chemistry."
      expected: "Result includes the transcript line and timestamp 00:04:12."
    - input: "Search query: fusion reactor. Transcript contains no matching phrase."
      expected: "Result states that no transcript matches were found."
  evaluator: deterministic
  pass_threshold: 1
```

## Success Metrics

```productspec-success-metrics
- id: SM-1
  metric: timestamped_passage_copy_rate
  target: ">= 35%"
  target_status: provisional
  target_owner: "Product lead"
  window: within 14 days of transcript creation
```

## Related Artifacts

```productspec-related-artifacts
- type: github_issue
  url: "https://github.com/example/transcript-search/issues/17"
  title: "Build transcript phrase search"
  section_id: acceptance_criteria
  item_id: AC-1
- type: eval_run
  url: "../evidence/transcript-search-eval-run.json"
  title: "Transcript search deterministic eval"
  section_id: acceptance_criteria
  item_id: EVAL-1
- type: dashboard
  url: "https://analytics.example.com/transcript-search"
  title: "Transcript search quote copy dashboard"
  section_id: success_metrics
  item_id: SM-1
```
