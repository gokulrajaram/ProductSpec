# ProductSpec Roadmap

ProductSpec starts as a small Markdown serialization and grows toward a stable semantic model for software intent.

Current release: `v0.4.0`.

Current document format: `spec_format_version: "0.1"`.

## v0.1: Document Format

Status: shipped.

Includes:

- `.product-spec.md` file format.
- Required frontmatter.
- Canonical section vocabulary.
- Optional and custom sections.
- JSON Schema for parsed Product Specs.
- JSON Schema for portable review annotations.
- Reference TypeScript parser.
- Minimal and expanded examples.

## v0.2: Validation And Conformance

Status: shipped.

Goal: make ProductSpec easier for other tools to adopt correctly.

Includes:

- Validator CLI for `.product-spec.md` files.
- Valid and invalid fixture corpus.
- Round-trip conformance tests.
- Custom-section preservation tests.
- Structured validator results with stable error and warning codes.

## v0.3: Adoption

Status: shipped.

Goal: make ProductSpec easier to try, read, and share.

Includes:

- `productspec init <file>` for creating a starter Product Spec.
- Stronger examples for AI features, consumer UX, enterprise workflows, and internal APIs.
- Sharper README positioning.
- Expanded explanation of where ProductSpec fits with Git, GitHub, Jira, OpenSpec, and Spec Kit.

## v0.4: Spec Revision

Status: shipped.

Goal: make Product Specs explicit living documents.

Includes:

- Optional `spec_revision` frontmatter for tracking revisions of one Product Spec.
- Parser and JSON Schema support for positive integer `spec_revision` values.
- Examples and conformance fixtures showing `spec_revision: 1`.
- Revision examples that show how a Product Spec can evolve over time.

## Future: Decision Trace

Goal: add an optional portable reasoning trail without making the core Product Spec harder to adopt.

Planned additions:

- Decision Trace schema.
- Examples linking evidence, alternatives, decisions, implementation, outcomes, and learnings.
- File naming conventions for trace files stored beside specs.
- Link conventions for GitHub, issue trackers, engineering specs, experiments, and evals.
- Review-annotation fixture examples.

Decision Trace should remain optional so the core ProductSpec document format stays easy to adopt.

## Future: Ecosystem And Interop

Goal: let Product Specs connect cleanly to downstream systems.

Planned additions:

- Standard link types for engineering specs, tasks, code, experiments, evals, and product metrics.
- Outcome summary format.
- Compatibility fixtures for older v0.x documents.
- Formatter expectations for stable Markdown output.
- GitHub Action or CI recipe for validating Product Specs in a repo.
- Independent parser or validator implementation outside the reference TypeScript package.

## v1.0: Stable Semantic Model

Goal: make the semantic model the standard, with Markdown as one serialization.

Possible serializations:

- Markdown.
- JSON.
- YAML.
- AST.
- Protocol Buffers.

The v1.0 bar is ecosystem confidence: tools can exchange Product Specs without treating one implementation's export format as the standard.
