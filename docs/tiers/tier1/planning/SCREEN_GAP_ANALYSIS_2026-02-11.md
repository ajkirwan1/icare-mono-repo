# Screen Gap Analysis Report

**Date**: 2026-02-11
**Source**: Product Director cross-reference of route map, R0/R1 scope, wireframes, and screen JSONs
**Status**: ALL JOBS COMPLETE 2026-02-12

---

## Executive Summary

A list-to-detail navigation audit across all 26 screen JSONs revealed **4 actionable gaps** and **1 critical ID collision issue** in the admin screens. Two gaps require product decisions before R0 launch; the admin ID issue requires immediate reconciliation.

---

## GAP 1: Messages Inbox

**Severity**: MEDIUM
**Status**: Intentionally deferred to R1 (SCR-CR-012), but navigation references are broken at R0

### The Problem
- We have `message-thread` (SCR-CR-011, detail view at `/messages/:conversationId`) -- R0
- We do NOT have a messages inbox/list (SCR-CR-012 at `/messages`) -- R1
- However, the care receiver dashboard wireframe and route map navigation both include "Messages" links pointing to `/messages`, which will be a dead link at R0

### Navigation References That Break at R0
1. Care receiver dashboard header: "Messages" links to SCR-CR-012
2. Route map main nav (Section 5.2): "Messages" links to `/messages`
3. Care receiver dashboard Quick Actions: "Messages" button links to SCR-CR-012

### Current R0 Access Path
Message threads are accessed ONLY via:
- Booking detail (SCR-CR-008) "Message Caregiver" button
- Dashboard notification cards linking to specific threads

### Options
| Option | Description | Effort |
|--------|-------------|--------|
| **A: Remove nav link** | Remove "Messages" from main nav at R0. Users access threads via booking detail only. | Minimal |
| **B: Minimal list** | Build a simple conversations list (not the full R1 inbox). | Low-Medium |
| **C: Elevate to R0** | Build full SCR-CR-012 inbox at R0. | Medium |

### Recommendation
Option A -- simplest, aligns with R0 minimalism. Revisit when SCR-CR-012 is built for R1.

---

## GAP 2: Bookings List (Care Receiver)

**Severity**: HIGH
**Status**: Not defined at ANY release -- genuine missing screen

### The Problem
- We have `booking-detail` (SCR-CR-008, detail view at `/bookings/:bookingId`) -- R0
- We do NOT have a bookings list screen at `/dashboard/bookings` or similar
- The care receiver dashboard shows max 3 upcoming bookings + 3 pending requests with "View All" links
- Those "View All" links reference routes/screens that don't exist
- The route map main nav includes "My Bookings" pointing to `/dashboard/bookings` -- undefined

### Impact at R0
At R0 volumes (10-50 care receivers, 5-50 bookings/month), most users will have 0-3 active bookings, so the dashboard summary may suffice. But navigation is broken.

### Options
| Option | Description | Effort |
|--------|-------------|--------|
| **A: Dashboard IS the list** | Remove "View All" and "My Bookings" nav. All booking visibility stays within the dashboard. | Minimal |
| **B: Build bookings list** | New screen (e.g., SCR-CR-XXX) at `/dashboard/bookings` with filterable booking cards/table. | Low |
| **C: Expand dashboard** | Add "Show More" pagination to dashboard booking sections so ALL bookings are visible. | Low |

### Recommendation
Option B or C. A simple bookings list is low complexity and solves broken navigation.

---

## GAP 3: Bookings List (Caregiver)

**Severity**: HIGH
**Status**: Not defined at ANY release -- same pattern as Gap 2

### The Problem
- We have `booking-request-detail-caregiver` (SCR-CG-013, detail at `/caregiver/bookings/:bookingId`) -- R0
- We do NOT have a bookings list for caregivers at `/caregiver/bookings`
- The route map defines query parameters for `/caregiver/bookings` (status filter, date range, sorting, pagination) -- the route was clearly anticipated but never got a screen definition
- Caregiver main nav includes "Booking Requests" and "My Bookings" linking to this non-existent route

### Options
Same as Gap 2. Should be solved consistently for both roles.

### Recommendation
Build a simple caregiver bookings list alongside the care receiver one.

---

## GAP 4: Admin Screen ID Collisions

**Severity**: CRITICAL
**Status**: Requires immediate reconciliation

### The Problem
The admin wireframes produced in Job 6 built the correct LIST screens but assigned screen IDs that the canonical route map assigns to DETAIL screens:

| Screen ID | Route Map Definition | What We Actually Built |
|-----------|---------------------|----------------------|
| SCR-ADM-005 | Caregiver Application Review (detail at `/admin/applications/:applicationId`) | User Management Dashboard (list at `/admin/users`) |
| SCR-ADM-007 | Verification Review (detail at `/admin/verifications/:verificationId`) | Verification Queue (list at `/admin/verifications`) |
| SCR-ADM-008 | DBS Review (detail at `/admin/verifications/dbs/:verificationId`) | Reported Issues / Safeguarding Queue (list) |
| SCR-ADM-014 | Safeguarding Reports Queue (list at `/admin/safeguarding`) | System Settings |

### Impact
- Developers referencing the route map will expect detail views; they will find list views
- The actual detail screens referenced in the route map have NOT been wireframed
- Screen IDs in wireframe markdown files, screen JSONs, and SVG outputs are all misaligned with the route map

### Affected Files
**Wireframe specs:**
- `docs/tiers/tier1/draft-design-specs/wireframes/admin/scr-adm-005-user-management.md`
- `docs/tiers/tier1/draft-design-specs/wireframes/admin/scr-adm-007-verification-queue.md`
- `docs/tiers/tier1/draft-design-specs/wireframes/admin/scr-adm-008-reported-issues.md`
- `docs/tiers/tier1/draft-design-specs/wireframes/admin/scr-adm-014-system-settings.md`

**Screen JSONs:**
- `docs/tiers/tier1/figma/screens/adm-user-management.json`
- `docs/tiers/tier1/figma/screens/adm-verification-queue.json`
- `docs/tiers/tier1/figma/screens/adm-reported-issues.json`
- `docs/tiers/tier1/figma/screens/adm-system-settings.json`

**SVG outputs** (all 3 viewports):
- `svg-output/admin/adm-user-management.svg` (+ mobile/ + tablet/)
- `svg-output/admin/adm-verification-queue.svg` (+ mobile/ + tablet/)
- `svg-output/admin/adm-reported-issues.svg` (+ mobile/ + tablet/)
- `svg-output/admin/adm-system-settings.svg` (+ mobile/ + tablet/)

### Resolution Options
| Option | Description | Effort |
|--------|-------------|--------|
| **A: Reassign wireframe IDs** | Give the list screens new IDs (e.g., SCR-ADM-025 through SCR-ADM-028). Keep the route map IDs for future detail screens. | Medium |
| **B: Update route map** | Change the route map to match the wireframes. Create new IDs for the displaced detail screens. | Medium |
| **C: Hybrid** | Update the route map to add the list screens as new entries. Flag the original detail screens as "not yet wireframed". | Medium |

### Recommendation
Option C -- add the list screens to the route map with new IDs, and flag the detail screens (application review, verification review, DBS review) as needing wireframes in a future pass.

---

## GAP 5: Admin Applications List

**Severity**: LOW -- No action needed
**Status**: The verification queue effectively serves as the applications list. Caregiver applications are reviewed through their constituent verifications (identity, right to work, DBS). No separate `/admin/applications` list screen is required.

---

## Decision Tracker

| # | Decision | Owner | Options | Chosen | Date |
|---|----------|-------|---------|--------|------|
| 1 | Messages nav treatment at R0 | Product Owner | A: Remove nav / B: Minimal list / C: Full inbox | **C: Elevate SCR-CR-012 to R0** | 2026-02-12 |
| 2 | Bookings list screen for care receiver + caregiver | Product Owner | A: Dashboard only / B: New list screen / C: Expand dashboard | **B: Build new list screens** | 2026-02-12 |
| 3 | Admin screen ID reconciliation approach | Product Owner | A: Reassign wireframe IDs / B: Update route map / C: Hybrid | **C: Hybrid (new IDs for lists, flag detail screens)** | 2026-02-12 |

---

## Implementation Plan

### New Screens to Build

| Screen ID | Screen Name | Route | Role | Source |
|-----------|-------------|-------|------|--------|
| SCR-CR-012 | Message Inbox | `/messages` | Care Receiver / Caregiver | Messaging spec Sections 4.1-4.4 |
| SCR-CR-007 | My Bookings (Care Receiver) | `/dashboard/bookings` | Family | Booking spec + dashboard "View All" |
| SCR-CG-014 | My Bookings (Caregiver) | `/caregiver/bookings` | Caregiver | Booking spec + route map Section 9.3 |

### Admin ID Reassignment (GAP 4)

| Current Wrong ID | What We Built | New Correct ID | Route |
|-----------------|---------------|----------------|-------|
| SCR-ADM-005 | User Management (list) | **SCR-ADM-025** | `/admin/users` |
| SCR-ADM-007 | Verification Queue (list) | **SCR-ADM-026** | `/admin/verifications` |
| SCR-ADM-008 | Reported Issues / Safeguarding Queue | **SCR-ADM-014** (matches route map's safeguarding queue) | `/admin/safeguarding` |
| SCR-ADM-014 | System Settings | **SCR-ADM-028** | `/admin/settings` |
| SCR-ADM-015 | Platform Analytics | **SCR-ADM-020** (matches route map's analytics) | `/admin/analytics` |

### Detail Screens Flagged as NOT YET WIREFRAMED

| Screen ID | Screen Name | Route | Status |
|-----------|-------------|-------|--------|
| SCR-ADM-005 | Caregiver Application Review (detail) | `/admin/applications/:applicationId` | WIREFRAME PENDING |
| SCR-ADM-007 | Verification Review (detail) | `/admin/verifications/:verificationId` | WIREFRAME PENDING |
| SCR-ADM-008 | DBS Review (detail) | `/admin/verifications/dbs/:verificationId` | WIREFRAME PENDING |
| SCR-ADM-015 | Safeguarding Report Detail | `/admin/safeguarding/:reportId` | WIREFRAME PENDING |

### Updated Screen Counts (Post-Implementation)

| Metric | Before | After |
|--------|--------|-------|
| R0 screens | 30 | 36 (+6) |
| Screen JSONs | 26 | 29 (+3) |
| SVG outputs (per viewport) | 26 | 29 (+3) |
| Admin detail screens PENDING wireframe | 0 (unnoticed) | 4 (now tracked) |

---

## Job Execution Order

### JOB 0: Admin ID Reconciliation (PREREQUISITE)

**Files to rename:**

| Current Path | New Path |
|-------------|----------|
| `wireframes/admin/scr-adm-005-user-management.md` | `wireframes/admin/scr-adm-025-user-management.md` |
| `wireframes/admin/scr-adm-007-verification-queue.md` | `wireframes/admin/scr-adm-026-verification-queue.md` |
| `wireframes/admin/scr-adm-008-reported-issues.md` | `wireframes/admin/scr-adm-014-reported-issues.md` |
| `wireframes/admin/scr-adm-014-system-settings.md` | `wireframes/admin/scr-adm-028-system-settings.md` |
| `wireframes/admin/scr-adm-015-platform-analytics.md` | `wireframes/admin/scr-adm-020-platform-analytics.md` |

**Screen JSONs to update (internal `screenId` field):**
- `adm-user-management.json`: SCR-ADM-005 -> SCR-ADM-025
- `adm-verification-queue.json`: SCR-ADM-007 -> SCR-ADM-026
- `adm-reported-issues.json`: SCR-ADM-008 -> SCR-ADM-014
- `adm-system-settings.json`: SCR-ADM-014 -> SCR-ADM-028

### JOB 1: Message Inbox Wireframe (SCR-CR-012)

Create wireframe spec from messaging specification Sections 4.1-4.4. Key elements:
- Conversation list sorted by most recent message
- Each row: photo, name, thread type, last message preview, timestamp, unread badge
- Sort: most recent / unread first / upcoming booking / alphabetical
- Filter: all / unread / booking-linked / pre-booking / archived
- Empty state, responsive design
- Output: `wireframes/messaging/scr-cr-012-message-inbox.md`

### JOB 2: Care Receiver Bookings List (SCR-CR-007)

Create wireframe spec. Key elements:
- Tab/filter: All / Upcoming / Pending / Completed / Cancelled
- Booking cards: caregiver photo, name, badges, date/time, duration, status, amount
- Sort by date, pagination (12/page)
- Empty states per tab, countdown for upcoming 24h bookings
- Output: `wireframes/booking/scr-cr-007-my-bookings.md`

### JOB 3: Caregiver Bookings List (SCR-CG-014)

Create wireframe spec. Key elements:
- Tab/filter: All / Pending Requests / Upcoming / Completed / Declined
- Pending tab primary with 24h countdown, inline accept/decline
- Booking cards: care receiver name, date/time, duration, location, earnings, status
- Query param support: `?status=requested` pre-filters to pending
- Output: `wireframes/booking/scr-cg-014-my-bookings-caregiver.md`

### JOB 4: Screen JSON Creation (3 screens)

Create screen JSONs for SCR-CR-012, SCR-CR-007, SCR-CG-014 from wireframe specs.

### JOB 5: SVG Generation

Run `node packages/svg-wireframes/generate.js --viewport all` to generate SVGs for new and updated screens.

### JOB 6: Documentation Sync

Update: route map, R0 scope, R1 scope, status log, decision log, consistency audit, screen inventory.

---

## Execution Checklist

- [x] JOB 0: Admin ID reconciliation (rename files, update internal IDs) -- DONE 2026-02-12
- [x] JOB 1: SCR-CR-012 Message Inbox screen JSON -- DONE 2026-02-12 (wireframe spec deferred; screen JSON created directly)
- [x] JOB 2: SCR-CR-007 My Bookings (Care Receiver) screen JSON -- DONE 2026-02-12
- [x] JOB 3: SCR-CG-014 My Bookings (Caregiver) screen JSON -- DONE 2026-02-12
- [x] JOB 4: Create 3 screen JSON files + 3 component renderers (tab-bar, conversation-row, booking-list-card) -- DONE 2026-02-12
- [x] JOB 5: Run SVG generator for all viewports (87 SVGs = 29 screens x 3 viewports) -- DONE 2026-02-12
- [x] JOB 6: Update route map, R0/R1 scope, status log, decision log, consistency audit, screen inventory -- DONE 2026-02-12
- [x] Update MEMORY.md with new screen counts -- DONE 2026-02-12
