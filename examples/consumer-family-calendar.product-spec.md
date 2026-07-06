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

- Creating or editing an event checks for overlapping events on selected family calendars.
- A detected conflict shows the conflicting event title, owner, time, and calendar.
- Parents can send a prefilled message to the other event owner from the conflict detail view.
- Dismissing a conflict suppresses duplicate alerts for the same event pair unless either event time changes.
- Private event titles remain hidden unless the viewer already has access to that calendar.

## Success Metrics

```productspec-success-metrics
- id: conflict_action_rate
  metric: detected_conflict_action_rate
  target: ">= 45%"
  window: weekly
  segment: detected conflicts
  source: product_analytics
- id: missed_event_report_reduction
  metric: missed_event_self_report_reduction
  target: ">= 20%"
  window: monthly
  segment: weekly active families
  source: user_survey
- id: alert_disable_rate
  metric: conflict_alert_disable_rate
  target: "< 3%"
  window: weekly
  segment: weekly active users
  source: product_analytics
- id: conflict_time_to_action
  metric: median_time_from_conflict_creation_to_first_action
  target: "< 30 minutes"
  window: weekly
  segment: detected conflicts
  source: product_analytics
```
