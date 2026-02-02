# Document Index - UK Elderly Care Marketplace

**Last Updated:** 2026-02-01
**Status:** Active
**Version:** 5.0 (Post-Reorganization - Path Corrections)

---

## Quick Navigation

| Need | Document | Status |
|------|----------|--------|
| **Strategic direction** | [Tiered Market Entry Roadmap](ROADMAP.md) | Active |
| **Founder decisions** | [Founder Decisions Responses](governance/founder-decisions-responses.md) | Active |
| **What to do next** | [Tier 1 Implementation Status](tiers/tier1/status/implementation-status.md) | Active |
| **Product constitution** | [Marketplace Spec](tiers/common/spec/marketplace-spec.md) | Active |
| **What's blocking launch** | [Gating Decisions](governance/gating-decisions.md) | Active |
| **What to build** | [Tier 1 Build Sequence](tiers/tier1/planning/build-sequence.md) | Active |
| **Feature inventory** | [Feature Map](tiers/common/spec/feature-map.md) | Active |

---

## Document Hierarchy

### 1. Strategy

Foundational strategic decisions that shape everything else.

| Document | Purpose | Status |
|----------|---------|--------|
| [Tiered Market Entry Roadmap](ROADMAP.md) | 4-tier market entry strategy (FDR-003) | Active |
| [Founder Decisions Responses](governance/founder-decisions-responses.md) | FDR-001, FDR-002, FDR-003 records | Active |
| [Founder Decisions Strategic Analysis](governance/founder-decisions-strategic-analysis.md) | Deep analysis of decision areas | Reference |

---

### 2. Product Specification

Constitutional baseline and core definitions.

| Document | Purpose | Status |
|----------|---------|--------|
| [Marketplace Spec](tiers/common/spec/marketplace-spec.md) | Constitutional baseline, product phases | Active |
| [Feature Map](tiers/common/spec/feature-map.md) | 22 systems with tier tags [T1], [T2], [T3] | Active |
| [State Maps](tiers/common/spec/state-maps.md) | 7 state machines for critical flows | Active |

---

### 3. Planning and Build

MVP scope, build sequence, and launch planning.

| Document | Purpose | Status |
|----------|---------|--------|
| [MVP Classification](tiers/common/planning/mvp-classification.md) | Tier 1 vs Tier 2 vs Post-MVP | Active |
| [Tier 1 Build Sequence](tiers/tier1/planning/build-sequence.md) | 12-phase Tier 1 build plan | Active |
| [Tier 1 Launch Checklist](tiers/tier1/planning/launch-checklist.md) | Launch readiness checklist | Active |
| [R0 Launch Scope](tiers/tier1/planning/r0-launch-scope.md) | 28 launch-critical screens | Active |

---

### 4. Decisions

Product decisions and launch blockers.

| Document | Purpose | Status |
|----------|---------|--------|
| [Gating Decisions](governance/gating-decisions.md) | GD-01 to GD-11 launch blockers | Active |
| [Product Decisions](governance/product-decisions.md) | DEC-001 to DEC-003 entries | Active |

---

### 5. Tier-Specific Documentation

Tier-specific planning, features, and status.

| Document | Purpose | Status |
|----------|---------|--------|
| [Tiers Overview](tiers/_index.md) | Navigation for all tier documentation | Active |
| [Tier 1 Features](tiers/tier1/features.md) | Tier 1 feature list | Active |
| [Tier 1 Compliance](tiers/tier1/compliance.md) | Tier 1 regulatory requirements | Active |
| [Tier 2 Scope](tiers/tier2/scope.md) | Tier 2 scope definition | Planned |
| [Tier 3 Scope](tiers/tier3/scope.md) | Tier 3 scope definition | Future |

---

### 6. Website and Marketing

Website roadmap and content strategy.

| Document | Purpose | Status |
|----------|---------|--------|
| [Tiered Website Roadmap](tiers/common/website/roadmap.md) | Website evolution across tiers | Active |

---

### 7. Governance and Status

Implementation tracking and status reports.

| Document | Purpose | Status |
|----------|---------|--------|
| [Tier 1 Implementation Status](tiers/tier1/status/implementation-status.md) | What's complete, blocked, next | Active |
| [Pricing Decisions Status](governance/pricing-decisions-status.md) | Pricing decision tracking | Active |
| [Gaps Analysis](tiers/GAPS_ANALYSIS.md) | Documentation gaps and issues | Active |

---

### 8. Compliance

Legal, regulatory, and policy documents.

| Document | Purpose | Status |
|----------|---------|--------|
| [Legal Framework](compliance/legal-framework.md) | Legal analysis, tiered requirements | Active |
| [DPIA](compliance/dpia.md) | Data Protection Impact Assessment | In Progress |

**Policies:**

| Document | Purpose | Status |
|----------|---------|--------|
| [Safeguarding Policy](compliance/policies/safeguarding-policy.md) | Care Act 2014 compliance | Placeholder |
| [Terms of Service](compliance/policies/terms-of-service.md) | User agreement | Draft |
| [Privacy Policy](compliance/policies/privacy-policy.md) | GDPR compliance | Placeholder |

---

### 9. Glossary

Standardized terminology.

| Document | Purpose | Status |
|----------|---------|--------|
| [Glossary](_glossary.md) | Terminology definitions, FDR/GD index | Active |

---

## Document Dependencies

```
Strategy (START HERE)
    |
    +-- ROADMAP.md (FDR-003 - Tiered Market Entry)
    |       |
    |       +-- governance/founder-decisions-responses.md (FDR-001, FDR-002, FDR-003)
    |
    v
Product Specification
    |
    +-- tiers/common/spec/marketplace-spec.md (Constitution)
    |       |
    |       +-- tiers/common/spec/feature-map.md [with tier tags]
    |       |       |
    |       |       +-- tiers/common/planning/mvp-classification.md
    |       |       |       |
    |       |       |       +-- tiers/tier1/planning/build-sequence.md
    |       |
    |       +-- tiers/common/spec/state-maps.md
    |
    v
Decisions
    |
    +-- governance/gating-decisions.md (GD-01 to GD-11)
    |
    +-- governance/product-decisions.md (DEC-001 to DEC-003)
    |
    v
Compliance
    |
    +-- compliance/legal-framework.md
    |       |
    |       +-- compliance/dpia.md
    |       |
    |       +-- compliance/policies/
    |               +-- terms-of-service.md
    |               +-- privacy-policy.md
    |               +-- safeguarding-policy.md
    |
    v
Governance & Status
    |
    +-- tiers/tier1/status/implementation-status.md (CURRENT STATE)
    |
    +-- governance/pricing-decisions-status.md
```

---

## Status Legend

| Status | Meaning |
|--------|---------|
| Active | Current, authoritative document |
| In Progress | Being actively worked on |
| Placeholder | Structure exists, content needed |
| Draft | Content exists but not reviewed/approved |
| Reference | Valid but not primary; for context |

---

## For Agents

### File Access by Role

| Agent | Primary Documents |
|-------|-------------------|
| **product-director** | All docs/**, especially governance/, tiers/** |
| **product-requirements-specialist** | tiers/common/spec/, tiers/tier1-3/, compliance/ |
| **route-map-architect** | tiers/common/spec/, tiers/tier1/planning/ |
| **elderly-care-ui-designer** | tiers/common/spec/, tiers/tier1/ |
| **compliance-specialist** | compliance/**, governance/gating-decisions.md |
| **technical-architect** | tiers/common/spec/, tiers/tier1/planning/ |
| **content-architect** | tiers/common/website/, tiers/common/spec/ |

---

**END OF INDEX**
