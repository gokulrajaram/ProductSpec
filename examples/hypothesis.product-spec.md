---
spec_format_version: "0.1"
title: "Calendar SMS Reminder Bet"
artifact_type: "hypothesis"
spec_revision: 1
author: "ProductSpec"
created_at: "2026-07-04T00:00:00Z"
updated_at: "2026-07-04T00:00:00Z"
---

## Problem

Sales managers miss customer calls when browser notifications are hidden during back-to-back meetings.

## Hypothesis

If calendar reminders can escalate to SMS for high-priority meetings, sales managers will miss fewer customer calls because the reminder reaches them on the device they are actually checking.

## Scope

```productspec-scope
in:
  - Google Calendar connection
  - high-priority meeting rules
  - SMS reminder opt-in
  - delivery logs
out:
  - calendar creation
  - full scheduling assistant
  - team admin controls
cut:
  - WhatsApp reminders
  - custom reminder templates
```

## User Experience

https://example.com/calendar-reminder-prototype

## Acceptance Criteria

```productspec-acceptance-criteria
- id: AC-1
  criterion: Users can connect Google Calendar.
- id: AC-2
  criterion: Users can mark meetings as high priority.
- id: AC-3
  criterion: High-priority reminders send SMS 5 minutes before the meeting.
- id: AC-4
  criterion: Users can disable SMS reminders at any time.
```

## Success Metrics

```productspec-success-metrics
- id: SM-1
  metric: activated_user_high_priority_reminder_setup_rate
  target: ">= 50%"
  window: within 7 days of activation
- id: SM-2
  metric: missed_call_self_report_reduction
  target: ">= 25%"
  window: monthly
```
