# Awesome ProductSpec

A curated map of tools, docs, examples, and adjacent projects for using ProductSpec as the Product Harness for AI-native software work.

## Start Here

- [README](README.md): ProductSpec overview and quick start.
- [SPEC](SPEC.md): canonical ProductSpec format.
- [Field guide](docs/field-guide.md): how to write each section.
- [Validator docs](docs/validator.md): parser and validator behavior.
- [Get started with agents](docs/get-started-with-agents.md): ProductSpec as a Product Harness for coding agents.
- [5-minute Product Harness demo](docs/agent-harness-demo.md): end-to-end Product Spec, Agent Run, and Decision Trace.

## Agent Workflows

- [ProductSpec MCP server](docs/agent-mcp.md): expose Product Specs as structured tools for agents.
- [MCP install guide](docs/mcp-install.md): Claude and Cursor config.
- [Use with Claude Code](docs/use-with-claude-code.md): validate, handoff, MCP, and run receipt.
- [Use with Cursor](docs/use-with-cursor.md): repo-local Product Specs with MCP.
- [Use with Codex](docs/use-with-codex.md): Agent Handoff and MCP where available.
- [Agent Handoff](docs/agent-handoff.md): generate a compact build contract.
- [Agent Run](docs/agent-run.md): record what the agent checked.

## Examples

- [Real-world gallery](examples/real-world/): curated examples by domain.
- [Product Harness example](examples/product-harness/): Product Spec, Agent Handoff, Agent Run, and Decision Trace.
- [Harness demo](examples/harness-demo/): short end-to-end loop.
- [Agent-ready repo](examples/agent-ready-repo/): tiny repo layout for agents.
- [Evidence loop](examples/evidence-loop/): links from Product Spec IDs to implementation, eval, and outcome evidence.

## CI And Repo Setup

- [Use ProductSpec in your repo](docs/use-in-your-repo.md): simple repo setup.
- [Repo starter kit](docs/repo-starter-kit.md): copyable repo conventions.
- [CI badge demo](docs/ci-badge-demo.md): validate specs in GitHub Actions and show a status badge.
- [Status badge spec](docs/status-badge.md): factual badge semantics.
- [GitHub Action](action.yml): validate Product Specs, Decision Traces, and Agent Runs.

## Companion Artifacts

- [Decision Trace](docs/decision-trace.md): record decisions, drift, and learning.
- [Decision Trace authoring checklist](docs/decision-trace-authoring-checklist.md): write useful traces.
- [Evidence loop](docs/evidence-loop.md): attach implementation, eval, analytics, and support evidence.
- [Graph](docs/graph.md): resolve dependent specs into buildable, blocked, and ordered work.

## Adjacent Standards And Tools

ProductSpec is intentionally adjacent to engineering-spec and implementation tools. It sits before them.

- OpenAPI: API contract after product intent is known.
- OpenSpec: engineering spec layer for proposed code changes.
- Spec Kit: engineering spec workflow for implementation planning.
- GitHub Issues, Jira, and Linear: work tracking that can link back to ProductSpec IDs.
- Figma: user experience evidence that can link to `user_experience` or `Related Artifacts`.
- Braintrust, Langfuse, and eval platforms: eval evidence that can link to `EVAL-<number>` IDs.

## Community

- [Contributing](CONTRIBUTING.md): how to propose examples, docs changes, parser fixes, and section vocabulary changes.
- [Good first issues](https://github.com/gokulrajaram/ProductSpec/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22good%20first%20issue%22): clear entry points for new contributors.
- [Example requests](https://github.com/gokulrajaram/ProductSpec/issues?q=is%3Aissue%20is%3Aopen%20label%3Aexamples): requested examples and gallery gaps.
