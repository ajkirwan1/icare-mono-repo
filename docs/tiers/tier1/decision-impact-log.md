# Tier 1 Decision Impact Log

**Document Purpose**: Track Critical Blocker (CB) decisions and identify which deliverables need updating when decisions are made.

**Owner**: Product Director
**Created**: 2026-02-07
**Status**: ACTIVE

---

## How to Use This Log

### When a CB Decision Is Made:

1. **Record the decision**: Add entry to Decision Log below
2. **Identify affected artifacts**: List all deliverables that reference or depend on this decision
3. **Update Pending Updates Tracker**: Add affected artifacts to `/docs/tiers/tier1/TIER1_STATUS_LOG.md` Section 8
4. **Assign updates**: Determine which agent owns each affected artifact
5. **Execute synchronization**: Run agents or make manual updates
6. **Mark complete**: Update status when all artifacts are synchronized

### ⚠️ WARNING SYSTEM

**CRITICAL**: If a CB decision is made and this log is NOT updated within 24 hours, a terminal warning should appear:

```
🚨 DECISION IMPACT LOG UPDATE REQUIRED 🚨
CB decision detected but decision-impact-log.md not updated.
Please update /docs/tiers/tier1/decision-impact-log.md immediately.
```

---

## Decision Log

### CB-001: Dashboard Screens Elevated to R0 (Care Receiver)

**Date**: 2026-02-06
**Decision**: Care Receiver Dashboard (SCR-CR-001) elevated from R1 to R0
**Rationale**: Critical user onboarding context, sets expectations, shows booking status
**Source**: `/docs/tiers/tier1/planning/r0-launch-scope.md` (v1.2)

**Affected Deliverables**:

| Deliverable | Path | Change Required | Status | Updated Date |
|-------------|------|----------------|--------|--------------|
| tier1-route-map.md | `/docs/product/tier1-route-map.md` | Change SCR-CR-001 from R1 to R0 | ✅ COMPLETE | 2026-02-07 (QA-1) |
| r0-launch-scope.md | `/docs/tiers/tier1/planning/r0-launch-scope.md` | Update R0 count from 26 to 30 | ✅ COMPLETE | 2026-02-06 |
| screen-inventory.md | `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` | Update counts to reflect new R0 screens | ✅ COMPLETE | 2026-02-07 (QA-2) |
| FIGMA_PRODUCTION_PLAN.md | `/docs/tiers/tier1/FIGMA_PRODUCTION_PLAN.md` | Ensure dashboard specs reference correct screens | ✅ COMPLETE | 2026-02-07 (QA-3) |

---

### CB-002: Dashboard Screens Elevated to R0 (Caregiver)

**Date**: 2026-02-06
**Decision**: Caregiver Dashboard (SCR-CG-001) elevated from R1 to R0
**Rationale**: Critical for caregiver onboarding, shows booking requests, revenue tracking
**Source**: `/docs/tiers/tier1/planning/r0-launch-scope.md` (v1.2)

**Affected Deliverables**:

| Deliverable | Path | Change Required | Status | Updated Date |
|-------------|------|----------------|--------|--------------|
| tier1-route-map.md | `/docs/product/tier1-route-map.md` | Change SCR-CG-001 from R1 to R0 | ✅ COMPLETE | 2026-02-07 (QA-1) |
| r0-launch-scope.md | `/docs/tiers/tier1/planning/r0-launch-scope.md` | Update R0 count from 26 to 30 | ✅ COMPLETE | 2026-02-06 |
| screen-inventory.md | `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` | Update counts to reflect new R0 screens | ✅ COMPLETE | 2026-02-07 (QA-2) |
| FIGMA_PRODUCTION_PLAN.md | `/docs/tiers/tier1/FIGMA_PRODUCTION_PLAN.md` | Ensure dashboard specs reference correct screens | ✅ COMPLETE | 2026-02-07 (QA-3) |

---

### CB-005: Message Screen Classification Corrected

**Date**: 2026-02-06
**Decision**: Message Thread (SCR-CR-011) elevated to R0, Message Inbox (SCR-CR-012) remains R1
**Rationale**: Pre-booking inquiries require conversation view (thread), not inbox listing
**Source**: `/docs/tiers/tier1/planning/r0-launch-scope.md` (v1.2)

**Affected Deliverables**:

| Deliverable | Path | Change Required | Status | Updated Date |
|-------------|------|----------------|--------|--------------|
| tier1-route-map.md | `/docs/product/tier1-route-map.md` | Fix ID/name swap + update classifications | ✅ COMPLETE | 2026-02-07 (QA-1) |
| r0-launch-scope.md | `/docs/tiers/tier1/planning/r0-launch-scope.md` | Clarify distinction between thread/inbox | ✅ COMPLETE | 2026-02-06 |
| screen-inventory.md | `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` | Ensure messaging screens correctly documented | ✅ COMPLETE | 2026-02-07 (QA-2) |

---

### CB-006: Review System Elevated to R0

**Date**: 2026-02-06
**Decision**: Leave Review (SCR-CR-015) elevated from R1 to R0
**Rationale**: Trust signal for early marketplace; needed for credibility flywheel
**Source**: `/docs/tiers/tier1/planning/r0-launch-scope.md` (v1.2)

**Affected Deliverables**:

| Deliverable | Path | Change Required | Status | Updated Date |
|-------------|------|----------------|--------|--------------|
| tier1-route-map.md | `/docs/product/tier1-route-map.md` | Change SCR-CR-015 from R1 to R0 | ✅ COMPLETE | 2026-02-07 (QA-1) |
| r0-launch-scope.md | `/docs/tiers/tier1/planning/r0-launch-scope.md` | Update R0 count from 26 to 30 | ✅ COMPLETE | 2026-02-06 |
| screen-inventory.md | `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` | Update counts to reflect new R0 screens | ✅ COMPLETE | 2026-02-07 (QA-2) |

---

### GAP-001: Message Inbox Elevated to R0

**Date**: 2026-02-12
**Decision**: Message Inbox (SCR-CR-012) elevated from R1 to R0
**Rationale**: Dashboard and main nav "Messages" links point to `/messages` which is a dead link without this screen. Booking-scoped message threads (SCR-CR-011) accessible but no centralized inbox.
**Source**: `/docs/tiers/tier1/planning/SCREEN_GAP_ANALYSIS_2026-02-11.md` (GAP 1, Option C)

**Affected Deliverables**:

| Deliverable | Path | Change Required | Status | Updated Date |
|-------------|------|----------------|--------|--------------|
| tier1-route-map.md | `/docs/product/tier1-route-map.md` | Change SCR-CR-012 from R1 to R0, update counts 30→33, 47→50 | ✅ COMPLETE | 2026-02-12 |
| r0-launch-scope.md | `/docs/tiers/tier1/planning/r0-launch-scope.md` | Update R0 count 30→33, add GAP-001 to change log | ✅ COMPLETE | 2026-02-12 |
| r1-launch-scope.md | `/docs/tiers/tier1/planning/r1-launch-scope.md` | Update R0/R1 counts, add GAP elevation note | ✅ COMPLETE | 2026-02-12 |
| Screen JSON | `/docs/tiers/tier1/figma/screens/message-inbox.json` | Created new screen JSON (SCR-CR-012) | ✅ COMPLETE | 2026-02-12 |
| SVG wireframes | `svg-output/care-receiver/message-inbox.svg` | Generated desktop, tablet, mobile SVGs | ✅ COMPLETE | 2026-02-12 |

---

### GAP-002: My Bookings (Care Receiver) Added to R0

**Date**: 2026-02-12
**Decision**: New screen SCR-CR-007 (My Bookings - Care Receiver) added to R0 at `/dashboard/bookings`
**Rationale**: Dashboard "View All" links for bookings and main nav "My Bookings" point to a route that doesn't exist. At R0 volumes most users have 0-3 bookings, but navigation is broken without this screen.
**Source**: `/docs/tiers/tier1/planning/SCREEN_GAP_ANALYSIS_2026-02-11.md` (GAP 2, Option B)

**Affected Deliverables**:

| Deliverable | Path | Change Required | Status | Updated Date |
|-------------|------|----------------|--------|--------------|
| tier1-route-map.md | `/docs/product/tier1-route-map.md` | Add SCR-CR-007 to booking routes | ✅ COMPLETE | 2026-02-12 |
| r0-launch-scope.md | `/docs/tiers/tier1/planning/r0-launch-scope.md` | Add GAP-002 to change log | ✅ COMPLETE | 2026-02-12 |
| Screen JSON | `/docs/tiers/tier1/figma/screens/bookings-list-care-receiver.json` | Created new screen JSON (SCR-CR-007) | ✅ COMPLETE | 2026-02-12 |
| SVG wireframes | `svg-output/care-receiver/bookings-list-care-receiver.svg` | Generated desktop, tablet, mobile SVGs | ✅ COMPLETE | 2026-02-12 |

---

### GAP-003: My Bookings (Caregiver) Added to R0

**Date**: 2026-02-12
**Decision**: New screen SCR-CG-014 (My Bookings - Caregiver) added to R0 at `/caregiver/bookings`
**Rationale**: Route map defines query parameters for `/caregiver/bookings` but no screen exists. Caregiver nav "Booking Requests" and "My Bookings" links are broken.
**Source**: `/docs/tiers/tier1/planning/SCREEN_GAP_ANALYSIS_2026-02-11.md` (GAP 3, Option B)

**Affected Deliverables**:

| Deliverable | Path | Change Required | Status | Updated Date |
|-------------|------|----------------|--------|--------------|
| tier1-route-map.md | `/docs/product/tier1-route-map.md` | Add SCR-CG-014 to booking routes | ✅ COMPLETE | 2026-02-12 |
| r0-launch-scope.md | `/docs/tiers/tier1/planning/r0-launch-scope.md` | Add GAP-003 to change log | ✅ COMPLETE | 2026-02-12 |
| Screen JSON | `/docs/tiers/tier1/figma/screens/bookings-list-caregiver.json` | Created new screen JSON (SCR-CG-014) | ✅ COMPLETE | 2026-02-12 |
| SVG wireframes | `svg-output/caregiver/bookings-list-caregiver.svg` | Generated desktop, tablet, mobile SVGs | ✅ COMPLETE | 2026-02-12 |

---

### GAP-004: Admin Screen ID Reconciliation

**Date**: 2026-02-12
**Decision**: Hybrid approach — reassign list screen IDs to new numbers, flag displaced detail screens as wireframe-pending
**Rationale**: Admin wireframes built correct LIST screens but used IDs the route map assigns to DETAIL screens, causing ID collisions
**Source**: `/docs/tiers/tier1/planning/SCREEN_GAP_ANALYSIS_2026-02-11.md` (GAP 4, Option C)

**Affected Deliverables**:

| Deliverable | Path | Change Required | Status | Updated Date |
|-------------|------|----------------|--------|--------------|
| Admin wireframes (5 files) | `wireframes/admin/scr-adm-*` | Renamed files with corrected IDs | ✅ COMPLETE | 2026-02-12 |
| Admin screen JSONs (4 files) | `figma/screens/adm-*.json` | Updated internal screenId fields | ✅ COMPLETE | 2026-02-12 |
| tier1-route-map.md | `/docs/product/tier1-route-map.md` | Added SCR-ADM-025, SCR-ADM-026, SCR-ADM-028 entries | ✅ COMPLETE | 2026-02-12 |
| SVG wireframes (15 files) | `svg-output/admin/` | Regenerated all admin SVGs | ✅ COMPLETE | 2026-02-12 |

---

### GAP-005: Profile Management Elevated to R0

**Date**: 2026-02-12
**Decision**: Elevate SCR-CG-003 (Caregiver Profile Management) from R1 to R0
**Rationale**: "My Profile" nav link in all caregiver screens points to `/caregiver/profile/edit`, which has no destination screen at R0. Caregivers also need self-service profile editing for bio, services, rate, availability, languages, interests.
**Source**: Navigation audit of SVG wireframes — Profile link in caregiver nav bar has no destination

**Affected Deliverables**:

| Deliverable | Path | Change Required | Status | Updated Date |
|-------------|------|----------------|--------|--------------|
| tier1-route-map.md | `/docs/product/tier1-route-map.md` | SCR-CG-003 changed from R1 to R0; R0 count 33→34 | COMPLETE | 2026-02-12 |
| r0-launch-scope.md | `planning/r0-launch-scope.md` | Added GAP-005 to change log; added SCR-CG-003 entry; count 33→34 | COMPLETE | 2026-02-12 |
| r1-launch-scope.md | `planning/r1-launch-scope.md` | Removed SCR-CG-003 from R1 additions; updated counts; updated build priorities | COMPLETE | 2026-02-12 |
| Screen JSON | `figma/screens/caregiver-profile-edit.json` | Created screen JSON for SCR-CG-003 | COMPLETE | 2026-02-12 |
| SVG wireframes | `svg-output/caregiver/` | Generated desktop + tablet + mobile SVGs | COMPLETE | 2026-02-12 |
| components.json | `figma/components.json` | Added multi-select-tags component (85→86) | COMPLETE | 2026-02-12 |
| generate.js | `packages/svg-wireframes/generate.js` | Fixed navItems to read from screen JSON; added multi-select-tags renderer | COMPLETE | 2026-02-12 |

---

## Impact Analysis Matrix

**Purpose**: Quick reference for which types of decisions affect which artifacts.

| Decision Type | Affects | Responsible Agent | Priority |
|--------------|---------|------------------|----------|
| **Scope Changes** (R0/R1 classification) | tier1-route-map.md, r0-launch-scope.md, r1-launch-scope.md, screen-inventory.md | route-map-architect | CRITICAL |
| **Feature Requirements** | feature-map.md, tier1-*.md feature specs, tier1-route-map.md | product-requirements-specialist | HIGH |
| **Pricing/Commission** (FDR-008) | pricing.md, terms-care-receivers.md, terms-caregivers.md, api-specification-tier1.md | compliance-specialist, technical-architect | CRITICAL |
| **Compliance/Legal** | All legal/*.md, compliance.md, safeguarding-specification.md | compliance-specialist | CRITICAL |
| **Technical Architecture** | database-schema-tier1.md, api-specification-tier1.md, stripe-integration-spec.md | technical-architect | HIGH |
| **Screen/Route Changes** | tier1-route-map.md, screen-inventory.md, FIGMA_PRODUCTION_PLAN.md | route-map-architect, elderly-care-ux-ui-designer | HIGH |
| **Content/Copy** | website-content/**.md, tier1-route-map.md (labels) | content-architect | MEDIUM |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-07 | Product Director (Agent) | Initial decision impact log created; documented CB-001, CB-002, CB-005, CB-006 with full artifact impact tracking |
| 1.1 | 2026-02-12 | Product Director (Agent) | Added GAP-001 through GAP-004 decisions from Screen Gap Analysis; all affected deliverables marked COMPLETE |
| 1.2 | 2026-02-12 | Product Director (Agent) | Added GAP-005 (Profile Management elevated to R0); all deliverables COMPLETE |

---

**END OF DECISION IMPACT LOG**
