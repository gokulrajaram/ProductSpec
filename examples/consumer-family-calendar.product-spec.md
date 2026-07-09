---
spec_format_version: "0.1"
title: "Family Calendar Conflict Alerts"
artifact_type: "prd"
spec_revision: 1
author: "ProductSpec"
created_at: "2026-07-06T00:00:00Z"
updated_at: "2026-07-06T00:00:00Z"
---

## Problem

Parents coordinating shared family calendars miss school pickups, practices, and appointments because conflicts are only visible after someone opens the calendar.

## Hypothesis

If the calendar warns parents when a new event conflicts with an existing family obligation, families will resolve schedule conflicts earlier because the issue appears at the moment of planning.

## Scope

```productspec-scope
in:
  - shared calendar conflict detection
  - mobile push alert
  - conflict detail view
  - one-tap ask partner message
  - dismiss state
out:
  - automatic rescheduling
  - childcare booking
  - school calendar import
  - recurring-event cleanup
cut:
  - location-aware travel-time conflicts
```

## User Experience

https://example.com/family-calendar-conflict-prototype

## Acceptance Criteria

```productspec-acceptance-criteria
- id: AC-1
  criterion: Creating or editing an event checks for overlapping events on selected family calendars.
- id: AC-2
  criterion: A detected conflict shows the conflicting event title, owner, time, and calendar.
- id: AC-3
  criterion: Parents can send a prefilled message to the other event owner from the conflict detail view.
- id: AC-4
  criterion: Dismissing a conflict suppresses duplicate alerts for the same event pair unless either event time changes.
- id: AC-5
  criterion: Private event titles remain hidden unless the viewer already has access to that calendar.
```

## Success Metrics

```productspec-success-metrics
- id: SM-1
  metric: detected_conflict_action_rate
  target: ">= 45%"
  window: weekly
- id: SM-2
  metric: missed_event_self_report_reduction
  target: ">= 20%"
  window: monthly
- id: SM-3
  metric: conflict_alert_disable_rate
  target: "< 3%"
  window: weekly
- id: SM-4
  metric: median_time_from_conflict_creation_to_first_action
  target: "< 30 minutes"
  window: weekly
```
