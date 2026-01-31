# Document Index — UK Elderly Care Marketplace

**Last Updated:** 2026-01-31
**Status:** Active

---

## Quick Links

| Need | Document |
|------|----------|
| **What to do next** | [Next Steps](product/governance/next-steps.md) |
| **Product constitution** | [Marketplace Spec](product/spec/marketplace-spec.md) |
| **What's blocking launch** | [Gating Decisions](product/decisions/gating-decisions.md) |
| **What to build** | [Backlog](product/backlog/backlog.yml) |
| **System audit** | [Audit Findings](product/governance/audit-findings.md) |

---

## Document Hierarchy

### Governance (Start Here)

Strategic oversight, audits, and action plans.

| Document | Purpose | Owner |
|----------|---------|-------|
| [Next Steps](product/governance/next-steps.md) | Prioritized action plan | Founder |
| [Audit Findings](product/governance/audit-findings.md) | System state analysis | Product Director |
| [Pre-Launch Assessment](product/governance/pre-launch-assessment.md) | Phase 0 integration analysis | Product Director |

---

### Product Specification

Constitutional baseline and core definitions.

| Document | Purpose | Status |
|----------|---------|--------|
| [Marketplace Spec](product/spec/marketplace-spec.md) | Constitutional baseline, product phases | ✅ Complete |
| [Feature Map](product/spec/feature-map.md) | 22-system feature inventory | ✅ Complete |
| [State Maps](product/spec/state-maps.md) | 7 state machines for critical flows | ✅ Complete |

---

### Planning

MVP scope, build sequence, and launch planning.

| Document | Purpose | Status |
|----------|---------|--------|
| [MVP Classification](product/planning/mvp-classification.md) | MVP vs Post-MVP analysis | ✅ Complete |
| [MVP Build Sequence](product/planning/mvp-build-sequence.md) | 10-slice, 22-week timeline | ✅ Complete |
| [R0 Launch Scope](product/planning/r0-launch-scope.md) | 28 launch-critical screens | ✅ Complete |

---

### Decisions

Product decisions and launch blockers.

| Document | Purpose | Status |
|----------|---------|--------|
| [Decision Registry](product/decisions/_registry.md) | Master decision index | 🔲 Placeholder |
| [Product Decisions](product/decisions/product-decisions.md) | DEC-XXX entries | ✅ Complete |
| [Gating Decisions](product/decisions/gating-decisions.md) | GD-XX launch blockers | ✅ Complete |

---

### Backlog

Development work items and traceability.

| Document | Purpose | Status |
|----------|---------|--------|
| [Backlog](product/backlog/backlog.yml) | 22 epics, 134 stories | ✅ Complete |
| [Story-Screen Map](product/backlog/story-screen-map.md) | Traceability matrix | 🔲 Placeholder |

---

### UI Architecture

Screen inventory and routing.

| Document | Purpose | Status |
|----------|---------|--------|
| [Screen Inventory](product/ui/screen-inventory.md) | 89 MVP screens | ✅ Complete |
| [Route Map](product/ui/route-map.md) | URL structure | 🔲 Placeholder |

---

### Compliance

Legal, regulatory, and policy documents.

| Document | Purpose | Status |
|----------|---------|--------|
| [Legal Framework](compliance/legal-framework.md) | Legal analysis, risk register | ✅ Complete |
| [DPIA](compliance/dpia.md) | Data Protection Impact Assessment | 🔲 Placeholder |
| [Gap Registry](compliance/gap-registry.md) | Unified gap tracking | 🔲 Placeholder |
| [Safeguarding Policy](compliance/policies/safeguarding-policy.md) | Care Act 2014 compliance | 🔲 Placeholder |
| [Terms of Service](compliance/policies/terms-of-service.md) | User agreement | 🔲 Placeholder |
| [Privacy Policy](compliance/policies/privacy-policy.md) | GDPR compliance | 🔲 Placeholder |

---

### Marketing

Pre-launch website and content.

| Document | Purpose | Status |
|----------|---------|--------|
| [Pre-Launch Content Architecture](marketing/pre-launch-website-content-architecture.md) | 14-page content spec | ✅ Complete |

---

### Technical

Architecture and integration specifications.

| Document | Purpose | Status |
|----------|---------|--------|
| [API Specification](technical/api-spec.md) | REST/GraphQL API | 🔲 Placeholder |
| [Integrations](technical/integrations.md) | Third-party services | 🔲 Placeholder |
| [Infrastructure](technical/infrastructure.md) | Deployment architecture | 🔲 Placeholder |

---

## Product Phases

| Phase | Name | Status | Key Document |
|-------|------|--------|--------------|
| Phase 0 | Pre-Launch Website | **NEXT** | [Pre-Launch Content Architecture](marketing/pre-launch-website-content-architecture.md) |
| Phase 1 | MVP Marketplace | Planning | [MVP Build Sequence](product/planning/mvp-build-sequence.md) |
| Phase 2+ | Post-MVP | Future | [MVP Classification](product/planning/mvp-classification.md) |

---

## Document Dependencies

```
marketplace-spec.md (Constitution)
    │
    ├── feature-map.md
    │       │
    │       ├── mvp-classification.md
    │       │       │
    │       │       └── mvp-build-sequence.md
    │       │               │
    │       │               └── r0-launch-scope.md
    │       │
    │       └── backlog.yml
    │               │
    │               └── story-screen-map.md
    │
    ├── state-maps.md
    │       │
    │       └── screen-inventory.md
    │               │
    │               └── route-map.md
    │
    └── legal-framework.md
            │
            ├── gating-decisions.md
            │
            ├── dpia.md
            │
            └── policies/
                    ├── safeguarding-policy.md
                    ├── terms-of-service.md
                    └── privacy-policy.md
```

---

## Legend

| Icon | Meaning |
|------|---------|
| ✅ | Complete |
| 🔲 | Placeholder (needs work) |
| ⚠️ | Has known issues |

---

## Maintenance

This index should be updated when:
- New documents are created
- Documents are moved or renamed
- Document status changes
- Dependencies change

**Owner:** Product Director
