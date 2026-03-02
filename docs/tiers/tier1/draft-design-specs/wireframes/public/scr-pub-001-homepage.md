# Homepage Wireframes (SCR-PUB-001)

**Document Purpose**: ASCII wireframes and complete element inventory for Homepage (SCR-PUB-001)

**Screen ID**: SCR-PUB-001
**Screen Name**: Homepage
**User Role**: All visitors (authenticated and unauthenticated)
**Route**: `/`
**R0/R1**: R0 (Launch-critical)
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

The Homepage is the primary entry point for all users (authenticated and unauthenticated). It explains the platform's value proposition, builds trust through safety commitments, and drives registration for both care receivers and caregivers.

**Key Functions**:
- Communicate value proposition for elderly care marketplace
- Drive registration for care receivers, family members, and caregivers
- Build trust through safety commitments and verification badges
- Explain how the platform works (3-step process)
- Provide quick postcode search for unauthenticated visitors
- Redirect authenticated users to role-appropriate dashboards

**Critical Constraints**:
- Must use `navigation-header-public` component (NOT the authenticated header)
- Authentication state determines CTA behavior (see section 1.3)
- Companionship services only (no personal care)
- Must display trust signals prominently (DBS verification, secure payments, safeguarding support)

### 1.2 Entry Points

**Direct Navigation**:
- User types URL: `platform-name.co.uk` → Load homepage
- External links (Google, social media, ads) → Load homepage

**Logout**:
- Any authenticated screen → "Log out" → Redirect to homepage (unauthenticated state)

**Email Links**:
- Marketing emails → Click link → Load homepage

### 1.3 Exit Points

**Unauthenticated Visitors**:
- "Find Care" CTA → SCR-AUTH-001 (Care Receiver Registration)
- "Become a Caregiver" CTA → SCR-AUTH-003 (Caregiver Registration)
- "Log In" link (header) → SCR-AUTH-005 (Login)
- "Sign up" link → Role selection modal → Registration screens
- Footer links → SCR-PUB-006 (Terms), SCR-PUB-007 (Privacy), SCR-PUB-008 (Safeguarding)

**Authenticated Users** (auto-redirect):
- Care Receiver → SCR-CR-001 (Care Receiver Dashboard)
- Family Member → SCR-CR-001 (Care Receiver Dashboard)
- Caregiver → SCR-CG-001 (Caregiver Dashboard)
- Admin → SCR-ADM-001 (Admin Dashboard)

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Public Header (Global)
- **Component**: navigation-header-public (NOT navigation-header-auth)
- **Purpose**: Minimal navigation for unauthenticated users
- **Priority**: Primary
- **Elements**:
  - Platform logo (left-aligned) → Clickable, reloads homepage
  - "How It Works" link → Scroll to "How It Works" section
  - "Safety" link → Scroll to "Trust & Safety" section
  - "Log In" link (primary button, right-aligned) → SCR-AUTH-005

**Component Reuse**: navigation-header-public (from dashboard-shared-components.md, added in auth wireframes)

#### Block 2: Hero Section
- **Purpose**: Primary value proposition and CTA
- **Priority**: Primary (most important section)
- **Elements**:

##### Headline & Subheadline
- **H1**: "Find trusted companionship care for yourself or a loved one"
- **Subheadline** (large text, 18px): "Connect with DBS-verified caregivers in your area for companionship, social visits, and light housework support"
- **Badge**: "Companionship Services Only" (informational, blue background)

##### Hero CTA (Unauthenticated State)
- **Postcode Search**:
  - Label: "Where do you need care?"
  - Input field: Postcode (placeholder: "Enter your postcode (e.g. SW1A 1AA)")
  - Dropdown: Radius (options: "5 miles", "10 miles", "15 miles", "20 miles")
  - Primary CTA: "Find Caregivers" button → Navigate to SCR-AUTH-001 (registration required before search)

- **Secondary CTA**:
  - Text: "Looking to become a caregiver?"
  - Link: "Sign up here" → SCR-AUTH-003

##### Hero CTA (Authenticated State - Care Receiver)
- **Primary CTA**: "Find Caregivers" button → Navigate to SCR-CR-003 (Search)
- **Secondary CTA**: "Go to Dashboard" link → SCR-CR-001

##### Hero CTA (Authenticated State - Caregiver)
- **Primary CTA**: "Go to Dashboard" button → SCR-CG-001
- **Secondary CTA**: None (caregiver doesn't need care receiver actions)

##### Hero Image/Illustration
- **Placeholder**: Elderly person and caregiver sitting together, having tea
- **Alt text**: "Elderly woman and caregiver enjoying companionship over tea"
- **Position**: Right side (desktop), below CTAs (mobile)

**Component Reuse**: INPUT-FIELD, DROPDOWN, BUTTON

#### Block 3: Trust & Safety Badges
- **Purpose**: Build trust through safety commitments
- **Priority**: Primary
- **Elements**:
  - **Three Badge Columns** (horizontal layout, desktop):
    1. **DBS Verified Caregivers**
       - Icon: ✓ (shield)
       - Heading: "DBS Verified Caregivers"
       - Body: "All caregivers undergo DBS checks and identity verification before joining"
    2. **Secure Payments**
       - Icon: 🔒 (lock)
       - Heading: "Secure Payments"
       - Body: "Your payment is held securely and only released after service completion"
    3. **24/7 Safeguarding Support**
       - Icon: 🛡️ (shield)
       - Heading: "24/7 Safeguarding Support"
       - Body: "Our safeguarding team monitors all activity and provides emergency support"

**Component Reuse**: TRUST-BADGE-ROW (from dashboard-shared-components.md, added in auth wireframes)

#### Block 4: How It Works (Care Receivers)
- **Purpose**: Explain 3-step process for finding care
- **Priority**: Primary
- **Elements**:
  - **Section Heading (H2)**: "How it works for families"
  - **Three Step Cards** (horizontal layout, desktop):
    1. **Step 1: Search**
       - Icon: 🔍
       - Heading: "Search for caregivers"
       - Body: "Enter your postcode and browse DBS-verified caregivers in your area"
    2. **Step 2: Book**
       - Icon: 📅
       - Heading: "Request a booking"
       - Body: "Choose your preferred date and time. Payment is securely held until after the visit"
    3. **Step 3: Enjoy**
       - Icon: ☕
       - Heading: "Enjoy companionship"
       - Body: "Your caregiver arrives on time. Leave a review to help other families"

**Component Reuse**: STEP-INDICATOR (from auth wireframes)

#### Block 5: How It Works (Caregivers)
- **Purpose**: Explain 3-step process for becoming a caregiver
- **Priority**: Secondary
- **Elements**:
  - **Section Heading (H2)**: "How it works for caregivers"
  - **Three Step Cards** (horizontal layout, desktop):
    1. **Step 1: Sign Up**
       - Icon: ✍️
       - Heading: "Create your profile"
       - Body: "Register and complete identity and DBS verification"
    2. **Step 2: Get Booked**
       - Icon: 📬
       - Heading: "Receive booking requests"
       - Body: "Accept bookings that fit your schedule and location"
    3. **Step 3: Earn Money**
       - Icon: 💷
       - Heading: "Earn £18/hour"
       - Body: "Get paid securely after each visit. Set your own availability"

**Note**: Commission rate placeholder is 15% caregiver + 15% service fee per established convention (see MEMORY.md).

#### Block 6: Testimonials (Optional for R0, can be placeholder)
- **Purpose**: Social proof from care receivers and caregivers
- **Priority**: Secondary (can be empty state for R0 launch)
- **Elements**:
  - **Section Heading (H2)**: "What our community says"
  - **Testimonial Cards** (2-3 cards, horizontal layout):
    - Quote: "[Testimonial text]"
    - Author: "[Name], Care Receiver" or "[Name], Caregiver"
    - Rating: ★★★★★
  - **Empty State** (if no testimonials yet):
    - Text: "Testimonials coming soon. Be one of our first users!"

**Component Reuse**: REVIEW-CARD (from search wireframes)

#### Block 7: Final CTA (Bottom)
- **Purpose**: Reinforce registration CTAs
- **Priority**: Primary
- **Elements**:
  - **Section Heading (H2)**: "Ready to get started?"
  - **Two CTA Buttons** (horizontal layout):
    1. "Find Care" → SCR-AUTH-001 (Care Receiver Registration)
    2. "Become a Caregiver" → SCR-AUTH-003 (Caregiver Registration)

#### Block 8: Footer (Global)
- **Purpose**: Legal links, company info, contact
- **Priority**: Secondary
- **Elements**:
  - Links: About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact
  - Copyright: "© 2026 Platform Name. All rights reserved."

**Component Reuse**: FOOTER-GLOBAL (from dashboard-shared-components.md)

---

### 2.2 Interactive Elements

1. **Postcode Search Input** (Hero section)
   - Type: Text input
   - Validation: UK postcode format
   - Action: Store postcode → Navigate to registration (unauthenticated) or search (authenticated)
   - Keyboard: Tab to focus, Enter to submit

2. **Radius Dropdown** (Hero section)
   - Type: Dropdown
   - Options: 5 miles, 10 miles, 15 miles, 20 miles
   - Default: 10 miles
   - Action: Store radius preference

3. **Find Caregivers Button** (Hero section)
   - Type: Primary CTA
   - Unauthenticated: Navigate to SCR-AUTH-001 (registration required)
   - Authenticated (Care Receiver): Navigate to SCR-CR-003 (search)
   - Keyboard: Focusable

4. **Become a Caregiver Button** (Hero section, Bottom CTA)
   - Type: Secondary CTA
   - Action: Navigate to SCR-AUTH-003 (Caregiver Registration)
   - Keyboard: Focusable

5. **Log In Link** (Header)
   - Type: Text link (styled as button)
   - Action: Navigate to SCR-AUTH-005 (Login)
   - Keyboard: Focusable

6. **Anchor Links** (Header navigation)
   - "How It Works" → Scroll to Block 4
   - "Safety" → Scroll to Block 3
   - Smooth scroll behavior

---

### 2.3 Data Display Elements

#### Dynamic Data

1. **Authentication state** (Block 2)
   - Source: User session cookie
   - Determines: Hero CTA variant (postcode search vs "Go to Dashboard")

2. **Testimonials** (Block 6)
   - Source: `reviews` table (if available)
   - Displays: Top 3 highest-rated reviews
   - Fallback: Empty state ("Testimonials coming soon")

#### Static Content

- All headings, body text, badges, step descriptions (defined above)

---

## 3. ASCII Wireframes

### 3.1 Desktop (1440px+) - Unauthenticated State

```
+------------------------------------------------------------------------------+
|  [LOGO]             How It Works   Safety                        [Log In]   |
+------------------------------------------------------------------------------+
|                                                                              |
|  +--------------------------------------+  +----------------------------+    |
|  |  HERO SECTION                        |  |                            |    |
|  |                                      |  |  [Illustration:            |    |
|  |  H1: Find trusted companionship      |  |   Elderly woman and        |    |
|  |      care for yourself or a loved    |  |   caregiver having tea]    |    |
|  |      one                             |  |                            |    |
|  |                                      |  |                            |    |
|  |  Connect with DBS-verified           |  |                            |    |
|  |  caregivers in your area for         |  +----------------------------+    |
|  |  companionship, social visits, and   |                                    |
|  |  light housework support             |                                    |
|  |                                      |                                    |
|  |  [Companionship Services Only]       |                                    |
|  |                                      |                                    |
|  |  Where do you need care?             |                                    |
|  |  [Enter your postcode (e.g. SW1A 1AA)]  [Within 10 miles ▼]             |
|  |                                                                           |
|  |  [Find Caregivers]                                                        |
|  |                                                                           |
|  |  Looking to become a caregiver? Sign up here                            |
|  |                                                                           |
|  +--------------------------------------------------------------------------+
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  TRUST & SAFETY                                                        |  |
|  |                                                                        |  |
|  |  +--------------------+  +--------------------+  +--------------------+ |
|  |  |  ✓                 |  |  🔒                |  |  🛡️                 | |
|  |  |  DBS Verified      |  |  Secure Payments   |  |  24/7 Safeguarding | |
|  |  |  Caregivers        |  |                    |  |  Support           | |
|  |  |                    |  |  Your payment is   |  |                    | |
|  |  |  All caregivers    |  |  held securely and |  |  Our safeguarding  | |
|  |  |  undergo DBS checks|  |  only released     |  |  team monitors all | |
|  |  |  and identity      |  |  after service     |  |  activity and      | |
|  |  |  verification      |  |  completion        |  |  provides emergency| |
|  |  |                    |  |                    |  |  support           | |
|  |  +--------------------+  +--------------------+  +--------------------+ |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  HOW IT WORKS FOR FAMILIES                                             |  |
|  |                                                                        |  |
|  |  +--------------------+  +--------------------+  +--------------------+ |
|  |  |  1. Search         |  |  2. Book           |  |  3. Enjoy          | |
|  |  |  🔍                 |  |  📅                 |  |  ☕                 | |
|  |  |                    |  |                    |  |                    | |
|  |  |  Search for        |  |  Request a         |  |  Enjoy             | |
|  |  |  caregivers        |  |  booking           |  |  companionship     | |
|  |  |                    |  |                    |  |                    | |
|  |  |  Enter your        |  |  Choose your       |  |  Your caregiver    | |
|  |  |  postcode and      |  |  preferred date    |  |  arrives on time.  | |
|  |  |  browse DBS-       |  |  and time. Payment |  |  Leave a review to | |
|  |  |  verified          |  |  is securely held  |  |  help other        | |
|  |  |  caregivers in     |  |  until after the   |  |  families          | |
|  |  |  your area         |  |  visit             |  |                    | |
|  |  +--------------------+  +--------------------+  +--------------------+ |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  HOW IT WORKS FOR CAREGIVERS                                           |  |
|  |                                                                        |  |
|  |  +--------------------+  +--------------------+  +--------------------+ |
|  |  |  1. Sign Up        |  |  2. Get Booked     |  |  3. Earn Money     | |
|  |  |  ✍️                  |  |  📬                 |  |  💷                 | |
|  |  |                    |  |                    |  |                    | |
|  |  |  Create your       |  |  Receive booking   |  |  Earn £18/hour     | |
|  |  |  profile           |  |  requests          |  |                    | |
|  |  |                    |  |                    |  |                    | |
|  |  |  Register and      |  |  Accept bookings   |  |  Get paid securely | |
|  |  |  complete identity |  |  that fit your     |  |  after each visit. | |
|  |  |  and DBS           |  |  schedule and      |  |  Set your own      | |
|  |  |  verification      |  |  location          |  |  availability      | |
|  |  +--------------------+  +--------------------+  +--------------------+ |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  WHAT OUR COMMUNITY SAYS                                               |  |
|  |                                                                        |  |
|  |  +-------------------------------+  +-------------------------------+  |  |
|  |  |  "Mary was wonderful with my  |  |  "I love being able to set my |  |
|  |  |  father. She made him feel    |  |  own schedule and earn money  |  |
|  |  |  comfortable and happy."      |  |  helping people in my         |  |
|  |  |  ★★★★★                        |  |  community."                  |  |
|  |  |                               |  |  ★★★★★                        |  |
|  |  |  - Sarah, Care Receiver       |  |  - Mary, Caregiver            |  |
|  |  +-------------------------------+  +-------------------------------+  |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  READY TO GET STARTED?                                                 |  |
|  |                                                                        |  |
|  |  [Find Care]                                    [Become a Caregiver]  |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
| About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact    |
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
|  +--------------------------------------+  +----------------------------+    |
|  |  HERO SECTION                        |  |                            |    |
|  |                                      |  |  [Illustration:            |    |
|  |  H1: Find trusted companionship      |  |   Elderly woman and        |    |
|  |      care for yourself or a loved    |  |   caregiver having tea]    |    |
|  |      one                             |  |                            |    |
|  |                                      |  |                            |    |
|  |  Welcome back, Sarah!                |  |                            |    |
|  |                                      |  +----------------------------+    |
|  |  [Find Caregivers] → SCR-CR-003                                          |
|  |                                                                           |
|  |  Go to Dashboard →                                                        |
|  |                                                                           |
|  +--------------------------------------------------------------------------+
|                                                                              |
|  (Rest of page same as unauthenticated state)                               |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.3 Mobile (320px-767px) - Unauthenticated State

```
+--------------------------------------+
|  [LOGO]                     [Log In] |
+--------------------------------------+
|                                      |
|  H1: Find trusted                    |
|      companionship care              |
|      for yourself or a               |
|      loved one                       |
|                                      |
|  Connect with DBS-verified           |
|  caregivers in your area             |
|                                      |
|  [Companionship Services Only]       |
|                                      |
|  Where do you need care?             |
|  [Enter postcode]                    |
|  [Within 10 miles ▼]                 |
|                                      |
|  [Find Caregivers]                   |
|                                      |
|  Looking to become a caregiver?      |
|  Sign up here                        |
|                                      |
|  +--------------------------------+  |
|  |  [Illustration: Elderly woman  |  |
|  |   and caregiver having tea]    |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  TRUST & SAFETY                |  |
|  |                                |  |
|  |  ✓ DBS Verified Caregivers     |  |
|  |  All caregivers undergo DBS    |  |
|  |  checks and identity           |  |
|  |  verification                  |  |
|  |                                |  |
|  |  🔒 Secure Payments            |  |
|  |  Your payment is held securely |  |
|  |  and only released after       |  |
|  |  service completion            |  |
|  |                                |  |
|  |  🛡️ 24/7 Safeguarding          |  |
|  |  Our safeguarding team         |  |
|  |  monitors all activity         |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  HOW IT WORKS FOR FAMILIES     |  |
|  |                                |  |
|  |  1. Search 🔍                  |  |
|  |  Search for caregivers         |  |
|  |  Enter your postcode and       |  |
|  |  browse DBS-verified           |  |
|  |  caregivers in your area       |  |
|  |                                |  |
|  |  2. Book 📅                    |  |
|  |  Request a booking             |  |
|  |  Choose your preferred date    |  |
|  |  and time. Payment is securely |  |
|  |  held until after the visit    |  |
|  |                                |  |
|  |  3. Enjoy ☕                    |  |
|  |  Enjoy companionship           |  |
|  |  Your caregiver arrives on     |  |
|  |  time. Leave a review to help  |  |
|  |  other families                |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  HOW IT WORKS FOR CAREGIVERS   |  |
|  |                                |  |
|  |  1. Sign Up ✍️                 |  |
|  |  2. Get Booked 📬              |  |
|  |  3. Earn Money 💷              |  |
|  |  (Condensed, same content)     |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  TESTIMONIALS                  |  |
|  |  "Mary was wonderful..."       |  |
|  |  ★★★★★ - Sarah                 |  |
|  |                                |  |
|  |  "I love being able to..."     |  |
|  |  ★★★★★ - Mary                  |  |
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |
|  |  READY TO GET STARTED?         |  |
|  |  [Find Care]                   |  |
|  |  [Become a Caregiver]          |  |
|  +--------------------------------+  |
|                                      |
+--------------------------------------+
| About | Terms | Privacy              |
| © 2026 Platform Name                 |
+--------------------------------------+
```

---

## 4. Responsive Behavior

### 4.1 Breakpoints

| Viewport | Layout Changes | Priority |
|----------|----------------|----------|
| **Mobile** (320px-767px) | Single column, stacked sections, condensed cards | Essential content only |
| **Tablet** (768px-1439px) | 2-column layout (hero image right), condensed cards | Balanced |
| **Desktop** (1440px+) | 2-column hero, 3-column trust badges, 3-column how-it-works | Full layout |

### 4.2 Layout Changes by Viewport

#### Desktop (1440px+)
- **Hero Section**: 2-column (text left, illustration right)
- **Trust Badges**: 3-column horizontal
- **How It Works**: 3-column horizontal (3 steps side-by-side)
- **Testimonials**: 2-3 cards horizontal
- **Final CTA**: 2 buttons horizontal (centered)

#### Tablet (768px-1439px)
- **Hero Section**: 2-column (condensed)
- **Trust Badges**: 3-column (smaller cards)
- **How It Works**: 3-column (condensed text)
- **Testimonials**: 2 cards horizontal or stacked
- **Final CTA**: 2 buttons horizontal

#### Mobile (320px-767px)
- **Hero Section**: Single column, illustration below CTAs
- **Trust Badges**: Single column, stacked
- **How It Works**: Single column, stacked (3 steps vertical)
- **Testimonials**: Single column, stacked
- **Final CTA**: 2 buttons stacked, full width

### 4.3 Touch Target Sizes

**Mobile Requirements**:
- CTA buttons: **56px height**, full width
- Postcode input: **56px height**
- Dropdown: **56px height**
- Header "Log In" link: **48px height**
- Anchor links (How It Works, Safety): **44px height**

---

## 5. UI States

### 5.1 Loading State

**Initial Page Load**:
```
+------------------------------------------------------------------------------+
|  [LOGO]                                                         [Log In]     |
+------------------------------------------------------------------------------+
|                                                                              |
|  [Loading skeleton - Hero section]                                          |
|  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         |
|                                                                              |
+------------------------------------------------------------------------------+
```

**Postcode Search Validation**:
- Input field: Red border if invalid postcode format
- Error message: "Please enter a valid UK postcode (e.g., SW1A 1AA)"

### 5.2 Empty States

**Testimonials Section** (if no reviews yet):
```
+------------------------------------------------------------------------+
|  WHAT OUR COMMUNITY SAYS                                               |
|                                                                        |
|  ℹ️  Testimonials coming soon                                          |
|     Be one of our first users! Your review will be featured here.     |
|                                                                        |
+------------------------------------------------------------------------+
```

### 5.3 Error States

**Invalid Postcode**:
```
Where do you need care?
[SW1A 1AA (invalid input)]  [Within 10 miles ▼]
⚠️ Please enter a valid UK postcode (e.g., SW1A 1AA)

[Find Caregivers] (Disabled)
```

### 5.4 Authentication State Variants

**Unauthenticated** (shown in wireframe 3.1):
- Header: navigation-header-public (logo + "Log In" link)
- Hero CTA: Postcode search + "Find Caregivers" → Registration

**Authenticated (Care Receiver)** (shown in wireframe 3.2):
- Header: navigation-header-auth (logo + Dashboard + My Bookings + Messages + User dropdown)
- Hero CTA: "Find Caregivers" → Search (SCR-CR-003), "Go to Dashboard" → SCR-CR-001

**Authenticated (Caregiver)**:
- Header: navigation-header-auth (caregiver variant)
- Hero CTA: "Go to Dashboard" → SCR-CG-001
- No "Find Caregivers" CTA (caregivers don't need care)

**Authenticated (Admin)**:
- Header: navigation-header-auth (admin variant)
- Hero CTA: "Go to Admin Dashboard" → SCR-ADM-001

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

#### Perceivable

- **Text Alternatives**:
  - ✅ Hero illustration: alt text "Elderly woman and caregiver enjoying companionship over tea"
  - ✅ Trust badge icons: Text alongside icons ("DBS Verified Caregivers" not just ✓)
  - ✅ Step icons: Text labels ("1. Search", "2. Book", "3. Enjoy")

- **Distinguishable**:
  - ✅ Color contrast: 4.5:1 for body text, 3.0:1 for large headings
  - ✅ CTA buttons: High contrast (primary button: white text on blue background)
  - ✅ Font sizes: 16px minimum for body text, 18px for subheadline
  - ✅ Trust badges: Icons + text (not icon only)

#### Operable

- **Keyboard Accessible**:
  - ✅ Tab order: Header links → Postcode input → Radius dropdown → CTA button → How It Works cards → Final CTAs → Footer links
  - ✅ Enter key: Submit postcode search
  - ✅ All buttons and links focusable via Tab
  - ✅ Focus indicators: 3px solid border with high contrast

- **Navigable**:
  - ✅ Skip to main content link
  - ✅ Page title: "[Platform Name] - Find Trusted Companionship Care"
  - ✅ Heading hierarchy: H1 (hero headline) → H2 (section headings: "How It Works", "What Our Community Says")
  - ✅ Landmark regions: `<header>`, `<main>`, `<footer>`
  - ✅ Anchor links: Smooth scroll to sections

#### Understandable

- **Readable**:
  - ✅ Language declared: `<html lang="en-GB">`
  - ✅ Clear value proposition: "Find trusted companionship care"
  - ✅ Jargon avoided: "Companionship Services Only" badge explains scope
  - ✅ Clear CTAs: "Find Caregivers" not "Search"

- **Predictable**:
  - ✅ Consistent navigation (header same across all public pages)
  - ✅ CTAs lead where expected (Find Caregivers → Registration/Search)
  - ✅ Anchor links scroll smoothly (no sudden jumps)

- **Input Assistance**:
  - ✅ Postcode input: Placeholder shows example format ("SW1A 1AA")
  - ✅ Validation: Error message if invalid postcode
  - ✅ Helper text: "Where do you need care?" label

#### Robust

- **Compatible**:
  - ✅ Valid HTML5 semantic markup
  - ✅ ARIA landmarks: `role="banner"`, `role="main"`, `role="contentinfo"`
  - ✅ Tested with screen readers (NVDA, JAWS, VoiceOver)

### 6.2 Focus Order

**Tab Order** (Desktop, Unauthenticated):
1. Skip to main content link
2. Header logo (clickable)
3. Header "How It Works" link
4. Header "Safety" link
5. Header "Log In" button
6. **Hero Section**:
   - Postcode input field
   - Radius dropdown
   - "Find Caregivers" button
   - "Sign up here" link (caregiver registration)
7. **Trust Badges**: Not focusable (static content)
8. **How It Works**: Not focusable (static content)
9. **Final CTAs**:
   - "Find Care" button
   - "Become a Caregiver" button
10. Footer links (About, How It Works, Safety, Terms, Privacy, Safeguarding, Contact)

### 6.3 Screen Reader Announcements

**Page Load**:
- "[Platform Name]. Find trusted companionship care for yourself or a loved one. Connect with DBS-verified caregivers in your area."

**Postcode Input**:
- "Where do you need care? Enter your postcode. Example: SW1A 1AA."

**Invalid Postcode**:
- `role="alert"`: "Please enter a valid UK postcode, for example SW1A 1AA"

**Section Headings**:
- "How it works for families. Step 1: Search for caregivers..."
- "Trust and safety. DBS verified caregivers. All caregivers undergo DBS checks..."

### 6.4 Elderly User Considerations

**Cognitive Load Reduction**:
- ✅ Clear value proposition (first thing users see)
- ✅ Simple 3-step process (easy to understand)
- ✅ Trust badges prominent (builds confidence)
- ✅ Large CTAs (obvious next steps)

**Vision Support**:
- ✅ Large font sizes (18px+ for key text)
- ✅ High contrast buttons and text
- ✅ Large icons for trust badges and steps
- ✅ Generous white space between sections

**Motor Control**:
- ✅ Large touch targets (56px height on mobile)
- ✅ Ample spacing between buttons (16px minimum)
- ✅ No hover-only interactions
- ✅ Full-width buttons on mobile (easier to tap)

**Trust & Safety**:
- ✅ Trust badges prominently displayed (DBS verification, secure payments, safeguarding)
- ✅ "Companionship Services Only" badge (sets clear expectations)
- ✅ Testimonials build social proof (when available)
- ✅ Clear explanation of process (how it works)

---

## 7. Navigation & Interactions

### 7.1 Primary User Flows

**Flow 1: Unauthenticated Visitor → Care Receiver Registration**
1. User lands on homepage (unauthenticated)
2. User reads hero headline and value proposition
3. User scrolls to "How It Works for Families" section
4. User understands 3-step process
5. User scrolls back to hero section
6. User enters postcode: "SW1A 1AA"
7. User selects radius: "10 miles"
8. User clicks "Find Caregivers" button
9. System redirects to SCR-AUTH-001 (Care Receiver Registration)
10. Postcode and radius stored in session (pre-filled in search after registration)

**Flow 2: Unauthenticated Visitor → Caregiver Registration**
1. User lands on homepage (unauthenticated)
2. User scrolls to "How It Works for Caregivers" section
3. User reads 3-step process: Sign up → Get booked → Earn £18/hour
4. User clicks "Become a Caregiver" button (hero or bottom CTA)
5. System redirects to SCR-AUTH-003 (Caregiver Registration)

**Flow 3: Authenticated Care Receiver → Search**
1. User logs in → Redirected to SCR-CR-001 (Dashboard)
2. User navigates to homepage (via header logo or URL)
3. Homepage loads with authenticated header (navigation-header-auth)
4. Hero CTA changes: "Find Caregivers" → Direct to SCR-CR-003 (Search)
5. User clicks "Find Caregivers"
6. System redirects to SCR-CR-003 (Search) - NO registration required

**Flow 4: Anchor Link Navigation**
1. User clicks "How It Works" in header
2. Page smooth-scrolls to "How It Works for Families" section
3. User clicks "Safety" in header
4. Page smooth-scrolls to "Trust & Safety" section

### 7.2 Alternative Paths

**Path A: Invalid Postcode Entry**
1. User enters postcode: "12345" (invalid format)
2. User clicks "Find Caregivers"
3. Validation error: "⚠️ Please enter a valid UK postcode (e.g., SW1A 1AA)"
4. Input field highlighted red
5. Button disabled until valid postcode entered

**Path B: Authenticated User Clicks "Become a Caregiver"**
1. User is logged in as Care Receiver
2. User clicks "Become a Caregiver" button
3. System detects authenticated session
4. Modal: "You are already registered as a Care Receiver. You cannot register as a Caregiver with the same account. Please use a different email address."

**Path C: Direct URL Access (Authenticated)**
1. User logs in → Session active
2. User types URL: `platform-name.co.uk` → Load homepage
3. Homepage detects authenticated session
4. Auto-redirect logic:
   - Care Receiver → SCR-CR-001 (Dashboard)
   - Caregiver → SCR-CG-001 (Dashboard)
   - Admin → SCR-ADM-001 (Dashboard)
5. Homepage NOT shown to authenticated users (immediate redirect)

### 7.3 Interaction Patterns

**Postcode Validation**:
- Validation on blur (when user leaves input field)
- Regex: UK postcode format
- Error message: Inline, below input field
- Button disabled: If postcode invalid

**Anchor Link Smooth Scroll**:
- Click "How It Works" → Smooth scroll to section (1 second duration)
- Offset: -80px (to account for fixed header)
- Accessibility: Focus moves to section heading

**CTA Hierarchy**:
- **Primary** (most prominent): "Find Caregivers" (blue background, white text, large)
- **Secondary**: "Become a Caregiver" (white background, blue text, outlined)
- **Tertiary**: "Sign up here" (text link, blue)

---

## 8. Design Notes

### 8.1 Design Principles Applied

**1. Clarity & Simplicity**
- Clear value proposition (first thing users see)
- Simple 3-step process (easy to understand)
- Minimal navigation (public header keeps it simple)
- Large CTAs (obvious next steps)

**2. Trust & Safety First**
- Trust badges prominently displayed (DBS verification, secure payments, safeguarding)
- "Companionship Services Only" badge (sets clear expectations)
- Safeguarding policy link in footer
- Testimonials build social proof

**3. Dual Audience**
- Clear separation: "How It Works for Families" vs "How It Works for Caregivers"
- CTAs for both audiences: "Find Care" and "Become a Caregiver"
- Hero section addresses both: Care receivers (postcode search) and caregivers (sign up link)

**4. Accessibility First**
- Large touch targets (56px on mobile)
- High contrast text and buttons
- Screen reader friendly (ARIA labels, semantic markup)
- Keyboard navigation (anchor links, tab order)

**5. Elderly-Friendly**
- Large font sizes (18px+ for key text)
- Generous white space
- Clear visual hierarchy (hero → trust → how it works → testimonials → CTA)
- No time pressure or complex interactions

### 8.2 Content Hierarchy

**Visual Hierarchy**:
1. **Hero Section** (top): Primary value proposition and CTA
2. **Trust Badges** (below hero): Build confidence
3. **How It Works for Families** (middle): Explain process for primary audience
4. **How It Works for Caregivers** (below): Explain process for secondary audience
5. **Testimonials** (near bottom): Social proof
6. **Final CTA** (bottom): Reinforce registration CTAs

**Information Priority**:
- Value proposition: "Find trusted companionship care"
- Trust signals: DBS verification, secure payments, safeguarding
- Process explanation: 3 steps for each audience
- Social proof: Testimonials (when available)
- Call to action: "Find Care" or "Become a Caregiver"

### 8.3 Color & Visual Design

**Trust Badge Colors**:
| Badge | Icon | Background |
|-------|------|------------|
| DBS Verified | ✓ (green) | Light blue (#E0F2FE) |
| Secure Payments | 🔒 (blue) | Light blue (#E0F2FE) |
| Safeguarding Support | 🛡️ (blue) | Light blue (#E0F2FE) |

**CTA Button Colors**:
| Type | Background | Text | Border |
|------|------------|------|--------|
| Primary | Blue (#3B82F6) | White | None |
| Secondary | White | Blue (#3B82F6) | Blue (#3B82F6) |

**Component Reuse**:
- Public header: navigation-header-public component
- Trust badges: trust-badge-row component
- Step cards: step-indicator component
- Testimonials: review-card component
- Footer: footer-global component
- Buttons: button component (primary, secondary variants)
- Input fields: input-field component
- Dropdown: dropdown-menu component

### 8.4 Typography Scale

**Recommended Sizes**:
- **H1** (Hero headline): 40px (desktop), 32px (tablet), 28px (mobile)
- **Subheadline** (Hero): 18px (all viewports)
- **H2** (Section headings): 32px (desktop), 28px (tablet), 24px (mobile)
- **Body text** (Trust badges, How It Works): 16px (all viewports)
- **Button text**: 18px (primary), 16px (secondary)
- **Badge text**: 14px ("Companionship Services Only")

**Font Weights**:
- **H1, H2**: Bold (700)
- **Subheadline**: Regular (400)
- **Body text**: Regular (400)
- **Buttons**: Semibold (600)

### 8.5 Spacing & Layout

**Section Spacing**:
- Hero to Trust Badges: 64px (desktop), 48px (mobile)
- Trust Badges to How It Works: 64px (desktop), 48px (mobile)
- How It Works to Testimonials: 64px (desktop), 48px (mobile)
- Testimonials to Final CTA: 64px (desktop), 48px (mobile)

**Card Spacing**:
- Trust badge cards: 24px horizontal gap (desktop)
- How It Works cards: 24px horizontal gap (desktop)
- Testimonial cards: 24px horizontal gap (desktop)

**Button Spacing**:
- Between "Find Care" and "Become a Caregiver": 16px horizontal (desktop), 12px vertical (mobile)

### 8.6 Component Reuse

**Shared Components** (from dashboard-shared-components.md):
1. **navigation-header-public**: Public header with logo + "Log In" link
2. **footer-global**: Legal links and copyright
3. **trust-badge-row**: 3-column trust badge layout
4. **button**: Primary, secondary, tertiary variants
5. **input-field**: Postcode input
6. **dropdown-menu**: Radius selector

**New Components Introduced**:
1. **HERO-SECTION**: 2-column layout with headline, subheadline, CTA, illustration
2. **HOW-IT-WORKS-CARDS**: 3-column step cards with icon, heading, body
3. **TESTIMONIAL-CAROUSEL**: 2-3 testimonial cards (can be carousel on mobile)

---

## 9. Cross-References

### Source Documents

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - SCR-PUB-001 details (lines 326-403)

**Route Map**:
- `/docs/product/tier1-route-map.md` - SCR-PUB-001 route definition and access control

**User Flows**:
- `/docs/tiers/tier1/draft-design-specs/user-flows/care-receiver-first-booking.md` - Homepage as entry point (Step 1)
- `/docs/tiers/tier1/draft-design-specs/user-flows/caregiver-onboarding.md` - Homepage as entry point for caregivers

**Components**:
- `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md` - Shared component specs

**Related Screens**:
- SCR-AUTH-001: Care Receiver Registration - Exit point via "Find Care"
- SCR-AUTH-003: Caregiver Registration - Exit point via "Become a Caregiver"
- SCR-AUTH-005: Login - Exit point via "Log In" link
- SCR-CR-001: Care Receiver Dashboard - Auto-redirect for authenticated care receivers
- SCR-CG-001: Caregiver Dashboard - Auto-redirect for authenticated caregivers
- SCR-CR-003: Caregiver Search - Exit point for authenticated care receivers (via "Find Caregivers")
- SCR-PUB-006: Terms of Service - Exit point via footer
- SCR-PUB-007: Privacy Policy - Exit point via footer
- SCR-PUB-008: Safeguarding Policy - Exit point via footer

---

## 10. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | UX Designer | Initial wireframes for homepage (public landing page) |

---

**END OF DOCUMENT**

**Status**: ✅ READY FOR FIGMA HANDOFF

**Next Steps**:
1. Figma designer creates high-fidelity mockups for hero section (illustration + CTA layout)
2. Visual design applies brand colors to trust badges and how-it-works cards
3. Interactive prototype for postcode search and anchor link smooth scrolling
4. Engineering handoff with authentication state logic (auto-redirect rules)
