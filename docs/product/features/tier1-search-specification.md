# Tier 1 Search and Discovery Feature Specification

**Document Purpose**: Comprehensive specification for the Tier 1 (Companionship Only) search and discovery system for the UK elderly care marketplace.

**Document Owner**: Product Manager
**Created**: 2026-02-06
**Last Updated**: 2026-02-06
**Status**: APPROVED
**Tier**: Tier 1 (Companionship Only)

---

## Document Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Product Manager | Initial specification for Tier 1 search and discovery |

---

## Table of Contents

1. [Overview](#1-overview)
2. [User Stories](#2-user-stories)
3. [Search Criteria](#3-search-criteria)
4. [Search Results](#4-search-results)
5. [Caregiver Profiles](#5-caregiver-profiles)
6. [Matching Algorithm](#6-matching-algorithm)
7. [Availability System](#7-availability-system)
8. [Geographic Scope](#8-geographic-scope)
9. [Performance Requirements](#9-performance-requirements)
10. [Accessibility](#10-accessibility)
11. [Data Requirements](#11-data-requirements)
12. [Edge Cases](#12-edge-cases)
13. [Acceptance Criteria](#13-acceptance-criteria)
14. [Out of Scope](#14-out-of-scope)

---

## 1. Overview

### 1.1 Purpose

The Tier 1 search and discovery system enables care receivers and their family members to find suitable caregivers for companionship-only services. This is the primary discovery mechanism for the marketplace and represents the first critical step in the user journey from need to booking.

### 1.2 Tier 1 Scope and Constraints

**Services Enabled at Tier 1**:
- Companionship (conversation, activities, social support)
- Light housework and cleaning
- Shopping and errands (accompanied shopping)
- Meal preparation (NO feeding assistance)
- Transportation (if caregiver has vehicle)

**Services NOT Available at Tier 1**:
- Personal care (washing, dressing, toileting) - Tier 2
- Medication assistance - Tier 2
- Medical condition-specific matching - Tier 3
- Live-in care - Tier 3
- Care skills-based filtering - Tier 2
- Condition experience-based filtering - Tier 3

**Data Constraints at Tier 1**:
- Standard personal data only (name, location, contact info, generic preferences)
- NO special category health data
- NO medical condition profiles
- NO care skill requirements
- NO health-inferring data collection

**Verification at Tier 1**:
- ID verification: MANDATORY
- Right to work verification: MANDATORY
- Phone verification: MANDATORY
- DBS checks: VOLUNTARY (companionship is not a regulated activity)
- Qualification verification: NOT REQUIRED
- Insurance verification: NOT REQUIRED

**See**: [Tiered Market Entry Roadmap](/docs/ROADMAP.md) for complete tier definitions and progression gates.

### 1.3 User Roles

- **Primary Users**: Care receivers (age 65+) and family members acting as proxies
- **Secondary Users**: Caregivers (visibility management)
- **Admin Users**: Platform administrators (search quality monitoring)

### 1.4 Strategic Importance

Search and discovery is critical because:
- First touchpoint where care receivers evaluate platform value
- Primary conversion funnel from visitor to booking request
- Trust is established or lost based on caregiver quality and transparency
- Digital literacy varies significantly among elderly users (must accommodate low-tech users)
- Family members often search on behalf of care receivers (proxy usage pattern)

---

## 2. User Stories

### 2.1 Care Receiver Discovery

**User Story 1: Location-Based Search**
- **As a** care receiver or family member
- **I want** to search for caregivers near my location
- **So that** I can find caregivers within a convenient travel radius

**Acceptance Criteria**:
- [ ] User can enter postcode and select radius (5, 10, 15, 20, 30 miles)
- [ ] Results show caregivers within selected radius
- [ ] Distance from care receiver location displayed for each caregiver
- [ ] Results sorted by distance (nearest first) by default

---

**User Story 2: Availability Filtering**
- **As a** care receiver or family member
- **I want** to filter caregivers by when they are available
- **So that** I only see caregivers who can help when I need them

**Acceptance Criteria**:
- [ ] User can select preferred days of week (Mon-Sun, multi-select)
- [ ] User can select preferred time of day (morning/afternoon/evening)
- [ ] System shows only caregivers with matching availability
- [ ] "No availability match" message shown if no caregivers available

---

**User Story 3: Rate Range Filtering**
- **As a** care receiver or family member
- **I want** to filter caregivers by hourly rate
- **So that** I only see caregivers within my budget

**Acceptance Criteria**:
- [ ] User can set minimum and maximum hourly rate (slider or input)
- [ ] Results update dynamically as rate range changes
- [ ] Platform fee transparency displayed (rate shown is caregiver rate, total cost calculated at booking)
- [ ] Default range: 10-40 GBP/hour

---

**User Story 4: Service Type Filtering**
- **As a** care receiver or family member
- **I want** to filter by specific companionship services
- **So that** I find caregivers who offer the specific help I need

**Acceptance Criteria**:
- [ ] User can filter by service type: companionship, light housework, shopping/errands, meal preparation, transportation
- [ ] Multi-select supported (caregiver must offer ALL selected services)
- [ ] Clear labeling: "Companionship Only" badge visible
- [ ] No personal care services shown in Tier 1

---

**User Story 5: Verification Status Filtering**
- **As a** care receiver or family member
- **I want** to filter by caregiver verification status
- **So that** I can choose the level of verification I'm comfortable with

**Acceptance Criteria**:
- [ ] User can filter by "DBS Verified" (voluntary at Tier 1)
- [ ] User can filter by "ID Verified" (mandatory, all caregivers)
- [ ] User can filter by "Right to Work Verified" (mandatory, all caregivers)
- [ ] Verification badges clearly displayed on results
- [ ] Explanation tooltip: "DBS is voluntary for companionship services"

---

**User Story 6: Language Filtering**
- **As a** care receiver or family member
- **I want** to filter by languages spoken
- **So that** I can communicate effectively with my caregiver

**Acceptance Criteria**:
- [ ] User can select one or more languages from dropdown
- [ ] Common UK languages listed: English, Polish, Romanian, Urdu, Bengali, Punjabi, Welsh, Other
- [ ] Caregiver must speak ALL selected languages to appear in results

---

**User Story 7: Gender Preference**
- **As a** care receiver or family member
- **I want** to optionally filter by caregiver gender
- **So that** I can address personal comfort preferences

**Acceptance Criteria**:
- [ ] Optional filter: Male, Female, No Preference (default: No Preference)
- [ ] Filter labeled as "personal preference" not requirement
- [ ] Equality Act 2010 compliance note: "Gender preference is a personal comfort choice, not discrimination"
- [ ] No requirement to justify preference

---

**User Story 8: Caregiver Profile Review**
- **As a** care receiver or family member
- **I want** to view detailed caregiver profiles from search results
- **So that** I can evaluate if they are a good match before requesting a booking

**Acceptance Criteria**:
- [ ] Click caregiver card in search results to open full profile
- [ ] Profile shows: photo, bio, experience, services, availability, rate, reviews, verification badges
- [ ] Clear call-to-action: "Request Booking" button
- [ ] Back to search results navigation

---

**User Story 9: Save Favorite Caregivers**
- **As a** care receiver or family member
- **I want** to save caregivers I like
- **So that** I can easily find them again later

**Acceptance Criteria**:
- [ ] "Add to Favorites" button on caregiver profile
- [ ] Favorite status persists across sessions
- [ ] View all favorited caregivers from dashboard
- [ ] Remove from favorites option

---

**User Story 10: No Results Guidance**
- **As a** care receiver or family member
- **I want** helpful guidance when no caregivers match my search
- **So that** I know what to do next

**Acceptance Criteria**:
- [ ] Clear message: "No caregivers found matching your criteria"
- [ ] Suggestions: Expand radius, adjust rate range, change availability
- [ ] Option to "Notify me when caregivers become available"
- [ ] Contact support option

---

### 2.2 Caregiver Visibility Management

**User Story 11: Caregiver Profile Visibility**
- **As a** caregiver
- **I want** my profile to appear in relevant searches
- **So that** I can receive booking requests

**Acceptance Criteria**:
- [ ] Profile visible in search after admin verification approval
- [ ] Profile appears when search criteria match caregiver attributes (location, availability, services, rate)
- [ ] Profile hidden if verification expires
- [ ] Profile hidden if caregiver deactivates account

---

**User Story 12: Availability Management**
- **As a** caregiver
- **I want** to manage when I appear as available in search
- **So that** I only receive booking requests when I can work

**Acceptance Criteria**:
- [ ] Caregiver can set recurring weekly availability (e.g., Mon-Fri 9am-5pm)
- [ ] Caregiver can add one-off availability dates
- [ ] Caregiver can block unavailable dates (holidays, appointments)
- [ ] Availability calendar syncs with search results in real-time
- [ ] Accepted bookings automatically block time slots

---

### 2.3 Admin Search Quality Monitoring

**User Story 13: Search Analytics**
- **As an** admin
- **I want** to monitor search behavior and quality
- **So that** I can identify and fix poor search experiences

**Acceptance Criteria**:
- [ ] Track search queries (location, filters used)
- [ ] Track "no results" searches (identify coverage gaps)
- [ ] Track search-to-profile-view conversion
- [ ] Track profile-view-to-booking-request conversion
- [ ] Dashboard showing top search locations and common filters

---

## 3. Search Criteria

### 3.1 Primary Search Parameters

#### 3.1.1 Location (MANDATORY)

**Input**: Postcode
**Validation**:
- UK postcode format (e.g., SW1A 1AA)
- Postcode must exist (validated against Royal Mail database or Google Maps Geocoding API)
- Error message: "Please enter a valid UK postcode"

**Radius Selection**:
- Options: 5, 10, 15, 20, 30 miles
- Default: 10 miles
- UI: Dropdown or segmented control
- Mobile: Touch-friendly selector

**Geographic Calculation**:
- Convert postcode to latitude/longitude (Google Maps Geocoding API)
- Calculate distance using Haversine formula
- Store caregiver location as lat/long in database (indexed for performance)
- Results include only caregivers within selected radius

---

#### 3.1.2 Availability (OPTIONAL)

**Day of Week**:
- Multi-select checkboxes: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
- Default: All days selected
- Logic: Caregiver must have availability on ANY selected day

**Time of Day**:
- Options: Morning (6am-12pm), Afternoon (12pm-6pm), Evening (6pm-10pm), Overnight (10pm-6am)
- Multi-select
- Default: All times selected
- Logic: Caregiver must have availability during ANY selected time period

**Implementation**:
- Caregiver availability stored in weekly recurring pattern
- Query checks if caregiver has at least one available slot matching day + time criteria
- Exclude caregivers with no matching availability

---

#### 3.1.3 Hourly Rate Range (OPTIONAL)

**Input**: Minimum and maximum hourly rate (GBP)
**Default Range**: 10-40 GBP/hour
**UI Component**: Dual-handle slider or two input fields
**Validation**:
- Minimum rate >= 10 GBP (platform minimum, National Living Wage compliance)
- Maximum rate <= 100 GBP (platform maximum)
- Minimum cannot exceed maximum

**Display**:
- Rate shown is caregiver's take-home rate
- Tooltip: "Platform adds 15% service fee to your total. Caregiver pays 10-15% commission."
- Total cost calculated at booking stage

---

### 3.2 Service Type Filters (OPTIONAL)

**Available Service Types** (Tier 1):
- [ ] Companionship (conversation, activities, social support)
- [ ] Light housework (cleaning, tidying, laundry)
- [ ] Shopping and errands (accompanied shopping, post office)
- [ ] Meal preparation (cooking, but NO feeding assistance)
- [ ] Transportation (requires caregiver has vehicle and valid insurance)

**Logic**: AND filter (caregiver must offer ALL selected services)
**Default**: All service types selected (show all caregivers)
**UI**: Multi-select checkboxes

**Tier 1 Exclusions** (NOT shown in Tier 1 search):
- Personal care (washing, dressing, toileting) - Tier 2
- Medication assistance - Tier 2
- Mobility assistance - Tier 2
- Live-in care - Tier 3
- Overnight care - Tier 2
- Dementia support - Tier 3
- End-of-life support - Tier 3

---

### 3.3 Verification Status Filters (OPTIONAL)

**Available Verification Filters**:
- [ ] DBS Verified (voluntary at Tier 1)
- [ ] ID Verified (all caregivers, automatically filtered out non-verified)
- [ ] Right to Work Verified (all caregivers, automatically filtered out non-verified)
- [ ] Phone Verified (all caregivers, automatically filtered out non-verified)

**Default**: Show all caregivers with mandatory verifications (ID, right to work, phone)
**DBS Filter**: When enabled, show only caregivers with voluntary DBS submission and admin verification

**Verification Badge Display**:
- Green checkmark icon + "Verified" text
- "DBS Verified" badge (prominent, if voluntary DBS submitted)
- "ID Verified" badge (all caregivers)
- Tooltip on hover: Explains verification type and date verified

---

### 3.4 Additional Filters (OPTIONAL)

#### 3.4.1 Languages Spoken

**Options**:
- English (default, all caregivers)
- Polish, Romanian, Urdu, Bengali, Punjabi, Spanish, Italian, Portuguese, Welsh, Other

**Logic**: AND filter (caregiver must speak ALL selected languages)
**Default**: English only
**UI**: Multi-select dropdown

#### 3.4.2 Gender Preference

**Options**: Male, Female, No Preference
**Default**: No Preference
**Logic**: Filter by caregiver's self-declared gender
**Equality Act Note**: Displayed as "personal comfort preference" not discriminatory filter

#### 3.4.3 Minimum Rating

**Options**: Any rating, 4+ stars, 4.5+ stars
**Default**: Any rating
**Logic**: Filter caregivers by average review rating
**Note**: New caregivers with no reviews shown regardless of filter (marked "New Caregiver")

---

### 3.5 Search Query Structure (Technical)

**Example Search Query Parameters**:
```json
{
  "postcode": "SW1A1AA",
  "radius_miles": 10,
  "days": ["monday", "wednesday", "friday"],
  "times": ["morning", "afternoon"],
  "rate_min": 15,
  "rate_max": 25,
  "services": ["companionship", "light_housework"],
  "dbs_verified": true,
  "languages": ["english", "polish"],
  "gender": "female",
  "min_rating": 4.0
}
```

**Database Query Logic**:
1. Geocode postcode to lat/long
2. Calculate distance for all caregivers (Haversine formula)
3. Filter by radius
4. Filter by availability (day + time match)
5. Filter by rate range
6. Filter by services offered (caregiver offers ALL selected)
7. Filter by verification status
8. Filter by languages spoken
9. Filter by gender preference
10. Filter by minimum rating (if >0 reviews)
11. Sort by distance (default) or rating
12. Return results with pagination

---

## 4. Search Results

### 4.1 Results Display Layout

**Layout Type**: Card grid (desktop: 3 columns, tablet: 2 columns, mobile: 1 column)

**Alternative View**: List view (toggle option)
- Card view: More visual, shows photo prominently
- List view: Denser, shows more results per screen

**Default**: Card view (user preference persisted in session)

---

### 4.2 Caregiver Card Components

**Each caregiver card displays**:

1. **Profile Photo**:
   - Square or circular thumbnail (200x200px min)
   - Default placeholder if no photo uploaded
   - Professional photo guidelines encouraged

2. **Name**:
   - First name + last initial (e.g., "Sarah M.")
   - Full name revealed after booking request sent

3. **Distance**:
   - "1.2 miles away" (rounded to 1 decimal)
   - Calculated from care receiver's search postcode

4. **Verification Badges**:
   - "DBS Verified" (if voluntary DBS submitted)
   - "ID Verified" (all caregivers)
   - Visual: Green checkmark icons

5. **Service Type Badge**:
   - "Companionship Only" (Tier 1)
   - Color: Blue background, white text

6. **Hourly Rate**:
   - "From 20 GBP/hour"
   - Caregiver's take-home rate (before platform commission)
   - Tooltip: "Platform adds 15% service fee to total"

7. **Average Rating**:
   - Star rating (1-5 stars, half-stars supported)
   - Review count (e.g., "4.8 stars (24 reviews)")
   - "New Caregiver" badge if no reviews yet

8. **Bio Excerpt**:
   - First 100 characters of bio
   - "Read more..." link to full profile

9. **Languages Spoken**:
   - Icons or text labels (e.g., "English, Polish")
   - Max 3 shown, "+ 2 more" if additional

10. **Call-to-Action Button**:
    - "View Profile" (primary button)
    - "Add to Favorites" (heart icon, secondary action)

**Card Interaction**:
- Entire card clickable (opens full profile)
- Favorite icon independent click zone
- Hover state: Subtle elevation/shadow

---

### 4.3 Search Results Header

**Components**:
1. **Result Count**: "12 caregivers found"
2. **Search Summary**: "Within 10 miles of SW1A 1AA"
3. **Filter Tags**: Active filters shown as dismissible tags (e.g., "DBS Verified [x]", "Morning availability [x]")
4. **Sort Options**: Dropdown with:
   - Distance (nearest first) - DEFAULT
   - Rating (highest first)
   - Price (lowest first)
   - Price (highest first)
   - Newest caregivers first
5. **View Toggle**: Card view vs List view icon buttons

**Mobile Optimization**:
- Filter button (bottom sheet or slide-out panel)
- Sort dropdown prominent
- Result count and search summary stacked

---

### 4.4 Pagination

**Pagination Strategy**: Limit-offset pagination (simple, sufficient for Tier 1 volumes)

**Page Size**:
- Desktop: 12 results per page
- Mobile: 6 results per page (faster load, less scrolling)

**Pagination Controls**:
- Previous/Next buttons
- Page number links (show 5 pages max, with ellipsis)
- "Go to page" input (for large result sets)

**Performance**:
- Cache search results for 5 minutes (reduce database load)
- Lazy load caregiver profile photos (IntersectionObserver API)

**Alternative** (future enhancement): Infinite scroll (better mobile UX)

---

### 4.5 No Results State

**Message**: "No caregivers found matching your criteria"

**Helpful Suggestions**:
1. "Try expanding your search radius"
2. "Adjust your hourly rate range"
3. "Select more availability options"
4. "Remove some service type filters"

**Alternative Actions**:
- "Notify me when caregivers become available" (email alert signup)
- "Contact support for help finding caregivers" (link to support chat)
- "View all caregivers in [postcode area]" (remove filters, expand radius)

**Data Collection**: Log "no results" searches for admin review (identify coverage gaps)

---

### 4.6 Loading States

**Initial Search**:
- Skeleton screens (card placeholders with loading animation)
- "Searching for caregivers near you..." message

**Filter Changes**:
- Optimistic UI (results update immediately, refine in background)
- Loading spinner if query takes >500ms

**Performance Target**: <1 second for typical search query

---

## 5. Caregiver Profiles

### 5.1 Profile Page Route

**Route**: `/caregivers/:caregiverId`

**Access**: Public (no login required for browsing, login required for booking request)

**SEO**: Public caregiver profiles indexed by search engines (opt-in by caregiver)

---

### 5.2 Profile Sections

#### 5.2.1 Header Section

**Components**:
1. **Profile Photo**: Large (400x400px)
2. **Name**: Full first name + last initial
3. **Location**: Postcode district (e.g., "SW1A area"), full postcode not shown
4. **Distance**: From care receiver's last search postcode
5. **Verification Badges**: DBS Verified, ID Verified (prominent display)
6. **Service Type Badge**: "Companionship Only" (Tier 1)
7. **Average Rating**: Large star display + review count
8. **Hourly Rate**: "From 20 GBP/hour"
9. **CTA Button**: "Request Booking" (primary, prominent)
10. **Secondary Actions**: "Add to Favorites" (heart icon), "Share Profile" (link icon)

---

#### 5.2.2 About Me Section

**Components**:
1. **Bio**: Full bio text (max 500 characters, set at caregiver onboarding)
2. **Experience**: Years of experience in companionship/elderly care
3. **Languages Spoken**: All languages, with flags/icons
4. **Interests & Hobbies**: Shared interests help with companionship matching
5. **Transportation**: "Has own vehicle" or "Uses public transport"

**Tone**: Friendly, approachable, professional

**Moderation**: Admin reviews bio for:
- No contact information (email, phone, address)
- No inappropriate content
- No requests for off-platform payment
- Professional language

---

#### 5.2.3 Services Offered Section (Tier 1)

**Services Display** (checkmarks for offered services):
- Companionship (conversation, activities)
- Light housework (cleaning, tidying)
- Shopping and errands
- Meal preparation (no feeding assistance)
- Transportation (if has vehicle)

**Service Descriptions**: Tooltip on hover explains each service type

**Tier 1 Note**: Personal care services NOT shown. "Looking for personal care? We'll be adding these services soon. Join the waitlist."

---

#### 5.2.4 Availability Section

**Display**:
- Weekly availability calendar (visual calendar grid)
- Available time slots highlighted in green
- Booked time slots grayed out (not specific booking details)
- Unavailable dates blocked out

**Interaction**:
- Care receiver can select desired time slot
- Click "Request Booking" pre-fills booking form with selected date/time

**Mobile**: Simplified list view ("Available Monday mornings, Wednesday afternoons...")

---

#### 5.2.5 Verification Section

**Verification Badges** (expanded detail):
1. **DBS Verified** (if voluntary DBS submitted):
   - "Enhanced DBS check completed on [date]"
   - "Certificate verified by admin on [date]"
   - "DBS Update Service subscribed" (if applicable)

2. **ID Verified**:
   - "Government-issued ID verified on [date]"
   - "Identity confirmed via Stripe Identity"

3. **Right to Work Verified**:
   - "Right to work in UK verified on [date]"
   - "UKVI share code checked"

4. **Phone Verified**:
   - "Phone number verified"

**Trust Signal**: Verification transparency builds trust with care receivers

---

#### 5.2.6 Reviews & Ratings Section

**Display**:
1. **Average Rating**: Large star display (e.g., "4.8 out of 5 stars")
2. **Review Count**: "Based on 24 reviews"
3. **Rating Distribution**: Bar chart showing 5-star, 4-star, 3-star, 2-star, 1-star review counts
4. **Recent Reviews**: Last 10 reviews displayed (pagination for more)

**Each Review Displays**:
- Reviewer name: First name + last initial (e.g., "Margaret S.")
- Star rating (1-5 stars)
- Written review (up to 500 characters)
- Date of review
- Service type reviewed (companionship)

**Review Sorting**:
- Most recent (default)
- Highest rated first
- Lowest rated first

**Caregiver Response**: Caregiver can respond to reviews (optional, 300 chars)

**Moderation**: Reviews moderated for inappropriate content, profanity, personal info

**New Caregivers**: "New to the platform - no reviews yet" message

---

#### 5.2.7 Booking CTA Section

**Primary CTA**: "Request Booking" button
- Prominent placement (sticky header on scroll)
- Click opens booking request form (pre-filled with caregiver ID)

**Secondary Info**:
- "Response time: Usually within 6 hours"
- "Acceptance rate: 85%" (if available)

**Login Required**: If user not logged in, prompt to log in or register before booking request

---

### 5.3 Profile Completeness

**Indicator**: Profile completeness percentage (shown to caregiver, not care receiver)

**Complete Profile Criteria**:
- [ ] Profile photo uploaded
- [ ] Bio completed (min 100 characters)
- [ ] Services selected (at least 1)
- [ ] Availability set (at least 10 hours/week)
- [ ] Hourly rate set
- [ ] Languages spoken selected
- [ ] ID verification complete
- [ ] Right to work verification complete
- [ ] Phone verification complete
- [ ] Bank account connected (for payouts)

**Incentive**: Incomplete profiles hidden from search until 80%+ complete

---

### 5.4 Profile Quality Controls

**Admin Review Before Visibility**:
- Profile photo appropriate (face visible, professional)
- Bio free of contact information or inappropriate content
- Services reasonable (no promises of medical care at Tier 1)
- Rate within platform range (10-100 GBP/hour)

**Ongoing Monitoring**:
- Low ratings (<3 stars) trigger admin review
- Multiple reports trigger profile suspension
- Expired verifications hide profile until renewed

---

## 6. Matching Algorithm

### 6.1 Tier 1 Matching Approach

**Philosophy**: Simple, transparent, distance-based matching with basic filters.

At Tier 1, matching is NOT algorithmic (no AI, no complex scoring). Matching is based on explicit user-selected filters and distance.

**Tier 1 Matching = Filter + Sort**:
1. Apply all selected filters (location, availability, rate, services, verification, language, gender)
2. Sort by distance (default) or user-selected sort criteria
3. Return results

**No Hidden Ranking**: Results are deterministic based on filter criteria. No personalization, no machine learning.

**Rationale**:
- Tier 1 focuses on trust and transparency
- Algorithmic matching requires data (not enough bookings yet)
- Simple matching is easier to explain to elderly users

---

### 6.2 Default Sort Order

**Primary Sort**: Distance (nearest caregivers first)

**Rationale**:
- Travel distance is primary concern for elderly care receivers
- Proximity reduces caregiver travel time (lower cancellation risk)
- Intuitive for users ("show me caregivers near me")

**Secondary Sort** (if distance ties): Rating (highest first)

---

### 6.3 Alternative Sort Options

Users can override default sort:

1. **Distance** (nearest first) - DEFAULT
2. **Rating** (highest rated first)
   - New caregivers with no reviews shown last
   - Rationale: Prioritize proven quality
3. **Price - Low to High** (budget-conscious users)
4. **Price - High to Low** (premium service seekers)
5. **Newest First** (give new caregivers visibility)

**Sort Persistence**: User's last selected sort order persisted in session (but not across sessions)

---

### 6.4 Future Enhancements (Tier 2+)

**Deferred to Tier 2/3** (not in Tier 1 scope):
- Personalized recommendations based on previous bookings
- Care needs-based matching (requires Tier 3 health data consent)
- Caregiver-care receiver compatibility scoring
- Machine learning ranking based on booking success patterns
- "Caregivers similar to ones you've booked before"

**Rationale for Deferral**: These require sufficient booking data and Tier 2+ feature availability. Tier 1 focus is establishing trust and validating basic marketplace mechanics.

---

## 7. Availability System

### 7.1 Caregiver Availability Management

**Availability Types**:
1. **Recurring Weekly Availability**: Default pattern (e.g., Mon-Fri 9am-5pm)
2. **One-Off Availability Additions**: Specific dates (e.g., available Saturday June 15)
3. **Unavailability Blocks**: Block dates (holidays, appointments)

**Granularity**: 30-minute time slots (e.g., 9:00am, 9:30am, 10:00am...)

**UI**: Visual calendar with drag-to-select time blocks

---

### 7.2 Availability Calendar (Caregiver Screen)

**Route**: `/caregiver/availability`

**Calendar Views**:
- Week view (default, easiest for recurring patterns)
- Month view (for blocking holidays)
- Day view (granular slot management)

**Interactions**:
1. **Set Recurring Availability**:
   - Click day of week (e.g., Monday)
   - Select time range (e.g., 9am-5pm)
   - Apply to all future Mondays

2. **Add One-Off Availability**:
   - Click specific date
   - Select time range
   - Marked as available for that date only

3. **Block Unavailability**:
   - Click date or date range
   - Mark as unavailable (holiday, personal time)
   - Blocks entire day or specific hours

4. **Import Availability**:
   - Sync with Google Calendar (two-way sync)
   - Import iCal file

---

### 7.3 Real-Time Availability Sync

**Booking Acceptance**:
- When caregiver accepts booking, time slot automatically marked as booked
- Booked slots removed from availability display in search
- Prevents double-booking

**Booking Cancellation**:
- When booking cancelled, time slot reopens (becomes available again)
- Immediately reflected in search results

**Manual Availability Changes**:
- Changes take effect immediately
- Search results updated in <1 minute (cache expiry)

**Concurrency Handling**:
- Database-level locking prevents double-booking race conditions
- If two care receivers request same time slot simultaneously, first acceptance wins

---

### 7.4 Availability Display in Search Results

**Card Display**:
- "Available Mon, Wed, Fri mornings"
- Compact summary of availability pattern

**Profile Display**:
- Visual calendar showing available time slots (green) vs unavailable (gray)
- "Click a time slot to request booking" interaction

**Availability Filtering**:
- Search filters by day + time (e.g., "Monday morning")
- Results show only caregivers with matching availability

---

### 7.5 Minimum Availability Requirements

**Requirement**: Caregiver must have at least 10 hours/week available to appear in search

**Rationale**:
- Ensures caregiver is actively seeking bookings
- Reduces "ghost profiles" (registered but inactive)
- Improves booking request acceptance rate

**Enforcement**:
- Profile hidden if availability drops below 10 hours/week
- Automated email reminder: "Your profile is hidden. Add more availability to receive booking requests."

---

### 7.6 Availability Edge Cases

**Edge Case 1: Caregiver Has No Availability Set**
- Profile hidden from search
- Reminder in caregiver dashboard: "Set your availability to start receiving booking requests"

**Edge Case 2: All Available Slots Already Booked**
- Profile shown in search but marked "Fully booked this week"
- Care receiver can "Request future booking" (specify desired future dates)

**Edge Case 3: Recurring Availability Conflicts with One-Off Block**
- One-off blocks override recurring availability
- Example: Recurring Mon 9am-5pm available, but Memorial Day Monday blocked

---

## 8. Geographic Scope

### 8.1 Coverage Area

**Tier 1 Launch**: UK-wide (England, Scotland, Wales, Northern Ireland)

**Focus**: Urban and suburban areas with population density sufficient to support supply

**Expansion Strategy**: Validate high-density urban areas (London, Manchester, Birmingham) before expanding to rural areas

---

### 8.2 Postcode-Based Search

**Input**: UK postcode (full or partial)
- Full postcode: SW1A 1AA (precise location)
- Partial postcode: SW1A (broader area)

**Validation**:
- Regex pattern match for UK postcode format
- API validation (Google Maps Geocoding API or Royal Mail database)
- Error handling: "Please enter a valid UK postcode"

**Privacy**:
- Care receiver postcode stored for search purposes
- Caregiver postcode stored for distance calculation
- Public profiles show postcode DISTRICT only (e.g., "SW1A area"), not full postcode

---

### 8.3 Distance Calculation

**Method**: Haversine formula (great-circle distance)

**Accuracy**: Straight-line distance (not driving distance or public transport time)

**Rationale**: Haversine is fast and sufficient for Tier 1. Driving/transit time requires expensive API calls (defer to Tier 2+).

**Implementation**:
- Convert postcodes to lat/long using Google Maps Geocoding API
- Store lat/long in database for caregivers (indexed for fast queries)
- Calculate distance in database query (PostgreSQL earthdistance extension or PostGIS)

**Display**: Distance rounded to 1 decimal place (e.g., "1.2 miles away")

---

### 8.4 Radius Options

**Available Radii**: 5, 10, 15, 20, 30 miles

**Default Radius**: 10 miles

**Rationale**:
- 5 miles: Very local, limited results
- 10 miles: Sweet spot for urban areas (balance of options and travel time)
- 15-20 miles: Suburban areas
- 30 miles: Rural areas or sparse coverage

**Mobile**: Geolocation API to auto-detect user's current location (with permission)

---

### 8.5 Low-Coverage Areas

**Problem**: Rural postcodes may have few or no caregivers within 30 miles

**Solutions**:
1. **Waitlist**: "No caregivers in your area yet. Join the waitlist to be notified when caregivers sign up."
2. **Expand Radius Suggestion**: "Try expanding to 50 miles"
3. **Caregiver Recruitment**: Admin identifies low-coverage postcodes and targets caregiver recruitment

**Data Collection**: Track "no results" searches by postcode to identify demand in uncovered areas

---

### 8.6 Service Radius (Caregiver Setting)

**Caregiver Configuration**: Caregiver sets maximum service radius (5, 10, 15, 20, 30 miles)

**Example**: Caregiver in SW1A sets 15-mile radius. Only care receivers within 15 miles of SW1A see this caregiver in search.

**Default**: 15 miles (suggested during onboarding)

**Rationale**: Caregivers control their own travel distance comfort level

**Impact on Search**: Caregiver only appears in search results if care receiver is within caregiver's service radius

---

## 9. Performance Requirements

### 9.1 Response Time Targets

| Action | Target | Maximum Acceptable |
|--------|--------|-------------------|
| Initial search query | <1 second | <2 seconds |
| Filter change (without page reload) | <500ms | <1 second |
| Caregiver profile page load | <1 second | <2 seconds |
| Pagination (next page) | <500ms | <1 second |
| Sort change | <500ms | <1 second |

**Rationale**: Elderly users and family members are sensitive to slow UIs. Fast response times reduce frustration and abandonment.

---

### 9.2 Database Performance

**Optimization Strategies**:
1. **Indexed Columns**:
   - `caregivers.location` (lat/long, PostGIS GIST index)
   - `caregivers.hourly_rate`
   - `caregivers.verification_status`
   - `caregivers.average_rating`

2. **Query Caching**:
   - Cache search results for 5 minutes (Redis)
   - Invalidate cache when caregiver updates profile or availability

3. **Pagination**:
   - Use LIMIT/OFFSET for page queries (acceptable for small result sets)
   - Consider cursor-based pagination for large result sets (future enhancement)

4. **Lazy Loading**:
   - Load profile photos on-demand (IntersectionObserver API)
   - Defer non-critical data (full bio) until profile page

---

### 9.3 Scalability Targets

**Tier 1 Capacity**:
- Support 1,000 caregivers in database
- Support 5,000 care receivers
- Support 10,000 searches per day
- Support 100 concurrent search queries

**Database**: PostgreSQL with PostGIS extension (sufficient for Tier 1 volumes)

**Future Scaling** (Tier 2+):
- Elasticsearch for advanced search capabilities (fuzzy matching, typo tolerance)
- Redis for real-time availability tracking
- CDN for caregiver profile photos

---

### 9.4 Mobile Performance

**Mobile-Specific Optimizations**:
- Smaller page sizes (6 results per page vs 12 on desktop)
- Lazy load images (save mobile data)
- Compress profile photos (WebP format)
- Minimize API calls (bundle search + filter metadata in single response)
- Touch-optimized UI (44px minimum tap targets)

**Performance Budget**:
- Total page weight <500KB (initial load)
- JavaScript bundle <200KB (gzipped)
- Images optimized (max 50KB per profile photo)

---

### 9.5 Monitoring & Alerting

**Metrics to Track**:
1. **Search Response Time**: 95th percentile <2 seconds
2. **Search Success Rate**: % of searches returning at least 1 result
3. **Profile Load Time**: 95th percentile <2 seconds
4. **Database Query Time**: Slow queries flagged (>1 second)
5. **Cache Hit Rate**: >80% for repeated searches

**Alerting**:
- Slack alert if response time exceeds 5 seconds
- Daily report of "no results" searches by postcode (identify coverage gaps)
- Weekly report of slow queries (database optimization opportunities)

**Tools**: New Relic, Datadog, or similar APM tool

---

## 10. Accessibility

### 10.1 WCAG 2.1 AA Compliance

**Target**: Full WCAG 2.1 Level AA compliance

**Key Requirements**:
1. **Perceivable**:
   - Text alternatives for images (alt text for profile photos)
   - Color contrast 4.5:1 minimum (text on backgrounds)
   - Text resizable up to 200% without loss of functionality

2. **Operable**:
   - Keyboard navigation (tab order logical, no keyboard traps)
   - Sufficient time (no time limits on search or form completion)
   - Focus indicators visible (outline on focused elements)

3. **Understandable**:
   - Clear labels for form inputs
   - Error messages descriptive (not just "Invalid input")
   - Consistent navigation (header, footer, layout consistent across pages)

4. **Robust**:
   - Valid HTML (semantic markup)
   - ARIA labels where needed (especially for custom components)
   - Screen reader tested (NVDA, JAWS)

---

### 10.2 Elderly User Considerations

**Design Principles**:

1. **Large Text**:
   - Base font size: 18px minimum (larger than standard 16px)
   - Headings: 24-32px
   - User can increase text size via browser zoom (test up to 200%)

2. **High Contrast**:
   - Black text on white background (primary content)
   - Blue links (underlined, standard web convention)
   - Avoid light gray text (insufficient contrast)

3. **Clear Calls-to-Action**:
   - Large buttons (minimum 48px height)
   - Descriptive button labels ("Request Booking" not just "Request")
   - Primary actions visually distinct (solid color vs outline)

4. **Simple Language**:
   - Avoid jargon (e.g., "companionship services" explained as "someone to keep you company")
   - Short sentences, clear instructions
   - Tooltips for potentially confusing terms

5. **Error Recovery**:
   - Forgiving input (accept postcodes with or without spaces)
   - Clear error messages with suggestions ("Did you mean SW1A 1AA?")
   - Auto-save search criteria (user doesn't lose work if navigating away)

---

### 10.3 Screen Reader Support

**Testing**: Test with NVDA (Windows), JAWS (Windows), VoiceOver (Mac, iOS)

**Implementation**:

1. **Semantic HTML**:
   - Use `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` tags
   - Heading hierarchy (H1 → H2 → H3, no skipping levels)

2. **ARIA Labels**:
   - `aria-label` for icon buttons (e.g., "Add to favorites" for heart icon)
   - `aria-describedby` for form hints
   - `role="search"` for search form
   - `aria-live="polite"` for search result updates

3. **Focus Management**:
   - Focus moves to search results after search submission
   - Skip-to-content link (bypass navigation)
   - Focus returns to trigger element after modal closes

4. **Image Alt Text**:
   - Profile photos: "Profile photo of [Caregiver Name]"
   - Verification badges: "DBS Verified badge"
   - Decorative images: Empty alt attribute (`alt=""`)

---

### 10.4 Keyboard Navigation

**All Actions Keyboard-Accessible**:
- Search form: Tab through inputs, Enter to submit
- Filters: Tab to checkboxes/radio buttons, Space to toggle
- Caregiver cards: Tab to card, Enter to open profile
- Pagination: Tab to page links, Enter to navigate

**Focus Indicators**:
- Visible outline on focused elements (2px solid blue)
- No focus outline removal (common accessibility mistake)

**Keyboard Shortcuts** (future enhancement):
- `/` to focus search input
- `Esc` to clear filters
- Arrow keys for pagination

---

### 10.5 Testing Checklist

**Accessibility Testing**:
- [ ] Run axe DevTools (Chrome extension) - zero violations
- [ ] Test with keyboard only (no mouse) - all actions accessible
- [ ] Test with NVDA screen reader - all content announced correctly
- [ ] Test with 200% browser zoom - layout not broken
- [ ] Test color contrast (Contrast Checker tool) - 4.5:1 minimum
- [ ] Validate HTML (W3C Validator) - zero errors
- [ ] Test with elderly users (usability testing) - gather feedback

---

## 11. Data Requirements

### 11.1 Caregiver Data Model

**Database Table: `caregivers`**

```sql
CREATE TABLE caregivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),

  -- Profile
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  profile_photo_url TEXT,
  bio TEXT (max 500 chars),

  -- Location (for search)
  postcode VARCHAR(10) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  service_radius_miles INTEGER DEFAULT 15,

  -- Services (Tier 1)
  services_offered TEXT[] DEFAULT '{}', -- ['companionship', 'light_housework', 'shopping', 'meal_prep', 'transportation']

  -- Pricing
  hourly_rate_gbp DECIMAL(5, 2) NOT NULL, -- e.g., 20.00

  -- Verification
  id_verified BOOLEAN DEFAULT FALSE,
  id_verified_date TIMESTAMP,
  right_to_work_verified BOOLEAN DEFAULT FALSE,
  right_to_work_verified_date TIMESTAMP,
  dbs_verified BOOLEAN DEFAULT FALSE, -- VOLUNTARY at Tier 1
  dbs_verified_date TIMESTAMP,
  dbs_certificate_number VARCHAR(50),
  phone_verified BOOLEAN DEFAULT FALSE,

  -- Languages
  languages_spoken TEXT[] DEFAULT '{"english"}',

  -- Demographics
  gender VARCHAR(20), -- 'male', 'female', 'non-binary', 'prefer_not_to_say'

  -- Ratings
  average_rating DECIMAL(3, 2) DEFAULT 0.0, -- e.g., 4.75
  total_reviews INTEGER DEFAULT 0,

  -- Status
  profile_status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'pending_verification', 'approved', 'suspended', 'deactivated'
  profile_approved_date TIMESTAMP,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for search performance
CREATE INDEX idx_caregivers_location ON caregivers USING GIST (ST_MakePoint(longitude, latitude));
CREATE INDEX idx_caregivers_hourly_rate ON caregivers(hourly_rate_gbp);
CREATE INDEX idx_caregivers_verification ON caregivers(id_verified, right_to_work_verified, dbs_verified);
CREATE INDEX idx_caregivers_rating ON caregivers(average_rating);
CREATE INDEX idx_caregivers_status ON caregivers(profile_status);
```

---

### 11.2 Availability Data Model

**Database Table: `caregiver_availability`**

```sql
CREATE TABLE caregiver_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  caregiver_id UUID NOT NULL REFERENCES caregivers(id),

  -- Recurring availability (day of week + time range)
  day_of_week INTEGER, -- 0=Sunday, 1=Monday, ..., 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_recurring BOOLEAN DEFAULT TRUE,

  -- One-off availability (specific date)
  specific_date DATE,

  -- Unavailability blocks
  unavailable_start TIMESTAMP,
  unavailable_end TIMESTAMP,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_availability_caregiver ON caregiver_availability(caregiver_id);
CREATE INDEX idx_availability_day ON caregiver_availability(day_of_week);
CREATE INDEX idx_availability_date ON caregiver_availability(specific_date);
```

---

### 11.3 Search Analytics Data Model

**Database Table: `search_logs`**

```sql
CREATE TABLE search_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id), -- NULL if not logged in

  -- Search criteria
  postcode VARCHAR(10) NOT NULL,
  radius_miles INTEGER NOT NULL,
  days_of_week TEXT[],
  times_of_day TEXT[],
  rate_min DECIMAL(5, 2),
  rate_max DECIMAL(5, 2),
  services TEXT[],
  dbs_verified BOOLEAN,
  languages TEXT[],
  gender_preference VARCHAR(20),
  min_rating DECIMAL(3, 2),

  -- Results
  result_count INTEGER NOT NULL,
  results_returned JSONB, -- Array of caregiver IDs returned

  -- Engagement
  profile_views TEXT[], -- Array of caregiver IDs viewed
  booking_requests TEXT[], -- Array of caregiver IDs requested

  -- Metadata
  user_agent TEXT,
  ip_address INET,
  session_id VARCHAR(255),

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_search_logs_postcode ON search_logs(postcode);
CREATE INDEX idx_search_logs_result_count ON search_logs(result_count);
CREATE INDEX idx_search_logs_created_at ON search_logs(created_at);
```

---

### 11.4 Favorited Caregivers Data Model

**Database Table: `favorited_caregivers`**

```sql
CREATE TABLE favorited_caregivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  care_receiver_id UUID NOT NULL REFERENCES users(id),
  caregiver_id UUID NOT NULL REFERENCES caregivers(id),

  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(care_receiver_id, caregiver_id)
);

CREATE INDEX idx_favorites_care_receiver ON favorited_caregivers(care_receiver_id);
CREATE INDEX idx_favorites_caregiver ON favorited_caregivers(caregiver_id);
```

---

## 12. Edge Cases

### 12.1 No Results Edge Cases

**Edge Case 1: Postcode with No Caregivers in Radius**
- **Scenario**: Care receiver searches SW99 9XX (fictional postcode) with 10-mile radius, zero caregivers in area
- **Behavior**:
  - "No caregivers found matching your criteria"
  - Suggestion: "Try expanding to 20 or 30 miles"
  - "Join waitlist" button (capture demand)
- **Admin Action**: Log postcode in "no results" report, target caregiver recruitment

---

**Edge Case 2: All Filters Applied, Zero Matches**
- **Scenario**: Care receiver selects: DBS verified + Female + Polish speaking + 15-20 GBP/hour + Monday mornings, zero matches
- **Behavior**:
  - "No caregivers found matching ALL your criteria"
  - Suggestion: "Try removing some filters" (show which filters to relax)
  - Option to "Remove all filters and search again"

---

**Edge Case 3: New Platform Launch, Very Few Caregivers**
- **Scenario**: Platform has only 5 caregivers total in London area
- **Behavior**:
  - Show all 5 caregivers regardless of some filters
  - Banner: "We're new! More caregivers joining every day. Bookmark your favorites."
  - Prioritize caregiver recruitment marketing

---

### 12.2 Sparse Coverage Edge Cases

**Edge Case 4: Rural Postcode with Single Caregiver**
- **Scenario**: Care receiver in rural Scottish Highlands, only 1 caregiver within 30 miles
- **Behavior**:
  - Show the 1 caregiver
  - Message: "Limited caregivers in your area. We're working to add more."
  - "Notify me when more caregivers join" signup

---

**Edge Case 5: Urban Area with Many Caregivers (100+)**
- **Scenario**: Care receiver in Central London, 200 caregivers within 10 miles
- **Behavior**:
  - Show paginated results (12 per page = 17 pages)
  - Encourage filtering: "200 caregivers found. Use filters to narrow your search."
  - Default sort by distance helps surface nearest caregivers first

---

### 12.3 Availability Edge Cases

**Edge Case 6: Caregiver Fully Booked This Week**
- **Scenario**: Popular caregiver has all available slots booked for next 7 days
- **Behavior**:
  - Profile still shown in search (not hidden)
  - Badge: "Fully booked this week"
  - CTA changes to "Request future booking" (allows booking 2+ weeks out)

---

**Edge Case 7: Caregiver Has No Availability Set**
- **Scenario**: Caregiver completed onboarding but forgot to set availability
- **Behavior**:
  - Profile hidden from search (not shown to care receivers)
  - Caregiver dashboard alert: "Your profile is hidden. Set your availability to receive booking requests."
  - Email reminder after 7 days

---

**Edge Case 8: Caregiver Availability Less Than Minimum (10 hours/week)**
- **Scenario**: Caregiver has only 5 hours/week available
- **Behavior**:
  - Profile hidden from search
  - Alert: "Add at least 10 hours/week availability to appear in search"
  - Rationale: Ensures caregivers are actively seeking work

---

### 12.4 Verification Edge Cases

**Edge Case 9: Caregiver Verification Expires**
- **Scenario**: Caregiver's DBS certificate expires (3 years old)
- **Behavior**:
  - "DBS Verified" badge removed from profile
  - Profile remains visible (DBS is voluntary at Tier 1)
  - Email reminder: "Your DBS certificate has expired. Upload a new one to restore your DBS Verified badge."

---

**Edge Case 10: Caregiver Fails ID Verification**
- **Scenario**: Caregiver's ID verification rejected by Stripe Identity (document unreadable)
- **Behavior**:
  - Profile not approved (remains in "pending_verification" status)
  - Profile hidden from search
  - Email: "ID verification failed. Please re-upload a clear photo of your ID."
  - Manual admin review option

---

### 12.5 Search Input Edge Cases

**Edge Case 11: Invalid Postcode Format**
- **Scenario**: User enters "12345" (US ZIP code format)
- **Behavior**:
  - Validation error: "Please enter a valid UK postcode (e.g., SW1A 1AA)"
  - Input field highlighted in red
  - Cursor remains in postcode field

---

**Edge Case 12: Postcode Does Not Exist**
- **Scenario**: User enters "ZZ99 9ZZ" (valid format but fake postcode)
- **Behavior**:
  - API geocoding fails
  - Error message: "We couldn't find that postcode. Please check and try again."
  - Suggestion: "Use your full postcode (e.g., SW1A 1AA)"

---

**Edge Case 13: Partial Postcode Entered**
- **Scenario**: User enters "SW1" (postcode area, not full postcode)
- **Behavior**:
  - Accept partial postcode (geocode to area center)
  - Message: "Showing caregivers near SW1 area. Enter full postcode for precise results."
  - Results based on broader area

---

### 12.6 New Caregiver Edge Cases

**Edge Case 14: Caregiver Has No Reviews Yet**
- **Scenario**: Caregiver just joined platform, zero bookings completed
- **Behavior**:
  - Profile shown in search results
  - Badge: "New Caregiver" (not a negative signal, just informational)
  - Star rating not shown (or shown as "No reviews yet")
  - Sorting by rating: New caregivers shown last (if user sorts by rating)

---

**Edge Case 15: Caregiver Has Low Rating (<3 stars)**
- **Scenario**: Caregiver has 2.5-star average rating (quality concern)
- **Behavior**:
  - Profile still shown in search (not hidden)
  - Rating clearly displayed (transparency)
  - Admin investigates low ratings (manual review)
  - Potential admin actions: Retraining recommendation, suspension if pattern of issues

---

### 12.7 Technical Edge Cases

**Edge Case 16: API Timeout (Geocoding API Down)**
- **Scenario**: Google Maps Geocoding API times out or returns error
- **Behavior**:
  - Retry once (exponential backoff)
  - If still fails, show error: "We're having trouble with location services. Please try again in a moment."
  - Log error for admin investigation
  - Fallback: Allow user to continue with previously searched postcode (if available)

---

**Edge Case 17: Database Query Timeout (Slow Query)**
- **Scenario**: Search query takes >5 seconds (database overload or inefficient query)
- **Behavior**:
  - Show loading spinner up to 10 seconds
  - If still loading after 10 seconds, show error: "Search is taking longer than expected. Please try again."
  - Admin alert: Database performance issue
  - Investigate slow query (missing index, large dataset)

---

**Edge Case 18: Cache Staleness**
- **Scenario**: Caregiver updates availability, but search results show old availability for 5 minutes (cache TTL)
- **Behavior**:
  - Acceptable staleness for Tier 1 (5-minute cache)
  - When care receiver clicks profile, latest availability shown (no cache)
  - Booking request form validates availability in real-time (not cached)

---

## 13. Acceptance Criteria

### 13.1 Core Search Functionality

**AC-001: Location-Based Search**
- [ ] User can enter UK postcode and search for caregivers
- [ ] Results show caregivers within selected radius (5-30 miles)
- [ ] Distance displayed for each caregiver (nearest first)
- [ ] Invalid postcode shows clear error message
- [ ] Search response time <2 seconds (95th percentile)

---

**AC-002: Availability Filtering**
- [ ] User can filter by day of week (multi-select)
- [ ] User can filter by time of day (morning/afternoon/evening)
- [ ] Results show only caregivers with matching availability
- [ ] "No availability match" message shown if zero results

---

**AC-003: Rate Range Filtering**
- [ ] User can set min and max hourly rate (slider or input)
- [ ] Results filter by rate range dynamically
- [ ] Platform fee displayed transparently ("20 GBP/hour + 15% platform fee")
- [ ] Default range: 10-40 GBP/hour

---

**AC-004: Service Type Filtering**
- [ ] User can filter by service type: companionship, light housework, shopping, meal prep, transportation
- [ ] Multi-select supported (AND logic)
- [ ] "Companionship Only" badge shown for all Tier 1 caregivers
- [ ] Personal care services NOT shown in Tier 1

---

**AC-005: Verification Status Filtering**
- [ ] User can filter by "DBS Verified" (voluntary at Tier 1)
- [ ] User can filter by "ID Verified" (all caregivers)
- [ ] Verification badges displayed on caregiver cards
- [ ] Tooltip explains verification types

---

**AC-006: Language Filtering**
- [ ] User can select one or more languages
- [ ] Results show caregivers who speak ALL selected languages
- [ ] Common UK languages available (English, Polish, Romanian, Urdu, Bengali, etc.)

---

**AC-007: Gender Preference Filtering**
- [ ] User can optionally filter by gender (Male, Female, No Preference)
- [ ] Default: No Preference
- [ ] Labeled as "personal comfort preference" (Equality Act compliance)

---

### 13.2 Search Results Display

**AC-008: Caregiver Cards**
- [ ] Each card shows: photo, name, distance, rate, rating, verification badges, service type, bio excerpt
- [ ] Cards clickable (opens full profile)
- [ ] "Add to Favorites" button functional
- [ ] Card layout responsive (3 columns desktop, 2 tablet, 1 mobile)

---

**AC-009: Result Count and Summary**
- [ ] Result count displayed ("12 caregivers found")
- [ ] Search summary displayed ("Within 10 miles of SW1A 1AA")
- [ ] Active filters shown as dismissible tags

---

**AC-010: Sort Options**
- [ ] User can sort by: Distance (default), Rating, Price (low-high), Price (high-low), Newest
- [ ] Sort change updates results without page reload
- [ ] Sort selection persisted in session

---

**AC-011: Pagination**
- [ ] Results paginated (12 per page desktop, 6 mobile)
- [ ] Previous/Next buttons functional
- [ ] Page number links functional
- [ ] Page load time <1 second

---

**AC-012: No Results State**
- [ ] "No caregivers found" message shown when zero results
- [ ] Helpful suggestions provided (expand radius, adjust filters)
- [ ] "Notify me when available" option functional
- [ ] "Contact support" link provided

---

### 13.3 Caregiver Profile Pages

**AC-013: Profile Header**
- [ ] Profile photo displayed (400x400px)
- [ ] Name, location (district only), distance shown
- [ ] Verification badges prominent
- [ ] "Companionship Only" badge shown (Tier 1)
- [ ] Average rating and review count displayed
- [ ] Hourly rate displayed ("From 20 GBP/hour")

---

**AC-014: About Me Section**
- [ ] Full bio displayed (max 500 chars)
- [ ] Experience, languages, interests shown
- [ ] Transportation status shown (has vehicle or uses public transport)

---

**AC-015: Services Offered Section**
- [ ] Companionship, light housework, shopping, meal prep, transportation services shown with checkmarks
- [ ] Tooltips explain each service type
- [ ] NO personal care services shown at Tier 1

---

**AC-016: Availability Section**
- [ ] Visual calendar shows available time slots (green) and booked slots (gray)
- [ ] User can click time slot to pre-fill booking request form
- [ ] Unavailable dates blocked out

---

**AC-017: Verification Section**
- [ ] All verification statuses shown with dates
- [ ] DBS certificate details shown (if voluntary DBS submitted)
- [ ] Verification badges explained (tooltips)

---

**AC-018: Reviews Section**
- [ ] Average rating displayed (stars + number)
- [ ] Review count shown
- [ ] Rating distribution chart shown
- [ ] Recent reviews displayed (last 10)
- [ ] Pagination for additional reviews
- [ ] Caregiver responses shown (if any)

---

**AC-019: Booking CTA**
- [ ] "Request Booking" button prominent (sticky header on scroll)
- [ ] Click opens booking request form (pre-filled with caregiver ID)
- [ ] Login required (prompt if not logged in)

---

### 13.4 Performance & Accessibility

**AC-020: Performance Benchmarks**
- [ ] Search response time <1 second (95th percentile)
- [ ] Profile page load <2 seconds (95th percentile)
- [ ] Filter changes <500ms
- [ ] Pagination <500ms
- [ ] Mobile page weight <500KB

---

**AC-021: Accessibility Compliance**
- [ ] WCAG 2.1 AA compliant (zero axe DevTools violations)
- [ ] Keyboard navigation functional (all actions accessible)
- [ ] Screen reader tested (NVDA, JAWS, VoiceOver)
- [ ] Text resizable up to 200% without layout breaking
- [ ] Color contrast 4.5:1 minimum
- [ ] Focus indicators visible

---

**AC-022: Mobile Responsiveness**
- [ ] Search functional on mobile (320px width minimum)
- [ ] Filters accessible (bottom sheet or slide-out panel)
- [ ] Cards responsive (1 column mobile)
- [ ] Touch targets 44px minimum
- [ ] Caregiver profiles readable on mobile

---

### 13.5 Analytics & Monitoring

**AC-023: Search Analytics Tracking**
- [ ] All searches logged (postcode, filters, result count)
- [ ] "No results" searches flagged for admin review
- [ ] Search-to-profile-view conversion tracked
- [ ] Profile-view-to-booking-request conversion tracked

---

**AC-024: Performance Monitoring**
- [ ] Response time metrics tracked (95th percentile)
- [ ] Slow queries flagged (>1 second)
- [ ] Cache hit rate tracked (target >80%)
- [ ] Database performance monitored
- [ ] Uptime monitored (target 99.9%)

---

### 13.6 Edge Case Handling

**AC-025: No Results Handling**
- [ ] "No results" message shown with helpful suggestions
- [ ] "Expand radius" suggestion functional
- [ ] "Join waitlist" option functional
- [ ] "Contact support" link functional

---

**AC-026: Invalid Input Handling**
- [ ] Invalid postcode shows clear error message
- [ ] Non-existent postcode handled gracefully
- [ ] Partial postcode accepted (geocoded to area center)

---

**AC-027: Verification Expiry Handling**
- [ ] Expired verification removes badge from profile
- [ ] Profile remains visible (for voluntary verifications)
- [ ] Caregiver notified of expiry (email reminder)

---

**AC-028: Availability Edge Cases**
- [ ] Fully booked caregivers shown with "Fully booked this week" badge
- [ ] "Request future booking" option functional
- [ ] Caregivers with no availability hidden from search
- [ ] Caregivers with <10 hours/week availability hidden from search

---

## 14. Out of Scope (Tier 1)

The following features are explicitly **NOT included in Tier 1** search and discovery. These are deferred to Tier 2+ based on the Tiered Market Entry Roadmap.

### 14.1 Deferred to Tier 2 (Personal Care Services)

- **Care Skills Filtering**: Filter by personal care skills (washing, dressing, toileting, mobility assistance)
- **Qualification-Based Search**: Filter by NVQ Level 2/3, Care Certificate, nursing qualifications
- **Mandatory DBS Filter**: DBS becomes mandatory for personal care services at Tier 2
- **Insurance Verification Badge**: Public liability insurance verification
- **Reference Verification Badge**: Professional reference checks completed

**Rationale**: Tier 1 is companionship only. Care skills and personal care services require Tier 2 compliance (DPIA update, enhanced safeguarding, mandatory DBS).

---

### 14.2 Deferred to Tier 3 (Medical Condition Matching)

- **Medical Condition-Based Search**: Filter by caregiver's experience with dementia, Parkinson's, stroke, MS, etc.
- **Care Needs Profile Matching**: Match care receiver's medical conditions to caregiver's condition experience
- **Condition Severity Matching**: Match care receiver's condition severity to caregiver's experience level
- **Risk Assessment Display**: Show care receiver's risk assessment on caregiver profile (with consent)
- **Care Complexity Scoring**: Algorithmic scoring of care complexity (1-10 scale)
- **Condition-Specific Training Verification**: Verify caregiver's dementia training, Parkinson's training, etc.

**Rationale**: Medical condition matching requires processing special category health data (GDPR Article 9). Tier 3 compliance includes full DPIA, explicit consent mechanisms, enhanced data security, and ICO prior consultation (if required).

---

### 14.3 Deferred to Tier 4 (Care Coordination)

- **Multi-Caregiver Team Search**: Find caregivers who can work as coordinated team
- **Care Plan Integration**: Search based on care receiver's uploaded care plan
- **NHS/LA Referral Pathways**: Integration with NHS or Local Authority systems
- **Care Agency Partnership Search**: Filter by caregivers affiliated with care agencies

**Rationale**: Tier 4 represents full care coordination platform with B2B features. Not required for initial market validation.

---

### 14.4 Advanced Features (Future Enhancements)

**Personalization & Machine Learning**:
- Personalized caregiver recommendations based on previous bookings
- "Caregivers similar to ones you've booked before"
- Machine learning ranking (optimize for booking success rate)
- Predictive matching (suggest caregivers before care receiver searches)

**Rationale**: Require significant booking data to train models. Not feasible at Tier 1 volumes.

---

**Advanced Search Features**:
- Fuzzy search (typo tolerance)
- Autocomplete for postcode input
- Natural language search ("Find a Polish-speaking caregiver for my father on Monday mornings")
- Voice search (accessibility feature for users with vision impairment)
- Image search (upload photo, AI-powered caregiver matching)

**Rationale**: Advanced features require complex implementation. Focus on core functionality for Tier 1.

---

**Real-Time Features**:
- Live caregiver location tracking (during active booking)
- Real-time availability updates (caregiver becomes available mid-search)
- Instant booking (book immediately without caregiver acceptance)

**Rationale**: Real-time features require WebSocket infrastructure and increased complexity. Defer until scale justifies investment.

---

**Social Features**:
- Care receiver reviews of other care receivers (community building)
- Caregiver-to-caregiver messaging (peer support)
- Discussion forums (care tips, caregiver best practices)

**Rationale**: Social features require moderation and increase safeguarding complexity. Focus on core marketplace first.

---

**Advanced Analytics**:
- A/B testing of search algorithms (optimize for conversion)
- Heatmap analysis of user interactions (click patterns)
- Cohort analysis (search behavior by demographic)
- Predictive analytics (forecast caregiver demand by location)

**Rationale**: Analytics maturity grows with platform scale. Start with basic analytics, add advanced features as data accumulates.

---

## 15. Related Documents

**Strategic Context**:
- [Tiered Market Entry Roadmap](/docs/ROADMAP.md) - FDR-003: Tier definitions and progression gates
- [Founder Decisions & Responses](/docs/governance/founder-decisions-responses.md) - FDR-001, FDR-002, FDR-003

**Product Specifications**:
- [Marketplace Specification](/docs/tiers/common/spec/marketplace-spec.md) - Constitutional baseline
- [Feature Map](/docs/tiers/common/spec/feature-map.md) - Complete system overview
- [Tier 1 Features](/docs/tiers/tier1/features.md) - Tier 1 feature list

**Planning**:
- [MVP Classification](/docs/tiers/common/planning/mvp-classification.md) - Tier 1 vs Tier 2 classification
- [Build Sequence](/docs/tiers/tier1/planning/build-sequence.md) - Development phases
- [R0 Launch Scope](/docs/tiers/tier1/planning/r0-launch-scope.md) - Launch-critical screens
- [R1 Launch Scope](/docs/tiers/tier1/planning/r1-launch-scope.md) - Full MVP screens

**Compliance**:
- [Legal Framework](/docs/compliance/legal-framework.md) - UK regulatory requirements
- [DPIA](/docs/compliance/dpia.md) - Data Protection Impact Assessment

**Decisions**:
- [Gating Decisions](/docs/governance/gating-decisions.md) - Launch blockers
- [Product Decisions](/docs/governance/product-decisions.md) - Policy decisions

---

## 16. Document Maintenance

**Review Triggers**:
- Tier progression (moving from Tier 1 to Tier 2 requires search updates)
- User feedback identifies search quality issues
- "No results" patterns reveal coverage gaps
- Performance degradation (response times exceed targets)
- Regulatory changes (new GDPR guidance, CQC requirements)
- Competitive analysis (new search features from competitors)

**Ownership**: Product Manager owns this specification. Engineering Lead reviews technical implementation feasibility.

**Update Cycle**: Quarterly review, or as triggered by tier progression or major user feedback.

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Product Manager | Initial Tier 1 search and discovery specification |

---

**END OF DOCUMENT**
