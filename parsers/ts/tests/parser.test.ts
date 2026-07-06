import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CANONICAL_SECTION_IDS,
  MANDATORY_SECTION_IDS,
  parseProductSpecMarkdown,
  serializeProductSpecMarkdown,
  validateProductSpecMarkdown
} from "../src/index";

const root = fileURLToPath(new URL("../../..", import.meta.url));
const packageRoot = fileURLToPath(new URL("..", import.meta.url));

describe("@productspec/parser", () => {
  it("round-trips the minimal example", () => {
    const markdown = readFileSync(
      fileURLToPath(new URL("../../../examples/minimal.product-spec.md", import.meta.url)),
      "utf8"
    );
    const parsed = parseProductSpecMarkdown(markdown);

    expect(parseProductSpecMarkdown(serializeProductSpecMarkdown(parsed))).toEqual(parsed);
  });

  it("does not require user experience", () => {
    const markdown = `---
spec_format_version: "0.1"
title: "API Import"
artifact_type: "prd"
author: "ProductSpec"
created_at: "2026-07-05T00:00:00Z"
updated_at: "2026-07-05T00:00:00Z"
---

## Problem

Teams cannot import customer records reliably.

## Hypothesis

If imports expose a clear upload path, teams will trust automated onboarding.

## Scope

In: CSV upload and row-level error responses.

## Acceptance Criteria

- Valid CSV files create import jobs.

## Success Metrics

- 80% of imports complete without support contact.
`;

    const parsed = parseProductSpecMarkdown(markdown);

    expect(parsed.sections.map((section) => section.id)).toEqual([
      "problem",
      "hypothesis",
      "scope",
      "acceptance_criteria",
      "success_metrics"
    ]);
  });

  it("round-trips optional spec revision frontmatter", () => {
    const markdown = `---
spec_format_version: "0.1"
title: "Versioned Spec"
artifact_type: "prd"
spec_revision: 2
author: "ProductSpec"
created_at: "2026-07-05T00:00:00Z"
updated_at: "2026-07-06T00:00:00Z"
---

## Problem

Teams cannot tell which intent revision an engineering plan came from.

## Hypothesis

If specs carry a simple revision number, downstream plans can reference the exact intent they implement.

## Scope

In: optional positive integer revision in frontmatter.

## Acceptance Criteria

- Parser exposes spec revision as a number.

## Success Metrics

- Engineering handoffs can name the Product Spec revision they implement.
`;

    const parsed = parseProductSpecMarkdown(markdown);
    const serialized = serializeProductSpecMarkdown(parsed);

    expect(parsed.frontmatter.spec_revision).toBe(2);
    expect(serialized).toContain("spec_revision: 2");
    expect(parseProductSpecMarkdown(serialized).frontmatter.spec_revision).toBe(2);
  });

  it("extracts structured AI evals from Acceptance Criteria", () => {
    const markdown = `---
spec_format_version: "0.1"
title: "AI Quote Search"
artifact_type: "prd"
author: "ProductSpec"
created_at: "2026-07-05T00:00:00Z"
updated_at: "2026-07-05T00:00:00Z"
---

## Problem

Researchers lose time finding exact quotes in long video transcripts.

## Hypothesis

If quote search returns cited transcript passages, researchers will trust the transcript as a source.

## Scope

In: transcript search, timestamp citations, and quote copy.

## Acceptance Criteria

- User can search a transcript by phrase.

\`\`\`productspec-ai-evals
- id: quote_relevance
  type: rubric
  input_set: evals/quote-search-cases.jsonl
  evaluator: llm_judge
  pass_threshold: 0.85
  checks:
    - returned passage answers the query
    - citation links to the correct timestamp
\`\`\`

## Success Metrics

- 40% of weekly active researchers copy at least one timestamped quote.
`;

    const parsed = parseProductSpecMarkdown(markdown);
    const acceptanceCriteria = parsed.sections.find((section) => section.id === "acceptance_criteria");

    expect(acceptanceCriteria?.ai_evals).toEqual([
      {
        id: "quote_relevance",
        type: "rubric",
        input_set: "evals/quote-search-cases.jsonl",
        evaluator: "llm_judge",
        pass_threshold: 0.85,
        checks: ["returned passage answers the query", "citation links to the correct timestamp"]
      }
    ]);
    expect(parseProductSpecMarkdown(serializeProductSpecMarkdown(parsed))).toEqual(parsed);
  });

  it("rejects malformed AI eval blocks", () => {
    const result = validateProductSpecMarkdown(`---
spec_format_version: "0.1"
title: "Malformed AI Evals"
artifact_type: "prd"
author: "ProductSpec"
created_at: "2026-07-05T00:00:00Z"
updated_at: "2026-07-05T00:00:00Z"
---

## Problem

Researchers lose time finding exact quotes in long video transcripts.

## Hypothesis

If quote search returns cited transcript passages, researchers will trust the transcript as a source.

## Scope

In: transcript search, timestamp citations, and quote copy.

## Acceptance Criteria

\`\`\`productspec-ai-evals
- id: quote_relevance
  type: rubric
  pass_threshold: 0.85
\`\`\`

## Success Metrics

- 40% of weekly active researchers copy at least one timestamped quote.
`);

    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.errors.map((error) => error.code)).toContain("invalid_ai_eval");
  });

  it("ships conformance fixtures for valid and invalid Product Specs", () => {
    const fixtures = [
      "conformance/valid/minimal.product-spec.md",
      "conformance/valid/with-user-experience.product-spec.md",
      "conformance/valid/with-ai-evals.product-spec.md",
      "conformance/valid/with-custom-section.product-spec.md",
      "conformance/invalid/missing-frontmatter.product-spec.md",
      "conformance/invalid/missing-required-section.product-spec.md",
      "conformance/invalid/unsupported-version.product-spec.md"
    ];

    for (const fixture of fixtures) {
      expect(existsSync(`${root}/${fixture}`), fixture).toBe(true);
    }
  });

  it("validates conformance fixtures with stable error codes", () => {
    const validFixtures = [
      "conformance/valid/minimal.product-spec.md",
      "conformance/valid/with-user-experience.product-spec.md",
      "conformance/valid/with-ai-evals.product-spec.md",
      "conformance/valid/with-custom-section.product-spec.md"
    ];

    for (const fixture of validFixtures) {
      const result = validateProductSpecMarkdown(readFileSync(`${root}/${fixture}`, "utf8"));
      expect(result.valid, fixture).toBe(true);
      if (result.valid) expect(result.document.frontmatter.spec_format_version).toBe("0.1");
    }

    const invalidFixtures: Array<[string, string]> = [
      ["conformance/invalid/missing-frontmatter.product-spec.md", "missing_frontmatter"],
      ["conformance/invalid/missing-required-section.product-spec.md", "missing_required_section"],
      ["conformance/invalid/unsupported-version.product-spec.md", "unsupported_version"]
    ];

    for (const [fixture, code] of invalidFixtures) {
      const result = validateProductSpecMarkdown(readFileSync(`${root}/${fixture}`, "utf8"));
      expect(result.valid, fixture).toBe(false);
      if (!result.valid) expect(result.errors.map((error) => error.code)).toContain(code);
    }
  });

  it("keeps the JSON Schema aligned with parser section rules", () => {
    const schema = JSON.parse(readFileSync(`${root}/schema/product-spec.schema.json`, "utf8"));
    const sectionIdSchema = schema.properties.sections.items.properties.id;

    expect(sectionIdSchema.anyOf[0].enum).toEqual(CANONICAL_SECTION_IDS);
    expect(sectionIdSchema.anyOf[1].pattern).toBe("^custom-[a-z0-9]+(-[a-z0-9]+)*$");

    const requiredSectionIds = schema.properties.sections.allOf.map(
      (rule: { contains: { properties: { id: { const: string } } } }) => rule.contains.properties.id.const
    );
    expect(requiredSectionIds).toEqual(MANDATORY_SECTION_IDS);

    expect(schema.properties.frontmatter.required).toEqual([
      "spec_format_version",
      "title",
      "artifact_type",
      "author",
      "created_at",
      "updated_at"
    ]);
    expect(schema.properties.frontmatter.properties.custom_sections.items.properties.id.pattern).toBe(
      "^custom-[a-z0-9]+(-[a-z0-9]+)*$"
    );
    expect(schema.properties.frontmatter.properties.spec_revision).toEqual({
      type: "integer",
      minimum: 1
    });
    expect(schema.properties.sections.items.properties.ai_evals.items.required).toEqual([
      "id",
      "type",
      "input_set",
      "evaluator",
      "pass_threshold",
      "checks"
    ]);
  });

  it("rejects invalid spec revision values", () => {
    const result = validateProductSpecMarkdown(`---
spec_format_version: "0.1"
title: "Invalid Revision"
artifact_type: "prd"
spec_revision: 0
author: "ProductSpec"
created_at: "2026-07-05T00:00:00Z"
updated_at: "2026-07-06T00:00:00Z"
---

## Problem

Teams cannot tell which intent revision an engineering plan came from.

## Hypothesis

If specs carry a simple revision number, downstream plans can reference the exact intent they implement.

## Scope

In: optional positive integer revision in frontmatter.

## Acceptance Criteria

- Parser exposes spec revision as a number.

## Success Metrics

- Engineering handoffs can name the Product Spec revision they implement.
`);

    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.errors.map((error) => error.code)).toContain("invalid_spec_revision");
  });

  it("warns when required sections are present but too thin", () => {
    const markdown = `---
spec_format_version: "0.1"
title: "Thin Spec"
artifact_type: "prd"
author: "ProductSpec"
created_at: "2026-07-05T00:00:00Z"
updated_at: "2026-07-05T00:00:00Z"
---

## Problem

TBD

## Hypothesis

If onboarding improves, users activate.

## Scope

In: onboarding.

## Acceptance Criteria

- Users can finish onboarding.

## Success Metrics

Activation rises.
`;

    const result = validateProductSpecMarkdown(markdown);

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.warnings.map((warning) => warning.code)).toContain("empty_required_section");
      expect(result.warnings.map((warning) => warning.code)).toContain("thin_required_section");
    }
  });

  it("rejects duplicate sections, out-of-order required sections, and invalid custom IDs", () => {
    const duplicate = validateProductSpecMarkdown(`---
spec_format_version: "0.1"
title: "Duplicate Spec"
artifact_type: "prd"
author: "ProductSpec"
created_at: "2026-07-05T00:00:00Z"
updated_at: "2026-07-05T00:00:00Z"
---

## Problem

Teams cannot import records reliably.

## Problem

This is duplicated.

## Hypothesis

If imports expose a clear upload path, teams will trust onboarding.

## Scope

In: CSV upload and row-level errors.

## Acceptance Criteria

- Valid CSV files create import jobs.

## Success Metrics

- 80% of imports complete without support contact.
`);
    expect(duplicate.valid).toBe(false);
    if (!duplicate.valid) expect(duplicate.errors.map((error) => error.code)).toContain("duplicate_section");

    const outOfOrder = validateProductSpecMarkdown(`---
spec_format_version: "0.1"
title: "Out Of Order Spec"
artifact_type: "prd"
author: "ProductSpec"
created_at: "2026-07-05T00:00:00Z"
updated_at: "2026-07-05T00:00:00Z"
---

## Problem

Teams cannot import records reliably.

## Scope

In: CSV upload and row-level errors.

## Hypothesis

If imports expose a clear upload path, teams will trust onboarding.

## Acceptance Criteria

- Valid CSV files create import jobs.

## Success Metrics

- 80% of imports complete without support contact.
`);
    expect(outOfOrder.valid).toBe(false);
    if (!outOfOrder.valid) expect(outOfOrder.errors.map((error) => error.code)).toContain("invalid_section_order");

    const invalidCustom = validateProductSpecMarkdown(`---
spec_format_version: "0.1"
title: "Invalid Custom Spec"
artifact_type: "prd"
author: "ProductSpec"
created_at: "2026-07-05T00:00:00Z"
updated_at: "2026-07-05T00:00:00Z"
custom_sections:
  - id: "notes"
    label: "Notes"
    after: "success_metrics"
---

## Problem

Teams cannot import records reliably.

## Hypothesis

If imports expose a clear upload path, teams will trust onboarding.

## Scope

In: CSV upload and row-level errors.

## Acceptance Criteria

- Valid CSV files create import jobs.

## Success Metrics

- 80% of imports complete without support contact.

## Notes

Keep this around.
`);
    expect(invalidCustom.valid).toBe(false);
    if (!invalidCustom.valid) expect(invalidCustom.errors.map((error) => error.code)).toContain("invalid_custom_section_id");
  });

  it("provides a CLI validator with success and failure exit codes", () => {
    const build = spawnSync("npm", ["run", "build"], { cwd: packageRoot, encoding: "utf8" });
    expect(build.status, build.stderr).toBe(0);

    const valid = spawnSync("node", [
      fileURLToPath(new URL("../dist/cli.js", import.meta.url)),
      "validate",
      `${root}/conformance/valid/minimal.product-spec.md`
    ], { encoding: "utf8" });

    expect(valid.status).toBe(0);
    expect(valid.stdout).toContain("valid");

    const invalid = spawnSync("node", [
      fileURLToPath(new URL("../dist/cli.js", import.meta.url)),
      "validate",
      `${root}/conformance/invalid/missing-required-section.product-spec.md`
    ], { encoding: "utf8" });

    expect(invalid.status).toBe(1);
    expect(invalid.stderr).toContain("missing_required_section");
  });

  it("initializes a starter Product Spec from the CLI", () => {
    const build = spawnSync("npm", ["run", "build"], { cwd: packageRoot, encoding: "utf8" });
    expect(build.status, build.stderr).toBe(0);

    const dir = mkdtempSync(join(tmpdir(), "productspec-init-"));
    const target = join(dir, "starter.product-spec.md");

    try {
      const init = spawnSync("node", [
        fileURLToPath(new URL("../dist/cli.js", import.meta.url)),
        "init",
        target
      ], { encoding: "utf8" });

      expect(init.status).toBe(0);
      expect(init.stdout).toContain("created");
      expect(existsSync(target)).toBe(true);

      const markdown = readFileSync(target, "utf8");
      const result = validateProductSpecMarkdown(markdown);
      expect(result.valid).toBe(true);
      expect(markdown).toContain("## Problem");
      expect(markdown).toContain("## Success Metrics");

      const secondInit = spawnSync("node", [
        fileURLToPath(new URL("../dist/cli.js", import.meta.url)),
        "init",
        target
      ], { encoding: "utf8" });

      expect(secondInit.status).toBe(1);
      expect(secondInit.stderr).toContain("already exists");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("keeps every example valid", () => {
    const exampleDir = `${root}/examples`;
    const examples = productSpecFiles(exampleDir);

    expect(examples).toContain(`${exampleDir}/minimal.product-spec.md`);
    expect(examples).toContain(`${exampleDir}/revisions/support-triage-v1.product-spec.md`);
    expect(examples).toContain(`${exampleDir}/revisions/support-triage-v2.product-spec.md`);
    expect(examples.length).toBeGreaterThanOrEqual(5);

    for (const example of examples) {
      const result = validateProductSpecMarkdown(readFileSync(example, "utf8"));
      expect(result.valid, example).toBe(true);
    }
  });
});

function productSpecFiles(directory: string): string[] {
  const entries = readdirSync(directory).map((entry) => `${directory}/${entry}`);
  return entries.flatMap((entry) => {
    if (statSync(entry).isDirectory()) return productSpecFiles(entry);
    return entry.endsWith(".product-spec.md") ? [entry] : [];
  });
}
