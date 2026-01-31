# Next Steps — Product Director Action Plan

**Date:** 2026-01-31
**Status:** Active
**Owner:** Founder

---

## Overview

This document consolidates all next steps from the Product Director audit and Pre-Launch integration assessment into a single, prioritized action plan.

**Source Documents:**
- [System Audit Findings](audit-findings.md)
- [Pre-Launch Integration Assessment](pre-launch-assessment.md)

---

## Immediate Founder Decisions (This Week)

These decisions are blocking downstream work. No agent work can proceed without resolution.

| # | Decision | Context | Blocks | Recommended Action |
|---|----------|---------|--------|-------------------|
| 1 | **CQC Registration Status** | DEC-002 shows "Introduction Agency Model" but documents conflict | All compliance work, launch messaging | Confirm final decision with legal, update all docs |
| 2 | **DPIA Engagement** | GDPR requires DPIA before processing personal data | MVP launch (legally required) | Engage DPO or consultant this week |
| 3 | **Insurance Requirements** | GD-09 unresolved | Caregiver verification, Terms of Service | Contact insurance broker |
| 4 | **DBS Provider Selection** | Needed for integration planning | Technical architecture, verification flow | Choose: Trustid / UKCBC / other |
| 5 | **Identity Verification Provider** | Needed for integration planning | Technical architecture, onboarding flow | Choose: Onfido / Stripe Identity / Yoti |
| 6 | **Mental Capacity Act Compliance** | GD-04 affects family booking flows | Booking system design | Schedule legal consultation |

---

## Pre-Launch PRODUCT GAPs (Before Pre-Launch Site Goes Live)

These must be resolved before the Pre-Launch website content can be finalized.

| Priority | Gap | Owner | Blocks |
|----------|-----|-------|--------|
| CRITICAL | CQC registration messaging | Legal | Pre-Launch "Trust & Safety" content |
| HIGH | Launch timeline | Founder | All "Coming Soon" messaging |
| HIGH | Launch geography | Founder | Service area claims |
| HIGH | Pricing structure | Founder | FAQ answers, caregiver messaging |
| HIGH | Caregiver commission rate | Founder | Caregiver value proposition |
| MEDIUM | Brand identity | Founder/Design | All visual assets |
| LOW | Early adopter incentives | Founder | CTA messaging |
| LOW | Founder/team info | Founder | About Us page |

---

## Phase 1: Stabilisation (Weeks 1-3)

**Objective:** Achieve internal consistency across all existing artifacts.

### Agent Work

| Job | Agent | Input | Output | Status |
|-----|-------|-------|--------|--------|
| 1. Unified Gap Registry | product-requirements-specialist | screen-inventory.md, pre-launch-content-architecture.md | gap-registry.md (populated) | TODO |
| 2. CQC Decision Reconciliation | product-requirements-specialist | decisions/, gating-decisions.md, legal-framework.md | Aligned documents | TODO |
| 3. Story-Screen Traceability | route-map-architect | backlog.yml, screen-inventory.md | story-screen-map.md (populated) | TODO |
| 4. Timeline Reconciliation | product-requirements-specialist | mvp-build-sequence.md, r0-launch-scope.md | timeline-overview.md | TODO |
| 5. Document Manifest | product-director | All docs/** | _index.md (populated) | TODO |
| 6. Update MVP Classification | product-director | mvp-classification.md | Add Phase 0 note | TODO |
| 7. Update Build Sequence | product-director | mvp-build-sequence.md | Add Phase 0 prerequisite | TODO |
| 8. Create Pre-Launch Backlog | product-director | pre-launch-content-architecture.md | pre-launch-backlog.yml | TODO |

### Exit Criteria
- [ ] Zero conflicting statements between documents
- [ ] All GAP-XX items in single registry with unique IDs
- [ ] All GD-XX items aligned with DEC-XXX decisions
- [ ] Pre-Launch formally integrated into build sequence

---

## Phase 2: Formalisation (Weeks 4-8)

**Objective:** Complete missing compliance and legal artifacts.

### Agent Work (Requires New Agents)

| Job | Agent | Input | Output | Blocked By |
|-----|-------|-------|--------|------------|
| 9. DPIA Document | compliance-specialist (NEW) | feature-map.md, state-maps.md | dpia.md (complete) | Phase 1, DPO engagement |
| 10. Safeguarding Policy | compliance-specialist (NEW) | state-maps.md, legal-framework.md | safeguarding-policy.md (complete) | Job 9 |
| 11. Complaints Procedure | compliance-specialist (NEW) | safeguarding-policy.md | complaints-procedure.md | Job 10 |

### Legal Counsel Work

| Deliverable | Owner | Input | Blocked By |
|-------------|-------|-------|------------|
| Terms of Service (MVP) | Legal counsel | legal-framework.md | Phase 1 |
| Privacy Policy (MVP) | Legal counsel | dpia.md | Job 9 |
| Terms of Use (Pre-Launch) | Legal counsel | pre-launch-content-architecture.md | None |
| Privacy Policy (Pre-Launch) | Legal counsel | pre-launch-content-architecture.md | None |

### Exit Criteria
- [ ] All 10 gating decisions CLOSED or have explicit timeline
- [ ] DPIA completed and approved
- [ ] Safeguarding Policy aligned with Care Act 2014
- [ ] Legal policies drafted for both Pre-Launch and MVP

---

## Phase 3: Execution Prep (Weeks 9-12)

**Objective:** Technical and design readiness for development handoff.

### Agent Work (Requires New Agent)

| Job | Agent | Input | Output | Blocked By |
|-----|-------|-------|--------|------------|
| 12. API Specification | technical-architect (NEW) | r0-launch-scope.md, state-maps.md | api-spec.md (complete) | Phase 2 |
| 13. Database Schema | technical-architect (NEW) | api-spec.md | database-schema.md | Job 12 |
| 14. Integration Specs | technical-architect (NEW) | feature-map.md | integrations.md (complete) | Job 12 |
| 15. R0 Wireframes | elderly-care-ui-designer | r0-launch-scope.md, screen-inventory.md | 28 wireframe files | Phase 2 |

### Exit Criteria
- [ ] Development team can begin Slice 1 without ambiguity
- [ ] All R0 screens have approved wireframes
- [ ] All integrations have documented specifications
- [ ] API contracts defined

---

## Agent Team Actions

### Current Agents (No Changes Needed)

| Agent | Status | Next Assignment |
|-------|--------|-----------------|
| product-director | ACTIVE | Jobs 5, 6, 7, 8 |
| product-requirements-specialist | ACTIVE | Jobs 1, 2, 4 |
| route-map-architect | ACTIVE | Job 3 |
| elderly-care-ui-designer | WAITING | Job 15 (Phase 3) |
| elderly-care-marketplace-content-architect | WAITING | Pre-Launch content review |

### New Agents Required

| Agent | Justification | Scope | Create By |
|-------|---------------|-------|-----------|
| **compliance-specialist** | UK healthcare compliance expertise | DPIA, safeguarding, Care Act, GDPR | Week 3 |
| **technical-architect** | Technical architecture expertise | API, database, integrations | Week 8 |

---

## Document Inconsistencies to Resolve

These are known conflicts between documents that must be reconciled in Phase 1.

| Issue | Documents Affected | Resolution |
|-------|-------------------|------------|
| CQC decision status | decisions/, gating-decisions.md, legal-framework.md | Align to DEC-002 if confirmed |
| GAP ID collision | screen-inventory.md, pre-launch-content-architecture.md | Create unified registry with PGAP/MGAP prefixes |
| Timeline relationship | mvp-build-sequence.md, r0-launch-scope.md | Create timeline-overview.md |
| Screen count | screen-inventory.md, feature-map.md | Validate via story-screen traceability |
| Backlog-screen mapping | backlog.yml, screen-inventory.md | Create story-screen-map.md |

---

## Pre-Launch vs MVP Timeline

**Recommended: Parallel Build**

```
Week 1-2:  ├─ Pre-Launch Build ─────────┤
           │                            │
Week 1-4:  ├─ Legal/Compliance Prep ────────────────────────────┤
           │                                                     │
Week 3-4:  ├─ Pre-Launch QA & Launch ──┤                        │
           │                            │                        │
Week 4:    │ PRE-LAUNCH LIVE ──────────────────────────────────────────>
           │                                                     │
Week 5-22: │                            ├─ MVP Build (Slices 1-10) ─────┤
           │                                                             │
Week 22:   │                                                     MVP LIVE
```

**Key Milestones:**
- Week 4: Pre-Launch website live, lead capture begins
- Week 22: MVP marketplace live (if all gating decisions resolved)

---

## Checklist Summary

### This Week (Founder)

- [ ] Confirm CQC Introduction Agency Model is final
- [ ] Engage DPO or GDPR consultant for DPIA
- [ ] Contact insurance broker for requirements
- [ ] Select DBS check provider
- [ ] Select identity verification provider
- [ ] Schedule Mental Capacity Act legal consultation
- [ ] Approve creation of compliance-specialist agent

### Week 2-3 (Agent Work)

- [ ] Execute Job 1: Unified Gap Registry
- [ ] Execute Job 2: CQC Decision Reconciliation
- [ ] Execute Job 3: Story-Screen Traceability
- [ ] Execute Job 4: Timeline Reconciliation
- [ ] Execute Job 5: Document Manifest
- [ ] Execute Job 6: Update MVP Classification
- [ ] Execute Job 7: Update Build Sequence
- [ ] Execute Job 8: Create Pre-Launch Backlog

### Week 4+ (Phase 2)

- [ ] Begin DPIA with compliance-specialist
- [ ] Draft Pre-Launch legal policies
- [ ] Pre-Launch website build begins

---

## File References

| Document | Path | Purpose |
|----------|------|---------|
| This document | `docs/product/governance/next-steps.md` | Action plan |
| Audit Findings | `docs/product/governance/audit-findings.md` | System state analysis |
| Pre-Launch Assessment | `docs/product/governance/pre-launch-assessment.md` | Phase 0 integration analysis |
| Product Spec | `docs/product/spec/marketplace-spec.md` | Constitutional baseline |
| Gating Decisions | `docs/product/decisions/gating-decisions.md` | Launch blockers |
| Gap Registry | `docs/compliance/gap-registry.md` | Unified gap tracking |

---

**Last Updated:** 2026-01-31
**Next Review:** After Phase 1 completion
