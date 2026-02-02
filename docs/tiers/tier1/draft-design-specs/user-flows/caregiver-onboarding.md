# User Flow: Caregiver Onboarding (Tier 1)

**Primary Actor**: Caregiver (self-employed professional)
**Goal**: Complete registration, verification, and profile setup to offer companionship services and receive first booking request
**Preconditions**:
- Caregiver has valid UK email address and mobile phone number
- Caregiver has legal right to work in the UK
- Caregiver has government-issued ID (passport or driving license)
- Caregiver understands self-employed status (NOT employee)
- Caregiver has Public Liability insurance (or will procure - minimum amount TBD per GD-03)

**Success Outcome**: Profile verified by admin, profile live and searchable by care receivers, first booking request received
**Estimated Duration**: 60-90 minutes (registration to verification submission), then 24-48 hours (admin review), then variable time to first booking

---

## Flow Diagram (ASCII)

```
[START: User lands on homepage]
    |
    v
+-------------------+
| SCR-PUB-001       |
| Homepage          |
+-------------------+
    |
    | [User clicks "Become a Caregiver"]
    v
+-------------------+
| SCR-AUTH-003      |
| Caregiver Reg.    |
+-------------------+
    |
    | [User enters: name, email, password, phone, postcode]
    | [User checks: "I understand I am registering as self-employed"]
    | [User accepts: Terms (caregiver version), Privacy Policy]
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
  |   [Show validation errors]
  |     |
  |     | [User corrects errors]
  |     +---------> [Back to form]
  |
  v
[User clicks "Create Account"]
  |
  v
  /\
 /  \
/ Email unique? \
\      /
 \    /
  \  /
   \/
  / \
 /   \
Yes   No
|     |
|     v
|   [Error: "Email already registered. Log in?"]
|     |
|     +---------> [Link to SCR-AUTH-005 Login]
|
v
[Account created: status = pending_phone_verification]
[SMS OTP sent]
  |
  v
+-------------------+
| SCR-AUTH-004      |
| Phone Verification|
+-------------------+
    |
    | [User enters 6-digit SMS code]
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
  |     | [User retries OR requests new code]
  |     +---------> [Back to verification]
  |
  v
[Phone verified: status = pending_verification]
[User redirected to onboarding wizard]
  |
  v
+-------------------+
| SCR-CG-002        |
| Onboarding Wizard |
| Step 1 of 5       |
| PROFILE           |
+-------------------+
    |
    | [User uploads profile photo (max 5MB, JPG/PNG)]
    | [User writes professional bio (500 chars max)]
    | [User enters years of experience in care]
    |
    v
    /\
   /  \
  / Step 1 valid? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Show validation errors: photo too large, bio too long]
  |     |
  |     | [User corrects]
  |     +---------> [Back to Step 1]
  |
  v
[User clicks "Next"]
  |
  v
+-------------------+
| SCR-CG-002        |
| Onboarding Wizard |
| Step 2 of 5       |
| SERVICES          |
+-------------------+
    |
    | [User selects service types (Tier 1 - companionship only):]
    | [ ] Companionship (conversation, activities)
    | [ ] Light housework and cleaning
    | [ ] Shopping and errands
    | [ ] Meal preparation (no feeding assistance)
    | [ ] Transportation (if you have a vehicle)
    |
    | [User selects service radius: 5, 10, 15, 20, 30 miles]
    |
    v
    /\
   /  \
  / At least 1 service selected? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Validation error: "Select at least one service type"]
  |     |
  |     +---------> [Back to Step 2]
  |
  v
[User clicks "Next"]
  |
  v
+-------------------+
| SCR-CG-002        |
| Onboarding Wizard |
| Step 3 of 5       |
| AVAILABILITY      |
+-------------------+
    |
    | [User marks recurring availability:]
    | [Weekly schedule: Days of week + Time slots (morning/afternoon/evening)]
    | [Example: Monday 9am-5pm, Tuesday 9am-5pm, etc.]
    |
    v
    /\
   /  \
  / At least 1 availability slot? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Validation error: "Mark at least one availability slot"]
  |     |
  |     +---------> [Back to Step 3]
  |
  v
[User clicks "Next"]
  |
  v
+-------------------+
| SCR-CG-002        |
| Onboarding Wizard |
| Step 4 of 5       |
| HOURLY RATE       |
+-------------------+
    |
    | [Guidance displayed: "Typical companionship rates: £12-£18/hour"]
    | [User enters hourly rate (£12-£25 range)]
    |
    v
    /\
   /  \
  / Rate valid? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Validation error: "Rate must be between £12-£25/hour"]
  |     |
  |     +---------> [Back to Step 4]
  |
  v
[User clicks "Next"]
  |
  v
+-------------------+
| SCR-CG-002        |
| Onboarding Wizard |
| Step 5 of 5       |
| VERIFICATION      |
+-------------------+
    |
    | [User sees 3 verification requirements:]
    | [1. Identity Verification (REQUIRED)]
    | [2. Right to Work Verification (REQUIRED)]
    | [3. DBS Check (OPTIONAL - for "DBS Verified" badge)]
    |
    | [User clicks "Upload ID Document"]
    v
+-------------------+
| SCR-CG-008        |
| Identity Verify   |
+-------------------+
    |
    | [User selects ID type: Passport OR Driving License]
    | [User uploads ID document photo (max 5MB, JPG/PNG/PDF)]
    | [Optional: Selfie photo for liveness check (future enhancement)]
    |
    v
    /\
   /  \
  / Upload successful? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Error: "Upload failed. File too large or wrong format"]
  |     |
  |     | [User re-uploads]
  |     +---------> [Back to upload]
  |
  v
[User clicks "Submit for Review"]
  |
  v
[ID document status: PENDING REVIEW]
[Return to SCR-CG-002 Step 5]
  |
  v
[User clicks "Upload Right to Work Document"]
  |
  v
+-------------------+
| SCR-CG-009        |
| Right to Work     |
+-------------------+
    |
    | [User selects verification method:]
    | [ ] UKVI Share Code (preferred - auto-verify)
    | [ ] Document Upload (manual admin review)
    |
    v
    /\
   /  \
  / Share Code OR Document? \
  \      /
   \    /
    \  /
     \/
    / | \
   /  |  \
Code  Upload  Neither
  |    |      |
  |    |      v
  |    |    [Validation error: "Select verification method"]
  |    |      |
  |    |      +---------> [Back to selection]
  |    |
  |    v
  |  [User uploads document: Passport, Visa, BRP card]
  |  [User enters expiry date (if applicable)]
  |    |
  |    v
  |  [Document status: PENDING REVIEW]
  |    |
  v    v
[User enters UKVI Share Code]
[System validates code with UKVI API (auto-verify)]
  |
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
|   [Error: "Invalid share code. Check code or upload document instead"]
|     |
|     | [User re-enters OR switches to document upload]
|     +---------> [Back to input]
|
v
[Right to work status: VERIFIED (auto) OR PENDING REVIEW (manual)]
[Return to SCR-CG-002 Step 5]
  |
  v
[User decides: Upload DBS OR Skip]
  |
  v
  /\
 /  \
/ Upload DBS? \
\      /
 \    /
  \  /
   \/
  / \
 /   \
Yes   No (Skip)
|     |
|     v
|   [User clicks "Skip for Now"]
|   [DBS status: NOT SUBMITTED]
|   [User will NOT receive "DBS Verified" badge]
|     |
|     +---------> [Continue to submission]
|
v
+-------------------+
| SCR-CG-010        |
| DBS Check Upload  |
+-------------------+
    |
    | [User uploads existing DBS certificate (JPG/PNG/PDF, max 5MB)]
    | [DBS certificate must be: Enhanced level, issued within 3 years]
    |
    v
    /\
   /  \
  / Upload successful? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Error: "Upload failed. File too large or wrong format"]
  |     |
  |     | [User re-uploads]
  |     +---------> [Back to upload]
  |
  v
[User clicks "Submit for Review"]
  |
  v
[DBS status: PENDING REVIEW]
[Return to SCR-CG-002 Step 5]
  |
  v
[All required verifications submitted]
[User reviews onboarding summary]
  |
  v
+-------------------+
| SCR-CG-002        |
| Onboarding Summary|
+-------------------+
    |
    | [Display summary:]
    | - Profile: Name, Photo, Bio
    | - Services: Companionship types selected
    | - Availability: Weekly schedule
    | - Rate: £X/hour
    | - Verifications: ID (pending), Right to Work (pending), DBS (pending/not submitted)
    |
    v
[User clicks "Submit for Review"]
  |
  v
  /\
 /  \
/ All required verified? \
\      /
 \    /
  \  /
   \/
  / \
 /   \
No    Yes (should not happen - admin reviews)
|     |
v     v
[Error: "Complete all required verifications"]  [Profile submitted: status = pending_verification]
|                                                [Admin notified via email/in-app]
|                                                [User sees: "Profile under review. We'll email you when verified."]
|                                                  |
+---------> [Back to Step 5]                      v
                                            [User redirected to SCR-CG-001 Dashboard]
                                                  |
                                                  v
                                            +-------------------+
                                            | SCR-CG-001        |
                                            | Caregiver         |
                                            | Dashboard         |
                                            | (pending profile) |
                                            +-------------------+
                                                  |
                                                  | [User sees: "Profile under review" banner]
                                                  | [Estimated review time: 24-48 hours]
                                                  | [User can edit profile, but cannot receive bookings yet]
                                                  |
                                                  v
                                            [WAIT: Admin reviews application]
                                                  |
                                                  v
                                            +-------------------+
                                            | SCR-ADM-005       |
                                            | Admin: Caregiver  |
                                            | Application Review|
                                            +-------------------+
                                                  |
                                                  | [Admin reviews: ID, Right to Work, Optional DBS]
                                                  v
                                                  /\
                                                 /  \
                                                / All verifications valid? \
                                                \      /
                                                 \    /
                                                  \  /
                                                   \/
                                                  / | \
                                                 /  |  \
                                            Approve Reject Needs Clarification
                                                |    |    |
                                                |    |    v
                                                |    |  [Admin requests more info/resubmission]
                                                |    |  [Email caregiver: "Please resubmit [document]"]
                                                |    |    |
                                                |    |    +---------> [User resubmits, admin re-reviews]
                                                |    |
                                                |    v
                                                |  [Admin clicks "Reject" with reason]
                                                |  [Reasons: Fake ID, expired right to work, photo mismatch]
                                                |    |
                                                |    v
                                                |  [Caregiver status: REJECTED]
                                                |  [Email caregiver: "Application rejected. Reason: [X]. Resubmit?"]
                                                |    |
                                                |    v
                                                |  [User can resubmit documents OR appeal]
                                                |    |
                                                |    +---------> [END or resubmit loop]
                                                |
                                                v
                                            [Admin clicks "Approve"]
                                            [Caregiver status: ACTIVE]
                                            [Profile made searchable]
                                            [Email caregiver: "Profile approved! You're now visible to care receivers."]
                                                  |
                                                  v
                                            +-------------------+
                                            | SCR-CG-001        |
                                            | Caregiver         |
                                            | Dashboard         |
                                            | (active profile)  |
                                            +-------------------+
                                                  |
                                                  | [User sees: "Profile live!" success banner]
                                                  | [User can now receive booking requests]
                                                  | ["Companionship Services Only" badge displayed]
                                                  | [If DBS verified: "DBS Verified" badge displayed]
                                                  |
                                                  v
                                            [WAIT: Care receiver searches and finds caregiver]
                                                  |
                                                  v
                                            [Care receiver submits booking request]
                                                  |
                                                  v
                                            +-------------------+
                                            | Notification:     |
                                            | New Booking       |
                                            | Request!          |
                                            +-------------------+
                                                  |
                                                  | [Email: "New booking request from [Name]. Respond within 24h"]
                                                  | [In-app notification badge]
                                                  |
                                                  v
                                            [User clicks notification]
                                                  |
                                                  v
                                            +-------------------+
                                            | SCR-CG-013        |
                                            | Booking Request   |
                                            | Detail            |
                                            +-------------------+
                                                  |
                                                  | [User reviews booking details:]
                                                  | - Care receiver name (first name only at this stage)
                                                  | - Date, time, duration
                                                  | - Location (postcode, distance)
                                                  | - Special requests
                                                  | - Earnings breakdown: £X caregiver earnings (after platform fee)
                                                  |
                                                  v
                                                  /\
                                                 /  \
                                                / Accept OR Decline? \
                                                \      /
                                                 \    /
                                                  \  /
                                                   \/
                                                  / \
                                                 /   \
                                            Accept    Decline
                                                |      |
                                                |      v
                                                |    [User selects decline reason]
                                                |    [Booking status: DECLINED]
                                                |    [Care receiver notified]
                                                |    [Return to dashboard]
                                                |      |
                                                |      +---------> [END]
                                                |
                                                v
                                            [User clicks "Accept Booking"]
                                                  |
                                                  v
                                                  /\
                                                 /  \
                                                / Payout setup? \
                                                \      /
                                                 \    /
                                                  \  /
                                                   \/
                                                  / \
                                                 /   \
                                                Yes   No (first booking)
                                                |      |
                                                |      v
                                                |    +-------------------+
                                                |    | SCR-CG-020        |
                                                |    | Payout Setup      |
                                                |    | (Stripe Connect)  |
                                                |    +-------------------+
                                                |          |
                                                |          | [User clicks "Setup Payout Account"]
                                                |          | [Redirected to Stripe Connect onboarding]
                                                |          | [User enters bank details, verifies identity with Stripe]
                                                |          |
                                                |          v
                                                |          /\
                                                |         /  \
                                                |        / Stripe Connect complete? \
                                                |        \      /
                                                |         \    /
                                                |          \  /
                                                |           \/
                                                |          / \
                                                |         /   \
                                                |        Yes   No (abandoned)
                                                |         |    |
                                                |         |    v
                                                |         |  [Error: "Payout setup required to accept bookings"]
                                                |         |  [Booking remains in requested state]
                                                |         |    |
                                                |         |    +---------> [User must complete payout setup]
                                                |         |
                                                |         v
                                                |    [Stripe Connect account created]
                                                |    [Return to booking acceptance flow]
                                                |         |
                                                +<--------+
                                                |
                                                v
                                            [Booking status: ACCEPTED]
                                            [Payment captured from care receiver (escrow)]
                                            [Calendar blocked for booking date/time]
                                            [Contact details shared: care receiver name, address, phone, emergency contact]
                                            [Email both parties: "Booking confirmed!"]
                                                  |
                                                  v
                                            [SUCCESS: First booking accepted!]
                                            [User can now manage booking, message care receiver, complete session]
                                                  |
                                                  v
                                            [END of onboarding → Booking lifecycle begins]
```

---

## Step-by-Step Narrative

| Step | Screen | User Action | System Response | Success Path | Error Path |
|------|--------|-------------|-----------------|--------------|------------|
| 1 | SCR-PUB-001 | Click "Become a Caregiver" button | Navigate to caregiver registration | Step 2 | N/A |
| 2 | SCR-AUTH-003 | Enter registration details (name, email, password, phone, postcode) | Validate form fields | Step 3 | Show inline errors: invalid email, weak password, invalid phone |
| 3 | SCR-AUTH-003 | Check "I understand I am registering as self-employed" (required checkbox) | Validate checkbox checked | Step 4 | Show error: "You must confirm self-employed status" |
| 4 | SCR-AUTH-003 | Check "Terms of Service (Caregiver)" and "Privacy Policy" (required checkboxes) | Validate checkboxes checked | Step 5 | Show error: "You must accept Terms and Privacy Policy" |
| 5 | SCR-AUTH-003 | Click "Create Account" | Check email uniqueness, create user record (status: pending_phone_verification), send SMS OTP | Navigate to SCR-AUTH-004 | Show error: "Email already registered. Log in?" |
| 6 | SCR-AUTH-004 | Enter 6-digit SMS code | Validate code | If valid → Step 7, If invalid → Show error | Show error: "Invalid code. X attempts remaining" OR "Code expired" |
| 7 | SCR-AUTH-004 | Code verified | Mark phone_verified = true, set status = pending_verification, send welcome email | Navigate to SCR-CG-002 (Onboarding Step 1) | N/A |
| 8 | SCR-CG-002 (Step 1) | Upload profile photo (JPG/PNG, max 5MB) | Validate file format and size | Step 9 | Show error: "File too large (max 5MB)" OR "Invalid format (JPG/PNG only)" |
| 9 | SCR-CG-002 (Step 1) | Write professional bio (500 chars max) | Validate character count | Step 10 | Show error: "Bio too long (500 characters max)" |
| 10 | SCR-CG-002 (Step 1) | Enter years of experience in care (number input) | Validate numeric input | Step 11 | Show error: "Invalid number" |
| 11 | SCR-CG-002 (Step 1) | Click "Next" | Save Step 1 data, progress to Step 2 | Navigate to Step 2 | N/A |
| 12 | SCR-CG-002 (Step 2) | Select at least one service type (checkboxes: Companionship, Light housework, Shopping, Meal prep, Transportation) | Validate at least one selected | Step 13 | Show error: "Select at least one service type" |
| 13 | SCR-CG-002 (Step 2) | Select service radius (dropdown: 5, 10, 15, 20, 30 miles) | Validate selection | Step 14 | Show error: "Select service radius" |
| 14 | SCR-CG-002 (Step 2) | Click "Next" | Save Step 2 data, progress to Step 3 | Navigate to Step 3 | N/A |
| 15 | SCR-CG-002 (Step 3) | Mark recurring availability (weekly schedule: days + time slots) | Validate at least one slot marked | Step 16 | Show error: "Mark at least one availability slot" |
| 16 | SCR-CG-002 (Step 3) | Click "Next" | Save Step 3 data, progress to Step 4 | Navigate to Step 4 | N/A |
| 17 | SCR-CG-002 (Step 4) | Enter hourly rate (£12-£25 range) | Validate rate within range | Step 18 | Show error: "Rate must be between £12-£25/hour" |
| 18 | SCR-CG-002 (Step 4) | Click "Next" | Save Step 4 data, progress to Step 5 | Navigate to Step 5 (Verification) | N/A |
| 19 | SCR-CG-002 (Step 5) | Click "Upload ID Document" | Navigate to SCR-CG-008 (Identity Verification) | Step 20 | N/A |
| 20 | SCR-CG-008 | Select ID type (Passport or Driving License), upload ID document photo (JPG/PNG/PDF, max 5MB) | Validate file format/size, upload to secure storage | Step 21 | Show error: "Upload failed. File too large or wrong format" |
| 21 | SCR-CG-008 | Click "Submit for Review" | Create verification record (type: identity, status: pending), assign to admin queue, return to SCR-CG-002 Step 5 | ID status: PENDING REVIEW, Step 22 | N/A |
| 22 | SCR-CG-002 (Step 5) | Click "Upload Right to Work Document" | Navigate to SCR-CG-009 (Right to Work Verification) | Step 23 | N/A |
| 23a | SCR-CG-009 | Select "UKVI Share Code" option, enter share code | Validate code with UKVI API (auto-verify) | If valid → Right to work status: VERIFIED (auto), Step 27 | Show error: "Invalid share code. Try again or upload document" |
| 23b | SCR-CG-009 | Select "Document Upload" option, upload document (Passport, Visa, BRP card), enter expiry date | Validate file upload, create verification record (status: pending) | Right to work status: PENDING REVIEW, Step 27 | Show error: "Upload failed" |
| 24 | SCR-CG-009 | Click "Submit for Review" (if document upload) | Create verification record (type: right_to_work, status: pending), assign to admin queue, return to SCR-CG-002 Step 5 | Right to work status: PENDING REVIEW, Step 27 | N/A |
| 25 | SCR-CG-002 (Step 5) | Decide: Upload DBS OR Skip | N/A | If upload → Step 26, If skip → Step 27 | N/A |
| 26 | SCR-CG-010 | Upload existing DBS certificate (JPG/PNG/PDF, max 5MB), click "Submit for Review" | Validate file, create verification record (type: dbs_voluntary, status: pending), return to SCR-CG-002 Step 5 | DBS status: PENDING REVIEW, Step 27 | Show error: "Upload failed" OR user clicks "Skip for Now" → DBS status: NOT SUBMITTED |
| 27 | SCR-CG-002 (Step 5 Summary) | Review onboarding summary (profile, services, availability, rate, verifications) | Display summary of all steps | Step 28 | N/A |
| 28 | SCR-CG-002 (Step 5 Summary) | Click "Submit for Review" | Check all required verifications submitted (ID + Right to Work), set status = pending_verification, notify admin, send confirmation email | Navigate to SCR-CG-001 (Dashboard - pending state) | Show error: "Complete all required verifications" |
| 29 | SCR-CG-001 (pending) | View dashboard with "Profile under review" banner | Display estimated review time (24-48h), allow profile editing but not booking acceptance | Wait for admin review (Step 30) | N/A |
| 30 | SCR-ADM-005 | Admin reviews application (ID document, Right to Work document, optional DBS) | Admin checks document authenticity, photo match, expiry dates | If all valid → Step 31a, If issues → Step 31b | N/A |
| 31a | SCR-ADM-005 | Admin clicks "Approve" | Set status = active, make profile searchable, send approval email to caregiver | Caregiver profile LIVE, Step 32 | N/A |
| 31b | SCR-ADM-005 | Admin clicks "Reject" with reason | Set status = rejected, send rejection email with reason, allow resubmission | Caregiver receives rejection email, can resubmit | N/A |
| 31c | SCR-ADM-005 | Admin requests clarification/resubmission | Send email: "Please resubmit [document] - reason: [X]" | Caregiver resubmits, admin re-reviews | N/A |
| 32 | SCR-CG-001 (active) | View dashboard with "Profile live!" success banner | Display active profile status, "Companionship Services Only" badge, optional "DBS Verified" badge if applicable | Profile now visible in care receiver searches, Step 33 | N/A |
| 33 | (Care Receiver) | Care receiver submits booking request to this caregiver | Create booking record (status: requested), authorize payment from care receiver, send notification to caregiver | Caregiver receives email + in-app notification, Step 34 | N/A |
| 34 | SCR-CG-001 (notification) | User sees notification badge, clicks "New Booking Request" | Navigate to SCR-CG-013 (Booking Request Detail) | Step 35 | N/A |
| 35 | SCR-CG-013 | Review booking details (care receiver name first name, date/time, location, special requests, earnings breakdown) | Display booking details, show "Accept" and "Decline" buttons | Step 36 | N/A |
| 36a | SCR-CG-013 | Click "Decline Booking", select decline reason (optional) | Update booking status to DECLINED, release payment authorization from care receiver, notify care receiver, log reason | Return to dashboard, booking declined | N/A |
| 36b | SCR-CG-013 | Click "Accept Booking" | Check if payout account setup | If payout setup → Step 38, If not → Step 37 | N/A |
| 37 | SCR-CG-020 | Click "Setup Payout Account", redirected to Stripe Connect onboarding | User enters bank details, verifies identity with Stripe (Stripe handles KYC) | If complete → Step 38, If abandoned → Booking remains requested | Show error: "Payout setup required to accept bookings" |
| 38 | SCR-CG-013 | Accept booking (payout setup complete) | Update booking status to ACCEPTED, capture payment from care receiver to escrow, block calendar, share contact details, send email confirmations | SUCCESS: Booking accepted, contact details shared, Step 39 | N/A |
| 39 | SCR-CG-013 (booking accepted) | View booking detail (status: ACCEPTED), can message care receiver, see care receiver address/phone/emergency contact | Display booking detail with full care receiver info, enable messaging, show booking date countdown | Wait for booking date/time, booking lifecycle continues | N/A |

---

## Decision Points

| Decision Point | Question | Yes Path | No Path |
|----------------|----------|----------|---------|
| Email unique? | Is email not already registered? | Create account, send SMS OTP | Show error: "Email already registered. Log in?" |
| SMS code valid? | Code matches, not expired (10 min), attempts < 3? | Phone verified, navigate to onboarding | Show error: "Invalid code. X attempts remaining" |
| Step 1 valid? | Photo uploaded (< 5MB), bio entered (< 500 chars), experience years entered? | Progress to Step 2 | Show validation errors |
| Step 2 valid? | At least one service type selected, service radius selected? | Progress to Step 3 | Show error: "Select at least one service type" |
| Step 3 valid? | At least one availability slot marked? | Progress to Step 4 | Show error: "Mark at least one availability slot" |
| Step 4 valid? | Hourly rate entered (£12-£25 range)? | Progress to Step 5 (Verification) | Show error: "Rate must be between £12-£25/hour" |
| UKVI share code valid? | API validates code with UKVI? | Right to work status: VERIFIED (auto) | Show error: "Invalid code. Upload document instead" |
| Upload DBS? | User wants "DBS Verified" badge? | Upload DBS certificate → PENDING REVIEW | Click "Skip for Now" → DBS status: NOT SUBMITTED |
| All required verifications submitted? | ID + Right to Work submitted? | Submit for admin review | Show error: "Complete all required verifications" |
| Admin approval? | ID valid, Right to Work valid, photo match, no red flags? | APPROVE → Profile live | REJECT → Rejection email + resubmit OR Appeal |
| Payout setup? | Stripe Connect account created? | Accept booking immediately | Redirect to SCR-CG-020 (Payout Setup) |
| Accept or Decline booking? | Caregiver decision | ACCEPT → Booking status: ACCEPTED, payment captured | DECLINE → Booking status: DECLINED, payment released |

---

## Error Paths

| Error Scenario | Trigger | User Sees | Recovery Path |
|----------------|---------|-----------|---------------|
| Email already registered | User tries to register with existing email | Error: "Email already registered. Log in instead?" | Click "Log in" → SCR-AUTH-005 (Login) |
| Weak password | Password < 8 chars, no uppercase, no number | Inline error: "Password must be 8+ chars with 1 uppercase and 1 number" | User enters stronger password |
| Invalid phone number | Phone not UK mobile format | Inline error: "Invalid UK phone number" | User corrects phone number |
| Self-employed checkbox not checked | User skips checkbox | Error: "You must confirm self-employed status" | User checks checkbox |
| Invalid SMS code | User enters wrong code | Error: "Invalid code. 2 attempts remaining" | User re-enters OR requests new code |
| Profile photo too large | Photo > 5MB | Error: "File too large (max 5MB)" | User compresses photo OR uploads smaller file |
| Bio too long | Bio > 500 chars | Error: "Bio too long (500 characters max)" | User shortens bio text |
| No service types selected | User clicks "Next" without selecting services | Error: "Select at least one service type" | User selects at least one checkbox |
| No availability slots marked | User clicks "Next" without marking availability | Error: "Mark at least one availability slot" | User marks at least one day/time slot |
| Hourly rate out of range | User enters < £12 or > £25 | Error: "Rate must be between £12-£25/hour" | User adjusts rate to valid range |
| ID upload fails | File too large or wrong format | Error: "Upload failed. File too large or wrong format" | User uploads correct file (JPG/PNG/PDF, < 5MB) |
| Invalid UKVI share code | Code not found in UKVI system | Error: "Invalid share code. Check code or upload document instead" | User re-enters code OR switches to document upload |
| Right to Work document upload fails | File upload error | Error: "Upload failed. Try again" | User re-uploads document |
| DBS upload fails | File upload error | Error: "Upload failed. Try again" | User re-uploads OR clicks "Skip for Now" |
| Required verifications not submitted | User tries to submit onboarding without ID or Right to Work | Error: "Complete all required verifications (ID + Right to Work)" | User submits missing verifications |
| Admin rejects application | ID fake/expired, Right to Work expired, photo mismatch | Rejection email: "Application rejected. Reason: [X]. Resubmit?" | User resubmits correct documents OR appeals |
| Payout setup not complete | User accepts booking without Stripe Connect setup | Error: "Payout setup required to accept bookings" OR redirect to SCR-CG-020 | User completes Stripe Connect onboarding |
| Booking already expired | User tries to accept booking > 24h after request | Error: "Booking request expired. Care receiver must rebook" | Booking removed from queue |

---

## Data Captured Per Step

| Step | Data Input | Validation Rules | Where Stored |
|------|------------|------------------|--------------|
| 2 | Full name | Required, 2-100 chars | users.name |
| 2 | Email address | Required, valid format, unique | users.email |
| 2 | Password | Required, 8+ chars, 1 uppercase, 1 number | users.password_hash (hashed) |
| 2 | Phone number | Required, UK mobile format | users.phone |
| 2 | Postcode | Required, UK format | caregiver_profiles.postcode |
| 2 | Self-employed confirmation | Required checkbox | caregiver_profiles.self_employed_confirmed_at |
| 2 | Terms acceptance (caregiver version) | Required checkbox | users.terms_accepted_at |
| 2 | Privacy policy acceptance | Required checkbox | users.privacy_accepted_at |
| 6 | SMS verification code | 6 digits, expires 10 min | verification_codes.code (hashed, temporary) |
| 8 | Profile photo | JPG/PNG, max 5MB | caregiver_profiles.profile_photo_url |
| 9 | Professional bio | Required, 500 chars max | caregiver_profiles.bio |
| 10 | Years of experience | Required, numeric | caregiver_profiles.years_experience |
| 12 | Service types offered | At least one selected | caregiver_profiles.services_offered (JSON array) |
| 13 | Service radius | Required, 5-30 miles | caregiver_profiles.service_radius_miles |
| 15 | Availability schedule | At least one slot | caregiver_profiles.availability_schedule (JSON) |
| 17 | Hourly rate | Required, £12-£25 | caregiver_profiles.hourly_rate |
| 20 | ID document type | Passport or Driving License | verifications.document_type |
| 20 | ID document upload | JPG/PNG/PDF, max 5MB | verifications.document_url (secure storage) |
| 23a | UKVI share code | 9-digit code | verifications.share_code (validated with UKVI API) |
| 23b | Right to Work document upload | JPG/PNG/PDF, max 5MB | verifications.document_url |
| 23b | Right to Work expiry date | Future date (if applicable) | verifications.expiry_date |
| 26 | DBS certificate upload (optional) | JPG/PNG/PDF, max 5MB | verifications.document_url |
| 30 | Admin verification decision | Approve/Reject/Needs Clarification | verifications.status, verifications.admin_notes |
| 37 | Stripe Connect bank details | Collected by Stripe (not stored by platform) | caregiver_profiles.stripe_connect_account_id |
| 36 | Booking acceptance decision | Accept or Decline | bookings.status, bookings.accepted_at |
| 36 | Decline reason (optional) | Dropdown selection | bookings.decline_reason |

---

## Notifications Triggered

| Step | Notification Type | Recipient | Content Summary | Trigger |
|------|-------------------|-----------|-----------------|---------|
| 5 | SMS | Caregiver | "Your verification code is XXXXXX. Valid for 10 minutes." | User submits registration |
| 7 | Email | Caregiver | "Welcome to iCare! Complete your profile to start receiving bookings." | Phone verification complete |
| 28 | Email | Caregiver | "Profile submitted for review! We'll email you within 24-48 hours when verified." | Onboarding submitted |
| 28 | Email | Admin | "New caregiver application: [Name]. Review ID, Right to Work, optional DBS." | Onboarding submitted |
| 28 | In-app | Admin | "New caregiver application to review" (notification badge) | Onboarding submitted |
| 31a | Email | Caregiver | "Profile approved! You're now visible to care receivers. Start receiving bookings." | Admin approves application |
| 31b | Email | Caregiver | "Application rejected. Reason: [X]. Resubmit correct documents or contact support." | Admin rejects application |
| 31c | Email | Caregiver | "Clarification needed for your application. Please resubmit: [X]" | Admin requests resubmission |
| 33 | Email | Caregiver | "New booking request from [Care Receiver Name]. Review and respond within 24 hours." | Care receiver submits booking request |
| 33 | SMS | Caregiver | "New booking request - [Date] [Time] - £[Amount]. Respond in app." | Care receiver submits booking request |
| 33 | In-app | Caregiver | "New booking request" (notification badge + dashboard alert) | Care receiver submits booking request |
| 36a | Email | Care Receiver | "Booking declined by [Caregiver Name]. Reason: [X]. Search for another caregiver?" | Caregiver declines booking |
| 38 | Email | Both | "Booking confirmed! [Caregiver Name] accepted your request." (Care Receiver) / "Booking confirmed. Care receiver details: [X]" (Caregiver) | Caregiver accepts booking |
| 38 | SMS | Both | "Booking confirmed for [Date] at [Time]." | Caregiver accepts booking |

---

## Edge Cases & Alternative Paths

### Edge Case 1: Caregiver Abandons Onboarding Mid-Flow
**Trigger**: User closes browser during onboarding (e.g., after Step 2 of 5)
**System Behavior**:
- Onboarding progress saved (status: incomplete)
- User can resume later via SCR-CG-001 Dashboard → "Complete Your Profile" banner
- If not resumed within 30 days → Send reminder email ("Finish your profile to start earning")
- If not resumed within 90 days → Delete incomplete profile (GDPR data minimization)

### Edge Case 2: UKVI Share Code API Unavailable
**Trigger**: UKVI API down or rate-limited
**System Behavior**:
- Show error: "UKVI service temporarily unavailable. Upload document instead?"
- User can switch to manual document upload
- Admin reviews document manually (no auto-verification)

### Edge Case 3: Admin Requests Clarification Multiple Times
**Trigger**: Admin rejects application → Caregiver resubmits → Admin rejects again
**System Behavior**:
- After 3 rejections → Escalate to senior admin for final review
- If still rejected → Email caregiver: "Application permanently rejected. Contact support if you believe this is an error."

### Edge Case 4: Caregiver Has Expired Right to Work
**Trigger**: Admin reviews Right to Work document, sees expiry date in past
**System Behavior**:
- Admin rejects application with reason: "Right to Work expired. Renew visa and resubmit."
- Caregiver resubmits after renewing visa
- Admin re-reviews

### Edge Case 5: Caregiver Uploads Fake DBS Certificate
**Trigger**: Admin reviews DBS certificate, identifies as fake (wrong format, fake certificate number)
**System Behavior**:
- Admin permanently bans account (fraud)
- Email caregiver: "Account terminated for fraudulent document submission."
- Admin may report to DBS Update Service or police (if criminal intent suspected)

### Edge Case 6: Caregiver Accepts Booking But Payout Setup Fails
**Trigger**: User completes Stripe Connect onboarding, but Stripe rejects (e.g., bank account verification fails)
**System Behavior**:
- Booking remains ACCEPTED (payment already captured from care receiver)
- Email caregiver: "Payout setup incomplete. Update bank details in Settings > Payout Account."
- If not fixed by booking date → Platform holds payment until payout setup complete OR admin manually processes payout

### Edge Case 7: Caregiver Changes Mind After Accepting Booking
**Trigger**: Caregiver clicks "Cancel Booking" after accepting (before start time)
**Flow**:
- If > 48h before start → No penalty, booking cancelled, care receiver notified
- If < 48h before start → Caregiver flagged (3 strikes = suspension), care receiver receives full refund + priority support
**User Sees**: Warning modal: "Cancelling < 48h before start may result in account warning. Continue?"

### Edge Case 8: Multiple Booking Requests Arrive Simultaneously
**Trigger**: 3 care receivers submit booking requests for same caregiver at same time
**System Behavior**:
- All 3 requests shown in dashboard queue
- Caregiver accepts 1st request → Calendar blocked for that date/time
- Other 2 requests: If conflicting date/time → Auto-decline with message: "Caregiver no longer available for this time"

### Edge Case 9: Caregiver Profile Photo Contains Inappropriate Content
**Trigger**: Admin reviews profile photo, identifies inappropriate content (nudity, offensive symbols, etc.)
**System Behavior**:
- Admin rejects application with reason: "Profile photo inappropriate. Upload professional photo."
- User resubmits appropriate photo
- Admin re-reviews

### Edge Case 10: Caregiver Has DBS Certificate But It's Not Enhanced Level
**Trigger**: Admin reviews DBS certificate, sees it's Basic or Standard level (not Enhanced)
**System Behavior**:
- Admin accepts DBS submission BUT does NOT award "DBS Verified" badge (Enhanced level required)
- Email caregiver: "DBS certificate received but must be Enhanced level for 'DBS Verified' badge. Upgrade your DBS and resubmit."

---

## Compliance & Safeguarding Checkpoints

### GDPR Checkpoints

| Checkpoint | Stage | Data Protection Action |
|-----------|-------|----------------------|
| Terms acceptance | Registration (Step 4) | Caregiver explicitly accepts Terms of Service (Caregiver version) and Privacy Policy |
| Self-employed status confirmation | Registration (Step 3) | Caregiver confirms understanding of self-employed status (NOT employee) |
| Data minimization | Throughout | Only collect data necessary for service provision and legal compliance |
| Right to erasure | Post-registration | Caregiver can request account deletion (14-day cooling-off, 7-year retention for safeguarding/financial) |
| Data retention | Throughout | Verification documents retained for 7 years (Immigration Act compliance, safeguarding audit trail) |

### Immigration Act 2014 Compliance

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| Right to Work verification | UKVI share code (auto-verify) OR document upload (manual admin review) | Step 23 (SCR-CG-009) |
| Document retention | Verification documents retained for 7 years (legal obligation) | Step 24 (stored securely) |
| Verification deadline | Right to Work must be verified BEFORE caregiver can accept bookings (profile NOT live until verified) | Step 30-32 (admin approval gate) |
| Expiry date monitoring | Admin checks expiry date of Right to Work documents (visa, BRP card) | Step 30 (SCR-ADM-005) |

### Safeguarding Vulnerable Groups Act 2006 (DBS)

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| DBS voluntary at Tier 1 | Companionship is NOT a regulated activity → DBS voluntary (not mandatory) | Step 25-26 (SCR-CG-010) |
| "DBS Verified" badge | Awarded ONLY if caregiver uploads valid Enhanced DBS certificate (issued within 3 years) | Step 30 (admin reviews DBS) |
| DBS level requirement | Enhanced DBS required for badge (Basic or Standard NOT sufficient) | Step 30 (admin checks DBS level) |
| Future Tier 2+ requirement | Personal care services (Tier 2+) will require MANDATORY Enhanced DBS | Step 26 note: "Optional now, mandatory if you offer personal care later" |

### Care Act 2014 Compliance

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| Safeguarding duty | Platform verifies caregiver identity, Right to Work, and optional DBS BEFORE allowing bookings | Step 30 (admin approval gate) |
| Admin verification | Human admin reviews all verification documents (no automated approval for identity/Right to Work) | Step 30 (SCR-ADM-005) |
| Document authenticity check | Admin checks for fake documents, photo mismatch, expired documents | Step 30 (admin review) |
| Rejection documentation | Admin documents rejection reason (audit trail for safeguarding) | Step 31b (rejection logged) |

### IR35 Tax Compliance (Self-Employed Status)

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| Self-employed confirmation | Caregiver explicitly confirms understanding of self-employed status | Step 3 (SCR-AUTH-003 checkbox) |
| No mutuality of obligation | Caregiver can decline any booking without penalty (except repeated late cancellations) | Step 36a (decline without penalty) |
| Caregiver control | Caregiver sets own hourly rate, controls availability, chooses which bookings to accept | Step 17 (rate setting), Step 15 (availability), Step 36 (accept/decline) |
| Substitution rights | Caregiver can substitute another caregiver (future feature - Tier 2+) | Not in Tier 1 |
| Financial risk | Caregiver liable for own insurance, tax, National Insurance | Step 3 (Terms of Service - Caregiver version) |

---

## Success Metrics

| Metric | Target | Measurement Point |
|--------|--------|------------------|
| Registration completion rate | 70% (users who start registration complete phone verification) | Step 7 vs Step 2 |
| Onboarding completion rate | 60% (users who start onboarding submit for review) | Step 28 vs Step 7 |
| Admin approval rate | 90% (applications approved on first review) | Step 31a vs Step 30 |
| Time to profile live | < 48 hours (registration to admin approval) | Step 31a vs Step 2 |
| DBS upload rate | 40% (caregivers upload DBS certificate voluntarily) | Step 26 vs Step 25 |
| First booking acceptance rate | 80% (caregivers accept first booking request within 24h) | Step 38 vs Step 33 |
| Payout setup completion rate | 95% (caregivers complete Stripe Connect on first booking acceptance) | Step 37 complete vs Step 37 start |
| Average time to first booking | < 7 days (profile live to first booking accepted) | Step 38 vs Step 31a |

---

## Product Gaps Identified

### GAP 1: Insurance Verification Not Documented
**Issue**: GD-03 open question: What Public Liability insurance minimum should be required?
**Impact**: Onboarding wizard does not collect insurance details. Terms of Service mention insurance requirement but verification not implemented.
**Recommendation**:
- Founder decision required: £1M, £2M, or £5M Public Liability insurance?
- Add insurance verification step (Step 5.5): Upload insurance certificate, admin verifies
- Insurance must be valid before profile goes live (additional approval gate)

### GAP 2: DBS Update Service Integration Not Implemented
**Issue**: If caregiver has DBS Update Service subscription, platform cannot auto-verify DBS validity (must rely on uploaded certificate expiry date)
**Impact**: Caregivers must re-upload DBS certificate every 3 years (manual process)
**Recommendation**: Integrate DBS Update Service API (if available) for auto-renewal verification (Tier 2+ enhancement)

### GAP 3: Reference Checks Not Implemented
**Issue**: Platform does not collect or verify caregiver references (previous employers, character references)
**Impact**: Safeguarding concern - no validation of caregiver work history or character
**Recommendation**:
- Add reference collection step (Step 5.5): Collect 2 references (name, email, phone, relationship)
- Admin contacts references before approval (adds 1-2 days to approval time)
- References required for Tier 2+ (personal care services)

### GAP 4: Qualification Verification Not Implemented (Tier 1)
**Issue**: Platform does not verify care qualifications (NVQ, City & Guilds) at Tier 1 (companionship only)
**Impact**: Acceptable at Tier 1 (companionship does not require qualifications), but must be implemented for Tier 2+ (personal care requires qualifications)
**Recommendation**: Defer to Tier 2+, but plan qualification verification system (upload certificates, admin verifies)

### GAP 5: Identity Liveness Check Not Implemented
**Issue**: ID verification relies on uploaded document only (no liveness check to prevent fake IDs or identity theft)
**Impact**: Moderate safeguarding risk - determined fraudster could upload fake ID
**Recommendation**:
- Add Stripe Identity liveness check (selfie video + government ID verification)
- Admin reviews Stripe Identity verification result (auto-verify if pass, manual review if fail)
- Cost: £1-2 per verification (Stripe Identity pricing)

### GAP 6: Caregiver Dashboard (Pending State) Not in R0
**Issue**: Step 29 shows SCR-CG-001 (Caregiver Dashboard - pending state), but dashboard deferred from R0
**Current R0 Solution**: Email notifications only ("Profile under review, we'll email you when approved")
**Impact**: Poor UX - caregiver cannot check verification status in-app, must wait for email
**Recommendation**: Include minimal dashboard (SCR-CG-001) in R0 with status banner: "Profile under review" OR "Profile live"

### GAP 7: Booking Request Notification Preferences Not Implemented
**Issue**: Caregiver receives all booking request notifications (email + SMS + in-app), cannot customize preferences
**Impact**: Notification fatigue if multiple requests, may lead to unsubscribes or ignored notifications
**Recommendation**: Add notification preferences screen (R1+): "How do you want to be notified of booking requests? Email / SMS / In-app / All"

---

## Next Steps for Engineering

### Frontend Implementation
1. Build caregiver registration (SCR-AUTH-003) with self-employed checkbox validation
2. Build 5-step onboarding wizard (SCR-CG-002) with progress indicator and "Save and Continue Later" functionality
3. Build identity verification screen (SCR-CG-008) with file upload (max 5MB, JPG/PNG/PDF)
4. Build Right to Work verification screen (SCR-CG-009) with UKVI share code input OR document upload
5. Build DBS upload screen (SCR-CG-010) with "Skip for Now" option
6. Build onboarding summary screen with "Submit for Review" CTA
7. Build caregiver dashboard (SCR-CG-001) with pending/active state banners
8. Build booking request detail screen (SCR-CG-013) with accept/decline buttons and earnings breakdown
9. Build Stripe Connect payout setup flow (SCR-CG-020) with redirect to Stripe

### Backend Implementation
1. Caregiver registration API with self-employed status capture
2. Onboarding wizard API with step-by-step progress tracking (save/resume functionality)
3. File upload API for verification documents (secure storage: AWS S3 or equivalent)
4. UKVI share code validation API (integration with UKVI Right to Work Checking Service)
5. Admin verification queue API (list pending applications, retrieve verification documents)
6. Admin approval/rejection API with reason capture
7. Booking request notification API (email + SMS via Twilio + in-app)
8. Stripe Connect onboarding webhook listeners (account created, account updated, payout failed)
9. Booking acceptance API with payout setup check

### QA Test Cases
1. Happy path: Registration → Onboarding (all 5 steps) → Admin approval → Profile live → First booking accepted (end-to-end)
2. Error path: Invalid registration data (email taken, weak password, no self-employed confirmation)
3. Error path: Invalid onboarding data (photo too large, bio too long, no services selected)
4. Error path: Verification upload failures (file too large, wrong format)
5. Edge case: Abandon onboarding mid-flow (resume later, auto-delete after 90 days)
6. Edge case: UKVI share code invalid (switch to document upload)
7. Edge case: Admin rejects application (caregiver resubmits, admin re-reviews)
8. Edge case: Caregiver accepts booking without payout setup (forced redirect to Stripe Connect)
9. Edge case: Multiple booking requests arrive simultaneously (accept 1st, auto-decline conflicting)
10. Accessibility: Keyboard navigation, screen reader support (WCAG 2.1 AA)
11. Performance: File upload < 10 sec, onboarding step transitions < 1 sec

---

**Document Status**: COMPLETE
**Last Updated**: 2026-02-02
**Version**: 1.0
**Source Documents**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`
- `/docs/tiers/tier1/draft-design-specs/route-map.md`
- `/docs/tiers/common/spec/state-maps.md` (Registration Flow)
- `/docs/tiers/tier1/TIER1_COMPREHENSIVE_ANALYSIS.md` (Journey 2)
