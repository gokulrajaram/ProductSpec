# ProductSpec v0.1

## Intent

ProductSpec defines a portable format for Product Specs.

It is meant for documents that should be readable by humans, reviewable by product tools, and executable by AI agents downstream.

ProductSpec defines structure and interoperability. It does not define taste, quality, or reviewer behavior.

## File Format

A Product Spec file uses the extension `.product-spec.md`.

Each file has:

1. YAML-like frontmatter between `---` markers.
2. Markdown sections headed by `## Section Label`.

Tools should preserve Markdown body content inside each section.

## Frontmatter

Required fields:

- `spec_format_version`: `"0.1"`
- `title`: string
- `artifact_type`: `"hypothesis"`, `"prd"`, or `"openspec_proposal"`
- `author`: string
- `created_at`: ISO 8601 datetime string
- `updated_at`: ISO 8601 datetime string

Optional fields:

- `spec_revision`: positive integer for this Product Spec's own intent revision
- `linked_github_repo`: string, such as `"owner/repo"`
- `custom_sections`: array of `{ id, label, after }`
- `tool_metadata`: map of tool-specific fields

`spec_format_version` describes the version of the ProductSpec standard used by the file. `spec_revision` describes the revision of this particular product decision. Tools may display `spec_revision: 3` as `v3`.

`spec_revision` should start at `1` and increment when product intent materially changes. It does not need to increment for typo fixes or formatting-only edits. Git remains the detailed history.

Exports intended for public sharing should strip `tool_metadata` by default.

## Canonical Section Vocabulary

Mandatory sections, in order:

1. `problem`: who is hurting, what pain they feel, and why it matters.
2. `hypothesis`: the causal bet behind the product.
3. `scope`: what is in, what is out, and what is deliberately cut.
4. `acceptance_criteria`: pass/fail build checks before launch.
5. `success_metrics`: real-user behavior after launch.

Optional sections:

- `user_experience`
- `customer_truth`
- `solution_alternatives`
- `solution`
- `strategic_positioning`
- `adoption`
- `pricing`
- `risks`
- `ai`
- `open_questions`
- `rollout`

Display labels are implementation-specific, except that tools should render `ai` as "AI Details".

`user_experience` describes the externally observable experience of the work when there is one, without prescribing implementation. Examples include:

- User-facing prototype URL or mockup.
- Design link.
- Public deploy or walkthrough.
- API documentation page.
- CLI demo.
- Admin workflow.
- Dashboard or report.
- Internal tool screen.

For products with AI features, AI eval thresholds belong in `acceptance_criteria`, not `success_metrics`. Success metrics are post-launch product and business outcomes. Acceptance criteria are pre-launch build gates.

Structured AI evals may be included in `acceptance_criteria` with a fenced `productspec-ai-evals` block:

````markdown
```productspec-ai-evals
- id: quote_relevance
  type: rubric
  input_set: evals/quote-search-cases.jsonl
  evaluator: llm_judge
  pass_threshold: 0.85
  checks:
    - returned passage answers the query
    - citation links to the correct timestamp
    - answer does not invent content outside the transcript
```
````

Each AI eval item requires:

- `id`: stable snake_case eval identifier.
- `type`: eval type, for example `rubric`, `deterministic`, `regression`, or `human_review`.
- `input_set`: path or URI for the eval cases.
- `evaluator`: evaluator name or mechanism.
- `pass_threshold`: number greater than `0` and less than or equal to `1`.
- `checks`: one or more pass/fail checks.

Tools should preserve the fenced block in Markdown and may expose parsed evals as structured data.

## Custom Sections

Custom section IDs use `custom-<kebab-name>`.

Tools must preserve custom sections on round-trip.

## Review Annotation Format

Portable review annotations may be attached to a Product Spec:

```yaml
review_id: "review_123"
reviewer_tool: "example-reviewer/v1"
reviewed_at: "2026-07-04T00:00:00Z"
sections:
  - section_id: "problem"
    axes:
      - axis_key: "clarity"
        verdict: "pass"
        suggestion: "Clear enough to build from."
```

`verdict` is one of `pass`, `fail`, or `warn`.

## Calibration Example Format

Portable calibration examples describe a workspace-specific bar:

```yaml
workspace_id: "workspace_123"
example_id: "example_123"
artifact_type: "prd"
source: "upload"
label: "good"
section_id: "problem"
axis_key: null
content: "Markdown content"
created_at: "2026-07-04T00:00:00Z"
```

## Compliance Levels

- L1: reads and writes `.product-spec.md` files.
- L2: implements portable review annotations.
- L3: implements portable calibration serialization.

## Versioning

ProductSpec is pre-1.0. Tools should check `spec_format_version` and should not assume v0.x documents have the same compatibility guarantees as v1.0. See `docs/versioning.md`.

## Planned v0.2 Additions

The next compatibility milestone is validation and conformance.

Planned v0.2 additions:

- Validator behavior for `.product-spec.md` files.
- Valid and invalid fixture corpus.
- Round-trip conformance tests.
- Review-annotation examples.
- Versioning and compatibility rules.

Validators check structure and portability. They do not judge product quality.
