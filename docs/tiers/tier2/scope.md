# Tier 2 Scope Document

**Document Purpose**: Define the scope, features, and compliance requirements for Tier 2 (Personal Care).

**Status**: PLANNED (Triggered by Tier 1 success metrics)
**Last Updated**: 2026-02-01

---

## Overview

Tier 2 enables **personal care services** with appropriate verification and enhanced compliance. This tier is triggered when Tier 1 achieves its success metrics.

---

## Trigger Criteria (Gate 1)

Tier 2 development begins when ALL of these are met:

| Metric | Target | Status |
|--------|--------|--------|
| Monthly Active Users | 500+ | Pending |
| Completed Bookings | 100+/month | Pending |
| Verified Caregivers | 50+ | Pending |
| Monthly Revenue | 5,000+ GBP | Pending |
| Net Promoter Score | 30+ | Pending |
| Safeguarding Incidents | 0 serious | Pending |
| Personal Care Demand | 20%+ of inquiries | Pending |

---

## Services Added at Tier 2

| Service Type | Tier 1 | Tier 2 |
|--------------|--------|--------|
| Personal care (washing) | No | **Yes** |
| Personal care (dressing) | No | **Yes** |
| Personal care (toileting) | No | **Yes** |
| Mobility assistance | No | **Yes** |
| Medication prompting | No | **Yes** |
| Overnight care | No | **Yes** |
| Live-in care | No | No (Tier 3) |

---

## New Data Collected at Tier 2

| Data Type | Purpose | Classification |
|-----------|---------|----------------|
| Care skill requirements | Personal care matching | Potentially special category |
| Caregiver care skills | Matching and verification | Standard |
| DBS certificate data | Safeguarding | Criminal conviction data |
| Qualification documents | Skill verification | Standard |
| Insurance certificates | Liability verification | Standard |

---

## Tier 2 Feature Summary

### Care Receiver Features (New)
- Personal care service requests
- Care skill requirement specification
- Filter by verified skills
- View DBS and qualification status

### Caregiver Features (New)
- Personal care services enabled
- Care skills profile (mandatory)
- Qualification uploads
- DBS submission (mandatory)
- Insurance upload

### Admin Features (New)
- DBS verification workflow
- Qualification verification
- Insurance verification
- Enhanced safeguarding reporting

---

## Compliance Requirements (Incremental)

| Requirement | Cost | Timeline |
|-------------|------|----------|
| DPIA Update | 3,000-5,000 GBP | 2-3 weeks |
| Legal Opinion (Skill Data) | 2,000-3,000 GBP | 1-2 weeks |
| DBS Umbrella Contract | 30-50 GBP/check + setup | 2-4 weeks |
| Enhanced Safeguarding Policy | 1,500-2,500 GBP | 1-2 weeks |
| Fractional DPO Service | 6,000-12,000 GBP/year | Ongoing |
| **TOTAL (Incremental)** | **25,000-35,000 GBP** | - |

---

## Open Questions for Tier 2

1. **Skill-based data classification**: Does "needs caregiver with dementia experience" constitute health data by inference?
2. **DBS verification timing**: Pre-launch DBS drive or verify on application?
3. **Insurance minimums**: What Public Liability and Professional Indemnity minimums?
4. **Qualification requirements**: Which qualifications mandatory vs. preferred?

---

## Agent Task

**To complete this document, assign**:
- **Agent**: product-requirements-specialist
- **Task**: TASK-008-tier2-scope.md
- **Output**: Complete Tier 2 scope with user stories and acceptance criteria

---

**Last Updated**: 2026-02-01
