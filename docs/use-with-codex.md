# Use ProductSpec With Codex

Use this walkthrough when Codex is implementing work from a repo-local Product Spec.

ProductSpec gives Codex a Product Harness: the spec tells the agent what intent it is accountable to, while Codex chooses the implementation plan and code edits.

## 1. Validate The Spec

```bash
npm exec --package @productspec/parser -- productspec validate specs/my-feature.product-spec.md
```

## 2. Generate The Handoff

```bash
npm exec --package @productspec/parser -- productspec handoff specs/my-feature.product-spec.md
```

Use the generated handoff as the compact contract for the Codex task.

## 3. Optional: Use MCP When Available

If your Codex environment supports stdio MCP servers, generate the ProductSpec MCP config:

```bash
npx --yes -p @productspec/parser@latest productspec mcp-config claude
```

The generated server command is generic MCP-over-stdio:

```json
{
  "mcpServers": {
    "productspec": {
      "command": "npx",
      "args": ["--yes", "--package", "@productspec/parser@latest", "productspec", "mcp"]
    }
  }
}
```

Use the MCP tools to validate the spec, begin a spec session, load the Agent Handoff, and check whether the spec changed before completion.

## 4. Prompt Codex

```text
Implement specs/my-feature.product-spec.md as the product contract.

Before coding:
- validate the Product Spec
- read Product Summary, Scope, Acceptance Criteria, AI Evals, Success Metrics, and Related Artifacts
- create a plan that cites AC- and EVAL- IDs

During implementation:
- stay inside scope.in
- avoid scope.out and scope.cut
- if implementation pressure changes intent, stop and propose a Product Spec update or Decision Trace

Before completion:
- verify each AC- and EVAL- item
- return evidence for each checked item
- note which Success Metrics are post-launch and still pending
```

## 5. Record Evidence

Create an Agent Run receipt:

```bash
npm exec --package @productspec/parser -- productspec init-run specs/my-feature.product-spec.md docs/agent-runs/my-feature.agent-run.json
```

Then fill in the pull request, verification results, eval results, and drift status.
