# Booking Flow Wireframes

**Directory Purpose**: ASCII wireframes and element inventories for the 3 core booking flow screens in Tier 1 (R0 scope).

**Created**: 2026-02-08
**Status**: ✅ READY FOR FIGMA HANDOFF

---

## Table of Contents

1. [Overview](#overview)
2. [Wireframe Documents](#wireframe-documents)
3. [Design System Integration](#design-system-integration)
4. [Shared Components](#shared-components)
5. [Key Design Decisions](#key-design-decisions)
6. [Next Steps](#next-steps)

---

## Overview

### Purpose

This directory contains comprehensive wireframes for the booking flow, which is the core user journey in the iCare platform. These 3 screens enable care receivers to request bookings and caregivers to accept/decline them, with full support for 14 booking states.

### Scope

**Tier 1 (R0)**: Companionship services only (no personal care)

**3 Screens**:
1. **SCR-CR-006**: Booking Request Form (Care Receiver creates booking)
2. **SCR-CR-008**: Booking Detail (Care Receiver views booking status)
3. **SCR-CG-013**: Booking Request Detail (Caregiver accepts/declines booking)

**Total Wireframe States**: 20+ variations across all screens (due to 14 booking states in SCR-CR-008)

---

## Wireframe Documents

### SCR-CR-006: Booking Request Form

**File**: `scr-cr-006-booking-request-form.md`

**Screen Purpose**: Enable care receivers to create a companionship booking request by specifying date, time, duration, and special requirements.

**Key Features**:
- Caregiver summary card (who you're booking)
- Date/time/duration selection with availability validation
- Real-time price calculation
- Emergency contact capture (pre-filled, editable)
- Cancellation policy acceptance
- Payment method check (warning banner if none on file)

**States Covered**:
- Form ready (payment method exists)
- Payment method missing (warning banner)
- Validation errors (inline error messages)
- Submitting (loading state)

**Desktop Wireframes**: 4 states
**Mobile Wireframes**: 1 state
**Total Pages**: 59 (includes 8 sections, extensive element inventory)

---

### SCR-CR-008: Booking Detail (Care Receiver View)

**File**: `scr-cr-008-booking-detail.md`

**Screen Purpose**: Display comprehensive booking information and enable status-dependent actions (cancel, confirm completion, dispute, leave review, message caregiver). **Most state-heavy screen in the system**.

**Key Features**:
- 14 distinct booking states with tailored UI
- Status badge + countdown timer (time-sensitive states)
- Alert banners with state-specific messages
- Payment breakdown with status-dependent text
- Caregiver contact details (conditional on acceptance)
- Emergency contact (prominent during in_progress state)
- Booking timeline (history of status changes)

**States Covered** (all 14 booking states):
1. **REQUESTED**: Awaiting caregiver response (24h countdown)
2. **ACCEPTED**: Booking confirmed
3. **IN_PROGRESS**: Session currently happening
4. **COMPLETED**: Awaiting confirmation or dispute (48h window)
5. **PAYMENT_RELEASED**: Payment sent to caregiver
6. **REVIEWED**: Review submitted
7. **DECLINED**: Caregiver declined
8. **EXPIRED**: 24h timeout, no response
9. **CANCELLED**: Either party cancelled
10. **DISPUTED**: Issue raised by care receiver
11. **NO_SHOW_CAREGIVER**: Caregiver no-show
12. **NO_SHOW_CARE_RECEIVER**: Care receiver no-show (admin-only)
13. **CANCELLED_BY_CAREGIVER**: Caregiver cancelled (tracked separately)
14. **DISPUTE_RESOLVED**: Dispute resolved by admin

**Desktop Wireframes**: 7 major states shown in detail
**Mobile Wireframes**: 1 state (REQUESTED)
**Total Pages**: 98 (includes all 14 state variations, extensive element inventory)

---

### SCR-CG-013: Booking Request Detail (Caregiver View)

**File**: `scr-cg-013-booking-request-detail.md`

**Screen Purpose**: Enable caregivers to review incoming booking requests and make accept/decline decisions within 24 hours. After acceptance, display confirmed booking details and earnings breakdown.

**Architecture Note**: Shares the same route (`/bookings/:bookingId`) and booking entity as SCR-CR-008, but renders different UI based on authenticated user role (care receiver vs caregiver).

**Key Features** (Caregiver-Specific):
- Earnings breakdown (net earnings after 15% platform commission)
- Care receiver privacy protection (limited info until acceptance)
- Accept/Decline buttons with 24h countdown
- Decline reason collection (dropdown + optional message)
- Mark Complete action (when session finished)
- Distance from caregiver displayed (travel consideration)

**States Covered**:
1. **PENDING**: Awaiting caregiver response (24h countdown)
2. **ACCEPTED**: Booking confirmed (care receiver contact details now visible)
3. **IN_PROGRESS**: Session currently happening
4. **COMPLETED**: Awaiting care receiver confirmation (48h window)
5. **PAYMENT_RELEASED**: Earnings released to caregiver
6. **DECLINED**: Caregiver declined request
7. **EXPIRED**: 24h timeout, auto-declined

**Desktop Wireframes**: 6 states
**Mobile Wireframes**: 1 state (PENDING)
**Total Pages**: 74 (includes caregiver-specific element inventory, earnings focus)

---

## Design System Integration

### Shared Components Used

These wireframes reuse components from `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md`:

| Component | Used In | Purpose |
|-----------|---------|---------|
| **NAV-HEADER-AUTH** | All 3 screens | Global navigation (care receiver and caregiver variants) |
| **FOOTER** | All 3 screens | Legal links and copyright |
| **STATUS-BADGE** | SCR-CR-008, SCR-CG-013 | Booking status indicators (14 variants) |
| **COUNTDOWN-TIMER** | SCR-CR-008, SCR-CG-013 | 24h response timer, 48h confirmation timer |
| **ALERT-BANNER** | All 3 screens | State-specific messages and primary CTAs |
| **BUTTON** | All 3 screens | Primary, secondary, destructive variants |
| **MODAL** | All 3 screens | Confirmation dialogs, success messages |
| **USER-AVATAR** | SCR-CR-008, SCR-CG-013 | Caregiver/care receiver profile photos |

### New Components Introduced

These wireframes define new components to be added to the design system:

| Component | Introduced In | Purpose |
|-----------|---------------|---------|
| **DATE-PICKER** | SCR-CR-006 | Calendar widget with availability highlighting |
| **PRICE-SUMMARY-CARD** | SCR-CR-006 | Real-time price calculation display |
| **CAREGIVER-SUMMARY-CARD** | SCR-CR-006 | Compact caregiver info for booking context |
| **BOOKING-DETAIL-CARD** | SCR-CR-008 | Comprehensive booking info display |
| **PAYMENT-SUMMARY** | SCR-CR-008 | Price breakdown with status-dependent text |
| **BOOKING-TIMELINE** | SCR-CR-008 | Chronological status change history |
| **EMERGENCY-CONTACT-BANNER** | SCR-CR-008 | Prominent emergency info display (in_progress state) |
| **EARNINGS-BREAKDOWN-CARD** | SCR-CG-013 | Caregiver net earnings with commission deduction |
| **CARE-RECEIVER-CARD** | SCR-CG-013 | Privacy-limited and full variants |
| **DECLINE-REASON-MODAL** | SCR-CG-013 | Collects decline reason + optional message |

---

## Key Design Decisions

### 1. Dashboard-First Design Production

These booking wireframes follow the **dashboard-first** production approach defined in `/docs/tiers/tier1/FIGMA_PRODUCTION_PLAN.md`:

- **Phase 0** (Current): Agent creates wireframes and component specs
- **Phase 1** (Next): Human designer creates low-fidelity mockups in Figma
- **Phase 2**: Human designer creates high-fidelity designs + establishes design system
- **Rationale**: Booking screens (especially SCR-CR-008) contain a wide variety of UI components (booking cards, status badges, countdown timers, alert banners, modals). Components designed for booking flow will be reused across all other screens.

### 2. Role-Based Conditional Rendering

**Decision (CB-002 - 2026-02-02)**: SCR-CR-008 (care receiver view) and SCR-CG-013 (caregiver view) share the SAME booking entity and route (`/bookings/:bookingId`) but render different UI based on authenticated user role.

**Implementation**:
- Single route: `/bookings/:bookingId`
- Single data source: `bookings` table
- Role detection: `req.user.role` (care_receiver vs caregiver)
- Conditional rendering:
  - Care receiver sees: Cancel, Confirm Completion, Dispute, Leave Review, Total charge
  - Caregiver sees: Accept, Decline, Mark Complete, Net earnings

**Benefits**:
- Reduces code duplication
- Single source of truth for booking data
- Easier state synchronization (both parties see same status)

### 3. State-Driven Design

**SCR-CR-008 Complexity**: 14 distinct booking states require tailored UI for each state.

**Design Approach**:
- Status badge always prominent (immediate context)
- Alert banner provides state-specific messages and primary CTAs
- Actions change per state (prevent invalid actions)
- Payment status text adapts to state (authorized → charged → pending release → released)

**Quality Assurance**: All 14 states documented with ASCII wireframes and element inventories to ensure comprehensive Figma handoff.

### 4. Elderly-Friendly Accessibility

**Minimum Standards** (applied to all 3 screens):
- Touch targets: **48x48px minimum** (WCAG AAA)
- Primary buttons: **56px height**
- Font sizes: **16px minimum body**, 18px+ for CTAs
- Color contrast: **4.5:1** for normal text, 3.0:1 for large text
- Status indicators: Text + icon + color (not color alone)
- Clear focus indicators: **3px solid border**
- No hover-only interactions
- No time pressure (countdown timers inform, don't auto-navigate)

**Trust-Building**:
- Real-time price calculation (no hidden fees)
- Cancellation policy displayed before submission
- Payment status always visible
- Emergency contact prominent during active bookings
- Refund amounts and timelines clearly stated

### 5. Commission & Pricing Transparency

**Care Receiver View** (SCR-CR-006, SCR-CR-008):
- Total charge: Subtotal (hourly rate × duration) + Platform service fee (15%)
- Example: £72.00 + £10.80 = **£75.60 total**

**Caregiver View** (SCR-CG-013):
- Net earnings: Subtotal - Platform commission (15%)
- Example: £72.00 - £10.80 = **£61.20 net**

**Platform Revenue**: Service fee (£10.80) + Commission (£10.80) = £14.40 per 4-hour booking

**Placeholder Status**: 15% commission rate is placeholder, subject to FDR-008 final decision (Decision CB-003 - 2026-02-02).

---

## Next Steps

### For Figma Designer

1. **Read Wireframe Documents**:
   - Start with `scr-cr-006-booking-request-form.md` (simplest screen)
   - Then `scr-cg-013-booking-request-detail.md` (caregiver perspective)
   - Finally `scr-cr-008-booking-detail.md` (most complex, 14 states)

2. **Create Low-Fidelity Mockups** (Phase 1):
   - Grayscale, minimal color
   - Focus on layout, spacing, hierarchy
   - Use placeholder text and images
   - Establish component structure
   - **Priority**: SCR-CR-008 (most components) → SCR-CG-013 → SCR-CR-006

3. **Create High-Fidelity Designs** (Phase 2):
   - Apply brand colors (sage green, terracotta, off-white)
   - Apply typography (Montserrat, Lora, Poppins)
   - Add real imagery (caregiver photos, icons)
   - Refine spacing and alignment
   - Create interactive prototype (Figma prototyping)

4. **Establish Design System** (Phase 2):
   - Extract components from booking screens
   - Create Figma component library:
     - Status badges (14 variants)
     - Countdown timer (with warning states)
     - Alert banners (success, warning, error, info)
     - Buttons (primary, secondary, destructive)
     - Modals (confirmation, success, error)
     - Booking cards
     - Price summaries
   - Define design tokens:
     - Color palette
     - Typography scale
     - Spacing scale
     - Border radii
     - Shadows
   - Document component usage guidelines

5. **User Testing**:
   - Test with elderly care receivers (65+)
   - Test with caregivers (varied age range)
   - Focus on:
     - Can users complete booking request form?
     - Are status badges clear? (14 states)
     - Do countdown timers create anxiety or urgency?
     - Are actions easy to find?
     - Is pricing breakdown understandable?
   - Iterate based on feedback

### For Engineering

1. **Review Wireframes for Feasibility**:
   - Date picker with availability highlighting (API requirement)
   - Real-time price calculation (client-side or server-side?)
   - Countdown timer updates (WebSocket or polling?)
   - Role-based conditional rendering (frontend logic)

2. **API Requirements**:
   - `GET /caregivers/:id/availability` - Available dates for date picker
   - `POST /bookings` - Create booking request with payment authorization
   - `PUT /bookings/:id/accept` - Caregiver accepts booking
   - `PUT /bookings/:id/decline` - Caregiver declines booking with reason
   - `PUT /bookings/:id/complete` - Caregiver marks complete
   - `PUT /bookings/:id/confirm` - Care receiver confirms completion
   - `POST /bookings/:id/dispute` - Care receiver raises dispute

3. **State Machine Implementation**:
   - Validate state transitions (requested → accepted → in_progress → completed → payment_released)
   - Prevent invalid transitions (e.g., cannot go from completed to requested)
   - Automated transitions (expired after 24h, payment_released after 48h)

4. **Component Development**:
   - Reusable Status Badge component (14 variants)
   - Countdown Timer component (with threshold warnings)
   - Alert Banner component (4 severity variants)
   - Date Picker component (with availability API integration)
   - Price Summary component (real-time calculation)

---

## Related Documents

**Source Documents**:
- `/docs/product/tier1-route-map.md` - Screen definitions (SCR-CR-006, SCR-CR-008, SCR-CG-013)
- `/docs/product/features/tier1-booking-specification.md` - All 14 booking states, state transitions, business rules
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - Screen details and data requirements
- `/docs/tiers/tier1/draft-design-specs/user-flows/care-receiver-first-booking.md` - User flow context (steps 16-28)

**Component Specifications**:
- `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md` - Reusable components

**Design System**:
- `/docs/tiers/tier1/FIGMA_PRODUCTION_PLAN.md` - Dashboard-first design plan, component priorities
- `/packages/ICare/app/styles/_tokens.scss` - Existing design tokens (colors, typography, spacing)

**Planning**:
- `/docs/tiers/tier1/planning/r0-launch-scope.md` - R0 screen inclusions

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-08 | UX Designer | Initial README for booking wireframes directory |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF

**Total Wireframe Pages**: 231 (59 + 98 + 74)
**Total States Documented**: 20+ variations
**Components Defined**: 18 (8 reused, 10 new)
**Accessibility Compliance**: WCAG 2.1 AA throughout
