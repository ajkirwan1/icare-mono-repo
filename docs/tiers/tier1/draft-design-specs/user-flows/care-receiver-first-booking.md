# User Flow: Care Receiver First Booking

**Primary Actor**: Care Receiver (or Family Member acting as proxy)
**Goal**: Successfully book and complete first companionship session with a verified caregiver
**Preconditions**:
- User has valid email address and UK mobile phone number
- User is 65+ years old OR has documented care needs
- User has payment method (debit/credit card) for booking payment
- User accepts Terms of Service and Privacy Policy

**Success Outcome**: Booking completed, payment processed, review left, caregiver relationship established
**Estimated Duration**: 45-60 minutes (registration to booking request), then 2-7 days (caregiver response to booking completion)

---

## Flow Diagram (ASCII)

```
[START: User lands on homepage]
    |
    v
+-------------------+
| SCR-PUB-001       |
| Homepage          |
| "Find Care" CTA   |
+-------------------+
    |
    | [User clicks "Find Care"]
    v
    /\
   /  \
  / Authenticated? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  No    Yes
  |     |
  |     +-----------> [SKIP TO: SCR-CR-003 Search]
  |
  v
+-------------------+
| SCR-AUTH-001      |
| CR Registration   |
+-------------------+
    |
    | [User submits registration form]
    v
    /\
   /  \
  / Valid? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Show validation errors]
  |     |
  |     | [User corrects errors]
  |     +---------> [Back to form]
  |
  v
+-------------------+
| SCR-AUTH-004      |
| Phone Verification|
+-------------------+
    |
    | [User enters SMS code correctly]
    v
    /\
   /  \
  / Code valid? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Show error: Invalid code, X attempts remaining]
  |     |
  |     | [User requests new code OR retries]
  |     +---------> [Back to verification]
  |
  v
+-------------------+
| SCR-CR-003        |
| Caregiver Search  |
+-------------------+
    |
    | [User enters postcode, radius, applies filters]
    v
    /\
   /  \
  / Results found? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Show: "No caregivers found. Try widening search."]
  |     |
  |     | [User adjusts filters/radius]
  |     +---------> [Back to search]
  |
  v
+-------------------+
| Display Results   |
| [Caregiver cards] |
+-------------------+
    |
    | [User clicks "View Profile" on caregiver]
    v
+-------------------+
| SCR-CR-005        |
| Caregiver Profile |
+-------------------+
    |
    | [User reviews profile, clicks "Request Booking"]
    v
+-------------------+
| SCR-CR-006        |
| Booking Request   |
+-------------------+
    |
    | [User fills booking form: date, time, duration, special requests]
    v
    /\
   /  \
  / Payment method on file? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   +-------------------+
  |   | SCR-CR-013        |
  |   | Add Payment Method|
  |   +-------------------+
  |         |
  |         | [User adds card via Stripe]
  |         v
  |         /\
  |        /  \
  |       / Card valid? \
  |       \      /
  |        \    /
  |         \  /
  |          \/
  |         / \
  |        /   \
  |       Yes   No
  |        |    |
  |        |    v
  |        |  [Show error: "Invalid card" OR "Payment declined"]
  |        |    |
  |        |    | [User corrects card details]
  |        |    +---------> [Back to payment form]
  |        |
  |        v
  |   [Card saved successfully]
  |        |
  +<-------+
  |
  v
[User clicks "Send Request"]
  |
  v
  /\
 /  \
/ Request valid? \
\      /
 \    /
  \  /
   \/
  / \
 /   \
Yes   No
|     |
|     v
|   [Show validation errors: missing fields, date unavailable]
|     |
|     | [User corrects]
|     +---------> [Back to booking form]
|
v
+-------------------+
| SCR-CR-008        |
| Booking Detail    |
| Status: REQUESTED |
+-------------------+
    |
    | [System authorizes payment (hold), notifies caregiver]
    | [User waits for caregiver response - up to 24 hours]
    |
    v
    /\
   /  \
  / Caregiver responds? \
  \      /
   \    /
    \  /
     \/
    / | \
   /  |  \
Accept Decline Timeout (24h)
  |    |    |
  |    |    v
  |    |  [Status: EXPIRED]
  |    |  [Payment authorization released]
  |    |  [Show: "No response. Search for another caregiver?"]
  |    |    |
  |    |    +---------> [END or back to SCR-CR-003]
  |    |
  |    v
  |  [Status: DECLINED]
  |  [Payment authorization released]
  |  [Show: Decline reason + "Search for another caregiver?"]
  |    |
  |    +---------> [END or back to SCR-CR-003]
  |
  v
[Status: ACCEPTED]
[Payment captured to escrow]
[Contact details shared with caregiver]
  |
  v
+-------------------+
| SCR-CR-008        |
| Booking Detail    |
| Status: ACCEPTED  |
+-------------------+
    |
    | [User can message caregiver, view booking details]
    | [User waits for booking date/time]
    |
    v
[Booking start time reached]
  |
  v
[Status: IN PROGRESS]
[Caregiver marks "Start Session"]
  |
  | [Session occurs - companionship services provided]
  |
  v
[Caregiver marks "Complete Session"]
  |
  v
+-------------------+
| SCR-CR-008        |
| Booking Detail    |
| Status: COMPLETED |
+-------------------+
    |
    | [User has 48 hours to confirm or dispute]
    |
    v
    /\
   /  \
  / User action? \
  \      /
   \    /
    \  /
     \/
    / | \
   /  |  \
Confirm  Dispute  Timeout (48h)
  |    |    |
  |    |    v
  |    |  [Auto-confirm completion]
  |    |  [Payment released to caregiver]
  |    |    |
  |    |    +---------> [Continue to review prompt]
  |    |
  |    v
  |  +-------------------+
  |  | Dispute Flow      |
  |  | [Admin reviews]   |
  |  +-------------------+
  |        |
  |        | [Dispute resolved]
  |        v
  |  [Refund processed per admin decision]
  |        |
  |        +---------> [END or review prompt]
  |
  v
[Payment released to caregiver]
  |
  v
[Review prompt displayed: "How was your experience?"]
  |
  v
+-------------------+
| SCR-CR-015        |
| Leave Review      |
| (R0 - CB-006)     |
+-------------------+
    |
    | [User selects rating (1-5 stars), writes optional review]
    | [User submits review]
    v
    /\
   /  \
  / Review valid? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Show validation error: rating required, review too long]
  |     |
  |     | [User corrects]
  |     +---------> [Back to review form]
  |
  v
[Review published immediately (no moderation queue - CB-006)]
[Status: REVIEWED]
  |
  v
[SUCCESS: First booking complete!]
[User can now book same caregiver again OR search for others]
  |
  v
[END]
```

---

## Step-by-Step Narrative

| Step | Screen | User Action | System Response | Success Path | Error Path |
|------|--------|-------------|-----------------|--------------|------------|
| 1 | SCR-PUB-001 | Click "Find Care" button | Check authentication status | If authenticated → Step 8 (Search), If not → Step 2 | N/A |
| 2 | SCR-AUTH-001 | Enter registration details (name, email, password, DOB, postcode, phone, emergency contact) | Validate form fields | Step 3 | Show inline errors: invalid email, weak password, age under 65 |
| 3 | SCR-AUTH-001 | Click "Create Account" | Create user record (status: pending_phone_verification), send SMS OTP | Navigate to SCR-AUTH-004 | Show error: "Email already registered" OR server error |
| 4 | SCR-AUTH-004 | Enter 6-digit SMS code | Validate code | If valid → Step 5, If invalid → Show error | Show error: "Invalid code. X attempts remaining" OR "Code expired" |
| 5 | SCR-AUTH-004 | Code verified | Mark phone_verified = true, set status = active, send welcome email | Navigate to SCR-CR-003 (Search) | N/A |
| 6 | SCR-AUTH-004 (error) | Click "Resend code" (if expired/invalid) | Send new SMS OTP (rate limit: 3 per hour) | Return to code entry | Show error: "Too many requests. Try again in 10 minutes" |
| 7 | SCR-AUTH-004 (error) | Click "Change phone number" | Return to registration screen | User corrects phone number | N/A |
| 8 | SCR-CR-003 | Enter postcode (auto-filled from profile), select radius (5-30 miles), apply optional filters (rate, availability, gender, DBS verified) | Query caregivers matching criteria, calculate distance | Step 9 | Show: "No caregivers found. Try widening search radius" |
| 9 | SCR-CR-003 | View search results (caregiver cards: photo, name, distance, rate, rating, "DBS Verified" badge if applicable) | Display results sorted by distance | Step 10 | N/A |
| 10 | SCR-CR-003 | Click "View Profile" on caregiver card | Fetch caregiver full profile | Navigate to SCR-CR-005 | Show error: "Caregiver profile no longer active" |
| 11 | SCR-CR-005 | Review caregiver profile (bio, experience, services, availability, reviews, verification badges) | Display full profile | Step 12 | N/A |
| 12 | SCR-CR-005 | Click "Request Booking" button | Check payment method on file | If payment method exists → Step 16, If not → Step 13 | N/A |
| 13 | SCR-CR-013 | Click "Add Payment Method" | Display Stripe card input form (Stripe Elements) | Step 14 | N/A |
| 14 | SCR-CR-013 | Enter card details (number, expiry, CVC, name, billing postcode) | Tokenize card via Stripe API | Step 15 | Show error: "Invalid card number" OR "Card declined" |
| 15 | SCR-CR-013 | Click "Save Card" | Save Stripe payment method token to user account, set as default | Success banner: "Card added", return to SCR-CR-006 | Show error: "Unable to save card. Try again" |
| 16 | SCR-CR-006 | Select booking date (date picker shows caregiver availability), select start time (dropdown: 08:00-20:00), select duration (dropdown: 2, 3, 4, 6, 8 hours) | Real-time price calculation displayed (subtotal, platform fee, total) | Step 17 | N/A |
| 17 | SCR-CR-006 | Enter special requests (optional, 500 chars max), confirm emergency contact (auto-filled, editable) | Validate form | Step 18 | Show validation errors: date unavailable, missing emergency contact |
| 18 | SCR-CR-006 | Check cancellation policy acceptance checkbox, click "Send Request" | Authorize payment (Stripe payment hold), create booking record (status: requested), notify caregiver via email/in-app | Navigate to SCR-CR-008, show success modal: "Request sent! Caregiver has 24h to respond" | Show error: "Payment authorization failed" OR "Caregiver no longer available" |
| 19 | SCR-CR-008 | View booking detail (status: REQUESTED, countdown timer "23 hours remaining") | Display booking details, wait for caregiver response | Step 20, 21, or 22 | N/A |
| 20a | SCR-CR-008 | Caregiver ACCEPTS booking | Capture payment to escrow, update status to ACCEPTED, share contact details (caregiver phone, care receiver address), send email notifications | Display status: "Confirmed", show caregiver contact, enable messaging | N/A |
| 20b | SCR-CR-008 | Caregiver DECLINES booking | Release payment authorization, update status to DECLINED, log decline reason | Display status: "Declined", show reason, show "Search for another caregiver" button | N/A |
| 20c | SCR-CR-008 | 24 hours elapse with NO RESPONSE | Auto-decline booking, release payment authorization, update status to EXPIRED | Display status: "Expired", show "Search for another caregiver" button | N/A |
| 21 | SCR-CR-008 (if accepted) | User waits for booking date/time, can message caregiver, can cancel (with refund policy applied) | Monitor booking date approach, send reminder emails 24h before | Step 22 | User clicks "Cancel Booking" → Confirmation modal → Process refund per policy → Status: CANCELLED |
| 22 | SCR-CR-008 | Booking start time reached | Caregiver marks "Start Session" (optional GPS check), update status to IN_PROGRESS, display emergency contact prominently | Status: "In Progress", emergency button visible | If caregiver no-show (30 min after start) → Trigger no-show alert → User can report no-show → Full refund + caregiver suspension |
| 23 | SCR-CR-008 | Caregiver marks "Complete Session" after visit | Update status to COMPLETED, log completion timestamp, prompt both parties for review | Display status: "Completed", show "Confirm Completion" or "Raise Dispute" buttons (48h window) | N/A |
| 24a | SCR-CR-008 | User clicks "Confirm Completion" OR 48 hours elapse with no dispute | Release payment to caregiver, update status to PAYMENT_RELEASED | Display success message, prompt for review | N/A |
| 24b | SCR-CR-008 | User clicks "Raise Dispute" within 48h | Hold payment, create dispute record, notify admin and caregiver, update status to DISPUTED | Display: "Dispute under admin review. We'll contact you within 24h" | N/A |
| 25 | SCR-CR-008 (if dispute) | Admin reviews dispute (evidence, booking notes, messages) | Admin makes decision: full refund, partial refund, or no refund | Process refund per decision, update status to DISPUTE_RESOLVED, notify both parties | N/A |
| 26 | SCR-CR-015 (review prompt) | Click "Leave Review" after completion | Display review form (5-star rating required, written review optional 500 chars) | Step 27 | N/A |
| 27 | SCR-CR-015 | Select rating (1-5 stars), write optional review, click "Submit Review" | Validate review (rating required, text under 500 chars) | Publish review immediately to caregiver profile (Decision CB-006 - no moderation queue), update status to REVIEWED, show success message | Show validation error: "Rating required" OR "Review too long (500 chars max)" |
| 28 | SCR-CR-015 | Review submitted | Review published immediately to caregiver profile | SUCCESS: First booking complete, user can book again | Admin can delete inappropriate reviews retroactively (Decision CB-006) |

---

## Decision Points

| Decision Point | Question | Yes Path | No Path |
|----------------|----------|----------|---------|
| User authenticated? | Is user logged in? | Skip to search (SCR-CR-003) | Registration flow (SCR-AUTH-001) |
| Registration valid? | Email unique, password strong, age 65+, all required fields? | Phone verification (SCR-AUTH-004) | Show inline validation errors, user corrects |
| SMS code valid? | Code matches, not expired (10 min), attempts < 3? | Phone verified, navigate to search | Show error: "Invalid code. X attempts remaining" |
| SMS code expired? | 10 minutes elapsed since code sent? | Allow resend code (rate limit: 3/hour) | User enters code |
| Search results found? | Caregivers match postcode, radius, and filters? | Display results | Show: "No caregivers found. Try widening search" |
| Payment method on file? | User has saved card in Stripe? | Skip to booking form (SCR-CR-006) | Add payment method (SCR-CR-013) |
| Card valid? | Stripe validates card (format, not expired, funds available)? | Save card, return to booking | Show error: "Invalid card" OR "Payment declined" |
| Booking form valid? | Date available, duration minimum 2h, emergency contact provided? | Send booking request | Show validation errors |
| Payment authorization successful? | Stripe authorizes payment (card hold)? | Create booking (status: requested) | Show error: "Payment authorization failed. Check card details" |
| Caregiver response? | Accept, decline, or timeout (24h)? | ACCEPT → Status: ACCEPTED | DECLINE → Status: DECLINED | TIMEOUT → Status: EXPIRED |
| Caregiver no-show? | Start time + 30 min elapsed, not marked IN_PROGRESS? | Trigger no-show alert, allow report | N/A (booking progresses normally) |
| Dispute or confirm? | Within 48h of completion | CONFIRM → Release payment | DISPUTE → Hold payment, admin review |
| Review valid? | Rating selected (required), review text under 500 chars? | Submit review for admin approval | Show validation error |

---

## Error Paths

| Error Scenario | Trigger | User Sees | Recovery Path |
|----------------|---------|-----------|---------------|
| Email already registered | User tries to register with existing email | Inline error: "Email already registered. Log in instead?" | Click "Log in" → SCR-AUTH-005 (Login) |
| Weak password | Password < 8 chars, no uppercase, no number | Inline error: "Password must be 8+ chars with 1 uppercase and 1 number" | User enters stronger password, re-submits |
| Age under 65 | DOB indicates age < 65 | Inline error: "You must be 65+ to register as care receiver" | User corrects DOB OR registers as family member |
| Invalid phone number | Phone not UK mobile format | Inline error: "Invalid UK phone number" | User corrects phone number |
| Invalid SMS code | User enters wrong code | Error: "Invalid code. 2 attempts remaining" | User re-enters correct code OR requests new code |
| SMS code expired | 10 minutes elapsed | Error: "Code expired. Click to request new code" | Click "Resend code" → New SMS sent |
| Too many SMS requests | User requests > 3 codes/hour | Error: "Too many requests. Try again in 10 minutes" | User waits 10 minutes |
| No search results | No caregivers match criteria | Message: "No caregivers found. Try widening search radius or adjusting filters" | User increases radius OR removes filters OR tries different postcode |
| Caregiver profile inactive | User clicks profile that was just deactivated | Error: "Caregiver not found or profile no longer active" | Return to search results |
| Invalid card | Card number invalid, expired, or declined | Error: "Invalid card" OR "Card declined. Try another card" | User enters different card OR contacts bank |
| Payment authorization failed | Stripe unable to authorize payment (insufficient funds, bank decline) | Error: "Payment authorization failed. Check card details or try another card" | User updates card OR tries different card |
| Date unavailable | Caregiver availability changed since profile viewed | Error: "This date is no longer available. Please select another date" | User selects different date |
| Booking minimum not met | User selects < 2 hours duration | Error: "Minimum booking duration is 2 hours" | User increases duration |
| Caregiver declines | Caregiver clicks "Decline" within 24h | Status badge: "Declined", decline reason displayed, "Search for another caregiver" button | User returns to search OR tries different caregiver |
| Caregiver timeout | 24h elapsed, no response | Status badge: "Expired", message: "Caregiver did not respond. Search for another caregiver?" | User returns to search OR tries different caregiver |
| Caregiver no-show | Start time + 30 min elapsed, not marked IN_PROGRESS | No-show alert displayed, "Report No-Show" button | User reports no-show → Full refund, caregiver suspended |
| Dispute raised | User clicks "Raise Dispute" within 48h | Status: "Disputed", message: "Admin is reviewing. You'll receive an update within 24 hours" | Admin reviews dispute → User receives outcome email → Refund processed if warranted |
| Review too long | User writes > 500 chars | Validation error: "Review too long (500 characters max)" | User shortens review text |
| Review rejected by admin | Admin rejects review (inappropriate content) | Email notification: "Your review was not approved. Reason: [reason]" | User can edit and resubmit review |

---

## Data Captured Per Step

| Step | Data Input | Validation Rules | Where Stored |
|------|------------|------------------|--------------|
| 2 | Full name | Required, 2-100 chars | users.name |
| 2 | Email address | Required, valid format, unique | users.email |
| 2 | Password | Required, 8+ chars, 1 uppercase, 1 number | users.password_hash (hashed) |
| 2 | Date of birth | Required, age 65+ | care_receiver_profiles.date_of_birth |
| 2 | Postcode | Required, UK format | care_receiver_profiles.postcode |
| 2 | Phone number | Required, UK mobile format | users.phone |
| 2 | Emergency contact name | Required | care_receiver_profiles.emergency_contact_name |
| 2 | Emergency contact phone | Required, UK format | care_receiver_profiles.emergency_contact_phone |
| 2 | Emergency contact relationship | Required | care_receiver_profiles.emergency_contact_relationship |
| 2 | Terms acceptance | Required checkbox | users.terms_accepted_at (timestamp) |
| 2 | Privacy policy acceptance | Required checkbox | users.privacy_accepted_at (timestamp) |
| 4 | SMS verification code | 6 digits, expires 10 min | verification_codes.code (hashed, temporary) |
| 8 | Search postcode | Auto-filled from profile, UK format | search_logs.postcode |
| 8 | Search radius | 5, 10, 15, 20, 30 miles | search_logs.radius_miles |
| 8 | Filter: hourly rate range | Optional, £12-£25 | search_logs.rate_min, search_logs.rate_max |
| 8 | Filter: availability | Optional, day/time | search_logs.availability_filters (JSON) |
| 8 | Filter: gender preference | Optional, male/female/no preference | search_logs.gender_filter |
| 8 | Filter: DBS verified | Optional, boolean | search_logs.dbs_filter |
| 14 | Card number | Tokenized by Stripe, not stored | stripe_payment_methods.stripe_payment_method_id |
| 14 | Card expiry | MM/YY | stripe_payment_methods.card_expiry |
| 14 | Card brand | Visa, Mastercard, Amex | stripe_payment_methods.card_brand |
| 14 | Card last 4 digits | Display only | stripe_payment_methods.card_last4 |
| 14 | Cardholder name | Required | stripe_payment_methods.cardholder_name |
| 14 | Billing postcode | Required, UK format | stripe_payment_methods.billing_postcode |
| 16 | Booking date | Future date only | bookings.booking_date |
| 16 | Start time | 08:00-20:00 in 30-min increments | bookings.start_time |
| 16 | Duration | 2, 3, 4, 6, 8 hours | bookings.duration_hours |
| 17 | Special requests | Optional, 500 chars max | bookings.special_requests |
| 17 | Emergency contact (editable) | Auto-filled, can edit | bookings.emergency_contact_name, bookings.emergency_contact_phone |
| 18 | Cancellation policy acceptance | Required checkbox | bookings.cancellation_policy_accepted_at |
| 27 | Review rating | Required, 1-5 stars | reviews.rating |
| 27 | Review text | Optional, 500 chars max | reviews.written_review |

---

## Notifications Triggered

| Step | Notification Type | Recipient | Content Summary | Trigger |
|------|-------------------|-----------|-----------------|---------|
| 3 | SMS | User (Care Receiver) | "Your verification code is XXXXXX. Valid for 10 minutes." | User submits registration |
| 5 | Email | User (Care Receiver) | "Welcome to iCare! Your account is verified. Start searching for caregivers." | Phone verification complete |
| 18 | Email | Caregiver | "New booking request from [Care Receiver Name]. Review and respond within 24 hours." | Booking request sent |
| 18 | In-app | Caregiver | "New booking request - [Date] [Time] - £[Amount]" | Booking request sent |
| 18 | Email | User (Care Receiver) | "Booking request sent! [Caregiver Name] has 24 hours to respond. We'll notify you when they accept." | Booking request sent |
| 20a | Email | User (Care Receiver) | "Booking confirmed! [Caregiver Name] accepted your request. Contact: [Phone]" | Caregiver accepts booking |
| 20a | Email | Caregiver | "Booking confirmed. Care receiver details: [Name], [Address], [Phone], [Emergency Contact]" | Caregiver accepts booking |
| 20a | SMS | User (Care Receiver) | "Booking confirmed for [Date] at [Time] with [Caregiver Name]." | Caregiver accepts booking |
| 20b | Email | User (Care Receiver) | "Booking declined. Reason: [Reason]. Search for another caregiver?" | Caregiver declines booking |
| 20c | Email | User (Care Receiver) | "Booking expired. [Caregiver Name] did not respond within 24 hours. Search for another caregiver?" | 24h timeout |
| 21 | Email | Both | "Reminder: Booking tomorrow at [Time]. Care receiver: [Name]. Caregiver: [Name]." | 24h before booking |
| 21 | SMS | Both | "Reminder: Booking tomorrow at [Time]." | 24h before booking |
| 22 | SMS | User (Care Receiver) | "Booking in progress. Emergency contact: [Phone]. Call 999 if emergency." | Session starts |
| 22 (no-show) | Email | User (Care Receiver) | "We noticed [Caregiver Name] has not marked your session as started. Is everything OK? Report no-show if needed." | 30 min after start time |
| 23 | Email | Both | "Booking complete. [Care Receiver Name], please confirm completion or raise dispute within 48 hours." | Session marked complete |
| 24a | Email | User (Care Receiver) | "Payment processed. £[Amount] charged. Leave a review for [Caregiver Name]?" | Payment released |
| 24a | Email | Caregiver | "Payment released. £[Amount] will arrive in your account in 2-3 business days." | Payment released |
| 24b | Email | Both | "Dispute raised. Admin is reviewing. You'll receive an update within 24 hours." | Dispute raised |
| 25 | Email | Both | "Dispute resolved. Outcome: [Full refund/Partial refund/No refund]. Reason: [Admin explanation]" | Dispute resolved |
| 28 | Email | Caregiver | "New review from [Care Receiver Name]. Rating: X stars. Review: [Text]" | Review approved by admin |

---

## Edge Cases & Alternative Paths

### Edge Case 1: Family Member Proxy Registration
**Trigger**: User clicks "Find Care" → "Register on behalf of someone" link
**Flow Variation**:
- Step 2 replaced with SCR-AUTH-002 (Family Member Registration)
- Collects TWO sets of details: family member + care receiver
- Requires relationship (daughter, son, spouse, etc.) and consent attestation
- Rest of flow identical (family member controls account, books on behalf)

### Edge Case 2: User Abandons Registration Mid-Flow
**Trigger**: User closes browser during registration or phone verification
**System Behavior**:
- If phone not verified within 24h → Delete pending user record (GDPR data minimization)
- If user returns → Must re-register from scratch
- Email address released (not blocked)

### Edge Case 3: Multiple Caregivers Viewed Before Booking
**Trigger**: User views 5+ caregiver profiles before requesting booking
**System Behavior**:
- Search history logged for analytics
- Recently viewed caregivers displayed in search results sidebar
- No impact on booking flow (user can book any caregiver)

### Edge Case 4: User Changes Mind During 24h Caregiver Response Window
**Trigger**: User wants to cancel booking request before caregiver responds
**Flow**: SCR-CR-008 (status: REQUESTED) → User clicks "Cancel Booking" → Confirmation modal → Release payment authorization → Status: CANCELLED → Email both parties
**User Sees**: "Booking request cancelled. No charge applied."

### Edge Case 5: Caregiver Cancels After Accepting
**Trigger**: Caregiver clicks "Cancel Booking" after accepting (before start time)
**Flow**:
- If > 48h before start → Full refund, no penalty
- If < 48h before start → Full refund + caregiver flagged (3 strikes = suspension)
**User Sees**: Status: "Cancelled by caregiver", full refund notification, "Search for another caregiver?" button

### Edge Case 6: Emergency During Booking
**Trigger**: Caregiver presses "Emergency" button during IN_PROGRESS session
**Flow**: Emergency protocol displayed, admin alerted, emergency contact notified
**User Sees**: (Caregiver-side only) Emergency instructions: "CALL 999 IMMEDIATELY" or "Call emergency contact" depending on severity
**Care Receiver**: Receives SMS: "Emergency protocol activated for your booking. Your emergency contact has been notified."

### Edge Case 7: User Wants to Rebook Same Caregiver
**Trigger**: After successful first booking, user wants to book same caregiver again
**Flow**:
- SCR-CR-008 (completed booking) → "Book Again" button → Skip search, go directly to SCR-CR-006 with caregiver pre-selected
- Faster rebooking path (loyalty feature)

### Edge Case 8: Dispute Escalation to Safeguarding
**Trigger**: During dispute review, admin identifies safeguarding concern (e.g., alleged abuse, financial exploitation)
**Flow**: Dispute converted to safeguarding incident → Admin escalates to Safeguarding Adults Board (SAB) → Full investigation → Caregiver suspended → User may receive full refund + safeguarding officer contact

### Edge Case 9: Payment Method Expires Before Booking Date
**Trigger**: User's saved card expires between booking request and booking date
**Flow**:
- System sends email 7 days before booking: "Update payment method - card expires soon"
- If not updated → Booking at risk of cancellation
- User updates card via SCR-CR-013 → Booking proceeds

### Edge Case 10: User Tries to Book Outside Caregiver's Service Radius
**Trigger**: User's postcode is 35 miles away, caregiver's service radius is 30 miles
**System Behavior**:
- Caregiver NOT shown in search results (filtered out by system)
- If user bookmarked profile → Profile shows: "This caregiver does not serve your area (outside 30-mile radius)"

---

## Compliance & Safeguarding Checkpoints

### GDPR Checkpoints

| Checkpoint | Stage | Data Protection Action |
|-----------|-------|----------------------|
| Terms acceptance | Registration (Step 2) | User explicitly accepts Terms of Service and Privacy Policy (checkboxes) |
| Consent capture | Registration (Step 2) | User consents to data processing (contract performance - Article 6(1)(b)) |
| Data minimization | Registration (Step 2) | Only collect data necessary for service (no special category data at Tier 1) |
| Right to access | Post-registration | User can download all personal data via account settings |
| Right to erasure | Post-registration | User can request account deletion (14-day cooling-off, 7-year retention for safeguarding/financial) |
| Data retention | Throughout | Anonymize booking history after 7 years, delete personal data per GDPR |

### Safeguarding Checkpoints

| Checkpoint | Stage | Safeguarding Action |
|-----------|-------|---------------------|
| Age verification | Registration (Step 2) | Verify DOB indicates 65+ (vulnerable adult cohort) |
| Emergency contact mandatory | Registration (Step 2) | Require emergency contact details (safeguarding duty of care) |
| Caregiver verification badge | Search (Step 9) | Display "DBS Verified" badge if caregiver has valid DBS certificate |
| Contact detail sharing timing | After acceptance (Step 20a) | Care receiver address ONLY shared with caregiver AFTER booking accepted (privacy + safety) |
| Emergency protocol | During booking (Step 22) | Emergency button visible during IN_PROGRESS session, emergency contact displayed |
| No-show detection | Post-start (Step 22) | Auto-detect if session not started 30 min after start time (vulnerable adult left without care) |
| Dispute review | Post-completion (Step 25) | Admin reviews all disputes for safeguarding concerns (abuse, exploitation, neglect) |
| Messaging monitoring | Throughout | Platform monitors messages for safeguarding keywords (abuse, financial exploitation) |

### Care Act 2014 Compliance

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| Duty to safeguard | "Report Concern" button on all screens (SCR-CR-008, caregiver profile) | Throughout |
| Duty to report | Safeguarding incidents escalated to admin within 1 hour (urgent) or 24 hours (standard) | Post-booking (if concern raised) |
| Duty to investigate | Admin reviews safeguarding reports, contacts parties, documents investigation | Admin workflow (triggered by user report) |
| Duty to take action | User suspension, caregiver ban, SAB referral, police referral (if criminal) | Admin workflow |
| Section 42 enquiry | Platform cooperates with local authority safeguarding investigations | External (SAB-initiated) |

---

## Success Metrics

| Metric | Target | Measurement Point |
|--------|--------|------------------|
| Registration completion rate | 70% (users who start registration complete phone verification) | Step 5 vs Step 2 |
| Search-to-profile view rate | 60% (users who search view at least 1 profile) | Step 10 vs Step 8 |
| Profile-to-booking request rate | 40% (users who view profile submit booking request) | Step 18 vs Step 11 |
| Booking acceptance rate | 80% (caregivers accept bookings within 24h) | Step 20a vs Step 18 |
| Booking completion rate | 90% (accepted bookings are completed without cancellation) | Step 23 vs Step 20a |
| Dispute rate | < 5% (disputes raised per completed bookings) | Step 24b vs Step 23 |
| Review submission rate | 50% (users leave review after completion) | Step 27 vs Step 24a |
| Time to first booking | < 48 hours (registration to booking completion) | Step 28 vs Step 2 |

---

## Product Gaps Identified - RESOLVED

### GAP 1: Dashboard Screen Not in R0 - RESOLVED
**Issue**: After phone verification (Step 5), user navigates directly to search (SCR-CR-003). No "home base" dashboard for returning users.
**RESOLUTION** (Decision CB-001 - 2026-02-02): Dashboard screens APPROVED for R0. SCR-CR-001 (Care Receiver Dashboard) and SCR-CG-001 (Caregiver Dashboard) included in R0 scope. R0 screen count increased to 30.

### GAP 2: Messaging Screen Deferred - RESOLVED
**Issue**: Step 21 mentions "can message caregiver" but messaging inbox/thread screen (SCR-CR-011) deferred from R0.
**RESOLUTION** (Decision CB-005 - 2026-02-02): Minimal in-app messaging APPROVED for R0. SCR-CR-011 (Message Thread) included in R0 with constraints:
- Simple thread per booking only
- No search/history functionality
- No rich media
- Text only, 500 character limit

### GAP 3: Review Screen Deferred - RESOLVED
**Issue**: Step 27 shows review submission flow, but SCR-CR-015 (Leave Review screen) deferred from R0.
**RESOLUTION** (Decision CB-006 - 2026-02-02): Minimal in-app review APPROVED for R0. SCR-CR-015 (Leave Review) included in R0 with constraints:
- Star rating required, text optional (500 chars max)
- No moderation queue - publish immediately
- Admin can delete inappropriate reviews retroactively

### GAP 4: Pricing Not Finalized - PLACEHOLDER IN USE
**Issue**: Step 16 shows "real-time price calculation (subtotal, platform fee, total)" but commission structure pending FDR-008 founder decision.
**STATUS** (Decision CB-003 - 2026-02-02): Use 15% placeholder commission for all specs.
**PLACEHOLDER**: All pricing references marked with [PLACEHOLDER: 15% commission - subject to FDR-008 final decision]

### GAP 5: No Explicit Session "Check-In" Flow
**Issue**: Step 22 assumes caregiver marks "Start Session" at booking start time, but no explicit check-in flow documented.
**Potential Issue**: If caregiver forgets to mark start, care receiver sees "possible no-show" alert (false positive).
**Recommendation**: Add optional GPS check-in or automated check-in (mark IN_PROGRESS automatically at start time + 5 min if caregiver does not explicitly mark).

---

## Next Steps for Engineering

### Frontend Implementation
1. Build registration wizard (SCR-AUTH-001/002) with inline validation
2. Build phone verification screen (SCR-AUTH-004) with SMS retry logic
3. Build search screen (SCR-CR-003) with filter state management
4. Build caregiver profile screen (SCR-CR-005) with static content
5. Build booking request form (SCR-CR-006) with Stripe payment integration
6. Build booking detail screen (SCR-CR-008) with status-dependent UI
7. Add "Report Concern" buttons throughout (safeguarding compliance)

### Backend Implementation
1. User registration API with email/phone validation
2. SMS OTP API (Twilio integration)
3. Search API with geolocation filtering
4. Booking request API with Stripe payment authorization
5. Webhook listeners for caregiver accept/decline
6. Booking state machine (requested → accepted → in_progress → completed)
7. Dispute creation API (admin review queue)

### QA Test Cases
1. Happy path: Registration → Search → Booking → Completion (end-to-end)
2. Error path: Invalid registration data (email taken, weak password, age under 65)
3. Error path: Invalid SMS code (3 attempts, expiry, rate limiting)
4. Error path: Payment authorization failure (declined card, insufficient funds)
5. Edge case: Caregiver no response (24h timeout)
6. Edge case: Caregiver cancels after accepting (<48h notice)
7. Edge case: User raises dispute (admin review workflow)
8. Edge case: Emergency button pressed during session (emergency protocol)
9. Accessibility: Keyboard navigation, screen reader support (WCAG 2.1 AA)
10. Performance: Search response < 2 sec, booking request < 1 sec

---

**Document Status**: COMPLETE
**Last Updated**: 2026-02-02
**Version**: 1.0
**Source Documents**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`
- `/docs/tiers/tier1/draft-design-specs/route-map.md`
- `/docs/tiers/common/spec/state-maps.md` (Booking Flow)
- `/docs/tiers/tier1/TIER1_COMPREHENSIVE_ANALYSIS.md` (Journey 1)
