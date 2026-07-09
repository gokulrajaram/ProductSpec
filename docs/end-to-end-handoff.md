# End-to-End Handoff

This walkthrough shows one Product Spec traveling through the rest of a software workflow.

The point is not to replace GitHub, Jira, Linear, Figma, OpenSpec, Spec Kit, or coding agents. The point is to give each of them the same durable intent.

## 1. Product Spec

The team starts with a Product Spec:

```text
specs/searchable-transcript-citations.product-spec.md
```

It captures:

- Problem: researchers waste time recovering exact quotes from long YouTube videos.
- Hypothesis: searchable, timestamped transcript passages make YouTube usable as source material.
- Scope: paste URL, generate transcript, search, jump to timestamp, copy citation.
- Acceptance Criteria: pass/fail behavior before launch.
- Success Metrics: real usage after launch.

This is the upstream control document.

## 2. GitHub Issue Or Jira Ticket

The work tracker points back to the Product Spec instead of becoming the source of truth.

```md
## Intent

Implements `specs/searchable-transcript-citations.product-spec.md`.

## Tasks

- Accept public YouTube URL.
- Generate transcript page.
- Search transcript text.
- Copy passage with timestamp.
- Handle unsupported videos.
```

Tickets can split, merge, and move across sprints. The Product Spec preserves why the work exists.

## 3. Design Link

If there is a visible user experience, the Product Spec links to it:

```md
## User Experience

https://example.com/transcript-search-prototype
```

Figma, a deployed mockup, API docs, a CLI demo, a dashboard, or an internal workflow screen can all serve this role.

## 4. Engineering Spec

OpenSpec, Spec Kit, or an internal engineering-spec process consumes the Product Spec and produces the technical plan.

Example engineering questions:

- Which transcript source do we use?
- How do we store transcript segments?
- What is the search index shape?
- What states does the transcript page need?
- What tests prove each acceptance criterion?

ProductSpec answers what and why. The engineering spec answers how.

## 5. Agent Implementation Loop

An AI coding agent can run against the Product Spec plus the engineering plan:

```text
Goal: implement the transcript search Product Spec.

Loop:
1. Read the Product Spec.
2. Read the engineering plan.
3. Implement one task.
4. Run tests.
5. Check acceptance criteria.
6. Continue until every acceptance criterion passes.
```

Acceptance Criteria are the build contract:

```productspec-acceptance-criteria
- id: AC-1
  criterion: Given a valid public YouTube URL, the user can create a transcript page.
- id: AC-2
  criterion: Search returns matching transcript passages with timestamps.
- id: AC-3
  criterion: Clicking a result jumps the video to the matching timestamp.
- id: AC-4
  criterion: Copy passage copies transcript text plus URL and timestamp.
- id: AC-5
  criterion: Empty, private, or unsupported videos return a clear error.
```

Success Metrics are not the agent's completion condition. They are measured after launch.

## 6. Pull Request

The pull request points back to the Product Spec:

```md
Implements specs/searchable-transcript-citations.product-spec.md.

Acceptance criteria:
- [x] AC-1 Valid URL creates transcript page.
- [x] AC-2 Search returns timestamped passages.
- [x] AC-3 Result click jumps video.
- [x] AC-4 Copy passage includes URL and timestamp.
- [x] AC-5 Unsupported videos return clear errors.
```

Code review can now ask whether the implementation still matches the original product intent, not only whether the code is correct.

## 7. Learning

After launch, Success Metrics decide whether the bet worked:

- 60% of first-time users who create a transcript run at least one search.
- 35% of first-time users copy at least one timestamped passage.
- Median time from URL paste to first copied passage is under 3 minutes.

Those outcomes can become the next Product Spec's context.
