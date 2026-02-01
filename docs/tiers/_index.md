# Tiered Documentation Structure

**Document Purpose**: Navigation index for tier-specific and common product documentation.

**Aligned With**: [Tiered Market Entry Roadmap](../ROADMAP.md) (FDR-003)

---

## Folder Structure

```
/docs/tiers/
├── tier1/          # Tier 1 (Minimal) - Companionship MVP
├── tier2/          # Tier 2 (Standard) - Personal Care
├── tier3/          # Tier 3 (Enhanced) - Condition-Specific
├── common/         # Shared across all tiers
└── GAPS_ANALYSIS.md  # Documentation gaps tracking
```

---

## Quick Navigation

### Tier 1: Minimal (Current Focus)
- [Tier 1 Overview](tier1/_index.md)
- [Build Sequence](tier1/planning/build-sequence.md)
- [Launch Checklist](tier1/planning/launch-checklist.md)
- [Implementation Status](tier1/status/implementation-status.md)
- [Features](tier1/features.md)
- [Compliance Requirements](tier1/compliance.md)

### Tier 2: Standard (Months 6-12)
- [Tier 2 Overview](tier2/_index.md)
- [Scope Document](tier2/scope.md)
- [Features](tier2/features.md)

### Tier 3: Enhanced (Months 12-18)
- [Tier 3 Overview](tier3/_index.md)
- [Scope Document](tier3/scope.md)
- [Features](tier3/features.md)

### Common (All Tiers)
- [Common Overview](common/_index.md)
- [Marketplace Specification](common/spec/marketplace-spec.md)
- [Feature Map (Master)](common/spec/feature-map.md)
- [State Machines](common/spec/state-maps.md)
- [Website Roadmap](common/website/roadmap.md)
- [MVP Classification](common/planning/mvp-classification.md)

---

## Tier Progression Summary

| Tier | Name | Timeline | Key Features | Investment |
|------|------|----------|--------------|------------|
| **1** | Minimal | Months 1-6 | Companionship, basic matching, lead validation | 15-25k GBP |
| **2** | Standard | Months 6-12 | Personal care, DBS verification, skill matching | 40-60k GBP |
| **3** | Enhanced | Months 12-18 | Condition matching, live-in care, clinical safety | 80-120k GBP |
| **4** | Comprehensive | Months 18+ | Care coordination, NHS/LA integration | 150k+ GBP |

---

## Agent Ownership

| Folder | Primary Agent | Responsibility |
|--------|--------------|----------------|
| `tier1/` | product-requirements-specialist | Feature specs, planning, status |
| `tier2/` | product-requirements-specialist | Scope, features, build sequence |
| `tier3/` | product-requirements-specialist | Scope, features, build sequence |
| `common/spec/` | product-requirements-specialist | Core specifications |
| `common/governance/` | product-director | Strategic documents, founder decisions |
| `common/compliance/` | compliance-specialist | Legal framework, DPIA, policies |

---

**Last Updated**: 2026-02-01
