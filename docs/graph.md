# The Spec Graph

`product_spec` related artifacts make a library of Product Specs traversable. The `graph` command resolves that traversal so a tool or an agent does not have to re-derive it file by file.

```bash
npm exec --package @productspec/parser -- productspec graph docs/product-specs/
```

The command walks the directory recursively, validates every `.product-spec.md` file, resolves `product_spec` links across the folder, and reports:

```
buildable:
  docs/product-specs/foundation/contact-profiles.product-spec.md
  docs/product-specs/intelligence/signals.product-spec.md
blocked:
  docs/product-specs/core/human-handoff.product-spec.md (waits on: docs/product-specs/intelligence/signals.product-spec.md)
order: ... -> ... -> ...
```

Add `--json` for the machine-readable form. Agents should prefer it:

```bash
npm exec --package @productspec/parser -- productspec graph docs/product-specs/ --json
```

## Semantics

- `depends_on` gates: the declaring spec waits on its target.
- `blocks` gates in reverse: the target waits on the declaring spec.
- `supersedes` and `relates_to` appear in `edges` and never gate.
- `buildable` lists specs with no unmet gating link inside the folder.
- `blocked` lists the rest, each with the exact specs it waits on.
- `order` is a dependency-respecting build order over the gating edges.

## Warnings

Warnings never fail the command. They surface graph problems a single-file validation cannot see.

| Warning | Cause |
|---|---|
| `missing_link_target` | A `depends_on` or `blocks` link points at a path that is not in the folder. A missing `depends_on` target blocks the declaring spec: the dependency is unresolved planning context, so the spec appears in `blocked` with the missing path in `waits_on`. A missing `blocks` target is warning-only, since nothing in the folder waits on it. |
| `dependency_cycle` | A set of specs waits on each other in a loop. Each cycle gets its own warning naming exactly its members, and cycle members are excluded from `order`. |
| `self_dependency` | A spec links to itself. The edge is ignored. |
| `duplicate_spec_path` | Two files normalize to the same path. The first stays in the graph. |
| `unsupported_link_path` | A `product_spec_path` is absolute. Paths are relative to the spec file; the edge is dropped. |
| `skipped_invalid_spec` | A file failed validation and is not in the graph. Included in `--json` output. Fix the file with `productspec validate`. |

If every file in the folder fails validation, the command prints the skips and exits 1, the same way it treats a folder with no spec files at all.

## MCP

The same graph is available to agents as the `get_spec_graph` tool on the MCP server (`productspec mcp`), taking an optional `root` and returning the identical JSON shape.

## Boundary

`resolveProductSpecGraph(inputs)` is a pure function in the parser package: it takes already-parsed documents with their paths and never touches the filesystem. The CLI owns file discovery and feeds it. Single-file validation stays single-file; the graph is a separate read over many documents. Nothing in this command changes the format, and a library that never uses `product_spec` links never sees it.
