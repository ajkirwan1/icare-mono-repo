# ⚠️ DEPRECATED - Tier 1 Navigation Route Map

> **DEPRECATED**: 2026-02-07
> **Reason**: This draft route map has been superseded by the canonical route map at `/docs/product/tier1-route-map.md`, which covers all 47 Tier 1 screens (R0 + R1) with full navigation hierarchy, role-based access matrix, and state definitions.
> **Superseded By**: `/docs/product/tier1-route-map.md` (marked CANONICAL)
> **Status**: ARCHIVED - Use canonical route map instead

---

# Tier 1 Navigation Route Map: Application Route Tree & Navigation Structure

**Document Purpose**: Define the complete navigation hierarchy, route structure, and user flow architecture for Tier 1 (Companionship MVP) application.

**Document Owner**: Product Team
**Document Status**: CANONICAL - All navigation implementation references this document
**Last Updated**: 2026-02-02
**Version**: 1.0

**Source Documents**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - 30 screens (R0 Launch-Critical)
- `/docs/tiers/tier1/planning/r0-launch-scope.md` - User journeys and R0 scope definition
- `/docs/tiers/common/spec/feature-map.md` - RBAC role definitions

---

## Executive Summary

**Total Routes**: 30 unique routes (R0 Launch-Critical)
**Role-Based Access Zones**: 4 (Public, Authenticated, Caregiver, Admin)
**Deep Linkable Routes**: 8 (shareable booking/profile URLs)
**Authentication Boundaries**: 3 levels (Public, Authenticated, Role-Specific)

**Navigation Patterns**:
- **Hub-and-Spoke**: Dashboards (SCR-CR-001, SCR-CG-001) serve as primary navigation hubs
- **Linear Wizards**: Registration → Verification → Onboarding flows
- **Cross-Role Navigation**: Booking Detail screen (SCR-CR-008) accessible from both Care Receiver and Caregiver roles

---

## Section 1: Route Tree (ASCII Diagram)

```
/                                           [SCR-PUB-001: Homepage]
│                                           Roles: All visitors
│                                           Auth: Public
│
├── /terms                                  [SCR-PUB-006: Terms of Service]
│                                           Roles: All visitors | Auth: Public
│
├── /privacy                                [SCR-PUB-007: Privacy Policy]
│                                           Roles: All visitors | Auth: Public
│
├── /safeguarding-policy                    [SCR-PUB-008: Safeguarding Policy]
│                                           Roles: All visitors | Auth: Public
│
├── /login                                  [SCR-AUTH-005: Login]
│   │                                       Roles: All users | Auth: Public
│   │
│   └── /forgot-password                    [SCR-AUTH-006: Password Reset Request]
│                                           Roles: All users | Auth: Public
│
├── /register
│   │
│   ├── /care-receiver                      [SCR-AUTH-001: Care Receiver Registration]
│   │                                       Roles: Unauthenticated | Auth: Public
│   │
│   ├── /family                             [SCR-AUTH-002: Family Member Registration]
│   │                                       Roles: Unauthenticated | Auth: Public
│   │
│   └── /caregiver                          [SCR-AUTH-003: Caregiver Registration]
│                                           Roles: Unauthenticated | Auth: Public
│
├── /verify
│   │
│   └── /phone                              [SCR-AUTH-004: Phone Verification]
│                                           Roles: All users (pending_phone_verification) | Auth: Required + Pending State
│
├── /dashboard                              [SCR-CR-001: Care Receiver Dashboard]
│   │                                       Roles: Care Receiver, Family Member | Auth: Required + Verified
│   │
│   └── (Navigation hub for care receivers - see navigation matrix)
│
├── /search                                 [SCR-CR-003: Caregiver Search]
│   │                                       Roles: Care Receiver, Family Member | Auth: Required + Verified
│   │
│   └── (Entry point to discovery flow)
│
├── /caregivers
│   │
│   └── /:caregiverId                       [SCR-CR-005: Caregiver Profile (Public View)]
│                                           Roles: Care Receiver, Family Member | Auth: Required + Verified
│                                           Deep Link: YES (shareable profile link)
│
├── /bookings
│   │
│   ├── /new/:caregiverId                   [SCR-CR-006: Booking Request Form]
│   │                                       Roles: Care Receiver, Family Member | Auth: Required + Verified
│   │
│   ├── /:bookingId                         [SCR-CR-008: Booking Detail]
│   │                                       Roles: Care Receiver, Family Member, Caregiver | Auth: Required + Booking Ownership
│   │                                       Deep Link: YES (booking reference link)
│   │                                       Note: Single component with role-based rendering (Decision CB-002)
│   │
│   ├── /:bookingId/messages                [SCR-CR-011: Message Thread] (Decision CB-005)
│   │                                       Roles: Care Receiver, Family Member, Caregiver | Auth: Required + Booking Party
│   │
│   └── /:bookingId/review                  [SCR-CR-015: Leave Review] (Decision CB-006)
│                                           Roles: Care Receiver, Family Member | Auth: Required + Booking Ownership + Completed Status
│
├── /settings
│   │
│   └── /payment                            [SCR-CR-013: Payment Methods]
│                                           Roles: Care Receiver, Family Member | Auth: Required + Verified
│
├── /caregiver
│   │
│   ├── /dashboard                          [SCR-CG-001: Caregiver Dashboard]
│   │                                       Roles: Caregiver | Auth: Required + Verified
│   │
│   ├── /onboarding                         [SCR-CG-002: Caregiver Onboarding]
│   │   │                                   Roles: Caregiver (pending_verification) | Auth: Required
│   │   │
│   │   └── (Multi-step wizard: Profile → Services → Availability → Rate → Verification)
│   │
│   ├── /bookings/:bookingId                [SCR-CG-013: Booking Request Detail]
│   │                                       Roles: Caregiver | Auth: Required + Booking Addressed to Caregiver
│   │                                       Deep Link: YES (caregiver accepts/declines booking)
│   │
│   ├── /earnings
│   │   │
│   │   └── /setup                          [SCR-CG-020: Payout Setup (Stripe Connect)]
│   │                                       Roles: Caregiver | Auth: Required + Verified
│   │
│   └── /verify
│       │
│       ├── /identity                       [SCR-CG-008: Identity Verification]
│       │                                   Roles: Caregiver (pending_verification) | Auth: Required
│       │
│       ├── /right-to-work                  [SCR-CG-009: Right to Work Verification]
│       │                                   Roles: Caregiver (pending_verification) | Auth: Required
│       │
│       └── /dbs                            [SCR-CG-010: DBS Check Submission (Voluntary at T1)]
│                                           Roles: Caregiver (pending_verification) | Auth: Required
│
└── /admin
    │                                       Roles: Admin, Safeguarding Officer | Auth: Required + 2FA + Admin Role
    │
    ├── /                                   [SCR-ADM-001: Admin Dashboard]
    │                                       Roles: Admin, Safeguarding Officer | Auth: Required + 2FA + Admin Role
    │
    ├── /applications/:applicationId        [SCR-ADM-005: Caregiver Application Review]
    │                                       Roles: Admin | Auth: Required + 2FA + Admin Role
    │
    ├── /verifications
    │   │
    │   ├── /:verificationId                [SCR-ADM-007: Verification Review]
    │   │                                   Roles: Admin | Auth: Required + 2FA + Admin Role
    │   │
    │   └── /dbs/:verificationId            [SCR-ADM-008: DBS Review]
    │                                       Roles: Admin | Auth: Required + 2FA + Admin Role
    │
    └── /safeguarding
        │
        ├── /                               [SCR-ADM-014: Safeguarding Reports Queue]
        │                                   Roles: Admin, Safeguarding Officer | Auth: Required + 2FA + Safeguarding Role
        │
        └── /:reportId                      [SCR-ADM-015: Safeguarding Report Detail]
                                            Roles: Admin, Safeguarding Officer | Auth: Required + 2FA + Safeguarding Role
                                            Deep Link: YES (safeguarding case reference)
```

---

## Section 2: Navigation Matrix

### From Authentication & Registration

| From Screen | To Screen | Trigger | User Role | Notes |
|------------|-----------|---------|-----------|-------|
| SCR-PUB-001 (Homepage) | SCR-AUTH-001 | Click "Find Care" | Unauthenticated | Primary CTA for care receivers |
| SCR-PUB-001 (Homepage) | SCR-AUTH-003 | Click "Become a Caregiver" | Unauthenticated | Primary CTA for caregivers |
| SCR-PUB-001 (Homepage) | SCR-AUTH-005 | Click "Log In" | All | Header navigation link |
| SCR-PUB-001 (Homepage) | SCR-CR-003 | Click "Find Care" | Authenticated CR | Direct to search (skip registration) |
| SCR-PUB-001 (Homepage) | SCR-CG-001 | Click "Go to Dashboard" | Authenticated CG | Direct to dashboard (skip registration) |
| SCR-AUTH-001 | SCR-AUTH-004 | Registration success | Care Receiver | Phone verification required |
| SCR-AUTH-001 | SCR-AUTH-005 | Click "Already have account" | All | Switch to login |
| SCR-AUTH-001 | SCR-AUTH-003 | Click "Register as Caregiver" | All | Switch registration type |
| SCR-AUTH-002 | SCR-AUTH-004 | Registration success | Family Member | Phone verification required |
| SCR-AUTH-002 | SCR-AUTH-005 | Click "Already have account" | All | Switch to login |
| SCR-AUTH-002 | SCR-AUTH-001 | Click "Register for yourself" | All | Switch registration type |
| SCR-AUTH-003 | SCR-AUTH-004 | Registration success | Caregiver | Phone verification required |
| SCR-AUTH-003 | SCR-AUTH-005 | Click "Already have account" | All | Switch to login |
| SCR-AUTH-003 | SCR-AUTH-001 | Click "Looking for care?" | All | Switch registration type |
| SCR-AUTH-004 | SCR-CR-001 | Phone verified | Care Receiver | Land on dashboard |
| SCR-AUTH-004 | SCR-CR-001 | Phone verified | Family Member | Land on dashboard (proxy) |
| SCR-AUTH-004 | SCR-CG-002 | Phone verified | Caregiver | Start onboarding wizard |
| SCR-AUTH-004 | SCR-AUTH-001/002/003 | Click "Change phone number" | All | Return to registration |
| SCR-AUTH-005 | SCR-CR-001 | Login success | Care Receiver | Verified care receiver |
| SCR-AUTH-005 | SCR-CG-001 | Login success | Caregiver (verified) | Verified caregiver |
| SCR-AUTH-005 | SCR-CG-002 | Login success | Caregiver (pending) | Pending verification |
| SCR-AUTH-005 | SCR-ADM-001 | Login success | Admin | Admin dashboard |
| SCR-AUTH-005 | SCR-AUTH-006 | Click "Forgot password?" | All | Password reset flow |
| SCR-AUTH-005 | SCR-AUTH-001 | Click "Sign up" (CR) | All | New care receiver registration |
| SCR-AUTH-005 | SCR-AUTH-003 | Click "Sign up" (CG) | All | New caregiver registration |
| SCR-AUTH-006 | SCR-AUTH-005 | Click "Remember password?" | All | Return to login |
| SCR-AUTH-006 | Success message | Click "Send Reset Link" | All | Email sent (external flow) |

### From Public & Compliance

| From Screen | To Screen | Trigger | User Role | Notes |
|------------|-----------|---------|-----------|-------|
| All screens | SCR-PUB-006 | Footer link "Terms" | All | Legal page |
| All screens | SCR-PUB-007 | Footer link "Privacy" | All | Legal page |
| All screens | SCR-PUB-008 | Footer link "Safeguarding" | All | Legal page |
| SCR-AUTH-001/002/003 | SCR-PUB-006 | Click "Terms of Service" checkbox link | All | Opens in new tab/modal |
| SCR-AUTH-001/002/003 | SCR-PUB-007 | Click "Privacy Policy" checkbox link | All | Opens in new tab/modal |
| SCR-PUB-006 | SCR-PUB-001 | Click "Back to Home" | All | Return to homepage |
| SCR-PUB-007 | SCR-PUB-001 | Click "Back to Home" | All | Return to homepage |
| SCR-PUB-008 | SCR-PUB-001 | Click "Back to Home" | All | Return to homepage |

### From Care Receiver Flows

| From Screen | To Screen | Trigger | User Role | Notes |
|------------|-----------|---------|-----------|-------|
| SCR-CR-001 (Dashboard) | SCR-CR-003 | Click "Find Caregivers" | Care Receiver, Family | Primary action button |
| SCR-CR-001 (Dashboard) | SCR-CR-008 | Click "View Details" on booking card | Care Receiver, Family | View booking status |
| SCR-CR-001 (Dashboard) | SCR-CR-013 | Click "Manage Payment Methods" | Care Receiver, Family | Settings link |
| SCR-CR-001 (Dashboard) | SCR-CR-006 | Click "Request Booking" (featured caregiver) | Care Receiver, Family | Quick booking action |
| SCR-CR-003 (Search) | SCR-CR-005 | Click "View Profile" on caregiver card | Care Receiver, Family | Caregiver details |
| SCR-CR-003 (Search) | SCR-CR-006 | Click "Request Booking" on caregiver card | Care Receiver, Family | Quick booking action |
| SCR-CR-003 (Search) | SCR-CR-001 | Header navigation "Dashboard" | Care Receiver, Family | Return to hub |
| SCR-CR-005 (Profile) | SCR-CR-006 | Click "Request Booking" button | Care Receiver, Family | Primary action |
| SCR-CR-005 (Profile) | SCR-CR-003 | Click "Back to Search" | Care Receiver, Family | Return to search results |
| SCR-CR-006 (Booking Request) | SCR-CR-013 | Click "Add Payment Method" | Care Receiver, Family | If no card on file |
| SCR-CR-006 (Booking Request) | SCR-CR-008 | Click "Send Request" (success) | Care Receiver, Family | Booking created |
| SCR-CR-006 (Booking Request) | SCR-CR-005 | Click "Cancel" | Care Receiver, Family | Abandon booking |
| SCR-CR-008 (Booking Detail) | SCR-CR-003 | Click "Search for another caregiver" | Care Receiver, Family | If booking declined/expired |
| SCR-CR-008 (Booking Detail) | SCR-CR-001 | Header navigation "Dashboard" | Care Receiver, Family | Return to hub |
| SCR-CR-008 (Booking Detail) | SCR-CR-005 | Click "View Caregiver Profile" | Care Receiver, Family | If booking accepted |
| SCR-CR-008 (Booking Detail) | SCR-CR-011 | Click "Message Caregiver" | Care Receiver, Family | R0 - CB-005 |
| SCR-CR-008 (Booking Detail) | SCR-CR-015 | Click "Leave Review" | Care Receiver, Family | R0 - CB-006, if completed |
| SCR-CR-011 (Message Thread) | SCR-CR-008 | Click "Back to Booking" | Care Receiver, Family, Caregiver | Return to booking detail |
| SCR-CR-015 (Leave Review) | SCR-CR-008 | Click "Submit Review" (success) | Care Receiver, Family | Return after submission |
| SCR-CR-015 (Leave Review) | SCR-CR-008 | Click "Skip" or "Back to Booking" | Care Receiver, Family | Return without review |
| SCR-CR-013 (Payment) | SCR-CR-006 | Click "Back to Booking" | Care Receiver, Family | If came from booking flow |
| SCR-CR-013 (Payment) | SCR-CR-001 | Click "Back to Dashboard" | Care Receiver, Family | Default return |

### From Caregiver Flows

| From Screen | To Screen | Trigger | User Role | Notes |
|------------|-----------|---------|-----------|-------|
| SCR-CG-001 (Dashboard) | SCR-CG-013 | Click "View Details" on booking request card | Caregiver | Accept/decline booking |
| SCR-CG-001 (Dashboard) | SCR-CR-008 | Click "View Details" on upcoming booking card | Caregiver | View booking details |
| SCR-CG-001 (Dashboard) | SCR-CG-020 | Click "View Earnings" link | Caregiver | Payout setup |
| SCR-CG-001 (Dashboard) | SCR-CG-002 | Click "Complete Profile" | Caregiver (incomplete) | Resume onboarding |
| SCR-CG-002 (Onboarding) | SCR-CG-008 | Click "Next" from Step 5 (ID verification) | Caregiver | Verification sub-flow |
| SCR-CG-002 (Onboarding) | SCR-CG-009 | Click "Next" from Step 5 (Right to Work) | Caregiver | Verification sub-flow |
| SCR-CG-002 (Onboarding) | SCR-CG-010 | Click "Next" from Step 5 (DBS) | Caregiver | Verification sub-flow (optional) |
| SCR-CG-002 (Onboarding) | SCR-CG-001 | Click "Submit for Review" (success) | Caregiver | Onboarding complete |
| SCR-CG-002 (Onboarding) | SCR-CG-001 | Click "Save and Continue Later" | Caregiver | Resume later |
| SCR-CG-008 (ID Verification) | SCR-CG-002 | Click "Back to Onboarding" | Caregiver | Return to wizard |
| SCR-CG-009 (Right to Work) | SCR-CG-002 | Click "Back to Onboarding" | Caregiver | Return to wizard |
| SCR-CG-010 (DBS) | SCR-CG-002 | Click "Back to Onboarding" | Caregiver | Return to wizard |
| SCR-CG-010 (DBS) | SCR-CG-002 | Click "Skip for Now" | Caregiver | Optional, continue without DBS |
| SCR-CG-013 (Booking Request Detail) | SCR-CG-001 | Click "Accept Booking" (success) | Caregiver | Return to dashboard |
| SCR-CG-013 (Booking Request Detail) | SCR-CG-001 | Click "Decline Booking" (success) | Caregiver | Return to dashboard |
| SCR-CG-013 (Booking Request Detail) | SCR-CG-020 | Auto-redirect after first acceptance | Caregiver | If payout not setup |
| SCR-CR-008 (Booking Detail) | SCR-CR-011 | Click "Message Care Receiver" | Caregiver | R0 - CB-005, if accepted |
| SCR-CG-020 (Payout Setup) | SCR-CG-001 | Stripe Connect success | Caregiver | Return to dashboard |
| SCR-CG-020 (Payout Setup) | SCR-CG-001 | Click "Back to Dashboard" | Caregiver | Default return |

### From Admin Operations

| From Screen | To Screen | Trigger | User Role | Notes |
|------------|-----------|---------|-----------|-------|
| SCR-ADM-001 (Dashboard) | SCR-ADM-005 | Click "Caregiver Verifications" card | Admin | Verification queue |
| SCR-ADM-001 (Dashboard) | SCR-ADM-014 | Click "Safeguarding Reports" card | Admin, Safeguarding Officer | Safeguarding queue |
| SCR-ADM-005 (Application Review) | SCR-ADM-007 | Click "Review ID" or "Review Right to Work" | Admin | Document verification |
| SCR-ADM-005 (Application Review) | SCR-ADM-008 | Click "Review DBS" | Admin | DBS certificate review |
| SCR-ADM-005 (Application Review) | SCR-ADM-001 | Click "Approve" (success) | Admin | Return to dashboard |
| SCR-ADM-005 (Application Review) | SCR-ADM-001 | Click "Reject" (success) | Admin | Return to dashboard |
| SCR-ADM-005 (Application Review) | SCR-ADM-001 | Click "Back to Queue" | Admin | Abandon review |
| SCR-ADM-007 (Verification Review) | SCR-ADM-005 | Click "Approve" (success) | Admin | Return to application |
| SCR-ADM-007 (Verification Review) | SCR-ADM-005 | Click "Reject" (success) | Admin | Return to application |
| SCR-ADM-007 (Verification Review) | SCR-ADM-005 | Click "Back to Application" | Admin | Abandon review |
| SCR-ADM-008 (DBS Review) | SCR-ADM-005 | Click "Approve DBS" (success) | Admin | Return to application |
| SCR-ADM-008 (DBS Review) | SCR-ADM-005 | Click "Reject DBS" (success) | Admin | Return to application |
| SCR-ADM-008 (DBS Review) | SCR-ADM-005 | Click "Back to Application" | Admin | Abandon review |
| SCR-ADM-014 (Safeguarding Queue) | SCR-ADM-015 | Click "View Details" on report card | Admin, Safeguarding Officer | Investigate report |
| SCR-ADM-014 (Safeguarding Queue) | SCR-ADM-001 | Click "Back to Dashboard" | Admin, Safeguarding Officer | Return to hub |
| SCR-ADM-015 (Safeguarding Detail) | SCR-ADM-014 | Click "Resolve Report" (success) | Admin, Safeguarding Officer | Case closed |
| SCR-ADM-015 (Safeguarding Detail) | SCR-ADM-014 | Click "Back to Queue" | Admin, Safeguarding Officer | Abandon investigation |

---

## Section 3: Role-Based Access Map

### Public Routes (No Authentication Required)

**Access**: All visitors (authenticated and unauthenticated)

```
/                       (SCR-PUB-001: Homepage)
/terms                  (SCR-PUB-006: Terms of Service)
/privacy                (SCR-PUB-007: Privacy Policy)
/safeguarding-policy    (SCR-PUB-008: Safeguarding Policy)
/login                  (SCR-AUTH-005: Login)
/forgot-password        (SCR-AUTH-006: Password Reset Request)
/register/care-receiver (SCR-AUTH-001: Care Receiver Registration)
/register/family        (SCR-AUTH-002: Family Member Registration)
/register/caregiver     (SCR-AUTH-003: Caregiver Registration)
```

**Redirect Rules**:
- If authenticated user visits `/login` → Redirect to role-appropriate dashboard
- If authenticated user visits `/register/*` → Redirect to role-appropriate dashboard

---

### Care Receiver Routes (Authenticated + Care Receiver/Family Member Role)

**Access**: Care Receiver, Family Member (authenticated + verified phone)

```
/verify/phone           (SCR-AUTH-004: Phone Verification) - If pending_phone_verification status
/dashboard              (SCR-CR-001: Care Receiver Dashboard)
/search                 (SCR-CR-003: Caregiver Search)
/caregivers/:id         (SCR-CR-005: Caregiver Profile)
/bookings/new/:id       (SCR-CR-006: Booking Request Form)
/bookings/:id           (SCR-CR-008: Booking Detail) - If booking ownership
/settings/payment       (SCR-CR-013: Payment Methods)
```

**Access Control Rules**:
- `/bookings/:bookingId` → Verify user is booking owner (care receiver or linked family member)
- `/caregivers/:caregiverId` → Only accessible if caregiver profile is verified and active
- `/bookings/new/:caregiverId` → Requires payment method on file OR redirect to SCR-CR-013

**Redirect Rules**:
- If phone not verified → Force redirect to `/verify/phone`
- If profile incomplete → Display onboarding checklist on dashboard

---

### Caregiver Routes (Authenticated + Caregiver Role)

**Access**: Caregiver (authenticated + verified phone)

```
/verify/phone                   (SCR-AUTH-004: Phone Verification) - If pending_phone_verification status
/caregiver/dashboard            (SCR-CG-001: Caregiver Dashboard)
/caregiver/onboarding           (SCR-CG-002: Caregiver Onboarding) - If pending_verification status
/caregiver/verify/identity      (SCR-CG-008: Identity Verification) - If pending_verification status
/caregiver/verify/right-to-work (SCR-CG-009: Right to Work Verification) - If pending_verification status
/caregiver/verify/dbs           (SCR-CG-010: DBS Check Submission) - If pending_verification status (optional)
/caregiver/bookings/:id         (SCR-CG-013: Booking Request Detail) - If booking addressed to caregiver
/caregiver/earnings/setup       (SCR-CG-020: Payout Setup)
/bookings/:id                   (SCR-CR-008: Booking Detail) - If booking ownership (shared with care receiver)
```

**Access Control Rules**:
- `/caregiver/onboarding` → Accessible only if status = `pending_verification`
- `/caregiver/verify/*` → Accessible only during onboarding (status = `pending_verification`)
- `/caregiver/bookings/:bookingId` → Verify booking is addressed to this caregiver
- `/bookings/:bookingId` → Verify caregiver is assigned to this booking (shared with care receiver)
- `/caregiver/dashboard` → If onboarding incomplete, display "Complete Your Profile" banner

**Redirect Rules**:
- If phone not verified → Force redirect to `/verify/phone`
- If profile not verified (status = `pending_verification`) → Force redirect to `/caregiver/onboarding`
- After accepting first booking → Auto-redirect to `/caregiver/earnings/setup` if payout not setup

---

### Admin Routes (Authenticated + Admin/Safeguarding Officer Role + 2FA)

**Access**: Admin, Safeguarding Officer (authenticated + 2FA enabled + admin role)

```
/admin                                  (SCR-ADM-001: Admin Dashboard)
/admin/applications/:applicationId      (SCR-ADM-005: Caregiver Application Review)
/admin/verifications/:verificationId    (SCR-ADM-007: Verification Review)
/admin/verifications/dbs/:verificationId (SCR-ADM-008: DBS Review)
/admin/safeguarding                     (SCR-ADM-014: Safeguarding Reports Queue)
/admin/safeguarding/:reportId           (SCR-ADM-015: Safeguarding Report Detail)
```

**Access Control Rules**:
- All `/admin/*` routes → Require admin role + 2FA authentication
- `/admin/safeguarding/*` → Require safeguarding officer role (subset of admin role)
- `/admin/applications/:applicationId` → Verify application exists and is pending review
- `/admin/verifications/:verificationId` → Verify verification document exists
- `/admin/safeguarding/:reportId` → Verify report exists

**Redirect Rules**:
- If 2FA not enabled → Force redirect to 2FA setup screen (not in R0 scope)
- If authenticated non-admin visits `/admin/*` → Redirect to `/` with error message "Access Denied"

---

## Section 4: Authentication Boundaries

### Boundary 1: Public Access (No Authentication)

**Routes**: 9 routes
- Homepage, legal pages, login, registration, password reset

**Behavior**:
- Available to all visitors (authenticated and unauthenticated)
- If authenticated user visits registration → Redirect to dashboard
- If authenticated user visits login → Redirect to dashboard

---

### Boundary 2: Authenticated Access (Any Logged-In User)

**Routes**: 1 route (shared across all authenticated users)
- `/verify/phone` (SCR-AUTH-004) - Required for users with `pending_phone_verification` status

**Behavior**:
- User has registered but NOT verified phone
- Cannot access role-specific routes until phone verified
- Force redirect to `/verify/phone` on login if status = `pending_phone_verification`

---

### Boundary 3: Role-Specific Access (Authenticated + Role + State)

**Care Receiver Routes**: 6 routes (requires authentication + care receiver/family member role + verified phone)
**Caregiver Routes**: 8 routes (requires authentication + caregiver role + verified phone)
**Admin Routes**: 6 routes (requires authentication + admin role + 2FA)

**Behavior**:
- Role mismatch → Redirect to appropriate dashboard OR show 403 error
- State mismatch (e.g., unverified caregiver accessing dashboard) → Redirect to onboarding
- Ownership mismatch (e.g., accessing another user's booking) → Show 404 error (not 403, for security)

---

### Boundary 4: State-Dependent Access (Authenticated + Specific User State)

**Pending Verification State** (Caregivers only):
- `/caregiver/onboarding` (SCR-CG-002)
- `/caregiver/verify/identity` (SCR-CG-008)
- `/caregiver/verify/right-to-work` (SCR-CG-009)
- `/caregiver/verify/dbs` (SCR-CG-010)

**Behavior**:
- Accessible ONLY if caregiver status = `pending_verification`
- Once verified (status = `active`), these routes redirect to dashboard
- Prevents re-submission of verification documents after approval

---

## Section 5: Deep Link Support

### Shareable Routes (Bookmarkable + Shareable)

These routes support deep linking and should be shareable via URL:

| Route | Screen ID | Deep Link Use Case | Auth Required | Notes |
|-------|-----------|-------------------|---------------|-------|
| `/caregivers/:caregiverId` | SCR-CR-005 | Share caregiver profile with family member | Yes | Only if profile is verified and active |
| `/bookings/:bookingId` | SCR-CR-008 | Email notification link for booking updates | Yes | Ownership verified |
| `/caregiver/bookings/:bookingId` | SCR-CG-013 | Email notification link for booking requests | Yes (Caregiver) | Booking addressed to caregiver |
| `/admin/safeguarding/:reportId` | SCR-ADM-015 | Safeguarding case reference link | Yes (Admin + 2FA) | Audit trail reference |
| `/admin/applications/:applicationId` | SCR-ADM-005 | Caregiver application review link | Yes (Admin + 2FA) | Admin task assignment |
| `/terms` | SCR-PUB-006 | Link from registration checkboxes | No | Legal reference |
| `/privacy` | SCR-PUB-007 | Link from registration checkboxes | No | Legal reference |
| `/safeguarding-policy` | SCR-PUB-008 | Link from footer and registration | No | Legal reference |

**Deep Link Security**:
- All authenticated deep links verify ownership/role before displaying content
- Invalid ownership → Display 404 error (NOT 403, to avoid revealing existence)
- Expired booking links → Display "Booking not found or expired" message
- Public deep links (legal pages) → Always accessible

---

### Email Notification Deep Links

**Care Receiver Email Notifications**:
- Booking request sent → Link to `/bookings/:bookingId`
- Booking accepted by caregiver → Link to `/bookings/:bookingId`
- Booking declined by caregiver → Link to `/bookings/:bookingId`
- Booking in progress (day-of) → Link to `/bookings/:bookingId` (emergency contact displayed)
- Booking completed → Link to `/bookings/:bookingId` (confirm completion prompt)

**Caregiver Email Notifications**:
- New booking request → Link to `/caregiver/bookings/:bookingId`
- Booking cancelled by care receiver → Link to `/caregiver/bookings/:bookingId`
- Booking starting soon (24h reminder) → Link to `/caregiver/bookings/:bookingId`

**Admin Email Notifications**:
- New caregiver application → Link to `/admin/applications/:applicationId`
- New safeguarding report (urgent) → Link to `/admin/safeguarding/:reportId`

---

## Section 6: Navigation Patterns & UX Guidelines

### Pattern 1: Hub-and-Spoke Navigation

**Care Receiver Hub**: `/dashboard` (SCR-CR-001)
**Caregiver Hub**: `/caregiver/dashboard` (SCR-CG-001)
**Admin Hub**: `/admin` (SCR-ADM-001)

**Behavior**:
- Primary navigation returns to hub (header "Dashboard" link)
- Hub displays overview of pending tasks, upcoming bookings, alerts
- Hub serves as entry point to all feature areas (search, bookings, settings)

**UX Guidelines**:
- Always show "Dashboard" link in header navigation (authenticated users)
- Dashboard should be default landing page after login
- Breadcrumb navigation should show path back to dashboard

---

### Pattern 2: Linear Wizard Flows

**Registration Wizards**:
- SCR-AUTH-001/002/003 → SCR-AUTH-004 → Dashboard/Onboarding

**Caregiver Onboarding Wizard**:
- SCR-CG-002 (5-step wizard) → SCR-CG-008/009/010 (verification sub-flows) → SCR-CG-001

**Behavior**:
- Linear progression with "Next" and "Back" buttons
- Progress indicator (e.g., "Step 2 of 5")
- "Save and Continue Later" option (state persisted)
- Cannot skip required steps (verification cannot be bypassed)

**UX Guidelines**:
- Always show progress indicator
- Allow "Save and Continue Later" for non-time-sensitive wizards
- Exit button should confirm unsaved changes

---

### Pattern 3: Drill-Down Navigation

**Search → Profile → Booking Flow**:
- SCR-CR-003 (Search) → SCR-CR-005 (Caregiver Profile) → SCR-CR-006 (Booking Request) → SCR-CR-008 (Booking Detail)

**Behavior**:
- Each screen drills deeper into details
- Breadcrumb trail shows path back
- "Back" button returns to previous screen (not browser back)

**UX Guidelines**:
- Breadcrumb format: `Dashboard > Search > Caregiver Profile`
- Preserve search filters when returning to search results
- "Back" button should maintain scroll position on previous screen

---

### Pattern 4: Cross-Role Shared Screens

**Booking Detail Screen** (SCR-CR-008):
- Accessible from **Care Receiver** role: `/bookings/:bookingId`
- Accessible from **Caregiver** role: `/bookings/:bookingId` (same route!)

**Behavior**:
- Same screen, different views/permissions based on role
- Care Receiver sees: "Cancel Booking", "Confirm Completion", care receiver perspective
- Caregiver sees: Caregiver perspective (no cancellation for caregiver, different actions)

**UX Guidelines**:
- Use role-based rendering (same component, different props)
- Route path should be identical for both roles (simplifies deep links)
- Navigation context (breadcrumb) should reflect user's role

---

## Section 7: Error States & Edge Cases

### Orphan Screens (No Entry Point) - VALIDATION CHECK

**Result**: PASS - No orphan screens detected

All 30 R0 screens have at least one entry point:
- Public screens: Accessible from homepage or footer
- Authentication screens: Accessible from homepage or login/registration flows
- Care receiver screens: Accessible from dashboard or search flow
- Caregiver screens: Accessible from dashboard or onboarding flow
- Admin screens: Accessible from admin dashboard

---

### Dead-End Screens (No Exit Point) - VALIDATION CHECK

**Result**: PASS (with notes)

All screens have exit points:
- Legal pages (SCR-PUB-006/007/008): "Back to Home" button + browser back
- Success screens: Auto-redirect to next screen OR return to dashboard
- Modal confirmations: "Close" button returns to previous screen

**Edge Case**: Booking Detail screen (SCR-CR-008) in "Completed" state
- Exit options: "Leave Review" (future), "Search for another caregiver", "Dashboard"
- NOT a dead-end, but requires clear CTAs for next action

---

### Authentication State Mismatches

| Scenario | Expected Behavior | Screen Example |
|----------|------------------|----------------|
| Unauthenticated user visits authenticated route | Redirect to `/login` with `returnUrl` parameter | User visits `/search` without login |
| Authenticated user visits public route | Allow access (no redirect) | User visits `/terms` while logged in |
| Wrong role visits role-specific route | Redirect to appropriate dashboard OR 403 error | Care receiver visits `/caregiver/dashboard` |
| User with pending phone verification visits any authenticated route | Force redirect to `/verify/phone` | User completes registration but hasn't verified phone |
| Caregiver with pending verification visits dashboard | Display "Complete Your Profile" banner + link to onboarding | Caregiver hasn't completed onboarding |
| User visits booking they don't own | Display 404 error (NOT 403) | User manually edits URL to access another user's booking |

---

### Circular Navigation Prevention

**Potential Circular Flow**: Registration → Login → Registration

**Prevention**:
- Registration screens show "Already have account? Log in" link (explicit intent switch)
- Login screen shows "Don't have account? Sign up" links (explicit intent switch)
- If authenticated user visits registration → Force redirect to dashboard

**Potential Circular Flow**: Caregiver Onboarding → Verification Screens → Onboarding

**Prevention**:
- Verification screens are sub-flows of onboarding (clear breadcrumb hierarchy)
- "Back to Onboarding" button returns to specific step (not loop)
- Onboarding wizard state is persisted (user resumes where they left off)

---

## Section 8: Navigation Implementation Notes

### Header Navigation (Global)

**Unauthenticated Users**:
```
[Logo] | Find Care | Become a Caregiver | [Login Button]
```

**Authenticated Care Receivers**:
```
[Logo] | Dashboard | Find Caregivers | My Bookings | [User Menu ▾]
                                                      - Account Settings (future)
                                                      - Payment Methods
                                                      - Help & Support
                                                      - Log Out
```

**Authenticated Caregivers**:
```
[Logo] | Dashboard | My Bookings | Earnings | [User Menu ▾]
                                              - Account Settings (future)
                                              - Availability (future)
                                              - Help & Support
                                              - Log Out
```

**Authenticated Admins**:
```
[Logo] | Admin Dashboard | Verifications | Safeguarding | [User Menu ▾]
                                                          - Audit Logs (future)
                                                          - Settings
                                                          - Log Out
```

---

### Footer Navigation (Global)

**All Users** (authenticated and unauthenticated):
```
iCare Platform
---------------
About Us (future)
How It Works (future)
Safety & Trust
Contact Us (future)

Legal
-----
Terms of Service (/terms)
Privacy Policy (/privacy)
Safeguarding Policy (/safeguarding-policy)

Support
-------
Help Center (future)
Report a Concern (email/phone for R0)

© 2026 iCare. All rights reserved.
```

---

### Mobile Navigation (Responsive)

**Mobile Menu** (hamburger icon):
- Collapses header navigation into slide-out drawer
- Primary actions remain visible (e.g., "Find Care" button on homepage)
- Footer navigation remains expanded (accessible via scroll)

**Mobile-Specific Considerations**:
- Booking Detail screen: Emergency contact displayed as floating action button on mobile
- Search filters: Collapsible filter panel on mobile
- Admin dashboard: Simplified card layout for mobile (stacked vertically)

---

## Section 9: Validation Checklist

### Route Coverage Validation

- [x] All 30 R0 screens have unique routes
- [x] No route conflicts (e.g., `/bookings/:bookingId` vs `/bookings/new/:caregiverId` - resolved via specificity)
- [x] No orphan screens (all screens accessible via navigation)
- [x] No dead-end screens (all screens have exit options)

### Role Coverage Validation

- [x] Care Receiver role has access to 6 screens (+ 4 public + 1 shared)
- [x] Caregiver role has access to 8 screens (+ 4 public + 1 shared)
- [x] Admin role has access to 6 screens (+ 1 login)
- [x] All roles have at least one dashboard/hub screen

### Authentication Boundary Validation

- [x] Public routes clearly defined (9 routes)
- [x] Authenticated routes require phone verification (except `/verify/phone`)
- [x] Role-specific routes enforce RBAC (care receiver, caregiver, admin)
- [x] State-dependent routes enforce user state (pending verification, etc.)

### Deep Link Validation

- [x] All shareable routes support deep linking (8 routes)
- [x] Deep links verify ownership/role before displaying content
- [x] Email notification deep links map to correct screens

### User Journey Validation

- [x] Journey 1 (Care Receiver Registration to First Booking): 8 screens - ALL MAPPED
- [x] Journey 2 (Caregiver Registration to First Booking Acceptance): 8 screens - ALL MAPPED
- [x] Journey 3 (Admin Verification Workflow): 5 screens - ALL MAPPED
- [x] Journey 4 (Safeguarding Incident Response): 4 screens - ALL MAPPED

---

## Section 10: Gaps and Open Questions

### GAP 1: Dashboard Screens in R0 - RESOLVED

**Issue**: R0 launch scope lists 26 screens but does NOT explicitly include SCR-CR-001 (Care Receiver Dashboard) or SCR-CG-001 (Caregiver Dashboard) in the list. However, build sequence lists them as Phase 12 items.

**RESOLUTION** (Decision CB-001 - 2026-02-02):
- APPROVED: Include SCR-CR-001 (Care Receiver Dashboard) in R0
- APPROVED: Include SCR-CG-001 (Caregiver Dashboard) in R0
- R0 screen count updated from 26 to 30 (includes dashboards, message thread, leave review)

---

### GAP 2: Post-Login Landing Page Without Dashboards - RESOLVED

**Issue**: If dashboards are deferred, where do users land after login?

**RESOLUTION** (Decision CB-001 - 2026-02-02):
- Dashboards INCLUDED in R0
- Care Receiver lands on `/dashboard` (SCR-CR-001)
- Caregiver lands on `/caregiver/dashboard` (SCR-CG-001)
- Admin lands on `/admin` (SCR-ADM-001)

---

### GAP 3: Account Settings Screen

**Issue**: No account settings screen in R0. Users cannot change email, phone, password, or delete account.

**Impact on Navigation**:
- User menu has no "Account Settings" link
- Support handles all account changes manually

**DECISION NEEDED**:
- Include password change screen (SCR-AUTH-007)?
- Include basic account settings screen (email, phone, delete account)?

**RECOMMENDATION for R0**:
- Omit full account settings screen
- Add "Change Password" link in user menu → Opens modal with password change form (NOT a separate screen)
- All other account changes handled via support email/phone

---

### GAP 4: Safeguarding Report Screen (User-Facing)

**Issue**: SCR-CR-020 (Safeguarding Report) is listed as deferred in R0. However, safeguarding is Care Act 2014 requirement.

**Impact on Navigation**:
- "Report Concern" buttons throughout platform link to email/phone instructions
- No self-service reporting in R0

**Current R0 Approach**:
- Footer link: "Report a Concern" → Email: safeguarding@icare.com / Phone: 0800-XXX-XXXX
- Booking Detail screen: "Report Concern" button → Opens modal with email/phone instructions

**RECOMMENDATION for R0**: Defer to post-R0. Email/phone reporting acceptable at low volume (<50 bookings/month).

---

### GAP 5: Breadcrumb Navigation for Complex Flows

**Issue**: Multi-step flows (onboarding, search → profile → booking) require breadcrumb navigation for clarity.

**DECISION NEEDED**:
- Include breadcrumbs in all screens?
- Only include breadcrumbs for drill-down flows (search → profile → booking)?

**RECOMMENDATION**:
- Drill-down flows: Always show breadcrumbs (e.g., `Dashboard > Search > Caregiver Profile`)
- Linear wizards: Show progress indicator instead of breadcrumbs (e.g., "Step 2 of 5")
- Admin screens: Always show breadcrumbs for audit trail clarity

---

## Section 11: Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-02 | Product Team (AI-assisted) | Initial route map for Tier 1 R0 launch (26 screens) |
| 2.0 | 2026-02-02 | Product Team (AI-assisted) | Updated for blocker resolutions (CB-001 through CB-006): Added dashboard, messaging, review routes. Total 30 screens. |

---

## Next Steps for Engineering Teams

### Frontend Team

1. **Route Configuration**: Use this route tree to configure React Router (or equivalent)
2. **Authentication Guards**: Implement authentication boundaries as route guards/middleware
3. **Role-Based Access Control**: Implement RBAC checks for role-specific routes
4. **Deep Link Handling**: Ensure all deep linkable routes handle authentication and ownership verification
5. **Navigation Components**: Build header/footer navigation components based on Section 8

### Backend Team

1. **API Route Alignment**: Ensure API endpoints align with frontend routes (e.g., `/api/bookings/:bookingId`)
2. **Access Control Middleware**: Implement RBAC and ownership verification for protected routes
3. **Deep Link Security**: Verify ownership/role before returning sensitive data for deep links

### QA Team

1. **Route Testing**: Test all 30 routes for accessibility and authentication boundaries
2. **Navigation Flow Testing**: Validate all user journeys (Section 2) work end-to-end
3. **Edge Case Testing**: Test authentication state mismatches (Section 7)
4. **Deep Link Testing**: Verify all email notification deep links work correctly

---

**Document References**:
- Source: `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`
- Source: `/docs/tiers/tier1/planning/r0-launch-scope.md`
- Source: `/docs/tiers/common/spec/feature-map.md`
- Source: `/docs/tiers/common/spec/state-maps.md`

---

**END OF DOCUMENT**
