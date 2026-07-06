## Summary

What changed?

## ProductSpec impact

- [ ] Updates the standard, schema, parser, validator, conformance fixtures, or examples.
- [ ] Adds or changes a Product Spec example.
- [ ] Documentation-only change.
- [ ] No ProductSpec format impact.

## Validation

Run the checks that match the change:

```bash
npm test
npm run validate -- examples/minimal.product-spec.md
```

If you added examples, validate them:

```bash
for f in examples/*.product-spec.md; do node dist/cli.js validate "$f"; done
```

## Compatibility

Does this change affect existing `.product-spec.md` files or parser output?

## Related Product Spec

Link the Product Spec, issue, or discussion that explains the intent behind this change.
