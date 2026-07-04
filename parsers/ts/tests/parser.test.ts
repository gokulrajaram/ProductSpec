import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parseProductSpecMarkdown, serializeProductSpecMarkdown } from "../src/index";

describe("@productspec/parser", () => {
  it("round-trips the minimal example", () => {
    const markdown = readFileSync(
      fileURLToPath(new URL("../../../examples/minimal.product-spec.md", import.meta.url)),
      "utf8"
    );
    const parsed = parseProductSpecMarkdown(markdown);

    expect(parseProductSpecMarkdown(serializeProductSpecMarkdown(parsed))).toEqual(parsed);
  });
});
