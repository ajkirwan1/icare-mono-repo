# R1 Full MVP Screen Inventory (Tier 1)

**Document Purpose**: Define the complete screen inventory for Tier 1 MVP, building on R0 launch-critical screens.

**Document Owner**: Product Team
**Last Updated**: 2026-02-06
**Status**: Canonical - R1 Full MVP Definition

> **Relationship to R0**: R0 defines the 30 launch-critical screens (updated from 26 following CB decisions).
> R1 adds screens that improve UX but can be handled manually at low volume.
> R1 represents the complete Tier 1 MVP with **47 screens** (canonical count per tier1-route-map.md).
> See [r0-launch-scope.md](r0-launch-scope.md) for R0 screen definitions.

---

## Release Definitions

| Release | Screens | Purpose | Volume Target |
|---------|---------|---------|---------------|
| **R0** | 30 | Minimum viable launch (updated from 26 via CB decisions) | 5-50 bookings/month |
| **R1** | 47 | Full Tier 1 MVP (self-service, scalable) - canonical count per tier1-route-map.md | 50-500 bookings/month |
| **Tier 2** | TBD | Personal care services added | 500+ bookings/month |

---

## R1 Screen Inventory

### Summary

| Category | R0 Screens | R1 Additions | R1 Total |
|----------|------------|--------------|----------|
| Authentication | 6 | 0 | 6 |
| Public/Compliance | 4 | 2 | 6 |
| Care Receiver | 8 | 3 | 11 |
| Caregiver | 6 | 4 | 10 |
| Admin | 6 | 8 | 14 |
| **TOTAL** | **30** | **17** | **47** |

> **Note on CB Elevations**: The following screens were initially planned for R1 but elevated to R0 via Critical Blocker decisions:
> - **CB-001**: SCR-CR-001 (Care Receiver Dashboard) - elevated to R0
> - **CB-002**: SCR-CG-001 (Caregiver Dashboard) - elevated to R0
> - **CB-005**: SCR-CR-011, SCR-CR-012 (Messaging) - elevated to R0
> - **CB-006**: SCR-CR-015 (Leave Review) - elevated to R0
>
> These screens are documented in [r0-launch-scope.md](r0-launch-scope.md) and are **not** included in the R1 additions sections below.

> **Note**: R0 screen count updated from 26 to 30 following CB decisions (CB-001, CB-002, CB-005, CB-006).
> R1 total count of 47 is canonical per `/docs/product/tier1-route-map.md`.

---

## R1 Additional Screens (Beyond R0)

### Public Pages (2 screens)

#### SCR-PUB-002: How It Works - Families
**Route**: `/how-it-works/families`
**Why R1**: User acquisition and trust building
**R0 Workaround**: Homepage covers basics
**R1 Trigger**: Marketing team requests dedicated landing page

#### SCR-PUB-003: How It Works - Caregivers
**Route**: `/how-it-works/caregivers`
**Why R1**: Caregiver recruitment
**R0 Workaround**: Homepage covers basics
**R1 Trigger**: Caregiver recruitment push

---

### Care Receiver Screens (3 screens)

> **Note**: SCR-CR-001 (Dashboard), SCR-CR-011 (Message Inbox), SCR-CR-012 (Message Thread), and SCR-CR-015 (Leave Review) were elevated to R0 via CB decisions and are documented in r0-launch-scope.md.

#### SCR-CR-002: Care Needs Profile
**Route**: `/profile/care-needs`
**Why R1**: Saves care receiver from re-entering needs each booking
**R0 Workaround**: Needs captured in booking form each time
**R1 Trigger**: Repeat bookings exceed 50% of total bookings

**Profile Components**:
- Preferred services (companionship, housework, shopping, meals)
- Preferred times (morning, afternoon, evening)
- Special considerations (mobility aids, pets, access instructions)
- Emergency contact details

---

#### SCR-CR-009: Booking Cancellation
**Route**: `/bookings/:bookingId/cancel`
**Why R1**: Self-service cancellation with refund policy display
**R0 Workaround**: Admin processes cancellations via email/phone
**R1 Trigger**: >10 cancellation requests per month

**Cancellation Flow**:
- Refund policy display (>24h = full, <24h = 50%)
- Cancellation reason capture
- Confirmation screen
- Notification to caregiver

---

#### SCR-CR-017: Account Settings
**Route**: `/settings`
**Why R1**: Self-service account management
**R0 Workaround**: Support handles setting changes
**R1 Trigger**: >50 users (support burden)

**Settings Components**:
- Personal details (name, phone, email)
- Password change
- Notification preferences
- Payment methods management
- Delete account (GDPR)

---

### Caregiver Screens (4 screens)

> **Note**: SCR-CG-001 (Caregiver Dashboard) was elevated to R0 via CB-002 and is documented in r0-launch-scope.md.

#### SCR-CG-003: Profile Management
**Route**: `/caregiver/profile/edit`
**Why R1**: Self-service profile updates
**R0 Workaround**: Support handles profile edits
**R1 Trigger**: >20 active caregivers

**Editable Fields**:
- Bio
- Profile photo
- Hourly rate
- Service radius
- Services offered
- Availability calendar link

---

#### SCR-CG-011: Availability Calendar
**Route**: `/caregiver/availability`
**Why R1**: Visual availability management
**R0 Workaround**: Manual coordination via email
**R1 Trigger**: Caregivers with >5 bookings/month

**Calendar Components**:
- Weekly/monthly view
- Drag-to-select available slots
- Recurring availability patterns
- Blocked dates
- Booked slots (read-only)

---

#### SCR-CG-013: Booking Request Detail
**Route**: `/caregiver/bookings/:bookingId`
**Why R1**: Detailed request review before accept/decline
**R0 Workaround**: Included in R0 (essential for accept/decline)
**Note**: This is actually R0 but listed here for completeness

---

#### SCR-CG-015: Earnings Dashboard
**Route**: `/caregiver/earnings`
**Why R1**: Earnings visibility and payout tracking
**R0 Workaround**: Email notifications for payouts
**R1 Trigger**: Active caregivers request earnings visibility

**Earnings Components**:
- Total earnings (month, all-time)
- Pending payouts
- Completed payouts
- Booking earnings breakdown
- Download earnings report (CSV)

---

#### SCR-CG-016: Payout History
**Route**: `/caregiver/earnings/history`
**Why R1**: Historical payout records
**R0 Workaround**: Stripe dashboard
**R1 Trigger**: Tax season (caregivers need records)

**History Components**:
- Payout list (date, amount, status)
- Payout detail view
- Filter by date range
- Export for tax purposes

---

### Admin Screens (6 screens)

#### SCR-ADM-010: Booking Management
**Route**: `/admin/bookings`
**Why R1**: Booking oversight at scale
**R0 Workaround**: Spreadsheet tracking
**R1 Trigger**: >50 bookings/month

**Management Components**:
- Booking list (filterable by status, date, user)
- Booking detail view
- Status override (admin)
- Refund initiation
- Dispute flag

---

#### SCR-ADM-012: Dispute Queue
**Route**: `/admin/disputes`
**Why R1**: Structured dispute handling
**R0 Workaround**: Manual tracking (email, spreadsheet)
**R1 Trigger**: >5 disputes/month

**Dispute Components**:
- Dispute list (prioritized)
- Dispute detail view
- Evidence review
- Resolution workflow
- Refund decision

---

#### SCR-ADM-016: User Detail View
**Route**: `/admin/users/:userId`
**Why R1**: Comprehensive user profile for admin
**R0 Workaround**: Database queries
**R1 Trigger**: User management at scale

**Detail Components**:
- User profile data
- Verification status
- Booking history
- Review history
- Incident history
- Account actions (suspend, ban, delete)

---

#### SCR-ADM-019: Incident Reports
**Route**: `/admin/incidents`
**Why R1**: Structured incident logging
**R0 Workaround**: Manual logging (spreadsheet)
**R1 Trigger**: CQC readiness (audit trail requirement)

**Incident Components**:
- Incident list
- Incident detail view
- Category and severity
- Investigation notes
- Resolution tracking

---

#### SCR-ADM-020: Analytics Dashboard
**Route**: `/admin/analytics`
**Why R1**: Business intelligence
**R0 Workaround**: Manual reporting
**R1 Trigger**: Investor/board reporting needs

**Analytics Components**:
- Registration trends (care receivers, caregivers)
- Booking trends (volume, value)
- Revenue trends (GMV, commission)
- Geographic distribution
- Caregiver supply/demand

---

#### SCR-ADM-023: Audit Log
**Route**: `/admin/audit`
**Why R1**: Compliance audit trail
**R0 Workaround**: Database logs
**R1 Trigger**: GDPR/CQC compliance preparation

**Audit Components**:
- Action log (user, action, timestamp, details)
- Filter by action type, user, date
- Export for compliance review
- Data access log (GDPR)

---

## R1 Build Priorities

> **Note**: Priority 1 screens (Dashboards, Messaging, Reviews) were elevated to R0 via CB decisions and will be delivered in R0. The priorities below reflect the remaining R1-only screens.

### Priority 1: User Experience (Weeks 9-10)
1. SCR-CG-011: Availability Calendar
2. SCR-CR-002: Care Needs Profile
3. SCR-PUB-002 + SCR-PUB-003: How It Works pages

**Rationale**: These screens improve daily user experience and reduce support burden.

### Priority 2: Self-Service (Weeks 11-12)
4. SCR-CR-009: Booking Cancellation
5. SCR-CR-017: Account Settings
6. SCR-CG-003: Profile Management

**Rationale**: Enables users to manage their own accounts without support intervention.

### Priority 3: Admin Scale (Weeks 13-14)
9. SCR-ADM-010: Booking Management
10. SCR-ADM-012: Dispute Queue
11. SCR-ADM-016: User Detail View
12. SCR-ADM-019: Incident Reports

**Rationale**: Enables admin team to manage platform at scale.

### Priority 4: Compliance & Analytics (Weeks 15-16)
13. SCR-ADM-023: Audit Log
14. SCR-ADM-020: Analytics Dashboard
15. SCR-CG-015 + SCR-CG-016: Earnings
16. SCR-PUB-002 + SCR-PUB-003: How It Works pages

**Rationale**: Compliance preparation and business intelligence.

---

## R1 Success Metrics

**R1 is successful if**:
1. **Self-Service**: 90% of cancellations, reviews, and settings changes handled without support
2. **Messaging**: <5% of conversations require email fallback
3. **Admin Efficiency**: Admin can manage 500 bookings/month with same team size
4. **Compliance**: Full audit trail for GDPR/CQC review
5. **User Satisfaction**: NPS >50 for both care receivers and caregivers

---

## R0 → R1 Transition Triggers

| Metric | R0 Acceptable | R1 Required |
|--------|---------------|-------------|
| Monthly bookings | <50 | >50 |
| Active users | <100 | >100 |
| Support tickets/day | <10 | >10 |
| Cancellations/month | <10 | >10 |
| Reviews/month | <20 | >20 |

**Recommendation**: Begin R1 development during R0 soft launch. Target R1 completion before scaling marketing.

---

## Cross-Reference Documents

- [r0-launch-scope.md](r0-launch-scope.md) - R0 launch-critical screens (30)
- [build-sequence.md](build-sequence.md) - Development phases
- [launch-checklist.md](launch-checklist.md) - Launch readiness
- [/docs/ROADMAP.md](/docs/ROADMAP.md) - Tier definitions

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-01 | Product Team | Initial R1 scope definition |
| 1.1 | 2026-02-06 | Product Director | Reconciled screen counts: R0 updated to 30 (from 26), R1 updated to 47 (from ~45) to match tier1-route-map.md canonical count |
| 1.2 | 2026-02-07 | Product Director | **CB Elevation Reconciliation**: Removed screens elevated to R0 (SCR-CR-001, SCR-CG-001, SCR-CR-011/012, SCR-CR-015) from R1 additions sections and build priorities; added CB decision notes throughout document |

---

**END OF DOCUMENT**
