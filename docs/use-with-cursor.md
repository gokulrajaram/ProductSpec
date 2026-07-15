# Use ProductSpec With Cursor

Use this walkthrough when Cursor is editing a repo that contains Product Specs.

ProductSpec gives Cursor a Product Harness: the agent can read product intent before changing code and can check criteria before claiming completion.

## 1. Add Or Find A Product Spec

```bash
npm exec --package @productspec/parser -- productspec init specs/my-feature.product-spec.md
```

Edit the Product Spec until it names Product Summary, Scope, Acceptance Criteria, Success Metrics, and any relevant AI Evals or Related Artifacts.

## 2. Validate It

```bash
npm exec --package @productspec/parser -- productspec validate specs/my-feature.product-spec.md
```

## 3. Configure MCP

Generate Cursor MCP config:

```bash
npx --yes -p @productspec/parser@latest productspec mcp-config cursor
```

Paste the generated config into Cursor's MCP settings. If your Cursor version uses project MCP files, place it in `.cursor/mcp.json`.

See [`docs/mcp-install.md`](mcp-install.md) for install notes.

## 4. Ask Cursor To Work From The Spec

```text
Use ProductSpec MCP before coding.

Validate specs/my-feature.product-spec.md.
Call begin_spec_session and include the pinned spec_revision in your plan.
Load Product Summary, Scope, Acceptance Criteria, AI Evals, Success Metrics, Related Artifacts, and Agent Handoff.
Stay inside scope.in. Avoid scope.out and scope.cut.
Before claiming done, call check_spec_session and check_completion_claim.
Return evidence for every AC- and EVAL- item.
```

## 5. Keep The Spec In The Pull Request

In the pull request body, include:

```md
Implements `specs/my-feature.product-spec.md` at `spec_revision: 1`.

Evidence:
- AC-1:
- AC-2:
- EVAL-1:
```

Success Metrics usually stay pending until after launch.
