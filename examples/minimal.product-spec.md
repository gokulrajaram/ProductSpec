---
spec_format_version: "0.1"
title: "YouTube Transcription Search"
artifact_type: "prd"
spec_revision: 1
author: "ProductSpec"
created_at: "2026-07-04T00:00:00Z"
updated_at: "2026-07-04T00:00:00Z"
---

## Problem

Researchers using YouTube videos as source material spend too much time scrubbing through long videos to find exact quotes they can cite.

## Hypothesis

If we provide searchable transcripts with timestamped passages, researchers will treat YouTube videos as usable source material because they can find, verify, and cite the right moment quickly.

## Scope

In: paste a YouTube URL, generate a transcript, search within it, jump to timestamps, and copy passages with citations.

Out: multi-video projects, team workspaces, non-YouTube video imports, and automated citation-format switching.

Cut from this version: speaker diarization and transcript editing.

## User Experience

https://example.com/transcript-search-prototype

## Acceptance Criteria

```productspec-acceptance-criteria
- id: AC-1
  criterion: Given a valid public YouTube URL, the user can create a transcript page.
- id: AC-2
  criterion: Search returns matching transcript passages with timestamps.
- id: AC-3
  criterion: Clicking a result jumps the video to the matching timestamp.
- id: AC-4
  criterion: Copy passage copies transcript text plus the video URL and timestamp.
- id: AC-5
  criterion: Empty, private, or unsupported videos return a clear error.
```

## Success Metrics

```productspec-success-metrics
- id: SM-1
  metric: first_transcript_search_rate
  target: ">= 60%"
  window: first session after transcript creation
- id: SM-2
  metric: timestamped_passage_copy_rate
  target: ">= 35%"
  window: within 7 days of transcript creation
- id: SM-3
  metric: median_time_to_first_copied_passage
  target: "< 3 minutes"
  window: first transcript session
```
