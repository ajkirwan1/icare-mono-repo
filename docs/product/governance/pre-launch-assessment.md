# Pre-Launch Phase Integration Assessment

**Date:** 2026-01-31
**Status:** Complete
**Author:** Product Director

---

## 1. Executive Summary

The existing product documentation represents a well-structured **full marketplace MVP** with comprehensive compliance coverage. The pre-launch website content architecture defines a **separate, marketing-focused lead capture site** that operates **before** the marketplace MVP launches.

**Key Finding**: The Pre-Launch Website is **not a subset of the MVP** — it is a distinct phase with different goals, technology requirements, and compliance scope.

**Action Taken**: Added a "Product Phases" section to `docs/product/spec/marketplace-spec.md` that formally recognizes Pre-Launch as Phase 0, preceding (not replacing) the MVP.

**Recommendation**: Create Pre-Launch-specific artifacts (separate backlog, potentially separate screen inventory) rather than modifying MVP artifacts. This keeps MVP documentation clean and allows Pre-Launch to be managed independently.

---

## 2. Product Spec Changes

### What Was Added

A new "Product Phases" section was inserted after "Product Summary" and before "Fixed Scope / Core Assumptions" in `docs/product/spec/marketplace-spec.md`.

The section defines:

| Phase | Name | Purpose | Compliance Scope |
|-------|------|---------|------------------|
| Phase 0 | Pre-Launch Website | Lead capture, validation | GDPR consent, PECR, basic policies |
| Phase 1 | MVP Marketplace | Operational marketplace | Full: GDPR, Care Act, CQC, DBS |
| Phase 2+ | Post-MVP | Growth features | Inherited from Phase 1 |

### What Was NOT Changed

The following constitutional sections remain untouched:

- Fixed Scope / Core Assumptions
- User Roles
- Care Services Supported
- Caregiver Capability Model
- Discovery & Search
- Trust, Safety & Regulation
- Booking Model
- Payments & Liability
- Safeguarding & Risk Profile
- Regulatory Reality
- Product Principle

---

## 3. Artifact Impact Analysis

### Full Impact Matrix

| Artifact | Path | Impact | Required Action | Priority |
|----------|------|--------|-----------------|----------|
| Product Spec | `spec/marketplace-spec.md` | **DONE** | Added Product Phases section | ✅ Complete |
| MVP Classification | `planning/mvp-classification.md` | LOW | Add note: Pre-Launch is Phase 0 | P2 |
| Build Sequence | `planning/mvp-build-sequence.md` | MEDIUM | Add Phase 0 as prerequisite | P1 |
| R0 Launch Scope | `planning/r0-launch-scope.md` | NONE | No changes needed | — |
| Screen Inventory | `ui/screen-inventory.md` | LOW | No changes (Pre-Launch separate) | — |
| Route Map | `ui/route-map.md` | LOW | No changes (Pre-Launch separate) | — |
| Backlog | `backlog/backlog.yml` | MEDIUM | Add EPIC-00 or create `pre-launch-backlog.yml` | P1 |
| Gap Registry | `compliance/gap-registry.md` | MEDIUM | Import Pre-Launch PRODUCT GAPs | P1 |
| Legal Framework | `compliance/legal-framework.md` | LOW | Add Pre-Launch compliance section | P2 |
| DPIA | `compliance/dpia.md` | LOW | Pre-Launch DPIA simpler; may need separate doc | P2 |
| Privacy Policy | `compliance/policies/privacy-policy.md` | LOW | Pre-Launch needs lighter version | P2 |
| Terms of Service | `compliance/policies/terms-of-service.md` | LOW | Pre-Launch needs lighter version | P2 |
| Safeguarding Policy | `compliance/policies/safeguarding-policy.md` | NONE | Not applicable to Pre-Launch | — |

---

## 4. Pre-Launch vs MVP Relationship

### Fundamental Distinction

| Aspect | Pre-Launch (Phase 0) | MVP (Phase 1) |
|--------|----------------------|---------------|
| **Purpose** | Market validation, lead capture | Operational marketplace |
| **Users** | Prospective users (leads) | Active users (transacting) |
| **Data Collected** | Contact info, care preferences | Full profiles, health data, payments |
| **Transactions** | None | Bookings, payments, reviews |
| **Compliance** | GDPR consent, PECR, basic Terms | Full: GDPR, Care Act, CQC, DBS |
| **Technology** | Static site / simple CMS | Full application stack |
| **Admin Needs** | Lead analytics | Verification, safeguarding, oversight |
| **Timeline** | 4-6 weeks | 22 weeks (per build sequence) |

### What Is Shared

| Element | Notes |
|---------|-------|
| Brand identity | Logo, colors, typography, tone |
| Legal entity | Company name, registration |
| Domain structure | Pre-Launch can become subdomain after MVP |
| Core messaging | Safety, verification, matching pillars |
| Privacy principles | GDPR compliance in both phases |
| Safeguarding language | Commitment statements |

### What Is Separate

| Element | Pre-Launch | MVP |
|---------|------------|-----|
| Route map | 15 pages | 89 screens |
| Technology | Static/CMS | Full application |
| Backlog | Marketing tasks | 134 user stories |
| Admin dashboard | Lead analytics | Full operations |
| Data model | Leads table | Full schema |

---

## 5. Timeline Implications

### Current Timeline (MVP Only)

```
Slice 1-10: Weeks 1-22 (MVP Build)
```

### Proposed Timeline (With Pre-Launch)

**Option A: Sequential**
```
Pre-Launch Build: Weeks 1-4
Pre-Launch Live: Week 4
MVP Build: Weeks 5-26
MVP Live: Week 26
```

**Option B: Parallel (Recommended)**
```
Pre-Launch Build: Weeks 1-4 (marketing/frontend team)
MVP Build: Weeks 1-22 (core engineering team)
Pre-Launch Live: Week 4
MVP Live: Week 22
```

**Recommendation**: Option B — Build Pre-Launch in parallel with MVP legal/compliance prep. Pre-Launch site goes live while MVP development continues. This validates demand before committing to full MVP build.

---

## 6. Remaining Jobs

### Immediate (This Week)

| Job | Owner | Input | Output | Status |
|-----|-------|-------|--------|--------|
| Update Product Spec | Product Director | marketplace-spec.md | Updated with Product Phases | ✅ DONE |
| Update MVP Classification | Product Director | mvp-classification.md | Add Phase 0 note | TODO |
| Update Build Sequence | Product Director | mvp-build-sequence.md | Add Phase 0 prerequisite | TODO |
| Update Gap Registry | Product Director | gap-registry.md + content architecture | Consolidated gaps | TODO |

### This Week

| Job | Owner | Input | Output | Status |
|-----|-------|-------|--------|--------|
| Create Pre-Launch Backlog | Product Director | content architecture | pre-launch-backlog.yml or EPIC-00 | TODO |
| Create Pre-Launch Screen Inventory | Product Director | content architecture | pre-launch-screen-inventory.md | OPTIONAL |

### Next 2 Weeks

| Job | Owner | Input | Output | Status |
|-----|-------|-------|--------|--------|
| Pre-Launch Privacy Policy | Legal Team | content architecture | Lighter privacy policy | TODO |
| Pre-Launch Terms of Use | Legal Team | content architecture | Lighter terms | TODO |

---

## 7. Risks and Mitigations

### Risk 1: Pre-Launch Promises Exceeding MVP Capability

**Description**: Marketing copy promises features MVP cannot deliver
**Likelihood**: Medium
**Impact**: High (trust damage, legal exposure)

**Mitigation**:
- All Pre-Launch content reviewed against Fixed Scope
- Disclaimer: "Features subject to change. Registration does not guarantee service availability."
- Clear "Coming Soon" language for unbuilt features

### Risk 2: Lead Data Governance Gap

**Description**: Pre-Launch data has no migration path to MVP
**Likelihood**: Medium
**Impact**: Medium (GDPR complications, lost leads)

**Mitigation**:
- Define schema compatibility before Pre-Launch build
- Pre-Launch forms capture data that maps to MVP profiles
- Document data migration plan

### Risk 3: Pre-Launch Delays MVP

**Description**: Pre-Launch development blocks engineering team
**Likelihood**: Low (if teams separate)
**Impact**: High (delays revenue)

**Mitigation**:
- Pre-Launch built by separate team or agency
- Use simple technology (Webflow, WordPress, static)
- MVP engineering not blocked by Pre-Launch

### Risk 4: Brand Inconsistency

**Description**: Pre-Launch brand differs from MVP
**Likelihood**: Medium
**Impact**: Medium (trust damage)

**Mitigation**:
- Establish brand guidelines before Pre-Launch build
- Shared design system
- Messaging pillars aligned with spec

### Risk 5: Compliance Assumptions Invalid

**Description**: Pre-Launch triggers full compliance requirements unexpectedly
**Likelihood**: Low
**Impact**: High (ICO enforcement)

**Mitigation**:
- Pre-Launch Privacy Policy explicitly scopes data collection
- No health data collected (preferences only)
- Consider Pre-Launch DPIA if any doubt

---

## 8. Pre-Launch PRODUCT GAPs to Resolve

The Pre-Launch content architecture identifies 10 critical gaps that must be resolved before the Pre-Launch website can go live:

| ID | Gap | Blocker Level | Owner |
|----|-----|---------------|-------|
| GAP-1 | Launch timeline | HIGH | Founder |
| GAP-2 | Launch geography | HIGH | Founder |
| GAP-3 | Pricing structure | HIGH | Founder |
| GAP-4 | CQC registration status | CRITICAL | Legal |
| GAP-5 | Caregiver commission rate | HIGH | Founder |
| GAP-6 | Brand identity | MEDIUM | Founder/Design |
| GAP-7 | Early adopter incentives | LOW | Founder |
| GAP-8 | Founder/team information | LOW | Founder |
| GAP-9 | Blog/content marketing | LOW | Marketing |
| GAP-10 | Social media presence | LOW | Marketing |

**Critical Path**: GAP-4 (CQC) affects messaging on Pre-Launch site. Must be resolved before content finalization.

---

## 9. Conclusion

The Pre-Launch phase has been formally integrated into the Product Spec as Phase 0. This preserves the constitutional baseline while acknowledging the phased delivery approach.

**Key Outcomes**:
1. ✅ Product Spec updated with Product Phases section
2. Pre-Launch clearly defined as distinct from MVP
3. Compliance scope differentiated by phase
4. Remaining jobs identified and prioritized

**Next Steps**:
1. Update MVP Classification (add Phase 0 note)
2. Update Build Sequence (add Phase 0 prerequisite)
3. Consolidate Pre-Launch gaps into gap-registry.md
4. Create Pre-Launch backlog
5. Resolve critical Pre-Launch PRODUCT GAPs

---

## Appendix: Files Modified

| File | Change |
|------|--------|
| `docs/product/spec/marketplace-spec.md` | Added "Product Phases" section (lines 9-54) |

## Appendix: Files Reviewed

| File | Purpose |
|------|---------|
| `docs/product/spec/marketplace-spec.md` | Constitutional baseline |
| `docs/marketing/pre-launch-website-content-architecture.md` | Pre-Launch specification |
| `docs/product/ui/screen-inventory.md` | MVP screens |
| `docs/product/planning/mvp-classification.md` | MVP vs Post-MVP |
| `docs/product/backlog/backlog.yml` | MVP backlog |
| `docs/product/planning/mvp-build-sequence.md` | Build timeline |
| `docs/product/planning/r0-launch-scope.md` | R0 screens |
| `docs/compliance/gap-registry.md` | Gap tracking |
