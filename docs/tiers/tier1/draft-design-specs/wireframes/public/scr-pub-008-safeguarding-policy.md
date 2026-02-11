# Safeguarding Policy Wireframes (SCR-PUB-008)

**Document Purpose**: ASCII wireframes and complete element inventory for Safeguarding Policy (SCR-PUB-008)

**Screen ID**: SCR-PUB-008
**Screen Name**: Safeguarding Policy
**User Role**: All visitors (authenticated and unauthenticated)
**Route**: `/safeguarding-policy`
**R0/R1**: R0 (Launch-critical - Care Act 2014 compliance)
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

The Safeguarding Policy page displays the platform's Care Act 2014-compliant safeguarding policy. This page demonstrates the platform's commitment to protecting vulnerable adults, explains safeguarding principles, reporting procedures, and emergency contacts. This page is critical for building trust with elderly users and families.

**Key Functions**:
- Display comprehensive safeguarding policy (Care Act 2014 requirement)
- Explain Six Safeguarding Principles (empowerment, prevention, proportionality, protection, partnership, accountability)
- Define types of abuse (physical, emotional, sexual, financial, neglect, discriminatory)
- Provide clear reporting procedures (in-app, email, phone)
- Display emergency contact information (24/7 safeguarding hotline, 999)
- Explain platform's safeguarding commitments (verification, monitoring, escalation)
- Build trust through transparency and accessibility

**Critical Constraints**:
- Must be publicly accessible (no login required)
- Must use `navigation-header-public` component for unauthenticated users
- Authenticated users see standard header with role-appropriate navigation
- Long-form content requires clear structure and navigation aids
- Must be HIGHLY readable by elderly users (large text, high contrast, clear hierarchy)
- Emergency contacts must be PROMINENTLY displayed (above the fold on mobile)
- Reporting procedures must be simple and actionable

### 1.2 Entry Points

**Direct Navigation**:
- User types URL: `platform-name.co.uk/safeguarding-policy` → Load Safeguarding Policy
- External links (email, leaflets) → Load Safeguarding Policy

**Footer Links**:
- Any page footer → "Safeguarding" link → Load Safeguarding Policy

**Homepage**:
- SCR-PUB-001 (Homepage) → Footer "Safeguarding" link → Load Safeguarding Policy
- SCR-PUB-001 → "Safety" navigation link → Scroll to trust badges, link to full policy

**Public Awareness**:
- Google search: "report abuse elderly caregiver UK" → Safeguarding Policy page

**Emergency Context**:
- User has safeguarding concern → Searches "how to report abuse" → Finds safeguarding policy

### 1.3 Exit Points

**Primary Navigation**:
- Header logo → SCR-PUB-001 (Homepage)
- "Log In" link (unauthenticated) → SCR-AUTH-005 (Login)
- Dashboard link (authenticated) → Role-appropriate dashboard

**Reporting CTAs** (PRIMARY exit points):
- **Authenticated users**: "Report a Concern" button → Opens safeguarding report form (in-app modal or separate page)
- **Unauthenticated users**: "Report a Concern" button → Email link (safeguarding@[PLATFORM_DOMAIN]) or phone number

**Emergency CTAs**:
- "Call 999" button → Opens phone dialer (mobile) or displays number (desktop)
- "Call Safeguarding Hotline" button → Opens phone dialer (mobile) or displays number

**Footer Links**:
- "Terms" → SCR-PUB-006 (Terms of Service)
- "Privacy" → SCR-PUB-007 (Privacy Policy)
- "Home" → SCR-PUB-001 (Homepage)

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

#### Block 2: Emergency Banner (Above Page Header)
- **Purpose**: Provide immediate access to emergency help
- **Priority**: CRITICAL (highest priority element on page)
- **Elements**:
  - **Alert Icon**: ⚠️ or 🛡️ (high visibility)
  - **Heading**: "In Immediate Danger? Call 999 Now"
  - **Body Text**: "If you or someone you know is in immediate danger, call 999 (Police/Ambulance) immediately."
  - **Primary CTA**: "📞 Call 999" button (large, red background, white text)
  - **Secondary Text**: "For non-urgent safeguarding concerns, see reporting options below."

**Responsive Behavior**:
- **Desktop**: Full-width banner (red/orange background), centered content
- **Mobile**: Full-width banner, stacked elements, large CTA (56px height)

**Component Reuse**: ALERT-BANNER (from dashboard-shared-components.md, adapted for emergency use)

#### Block 3: Page Header
- **Purpose**: Identify page and provide context
- **Priority**: Primary
- **Elements**:
  - **H1**: "Safeguarding Policy"
  - **Subheading**: "Our commitment to protecting vulnerable adults using our platform"
  - **Last Updated**: "Last updated: [DATE]" (e.g., "Last updated: January 2026")

#### Block 4: Table of Contents (ToC) Sidebar/Top
- **Purpose**: Enable quick navigation to specific sections
- **Priority**: Primary (especially for desktop)
- **Elements**:
  - **ToC Heading**: "Contents"
  - **Section Links** (anchor links, smooth scroll):
    1. "Our Commitment"
    2. "Safeguarding Principles"
    3. "Types of Abuse"
    4. "How to Report"
    5. "What Happens Next"
    6. "Response Times"
    7. "Escalation to Authorities"
    8. "Our Verification Process"
    9. "Emergency Contacts"
    10. "Support Resources"

**Responsive Behavior**:
- **Desktop**: Sticky sidebar on left (fixed as user scrolls)
- **Tablet**: Collapsed accordion at top of page (expandable)
- **Mobile**: Sticky "Jump to Section" dropdown at top (fixed header)

**Component Reuse**: Custom ToC component (same as SCR-PUB-006, SCR-PUB-007)

#### Block 5: Safeguarding Content Sections
- **Purpose**: Display full safeguarding policy text
- **Priority**: Primary
- **Elements**:

##### Section 1: Our Commitment
- **H2**: "1. Our Commitment to Safeguarding"
- **Content**:
  - Platform's Care Act 2014 duties as marketplace serving vulnerable adults
  - Introduction Agency model (platform does not provide care, but has safeguarding responsibilities)
  - Zero tolerance for abuse or neglect
  - Commitment to transparent, responsive safeguarding process
  - 24/7 safeguarding support available
  - Collaboration with Safeguarding Adults Boards (SABs) and police
  - Continuous improvement through incident learning

##### Section 2: Safeguarding Principles (Care Act 2014)
- **H2**: "2. Six Safeguarding Principles"
- **Content** (Care Act 2014 Section 42, formatted as cards/list):
  1. **Empowerment**: Presumption of person-led decisions and informed consent
     - "We support you to make your own decisions about care"
  2. **Prevention**: Action before harm occurs
     - "We verify caregiver identity, right to work, and voluntary DBS"
  3. **Proportionality**: Least intrusive response appropriate to risk
     - "We balance safeguarding with individual freedom and choice"
  4. **Protection**: Support and representation for those in greatest need
     - "We respond to urgent concerns within 2 hours"
  5. **Partnership**: Local solutions through services working together
     - "We work with Safeguarding Adults Boards, police, and social services"
  6. **Accountability**: Transparency in safeguarding practice
     - "We document all incidents and learn from outcomes"

**Visual Treatment**: Each principle in a card or highlighted box (for scannability)

##### Section 3: Types of Abuse
- **H2**: "3. Types of Abuse We Take Seriously"
- **Content** (bulleted list or cards):
  - **Physical Abuse**: Hitting, slapping, pushing, rough handling, restraint
  - **Emotional/Psychological Abuse**: Verbal abuse, threats, intimidation, humiliation, isolation
  - **Sexual Abuse**: Non-consensual sexual contact, harassment, indecent exposure
  - **Financial Abuse**: Theft, fraud, exploitation, pressure to change will, off-platform payments
  - **Neglect**: Failure to provide care, abandonment, caregiver no-show
  - **Discriminatory Abuse**: Abuse based on age, disability, race, religion, gender, sexuality
  - **Domestic Abuse**: Abuse from family member (we support victims and refer to specialist services)
  - **Self-Neglect**: Care receiver neglecting hygiene, nutrition, medical care (we refer to appropriate support)

**Visual Treatment**: Icons for each abuse type (for elderly users and accessibility)

##### Section 4: How to Report a Safeguarding Concern
- **H2**: "4. How to Report a Safeguarding Concern"
- **Content**:
  - **If you're authenticated** (logged in):
    - Click "Report Safeguarding Concern" button (visible on caregiver profiles, booking pages, main menu)
    - Form captures: Who is at risk? What happened? When? Is this urgent?
    - You'll receive a case reference number and response timeline
  - **If you're not logged in** (public):
    - Email: safeguarding@[PLATFORM_DOMAIN]
    - Phone: [SAFEGUARDING_HOTLINE] (24/7, answered by Safeguarding Officer)
    - Website form: "Report a Concern" button (no login required)
  - **In immediate danger**: Call 999 first, then report to us
  - **Anonymous reporting**: You can report anonymously, but it helps us investigate if you provide contact details
  - **Confidentiality**: Your identity is kept confidential and not shared with the reported person

**Visual Treatment**: Step-by-step process (1. Choose method, 2. Provide details, 3. Receive confirmation)

**Primary CTA**: "Report a Concern" button (large, prominently placed)

##### Section 5: What Happens After You Report
- **H2**: "5. What Happens After You Report"
- **Content** (step-by-step process):
  1. **Acknowledgment**: You receive email confirmation within 1 hour (urgent) or 24 hours (non-urgent)
  2. **Triage**: Safeguarding Officer assesses severity (critical/high/medium/low)
  3. **Immediate action** (if needed): User suspended, contact blocked, emergency services called
  4. **Investigation**: We gather evidence (messages, bookings, interviews)
  5. **External escalation** (if criteria met): We refer to Safeguarding Adults Board or police
  6. **Outcome**: You're notified of investigation outcome and actions taken
  7. **Support**: We provide resources and referrals to support services

**Visual Treatment**: Timeline or numbered steps (for clarity)

##### Section 6: Response Times
- **H2**: "6. Our Response Times"
- **Content** (table or list):
  - **Critical severity** (immediate danger): <2 hours acknowledgment, immediate action
  - **High severity** (significant risk): <4 hours acknowledgment, investigation within 24 hours
  - **Medium severity** (moderate concern): <24 hours acknowledgment, investigation within 7 days
  - **Low severity** (minor concern): <48 hours acknowledgment, investigation within 14 days
  - **External escalation**: Section 42 qualifying incidents referred to Safeguarding Adults Board within 24 hours
  - **Reporter updates**: You're notified at key stages (investigation started, external escalation, resolution)

##### Section 7: Escalation to External Authorities
- **H2**: "7. When We Escalate to Authorities"
- **Content**:
  - **Safeguarding Adults Board (SAB)**: When Care Act 2014 Section 42 criteria met (adult with care needs, experiencing abuse, unable to protect self)
  - **Police**: When criminal offence suspected (assault, theft, fraud, sexual abuse)
  - **Care Quality Commission (CQC)**: If platform safeguarding failures identified
  - **Local authority adult social care**: Referrals for care assessments and support
  - We cooperate fully with external investigations and share information lawfully (GDPR safeguarding exemption)

##### Section 8: Our Verification Process
- **H2**: "8. How We Verify Caregivers"
- **Content**:
  - **Identity verification**: All caregivers verify ID (passport or driving licence)
  - **Right to work**: All caregivers verify right to work in UK
  - **Voluntary DBS verification**: Caregivers encouraged to provide voluntary DBS certificate (trust signal, not mandatory at Tier 1)
  - **Profile moderation**: All profiles reviewed before going live
  - **Ongoing monitoring**: We monitor messages for safeguarding keywords, review reported concerns
  - **Verification badges**: Profiles display verification status (ID verified, DBS verified)
  - **Not a guarantee**: Verification reduces risk but does not eliminate it. Care receivers should assess caregiver suitability.

##### Section 9: Emergency Contacts
- **H2**: "9. Emergency Contacts"
- **Content**:
  - **Immediate danger**: 999 (Police/Ambulance)
  - **Platform safeguarding hotline**: [SAFEGUARDING_HOTLINE] (24/7)
  - **Email**: safeguarding@[PLATFORM_DOMAIN]
  - **National helplines**:
    - Hourglass (Older Persons Abuse Helpline): 0808 808 8141
    - National Domestic Abuse Helpline: 0808 2000 247
    - NSPCC Helpline (if child safeguarding): 0808 800 5000
  - **Local Safeguarding Adults Board**: Find your local SAB: https://www.gov.uk/find-local-council

**Visual Treatment**: Large, bold phone numbers (easy to read, easy to tap on mobile)

##### Section 10: Support Resources
- **H2**: "10. Support Resources"
- **Content**:
  - **Local authority adult social care**: Care assessments and support services
  - **Independent advocacy**: Support through safeguarding enquiries
  - **Age UK**: General support for older people
  - **Citizens Advice**: Legal and benefits advice
  - **Hourglass**: Specialist support for victims of elder abuse
  - **Local domestic abuse services**: Find local services: https://www.nationaldahelpline.org.uk/
  - We can provide referrals to these services if you report a concern

**Component Reuse**: TEXT, TEXT-LINK, DIVIDER (for section breaks)

#### Block 6: Report CTA Section (Bottom)
- **Purpose**: Reinforce reporting CTAs before footer
- **Priority**: Primary
- **Elements**:
  - **Section Heading**: "Need to Report a Concern?"
  - **Body Text**: "If you or someone you know is experiencing abuse or neglect, please report it to us. Your report will be treated seriously and confidentially."
  - **Primary CTA**: "Report a Concern" button (large, blue, same as emergency banner)
  - **Secondary CTA**: "Call Safeguarding Hotline: [PHONE]" button (click-to-call on mobile)

#### Block 7: Footer (Global)
- **Purpose**: Legal links, company info, contact
- **Priority**: Secondary
- **Elements**:
  - Links: Home | About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact
  - Copyright: "© 2026 Platform Name. All rights reserved."

**Component Reuse**: FOOTER-GLOBAL (from dashboard-shared-components.md)

---

### 2.2 Interactive Elements

1. **Emergency "Call 999" Button** (Block 2)
   - Type: Primary CTA
   - Action (mobile): Open phone dialer with 999
   - Action (desktop): Display modal "Call 999 on your phone"
   - Keyboard: Focusable
   - Visual: Red background, white text, large (56px height on mobile)

2. **"Report a Concern" Button** (Block 5, Section 4 and Block 6)
   - Type: Primary CTA
   - Action (authenticated): Open safeguarding report form (modal or separate page)
   - Action (unauthenticated): Display options (email, phone, website form)
   - Keyboard: Focusable
   - Visual: Blue background, white text, large (56px height on mobile)

3. **"Call Safeguarding Hotline" Button** (Block 6)
   - Type: Secondary CTA
   - Action (mobile): Open phone dialer with safeguarding hotline number
   - Action (desktop): Display number in copyable format
   - Keyboard: Focusable

4. **Table of Contents Links** (Block 4)
   - Type: Anchor links
   - Action: Smooth scroll to corresponding section
   - Keyboard: Tab to focus, Enter to navigate
   - Active state: Highlight current section in ToC as user scrolls

5. **Back to Top Button** (appears after scrolling)
   - Type: Floating button (bottom right)
   - Action: Smooth scroll to top of page
   - Keyboard: Focusable
   - Visibility: Appears after scrolling >500px

6. **External Links** (within content)
   - National helplines (Hourglass, National Domestic Abuse Helpline, NSPCC)
   - Local SAB finder: https://www.gov.uk/find-local-council
   - Type: Links (open in new tab with icon)

7. **Header Logo** (Block 1)
   - Type: Link
   - Action: Navigate to SCR-PUB-001 (Homepage)
   - Keyboard: Focusable

8. **Log In Link** (Block 1, unauthenticated)
   - Type: Link
   - Action: Navigate to SCR-AUTH-005 (Login)
   - Keyboard: Focusable

9. **Footer Links** (Block 7)
   - Type: Links
   - Action: Navigate to other policy pages or homepage
   - Keyboard: Focusable

---

### 2.3 Data Display Elements

#### Static Content

- **All text content** (defined in Block 5, Sections 1-10)
- **Last updated date** (displayed in Block 3)
- **Emergency contacts** (Section 9: 999, safeguarding hotline, email)
- **National helpline numbers** (Section 9)

#### No Dynamic Data

This is a static policy document. Content is updated manually and versioned (last updated date changes when policy revised).

---

## 3. ASCII Wireframes

### 3.1 Desktop (1440px+) - Unauthenticated State

```
+------------------------------------------------------------------------------+
|  ⚠️  IN IMMEDIATE DANGER? CALL 999 NOW                                      |
|  If you or someone you know is in immediate danger, call 999 immediately.   |
|  [📞 Call 999]     For non-urgent concerns, see reporting options below.    |
+------------------------------------------------------------------------------+
|  [LOGO]                                                         [Log In]     |
+------------------------------------------------------------------------------+
|                                                                              |
|  +----------------+  +---------------------------------------------------+  |
|  | CONTENTS       |  |  H1: Safeguarding Policy                          |  |
|  |                |  |  Our commitment to protecting vulnerable adults   |  |
|  | 1. Commitment  |  |  Last updated: January 2026                       |  |
|  | 2. Principles  |  +---------------------------------------------------+  |
|  | 3. Abuse Types |  |                                                   |  |
|  | 4. How to      |  |  1. OUR COMMITMENT TO SAFEGUARDING                |  |
|  |    Report      |  |                                                   |  |
|  | 5. What Happens|  |  [Platform Name] is committed to protecting       |  |
|  | 6. Response    |  |  vulnerable adults using our platform. Under the  |  |
|  |    Times       |  |  Care Act 2014, we have safeguarding duties to    |  |
|  | 7. Escalation  |  |  prevent, identify, and respond to abuse and      |  |
|  | 8. Verification|  |  neglect.                                         |  |
|  | 9. Emergency   |  |                                                   |  |
|  |    Contacts    |  |  We take a zero-tolerance approach to abuse.      |  |
|  | 10. Support    |  |  All safeguarding concerns are investigated       |  |
|  |                |  |  promptly and escalated to authorities when       |  |
|  | [STICKY TOC]   |  |  appropriate.                                     |  |
|  |                |  |                                                   |  |
|  +----------------+  |  ─────────────────────────────────────────────    |  |
|                      |                                                   |  |
|                      |  2. SIX SAFEGUARDING PRINCIPLES                   |  |
|                      |                                                   |  |
|                      |  +---------------+  +---------------+  +--------+ |  |
|                      |  | Empowerment   |  | Prevention    |  | Propor-| |  |
|                      |  | Person-led    |  | Action before |  | tionali| |  |
|                      |  | decisions     |  | harm occurs   |  | ty     | |  |
|                      |  +---------------+  +---------------+  +--------+ |  |
|                      |                                                   |  |
|                      |  +---------------+  +---------------+  +--------+ |  |
|                      |  | Protection    |  | Partnership   |  | Account| |  |
|                      |  | Support for   |  | Work together |  | ability| |  |
|                      |  | those in need |  | with services |  |        | |  |
|                      |  +---------------+  +---------------+  +--------+ |  |
|                      |                                                   |  |
|                      |  ─────────────────────────────────────────────    |  |
|                      |                                                   |  |
|                      |  3. TYPES OF ABUSE WE TAKE SERIOUSLY              |  |
|                      |                                                   |  |
|                      |  • Physical Abuse: Hitting, slapping, rough       |  |
|                      |    handling                                       |  |
|                      |  • Emotional Abuse: Verbal abuse, threats,        |  |
|                      |    intimidation                                   |  |
|                      |  • Sexual Abuse: Non-consensual contact,          |  |
|                      |    harassment                                     |  |
|                      |  • Financial Abuse: Theft, fraud, exploitation    |  |
|                      |  • Neglect: Abandonment, caregiver no-show        |  |
|                      |  • Discriminatory Abuse: Abuse based on age,      |  |
|                      |    disability, race                               |  |
|                      |                                                   |  |
|                      |  ─────────────────────────────────────────────    |  |
|                      |                                                   |  |
|                      |  4. HOW TO REPORT A SAFEGUARDING CONCERN          |  |
|                      |                                                   |  |
|                      |  Authenticated users:                             |  |
|                      |  Click "Report Safeguarding Concern" button       |  |
|                      |                                                   |  |
|                      |  Public reporting:                                |  |
|                      |  • Email: safeguarding@platform.com               |  |
|                      |  • Phone: 0800 XXX XXXX (24/7)                    |  |
|                      |  • Website form (no login required)               |  |
|                      |                                                   |  |
|                      |  In immediate danger? Call 999 first.             |  |
|                      |                                                   |  |
|                      |  [Report a Concern]                               |  |
|                      |                                                   |  |
|                      |  ─────────────────────────────────────────────    |  |
|                      |                                                   |  |
|                      |  9. EMERGENCY CONTACTS                            |  |
|                      |                                                   |  |
|                      |  • Immediate danger: 999                          |  |
|                      |  • Platform hotline: 0800 XXX XXXX (24/7)         |  |
|                      |  • Email: safeguarding@platform.com               |  |
|                      |  • Hourglass: 0808 808 8141                       |  |
|                      |  • National Domestic Abuse: 0808 2000 247         |  |
|                      |                                                   |  |
|                      |  (Sections 5-8, 10 continue...)                   |  |
|                      |                                                   |  |
|                      +---------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  NEED TO REPORT A CONCERN?                                             |  |
|  |                                                                        |  |
|  |  If you or someone you know is experiencing abuse or neglect, please   |  |
|  |  report it to us. Your report will be treated seriously and            |  |
|  |  confidentially.                                                       |  |
|  |                                                                        |  |
|  |  [Report a Concern]                    [Call Hotline: 0800 XXX XXXX]  |  |
|  +------------------------------------------------------------------------+  |
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
|  ⚠️  IN IMMEDIATE DANGER? CALL 999 NOW                                      |
|  [📞 Call 999]     For non-urgent concerns, see reporting options below.    |
+------------------------------------------------------------------------------+
|  [LOGO]             Dashboard   My Bookings   Messages            [USER▼]   |
+------------------------------------------------------------------------------+
|                                                                              |
|  (Same content as unauthenticated state)                                    |
|  (ToC sidebar, safeguarding sections, Report CTA, footer)                   |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.3 Mobile (320px-767px) - Unauthenticated State

```
+--------------------------------------+
|  ⚠️  IN IMMEDIATE DANGER?            |
|  CALL 999 NOW                        |
|                                      |
|  If you or someone you know is in    |
|  immediate danger, call 999 (Police/ |
|  Ambulance) immediately.             |
|                                      |
|  [📞 Call 999]                       |
|                                      |
|  For non-urgent safeguarding         |
|  concerns, see reporting options     |
|  below.                              |
+--------------------------------------+
|  [LOGO]                     [Log In] |
+--------------------------------------+
| [Jump to Section ▼] (sticky)         |
+--------------------------------------+
|                                      |
|  H1: Safeguarding Policy             |
|                                      |
|  Our commitment to protecting        |
|  vulnerable adults using our         |
|  platform                            |
|                                      |
|  Last updated: January 2026          |
|                                      |
|  ────────────────────────────────    |
|                                      |
|  1. OUR COMMITMENT TO SAFEGUARDING   |
|                                      |
|  [Platform Name] is committed to     |
|  protecting vulnerable adults using  |
|  our platform. Under the Care Act    |
|  2014, we have safeguarding duties   |
|  to prevent, identify, and respond   |
|  to abuse and neglect.               |
|                                      |
|  We take a zero-tolerance approach   |
|  to abuse. All safeguarding concerns |
|  are investigated promptly.          |
|                                      |
|  ────────────────────────────────    |
|                                      |
|  2. SIX SAFEGUARDING PRINCIPLES      |
|                                      |
|  +------------------------------+    |
|  | Empowerment                  |    |
|  | Person-led decisions         |    |
|  +------------------------------+    |
|                                      |
|  +------------------------------+    |
|  | Prevention                   |    |
|  | Action before harm occurs    |    |
|  +------------------------------+    |
|                                      |
|  +------------------------------+    |
|  | Proportionality              |    |
|  | Least intrusive response     |    |
|  +------------------------------+    |
|                                      |
|  (Protection, Partnership,           |
|   Accountability cards continue)     |
|                                      |
|  ────────────────────────────────    |
|                                      |
|  3. TYPES OF ABUSE WE TAKE           |
|     SERIOUSLY                        |
|                                      |
|  • Physical Abuse                    |
|    Hitting, slapping, rough handling |
|                                      |
|  • Emotional Abuse                   |
|    Verbal abuse, threats             |
|                                      |
|  • Sexual Abuse                      |
|    Non-consensual contact            |
|                                      |
|  • Financial Abuse                   |
|    Theft, fraud, exploitation        |
|                                      |
|  • Neglect                           |
|    Abandonment, caregiver no-show    |
|                                      |
|  • Discriminatory Abuse              |
|    Abuse based on age, disability    |
|                                      |
|  ────────────────────────────────    |
|                                      |
|  4. HOW TO REPORT A SAFEGUARDING     |
|     CONCERN                          |
|                                      |
|  Authenticated users:                |
|  Click "Report Safeguarding Concern" |
|  button                              |
|                                      |
|  Public reporting:                   |
|  • Email: safeguarding@platform.com  |
|  • Phone: 0800 XXX XXXX (24/7)       |
|  • Website form (no login required)  |
|                                      |
|  In immediate danger? Call 999 first.|
|                                      |
|  [Report a Concern]                  |
|                                      |
|  ────────────────────────────────    |
|                                      |
|  9. EMERGENCY CONTACTS               |
|                                      |
|  • Immediate danger: 999             |
|  • Platform hotline: 0800 XXX XXXX   |
|  • Email: safeguarding@platform.com  |
|  • Hourglass: 0808 808 8141          |
|  • National Domestic Abuse:          |
|    0808 2000 247                     |
|                                      |
|  ────────────────────────────────    |
|                                      |
|  (Sections 5-8, 10 continue...)      |
|                                      |
|  ────────────────────────────────    |
|                                      |
|  NEED TO REPORT A CONCERN?           |
|                                      |
|  If you or someone you know is       |
|  experiencing abuse or neglect,      |
|  please report it to us.             |
|                                      |
|  [Report a Concern]                  |
|                                      |
|  [Call Hotline: 0800 XXX XXXX]       |
|                                      |
|  ────────────────────────────────    |
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
| **Mobile** (320px-767px) | Single column, emergency banner full-width, sticky dropdown ToC, stacked content | Essential content only (emergency contacts CRITICAL) |
| **Tablet** (768px-1439px) | Single column, emergency banner full-width, collapsed accordion ToC at top, full content | Balanced |
| **Desktop** (1440px+) | Two-column (sticky ToC sidebar left, content right), emergency banner full-width, full layout | Full layout |

### 4.2 Layout Changes by Viewport

#### Desktop (1440px+)
- **Emergency Banner**: Full-width, centered content, horizontal layout (text left, CTA right)
- **ToC**: Sticky sidebar (250px width, fixed as user scrolls)
- **Content**: Main content area (900px max-width, right of ToC)
- **Safeguarding Principles**: 3-column grid (2 rows of 3 cards)
- **Back to Top**: Floating button (bottom right, appears after scrolling >500px)

#### Tablet (768px-1439px)
- **Emergency Banner**: Full-width, centered content, vertical layout (stacked)
- **ToC**: Collapsed accordion at top of page (expandable, non-sticky)
- **Content**: Full-width, max-width 800px, centered
- **Safeguarding Principles**: 2-column grid (3 rows)
- **Back to Top**: Floating button (bottom right)

#### Mobile (320px-767px)
- **Emergency Banner**: Full-width, vertical layout, large CTA (56px height)
- **ToC**: Sticky dropdown at top (fixed header, "Jump to Section" dropdown)
- **Content**: Full-width, padding 16px
- **Safeguarding Principles**: Single column, stacked cards
- **Font sizes**: Larger (18px body text for readability)
- **Emergency contacts**: Large, bold phone numbers (easy to read, easy to tap)
- **Back to Top**: Sticky button (bottom center, full width)

### 4.3 Touch Target Sizes

**Mobile Requirements** (CRITICAL for emergency contacts):
- "Call 999" button: **56px height**, full width, red background
- "Report a Concern" button: **56px height**, full width, blue background
- "Call Safeguarding Hotline" button: **56px height**, full width
- ToC dropdown: **56px height**
- Anchor links in ToC dropdown: **48px height**
- External links (Hourglass, National Domestic Abuse): **48px height**
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
|  [Loading skeleton - Emergency banner]                                      |
|  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         |
|                                                                              |
+------------------------------------------------------------------------------+
```

**ToC Scroll State** (desktop):
- ToC sidebar remains fixed as content scrolls
- Active section highlighted in ToC (bold text, blue background)

### 5.2 Empty States

**Not Applicable**: This is a static policy document with no dynamic content.

### 5.3 Error States

**Page Load Error**:
```
+------------------------------------------------------------------------------+
|  [LOGO]                                                         [Log In]     |
+------------------------------------------------------------------------------+
|                                                                              |
|  ⚠️  Unable to load Safeguarding Policy                                     |
|     Please try refreshing the page or contact support.                      |
|                                                                              |
|  Emergency contacts:                                                        |
|  • Call 999 if in immediate danger                                          |
|  • Platform hotline: 0800 XXX XXXX                                          |
|  • Email: safeguarding@platform.com                                         |
|                                                                              |
|  [Refresh Page]                                                             |
|                                                                              |
+------------------------------------------------------------------------------+
```

**CRITICAL**: Even if page fails to load, emergency contacts must be displayed.

### 5.4 Authentication State Variants

**Unauthenticated** (shown in wireframe 3.1):
- Header: navigation-header-public (logo + "Log In" link)
- "Report a Concern" button: Opens modal with options (email, phone, website form)

**Authenticated (Care Receiver)** (shown in wireframe 3.2):
- Header: navigation-header-auth (logo + Dashboard + My Bookings + Messages + User dropdown)
- "Report a Concern" button: Opens safeguarding report form (in-app)

**Authenticated (Caregiver)**:
- Header: navigation-header-auth (caregiver variant)
- "Report a Concern" button: Opens safeguarding report form (in-app, can report about care receiver)

**Authenticated (Admin)**:
- Header: navigation-header-auth (admin variant)
- "Report a Concern" button: Redirects to admin safeguarding dashboard

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

#### Perceivable

- **Text Alternatives**:
  - ✅ Icons for abuse types include text labels (not icon-only)
  - ✅ Emergency banner alert icon (⚠️) has ARIA label "Warning"

- **Distinguishable**:
  - ✅ Color contrast: 4.5:1 for body text, 3.0:1 for large headings
  - ✅ Emergency banner: High contrast (red/orange background, white text)
  - ✅ Font sizes: 16px minimum for body text (18px on mobile for elderly users)
  - ✅ Emergency contacts: Large, bold phone numbers (20px+)
  - ✅ Clear visual hierarchy: H1 (page title), H2 (section headings)
  - ✅ Active ToC link highlighted with background color (not color-only)
  - ✅ External links underlined (not color-only indication)

#### Operable

- **Keyboard Accessible**:
  - ✅ Tab order: Emergency banner "Call 999" button → Header links → ToC links → Content → "Report a Concern" button → External links → Back to Top → Footer links
  - ✅ Enter key: Activate CTAs, navigate to ToC anchor link, activate external links
  - ✅ All buttons and links focusable via Tab
  - ✅ Focus indicators: 3px solid border with high contrast

- **Navigable**:
  - ✅ Skip to main content link
  - ✅ Page title: "[Platform Name] - Safeguarding Policy"
  - ✅ Heading hierarchy: H1 (page title) → H2 (section headings: 1. Our Commitment, 2. Six Safeguarding Principles, etc.)
  - ✅ Landmark regions: `<header>`, `<nav>` (ToC), `<main>`, `<footer>`, `role="alert"` (emergency banner)
  - ✅ Anchor links: Smooth scroll to sections with focus moved to heading

#### Understandable

- **Readable**:
  - ✅ Language declared: `<html lang="en-GB">`
  - ✅ Clear section headings (numbered: 1. Our Commitment, 2. Six Safeguarding Principles)
  - ✅ Plain English (safeguarding jargon minimized)
  - ✅ Key terms defined (Care Act 2014, Section 42, Safeguarding Adults Board)
  - ✅ Emergency guidance prominent (Call 999 if immediate danger)

- **Predictable**:
  - ✅ Consistent navigation (header same across all public pages)
  - ✅ ToC links scroll smoothly (no sudden jumps)
  - ✅ "Back to Top" button always appears in same position (bottom right)
  - ✅ CTAs clearly labeled ("Report a Concern", "Call 999", "Call Safeguarding Hotline")

- **Input Assistance**:
  - ✅ No form inputs on this page (read-only document, CTAs navigate to report form)

#### Robust

- **Compatible**:
  - ✅ Valid HTML5 semantic markup (`<article>`, `<section>`, `<h1>`, `<h2>`)
  - ✅ ARIA landmarks: `role="alert"` for emergency banner, `role="navigation"` for ToC, `role="main"` for content
  - ✅ Tested with screen readers (NVDA, JAWS, VoiceOver)

### 6.2 Focus Order

**Tab Order** (Desktop, Unauthenticated):
1. Skip to main content link
2. **Emergency Banner**:
   - "Call 999" button (red, high priority)
3. Header logo (clickable)
4. Header "Log In" button
5. **Table of Contents**:
   - ToC link: "1. Our Commitment"
   - ToC link: "2. Safeguarding Principles"
   - ToC link: "3. Types of Abuse"
   - ... (all 10 ToC links)
6. **Main Content**:
   - Section headings (focusable for navigation via anchor links)
   - "Report a Concern" button (Section 4)
   - External links (Hourglass, National Domestic Abuse, SAB finder)
7. **Report CTA Section** (Block 6):
   - "Report a Concern" button
   - "Call Safeguarding Hotline" button
8. "Back to Top" button (floating, bottom right)
9. Footer links (Home, About, How It Works, Safety, Terms, Privacy, Safeguarding, Contact)

### 6.3 Screen Reader Announcements

**Page Load**:
- "Alert. In immediate danger? Call 999 now. If you or someone you know is in immediate danger, call 999 immediately. Button, Call 999."
- "[Platform Name]. Safeguarding Policy. Our commitment to protecting vulnerable adults using our platform. Last updated January 2026. Navigation, Table of Contents. Main content, Our Commitment to Safeguarding."

**ToC Navigation**:
- User focuses on ToC link "4. How to Report"
- Screen reader: "Link. Four. How to Report a Safeguarding Concern."
- User presses Enter
- Page scrolls to Section 4, focus moves to H2 heading
- Screen reader: "Heading level 2. Four. How to Report a Safeguarding Concern."

**Emergency Banner**:
- User focuses on "Call 999" button
- Screen reader: "Button. Call 999. Emergency contact. In immediate danger? Call 999 now."

**"Report a Concern" Button**:
- User focuses on "Report a Concern" button
- Screen reader: "Button. Report a Concern. Opens safeguarding report form."

**External Link**:
- User focuses on Hourglass helpline link
- Screen reader: "Link, external. Hourglass. Older Persons Abuse Helpline. 0808 808 8141. Opens in new window."

**Back to Top Button**:
- "Button. Back to top. Scroll to top of page."

### 6.4 Elderly User Considerations

**Cognitive Load Reduction**:
- ✅ Clear section headings (numbered, descriptive)
- ✅ Table of contents for quick navigation (no endless scrolling)
- ✅ Emergency contacts prominently displayed (Section 9, emergency banner)
- ✅ Short paragraphs (3-4 sentences max)
- ✅ Bullet lists for easy scanning (types of abuse, reporting methods)
- ✅ Step-by-step process for reporting (Section 4, Section 5)

**Vision Support**:
- ✅ Large font sizes (18px body text on mobile)
- ✅ High contrast text (black on white, 4.5:1 minimum)
- ✅ Clear visual hierarchy (H1, H2, body text, bullet lists)
- ✅ Generous line height (1.6)
- ✅ Large, bold phone numbers (20px+ for emergency contacts)

**Motor Control**:
- ✅ Large touch targets (56px height on mobile for all CTAs)
- ✅ "Back to Top" button (no scrolling required to return to top)
- ✅ No hover-only interactions (all links clickable/tappable)
- ✅ Click-to-call on mobile (emergency contacts)

**Trust & Safety**:
- ✅ Transparent safeguarding process (clear explanation of reporting, investigation, escalation)
- ✅ Care Act 2014 referenced (demonstrates legal compliance)
- ✅ Six Safeguarding Principles prominently displayed (builds trust)
- ✅ Emergency contacts prominently displayed (reassurance)
- ✅ Last updated date visible (demonstrates ongoing review)

**Emotional Support**:
- ✅ Reassuring language ("We take safeguarding seriously", "Your report will be treated confidentially")
- ✅ Clear guidance ("If in immediate danger, call 999")
- ✅ Support resources provided (Section 10)

---

## 7. Navigation & Interactions

### 7.1 Primary User Flows

**Flow 1: Elderly User Concerned About Caregiver**
1. User has concern about caregiver's conduct
2. User navigates to footer → "Safeguarding" link
3. Safeguarding Policy page loads (SCR-PUB-008)
4. User sees emergency banner: "In Immediate Danger? Call 999"
5. User not in immediate danger, scrolls to Section 4
6. User clicks ToC link "4. How to Report"
7. Page scrolls to Section 4
8. User reads reporting methods (in-app, email, phone)
9. User clicks "Report a Concern" button
10. Modal opens with reporting options (email, phone, website form)
11. User selects phone option
12. User calls safeguarding hotline, reports concern

**Flow 2: Family Member Reads About Safeguarding Before Booking**
1. Family member is considering platform for elderly parent
2. Family member navigates to SCR-PUB-008 (Safeguarding Policy)
3. User reads Section 1 (Our Commitment)
4. User clicks ToC link "2. Safeguarding Principles"
5. Page scrolls to Section 2
6. User reads Six Safeguarding Principles (empowerment, prevention, protection, etc.)
7. User clicks ToC link "8. Our Verification Process"
8. Page scrolls to Section 8
9. User reads about ID verification, DBS checks, profile moderation
10. User feels reassured, closes page, proceeds to register

**Flow 3: Caregiver Reports Self-Neglect by Care Receiver**
1. Caregiver has concern about care receiver's living conditions (self-neglect)
2. Caregiver navigates to SCR-PUB-008 (Safeguarding Policy)
3. Caregiver clicks ToC link "3. Types of Abuse"
4. Page scrolls to Section 3
5. Caregiver reads: "Self-Neglect: Care receiver neglecting hygiene, nutrition, medical care"
6. Caregiver clicks "Report a Concern" button (authenticated)
7. In-app safeguarding report form opens
8. Caregiver completes form (incident type: self-neglect, description, date)
9. Caregiver submits report
10. Confirmation displayed with case reference number

**Flow 4: External Professional Seeks Reporting Information**
1. Social worker has concern about platform user
2. Social worker Googles "report abuse [Platform Name]"
3. Safeguarding Policy page loads (SCR-PUB-008)
4. Social worker clicks ToC link "9. Emergency Contacts"
5. Page scrolls to Section 9
6. Social worker finds email: safeguarding@platform.com
7. Social worker sends email with concern details
8. Platform receives email, sends auto-reply with case reference number

**Flow 5: User Needs Immediate Help**
1. User or family member discovers immediate danger (assault in progress)
2. User navigates to Safeguarding Policy (or any page with emergency banner)
3. User sees emergency banner: "In Immediate Danger? Call 999 Now"
4. User clicks "📞 Call 999" button (mobile)
5. Phone dialer opens with 999
6. User calls 999, reports emergency
7. After emergency resolved, user clicks "Report a Concern" to notify platform

### 7.2 Alternative Paths

**Path A: Mobile User Navigates via Sticky Dropdown**
1. User loads Safeguarding Policy on mobile
2. Sticky dropdown "Jump to Section" appears at top (below emergency banner)
3. User taps dropdown
4. Dropdown expands, shows all 10 sections
5. User taps "9. Emergency Contacts"
6. Page scrolls to Section 9, dropdown collapses
7. User sees emergency phone numbers
8. User taps phone number (click-to-call)
9. Phone dialer opens

**Path B: Screen Reader User Navigates by Headings**
1. Screen reader user loads Safeguarding page
2. User presses H key (navigate by headings)
3. Screen reader jumps to next H2 heading: "2. Six Safeguarding Principles"
4. User presses H again
5. Screen reader jumps to "3. Types of Abuse We Take Seriously"
6. User reads section
7. User presses H to continue navigating

### 7.3 Interaction Patterns

**ToC Anchor Link Smooth Scroll**:
- Click "4. How to Report" → Smooth scroll to Section 4 (1 second duration)
- Offset: -80px (to account for sticky emergency banner and header on mobile)
- Accessibility: Focus moves to section heading (H2)

**Active ToC Highlighting** (desktop):
- As user scrolls, ToC highlights current section (bold text, blue background)
- Uses Intersection Observer API to detect which section is visible
- Updates ToC highlight in real-time

**Back to Top Button**:
- Appears after scrolling >500px
- Click → Smooth scroll to top (1 second duration), emergency banner becomes visible
- Focus moves to emergency banner "Call 999" button

**"Call 999" Button** (mobile):
- Click → Open phone dialer with 999 (tel:999)
- Accessibility: ARIA label "Emergency call. Dial 999 for police or ambulance."

**"Report a Concern" Button**:
- Authenticated: Opens in-app safeguarding report form (modal or separate page)
- Unauthenticated: Opens modal with options (email safeguarding@platform.com, call hotline, fill website form)

**Click-to-Call Phone Numbers** (mobile):
- All phone numbers (999, safeguarding hotline, Hourglass, National Domestic Abuse) are clickable
- Click → Open phone dialer with number
- Accessibility: ARIA label "Call [service name] at [number]"

**External Links**:
- SAB finder, Hourglass, National Domestic Abuse: Open in new tab (target="_blank", rel="noopener noreferrer")
- All external links have icon or text indicating "opens in new window"

---

## 8. Design Notes

### 8.1 Design Principles Applied

**1. Safety & Trust First**
- Emergency banner prominently displayed (top of page, high contrast)
- Emergency contacts prominently displayed (Section 9, easy to find)
- Clear reporting procedures (Section 4, step-by-step)
- Reassuring language ("We take safeguarding seriously", "Your report will be treated confidentially")

**2. Accessibility First**
- Large font sizes (16px body, 18px on mobile)
- High contrast text (4.5:1 minimum)
- Large touch targets (56px on mobile for all CTAs)
- Screen reader friendly (semantic HTML, ARIA landmarks, ARIA labels for emergency banner)
- Keyboard navigation (ToC links, Back to Top, CTAs)

**3. Elderly-Friendly**
- Large, bold phone numbers (20px+ for emergency contacts)
- Click-to-call on mobile (no manual dialing required)
- Clear visual hierarchy (H1, H2, body text, bullet lists, cards)
- No time pressure or complex interactions
- Generous white space (16px+ margins)

**4. Care Act 2014 Compliance**
- Six Safeguarding Principles prominently displayed (Section 2)
- Clear explanation of platform's safeguarding duties
- Transparent escalation procedures (Section 7)
- Reference to Section 42 criteria (SAB escalation)

**5. Mobile-First**
- Emergency banner optimized for mobile (full-width, large CTA)
- Sticky ToC dropdown on mobile (easy access to sections)
- "Back to Top" button on mobile (no endless scrolling)
- Larger font sizes on mobile (18px body text)
- Click-to-call phone numbers (one tap to call)

### 8.2 Content Hierarchy

**Visual Hierarchy**:
1. **Emergency Banner** (CRITICAL): "In Immediate Danger? Call 999 Now"
2. **Page Title** (H1): "Safeguarding Policy"
3. **Subheading**: One-sentence commitment statement
4. **Last Updated Date**: Immediately below subheading
5. **Table of Contents**: Sidebar (desktop) or sticky dropdown (mobile)
6. **Section Headings** (H2): "1. Our Commitment", "2. Six Safeguarding Principles", etc.
7. **Body Text**: Safeguarding policy content for each section
8. **Safeguarding Principles Cards**: 6 cards (visual treatment for scannability)
9. **Bullet Lists**: Types of abuse, reporting methods, emergency contacts (easy scanning)
10. **Report CTA Section** (bottom): Reinforce reporting options before footer

**Information Priority**:
- **CRITICAL**: Emergency banner (999), Emergency contacts (Section 9)
- **HIGH**: How to Report (Section 4), What Happens Next (Section 5), Safeguarding Principles (Section 2)
- **MEDIUM**: Types of Abuse (Section 3), Response Times (Section 6), Our Verification Process (Section 8)
- **LOW**: Escalation to Authorities (Section 7), Support Resources (Section 10)

### 8.3 Color & Visual Design

**Emergency Banner**:
- Background: Red (#DC2626) or Orange (#EA580C) (high visibility)
- Text: White (#FFFFFF)
- CTA: White background, red text (inverted for emphasis)

**Text Colors**:
- Headings: Dark gray (#1F2937)
- Body text: Medium gray (#4B5563)
- Links: Blue (#3B82F6), underlined
- Active ToC link: Blue background (#E0F2FE), bold text
- External link icon: Blue (#3B82F6)

**Safeguarding Principles Cards**:
- Background: Light blue (#E0F2FE)
- Border: Blue (#3B82F6)
- Icon/emoji for each principle (empowerment, prevention, etc.)

**"Report a Concern" Button**:
- Background: Blue (#3B82F6)
- Text: White (#FFFFFF)
- Hover: Darker blue (#2563EB)

**Component Reuse**:
- Public header: navigation-header-public component
- Authenticated header: navigation-header-auth component
- Footer: footer-global component
- Emergency banner: alert-banner component (adapted)
- ToC: Custom component (same as SCR-PUB-006, SCR-PUB-007)
- Back to Top: Button component

### 8.4 Typography Scale

**Recommended Sizes**:
- **H1** (Page title): 32px (desktop), 28px (tablet), 24px (mobile)
- **H2** (Section headings): 24px (desktop), 22px (tablet), 20px (mobile)
- **Body text**: 16px (desktop, tablet), 18px (mobile for elderly users)
- **Emergency banner heading**: 24px (desktop), 20px (mobile)
- **Emergency contacts** (phone numbers): 20px (desktop), 22px (mobile, bold)
- **Last updated date**: 14px (all viewports)
- **ToC links**: 16px (all viewports)
- **Bullet lists**: 16px (desktop, tablet), 18px (mobile)

**Font Weights**:
- **H1**: Bold (700)
- **H2**: Semibold (600)
- **Body text**: Regular (400)
- **Emergency contacts**: Bold (700)
- **ToC links**: Regular (400), bold (700) when active
- **CTAs**: Semibold (600)

### 8.5 Spacing & Layout

**Emergency Banner Spacing**:
- Padding: 24px (desktop), 16px (mobile)
- Margin bottom: 0 (banner directly above header)

**Section Spacing**:
- Between sections: 48px (desktop), 32px (mobile)
- Between paragraphs: 16px
- Line height: 1.6 (for readability)
- Bullet list spacing: 8px between items
- Card spacing (Safeguarding Principles): 16px horizontal gap (desktop), 16px vertical gap (mobile)

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
4. **alert-banner**: Emergency banner (adapted for safeguarding emergency)
5. **button**: "Call 999", "Report a Concern", "Call Safeguarding Hotline", "Back to Top"

**New Components Introduced** (same as SCR-PUB-006, SCR-PUB-007):
1. **TABLE-OF-CONTENTS-SIDEBAR**: Sticky sidebar with section links (desktop)
2. **TABLE-OF-CONTENTS-DROPDOWN**: Sticky dropdown with section links (mobile)
3. **LEGAL-SECTION**: Section container with H2 heading, body text, divider

**New Components for Safeguarding Page**:
1. **SAFEGUARDING-PRINCIPLE-CARD**: Card with icon, heading, body text (for Section 2)
2. **EMERGENCY-BANNER**: Full-width alert with CTA (red/orange background, white text)

---

## 9. Cross-References

### Source Documents

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - SCR-PUB-008 details (lines 462-512)

**Safeguarding Specification**:
- `/docs/product/features/tier1-safeguarding-specification.md` - Comprehensive safeguarding system spec (Care Act 2014 compliance, incident types, reporting mechanisms, response SLAs)

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-PUB-008 route definition and access control

**Related Screens**:
- SCR-PUB-001: Homepage - Exit point via logo, entry point via "Safety" link
- SCR-PUB-006: Terms of Service - Related legal page (footer link)
- SCR-PUB-007: Privacy Policy - Related legal page (footer link)
- SCR-AUTH-005: Login - Entry point via "Log In" link
- SCR-CR-020: Safeguarding Report (R1) - Exit point via "Report a Concern" (authenticated)

---

## 10. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | UX Designer | Initial wireframes for Safeguarding Policy (Care Act 2014-compliant public page) |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF

**Next Steps**:
1. Legal/compliance team reviews and finalizes Safeguarding text (Sections 1-10) with Safeguarding Lead
2. Confirm safeguarding hotline number (Section 9, emergency banner)
3. Figma designer creates high-fidelity mockups for emergency banner, ToC sidebar, and safeguarding principles cards
4. Visual design applies typography scale, spacing, and color scheme (emergency banner red/orange)
5. Engineering handoff with smooth scroll, active ToC highlighting, and click-to-call functionality (tel: links)
6. Accessibility testing with screen readers (emergency banner ARIA alert)
