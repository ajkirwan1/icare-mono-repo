# Screen-to-API Mapping: Search & Booking Screens

**Document Purpose**: Maps each search and booking screen to the specific API endpoints required to populate it, including page-load calls, user-interaction calls, and identified gaps where no endpoint currently exists.

**Document Owner**: Technical Architect
**Created**: 2026-02-18
**Status**: CANONICAL
**Tier**: Tier 1

**Source Documents**:
- Wireframes: `docs/tiers/tier1/draft-design-specs/wireframes/search/` and `docs/tiers/tier1/draft-design-specs/wireframes/booking/`
- Screen JSONs: `docs/tiers/tier1/figma/screens/`
- API Specification: `docs/technical/api-specification-tier1.md`
- Reference format: `docs/technical/screen-api-mapping-dashboards.md`

---

## Table of Contents

1. [How to Read This Document](#1-how-to-read-this-document)
2. [SCR-CR-003: Caregiver Search](#2-scr-cr-003-caregiver-search)
3. [SCR-CR-005: Caregiver Profile (Public View)](#3-scr-cr-005-caregiver-profile-public-view)
4. [SCR-CR-006: Booking Request Form](#4-scr-cr-006-booking-request-form)
5. [SCR-CR-008: Booking Detail (Care Receiver View)](#5-scr-cr-008-booking-detail-care-receiver-view)
6. [SCR-CG-013: Booking Request Detail (Caregiver View)](#6-scr-cg-013-booking-request-detail-caregiver-view)
7. [SCR-CR-008B: Bookings List (Care Receiver)](#7-scr-cr-008b-bookings-list-care-receiver)
8. [SCR-CG-002: Bookings List (Caregiver)](#8-scr-cg-002-bookings-list-caregiver)
9. [Gap Summary](#9-gap-summary)
10. [Recommended API Additions](#10-recommended-api-additions)

---

## 1. How to Read This Document

### Trigger Types

| Symbol | Meaning |
|--------|---------|
| **PAGE LOAD** | Called automatically when the screen first renders |
| **USER ACTION** | Called only when the user explicitly interacts (button click, filter apply, form submit) |
| **REAL-TIME** | Delivered by WebSocket connection, not a poll |

### Gap Flags

Sections marked **GAP** identify data the screen requires that has no matching endpoint in the current API specification. Each gap includes a recommended resolution in Section 10.

### API Base Path

All endpoints below are relative to `{base}/api/v1`. Full base URLs:
- Production: `https://api.icare-app.co.uk/api/v1`
- Development: `http://localhost:3000/api/v1`

### Commission Rate Note

The booking form wireframe displays a 15% platform service fee charged to care receivers. The caregiver booking detail displays a 15% platform commission deducted from earnings. These are placeholder values pending FDR-008 (pricing decision).

---

## 2. SCR-CR-003: Caregiver Search

**Route**: `/search`
**Role**: Care Receiver, Family Member
**Screen JSON**: `docs/tiers/tier1/figma/screens/search-caregiver-search.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/search/scr-cr-003-caregiver-search.md`

### 2.1 Page Load Calls

The search bar auto-fills the postcode from the user's profile. Results do not load until the user explicitly clicks "Search". The page therefore requires only one API call on initial render.

---

#### Call 1: Current User Profile (for postcode auto-fill)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `section-search-bar` — the postcode input field auto-fills with `data.postcode` from the care receiver's profile
- Navigation header user avatar and name dropdown

**Response Fields Used**:
```
data.firstName     → navigation header display name
data.postcode      → pre-fills the "Where do you need care?" postcode input
```

**Notes**: A 401 response must redirect to `/login?redirect=/search`. The auto-filled postcode is editable — the user can override it before executing a search.

---

### 2.2 User Interaction Calls (SCR-CR-003)

---

#### Interaction 1: Execute Search

**Trigger**: USER ACTION — clicking "Search" button or pressing Enter in the postcode field

**Endpoint**: `GET /caregivers`
**Auth**: Bearer JWT (authenticated users) or unauthenticated (public browse — no distance shown)
**Query Parameters** (built from search bar + sidebar filter state):
```
postcode={userInputPostcode}
radius={selectedRadius}         (5|10|15|20|30 miles, default 10)
page=1
limit=12
sort=distance                   (default)
```

**Screen Elements Populated**:
- `section-results-header` — `"24 caregivers found"` from `data.pagination.totalCount`, and `"Within 10 miles of SW1A 1AA"` from `data.searchSummary`
- `results-grid-container` — all `caregiver-card` instances in the 3-column grid
- `section-pagination` — total pages from `data.pagination.totalPages`

**Response Fields Used Per Card**:
```
data.caregivers[n].id                     → card CTA link: /caregivers/:id
data.caregivers[n].firstName              → "Sarah"
data.caregivers[n].lastInitial            → "K." (privacy: last name truncated)
data.caregivers[n].profilePhotoUrl        → circular profile photo (120x120px)
data.caregivers[n].distance               → "1.2 miles away"
data.caregivers[n].verification.idVerified → "✓ ID Verified" badge
data.caregivers[n].verification.dbsVerified → "✓ DBS Verified" badge (conditional)
data.caregivers[n].servicesOffered        → "Companionship Only" service badge
data.caregivers[n].hourlyRate             → "From £20/hour"
data.caregivers[n].averageRating          → star display (4.8)
data.caregivers[n].totalReviews           → "(24 reviews)" or "New Caregiver" if 0
data.caregivers[n].bio                    → first ~100 characters + "Read more..."
data.caregivers[n].languagesSpoken        → flag icons row (max 3 + "+ N more")
data.caregivers[n].availability           → "Available Monday, Wednesday mornings"
data.pagination.totalCount                → "24 caregivers found" result count label
data.pagination.totalPages                → pagination controls
data.searchSummary.postcode               → "Within 10 miles of SW1A 1AA" summary text
data.searchSummary.radius                 → summary text radius value
```

**Notes**: The caregiver search response does not include a `isFavorited` field for the current user. The "Add to Favorites" heart icon therefore always renders in the unfavorited state on initial search load. See GAP-SB-001.

**Loading State**: Skeleton cards (animated gradient pulse) replace the results grid while this call is in flight. The button text changes to "Searching...".

**Empty State**: If `data.pagination.totalCount === 0`, the `results-grid-container` renders the `empty-state` component with suggestions and alternative action buttons instead of cards.

---

#### Interaction 2: Apply Filters

**Trigger**: USER ACTION — clicking "Apply Filters" button in the filter sidebar, or clicking the × on an active filter tag to remove it

**Endpoint**: `GET /caregivers`
**Auth**: Bearer JWT
**Query Parameters** (builds on the base search, appending all active filter values):
```
postcode={currentPostcode}
radius={selectedRadius}
services=companionship,light_housework    (AND logic: all selected must match)
rateMin=15
rateMax=25
days=monday,wednesday                    (availability day filters)
times=morning,afternoon                  (availability time-of-day filters)
dbsVerified=true                         (only if DBS Verified checkbox is checked)
languages=english                        (AND logic)
gender=female
minRating=4.0
sort={selectedSort}
page=1                                   (reset to page 1 on filter change)
limit=12
```

**Screen Elements Updated**:
- Same as Interaction 1 — full results grid and pagination refresh
- `section-results-header` filter tag row updates to show active filter pills (e.g., "DBS Verified ×", "Morning availability ×", "£15-£25/hour ×")
- Result count updates to reflect filtered total

**Notes**: Filter parameters map directly to the `GET /caregivers` query parameters documented in the API spec (Section 4.1). Omitting a parameter means "no filter applied" for that dimension. The "Clear All Filters" link resets all filter state and re-executes with only `postcode` and `radius`.

---

#### Interaction 3: Change Sort Order

**Trigger**: USER ACTION — changing the "Sort by" dropdown

**Endpoint**: `GET /caregivers`
**Auth**: Bearer JWT
**Query Parameters**: Same as the current active search but with `sort={newSortValue}` and `page=1`

**Sort Values**:
```
sort=distance       → "Distance (nearest first)" — DEFAULT
sort=rating         → "Rating (highest first)"
sort=price_low      → "Price (low to high)"
sort=price_high     → "Price (high to low)"
sort=newest         → "Newest caregivers first"
```

**Screen Elements Updated**: Results grid refreshes with new ordering. Pagination resets to page 1.

**Notes**: Sort is server-side. The wireframe notes that client-side sorting is acceptable for smaller result sets, but the API supports sort parameters directly, which is preferred for correctness when pagination is active.

---

#### Interaction 4: Paginate Results

**Trigger**: USER ACTION — clicking a page number, "← Previous", or "Next →"

**Endpoint**: `GET /caregivers`
**Auth**: Bearer JWT
**Query Parameters**: Same as current active search but with `page={selectedPage}`

**Screen Elements Updated**: Results grid replaces with new page of cards. Pagination controls highlight the new current page.

**Notes**: URL updates to `/search?page=2` (shareable). Focus moves to the first caregiver card on the new page (accessibility requirement).

---

#### Interaction 5: Add / Remove Favorite

**Trigger**: USER ACTION — clicking the heart icon on a caregiver card

**Add**: `POST /favorites/:caregiverId`
**Remove**: `DELETE /favorites/:caregiverId`
**Auth**: Bearer JWT

**GAP-SB-001**: Neither `POST /favorites/:caregiverId` nor `DELETE /favorites/:caregiverId` exists in the API specification. The wireframe documents these paths explicitly (Section 7.3, "API call: POST/DELETE `/api/favorites/:caregiverId`") but they have no corresponding entry in `docs/technical/api-specification-tier1.md`. This is a required interaction — the "Add to Favorites" heart on every search card depends on it. See Section 10.

**Screen Elements Updated**:
- Heart icon fills (favorited) or empties (unfavorited) on the card
- Toast notification: "Sarah K. added to favorites" or "Removed from favorites"

---

#### Interaction 6: WebSocket — Unread Message Count Badge

**Trigger**: REAL-TIME — `new_message` WebSocket event

**Screen Elements Updated**:
- Navigation header "Messages" badge count incremented by 1

No API call required. Badge update is driven purely by the WebSocket event.

---

### 2.3 Caregiver Search — Call Summary Table

| # | Endpoint | Method | Trigger | Section Populated |
|---|----------|--------|---------|-------------------|
| 1 | `/users/me` | GET | Page load | Search bar postcode auto-fill, nav header |
| 2 | `/caregivers?postcode=&radius=` | GET | User action (Search button) | Results grid, result count, pagination |
| 3 | `/caregivers?postcode=&...filters` | GET | User action (Apply Filters / remove filter tag) | Results grid refresh |
| 4 | `/caregivers?...&sort=` | GET | User action (Sort dropdown) | Results grid re-order |
| 5 | `/caregivers?...&page=N` | GET | User action (Pagination) | Results grid page N |
| 6 | `/favorites/:caregiverId` (**GAP**) | POST/DELETE | User action (heart icon) | Card heart state + toast |
| — | WebSocket `new_message` | WS | Real-time | Messages badge count |

**Total page-load calls**: 1
**Total potential user-action calls**: Multiple (one search call per query, one per favorite toggle)

---

## 3. SCR-CR-005: Caregiver Profile (Public View)

**Route**: `/caregivers/:caregiverId`
**Role**: Care Receiver, Family Member (also accessible unauthenticated for browsing)
**Screen JSON**: `docs/tiers/tier1/figma/screens/search-caregiver-profile.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/search/scr-cr-005-caregiver-profile.md`

### 3.1 Page Load Calls

The profile screen is information-dense and loads the majority of its data from a single endpoint. The availability calendar and reviews are part of the `GET /caregivers/:id` response, making this an efficient single-call page for the primary content.

---

#### Call 1: Caregiver Full Profile

**Trigger**: PAGE LOAD
**Endpoint**: `GET /caregivers/:id`
**Auth**: Bearer JWT (authenticated) or unauthenticated (public browsing — distance not shown)
**Path Parameter**: `:id` from the URL (e.g., `/caregivers/uuid-123`)

**Screen Elements Populated**:
- **Profile Header** (`section-profile-header`):
  - Profile photo (large, 400x400px desktop): `data.profilePhotoUrl`
  - Caregiver name (H1): `data.firstName` + `data.lastName` (last initial only for privacy)
  - Location: Postcode district derived from `data.postcode` (e.g., "SW1A area" — district, not full postcode)
  - Distance: `data.distance` (only shown if user is authenticated and has a postcode)
  - Verification badges row: `data.verification.dbsVerified`, `data.verification.idVerified`, `data.verification.rightToWorkVerified`
  - "New Caregiver" badge: shown if `data.totalReviews === 0`
  - "Fully booked this week" badge: derived from availability data (see notes)
  - Average rating (large): `data.reviews.averageRating`
  - Review count: `data.reviews.totalCount`
  - Hourly rate: `data.hourlyRate`
  - "Request Booking" CTA: enabled unless caregiver is inactive or user is unauthenticated
  - Acceptance rate and response time (Block 8): see GAP-SB-002

- **About Section** (`section-about`):
  - Bio (full text): `data.bio`
  - Years of experience: `data.yearsExperience`
  - Languages spoken: `data.languagesSpoken` (flag icons + labels)
  - Has vehicle: `data.hasVehicle` → "Has own vehicle" or "Uses public transport"

- **Services Offered** (`section-services`):
  - Checkmarks for each service in `data.servicesOffered`
  - Services NOT offered remain greyed out (list is fixed at Tier 1)

- **Availability Calendar** (`section-availability`):
  - `data.availability.recurring` — recurring weekly slots displayed as green calendar dates
  - `data.availability.unavailable` — blocked dates displayed as grey (not clickable)
  - Booked slots: see GAP-SB-003

- **Reviews Section** (`section-reviews`):
  - `data.reviews.distribution` — star rating distribution bar chart (5→1 star)
  - `data.reviews.averageRating` — "4.8 out of 5 stars"
  - `data.reviews.totalCount` — "Based on 24 reviews"
  - `data.reviews.recent` — initial list of up to 10 reviews (most recent first), each containing:
    - `reviewerName`, `rating`, `reviewDate`, `serviceTypes`, `reviewText`, `caregiverResponse`

- **Verification Details Section** (`section-verification`):
  - `data.verification.idVerified`, `data.verification.idVerifiedDate`
  - `data.verification.rightToWorkVerified`, `data.verification.rightToWorkVerifiedDate`
  - `data.verification.dbsVerified`, `data.verification.dbsVerifiedDate` (conditional)
  - DBS certificate number partial display: see GAP-SB-004

**Response Fields Used**:
```
data.id                          → used in "Request Booking" CTA: /bookings/new/:id
data.firstName                   → display name
data.lastName                    → last initial only (privacy)
data.profilePhotoUrl             → large profile photo
data.bio                         → full bio text
data.yearsExperience             → "8 years of experience"
data.servicesOffered             → checkmark list
data.hourlyRate                  → "From £20/hour"
data.platformCommissionRate      → tooltip "Platform adds 15% service fee" [PLACEHOLDER: FDR-008]
data.postcode                    → derive "SW1A area" (district, not full postcode)
data.serviceRadiusMiles          → (internal, not displayed on public profile)
data.languagesSpoken             → languages row
data.hasVehicle                  → transportation indicator
data.averageRating               → star display
data.totalReviews                → review count badge
data.verification.*              → all verification badge data and dates
data.availability.recurring      → calendar green slots
data.availability.unavailable    → calendar grey blocked dates
data.reviews.distribution        → star bar chart
data.reviews.recent              → review cards (up to 10)
data.profileStatus               → must be "approved" for profile to render (else 404 or inactive state)
```

**Notes**: The `GET /caregivers/:id` response includes the `reviews.recent` array with the most recent reviews embedded. This avoids a separate reviews call for the initial page load. The "Show more reviews" interaction (Interaction 2) triggers a separate paginated call.

The "Fully booked this week" state is derived client-side: if the `data.availability.recurring` slots exist but are fully covered by booked bookings for the next 7 days, the badge appears. However, booked slots are not included in the `GET /caregivers/:id` response — see GAP-SB-003.

---

#### Call 2: Current User Profile (for distance calculation and "Request Booking" button state)

**Trigger**: PAGE LOAD (authenticated users only)
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `data.postcode` → used client-side to calculate and display `"1.2 miles from you"` on the profile header
- Determines whether the "Request Booking" button is enabled (unauthenticated users see "Log In to Request")

**Response Fields Used**:
```
data.postcode        → haversine distance calculation vs caregiver postcode
data.accountStatus   → if suspended, disable "Request Booking" CTA
```

**Notes**: This call may already be cached from the navigation layer (shared JWT validation call across all authenticated screens). If the application has a global user context, this may not need to be a discrete call on the profile page.

---

#### Call 3: Check Favorite Status

**GAP-SB-001** (same gap as search screen): There is no `GET /favorites` or `GET /favorites/:caregiverId` endpoint to determine whether the current user has already favorited this caregiver. The "Add to Favorites" heart icon cannot reflect the correct initial state (filled vs empty) without this. See Section 10.

---

### 3.2 User Interaction Calls (SCR-CR-005)

---

#### Interaction 1: Add / Remove Favorite

**Trigger**: USER ACTION — clicking the heart icon in the profile header

**Add**: `POST /favorites/:caregiverId`
**Remove**: `DELETE /favorites/:caregiverId`
**Auth**: Bearer JWT

**GAP-SB-001**: No favorites endpoints exist. See Section 10.

**Screen Elements Updated**:
- Heart icon fills or empties
- Toast: "Sarah K. added to favorites" or "Removed from favorites"

---

#### Interaction 2: Show More Reviews (Pagination)

**Trigger**: USER ACTION — clicking "Show more reviews" button

**GAP-SB-005**: There is no standalone reviews endpoint in the API specification. The `GET /caregivers/:id` response embeds up to 10 recent reviews in `data.reviews.recent`, but there is no `GET /caregivers/:id/reviews?page=2&sort=recent` endpoint to load additional review pages. The "Show more reviews" button and review sort dropdown both require this. See Section 10.

---

#### Interaction 3: Select Availability Date / Time Slot

**Trigger**: USER ACTION — clicking an available date in the calendar, then a time slot

**No API call on date/time selection**. The calendar data is already loaded from `GET /caregivers/:id` (Call 1). Date selection is client-side state management. The selected date and time slot are stored in client state and passed as query parameters when the user navigates to the booking request form.

**Navigation**: Clicking "Request Booking" (or "Request Booking for Wed 10am" if a slot is pre-selected) navigates to `/bookings/new/:caregiverId?date=2026-03-07&time=09:00`.

---

#### Interaction 4: Request Booking Button

**Trigger**: USER ACTION — clicking "Request Booking" (or sticky bottom bar on mobile)
**Action**: Client-side navigation to `/bookings/new/:caregiverId`
**No API call**: Navigation only. The booking form (SCR-CR-006) makes its own API calls on load.

---

#### Interaction 5: Share Profile

**Trigger**: USER ACTION — clicking the share icon
**Action**: JavaScript `navigator.clipboard.writeText(window.location.href)` — no API call
**Screen Elements Updated**: Toast "Profile link copied to clipboard"

---

### 3.3 Caregiver Profile — Call Summary Table

| # | Endpoint | Method | Trigger | Section Populated |
|---|----------|--------|---------|-------------------|
| 1 | `/caregivers/:id` | GET | Page load | Entire profile — header, about, services, availability, reviews, verification |
| 2 | `/users/me` | GET | Page load (auth only) | Distance calculation, "Request Booking" button enabled state |
| 3 | `/favorites/:caregiverId` (**GAP**) | GET | Page load | Heart icon initial state (favorited vs unfavorited) |
| 4 | `/favorites/:caregiverId` (**GAP**) | POST/DELETE | User action (heart icon) | Heart icon state + toast |
| 5 | `/caregivers/:id/reviews` (**GAP**) | GET | User action ("Show more reviews") | Reviews section pagination |

**Total page-load calls**: 2 (3 if favorites status endpoint existed)

---

## 4. SCR-CR-006: Booking Request Form

**Route**: `/bookings/new/:caregiverId`
**Role**: Care Receiver, Family Member
**Screen JSON**: `docs/tiers/tier1/figma/screens/booking-request-form.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/booking/scr-cr-006-booking-request-form.md`

### 4.1 Page Load Calls

The form requires caregiver data (for the summary card and date picker), payment method status (for the warning banner), and the user's emergency contact (for auto-fill). All three must resolve before the form is fully interactive.

---

#### Call 1: Caregiver Summary (for the booking context card)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /caregivers/:id`
**Auth**: Bearer JWT
**Path Parameter**: `:caregiverId` from the route `/bookings/new/:caregiverId`

**Screen Elements Populated**:
- `section-caregiver-summary` — the top-of-form caregiver context card:
  - Profile photo (80x80px): `data.profilePhotoUrl`
  - Caregiver name: `data.firstName` + `data.lastName`
  - Rating: `data.averageRating` and `data.totalReviews`
  - Hourly rate: `data.hourlyRate` (used in real-time price calculation)
  - Distance: requires care receiver postcode from Call 3
  - Verification badges: `data.verification.idVerified`, `data.verification.dbsVerified`
  - "Companionship Services Only" badge: from `data.servicesOffered`
- `section-booking-details` — date picker availability highlighting:
  - `data.availability.recurring` → highlight available dates in green
  - `data.availability.unavailable` → grey out blocked dates
- `section-price-summary` — pre-loads `data.hourlyRate` into the price calculation formula

**Response Fields Used**:
```
data.firstName               → caregiver summary card name
data.lastName                → last initial
data.profilePhotoUrl         → summary card photo
data.hourlyRate              → price calculation seed value
data.averageRating           → star display on summary card
data.totalReviews            → review count on summary card
data.verification.idVerified → "Identity Verified" badge
data.verification.dbsVerified → "DBS Verified" badge (conditional)
data.servicesOffered         → "Companionship Services Only" badge
data.availability.recurring  → date picker available dates (green)
data.availability.unavailable → date picker blocked dates (grey)
```

**Notes**: If the caregiver returns a 404 (profile no longer active) or is unavailable, the form must display an error: "This caregiver is no longer accepting bookings. Please search for another caregiver." The form must not render in a partially-loaded state.

**GAP-SB-003**: The `GET /caregivers/:id` availability data shows recurring availability and manually blocked dates, but does not include dates that are blocked because the caregiver already has an accepted booking. A date that appears green in the calendar may actually be booked. The server-side validation on `POST /bookings` will catch this, but the date picker will mislead the user by showing a date as available when it is not. See Section 10.

---

#### Call 2: Payment Method Status (for warning banner)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /payments/methods`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `section-payment-warning-banner` — shown if `data.paymentMethods.length === 0`, hidden otherwise
- When shown: "Add a payment method to continue" warning banner with "Add Payment Method" CTA → `/settings/payment`
- When hidden: "Send Request" button is enabled (payment method exists)
- `data.defaultPaymentMethodId` — stored in client state for inclusion in `POST /bookings` request body

**Response Fields Used**:
```
data.paymentMethods.length === 0    → show warning banner, disable "Send Request" button
data.defaultPaymentMethodId         → stored client-side for booking creation payload
```

**Notes**: If no payment method exists, the form fields remain visible but the "Send Request" button is disabled. The user must navigate to the payment settings screen and return before they can submit.

---

#### Call 3: Current User Profile (for emergency contact auto-fill and distance)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- `section-emergency-contact` — auto-fills all three emergency contact fields:
  - Emergency Contact Name: `data.emergencyContactName`
  - Emergency Contact Phone: `data.emergencyContactPhone`
  - Relationship: `data.emergencyContactRelationship`
- Caregiver summary card distance: `data.postcode` used to calculate distance from `GET /caregivers/:id` postcode

**Response Fields Used**:
```
data.emergencyContactName           → pre-fills Emergency Contact Name field
data.emergencyContactPhone          → pre-fills Emergency Contact Phone field
data.emergencyContactRelationship   → pre-fills Relationship dropdown
data.postcode                       → distance calculation for summary card
```

**GAP-SB-006**: The `GET /users/me` response schema in the API spec does not include `emergencyContactName`, `emergencyContactPhone`, or `emergencyContactRelationship` fields. These fields are documented in `PUT /care-receivers/me` as writable, but the `/users/me` read response does not include them. The booking form cannot auto-fill the emergency contact section without this data. See Section 10.

---

### 4.2 User Interaction Calls (SCR-CR-006)

---

#### Interaction 1: Real-Time Price Calculation

**Trigger**: USER ACTION — changing the Duration radio button selection

**No API call**: Price calculation is entirely client-side using values already loaded:
- `hourlyRate` from `GET /caregivers/:id` (Call 1)
- `duration` from the user's radio button selection (2, 3, 4, 6, or 8 hours)
- `serviceFeeRate` from hardcoded constant (15% — pending FDR-008)

**Calculation**:
```
subtotal     = hourlyRate × durationHours
serviceFee   = subtotal × 0.15
totalCharge  = subtotal + serviceFee
```

**Screen Elements Updated**: The `section-price-summary` sidebar (desktop) or block (mobile/tablet) updates immediately with the new subtotal, service fee, and total. A subtle fade-in animation accompanies the update.

---

#### Interaction 2: Submit Booking Request ("Send Request" button)

**Trigger**: USER ACTION — clicking "Send Request" after form validation passes

**Step 1 — Client-side validation**: All fields validated before API call. Invalid fields show inline errors. Submission blocked if:
- Date not selected or not in caregiver's available dates
- Start time not selected
- Duration not selected
- Emergency contact name/phone/relationship blank
- Cancellation policy checkbox unchecked
- No payment method on file

**Step 2 — API call**:

**Endpoint**: `POST /bookings`
**Auth**: Bearer JWT
**Request Body**:
```json
{
  "caregiverId": "uuid",
  "bookingDate": "2026-03-06",
  "startTime": "2026-03-06T10:00:00Z",
  "endTime": "2026-03-06T14:00:00Z",
  "durationHours": 4,
  "serviceTypes": ["companionship", "light_housework"],
  "specialRequests": "I'd like to go for a walk if the weather is nice.",
  "paymentMethodId": "pm_abc123"
}
```

**Notes**: The emergency contact fields entered on this form are submitted alongside the booking but the API request body documented in the spec does not include them. See GAP-SB-007.

**On Success (201)**:
- Success modal: "Booking Request Sent! Mary has 24 hours to respond."
- Auto-redirect to `/bookings/:bookingId` (SCR-CR-008) after 3 seconds
- Payment is authorized (held, not captured) by Stripe on the server side

**On Error**:
- 400 `CAREGIVER_NOT_AVAILABLE`: "This caregiver is no longer available for the selected date/time."
- 400 `PAYMENT_AUTH_FAILED`: "Unable to authorize payment. Please check your payment method."
- 404: Caregiver not found (stale data) → redirect to search

---

#### Interaction 3: Check Caregiver Availability for Selected Date

**Trigger**: USER ACTION — selecting a date in the date picker

**No dedicated API call**: Date availability is determined from the `data.availability` already loaded in Call 1. However, this data does not include already-booked slots (GAP-SB-003). The date picker highlights available dates based only on recurring schedule and manually blocked dates. Final availability confirmation happens on the server at `POST /bookings` time.

---

### 4.3 Booking Request Form — Call Summary Table

| # | Endpoint | Method | Trigger | Section Populated |
|---|----------|--------|---------|-------------------|
| 1 | `/caregivers/:id` | GET | Page load | Caregiver summary card, date picker availability, price calculation seed |
| 2 | `/payments/methods` | GET | Page load | Payment warning banner (conditional) |
| 3 | `/users/me` | GET | Page load | Emergency contact auto-fill, distance calculation |
| 4 | `/bookings` | POST | User action (Send Request) | Creates booking, triggers success modal + redirect |

**Total page-load calls**: 3
**Total potential user-action calls**: 1 (booking submission)

---

## 5. SCR-CR-008: Booking Detail (Care Receiver View)

**Route**: `/bookings/:bookingId`
**Role**: Care Receiver, Family Member
**Screen JSON**: `docs/tiers/tier1/figma/screens/booking-detail.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/booking/scr-cr-008-booking-detail.md`

**Architecture Note**: This screen and SCR-CG-013 share the same route `/bookings/:bookingId`. The server renders role-appropriate data within the `GET /bookings/:id` response (contact details only visible after acceptance, earnings breakdown for caregiver, charge breakdown for care receiver). See SCR-CG-013 for the caregiver view.

### 5.1 Page Load Calls

The booking detail screen is driven almost entirely by a single endpoint. All 14 booking states are rendered from this one response, with additional calls only for real-time features.

---

#### Call 1: Booking Details

**Trigger**: PAGE LOAD
**Endpoint**: `GET /bookings/:id`
**Auth**: Bearer JWT
**Path Parameter**: `:bookingId` from the route

**Screen Elements Populated**:
- **Page Header** (`section-page-header`):
  - H1: `"Booking with " + data.caregiver.firstName`
  - Status badge (large, prominent): derived from `data.status`
  - Countdown timer: for `status = requested` → `data.responseDeadline - now()`; for `status = completed` → `data.timeline.completedAt + 48h - now()`

- **Alert Banner** (`section-alert-banner`) — content is determined by `data.status`:
  - `requested`: "Awaiting caregiver response. Mary has 24 hours to accept or decline."
  - `accepted`: "Booking confirmed. Contact details are now available."
  - `in_progress`: "Session in progress. Emergency Contact: [name] ([relationship]) - [phone]"
  - `completed`: "Confirm completion within 48 hours."
  - `declined`: "Booking declined. Reason: [decline reason]. Payment authorization released."
  - `expired`: "Booking expired. No response within 24 hours."
  - `cancelled`: "Booking cancelled. Refund: £[amount]."
  - `disputed`: "Dispute under review by admin team."

- **Caregiver Information Card** (`section-caregiver-info`):
  - Photo: `data.caregiver.profilePhotoUrl` (if included in response)
  - Name: `data.caregiver.firstName` + `data.caregiver.lastName`
  - Rating, verification badges: require additional data — see GAP-SB-008
  - Contact details (phone + "Call" button): `data.caregiver.phone` — ONLY if `data.status IN (accepted, in_progress, completed, payment_released, reviewed)`
  - "Message Caregiver" button: requires `conversationId` — see GAP-CR-001 (previously identified in dashboard mapping)

- **Booking Details** (`section-booking-details`):
  - Date: `data.bookingDate` formatted as "Wednesday, March 6, 2026"
  - Time: `data.startTime` to `data.endTime` formatted as "10:00 AM - 2:00 PM"
  - Duration: `data.durationHours`
  - Service type icons: `data.serviceTypes`
  - Full address: `data.location.fullAddress` (care receiver always sees their own address)
  - Special requests: `data.specialRequests`
  - Emergency contact: `data.careReceiver.emergencyContact.name`, `.relationship`, `.phone`

- **Payment Details** (`section-payment-details`):
  - Service + rate + subtotal: `data.pricing.hourlyRate` × `data.durationHours`
  - Platform service fee (15%): derived from `data.pricing`
  - Total: `data.pricing.totalCareReceiverCharge`
  - Payment status text: derived from `data.status` + `data.paymentStatus`

- **Booking History Timeline** (`section-booking-history`) — visible for completed/later states:
  - `data.timeline.requestedAt`
  - `data.timeline.acceptedAt`
  - `data.timeline.startedAt`
  - `data.timeline.completedAt`

**Response Fields Used**:
```
data.id                              → action button targets (cancel, confirm, dispute)
data.status                          → drives entire page state — banner, actions, payment text
data.caregiver.firstName             → H1 + caregiver card
data.caregiver.lastName              → caregiver card name
data.caregiver.phone                 → contact details (post-acceptance only)
data.careReceiver.emergencyContact   → emergency contact section
data.bookingDate                     → date display
data.startTime                       → time range start
data.endTime                         → time range end
data.durationHours                   → duration
data.serviceTypes                    → service type icon labels
data.specialRequests                 → special requests display
data.location.fullAddress            → full address (care receiver view)
data.pricing.hourlyRate              → price breakdown
data.pricing.totalCareReceiverCharge → total charge display
data.paymentStatus                   → payment status text ("authorized", "captured", etc.)
data.responseDeadline                → countdown timer (requested state)
data.timeline.requestedAt            → booking history
data.timeline.acceptedAt             → booking history
data.timeline.startedAt              → booking history + "started N minutes ago"
data.timeline.completedAt            → booking history + 48h countdown seed
```

**GAP-SB-008**: The `GET /bookings/:id` response includes `data.caregiver.firstName`, `data.caregiver.lastName`, and `data.caregiver.phone`, but does not include `data.caregiver.profilePhotoUrl`, `data.caregiver.averageRating`, `data.caregiver.totalReviews`, or `data.caregiver.verification` (badge display). The caregiver info card on the booking detail needs these fields. Without them, the card cannot display the caregiver's photo, star rating, or verification badges. See Section 10.

**GAP-CR-001** (previously identified): `data.conversationId` is missing from the booking response. The "Message Caregiver" button cannot navigate to the correct message thread without it.

---

#### Call 2: Current User Profile (for nav header)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- Navigation header user name and avatar
- Role verification (care receiver — ensures correct page variant renders)

**Response Fields Used**:
```
data.firstName   → nav header
data.userType    → must be care_receiver or family_member (else redirect to caregiver view)
```

---

### 5.2 User Interaction Calls (SCR-CR-008)

---

#### Interaction 1: Cancel Booking Request (State: requested or accepted)

**Trigger**: USER ACTION — "Cancel Booking" / "Cancel Request" button → confirmation modal → "Confirm Cancellation"

**Endpoint**: `PUT /bookings/:id/cancel`
**Auth**: Bearer JWT
**Request Body**:
```json
{
  "reason": "no_longer_needed"
}
```

**On Success (200)**:
- Page reloads with `status = cancelled`
- Alert banner updates to cancellation variant with refund amount
- All action buttons hidden
- Success modal: "Booking Cancelled. Refund: £75.60 (full refund). Processing time: 3-5 business days."

**On Error**:
- 400: Booking cannot be cancelled in current state (e.g., in_progress)
- 403: Not authorised (session issue)

---

#### Interaction 2: Confirm Completion (State: completed)

**Trigger**: USER ACTION — "Confirm Completion" button → confirmation modal → "Confirm"

**Endpoint**: `PUT /bookings/:id/confirm`
**Auth**: Bearer JWT
**Request Body**: None required

**On Success (200)**:
- Page reloads with `status = payment_released`
- Alert banner updates to "Payment released" variant
- Action buttons update: "Leave Review" (primary) + "Book Again" (secondary)
- Success modal: "Completion Confirmed. Payment of £75.60 released to Mary."

---

#### Interaction 3: Raise Dispute (State: completed)

**Trigger**: USER ACTION — "Raise Dispute" button → dispute form modal → submit

**Endpoint**: `PUT /bookings/:id/dispute`
**Auth**: Bearer JWT
**Request Body**:
```json
{
  "reason": "service_not_provided_as_agreed",
  "details": "Mary arrived 45 minutes late and left 30 minutes early."
}
```

**On Success (200)**:
- Page reloads with `status = disputed`
- Alert banner updates to "Dispute under review" variant
- All primary action buttons hidden; "Contact Support" secondary button shown

---

#### Interaction 4: WebSocket — Booking Status Change

**Trigger**: REAL-TIME — `booking_status_changed` WebSocket event

**WebSocket Event**:
```json
{
  "event": "booking_status_changed",
  "data": {
    "bookingId": "uuid",
    "oldStatus": "requested",
    "newStatus": "accepted",
    "timestamp": "2026-02-06T10:30:00Z"
  }
}
```

**Screen Elements Updated**:
- Status badge updates to new status
- Alert banner updates to new state variant
- Contact details section appears if `newStatus IN (accepted, in_progress)`
- Action buttons update to match new state
- Countdown timer hides (if was `requested` state) or appears (if `completed` state)

**Follow-up call**: The client should call `GET /bookings/:id` when a status change event arrives to get the updated record (particularly to retrieve contact details that were gated on acceptance).

---

#### Interaction 5: WebSocket — New Message Notification

**Trigger**: REAL-TIME — `new_message` WebSocket event

**Screen Elements Updated**: Navigation header "Messages" badge count incremented. No change to booking detail content.

---

### 5.3 Booking Detail (Care Receiver) — Call Summary Table

| # | Endpoint | Method | Trigger | Section Populated |
|---|----------|--------|---------|-------------------|
| 1 | `/bookings/:id` | GET | Page load | Entire screen — all 14 states |
| 2 | `/users/me` | GET | Page load | Nav header, role verification |
| 3 | `/bookings/:id/cancel` | PUT | User action (Cancel Booking) | Status → cancelled, refund info |
| 4 | `/bookings/:id/confirm` | PUT | User action (Confirm Completion) | Status → payment_released |
| 5 | `/bookings/:id/dispute` | PUT | User action (Raise Dispute) | Status → disputed |
| 6 | `/bookings/:id` | GET | Real-time (WS status change) | Full page refresh on status update |
| — | WebSocket `booking_status_changed` | WS | Real-time | Status badge, banner, actions, contact details |
| — | WebSocket `new_message` | WS | Real-time | Messages badge count |

**Total page-load calls**: 2
**Total potential user-action calls**: 1 (one action per state, mutually exclusive by state)

---

## 6. SCR-CG-013: Booking Request Detail (Caregiver View)

**Route**: `/bookings/:bookingId` (same route as SCR-CR-008, role-based rendering)
**Role**: Caregiver
**Screen JSON**: `docs/tiers/tier1/figma/screens/booking-request-detail-caregiver.json`
**Wireframe**: `docs/tiers/tier1/draft-design-specs/wireframes/booking/scr-cg-013-booking-request-detail.md`

**Architecture Note**: The server uses the authenticated user's role to determine which variant of the booking detail to return. Caregivers see earnings data, Accept/Decline actions, and privacy-limited care receiver info (before acceptance). The API endpoint is identical to SCR-CR-008.

### 6.1 Page Load Calls

---

#### Call 1: Booking Details (Caregiver Variant)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /bookings/:id`
**Auth**: Bearer JWT (Caregiver role)
**Path Parameter**: `:bookingId` from the route

**Screen Elements Populated**:
- **Page Header** (`section-page-header`):
  - H1: `"Booking Request from " + data.careReceiver.name` (first name + last initial before acceptance)
  - Status badge: derived from `data.status` with caregiver-specific labels:
    - `requested` → "PENDING YOUR RESPONSE"
    - `accepted` → "ACCEPTED"
    - `declined` → "DECLINED"
    - `expired` → "EXPIRED"
    - `completed` → "COMPLETED"
  - Countdown timer: `data.responseDeadline - now()` (for `status = requested`)

- **Alert Banner** (`section-alert-banner`) — state-driven:
  - `requested`: "Respond within 24 hours. [Accept Booking] [Decline Booking]"
  - `accepted`: "Booking accepted. Care receiver contact details now available."
  - `in_progress`: "Session in progress. Mark complete when finished. [Mark Complete]"
  - `completed`: "Awaiting care receiver confirmation. Earnings: £61.20 (pending release)."
  - `declined`: "You declined this request. Reason: [reason]"
  - `expired`: "Request expired. Auto-declined due to no response."

- **Care Receiver Information Card** (`section-care-receiver-info`):
  - **Before acceptance** (`status = requested`): first name + last initial, town/area, distance
  - **After acceptance** (`status IN (accepted, in_progress, completed, payment_released)`): full name, address, phone, emergency contact

- **Booking Details** (`section-booking-details`):
  - Date: `data.bookingDate`
  - Time: `data.startTime` to `data.endTime`
  - Duration: `data.durationHours`
  - Service types: `data.serviceTypes`
  - Special requests: `data.specialRequests`

- **Earnings Breakdown** (`section-earnings`):
  - Service label + rate: `data.pricing.hourlyRate`
  - Subtotal: `data.pricing.hourlyRate` × `data.durationHours`
  - Platform commission (15% deduction): `data.pricing.platformCommission` [PLACEHOLDER: FDR-008]
  - **Net Earnings** (large, bold, green): `data.pricing.caregiverEarnings`
  - Payment timeline text: state-dependent ("Paid 2-3 business days after confirmation")

- **Booking History Timeline** (`section-booking-history`) — visible for completed/later states

**Response Fields Used**:
```
data.id                             → accept/decline/complete action targets
data.status                         → drives entire caregiver page state
data.careReceiver.name              → H1 ("Request from John S.")
data.careReceiver.phone             → contact card (post-acceptance only)
data.careReceiver.emergencyContact  → emergency contact display (post-acceptance)
data.location.fullAddress           → care receiver address (post-acceptance only)
data.bookingDate                    → booking details
data.startTime                      → time range
data.endTime                        → time range
data.durationHours                  → duration
data.serviceTypes                   → services
data.specialRequests                → special requests (visible before acceptance)
data.pricing.hourlyRate             → earnings calculation
data.pricing.caregiverEarnings      → net earnings display (primary metric)
data.pricing.platformCommission     → commission deduction line item
data.responseDeadline               → countdown timer seed
data.timeline.*                     → booking history entries
```

**Notes**: The `data.location.fullAddress` and `data.careReceiver.phone` fields are gated on acceptance — the server omits them when `status = requested` to protect the care receiver's privacy. The caregiver sees only `data.careReceiver.name` (first name + last initial) and a postcode district before committing.

**GAP-SB-009**: The `GET /bookings/:id` response's `data.careReceiver` object does not appear to include `distance` (miles from the caregiver's location). The booking request detail wireframe prominently shows "3.2 miles from you" in the care receiver information card to help the caregiver assess travel. Without this, the caregiver cannot quickly evaluate whether the booking is worth accepting. See Section 10.

---

#### Call 2: Current User Profile (for nav header)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- Navigation header user name, avatar
- Role check: `data.userType === 'caregiver'` ensures caregiver view renders

---

### 6.2 User Interaction Calls (SCR-CG-013)

---

#### Interaction 1: Accept Booking (State: requested)

**Trigger**: USER ACTION — "Accept Booking" button → (no confirmation modal needed) → immediate API call

**Endpoint**: `PUT /bookings/:id/accept`
**Auth**: Bearer JWT (Caregiver)
**Request Body**: None

**On Success (200)**:
- Success modal: "Booking Accepted! Net earnings: £61.20. Care receiver contact details now available."
- Page reloads with `status = accepted`
- Care receiver contact details become visible in `section-care-receiver-info`
- Alert banner updates to "Booking accepted" variant

**On Error**:
- 400 `SCHEDULING_CONFLICT`: "You have a scheduling conflict. Please decline this request."
- 400 `PAYMENT_AUTH_EXPIRED`: "This booking request has expired." (care receiver's payment hold lapsed)

---

#### Interaction 2: Decline Booking (State: requested)

**Trigger**: USER ACTION — "Decline Booking" button → decline reason modal → submit

**Endpoint**: `PUT /bookings/:id/decline`
**Auth**: Bearer JWT (Caregiver)
**Request Body**:
```json
{
  "reason": "scheduling_conflict",
  "message": "I have another booking at this time. Please feel free to request another booking for a different date."
}
```

**GAP-SB-010**: The `PUT /bookings/:id/decline` endpoint request body in the API spec does not include a `message` field for the optional caregiver message to the care receiver. The wireframe's decline reason modal collects both a `reason` (required, dropdown) and an optional `message` (300 chars, textarea). Without the `message` field in the request, caregivers cannot send a personalised decline message. See Section 10.

**On Success (200)**:
- Success modal: "Booking Declined. Your decline reason has been sent to the care receiver."
- Page reloads with `status = declined`
- Option: redirect to caregiver dashboard

---

#### Interaction 3: Mark Session Complete (State: in_progress)

**Trigger**: USER ACTION — "Mark Complete" button → optional session notes modal → submit

**Endpoint**: `PUT /bookings/:id/complete`
**Auth**: Bearer JWT (Caregiver)
**Request Body** (optional):
```json
{
  "sessionNotes": "Great session. We went for a walk and then had tea."
}
```

**GAP-SB-011**: The `PUT /bookings/:id/complete` endpoint request body in the API spec does not include a `sessionNotes` field. The wireframe documents that the caregiver can optionally add session notes (500 chars, admin-visible only) when marking a session complete. See Section 10.

**On Success (200)**:
- Success modal: "Session Marked Complete. Earnings pending care receiver confirmation."
- Page reloads with `status = completed`
- Alert banner: "Awaiting care receiver confirmation. Earnings: £61.20 (pending release)."

---

#### Interaction 4: WebSocket — Booking Status Change

**Trigger**: REAL-TIME — `booking_status_changed` WebSocket event (e.g., status changes to `payment_released` after care receiver confirms)

**Screen Elements Updated**:
- Status badge updates
- Alert banner updates (e.g., "Payment released" confirmation)
- Earnings display updates payment status text

**Follow-up call**: `GET /bookings/:id` to get the updated full record.

---

### 6.3 Booking Request Detail (Caregiver) — Call Summary Table

| # | Endpoint | Method | Trigger | Section Populated |
|---|----------|--------|---------|-------------------|
| 1 | `/bookings/:id` | GET | Page load | Entire screen — status, care receiver info, booking details, earnings |
| 2 | `/users/me` | GET | Page load | Nav header, role verification |
| 3 | `/bookings/:id/accept` | PUT | User action (Accept Booking) | Status → accepted, contact details appear |
| 4 | `/bookings/:id/decline` | PUT | User action (Decline Booking + reason) | Status → declined |
| 5 | `/bookings/:id/complete` | PUT | User action (Mark Complete) | Status → completed, starts 48h window |
| 6 | `/bookings/:id` | GET | Real-time (WS status change) | Full record refresh |
| — | WebSocket `booking_status_changed` | WS | Real-time | Status badge, banner, earnings payment status |

**Total page-load calls**: 2
**Total potential user-action calls**: 1 per state (accept, decline, or mark complete — mutually exclusive)

---

## 7. SCR-CR-008B: Bookings List (Care Receiver)

**Route**: `/bookings` (care receiver context)
**Role**: Care Receiver, Family Member
**Screen JSON**: `docs/tiers/tier1/figma/screens/bookings-list-care-receiver.json`
**Wireframe**: (List screen — no dedicated wireframe markdown; screen JSON is the primary spec)

**Architecture Note**: This screen was identified in the gap analysis (2026-02-12) and added as a list view. It displays all of the care receiver's bookings across all statuses with tab-based filtering.

### 7.1 Page Load Calls

---

#### Call 1: Current User Profile

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- Navigation header user name and avatar
- Page H1 greeting

**Response Fields Used**:
```
data.firstName    → "My Bookings" header subtext
data.userType     → role verification
```

---

#### Call 2: Care Receiver Bookings List (Default: All Active)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /care-receivers/me/bookings`
**Auth**: Bearer JWT
**Query Parameters**:
```
status=requested,accepted,in_progress   (default: all active states)
page=1
limit=10
sort=startTime_asc
```

**Screen Elements Populated**:
- `section-bookings-list` — the list of `booking-list-card` components (one per booking)
- Tab active count badge: `pagination.totalCount`
- Empty state if no bookings in this status group

**Response Fields Used Per Card**:
```
data.bookings[n].id               → "View Details" link: /bookings/:id
data.bookings[n].status           → status badge variant and colour
data.bookings[n].caregiver        → caregiver name (first name + last initial) and photo
data.bookings[n].bookingDate      → "Wednesday, 6 March 2026"
data.bookings[n].startTime        → "10:00 AM"
data.bookings[n].durationHours    → "4 hours"
data.bookings[n].serviceTypes     → service icon + label
data.bookings[n].pricing.totalCareReceiverCharge → total cost for this booking
data.bookings[n].responseDeadline → countdown timer for requested status cards
pagination.totalCount             → tab badge count
```

**GAP-CR-001** (previously identified): `conversationId` absent from list responses. "Message Caregiver" shortcut link on list cards cannot route to the correct thread.

**GAP-CR-002** (previously identified): No `hasReview` field on booking records.

---

### 7.2 User Interaction Calls (SCR-CR-008B)

---

#### Interaction 1: Switch Tab (All / Upcoming / Past / Cancelled)

**Trigger**: USER ACTION — clicking a tab in the tab bar

**Endpoint**: `GET /care-receivers/me/bookings`
**Auth**: Bearer JWT
**Query Parameters** (varies by tab):

| Tab | Status Filter |
|-----|--------------|
| All | *(no status filter — all bookings)* |
| Upcoming | `status=accepted,in_progress&startDate={today}` |
| Pending | `status=requested` |
| Past | `status=completed,payment_released,reviewed` |
| Cancelled | `status=cancelled,declined,expired` |

**Screen Elements Updated**: List refreshes with the new status-filtered results. Tab badge counts update.

---

#### Interaction 2: View Booking Detail

**Trigger**: USER ACTION — clicking a booking card or "View Details" link

**Action**: Client-side navigation to `/bookings/:id`
**No API call**: Navigation to SCR-CR-008 which makes its own page-load calls.

---

### 7.3 Bookings List (Care Receiver) — Call Summary Table

| # | Endpoint | Method | Trigger | Section Populated |
|---|----------|--------|---------|-------------------|
| 1 | `/users/me` | GET | Page load | Nav header |
| 2 | `/care-receivers/me/bookings?status=requested,accepted,in_progress` | GET | Page load | Default "Active" list |
| 3 | `/care-receivers/me/bookings?status={tabFilter}` | GET | User action (tab switch) | Refreshed list per tab |

**Total page-load calls**: 2
**Total potential user-action calls**: 1 per tab switch

---

## 8. SCR-CG-002: Bookings List (Caregiver)

**Route**: `/caregiver/bookings`
**Role**: Caregiver
**Screen JSON**: `docs/tiers/tier1/figma/screens/bookings-list-caregiver.json`
**Wireframe**: (List screen — no dedicated wireframe markdown; screen JSON is the primary spec)

**Architecture Note**: This screen is the caregiver equivalent of SCR-CR-008B. It uses a different endpoint (`GET /caregivers/me/bookings`) and shows caregiver-specific data including earnings per booking.

### 8.1 Page Load Calls

---

#### Call 1: Current User Profile

**Trigger**: PAGE LOAD
**Endpoint**: `GET /users/me`
**Auth**: Bearer JWT

**Screen Elements Populated**:
- Navigation header name and avatar
- Role verification (`data.userType === 'caregiver'`)

---

#### Call 2: Caregiver Bookings List (Default: Pending + Upcoming)

**Trigger**: PAGE LOAD
**Endpoint**: `GET /caregivers/me/bookings`
**Auth**: Bearer JWT
**Query Parameters**:
```
status=requested,accepted,in_progress
page=1
limit=10
sort=responseDeadline_asc        (most urgent pending requests first)
```

**Screen Elements Populated**:
- `section-bookings-list` — list of `booking-list-card` components (caregiver variant)
- Tab badge counts
- Empty state if no active bookings

**Response Fields Used Per Card**:
```
data.bookings[n].id                  → "View Details" link: /bookings/:id
data.bookings[n].status              → status badge ("Pending", "Confirmed", "In Progress")
data.bookings[n].careReceiverName    → "Margaret S."
data.bookings[n].bookingDate         → date display
data.bookings[n].startTime           → time display
data.bookings[n].durationHours       → duration
data.bookings[n].serviceTypes        → service type
data.bookings[n].caregiverEarnings   → net earnings for this booking (caregiver-specific)
data.bookings[n].distance            → "2.5 miles from you"
data.bookings[n].responseDeadline    → countdown timer for pending cards
pagination.totalCount                → tab badge count
```

---

### 8.2 User Interaction Calls (SCR-CG-002)

---

#### Interaction 1: Switch Tab

**Trigger**: USER ACTION — clicking a tab

**Endpoint**: `GET /caregivers/me/bookings`
**Auth**: Bearer JWT
**Query Parameters** (varies by tab):

| Tab | Status Filter |
|-----|--------------|
| Pending | `status=requested&sort=responseDeadline_asc` |
| Upcoming | `status=accepted,in_progress&startDate={today}&sort=startTime_asc` |
| Past | `status=completed,payment_released,reviewed` |
| Cancelled | `status=declined,expired,cancelled` |

**Screen Elements Updated**: List refreshes. Tab badge count updates.

---

#### Interaction 2: View Booking Detail

**Trigger**: USER ACTION — clicking a booking card
**Action**: Navigation to `/bookings/:id` (SCR-CG-013)
**No API call**: Navigation only.

---

### 8.3 Bookings List (Caregiver) — Call Summary Table

| # | Endpoint | Method | Trigger | Section Populated |
|---|----------|--------|---------|-------------------|
| 1 | `/users/me` | GET | Page load | Nav header, role verification |
| 2 | `/caregivers/me/bookings?status=requested,accepted,in_progress` | GET | Page load | Default active bookings list |
| 3 | `/caregivers/me/bookings?status={tabFilter}` | GET | User action (tab switch) | Refreshed list per tab |

**Total page-load calls**: 2
**Total potential user-action calls**: 1 per tab switch

---

## 9. Gap Summary

| Gap ID | Screen(s) | Description | Priority |
|--------|-----------|-------------|----------|
| **GAP-SB-001** | SCR-CR-003, SCR-CR-005 | No `POST /favorites/:caregiverId`, `DELETE /favorites/:caregiverId`, or `GET /favorites` endpoints exist. The "Add to Favorites" heart on every search card and caregiver profile cannot function, and the initial favorited state cannot be determined on page load. | HIGH |
| **GAP-SB-002** | SCR-CR-005 | No `acceptanceRate` or `averageResponseTimeHours` fields in the `GET /caregivers/:id` response. The profile's "Response time: Usually within 6 hours" and "Acceptance rate: 85%" sections (Block 8) have no data source. | LOW |
| **GAP-SB-003** | SCR-CR-005, SCR-CR-006 | The `GET /caregivers/:id` availability data includes recurring slots and manually blocked dates but does NOT include dates that are unavailable due to existing accepted bookings. The calendar on the profile and the date picker on the booking form both show these blocked dates as green (available) when they may already be taken. The booking form's "Select a date when [caregiver] is available" instruction is misleading. | MEDIUM |
| **GAP-SB-004** | SCR-CR-005 | The Verification Details section displays a partially obscured DBS certificate number ("****567890"). The `GET /caregivers/:id` response does not include a DBS certificate number or DBS Update Service subscription status field. | LOW |
| **GAP-SB-005** | SCR-CR-005 | No `GET /caregivers/:id/reviews` endpoint exists for paginated review loading. The "Show more reviews" button and review sort dropdown on the profile page both require pagination beyond the initial 10 embedded reviews in `data.reviews.recent`. | MEDIUM |
| **GAP-SB-006** | SCR-CR-006 | `GET /users/me` response does not include `emergencyContactName`, `emergencyContactPhone`, or `emergencyContactRelationship`. The booking form cannot auto-fill the emergency contact section without this data, requiring the care receiver to manually enter these details on every booking. | HIGH |
| **GAP-SB-007** | SCR-CR-006 | `POST /bookings` request body does not include emergency contact fields. The emergency contact collected on the booking form (name, phone, relationship) needs to either be saved to the booking record or trigger an update to the care receiver profile. Without a field in the POST body, the emergency contact override (if different from profile default) is lost. | HIGH |
| **GAP-SB-008** | SCR-CR-008 | `GET /bookings/:id` response `data.caregiver` object does not include `profilePhotoUrl`, `averageRating`, `totalReviews`, or `verification` fields. The caregiver information card on the booking detail cannot display the caregiver's photo, star rating, or verification badges. | MEDIUM |
| **GAP-SB-009** | SCR-CG-013 | `GET /bookings/:id` response `data.careReceiver` object does not include `distance` from the caregiver's location. The "3.2 miles from you" display in the care receiver info card (pre-acceptance) requires this. Without it, caregivers cannot quickly assess travel feasibility when deciding to accept. | MEDIUM |
| **GAP-SB-010** | SCR-CG-013 | `PUT /bookings/:id/decline` request body does not include a `message` field. The wireframe's decline reason modal collects an optional personalised message (300 chars) to send to the care receiver. This cannot be sent with the current request body schema. | LOW |
| **GAP-SB-011** | SCR-CG-013 | `PUT /bookings/:id/complete` request body does not include a `sessionNotes` field. The "Mark Complete" flow optionally collects session notes (500 chars, admin-visible only). | LOW |
| **GAP-CR-001** | SCR-CR-008, SCR-CR-008B | `GET /bookings/:id` and `GET /care-receivers/me/bookings` responses do not include `conversationId`. "Message Caregiver" button cannot link to the correct message thread. (Identified in dashboard mapping, confirmed in search/booking screens.) | HIGH |
| **GAP-CR-002** | SCR-CR-008B | No `hasReview` boolean on booking list records. The "Leave Review" shortcut on completed booking cards cannot distinguish already-reviewed bookings from not-yet-reviewed ones. (Identified in dashboard mapping, confirmed in booking list screen.) | MEDIUM |

---

## 10. Recommended API Additions

The following additions to `docs/technical/api-specification-tier1.md` are recommended to close the gaps identified above. Listed in priority order.

---

### 10.1 HIGH PRIORITY

#### ADD-14: Favorites CRUD Endpoints

Closes: GAP-SB-001

Three new endpoints required:

**GET /favorites**
- Access: Authenticated (Care Receiver / Family Member)
- Purpose: Returns list of favorited caregiver IDs for the current user. Used on page load to determine heart icon state on search cards and profile pages.
- Response: `{ "favoritedCaregiverIds": ["uuid-1", "uuid-2"] }`

**POST /favorites/:caregiverId**
- Access: Authenticated (Care Receiver / Family Member)
- Purpose: Add a caregiver to favorites.
- Response: `{ "success": true, "caregiverId": "uuid", "createdAt": "timestamp" }`
- Errors: 404 (caregiver not found), 409 (already favorited)

**DELETE /favorites/:caregiverId**
- Access: Authenticated (Care Receiver / Family Member)
- Purpose: Remove a caregiver from favorites.
- Response: `{ "success": true }`
- Errors: 404 (favorite not found)

---

#### ADD-15: Add Emergency Contact Fields to GET /users/me

Closes: GAP-SB-006

Add the following fields to the `GET /users/me` response for users where `userType IN (care_receiver, family_member)`:

```json
{
  "emergencyContactName": "Jane Smith",
  "emergencyContactPhone": "+447700900123",
  "emergencyContactRelationship": "daughter"
}
```

These fields are already writable via `PUT /care-receivers/me` but are not returned by the `/users/me` read endpoint.

---

#### ADD-16: Add Emergency Contact Fields to POST /bookings

Closes: GAP-SB-007

Add emergency contact fields to the `POST /bookings` request body:

```json
{
  "caregiverId": "uuid",
  "bookingDate": "2026-03-06",
  "startTime": "...",
  "endTime": "...",
  "durationHours": 4,
  "serviceTypes": ["companionship"],
  "specialRequests": "...",
  "paymentMethodId": "pm_abc123",
  "emergencyContact": {
    "name": "Jane Smith",
    "phone": "+447700900123",
    "relationship": "daughter"
  }
}
```

Server behaviour: if `emergencyContact` is provided, store it on the booking record and optionally update the care receiver's profile default. If omitted, fall back to the care receiver's profile emergency contact.

---

#### ADD-17: Add Caregiver Profile Fields to GET /bookings/:id Response

Closes: GAP-SB-008, GAP-SB-009

Extend the `data.caregiver` and `data.careReceiver` objects in `GET /bookings/:id`:

```json
"caregiver": {
  "id": "uuid",
  "firstName": "Sarah",
  "lastName": "M",
  "phone": "+447700900002",
  "profilePhotoUrl": "https://s3.amazonaws.com/...",
  "averageRating": 4.8,
  "totalReviews": 24,
  "verification": {
    "idVerified": true,
    "dbsVerified": true
  }
},
"careReceiver": {
  "id": "uuid",
  "name": "Margaret S.",
  "phone": "+447700900000",
  "distance": 3.2,
  "distanceUnit": "miles",
  "emergencyContact": {
    "name": "John Smith",
    "phone": "+447700900001",
    "relationship": "son"
  }
}
```

`data.caregiver.profilePhotoUrl`, `.averageRating`, `.totalReviews`, and `.verification` are needed by SCR-CR-008 (care receiver view). `data.careReceiver.distance` is needed by SCR-CG-013 (caregiver view, pending state).

---

#### ADD-3 (previously identified, confirmed required here): Add `conversationId` to Booking Responses

Closes: GAP-CR-001

Add `conversationId: string | null` to the booking object in:
- `GET /bookings/:id`
- `GET /care-receivers/me/bookings`
- `GET /caregivers/me/bookings`

`conversationId` is null until the booking is accepted.

---

### 10.2 MEDIUM PRIORITY

#### ADD-18: Add Booked Slots to Caregiver Availability

Closes: GAP-SB-003

Extend the `availability` object in `GET /caregivers/:id` and — for the booking form — as a standalone endpoint `GET /caregivers/:id/availability?month=2026-03`:

```json
"availability": {
  "recurring": [...],
  "unavailable": [...],
  "bookedSlots": [
    {
      "date": "2026-03-06",
      "startTime": "10:00",
      "endTime": "14:00"
    }
  ]
}
```

The `bookedSlots` array should only include accepted bookings for the next 60 days. It does not need to expose booking IDs or care receiver information — just the time ranges that are blocked.

---

#### ADD-19: GET /caregivers/:id/reviews

Closes: GAP-SB-005

**Endpoint**: `GET /caregivers/:id/reviews`
**Access**: Public
**Query Parameters**:
```
page=1
limit=10
sort=recent     (recent|rating_high|rating_low)
```

**Response**:
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "uuid",
        "rating": 5,
        "reviewText": "...",
        "reviewerName": "Margaret S.",
        "reviewDate": "2026-02-01T10:00:00Z",
        "serviceTypes": ["companionship"],
        "caregiverResponse": "...",
        "caregiverResponseDate": "2026-02-02T09:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalCount": 24,
      "totalPages": 3
    }
  }
}
```

---

#### ADD-4 (previously identified, confirmed required here): Add `hasReview` to Booking List Responses

Closes: GAP-CR-002

Add `hasReview: boolean` to booking objects in `GET /care-receivers/me/bookings` list responses.

---

### 10.3 LOW PRIORITY

#### ADD-20: Add `message` Field to PUT /bookings/:id/decline

Closes: GAP-SB-010

Add `message: string | null` (max 300 chars) to the `PUT /bookings/:id/decline` request body. This optional field carries the caregiver's personalised message to the care receiver. The server should include this message in the notification sent to the care receiver on decline.

---

#### ADD-21: Add `sessionNotes` Field to PUT /bookings/:id/complete

Closes: GAP-SB-011

Add `sessionNotes: string | null` (max 500 chars) to the `PUT /bookings/:id/complete` request body. Session notes are admin-visible only — they are never displayed to the care receiver.

---

#### ADD-22: Add `acceptanceRate` and `averageResponseTimeHours` to Caregiver Profile

Closes: GAP-SB-002

Add to `GET /caregivers/:id` response:

```json
"responseMetrics": {
  "acceptanceRate": 0.85,
  "averageResponseTimeHours": 6.2,
  "totalRequestsReceived": 32
}
```

These drive the "Response time: Usually within 6 hours" and "Acceptance rate: 85%" labels in the profile's booking CTA section.

---

#### ADD-23: Add DBS Certificate Fields to Caregiver Profile

Closes: GAP-SB-004

Add to `data.verification` in `GET /caregivers/:id`:

```json
"dbsCertificateNumberMasked": "****567890",
"dbsVerifiedDate": "2026-01-15T10:00:00Z",
"dbsExpiryDate": "2029-01-15T10:00:00Z",
"dbsUpdateServiceSubscribed": true
```

Note: Only the masked certificate number should be public-facing. The full certificate number must never be exposed via the API.

---

*End of document*
