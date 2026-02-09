# Search & Discovery Wireframes

**Category**: Search & Discovery
**Screen Count**: 2 screens (R0 scope)
**Status**: READY FOR FIGMA HANDOFF
**Created**: 2026-02-08

---

## Overview

This directory contains ASCII wireframes and element inventories for the **Search & Discovery** screens in Tier 1 (R0 launch scope). These screens enable care receivers to find and evaluate caregivers before requesting bookings.

**Strategic Importance**: Search & Discovery is the **primary conversion funnel** from visitor to booking request. Trust is established or lost based on caregiver profile quality, transparency, and clarity.

---

## Screens in This Category

| Screen ID | Screen Name | Route | Priority | Status |
|-----------|-------------|-------|----------|--------|
| **SCR-CR-003** | Caregiver Search | `/search` | R0 (Launch-critical) | READY |
| **SCR-CR-005** | Caregiver Profile (Public View) | `/caregivers/:caregiverId` | R0 (Trust-critical) | READY |

---

## Document Index

### 1. SCR-CR-003: Caregiver Search
**File**: `scr-cr-003-caregiver-search.md`

**Purpose**: Primary discovery mechanism for care receivers to find caregivers by location, filters, and sort options.

**Key Features**:
- Location-based search (postcode + radius: 5-30 miles)
- Comprehensive filters: Availability, hourly rate, services, verification, languages, gender, rating
- Caregiver result cards (3-column desktop, 1-column mobile)
- Pagination (12 results per page desktop, 6 mobile)
- Empty state, loading state, error state
- "Add to Favorites" functionality
- Direct "Request Booking" CTA on cards

**Wireframes**:
- Desktop: Results found, no results, loading states
- Mobile: Responsive card layout, filter bottom sheet

**Component Reuse**:
- `NAV-HEADER-AUTH` (global navigation)
- `FOOTER-GLOBAL` (footer)
- `STATUS-BADGE` (verification badges, service type badges)
- `BUTTON` (primary, secondary, icon buttons)
- `EMPTY-STATE` (no results)
- `TOAST-NOTIFICATION` (favorite confirmations)

**New Components**:
- **Caregiver Card** (HIGH reusability - used in search, favorites, dashboard)
- **Filter Sidebar** (MEDIUM reusability)
- **Dual-Range Slider** (MEDIUM reusability - hourly rate filter)
- **Pagination Controls** (HIGH reusability - admin screens, booking lists)

**Entry Points**:
- SCR-CR-001 (Care Receiver Dashboard) → "Find a Caregiver" button
- SCR-AUTH-004 (Phone Verification) → Verification complete
- Header navigation "Search Caregivers" (all authenticated screens)

**Exit Points**:
- Click caregiver card → SCR-CR-005 (Caregiver Profile)
- "Request Booking" on card → SCR-CR-006 (Booking Request Form)

---

### 2. SCR-CR-005: Caregiver Profile (Public View)
**File**: `scr-cr-005-caregiver-profile.md`

**Purpose**: Detailed caregiver profile for trust-building and informed decision-making before booking request.

**Key Features**:
- Profile header: Large photo, name, location, distance, verification badges, rating, hourly rate
- About Me section: Bio, experience, languages, interests, transportation
- Services Offered: Checkmarks for companionship services (Tier 1 only)
- Availability Calendar: Visual calendar (next 30 days), clickable dates/times
- Reviews & Ratings: Average rating, rating distribution, individual reviews with caregiver responses
- Verification Details: DBS, ID, Right to Work status with dates
- Prominent "Request Booking" CTA (top-right + bottom + sticky on mobile)

**Wireframes**:
- Desktop: Default state (DBS verified), new caregiver (no reviews), fully booked state
- Mobile: Responsive 1-column layout, sticky bottom CTA

**Component Reuse**:
- `NAV-HEADER-AUTH`, `FOOTER-GLOBAL`, `STATUS-BADGE`, `USER-AVATAR`, `BUTTON`, `TOAST-NOTIFICATION`

**New Components**:
- **Profile Header** (MEDIUM reusability - admin user detail views)
- **Availability Calendar** (HIGH reusability - caregiver's own availability screen)
- **Review Card** (HIGH reusability - caregiver/care receiver dashboards)
- **Rating Distribution Chart** (MEDIUM reusability - admin analytics)
- **Verification Detail List** (MEDIUM reusability - admin verification screens)

**Entry Points**:
- SCR-CR-003 (Search Results) → Click caregiver card (PRIMARY)
- SCR-CR-001 (Dashboard) → Featured caregivers
- SCR-CR-008 (Booking Detail) → "View Caregiver Profile"
- Direct link (SEO, shareable)

**Exit Points**:
- "Request Booking" → SCR-CR-006 (Booking Request Form) - **PRIMARY CONVERSION GOAL**
- "Back to Search" → SCR-CR-003
- "Add to Favorites" → No navigation (saves favorite)
- "Share Profile" → No navigation (copies link)

---

## Design Strategy: Search-First Approach

### Why Search & Discovery is Critical for R0

1. **Primary Conversion Funnel**:
   - Homepage → Registration → **Search** → Profile → Booking Request
   - Search is the first touchpoint where users evaluate platform value

2. **Trust Establishment**:
   - Verification badges, reviews, transparent pricing build trust
   - Quality of caregiver profiles determines conversion rate

3. **User Retention**:
   - Good search experience = repeat usage
   - Poor search experience (no results, confusing filters) = churn

4. **Supply/Demand Validation**:
   - Search results reveal coverage gaps (no caregivers in certain postcodes)
   - Analytics inform caregiver recruitment strategy

### Design Principles Applied

**Elderly-Friendly**:
- Large text (18px+ body, 24px+ headings)
- High contrast (black text on white, blue links)
- Clear CTAs (48px+ touch targets, descriptive labels)
- Simple language ("Find caregivers" not "Execute query")

**Trust-Building**:
- Verification badges prominently displayed
- Transparent pricing (hourly rate + platform fee explanation)
- Real reviews (no fake testimonials)
- Profile photos (humanize caregivers)

**Performance**:
- Search response < 1 second target
- Lazy load profile photos
- Skeleton cards during loading (better perceived performance)
- Client-side sorting where possible

---

## Accessibility Compliance (WCAG 2.1 AA)

### Perceivable
- All images have alt text
- Color contrast ≥ 4.5:1 (text), ≥ 3:1 (UI components)
- Content adaptable (responsive, works without CSS)
- Text resizable up to 200%

### Operable
- All functionality keyboard accessible (Tab, Enter, Space, Arrow keys)
- Logical focus order (search bar → filters → results → pagination)
- 3px blue focus indicators (never removed)
- Touch targets ≥ 48x48px (mobile/tablet)
- No keyboard traps

### Understandable
- Plain language (no jargon)
- Consistent navigation (same header across screens)
- Clear error messages ("Please enter a valid UK postcode" not "Invalid input")
- Helper text provided (tooltips, field hints)

### Robust
- Valid HTML5 semantic markup
- ARIA landmarks (`<main>`, `<nav>`, `<aside>`, `<footer>`)
- ARIA labels for screen readers
- ARIA live regions for dynamic updates (result count, filter tags)

**Screen Reader Support**:
- Search initiated: "Searching for caregivers near SW1A 1AA, loading"
- Results loaded: "24 caregivers found within 10 miles of SW1A 1AA"
- No results: "No caregivers found. Try expanding your search radius or adjusting filters."
- Profile loaded: "Sarah K.'s profile loaded. DBS verified, ID verified. Rated 4.8 out of 5 stars."

---

## Component Inventory Summary

### Shared Components (from Dashboard Inventory)
- Navigation Header (`NAV-HEADER-AUTH`)
- Footer (`FOOTER-GLOBAL`)
- Status Badge (`STATUS-BADGE`)
- User Avatar (`USER-AVATAR`)
- Button (`BUTTON`)
- Empty State (`EMPTY-STATE`)
- Toast Notification (`TOAST-NOTIFICATION`)

### New Components (Search-Specific)
1. **Caregiver Card** - HIGH reusability (search, favorites, dashboard featured caregivers)
2. **Availability Calendar** - HIGH reusability (caregiver availability management)
3. **Review Card** - HIGH reusability (dashboards, admin screens)
4. **Pagination Controls** - HIGH reusability (admin screens, booking lists, message inbox)
5. **Filter Sidebar** - MEDIUM reusability (admin filtering)
6. **Dual-Range Slider** - MEDIUM reusability (any range filter)
7. **Rating Distribution Chart** - MEDIUM reusability (admin analytics)

**See**: `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md` for full component specs

---

## Responsive Breakpoints

| Breakpoint | Width | Search Layout | Profile Layout |
|------------|-------|---------------|----------------|
| Mobile | 320-767px | 1-column cards, filter bottom sheet, 6 results/page | 1-column, sticky bottom CTA, 200px photo |
| Tablet | 768-1023px | 2-column cards, filter sidebar, 12 results/page | 2-column header, 250px photo |
| Desktop | 1024px+ | 3-column cards, fixed filter sidebar, 12 results/page | 2-column header, 400px photo |

---

## User Flows Involving These Screens

### Primary Flow: Care Receiver First Booking
**Source**: `/docs/tiers/tier1/draft-design-specs/user-flows/care-receiver-first-booking.md`

1. SCR-AUTH-004 (Phone Verification) → Verification complete
2. **SCR-CR-003 (Search)** → User enters postcode, applies filters, views results
3. **SCR-CR-005 (Profile)** → User clicks caregiver card, reviews profile
4. SCR-CR-006 (Booking Request) → User clicks "Request Booking"
5. ... (booking flow continues)

**Key Steps**:
- **Step 8** (Flow doc): Search interaction - postcode entry, filter selection, result browsing
- **Step 10** (Flow doc): Click "View Profile" on caregiver card
- **Step 11** (Flow doc): Review caregiver profile (bio, services, availability, reviews)
- **Step 12** (Flow doc): Click "Request Booking" (conversion point)

---

## Analytics & Tracking

### Search Screen (SCR-CR-003)
**Events to Track**:
- Search performed (postcode, radius, filters applied)
- No results searches (flag coverage gaps by postcode)
- Filter usage (which filters most commonly used)
- Sort usage (distance vs rating vs price)
- Card clicks (search-to-profile conversion)
- "Add to Favorites" clicks
- Pagination usage (how many pages users browse)

**Metrics**:
- Search success rate (% searches returning ≥1 result)
- Average search-to-profile time (how quickly users find a caregiver)
- Search-to-booking request conversion rate (primary KPI)
- Filter abandonment rate (users who apply filters then clear them)

### Profile Screen (SCR-CR-005)
**Events to Track**:
- Profile viewed (from where: search, dashboard, direct link)
- Sections scrolled to (About, Services, Availability, Reviews, Verification)
- Calendar date clicked (engagement with availability)
- Time slot selected (strong intent signal)
- "Request Booking" clicked (conversion)
- "Add to Favorites" clicked
- "Share Profile" clicked (viral potential)
- "Back to Search" clicked (bounced or continuing search)
- "Show more reviews" clicked

**Metrics**:
- Profile-to-booking request conversion rate (PRIMARY KPI)
- Average time on profile page (engagement)
- Scroll depth (how far users read)
- Favorite rate (% of profile views that favorite)
- Share rate (% of profile views that share)
- Review engagement (% who read reviews, % who expand "Show more")

---

## Compliance & Data Privacy

### GDPR Data Display (Profile Screen)
**Privacy Protection**:
- **Name**: First name + last initial only ("Sarah K."). Full last name revealed after booking accepted.
- **Location**: Postcode district only ("SW1A area"). Full postcode NOT shown.
- **Reviewer Names**: Anonymized ("Margaret S."). Full names not shown.
- **Contact Info**: Phone number NOT shown on public profile. Shared after booking accepted.

**Rationale**: Data minimization (GDPR Article 5), safety (prevent off-platform contact before booking accepted).

### Care Act 2014 Safeguarding
- Verification transparency: All verification statuses clearly displayed
- DBS status: Clearly marked if verified OR if not submitted (no misleading claims)
- Helper text: "DBS checks are voluntary for companionship services"
- Reviews moderated: Admin removes inappropriate content
- "Report Concern" button available in header (all authenticated screens)

---

## Known Gaps & Future Work

### Product Gaps (Flagged)
None - All requirements documented in:
- `/docs/product/features/tier1-search-specification.md` (Sections 3-5)
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` (Lines 517-643)

### Deferred Features (Not in R0)
**Search Screen**:
- Map view toggle (show caregivers on map with pins) - Tier 2
- Save search functionality (save filter criteria, get alerts) - Tier 2
- Advanced filters: Care skills (Tier 2), medical conditions (Tier 3)
- Personalized recommendations (requires booking history data) - Tier 2
- Instant booking (requires real-time availability sync) - Tier 2

**Profile Screen**:
- Video introduction (caregiver uploads 30-60 second intro video) - Tier 2
- Instant messaging (live chat with caregiver before booking) - Tier 2
- Background check expiry alerts - Tier 2
- "About to become available" waitlist - Tier 2
- Compare caregivers (side-by-side comparison) - Tier 2
- Calendar integration (export available slots to Google Calendar) - Tier 2

**Rationale**: Focus on core search/profile functionality for R0. Add enhancements based on user feedback and usage analytics.

---

## Quality Assurance Checklist

### Before Figma Handoff
- [x] All elements mapped to documented requirements
- [x] Content hierarchy clear
- [x] Navigation paths logical
- [x] All screen states defined (default, loading, error, empty, no results)
- [x] Entry/exit points documented
- [x] Component reuse identified
- [x] WCAG 2.1 AA compliance verified
- [x] Touch targets ≥ 48px (mobile)
- [x] Font sizes ≥ 16px body, ≥ 20px primary actions
- [x] Contrast ratios verified (4.5:1 text, 3:1 UI)
- [x] Focus order specified
- [x] Responsive rules defined
- [x] Design tokens referenced (from `/packages/ICare/app/styles/_tokens.scss`)

---

## Next Steps

### For Human Designer (Figma Phase 1-2)
1. **Create low-fidelity mockups** for Search & Profile screens using wireframes as blueprint
2. **Design caregiver card component** (most complex, most reused)
3. **Establish design tokens** from existing SCSS tokens file
4. **Create component library**: Caregiver Card, Filter Sidebar, Availability Calendar, Review Card, Pagination
5. **Validate responsive behavior** at 3 breakpoints (mobile, tablet, desktop)
6. **Document component variants** (DBS verified vs not, new caregiver, fully booked, etc.)

### For Engineering
1. **Read wireframes** to understand UI structure and data flow
2. **Reference component specs** in shared components doc
3. **Implement search API** with filtering, sorting, pagination
4. **Implement profile API** with reviews, availability, verification status
5. **Build responsive layouts** matching wireframes
6. **Add analytics tracking** for search and profile events
7. **QA accessibility** (keyboard navigation, screen reader, WCAG 2.1 AA)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-08 | UX/UI Design Team | Initial README for Search & Discovery wireframes category |

---

## Cross-References

**Source Documents**:
- Search Specification: `/docs/product/features/tier1-search-specification.md`
- Screen Inventory: `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` (Lines 517-643)
- Route Map: `/docs/product/tier1-route-map.md` (SCR-CR-003, SCR-CR-005)
- User Flow: `/docs/tiers/tier1/draft-design-specs/user-flows/care-receiver-first-booking.md` (Steps 8-12)
- Dashboard Components: `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md`
- Compliance: `/docs/tiers/tier1/compliance.md` (GDPR data display rules)
- Figma Production Plan: `/docs/tiers/tier1/FIGMA_PRODUCTION_PLAN.md` (Dashboard-first strategy)

**Related Wireframe Categories**:
- Dashboards: `/docs/tiers/tier1/draft-design-specs/wireframes/dashboards/`
- Auth: `/docs/tiers/tier1/draft-design-specs/wireframes/auth/`

---

**END OF DOCUMENT**
