---
name: spec-driven-development
description: Learn how to follow our conventions for spec-driven development
---

We write feature specs in .yaml files. We work on one feature at a time.
Feature specs can always be found at `features/<feature-name>/<SLUG>_FRD.yaml`
Each requirement / AC in the spec has an implicit, unique, predictable ID e.g. `SLUG.COMPONENT.1-1`. We call this an ACID.
If possible, include the ACID in test name or describe block title e.g. `FEAT.LAYERS.2-1`.
You are encouraged to include the ACID in code comments for context.
