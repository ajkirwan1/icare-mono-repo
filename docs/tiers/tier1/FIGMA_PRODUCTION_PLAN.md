# Figma Production Plan: Tier 1 Design System and Mockups

**Document Purpose**: Step-by-step production plan to create Figma mockups for the Tier 1 UK elderly care marketplace.

**Document Owner**: Product Director
**Created**: 2026-02-06
**Last Updated**: 2026-02-06
**Status**: APPROVED FOR EXECUTION

---

## Executive Summary

This plan follows a **dashboard-first** approach to Figma design production:

1. **Low-fidelity dashboards first** - All 3 dashboards (Care Receiver, Caregiver, Admin) as wireframes
2. **High-fidelity dashboards** - Establish design system (colors, tokens, typography) from dashboard designs
3. **Low-fidelity remaining screens** - Apply design system to all other screens
4. **High-fidelity remaining screens** - Complete production-ready designs

**Key Principle**: The design system emerges from the dashboard designs, then propagates to all other screens. Dashboards contain the widest variety of components (cards, lists, metrics, navigation, actions) making them ideal for establishing the design language.

**Strategic Rationale for Dashboard-First**:
- Dashboards are the "home base" for all user types - highest frequency screens
- Dashboards contain the most diverse set of UI components
- Dashboard components (booking cards, status badges, action buttons) reuse across other screens
- Early dashboard design validates navigation patterns and information hierarchy

---

## Dashboard Focus: The Three Core Dashboards

### Dashboard 1: Care Receiver Dashboard (SCR-CR-001)

**Route**: `/dashboard`
**User Roles**: Care Receiver, Family Member
**Priority**: CRITICAL - Primary landing page for care seekers

#### Content from Specifications

**Key Display Elements**:
- **Upcoming Bookings Widget** (next 7 days):
  - Booking cards showing: Caregiver photo, name, date/time, status, "View Details" button
  - Next booking displayed prominently with countdown ("in 2 days")
- **Pending Requests Widget**:
  - Booking request cards with countdown timer ("18 hours remaining for caregiver response")
- **Quick Actions Section**:
  - "Find Caregivers" button (prominent)
  - "Manage Payment Methods" link
  - "Account Settings" link
- **Empty State**: Welcome message, "Find Caregivers" CTA, onboarding checklist if incomplete

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Empty | No bookings yet | Welcome message, "Find Caregivers" CTA, onboarding checklist |
| Active Bookings | Upcoming or in-progress bookings | Booking cards sorted by date (soonest first) |
| Pending Requests | Awaiting caregiver response | "Pending Requests" section with countdown timers |

**Navigation Exits**:
- "Find Caregivers" -> SCR-CR-003 (Search)
- "View Details" on booking -> SCR-CR-008 (Booking Detail)
- "Manage Payment Methods" -> SCR-CR-013 (Payment Methods)

---

### Dashboard 2: Caregiver Dashboard (SCR-CG-001)

**Route**: `/caregiver/dashboard`
**User Roles**: Caregiver
**Priority**: CRITICAL - Primary landing page for caregivers

#### Content from Specifications

**Key Display Elements**:
- **Pending Requests Widget** (URGENT - top priority):
  - Booking request cards with: Care receiver name, date/time, earnings, countdown timer, "View Details"
  - Countdown timers showing response deadline ("20 hours remaining")
- **Upcoming Bookings Widget** (next 7 days):
  - Booking cards with: Care receiver name, date/time, location, "View Details"
  - Next booking displayed prominently ("in 1 day")
- **Earnings Summary**:
  - Total earnings (this month)
  - Pending payouts (awaiting booking completion)
  - "View Full Earnings" link
- **Profile Status**:
  - Verification badges (Identity, Right to Work, DBS if applicable)
  - Profile completion percentage
  - "Update Profile" link

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Pending Verification | Not yet verified | Large banner: "Profile under admin review" |
| Active (No Requests) | Verified but no booking requests | Welcome message, "Update Availability" CTA |
| Pending Requests | Requests awaiting response | "Pending Requests" section at top with countdown timers |
| Upcoming Bookings | Confirmed bookings in next 7 days | Booking cards sorted by date |

**Navigation Exits**:
- "View Details" on request -> SCR-CG-013 (Booking Request Detail)
- "View Details" on booking -> SCR-CR-008 (Booking Detail, role-based view)
- "View Full Earnings" -> SCR-CG-015 (Earnings Dashboard)
- "Update Profile" -> SCR-CG-003 (Profile Management)

---

### Dashboard 3: Admin Dashboard (SCR-ADM-001)

**Route**: `/admin`
**User Roles**: Admin, Safeguarding Officer
**Priority**: CRITICAL - Operational command center

#### Content from Specifications

**Key Display Elements**:
- **Urgent Alerts Banner** (red, if present):
  - Safeguarding reports (critical or high severity)
  - Account suspension appeals
  - Payment disputes
- **Task Summary Cards**:
  - "Caregiver Verifications": Count of pending -> Link to SCR-ADM-005
  - "Safeguarding Reports": Count of pending -> Link to SCR-ADM-014
  - "Booking Disputes": Count of pending (future feature)
  - "Review Moderation": Count of pending (future feature)
- **Platform Metrics** (summary):
  - Total users (care receivers, caregivers)
  - Bookings this month
  - Revenue this month
  - Average caregiver acceptance rate
  - Safeguarding incidents this month
- **Recent Activity Feed** (last 24 hours):
  - New caregiver registrations
  - Completed bookings
  - New safeguarding reports

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Display | Dashboard loaded | Task cards sorted by urgency |
| Urgent Alerts | Safeguarding/critical issues | Red alert banner at top |
| Low Activity | No pending tasks | Green "All clear" message, summary stats only |

**Navigation Exits**:
- "Caregiver Verifications" card -> SCR-ADM-005 (Application Review Queue)
- "Safeguarding Reports" card -> SCR-ADM-014 (Safeguarding Reports Queue)
- "View All Users" -> User management (future)
- "View All Bookings" -> Booking oversight (future)

---

## Current State Assessment

### What EXISTS (Ready for Dashboard Design)

| Artifact | Location | Status |
|----------|----------|--------|
| Screen Inventory (all dashboards) | `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` | COMPLETE - SCR-CR-001, SCR-CG-001, SCR-ADM-001 documented |
| Route Map | `/docs/product/tier1-route-map.md` | COMPLETE - Full navigation hierarchy |
| Admin Specification | `/docs/product/features/tier1-admin-specification.md` | COMPLETE - Admin dashboard layout, metrics, widgets |
| Booking Specification | `/docs/product/features/tier1-booking-specification.md` | COMPLETE - Booking states, display requirements |
| Design Tokens (Code) | `/packages/ICare/app/styles/_tokens.scss` | EXISTS - 264 lines of SCSS tokens |
| User Flows | `/docs/tiers/tier1/draft-design-specs/user-flows/` | COMPLETE - 5 core flows |

### What is MISSING (Must Create Before/During Design)

| Artifact | Owner | Priority | Blocks |
|----------|-------|----------|--------|
| Dashboard Wireframes (3 screens) | elderly-care-ux-ui-designer | CRITICAL | Low-fi mockups |
| Dashboard Component Inventory | elderly-care-ux-ui-designer | HIGH | Hi-fi design |
| Booking Card Component Spec | elderly-care-ux-ui-designer | HIGH | All dashboards |
| Status Badge Definitions | elderly-care-ux-ui-designer | HIGH | All dashboards |
| Metric Card Component Spec | elderly-care-ux-ui-designer | HIGH | Admin dashboard |
| Accessibility Requirements | elderly-care-ux-ui-designer | HIGH | Hi-fi design |

### Existing Design Tokens (from `_tokens.scss`)

The codebase already has design tokens that should inform the Figma design system:

**Colors**:
- Primary: `#ffffff`
- Secondary: `rgb(176 196 127)` - Soft sage green
- Tertiary: `rgb(231, 153, 97)` - Warm terracotta
- Background: `#f7f7f2` - Warm off-white
- Text: `#0f172a` - Dark slate
- Muted: `rgba(15, 23, 42, 0.72)`

**Typography**:
- Hero title: 2.4rem, line-height 1.25
- H2: clamp(1.85rem, 2.8vw, 2.25rem)
- Body: 1.05rem, line-height 1.6
- Weights: 300-900 scale

**Spacing**:
- Section padding: clamp(4.8rem, 6.2vw, 6.4rem)
- Grid gap: clamp(26px, 3.4vw, 52px)
- Card wrap: clamp(1.25rem, 4vw, 3rem)

**Radii**: 12px (sm), 18px (lg), 22px (xxl), 999px (pill)

---

## Phase 0: Prerequisites (Before Figma Work Begins)

**Duration**: 1-2 days
**Owner**: Agents + Human review

### 0.1 Compile Dashboard Design Briefs

**Agent**: elderly-care-ux-ui-designer
**Inputs**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` (SCR-CR-001, SCR-CG-001, SCR-ADM-001)
- `/docs/product/tier1-route-map.md` (dashboard routes and navigation)
- `/docs/product/features/tier1-admin-specification.md` (admin dashboard details)
- `/docs/product/features/tier1-booking-specification.md` (booking widgets)
- `/packages/ICare/app/styles/_tokens.scss` (existing tokens)

**Outputs**:
- `/docs/tiers/tier1/spec/wireframes/SCR-CR-001-care-receiver-dashboard.md` (ASCII wireframe)
- `/docs/tiers/tier1/spec/wireframes/SCR-CG-001-caregiver-dashboard.md` (ASCII wireframe)
- `/docs/tiers/tier1/spec/wireframes/SCR-ADM-001-admin-dashboard.md` (ASCII wireframe)
- `/docs/tiers/tier1/spec/screens/SCR-CR-001-care-receiver-dashboard.md` (element inventory)
- `/docs/tiers/tier1/spec/screens/SCR-CG-001-caregiver-dashboard.md` (element inventory)
- `/docs/tiers/tier1/spec/screens/SCR-ADM-001-admin-dashboard.md` (element inventory)

**Deliverables for Human Designer**:
1. Section-by-section content blocks with hierarchy for each dashboard
2. Element inventory (widgets, cards, metrics, actions)
3. ASCII wireframes showing layout structure
4. Mobile, tablet, desktop layout variations
5. Key interaction points (CTAs, status changes, navigation)
6. Accessibility notes (focus order, landmarks)

### 0.2 Define Shared Dashboard Components

**Agent**: elderly-care-ux-ui-designer
**Goal**: Document reusable components across all 3 dashboards

**Shared Components to Define**:
1. **Booking Card Component** - Used in CR and CG dashboards
   - Caregiver/Care Receiver photo
   - Name, date/time, status badge
   - Action buttons (View Details, Cancel, etc.)
   - Countdown timer (for pending requests)
2. **Status Badge Component** - Used everywhere
   - Booking statuses: Requested, Accepted, In Progress, Completed, Cancelled, Disputed
   - Verification statuses: Pending, Verified, Rejected
3. **Metric Card Component** - Admin dashboard
   - Title, value, change indicator, link
4. **Alert Banner Component** - All dashboards
   - Urgency levels: Info, Warning, Error/Critical
5. **Quick Actions Component** - All dashboards
   - Action buttons with icons
6. **Navigation Header** - All authenticated screens
   - Logo, user menu, notifications

**Output**: `/docs/tiers/tier1/spec/components/dashboard-components.md`

### 0.3 Define Figma File Structure

**Human Designer Setup**:

```
iCare Figma Project
+-- 0. Cover
+-- 1. Design System
|   +-- Colors
|   +-- Typography
|   +-- Spacing & Grid
|   +-- Icons
|   +-- Components
|       +-- Booking Card
|       +-- Status Badge
|       +-- Metric Card
|       +-- Alert Banner
|       +-- Navigation
+-- 2. Wireframes
|   +-- Dashboards (Phase 1)
|   |   +-- Care Receiver Dashboard
|   |   +-- Caregiver Dashboard
|   |   +-- Admin Dashboard
|   +-- [Other Screens] (Phase 3)
+-- 3. High-Fidelity Designs
|   +-- Dashboards (Phase 2)
|   +-- Authentication
|   +-- Care Receiver Flows
|   +-- Caregiver Flows
|   +-- Admin
+-- 4. Prototypes
```

---

## Phase 1: Dashboard Low-Fidelity Mockups

**Duration**: 3-4 days
**Owner**: Human Designer (with agent-provided specs)

### 1.1 Agent Preparation (Day 1)

**Job 1: Care Receiver Dashboard Wireframe**
- Agent: elderly-care-ux-ui-designer
- Goal: Create ASCII wireframe + element inventory for SCR-CR-001
- Inputs:
  - `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` (SCR-CR-001 section)
  - `/docs/product/features/tier1-booking-specification.md` (booking card content)
- Outputs:
  - `/docs/tiers/tier1/spec/wireframes/SCR-CR-001-care-receiver-dashboard.md`
  - `/docs/tiers/tier1/spec/screens/SCR-CR-001-care-receiver-dashboard.md`

**Job 2: Caregiver Dashboard Wireframe**
- Agent: elderly-care-ux-ui-designer
- Goal: Create ASCII wireframe + element inventory for SCR-CG-001
- Inputs:
  - `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` (SCR-CG-001 section)
  - `/docs/product/features/tier1-booking-specification.md` (booking request content)
- Outputs:
  - `/docs/tiers/tier1/spec/wireframes/SCR-CG-001-caregiver-dashboard.md`
  - `/docs/tiers/tier1/spec/screens/SCR-CG-001-caregiver-dashboard.md`

**Job 3: Admin Dashboard Wireframe**
- Agent: elderly-care-ux-ui-designer
- Goal: Create ASCII wireframe + element inventory for SCR-ADM-001
- Inputs:
  - `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` (SCR-ADM-001 section)
  - `/docs/product/features/tier1-admin-specification.md` (dashboard layout, metrics)
- Outputs:
  - `/docs/tiers/tier1/spec/wireframes/SCR-ADM-001-admin-dashboard.md`
  - `/docs/tiers/tier1/spec/screens/SCR-ADM-001-admin-dashboard.md`

**Job 4: Shared Component Definitions**
- Agent: elderly-care-ux-ui-designer
- Goal: Document booking card, status badge, metric card, navigation components
- Outputs:
  - `/docs/tiers/tier1/spec/components/dashboard-components.md`

### 1.2 Human Designer Work (Days 2-4)

**Deliverables**:

1. **Care Receiver Dashboard Low-Fi (Desktop, Tablet, Mobile)**
   - Grayscale/wireframe style
   - All widgets with placeholder content
   - Empty state variation
   - Active bookings variation
   - Pending requests variation

2. **Caregiver Dashboard Low-Fi (Desktop, Tablet, Mobile)**
   - All states: Pending verification, No requests, Pending requests, Upcoming bookings
   - Earnings summary widget
   - Profile status widget

3. **Admin Dashboard Low-Fi (Desktop, Tablet, Mobile)**
   - Urgent alerts banner
   - Task summary cards
   - Platform metrics section
   - Recent activity feed

### 1.3 Review Checkpoint

**Stakeholder Review**:
- [ ] Information hierarchy correct for each user type?
- [ ] Urgent items (pending requests, alerts) sufficiently prominent?
- [ ] Navigation patterns consistent across dashboards?
- [ ] Mobile experience suitable for elderly users?
- [ ] Empty states guide users to next action?

**Approval Required Before Phase 2**

---

## Phase 2: Dashboard High-Fidelity + Design System

**Duration**: 5-7 days
**Owner**: Human Designer (creates design system from dashboards)

### 2.1 Agent Preparation (Day 1)

**Job 5: Dashboard Component Inventory**
- Agent: elderly-care-ux-ui-designer
- Goal: Document all UI components extracted from dashboard designs
- Inputs:
  - Phase 1 wireframes
  - Screen inventory
- Outputs:
  - `/docs/tiers/tier1/spec/components.md`

**Job 6: Accessibility Requirements**
- Agent: elderly-care-ux-ui-designer
- Goal: Document WCAG 2.1 AA requirements for dashboards
- Focus areas:
  - Touch target sizes (48px minimum for elderly users)
  - Color contrast (4.5:1 minimum)
  - Focus indicators
  - Screen reader landmarks
- Outputs:
  - `/docs/tiers/tier1/spec/accessibility.md`

**Job 7: Design Tokens Specification**
- Agent: elderly-care-ux-ui-designer
- Goal: Formalize existing tokens for Figma design system
- Inputs:
  - `/packages/ICare/app/styles/_tokens.scss`
- Outputs:
  - `/docs/tiers/tier1/spec/design-tokens.md`

### 2.2 Human Designer Work (Days 2-7)

**Design System Establishment**:

The dashboard designs will establish the following system:

#### 2.2.1 Color Palette
- Primary brand color
- Secondary accent color
- Semantic colors (success, error, warning, info)
- Background colors (light, dark, card)
- Text colors (primary, secondary, muted, inverse)
- Status colors (for booking/verification badges)
- Focus/hover states

**Starting Point** (from existing tokens):
```
Background: #f7f7f2 (warm off-white)
Secondary: rgb(176, 196, 127) (sage green)
Tertiary: rgb(231, 153, 97) (terracotta)
Text: #0f172a (dark slate)
```

#### 2.2.2 Typography Scale
- H1: Dashboard titles
- H2: Section/widget titles
- H3: Card titles
- H4: Subsection titles
- Body: Paragraph text (16px minimum for accessibility)
- Body Small: Secondary text, metadata
- Caption: Labels, timestamps
- Button: CTA text

**Accessibility Requirement**: Body text minimum 16px, primary actions 20px+

#### 2.2.3 Spacing System
- 4px base unit
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Widget padding
- Card padding
- Form field spacing

#### 2.2.4 Grid System
- 12-column grid
- Gutter width
- Margins (mobile, tablet, desktop)
- Max content width

#### 2.2.5 Border Radius
- Small (buttons, inputs): 12px
- Medium (cards): 18px
- Large (modals): 22-24px
- Pill (badges, tags): 999px

#### 2.2.6 Shadow System
- Subtle (cards at rest)
- Medium (cards on hover)
- Strong (modals, dropdowns)

### 2.3 Dashboard High-Fidelity Deliverables

1. **Care Receiver Dashboard Hi-Fi (Desktop, Tablet, Mobile)**
   - All states (empty, active, pending)
   - Full visual design with real content

2. **Caregiver Dashboard Hi-Fi (Desktop, Tablet, Mobile)**
   - All states (pending verification, active, pending requests)
   - Earnings widget fully designed

3. **Admin Dashboard Hi-Fi (Desktop, Tablet, Mobile)**
   - All states (urgent alerts, normal, low activity)
   - Metric cards and activity feed fully designed

4. **Component Library Page** - Extracted from dashboards:
   - Booking Card (multiple states)
   - Status Badges (all statuses)
   - Metric Card (with variations)
   - Alert Banner (info, warning, error)
   - Quick Actions buttons
   - Navigation Header
   - Navigation Sidebar (Admin)
   - Countdown Timer component

### 2.4 Design System Documentation

**Human Designer Outputs**:
1. Figma styles (colors, typography, effects)
2. Figma variables (spacing, radii, breakpoints)
3. Component library with variants and states
4. Usage guidelines annotations

### 2.5 Review Checkpoint

**Design System Review**:
- [ ] Colors pass WCAG contrast requirements?
- [ ] Typography hierarchy clear?
- [ ] Touch targets 48px minimum?
- [ ] Components have all states (default, hover, active, disabled, error)?
- [ ] Responsive behavior defined?
- [ ] Booking card reusable across dashboards?
- [ ] Status badges consistent?

**Approval Required Before Phase 3**

---

## Phase 3: Remaining Screens Low-Fidelity

**Duration**: 5-7 days
**Owner**: Human Designer (with agent-provided wireframes)

### 3.1 Agent Preparation (Days 1-3)

**Job 8: Generate Wireframes for All Remaining Screens**
- Agent: elderly-care-ux-ui-designer
- Goal: Create ASCII wireframes for remaining 27 screens (30 total minus 3 dashboards)
- Inputs:
  - `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`
  - `/docs/product/tier1-route-map.md`
  - Feature specifications
- Outputs:
  - `/docs/tiers/tier1/spec/wireframes/` (one file per screen)

**Job 9: Element Inventories for All Screens**
- Agent: elderly-care-ux-ui-designer
- Goal: Document elements for each screen
- Outputs:
  - `/docs/tiers/tier1/spec/screens/` (one file per screen)

**Job 10: UI States Specification**
- Agent: elderly-care-ux-ui-designer
- Goal: Define loading, empty, error, success states for all screens
- Outputs:
  - `/docs/tiers/tier1/spec/ui-states.md`

### 3.2 Screen Groupings for Design

**Group A: Authentication & Registration (6 screens)** - Priority 1
- SCR-AUTH-001: Care Receiver Registration
- SCR-AUTH-002: Family Member Registration
- SCR-AUTH-003: Caregiver Registration
- SCR-AUTH-004: Phone Verification
- SCR-AUTH-005: Login
- SCR-AUTH-006: Password Reset

**Group B: Public & Compliance (4 screens)** - Priority 1
- SCR-PUB-001: Homepage
- SCR-PUB-006: Terms of Service
- SCR-PUB-007: Privacy Policy
- SCR-PUB-008: Safeguarding Policy

**Group C: Search & Discovery (2 screens)** - Priority 1
- SCR-CR-003: Caregiver Search
- SCR-CR-005: Caregiver Profile

**Group D: Booking Flow (3 screens)** - Priority 1
- SCR-CR-006: Booking Request Form
- SCR-CR-008: Booking Detail
- SCR-CG-013: Booking Request Detail (Caregiver View)

**Group E: Payment (2 screens)** - Priority 1
- SCR-CR-013: Payment Methods
- SCR-CG-020: Payout Setup (Stripe Connect)

**Group F: Caregiver Onboarding (4 screens)** - Priority 2
- SCR-CG-002: Caregiver Onboarding
- SCR-CG-008: Identity Verification
- SCR-CG-009: Right to Work Verification
- SCR-CG-010: DBS Check Submission

**Group G: Admin Flows (5 screens)** - Priority 2
- SCR-ADM-005: Caregiver Application Review
- SCR-ADM-007: Verification Review
- SCR-ADM-008: DBS Review
- SCR-ADM-014: Safeguarding Reports Queue
- SCR-ADM-015: Safeguarding Report Detail

**Group H: Messaging (2 screens)** - Priority 3
- SCR-CR-011: Message Inbox
- SCR-CR-012: Message Thread

### 3.3 Human Designer Work (Days 4-7)

**Per Screen Group Deliverables**:
- Low-fi wireframes (grayscale, using established patterns from dashboards)
- Annotations for unique interactions
- Notes on reuse of dashboard components

### 3.4 Review Checkpoint

**Low-Fi Review per Group**:
- [ ] All required elements present?
- [ ] User flows make sense?
- [ ] Consistent with design system patterns established in dashboards?
- [ ] Accessibility considerations noted?

---

## Phase 4: Remaining Screens High-Fidelity

**Duration**: 10-15 days
**Owner**: Human Designer

### 4.1 Execution Order

Based on development priority and dependency:

| Week | Screen Group | Screen Count | Notes |
|------|--------------|--------------|-------|
| Week 1 | Authentication | 6 | Critical path, reuses dashboard nav |
| Week 1 | Public/Compliance | 4 | Homepage establishes marketing design |
| Week 2 | Search & Discovery | 2 | Core user journey |
| Week 2 | Booking Flow | 3 | Reuses booking card from dashboards |
| Week 2 | Payment | 2 | Stripe integration |
| Week 3 | Caregiver Onboarding | 4 | Multi-step flow |
| Week 3 | Admin Flows | 5 | Reuses admin dashboard components |
| Week 4 | Messaging | 2 | Lower priority |

### 4.2 Deliverables Per Screen

For each screen, produce:
1. Desktop design (full fidelity)
2. Mobile design (full fidelity)
3. All states (default, loading, empty, error, success)
4. Annotations for developers
5. Component instances linked to library (reusing dashboard components)

### 4.3 Final Review

**Complete Design Audit**:
- [ ] All 30 screens designed
- [ ] All states covered
- [ ] Responsive variants complete
- [ ] Component library comprehensive
- [ ] Developer handoff notes complete
- [ ] Accessibility annotations included
- [ ] Dashboard components properly reused

---

## Agent Tasks vs Human Designer Tasks

### Agent Responsibilities (Before/During Design)

| Task | Agent | Deliverable |
|------|-------|-------------|
| Dashboard wireframes (3) | elderly-care-ux-ui-designer | ASCII wireframes, element inventories |
| Dashboard component specs | elderly-care-ux-ui-designer | Booking card, status badge, metric card specs |
| Remaining screen wireframes | elderly-care-ux-ui-designer | ASCII wireframes for 27 screens |
| Accessibility requirements | elderly-care-ux-ui-designer | WCAG 2.1 AA checklist per screen |
| UI states specification | elderly-care-ux-ui-designer | Loading, empty, error, success states |
| Design tokens formalization | elderly-care-ux-ui-designer | Token documentation from SCSS |
| Navigation patterns | elderly-care-ux-ui-designer | Header, sidebar, nav specs |

### Human Designer Responsibilities

| Task | Phase | Deliverable |
|------|-------|-------------|
| Low-fi dashboard mockups (3) | 1 | Figma wireframes |
| Hi-fi dashboards + design system | 2 | Figma design + styles/variables |
| Component library creation | 2 | Figma component library |
| Low-fi remaining screens | 3 | Figma wireframes |
| Hi-fi remaining screens | 4 | Full Figma designs |
| Developer handoff prep | 4 | Annotations, assets export |

### Collaboration Points

| Checkpoint | Agent Input | Designer Output | Decision Maker |
|------------|-------------|-----------------|----------------|
| Phase 0 Complete | Dashboard wireframes, specs | N/A | Product Director |
| Phase 1 Review | Feedback on low-fi dashboards | Revised wireframes | Stakeholders |
| Phase 2 Review | Accessibility audit | Design system from dashboards | Product Director |
| Phase 3 Review | State specifications | Low-fi screens | Stakeholders |
| Phase 4 Final | Compliance check | Hi-fi designs | Product Director |

---

## Estimated Timeline

| Phase | Duration | Dependencies | Milestone |
|-------|----------|--------------|-----------|
| Phase 0: Prerequisites | 1-2 days | Content/spec sign-off | Dashboard wireframes ready |
| Phase 1: Dashboard Low-Fi | 3-4 days | Phase 0 | All 3 dashboards low-fi approved |
| Phase 2: Dashboard Hi-Fi + Design System | 5-7 days | Phase 1 | Design system established from dashboards |
| Phase 3: Remaining Screens Low-Fi | 5-7 days | Phase 2 | All wireframes approved |
| Phase 4: Remaining Screens Hi-Fi | 10-15 days | Phase 3 | All designs complete |

**Total Duration**: 24-35 days (approximately 5-7 weeks)

### Parallel Work Opportunities

- Agent wireframe generation can continue during human design work
- Dashboard component documentation can happen during Phase 1
- Remaining screen wireframes can begin during Phase 2

---

## Blockers to Address Now

### Immediate Blockers (Must Resolve Before Phase 1)

| Blocker | Status | Owner | Resolution |
|---------|--------|-------|------------|
| Dashboard wireframes not created | NOT STARTED | elderly-care-ux-ui-designer | Run Jobs 1-4 |
| Dashboard component specs not created | NOT STARTED | elderly-care-ux-ui-designer | Run Job 4 |
| Design tokens not formalized | NOT DONE | elderly-care-ux-ui-designer | Run Job 7 |

### Pending Decisions (Can Proceed with Placeholders)

| Decision | Status | Impact | Placeholder |
|----------|--------|--------|-------------|
| FDR-008: Pricing model | PENDING | Earnings widget on CG dashboard | Use 15% commission |
| GD-03: Insurance minimums | PENDING | Caregiver verification copy | Generic "insurance recommended" |
| Logo and brand assets | NOT PROVIDED | All screens | Use placeholder |

### Resource Requirements

| Resource | Status | Action Required |
|----------|--------|-----------------|
| Human Designer | TBD | Assign designer with Figma expertise |
| Figma workspace | TBD | Create project structure |
| Stakeholder availability | TBD | Schedule review checkpoints |

---

## Dashboard Screen Specifications Summary

### SCR-CR-001: Care Receiver Dashboard

**Route**: `/dashboard`
**Content Blocks**:
1. Header (Navigation, user menu, notifications)
2. Welcome Section (if first visit)
3. Upcoming Bookings Widget
4. Pending Requests Widget
5. Quick Actions Bar
6. Footer

**Components Required**:
- Navigation Header
- Booking Card (with caregiver photo, name, date/time, status, actions)
- Status Badge (Requested, Accepted, In Progress, etc.)
- Countdown Timer (for pending requests)
- Quick Action Button
- Empty State Illustration

---

### SCR-CG-001: Caregiver Dashboard

**Route**: `/caregiver/dashboard`
**Content Blocks**:
1. Header (Navigation, user menu, notifications)
2. Verification Banner (if pending)
3. Pending Requests Widget (URGENT priority)
4. Upcoming Bookings Widget
5. Earnings Summary Widget
6. Profile Status Widget
7. Quick Actions Bar
8. Footer

**Components Required**:
- Navigation Header
- Alert Banner (verification pending)
- Booking Request Card (with earnings, countdown timer, accept/decline)
- Booking Card (confirmed bookings)
- Status Badge
- Countdown Timer
- Earnings Summary Card
- Verification Badge Group
- Quick Action Button

---

### SCR-ADM-001: Admin Dashboard

**Route**: `/admin`
**Content Blocks**:
1. Admin Header (Navigation, user menu, role indicator)
2. Urgent Alerts Banner (if any)
3. Task Summary Cards Row
4. Platform Metrics Section
5. Recent Activity Feed
6. Quick Actions Sidebar
7. Footer

**Components Required**:
- Admin Navigation Header
- Urgent Alert Banner
- Task Summary Card (with count, link, urgency indicator)
- Metric Card (value, label, trend indicator)
- Activity Feed Item
- Quick Action Link
- Sidebar Navigation

---

## Appendix B: Design Readiness Criteria

**Source**: Extracted from `design-readiness-roadmap.md` (Part 2) - 2026-02-07

### Definition of "Design Ready"

A screen is **DESIGN-READY** when ALL of the following exist:

1. **Screen Definition** (from route-map-architect):
   - Screen ID (SCR-XXX-NNN)
   - Screen name and purpose
   - Route/URL path
   - Role-based access (RBAC)
   - Preconditions (what must be true to access)
   - Key states (loading, empty, error, success, edge cases)
   - Data sensitivity classification

2. **Feature Specification** (from product-requirements-specialist):
   - User stories with acceptance criteria
   - Functional requirements (what the screen must do)
   - Data requirements (what data displays, inputs, outputs)
   - Business rules (validation, calculations, constraints)
   - Error handling requirements

3. **User Flow Context** (from route-map-architect):
   - Entry points (how user arrives at this screen)
   - Exit points (where user can go from here)
   - Decision points (branches in the flow)
   - Error paths (what happens on failure)

4. **Content Specification** (from content-architect):
   - Page title and meta description
   - Heading hierarchy (H1, H2, H3)
   - Label text for all form fields
   - Button text and CTAs
   - Error message copy
   - Help text and tooltips
   - Empty state messaging
   - Success/confirmation messaging

5. **Accessibility Requirements** (from elderly-care-ux-ui-designer):
   - WCAG 2.1 AA compliance requirements
   - Focus order specification
   - Screen reader considerations
   - Touch target sizing (minimum 48px for elderly users)
   - Color contrast requirements (4.5:1 minimum)
   - Alternative text needs

6. **Compliance Callouts** (from compliance-specialist):
   - GDPR elements (consent checkboxes, data explanations)
   - Care Act elements (safeguarding notices)
   - Legal links required (terms, privacy, safeguarding policy)

### Design-Ready Checklist Per Screen

```
SCREEN: [Screen ID] - [Screen Name]
Route: [URL path]

PRE-DESIGN CHECKLIST:
[ ] Screen definition complete (route-map-architect)
[ ] Feature specification written (product-requirements-specialist)
[ ] User flow diagram includes this screen (route-map-architect)
[ ] Content specification complete (content-architect)
[ ] Data requirements documented (product-requirements-specialist)
[ ] All states defined (loading, empty, error, success)
[ ] Accessibility requirements listed (elderly-care-ux-ui-designer)
[ ] Compliance elements identified (compliance-specialist)
[ ] All open questions resolved (product-director coordination)

STATUS: [ ] NOT READY | [ ] READY FOR DESIGN | [ ] DESIGN IN PROGRESS | [ ] DESIGN COMPLETE
```

### Current Dashboard Readiness Status

Based on completed specifications, the 3 dashboard screens meet most design-ready criteria:

| Screen | Screen Def | Feature Spec | User Flow | Content | Data | States | Access | Compliance | Status |
|--------|------------|--------------|-----------|---------|------|--------|--------|------------|--------|
| **SCR-CR-001** | ✅ | ✅ | ✅ | ⚠️ Partial | ✅ | ✅ | ⚠️ Not documented | ✅ | **MOSTLY READY** |
| **SCR-CG-001** | ✅ | ✅ | ✅ | ⚠️ Partial | ✅ | ✅ | ⚠️ Not documented | ✅ | **MOSTLY READY** |
| **SCR-ADM-001** | ✅ | ✅ | ✅ | ⚠️ Partial | ✅ | ✅ | ⚠️ Not documented | ✅ | **MOSTLY READY** |

**Gaps to Address Before Phase 1**:
- Content specifications (copy for H1, CTAs, labels, error messages) - can be drafted during wireframe phase
- Accessibility requirements document - agent can generate from existing specs
- Responsive breakpoints documentation - can use standard 375/768/1440

**Decision**: Proceed to Phase 0/Phase 1 with current documentation. Missing elements can be generated by elderly-care-ux-ui-designer agent during wireframe creation.

---

## Next Actions Checklist

### Immediate (This Week)

- [ ] **Job 1**: elderly-care-ux-ui-designer - Generate Care Receiver Dashboard wireframe
- [ ] **Job 2**: elderly-care-ux-ui-designer - Generate Caregiver Dashboard wireframe
- [ ] **Job 3**: elderly-care-ux-ui-designer - Generate Admin Dashboard wireframe
- [ ] **Job 4**: elderly-care-ux-ui-designer - Define shared dashboard components
- [ ] **Resource Allocation**: Assign human designer

### Before Phase 1 Starts

- [ ] **Job 7**: elderly-care-ux-ui-designer - Formalize design tokens
- [ ] Create Figma project structure
- [ ] Schedule Phase 1 review meeting

### Ongoing

- [ ] **Jobs 5-6**: Component inventory, accessibility requirements (during Phase 1)
- [ ] **Jobs 8-10**: Remaining screen wireframes (during Phase 2)

---

---

## Appendix A: Automated Component Generation Workflow

### Background Discussion

During planning, we explored whether agents could automate more of the Figma component creation process. The key insight is:

**The agent CAN generate structured JSON schemas that define components, which a Figma plugin can then import to auto-create components.**

This significantly reduces human designer work from "design a system" to "review and refine an auto-generated system."

---

### What Agents CAN Build

| Artifact | Agent Capability | Output Format |
|----------|------------------|---------------|
| Design tokens | ✅ Full | Figma Tokens Studio JSON |
| Component structure | ✅ Full | JSON schema with layout, children, variants |
| Component props | ✅ Full | Props, states, variants defined |
| Layout rules | ✅ Full | Auto-layout, spacing, alignment |
| Token references | ✅ Full | `{color.primary}`, `{spacing.md}` |
| Wireframe layouts | ✅ Full | Structured JSON per screen |

### What Agents CANNOT Build

| Artifact | Agent Capability | Why |
|----------|------------------|-----|
| Visual aesthetics | ❌ None | "Does this look good?" requires human judgment |
| Color harmony | ❌ None | Aesthetic decisions |
| Original style | ❌ None | Creative visual identity |

**However**, if design tokens already exist (colors, typography, spacing), the agent can reference them and the output will inherit the existing visual system.

---

### The Automated Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTOMATED WORKFLOW                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Step 1: Extract Existing Tokens                                │
│  ┌─────────────────────┐    ┌─────────────────────┐            │
│  │ _tokens.scss        │ => │ tokens.json         │            │
│  │ (existing SCSS)     │    │ (Figma Tokens       │            │
│  │                     │    │  Studio format)     │            │
│  └─────────────────────┘    └─────────────────────┘            │
│           Agent reads              Agent outputs                │
│                                                                 │
│  Step 2: Generate Component Schemas                             │
│  ┌─────────────────────┐    ┌─────────────────────┐            │
│  │ Feature specs       │ => │ components.json     │            │
│  │ Screen inventory    │    │ (Component schemas  │            │
│  │ Route map           │    │  with token refs)   │            │
│  └─────────────────────┘    └─────────────────────┘            │
│           Agent reads              Agent outputs                │
│                                                                 │
│  Step 3: Generate Screen Layouts                                │
│  ┌─────────────────────┐    ┌─────────────────────┐            │
│  │ Dashboard specs     │ => │ screens/            │            │
│  │ User flows          │    │  ├─ dashboard-cr.json│           │
│  │                     │    │  ├─ dashboard-cg.json│           │
│  │                     │    │  └─ dashboard-admin.json         │
│  └─────────────────────┘    └─────────────────────┘            │
│           Agent reads              Agent outputs                │
│                                                                 │
│  Step 4: Import to Figma                                        │
│  ┌─────────────────────┐    ┌─────────────────────┐            │
│  │ JSON files          │ => │ Figma Components    │            │
│  │                     │    │ & Screens           │            │
│  └─────────────────────┘    └─────────────────────┘            │
│     Via Figma Plugin           Auto-created in Figma           │
│                                                                 │
│  Step 5: Human Review & Refinement                              │
│  ┌─────────────────────┐    ┌─────────────────────┐            │
│  │ Auto-generated      │ => │ Production-ready    │            │
│  │ components/screens  │    │ designs             │            │
│  └─────────────────────┘    └─────────────────────┘            │
│     Human designer              Final output                    │
│     reviews & refines                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### JSON Schema Format: Design Tokens

**Output**: `/docs/tiers/tier1/figma/tokens.json`

```json
{
  "color": {
    "primary": { "value": "#ffffff", "type": "color" },
    "secondary": { "value": "#b0c47f", "type": "color", "description": "Sage green" },
    "tertiary": { "value": "#e79961", "type": "color", "description": "Terracotta" },
    "background": { "value": "#f7f7f2", "type": "color" },
    "text": { "value": "#0f172a", "type": "color" },
    "text-muted": { "value": "rgba(15, 23, 42, 0.72)", "type": "color" },
    "success": { "value": "#22c55e", "type": "color" },
    "error": { "value": "#ef4444", "type": "color" },
    "warning": { "value": "#f59e0b", "type": "color" }
  },
  "spacing": {
    "xs": { "value": "4", "type": "spacing" },
    "sm": { "value": "8", "type": "spacing" },
    "md": { "value": "16", "type": "spacing" },
    "lg": { "value": "24", "type": "spacing" },
    "xl": { "value": "32", "type": "spacing" },
    "2xl": { "value": "48", "type": "spacing" }
  },
  "borderRadius": {
    "sm": { "value": "8", "type": "borderRadius" },
    "md": { "value": "12", "type": "borderRadius" },
    "lg": { "value": "18", "type": "borderRadius" },
    "xl": { "value": "22", "type": "borderRadius" },
    "pill": { "value": "999", "type": "borderRadius" }
  },
  "typography": {
    "heading-xl": {
      "fontFamily": { "value": "Inter" },
      "fontSize": { "value": "32" },
      "fontWeight": { "value": "600" },
      "lineHeight": { "value": "1.25" }
    },
    "heading-lg": {
      "fontFamily": { "value": "Inter" },
      "fontSize": { "value": "24" },
      "fontWeight": { "value": "600" },
      "lineHeight": { "value": "1.3" }
    },
    "body": {
      "fontFamily": { "value": "Inter" },
      "fontSize": { "value": "16" },
      "fontWeight": { "value": "400" },
      "lineHeight": { "value": "1.6" }
    }
  }
}
```

---

### JSON Schema Format: Components

**Output**: `/docs/tiers/tier1/figma/components.json`

```json
{
  "components": [
    {
      "name": "BookingCard",
      "description": "Displays a booking with caregiver/care receiver info, status, and actions",
      "type": "component",
      "layout": {
        "type": "vertical",
        "padding": "{spacing.md}",
        "gap": "{spacing.sm}",
        "cornerRadius": "{borderRadius.lg}",
        "fill": "{color.background}",
        "stroke": "rgba(0,0,0,0.1)"
      },
      "children": [
        {
          "name": "Header",
          "type": "frame",
          "layout": { "type": "horizontal", "gap": "{spacing.sm}", "align": "center" },
          "children": [
            { "name": "Avatar", "type": "ellipse", "width": 48, "height": 48, "fill": "{color.secondary}" },
            {
              "name": "Info",
              "type": "frame",
              "layout": { "type": "vertical", "gap": "{spacing.xs}" },
              "children": [
                { "name": "Name", "type": "text", "style": "{typography.heading-lg}", "content": "Sarah M." },
                { "name": "DateTime", "type": "text", "style": "{typography.body}", "fill": "{color.text-muted}", "content": "Tomorrow, 2:00 PM" }
              ]
            },
            { "name": "StatusBadge", "type": "instance", "component": "StatusBadge", "props": { "status": "confirmed" } }
          ]
        },
        {
          "name": "Actions",
          "type": "frame",
          "layout": { "type": "horizontal", "gap": "{spacing.sm}" },
          "children": [
            { "type": "instance", "component": "Button", "props": { "label": "View Details", "variant": "primary" } },
            { "type": "instance", "component": "Button", "props": { "label": "Message", "variant": "secondary" } }
          ]
        }
      ],
      "variants": [
        {
          "name": "Status",
          "options": ["upcoming", "in-progress", "completed", "cancelled", "pending"]
        }
      ]
    },
    {
      "name": "StatusBadge",
      "description": "Status indicator badge",
      "type": "component",
      "layout": {
        "type": "horizontal",
        "paddingX": "{spacing.sm}",
        "paddingY": "{spacing.xs}",
        "cornerRadius": "{borderRadius.pill}"
      },
      "children": [
        { "name": "Label", "type": "text", "style": "{typography.body}", "content": "Confirmed" }
      ],
      "variants": [
        {
          "name": "Status",
          "options": [
            { "name": "confirmed", "fill": "#dcfce7", "textColor": "#166534" },
            { "name": "pending", "fill": "#fef3c7", "textColor": "#92400e" },
            { "name": "in-progress", "fill": "#dbeafe", "textColor": "#1e40af" },
            { "name": "cancelled", "fill": "#fee2e2", "textColor": "#991b1b" },
            { "name": "completed", "fill": "#f3f4f6", "textColor": "#374151" }
          ]
        }
      ]
    },
    {
      "name": "MetricCard",
      "description": "Displays a single metric with label and optional trend",
      "type": "component",
      "layout": {
        "type": "vertical",
        "padding": "{spacing.lg}",
        "gap": "{spacing.sm}",
        "cornerRadius": "{borderRadius.lg}",
        "fill": "{color.background}"
      },
      "children": [
        { "name": "Label", "type": "text", "style": "{typography.body}", "fill": "{color.text-muted}", "content": "Total Bookings" },
        { "name": "Value", "type": "text", "style": "{typography.heading-xl}", "content": "127" },
        { "name": "Trend", "type": "text", "style": "{typography.body}", "fill": "{color.success}", "content": "+12% this month" }
      ]
    }
  ]
}
```

---

### JSON Schema Format: Screen Layouts

**Output**: `/docs/tiers/tier1/figma/screens/dashboard-care-receiver.json`

```json
{
  "screen": "SCR-CR-001",
  "name": "Care Receiver Dashboard",
  "route": "/dashboard",
  "breakpoints": {
    "desktop": { "width": 1440, "height": 900 },
    "tablet": { "width": 768, "height": 1024 },
    "mobile": { "width": 375, "height": 812 }
  },
  "layout": {
    "type": "vertical",
    "fill": "{color.background}"
  },
  "sections": [
    {
      "name": "Header",
      "type": "instance",
      "component": "NavigationHeader"
    },
    {
      "name": "Content",
      "type": "frame",
      "layout": {
        "type": "vertical",
        "padding": "{spacing.xl}",
        "gap": "{spacing.lg}",
        "maxWidth": 1200
      },
      "children": [
        {
          "name": "WelcomeSection",
          "type": "frame",
          "layout": { "type": "vertical", "gap": "{spacing.sm}" },
          "children": [
            { "type": "text", "style": "{typography.heading-xl}", "content": "Welcome back, John" },
            { "type": "text", "style": "{typography.body}", "fill": "{color.text-muted}", "content": "Here's what's happening with your bookings" }
          ]
        },
        {
          "name": "UpcomingBookings",
          "type": "frame",
          "layout": { "type": "vertical", "gap": "{spacing.md}" },
          "children": [
            { "type": "text", "style": "{typography.heading-lg}", "content": "Upcoming Bookings" },
            {
              "name": "BookingsList",
              "type": "frame",
              "layout": { "type": "vertical", "gap": "{spacing.md}" },
              "children": [
                { "type": "instance", "component": "BookingCard", "props": { "status": "confirmed" } },
                { "type": "instance", "component": "BookingCard", "props": { "status": "confirmed" } }
              ]
            }
          ]
        },
        {
          "name": "QuickActions",
          "type": "frame",
          "layout": { "type": "horizontal", "gap": "{spacing.md}" },
          "children": [
            { "type": "instance", "component": "Button", "props": { "label": "Find Caregivers", "variant": "primary", "size": "large" } },
            { "type": "instance", "component": "Button", "props": { "label": "Payment Methods", "variant": "secondary" } }
          ]
        }
      ]
    }
  ],
  "states": [
    {
      "name": "Empty",
      "description": "No bookings yet",
      "modifications": {
        "UpcomingBookings": { "visible": false },
        "EmptyState": { "visible": true }
      }
    },
    {
      "name": "PendingRequests",
      "description": "Has pending booking requests",
      "modifications": {
        "PendingRequestsSection": { "visible": true, "position": "before:UpcomingBookings" }
      }
    }
  ]
}
```

---

### Plugin Options

| Option | Pros | Cons | Effort |
|--------|------|------|--------|
| **Tokens Studio Plugin** | Existing, mature, imports tokens | Tokens only, not full components | None |
| **Custom Figma Plugin** | Full control, reads our exact schema | Must build and maintain | 3-5 days |
| **Figma REST API** | No plugin install, external script | More complex, same limitations | 2-3 days |
| **Figma Variables API** | Native Figma, no plugin | Limited to variables, not components | 1 day |

**Recommended**: Use **Tokens Studio** for design tokens + **Custom Plugin** for component/screen generation.

---

### Current Blocker

**The existing token library (`_tokens.scss`) is not fully structured for Figma import.**

Before this workflow can be executed:
1. Agent must audit `_tokens.scss` and identify gaps
2. Design decisions needed for missing tokens (e.g., semantic colors, all typography variants)
3. Tokens must be formalized into Figma Tokens Studio JSON format

---

### Revised Phase 0 with Automation

| Step | Task | Owner | Output |
|------|------|-------|--------|
| 0.1 | Audit existing `_tokens.scss` | Agent | Gap analysis report |
| 0.2 | Make token decisions (fill gaps) | Human | Approved token set |
| 0.3 | Generate `tokens.json` | Agent | Figma-compatible tokens |
| 0.4 | Generate `components.json` | Agent | Component schemas |
| 0.5 | Generate screen JSONs | Agent | Screen layout schemas |
| 0.6 | Import tokens to Figma | Human | Tokens Studio import |
| 0.7 | Run plugin to create components | Human/Plugin | Auto-generated components |
| 0.8 | Run plugin to create screens | Human/Plugin | Auto-generated screens |
| 0.9 | Review and refine | Human | Production-ready designs |

---

### Time Savings Estimate

| Task | Manual Approach | Automated Approach | Savings |
|------|-----------------|-------------------|---------|
| Create 20 components | 5-7 days | 1 day (agent) + 1 day (refine) | 3-5 days |
| Create 30 screens (low-fi) | 7-10 days | 1 day (agent) + 2 days (refine) | 4-7 days |
| Create 30 screens (hi-fi) | 10-15 days | 2 days (agent) + 5 days (refine) | 3-8 days |
| **Total** | **22-32 days** | **5-9 days + 8 days refine = 13-17 days** | **~50%** |

---

### Next Steps for Automation Path

1. **Decide**: Pursue automated workflow? (Yes/No)
2. **If Yes**:
   - Agent audits `_tokens.scss` for gaps
   - Human makes decisions on missing tokens
   - Agent generates JSON schemas
   - Build or source Figma plugin
   - Execute import workflow

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Product Director | Initial plan (homepage-first) |
| 2.0 | 2026-02-06 | Product Director | Updated to dashboard-first approach |
| 2.1 | 2026-02-06 | Product Director | Added Appendix A: Automated Component Generation Workflow |
| 2.2 | 2026-02-07 | Product Director | Added Appendix B: Design Readiness Criteria (extracted from design-readiness-roadmap.md) |

---

**END OF FIGMA PRODUCTION PLAN**
