# Caregiver Search Wireframes (SCR-CR-003)

**Document Purpose**: ASCII wireframes and complete element inventory for Caregiver Search (SCR-CR-003)

**Screen ID**: SCR-CR-003
**Screen Name**: Caregiver Search
**User Role**: Care Receiver, Family Member
**Route**: `/search`
**R0/R1**: R0 (Launch-critical)
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
9. [Design Notes](#9-design-notes)

---

## 1. Screen Purpose

### 1.1 Purpose Statement

The Caregiver Search screen is the **primary discovery mechanism** for care receivers to find suitable caregivers. It enables:
- Location-based search (postcode + radius)
- Filter by availability, hourly rate, services, verification status, languages, gender
- Sort by distance, rating, price
- View results as paginated caregiver cards
- Quick access to caregiver profiles and booking request forms

### 1.2 Entry Points

**From Dashboard**:
- SCR-CR-001 (Care Receiver Dashboard) → "Find a Caregiver" button
- SCR-CR-001 → "Search Caregivers" link in header navigation

**From Homepage**:
- SCR-PUB-001 (Homepage) → "Find Care" CTA (if authenticated)

**From Registration**:
- SCR-AUTH-004 (Phone Verification) → Verification complete → Redirect to search

**From Other Screens**:
- Header navigation "Search Caregivers" link on all authenticated screens

### 1.3 Exit Points

**Primary Actions**:
- Click caregiver card → SCR-CR-005 (Caregiver Profile)
- "Request Booking" button (on card) → SCR-CR-006 (Booking Request Form)

**Secondary Actions**:
- "View Profile" link on card → SCR-CR-005
- "Add to Favorites" (heart icon) → Save favorite action (no navigation)

**Global Navigation**:
- Header "Dashboard" → SCR-CR-001
- Header "My Bookings" → SCR-CR-008
- Header "Messages" → SCR-CR-012

---

## 2. Element Inventory

### 2.1 Content Blocks

#### Block 1: Header (Global)
- **Component**: `NAV-HEADER-AUTH` (Care Receiver variant)
- **Purpose**: Consistent navigation across all authenticated screens
- **Elements**:
  - Platform logo → Dashboard
  - Main navigation: Dashboard, **Search Caregivers** (active), My Bookings, Messages
  - User profile menu (right)
- **See**: `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md` Component 3.1

#### Block 2: Search Bar (Primary)
- **Purpose**: Location input and radius selection
- **Priority**: Primary
- **Elements**:
  - **Postcode Input** (text field, required)
    - Label: "Where do you need care?"
    - Placeholder: "Enter your postcode (e.g., SW1A 1AA)"
    - Value: Auto-filled from user profile postcode
    - Validation: UK postcode format
    - Error: "Please enter a valid UK postcode"

  - **Radius Selector** (dropdown)
    - Label: "Search radius"
    - Options: 5 miles, 10 miles (default), 15 miles, 20 miles, 30 miles
    - Value: Defaults to 10 miles

  - **Search Button** (primary CTA)
    - Label: "Search"
    - Icon: 🔍 Magnifying glass
    - Action: Execute search query, update results
    - States: Default, Loading ("Searching..."), Disabled (invalid postcode)

#### Block 3: Filters Sidebar (Desktop) / Filter Panel (Mobile)
- **Purpose**: Refine search results by availability, price, services, verification
- **Priority**: Primary
- **Visibility**: Sidebar on desktop (≥1024px), collapsible bottom sheet on mobile (≤767px)
- **Elements**:

##### Filter: Availability
  - **Label**: "Availability" (collapsible section)
  - **Day of Week** (multi-select checkboxes):
    - Options: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
    - Default: All selected
  - **Time of Day** (multi-select checkboxes):
    - Options: Morning (6am-12pm), Afternoon (12pm-6pm), Evening (6pm-10pm)
    - Default: All selected

##### Filter: Hourly Rate
  - **Label**: "Hourly rate"
  - **Dual-range slider** (min-max):
    - Min: £10/hour (platform minimum)
    - Max: £40/hour (user adjustable up to £100)
    - Default range: £10-£40
    - Display: "£15 - £25 / hour" (live update)
  - **Helper text**: "Platform adds 15% service fee to your total"

##### Filter: Service Types
  - **Label**: "Services offered" (multi-select checkboxes)
  - **Options** (Tier 1 only):
    - Companionship (conversation, activities)
    - Light housework (cleaning, tidying)
    - Shopping and errands
    - Meal preparation (no feeding)
    - Transportation (caregiver has vehicle)
  - **Default**: All selected
  - **Logic**: AND filter (caregiver must offer ALL selected services)

##### Filter: Verification Status
  - **Label**: "Verification" (multi-select checkboxes)
  - **Options**:
    - DBS Verified (voluntary at Tier 1)
    - ID Verified (all caregivers, auto-selected)
    - Right to Work Verified (all caregivers, auto-selected)
  - **Default**: ID and Right to Work checked, DBS unchecked
  - **Helper text**: "DBS is voluntary for companionship services"

##### Filter: Languages Spoken
  - **Label**: "Languages spoken" (multi-select dropdown)
  - **Options**: English (default), Polish, Romanian, Urdu, Bengali, Punjabi, Welsh, Other
  - **Default**: English only
  - **Logic**: Caregiver must speak ALL selected languages

##### Filter: Gender Preference
  - **Label**: "Gender preference (optional)"
  - **Options** (radio buttons): Male, Female, No Preference
  - **Default**: No Preference
  - **Helper text**: "This is a personal comfort preference"

##### Filter: Minimum Rating
  - **Label**: "Minimum rating"
  - **Options** (radio buttons): Any rating (default), 4+ stars, 4.5+ stars
  - **Note**: New caregivers with no reviews shown regardless

##### Filter Actions
  - **"Apply Filters" button** (primary, bottom of sidebar)
    - Action: Update results with applied filters
  - **"Clear All Filters" link**
    - Action: Reset all filters to defaults, refresh results

#### Block 4: Search Results Header
- **Purpose**: Show result count, active filters, and sort options
- **Priority**: Primary
- **Elements**:
  - **Result Count**: "24 caregivers found" (bold, large)
  - **Search Summary**: "Within 10 miles of SW1A 1AA"
  - **Active Filter Tags** (dismissible pills):
    - Each active filter shown as tag: "DBS Verified [×]", "Morning availability [×]"
    - Click × to remove individual filter
  - **Sort Dropdown** (right-aligned):
    - Label: "Sort by:"
    - Options:
      - Distance (nearest first) - DEFAULT
      - Rating (highest first)
      - Price (low to high)
      - Price (high to low)
      - Newest caregivers first
  - **View Toggle** (icon buttons):
    - Card view icon (active by default)
    - List view icon (denser layout)

#### Block 5: Caregiver Results Grid
- **Component**: Multiple instances of `CAREGIVER-CARD`
- **Purpose**: Display search results as clickable cards
- **Priority**: Primary
- **Layout**:
  - Desktop (≥1024px): 3-column grid
  - Tablet (768-1023px): 2-column grid
  - Mobile (≤767px): 1-column list

##### Each Caregiver Card Contains:
  - **Profile Photo** (circular, 120x120px)
    - Alt text: "Profile photo of [Caregiver Name]"
    - Default placeholder if no photo

  - **Caregiver Name**: "Sarah K." (first name + last initial)

  - **Distance**: "1.2 miles away" (from search postcode)

  - **Verification Badges** (inline icons):
    - "✓ DBS Verified" (green, if applicable)
    - "✓ ID Verified" (all caregivers)

  - **Service Type Badge**: "Companionship Only" (blue pill)

  - **Hourly Rate**: "From £20/hour" (bold, prominent)

  - **Average Rating**:
    - 5-star display (filled/half/empty stars)
    - Review count: "4.8 stars (24 reviews)"
    - "New Caregiver" badge if no reviews

  - **Bio Excerpt**: First 100 characters of bio + "Read more..."

  - **Languages Spoken** (icon row):
    - Flag icons or text: "🇬🇧 English, 🇵🇱 Polish"
    - Max 3 shown, "+ 2 more" if additional

  - **Availability Indicator** (text):
    - "Available Monday, Wednesday mornings" (brief summary)

  - **Action Buttons**:
    - "View Profile" (primary button) → SCR-CR-005
    - "Add to Favorites" ❤️ (icon button, toggleable)

  - **Card Interaction**:
    - Entire card clickable (opens profile)
    - Hover: Subtle elevation/shadow
    - Focus: 3px border (keyboard navigation)

#### Block 6: Pagination Controls
- **Purpose**: Navigate through multi-page results
- **Priority**: Primary (if >12 results)
- **Layout**: Centered below results grid
- **Elements**:
  - **Previous Button**: "← Previous" (disabled on page 1)
  - **Page Numbers**: 1, 2, 3, ... (current page highlighted)
    - Show max 5 page links
    - Ellipsis (...) if >5 pages
  - **Next Button**: "Next →" (disabled on last page)
  - **Page Size**: 12 results per page (desktop), 6 per page (mobile)

#### Block 7: No Results State (Conditional)
- **Purpose**: Guide user when no caregivers match criteria
- **Priority**: Primary (if result_count = 0)
- **Elements**:
  - **Icon**: 🔍 or empty state illustration
  - **Heading (H2)**: "No caregivers found"
  - **Message**: "No caregivers match your search criteria"
  - **Suggestions** (bulleted list):
    - "Try expanding your search radius"
    - "Adjust your hourly rate range"
    - "Select more availability options"
    - "Remove some service filters"
  - **Alternative Actions**:
    - "Notify me when caregivers become available" (email signup button)
    - "Contact support for help" (link)
    - "View all caregivers in [postcode area]" (remove filters button)

#### Block 8: Loading State (Conditional)
- **Purpose**: Show search is in progress
- **Priority**: Primary (while API query running)
- **Elements**:
  - **Skeleton Cards**: 12 placeholder cards (animated gradient pulse)
  - **Loading Message**: "Searching for caregivers near you..." (centered)
  - **Spinner**: Rotating spinner icon (subtle)

#### Block 9: Footer (Global)
- **Component**: `FOOTER-GLOBAL`
- **Purpose**: Legal links, support access
- **Elements**: Standard footer links (Terms, Privacy, Safeguarding, Contact)
- **See**: Dashboard shared components Component 3.2

---

### 2.2 Interactive Elements

#### Primary Actions
1. **Search Button**
   - Type: Primary submit button
   - Action: Execute search query → Update results
   - Keyboard: Enter key submits search
   - Screen reader: "Search for caregivers, button"

2. **Caregiver Card Click**
   - Action: Navigate to `/caregivers/:caregiverId` (SCR-CR-005)
   - Keyboard: Tab to card, Enter to activate
   - Screen reader: "View [Caregiver Name]'s profile"

3. **View Profile Button**
   - Type: Primary button on card
   - Action: Navigate to caregiver profile
   - States: Default, Hover, Focus

4. **Add to Favorites Button**
   - Type: Icon button (heart)
   - Action: Toggle favorite status (API call, no navigation)
   - States: Unfilled (not favorited), Filled (favorited), Hover, Focus
   - Screen reader: "Add [Caregiver Name] to favorites" / "Remove from favorites"

#### Secondary Actions
5. **Apply Filters Button**
   - Action: Update search results with selected filters
   - Loading state: "Applying filters..."

6. **Clear All Filters Link**
   - Action: Reset filters → Re-run search with defaults

7. **Sort Dropdown**
   - Action: Re-sort results (client-side or server-side)
   - Keyboard: Arrow keys to select, Enter to apply

8. **Filter Tag Dismiss (×)**
   - Action: Remove individual filter → Update results

9. **Pagination Buttons**
   - Action: Load next/previous page of results
   - Keyboard: Tab + Enter

#### Tertiary Actions
10. **Filter Section Toggle** (mobile only)
    - Action: Expand/collapse filter bottom sheet
    - Button: "Filters" with count badge (e.g., "Filters (3)")

---

### 2.3 Data Display Elements

#### Dynamic Data
1. **Search Postcode**
   - Source: `care_receiver_profiles.postcode` (auto-filled)
   - User can override

2. **Result Count**
   - Source: Count of caregivers matching query
   - Example: "24 caregivers found"

3. **Caregiver Cards**
   - Source: `caregivers` table joined with availability, reviews
   - Query filters by: location (lat/long + radius), availability, rate, services, verification, languages, gender
   - Sorted by: distance ASC (default)
   - Paginated: 12 per page (desktop), 6 per page (mobile)

4. **Distance**
   - Source: Haversine formula (user postcode lat/long vs caregiver postcode lat/long)
   - Display: "1.2 miles away"

5. **Average Rating**
   - Source: `caregivers.average_rating` (calculated from reviews)
   - Display: 5-star visual + text "4.8 stars (24 reviews)"

6. **Active Filter Tags**
   - Source: Client-side state (which filters are applied)
   - Example: "DBS Verified", "£15-£25/hour", "Monday mornings"

#### Static Content
- Section labels, placeholders, helper text, error messages (see field definitions above)

---

### 2.4 Validation Rules

| Field | Validation Rule | Error Message |
|-------|-----------------|---------------|
| Postcode | Required, UK postcode format | "Please enter a valid UK postcode (e.g., SW1A 1AA)" |
| Radius | Required, one of: 5, 10, 15, 20, 30 miles | Auto-selected (no error) |
| Rate Range | Min ≥ £10, Max ≤ £100, Min < Max | "Invalid rate range" |

---

## 3. ASCII Wireframes

### 3.1 Desktop Wireframe (1440px+)

#### Default State (Results Found)

```
+------------------------------------------------------------------------------+
|  [LOGO]        Dashboard   Search ✓   My Bookings   Messages (2)   [USER▼] |
+------------------------------------------------------------------------------+
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  🔍  Where do you need care?                                          |  |
|  |                                                                        |  |
|  |  Postcode: [SW1A 1AA________________]  Radius: [10 miles ▼]  [Search] |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +--------------------+  +------------------------------------------------+  |
|  | FILTERS            |  | 24 caregivers found · Within 10 miles of SW1A  |  |
|  |                    |  | [DBS Verified ×] [Morning ×]  Sort: Distance ▼ |  |
|  | □ Availability     |  +------------------------------------------------+  |
|  |   Days:            |  |                                                |  |
|  |   ☑ Mon ☑ Tue ☑ Wed|  | +-------------+  +-------------+  +----------+  |  |
|  |   ☐ Thu ☐ Fri      |  | | [Photo]     |  | [Photo]     |  | [Photo]  |  |
|  |   Times:           |  | | Sarah K.    |  | Emma L.     |  | Maria D. |  |
|  |   ☑ Morning        |  | |             |  |             |  |          |  |
|  |   ☑ Afternoon      |  | | 1.2 mi away |  | 3.5 mi away |  | 4.1 mi  |  |
|  |                    |  | | ✓ DBS ✓ ID  |  | ✓ ID        |  | ✓ DBS   |  |
|  | □ Hourly Rate      |  | |             |  |             |  |          |  |
|  |   £15 ━━●━━━━ £25  |  | | From £20/hr |  | From £18/hr |  | £22/hr  |  |
|  |                    |  | | ⭐⭐⭐⭐⭐     |  | ⭐⭐⭐⭐      |  | New!    |  |
|  | □ Services         |  | | 4.8 (24)    |  | 4.5 (12)    |  |          |  |
|  |   ☑ Companionship  |  | |             |  |             |  |          |  |
|  |   ☑ Light housework|  | | "Experienced|  | "Friendly.."|  | "I love |  |
|  |   ☑ Shopping       |  | | companion..." | Read more...|  | helping"|  |
|  |   ☐ Meal prep      |  | |             |  |             |  |          |  |
|  |   ☐ Transportation |  | | 🇬🇧 🇵🇱      |  | 🇬🇧         |  | 🇬🇧 🇪🇸  |  |
|  |                    |  | |             |  |             |  |          |  |
|  | □ Verification     |  | | Mon, Wed AM |  | Tues, Thurs |  | Mon-Fri |  |
|  |   ☑ DBS Verified   |  | |             |  |             |  |          |  |
|  |   ☑ ID Verified    |  | | [View]  ❤️  |  | [View]  ❤️  |  | [View]❤️|  |
|  |                    |  | +-------------+  +-------------+  +----------+  |  |
|  | □ Languages        |  |                                                |  |
|  |   [English ▼]      |  | +-------------+  +-------------+  +----------+  |  |
|  |                    |  | | [Photo]     |  | [Photo]     |  | [Photo]  |  |
|  | ○ Gender           |  | | James M.    |  | Anna R.     |  | David W. |  |
|  |   ○ Male           |  | | 4.8 mi away |  | 5.2 mi away |  | 6.1 mi  |  |
|  |   ○ Female         |  | | ... (card)  |  | ... (card)  |  | (card)  |  |
|  |   ● No preference  |  | +-------------+  +-------------+  +----------+  |  |
|  |                    |  |                                                |  |
|  | ○ Min. Rating      |  | +-------------+  +-------------+  +----------+  |  |
|  |   ● Any            |  | | [Photo]     |  | [Photo]     |  | [Photo]  |  |
|  |   ○ 4+ stars       |  | | ... (more)  |  | ... (more)  |  | (more)  |  |
|  |   ○ 4.5+ stars     |  | +-------------+  +-------------+  +----------+  |  |
|  |                    |  |                                                |  |
|  | [Apply Filters]    |  | +-------------+  +-------------+  +----------+  |  |
|  | Clear all          |  | | [Photo]     |  | [Photo]     |  | [Photo]  |  |
|  +--------------------+  | | ... (more)  |  | ... (more)  |  | (more)  |  |
|                          | +-------------+  +-------------+  +----------+  |  |
|                          |                                                |  |
|                          |     [← Previous]  1  2  3  [Next →]            |  |
|                          |                                                |  |
|                          +------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
| About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact    |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

#### No Results State

```
+------------------------------------------------------------------------------+
|  [LOGO]        Dashboard   Search ✓   My Bookings   Messages (2)   [USER▼] |
+------------------------------------------------------------------------------+
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  🔍  Where do you need care?                                          |  |
|  |                                                                        |  |
|  |  Postcode: [SW99 9ZZ_______________]  Radius: [5 miles ▼]   [Search]  |  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +--------------------+  +------------------------------------------------+  |
|  | FILTERS            |  | 0 caregivers found · Within 5 miles of SW99    |  |
|  |                    |  | [DBS Verified ×] [Female ×] [Polish ×]         |  |
|  | (Filters active)   |  +------------------------------------------------+  |
|  +--------------------+  |                                                |  |
|                          |               🔍                               |  |
|                          |       No caregivers found                      |  |
|                          |                                                |  |
|                          |   No caregivers match your search criteria     |  |
|                          |                                                |  |
|                          |   Suggestions:                                 |  |
|                          |   • Try expanding your search radius          |  |
|                          |   • Adjust your hourly rate range             |  |
|                          |   • Select more availability options          |  |
|                          |   • Remove some service filters               |  |
|                          |                                                |  |
|                          |   [Notify me when caregivers become available]|  |
|                          |   [Contact support for help]                  |  |
|                          |   [View all caregivers in SW postcode area]   |  |
|                          |                                                |  |
|                          +------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
| About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact    |
| © 2026 Platform Name. All rights reserved.                                  |
+------------------------------------------------------------------------------+
```

---

#### Loading State

```
+------------------------------------------------------------------------------+
|  [LOGO]        Dashboard   Search ✓   My Bookings   Messages (2)   [USER▼] |
+------------------------------------------------------------------------------+
|                                                                              |
|  +------------------------------------------------------------------------+  |
|  |  🔍  Where do you need care?                                          |  |
|  |                                                                        |  |
|  |  Postcode: [SW1A 1AA_______________]  Radius: [10 miles ▼] [Searching]|  |
|  +------------------------------------------------------------------------+  |
|                                                                              |
|  +--------------------+  +------------------------------------------------+  |
|  | FILTERS            |  |  ⟳  Searching for caregivers near you...      |  |
|  |                    |  +------------------------------------------------+  |
|  | (Filters visible)  |  |                                                |  |
|  +--------------------+  | +-------------+  +-------------+  +----------+  |  |
|                          | | ░░░░░░░░░░  |  | ░░░░░░░░░░  |  | ░░░░░░░  |  |
|                          | | ░░░░░░░░░░  |  | ░░░░░░░░░░  |  | ░░░░░░░  |  |
|                          | | ░░░░░░░░░░  |  | ░░░░░░░░░░  |  | ░░░░░░░  |  |
|                          | +-------------+  +-------------+  +----------+  |  |
|                          |                                                |  |
|                          | +-------------+  +-------------+  +----------+  |  |
|                          | | ░░░░░░░░░░  |  | ░��░░░░░░░░  |  | ░░░░░░░  |  |
|                          | | (skeleton)  |  | (skeleton)  |  | (skel.) |  |
|                          | +-------------+  +-------------+  +----------+  |  |
|                          +------------------------------------------------+  |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

### 3.2 Mobile Wireframe (375px)

#### Default State (With Filters Collapsed)

```
+------------------------------------------+
| [☰] [LOGO]                     [USER ▼] |
+------------------------------------------+
|                                          |
| 🔍 Where do you need care?               |
| +--------------------------------------+ |
| | SW1A 1AA                             | |
| +--------------------------------------+ |
| Radius: [10 miles ▼]      [Search]      |
|                                          |
+------------------------------------------+
| 24 caregivers found                      |
| Within 10 miles of SW1A                  |
|                                          |
| [Filters (2)] [Sort: Distance ▼]        |
| [DBS Verified ×] [Morning ×]             |
+------------------------------------------+
|                                          |
| +--------------------------------------+ |
| |           [Profile Photo]            | |
| |                                      | |
| |            Sarah K.                  | |
| |          1.2 miles away              | |
| |        ✓ DBS Verified  ✓ ID          | |
| |                                      | |
| |         From £20/hour                | |
| |      ⭐⭐⭐⭐⭐ 4.8 (24)               | |
| |                                      | |
| |  "Experienced companion with a       | |
| |   warm personality..." Read more     | |
| |                                      | |
| |  🇬🇧 English, 🇵🇱 Polish             | |
| |                                      | |
| |  Available: Mon, Wed mornings        | |
| |                                      | |
| |  [View Profile]              ❤️      | |
| +--------------------------------------+ |
|                                          |
| +--------------------------------------+ |
| |           [Profile Photo]            | |
| |            Emma L.                   | |
| |          3.5 miles away              | |
| |           ... (card)                 | |
| +--------------------------------------+ |
|                                          |
| +--------------------------------------+ |
| |           [Profile Photo]            | |
| |            Maria D.                  | |
| |           ... (card)                 | |
| +--------------------------------------+ |
|                                          |
| +--------------------------------------+ |
| |           [Profile Photo]            | |
| |            James M.                  | |
| |           ... (card)                 | |
| +--------------------------------------+ |
|                                          |
|     [← Prev]  1  2  3  [Next →]         |
|                                          |
+------------------------------------------+
| About | Terms | Privacy | Contact        |
+------------------------------------------+
```

---

#### Mobile: Filters Bottom Sheet (Expanded)

```
+------------------------------------------+
| [☰] [LOGO]                     [USER ▼] |
+------------------------------------------+
| (Search results dimmed/overlaid)         |
|                                          |
| ┌────────────────────────────────────┐  |
| │ FILTERS                       [×]  │  |
| │                                    │  |
| │ ▼ Availability                     │  |
| │   Days: Mon Tue Wed Thu Fri        │  |
| │   Times: ☑ Morning ☑ Afternoon     │  |
| │                                    │  |
| │ ▼ Hourly Rate                      │  |
| │   £15 ━━●━━━━ £25                  │  |
| │                                    │  |
| │ ▼ Services                         │  |
| │   ☑ Companionship                  │  |
| │   ☑ Light housework                │  |
| │   ☐ Shopping                       │  |
| │                                    │  |
| │ ▼ Verification                     │  |
| │   ☑ DBS Verified                   │  |
| │   ☑ ID Verified                    │  |
| │                                    │  |
| │ ▼ Languages                        │  |
| │   [English ▼]                      │  |
| │                                    │  |
| │ ○ Gender                           │  |
| │   ○ Male  ○ Female  ● No preference│  |
| │                                    │  |
| │ ○ Min. Rating                      │  |
| │   ● Any  ○ 4+ stars  ○ 4.5+ stars │  |
| │                                    │  |
| │ [Apply Filters]       Clear all    │  |
| └────────────────────────────────────┘  |
+------------------------------------------+
```

---

## 4. Responsive Behavior

### 4.1 Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | 320-767px | 1-column cards, filters as bottom sheet, 6 results per page |
| Tablet | 768-1023px | 2-column cards, filters as slide-out sidebar, 12 results per page |
| Desktop | 1024px+ | 3-column cards, filters as fixed sidebar, 12 results per page |

### 4.2 Component Behavior

**Navigation Header**:
- Mobile: Hamburger menu (☰), logo centered
- Tablet: Condensed horizontal nav
- Desktop: Full horizontal nav with all links visible

**Search Bar**:
- Mobile: Full-width postcode input, radius below, search button full-width
- Tablet: Inline postcode + radius, search button right-aligned
- Desktop: Same as tablet, wider spacing

**Filters**:
- Mobile: Hidden by default, "Filters (N)" button opens bottom sheet modal
- Tablet: Slide-out sidebar (hamburger toggle), overlays content
- Desktop: Fixed sidebar, always visible (260px width)

**Caregiver Cards**:
- Mobile: 1-column, full-width, portrait orientation
- Tablet: 2-column grid, 48% width each
- Desktop: 3-column grid, 32% width each

**Pagination**:
- Mobile: Simplified "Prev | 1 2 3 | Next" (2-3 page numbers max)
- Tablet/Desktop: Full pagination with 5 page links + ellipsis

---

## 5. UI States

### 5.1 Search States

| State | Description | Visual Indication |
|-------|-------------|-------------------|
| **Empty** | User has not performed search yet | Search bar displayed, no results, suggestion to search |
| **Searching** | Query in progress | Loading spinner, "Searching for caregivers...", skeleton cards |
| **Results Found** | Caregivers match criteria | Caregiver cards displayed, result count shown, sort/filter options visible |
| **No Results** | No caregivers match criteria | Empty state icon, "No caregivers found" message, suggestions shown |
| **Filters Applied** | Filters are active | Active filter tags displayed above results, "Clear all" link visible |
| **Error** | API error or geolocation failure | Error banner: "Unable to search. Please try again.", retry button |

### 5.2 Caregiver Card States

| State | Description | Visual Indication |
|-------|-------------|-------------------|
| **Default** | Card displayed in grid | Normal styling, subtle border |
| **Hover** | Mouse over card (desktop) | Elevation shadow, slight scale increase (1.02x) |
| **Focus** | Keyboard focus on card | 3px blue border, focus outline |
| **Favorited** | User has favorited caregiver | Heart icon filled (red) |
| **Unavailable** | Caregiver fully booked | "Fully booked this week" badge, CTA changes to "Request future booking" |

### 5.3 Filter States

| State | Description | Visual Indication |
|-------|-------------|-------------------|
| **Collapsed** | Filter section not expanded (mobile) | Section header with down arrow ▼ |
| **Expanded** | Filter section expanded | Section header with up arrow ▲, options visible |
| **Active** | Filter has non-default values | Blue highlight on section header, count badge (e.g., "Availability (3)") |
| **Applying** | Filters being applied | "Apply Filters" button shows loading spinner |

### 5.4 Pagination States

| State | Description | Visual Indication |
|-------|-------------|-------------------|
| **First Page** | User on page 1 | "Previous" button disabled (grayed out) |
| **Middle Page** | User on page 2-N | Both Previous and Next buttons enabled |
| **Last Page** | User on final page | "Next" button disabled |
| **Loading Page** | New page being fetched | Loading spinner, skeleton cards replace current cards |

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

#### Perceivable
- **Text Alternatives**:
  - Profile photos: `alt="Profile photo of Sarah K."`
  - Rating stars: `aria-label="4.8 out of 5 stars, 24 reviews"`
  - Icons: All icons have text labels or ARIA labels
  - Verification badges: `aria-label="DBS verified, ID verified"`

- **Color Contrast**:
  - Body text on white: 7:1 (AAA level)
  - Button text on brand color: 4.5:1 minimum
  - Filter text: 4.5:1 minimum
  - Disabled text: 3:1 (exception for disabled elements)

- **Adaptable**:
  - Content order logical when CSS disabled
  - Responsive layout doesn't hide content
  - Text resizable up to 200% without loss of functionality

#### Operable
- **Keyboard Accessible**:
  - All filters: Tab to focus, Space to toggle checkboxes, Arrow keys for radio buttons
  - Caregiver cards: Tab to card, Enter to open profile
  - Pagination: Tab to buttons, Enter to activate
  - Filter sidebar: Collapsible sections use Enter/Space to expand/collapse
  - No keyboard traps (focus can move freely)

- **Focus Order**:
  1. Skip to main content link (hidden until focused)
  2. Logo (returns to dashboard)
  3. Main navigation links (Dashboard, Search, etc.)
  4. User profile menu
  5. Search postcode input
  6. Radius dropdown
  7. Search button
  8. Filter sidebar (if desktop) or Filters button (if mobile)
  9. Sort dropdown
  10. Caregiver card 1
  11. Caregiver card 2
  12. ... (all cards)
  13. Pagination controls
  14. Footer links

- **Focus Indicators**:
  - 3px solid blue border on focused elements (`outline: 3px solid $focus-border`)
  - Visible on all interactive elements
  - Never removed (no `outline: none` in CSS)

- **Touch Targets** (Mobile/Tablet):
  - Minimum 48x48px for all buttons, links, checkboxes
  - Card tap areas: Entire card clickable (minimum 120px height)
  - Filter checkboxes: 48px tap area (larger than visual checkbox)

#### Understandable
- **Readable**:
  - Language declared: `<html lang="en">`
  - Plain language: "No caregivers found" not "Query returned zero results"
  - Avoid jargon: "Companionship" explained in helper text
  - Clear labels: "Where do you need care?" not "Location"

- **Predictable**:
  - Navigation consistent across all screens
  - Filter interactions consistent (checkboxes for multi-select, radio for single-select)
  - Sort dropdown doesn't auto-refresh on focus (only on selection)

- **Input Assistance**:
  - All form inputs labeled
  - Placeholder text not used as primary label
  - Error messages specific: "Please enter a valid UK postcode" not "Invalid input"
  - Helper text provided: "We'll show you caregivers in your area"

#### Robust
- **Compatible**:
  - Valid HTML5 semantic markup
  - ARIA landmarks: `<main>`, `<nav>`, `<aside>` (filter sidebar), `<footer>`
  - ARIA roles where needed: `role="search"` on search form
  - ARIA live regions: `aria-live="polite"` on result count (announces updates)

### 6.2 Screen Reader Support

**Announcements**:
- Search initiated: "Searching for caregivers near SW1A 1AA, loading"
- Results loaded: "24 caregivers found within 10 miles of SW1A 1AA"
- No results: "No caregivers found matching your criteria. Try expanding your search radius or adjusting filters."
- Filters applied: "Filters applied. 12 caregivers found."
- Page changed: "Page 2 of 3 loaded"

**ARIA Labels**:
- Search form: `aria-label="Search for caregivers"`
- Filter sidebar: `aria-label="Filter search results"`
- Caregiver card: `aria-label="Sarah K., 1.2 miles away, rated 4.8 out of 5 stars"`
- Favorite button: `aria-label="Add Sarah K. to favorites"` (unfavorited) / `aria-label="Remove Sarah K. from favorites"` (favorited)

**ARIA Live Regions**:
- Result count: `<div aria-live="polite" aria-atomic="true">24 caregivers found</div>` (updates announced)
- Filter count: `aria-live="polite"` on active filter tags
- Pagination: `aria-live="polite"` on page number

### 6.3 Keyboard Shortcuts (Optional Enhancement)

| Key | Action |
|-----|--------|
| `/` | Focus search input |
| `Esc` | Clear search / Close filter sidebar (mobile) |
| `Arrow Up/Down` | Navigate between caregiver cards (when focused) |
| `Enter` | Open focused caregiver profile |

---

## 7. Navigation & Interactions

### 7.1 Entry Points

**From Dashboard** (most common):
- SCR-CR-001 → "Find a Caregiver" button → `/search`
- SCR-CR-001 → Header "Search Caregivers" link → `/search`

**From Registration**:
- SCR-AUTH-004 (Phone verification complete) → Redirect to `/search`

**From Homepage**:
- SCR-PUB-001 → "Find Care" CTA → `/search` (if logged in)

**From Other Screens**:
- Global header navigation "Search Caregivers" link on all authenticated screens

### 7.2 Exit Points

**Primary Flow** (successful search → booking):
1. Click caregiver card → SCR-CR-005 (Caregiver Profile)
2. SCR-CR-005 → "Request Booking" button → SCR-CR-006 (Booking Request Form)

**Alternative Flows**:
- "Add to Favorites" → No navigation, favorite saved, toast notification shown
- Header "Dashboard" → SCR-CR-001
- Header "My Bookings" → SCR-CR-008
- Header "Messages" → SCR-CR-012

### 7.3 User Interactions

#### Search Interaction
1. User lands on search screen
2. Postcode auto-filled from profile (editable)
3. User selects radius (default: 10 miles)
4. User clicks "Search" or presses Enter
5. Loading state: Skeleton cards, "Searching..." message
6. Results load: Caregiver cards displayed, result count shown
7. User can refine: Apply filters, change sort order
8. User can paginate: Click page numbers or Next/Previous

#### Filter Interaction
1. User opens filter sidebar (desktop: always visible, mobile: tap "Filters" button)
2. User selects/deselects filters (checkboxes, radio buttons, sliders)
3. User clicks "Apply Filters"
4. Loading state: "Applying filters..."
5. Results update: New cards displayed, active filter tags shown
6. User can clear: Click individual filter tag × or "Clear all"

#### Card Interaction
1. User hovers over card (desktop): Elevation shadow appears
2. User clicks card or "View Profile" button
3. Navigate to SCR-CR-005 (Caregiver Profile)

OR

1. User clicks "Add to Favorites" heart icon
2. Icon fills (favorited) or unfills (unfavorited)
3. Toast notification: "Sarah K. added to favorites" or "Removed from favorites"
4. API call: POST/DELETE `/api/favorites/:caregiverId`

#### Pagination Interaction
1. User scrolls to bottom of results
2. User clicks page number (e.g., "2")
3. Loading state: Skeleton cards replace current cards
4. New results load: Page 2 cards displayed
5. URL updates: `/search?page=2` (shareable link)
6. Focus moves to first card on new page (accessibility)

---

## 8. Component Reuse

### 8.1 Shared Components from Dashboard Inventory

| Component | Component ID | Usage in Search Screen |
|-----------|--------------|------------------------|
| **Navigation Header** | `NAV-HEADER-AUTH` | Identical header across all authenticated screens (Care Receiver variant) |
| **Footer** | `FOOTER-GLOBAL` | Identical footer across all screens |
| **Status Badge** | `STATUS-BADGE` | "Companionship Only" badge on cards, verification badges |
| **User Avatar** | `USER-AVATAR` | Caregiver profile photos on cards |
| **Button** | `BUTTON` | Primary ("Search", "View Profile"), Secondary ("Apply Filters"), Icon (Favorites ❤️) |
| **Empty State** | `EMPTY-STATE` | No results state |
| **Toast Notification** | `TOAST-NOTIFICATION` | "Added to favorites" success message |

**See**: `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md` for full component specs

### 8.2 New Components (Search-Specific)

| Component | Purpose | Reusability |
|-----------|---------|-------------|
| **Caregiver Card** | Display caregiver summary in grid | HIGH - Used in search results, favorites list, featured caregivers on dashboard |
| **Filter Sidebar** | Search refinement controls | MEDIUM - Used in search, possibly in admin screens for filtering lists |
| **Dual-Range Slider** | Hourly rate filter | MEDIUM - Reusable for any range filter (e.g., distance, date range) |
| **Pagination Controls** | Navigate multi-page results | HIGH - Reusable in admin screens, booking lists, message inbox |

---

## 9. Design Notes

### 9.1 Design Principles

**Elderly-Friendly**:
- Large text: 18px minimum body, 24px+ headings
- High contrast: Black text on white backgrounds, blue links
- Clear CTAs: Large buttons (min 48px height), descriptive labels
- Simple language: "Find caregivers" not "Execute query"
- Generous spacing: 16px minimum padding, 24px between sections

**Trust-Building**:
- Verification badges prominently displayed (DBS, ID verified)
- Clear pricing: "From £20/hour" + tooltip explaining platform fee
- Transparent distance: "1.2 miles away" from user's location
- Real reviews: Star ratings and review count visible
- Profile photos: Humanize caregivers, build connection

**Performance**:
- Search response < 1 second (95th percentile)
- Lazy load profile photos (IntersectionObserver API)
- Skeleton cards during loading (better perceived performance than spinners)
- Client-side sorting where possible (no API call needed)

### 9.2 Placeholder Content

**Commission Rate**: 15% placeholder used throughout (pending FDR-008 decision)
- Filter helper text: "Platform adds **15%** service fee to your total"
- [PLACEHOLDER: Subject to FDR-008 final decision]

### 9.3 Future Enhancements (Not in R0)

**Deferred Features**:
- Map view toggle (show caregivers on map with pins)
- Save search functionality (save filter criteria, get alerts)
- Advanced filters: Care skills (Tier 2), medical conditions (Tier 3)
- Personalized recommendations (requires booking history data)
- Instant booking (requires caregiver opt-in, real-time availability sync)

**Rationale**: Focus on core search functionality for R0. Add enhancements based on user feedback and usage analytics.

### 9.4 Analytics & Tracking

**Events to Track**:
- Search performed (postcode, radius, filters applied)
- No results searches (flag coverage gaps)
- Filter usage (which filters most commonly used)
- Sort usage (how users prefer to sort)
- Card clicks (search-to-profile conversion)
- Favorite actions (which caregivers favorited most)
- Pagination usage (how many pages users browse)

**Metrics**:
- Search success rate (% searches returning ≥1 result)
- Average search-to-profile time (how quickly users find a caregiver)
- Search-to-booking request conversion rate
- Filter abandonment rate (users who apply filters then clear them)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-08 | UX/UI Design Team | Initial wireframes for SCR-CR-003 (Caregiver Search) |

---

## Cross-References

**Source Documents**:
- Search Specification: `/docs/product/features/tier1-search-specification.md` (Sections 3-4)
- Screen Inventory: `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` (Lines 517-580)
- Route Map: `/docs/product/tier1-route-map.md` (SCR-CR-003 definition)
- User Flow: `/docs/tiers/tier1/draft-design-specs/user-flows/care-receiver-first-booking.md` (Step 8-10)
- Shared Components: `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md`

**Related Screens**:
- SCR-CR-001 (Care Receiver Dashboard) - Entry point
- SCR-CR-005 (Caregiver Profile) - Exit point (view profile)
- SCR-CR-006 (Booking Request Form) - Exit point (request booking)

---

**END OF DOCUMENT**
