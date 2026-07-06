# Use ProductSpec In Your Repo

This is the fastest path for trying ProductSpec inside an existing software repository.

## 1. Create A Spec Directory

```bash
mkdir -p specs
```

## 2. Create A Starter Product Spec

```bash
npm exec --package @productspec/parser -- productspec init specs/my-feature.product-spec.md
```

## 3. Edit The Product Spec

Fill in the default sections:

- `problem`: who is hurting, what pain do they feel, and why does it matter?
- `hypothesis`: what behavior will change if this ships, and why?
- `scope`: what is in, what is out, and what is deliberately cut?
- `acceptance_criteria`: what must be true before launch?
- `success_metrics`: what real-world outcome would make the work worth continuing?

For visible user experiences, add an optional `User Experience` section with a prototype, mockup, API docs, CLI demo, dashboard, or workflow link.

## 4. Validate It

```bash
npm exec --package @productspec/parser -- productspec validate specs/my-feature.product-spec.md
```

## 5. Commit It

```bash
git add specs/my-feature.product-spec.md
git commit -m "Add Product Spec for my feature"
```

## 6. Link Work Back To The Spec

In GitHub Issues, Jira, Linear, OpenSpec, Spec Kit, or pull requests, link back to the Product Spec:

```md
Implements `specs/my-feature.product-spec.md` at `spec_revision: 1`.
```

When the product intent changes, update the Product Spec and increment `spec_revision`.

## 7. Optional CI Check

Add a CI step that validates committed Product Specs:

```bash
for f in specs/*.product-spec.md; do
  npm exec --package @productspec/parser -- productspec validate "$f"
done
```

That check verifies structure and portability. It does not judge whether the product bet is good.

## Suggested Pull Request Text

```md
## Intent

Implements `specs/my-feature.product-spec.md` at `spec_revision: 1`.

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Notes

Success Metrics will be measured after launch.
```
