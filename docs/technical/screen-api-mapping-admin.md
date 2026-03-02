# Screen-to-API Mapping: Admin Screens

**Document Purpose**: Maps each admin screen to the specific API endpoints required to populate it, including page-load calls, user-interaction calls, and identified gaps where no endpoint currently exists.

**Document Owner**: Technical Architect
**Created**: 2026-02-18
**Status**: CANONICAL
**Tier**: Tier 1

**Source Documents**:
- Wireframes: `docs/tiers/tier1/draft-design-specs/wireframes/admin/`
- Screen JSONs: `docs/tiers/tier1/figma/screens/`
- API Specification: `docs/technical/api-specification-tier1.md`
- Dashboard Mapping (parent document): `docs/technical/screen-api-mapping-dashboards.md`

**Gap Numbering**: Continues from dashboard mapping. Dashboard mapping ends at GAP-ADM-008. New gaps begin at GAP-ADM-009.

---

## Table of Contents

1. [How to Read This Document](#1-how-to-read-this-document)
2. [SCR-ADM-025: User Management](#2-scr-adm-025-user-management)
3. [SCR-ADM-026: Verification Queue](#3-scr-adm-026-verification-queue)
4. [SCR-ADM-014: Reported Issues (Safeguarding)](#4-scr-adm-014-reported-issues-safeguarding)
5. [SCR-ADM-028: System Settings](#5-scr-adm-028-system-settings)
6. [Gap Summary](#6-gap-summary)
7. [Recommended API Additions](#7-recommended-api-additions)

---

## 1. How to Read This Document

### Trigger Types

| Symbol | Meaning |
|--------|---------|
| **PAGE LOAD** | Called automatically when the screen first renders |
| **USER ACTION** | Called only when the user explicitly interacts (button click, toggle, filter) |
| **REAL-TIME** | Delivered by WebSocket connection, not a poll |

### Gap Flags

Sections marked **GAP** identify data the screen requires that has no matching endpoint in the current API specification. Each gap includes a recommended resolution in Section 7.

### API Base Path

All endpoints below are relative to `{base}/api/v1`. Full base URLs:
- Production: `https://api.icare-app.co.uk/api/v1`
- Development: `http://localhost:3000/api/v1`

### Admin Role Scoping

Admin screens enforce role-based access at the API layer. The four admin roles and their permissions are:

| Role | User Mgmt | Verifications | Safeguarding | Settings |
|------|-----------|--------------|-------------|---------|
| `super_admin` | Full | Full | Full | Full |
| `operations_manager` | Read + Suspend | Full | Read | Read |
| `verification_officer` | Read | Full | Read | None |
| `safeguarding_officer` | Read | Read | Full | None |

The Settings screen (SCR-ADM-028) is restricted to `super_admin` only and returns HTTP 403 for all other roles.

---

## 2. SCR-ADM-025: User Management

**Route**: `/admin/users`
**Role**: `super_admin`, `operations_manager` (read + suspend); `verification_officer`, `safeguarding_officer` (read only)
**Screen JSON**: `docs/tiers/tier1/figma/screens/adm-user-management.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/admin/scr-adm-025-user-management.md`

### 2.1 Page Load Calls

The following endpoints must resolve before the screen is fully populated. The filter bar renders immediately (static). Summary metric cards and the user table render with skeleton states until their respective calls complete.

---

#### Call 1: Current Admin Profile

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- Navigation header — admin name and role displayed in the header (`userName`, `userRole`)
- Role check — determines which action columns and bulk-action buttons are visible

**Response Fields Used**:
```
data.firstName           → navigation header display name
data.lastName            → navigation header display name
data.role                → determines visible actions (suspend/reactivate shown only for super_admin and operations_manager)
data.adminRole           → sub-role for fine-grained RBAC (super_admin | operations_manager | verification_officer | safeguarding_officer)
```

---

#### Call 2: User List (Initial Page)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /admin/users`
**Auth**: Bearer JWT (admin role required)
**Query Parameters (initial)**: `page=1&limit=20`

**Screen Elements Populated**:
- `section-user-table` — the data table rows: name, role badge, status badge, registered date, last active
- `section-pagination` — `currentPage`, `totalPages`, `totalCount`
- `section-active-filters` — "Showing 1-20 of N users" count uses `meta.totalCount`

**Response Fields Used**:
```
data[].id                → row key, used by action endpoints
data[].firstName         → Name column
data[].lastName          → Name column
data[].role              → Role badge (caregiver | care_receiver | family_member)
data[].accountStatus     → Status badge (active | suspended | pending)
data[].createdAt         → Registered column (formatted DD/MM/YYYY)
data[].lastActiveAt      → Last Active column (formatted "N days ago" | "Today" | "Never")
meta.currentPage         → pagination current page
meta.totalPages          → pagination total pages
meta.totalCount          → results count text
```

**GAP: GAP-ADM-009** — The existing `GET /admin/users` response does not include `lastActiveAt`. The user table column "Last Active" requires this field. See Section 7, ADD-1.

**GAP: GAP-ADM-010** — The existing `GET /admin/users` response does not return aggregate summary counts. The 4 metric cards (Total Users, Active Users, Suspended Users, New This Week) cannot be populated from the list response alone when paginated. A dedicated summary endpoint is required. See Section 7, ADD-2.

---

#### Call 3: User Summary Metrics

**Trigger**: PAGE LOAD (parallel with Call 2)
**Endpoint**: `GET /admin/users/summary` — **THIS ENDPOINT DOES NOT EXIST**
**Auth**: Bearer JWT (admin role required)

**GAP: GAP-ADM-010** (same gap as above — duplicated here for clarity)

**Screen Elements Populated**:
- `section-metrics` — 4 metric cards:
  - Total Users (`totalUsers`)
  - Active Users (`activeUsers`) + "93.7% of total" subtext
  - Suspended Users (`suspendedUsers`) + "Requires review"
  - New This Week (`newThisWeek`) + trend vs last week

**Workaround**: If this endpoint is not built before launch, metric counts can be computed client-side only when the full unfiltered list is loaded (i.e., no active filters and `totalCount <= limit`). This is not reliable at scale. See Section 7, ADD-2.

---

### 2.2 User Interaction Calls

#### Interaction 1: Search + Filter

**Trigger**: USER ACTION — user types in search box, changes role/status/date dropdowns, or clicks a filter tag to remove it
**Endpoint**: `GET /admin/users`
**Auth**: Bearer JWT
**Query Parameters**: varies by active filter combination

**Examples**:
```
?search=sarah                      → name/email search
?userType=caregiver                → role filter (caregiver | care_receiver | family_member)
?status=suspended                  → status filter (active | suspended | pending)
?page=2&limit=20                   → pagination
```

**GAP: GAP-ADM-011** — The existing `GET /admin/users` does not support `sort_by` or `sort_order` query parameters. The wireframe specifies a sortable table (sort by Name, Registered, Last Active). The API must be extended to support sorting. See Section 7, ADD-3.

**GAP: GAP-ADM-012** — The existing `GET /admin/users` does not support date range filtering (`registeredFrom`, `registeredTo`). The filter bar includes a "Registered" date-range dropdown. See Section 7, ADD-3.

**Screen Elements Updated**: User table re-renders with filtered results. Pagination resets to page 1. Active filter tags update.

---

#### Interaction 2: Suspend User

**Trigger**: USER ACTION — admin selects "Suspend" from row actions dropdown, confirms in modal
**Endpoint**: `PUT /admin/users/:id/suspend`
**Auth**: Bearer JWT (operations_manager or super_admin role required)
**Request Body**:
```json
{
  "reason": "string",
  "duration": "permanent | 7days | 30days",
  "notes": "string"
}
```

**Screen Elements Updated**: Row status badge changes from "Active" to "Suspended". Suspended Users metric card increments by 1. Active Users metric card decrements by 1. Success toast displayed.

---

#### Interaction 3: Reactivate User

**Trigger**: USER ACTION — admin selects "Reactivate" from row actions dropdown on a suspended user
**Endpoint**: `POST /admin/users/:id/reactivate` — **THIS ENDPOINT DOES NOT EXIST**
**Auth**: Bearer JWT (operations_manager or super_admin role required)

**GAP: GAP-ADM-013** — No reactivate endpoint exists. The wireframe shows "Reactivate" as a row action for suspended users. See Section 7, ADD-4.

**Screen Elements Updated on success**: Row status badge changes from "Suspended" to "Active". Metric counts update. Success toast displayed.

---

#### Interaction 4: View User Profile

**Trigger**: USER ACTION — admin clicks user name link or "View" in actions dropdown
**Endpoint**: `GET /admin/users/:id`
**Auth**: Bearer JWT (any admin role)

**Behaviour**: Navigates to user detail page (separate screen, not part of this mapping). No in-page API call; this is a navigation action.

---

#### Interaction 5: Bulk Actions

**Trigger**: USER ACTION — admin checks multiple rows, selects bulk action from toolbar
**Endpoint**: `POST /admin/users/bulk-suspend` — **THIS ENDPOINT DOES NOT EXIST**
**Auth**: Bearer JWT (operations_manager or super_admin role required)

**GAP: GAP-ADM-014** — No bulk action endpoints exist. The wireframe specifies a bulk-actions toolbar that appears when rows are checked, with "Suspend Selected" action. See Section 7, ADD-5.

---

#### Interaction 6: Pagination

**Trigger**: USER ACTION — admin clicks page numbers or next/prev
**Endpoint**: `GET /admin/users`
**Auth**: Bearer JWT
**Query Parameters**: `page=N&limit=20` (plus any active filters)

**Screen Elements Updated**: Table rows re-render with next page of results.

---

### 2.3 Call Summary — SCR-ADM-025

| # | Trigger | Method | Endpoint | Exists? | Gap |
|---|---------|--------|----------|---------|-----|
| 1 | PAGE LOAD | GET | `/users/me` | Yes | — |
| 2 | PAGE LOAD | GET | `/admin/users?page=1&limit=20` | Yes | GAP-ADM-009, GAP-ADM-010 |
| 3 | PAGE LOAD | GET | `/admin/users/summary` | **No** | GAP-ADM-010 |
| 4 | USER ACTION | GET | `/admin/users?search=...&userType=...` | Partial | GAP-ADM-011, GAP-ADM-012 |
| 5 | USER ACTION | PUT | `/admin/users/:id/suspend` | Yes | — |
| 6 | USER ACTION | POST | `/admin/users/:id/reactivate` | **No** | GAP-ADM-013 |
| 7 | USER ACTION | GET | `/admin/users/:id` | Yes | — |
| 8 | USER ACTION | POST | `/admin/users/bulk-suspend` | **No** | GAP-ADM-014 |

---

## 3. SCR-ADM-026: Verification Queue

**Route**: `/admin/verifications`
**Role**: `super_admin`, `operations_manager`, `verification_officer`
**Screen JSON**: `docs/tiers/tier1/figma/screens/adm-verification-queue.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/admin/scr-adm-026-verification-queue.md`

### 3.1 Page Load Calls

The SLA alert banner (conditional), filter bar (static), and 4 metric cards render immediately or from summary data. The verification queue card list renders with skeleton state until the list call resolves.

---

#### Call 1: Current Admin Profile

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- Navigation header — admin name ("Admin Sarah") and role label ("Verification Officer")
- Role check — determines whether "Assign to Me" button is available

**Response Fields Used**:
```
data.firstName           → navigation header
data.adminRole           → determines action availability
```

---

#### Call 2: Verification List

**Trigger**: PAGE LOAD
**Endpoint**: `GET /admin/verifications`
**Auth**: Bearer JWT (admin role required)
**Query Parameters (initial)**: `page=1&limit=20&status=pending`

**Screen Elements Populated**:
- `section-queue-card-*` — each verification-queue-card component, showing caregiver name, applied date, SLA status, and document checklist (Identity, Right to Work, DBS)
- `section-sla-alert` — alert banner is shown when `slaBreaches > 0` (computed from items where `hoursPending > 48`)
- `section-results-count` — "Showing 1-12 of 12 caregivers"
- `section-pagination` — currentPage, totalPages

**Response Fields Used**:
```
data[].id                → card key, used by action endpoints
data[].caregiver.firstName    → card title "John Smith"
data[].caregiver.lastName     → card title
data[].submittedAt            → "applied date" field (formatted "N days ago (DD/MM/YYYY)")
data[].hoursPending           → used to compute SLA status: <24 = on-track, 24-48 = approaching, >48 = breached
data[].documents[].type       → checklist item type (identity | right_to_work | dbs)
data[].documents[].status     → checklist item status (submitted | not_submitted | approved | rejected)
data[].documents[].submittedAt → checklist item date column
meta.currentPage         → pagination
meta.totalPages          → pagination
meta.totalCount          → results count text
```

**Note on SLA computation**: The SLA status badge (on-track | approaching | breached) is computed client-side from `hoursPending`. There is no server-side SLA status field in the current API spec. This is acceptable at Tier 1 volume but should be moved server-side at scale.

**GAP: GAP-ADM-015** — The existing `GET /admin/verifications` response does not include a `summary` sub-object or aggregate counts by document type. The 4 metric cards (Pending Verifications, Identity pending, Right to Work pending, DBS pending) and the SLA breach count cannot be populated from the paginated list alone. A summary endpoint is required. See Section 7, ADD-6.

---

#### Call 3: Verification Summary Metrics

**Trigger**: PAGE LOAD (parallel with Call 2)
**Endpoint**: `GET /admin/verifications/summary` — **THIS ENDPOINT DOES NOT EXIST**
**Auth**: Bearer JWT (admin role required)

**GAP: GAP-ADM-015** (same gap — documented here for completeness)

**Screen Elements Populated**:
- `section-metrics` — 4 metric cards:
  - Pending Verifications count + average wait hours
  - Identity pending count
  - Right to Work pending count
  - DBS (Voluntary) pending count + "Optional at Tier 1" note
- `section-sla-alert` — `slaBreaches` count drives the alert banner message ("3 verifications over 48 hours require urgent review")

See Section 7, ADD-6.

---

### 3.2 User Interaction Calls

#### Interaction 1: Filter Queue

**Trigger**: USER ACTION — admin changes Type, SLA Status, or Sort By dropdowns
**Endpoint**: `GET /admin/verifications`
**Auth**: Bearer JWT
**Query Parameters**: varies

**Examples**:
```
?type=identity                     → filter by document type
?type=right_to_work
?type=dbs
?overdue=true                      → SLA breached filter (maps to "SLA Status: Breached")
?page=1&limit=20
```

**GAP: GAP-ADM-016** — The existing `GET /admin/verifications` supports `overdue=true` but does not support an "approaching" SLA status filter (24-48 hours pending). The wireframe SLA Status dropdown includes "On Track", "Approaching", and "Breached". The API only supports `overdue=true|false`. See Section 7, ADD-7.

**Screen Elements Updated**: Queue cards re-render with filtered results.

---

#### Interaction 2: Review Identity Document

**Trigger**: USER ACTION — admin clicks "Review" button on Identity checklist item
**Endpoint**: `GET /admin/verifications/:id`
**Auth**: Bearer JWT

**Behaviour**: Navigates to verification detail screen (separate screen, not part of this mapping). The verification ID from the queue card is passed as the route parameter.

---

#### Interaction 3: Approve Verification

**Trigger**: USER ACTION — admin clicks "Approve" on verification detail (navigation target from Interaction 2)
**Endpoint**: `PUT /admin/verifications/:id/approve`
**Auth**: Bearer JWT

**Request Body**:
```json
{
  "documentType": "identity | right_to_work | dbs",
  "notes": "string"
}
```

**Screen Elements Updated on return**: Queue card for the approved caregiver updates its checklist item status from "submitted" to "approved". If all documents are approved, the card may be removed from the pending queue. Metrics update.

---

#### Interaction 4: Reject Verification

**Trigger**: USER ACTION — admin clicks "Reject" on verification detail
**Endpoint**: `PUT /admin/verifications/:id/reject`
**Auth**: Bearer JWT

**Request Body**:
```json
{
  "documentType": "identity | right_to_work | dbs",
  "reason": "string",
  "notes": "string"
}
```

**Screen Elements Updated on return**: Queue card checklist item status updates to "rejected". Caregiver is notified (separate notification service call, not modelled here).

---

#### Interaction 5: Sort Queue (Review Oldest First)

**Trigger**: USER ACTION — admin clicks "Review Oldest First" CTA in SLA alert banner, or changes Sort By dropdown
**Endpoint**: `GET /admin/verifications`
**Auth**: Bearer JWT
**Query Parameters**: `sort_by=submitted_at&sort_order=asc&page=1&limit=20`

**GAP: GAP-ADM-016** (same gap as filter interaction) — The existing `GET /admin/verifications` does not document `sort_by` or `sort_order` parameters. See Section 7, ADD-7.

**Screen Elements Updated**: Queue re-renders with oldest submissions first.

---

### 3.3 Call Summary — SCR-ADM-026

| # | Trigger | Method | Endpoint | Exists? | Gap |
|---|---------|--------|----------|---------|-----|
| 1 | PAGE LOAD | GET | `/users/me` | Yes | — |
| 2 | PAGE LOAD | GET | `/admin/verifications?status=pending` | Yes | GAP-ADM-015 |
| 3 | PAGE LOAD | GET | `/admin/verifications/summary` | **No** | GAP-ADM-015 |
| 4 | USER ACTION | GET | `/admin/verifications?type=...&overdue=...` | Partial | GAP-ADM-016 |
| 5 | USER ACTION | GET | `/admin/verifications/:id` | Yes | — |
| 6 | USER ACTION | PUT | `/admin/verifications/:id/approve` | Yes | — |
| 7 | USER ACTION | PUT | `/admin/verifications/:id/reject` | Yes | — |

---

## 4. SCR-ADM-014: Reported Issues (Safeguarding)

**Route**: `/admin/safeguarding`
**Role**: `super_admin`, `safeguarding_officer` (full); `operations_manager`, `verification_officer` (read only)
**Screen JSON**: `docs/tiers/tier1/figma/screens/adm-reported-issues.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/admin/scr-adm-014-reported-issues.md`

### 4.1 Page Load Calls

The urgent alert banner (conditional on critical reports), filter bar (static), and metric cards render with skeleton states. The reports table renders after the list call resolves.

---

#### Call 1: Current Admin Profile

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- Navigation header — admin name and role ("Safeguarding Officer")
- Role check — escalation actions ("Escalate to SAB", "Escalate to Police") shown only for `safeguarding_officer` and `super_admin`

**Response Fields Used**:
```
data.firstName           → navigation header
data.adminRole           → determines escalation action visibility
```

---

#### Call 2: Safeguarding Reports List

**Trigger**: PAGE LOAD
**Endpoint**: `GET /admin/safeguarding`
**Auth**: Bearer JWT (admin role required)
**Query Parameters (initial)**: `page=1&limit=20&status=open`

**Screen Elements Populated**:
- `section-reports-table` — data table rows: Case ID, Reporter, Reported User, Type badge, Severity badge, Status badge, Age
- `section-urgent-alert` — alert banner shown when any row has `severity=critical` (computed client-side from response items)
- `section-active-filters` — "Showing 1-N of N reports" from `meta.totalCount`
- `section-pagination` — currentPage, totalPages

**Response Fields Used**:
```
data[].id                     → case ID (formatted as "SAF-YYYY-NNN")
data[].caseNumber             → Case ID column display value
data[].reporter.name          → Reporter column (e.g., "Sarah J. (Care Recv.)")
data[].reporter.role          → appended to reporter name in parentheses
data[].reportedUser.name      → Reported User column
data[].reportedUser.role      → appended to reported user name
data[].incidentType           → Type badge (physical_abuse | financial_abuse | neglect | conduct | off_platform_payment)
data[].severity               → Severity badge
data[].status                 → Status badge (new | triaging | investigating | escalated | resolved)
data[].submittedAt            → Age column (formatted "N min" | "N hours" | "N days")
meta.currentPage              → pagination
meta.totalPages               → pagination
meta.totalCount               → results count
```

**GAP: GAP-ADM-017** — The existing `GET /admin/safeguarding` uses `urgency=urgent|standard` (binary). The wireframe displays a four-level severity scale: Critical, High, Medium, Low. The API parameter set does not match the UI filter set. The API must support `severity=critical|high|medium|low` as a filter parameter. See Section 7, ADD-8.

**GAP: GAP-ADM-018** — The existing `GET /admin/safeguarding` response does not include aggregate summary counts. The 4 metric cards (Active Reports, Urgent Reports, Resolved This Week, Avg Response Time) cannot be populated from the paginated list alone. A summary endpoint is required. See Section 7, ADD-9.

---

#### Call 3: Safeguarding Summary Metrics

**Trigger**: PAGE LOAD (parallel with Call 2)
**Endpoint**: `GET /admin/safeguarding/summary` — **THIS ENDPOINT DOES NOT EXIST**
**Auth**: Bearer JWT (admin role required)

**GAP: GAP-ADM-018** (same gap — documented here for completeness)

**Screen Elements Populated**:
- `section-metrics` — 4 metric cards:
  - Active Reports (`activeReports`) + "Requiring action"
  - Urgent Reports (`urgentReports`) + SLA breach count
  - Resolved This Week (`resolvedThisWeek`) + breakdown (substantiated | unsubstantiated | inconclusive)
  - Avg Response Time (`avgResponseHours`) + target indicator (Target: <4h)

See Section 7, ADD-9.

---

### 4.2 User Interaction Calls

#### Interaction 1: Search + Filter

**Trigger**: USER ACTION — admin types in search box or changes Type / Severity / Status / Date dropdowns
**Endpoint**: `GET /admin/safeguarding`
**Auth**: Bearer JWT
**Query Parameters**: varies

**Examples**:
```
?search=SAF-2026-423            → case ID search
?incidentType=physical_abuse    → type filter
?severity=critical              → four-level severity filter (GAP — see below)
?status=new                     → status filter
?submittedFrom=2026-01-01       → date range (GAP — see below)
```

**GAP: GAP-ADM-017** (same as page load gap) — `severity` filter parameter does not exist. API uses `urgency=urgent|standard`. See Section 7, ADD-8.

**GAP: GAP-ADM-019** — The existing `GET /admin/safeguarding` does not support date range filtering (`submittedFrom`, `submittedTo`). The wireframe filter bar includes a "Date" dropdown. See Section 7, ADD-10.

**Screen Elements Updated**: Reports table re-renders. Active filter tags update. Results count updates.

---

#### Interaction 2: View Report Details

**Trigger**: USER ACTION — admin clicks Case ID link or "View Details" in actions dropdown
**Endpoint**: `GET /admin/safeguarding/:id`
**Auth**: Bearer JWT

**Behaviour**: Navigates to safeguarding case detail screen (separate screen). No in-page API call; this is a navigation action.

---

#### Interaction 3: Assign Report

**Trigger**: USER ACTION — admin selects "Assign to Me" or "Assign to Team Member" from row actions
**Endpoint**: `PUT /admin/safeguarding/:id/assign` — **THIS ENDPOINT DOES NOT EXIST**
**Auth**: Bearer JWT (safeguarding_officer or super_admin role required)

**GAP: GAP-ADM-020** — No assignment endpoint exists for safeguarding cases. Assigning a case to an officer is a core workflow action. See Section 7, ADD-11.

**Request Body (proposed)**:
```json
{
  "assignedToId": "uuid"
}
```

**Screen Elements Updated on success**: Status badge changes from "New" to "Triaging". Row updates to show assigned officer name. Success toast displayed.

---

#### Interaction 4: Escalate to SAB

**Trigger**: USER ACTION — admin selects "Escalate to SAB" from row actions (Care Act 2014 Section 42 criteria met)
**Endpoint**: `POST /admin/safeguarding/:id/escalate` — **THIS ENDPOINT DOES NOT EXIST**
**Auth**: Bearer JWT (safeguarding_officer or super_admin role required)

**GAP: GAP-ADM-021** — No escalation endpoint exists. Care Act 2014 requires SAB escalation within 24 hours when Section 42 criteria are met. This is a compliance requirement, not optional. See Section 7, ADD-12.

**Request Body (proposed)**:
```json
{
  "escalationType": "sab | police",
  "reason": "string",
  "referenceNumber": "string"
}
```

**Screen Elements Updated on success**: Status badge changes to "Escalated". Row highlighted. Audit log entry created. Success confirmation modal closes.

---

#### Interaction 5: Escalate to Police

**Trigger**: USER ACTION — admin selects "Escalate to Police" from row actions
**Endpoint**: `POST /admin/safeguarding/:id/escalate` (same endpoint as SAB, different `escalationType`)
**Auth**: Bearer JWT (safeguarding_officer or super_admin role required)

**GAP: GAP-ADM-021** (same gap as Escalate to SAB — both use the same missing endpoint)

---

#### Interaction 6: Suspend Reported User from Case

**Trigger**: USER ACTION — admin selects "Suspend Reported User" from row actions (immediately removes caregiver from platform)
**Endpoint**: `PUT /admin/users/:id/suspend`
**Auth**: Bearer JWT (operations_manager or super_admin role required)

**Note**: This reuses the existing user suspension endpoint. The admin provides a reason tied to the safeguarding case ID. The reported user's ID must be available from the `data[].reportedUser.id` field in the reports list response.

**Request Body**:
```json
{
  "reason": "Safeguarding investigation",
  "duration": "permanent",
  "notes": "Suspended pending investigation of case SAF-YYYY-NNN"
}
```

**Screen Elements Updated**: Success toast displayed. Row status badge for the reported user (visible in User Management screen) would update if navigated there.

---

#### Interaction 7: Pagination

**Trigger**: USER ACTION — admin clicks page numbers
**Endpoint**: `GET /admin/safeguarding`
**Auth**: Bearer JWT
**Query Parameters**: `page=N&limit=20` (plus any active filters)

**Screen Elements Updated**: Table rows re-render.

---

### 4.3 Call Summary — SCR-ADM-014

| # | Trigger | Method | Endpoint | Exists? | Gap |
|---|---------|--------|----------|---------|-----|
| 1 | PAGE LOAD | GET | `/users/me` | Yes | — |
| 2 | PAGE LOAD | GET | `/admin/safeguarding?status=open` | Yes | GAP-ADM-017, GAP-ADM-018 |
| 3 | PAGE LOAD | GET | `/admin/safeguarding/summary` | **No** | GAP-ADM-018 |
| 4 | USER ACTION | GET | `/admin/safeguarding?severity=...&incidentType=...` | Partial | GAP-ADM-017, GAP-ADM-019 |
| 5 | USER ACTION | GET | `/admin/safeguarding/:id` | Yes | — |
| 6 | USER ACTION | PUT | `/admin/safeguarding/:id/assign` | **No** | GAP-ADM-020 |
| 7 | USER ACTION | POST | `/admin/safeguarding/:id/escalate` | **No** | GAP-ADM-021 |
| 8 | USER ACTION | PUT | `/admin/users/:id/suspend` | Yes | — |

---

## 5. SCR-ADM-028: System Settings

**Route**: `/admin/settings`
**Role**: `super_admin` ONLY — all other roles receive HTTP 403
**Screen JSON**: `docs/tiers/tier1/figma/screens/adm-system-settings.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/admin/scr-adm-028-system-settings.md`

**Critical Note**: This screen has no corresponding GET or PUT endpoint in the current API specification. The entire screen is a gap. Two CRITICAL gaps (GAP-ADM-023 and GAP-ADM-025) are raised.

### 5.1 Page Load Calls

The sidebar (static) and page header (static) render immediately. The settings content area renders with skeleton state until the settings call resolves. The audit log table renders after its separate call resolves.

---

#### Call 1: Current Admin Profile (Role Verification)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- Navigation header — admin name and "Super Admin" role label
- Role gate — if `data.adminRole !== 'super_admin'` the screen renders the "Access Denied" state (no data loaded, access-denied message shown)

**Response Fields Used**:
```
data.firstName           → navigation header
data.adminRole           → gate: must equal 'super_admin' or redirect to /admin with 403 toast
```

---

#### Call 2: Platform Settings

**Trigger**: PAGE LOAD (only if role gate passes)
**Endpoint**: `GET /admin/settings` — **THIS ENDPOINT DOES NOT EXIST**
**Auth**: Bearer JWT (super_admin role required)

**GAP: GAP-ADM-022 (CRITICAL)** — No settings retrieval endpoint exists. The settings content area cannot be populated. The entire System Settings screen is non-functional without this endpoint. See Section 7, ADD-13.

**Screen Elements Populated**:
- `section-settings-layout` — all category content areas:
  - General: platform name, maintenance mode toggle, support email, terms URL
  - Payments: caregiver commission rate, service fee rate, Stripe publishable key (partial mask), payout schedule day + frequency
  - Verification: DBS check validity period, identity check provider
  - Notifications: email/SMS provider, template settings
  - Features: 5 feature flag toggles (messaging, reviews, family-accounts, search-filters, analytics)

**Response Fields Used (proposed)**:
```
data.general.platformName           → General: Platform Name field
data.general.maintenanceMode        → General: Maintenance Mode toggle
data.general.supportEmail           → General: Support Email field
data.payments.caregiverCommission   → Payments: Caregiver Commission (%) field (FDR-008 placeholder: 15.00)
data.payments.serviceFee            → Payments: Care Receiver Service Fee (%) field (FDR-008 placeholder: 15.00)
data.payments.stripePublishableKey  → Payments: Stripe Publishable Key field (masked: "pk_live_••••••••5678")
data.payments.stripeSecretKeyMasked → Payments: Stripe Secret Key field (always masked, reveal requires 2FA)
data.payments.payoutSchedule        → Payments: Payout Schedule dropdown (weekly | bi-weekly | monthly)
data.payments.payoutDay             → Payments: Payout Day dropdown (Monday–Friday)
data.verification.dbsValidityYears  → Verification: DBS Check Validity
data.features.*                     → Features: toggle states for each feature flag
```

---

#### Call 3: Settings Audit Log

**Trigger**: PAGE LOAD (parallel with Call 2, rendered below the settings form)
**Endpoint**: `GET /admin/settings/audit-log` — **THIS ENDPOINT DOES NOT EXIST**
**Auth**: Bearer JWT (super_admin role required)
**Query Parameters**: `limit=20&page=1`

**GAP: GAP-ADM-023** — No settings audit log endpoint exists. The wireframe and screen JSON show a `audit-log-table` component at the bottom of the content area, displaying the last N setting changes with: Date/Time, Admin name, Category, Field changed, Old Value, New Value. This is a compliance requirement (admin accountability for platform-wide changes). See Section 7, ADD-14.

**Screen Elements Populated**:
- `audit-log-table` component — rows showing recent setting changes

**Response Fields Used (proposed)**:
```
data[].changedAt         → Date/Time column
data[].adminName         → Admin column
data[].category          → Category column (General | Payments | Verification | Notifications | Features)
data[].fieldName         → Field column
data[].oldValue          → Old Value column
data[].newValue          → New Value column
```

---

### 5.2 User Interaction Calls

#### Interaction 1: Switch Settings Category

**Trigger**: USER ACTION — admin clicks a category in the sidebar (General, Payments, Verification, Notifications, Features)
**Endpoint**: No API call required

**Behaviour**: Client-side only. The settings data is already loaded from Call 2. The content area re-renders to show the selected category's fields. No additional API call is made.

---

#### Interaction 2: Save Settings (General, Payments, Verification, Notifications)

**Trigger**: USER ACTION — admin clicks "Save [Category] Settings" button after editing fields
**Endpoint**: `PUT /admin/settings` — **THIS ENDPOINT DOES NOT EXIST**
**Auth**: Bearer JWT (super_admin role required)

**GAP: GAP-ADM-024 (CRITICAL)** — No settings update endpoint exists. Settings cannot be saved. The entire settings edit workflow is blocked. See Section 7, ADD-15.

**Request Body (proposed — Payments category example)**:
```json
{
  "category": "payments",
  "settings": {
    "caregiverCommission": 15.00,
    "serviceFee": 15.00,
    "payoutSchedule": "weekly",
    "payoutDay": "friday"
  }
}
```

**Commission rate note**: FDR-008 is PENDING. The values 15% (caregiver) and 15% (service fee) are placeholders. The actual rates are a founder decision. Commission changes affect future bookings only — existing bookings retain the rate at time of booking (this logic is in the booking service, not the settings API).

**Screen Elements Updated on success**: "Unsaved changes" indicator clears. Success toast displayed. Audit log table gains a new row at the top. Discard button is disabled.

---

#### Interaction 3: Discard Changes

**Trigger**: USER ACTION — admin clicks "Discard Changes" button
**Endpoint**: No API call required

**Behaviour**: Client-side only. Form fields revert to the values from the last successful Call 2 response. "Unsaved changes" indicator clears.

---

#### Interaction 4: Reveal Stripe Secret Key

**Trigger**: USER ACTION — admin clicks reveal icon on Stripe Secret Key field
**Endpoint**: `POST /admin/settings/verify-password` — **THIS ENDPOINT DOES NOT EXIST**
**Auth**: Bearer JWT (super_admin role required)

**GAP: GAP-ADM-025** — Revealing the Stripe secret key requires 2FA or password re-entry to prevent shoulder-surfing and casual exposure. No such verification endpoint exists. The field should never return the plaintext key in the initial GET response (only a masked version). A separate authenticated reveal call is required. See Section 7, ADD-16.

**Request Body (proposed)**:
```json
{
  "password": "string"
}
```

**Response (proposed)**:
```json
{
  "stripeSecretKey": "sk_live_actualvalue..."
}
```

**Screen Elements Updated on success**: Secret key field switches from masked display to plaintext. Auto-re-masks after 30 seconds.

---

#### Interaction 5: Test Stripe Connection

**Trigger**: USER ACTION — admin clicks "Test Connection" button next to Stripe keys
**Endpoint**: `POST /admin/settings/test-stripe` — **THIS ENDPOINT DOES NOT EXIST**
**Auth**: Bearer JWT (super_admin role required)

**GAP: GAP-ADM-026** — No endpoint exists to validate Stripe API keys against Stripe's API. Entering incorrect keys would only be discovered at the next payment attempt. A test endpoint prevents silent misconfiguration. See Section 7, ADD-17.

**Screen Elements Updated on success**: Green "Connection verified" badge appears next to Stripe keys section.
**Screen Elements Updated on failure**: Red "Connection failed" badge with error message.

---

#### Interaction 6: Toggle Feature Flag

**Trigger**: USER ACTION — admin clicks toggle switch for a feature (messaging, reviews, etc.) in the Features category
**Endpoint**: `PUT /admin/settings` (same as Interaction 2, category="features")
**Auth**: Bearer JWT (super_admin role required)

**GAP: GAP-ADM-024 (CRITICAL)** (same gap as Interaction 2)

**Note on locked features**: Safeguarding Reporting and Verification System toggles are locked "on" in the UI and must not be modifiable. The API must enforce this constraint server-side regardless of what the client sends.

**Note on immediate effect**: Feature flag changes take effect platform-wide immediately (no deployment required). The API response should include the new toggle state. Dependent UI components re-render on next user request.

**Screen Elements Updated on success**: Toggle flips visually. Confirmation modal closes. Audit log row added.

---

#### Interaction 7: Save Features (with Confirmation Modal)

**Trigger**: USER ACTION — admin confirms feature flag changes in modal
**Endpoint**: `PUT /admin/settings` with category="features"
**Auth**: Bearer JWT (super_admin role required)

**GAP: GAP-ADM-024 (CRITICAL)** (same gap)

The confirmation modal text: "Disabling [Feature Name] will affect all [N] active users immediately. Are you sure?"

The feature flag state (enabled/disabled for each feature) is passed in the request body. The API returns the saved state for confirmation.

---

### 5.3 Call Summary — SCR-ADM-028

| # | Trigger | Method | Endpoint | Exists? | Gap |
|---|---------|--------|----------|---------|-----|
| 1 | PAGE LOAD | GET | `/users/me` | Yes | — |
| 2 | PAGE LOAD | GET | `/admin/settings` | **No** | GAP-ADM-022 (CRITICAL) |
| 3 | PAGE LOAD | GET | `/admin/settings/audit-log` | **No** | GAP-ADM-023 |
| 4 | USER ACTION | — | (category switch — client side) | N/A | — |
| 5 | USER ACTION | PUT | `/admin/settings` | **No** | GAP-ADM-024 (CRITICAL) |
| 6 | USER ACTION | POST | `/admin/settings/verify-password` | **No** | GAP-ADM-025 |
| 7 | USER ACTION | POST | `/admin/settings/test-stripe` | **No** | GAP-ADM-026 |

---

## 6. Gap Summary

19 gaps identified across the 4 admin screens. Gaps GAP-ADM-001 through GAP-ADM-008 are in the dashboard mapping document (`docs/technical/screen-api-mapping-dashboards.md`).

| Gap ID | Screen | Severity | Description | Resolution |
|--------|--------|----------|-------------|------------|
| GAP-ADM-009 | SCR-ADM-025 | MEDIUM | `GET /admin/users` response missing `lastActiveAt` field | ADD-1: Add field to user list response |
| GAP-ADM-010 | SCR-ADM-025 | HIGH | No `/admin/users/summary` endpoint for metric cards | ADD-2: New summary endpoint |
| GAP-ADM-011 | SCR-ADM-025 | LOW | `GET /admin/users` missing `sort_by` / `sort_order` params | ADD-3: Extend query params |
| GAP-ADM-012 | SCR-ADM-025 | LOW | `GET /admin/users` missing date range filter params | ADD-3: Extend query params |
| GAP-ADM-013 | SCR-ADM-025 | HIGH | No `POST /admin/users/:id/reactivate` endpoint | ADD-4: New reactivate endpoint |
| GAP-ADM-014 | SCR-ADM-025 | MEDIUM | No bulk action endpoint (`/admin/users/bulk-suspend`) | ADD-5: New bulk endpoint |
| GAP-ADM-015 | SCR-ADM-026 | HIGH | No `/admin/verifications/summary` endpoint for metric cards | ADD-6: New summary endpoint |
| GAP-ADM-016 | SCR-ADM-026 | LOW | `GET /admin/verifications` missing sort params + approaching SLA filter | ADD-7: Extend query params |
| GAP-ADM-017 | SCR-ADM-014 | HIGH | `GET /admin/safeguarding` uses `urgency=urgent\|standard` (binary); UI needs 4-level `severity` filter | ADD-8: Add severity parameter |
| GAP-ADM-018 | SCR-ADM-014 | HIGH | No `/admin/safeguarding/summary` endpoint for metric cards | ADD-9: New summary endpoint |
| GAP-ADM-019 | SCR-ADM-014 | LOW | `GET /admin/safeguarding` missing date range filter params | ADD-10: Extend query params |
| GAP-ADM-020 | SCR-ADM-014 | HIGH | No `PUT /admin/safeguarding/:id/assign` endpoint | ADD-11: New assignment endpoint |
| GAP-ADM-021 | SCR-ADM-014 | HIGH | No `POST /admin/safeguarding/:id/escalate` endpoint — Care Act 2014 compliance | ADD-12: New escalation endpoint |
| GAP-ADM-022 | SCR-ADM-028 | CRITICAL | No `GET /admin/settings` endpoint — screen cannot load any data | ADD-13: New settings GET endpoint |
| GAP-ADM-023 | SCR-ADM-028 | MEDIUM | No `GET /admin/settings/audit-log` endpoint | ADD-14: New audit log endpoint |
| GAP-ADM-024 | SCR-ADM-028 | CRITICAL | No `PUT /admin/settings` endpoint — settings cannot be saved | ADD-15: New settings PUT endpoint |
| GAP-ADM-025 | SCR-ADM-028 | HIGH | No `POST /admin/settings/verify-password` endpoint for Stripe key reveal | ADD-16: New verify-password endpoint |
| GAP-ADM-026 | SCR-ADM-028 | MEDIUM | No `POST /admin/settings/test-stripe` endpoint | ADD-17: New test-stripe endpoint |
| GAP-ADM-027 | SCR-ADM-028 | LOW | Locked feature flags (Safeguarding, Verification) not enforced at API level | ADD-18: Server-side enforcement |

**Summary by severity**:
- CRITICAL: 2 (GAP-ADM-022, GAP-ADM-024) — System Settings screen non-functional
- HIGH: 7 (GAP-ADM-010, GAP-ADM-013, GAP-ADM-015, GAP-ADM-017, GAP-ADM-018, GAP-ADM-020, GAP-ADM-021)
- MEDIUM: 4 (GAP-ADM-009, GAP-ADM-014, GAP-ADM-023, GAP-ADM-026)
- LOW: 6 (GAP-ADM-011, GAP-ADM-012, GAP-ADM-016, GAP-ADM-019, GAP-ADM-027)

---

## 7. Recommended API Additions

### ADD-1: Extend User List Response with lastActiveAt

**Resolves**: GAP-ADM-009

Extend `GET /admin/users` response items to include `lastActiveAt`:

```json
{
  "data": [
    {
      "id": "uuid",
      "firstName": "Sarah",
      "lastName": "Johnson",
      "email": "sarah@example.com",
      "role": "caregiver",
      "accountStatus": "active",
      "createdAt": "2026-01-15T00:00:00Z",
      "lastActiveAt": "2026-02-15T14:30:00Z"
    }
  ]
}
```

`lastActiveAt` is the timestamp of the user's last authenticated API request. `null` if the user has never logged in after registration.

---

### ADD-2: New Endpoint — GET /admin/users/summary

**Resolves**: GAP-ADM-010

```
GET /admin/users/summary
Auth: Bearer JWT (admin role required)
```

**Response**:
```json
{
  "success": true,
  "data": {
    "totalUsers": 1234,
    "activeUsers": 1156,
    "suspendedUsers": 23,
    "pendingUsers": 55,
    "newThisWeek": 87,
    "newLastWeek": 72,
    "trendDirection": "up"
  }
}
```

`trendDirection` is `up` | `down` | `flat` computed server-side from `newThisWeek` vs `newLastWeek`.

---

### ADD-3: Extend GET /admin/users Query Parameters

**Resolves**: GAP-ADM-011, GAP-ADM-012

Add the following optional query parameters to `GET /admin/users`:

```
sort_by         string   Name column to sort by: name | registered | last_active | status
sort_order      string   asc | desc (default: asc)
registeredFrom  string   ISO 8601 date string (e.g., 2026-01-01)
registeredTo    string   ISO 8601 date string (e.g., 2026-01-31)
```

---

### ADD-4: New Endpoint — POST /admin/users/:id/reactivate

**Resolves**: GAP-ADM-013

```
POST /admin/users/:id/reactivate
Auth: Bearer JWT (operations_manager or super_admin role required)
```

**Request Body**:
```json
{
  "reason": "string",
  "notes": "string"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "accountStatus": "active",
    "reactivatedAt": "2026-02-18T10:00:00Z",
    "reactivatedBy": "admin-uuid"
  }
}
```

Creates an audit log entry. Sends notification to the reactivated user.

---

### ADD-5: New Endpoint — POST /admin/users/bulk-suspend

**Resolves**: GAP-ADM-014

```
POST /admin/users/bulk-suspend
Auth: Bearer JWT (operations_manager or super_admin role required)
```

**Request Body**:
```json
{
  "userIds": ["uuid1", "uuid2", "uuid3"],
  "reason": "string",
  "duration": "permanent | 7days | 30days",
  "notes": "string"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "suspended": ["uuid1", "uuid2"],
    "failed": ["uuid3"],
    "failureReasons": {
      "uuid3": "User is already suspended"
    }
  }
}
```

---

### ADD-6: New Endpoint — GET /admin/verifications/summary

**Resolves**: GAP-ADM-015

```
GET /admin/verifications/summary
Auth: Bearer JWT (admin role required)
```

**Response**:
```json
{
  "success": true,
  "data": {
    "totalPending": 12,
    "byType": {
      "identity": 8,
      "right_to_work": 4,
      "dbs": 3
    },
    "slaBreaches": 3,
    "slaApproaching": 4,
    "averageWaitHours": 18
  }
}
```

`slaBreaches` = count of caregivers with any document pending more than 48 hours.
`slaApproaching` = count of caregivers with any document pending 24-48 hours.

---

### ADD-7: Extend GET /admin/verifications Query Parameters

**Resolves**: GAP-ADM-016

Add the following optional query parameters to `GET /admin/verifications`:

```
sla_status      string   on_track | approaching | breached
                         (approaching = 24–48h, breached = >48h)
sort_by         string   submitted_at | caregiver_name | hours_pending
sort_order      string   asc | desc (default: asc)
```

---

### ADD-8: Extend GET /admin/safeguarding — Severity Parameter

**Resolves**: GAP-ADM-017

Replace the existing binary `urgency` parameter with a four-level `severity` parameter in `GET /admin/safeguarding`:

```
severity        string   critical | high | medium | low
```

This replaces `urgency=urgent|standard`. The existing `urgency` parameter should be deprecated with a migration notice. Map `urgency=urgent` to `severity=critical` for backward compatibility during the deprecation period.

---

### ADD-9: New Endpoint — GET /admin/safeguarding/summary

**Resolves**: GAP-ADM-018

```
GET /admin/safeguarding/summary
Auth: Bearer JWT (admin role required)
```

**Response**:
```json
{
  "success": true,
  "data": {
    "activeReports": 12,
    "urgentReports": 2,
    "slaBreaches": 1,
    "resolvedThisWeek": {
      "total": 8,
      "substantiated": 3,
      "unsubstantiated": 4,
      "inconclusive": 1
    },
    "avgResponseHours": 3.2,
    "slaTargetHours": 4
  }
}
```

---

### ADD-10: Extend GET /admin/safeguarding Query Parameters

**Resolves**: GAP-ADM-019

Add date range filter parameters to `GET /admin/safeguarding`:

```
submittedFrom   string   ISO 8601 date string
submittedTo     string   ISO 8601 date string
```

---

### ADD-11: New Endpoint — PUT /admin/safeguarding/:id/assign

**Resolves**: GAP-ADM-020

```
PUT /admin/safeguarding/:id/assign
Auth: Bearer JWT (safeguarding_officer or super_admin role required)
```

**Request Body**:
```json
{
  "assignedToId": "admin-uuid"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "case-uuid",
    "status": "triaging",
    "assignedTo": {
      "id": "admin-uuid",
      "firstName": "Sarah",
      "lastName": "Jones"
    },
    "assignedAt": "2026-02-18T10:00:00Z"
  }
}
```

Status transitions from `new` to `triaging` automatically on first assignment. Creates an audit log entry.

---

### ADD-12: New Endpoint — POST /admin/safeguarding/:id/escalate

**Resolves**: GAP-ADM-021

```
POST /admin/safeguarding/:id/escalate
Auth: Bearer JWT (safeguarding_officer or super_admin role required)
```

**Request Body**:
```json
{
  "escalationType": "sab | police",
  "reason": "string",
  "referenceNumber": "string",
  "escalatedAt": "2026-02-18T10:00:00Z"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "case-uuid",
    "status": "escalated",
    "escalation": {
      "type": "sab",
      "reason": "Section 42 criteria met",
      "referenceNumber": "SAB-2026-001",
      "escalatedAt": "2026-02-18T10:00:00Z",
      "escalatedBy": "admin-uuid"
    }
  }
}
```

This endpoint is a Care Act 2014 Section 42 compliance requirement. It creates an immutable audit log entry. The `referenceNumber` field stores the SAB or police crime reference for cross-referencing.

---

### ADD-13: New Endpoint — GET /admin/settings

**Resolves**: GAP-ADM-022 (CRITICAL)

```
GET /admin/settings
Auth: Bearer JWT (super_admin role ONLY — returns 403 for all other roles)
```

**Response**:
```json
{
  "success": true,
  "data": {
    "general": {
      "platformName": "iCare",
      "maintenanceMode": false,
      "supportEmail": "support@icare-app.co.uk",
      "termsUrl": "https://icare-app.co.uk/terms"
    },
    "payments": {
      "caregiverCommission": 15.00,
      "serviceFee": 15.00,
      "stripePublishableKey": "pk_live_••••••••••••5678",
      "stripeSecretKeyMasked": "sk_live_••••••••••••••••••••••••",
      "payoutSchedule": "weekly",
      "payoutDay": "friday"
    },
    "verification": {
      "dbsValidityYears": 3,
      "identityProvider": "stripe_identity"
    },
    "notifications": {
      "emailProvider": "sendgrid",
      "smsProvider": "twilio"
    },
    "features": {
      "messaging": true,
      "reviews": true,
      "familyAccounts": true,
      "searchFilters": true,
      "analytics": false,
      "safeguardingReporting": true,
      "verificationSystem": true
    }
  }
}
```

The Stripe secret key is NEVER returned in plaintext from this endpoint. Only the masked version is returned. A separate authenticated reveal call is required (ADD-16). Commission rates are FDR-008 placeholders.

---

### ADD-14: New Endpoint — GET /admin/settings/audit-log

**Resolves**: GAP-ADM-023

```
GET /admin/settings/audit-log
Auth: Bearer JWT (super_admin role ONLY)
Query Parameters: page=1&limit=20
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "changedAt": "2026-02-11T14:32:00Z",
      "adminId": "uuid",
      "adminName": "Sarah (SA)",
      "category": "payments",
      "fieldName": "caregiverCommission",
      "oldValue": "15",
      "newValue": "12"
    }
  ],
  "meta": {
    "currentPage": 1,
    "totalPages": 5,
    "totalCount": 95
  }
}
```

All values stored and returned as strings to handle mixed types (percentages, booleans, dates). Audit log entries are immutable — no delete or update operations are permitted.

---

### ADD-15: New Endpoint — PUT /admin/settings

**Resolves**: GAP-ADM-024 (CRITICAL)

```
PUT /admin/settings
Auth: Bearer JWT (super_admin role ONLY)
```

**Request Body** (partial update — only include changed category):
```json
{
  "category": "payments | general | verification | notifications | features",
  "settings": {}
}
```

**Request Body — Payments example**:
```json
{
  "category": "payments",
  "settings": {
    "caregiverCommission": 15.00,
    "serviceFee": 15.00,
    "payoutSchedule": "weekly",
    "payoutDay": "friday"
  }
}
```

**Request Body — Features example**:
```json
{
  "category": "features",
  "settings": {
    "messaging": true,
    "reviews": false,
    "familyAccounts": true,
    "searchFilters": true,
    "analytics": false
  }
}
```

**Server-side constraints**:
- `safeguardingReporting` and `verificationSystem` feature flags are locked `true` regardless of the request body value
- Commission rate changes create an audit log entry and apply to future bookings only
- Stripe key fields are not accepted in the settings PUT body — they require a separate secure update flow (not in scope for Tier 1)

**Response**:
```json
{
  "success": true,
  "data": {
    "category": "payments",
    "saved": true,
    "auditLogId": "uuid"
  }
}
```

---

### ADD-16: New Endpoint — POST /admin/settings/verify-password

**Resolves**: GAP-ADM-025

```
POST /admin/settings/verify-password
Auth: Bearer JWT (super_admin role ONLY)
```

**Purpose**: Re-authenticate to reveal the Stripe secret key. This is a secondary authentication step that does not create a new session token.

**Request Body**:
```json
{
  "password": "string"
}
```

**Response on success**:
```json
{
  "success": true,
  "data": {
    "stripeSecretKey": "sk_live_actualvalue...",
    "expiresIn": 30
  }
}
```

`expiresIn` is seconds until the key should be auto-masked client-side. The actual key is never stored in client memory beyond the display timeout.

**Rate limiting**: Maximum 5 attempts per 15 minutes. Lockout on 5 consecutive failures with alert to all super admins.

---

### ADD-17: New Endpoint — POST /admin/settings/test-stripe

**Resolves**: GAP-ADM-026

```
POST /admin/settings/test-stripe
Auth: Bearer JWT (super_admin role ONLY)
```

**Purpose**: Validate Stripe API keys by making a test call to Stripe's API. Prevents silent misconfiguration.

**Request Body**: None (uses the keys stored in settings)

**Response on success**:
```json
{
  "success": true,
  "data": {
    "connected": true,
    "accountId": "acct_xxxx",
    "accountName": "iCare Platform",
    "mode": "live"
  }
}
```

**Response on failure**:
```json
{
  "success": false,
  "error": {
    "code": "STRIPE_CONNECTION_FAILED",
    "message": "Invalid API key provided",
    "stripeError": "No such API key"
  }
}
```

---

### ADD-18: Server-Side Enforcement for Locked Feature Flags

**Resolves**: GAP-ADM-027

No new endpoint required. The existing `PUT /admin/settings` (ADD-15) must enforce the following server-side:

- `safeguardingReporting` is always `true`. If the request body contains `safeguardingReporting: false`, the field is silently ignored and the saved value remains `true`.
- `verificationSystem` is always `true`. Same behaviour.

The API should return HTTP 422 Unprocessable Entity if the client explicitly attempts to set these to `false`, with error:
```json
{
  "error": {
    "code": "FEATURE_LOCKED",
    "message": "Safeguarding Reporting and Verification System cannot be disabled"
  }
}
```

---

*End of document. Total gaps identified: 19 (GAP-ADM-009 through GAP-ADM-027).*
*Total recommended additions: 18 (ADD-1 through ADD-18).*
*Gap numbering continues in any future admin screen mapping documents starting at GAP-ADM-028.*
