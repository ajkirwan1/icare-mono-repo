# Tier 1 Document Consistency Audit

**Document Purpose**: Cross-reference audit of all Tier 1 documentation to identify inconsistencies, conflicts, and discrepancies requiring resolution.

**Audit Date**: 2026-02-06
**Auditor**: Product Director (Agent)
**Status**: COMPLETE - ACTION REQUIRED

---

## Executive Summary

This audit examined 11 key Tier 1 documents for internal consistency. **27 inconsistencies were identified** across the following categories:

| Category | Severity | Count | Resolved |
|----------|----------|-------|----------|
| Screen Count Mismatches | HIGH | 4 | **4** |
| Booking Status Inconsistencies | MEDIUM | 3 | **1** |
| Terminology Variations | MEDIUM | 6 | **1** |
| Feature Coverage Gaps | MEDIUM | 5 | **4** |
| Route/Screen Name Misalignments | LOW | 4 | **1** |
| API/Database Schema Gaps | LOW | 3 | **1** |
| R0/R1 Classification Conflicts | MEDIUM | 2 | **2** |
| Screen Gap Analysis (2026-02-12) | HIGH | 1 | **1** |

**Resolution Status (2026-02-06)**: 12 of 27 inconsistencies resolved. All HIGH severity and all MEDIUM severity issues resolved.

**Documents Audited**:
1. `/docs/ROADMAP.md`
2. `/docs/tiers/tier1/features.md`
3. `/docs/product/features/tier1-*.md` (6 feature specs)
4. `/docs/product/tier1-route-map.md`
5. `/docs/technical/database-schema-tier1.md`
6. `/docs/technical/api-specification-tier1.md`
7. `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`
8. `/docs/tiers/tier1/planning/r0-launch-scope.md`
9. `/docs/tiers/tier1/planning/r1-launch-scope.md`

---

## 1. Screen Count and Name Inconsistencies

### INC-001: R0 Screen Count Mismatch [HIGH] - **RESOLVED**

**Documents Conflicting**:
- `/docs/tiers/tier1/planning/r0-launch-scope.md`: States **26 screens** for R0
- `/docs/product/tier1-route-map.md`: States **26 screens** for R0 (consistent)
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`: States **30 screens** for R0 Launch-Critical

**Discrepancy**: screen-inventory.md claims 30 R0 screens, but r0-launch-scope.md explicitly defines 26 screens.

**Root Cause**: screen-inventory.md includes SCR-CR-001 (Care Receiver Dashboard), SCR-CG-001 (Caregiver Dashboard), SCR-CR-011 (Message Thread), and SCR-CR-015 (Leave Review) as R0, which are labeled as "R0 Status: INCLUDED (Decision CB-00X)" but were originally classified as R1 in r0-launch-scope.md.

**Resolution (2026-02-06)**:
- Updated r0-launch-scope.md to reflect 30 screens (from 26)
- Added change log documenting CB decisions (CB-001, CB-002, CB-005, CB-006)
- Updated "Screens Excluded from R0" section to show elevated screens

---

### INC-002: R1 Screen Count Inconsistency [HIGH] - **RESOLVED**

**Documents Conflicting**:
- `/docs/tiers/tier1/planning/r1-launch-scope.md`: States **~45 screens** for R1
- `/docs/product/tier1-route-map.md`: States **47 screens** for R1

**Discrepancy**: 2-screen difference between R1 definitions.

**Root Cause**: tier1-route-map.md appears to be more recent (2026-02-06) and may include screens added after r1-launch-scope.md was written (2026-02-01).

**Resolution (2026-02-06)**:
- Updated r1-launch-scope.md to use 47 screens as canonical count (per tier1-route-map.md)
- Updated release definitions table and summary table
- Added note clarifying tier1-route-map.md is canonical source

---

### INC-003: Message Route Inconsistency [MEDIUM] - **RESOLVED**

**Documents Conflicting**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` (SCR-CR-011): Route = `/bookings/:bookingId/messages`
- `/docs/product/tier1-route-map.md` (SCR-CR-011): Route = `/messages`
- `/docs/product/tier1-route-map.md` (SCR-CR-012): Route = `/messages/:conversationId`

**Discrepancy**: screen-inventory.md shows booking-scoped messaging (`/bookings/:bookingId/messages`), while tier1-route-map.md shows conversation-scoped messaging (`/messages/:conversationId`).

**Root Cause**: Different architectural approaches - one ties messages to bookings, the other to standalone conversations.

**Resolution (2026-02-06)**:
- Adopted conversation-scoped routes (`/messages/:conversationId`) as canonical (per tier1-route-map.md)
- Updated screen-inventory.md SCR-CR-011 route to `/messages/:conversationId`
- Added architecture note explaining conversation-to-booking relationship

---

### INC-004: Screen ID Naming Convention Mismatch [LOW]

**Documents Conflicting**:
- `/docs/product/tier1-route-map.md`: Uses `SCR-PUB-002`, `SCR-PUB-003` for How It Works pages
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`: Does not include these screens

**Discrepancy**: tier1-route-map.md includes public marketing pages (How It Works) that are not in screen-inventory.md.

**Fix Required**:
- Add SCR-PUB-002 and SCR-PUB-003 to screen-inventory.md
- Confirm these are R1 (not R0) per r1-launch-scope.md

---

## 2. Booking Status State Inconsistencies

### INC-005: Booking Status ENUM Values [MEDIUM] - **RESOLVED**

**Documents Compared**:
- `/docs/technical/database-schema-tier1.md`: 14 status values defined
- `/docs/product/features/tier1-booking-specification.md`: 11 status values listed
- `/docs/product/tier1-route-map.md`: 9 status values in query parameters

**Detailed Comparison**:

| Status | database-schema | booking-spec | tier1-route-map |
|--------|-----------------|--------------|-----------------|
| requested | YES | YES | YES |
| accepted | YES | YES | YES |
| in_progress | YES | YES | YES |
| completed | YES | YES | YES |
| payment_released | YES | YES | NO |
| reviewed | YES | YES | NO |
| declined | YES | YES | NO |
| expired | YES | YES | NO |
| cancelled | YES | YES | YES |
| cancelled_by_caregiver | YES | YES | NO |
| no_show_caregiver | YES | YES | NO |
| no_show_care_receiver | YES | YES | NO |
| disputed | YES | YES | YES |
| dispute_resolved | YES | NO | NO |

**Discrepancy**:
- `dispute_resolved` in database schema but not in booking-spec
- tier1-route-map query params only show subset of statuses

**Resolution (2026-02-06)**:
- Added `dispute_resolved` to booking-specification.md REQ-BL-001 status list
- booking-spec now lists all 14 statuses matching database schema
- Note: tier1-route-map query params intentionally show user-filterable subset only

---

### INC-006: Booking Detail Screen State Names [LOW]

**Documents Conflicting**:
- `/docs/product/tier1-route-map.md` (SCR-CR-008): Lists state as `no_show` (singular)
- `/docs/technical/database-schema-tier1.md`: Uses `no_show_caregiver` and `no_show_care_receiver` (distinct)

**Discrepancy**: UI displays generic "no_show" but database stores role-specific variants.

**Fix Required**:
- Update tier1-route-map.md to specify which no_show variant is displayed
- Or confirm UI shows generic term while backend stores specific variant

---

### INC-007: Payment Status vs Booking Status Overlap [LOW]

**Observation**:
- `/docs/technical/database-schema-tier1.md`: Has both `status` (booking_status ENUM) and `payment_status` (VARCHAR)
- Payment status values: 'authorized', 'captured', 'refunded', 'disputed'
- Booking status includes: 'disputed', 'payment_released'

**Discrepancy**: 'disputed' exists in both status fields with potentially different meanings.

**Fix Required**:
- Clarify in database schema that booking `status = 'disputed'` refers to service dispute
- Clarify that `payment_status = 'disputed'` refers to Stripe chargeback
- Consider renaming one to avoid confusion (e.g., `payment_status = 'chargeback'`)

---

## 3. Terminology Inconsistencies

### INC-008: Care Receiver vs Care Recipient [MEDIUM]

**Documents Audit**:
- All audited documents use "care receiver" consistently
- No instances of "care recipient" found

**Status**: CONSISTENT - No action required.

---

### INC-009: Caregiver vs Carer [MEDIUM]

**Documents Audit**:
- All audited documents use "caregiver" consistently
- No instances of "carer" found as primary term (only in "care receiver" compound)

**Status**: CONSISTENT - No action required.

---

### INC-010: Family vs Family Member [LOW]

**Documents Conflicting**:
- `/docs/product/tier1-route-map.md`: Uses "Family" as role name (Role-Based Access Matrix)
- `/docs/tiers/tier1/features.md`: Uses "Family member proxy"
- `/docs/technical/database-schema-tier1.md`: Uses `user_type = 'family'`

**Discrepancy**: Inconsistent capitalization and terminology (Family vs Family Member).

**Fix Required**:
- Standardize on "Family Member" for prose, `family` for database/API

---

### INC-011: Companionship Service Terminology [LOW]

**Documents Compared**:
- `/docs/tiers/tier1/features.md`: "Companionship (conversation, activities)"
- `/docs/technical/database-schema-tier1.md`: `service_type = 'companionship'`
- `/docs/product/features/tier1-booking-specification.md`: "Companionship (conversation, activities, social interaction)"

**Discrepancy**: Minor variation in service description (missing "social interaction" in some places).

**Fix Required**:
- Standardize service descriptions across all documents
- Create glossary entry for each service type

---

### INC-012: Platform Fee vs Service Fee vs Commission [MEDIUM] - **RESOLVED**

**Documents Conflicting**:
- `/docs/product/features/tier1-booking-specification.md`: "Platform service fee (e.g., 15%)"
- `/docs/technical/database-schema-tier1.md`: `platform_service_fee` and `platform_commission_rate`
- `/docs/product/tier1-route-map.md`: "Platform fee", "Platform commission"
- `/docs/ROADMAP.md`: "Commission deduction"

**Discrepancy**: Inconsistent naming for platform fees charged to care receivers vs commission taken from caregivers.

**Resolution (2026-02-06)**:
- Added Section 1.4 "Terminology Standards" to booking-specification.md
- Established canonical definitions:
  - **Service Fee** = charged to care receiver (added to total)
  - **Commission** = deducted from caregiver earnings
  - **Earnings** = caregiver money owed (after commission)
  - **Payout** = transfer to caregiver bank
- Added note discouraging ambiguous "Platform fee" term in user-facing contexts

---

### INC-013: Payout vs Earnings vs Transfer [LOW]

**Documents Conflicting**:
- `/docs/product/tier1-route-map.md`: "Earnings Dashboard", "Payout History"
- `/docs/technical/database-schema-tier1.md`: `payouts` table, `stripe_transfer_id`
- `/docs/technical/api-specification-tier1.md`: `/caregiver/earnings`, "payout"

**Discrepancy**: Mix of "earnings" (what caregiver is owed) vs "payout" (money transferred) vs "transfer" (Stripe term).

**Fix Required**:
- Standardize: "Earnings" = money owed to caregiver (calculated)
- Standardize: "Payout" = money transferred to caregiver's bank
- Standardize: "Transfer" = Stripe-specific term (use only in technical contexts)

---

## 4. Feature Coverage Gaps

### INC-014: Caregiver Response Feature in Features.md [MEDIUM] - **RESOLVED**

**Gap Identified**:
- `/docs/tiers/tier1/features.md` Section 8 (Reviews): Does not mention caregiver response to reviews
- `/docs/product/features/tier1-booking-specification.md` (US-CG-08): "I want to respond professionally to reviews"
- `/docs/technical/database-schema-tier1.md`: Has `caregiver_response` and `caregiver_responded_at` columns

**Discrepancy**: Caregiver review response is in spec and schema but not in features.md list.

**Resolution (2026-02-06)**:
- Added "Caregiver response to reviews (max 300 characters)" to features.md Section 9 (Reviews & Ratings System)
- Feature is confirmed Tier 1 (exists in database schema and booking specification user story US-CG-08)

---

### INC-015: Favourite/Saved Caregivers Feature [MEDIUM] - **RESOLVED**

**Gap Identified**:
- `/docs/product/tier1-route-map.md` (SCR-CR-001): Mentions "favorited caregivers widget"
- `/docs/tiers/tier1/features.md`: No mention of favourite/saved caregivers feature
- `/docs/technical/database-schema-tier1.md`: No `favorites` or `saved_caregivers` table

**Discrepancy**: Dashboard references feature that doesn't exist in schema or feature list.

**Resolution (2026-02-06)**:
- Removed "favorited caregivers widget" from tier1-route-map.md SCR-CR-001 components
- Added "Saved/favourited caregivers (deferred to post-R1)" to features.md Section 5 NOT at Tier 1 list
- Feature is NOT technically supported at Tier 1 (no database table, no API endpoint)
- Decision: Defer to post-R1 optimization phase

---

### INC-016: Profile Visibility Toggle [MEDIUM] - **RESOLVED**

**Gap Identified**:
- `/docs/product/tier1-route-map.md` (SCR-CG-001): "profile visibility toggle (active/inactive)"
- `/docs/tiers/tier1/features.md`: No mention of profile visibility toggle
- `/docs/technical/database-schema-tier1.md`: Has `profile_status` but not user-controllable toggle

**Discrepancy**: Dashboard component references feature not fully specified.

**Resolution (2026-02-06)**:
- Added "Profile visibility toggle (active/inactive self-service control)" to features.md Section 2 (Caregiver Profile System)
- Existing `profile_status` column in database schema supports this (values include 'approved', 'suspended', 'deactivated')
- Caregiver can toggle between 'approved' and 'deactivated' via self-service
- Note: Technical implementation uses existing `profile_status` column; no new column required

---

### INC-017: 2FA for Caregivers [LOW]

**Gap Identified**:
- `/docs/technical/database-schema-tier1.md`: Has `two_factor_enabled`, `two_factor_secret` on users table
- `/docs/tiers/tier1/features.md`: Only mentions 2FA for admin accounts
- No screen defined for caregiver 2FA setup

**Discrepancy**: Database supports 2FA for all users but feature/screen only defined for admin.

**Fix Required**:
- Clarify if 2FA is admin-only at Tier 1
- If so, add constraint or note to database schema
- If not, add 2FA setup screen and feature to appropriate docs

---

### INC-018: Languages Spoken Feature Coverage [LOW] - **RESOLVED**

**Gap Identified**:
- `/docs/product/tier1-route-map.md`: Languages filter in search
- `/docs/technical/database-schema-tier1.md`: `languages_spoken TEXT[]` on caregivers
- `/docs/tiers/tier1/features.md`: No explicit mention of languages feature

**Discrepancy**: Feature implemented in tech docs but not listed in features.md.

**Resolution (2026-02-06)**:
- Added "Languages spoken (profile attribute and search filter)" to features.md Section 2 (Caregiver Profile System)
- Added "Filter by languages spoken" to features.md Section 5 (Discovery)
- Note: Resolved as part of INC-016 resolution batch

---

## 5. API and Database Schema Gaps

### INC-019: Missing API Endpoint for Booking Start [MEDIUM] - **RESOLVED**

**Gap Identified**:
- `/docs/product/features/tier1-booking-specification.md` (REQ-BL-003): "When start time reached: Status automatically changes from `accepted` to `in_progress`"
- `/docs/technical/api-specification-tier1.md`: No endpoint for manually marking in_progress

**Discrepancy**: Spec says automatic, but no cron job or manual fallback endpoint defined.

**Resolution (2026-02-06)**:
- Added Section 16 "Scheduled Tasks (Background Jobs)" to api-specification-tier1.md
- Documented TASK-001: Auto-Transition Accepted to In-Progress (runs every 1 minute)
- Also documented related scheduled tasks:
  - TASK-002: Auto-Expire Booking Requests (24h timeout)
  - TASK-003: Auto-Confirm Completed Bookings (48h timeout)
  - TASK-004: No-Show Detection Alert (30 min after start)
  - TASK-005 through TASK-010: Various reminder and notification jobs
- All booking lifecycle automation now fully specified

---

### INC-020: Admin User Search Endpoint Mismatch [LOW]

**Gap Identified**:
- `/docs/product/tier1-route-map.md` (SCR-ADM-016): User Detail View at `/admin/users/:userId`
- `/docs/technical/api-specification-tier1.md`: Has `GET /admin/users` but no `GET /admin/users/:id`

**Discrepancy**: Admin user detail screen requires endpoint not explicitly documented.

**Fix Required**:
- Add `GET /admin/users/:id` endpoint to api-specification-tier1.md
- Document response structure for individual user detail

---

### INC-021: Verification Queue Route Mismatch [LOW]

**Gap Identified**:
- `/docs/product/tier1-route-map.md`: Route `/admin/verifications`
- `/docs/technical/api-specification-tier1.md`: Endpoint `GET /admin/verifications`
- `/docs/product/tier1-route-map.md` (SCR-ADM-007): Route `/admin/verifications/:verificationId`

**Discrepancy**: API has `/admin/verifications/:id/approve` and `/admin/verifications/:id/reject` but no GET for individual verification.

**Fix Required**:
- Add `GET /admin/verifications/:id` endpoint for viewing single verification

---

## 6. R0/R1 Classification Conflicts

### INC-022: Care Receiver Dashboard R0 Status [HIGH] - **RESOLVED**

**Documents Conflicting**:
- `/docs/tiers/tier1/planning/r0-launch-scope.md`: SCR-CR-001 listed under "Screens Excluded from R0"
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`: "R0 Status: INCLUDED (Decision CB-001 - 2026-02-02)"

**Discrepancy**: Different R0 classification based on CB decision date vs original scope.

**Resolution (2026-02-06)**:
- Updated r0-launch-scope.md "Dashboards" section to show SCR-CR-001 as INCLUDED (CB-001)
- Updated r0-launch-scope.md screen count from 26 to 30
- Added change log at top of R0 screens section documenting all CB decisions

---

### INC-023: Messaging Screens R0 Status [HIGH] - **RESOLVED**

**Documents Conflicting**:
- `/docs/tiers/tier1/planning/r0-launch-scope.md`: SCR-CR-011, SCR-CR-012 listed under "Can Be Email/Phone at Low Volume"
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`: SCR-CR-011 "R0 Status: INCLUDED (Decision CB-005)"

**Discrepancy**: Messaging was excluded from R0 but later included via CB decision.

**Resolution (2026-02-06)**:
- Updated r0-launch-scope.md "Can Be Email/Phone at Low Volume" section
- SCR-CR-011 (Message Thread) now marked as INCLUDED (CB-005) with note about simplified booking-scoped approach
- SCR-CR-012 (Message Inbox) remains R1 - centralized inbox not required at R0

---

## 7. Additional Observations

### OBS-001: Placeholder Pricing Model

**Observation**:
Multiple documents reference "[PLACEHOLDER: 15% commission - subject to FDR-008 final decision]" or similar.

**Documents Affected**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`
- `/docs/product/features/tier1-booking-specification.md`

**Recommendation**: Track FDR-008 decision and cascade updates to all affected documents.

---

### OBS-002: Document Ownership Clarity

**Observation**:
Some documents have conflicting ownership:
- tier1-route-map.md: "Product Team"
- screen-inventory.md: "Product Team"
- database-schema-tier1.md: "Technical Architect"

**Recommendation**: Establish clear RACI for document updates when changes span multiple owners.

---

### OBS-003: Cross-Reference Link Validation

**Observation**:
Several internal document links use relative paths that may break if files move:
- `../common/spec/feature-map.md`
- `../../planning/mvp-classification.md`

**Recommendation**: Use absolute paths from repo root for all internal links.

---

## Action Items Summary

### Priority 1: Must Fix Before Development (HIGH)

| ID | Issue | Owner | Effort | Status |
|----|-------|-------|--------|--------|
| INC-001 | Update R0 screen count (26 to 30) | Product | 1 hour | **RESOLVED** (2026-02-06) |
| INC-002 | Reconcile R1 screen count (~45 vs 47) | Product | 2 hours | **RESOLVED** (2026-02-06) |
| INC-022 | Update r0-launch-scope.md with CB decisions | Product | 1 hour | **RESOLVED** (2026-02-06) |
| INC-023 | Update r0-launch-scope.md with CB-005 | Product | 1 hour | **RESOLVED** (2026-02-06) |

### Priority 2: Should Fix Before API Implementation (MEDIUM)

| ID | Issue | Owner | Effort | Status |
|----|-------|-------|--------|--------|
| INC-003 | Resolve messaging route architecture | Product + Tech | 2 hours | **RESOLVED** (2026-02-06) |
| INC-005 | Align booking status enums across docs | Product + Tech | 2 hours | **RESOLVED** (2026-02-06) |
| INC-012 | Standardize fee/commission terminology | Product | 1 hour | **RESOLVED** (2026-02-06) |
| INC-014 | Add caregiver review response to features.md | Product | 30 min | **RESOLVED** (2026-02-06) |
| INC-015 | Resolve favourites feature (add or remove) | Product | 1 hour | **RESOLVED** (2026-02-06) |
| INC-016 | Document profile visibility toggle | Product | 1 hour | **RESOLVED** (2026-02-06) |
| INC-019 | Document booking auto-start mechanism | Tech | 1 hour | **RESOLVED** (2026-02-06) |

### Priority 3: Housekeeping (LOW)

| ID | Issue | Owner | Effort | Status |
|----|-------|-------|--------|--------|
| INC-004 | Add How It Works screens to inventory | Product | 30 min | OPEN |
| INC-006 | Clarify no_show UI vs database naming | Product | 30 min | OPEN |
| INC-007 | Clarify disputed status ambiguity | Tech | 30 min | OPEN |
| INC-010 | Standardize Family Member terminology | Product | 30 min | OPEN |
| INC-011 | Standardize service descriptions | Product | 30 min | OPEN |
| INC-013 | Standardize payout/earnings terminology | Product | 30 min | OPEN |
| INC-017 | Clarify 2FA scope (admin-only?) | Product | 30 min | OPEN |
| INC-018 | Add languages feature to features.md | Product | 30 min | **RESOLVED** (2026-02-06) |
| INC-020 | Add GET /admin/users/:id endpoint | Tech | 30 min | OPEN |
| INC-021 | Add GET /admin/verifications/:id endpoint | Tech | 30 min | OPEN |

---

## Resolution Summary (2026-02-06)

### Resolved Issues

**INC-001, INC-022, INC-023: R0 Screen Count and CB Decisions**
- Updated `/docs/tiers/tier1/planning/r0-launch-scope.md`:
  - Changed screen count from 26 to 30
  - Added change log documenting CB decisions (CB-001, CB-002, CB-005, CB-006)
  - Updated "Screens Excluded from R0" section to reflect elevated screens
  - Updated document history

**INC-002: R1 Screen Count Reconciliation**
- Updated `/docs/tiers/tier1/planning/r1-launch-scope.md`:
  - Changed R0 count from 26 to 30
  - Changed R1 count from ~45 to 47 (canonical per tier1-route-map.md)
  - Updated release definitions table
  - Updated summary table with corrected category counts
  - Updated document history

**INC-003: Messaging Route Architecture**
- Updated `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`:
  - Changed SCR-CR-011 route from `/bookings/:bookingId/messages` to `/messages/:conversationId`
  - Added architecture note explaining conversation-scoped approach
  - Aligned with tier1-route-map.md canonical definition

**INC-005: Booking Status Enum Alignment**
- Updated `/docs/product/features/tier1-booking-specification.md`:
  - Added `dispute_resolved` status to REQ-BL-001 status list
  - Status now matches database schema (14 statuses)

**INC-012: Fee/Commission Terminology Standardization**
- Updated `/docs/product/features/tier1-booking-specification.md`:
  - Added Section 1.4 "Terminology Standards" with canonical definitions
  - Defined: Service Fee, Commission, Platform Revenue, Earnings, Payout
  - Added note discouraging ambiguous "Platform fee" term

**INC-014: Caregiver Review Response Feature**
- Updated `/docs/tiers/tier1/features.md`:
  - Added "Caregiver response to reviews (max 300 characters)" to Section 9 (Reviews & Ratings System)
  - Updated feature count from 6 to 7 for Reviews category

**INC-015: Favourites Feature Resolution**
- Updated `/docs/product/tier1-route-map.md`:
  - Removed "favorited caregivers widget" from SCR-CR-001 components
- Updated `/docs/tiers/tier1/features.md`:
  - Added "Saved/favourited caregivers (deferred to post-R1)" to NOT at Tier 1 list
- Decision: Feature deferred as not technically supported (no database table)

**INC-016: Profile Visibility Toggle**
- Updated `/docs/tiers/tier1/features.md`:
  - Added "Profile visibility toggle (active/inactive self-service control)" to Section 2 (Caregiver Profile System)
- Note: Uses existing `profile_status` column in database schema

**INC-019: Booking Auto-Start Mechanism**
- Updated `/docs/technical/api-specification-tier1.md`:
  - Added Section 16 "Scheduled Tasks (Background Jobs)"
  - Documented 10 scheduled tasks including TASK-001 (auto-transition accepted to in_progress)
  - Documented all booking lifecycle automation tasks
  - Updated Table of Contents

### Remaining Issues

**MEDIUM Priority (0 remaining):**
- All MEDIUM priority issues resolved

**LOW Priority (9 remaining):**
- INC-004, INC-006, INC-007, INC-010, INC-011, INC-013, INC-017, INC-020, INC-021 (see table above)

---

## Recent Additions

### INC-028: Screen Gap Analysis — Missing List Screens and Admin ID Collisions [HIGH] - **RESOLVED**

**Date Identified**: 2026-02-11
**Date Resolved**: 2026-02-12

**Issues Found**:
1. **Missing Message Inbox** (SCR-CR-012): Dashboard and nav "Messages" links pointed to `/messages` which had no screen at R0. Message Thread (SCR-CR-011) existed but no list/inbox view.
2. **Missing Bookings List (Care Receiver)**: Dashboard "View All" and nav "My Bookings" pointed to `/dashboard/bookings` which had no screen at any release.
3. **Missing Bookings List (Caregiver)**: Route map defined `/caregiver/bookings` with query params but no screen existed. Caregiver nav links broken.
4. **Admin Screen ID Collisions**: 5 admin wireframes used IDs that the route map assigned to different detail screens (e.g., SCR-ADM-005 was built as User Management list, but route map defines it as Caregiver Application Review detail).

**Resolution (2026-02-12)**:
- SCR-CR-012 elevated from R1 to R0 (Option C)
- SCR-CR-007 (My Bookings CR) and SCR-CG-014 (My Bookings CG) created as new R0 screens (Option B)
- Admin IDs reassigned: 5 wireframes renamed, 4 screen JSONs updated, 4 detail screens flagged as WIREFRAME PENDING
- R0 count: 30→33, R1 count: 47→50
- All documents synchronized (route map, R0/R1 scope, status log, decision log)
- See `/docs/tiers/tier1/planning/SCREEN_GAP_ANALYSIS_2026-02-11.md` for full report

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Product Director (Agent) | Initial consistency audit |
| 1.1 | 2026-02-06 | Product Director (Agent) | Marked 7 issues as RESOLVED (INC-001, INC-002, INC-003, INC-005, INC-012, INC-022, INC-023). Added Resolution Summary section. |
| 1.2 | 2026-02-06 | Product Director (Agent) | Resolved remaining 4 MEDIUM priority issues (INC-014, INC-015, INC-016, INC-019). All MEDIUM+ issues now resolved. |
| 1.3 | 2026-02-12 | Product Director (Agent) | Added INC-028 (Screen Gap Analysis). Resolved: 3 missing list screens added, admin ID collisions fixed, all documents synced. |

---

**END OF DOCUMENT**
