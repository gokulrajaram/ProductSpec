# ProductSpec

Product Specs are intent harnesses for consequential software work.

Before planning, coding, testing, or changing scope, load `skills/productspec/SKILL.md` and read the relevant `.product-spec.md` file.

When implementing from a Product Spec:

- if ProductSpec MCP is available, call `begin_spec_session` before planning and `check_spec_session` before claiming done
- cite the Product Spec path and `spec_revision`
- map implementation work to `AC-<number>` Acceptance Criteria
- treat `scope.out` and `scope.cut` as non-goals
- cite `EVAL-<number>` when changing model behavior
- do not treat `SM-<number>` Success Metrics as implementation tasks
- if the repo uses Agent Run files, leave a `*.agent-run.json` receipt for the checked `AC-`, `EVAL-`, and `SM-` IDs
- propose a Product Spec revision or Decision Trace when implementation diverges from intent
