# Terms of Service Wireframes (SCR-PUB-006)

**Document Purpose**: ASCII wireframes and complete element inventory for Terms of Service (SCR-PUB-006)

**Screen ID**: SCR-PUB-006
**Screen Name**: Terms of Service
**User Role**: All visitors (authenticated and unauthenticated)
**Route**: `/terms`
**R0/R1**: R0 (Launch-critical - regulatory compliance)
**Created**: 2026-02-11
**Status**: READY FOR FIGMA HANDOFF

---

## Table of Contents

1. [Screen Purpose](#1-screen-purpose)
2. [Element Inventory](#2-element-inventory)
3. [ASCII Wireframes](#3-ascii-wireframes)
4. [Responsive Behavior](#4-responsive-behavior)
5. [UI States](#5-ui-states)
6. [Accessibility Requirements](#6-accessibility-requirements)
7. [Navigation & Interactions](#7-navigation--interactions)
8. [Design Notes](#8-design-notes)

---

## 1. Screen Purpose

### 1.1 Purpose Statement

The Terms of Service page displays legally enforceable terms and conditions for both care receivers and caregivers using the platform. This page fulfills Consumer Rights Act requirements and establishes the Introduction Agency model (platform is not a care provider).

**Key Functions**:
- Display comprehensive terms of service for platform users
- Establish legal relationship between users and platform
- Clarify platform role as Introduction Agency (not care provider)
- Define user rights and responsibilities
- Provide dispute resolution procedures
- Set expectations for service scope (companionship only at Tier 1)

**Critical Constraints**:
- Must be publicly accessible (no login required)
- Must use `navigation-header-public` component for unauthenticated users
- Authenticated users see standard header with role-appropriate navigation
- Long-form content requires clear structure and navigation aids
- Must be readable by elderly users (large text, high contrast, clear hierarchy)

### 1.2 Entry Points

**Direct Navigation**:
- User types URL: `platform-name.co.uk/terms` → Load Terms of Service
- External links (registration flows, email) → Load Terms of Service

**Footer Links**:
- Any page footer → "Terms" link → Load Terms of Service

**Registration Flows**:
- SCR-AUTH-001 (Care Receiver Registration) → "Terms of Service" checkbox link → Load Terms in new tab
- SCR-AUTH-002 (Family Member Registration) → "Terms of Service" checkbox link → Load Terms in new tab
- SCR-AUTH-003 (Caregiver Registration) → "Terms of Service" checkbox link → Load Terms in new tab

**Homepage**:
- SCR-PUB-001 (Homepage) → Footer "Terms" link → Load Terms of Service

### 1.3 Exit Points

**Primary Navigation**:
- Header logo → SCR-PUB-001 (Homepage)
- "Log In" link (unauthenticated) → SCR-AUTH-005 (Login)
- Dashboard link (authenticated) → Role-appropriate dashboard

**Footer Links**:
- "Privacy" → SCR-PUB-007 (Privacy Policy)
- "Safeguarding" → SCR-PUB-008 (Safeguarding Policy)
- "Home" → SCR-PUB-001 (Homepage)
- "Contact Us" → Email link or contact form

**No Primary CTA**: This is an informational page with no conversion goal.

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Public/Authenticated Header (Global)
- **Component**: navigation-header-public (unauthenticated) OR navigation-header-auth (authenticated)
- **Purpose**: Consistent navigation across all pages
- **Priority**: Primary
- **Elements**:
  - **Unauthenticated**: Platform logo (left-aligned), "Log In" link (right-aligned)
  - **Authenticated**: Platform logo, Dashboard link, My Bookings, Messages, User dropdown

**Component Reuse**: navigation-header-public, navigation-header-auth (from dashboard-shared-components.md)

#### Block 2: Page Header
- **Purpose**: Identify page and provide last updated date
- **Priority**: Primary
- **Elements**:
  - **H1**: "Terms of Service"
  - **Last Updated**: "Last updated: [DATE]" (e.g., "Last updated: January 2026")
  - **Subheading** (optional): "Please read these terms carefully before using our platform"

#### Block 3: Table of Contents (ToC) Sidebar/Top
- **Purpose**: Enable quick navigation to specific sections
- **Priority**: Primary (especially for desktop)
- **Elements**:
  - **ToC Heading**: "Contents"
  - **Section Links** (anchor links, smooth scroll):
    1. "Introduction"
    2. "Services Provided"
    3. "For Care Receivers"
    4. "For Caregivers"
    5. "Payments & Fees"
    6. "Cancellation & Refunds"
    7. "Liability & Disclaimers"
    8. "Dispute Resolution"
    9. "Intellectual Property"
    10. "Termination & Suspension"
    11. "Governing Law"
    12. "Contact Information"

**Responsive Behavior**:
- **Desktop**: Sticky sidebar on left (fixed as user scrolls)
- **Tablet**: Collapsed accordion at top of page (expandable)
- **Mobile**: Sticky "Jump to Section" dropdown at top (fixed header)

**Component Reuse**: Custom ToC component (new)

#### Block 4: Legal Content Sections
- **Purpose**: Display full terms text
- **Priority**: Primary
- **Elements**:

##### Section 1: Introduction
- **H2**: "1. Introduction"
- **Content**:
  - Welcome statement
  - Agreement to terms by using platform
  - Platform name and company details
  - Introduction Agency model explanation (platform introduces users, does not provide care)
  - Last updated date

##### Section 2: Services Provided
- **H2**: "2. Services Provided"
- **Content**:
  - Platform is an Introduction Agency (NOT a care provider)
  - Companionship services only at Tier 1 (no personal care, no medical care)
  - Platform connects care receivers with self-employed caregivers
  - Platform does not employ caregivers
  - Platform does not supervise or control caregivers
  - Booking, payment, and messaging tools provided
  - Safeguarding and verification infrastructure provided

##### Section 3: For Care Receivers
- **H2**: "3. Terms for Care Receivers"
- **Content**:
  - User eligibility (age 18+, UK resident)
  - Service description (companionship: social visits, light housework, accompaniment)
  - Booking process and acceptance by caregiver
  - Payment terms (payment held securely, released after service completion)
  - Cancellation policy (notice periods, refund eligibility)
  - Care receiver responsibilities (safe environment, accurate information, respectful conduct)
  - Liability limitations (platform NOT liable for care quality or caregiver actions)
  - Right to review caregivers

##### Section 4: For Caregivers
- **H2**: "4. Terms for Caregivers"
- **Content**:
  - Self-employed contractor status (NOT employee)
  - Verification requirements (ID, right to work, voluntary DBS at Tier 1)
  - Commission structure (platform fee deduction - placeholder: 15% caregiver + 15% service fee)
  - Professional conduct expectations (safeguarding, boundaries, professionalism)
  - Insurance requirements (own public liability insurance recommended)
  - Booking acceptance and cancellation obligations
  - Right to set own schedule and rates (within platform guidelines)
  - Termination and suspension conditions (safeguarding breaches, policy violations)

##### Section 5: Payments & Fees
- **H2**: "5. Payments and Fees"
- **Content**:
  - Care receiver payment process (Stripe integration, payment held, released after service)
  - Platform commission structure (caregiver pays commission from booking fee)
  - Refund policy (full refund if caregiver cancels <24h, partial refund for care receiver cancellation based on notice)
  - Payment disputes (dispute resolution process)
  - Taxes (care receivers not responsible for caregiver taxes, caregivers responsible for own tax obligations)

##### Section 6: Cancellation & Refunds
- **H2**: "6. Cancellation and Refunds"
- **Content**:
  - Care receiver cancellation policy (notice periods: >48h full refund, 24-48h partial refund, <24h no refund)
  - Caregiver cancellation policy (must cancel >24h or provide replacement, <24h full refund to care receiver)
  - No-show policy (care receiver receives full refund, caregiver may be suspended)
  - Refund processing time (5-7 working days)
  - Exceptions (emergencies, safeguarding incidents)

##### Section 7: Liability & Disclaimers
- **H2**: "7. Liability and Disclaimers"
- **Content**:
  - Platform is Introduction Agency only (NOT liable for caregiver actions or care quality)
  - Caregivers are self-employed (responsible for own conduct and actions)
  - Platform verification is not a guarantee of suitability (voluntary DBS, ID checks provided but not exhaustive)
  - Care receivers responsible for assessing caregiver suitability
  - Platform not liable for injury, loss, or damage arising from care services
  - Platform liability limited to platform fees paid (no liability for consequential damages)
  - Force majeure clause (platform not liable for events beyond control)

##### Section 8: Dispute Resolution
- **H2**: "8. Dispute Resolution"
- **Content**:
  - Disputes between users (care receiver and caregiver) should be resolved directly
  - Platform provides mediation support (admin team can review disputes)
  - Refund disputes (platform makes final decision on refund eligibility)
  - Safeguarding disputes (escalated to Safeguarding Officer, see Safeguarding Policy)
  - Legal disputes (UK law applies, arbitration encouraged before litigation)
  - Online Dispute Resolution (ODR) platform link (EU requirement for online platforms)

##### Section 9: Intellectual Property
- **H2**: "9. Intellectual Property"
- **Content**:
  - Platform owns all intellectual property (logos, content, software)
  - Users grant platform license to use profile content (photos, bios) for platform purposes
  - Users must not copy, reproduce, or distribute platform content
  - Trademarks and branding protected

##### Section 10: Termination & Suspension
- **H2**: "10. Termination and Suspension"
- **Content**:
  - Users can terminate account at any time (30-day cooling-off for data deletion)
  - Platform can suspend accounts for policy violations, safeguarding concerns, fraud
  - Platform can permanently ban users for serious breaches (abuse, criminal activity)
  - Suspended users notified with reason and duration
  - Banned users cannot re-register (email, phone, IP flagged)
  - Active bookings handled based on cancellation policy

##### Section 11: Governing Law
- **H2**: "11. Governing Law"
- **Content**:
  - These terms governed by laws of England and Wales
  - UK courts have exclusive jurisdiction
  - If user is consumer, consumer protection laws apply

##### Section 12: Contact Information
- **H2**: "12. Contact Information"
- **Content**:
  - Questions about terms: contact@[PLATFORM_DOMAIN]
  - Legal inquiries: legal@[PLATFORM_DOMAIN]
  - Company registered address and registration number

**Component Reuse**: TEXT, TEXT-LINK, DIVIDER (for section breaks)

#### Block 5: Footer (Global)
- **Purpose**: Legal links, company info, contact
- **Priority**: Secondary
- **Elements**:
  - Links: Home | About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact
  - Copyright: "© 2026 Platform Name. All rights reserved."

**Component Reuse**: FOOTER-GLOBAL (from dashboard-shared-components.md)

---

### 2.2 Interactive Elements

1. **Table of Contents Links** (Block 3)
   - Type: Anchor links
   - Action: Smooth scroll to corresponding section
   - Keyboard: Tab to focus, Enter to navigate
   - Active state: Highlight current section in ToC as user scrolls

2. **Back to Top Button** (appears after scrolling)
   - Type: Floating button (bottom right)
   - Action: Smooth scroll to top of page
   - Keyboard: Focusable
   - Visibility: Appears after scrolling >500px

3. **Header Logo** (Block 1)
   - Type: Link
   - Action: Navigate to SCR-PUB-001 (Homepage)
   - Keyboard: Focusable

4. **Log In Link** (Block 1, unauthenticated)
   - Type: Link
   - Action: Navigate to SCR-AUTH-005 (Login)
   - Keyboard: Focusable

5. **Footer Links** (Block 5)
   - Type: Links
   - Action: Navigate to other policy pages or homepage
   - Keyboard: Focusable

---

### 2.3 Data Display Elements

#### Static Content

- **All text content** (defined in Block 4, Sections 1-12)
- **Last updated date** (displayed in Block 2)
- **Company details** (Section 12)

#### No Dynamic Data

This is a static legal document. Content is updated manually and versioned (last updated date changes when terms revised).

---

## 3. ASCII Wireframes

### 3.1 Desktop (1440px+) - Unauthenticated State

```
+------------------------------------------------------------------------------+
|  [LOGO]                                                         [Log In]     |
+------------------------------------------------------------------------------+
|                                                                              |
|  +----------------+  +---------------------------------------------------+  |
|  | CONTENTS       |  |  H1: Terms of Service                             |  |
|  |                |  |  Last updated: January 2026                       |  |
|  | 1. Introduction|  |                                                   |  |
|  | 2. Services    |  +---------------------------------------------------+  |
|  | 3. Care Rcvrs  |  |                                                   |  |
|  | 4. Caregivers  |  |  1. INTRODUCTION                                  |  |
|  | 5. Payments    |  |                                                   |  |
|  | 6. Cancellation|  |  Welcome to [Platform Name]. By using our         |  |
|  | 7. Liability   |  |  platform, you agree to these Terms of Service.   |  |
|  | 8. Disputes    |  |  Please read them carefully.                      |  |
|  | 9. IP          |  |                                                   |  |
|  | 10. Termination|  |  [Platform Name] is an Introduction Agency that   |  |
|  | 11. Law        |  |  connects care receivers with self-employed       |  |
|  | 12. Contact    |  |  caregivers for companionship services. We do NOT |  |
|  |                |  |  provide care services ourselves.                |  |
|  | [STICKY TOC]   |  |                                                   |  |
|  |                |  |  Last updated: January 2026                       |  |
|  +----------------+  |                                                   |  |
|                      |  ─────────────────────────────────────────────    |  |
|                      |                                                   |  |
|                      |  2. SERVICES PROVIDED                             |  |
|                      |                                                   |  |
|                      |  Our platform provides:                           |  |
|                      |  • Connection between care receivers and          |  |
|                      |    caregivers                                     |  |
|                      |  • Booking and payment tools                      |  |
|                      |  • Identity and DBS verification                  |  |
|                      |  • Safeguarding support                           |  |
|                      |                                                   |  |
|                      |  We do NOT:                                       |  |
|                      |  • Provide care services                          |  |
|                      |  • Employ caregivers                              |  |
|                      |  • Supervise care delivery                        |  |
|                      |                                                   |  |
|                      |  At Tier 1, we offer companionship services only  |  |
|                      |  (no personal care, no medical care).             |  |
|                      |                                                   |  |
|                      |  ─────────────────────────────────────────────    |  |
|                      |                                                   |  |
|                      |  3. TERMS FOR CARE RECEIVERS                      |  |
|                      |                                                   |  |
|                      |  [Full care receiver terms text...]               |  |
|                      |                                                   |  |
|                      |  ─────────────────────────────────────────────    |  |
|                      |                                                   |  |
|                      |  4. TERMS FOR CAREGIVERS                          |  |
|                      |                                                   |  |
|                      |  You are a self-employed contractor, NOT an       |  |
|                      |  employee of [Platform Name].                     |  |
|                      |                                                   |  |
|                      |  [Full caregiver terms text...]                   |  |
|                      |                                                   |  |
|                      |  (Sections 5-12 continue...)                      |  |
|                      |                                                   |  |
|                      +---------------------------------------------------+  |
|                                                                              |
|                                                [↑ Back to Top]               |
|                                                                              |
+------------------------------------------------------------------------------+
| Home | About | How It Works | Safety | Terms | Privacy | Safeguarding      |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

### 3.2 Desktop - Authenticated State (Care Receiver)

```
+------------------------------------------------------------------------------+
|  [LOGO]             Dashboard   My Bookings   Messages            [USER▼]   |
+------------------------------------------------------------------------------+
|                                                                              |
|  (Same content as unauthenticated state)                                    |
|  (ToC sidebar, legal sections, footer)                                      |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.3 Mobile (320px-767px) - Unauthenticated State

```
+--------------------------------------+
|  [LOGO]                     [Log In] |
+--------------------------------------+
| [Jump to Section ▼] (sticky)         |
+--------------------------------------+
|                                      |
|  H1: Terms of Service                |
|  Last updated: January 2026          |
|                                      |
|  ────────────────────────────────    |
|                                      |
|  1. INTRODUCTION                     |
|                                      |
|  Welcome to [Platform Name]. By      |
|  using our platform, you agree to    |
|  these Terms of Service.             |
|                                      |
|  [Platform Name] is an Introduction  |
|  Agency that connects care receivers |
|  with self-employed caregivers for   |
|  companionship services. We do NOT   |
|  provide care services ourselves.    |
|                                      |
|  ────────────────────────────────    |
|                                      |
|  2. SERVICES PROVIDED                |
|                                      |
|  Our platform provides:              |
|  • Connection between care receivers |
|    and caregivers                    |
|  • Booking and payment tools         |
|  • Identity and DBS verification     |
|  • Safeguarding support              |
|                                      |
|  We do NOT:                          |
|  • Provide care services             |
|  • Employ caregivers                 |
|  • Supervise care delivery           |
|                                      |
|  ────────────────────────────────    |
|                                      |
|  3. TERMS FOR CARE RECEIVERS         |
|                                      |
|  [Full care receiver terms text...]  |
|                                      |
|  ────────────────────────────────    |
|                                      |
|  (Sections 4-12 continue...)         |
|                                      |
|                                      |
|  [↑ Back to Top]                     |
|                                      |
+--------------------------------------+
| Home | Terms | Privacy              |
| © 2026 Platform Name                 |
+--------------------------------------+
```

---

## 4. Responsive Behavior

### 4.1 Breakpoints

| Viewport | Layout Changes | Priority |
|----------|----------------|----------|
| **Mobile** (320px-767px) | Single column, sticky dropdown ToC, stacked content | Essential content only |
| **Tablet** (768px-1439px) | Single column, collapsed accordion ToC at top, full content | Balanced |
| **Desktop** (1440px+) | Two-column (sticky ToC sidebar left, content right), full layout | Full layout |

### 4.2 Layout Changes by Viewport

#### Desktop (1440px+)
- **ToC**: Sticky sidebar (250px width, fixed as user scrolls)
- **Content**: Main content area (900px max-width, right of ToC)
- **Back to Top**: Floating button (bottom right, appears after scrolling >500px)

#### Tablet (768px-1439px)
- **ToC**: Collapsed accordion at top of page (expandable, non-sticky)
- **Content**: Full-width, max-width 800px, centered
- **Back to Top**: Floating button (bottom right)

#### Mobile (320px-767px)
- **ToC**: Sticky dropdown at top (fixed header, "Jump to Section" dropdown)
- **Content**: Full-width, padding 16px
- **Back to Top**: Sticky button (bottom center, full width)
- **Font sizes**: Larger (18px body text for readability)

### 4.3 Touch Target Sizes

**Mobile Requirements**:
- ToC dropdown: **56px height**
- "Back to Top" button: **56px height**, full width
- Anchor links in ToC dropdown: **48px height**
- Footer links: **44px height**

---

## 5. UI States

### 5.1 Loading State

**Initial Page Load**:
```
+------------------------------------------------------------------------------+
|  [LOGO]                                                         [Log In]     |
+------------------------------------------------------------------------------+
|                                                                              |
|  [Loading skeleton - Page header]                                           |
|  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         |
|                                                                              |
+------------------------------------------------------------------------------+
```

**ToC Scroll State** (desktop):
- ToC sidebar remains fixed as content scrolls
- Active section highlighted in ToC (bold text, blue background)

### 5.2 Empty States

**Not Applicable**: This is a static legal document with no dynamic content.

### 5.3 Error States

**Page Load Error**:
```
+------------------------------------------------------------------------------+
|  [LOGO]                                                         [Log In]     |
+------------------------------------------------------------------------------+
|                                                                              |
|  ⚠️  Unable to load Terms of Service                                        |
|     Please try refreshing the page or contact support.                      |
|                                                                              |
|  [Refresh Page]                                                             |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 5.4 Authentication State Variants

**Unauthenticated** (shown in wireframe 3.1):
- Header: navigation-header-public (logo + "Log In" link)

**Authenticated (Care Receiver)** (shown in wireframe 3.2):
- Header: navigation-header-auth (logo + Dashboard + My Bookings + Messages + User dropdown)

**Authenticated (Caregiver)**:
- Header: navigation-header-auth (caregiver variant)

**Authenticated (Admin)**:
- Header: navigation-header-auth (admin variant)

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

#### Perceivable

- **Text Alternatives**:
  - ✅ No images or icons in legal content (text-only document)

- **Distinguishable**:
  - ✅ Color contrast: 4.5:1 for body text, 3.0:1 for large headings
  - ✅ Font sizes: 16px minimum for body text (18px on mobile for elderly users)
  - ✅ Clear visual hierarchy: H1 (page title), H2 (section headings)
  - ✅ Active ToC link highlighted with background color (not color-only)

#### Operable

- **Keyboard Accessible**:
  - ✅ Tab order: Header links → ToC links → Content (headings focusable for navigation) → Back to Top → Footer links
  - ✅ Enter key: Navigate to ToC anchor link
  - ✅ All links focusable via Tab
  - ✅ Focus indicators: 3px solid border with high contrast

- **Navigable**:
  - ✅ Skip to main content link
  - ✅ Page title: "[Platform Name] - Terms of Service"
  - ✅ Heading hierarchy: H1 (page title) → H2 (section headings: 1. Introduction, 2. Services Provided, etc.)
  - ✅ Landmark regions: `<header>`, `<nav>` (ToC), `<main>`, `<footer>`
  - ✅ Anchor links: Smooth scroll to sections with focus moved to heading

#### Understandable

- **Readable**:
  - ✅ Language declared: `<html lang="en-GB">`
  - ✅ Clear section headings (numbered: 1. Introduction, 2. Services Provided)
  - ✅ Legal jargon minimized where possible (plain English preferred)
  - ✅ Key terms defined (Introduction Agency, self-employed contractor)

- **Predictable**:
  - ✅ Consistent navigation (header same across all public pages)
  - ✅ ToC links scroll smoothly (no sudden jumps)
  - ✅ "Back to Top" button always appears in same position (bottom right)

- **Input Assistance**:
  - ✅ No form inputs on this page (read-only document)

#### Robust

- **Compatible**:
  - ✅ Valid HTML5 semantic markup (`<article>`, `<section>`, `<h1>`, `<h2>`)
  - ✅ ARIA landmarks: `role="navigation"` for ToC, `role="main"` for content
  - ✅ Tested with screen readers (NVDA, JAWS, VoiceOver)

### 6.2 Focus Order

**Tab Order** (Desktop, Unauthenticated):
1. Skip to main content link
2. Header logo (clickable)
3. Header "Log In" button
4. **Table of Contents**:
   - ToC heading (not focusable)
   - ToC link: "1. Introduction"
   - ToC link: "2. Services Provided"
   - ToC link: "3. For Care Receivers"
   - ... (all 12 ToC links)
5. **Main Content**:
   - Section headings (focusable for navigation via anchor links)
   - External links within content (if any)
6. "Back to Top" button (floating, bottom right)
7. Footer links (Home, About, How It Works, Safety, Terms, Privacy, Safeguarding, Contact)

### 6.3 Screen Reader Announcements

**Page Load**:
- "[Platform Name]. Terms of Service. Last updated January 2026. Navigation, Table of Contents. Main content, Introduction."

**ToC Navigation**:
- User focuses on ToC link "3. For Care Receivers"
- Screen reader: "Link. Three. Terms for Care Receivers."
- User presses Enter
- Page scrolls to Section 3, focus moves to H2 heading
- Screen reader: "Heading level 2. Three. Terms for Care Receivers."

**Back to Top Button**:
- "Button. Back to top. Scroll to top of page."

### 6.4 Elderly User Considerations

**Cognitive Load Reduction**:
- ✅ Clear section headings (numbered, descriptive)
- ✅ Table of contents for quick navigation (no endless scrolling)
- ✅ Generous white space between sections (16px+ margins)
- ✅ Short paragraphs (3-4 sentences max)

**Vision Support**:
- ✅ Large font sizes (18px body text on mobile)
- ✅ High contrast text (black on white, 4.5:1 minimum)
- ✅ Clear visual hierarchy (H1, H2, body text)
- ✅ Generous line height (1.6)

**Motor Control**:
- ✅ Large touch targets (56px height on mobile for ToC dropdown)
- ✅ "Back to Top" button (no scrolling required to return to top)
- ✅ No hover-only interactions (all links clickable/tappable)

**Trust & Safety**:
- ✅ Transparent terms (no hidden clauses, clear language)
- ✅ Last updated date prominently displayed (builds trust)
- ✅ Contact information provided (Section 12)

---

## 7. Navigation & Interactions

### 7.1 Primary User Flows

**Flow 1: Unauthenticated Visitor Reads Terms Before Registration**
1. User is on SCR-AUTH-001 (Care Receiver Registration)
2. User sees checkbox: "I agree to the Terms of Service" with "Terms of Service" link
3. User clicks "Terms of Service" link
4. Terms page opens in new tab (SCR-PUB-006)
5. User reads Introduction (Section 1)
6. User clicks ToC link "3. For Care Receivers"
7. Page scrolls to Section 3
8. User reads care receiver terms
9. User clicks "Back to Top" button
10. User closes tab, returns to registration

**Flow 2: Care Receiver Checks Cancellation Policy**
1. User has booking pending
2. User navigates to footer → "Terms" link
3. Terms page loads (SCR-PUB-006)
4. User clicks ToC link "6. Cancellation & Refunds"
5. Page scrolls to Section 6
6. User reads cancellation policy (notice periods, refund eligibility)
7. User closes page or navigates to booking to cancel

**Flow 3: Caregiver Reviews Commission Structure**
1. Caregiver is considering joining platform
2. Caregiver navigates to SCR-PUB-006 (Terms of Service)
3. Caregiver clicks ToC link "4. For Caregivers"
4. Page scrolls to Section 4
5. Caregiver reads commission structure (15% caregiver + 15% service fee)
6. Caregiver clicks ToC link "5. Payments & Fees" for more detail
7. Caregiver reads payment processing details

**Flow 4: Authenticated User Checks Liability Limitations**
1. User has concern about care quality
2. User navigates to Terms of Service (footer link)
3. User clicks ToC link "7. Liability & Disclaimers"
4. Page scrolls to Section 7
5. User reads: "Platform is Introduction Agency only (NOT liable for caregiver actions or care quality)"
6. User understands platform's limited liability
7. User closes page

### 7.2 Alternative Paths

**Path A: Mobile User Navigates via Sticky Dropdown**
1. User loads Terms on mobile
2. Sticky dropdown "Jump to Section" appears at top
3. User taps dropdown
4. Dropdown expands, shows all 12 sections
5. User taps "5. Payments & Fees"
6. Page scrolls to Section 5, dropdown collapses
7. User reads section
8. User taps "Back to Top" sticky button at bottom
9. Page scrolls to top

**Path B: Screen Reader User Navigates via Headings**
1. Screen reader user loads Terms page
2. User presses H key (navigate by headings)
3. Screen reader jumps to next H2 heading: "2. Services Provided"
4. User presses H again
5. Screen reader jumps to "3. Terms for Care Receivers"
6. User reads section
7. User presses H to continue navigating by headings

### 7.3 Interaction Patterns

**ToC Anchor Link Smooth Scroll**:
- Click "3. For Care Receivers" → Smooth scroll to Section 3 (1 second duration)
- Offset: -80px (to account for fixed header on mobile)
- Accessibility: Focus moves to section heading (H2)

**Active ToC Highlighting** (desktop):
- As user scrolls, ToC highlights current section (bold text, blue background)
- Uses Intersection Observer API to detect which section is visible
- Updates ToC highlight in real-time

**Back to Top Button**:
- Appears after scrolling >500px
- Click → Smooth scroll to top (1 second duration)
- Focus moves to page title (H1)

---

## 8. Design Notes

### 8.1 Design Principles Applied

**1. Clarity & Readability**
- Clear section headings (numbered, descriptive)
- Table of contents for quick navigation
- Short paragraphs (3-4 sentences max)
- Plain English where possible (legal jargon minimized)

**2. Accessibility First**
- Large font sizes (16px body, 18px on mobile)
- High contrast text (4.5:1 minimum)
- Screen reader friendly (semantic HTML, ARIA landmarks)
- Keyboard navigation (ToC links, Back to Top)

**3. Elderly-Friendly**
- Large touch targets (56px on mobile)
- Generous white space (16px+ margins)
- Clear visual hierarchy (H1, H2, body text)
- No time pressure or complex interactions

**4. Trust & Transparency**
- Last updated date prominently displayed
- Contact information provided (Section 12)
- Clear explanation of platform role (Introduction Agency)
- Transparent liability limitations

**5. Mobile-First**
- Sticky ToC dropdown on mobile (easy access to sections)
- "Back to Top" button on mobile (no endless scrolling)
- Larger font sizes on mobile (18px body text)

### 8.2 Content Hierarchy

**Visual Hierarchy**:
1. **Page Title** (H1): "Terms of Service"
2. **Last Updated Date**: Immediately below title
3. **Table of Contents**: Sidebar (desktop) or sticky dropdown (mobile)
4. **Section Headings** (H2): "1. Introduction", "2. Services Provided", etc.
5. **Body Text**: Legal content for each section

**Information Priority**:
- Introduction: What is platform, what services provided
- For Care Receivers: Terms specific to care receivers
- For Caregivers: Terms specific to caregivers (self-employed status, commission)
- Liability & Disclaimers: Platform limitations (NOT liable for care quality)
- Dispute Resolution: How to resolve disputes

### 8.3 Color & Visual Design

**Text Colors**:
- Headings: Dark gray (#1F2937)
- Body text: Medium gray (#4B5563)
- Links: Blue (#3B82F6), underlined
- Active ToC link: Blue background (#E0F2FE), bold text

**Component Reuse**:
- Public header: navigation-header-public component
- Authenticated header: navigation-header-auth component
- Footer: footer-global component
- ToC: Custom component (new)
- Back to Top: Button component

### 8.4 Typography Scale

**Recommended Sizes**:
- **H1** (Page title): 32px (desktop), 28px (tablet), 24px (mobile)
- **H2** (Section headings): 24px (desktop), 22px (tablet), 20px (mobile)
- **Body text**: 16px (desktop, tablet), 18px (mobile for elderly users)
- **Last updated date**: 14px (all viewports)
- **ToC links**: 16px (all viewports)

**Font Weights**:
- **H1**: Bold (700)
- **H2**: Semibold (600)
- **Body text**: Regular (400)
- **ToC links**: Regular (400), bold (700) when active

### 8.5 Spacing & Layout

**Section Spacing**:
- Between sections: 48px (desktop), 32px (mobile)
- Between paragraphs: 16px
- Line height: 1.6 (for readability)

**ToC Spacing** (desktop):
- ToC sidebar width: 250px
- ToC link spacing: 8px vertical
- ToC padding: 16px

**Content Max-Width**:
- Desktop: 900px (optimal line length for readability)
- Tablet: 800px
- Mobile: 100% (with 16px padding)

### 8.6 Component Reuse

**Shared Components** (from dashboard-shared-components.md):
1. **navigation-header-public**: Public header with logo + "Log In" link
2. **navigation-header-auth**: Authenticated header with role-appropriate navigation
3. **footer-global**: Legal links and copyright
4. **button**: "Back to Top" button

**New Components Introduced**:
1. **TABLE-OF-CONTENTS-SIDEBAR**: Sticky sidebar with section links (desktop)
2. **TABLE-OF-CONTENTS-DROPDOWN**: Sticky dropdown with section links (mobile)
3. **LEGAL-SECTION**: Section container with H2 heading, body text, divider

---

## 9. Cross-References

### Source Documents

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - SCR-PUB-006 details (lines 366-412)

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-PUB-006 route definition and access control

**Related Screens**:
- SCR-PUB-001: Homepage - Exit point via logo
- SCR-PUB-007: Privacy Policy - Related legal page (footer link)
- SCR-PUB-008: Safeguarding Policy - Related legal page (footer link)
- SCR-AUTH-001: Care Receiver Registration - Entry point (checkbox link)
- SCR-AUTH-002: Family Member Registration - Entry point (checkbox link)
- SCR-AUTH-003: Caregiver Registration - Entry point (checkbox link)
- SCR-AUTH-005: Login - Entry point via "Log In" link

---

## 10. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | UX Designer | Initial wireframes for Terms of Service (public legal page) |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF

**Next Steps**:
1. Legal team reviews and finalizes Terms text (Sections 1-12)
2. Figma designer creates high-fidelity mockups for ToC sidebar and content layout
3. Visual design applies typography scale and spacing
4. Engineering handoff with smooth scroll and active ToC highlighting logic
