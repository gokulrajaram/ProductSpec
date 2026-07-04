---
spec_format_version: "0.1"
title: "Calendar SMS Reminder Bet"
artifact_type: "hypothesis"
author: "ProductSpec"
created_at: "2026-07-04T00:00:00Z"
updated_at: "2026-07-04T00:00:00Z"
---

## Problem

Sales managers miss customer calls when browser notifications are hidden during back-to-back meetings.

## Hypothesis

If calendar reminders can escalate to SMS for high-priority meetings, sales managers will miss fewer customer calls because the reminder reaches them on the device they are actually checking.

## Scope

In: Google Calendar connection, high-priority meeting rules, SMS reminder opt-in, and delivery logs.

Out: calendar creation, full scheduling assistant, and team admin controls.

Cut: WhatsApp reminders and custom reminder templates.

## User Experience

https://example.com/calendar-reminder-prototype

## Acceptance Criteria

- Users can connect Google Calendar.
- Users can mark meetings as high priority.
- High-priority reminders send SMS 5 minutes before the meeting.
- Users can disable SMS reminders at any time.

## Success Metrics

- 50% of activated users configure at least one high-priority reminder.
- Missed-call self-reports decline by 25% among weekly active users.

