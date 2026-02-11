# Privacy Policy Wireframes (SCR-PUB-007)

**Document Purpose**: ASCII wireframes and complete element inventory for Privacy Policy (SCR-PUB-007)

**Screen ID**: SCR-PUB-007
**Screen Name**: Privacy Policy
**User Role**: All visitors (authenticated and unauthenticated)
**Route**: `/privacy`
**R0/R1**: R0 (Launch-critical - GDPR compliance)
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

The Privacy Policy page displays the platform's GDPR-compliant data protection policy. This page fulfills GDPR Article 13 transparency requirements, explaining what personal data is collected, how it's used, who it's shared with, and users' data subject rights.

**Key Functions**:
- Display comprehensive privacy policy for transparency (GDPR requirement)
- Explain data collection, processing, and retention practices
- Describe user data subject rights (access, erasure, rectification, portability)
- Provide contact details for Data Protection Officer (DPO)
- Build trust through transparent data practices
- Clarify lawful bases for data processing (contract, legitimate interest, consent)

**Critical Constraints**:
- Must be publicly accessible (no login required)
- Must use `navigation-header-public` component for unauthenticated users
- Authenticated users see standard header with role-appropriate navigation
- Long-form content requires clear structure and navigation aids
- Must be readable by elderly users (large text, high contrast, clear hierarchy)
- GDPR-specific sections must be prominent (data subject rights, retention, sharing)

### 1.2 Entry Points

**Direct Navigation**:
- User types URL: `platform-name.co.uk/privacy` → Load Privacy Policy
- External links (registration flows, email) → Load Privacy Policy

**Footer Links**:
- Any page footer → "Privacy" link → Load Privacy Policy

**Registration Flows**:
- SCR-AUTH-001 (Care Receiver Registration) → "Privacy Policy" checkbox link → Load Privacy in new tab
- SCR-AUTH-002 (Family Member Registration) → "Privacy Policy" checkbox link → Load Privacy in new tab
- SCR-AUTH-003 (Caregiver Registration) → "Privacy Policy" checkbox link → Load Privacy in new tab

**Homepage**:
- SCR-PUB-001 (Homepage) → Footer "Privacy" link → Load Privacy Policy

### 1.3 Exit Points

**Primary Navigation**:
- Header logo → SCR-PUB-001 (Homepage)
- "Log In" link (unauthenticated) → SCR-AUTH-005 (Login)
- Dashboard link (authenticated) → Role-appropriate dashboard

**Footer Links**:
- "Terms" → SCR-PUB-006 (Terms of Service)
- "Safeguarding" → SCR-PUB-008 (Safeguarding Policy)
- "Home" → SCR-PUB-001 (Homepage)
- "Contact DPO" → Email link (dpo@[PLATFORM_DOMAIN])

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
  - **H1**: "Privacy Policy"
  - **Last Updated**: "Last updated: [DATE]" (e.g., "Last updated: January 2026")
  - **Subheading**: "Your privacy is important to us. This policy explains how we collect, use, and protect your personal data."

#### Block 3: Table of Contents (ToC) Sidebar/Top
- **Purpose**: Enable quick navigation to specific sections
- **Priority**: Primary (especially for desktop)
- **Elements**:
  - **ToC Heading**: "Contents"
  - **Section Links** (anchor links, smooth scroll):
    1. "Who We Are"
    2. "What Data We Collect"
    3. "How We Use Your Data"
    4. "Lawful Basis for Processing"
    5. "Who We Share Data With"
    6. "Data Retention"
    7. "Your Rights"
    8. "Cookies"
    9. "Data Security"
    10. "International Transfers"
    11. "Changes to Policy"
    12. "Contact Us"

**Responsive Behavior**:
- **Desktop**: Sticky sidebar on left (fixed as user scrolls)
- **Tablet**: Collapsed accordion at top of page (expandable)
- **Mobile**: Sticky "Jump to Section" dropdown at top (fixed header)

**Component Reuse**: Custom ToC component (same as SCR-PUB-006)

#### Block 4: Legal Content Sections
- **Purpose**: Display full privacy policy text
- **Priority**: Primary
- **Elements**:

##### Section 1: Who We Are
- **H2**: "1. Who We Are"
- **Content**:
  - **Data Controller**: [Platform Name] Limited, [Company Address]
  - **ICO Registration Number**: [ICO_REGISTRATION_NUMBER]
  - **Contact**: privacy@[PLATFORM_DOMAIN]
  - **Data Protection Officer**: dpo@[PLATFORM_DOMAIN]
  - **Company Registration**: Companies House number [COMPANY_NUMBER]

##### Section 2: What Data We Collect
- **H2**: "2. What Personal Data We Collect"
- **Content**:
  - **Care Receivers and Family Members**:
    - Name, email address, phone number
    - Postcode (for caregiver matching)
    - Date of birth (age verification)
    - Emergency contact details
    - Booking history and preferences
    - Messages and reviews
    - Payment information (stored by Stripe, not by us)
    - IP address and device information
  - **Caregivers**:
    - All of the above, plus:
    - ID documents (passport, driving licence)
    - Right to work documents
    - Voluntary DBS certificate (if provided)
    - Bank account details (for payouts via Stripe)
    - Profile photo and biography
    - Availability and service areas
  - **All Users**:
    - Cookies and usage data (see Section 8)

##### Section 3: How We Use Your Data
- **H2**: "3. How We Use Your Personal Data"
- **Content**:
  - **Provide platform services**: Matching, booking, messaging, payments
  - **Verify identity and safety**: ID verification, right to work checks, voluntary DBS verification
  - **Process payments**: Via Stripe (third-party payment processor)
  - **Safeguarding**: Monitor for abuse, investigate reports, escalate to authorities (Care Act 2014 duty)
  - **Platform improvement**: Analytics, user experience improvements
  - **Customer support**: Respond to inquiries, resolve disputes
  - **Marketing** (with consent): Platform updates, new features, promotional offers
  - **Legal compliance**: Tax reporting (HMRC), safeguarding reporting (SAB, police), GDPR compliance

##### Section 4: Lawful Basis for Processing
- **H2**: "4. Lawful Basis for Processing"
- **Content**:
  - **Contract** (GDPR Article 6(1)(b)): Processing necessary to provide platform services (matching, booking, payments)
  - **Legitimate interest** (GDPR Article 6(1)(f)): Safeguarding, fraud prevention, platform improvement
  - **Consent** (GDPR Article 6(1)(a)): Marketing communications (you can withdraw consent anytime)
  - **Legal obligation** (GDPR Article 6(1)(c)): Safeguarding reporting (Care Act 2014), tax reporting (HMRC), GDPR compliance
  - **Special category data** (GDPR Article 9): Safeguarding data processed under vital interests (Article 9(2)(c)) and substantial public interest (Article 9(2)(g))

##### Section 5: Who We Share Data With
- **H2**: "5. Who We Share Your Data With"
- **Content**:
  - **Other platform users**: Care receivers see caregiver profiles (name, photo, bio, verification status). Caregivers see care receiver names and contact details after booking accepted.
  - **Payment processor**: Stripe (payment processing, payout processing). See Stripe Privacy Policy: [STRIPE_PRIVACY_URL]
  - **Communication services**: Twilio (SMS verification), email service provider (transactional emails, marketing emails with consent)
  - **Safeguarding authorities** (when required by law or duty):
    - Safeguarding Adults Boards (Section 42 referrals)
    - Police (criminal investigations)
    - Care Quality Commission (if requested)
    - Local authority adult social care (care assessments)
  - **Platform admin team**: Admin staff access user data to provide support, verify identities, investigate safeguarding reports
  - **Legal authorities**: HMRC (tax compliance), ICO (data protection compliance), courts (legal proceedings)
  - **We do NOT sell your data to third parties for marketing purposes**

##### Section 6: Data Retention
- **H2**: "6. How Long We Keep Your Data"
- **Content**:
  - **Profile data**: Retained while account active, deleted 30 days after account deletion request (cooling-off period)
  - **Booking history**: 7 years (financial record-keeping requirement)
  - **Messages**: 2 years from date sent, then deleted (unless part of safeguarding report)
  - **Safeguarding records**: 7 years (best practice for safeguarding documentation)
  - **Verification documents** (ID, DBS): Retained while account active, deleted 30 days after account deletion (unless safeguarding concerns)
  - **Payment data**: Stored by Stripe, not by us. See Stripe retention policy.
  - **Marketing consents**: Retained until withdrawn, then deleted

##### Section 7: Your Rights
- **H2**: "7. Your Data Subject Rights"
- **Content**:
  - **Right to access** (GDPR Article 15): Download your data anytime (Settings → Download My Data)
  - **Right to rectification** (GDPR Article 16): Correct inaccurate data (Settings → Edit Profile)
  - **Right to erasure** (GDPR Article 17): Delete your account and data (Settings → Delete Account, 30-day cooling-off). **Exception**: Safeguarding records retained for 7 years.
  - **Right to data portability** (GDPR Article 20): Export your data as JSON (Settings → Download My Data)
  - **Right to withdraw consent** (GDPR Article 7(3)): Unsubscribe from marketing (Settings → Marketing Preferences)
  - **Right to object** (GDPR Article 21): Object to processing based on legitimate interest (contact DPO)
  - **Right to complain**: Contact ICO (Information Commissioner's Office) at https://ico.org.uk/make-a-complaint/
  - **How to exercise rights**: Contact dpo@[PLATFORM_DOMAIN] or use Settings page
  - **Response time**: 1 month (may extend to 3 months for complex requests)

##### Section 8: Cookies
- **H2**: "8. Cookies and Tracking"
- **Content**:
  - **What are cookies**: Small text files stored on your device
  - **Essential cookies**: Authentication, session management (required for platform to work)
  - **Analytics cookies**: Google Analytics (usage statistics, platform improvement) - requires consent
  - **Marketing cookies**: Advertising platforms (if we use ads in future) - requires consent
  - **How to manage cookies**: Browser settings, cookie consent banner (appears on first visit)
  - **More information**: See our Cookie Policy (link)

##### Section 9: Data Security
- **H2**: "9. How We Protect Your Data"
- **Content**:
  - **Encryption**: All data encrypted in transit (TLS) and at rest (AES-256)
  - **Access controls**: Only authorized admin staff can access user data
  - **Secure hosting**: AWS UK data centers (data stored in UK/EU only)
  - **Payment security**: PCI-DSS compliant (via Stripe)
  - **Regular audits**: Security audits and penetration testing
  - **Staff training**: Admin staff trained on data protection and confidentiality
  - **Breach notification**: If data breach occurs, we notify ICO within 72 hours and affected users promptly

##### Section 10: International Transfers
- **H2**: "10. International Data Transfers"
- **Content**:
  - **Data stored in UK/EU**: All user data stored in AWS UK data centers
  - **Third-party processors**: Stripe (US-based, EU-US Data Privacy Framework certified), Twilio (US-based, Standard Contractual Clauses)
  - **Safeguards**: All international transfers use Standard Contractual Clauses (GDPR Article 46) or adequacy decisions

##### Section 11: Changes to Policy
- **H2**: "11. Changes to This Policy"
- **Content**:
  - We may update this policy from time to time (last updated: [DATE])
  - Material changes will be notified via email (if you have account) or notice on website
  - Continued use of platform after changes = acceptance of new policy

##### Section 12: Contact Us
- **H2**: "12. Contact Us"
- **Content**:
  - **Data Protection Officer**: dpo@[PLATFORM_DOMAIN]
  - **General privacy inquiries**: privacy@[PLATFORM_DOMAIN]
  - **Postal address**: [Platform Name] Limited, [Company Address], [Postcode]
  - **ICO complaints**: https://ico.org.uk/make-a-complaint/

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

3. **External Links** (within content)
   - ICO website: https://ico.org.uk/make-a-complaint/
   - Stripe Privacy Policy: [STRIPE_PRIVACY_URL]
   - Cookie Policy: `/cookie-policy` (if separate page)

4. **Header Logo** (Block 1)
   - Type: Link
   - Action: Navigate to SCR-PUB-001 (Homepage)
   - Keyboard: Focusable

5. **Log In Link** (Block 1, unauthenticated)
   - Type: Link
   - Action: Navigate to SCR-AUTH-005 (Login)
   - Keyboard: Focusable

6. **Contact DPO Link** (Section 12)
   - Type: Email link
   - Action: Open email client → dpo@[PLATFORM_DOMAIN]
   - Keyboard: Focusable

7. **Footer Links** (Block 5)
   - Type: Links
   - Action: Navigate to other policy pages or homepage
   - Keyboard: Focusable

---

### 2.3 Data Display Elements

#### Static Content

- **All text content** (defined in Block 4, Sections 1-12)
- **Last updated date** (displayed in Block 2)
- **Company details** (Section 1: ICO registration, company registration)
- **DPO contact details** (Section 12)

#### No Dynamic Data

This is a static legal document. Content is updated manually and versioned (last updated date changes when policy revised).

---

## 3. ASCII Wireframes

### 3.1 Desktop (1440px+) - Unauthenticated State

```
+------------------------------------------------------------------------------+
|  [LOGO]                                                         [Log In]     |
+------------------------------------------------------------------------------+
|                                                                              |
|  +----------------+  +---------------------------------------------------+  |
|  | CONTENTS       |  |  H1: Privacy Policy                               |  |
|  |                |  |  Last updated: January 2026                       |  |
|  | 1. Who We Are  |  |  Your privacy is important to us. This policy     |  |
|  | 2. Data We     |  |  explains how we collect, use, and protect your   |  |
|  |    Collect     |  |  personal data.                                   |  |
|  | 3. How We Use  |  +---------------------------------------------------+  |
|  | 4. Lawful Basis|  |                                                   |  |
|  | 5. Who We Share|  |  1. WHO WE ARE                                    |  |
|  | 6. Retention   |  |                                                   |  |
|  | 7. Your Rights |  |  Data Controller: [Platform Name] Limited         |  |
|  | 8. Cookies     |  |  ICO Registration: [ICO_NUMBER]                   |  |
|  | 9. Security    |  |  Contact: privacy@platform.com                    |  |
|  | 10. Transfers  |  |  DPO: dpo@platform.com                            |  |
|  | 11. Changes    |  |                                                   |  |
|  | 12. Contact    |  |  ─────────────────────────────────────────────    |  |
|  |                |  |                                                   |  |
|  | [STICKY TOC]   |  |  2. WHAT PERSONAL DATA WE COLLECT                 |  |
|  |                |  |                                                   |  |
|  +----------------+  |  Care Receivers and Family Members:               |  |
|                      |  • Name, email address, phone number              |  |
|                      |  • Postcode (for caregiver matching)              |  |
|                      |  • Date of birth (age verification)               |  |
|                      |  • Emergency contact details                      |  |
|                      |  • Booking history and preferences                |  |
|                      |  • Messages and reviews                           |  |
|                      |  • Payment information (stored by Stripe)         |  |
|                      |                                                   |  |
|                      |  Caregivers (all of the above, plus):             |  |
|                      |  • ID documents (passport, driving licence)       |  |
|                      |  • Right to work documents                        |  |
|                      |  • Voluntary DBS certificate (if provided)        |  |
|                      |  • Bank account details (for Stripe payouts)      |  |
|                      |  • Profile photo and biography                    |  |
|                      |                                                   |  |
|                      |  ─────────────────────────────────────────────    |  |
|                      |                                                   |  |
|                      |  3. HOW WE USE YOUR PERSONAL DATA                 |  |
|                      |                                                   |  |
|                      |  We use your data to:                             |  |
|                      |  • Provide platform services (matching, booking)  |  |
|                      |  • Verify identity and safety (ID, DBS checks)    |  |
|                      |  • Process payments (via Stripe)                  |  |
|                      |  • Safeguarding (monitor for abuse, investigate   |  |
|                      |    reports, escalate to authorities)              |  |
|                      |  • Platform improvement (analytics)               |  |
|                      |  • Customer support                               |  |
|                      |  • Marketing (with your consent)                  |  |
|                      |                                                   |  |
|                      |  ─────────────────────────────────────────────    |  |
|                      |                                                   |  |
|                      |  7. YOUR DATA SUBJECT RIGHTS                      |  |
|                      |                                                   |  |
|                      |  You have the right to:                           |  |
|                      |  • Access your data (download anytime)            |  |
|                      |  • Rectify inaccurate data (edit profile)         |  |
|                      |  • Erase your data (delete account)               |  |
|                      |  • Data portability (export as JSON)              |  |
|                      |  • Withdraw consent (unsubscribe from marketing)  |  |
|                      |  • Complain to ICO (ico.org.uk)                   |  |
|                      |                                                   |  |
|                      |  To exercise rights: Contact dpo@platform.com     |  |
|                      |  or use Settings page.                            |  |
|                      |                                                   |  |
|                      |  (Sections 8-12 continue...)                      |  |
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
|  (ToC sidebar, privacy sections, footer)                                    |
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
|  H1: Privacy Policy                  |
|  Last updated: January 2026          |
|                                      |
|  Your privacy is important to us.    |
|  This policy explains how we collect,|
|  use, and protect your personal data.|
|                                      |
|  ────────────────────────────────    |
|                                      |
|  1. WHO WE ARE                       |
|                                      |
|  Data Controller:                    |
|  [Platform Name] Limited             |
|                                      |
|  ICO Registration: [ICO_NUMBER]      |
|                                      |
|  Contact: privacy@platform.com       |
|  DPO: dpo@platform.com               |
|                                      |
|  ────────────────────────────────    |
|                                      |
|  2. WHAT PERSONAL DATA WE COLLECT    |
|                                      |
|  Care Receivers and Family Members:  |
|  • Name, email, phone                |
|  • Postcode (for matching)           |
|  • Date of birth (age verification)  |
|  • Emergency contact details         |
|  • Booking history and preferences   |
|  • Messages and reviews              |
|  • Payment info (stored by Stripe)   |
|                                      |
|  Caregivers (all of above, plus):    |
|  • ID documents                      |
|  • Right to work documents           |
|  • Voluntary DBS certificate         |
|  • Bank account (for payouts)        |
|  • Profile photo and bio             |
|                                      |
|  ────────────────────────────────    |
|                                      |
|  7. YOUR DATA SUBJECT RIGHTS         |
|                                      |
|  You have the right to:              |
|  • Access your data (download)       |
|  • Rectify inaccurate data           |
|  • Erase your data (delete account)  |
|  • Data portability (export JSON)    |
|  • Withdraw consent (marketing)      |
|  • Complain to ICO (ico.org.uk)      |
|                                      |
|  To exercise rights:                 |
|  Contact dpo@platform.com or use     |
|  Settings page.                      |
|                                      |
|  ────────────────────────────────    |
|                                      |
|  (Sections 8-12 continue...)         |
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
- External links: **48px height** (ICO, Stripe Privacy)
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
|  ⚠️  Unable to load Privacy Policy                                          |
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
  - ✅ No images or icons in policy content (text-only document)

- **Distinguishable**:
  - ✅ Color contrast: 4.5:1 for body text, 3.0:1 for large headings
  - ✅ Font sizes: 16px minimum for body text (18px on mobile for elderly users)
  - ✅ Clear visual hierarchy: H1 (page title), H2 (section headings)
  - ✅ Active ToC link highlighted with background color (not color-only)
  - ✅ External links underlined (not color-only indication)

#### Operable

- **Keyboard Accessible**:
  - ✅ Tab order: Header links → ToC links → Content → External links → Back to Top → Footer links
  - ✅ Enter key: Navigate to ToC anchor link or external link
  - ✅ All links focusable via Tab
  - ✅ Focus indicators: 3px solid border with high contrast

- **Navigable**:
  - ✅ Skip to main content link
  - ✅ Page title: "[Platform Name] - Privacy Policy"
  - ✅ Heading hierarchy: H1 (page title) → H2 (section headings: 1. Who We Are, 2. What Data We Collect, etc.)
  - ✅ Landmark regions: `<header>`, `<nav>` (ToC), `<main>`, `<footer>`
  - ✅ Anchor links: Smooth scroll to sections with focus moved to heading

#### Understandable

- **Readable**:
  - ✅ Language declared: `<html lang="en-GB">`
  - ✅ Clear section headings (numbered: 1. Who We Are, 2. What Data We Collect)
  - ✅ GDPR jargon explained (data controller, lawful basis, special category data)
  - ✅ Key rights prominently listed (Section 7: Your Data Subject Rights)

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
   - ToC link: "1. Who We Are"
   - ToC link: "2. What Data We Collect"
   - ToC link: "3. How We Use Your Data"
   - ... (all 12 ToC links)
5. **Main Content**:
   - Section headings (focusable for navigation via anchor links)
   - External links (ICO, Stripe Privacy)
   - Email link (dpo@[PLATFORM_DOMAIN])
6. "Back to Top" button (floating, bottom right)
7. Footer links (Home, About, How It Works, Safety, Terms, Privacy, Safeguarding, Contact)

### 6.3 Screen Reader Announcements

**Page Load**:
- "[Platform Name]. Privacy Policy. Last updated January 2026. Your privacy is important to us. This policy explains how we collect, use, and protect your personal data. Navigation, Table of Contents. Main content, Who We Are."

**ToC Navigation**:
- User focuses on ToC link "7. Your Rights"
- Screen reader: "Link. Seven. Your Data Subject Rights."
- User presses Enter
- Page scrolls to Section 7, focus moves to H2 heading
- Screen reader: "Heading level 2. Seven. Your Data Subject Rights."

**External Link**:
- User focuses on ICO link
- Screen reader: "Link, external. Information Commissioner's Office. Make a complaint. Opens in new window."

**Back to Top Button**:
- "Button. Back to top. Scroll to top of page."

### 6.4 Elderly User Considerations

**Cognitive Load Reduction**:
- ✅ Clear section headings (numbered, descriptive)
- ✅ Table of contents for quick navigation (no endless scrolling)
- ✅ GDPR rights prominently listed (Section 7)
- ✅ Short paragraphs (3-4 sentences max)
- ✅ Bullet lists for easy scanning (data collected, your rights)

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
- ✅ Transparent data practices (clear explanation of collection, use, sharing)
- ✅ GDPR rights prominently displayed (Section 7)
- ✅ DPO contact details provided (Section 12)
- ✅ Last updated date prominently displayed (builds trust)

---

## 7. Navigation & Interactions

### 7.1 Primary User Flows

**Flow 1: Care Receiver Checks Data Subject Rights**
1. User is concerned about data privacy
2. User navigates to footer → "Privacy" link
3. Privacy Policy page loads (SCR-PUB-007)
4. User clicks ToC link "7. Your Rights"
5. Page scrolls to Section 7
6. User reads data subject rights (access, erasure, rectification, portability)
7. User clicks "dpo@platform.com" email link
8. Email client opens, user sends inquiry about exercising rights

**Flow 2: Caregiver Checks Data Sharing Practices**
1. Caregiver is concerned about ID documents being shared
2. Caregiver navigates to SCR-PUB-007 (Privacy Policy)
3. Caregiver clicks ToC link "5. Who We Share Data With"
4. Page scrolls to Section 5
5. Caregiver reads: "Safeguarding authorities (when required by law)... Platform admin team access user data..."
6. Caregiver understands data sharing practices
7. Caregiver closes page

**Flow 3: Unauthenticated Visitor Reads Privacy Before Registration**
1. User is on SCR-AUTH-001 (Care Receiver Registration)
2. User sees checkbox: "I agree to the Privacy Policy" with "Privacy Policy" link
3. User clicks "Privacy Policy" link
4. Privacy page opens in new tab (SCR-PUB-007)
5. User reads Section 2 (What Data We Collect)
6. User clicks ToC link "6. Data Retention"
7. Page scrolls to Section 6
8. User reads retention periods (7 years for bookings, 2 years for messages)
9. User closes tab, returns to registration

**Flow 4: User Complains to ICO**
1. User has data protection concern about platform
2. User navigates to SCR-PUB-007 (Privacy Policy)
3. User clicks ToC link "7. Your Rights"
4. Page scrolls to Section 7
5. User reads: "Right to complain: Contact ICO at https://ico.org.uk/make-a-complaint/"
6. User clicks ICO link (opens in new tab)
7. User files complaint with ICO

### 7.2 Alternative Paths

**Path A: Mobile User Navigates via Sticky Dropdown**
1. User loads Privacy Policy on mobile
2. Sticky dropdown "Jump to Section" appears at top
3. User taps dropdown
4. Dropdown expands, shows all 12 sections
5. User taps "7. Your Rights"
6. Page scrolls to Section 7, dropdown collapses
7. User reads data subject rights
8. User taps "Back to Top" sticky button at bottom
9. Page scrolls to top

**Path B: Screen Reader User Navigates by Headings**
1. Screen reader user loads Privacy page
2. User presses H key (navigate by headings)
3. Screen reader jumps to next H2 heading: "2. What Personal Data We Collect"
4. User presses H again
5. Screen reader jumps to "3. How We Use Your Personal Data"
6. User reads section
7. User presses H to continue navigating

### 7.3 Interaction Patterns

**ToC Anchor Link Smooth Scroll**:
- Click "7. Your Rights" → Smooth scroll to Section 7 (1 second duration)
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

**External Links**:
- ICO website: Opens in new tab (target="_blank", rel="noopener noreferrer")
- Stripe Privacy: Opens in new tab
- All external links have icon or text indicating "opens in new window"

---

## 8. Design Notes

### 8.1 Design Principles Applied

**1. Transparency & Trust**
- Clear explanation of data practices (collection, use, sharing, retention)
- GDPR rights prominently displayed (Section 7)
- DPO contact details provided (Section 12)
- Last updated date visible (demonstrates ongoing review)

**2. Accessibility First**
- Large font sizes (16px body, 18px on mobile)
- High contrast text (4.5:1 minimum)
- Screen reader friendly (semantic HTML, ARIA landmarks)
- Keyboard navigation (ToC links, Back to Top)

**3. Elderly-Friendly**
- Large touch targets (56px on mobile)
- Generous white space (16px+ margins)
- Clear visual hierarchy (H1, H2, body text, bullet lists)
- No time pressure or complex interactions

**4. GDPR Compliance**
- All required GDPR elements present (data controller, lawful basis, rights, retention, contact)
- Clear language (GDPR jargon explained)
- Easy access to rights (Section 7 prominently placed)

**5. Mobile-First**
- Sticky ToC dropdown on mobile (easy access to sections)
- "Back to Top" button on mobile (no endless scrolling)
- Larger font sizes on mobile (18px body text)

### 8.2 Content Hierarchy

**Visual Hierarchy**:
1. **Page Title** (H1): "Privacy Policy"
2. **Last Updated Date**: Immediately below title
3. **Subheading**: One-sentence summary of policy purpose
4. **Table of Contents**: Sidebar (desktop) or sticky dropdown (mobile)
5. **Section Headings** (H2): "1. Who We Are", "2. What Data We Collect", etc.
6. **Body Text**: Privacy policy content for each section
7. **Bullet Lists**: Data types, rights, retention periods (easy scanning)

**Information Priority**:
- Who We Are: Data controller, ICO registration, contact details
- What Data We Collect: Care receivers vs caregivers
- How We Use Your Data: Platform services, safeguarding, marketing
- **Your Rights**: GDPR data subject rights (CRITICAL for compliance)
- Who We Share Data With: Third parties, authorities
- Data Retention: How long data kept

### 8.3 Color & Visual Design

**Text Colors**:
- Headings: Dark gray (#1F2937)
- Body text: Medium gray (#4B5563)
- Links: Blue (#3B82F6), underlined
- Active ToC link: Blue background (#E0F2FE), bold text
- External link icon: Blue (#3B82F6)

**Component Reuse**:
- Public header: navigation-header-public component
- Authenticated header: navigation-header-auth component
- Footer: footer-global component
- ToC: Custom component (same as SCR-PUB-006)
- Back to Top: Button component

### 8.4 Typography Scale

**Recommended Sizes**:
- **H1** (Page title): 32px (desktop), 28px (tablet), 24px (mobile)
- **H2** (Section headings): 24px (desktop), 22px (tablet), 20px (mobile)
- **Body text**: 16px (desktop, tablet), 18px (mobile for elderly users)
- **Last updated date**: 14px (all viewports)
- **ToC links**: 16px (all viewports)
- **Bullet lists**: 16px (desktop, tablet), 18px (mobile)

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
- Bullet list spacing: 8px between items

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

**New Components Introduced** (same as SCR-PUB-006):
1. **TABLE-OF-CONTENTS-SIDEBAR**: Sticky sidebar with section links (desktop)
2. **TABLE-OF-CONTENTS-DROPDOWN**: Sticky dropdown with section links (mobile)
3. **LEGAL-SECTION**: Section container with H2 heading, body text, divider

---

## 9. Cross-References

### Source Documents

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - SCR-PUB-007 details (lines 415-458)

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-PUB-007 route definition and access control

**Related Screens**:
- SCR-PUB-001: Homepage - Exit point via logo
- SCR-PUB-006: Terms of Service - Related legal page (footer link)
- SCR-PUB-008: Safeguarding Policy - Related legal page (footer link)
- SCR-AUTH-001: Care Receiver Registration - Entry point (checkbox link)
- SCR-AUTH-002: Family Member Registration - Entry point (checkbox link)
- SCR-AUTH-003: Caregiver Registration - Entry point (checkbox link)
- SCR-AUTH-005: Login - Entry point via "Log In" link

---

## 10. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | UX Designer | Initial wireframes for Privacy Policy (GDPR-compliant legal page) |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF

**Next Steps**:
1. Legal team reviews and finalizes Privacy text (Sections 1-12) with DPO
2. Confirm ICO registration number and company details (Section 1)
3. Figma designer creates high-fidelity mockups for ToC sidebar and content layout
4. Visual design applies typography scale and spacing
5. Engineering handoff with smooth scroll and active ToC highlighting logic
