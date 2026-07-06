export const MANDATORY_SECTION_IDS = [
  "problem",
  "hypothesis",
  "scope",
  "acceptance_criteria",
  "success_metrics"
] as const;

export const OPTIONAL_SECTION_IDS = [
  "user_experience",
  "customer_truth",
  "solution_alternatives",
  "solution",
  "strategic_positioning",
  "adoption",
  "pricing",
  "risks",
  "ai",
  "open_questions",
  "rollout"
] as const;

export const CANONICAL_SECTION_IDS = [
  ...MANDATORY_SECTION_IDS,
  ...OPTIONAL_SECTION_IDS
] as const;

export type CanonicalSectionId = (typeof CANONICAL_SECTION_IDS)[number];
export type ArtifactType = "hypothesis" | "prd" | "openspec_proposal";

export interface ProductSpecFrontmatter {
  spec_format_version: "0.1";
  title: string;
  artifact_type: ArtifactType;
  spec_revision?: number;
  author: string;
  created_at: string;
  updated_at: string;
  linked_github_repo?: string;
  custom_sections?: Array<{ id: string; label: string; after: string }>;
  tool_metadata?: Record<string, string>;
}

export interface ProductSpecSection {
  id: string;
  label: string;
  content: string;
  ai_evals?: ProductSpecAiEval[];
}

export interface ProductSpecAiEval {
  id: string;
  type: string;
  input_set: string;
  evaluator: string;
  pass_threshold: number;
  checks: string[];
}

export interface ProductSpecDocument {
  frontmatter: ProductSpecFrontmatter;
  sections: ProductSpecSection[];
}

export interface ProductSpecValidationError {
  code: string;
  message: string;
  path?: string;
}

export interface ProductSpecValidationWarning {
  code: string;
  message: string;
  path?: string;
}

export type ProductSpecValidationResult =
  | { valid: true; document: ProductSpecDocument; errors: []; warnings: ProductSpecValidationWarning[] }
  | { valid: false; errors: ProductSpecValidationError[]; warnings: ProductSpecValidationWarning[] };

const LABELS: Record<string, string> = {
  problem: "Problem",
  hypothesis: "Hypothesis",
  scope: "Scope",
  user_experience: "User Experience",
  acceptance_criteria: "Acceptance Criteria",
  success_metrics: "Success Metrics",
  customer_truth: "Customer Truth",
  solution_alternatives: "Solution Alternatives",
  solution: "Solution",
  strategic_positioning: "Strategic Positioning",
  adoption: "Adoption",
  pricing: "Pricing",
  risks: "Risks",
  ai: "AI Details",
  open_questions: "Open Questions",
  rollout: "Rollout"
};

export function parseProductSpecMarkdown(markdown: string): ProductSpecDocument {
  const frontmatterMatch = /^---\n([\s\S]*?)\n---\n?/.exec(markdown);
  if (!frontmatterMatch) throw new Error("Product Spec frontmatter is required.");

  const frontmatter = parseFrontmatter(frontmatterMatch[1]);
  const body = markdown.slice(frontmatterMatch[0].length);
  const sections = parseSections(body, frontmatter.custom_sections ?? []);

  for (const sectionId of MANDATORY_SECTION_IDS) {
    if (!sections.some((section) => section.id === sectionId)) {
      throw new Error(`Missing mandatory section: ${sectionId}`);
    }
  }

  return { frontmatter, sections };
}

export function validateProductSpecMarkdown(markdown: string): ProductSpecValidationResult {
  try {
    const document = parseProductSpecMarkdown(markdown);
    const { errors, warnings } = validateDocument(document);
    if (errors.length) return { valid: false, errors, warnings };
    return { valid: true, document, errors: [], warnings };
  } catch (error) {
    return {
      valid: false,
      errors: [validationErrorFor(error)],
      warnings: []
    };
  }
}

export function serializeProductSpecMarkdown(doc: ProductSpecDocument): string {
  const frontmatter = serializeFrontmatter(doc.frontmatter);
  const body = doc.sections
    .map((section) => `## ${section.label}\n\n${section.content.trim()}`)
    .join("\n\n");
  return `---\n${frontmatter}---\n\n${body}\n`;
}

function validationErrorFor(error: unknown): ProductSpecValidationError {
  const message = error instanceof Error ? error.message : "Invalid Product Spec.";
  if (message.includes("frontmatter is required")) {
    return { code: "missing_frontmatter", message };
  }
  if (message.includes("Unsupported spec_format_version")) {
    return { code: "unsupported_version", message, path: "frontmatter.spec_format_version" };
  }
  if (message.includes("Missing mandatory section")) {
    const sectionId = message.split(":").at(-1)?.trim();
    return {
      code: "missing_required_section",
      message,
      path: sectionId ? `sections.${sectionId}` : "sections"
    };
  }
  if (message.includes("Missing required Product Spec frontmatter")) {
    return { code: "missing_required_frontmatter", message, path: "frontmatter" };
  }
  if (message.includes("Unsupported artifact_type")) {
    return { code: "unsupported_artifact_type", message, path: "frontmatter.artifact_type" };
  }
  if (message.includes("Invalid spec_revision")) {
    return { code: "invalid_spec_revision", message, path: "frontmatter.spec_revision" };
  }
  if (message.includes("Invalid AI eval")) {
    return { code: "invalid_ai_eval", message, path: "sections.acceptance_criteria.ai_evals" };
  }
  return { code: "invalid_product_spec", message };
}

function validateDocument(document: ProductSpecDocument): {
  errors: ProductSpecValidationError[];
  warnings: ProductSpecValidationWarning[];
} {
  const errors: ProductSpecValidationError[] = [];
  const warnings: ProductSpecValidationWarning[] = [];
  const seenSectionIds = new Set<string>();

  for (const section of document.sections) {
    if (seenSectionIds.has(section.id)) {
      errors.push({
        code: "duplicate_section",
        message: `Duplicate section: ${section.id}`,
        path: `sections.${section.id}`
      });
    }
    seenSectionIds.add(section.id);
  }

  let lastRequiredIndex = -1;
  for (const section of document.sections) {
    const requiredIndex = MANDATORY_SECTION_IDS.indexOf(section.id as (typeof MANDATORY_SECTION_IDS)[number]);
    if (requiredIndex === -1) continue;
    if (requiredIndex < lastRequiredIndex) {
      errors.push({
        code: "invalid_section_order",
        message: `Required section out of order: ${section.id}`,
        path: `sections.${section.id}`
      });
    }
    lastRequiredIndex = Math.max(lastRequiredIndex, requiredIndex);
  }

  for (const customSection of document.frontmatter.custom_sections ?? []) {
    if (!/^custom-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(customSection.id)) {
      errors.push({
        code: "invalid_custom_section_id",
        message: `Custom section id must use custom-<kebab-name>: ${customSection.id}`,
        path: `frontmatter.custom_sections.${customSection.id}`
      });
    }
  }

  for (const sectionId of MANDATORY_SECTION_IDS) {
    const section = document.sections.find((candidate) => candidate.id === sectionId);
    if (!section) continue;

    const meaningfulContent = section.content.replace(/[`*_#>\-\s\d.()[\]]/g, " ").trim();
    const wordCount = meaningfulContent.split(/\s+/).filter(Boolean).length;
    if (!meaningfulContent || /^tbd$/i.test(meaningfulContent)) {
      warnings.push({
        code: "empty_required_section",
        message: `Required section has no meaningful content: ${sectionId}`,
        path: `sections.${sectionId}`
      });
      continue;
    }
    if (wordCount < 6) {
      warnings.push({
        code: "thin_required_section",
        message: `Required section is very short: ${sectionId}`,
        path: `sections.${sectionId}`
      });
    }
  }

  for (const section of document.sections) {
    for (const [index, aiEval] of (section.ai_evals ?? []).entries()) {
      const path = `sections.${section.id}.ai_evals.${index}`;
      if (section.id !== "acceptance_criteria") {
        errors.push({
          code: "invalid_ai_eval",
          message: "AI eval blocks belong in Acceptance Criteria.",
          path
        });
      }
      const missingFields = ["id", "type", "input_set", "evaluator"].filter(
        (field) => !String(aiEval[field as keyof ProductSpecAiEval] ?? "").trim()
      );
      if (missingFields.length) {
        errors.push({
          code: "invalid_ai_eval",
          message: `Invalid AI eval: missing ${missingFields.join(", ")}.`,
          path
        });
      }
      if (!Number.isFinite(aiEval.pass_threshold) || aiEval.pass_threshold <= 0 || aiEval.pass_threshold > 1) {
        errors.push({
          code: "invalid_ai_eval",
          message: "Invalid AI eval: pass_threshold must be a number greater than 0 and less than or equal to 1.",
          path
        });
      }
      if (!aiEval.checks.length || aiEval.checks.some((check) => !check.trim())) {
        errors.push({
          code: "invalid_ai_eval",
          message: "Invalid AI eval: checks must include at least one non-empty item.",
          path
        });
      }
    }
  }

  return { errors, warnings };
}

function parseFrontmatter(raw: string): ProductSpecFrontmatter {
  const lines = raw.split("\n");
  const result: Record<string, unknown> = {};
  let customSections: Array<{ id: string; label: string; after: string }> | undefined;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim()) continue;
    if (line.startsWith("custom_sections:")) {
      customSections = [];
      while (lines[index + 1]?.startsWith("  - ")) {
        index += 1;
        const item: Record<string, string> = {};
        const first = lines[index].replace(/^  - /, "");
        assignKeyValue(item, first);
        while (lines[index + 1]?.startsWith("    ")) {
          index += 1;
          assignKeyValue(item, lines[index].trim());
        }
        customSections.push({
          id: item.id,
          label: item.label,
          after: item.after
        });
      }
      result.custom_sections = customSections;
      continue;
    }
    assignKeyValue(result, line);
  }

  if (result.spec_format_version !== "0.1") throw new Error("Unsupported spec_format_version.");
  if (!result.title || !result.artifact_type || !result.author || !result.created_at || !result.updated_at) {
    throw new Error("Missing required Product Spec frontmatter.");
  }
  if (!["hypothesis", "prd", "openspec_proposal"].includes(String(result.artifact_type))) {
    throw new Error("Unsupported artifact_type.");
  }
  if (result.spec_revision !== undefined) {
    const revision = Number(result.spec_revision);
    if (!Number.isInteger(revision) || revision < 1) {
      throw new Error("Invalid spec_revision. Use a positive integer.");
    }
    result.spec_revision = revision;
  }

  return result as unknown as ProductSpecFrontmatter;
}

function assignKeyValue(target: Record<string, unknown>, line: string) {
  const match = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
  if (!match) return;
  target[match[1]] = unquote(match[2]);
}

function unquote(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseSections(
  body: string,
  customSections: Array<{ id: string; label: string }>
): ProductSpecSection[] {
  const headingPattern = /^##\s+(.+)$/gm;
  const matches = [...body.matchAll(headingPattern)];
  return matches.map((match, index) => {
    const label = match[1].trim();
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? body.length;
    const id = sectionIdForLabel(label, customSections);
    const content = body.slice(start, end).trim();
    const ai_evals = parseAiEvalBlocks(content);
    return {
      id,
      label,
      content,
      ...(ai_evals.length ? { ai_evals } : {})
    };
  });
}

function parseAiEvalBlocks(content: string): ProductSpecAiEval[] {
  const blockPattern = /```productspec-ai-evals\n([\s\S]*?)\n```/g;
  return [...content.matchAll(blockPattern)].flatMap((match) => parseAiEvalList(match[1]));
}

function parseAiEvalList(raw: string): ProductSpecAiEval[] {
  const evals: Array<Partial<ProductSpecAiEval>> = [];
  let current: Partial<ProductSpecAiEval> | undefined;
  let inChecks = false;

  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    if (line.startsWith("- ")) {
      current = {};
      evals.push(current);
      assignAiEvalValue(current, line.slice(2));
      inChecks = false;
      continue;
    }
    if (!current) throw new Error("Invalid AI eval block: expected list item.");
    if (line.trim() === "checks:") {
      current.checks = [];
      inChecks = true;
      continue;
    }
    if (inChecks && line.startsWith("    - ")) {
      current.checks = [...(current.checks ?? []), unquote(line.replace(/^    - /, ""))];
      continue;
    }
    if (line.startsWith("  ")) {
      assignAiEvalValue(current, line.trim());
      inChecks = false;
      continue;
    }
    throw new Error(`Invalid AI eval block line: ${line}`);
  }

  return evals.map((aiEval) => ({
    id: String(aiEval.id ?? ""),
    type: String(aiEval.type ?? ""),
    input_set: String(aiEval.input_set ?? ""),
    evaluator: String(aiEval.evaluator ?? ""),
    pass_threshold: Number(aiEval.pass_threshold),
    checks: aiEval.checks ?? []
  }));
}

function assignAiEvalValue(target: Partial<ProductSpecAiEval>, line: string) {
  const match = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
  if (!match) throw new Error(`Invalid AI eval block line: ${line}`);
  const key = match[1] as keyof ProductSpecAiEval;
  if (key === "pass_threshold") {
    target.pass_threshold = Number(unquote(match[2]));
    return;
  }
  if (key === "checks") {
    target.checks = [];
    return;
  }
  target[key] = unquote(match[2]) as never;
}

function sectionIdForLabel(label: string, customSections: Array<{ id: string; label: string }>): string {
  const custom = customSections.find((section) => section.label === label);
  if (custom) return custom.id;

  const normalized = label.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  if (normalized === "ai_details") return "ai";
  if (CANONICAL_SECTION_IDS.includes(normalized as CanonicalSectionId)) return normalized;
  return `custom-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function serializeFrontmatter(frontmatter: ProductSpecFrontmatter): string {
  let output = "";
  for (const key of ["spec_format_version", "title", "artifact_type", "spec_revision", "author", "created_at", "updated_at", "linked_github_repo"] as const) {
    const value = frontmatter[key];
    if (value === undefined || value === "") continue;
    output += typeof value === "number" ? `${key}: ${value}\n` : `${key}: "${value}"\n`;
  }
  if (frontmatter.custom_sections?.length) {
    output += "custom_sections:\n";
    for (const section of frontmatter.custom_sections) {
      output += `  - id: "${section.id}"\n`;
      output += `    label: "${section.label}"\n`;
      output += `    after: "${section.after}"\n`;
    }
  }
  return output;
}
