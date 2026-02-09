# Caregiver Profile Wireframes (SCR-CR-005)

**Document Purpose**: ASCII wireframes and complete element inventory for Caregiver Profile - Public View (SCR-CR-005)

**Screen ID**: SCR-CR-005
**Screen Name**: Caregiver Profile (Public View)
**User Role**: Care Receiver, Family Member
**Route**: `/caregivers/:caregiverId`
**R0/R1**: R0 (Trust and decision-making critical)
**Created**: 2026-02-08
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
8. [Component Reuse](#8-component-reuse)
9. [Compliance Notes](#9-compliance-notes)
10. [Design Notes](#10-design-notes)

---

## 1. Screen Purpose

### 1.1 Purpose Statement

The Caregiver Profile screen is the **primary decision-making interface** where care receivers evaluate caregivers before requesting a booking. It provides:
- Comprehensive caregiver information (bio, experience, languages, interests)
- Verification status display (DBS, ID, Right to Work badges)
- Services offered (companionship only at Tier 1)
- Availability calendar (next 30 days)
- Reviews and ratings from previous care receivers
- Prominent "Request Booking" CTA

**Critical Success Factors**:
- Build trust through transparency (verification badges, reviews, full bio)
- Enable informed decision-making (complete profile information)
- Convert profile views to booking requests (clear, prominent CTA)

### 1.2 Entry Points

**From Search Results** (primary flow):
- SCR-CR-003 (Caregiver Search) → Click caregiver card → `/caregivers/:caregiverId`

**From Dashboard**:
- SCR-CR-001 (Care Receiver Dashboard) → "Featured Caregivers" widget → Profile link
- SCR-CR-001 → "Recent Searches" → Profile link

**From Favorites** (future):
- Favorites list → Click caregiver → Profile

**From Booking Detail**:
- SCR-CR-008 (Booking Detail) → "View Caregiver Profile" link

**Direct Link** (SEO, shareable):
- External: Search engine result, shared link → `/caregivers/:caregiverId`

### 1.3 Exit Points

**Primary Action** (conversion goal):
- "Request Booking" button → SCR-CR-006 (Booking Request Form) with `caregiverId` pre-filled

**Secondary Actions**:
- "Back to Search" link → SCR-CR-003 (returns to previous search results)
- "Add to Favorites" ❤️ → Save favorite (no navigation)
- "Share Profile" → Copy link to clipboard (no navigation)

**Global Navigation**:
- Header "Dashboard" → SCR-CR-001
- Header "Search" → SCR-CR-003
- Header "My Bookings" → SCR-CR-008

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Header (Global)
- **Component**: `NAV-HEADER-AUTH` (Care Receiver variant)
- **Purpose**: Consistent navigation across all authenticated screens
- **Elements**: Logo, main navigation (Dashboard, Search, Bookings, Messages), user menu
- **See**: Dashboard shared components Component 3.1

#### Block 2: Profile Header Section
- **Purpose**: First impression, key information at-a-glance
- **Priority**: Primary
- **Elements**:

  - **Profile Photo** (large, 400x400px desktop, 200x200px mobile)
    - Alt text: "Profile photo of Sarah K."
    - Default placeholder if no photo uploaded

  - **Caregiver Name**: "Sarah K." (H1, first name + last initial)
    - Full name revealed after booking request accepted (privacy)

  - **Location**: "SW1A area" (postcode district, not full postcode)
    - Icon: 📍 Map pin

  - **Distance**: "1.2 miles from you" (calculated from user's postcode)
    - Icon: 📏 Distance icon

  - **Verification Badges Row** (prominent, horizontal):
    - "✓ DBS Verified" (green pill, if applicable)
    - "✓ ID Verified" (blue pill, all caregivers)
    - "✓ Right to Work Verified" (blue pill, all caregivers)
    - Tooltip on hover: "DBS verified on [date]", "ID verified on [date]"

  - **Service Type Badge**: "Companionship Services Only" (informational pill, blue background)

  - **Average Rating Display** (large, prominent):
    - 5-star visual (⭐⭐⭐⭐⭐ or star icons)
    - Rating value: "4.8 out of 5"
    - Review count: "(24 reviews)"
    - Link to reviews section: "See all reviews ↓"

  - **Hourly Rate** (large, prominent):
    - "From £20/hour" (bold, large font)
    - Tooltip: "Platform adds 15% service fee to your total. Final cost calculated at booking."

  - **Primary CTA**: "Request Booking" button
    - Type: Large primary button (desktop: top-right, mobile: sticky bottom)
    - Action: Navigate to SCR-CR-006 with `caregiverId` pre-filled
    - States: Default, Hover, Focus, Disabled (if unavailable)

  - **Secondary Actions** (icon buttons):
    - "Add to Favorites" ❤️ (toggleable heart icon)
    - "Share Profile" 🔗 (copy link icon)

#### Block 3: About Me Section
- **Purpose**: Personal introduction, build connection
- **Priority**: Primary
- **Elements**:

  - **Section Heading (H2)**: "About Sarah"

  - **Bio** (full text, max 500 characters):
    - Content: Caregiver's self-written bio
    - Example: "I'm an experienced companion with 8 years of experience providing companionship and support to elderly individuals. I have a warm, patient personality and enjoy activities like gardening, reading, and gentle walks. I speak English and Polish fluently."
    - Moderated by admin (no contact info, appropriate content)

  - **Experience**: "8 years of experience in elderly care"
    - Icon: 📅 Calendar icon

  - **Languages Spoken**: "🇬🇧 English, 🇵🇱 Polish"
    - Icon: 🗣️ Speech icon
    - All languages listed (no truncation on profile page)

  - **Interests & Hobbies**: "Gardening, reading, gentle walks, cooking, board games"
    - Icon: ❤️ Heart icon
    - Purpose: Help care receivers find personality match

  - **Transportation**: "Has own vehicle" or "Uses public transport"
    - Icon: 🚗 Car icon or 🚌 Bus icon
    - Important for transportation service availability

#### Block 4: Services Offered Section
- **Purpose**: Clarify what services caregiver provides (Tier 1 companionship only)
- **Priority**: Primary
- **Elements**:

  - **Section Heading (H2)**: "Services I Offer"

  - **Service List** (checkmarks for offered services):
    - ✓ **Companionship** (conversation, activities, social support)
      - Tooltip: "Keeping you company, conversation, activities together"
    - ✓ **Light housework** (cleaning, tidying, laundry)
      - Tooltip: "Light cleaning, tidying, laundry (no heavy lifting)"
    - ✓ **Shopping and errands** (accompanied shopping)
      - Tooltip: "Grocery shopping, pharmacy visits, post office"
    - ✓ **Meal preparation** (cooking, no feeding assistance)
      - Tooltip: "Preparing meals (no feeding or eating assistance)"
    - ✓ **Transportation** (if has vehicle, conditional)
      - Tooltip: "Transport to appointments, social outings (insured for passenger transport)"

  - **Services NOT Offered** (Tier 1 restriction note):
    - Informational banner: "Looking for personal care services? We'll be adding these services soon. Join the waitlist."
    - List: Personal care (washing, dressing), medication assistance, overnight care (greyed out, not clickable)

#### Block 5: Availability Section
- **Purpose**: Show when caregiver is available for booking
- **Priority**: Primary
- **Elements**:

  - **Section Heading (H2)**: "Availability"

  - **Calendar View** (visual, next 30 days):
    - Layout: Week grid (Mon-Sun columns, 4-5 rows for month)
    - Available dates: Green background, clickable
    - Booked dates: Grey background, not clickable, tooltip: "Already booked"
    - Unavailable dates: Red strikethrough or grey out
    - Desktop: Full calendar grid
    - Mobile: Simplified list view ("Available Mon mornings, Wed afternoons...")

  - **Time Slots** (shown when date selected):
    - Morning (6am-12pm)
    - Afternoon (12pm-6pm)
    - Evening (6pm-10pm)
    - Display: Green pills for available, grey for booked

  - **Interaction**:
    - User clicks available date → Time slots appear
    - User clicks time slot → "Request Booking" button pre-fills date/time

  - **Fully Booked State** (if no availability):
    - Badge: "Fully booked this week"
    - Message: "This caregiver has no availability in the next 7 days. You can request a future booking."
    - CTA: "Request Future Booking" button

#### Block 6: Reviews & Ratings Section
- **Purpose**: Social proof, transparency, trust-building
- **Priority**: Primary
- **Elements**:

  - **Section Heading (H2)**: "Reviews & Ratings"

  - **Summary Statistics** (top of section):
    - **Overall Rating**: "4.8 out of 5 stars" (large, bold)
    - **Total Reviews**: "Based on 24 reviews"

  - **Rating Distribution** (bar chart):
    - 5 stars: ████████████████████ 20 reviews (83%)
    - 4 stars: ███ 3 reviews (12%)
    - 3 stars: █ 1 review (4%)
    - 2 stars: 0 reviews
    - 1 star: 0 reviews

  - **Review List** (most recent 10 displayed):
    - Each review contains:
      - **Reviewer Name**: "Margaret S." (first name + last initial, anonymized)
      - **Star Rating**: ⭐⭐⭐⭐⭐ (5 stars)
      - **Review Date**: "3 weeks ago" or "15 Feb 2026"
      - **Service Type**: "Companionship" (pill badge)
      - **Written Review** (up to 500 characters):
        - Example: "Sarah was wonderful! She was punctual, friendly, and my mother really enjoyed her company. They spent time gardening together and chatting over tea. Highly recommend!"
      - **Caregiver Response** (optional, 300 characters):
        - Example: "Thank you so much, Margaret! It was a joy spending time with your mother. Looking forward to our next visit!"

  - **Review Sorting** (dropdown):
    - Options: Most Recent (default), Highest Rated, Lowest Rated

  - **Pagination**:
    - "Show more reviews" button (load next 10)
    - OR paginated (if >20 reviews)

  - **No Reviews State** (if new caregiver):
    - Icon: ⭐ Star icon
    - Message: "New to the platform - no reviews yet"
    - Description: "Be the first to book and leave a review!"

#### Block 7: Verification Details Section
- **Purpose**: Transparency around verification status (builds trust)
- **Priority**: Secondary
- **Elements**:

  - **Section Heading (H2)**: "Verification Status"

  - **Verification List** (detailed breakdown):

    - **DBS Verified** (if applicable, conditional):
      - Status: ✓ Verified
      - Details: "Enhanced DBS check completed on 15 Jan 2026"
      - Certificate number: "001234567890" (partially obscured: "****567890")
      - Expiry: "Valid until 15 Jan 2029 (3 years)"
      - DBS Update Service: "Subscribed" (if applicable)
      - Tooltip: "DBS checks are voluntary for companionship services"

    - **ID Verified** (all caregivers):
      - Status: ✓ Verified
      - Details: "Government-issued ID verified on 10 Jan 2026"
      - Method: "Verified via Stripe Identity" (automated)

    - **Right to Work Verified** (all caregivers):
      - Status: ✓ Verified
      - Details: "Right to work in UK verified on 10 Jan 2026"
      - Method: "UKVI share code checked" (UK nationals: "UK passport verified")

    - **Phone Verified** (all caregivers):
      - Status: ✓ Verified
      - Details: "Phone number verified"

  - **Verification Trust Explanation** (helper text):
    - "All caregivers undergo identity verification before joining the platform. DBS checks are voluntary for companionship services."

#### Block 8: Booking CTA Section (Sticky on Mobile)
- **Purpose**: Convert profile views to booking requests
- **Priority**: Primary
- **Elements**:

  - **Primary CTA**: "Request Booking" button
    - Desktop: Top-right of profile header, repeated at bottom of page
    - Mobile: Sticky bottom bar (always visible on scroll)
    - Action: Navigate to SCR-CR-006 with `caregiverId` and optionally `date` + `time` pre-filled (if user selected from availability calendar)

  - **Secondary Info** (near CTA):
    - "Response time: Usually within 6 hours"
    - "Acceptance rate: 85%" (if available)

  - **Login Required Notice** (if unauthenticated user):
    - Message: "Please log in to request a booking"
    - CTA: "Log In" button → SCR-AUTH-005
    - Link: "Don't have an account? Sign up"

#### Block 9: Footer (Global)
- **Component**: `FOOTER-GLOBAL`
- **Purpose**: Legal links, support access
- **Elements**: Standard footer links (Terms, Privacy, Safeguarding, Contact)

---

### 2.2 Interactive Elements

#### Primary Actions
1. **"Request Booking" button**
   - Type: Primary CTA button (large, prominent)
   - Action: Navigate to `/bookings/new/:caregiverId` (SCR-CR-006)
   - Keyboard: Tab to focus, Enter to activate
   - Screen reader: "Request booking with Sarah K., button"
   - States: Default, Hover, Focus, Disabled (if caregiver unavailable or user not logged in)

#### Secondary Actions
2. **"Add to Favorites" button** ❤️
   - Type: Icon button (heart, toggleable)
   - Action: POST `/api/favorites/:caregiverId` (add) or DELETE (remove)
   - Visual feedback: Heart fills/unfills, toast notification shown
   - Screen reader: "Add Sarah K. to favorites" / "Remove from favorites"

3. **"Share Profile" button** 🔗
   - Type: Icon button
   - Action: Copy profile URL to clipboard
   - Visual feedback: Toast notification "Link copied to clipboard"
   - Screen reader: "Share Sarah K.'s profile, button"

4. **"Back to Search" link**
   - Type: Text link with icon (← arrow)
   - Action: Navigate back to SCR-CR-003 (preserves previous search state if possible)
   - Keyboard: Tab + Enter

#### Tertiary Actions
5. **Availability Calendar - Date Click**
   - Action: Show available time slots for selected date
   - Visual: Selected date highlighted, time slots appear below calendar

6. **Availability Calendar - Time Slot Click**
   - Action: Pre-fill booking request form with selected date/time
   - Visual: Time slot highlighted, "Request Booking" button text updates: "Request Booking for Mon 10am"

7. **"See all reviews" link**
   - Action: Scroll to reviews section (anchor link: `#reviews`)

8. **"Show more reviews" button**
   - Action: Load next 10 reviews (AJAX, no page reload)
   - States: Default, Loading ("Loading more reviews...")

9. **Verification Badge Tooltip**
   - Trigger: Hover or click badge
   - Action: Show tooltip with verification details
   - Content: "DBS verified on 15 Jan 2026. Valid until 15 Jan 2029."

---

### 2.3 Data Display Elements

#### Dynamic Data
1. **Caregiver Name**
   - Source: `caregivers.first_name` + first letter of `caregivers.last_name`
   - Example: "Sarah K."
   - Privacy: Full last name revealed after booking accepted

2. **Location**
   - Source: `caregivers.postcode` → Extract district (e.g., "SW1A 1AA" → "SW1A area")
   - Privacy: Full postcode not shown (privacy, safety)

3. **Distance**
   - Source: Haversine formula (user postcode vs caregiver postcode)
   - Display: "1.2 miles from you"
   - Conditional: Only shown if user is logged in and has postcode in profile

4. **Verification Badges**
   - Source: `caregivers.dbs_verified`, `caregivers.id_verified`, `caregivers.right_to_work_verified`
   - Display: Green pills for verified, no badge if not verified

5. **Average Rating**
   - Source: `caregivers.average_rating` (calculated from reviews)
   - Display: "4.8 out of 5 stars (24 reviews)"
   - Conditional: "New Caregiver" badge if `caregivers.total_reviews = 0`

6. **Hourly Rate**
   - Source: `caregivers.hourly_rate_gbp`
   - Display: "From £20/hour"
   - Tooltip: "Platform adds 15% service fee. Final cost: £23/hour" [PLACEHOLDER commission rate]

7. **Bio**
   - Source: `caregivers.bio` (max 500 characters)
   - Moderated by admin before profile approved

8. **Languages Spoken**
   - Source: `caregivers.languages_spoken` (array)
   - Display: Flag icons + text (e.g., "🇬🇧 English, 🇵🇱 Polish")

9. **Services Offered**
   - Source: `caregivers.services_offered` (array)
   - Display: Checkmarks for offered services, greyed out for not offered

10. **Availability Calendar**
    - Source: `caregiver_availability` table (recurring weekly + one-off dates + booked slots)
    - Display: Green (available), grey (booked), red (unavailable)

11. **Reviews**
    - Source: `reviews` table joined with `users` (reviewer info)
    - Filter: Only reviews for this caregiver, `status = 'approved'`
    - Sorted: Most recent first (default)
    - Limit: 10 per page

12. **Verification Details**
    - Source: `caregivers.dbs_verified_date`, `caregivers.id_verified_date`, etc.
    - Display: "Verified on [date]"

#### Static Content
- Section headings, labels, helper text, tooltips (see element definitions above)

---

### 2.4 Conditional Display Rules

| Element | Display Condition | Fallback |
|---------|------------------|----------|
| **DBS Verified Badge** | `caregivers.dbs_verified = true` | Not shown (DBS is voluntary at Tier 1) |
| **Distance** | User is authenticated AND has postcode in profile | Not shown (unauthenticated users) |
| **New Caregiver Badge** | `caregivers.total_reviews = 0` | Show "New to the platform - no reviews yet" |
| **Fully Booked Badge** | No available time slots in next 7 days | "Fully booked this week" + "Request Future Booking" CTA |
| **Transportation Service** | `caregivers.services_offered` includes 'transportation' AND `caregivers.has_vehicle = true` | Not shown |
| **Caregiver Response (in reviews)** | Review has `caregiver_response` field populated | Not shown |
| **DBS Update Service** | `caregivers.dbs_update_service_subscribed = true` | Not shown |

---

## 3. ASCII Wireframes

### 3.1 Desktop Wireframe (1440px+)

#### Default State (Caregiver with DBS Verification)

```
+------------------------------------------------------------------------------+
|  [LOGO]        Dashboard   Search   My Bookings   Messages (2)     [USER▼] |
+------------------------------------------------------------------------------+
|                                                                              |
|  [← Back to Search Results]                                                 |
|                                                                              |
|  +---------------------------+  +------------------------------------------+ |
|  |                           |  | H1: Sarah K.                             | |
|  |                           |  |                                          | |
|  |       [PROFILE PHOTO]     |  | 📍 SW1A area · 📏 1.2 miles from you     | |
|  |        (400x400px)        |  |                                          | |
|  |                           |  | ✓ DBS Verified  ✓ ID Verified            | |
|  |                           |  | ✓ Right to Work Verified                 | |
|  |                           |  | 🔵 Companionship Services Only           | |
|  |                           |  |                                          | |
|  |                           |  | ⭐⭐⭐⭐⭐ 4.8 out of 5 (24 reviews)      | |
|  |                           |  | See all reviews ↓                        | |
|  |                           |  |                                          | |
|  |                           |  | From £20/hour ℹ️                         | |
|  |                           |  | (Platform adds 15% service fee)          | |
|  |                           |  |                                          | |
|  +---------------------------+  | [REQUEST BOOKING]  ❤️  🔗                | |
|                                 |                                          | |
|                                 | Response time: Usually within 6 hours   | |
|                                 | Acceptance rate: 85%                     | |
|                                 +------------------------------------------+ |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  ABOUT SARAH                                                           |  |
|  |                                                                        |  |
|  |  "I'm an experienced companion with 8 years of experience providing   |  |
|  |   companionship and support to elderly individuals. I have a warm,    |  |
|  |   patient personality and enjoy activities like gardening, reading,   |  |
|  |   and gentle walks. I speak English and Polish fluently and love      |  |
|  |   helping people stay active and engaged."                            |  |
|  |                                                                        |  |
|  |  📅 8 years of experience in elderly care                              |  |
|  |  🗣️ Languages: 🇬🇧 English, 🇵🇱 Polish                                 |  |
|  |  ❤️ Interests: Gardening, reading, gentle walks, cooking, board games |  |
|  |  🚗 Transportation: Has own vehicle                                    |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  SERVICES I OFFER                                                      |  |
|  |                                                                        |  |
|  |  ✓ Companionship (conversation, activities, social support)           |  |
|  |  ✓ Light housework (cleaning, tidying, laundry)                       |  |
|  |  ✓ Shopping and errands (grocery shopping, pharmacy, post office)     |  |
|  |  ✓ Meal preparation (cooking, no feeding assistance)                  |  |
|  |  ✓ Transportation (appointments, social outings)                      |  |
|  |                                                                        |  |
|  |  ℹ️ Looking for personal care? We'll be adding these services soon.   |  |
|  |     Join the waitlist.                                                |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  AVAILABILITY                                                          |  |
|  |                                                                        |  |
|  |  Next 30 days:                                                         |  |
|  |                                                                        |  |
|  |      Mon   Tue   Wed   Thu   Fri   Sat   Sun                          |  |
|  |  W1  [5]   [6]  [7✓]  [8]   [9✓] [10✓] [11]                           |  |
|  |  W2 [12✓] [13]  [14✓] [15]  [16✓] [17✓] [18]                          |  |
|  |  W3 [19✓] [20]  [21✓] [22]  [23✓] [24✓] [25]                          |  |
|  |  W4 [26✓] [27]  [28✓] [29]  [30✓] [31✓] [ 1]                          |  |
|  |                                                                        |  |
|  |  ✓ = Available   Grey = Booked   Strikethrough = Unavailable          |  |
|  |                                                                        |  |
|  |  Selected: Wednesday, March 7                                          |  |
|  |  Available time slots:                                                 |  |
|  |  [Morning 9am-12pm]  [Afternoon 2pm-6pm]  Evening (Booked)            |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  REVIEWS & RATINGS                                 Sort: Recent ▼     |  |
|  |                                                                        |  |
|  |  ⭐⭐⭐⭐⭐ 4.8 out of 5 stars                                          |  |
|  |  Based on 24 reviews                                                   |  |
|  |                                                                        |  |
|  |  Rating breakdown:                                                     |  |
|  |  5 stars ████████████████████ 20 reviews (83%)                        |  |
|  |  4 stars ███ 3 reviews (12%)                                          |  |
|  |  3 stars █ 1 review (4%)                                              |  |
|  |  2 stars  0 reviews                                                   |  |
|  |  1 star   0 reviews                                                   |  |
|  |                                                                        |  |
|  |  +--------------------------------------------------------------------+|  |
|  |  | Margaret S. · ⭐⭐⭐⭐⭐ · 3 weeks ago · Companionship             ||  |
|  |  |                                                                    ||  |
|  |  | "Sarah was wonderful! She was punctual, friendly, and my mother   ||  |
|  |  |  really enjoyed her company. They spent time gardening together   ||  |
|  |  |  and chatting over tea. Highly recommend!"                        ||  |
|  |  |                                                                    ||  |
|  |  | Sarah's response:                                                  ||  |
|  |  | "Thank you so much, Margaret! It was a joy spending time with     ||  |
|  |  |  your mother. Looking forward to our next visit!"                 ||  |
|  |  +--------------------------------------------------------------------+|  |
|  |                                                                        |  |
|  |  +--------------------------------------------------------------------+|  |
|  |  | David R. · ⭐⭐⭐⭐⭐ · 1 month ago · Companionship                ||  |
|  |  |                                                                    ||  |
|  |  | "Excellent caregiver. Very reliable and my father looks forward  ||  |
|  |  |  to her visits every week."                                       ||  |
|  |  +--------------------------------------------------------------------+|  |
|  |                                                                        |  |
|  |  +--------------------------------------------------------------------+|  |
|  |  | Elizabeth M. · ⭐⭐⭐⭐ · 2 months ago · Light Housework            ||  |
|  |  |                                                                    ||  |
|  |  | "Sarah is helpful and kind. She did a great job with light       ||  |
|  |  |  cleaning. Only 4 stars because she was 15 minutes late once."   ||  |
|  |  +--------------------------------------------------------------------+|  |
|  |                                                                        |  |
|  |  [Show more reviews]                                                   |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  VERIFICATION STATUS                                                   |  |
|  |                                                                        |  |
|  |  ✓ DBS Verified                                                        |  |
|  |    Enhanced DBS check completed on 15 Jan 2026                        |  |
|  |    Certificate: ****567890                                            |  |
|  |    Valid until 15 Jan 2029 (3 years)                                  |  |
|  |    DBS Update Service: Subscribed                                     |  |
|  |                                                                        |  |
|  |  ✓ ID Verified                                                         |  |
|  |    Government-issued ID verified on 10 Jan 2026                       |  |
|  |    Verified via Stripe Identity (automated)                           |  |
|  |                                                                        |  |
|  |  ✓ Right to Work Verified                                              |  |
|  |    Right to work in UK verified on 10 Jan 2026                        |  |
|  |    UK passport verified                                               |  |
|  |                                                                        |  |
|  |  ✓ Phone Verified                                                      |  |
|  |    Phone number verified                                              |  |
|  |                                                                        |  |
|  |  ℹ️ All caregivers undergo identity verification before joining the   |  |
|  |     platform. DBS checks are voluntary for companionship services.    |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |                            [REQUEST BOOKING]                           |  |
|  |                                                                        |  |
|  |  Response time: Usually within 6 hours                                |  |
|  |  Acceptance rate: 85%                                                  |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
| About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact    |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

#### New Caregiver State (No Reviews)

```
+------------------------------------------------------------------------------+
|  (Header identical to above)                                                |
+------------------------------------------------------------------------------+
|                                                                              |
|  [← Back to Search Results]                                                 |
|                                                                              |
|  +---------------------------+  +------------------------------------------+ |
|  |                           |  | H1: Maria D.                             | |
|  |                           |  |                                          | |
|  |       [PROFILE PHOTO]     |  | 📍 SW2A area · 📏 4.1 miles from you     | |
|  |        (400x400px)        |  |                                          | |
|  |                           |  | ✓ ID Verified  ✓ Right to Work Verified | |
|  |                           |  | 🔵 Companionship Services Only           | |
|  |                           |  | 🆕 New Caregiver                         | |
|  |                           |  |                                          | |
|  |                           |  | From £18/hour ℹ️                         | |
|  |                           |  |                                          | |
|  +---------------------------+  | [REQUEST BOOKING]  ❤️  🔗                | |
|                                 +------------------------------------------+ |
|                                                                              |
|  (About Me, Services Offered, Availability sections identical)              |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  REVIEWS & RATINGS                                                     |  |
|  |                                                                        |  |
|  |         ⭐                                                              |  |
|  |  New to the platform - no reviews yet                                  |  |
|  |                                                                        |  |
|  |  Be the first to book Maria and leave a review!                        |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  VERIFICATION STATUS                                                   |  |
|  |                                                                        |  |
|  |  ✓ ID Verified                                                         |  |
|  |    Government-issued ID verified on 1 Mar 2026                        |  |
|  |                                                                        |  |
|  |  ✓ Right to Work Verified                                              |  |
|  |    Right to work in UK verified on 1 Mar 2026                         |  |
|  |                                                                        |  |
|  |  ✓ Phone Verified                                                      |  |
|  |                                                                        |  |
|  |  ℹ️ DBS checks are voluntary for companionship services. This         |  |
|  |     caregiver has not submitted a DBS certificate.                    |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

#### Fully Booked State

```
+------------------------------------------------------------------------------+
|  (Header identical to default)                                              |
+------------------------------------------------------------------------------+
|                                                                              |
|  +---------------------------+  +------------------------------------------+ |
|  |                           |  | H1: Sarah K.                             | |
|  |       [PROFILE PHOTO]     |  | 🔴 Fully booked this week                | |
|  |                           |  |                                          | |
|  |                           |  | (Other header content identical)         | |
|  +---------------------------+  | [REQUEST FUTURE BOOKING]  ❤️  🔗         | |
|                                 +------------------------------------------+ |
|                                                                              |
|  (About Me, Services sections identical)                                    |
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  AVAILABILITY                                                          |  |
|  |                                                                        |  |
|  |  🔴 Fully booked this week                                             |  |
|  |                                                                        |  |
|  |  This caregiver has no availability in the next 7 days.               |  |
|  |  You can request a booking for a future date.                         |  |
|  |                                                                        |  |
|  |  Next available: Monday, March 19 (2 weeks away)                      |  |
|  |                                                                        |  |
|  |  [REQUEST FUTURE BOOKING]                                              |  |
|  |                                                                        |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  (Reviews, Verification sections identical)                                 |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.2 Mobile Wireframe (375px)

#### Default State (With Sticky CTA)

```
+------------------------------------------+
| [☰] [LOGO]                     [USER ▼] |
+------------------------------------------+
| [← Back to Search]                       |
|                                          |
| +--------------------------------------+ |
| |                                      | |
| |        [PROFILE PHOTO]               | |
| |         (200x200px)                  | |
| |                                      | |
| +--------------------------------------+ |
|                                          |
| H1: Sarah K.                             |
| 📍 SW1A area · 📏 1.2 miles             |
|                                          |
| ✓ DBS  ✓ ID  ✓ Right to Work            |
| 🔵 Companionship Only                    |
|                                          |
| ⭐⭐⭐⭐⭐ 4.8 (24 reviews)              |
| See all reviews ↓                        |
|                                          |
| From £20/hour ℹ️                         |
|                                          |
| ❤️ Add to Favorites   🔗 Share          |
|                                          |
+------------------------------------------+
| ABOUT SARAH                              |
|                                          |
| "I'm an experienced companion with 8    |
| years of experience providing           |
| companionship and support..."           |
|                                          |
| 📅 8 years experience                    |
| 🗣️ 🇬🇧 English, 🇵🇱 Polish              |
| ❤️ Gardening, reading, walks            |
| 🚗 Has own vehicle                       |
+------------------------------------------+
| SERVICES I OFFER                         |
|                                          |
| ✓ Companionship                          |
| ✓ Light housework                        |
| ✓ Shopping and errands                   |
| ✓ Meal preparation                       |
| ✓ Transportation                         |
|                                          |
| ℹ️ Looking for personal care?           |
|    Join the waitlist.                   |
+------------------------------------------+
| AVAILABILITY                             |
|                                          |
| Tap a date to see available times:      |
|                                          |
| Mo Tu We Th Fr Sa Su                     |
| 5  6 [7✓] 8 [9✓][10✓]11                 |
| [12✓]13[14✓]15[16✓][17✓]18             |
| (Calendar grid)                          |
|                                          |
| OR                                       |
|                                          |
| Available:                               |
| • Monday mornings                        |
| • Wednesday mornings & afternoons        |
| • Friday mornings & afternoons           |
+------------------------------------------+
| REVIEWS & RATINGS  Sort: Recent ▼       |
|                                          |
| ⭐⭐⭐⭐⭐ 4.8 / 5 (24 reviews)          |
|                                          |
| 5 ⭐ ████████████ 20 (83%)               |
| 4 ⭐ ██ 3 (12%)                          |
| 3 ⭐ █ 1 (4%)                            |
|                                          |
| +--------------------------------------+ |
| | Margaret S. · ⭐⭐⭐⭐⭐ · 3 weeks    | |
| | Companionship                        | |
| |                                      | |
| | "Sarah was wonderful! She was        | |
| | punctual, friendly, and my mother    | |
| | really enjoyed her company..."       | |
| |                                      | |
| | Sarah: "Thank you so much!"          | |
| +--------------------------------------+ |
|                                          |
| +--------------------------------------+ |
| | David R. · ⭐⭐⭐⭐⭐ · 1 month       | |
| | (Review card)                        | |
| +--------------------------------------+ |
|                                          |
| [Show more reviews]                      |
+------------------------------------------+
| VERIFICATION STATUS                      |
|                                          |
| ✓ DBS Verified                           |
| Enhanced DBS check: 15 Jan 2026          |
| Valid until 15 Jan 2029                  |
|                                          |
| ✓ ID Verified                            |
| Verified: 10 Jan 2026                    |
|                                          |
| ✓ Right to Work Verified                 |
| UK passport verified: 10 Jan 2026        |
|                                          |
| ✓ Phone Verified                         |
+------------------------------------------+
|                                          |
|                                          |
| (Space for scrolling)                    |
|                                          |
+------------------------------------------+
| [    REQUEST BOOKING    ]                | <- STICKY BOTTOM BAR
| Response time: ~6 hours                  |
+------------------------------------------+
```

---

## 4. Responsive Behavior

### 4.1 Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | 320-767px | 1-column, profile photo 200x200px, sticky bottom CTA, simplified availability list |
| Tablet | 768-1023px | 2-column header (photo left, details right), calendar grid, CTA at top-right |
| Desktop | 1024px+ | 2-column header, full calendar grid, larger profile photo (400x400px), CTA at top-right + repeated at bottom |

### 4.2 Component Behavior

**Profile Header**:
- Mobile: 1-column, photo top, details below, CTA in sticky bottom bar
- Tablet: 2-column, photo left (250x250px), details right, CTA top-right
- Desktop: 2-column, photo left (400x400px), details right, CTA top-right

**Availability Calendar**:
- Mobile: Simplified text list ("Available Monday mornings, Wednesday afternoons...") OR mini calendar with tap to expand
- Tablet: Week grid, tap date to see time slots
- Desktop: Full month grid, click date to see time slots in sidebar

**Reviews**:
- Mobile: 1-column cards, stack vertically, 3-5 visible with "Show more" button
- Tablet: Same as mobile, slightly wider cards
- Desktop: Wider cards, 5-10 visible initially

**Sticky CTA** (Mobile Only):
- Fixed bottom bar: "Request Booking" button always visible on scroll
- Hides when user scrolls up (more content visible)
- Reappears when scrolling down (easy access to CTA)

---

## 5. UI States

### 5.1 Profile States

| State | Description | Visual Indication |
|-------|-------------|-------------------|
| **Loading** | Profile data being fetched | Skeleton UI for photo, name, bio, ratings, reviews |
| **Display** | Profile loaded successfully | Full profile content displayed |
| **Not Found** | Invalid `caregiverId` or inactive profile | Error message: "Caregiver not found or profile no longer active" |
| **Unavailable** | Caregiver has no availability in next 30 days | Warning banner: "This caregiver has no availability in the next 30 days. Request a future booking." |

### 5.2 Interactive Element States

| Element | States | Visual Indication |
|---------|--------|-------------------|
| **Request Booking Button** | Default, Hover, Focus, Disabled, Loading | Disabled if user not logged in OR caregiver inactive |
| **Add to Favorites Button** | Unfavorited (empty heart), Favorited (filled heart), Hover, Focus | Heart fills/unfills on click, toast notification shown |
| **Share Profile Button** | Default, Hover, Focus, Active (clicked) | Toast notification: "Link copied to clipboard" |
| **Availability Date** | Default (available), Hover, Selected, Booked (greyed), Unavailable (strikethrough) | Green background for available, grey for booked |
| **Time Slot** | Available (green), Booked (grey), Selected (blue highlight) | Click to select, updates "Request Booking" button text |

### 5.3 Verification Badge States

| Badge | Display Condition | Visual |
|-------|------------------|--------|
| **DBS Verified** | `caregivers.dbs_verified = true` | Green pill: "✓ DBS Verified" |
| **ID Verified** | All caregivers (mandatory) | Blue pill: "✓ ID Verified" |
| **Right to Work Verified** | All caregivers (mandatory) | Blue pill: "✓ Right to Work Verified" |
| **New Caregiver** | `caregivers.total_reviews = 0` | Blue pill: "🆕 New Caregiver" |
| **Fully Booked** | No availability in next 7 days | Red pill: "🔴 Fully booked this week" |

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

#### Perceivable
- **Text Alternatives**:
  - Profile photo: `alt="Profile photo of Sarah K."`
  - Star rating: `aria-label="4.8 out of 5 stars, based on 24 reviews"`
  - Verification badges: `aria-label="DBS verified, ID verified, Right to work verified"`
  - Calendar dates: `aria-label="Wednesday March 7, available"`
  - Service icons: All icons have text labels

- **Color Contrast**:
  - Body text on white: 7:1 (AAA)
  - Badge text on colored backgrounds: 4.5:1 minimum
  - Link text: 4.5:1 minimum, underlined
  - Disabled states: 3:1 (exception)

- **Adaptable**:
  - Content logical order when CSS disabled
  - Responsive layout doesn't hide content
  - Text resizable up to 200%

#### Operable
- **Keyboard Accessible**:
  - Tab order: Logo → Back link → Profile photo (no action) → Favorite button → Share button → Request Booking → Section headings → Calendar dates → Time slots → Review cards → Footer
  - Enter/Space: Activate buttons, links
  - Arrow keys: Navigate calendar grid
  - No keyboard traps

- **Focus Order**:
  1. Skip to main content link
  2. Header navigation
  3. "Back to Search" link
  4. "Add to Favorites" button
  5. "Share Profile" button
  6. "Request Booking" button (top)
  7. "See all reviews" link
  8. Calendar dates (in grid order)
  9. Time slot buttons
  10. Review "Show more" button
  11. "Request Booking" button (bottom)
  12. Footer links

- **Focus Indicators**:
  - 3px solid blue border (`outline: 3px solid $focus-border`)
  - Visible on all interactive elements
  - Never removed

- **Touch Targets** (Mobile):
  - Minimum 48x48px for all buttons
  - Calendar dates: 44x44px tap areas
  - Time slots: 48x48px tap areas
  - Favorite/Share icons: 48x48px tap areas

#### Understandable
- **Readable**:
  - Language declared: `<html lang="en">`
  - Plain language: "No availability" not "Capacity exhausted"
  - Clear headings: "About Sarah" not "Bio"
  - Helper text: "Platform adds 15% service fee"

- **Predictable**:
  - Navigation consistent with other screens
  - "Request Booking" button always in same position (top-right + bottom)
  - Calendar interactions consistent (click date → see times)

- **Input Assistance**:
  - Tooltips on verification badges explain verification type
  - Helper text on hourly rate explains platform fee
  - Clear error messages if profile not found

#### Robust
- **Compatible**:
  - Valid HTML5 semantic markup
  - ARIA landmarks: `<main>`, `<nav>`, `<section>`, `<footer>`
  - ARIA roles: `role="region"` on calendar, `role="list"` on reviews
  - ARIA labels: All interactive elements labeled

### 6.2 Screen Reader Support

**Announcements**:
- Profile loaded: "Sarah K.'s profile loaded. DBS verified, ID verified, Right to work verified. Rated 4.8 out of 5 stars based on 24 reviews."
- Favorite added: "Sarah K. added to favorites"
- Favorite removed: "Sarah K. removed from favorites"
- Link copied: "Profile link copied to clipboard"
- Calendar date selected: "Wednesday March 7 selected. Available time slots: Morning 9am-12pm, Afternoon 2pm-6pm"

**ARIA Labels**:
- Profile header: `<section aria-label="Sarah K.'s profile">`
- About section: `<section aria-label="About Sarah">`
- Services section: `<section aria-label="Services offered">`
- Availability section: `<section aria-label="Availability calendar">`
- Reviews section: `<section aria-label="Reviews and ratings">`
- Verification section: `<section aria-label="Verification status">`

**ARIA Live Regions**:
- Toast notifications: `<div role="alert" aria-live="assertive">`
- Time slots (after date selected): `<div aria-live="polite">` announces available times

### 6.3 Keyboard Shortcuts (Optional)

| Key | Action |
|-----|--------|
| `b` | Focus "Request Booking" button |
| `r` | Scroll to reviews section |
| `a` | Scroll to availability section |
| `Esc` | Close tooltips/modals |

---

## 7. Navigation & Interactions

### 7.1 Entry Points

**Primary Entry** (conversion funnel):
- SCR-CR-003 (Search Results) → Click caregiver card → `/caregivers/:caregiverId`

**Secondary Entries**:
- SCR-CR-001 (Dashboard) → "Featured Caregivers" → Profile link
- SCR-CR-008 (Booking Detail) → "View Caregiver Profile" link
- Favorites list → Profile link
- Direct link (SEO, shared link)

### 7.2 Exit Points

**Primary Conversion Goal**:
- "Request Booking" button → SCR-CR-006 (Booking Request Form) with `caregiverId` pre-filled

**Alternative Paths**:
- "Back to Search" → SCR-CR-003 (preserves search state)
- Header "Dashboard" → SCR-CR-001
- Header "Search" → SCR-CR-003
- "Add to Favorites" → No navigation (saves favorite, shows toast)
- "Share Profile" → No navigation (copies link, shows toast)

### 7.3 User Interactions

#### Profile View Interaction
1. User arrives from search results (most common)
2. Profile loads: Photo, name, verification badges, rating displayed
3. User scrolls down: Reads bio, services, reviews
4. User evaluates: Checks availability calendar, reviews
5. User decides: Clicks "Request Booking" (conversion) OR "Back to Search" (continue browsing)

#### Availability Calendar Interaction
1. User sees calendar grid (next 30 days)
2. User clicks available date (green)
3. Time slots appear below calendar
4. User clicks time slot (e.g., "Morning 9am-12pm")
5. Time slot highlights, "Request Booking" button updates: "Request Booking for Wed 10am"
6. User clicks "Request Booking" → Redirects to SCR-CR-006 with date/time pre-filled

#### Favorite Interaction
1. User clicks heart icon (empty)
2. API call: POST `/api/favorites/:caregiverId`
3. Heart fills (red), toast notification: "Sarah K. added to favorites"
4. User can click again to unfavorite: Heart empties, DELETE request, toast: "Removed from favorites"

#### Share Interaction
1. User clicks share icon 🔗
2. JavaScript copies profile URL to clipboard
3. Toast notification: "Profile link copied to clipboard"
4. User can paste link (e.g., in messaging app, email)

#### Review Interaction
1. User scrolls to reviews section
2. Reads top 10 reviews (most recent first)
3. User can change sort: Dropdown → "Highest Rated" → Reviews re-sort (client-side)
4. User clicks "Show more reviews" → AJAX loads next 10 reviews (no page reload)

---

## 8. Component Reuse

### 8.1 Shared Components from Dashboard Inventory

| Component | Component ID | Usage in Profile Screen |
|-----------|--------------|-------------------------|
| **Navigation Header** | `NAV-HEADER-AUTH` | Identical header across all authenticated screens (Care Receiver variant) |
| **Footer** | `FOOTER-GLOBAL` | Identical footer across all screens |
| **Status Badge** | `STATUS-BADGE` | Verification badges (DBS, ID, Right to Work), service type badge, "New Caregiver" badge, "Fully Booked" badge |
| **User Avatar** | `USER-AVATAR` | Large profile photo, reviewer avatars in reviews (if photos added) |
| **Button** | `BUTTON` | Primary ("Request Booking"), Icon ("Add to Favorites" ❤️, "Share Profile" 🔗), Link ("Back to Search") |
| **Toast Notification** | `TOAST-NOTIFICATION` | "Added to favorites", "Removed from favorites", "Link copied to clipboard" |

**See**: `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md` for full component specs

### 8.2 New Components (Profile-Specific)

| Component | Purpose | Reusability |
|-----------|---------|-------------|
| **Profile Header** | Display caregiver key info, CTAs | MEDIUM - Could be adapted for admin user detail views |
| **Availability Calendar** | Show available dates/times | HIGH - Reusable for caregiver's own availability management screen |
| **Review Card** | Display individual review | HIGH - Reusable in caregiver dashboard (reviews received), care receiver dashboard (reviews left) |
| **Rating Distribution Chart** | Visual breakdown of star ratings | MEDIUM - Reusable for admin analytics, caregiver performance reviews |
| **Verification Detail List** | Detailed verification status | MEDIUM - Reusable for admin verification review screens |

---

## 9. Compliance Notes

### 9.1 GDPR Data Display Compliance

**Privacy Protection**:
- **Name**: First name + last initial only ("Sarah K."). Full last name revealed AFTER booking accepted (data minimization, safety).
- **Location**: Postcode district only ("SW1A area"). Full postcode NOT shown (privacy, safety).
- **Reviewer Names**: Anonymized ("Margaret S."). Full names not shown (privacy).
- **Contact Info**: Phone number NOT shown on public profile. Shared AFTER booking accepted (privacy, safety).

**Data Controller Notice**:
- Footer link to Privacy Policy
- Caregiver profile data collected with consent (Terms acceptance during registration)
- Reviews published with care receiver consent (review submission = consent to publish)

### 9.2 Care Act 2014 Safeguarding

**Safeguarding Elements**:
- Verification transparency: All verification statuses clearly displayed
- DBS status: Clearly marked if DBS verified OR if not submitted (transparency)
- "Report Concern" button: Available in header (not shown in wireframe but present in all authenticated screens)
- Helper text: "DBS checks are voluntary for companionship services" (sets expectations, no misleading claims)

**Trust & Safety**:
- Verification dates shown: "Verified on [date]" (recency matters for trust)
- DBS expiry shown: "Valid until [date]" (ensures current verification)
- Moderation: Reviews moderated by admin (inappropriate content removed)

### 9.3 Equality Act 2010

**No Discrimination**:
- Gender, language, interests shown factually (no discriminatory labeling)
- Services offered shown without judgment
- All caregivers given equal visibility (no algorithmic bias at Tier 1 - results sorted by distance only)

---

## 10. Design Notes

### 10.1 Design Principles

**Trust-Building Through Transparency**:
- All verification badges prominently displayed (DBS, ID, Right to Work)
- Verification dates shown (recency builds trust)
- Real reviews visible (no fake reviews, moderated for appropriateness)
- Clear pricing: "From £20/hour" + tooltip explaining platform fee (15% placeholder)
- Profile completeness visible (full bio, services, availability)

**Elderly-Friendly Design**:
- Large profile photo (400x400px desktop) - helps with recognition, humanizes caregiver
- Large text: 18px minimum body, 24px+ headings
- High contrast: Black text on white backgrounds
- Clear section headings: "About Sarah" not "Profile Overview"
- Generous spacing: 16px padding, 24px between sections
- Touch-friendly: 48px minimum touch targets (mobile)

**Conversion Optimization**:
- "Request Booking" button repeated: Top-right header + bottom of page + sticky on mobile
- Pre-filled booking form: Calendar date selection pre-fills date/time in booking request
- Prominent CTA: Large, high-contrast button
- Clear value proposition: Rating, reviews, verification badges above-the-fold

**Performance**:
- Lazy load reviews: Only first 10 loaded initially, "Show more" loads next 10
- Lazy load profile photo: Progressive JPEG or WebP format
- Minimal API calls: Single endpoint for full profile data
- Client-side sorting: Reviews sorted without API call

### 10.2 Placeholder Content

**Commission Rate**: 15% placeholder used in pricing tooltip (pending FDR-008 decision)
- Tooltip text: "Platform adds **15%** service fee to your total. Final cost: £23/hour"
- [PLACEHOLDER: Subject to FDR-008 final decision]

**Profile Photo**: Default placeholder if caregiver has not uploaded photo
- Placeholder: Initials ("SK" for Sarah K.) in colored circle

**Bio**: Admin-approved bio text (max 500 chars)
- Moderated for: No contact info (email, phone), no inappropriate content, professional tone

### 10.3 Future Enhancements (Not in R0)

**Deferred Features**:
- **Video introduction**: Caregiver uploads 30-60 second intro video (builds connection)
- **Instant messaging**: Live chat with caregiver before booking (requires real-time infrastructure)
- **Background check expiry alerts**: Notify user if caregiver's DBS is expiring soon
- **Caregiver "About to become available" waitlist**: User signs up to be notified when fully-booked caregiver has opening
- **Compare caregivers**: Side-by-side comparison of 2-3 caregivers (price, rating, availability)
- **Calendar integration**: Export caregiver's available slots to user's Google Calendar

**Rationale**: Focus on core profile functionality for R0. Add enhancements based on user feedback and usage analytics.

### 10.4 Analytics & Tracking

**Events to Track**:
- Profile viewed (from where: search, dashboard, direct link)
- Sections scrolled to (About, Services, Availability, Reviews, Verification)
- Calendar date clicked (engagement with availability)
- Time slot selected (intent signal)
- "Request Booking" clicked (conversion)
- "Add to Favorites" clicked (engagement, intent)
- "Share Profile" clicked (viral potential)
- "Back to Search" clicked (bounced or continuing search)
- "Show more reviews" clicked (engagement with reviews)

**Metrics**:
- Profile-to-booking request conversion rate (primary KPI)
- Average time on profile page (engagement)
- Scroll depth (how far users read)
- Favorite rate (% of profile views that favorite)
- Share rate (% of profile views that share)
- Review engagement (% who read reviews, % who expand "Show more")

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-08 | UX/UI Design Team | Initial wireframes for SCR-CR-005 (Caregiver Profile) |

---

## Cross-References

**Source Documents**:
- Search Specification: `/docs/product/features/tier1-search-specification.md` (Section 5: Caregiver Profiles)
- Screen Inventory: `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` (Lines 582-643)
- Route Map: `/docs/product/tier1-route-map.md` (SCR-CR-005 definition)
- User Flow: `/docs/tiers/tier1/draft-design-specs/user-flows/care-receiver-first-booking.md` (Step 11-12)
- Verification Spec: `/docs/product/features/tier1-verification-specification.md` (Verification badge display)
- Shared Components: `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md`
- Compliance: `/docs/tiers/tier1/compliance.md` (GDPR data display rules)

**Related Screens**:
- SCR-CR-003 (Caregiver Search) - Entry point
- SCR-CR-006 (Booking Request Form) - Primary exit point (conversion goal)
- SCR-CR-001 (Care Receiver Dashboard) - Secondary entry point
- SCR-CR-008 (Booking Detail) - Secondary entry point

---

**END OF DOCUMENT**
