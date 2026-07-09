# ProductSpec Compared To Other Artifacts

ProductSpec is not trying to replace every planning or implementation artifact. It defines the software intent layer before implementation.

## ProductSpec vs. Classic PRD

A classic PRD is usually a human-readable planning document.

A Product Spec is a human-readable and machine-parseable intent artifact. It keeps the parts humans reason about readable, while structuring the parts tools and agents need to execute or compare.

## ProductSpec vs. Jira Or Linear

Jira and Linear track work.

ProductSpec captures why the work exists, what is in scope, what must be true before launch, and how success will be measured after launch.

Tickets can change as implementation details emerge. The Product Spec should remain the durable statement of intent behind those tickets.

## ProductSpec vs. Git

Git stores implementation history.

ProductSpec stores product intent. A Product Spec can live in Git and be reviewed through pull requests, but code commits should not be the first durable record of why the work exists.

## ProductSpec vs. Figma

Figma stores design artifacts.

ProductSpec can link to Figma, prototypes, screenshots, or demos through `user_experience`, but it does not replace the design source of truth. It explains what the user experience needs to accomplish.

## ProductSpec vs. Engineering Design Doc

Engineering design docs explain how the system will be built.

ProductSpec explains what should be built and why. It should come before an engineering design doc, OpenSpec proposal, Spec Kit plan, or task breakdown.

## ProductSpec vs. OpenSpec Or Spec Kit

OpenSpec and Spec Kit operate at the engineering spec layer.

ProductSpec operates upstream at the software intent layer.

```text
Product Spec -> Engineering Spec -> Code
what / why      how / plan / tasks   implementation
```

Both layers are useful. They answer different questions.

## ProductSpec vs. ADR

Architecture Decision Records capture technical decisions.

Decision Trace, the companion standard to ProductSpec, captures product and implementation decisions over time: scope drift, acceptance criteria changes, implementation tradeoffs, outcome reviews, and spec revisions.

ADRs are usually about architecture. Decision Traces are about how committed intent changed or was reconciled with reality.
