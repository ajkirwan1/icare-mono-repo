# User Flow: Family Proxy Booking (On Behalf of Care Receiver)

**Primary Actor**: Family Member (acting as proxy for elderly care receiver)
**Goal**: Register as family member, link to care receiver's account (or create care receiver account), search and book caregivers on behalf of care receiver
**Preconditions**:
- Family member has valid email address and UK mobile phone number
- Care receiver has given consent for family member to act on their behalf (attestation required)
- Family member has relationship to care receiver (daughter, son, spouse, sibling, other)
- Care receiver is elderly (65+) OR has documented care needs

**Success Outcome**: Family member account created and linked to care receiver, booking successfully made on behalf of care receiver, care receiver receives care, family member manages booking lifecycle
**Estimated Duration**: 60-90 minutes (registration to booking completion), then 2-7 days (caregiver response to booking date)

---

## Flow Diagram (ASCII)

```
[START: Family member lands on homepage]
    |
    v
+-------------------+
| SCR-PUB-001       |
| Homepage          |
+-------------------+
    |
    | [Family member clicks "Find Care"]
    v
+-------------------+
| Pre-Registration  |
| Choice Screen     |
+-------------------+
    |
    | [Display: "Who are you finding care for?"]
    | [ ] Myself (65+ or care needs) → SCR-AUTH-001 (Care Receiver Registration)
    | [ ] Someone else (family member/friend) → SCR-AUTH-002 (Family Member Registration)
    |
    v
[Family member selects "Someone else"]
  |
  v
+-------------------+
| SCR-AUTH-002      |
| Family Member     |
| Registration      |
+-------------------+
    |
    | [Display two-section form:]
    | ===== YOUR DETAILS (Family Member) =====
    | [Family member enters:]
    | - Full name (required)
    | - Email (required, unique)
    | - Password (required, 8+ chars)
    | - Phone number (required, UK mobile)
    |
    | ===== CARE RECEIVER DETAILS =====
    | [Family member enters:]
    | - Care receiver's full name (required)
    | - Date of birth (required, for age verification 65+)
    | - Postcode (required, UK format)
    | - Phone number (optional, if different from family member)
    | - Emergency contact (if not the registering family member)
    |
    | ===== RELATIONSHIP & CONSENT =====
    | [Family member selects:]
    | - Relationship to care receiver (dropdown: daughter, son, spouse, partner, sibling, other)
    | - [Checkbox REQUIRED: "I confirm I have the care receiver's consent to register and book care on their behalf"]
    | - [Checkbox REQUIRED: "I confirm the care receiver is unable to use the platform themselves OR prefers that I manage their care bookings"]
    |
    | ===== LEGAL AGREEMENTS =====
    | [Checkbox REQUIRED: Terms of Service]
    | [Checkbox REQUIRED: Privacy Policy]
    |
    v
    /\
   /  \
  / Form valid? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Show validation errors:]
  |   - Invalid email format
  |   - Weak password
  |   - Invalid phone number
  |   - Care receiver age < 65
  |   - Missing consent checkbox
  |   - Missing relationship
  |     |
  |     | [Family member corrects errors]
  |     +---------> [Back to form]
  |
  v
[Family member clicks "Create Account"]
  |
  v
  /\
 /  \
/ Family member email unique? \
\      /
 \    /
  \  /
   \/
  / \
 /   \
Yes   No
|     |
|     v
|   [Error: "Email already registered. Log in instead?"]
|     |
|     | [Link to SCR-AUTH-005 Login]
|     +---------> [END or login]
|
v
[System creates TWO linked accounts:]
  |
  v
[1. Family Member Account:]
[- status: pending_phone_verification]
[- role: family_member]
[- email, password_hash, phone, name]
  |
  v
[2. Care Receiver Account:]
[- status: pending_phone_verification (proxy-managed)]
[- role: care_receiver]
[- name, DOB, postcode, phone (optional), emergency_contact]
[- managed_by_family_member_id: [Family Member User ID]]
  |
  v
[Link created: FamilyMember <-> CareReceiver (proxy relationship)]
[Relationship type: daughter/son/spouse/etc.]
[Permissions: view, book, message, pay (full proxy access)]
  |
  v
[SMS OTP sent to family member phone]
  |
  v
+-------------------+
| SCR-AUTH-004      |
| Phone Verification|
+-------------------+
    |
    | [Family member enters 6-digit SMS code]
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
  |   [Error: "Invalid code. X attempts remaining"]
  |     |
  |     | [Family member retries OR requests new code]
  |     +---------> [Back to verification]
  |
  v
[Phone verified]
[Family member status: active]
[Care receiver status: active (proxy-managed)]
  |
  v
[Welcome email sent to family member:]
["Welcome! You're now managing care bookings for [Care Receiver Name]."]
  |
  v
+-------------------+
| SCR-CR-003        |
| Caregiver Search  |
| (on behalf of CR) |
+-------------------+
    |
    | [Banner displayed: "Booking for: [Care Receiver Name]"]
    | [Family member enters search criteria:]
    | - Postcode (auto-filled from care receiver profile)
    | - Radius (5-30 miles)
    | - Optional filters: Rate, availability, gender, DBS verified
    |
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
  |     | [Family member adjusts filters/radius]
  |     +---------> [Back to search]
  |
  v
[Display caregiver results]
[Each card shows: Photo, name, distance, rate, rating, badges]
  |
  v
[Family member clicks "View Profile" on caregiver]
  |
  v
+-------------------+
| SCR-CR-005        |
| Caregiver Profile |
+-------------------+
    |
    | [Family member reviews caregiver details:]
    | - Bio, experience, services offered
    | - Availability calendar
    | - Reviews from other care receivers
    | - Verification badges (DBS Verified, Right to Work)
    |
    | [Banner reminder: "Booking for: [Care Receiver Name]"]
    |
    v
[Family member clicks "Request Booking"]
  |
  v
+-------------------+
| SCR-CR-006        |
| Booking Request   |
| (on behalf of CR) |
+-------------------+
    |
    | [Banner displayed: "Booking for: [Care Receiver Name]"]
    | [Family member enters booking details:]
    | - Date (date picker, shows caregiver availability)
    | - Start time (dropdown: 08:00-20:00)
    | - Duration (dropdown: 2, 3, 4, 6, 8 hours)
    | - Special requests (500 chars max, optional)
    |
    | [Emergency contact section:]
    | [Auto-filled from care receiver profile OR family member details]
    | [Editable: Name, phone, relationship]
    |
    | [Proxy-specific field:]
    | [Checkbox: "I (family member) will be present during the visit"]
    | [If checked: Collect family member's availability confirmation]
    |
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
  |   | (family member's  |
  |   | card)             |
  |   +-------------------+
  |         |
  |         | [Family member adds their own card via Stripe]
  |         | [Note: Family member pays for care receiver's bookings]
  |         |
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
  |        |  [Error: "Invalid card" OR "Card declined"]
  |        |    |
  |        |    | [Family member corrects card details]
  |        |    +---------> [Back to payment form]
  |        |
  |        v
  |   [Card saved successfully]
  |        |
  +<-------+
  |
  v
[Family member reviews booking summary:]
[Display: Care receiver name, caregiver name, date/time, cost breakdown]
[Checkbox REQUIRED: "I confirm cancellation policy"]
  |
  v
[Family member clicks "Send Request"]
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
|     | [Family member corrects]
|     +---------> [Back to booking form]
|
v
[Booking request created]
[Status: REQUESTED]
[Requester: Family Member (on behalf of Care Receiver)]
[Payment authorized from family member's card]
  |
  v
[Notifications sent:]
[- Email to family member: "Booking request sent for [Care Receiver Name]"]
[- Email to caregiver: "New booking request from [Care Receiver Name] (via family member)"]
[- Optional: SMS to care receiver (if phone provided): "Family member booked care for you on [Date]"]
  |
  v
+-------------------+
| SCR-CR-008        |
| Booking Detail    |
| Status: REQUESTED |
+-------------------+
    |
    | [Banner: "Booking for: [Care Receiver Name]"]
    | [Family member views booking status]
    | [Display: Countdown timer "23 hours remaining for caregiver response"]
    |
    v
[WAIT: Caregiver responds within 24 hours]
  |
  v
    /\
   /  \
  / Caregiver response? \
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
  |    |  [Email family member: "No response. Search for another caregiver?"]
  |    |    |
  |    |    +---------> [END or back to search]
  |    |
  |    v
  |  [Status: DECLINED]
  |  [Payment authorization released]
  |  [Email family member: "Booking declined. Reason: [X]. Search for another caregiver?"]
  |    |
  |    +---------> [END or back to search]
  |
  v
[Status: ACCEPTED]
[Payment captured to escrow]
[Contact details shared:]
[- Caregiver receives: Care receiver name, address, phone, emergency contact (family member)]
[- Family member receives: Caregiver name, phone]
  |
  v
+-------------------+
| SCR-CR-008        |
| Booking Detail    |
| Status: ACCEPTED  |
+-------------------+
    |
    | [Banner: "Booking confirmed for: [Care Receiver Name]"]
    | [Family member can:]
    | - View caregiver contact details
    | - Message caregiver (coordinate visit details)
    | - View booking date/time/location
    | - Cancel booking (refund per policy)
    |
    | [Proxy-specific reminder:]
    | [If family member checked "I will be present":]
    | [Display: "Reminder: You confirmed you'll be present during visit"]
    |
    v
[WAIT: Booking date approaches]
  |
  v
[24 hours before booking:]
[Email + SMS to family member: "Reminder: Care visit tomorrow at [Time]"]
[Optional: SMS to care receiver (if phone provided): "Care visit tomorrow at [Time]"]
  |
  v
[Booking start time reached]
[Caregiver arrives at care receiver's address]
[Caregiver marks "Start Session"]
  |
  v
[Status: IN PROGRESS]
[Email family member: "Session started. Emergency contact: [Phone]"]
  |
  v
[Session occurs - caregiver provides companionship services]
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
    | [Family member has 48 hours to confirm or dispute]
    | [Display options:]
    | - "Confirm Completion" (releases payment to caregiver)
    | - "Raise Dispute" (holds payment, admin reviews)
    |
    v
    /\
   /  \
  / Family member action? \
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
  |    |  [Email family member: "Booking auto-confirmed. Leave review?"]
  |    |    |
  |    |    +---------> [Continue to review prompt]
  |    |
  |    v
  |  [Family member clicks "Raise Dispute"]
  |  [Family member selects reason:]
  |  - Service not provided as agreed
  |  - Care receiver not satisfied
  |  - Safety concern
  |  - Other (free text)
  |    |
  |    v
  |  [Dispute created]
  |  [Status: DISPUTED]
  |  [Payment held pending admin review]
  |  [Email admin: "Dispute raised by family member (proxy booking)"]
  |    |
  |    v
  |  [ADMIN REVIEWS DISPUTE]
  |  [Admin makes decision: Full refund / Partial refund / No refund]
  |    |
  |    v
  |  [Refund processed per admin decision]
  |  [Email family member: "Dispute resolved. Outcome: [X]"]
  |    |
  |    +---------> [END or review prompt]
  |
  v
[Family member clicks "Confirm Completion"]
[Payment released to caregiver]
  |
  v
[Email family member: "Payment processed. £[Amount] charged to your card."]
[Email caregiver: "Payment released. £[Amount] on its way."]
  |
  v
[Review prompt displayed]
  |
  v
+-------------------+
| Review Prompt     |
| (future feature)  |
+-------------------+
    |
    | [Family member can leave review on behalf of care receiver]
    | [Note: Review displays as "Family Member on behalf of [Care Receiver Name]"]
    |
    v
[Family member leaves review (optional)]
[Rating: 1-5 stars]
[Written review: 500 chars max (optional)]
  |
  v
[Review submitted]
[Status: REVIEWED]
  |
  v
[SUCCESS: First proxy booking complete!]
[Family member can now:]
[- Book same caregiver again (faster rebooking)]
[- Search for different caregivers]
[- Manage care receiver's booking history]
[- Add other family members as additional proxies (future feature)]
  |
  v
[END]
```

---

## Step-by-Step Narrative

| Step | Screen | Family Member Action | System Response | Success Path | Error Path |
|------|--------|---------------------|-----------------|--------------|------------|
| 1 | SCR-PUB-001 | Click "Find Care" | Display pre-registration choice screen | Step 2 | N/A |
| 2 | Pre-Reg Choice | Select "Someone else (family member/friend)" | Navigate to SCR-AUTH-002 (Family Member Registration) | Step 3 | N/A |
| 3 | SCR-AUTH-002 | Enter family member details (name, email, password, phone) AND care receiver details (name, DOB, postcode, optional phone, emergency contact) | Validate both sets of details | Step 4 | Show inline errors: invalid email, weak password, age < 65 |
| 4 | SCR-AUTH-002 | Select relationship (daughter, son, spouse, partner, sibling, other) | Validate relationship selected | Step 5 | Show error: "Select relationship to care receiver" |
| 5 | SCR-AUTH-002 | Check consent checkboxes: "I have care receiver's consent" AND "Care receiver unable/prefers I manage bookings" | Validate checkboxes checked | Step 6 | Show error: "You must confirm consent and management preference" |
| 6 | SCR-AUTH-002 | Check Terms of Service and Privacy Policy checkboxes | Validate checkboxes checked | Step 7 | Show error: "You must accept Terms and Privacy Policy" |
| 7 | SCR-AUTH-002 | Click "Create Account" | Validate family member email uniqueness | If unique → Step 8, If not → Show error | Show error: "Email already registered. Log in?" |
| 8 | System | Account creation | Create TWO linked accounts: (1) Family Member (2) Care Receiver (proxy-managed), link accounts via family_members table, send SMS OTP to family member | Step 9 | N/A |
| 9 | SCR-AUTH-004 | Enter 6-digit SMS code | Validate code | If valid → Step 10, If invalid → Show error | Show error: "Invalid code. X attempts remaining" |
| 10 | SCR-AUTH-004 | Code verified | Mark both accounts as active (phone_verified = true), send welcome email | Navigate to SCR-CR-003 (Search) | N/A |
| 11 | SCR-CR-003 | Enter search criteria (postcode auto-filled from care receiver profile, radius, optional filters) | Query caregivers matching criteria | If results found → Step 12, If not → Show "No results" | Show: "No caregivers found. Try widening search." |
| 12 | SCR-CR-003 | View search results (caregiver cards) | Display results with banner: "Booking for: [Care Receiver Name]" | Step 13 | N/A |
| 13 | SCR-CR-003 | Click "View Profile" on caregiver | Fetch caregiver full profile | Navigate to SCR-CR-005 | Show error: "Caregiver profile no longer active" |
| 14 | SCR-CR-005 | Review caregiver profile (bio, experience, services, availability, reviews) | Display full profile with banner: "Booking for: [Care Receiver Name]" | Step 15 | N/A |
| 15 | SCR-CR-005 | Click "Request Booking" | Check payment method on file (family member's card) | If payment method exists → Step 18, If not → Step 16 | N/A |
| 16 | SCR-CR-013 | Click "Add Payment Method" | Display Stripe card input form | Step 17 | N/A |
| 17 | SCR-CR-013 | Enter card details (family member's card), click "Save Card" | Tokenize card via Stripe, save to family member account | Success → Step 18, Failure → Show error | Show error: "Invalid card" OR "Card declined" |
| 18 | SCR-CR-006 | Enter booking details (date, time, duration, special requests, emergency contact) | Validate booking details, real-time price calculation | Step 19 | Show validation errors: date unavailable, missing emergency contact |
| 19 | SCR-CR-006 (proxy-specific) | Optional: Check "I will be present during visit" | Display confirmation: "You've confirmed you'll be present" | Step 20 | N/A |
| 20 | SCR-CR-006 | Review booking summary (care receiver name, caregiver name, date/time, cost), check cancellation policy checkbox, click "Send Request" | Authorize payment from family member's card, create booking (status: REQUESTED, requester: family_member_user_id), notify caregiver | Navigate to SCR-CR-008, show success modal | Show error: "Payment authorization failed" OR "Caregiver no longer available" |
| 21 | SCR-CR-008 | View booking detail (status: REQUESTED, countdown timer) | Display booking details with banner: "Booking for: [Care Receiver Name]" | Wait for caregiver response (Step 22) | N/A |
| 22a | SCR-CR-008 | Caregiver ACCEPTS | Capture payment to escrow, update status to ACCEPTED, share contact details, send notifications | Display status: "Confirmed", show caregiver contact, enable messaging | N/A |
| 22b | SCR-CR-008 | Caregiver DECLINES | Release payment authorization, update status to DECLINED, log decline reason | Display status: "Declined", show reason, show "Search for another caregiver" button | N/A |
| 22c | SCR-CR-008 | 24 hours elapse with NO RESPONSE | Auto-decline booking, release payment authorization, update status to EXPIRED | Display status: "Expired", show "Search for another caregiver" button | N/A |
| 23 | SCR-CR-008 (if accepted) | Family member waits for booking date, can message caregiver, can cancel (with refund policy) | Monitor booking date, send reminder emails/SMS 24h before | Step 24 | Family member cancels → Confirmation modal → Process refund → Status: CANCELLED |
| 24 | SCR-CR-008 | Booking start time reached, caregiver marks "Start Session" | Update status to IN_PROGRESS, send email to family member, display emergency contact | Step 25 | If caregiver no-show (30 min after start) → Alert family member → Family member can report no-show → Full refund |
| 25 | SCR-CR-008 | Caregiver marks "Complete Session" after visit | Update status to COMPLETED, log completion timestamp, prompt family member for confirmation | Display "Confirm Completion" or "Raise Dispute" buttons (48h window) | N/A |
| 26a | SCR-CR-008 | Family member clicks "Confirm Completion" OR 48 hours elapse | Release payment to caregiver, update status to PAYMENT_RELEASED | Display success message, prompt for review | N/A |
| 26b | SCR-CR-008 | Family member clicks "Raise Dispute" within 48h | Hold payment, create dispute record, notify admin and caregiver, update status to DISPUTED | Display: "Dispute under admin review. We'll contact you within 24h" | N/A |
| 27 | SCR-CR-008 (if dispute) | Admin reviews dispute (evidence, booking notes, family member and caregiver statements) | Admin makes decision: full refund, partial refund, or no refund | Process refund per decision, notify both parties | N/A |
| 28 | Review Prompt (optional) | Family member clicks "Leave Review", selects rating (1-5 stars), writes optional review (500 chars max), click "Submit Review" | Validate review (rating required), submit for admin approval, note: "Review by Family Member on behalf of [Care Receiver Name]" | SUCCESS: Booking complete, review submitted | Show validation error: "Rating required" OR "Review too long" |

---

## Decision Points

| Decision Point | Question | Yes Path | No Path |
|----------------|----------|----------|---------|
| Email unique? | Is family member email not already registered? | Create accounts (Step 8) | Show error: "Email already registered. Log in?" |
| SMS code valid? | Code matches, not expired, attempts < 3? | Accounts verified (Step 10) | Show error: "Invalid code. X attempts remaining" |
| Search results found? | Caregivers match postcode + radius + filters? | Display results (Step 12) | Show: "No caregivers found. Try widening search" |
| Payment method on file? | Family member has saved card? | Skip to booking form (Step 18) | Add payment method (Step 16) |
| Card valid? | Stripe validates card (format, not expired, funds)? | Save card (Step 18) | Show error: "Invalid card" OR "Payment declined" |
| Booking form valid? | Date available, duration 2h+, emergency contact provided? | Send booking request (Step 20) | Show validation errors |
| Payment authorization successful? | Stripe authorizes payment from family member's card? | Create booking (status: REQUESTED) | Show error: "Payment authorization failed" |
| Caregiver response? | Accept, decline, or timeout (24h)? | ACCEPT → Step 22a / DECLINE → Step 22b / TIMEOUT → Step 22c | N/A |
| Caregiver no-show? | Start time + 30 min elapsed, not marked IN_PROGRESS? | Alert family member, allow no-show report | Booking progresses normally |
| Confirm or dispute? | Within 48h of completion | CONFIRM → Release payment (Step 26a) / DISPUTE → Hold payment, admin review (Step 26b) | Auto-confirm after 48h |
| Review valid? | Rating selected, review text < 500 chars? | Submit review for admin approval | Show validation error |

---

## Error Paths

| Error Scenario | Trigger | Family Member Sees | Recovery Path |
|----------------|---------|-------------------|---------------|
| Email already registered | Family member tries to register with existing email | Error: "Email already registered. Log in instead?" | Click "Log in" → SCR-AUTH-005 (Login) |
| Weak password | Password < 8 chars, no uppercase, no number | Inline error: "Password must be 8+ chars with 1 uppercase and 1 number" | Family member enters stronger password |
| Care receiver age < 65 | DOB indicates age < 65 | Inline error: "Care receiver must be 65+ years old" | Family member corrects DOB OR provides documentation of care needs |
| Invalid phone number | Phone not UK mobile format | Inline error: "Invalid UK phone number" | Family member corrects phone number |
| Missing consent checkbox | Family member forgets to check consent checkbox | Error: "You must confirm you have care receiver's consent" | Family member checks checkbox |
| Missing relationship | Family member does not select relationship | Error: "Select your relationship to care receiver" | Family member selects relationship from dropdown |
| Invalid SMS code | Family member enters wrong code | Error: "Invalid code. 2 attempts remaining" | Family member re-enters code OR requests new code |
| No search results | No caregivers match criteria | Message: "No caregivers found. Try widening search radius or adjusting filters" | Family member increases radius OR removes filters |
| Caregiver profile inactive | Family member clicks profile that was just deactivated | Error: "Caregiver not found or profile no longer active" | Return to search results |
| Invalid card | Card number invalid, expired, or declined | Error: "Invalid card" OR "Card declined. Try another card" | Family member enters different card |
| Payment authorization failed | Stripe unable to authorize payment | Error: "Payment authorization failed. Check card details or try another card" | Family member updates card OR tries different card |
| Date unavailable | Caregiver availability changed since profile viewed | Error: "This date is no longer available. Please select another date" | Family member selects different date |
| Booking minimum not met | Family member selects < 2 hours duration | Error: "Minimum booking duration is 2 hours" | Family member increases duration |
| Caregiver declines | Caregiver clicks "Decline" within 24h | Status: "Declined", decline reason, "Search for another caregiver" button | Family member returns to search |
| Caregiver timeout | 24h elapsed, no response | Status: "Expired", "Search for another caregiver?" | Family member returns to search |
| Caregiver no-show | Start time + 30 min elapsed, not marked IN_PROGRESS | No-show alert, "Report No-Show" button | Family member reports no-show → Full refund, caregiver suspended |
| Dispute raised | Family member clicks "Raise Dispute" within 48h | Status: "Disputed", "Admin reviewing. Update within 24h" | Admin reviews → Refund processed if warranted |
| Care receiver phone SMS fails | SMS to care receiver phone fails (invalid number OR SMS blocked) | System logs SMS failure, family member NOT notified (non-critical) | Care receiver can still receive care (family member is primary contact) |

---

## Data Captured Per Step

| Step | Data Input | Validation Rules | Where Stored |
|------|------------|------------------|--------------|
| 3 | Family member name | Required, 2-100 chars | users.name (family_member user_id) |
| 3 | Family member email | Required, valid format, unique | users.email (family_member user_id) |
| 3 | Family member password | Required, 8+ chars, 1 uppercase, 1 number | users.password_hash (family_member user_id, hashed) |
| 3 | Family member phone | Required, UK mobile format | users.phone (family_member user_id) |
| 3 | Care receiver name | Required, 2-100 chars | users.name (care_receiver user_id) |
| 3 | Care receiver DOB | Required, age 65+ | care_receiver_profiles.date_of_birth |
| 3 | Care receiver postcode | Required, UK format | care_receiver_profiles.postcode |
| 3 | Care receiver phone | Optional, UK format | care_receiver_profiles.phone |
| 3 | Emergency contact | Required | care_receiver_profiles.emergency_contact_name, emergency_contact_phone |
| 4 | Relationship | Required, dropdown | family_members.relationship |
| 5 | Consent confirmation | Required checkbox | family_members.consent_confirmed_at (timestamp) |
| 5 | Management preference | Required checkbox | family_members.management_preference |
| 6 | Terms acceptance | Required checkbox | users.terms_accepted_at (family_member user_id) |
| 6 | Privacy acceptance | Required checkbox | users.privacy_accepted_at (family_member user_id) |
| 9 | SMS verification code | 6 digits, expires 10 min | verification_codes.code (hashed, temporary) |
| 11 | Search postcode | Auto-filled from care receiver profile, UK format | search_logs.postcode |
| 11 | Search radius | 5-30 miles | search_logs.radius_miles |
| 11 | Search filters | Optional (rate, availability, gender, DBS) | search_logs.filters (JSON) |
| 17 | Card details | Tokenized by Stripe, not stored | stripe_payment_methods.stripe_payment_method_id (linked to family_member user_id) |
| 18 | Booking date | Future date only | bookings.booking_date |
| 18 | Start time | 08:00-20:00 in 30-min increments | bookings.start_time |
| 18 | Duration | 2, 3, 4, 6, 8 hours | bookings.duration_hours |
| 18 | Special requests | Optional, 500 chars max | bookings.special_requests |
| 18 | Emergency contact | Auto-filled, editable | bookings.emergency_contact_name, emergency_contact_phone |
| 19 | "I will be present" flag | Optional checkbox | bookings.proxy_present_during_visit (boolean) |
| 20 | Cancellation policy acceptance | Required checkbox | bookings.cancellation_policy_accepted_at |
| 8 | Proxy relationship link | Auto-created | family_members.family_member_user_id, family_members.care_receiver_user_id, family_members.relationship |
| 20 | Booking requester type | Auto-captured | bookings.requester_user_id = family_member_user_id, bookings.booking_for_user_id = care_receiver_user_id |
| 28 | Review rating | Required, 1-5 stars | reviews.rating |
| 28 | Review text | Optional, 500 chars max | reviews.written_review |
| 28 | Review attribution | Auto-captured | reviews.reviewer_user_id = family_member_user_id, reviews.on_behalf_of_user_id = care_receiver_user_id |

---

## Notifications Triggered

| Step | Notification Type | Recipient | Content Summary | Trigger |
|------|-------------------|-----------|-----------------|---------|
| 8 | SMS | Family Member | "Your verification code is XXXXXX. Valid for 10 minutes." | Accounts created |
| 10 | Email | Family Member | "Welcome! You're now managing care bookings for [Care Receiver Name]." | Phone verified |
| 10 | SMS (optional) | Care Receiver | "[Family Member Name] registered to manage care bookings for you." | Phone verified (if care receiver phone provided) |
| 20 | Email | Family Member | "Booking request sent for [Care Receiver Name]! [Caregiver Name] has 24h to respond." | Booking request sent |
| 20 | Email | Caregiver | "New booking request from [Care Receiver Name] (booked by family member). Respond within 24h." | Booking request sent |
| 22a | Email | Family Member | "Booking confirmed! [Caregiver Name] accepted request for [Care Receiver Name]. Contact: [Caregiver Phone]" | Caregiver accepts |
| 22a | SMS (optional) | Care Receiver | "Care visit confirmed for [Date] at [Time]. Caregiver: [Name]" | Caregiver accepts (if care receiver phone provided) |
| 22b | Email | Family Member | "Booking declined by [Caregiver Name]. Reason: [X]. Search for another caregiver?" | Caregiver declines |
| 22c | Email | Family Member | "Booking expired. [Caregiver Name] did not respond within 24 hours. Search for another caregiver?" | 24h timeout |
| 23 | Email | Family Member | "Reminder: Care visit tomorrow at [Time] for [Care Receiver Name]. Caregiver: [Name]" | 24h before booking |
| 23 | SMS | Family Member | "Reminder: Care visit tomorrow at [Time] for [Care Receiver Name]." | 24h before booking |
| 23 | SMS (optional) | Care Receiver | "Care visit tomorrow at [Time]. Caregiver: [Name]" | 24h before booking (if care receiver phone provided) |
| 24 | Email | Family Member | "Session started for [Care Receiver Name]. Emergency contact: [Phone]. Caregiver: [Name]" | Session starts |
| 24 (no-show) | Email | Family Member | "We noticed [Caregiver Name] has not marked session as started. Is everything OK? Report no-show if needed." | 30 min after start (no-show detected) |
| 25 | Email | Family Member | "Session complete for [Care Receiver Name]. Confirm completion or raise dispute within 48 hours." | Session marked complete |
| 26a | Email | Family Member | "Payment processed. £[Amount] charged to your card for [Care Receiver Name]'s care. Leave a review?" | Payment released |
| 26b | Email | Family Member | "Dispute raised for [Care Receiver Name]'s booking. Admin reviewing. Update within 24 hours." | Dispute raised |
| 27 | Email | Family Member | "Dispute resolved. Outcome: [X]. Refund: £[Amount] (if applicable)." | Dispute resolved |
| 28 | Email | Caregiver | "New review from [Care Receiver Name] (via family member). Rating: X stars. Review: [Text]" | Review approved |

---

## Edge Cases & Alternative Paths

### Edge Case 1: Care Receiver Already Has Account (Not Proxy-Managed)
**Trigger**: Family member tries to register as proxy, but care receiver already has their own active account
**System Behavior**:
- Email uniqueness check fails if family member uses care receiver's existing email
- System detects care receiver name + DOB match existing account
- Show warning: "A care receiver with these details already exists. Request to link accounts?"
- Family member sends link request → Care receiver receives email: "Approve or deny link request"
- If approved → Accounts linked (care receiver retains control, family member gets delegated access)
- If denied → Family member cannot proceed (care receiver must initiate linking from their account)

### Edge Case 2: Multiple Family Members Want Proxy Access
**Trigger**: 2 family members (e.g., son and daughter) both want to manage same care receiver's bookings
**System Behavior**:
- First family member registers as proxy (primary proxy)
- Second family member registers as additional proxy (secondary proxy)
- Care receiver account has multiple linked family members (family_members table: multiple rows)
- All family members can view bookings, but permissions may differ (primary: full access, secondary: view only OR full access per primary proxy's choice)
- Future feature: Permission levels (view only, book only, full access)

### Edge Case 3: Care Receiver Wants to Take Over Own Account
**Trigger**: Family member registered proxy account, but care receiver becomes able to use platform themselves
**System Behavior**:
- Care receiver logs in (if they know password OR requests password reset)
- Care receiver sees: "Your account is managed by [Family Member Name]. Request to remove proxy access?"
- Care receiver requests removal → Family member receives email: "Approve or deny removal request"
- If approved → Family member retains view-only access OR removed entirely
- If denied → Care receiver can contact support to override (care receiver has ultimate control over their own account)

### Edge Case 4: Family Member Tries to Register with Care Receiver's Email
**Trigger**: Family member enters care receiver's email address as their own email
**System Behavior**:
- Show warning: "This email belongs to care receiver. Use your own email for family member account."
- Force family member to use different email address (separate accounts required)

### Edge Case 5: Care Receiver Phone Number Provided But Invalid
**Trigger**: Family member enters care receiver phone number, but SMS delivery fails (invalid number OR SMS blocked)
**System Behavior**:
- System logs SMS failure (care_receiver_profiles.phone_sms_failed = true)
- Family member NOT notified (non-critical - family member is primary contact)
- Care receiver does NOT receive SMS notifications (booking confirmations, reminders)
- Care receiver can still receive care (family member manages all communications)

### Edge Case 6: Family Member Wants to Book for Self AND Care Receiver
**Trigger**: Family member is also elderly (65+) and wants care for themselves
**System Behavior**:
- Family member can register TWO accounts:
  - Account 1: Family member as care receiver (for their own care bookings)
  - Account 2: Family member as proxy (managing parent/spouse's bookings)
- System allows switching between accounts: "Booking for: Myself / [Care Receiver Name]"
- Future feature: Unified account with role switching

### Edge Case 7: Caregiver Arrives But Family Member Not Present (Despite Confirming)
**Trigger**: Family member checked "I will be present" but is not there when caregiver arrives
**System Behavior**:
- Caregiver marks "Start Session" as normal
- Caregiver documents in booking notes: "Family member not present (despite confirmation)"
- If pattern emerges (family member repeatedly absent) → Admin may flag family member account
- No immediate penalty (sometimes unavoidable), but pattern indicates unreliability

### Edge Case 8: Care Receiver Objects to Family Member Booking
**Trigger**: Caregiver arrives, care receiver says "I didn't agree to this. Family member booked without my consent."
**System Behavior**:
- Caregiver documents concern, does NOT proceed with session (safeguarding protocol)
- Caregiver contacts platform support immediately
- Platform investigates: Contact care receiver, contact family member, assess capacity
- If care receiver has capacity + did not consent → Booking cancelled, full refund, family member account flagged/suspended
- If care receiver lacks capacity + family member is legitimate proxy → Proceed with session (family member has legal authority)

### Edge Case 9: Family Member Disputes Booking After Payment Released
**Trigger**: Family member confirms completion (or 48h expires), payment released, THEN family member wants to dispute
**System Behavior**:
- Show error: "Dispute window closed (48 hours after completion). Contact support if serious issue."
- Family member can contact support → Support reviews case by case
- If serious issue (abuse, neglect) → Safeguarding investigation (refund possible)
- If minor issue (late arrival, minor quality concern) → No refund (outside dispute window)

### Edge Case 10: Care Receiver Dies Before Booking Date
**Trigger**: Sad scenario - care receiver passes away before scheduled booking
**System Behavior**:
- Family member contacts platform support to cancel booking
- Support verifies (death certificate OR verbal confirmation + sensitivity)
- Booking cancelled immediately, full refund processed (compassionate exception to cancellation policy)
- Account archived (care receiver account + family member proxy access)
- Condolences email sent to family member

---

## Compliance & Safeguarding Checkpoints

### Care Act 2014 (Proxy Decision-Making)

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| Consent verification | Family member must confirm care receiver's consent (attestation checkbox) | Step 5 (SCR-AUTH-002) |
| Best interests | Platform assumes family member acts in care receiver's best interests (no capacity assessment at registration) | Throughout |
| Safeguarding duty | If care receiver objects to booking (Edge Case 8) → Caregiver stops session, platform investigates | Edge Case 8 (Caregiver arrival) |
| Capacity concerns | If pattern emerges (care receiver repeatedly objects) → Platform may require legal documentation (LPA, court order) | Edge Case 8 (Investigation) |

### Mental Capacity Act 2005 (Proxy Authority)

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| Presumption of capacity | Platform assumes care receiver has capacity to consent to family member proxy (no assessment required at registration) | Step 5 (Consent attestation) |
| Lasting Power of Attorney (LPA) | Platform does NOT require LPA documentation at Tier 1 (low-risk companionship services) | Not required at Tier 1 |
| Future safeguard (Tier 2+) | For personal care services (Tier 2+), platform may require LPA documentation OR capacity assessment | Tier 2+ enhancement |
| Care receiver override | Care receiver can request removal of family member proxy access (Edge Case 3) | Edge Case 3 (Removal request) |

### GDPR (Proxy Access & Data Sharing)

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| Lawful basis | Family member consent + care receiver consent (attestation) = lawful basis for proxy access | Step 5 (Consent attestation) |
| Data minimization | Family member sees only care receiver's necessary data (name, DOB, postcode, booking history) | Throughout |
| Right to access | Care receiver can request full data access (including family member's actions on their behalf) | Post-registration (account settings) |
| Right to erasure | Care receiver can request account deletion (overrides family member proxy access) | Post-registration (account settings) |
| Data sharing | Care receiver's address shared with caregiver ONLY after booking accepted (privacy + safety) | Step 22a (Booking accepted) |

### Safeguarding (Vulnerable Adult Protection)

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| Emergency contact mandatory | Family member OR care receiver emergency contact required (safeguarding duty of care) | Step 3 (SCR-AUTH-002), Step 18 (Booking form) |
| Caregiver verification | All caregivers verified (ID, Right to Work, optional DBS) before bookings allowed | Admin verification (separate flow) |
| No-show detection | Auto-detect if session not started 30 min after start time (vulnerable adult left without care) | Step 24 (No-show alert) |
| Dispute review | All disputes reviewed for safeguarding concerns (abuse, neglect, exploitation) | Step 27 (Admin dispute review) |
| Consent verification | If care receiver objects to booking at visit (Edge Case 8) → Caregiver stops session, safeguarding investigation | Edge Case 8 (Investigation) |

---

## Success Metrics

| Metric | Target | Measurement Point |
|--------|--------|------------------|
| Family member registration completion rate | 70% (family members who start registration complete phone verification) | Step 10 vs Step 3 |
| Proxy booking conversion rate | 50% (family members who register make at least 1 booking within 7 days) | Step 20 vs Step 10 |
| Booking acceptance rate (proxy bookings) | 80% (caregivers accept proxy bookings within 24h) | Step 22a vs Step 20 |
| Booking completion rate (proxy bookings) | 90% (accepted proxy bookings completed without cancellation) | Step 25 vs Step 22a |
| Dispute rate (proxy bookings) | < 7% (slightly higher than direct bookings - expected due to third-party coordination) | Step 26b vs Step 25 |
| Care receiver objection rate | < 2% (care receivers object to family member proxy booking at visit) | Edge Case 8 / Total proxy bookings |
| Family member satisfaction | 80% (family members satisfied with proxy booking experience) | Post-booking survey |
| Average proxy bookings per family member | 4 bookings per year | Step 20 count / Family member accounts |

---

## Product Gaps Identified

### GAP 1: Care Receiver Consent Verification Not Robust
**Issue**: Step 5 relies on family member attestation only (checkbox: "I have care receiver's consent") - no verification mechanism
**Risk**: Family member could register without care receiver's knowledge or consent (safeguarding concern)
**Recommendation**:
- Add optional consent verification email to care receiver (if care receiver email provided)
- Care receiver receives email: "Your family member registered to manage bookings. Approve or deny?"
- If care receiver does not respond within 7 days → Assume consent (burden on care receiver to object)
- If care receiver denies → Family member account suspended, investigation triggered

### GAP 2: Permission Levels for Multiple Family Members Not Implemented
**Issue**: Edge Case 2 mentions multiple family members with proxy access, but permission system not documented
**Recommendation**:
- Implement permission levels: VIEW_ONLY, BOOK_ONLY, FULL_ACCESS
- Primary proxy (first family member) sets permissions for secondary proxies
- Secondary proxies can view bookings but may not be able to book/cancel without primary proxy approval

### GAP 3: Account Switching (Family Member as Both Proxy and Care Receiver) Not Implemented
**Issue**: Edge Case 6 mentions family member wanting care for themselves AND managing parent's bookings, but no account switching mechanism
**Recommendation**:
- Add account switcher dropdown in header: "Booking for: Myself / [Parent Name]"
- Toggle between family member's own care receiver account and proxy-managed care receiver account
- Single login, multiple roles (simplifies UX)

### GAP 4: Care Receiver Override Mechanism Not Implemented
**Issue**: Edge Case 3 mentions care receiver wanting to remove family member proxy access, but no user-facing mechanism
**Recommendation**:
- Add "Manage Proxy Access" section in care receiver account settings
- Display: "Family members with access: [List]"
- Actions: "Remove proxy access" (requires confirmation) OR "Change permission level"

### GAP 5: Legal Documentation Upload (LPA, Court Order) Not Implemented
**Issue**: Platform assumes family member has legal authority, but does NOT verify (acceptable for Tier 1 companionship, risky for Tier 2+ personal care)
**Recommendation**:
- For Tier 2+ (personal care), require legal documentation upload (LPA, court order, guardianship papers)
- Admin reviews legal documentation before approving proxy access for personal care bookings
- Tier 1 companionship: No legal documentation required (low-risk services)

### GAP 6: Proxy Booking Attribution Not Visible on Caregiver Side
**Issue**: Caregiver sees booking request from "Care Receiver Name" but may not know it's booked by family member (coordination issues)
**Recommendation**:
- Display proxy attribution in booking request: "Booking request from [Care Receiver Name] (booked by [Family Member Name])"
- Caregiver can contact family member directly for coordination (family member's phone number displayed)

### GAP 7: Care Receiver Notification Opt-Out Not Implemented
**Issue**: Care receiver receives SMS notifications (booking confirmations, reminders) if phone provided, but may not want notifications (confusion, anxiety)
**Recommendation**:
- Add notification preference: "Send notifications to care receiver? YES / NO"
- Family member controls care receiver's notification preferences (during registration OR in account settings)
- Default: NO (family member is primary contact, avoids confusing care receiver with notifications)

---

## Next Steps for Engineering

### Frontend Implementation
1. Build pre-registration choice screen (SCR-PUB-001: "Who are you finding care for? Myself / Someone else")
2. Build family member registration screen (SCR-AUTH-002) with two-section form (family member + care receiver details)
3. Build proxy-specific booking banner: "Booking for: [Care Receiver Name]" (displayed throughout search/booking flow)
4. Build proxy-specific booking field: "I will be present during visit" (optional checkbox in SCR-CR-006)
5. Build proxy attribution in booking detail screen: "Booked by: [Family Member Name] on behalf of [Care Receiver Name]"
6. Build review attribution: "Review by [Family Member Name] on behalf of [Care Receiver Name]"

### Backend Implementation
1. Family member registration API (create TWO linked accounts: family_member + care_receiver)
2. Proxy relationship linking API (family_members table: link family_member_user_id <-> care_receiver_user_id)
3. Proxy booking creation API (bookings.requester_user_id = family_member, bookings.booking_for_user_id = care_receiver)
4. Proxy access control middleware (verify family member has proxy access to care receiver account)
5. Optional care receiver SMS notifications (send booking confirmations to care receiver phone if provided)
6. Proxy attribution in notifications (emails display: "Booking for [Care Receiver Name] by [Family Member Name]")
7. Care receiver consent verification email (optional - send email to care receiver to confirm proxy access)
8. Account switching API (if family member has both care receiver account AND proxy account - future enhancement)
9. Permission levels system (VIEW_ONLY, BOOK_ONLY, FULL_ACCESS - future enhancement)

### QA Test Cases
1. Happy path: Family member registration → Proxy booking → Caregiver accepts → Session complete → Review (end-to-end)
2. Error path: Invalid family member registration (email taken, weak password, age < 65, missing consent)
3. Error path: Care receiver phone SMS fails (invalid number) → System logs failure, family member NOT notified (non-critical)
4. Edge case: Multiple family members register as proxies for same care receiver → All can view bookings, permissions TBD
5. Edge case: Care receiver objects to booking at visit → Caregiver documents concern, contacts support, safeguarding investigation
6. Edge case: Family member wants to remove proxy access (future) → Care receiver approves removal OR overrides via support
7. Edge case: Family member registered with care receiver's email (error) → Show warning: "Use your own email"
8. Accessibility: Keyboard navigation, screen reader support (WCAG 2.1 AA)
9. Performance: Proxy account creation < 2 sec, booking flow identical to direct booking (no performance degradation)
10. Security: Proxy access control (family member can ONLY access linked care receiver's bookings, NOT other care receivers)

---

**Document Status**: COMPLETE
**Last Updated**: 2026-02-02
**Version**: 1.0
**Source Documents**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`
- `/docs/tiers/tier1/draft-design-specs/route-map.md`
- `/docs/tiers/common/spec/state-maps.md` (Registration Flow, Booking Flow)
- `/docs/tiers/tier1/TIER1_COMPREHENSIVE_ANALYSIS.md` (Journey 3 - Family Proxy)
- `/docs/compliance/legal-framework.md` (Care Act 2014, Mental Capacity Act 2005, GDPR proxy access)
