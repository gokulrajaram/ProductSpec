# Use ProductSpec With Claude Code

Use this walkthrough when Claude Code is implementing work from a `.product-spec.md` file.

ProductSpec gives Claude Code a Product Harness: structured intent, scope guardrails, acceptance criteria, evals, evidence targets, and revision checks.

## 1. Validate The Product Spec

```bash
npm exec --package @productspec/parser -- productspec validate specs/my-feature.product-spec.md
```

Fix validation errors before asking Claude Code to implement. Warnings are allowed, but they should be understood.

## 2. Generate The Agent Handoff

```bash
npm exec --package @productspec/parser -- productspec handoff specs/my-feature.product-spec.md
```

Paste the handoff into Claude Code when you want a compact build contract.

## 3. Optional: Configure MCP

Generate a Claude-compatible MCP config:

```bash
npx --yes -p @productspec/parser@latest productspec mcp-config claude
```

Then follow [`docs/mcp-install.md`](mcp-install.md) to add the `productspec` stdio server.

## 4. Prompt Claude Code

```text
Use ProductSpec before coding.

Validate specs/my-feature.product-spec.md.
If MCP is available, call begin_spec_session, load Product Summary, Scope, Acceptance Criteria, AI Evals, Success Metrics, Related Artifacts, and Agent Handoff.
If MCP is not available, use the Agent Handoff below as the build contract.

Stay inside scope.in. Do not build scope.out or scope.cut.
Before claiming completion, verify every AC- and EVAL- item, check whether the Product Spec changed, and return evidence for each checked item.
If implementation pressure changes product intent, stop and propose a Product Spec revision or Decision Trace.
```

## 5. Record The Run

```bash
npm exec --package @productspec/parser -- productspec init-run specs/my-feature.product-spec.md docs/agent-runs/my-feature.agent-run.json
```

After Claude Code finishes, update the Agent Run with the pull request, checks, eval results, and any drift status.
