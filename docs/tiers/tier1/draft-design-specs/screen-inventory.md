# Tier 1 Screen Inventory: Canonical Reference

**Document Purpose**: Complete screen-level specification for all Tier 1 (Companionship MVP) screens.

**Document Owner**: Product Team
**Document Status**: CANONICAL - All design and development references this document
**Last Updated**: 2026-02-06
**Version**: 1.0

**Tier Scope**: This inventory covers **Tier 1 (Minimal)** launch features only. Screens requiring Tier 2+ (personal care, care skills, mandatory DBS) or Tier 3+ (medical conditions, risk assessment) are explicitly excluded.

---

## Executive Summary

**Total Screens Documented**: 30 screens (R0 Launch-Critical)
**Screen Categories**:
- Authentication & Registration: 6 screens
- Public/Compliance: 4 screens
- Care Receiver Flows: 8 screens (includes Dashboard, Message Thread, Leave Review)
- Caregiver Flows: 8 screens (includes Dashboard)
- Admin Operations: 4 screens

**Tier 1 Constraints**:
- Services: Companionship only (NO personal care, NO condition matching)
- Data: Standard personal data (NO health data, NO special category data)
- Verification: ID + Right to Work + Voluntary DBS (NO mandatory DBS, NO qualifications)

**Source Documents**:
- `/docs/tiers/tier1/planning/r0-launch-scope.md` - 30 R0 launch-critical screens (updated 2026-02-06)
- `/docs/tiers/tier1/features.md` - 77 Tier 1 features across 11 systems
- `/docs/tiers/common/spec/feature-map.md` - Complete feature definitions with tier tags
- `/docs/tiers/common/spec/state-maps.md` - 7 critical state machine flows

---

## Document Organization

1. [Authentication & Registration](#category-1-authentication--registration) (6 screens)
2. [Public & Compliance](#category-2-public--compliance) (4 screens)
3. [Care Receiver Flows](#category-3-care-receiver-flows) (8 screens)
4. [Caregiver Flows](#category-4-caregiver-flows) (8 screens)
5. [Admin Operations](#category-5-admin-operations) (4 screens)
6. [Route Index](#route-index)
7. [Cross-Reference Matrix](#cross-reference-matrix)
8. [Gaps and Open Questions](#gaps-and-open-questions)

---

## Category 1: Authentication & Registration

### SCR-AUTH-001: Care Receiver Registration

**Route**: `/register/care-receiver`
**Purpose**: Enable care receivers or family members to create an account to find and book caregivers.
**User Roles**: Unauthenticated visitors
**Access Control**: Public (no authentication required)

**Preconditions**:
- User has valid email address
- User is 65+ years old OR has documented care needs
- User accepts Terms of Service and Privacy Policy

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Empty | Form ready for input | Empty form fields, "Create Account" button enabled |
| Validation Error | Input fails validation (weak password, invalid email) | Red error messages below invalid fields |
| Submitting | Registration processing | Loading spinner, button disabled, "Creating account..." |
| Success | Account created, email verification sent | Redirect to phone verification screen with success message |
| Error | Server error or email already exists | Error banner: "Email already registered" or "Server error, try again" |

**Data Requirements**:
- **Inputs**:
  - Full name (required, 2-100 chars)
  - Email address (required, valid format)
  - Password (required, 8+ chars, 1 uppercase, 1 number)
  - Date of birth (required, for age verification)
  - Postcode (required, UK format)
  - Phone number (required, UK mobile format)
  - Emergency contact name (required)
  - Emergency contact phone (required)
  - Terms of Service acceptance (required checkbox)
  - Privacy Policy acceptance (required checkbox)
- **Outputs**: User account created with status: `pending_phone_verification`

**Primary Actions**:
- "Create Account" → SCR-AUTH-004 (Phone Verification)
- "Already have an account? Log in" → SCR-AUTH-005 (Login)
- "Register as a Caregiver" link → SCR-AUTH-003 (Caregiver Registration)

**Data Sensitivity**: Standard Personal Data (Name, email, DOB, postcode, phone, emergency contact)

**Related Screens**:
- Entry points: SCR-PUB-001 (Homepage), SCR-AUTH-005 (Login)
- Exit points: SCR-AUTH-004 (Phone Verification)

---

### SCR-AUTH-002: Family Member Registration

**Route**: `/register/family`
**Purpose**: Enable family members to register on behalf of a care receiver (proxy access for vulnerable adults).
**User Roles**: Unauthenticated visitors
**Access Control**: Public (no authentication required)

**Preconditions**:
- Family member has valid email address
- Care receiver consents to proxy account (attestation required)
- Family member has authority to act on behalf of care receiver

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Empty | Form ready for input | Two-section form: "Your Details" and "Care Receiver Details" |
| Validation Error | Input fails validation | Red error messages below invalid fields |
| Submitting | Registration processing | Loading spinner, "Creating account..." |
| Success | Account created, linked to care receiver | Redirect to phone verification screen |
| Error | Server error or email conflict | Error banner with specific issue |

**Data Requirements**:
- **Inputs**:
  - **Family Member Section**:
    - Full name (required)
    - Email (required)
    - Password (required, 8+ chars)
    - Phone number (required)
    - Relationship to care receiver (dropdown: daughter, son, spouse, sibling, other)
  - **Care Receiver Section**:
    - Full name (required)
    - Date of birth (required)
    - Postcode (required)
    - Phone number (optional, if different from family member)
    - Emergency contact (if not the registering family member)
  - **Consent**:
    - "I confirm I have the care receiver's consent to register on their behalf" (required checkbox)
    - Terms of Service (required checkbox)
    - Privacy Policy (required checkbox)
- **Outputs**: Two linked accounts created (care receiver + family member proxy)

**Primary Actions**:
- "Create Account" → SCR-AUTH-004 (Phone Verification)
- "Already have an account? Log in" → SCR-AUTH-005 (Login)
- "Register for yourself" link → SCR-AUTH-001 (Care Receiver Registration)

**Data Sensitivity**: Standard Personal Data (Name, email, DOB, postcode, phone, relationship)

**Related Screens**:
- Entry points: SCR-PUB-001 (Homepage), SCR-AUTH-005 (Login)
- Exit points: SCR-AUTH-004 (Phone Verification)

---

### SCR-AUTH-003: Caregiver Registration

**Route**: `/register/caregiver`
**Purpose**: Enable professional caregivers to create an account to offer companionship services.
**User Roles**: Unauthenticated visitors
**Access Control**: Public (no authentication required)

**Preconditions**:
- Caregiver has valid email address and UK phone number
- Caregiver has right to work in the UK
- Caregiver accepts self-employed status and terms

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Empty | Form ready for input | Empty form fields, "Companionship Services Only" badge visible |
| Validation Error | Input fails validation | Red error messages below invalid fields |
| Submitting | Registration processing | Loading spinner, "Creating account..." |
| Success | Account created, pending verification | Redirect to phone verification, then onboarding |
| Error | Server error or email conflict | Error banner with specific issue |

**Data Requirements**:
- **Inputs**:
  - Full name (required)
  - Email address (required)
  - Password (required, 8+ chars)
  - Phone number (required, UK mobile)
  - Postcode (required, UK format)
  - Confirm self-employed status: "I understand I am registering as a self-employed professional, not an employee" (required checkbox)
  - Terms of Service (caregiver version) (required checkbox)
  - Privacy Policy (required checkbox)
- **Outputs**: Caregiver account created with status: `pending_phone_verification`

**Primary Actions**:
- "Create Account" → SCR-AUTH-004 (Phone Verification)
- "Already have an account? Log in" → SCR-AUTH-005 (Login)
- "Looking for care?" link → SCR-AUTH-001 (Care Receiver Registration)

**Data Sensitivity**: Standard Personal Data (Name, email, phone, postcode)

**Related Screens**:
- Entry points: SCR-PUB-001 (Homepage), SCR-AUTH-005 (Login)
- Exit points: SCR-AUTH-004 (Phone Verification) → SCR-CG-002 (Caregiver Onboarding)

---

### SCR-AUTH-004: Phone Verification

**Route**: `/verify/phone`
**Purpose**: Verify user phone number via SMS OTP to prevent fake accounts and ensure contact reachability.
**User Roles**: Care Receiver, Family Member, Caregiver (pending_phone_verification status)
**Access Control**: Requires pending phone verification status

**Preconditions**:
- User has completed registration (SCR-AUTH-001, SCR-AUTH-002, or SCR-AUTH-003)
- User phone number is valid UK mobile number
- SMS OTP sent to user phone

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Awaiting Code | User enters 6-digit SMS code | Input field for 6-digit code, countdown timer (10 min expiry) |
| Verifying | Code being validated | Loading spinner, button disabled |
| Success | Code verified | Redirect to appropriate next screen (dashboard or onboarding) |
| Invalid Code | Code incorrect or expired | Error message: "Invalid code. 2 attempts remaining." |
| Code Expired | 10 minutes elapsed | Error message: "Code expired. Click to request new code." |
| Attempts Exceeded | 3 failed attempts | Error message: "Too many attempts. Request new code in 10 minutes." |

**Data Requirements**:
- **Displays**: Phone number (last 4 digits masked: "****1234"), countdown timer
- **Inputs**: 6-digit SMS code
- **Outputs**: User phone_verified status = true

**Primary Actions**:
- "Verify" → Next screen based on user type:
  - Care Receiver → SCR-CR-001 (Care Receiver Dashboard)
  - Family Member → SCR-CR-001 (Care Receiver Dashboard - on behalf)
  - Caregiver → SCR-CG-002 (Caregiver Onboarding)
- "Resend code" → Send new SMS OTP (rate limit: 3 per hour)
- "Change phone number" → Return to registration screen

**Data Sensitivity**: None (OTP is temporary authentication token)

**Related Screens**:
- Entry points: SCR-AUTH-001, SCR-AUTH-002, SCR-AUTH-003
- Exit points: SCR-CR-001 (Care Receiver Dashboard), SCR-CG-002 (Caregiver Onboarding)

---

### SCR-AUTH-005: Login

**Route**: `/login`
**Purpose**: Authenticate returning users to access their accounts.
**User Roles**: All registered users
**Access Control**: Public (no authentication required to view form)

**Preconditions**:
- User has registered account
- User has verified email and phone

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Empty | Form ready for input | Email and password fields empty, "Log In" button enabled |
| Validation Error | Missing email or password | Red error: "Email and password required" |
| Authenticating | Credentials being verified | Loading spinner, button disabled |
| Success | Login successful | Redirect to role-appropriate dashboard |
| Invalid Credentials | Email or password incorrect | Error: "Invalid email or password. 3 attempts remaining." |
| Account Locked | Too many failed attempts | Error: "Account locked for 10 minutes due to failed login attempts." |
| Account Suspended | Admin suspended account | Error: "Your account has been suspended. Contact support." |
| Account Banned | Admin banned account | Error: "Your account has been permanently banned." |

**Data Requirements**:
- **Inputs**: Email address, password
- **Outputs**: Authenticated session created, user redirected to dashboard

**Primary Actions**:
- "Log In" → Redirect based on user role:
  - Care Receiver → SCR-CR-001 (Care Receiver Dashboard)
  - Caregiver (verified) → SCR-CG-001 (Caregiver Dashboard)
  - Caregiver (pending verification) → SCR-CG-002 (Caregiver Onboarding)
  - Admin → SCR-ADM-001 (Admin Dashboard)
- "Forgot password?" → SCR-AUTH-006 (Password Reset Request)
- "Don't have an account? Sign up" → Links to SCR-AUTH-001 and SCR-AUTH-003

**Data Sensitivity**: None (login credentials, not stored in plaintext)

**Related Screens**:
- Entry points: SCR-PUB-001 (Homepage), all authenticated screens (logout)
- Exit points: SCR-CR-001, SCR-CG-001, SCR-CG-002, SCR-ADM-001

---

### SCR-AUTH-006: Password Reset Request

**Route**: `/forgot-password`
**Purpose**: Enable users to reset forgotten passwords via email link (high-volume elderly user need).
**User Roles**: All registered users
**Access Control**: Public (no authentication required)

**Preconditions**:
- User has registered account with verified email

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Empty | Form ready for email input | Email input field, "Send Reset Link" button |
| Validation Error | Email format invalid | Red error: "Invalid email format" |
| Submitting | Request processing | Loading spinner, button disabled |
| Success | Reset email sent | Success message: "Check your email for password reset link (valid 1 hour)" |
| Email Not Found | Email not in system | Generic success message (security: don't reveal account existence) |
| Rate Limited | Too many reset requests | Error: "Too many requests. Try again in 10 minutes." |

**Data Requirements**:
- **Inputs**: Email address
- **Outputs**: Password reset email sent (if account exists)

**Primary Actions**:
- "Send Reset Link" → Success screen (generic message)
- Email link → `/reset-password/:token` (not in R0 scope, handled via email service)
- "Remember your password? Log in" → SCR-AUTH-005 (Login)

**Data Sensitivity**: None (email address only, no password exposed)

**Related Screens**:
- Entry points: SCR-AUTH-005 (Login)
- Exit points: Success message (user checks email)

---

## Category 2: Public & Compliance

### SCR-PUB-001: Homepage

**Route**: `/`
**Purpose**: Entry point for all users - explain platform value proposition and drive registration.
**User Roles**: All visitors (authenticated and unauthenticated)
**Access Control**: Public

**Preconditions**: None

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Unauthenticated | Visitor not logged in | Hero CTA: "Find Care" and "Become a Caregiver" buttons |
| Authenticated (Care Receiver) | User logged in | Hero CTA: "Find Caregivers" → direct to search |
| Authenticated (Caregiver) | Caregiver logged in | Hero CTA: "Go to Dashboard" → direct to caregiver dashboard |

**Data Requirements**:
- **Displays**:
  - Hero section: Value proposition, safety commitments
  - How It Works: 3-step process for care receivers and caregivers
  - Trust badges: "DBS Verified Caregivers", "Secure Payments", "24/7 Safeguarding Support"
  - Statistics: "500+ verified caregivers", "5,000+ bookings completed" (if available)
  - Testimonials: 2-3 care receiver/family quotes (with consent)
- **Inputs**: None (static content)

**Primary Actions**:
- "Find Care" button → SCR-AUTH-001 (Care Receiver Registration) OR SCR-CR-003 (Search) if authenticated
- "Become a Caregiver" button → SCR-AUTH-003 (Caregiver Registration) OR SCR-CG-001 (Dashboard) if authenticated
- "Log In" link → SCR-AUTH-005 (Login)
- "Learn More" links → How It Works, Safety, Pricing sections (same page anchors)
- Footer links → SCR-PUB-006 (Terms), SCR-PUB-007 (Privacy), SCR-PUB-008 (Safeguarding)

**Data Sensitivity**: None (public marketing content)

**Related Screens**:
- Entry points: Direct navigation, organic search
- Exit points: All registration and login screens

---

### SCR-PUB-006: Terms of Service

**Route**: `/terms`
**Purpose**: Legal requirement - display enforceable terms for care receivers and caregivers (Consumer Rights Act).
**User Roles**: All visitors
**Access Control**: Public

**Preconditions**: None

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Display | Terms displayed | Scrollable document with table of contents |

**Data Requirements**:
- **Displays**:
  - **Care Receiver Terms**:
    - Service description (companionship services only at Tier 1)
    - Booking and cancellation policy
    - Payment terms and platform fees
    - Liability limitations (platform NOT liable for care quality)
    - Dispute resolution process
  - **Caregiver Terms**:
    - Self-employed contractor status (NOT employee)
    - Verification requirements (ID, right to work, voluntary DBS)
    - Commission structure (platform fee deduction)
    - Professional conduct expectations
    - Insurance requirements (own liability insurance)
    - Termination and suspension conditions
  - **General Terms**:
    - User eligibility (age, location)
    - Prohibited uses
    - Intellectual property
    - Governing law (UK law, England and Wales jurisdiction)
    - Last updated date
- **Inputs**: None (read-only document)

**Primary Actions**:
- "Back to Home" → SCR-PUB-001 (Homepage)
- "Contact Us" → Email link or contact form

**Data Sensitivity**: None (public legal document)

**Related Screens**:
- Entry points: Registration screens (checkbox link), footer links, homepage
- Exit points: None (informational only)

---

### SCR-PUB-007: Privacy Policy

**Route**: `/privacy`
**Purpose**: GDPR requirement - transparency about personal data collection, use, storage, and rights.
**User Roles**: All visitors
**Access Control**: Public

**Preconditions**: None

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Display | Privacy policy displayed | Scrollable document with table of contents |

**Data Requirements**:
- **Displays**:
  - **Data Controller**: Platform company name, ICO registration number
  - **Data Collected**:
    - Care Receivers: Name, email, phone, postcode, DOB, emergency contact
    - Caregivers: Name, email, phone, postcode, ID documents, right to work docs, voluntary DBS certificate, bank account (Stripe)
    - All Users: IP address, cookies, booking history, messages, reviews
  - **Legal Basis**: Contract (service provision), legitimate interest (safety), consent (marketing)
  - **Data Use**: Matching, booking, payment processing, safeguarding, platform improvement
  - **Data Sharing**: Stripe (payments), Twilio (SMS), email service, admin team, safeguarding authorities (when required by law)
  - **Data Retention**: 7 years (financial records), 7 years (safeguarding records), 2 years (messages), user-deletable (profile data)
  - **User Rights**:
    - Right to access (download data)
    - Right to erasure (delete account with 30-day cooling-off)
    - Right to rectification (correct data)
    - Right to data portability (export JSON)
    - Right to withdraw consent (marketing)
  - **Contact**: Data protection officer email, complaints to ICO
  - **Last Updated**: Date of last policy review
- **Inputs**: None (read-only document)

**Primary Actions**:
- "Back to Home" → SCR-PUB-001 (Homepage)
- "Contact DPO" → Email link

**Data Sensitivity**: None (public policy document describing data practices)

**Related Screens**:
- Entry points: Registration screens (checkbox link), footer links, homepage
- Exit points: None (informational only)

---

### SCR-PUB-008: Safeguarding Policy

**Route**: `/safeguarding-policy`
**Purpose**: Care Act 2014 requirement - demonstrate safeguarding commitment and reporting procedures.
**User Roles**: All visitors
**Access Control**: Public

**Preconditions**: None

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Display | Safeguarding policy displayed | Scrollable document with table of contents |

**Data Requirements**:
- **Displays**:
  - **Care Act 2014 Compliance**: Platform commitment to safeguarding vulnerable adults
  - **Safeguarding Principles** (Care Act 2014 Section 42):
    - Empowerment (presumption of person-led decisions)
    - Protection (support and representation for those in need)
    - Prevention (action before harm occurs)
    - Proportionality (proportionate and least intrusive response)
    - Partnership (local solutions through services working together)
    - Accountability (accountability and transparency)
  - **Types of Abuse**:
    - Physical abuse
    - Sexual abuse
    - Psychological/emotional abuse
    - Financial exploitation
    - Neglect and self-neglect
    - Discriminatory abuse
  - **Reporting Procedures**:
    - How to report concerns (in-app button, email, phone)
    - What happens after report (investigation, escalation, outcome)
    - Response times (urgent: 1 hour, standard: 24 hours)
  - **Escalation**: When platform escalates to Safeguarding Adults Board (SAB) or police
  - **Verification Commitments**: ID verification, voluntary DBS, right to work checks (Tier 1)
  - **Emergency Contacts**: 24/7 safeguarding hotline (phone number)
  - **Last Updated**: Date of last policy review
- **Inputs**: None (read-only document)

**Primary Actions**:
- "Report a Concern" → SCR-CR-020 (Safeguarding Report) if authenticated, OR email/phone if not
- "Back to Home" → SCR-PUB-001 (Homepage)

**Data Sensitivity**: None (public policy document)

**Related Screens**:
- Entry points: Footer links, homepage, registration screens
- Exit points: None (informational only)

---

## Category 3: Care Receiver Flows

### SCR-CR-003: Caregiver Search

**Route**: `/search`
**Purpose**: Enable care receivers to discover available caregivers by location and filters.
**User Roles**: Care Receiver, Family Member
**Access Control**: Requires authentication

**Preconditions**:
- User is authenticated
- User has verified phone and email
- User has completed profile (postcode required for search)

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Empty | No search performed yet | Search form displayed, no results |
| Searching | Query in progress | Loading spinner, "Searching for caregivers..." |
| Results Found | Caregivers match criteria | List of caregiver cards sorted by distance, map view (optional) |
| No Results | No caregivers match criteria | "No caregivers found. Try widening your search radius or adjusting filters." |
| Filter Applied | Filters active | Applied filters shown as tags, "X caregivers found" count |
| Error | Server error or geolocation failure | Error banner: "Unable to search. Please try again." |

**Data Requirements**:
- **Inputs**:
  - Postcode (required, auto-filled from user profile)
  - Radius (required, dropdown: 5, 10, 15, 20, 30 miles)
  - **Filters** (optional):
    - Hourly rate range (slider: £12-£25/hour)
    - Availability (day of week, time of day)
    - Gender preference (male, female, no preference)
    - DBS Verified (checkbox: show only DBS-verified caregivers)
    - Languages spoken (multi-select: English, Welsh, other)
  - **Sort** (dropdown):
    - Distance (nearest first) - DEFAULT
    - Price (low to high)
    - Price (high to low)
    - Rating (highest first)
- **Displays**:
  - Search results: Caregiver cards showing:
    - Profile photo
    - Name (first name + last initial until booking accepted)
    - Bio (first 150 chars)
    - Distance from user ("2.3 miles away")
    - Hourly rate (£/hour)
    - Rating (stars + number of reviews)
    - Availability indicator ("Available today")
    - Badges: "DBS Verified", "Companionship Only"
  - Map view (optional): Pins showing approximate caregiver locations (obscured for privacy)
  - Result count: "24 caregivers found"

**Primary Actions**:
- "View Profile" (on caregiver card) → SCR-CR-005 (Caregiver Profile)
- "Request Booking" (on caregiver card) → SCR-CR-006 (Booking Request Form)
- "Apply Filters" → Update search results
- "Clear Filters" → Reset to default search
- "Save Search" → Future feature (not Tier 1)

**Data Sensitivity**: Low (search criteria is standard personal data, results are public caregiver profiles)

**Related Screens**:
- Entry points: SCR-CR-001 (Care Receiver Dashboard), SCR-PUB-001 (Homepage)
- Exit points: SCR-CR-005 (Caregiver Profile), SCR-CR-006 (Booking Request Form)

---

### SCR-CR-005: Caregiver Profile (Public View)

**Route**: `/caregivers/:caregiverId`
**Purpose**: Display detailed caregiver profile for care receiver assessment before booking request.
**User Roles**: Care Receiver, Family Member
**Access Control**: Requires authentication

**Preconditions**:
- User is authenticated
- Caregiver profile is verified and active (admin-approved)
- Caregiver has completed onboarding

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Display | Profile loaded and displayed | Full caregiver profile with sections |
| Loading | Profile data being fetched | Loading spinner, skeleton UI |
| Not Found | Caregiver ID invalid or profile inactive | Error: "Caregiver not found or profile no longer active" |
| Unavailable | Caregiver has no availability in next 30 days | Warning banner: "This caregiver has no availability in the next 30 days" |

**Data Requirements**:
- **Displays**:
  - **Header Section**:
    - Profile photo (large)
    - Name (first name + last initial: "Sarah K.")
    - Location (town/city, not full postcode: "London, UK")
    - Hourly rate (£/hour)
    - Distance from user ("3.2 miles away")
    - Overall rating (stars + number of reviews)
    - Badges: "DBS Verified" (if applicable), "Verified Identity", "Right to Work Verified"
  - **About Section**:
    - Professional bio (full text, 500 chars max)
    - Years of experience in care
    - Service type: "Companionship Services Only" badge (Tier 1)
  - **Services Offered** (Tier 1 Only):
    - Companionship (conversation, activities)
    - Light housework and cleaning
    - Shopping and errands
    - Meal preparation (no feeding assistance)
    - Transportation (if caregiver has vehicle)
  - **Availability**:
    - Calendar showing available dates (next 30 days)
    - Available time slots (morning, afternoon, evening)
  - **Reviews Section**:
    - Recent reviews (most recent 10)
    - Review details: Rating, review text, reviewer name (anonymized: "Family Member in London"), date
  - **Verification Status**:
    - ID Verified (date)
    - Right to Work Verified (date)
    - DBS Verified (if applicable, date, expiry)
- **Inputs**: None (read-only profile view)

**Primary Actions**:
- "Request Booking" button (prominent, top right) → SCR-CR-006 (Booking Request Form)
- "Back to Search" → SCR-CR-003 (Caregiver Search)
- "Report Concern" → SCR-CR-020 (Safeguarding Report) - future, NOT in R0

**Data Sensitivity**: Low (public profile data, no sensitive information)

**Related Screens**:
- Entry points: SCR-CR-003 (Caregiver Search), SCR-CR-001 (Dashboard - featured caregivers)
- Exit points: SCR-CR-006 (Booking Request Form), SCR-CR-003 (Search)

---

### SCR-CR-006: Booking Request Form

**Route**: `/bookings/new/:caregiverId`
**Purpose**: Create a companionship booking request to be sent to caregiver for acceptance.
**User Roles**: Care Receiver, Family Member
**Access Control**: Requires authentication

**Preconditions**:
- User is authenticated
- User has payment method on file (if not, prompt to add via SCR-CR-013)
- Caregiver has availability for requested date/time
- User has emergency contact in profile

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Empty | Form ready for input | Caregiver info displayed at top, empty form fields |
| Selecting Date/Time | Date/time picker active | Calendar shows caregiver availability (available dates highlighted) |
| Calculating Price | Real-time price calculation | Price breakdown updates as duration changes |
| Validation Error | Missing required fields or invalid date | Red error messages below fields |
| Payment Method Missing | No card on file | Warning banner: "Add payment method to continue" → SCR-CR-013 |
| Submitting | Booking request processing | Loading spinner, button disabled, "Sending request..." |
| Success | Request sent to caregiver | Success modal: "Booking request sent! [Caregiver] has 24 hours to respond." → Redirect to SCR-CR-008 |
| Error | Server error or payment authorization failed | Error banner: "Unable to send request. Please try again." |

**Data Requirements**:
- **Displays** (at top of form):
  - Caregiver profile summary: Photo, name, hourly rate, distance
  - Service type: "Companionship Services Only" badge
- **Inputs**:
  - **Date & Time**:
    - Booking date (date picker, shows caregiver availability)
    - Start time (dropdown: 08:00-20:00 in 30-min increments)
    - Duration (dropdown: 2, 3, 4, 6, 8 hours)
  - **Service Details**:
    - Special requests (textarea, 500 chars max, optional)
      - Example prompts: "Preferred activities", "Mobility notes", "Access instructions"
  - **Emergency Contact** (auto-filled from profile, editable):
    - Name (required)
    - Phone (required)
    - Relationship (required)
  - **Cancellation Policy Acceptance**:
    - Checkbox: "I understand the cancellation policy: Full refund if cancelled 24+ hours before start, 50% refund if <24 hours" (required)
- **Outputs**:
  - Booking request created (status: `requested`)
  - Payment authorized (card hold, NOT charged until caregiver accepts)
  - Caregiver notified via email and in-app

**Real-Time Price Calculation Display**:
```
Booking Summary
---------------
Service: Companionship (4 hours)
Rate: £18/hour
Subtotal: £72.00
Platform fee [PLACEHOLDER: 15% commission - subject to FDR-008 final decision]: £10.80
Total: £82.80

Payment will be authorized now and charged when caregiver accepts.
```

**Primary Actions**:
- "Send Request" → SCR-CR-008 (Booking Detail) with success modal
- "Cancel" → SCR-CR-005 (Caregiver Profile)
- "Add Payment Method" (if none on file) → SCR-CR-013 (Payment Methods)

**Data Sensitivity**: Standard Personal Data (emergency contact, location, special requests)

**Related Screens**:
- Entry points: SCR-CR-005 (Caregiver Profile), SCR-CR-003 (Search)
- Exit points: SCR-CR-008 (Booking Detail), SCR-CR-013 (Payment Methods)

---

### SCR-CR-008: Booking Detail

**Route**: `/bookings/:bookingId`
**Purpose**: View booking details, status, and perform actions (cancel, confirm, message caregiver).
**User Roles**: Care Receiver, Family Member
**Access Control**: Requires authentication + booking ownership

**Preconditions**:
- User is authenticated
- User owns this booking (is the care receiver or linked family member)
- Booking exists

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Requested | Awaiting caregiver response | Status badge: "Pending Caregiver Response", countdown timer "23 hours remaining" |
| Accepted | Caregiver accepted, booking confirmed | Status badge: "Confirmed", caregiver contact details visible, "Message Caregiver" button |
| Declined | Caregiver declined | Status badge: "Declined", decline reason shown, "Search for another caregiver" button |
| Expired | 24 hours elapsed, no response | Status badge: "Expired", "Search for another caregiver" button |
| In Progress | Booking start time reached | Status badge: "In Progress", emergency contact displayed prominently |
| Completed | Caregiver marked complete | Status badge: "Completed", "Confirm Completion" or "Raise Dispute" buttons (48h window) |
| Cancelled | Either party cancelled | Status badge: "Cancelled", refund amount shown if applicable |
| Disputed | Care receiver raised dispute | Status badge: "Disputed", "Admin is reviewing your dispute" message |

**Data Requirements**:
- **Displays** (varies by state):
  - **Booking Information**:
    - Status (badge at top)
    - Caregiver profile summary (photo, name, rating, phone - ONLY if accepted)
    - Date, start time, duration
    - Location (care receiver address - ONLY visible to caregiver after acceptance)
    - Service type: "Companionship"
    - Special requests
    - Emergency contact (displayed prominently if in progress)
  - **Payment Information**:
    - Price breakdown (subtotal, platform fee, total)
    - Payment status: "Authorized" (requested), "Charged" (accepted), "Refunded" (cancelled)
  - **Actions Available** (state-dependent):
    - Requested: "Cancel Booking", "Message Caregiver" (pre-booking messaging)
    - Accepted: "Cancel Booking" (with policy warning), "Message Caregiver", "View Caregiver Profile"
    - In Progress: "Emergency Contact" (prominent button), "Message Caregiver"
    - Completed: "Confirm Completion" (releases payment), "Raise Dispute" (48h window), "Leave Review"
- **Inputs**: None (actions are buttons)

**Primary Actions**:
- "Cancel Booking" (if requested or accepted) → Confirmation modal → Update booking status, process refund
- "Message Caregiver" → SCR-CR-011 (Message Thread) - INCLUDED in R0 (Decision CB-005)
- "Confirm Completion" (if completed) → Release payment to caregiver, prompt for review → SCR-CR-015
- "Raise Dispute" (if completed, within 48h) → Dispute form modal → Create dispute (admin review)
- "Emergency Contact" (if in progress) → Display emergency protocol, "Call 999" or "Call Emergency Contact" buttons
- "Leave Review" → SCR-CR-015 (Leave Review) - INCLUDED in R0 (Decision CB-006)

**Data Sensitivity**: Standard Personal Data (care receiver address ONLY visible to caregiver after acceptance)

**Related Screens**:
- Entry points: SCR-CR-001 (Dashboard - upcoming bookings), SCR-CR-006 (after booking request sent), SCR-CG-013 (caregiver accepts)
- Exit points: SCR-CR-003 (Search), SCR-CR-015 (Leave Review), Dispute/Emergency flows

---

### SCR-CR-013: Payment Methods

**Route**: `/settings/payment`
**Purpose**: Add, manage, and set default payment method for booking payments.
**User Roles**: Care Receiver, Family Member
**Access Control**: Requires authentication

**Preconditions**:
- User is authenticated
- User has Stripe customer account created

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Empty | No payment methods on file | Empty state: "No payment methods. Add a card to make bookings." |
| Display | Payment methods listed | List of saved cards (last 4 digits, brand, expiry, default badge) |
| Adding Card | Stripe card input form active | Stripe Elements iframe for secure card input |
| Processing | Card being saved | Loading spinner, "Saving card..." |
| Success | Card saved | Success banner: "Card added successfully", card appears in list |
| Error | Card validation failed or Stripe error | Error banner: "Unable to save card. Please check details." |
| Deleting Card | Card being removed | Confirmation modal: "Are you sure you want to remove this card?" |

**Data Requirements**:
- **Displays**:
  - List of saved payment methods:
    - Card brand (Visa, Mastercard, Amex)
    - Last 4 digits (****1234)
    - Expiry date (MM/YY)
    - "Default" badge (if default payment method)
    - Actions: "Set as Default", "Remove"
- **Inputs** (for adding new card):
  - Card number (Stripe Elements secure input)
  - Expiry date (MM/YY)
  - CVC (3-4 digits)
  - Cardholder name
  - Billing postcode (UK format)
- **Outputs**:
  - Stripe payment method token stored (PCI-compliant, no raw card data stored by platform)

**Primary Actions**:
- "Add Payment Method" → Stripe card input form
- "Save Card" → Tokenize card via Stripe, save token to user account
- "Set as Default" (on card) → Update default payment method
- "Remove" (on card) → Delete payment method (with confirmation modal)
- "Back to Dashboard" → SCR-CR-001 (Care Receiver Dashboard)

**Data Sensitivity**: High (payment card data, handled by Stripe PCI-DSS compliant infrastructure)

**Related Screens**:
- Entry points: SCR-CR-006 (Booking Request Form - if no card on file), SCR-CR-001 (Dashboard settings), SCR-CR-017 (Account Settings)
- Exit points: SCR-CR-006 (return to booking), SCR-CR-001 (Dashboard)

---

### SCR-CR-001: Care Receiver Dashboard

**R0 Status**: INCLUDED (Decision CB-001 - 2026-02-02)

**Route**: `/dashboard`
**Purpose**: Central hub for care receivers - view upcoming bookings, search caregivers, manage account.
**User Roles**: Care Receiver, Family Member
**Access Control**: Requires authentication

**Preconditions**:
- User is authenticated
- User has verified phone and email

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Empty | No bookings yet | Welcome message, "Find Caregivers" CTA, onboarding checklist if incomplete |
| Active Bookings | Upcoming or in-progress bookings | Booking cards displayed, sorted by date (soonest first) |
| Pending Requests | Booking requests awaiting caregiver response | "Pending Requests" section with countdown timers |

**Data Requirements**:
- **Displays**:
  - **Upcoming Bookings** (next 7 days):
    - Booking cards: Caregiver photo, name, date/time, status, "View Details" button
    - Next booking (large card at top): Prominent display with countdown "in 2 days"
  - **Pending Requests**:
    - Booking request cards: Caregiver name, date/time, countdown timer "18 hours remaining"
  - **Quick Actions**:
    - "Find Caregivers" button (prominent)
    - "Manage Payment Methods" link
    - "Account Settings" link
  - **Onboarding Checklist** (if incomplete):
    - Add payment method (if missing)
    - Add emergency contact (if missing)
- **Inputs**: None (navigation hub)

**Primary Actions**:
- "Find Caregivers" → SCR-CR-003 (Caregiver Search)
- "View Details" (on booking card) → SCR-CR-008 (Booking Detail)
- "Manage Payment Methods" → SCR-CR-013 (Payment Methods)
- "Account Settings" → SCR-CR-017 (Account Settings) - future, NOT in R0

**Data Sensitivity**: Low (booking summary data, no sensitive details)

**Related Screens**:
- Entry points: SCR-AUTH-005 (Login), SCR-AUTH-004 (Phone Verification), navigation from all screens
- Exit points: SCR-CR-003 (Search), SCR-CR-008 (Booking Detail), SCR-CR-013 (Payment Methods)

---

### SCR-CR-011: Message Thread

**R0 Status**: INCLUDED (Decision CB-005 - 2026-02-02)

**Route**: `/messages/:conversationId`
**Purpose**: Enable care receivers and caregivers to communicate within a booking context.

> **Route Architecture Note**: Uses conversation-scoped routes (`/messages/:conversationId`) as canonical
> per tier1-route-map.md. Each booking creates a conversation; the conversationId links to the booking.
> This architecture supports future R1 expansion to a centralized Message Inbox (`/messages`).
**User Roles**: Care Receiver, Family Member, Caregiver
**Access Control**: Requires authentication + booking ownership (either party)

**Preconditions**:
- User is authenticated
- User is a party to the booking (care receiver, family member, or assigned caregiver)
- Booking exists and is in status: requested, accepted, in_progress, or completed

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Empty | No messages yet | Empty state: "Start the conversation. Send a message to coordinate your booking." |
| Messages Display | Message history loaded | Chronological message list, newest at bottom, auto-scroll |
| Sending | Message being sent | Loading indicator on sent message, disabled send button |
| Sent | Message delivered | Message appears in thread with timestamp |
| Error | Message failed to send | Error indicator on message, "Retry" button |

**Data Requirements**:
- **Displays**:
  - **Header**:
    - Booking reference (e.g., "Booking #ICR-2026-0142")
    - Other party name and photo
    - Booking date and status badge
  - **Message Thread**:
    - Chronological messages with sender name, timestamp
    - Visual distinction between sent and received messages
    - Date separators for multi-day conversations
  - **Booking Context** (sidebar or collapsible):
    - Booking date, time, duration
    - Status
    - Emergency contact (if in_progress)
- **Inputs**:
  - Message text (textarea, 500 chars max, required)
- **Outputs**:
  - Message saved to booking message thread
  - Push notification to other party (future)
  - Email notification to other party

**R0 Scope Constraints** (Decision CB-005):
- Simple thread per booking only
- No search functionality
- No message history beyond current booking
- No rich media (images, files, voice)
- Text only, 500 character limit per message

**Primary Actions**:
- "Send" → Send message to other party
- "Back to Booking" → SCR-CR-008 (Booking Detail)

**Data Sensitivity**: Standard Personal Data (message content may contain personal details)

**Related Screens**:
- Entry points: SCR-CR-008 (Booking Detail - "Message Caregiver/Care Receiver" button)
- Exit points: SCR-CR-008 (Booking Detail)

---

### SCR-CR-015: Leave Review

**R0 Status**: INCLUDED (Decision CB-006 - 2026-02-02)

**Route**: `/bookings/:bookingId/review`
**Purpose**: Enable care receivers to leave a review for caregivers after booking completion.
**User Roles**: Care Receiver, Family Member
**Access Control**: Requires authentication + booking ownership + booking status is completed

**Preconditions**:
- User is authenticated
- User is the care receiver or linked family member for the booking
- Booking status is `completed` or `payment_released`
- User has not already submitted a review for this booking

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Empty | Review form ready for input | Star rating selector (empty), optional text area |
| Partial | Rating selected, no text | Stars highlighted (1-5), text area empty |
| Complete | Rating and text entered | Stars highlighted, text visible in textarea |
| Submitting | Review being submitted | Loading spinner, button disabled, "Submitting review..." |
| Success | Review submitted | Success message: "Thank you for your review! Your feedback helps other care receivers." |
| Error | Submission failed | Error banner: "Unable to submit review. Please try again." |
| Already Reviewed | User already submitted review | Info message: "You've already reviewed this booking." with view-only display |

**Data Requirements**:
- **Displays**:
  - **Booking Summary**:
    - Caregiver name and photo
    - Booking date
    - Service type and duration
  - **Review Form**:
    - Star rating selector (1-5 stars, required)
    - Written review text area (optional, 500 chars max)
    - Character count indicator
    - Guidance text: "Your review will be visible on the caregiver's public profile."
- **Inputs**:
  - Star rating (1-5, required)
  - Written review (textarea, 500 chars max, optional)
- **Outputs**:
  - Review record created
  - Review immediately published to caregiver profile (no moderation queue per CB-006)
  - Caregiver notified of new review

**R0 Scope Constraints** (Decision CB-006):
- Star rating required, text optional (500 chars max)
- No moderation queue - publish immediately
- Admin can delete inappropriate reviews retroactively
- No response mechanism for caregivers (future enhancement)

**Primary Actions**:
- "Submit Review" → Save review, display success, redirect to booking detail
- "Skip" → Return to booking detail without submitting review
- "Back to Booking" → SCR-CR-008 (Booking Detail)

**Data Sensitivity**: Low (public review content, no PII beyond reviewer attribution)

**Related Screens**:
- Entry points: SCR-CR-008 (Booking Detail - "Leave Review" button after completion)
- Exit points: SCR-CR-008 (Booking Detail)

---

## Category 4: Caregiver Flows

### SCR-CG-002: Caregiver Onboarding

**Route**: `/caregiver/onboarding`
**Purpose**: Guide caregivers through profile setup and verification requirements (companionship services only at Tier 1).
**User Roles**: Caregiver (pending_verification status)
**Access Control**: Requires authentication as caregiver

**Preconditions**:
- Caregiver is authenticated
- Caregiver has verified phone and email
- Caregiver has NOT completed onboarding (status: `pending_verification`)

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Step 1: Profile | Creating professional profile | Progress bar: "Step 1 of 5", profile form displayed |
| Step 2: Services | Defining service types | Progress bar: "Step 2 of 5", service selection (companionship only at T1) |
| Step 3: Availability | Setting availability schedule | Progress bar: "Step 3 of 5", calendar/schedule input |
| Step 4: Rate | Setting hourly rate | Progress bar: "Step 4 of 5", rate input with guidance |
| Step 5: Verification | Uploading verification documents | Progress bar: "Step 5 of 5", document upload forms |
| Incomplete | Missing required information | Warning banner: "Complete all steps to activate your profile" |
| Submitted | Awaiting admin review | Success message: "Profile submitted! Admin review takes 24-48 hours. We'll email you when verified." |

**Data Requirements**:
- **Step 1: Profile**:
  - Professional bio (textarea, 500 chars max, required)
  - Profile photo (upload, required, max 5MB)
  - Years of experience in care (number input, required)
- **Step 2: Services** (Tier 1 Only):
  - Service types offered (checkboxes, at least one required):
    - [ ] Companionship (conversation, activities)
    - [ ] Light housework and cleaning
    - [ ] Shopping and errands
    - [ ] Meal preparation (no feeding assistance)
    - [ ] Transportation (if you have a vehicle)
  - Service radius (dropdown: 5, 10, 15, 20, 30 miles, required)
- **Step 3: Availability**:
  - Recurring weekly schedule (multi-select: days of week + time slots)
  - Example: Monday 9am-5pm, Tuesday 9am-5pm, etc.
- **Step 4: Rate**:
  - Hourly rate (number input, required)
  - Guidance: "Typical companionship rates: £12-£18/hour. Set competitive rate for your area."
- **Step 5: Verification** (redirects to verification screens):
  - Identity verification → SCR-CG-008
  - Right to work verification → SCR-CG-009
  - DBS verification (optional) → SCR-CG-010

**Primary Actions**:
- "Next" → Progress to next step
- "Back" → Return to previous step
- "Save and Continue Later" → Save progress, exit onboarding (can resume later)
- "Submit for Review" (Step 5) → Submit profile for admin verification

**Data Sensitivity**: Standard Personal Data (bio, photo, availability, rate)

**Related Screens**:
- Entry points: SCR-AUTH-004 (Phone Verification), SCR-CG-001 (Dashboard - if onboarding incomplete)
- Exit points: SCR-CG-008, SCR-CG-009, SCR-CG-010 (verification screens), SCR-CG-001 (after submission)

---

### SCR-CG-008: Identity Verification (Caregiver)

**Route**: `/caregiver/verify/identity`
**Purpose**: Verify caregiver identity via government-issued ID (safeguarding requirement).
**User Roles**: Caregiver (pending_verification status)
**Access Control**: Requires authentication as caregiver

**Preconditions**:
- Caregiver is authenticated
- Caregiver has started onboarding process
- Caregiver has government-issued ID (passport or driving license)

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Upload | Document upload form displayed | File input with guidance: "Upload passport or driving license photo page" |
| Uploading | Document being uploaded | Loading spinner, progress bar |
| Submitted | Document uploaded, awaiting admin review | Success message: "ID submitted. Admin will review within 48 hours." |
| Approved | Admin approved ID verification | Green checkmark badge: "Identity Verified" |
| Rejected | Admin rejected ID (poor quality, expired, mismatch) | Red X badge: "Rejected", rejection reason displayed, "Resubmit" button |
| Error | Upload failed (file too large, wrong format) | Error banner: "Upload failed. Please try again." |

**Data Requirements**:
- **Inputs**:
  - ID document type (dropdown: Passport, Driving License)
  - ID document photo upload (file input, max 5MB, formats: JPG, PNG, PDF)
  - Optional: Selfie photo (for liveness check, future enhancement)
- **Displays**:
  - Verification status: "Not Submitted", "Pending Review", "Verified", "Rejected"
  - Rejection reason (if rejected)
  - Instructions: "Upload clear photo of ID document. Ensure all text is readable."

**Primary Actions**:
- "Upload ID Document" → File upload
- "Submit for Review" → Send to admin verification queue
- "Resubmit" (if rejected) → Upload new document
- "Back to Onboarding" → SCR-CG-002 (Caregiver Onboarding)

**Data Sensitivity**: High (government-issued ID document, name, DOB, photo)

**Related Screens**:
- Entry points: SCR-CG-002 (Caregiver Onboarding Step 5)
- Exit points: SCR-CG-002 (return to onboarding), SCR-ADM-007 (Admin Verification Review)

---

### SCR-CG-009: Right to Work Verification

**Route**: `/caregiver/verify/right-to-work`
**Purpose**: Verify caregiver has legal right to work in the UK (Immigration Act compliance).
**User Roles**: Caregiver (pending_verification status)
**Access Control**: Requires authentication as caregiver

**Preconditions**:
- Caregiver is authenticated
- Caregiver has started onboarding process
- Caregiver has right to work in the UK (UK passport, settled status, or visa)

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| UK Passport | Caregiver has UK passport | Form: "Confirm you are a UK passport holder" checkbox, upload passport |
| Share Code | Caregiver has visa/settled status | Form: "Enter UKVI share code" input field |
| Uploading | Documents being uploaded | Loading spinner, progress bar |
| Submitted | Documents uploaded, awaiting admin review | Success message: "Right to work documents submitted. Admin will review within 48 hours." |
| Approved | Admin approved right to work | Green checkmark badge: "Right to Work Verified" |
| Rejected | Admin rejected (expired visa, invalid share code) | Red X badge: "Rejected", rejection reason, "Resubmit" button |
| Error | Verification failed | Error banner: "Unable to verify. Please try again." |

**Data Requirements**:
- **Inputs** (UK Passport Holders):
  - "I am a UK passport holder" (checkbox)
  - Passport photo upload (file input, max 5MB, formats: JPG, PNG, PDF)
- **Inputs** (Non-UK Passport Holders):
  - UKVI share code (text input, 9 characters)
  - Date of birth (date picker, for UKVI verification)
  - Visa expiry date (date picker)
- **Displays**:
  - Verification status: "Not Submitted", "Pending Review", "Verified", "Rejected"
  - Rejection reason (if rejected)
  - Instructions: "UK Visas and Immigration share code can be generated at: https://www.gov.uk/view-prove-immigration-status"

**Primary Actions**:
- "Submit for Review" → Send to admin verification queue
- "Resubmit" (if rejected) → Upload new documents or re-enter share code
- "Back to Onboarding" → SCR-CG-002 (Caregiver Onboarding)

**Data Sensitivity**: High (passport details, visa status, immigration data)

**Related Screens**:
- Entry points: SCR-CG-002 (Caregiver Onboarding Step 5)
- Exit points: SCR-CG-002 (return to onboarding), SCR-ADM-007 (Admin Verification Review)

---

### SCR-CG-010: DBS Check Submission (Voluntary at Tier 1)

**Route**: `/caregiver/verify/dbs`
**Purpose**: Allow caregivers to voluntarily submit existing DBS certificate for "DBS Verified" badge (trust signal, not mandatory at T1).
**User Roles**: Caregiver (pending_verification status)
**Access Control**: Requires authentication as caregiver

**Preconditions**:
- Caregiver is authenticated
- Caregiver has started onboarding process
- Caregiver has existing DBS certificate (optional)

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Optional | DBS not required for Tier 1 | Info banner: "DBS verification is OPTIONAL for companionship services. Submit existing certificate for 'DBS Verified' badge." |
| Upload | DBS certificate upload form displayed | File input with guidance |
| Uploading | Document being uploaded | Loading spinner, progress bar |
| Submitted | Certificate uploaded, awaiting admin review | Success message: "DBS certificate submitted. Admin will review within 48 hours." |
| Approved | Admin approved DBS verification | Green checkmark badge: "DBS Verified", displayed on public profile |
| Rejected | Admin rejected (expired, fake, not Enhanced DBS) | Red X badge: "Rejected", rejection reason, "Resubmit" button |
| Skipped | Caregiver chose not to submit | "Skip" button clicked, caregiver can still activate profile without DBS |
| Error | Upload failed | Error banner: "Upload failed. Please try again." |

**Data Requirements**:
- **Inputs**:
  - DBS certificate upload (file input, max 5MB, formats: JPG, PNG, PDF)
  - DBS certificate number (text input, optional for admin verification)
  - Issue date (date picker)
  - Expiry date (date picker, optional - DBS certificates don't formally expire but 3-year re-check recommended)
- **Displays**:
  - Info banner: "Why submit DBS? Caregivers with 'DBS Verified' badge receive more bookings. This is optional for companionship services."
  - Verification status: "Not Submitted", "Pending Review", "Verified", "Rejected"
  - Rejection reason (if rejected)

**Primary Actions**:
- "Upload DBS Certificate" → File upload
- "Submit for Review" → Send to admin verification queue (SCR-ADM-008)
- "Skip for Now" → Continue onboarding without DBS (still able to activate profile)
- "Resubmit" (if rejected) → Upload new certificate
- "Back to Onboarding" → SCR-CG-002 (Caregiver Onboarding)

**Data Sensitivity**: High (DBS certificate, criminal record check data)

**Related Screens**:
- Entry points: SCR-CG-002 (Caregiver Onboarding Step 5)
- Exit points: SCR-CG-002 (return to onboarding), SCR-ADM-008 (Admin DBS Review)

---

### SCR-CG-020: Payout Setup (Stripe Connect)

**Route**: `/caregiver/earnings/setup`
**Purpose**: Enable caregivers to add bank account for payout of booking earnings (Stripe Connect onboarding).
**User Roles**: Caregiver
**Access Control**: Requires authentication as caregiver

**Preconditions**:
- Caregiver is authenticated
- Caregiver has verified identity and right to work
- Caregiver has accepted first booking (or admin prompts payout setup)

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Not Started | Payout setup not completed | Warning banner: "Add bank account to receive payouts", "Set Up Payouts" button |
| Stripe Onboarding | Stripe Connect form active | Stripe-hosted iframe or redirect to Stripe onboarding |
| Verifying | Stripe verifying bank account | Loading spinner, "Verifying bank account..." |
| Complete | Payout setup complete | Success banner: "Payout setup complete! You'll receive earnings within 2 business days after booking completion." |
| Verification Failed | Stripe unable to verify bank account | Error banner: "Unable to verify bank account. Please check details or contact support." |
| Updating | Caregiver updating bank details | Stripe form active |

**Data Requirements**:
- **Inputs** (handled by Stripe Connect):
  - Legal name (must match identity verification)
  - Date of birth (must match identity verification)
  - UK bank account details:
    - Sort code (6 digits)
    - Account number (8 digits)
  - Address (for tax reporting)
  - National Insurance number (optional, for tax reporting)
- **Displays**:
  - Current payout method: Bank name (if connected), last 4 digits of account number
  - Payout schedule: "Payouts arrive within 2 business days after booking completion"
  - Earnings summary: "Total earned: £XXX", "Pending payouts: £XXX"

**Primary Actions**:
- "Set Up Payouts" → Stripe Connect onboarding (redirect or iframe)
- "Update Payout Method" → Stripe account management
- "Back to Dashboard" → SCR-CG-001 (Caregiver Dashboard)

**Data Sensitivity**: High (bank account details, handled by Stripe PCI-DSS compliant infrastructure)

**Related Screens**:
- Entry points: SCR-CG-001 (Caregiver Dashboard - earnings section), SCR-CG-013 (after accepting first booking)
- Exit points: SCR-CG-001 (Dashboard)

---

### SCR-CG-013: Booking Request Detail

**Architecture Note** (Decision CB-002 - 2026-02-02): This screen and SCR-CR-008 share the SAME booking entity with role-based conditional rendering. Implementation uses a single screen component with route `/bookings/:bookingId` for both roles. The `/caregiver/bookings/:bookingId` route redirects to the shared route. Care receiver sees: Cancel, Confirm Completion, Dispute, Leave Review. Caregiver sees: Accept, Decline, Mark Complete.

**Route**: `/bookings/:bookingId` (shared with SCR-CR-008, role-based rendering)
**Purpose**: View booking request details and accept/decline (caregiver perspective).
**User Roles**: Caregiver
**Access Control**: Requires authentication as caregiver + booking addressed to this caregiver

**Preconditions**:
- Caregiver is authenticated
- Caregiver profile is verified and active
- Booking request exists and is addressed to this caregiver

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Pending | Awaiting caregiver response | Status badge: "Pending Your Response", countdown timer "20 hours remaining" |
| Reviewing | Caregiver viewing details | Booking details displayed, "Accept" and "Decline" buttons prominent |
| Accepting | Accept action processing | Loading spinner, "Accepting booking..." |
| Accepted | Caregiver accepted | Status badge: "Accepted", care receiver contact details visible, "Message Care Receiver" button |
| Declining | Decline action processing | Decline reason modal displayed |
| Declined | Caregiver declined | Status badge: "Declined", decline reason shown |
| Expired | 24 hours elapsed, auto-declined | Status badge: "Expired", "You did not respond within 24 hours" |

**Data Requirements**:
- **Displays**:
  - **Care Receiver Information**:
    - Name (first name + last initial until acceptance: "John S.")
    - Location (town/city, not full address until acceptance)
    - Distance from caregiver ("3.2 miles away")
  - **Booking Details**:
    - Date, start time, duration
    - Service type: "Companionship"
    - Special requests (from care receiver)
  - **Earnings Breakdown**:
    - Hourly rate × duration = Subtotal
    - Platform commission [PLACEHOLDER: 15% commission - subject to FDR-008 final decision] = Deduction
    - Net earnings = Total
    - Example: "£18/hour × 4 hours = £72.00 - £10.80 (15%) = £61.20 net"
  - **Countdown Timer**: "20 hours remaining to respond"
- **Inputs** (if declining):
  - Decline reason (dropdown: Scheduling conflict, Too far, Rate too low, Outside my service area, Other)
  - Optional message to care receiver (textarea, 500 chars max)

**Primary Actions**:
- "Accept Booking" → Update booking status to `accepted`, charge care receiver, share contact details, notify care receiver → SCR-CG-001 or stay on same screen (now showing accepted state)
- "Decline Booking" → Decline reason modal → Update booking status to `declined`, release payment authorization, notify care receiver
- "View Care Receiver Profile" → Future feature (NOT in R0)
- "Message Care Receiver" (after acceptance) → SCR-CG-011 (Message Thread) - future, NOT in R0 (use email for R0)

**Data Sensitivity**: Standard Personal Data (care receiver name ONLY after acceptance, location, special requests)

**Related Screens**:
- Entry points: SCR-CG-001 (Caregiver Dashboard - pending requests), email notification link
- Exit points: SCR-CG-001 (Dashboard), SCR-CG-011 (Message Thread - future)

---

### SCR-CG-001: Caregiver Dashboard

**R0 Status**: INCLUDED (Decision CB-001 - 2026-02-02)

**Route**: `/caregiver/dashboard`
**Purpose**: Central hub for caregivers - view pending requests, upcoming bookings, earnings, manage profile.
**User Roles**: Caregiver
**Access Control**: Requires authentication as caregiver

**Preconditions**:
- Caregiver is authenticated
- Caregiver has completed verification (status: `active`)

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Pending Verification | Caregiver not yet verified | Large banner: "Your profile is under admin review. You'll be notified when verified." |
| Active (No Requests) | Verified but no booking requests yet | Welcome message, "Update Availability" CTA, profile completion checklist |
| Pending Requests | Booking requests awaiting response | "Pending Requests" section at top with countdown timers (urgent!) |
| Upcoming Bookings | Confirmed bookings in next 7 days | Booking cards displayed, sorted by date (soonest first) |

**Data Requirements**:
- **Displays**:
  - **Pending Requests** (urgent, top priority):
    - Booking request cards: Care receiver name, date/time, earnings, countdown timer, "View Details" button
  - **Upcoming Bookings** (next 7 days):
    - Booking cards: Care receiver name, date/time, location, "View Details" button
    - Next booking (large card at top): Prominent display with countdown "in 1 day"
  - **Earnings Summary**:
    - Total earnings (this month)
    - Pending payouts (awaiting booking completion)
    - "View Earnings" link → SCR-CG-020 (Payout Setup)
  - **Availability Status**:
    - Hours available this week
    - "Update Availability" button
  - **Profile Performance**:
    - Profile views this week
    - Acceptance rate ("Your acceptance rate: 85%")
    - Average response time ("Your average response time: 4 hours")
  - **Onboarding Checklist** (if incomplete):
    - Complete profile (if missing bio/photo)
    - Add availability (if no availability set)
    - Set up payouts (if bank account not connected)
- **Inputs**: None (navigation hub)

**Primary Actions**:
- "View Details" (on booking request card) → SCR-CG-013 (Booking Request Detail)
- "View Details" (on booking card) → SCR-CR-008 (Booking Detail - same screen as care receiver view)
- "Update Availability" → Availability management screen (future, NOT in R0)
- "View Earnings" → SCR-CG-020 (Payout Setup)
- "Edit Profile" → SCR-CG-003 (Profile Management - future, NOT in R0)

**Data Sensitivity**: Low (earnings summary, booking summary, no sensitive details)

**Related Screens**:
- Entry points: SCR-AUTH-005 (Login), SCR-AUTH-004 (Phone Verification), navigation from all screens
- Exit points: SCR-CG-013 (Booking Request Detail), SCR-CR-008 (Booking Detail), SCR-CG-020 (Payout Setup)

---

## Category 5: Admin Operations

### SCR-ADM-001: Admin Dashboard

**Route**: `/admin`
**Purpose**: Central hub for admin - overview of pending tasks, alerts, and quick access to key functions.
**User Roles**: Admin, Safeguarding Officer
**Access Control**: Requires admin authentication + 2FA

**Preconditions**:
- Admin is authenticated
- Admin has 2FA enabled (mandatory for admin accounts)

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Display | Dashboard loaded | Task cards displayed, sorted by urgency |
| Urgent Alerts | Safeguarding reports or critical issues | Red alert banner at top: "URGENT: 2 safeguarding reports require immediate review" |
| Low Activity | No pending tasks | Green "All clear" message, summary statistics only |

**Data Requirements**:
- **Displays**:
  - **Urgent Alerts** (red banner if present):
    - Safeguarding reports (critical or high severity)
    - Account suspension appeals
    - Payment disputes
  - **Task Summary Cards**:
    - **Caregiver Verifications**: "5 pending" → Link to SCR-ADM-005
    - **Safeguarding Reports**: "2 pending" → Link to SCR-ADM-014
    - **Booking Disputes**: "1 pending" → Link to dispute queue (future)
    - **Review Moderation**: "3 pending" → Link to review moderation queue (future)
  - **Platform Metrics** (summary):
    - Total users (care receivers, caregivers)
    - Bookings this month
    - Revenue this month
    - Average caregiver acceptance rate
    - Safeguarding incidents this month
  - **Recent Activity** (last 24 hours):
    - New caregiver registrations
    - Completed bookings
    - New safeguarding reports
- **Inputs**: None (navigation hub)

**Primary Actions**:
- "Caregiver Verifications" card → SCR-ADM-005 (Caregiver Application Review Queue)
- "Safeguarding Reports" card → SCR-ADM-014 (Safeguarding Reports Queue)
- "View All Users" → User management screen (future, NOT in R0)
- "View All Bookings" → Booking oversight screen (future, NOT in R0)
- "Audit Logs" → Audit log viewer (future, NOT in R0)

**Data Sensitivity**: Medium (summary data, no detailed PII displayed)

**Related Screens**:
- Entry points: SCR-AUTH-005 (Login - admin account)
- Exit points: SCR-ADM-005, SCR-ADM-014, SCR-ADM-007, SCR-ADM-008

---

### SCR-ADM-005: Caregiver Application Review

**Route**: `/admin/applications/:applicationId`
**Purpose**: Admin reviews caregiver application documents and approves/rejects profile activation (safeguarding gate).
**User Roles**: Admin
**Access Control**: Requires admin authentication + 2FA

**Preconditions**:
- Admin is authenticated
- Caregiver has submitted profile and verification documents
- Application is in pending_verification status

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Display | Application details loaded | Caregiver profile + verification documents displayed |
| Reviewing | Admin reviewing documents | Checkboxes for each verification step |
| Approving | Approval action processing | Loading spinner, "Approving application..." |
| Approved | Application approved | Success banner: "Application approved. Caregiver notified." |
| Rejecting | Rejection modal displayed | Rejection reason dropdown + message input |
| Rejected | Application rejected | Rejection email sent to caregiver with reason |

**Data Requirements**:
- **Displays**:
  - **Caregiver Profile Summary**:
    - Name, email, phone, postcode
    - Profile photo
    - Bio
    - Service types offered (companionship only at T1)
    - Hourly rate
    - Service radius
    - Availability schedule
  - **Verification Documents**:
    - Identity verification:
      - ID document image (passport or driving license)
      - Status: "Submitted", "Pending Review", "Verified", "Rejected"
      - Admin action: "Approve ID" or "Reject ID" buttons
    - Right to work verification:
      - Document image or UKVI share code
      - Status: "Submitted", "Pending Review", "Verified", "Rejected"
      - Admin action: "Approve Right to Work" or "Reject Right to Work" buttons
    - DBS verification (if submitted):
      - DBS certificate image
      - Status: "Submitted", "Pending Review", "Verified", "Rejected"
      - Admin action: "Approve DBS" or "Reject DBS" buttons
  - **Review Checklist**:
    - [ ] Profile photo is appropriate (face visible, professional)
    - [ ] Bio is complete and appropriate (no contact info, no inappropriate content)
    - [ ] Service types are reasonable for Tier 1 (companionship only)
    - [ ] Hourly rate is within platform range (£12-£25/hour)
    - [ ] Identity verification approved
    - [ ] Right to work verification approved
    - [ ] DBS verification approved (if submitted)
- **Inputs** (if rejecting):
  - Rejection reason (dropdown: Poor quality photo, Inappropriate bio content, Expired ID, Invalid right to work, Other)
  - Feedback message (textarea, 500 chars max, sent to caregiver)

**Primary Actions**:
- "Approve Application" → Update caregiver status to `active`, send approval email, make profile searchable → SCR-ADM-001 (Dashboard)
- "Reject Application" → Rejection reason modal → Send rejection email, update status → SCR-ADM-001 (Dashboard)
- "Request More Information" → Send email to caregiver requesting additional documents or clarification
- "Back to Queue" → SCR-ADM-001 (Dashboard)

**Data Sensitivity**: High (full caregiver profile, ID documents, right to work documents, DBS certificate)

**Related Screens**:
- Entry points: SCR-ADM-001 (Admin Dashboard - caregiver verifications queue)
- Exit points: SCR-ADM-007 (Verification Review - for detailed document review), SCR-ADM-008 (DBS Review), SCR-ADM-001 (Dashboard)

---

### SCR-ADM-007: Verification Review

**Route**: `/admin/verifications/:verificationId`
**Purpose**: Admin reviews individual verification document (ID or right to work) in detail.
**User Roles**: Admin
**Access Control**: Requires admin authentication + 2FA

**Preconditions**:
- Admin is authenticated
- Caregiver has submitted verification document
- Document is in pending review status

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Display | Document image displayed | Large document image, zoom controls, verification checklist |
| Verifying | Admin reviewing document | Checklist items being checked |
| Approving | Approval action processing | Loading spinner, "Approving verification..." |
| Approved | Verification approved | Green checkmark badge: "Verified", caregiver notified |
| Rejecting | Rejection modal displayed | Rejection reason dropdown + message input |
| Rejected | Verification rejected | Red X badge: "Rejected", caregiver notified with rejection reason |

**Data Requirements**:
- **Displays**:
  - **Document Image**: Full-size image of ID document or right to work document
  - **Caregiver Details**: Name, email, phone (for cross-reference with document)
  - **Verification Checklist** (ID Document):
    - [ ] Photo matches profile photo
    - [ ] Name matches registration name
    - [ ] Date of birth is correct
    - [ ] Document is not expired
    - [ ] Document is readable (not blurry, not cut off)
  - **Verification Checklist** (Right to Work):
    - [ ] Document confirms right to work in UK
    - [ ] UKVI share code is valid (if applicable)
    - [ ] Document is not expired (if visa)
  - **Document Metadata**: Upload date, file size, caregiver ID
- **Inputs** (if rejecting):
  - Rejection reason (dropdown: Expired document, Blurry/unreadable, Name mismatch, Photo mismatch, Invalid UKVI share code, Other)
  - Feedback message (textarea, 500 chars max)

**Primary Actions**:
- "Approve Verification" → Update verification status to `verified`, send approval email, update caregiver verification badge → Return to SCR-ADM-005 or SCR-ADM-001
- "Reject Verification" → Rejection reason modal → Send rejection email, allow caregiver to resubmit → Return to SCR-ADM-005 or SCR-ADM-001
- "Download Document" → Download document image for offline review
- "Zoom In/Out" → Zoom controls for detailed document inspection
- "Back to Application" → SCR-ADM-005 (Caregiver Application Review)

**Data Sensitivity**: High (government-issued ID, right to work documents)

**Related Screens**:
- Entry points: SCR-ADM-005 (Caregiver Application Review), SCR-ADM-001 (Verification queue)
- Exit points: SCR-ADM-005 (Application Review), SCR-ADM-001 (Dashboard)

---

### SCR-ADM-008: DBS Review

**Route**: `/admin/verifications/dbs/:verificationId`
**Purpose**: Admin reviews DBS certificate authenticity and validity (optional at T1, becomes mandatory at T2).
**User Roles**: Admin
**Access Control**: Requires admin authentication + 2FA

**Preconditions**:
- Admin is authenticated
- Caregiver has voluntarily submitted DBS certificate
- DBS certificate is in pending review status

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Display | DBS certificate image displayed | Large certificate image, zoom controls, verification checklist |
| Verifying | Admin reviewing certificate | Checklist items being checked |
| Approving | Approval action processing | Loading spinner, "Approving DBS verification..." |
| Approved | DBS approved | Green checkmark badge: "DBS Verified", displayed on public profile |
| Rejecting | Rejection modal displayed | Rejection reason dropdown + message input |
| Rejected | DBS rejected | Red X badge: "Rejected", caregiver notified |

**Data Requirements**:
- **Displays**:
  - **DBS Certificate Image**: Full-size image of DBS certificate
  - **Caregiver Details**: Name, email, phone, DOB (for cross-reference with certificate)
  - **DBS Details Captured by Caregiver**:
    - DBS certificate number (if provided)
    - Issue date
    - Expiry date (if provided)
  - **DBS Verification Checklist**:
    - [ ] Certificate is genuine (not fake - check watermark, format)
    - [ ] Certificate number is present and readable
    - [ ] Name matches caregiver registration name
    - [ ] Date of birth matches caregiver DOB
    - [ ] Certificate is Enhanced DBS (preferred) or Standard DBS (acceptable)
    - [ ] Certificate is not expired (recommended <3 years old)
    - [ ] No barred list entries (caregiver NOT barred from working with vulnerable adults)
  - **DBS Certificate Guidance**:
    - Link to DBS certificate sample (for admin reference)
    - Link to DBS Update Service check (optional)
- **Inputs** (if rejecting):
  - Rejection reason (dropdown: Certificate expired, Fake certificate, Name mismatch, DOB mismatch, Barred list entry, Not Enhanced DBS, Unreadable, Other)
  - Feedback message (textarea, 500 chars max)

**Primary Actions**:
- "Approve DBS Verification" → Update DBS verification status to `verified`, add "DBS Verified" badge to public profile, send approval email → Return to SCR-ADM-005 or SCR-ADM-001
- "Reject DBS Verification" → Rejection reason modal → Send rejection email, remove DBS badge, allow resubmission → Return to SCR-ADM-005 or SCR-ADM-001
- "Check DBS Update Service" → Link to DBS Update Service (external) for real-time status check (if caregiver provided DBS number and subscribed to Update Service)
- "Download Certificate" → Download certificate image for offline review
- "Zoom In/Out" → Zoom controls for detailed certificate inspection
- "Back to Application" → SCR-ADM-005 (Caregiver Application Review)

**Data Sensitivity**: Critical (DBS certificate, criminal record check data, barred list status)

**Related Screens**:
- Entry points: SCR-ADM-005 (Caregiver Application Review), SCR-ADM-001 (Verification queue)
- Exit points: SCR-ADM-005 (Application Review), SCR-ADM-001 (Dashboard)

---

### SCR-ADM-014: Safeguarding Reports Queue

**Route**: `/admin/safeguarding`
**Purpose**: Admin views all safeguarding incident reports and triages by severity (Care Act 2014 compliance).
**User Roles**: Admin, Safeguarding Officer
**Access Control**: Requires admin authentication + 2FA + safeguarding officer role

**Preconditions**:
- Admin is authenticated and has safeguarding officer role
- Safeguarding reporting system is active

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Display | All reports listed | Report cards sorted by severity (critical first), then by date |
| Filtered | Filter applied | Applied filters shown as tags, "X reports found" count |
| Urgent Alerts | Critical or high-severity reports present | Red banner at top: "URGENT: 2 critical reports require immediate action" |

**Data Requirements**:
- **Displays**:
  - **Report Cards** (for each safeguarding report):
    - Report ID (e.g., "SAF-2024-0123")
    - Severity badge (Critical - red, High - orange, Medium - yellow, Low - green)
    - Report category: "Physical Abuse", "Financial Exploitation", "Safety Concern", "Neglect", etc.
    - Reporter: "Care Receiver" or "Caregiver" or "Admin-Created"
    - Reported user: Name, role (caregiver or care receiver)
    - Date reported
    - Status: "Reported", "Investigating", "Escalated to SAB", "Resolved"
    - Time since reported (e.g., "2 hours ago" - urgent indicator)
    - "View Details" button
  - **Filters**:
    - Severity (dropdown: All, Critical, High, Medium, Low)
    - Status (dropdown: All, Reported, Investigating, Escalated, Resolved)
    - Category (dropdown: All, Physical Abuse, Financial Exploitation, Safety Concern, etc.)
    - Date range (date picker)
  - **Statistics**:
    - Total reports this month
    - Average resolution time
    - Reports escalated to SAB this month
- **Inputs**: Filter selections

**Primary Actions**:
- "View Details" (on report card) → SCR-ADM-015 (Safeguarding Report Detail)
- "Apply Filters" → Update report list
- "Clear Filters" → Reset to all reports
- "Export Reports" → Download CSV of reports (filtered) for audit
- "Back to Dashboard" → SCR-ADM-001 (Admin Dashboard)

**Data Sensitivity**: Critical (safeguarding reports, abuse allegations, sensitive details)

**Related Screens**:
- Entry points: SCR-ADM-001 (Admin Dashboard - safeguarding reports card)
- Exit points: SCR-ADM-015 (Safeguarding Report Detail), SCR-ADM-001 (Dashboard)

---

### SCR-ADM-015: Safeguarding Report Detail

**Route**: `/admin/safeguarding/:reportId`
**Purpose**: Admin investigates safeguarding report, documents actions, and determines outcome (Care Act 2014 compliance).
**User Roles**: Admin, Safeguarding Officer
**Access Control**: Requires admin authentication + 2FA + safeguarding officer role

**Preconditions**:
- Admin is authenticated and has safeguarding officer role
- Safeguarding report exists
- Admin has reviewed Care Act 2014 safeguarding procedures

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Reported | New report, not yet triaged | Status badge: "Reported", "Triage" action button |
| Triaged | Severity assigned, investigator assigned | Status badge: "Investigating", investigator name shown |
| Investigating | Admin gathering evidence | Investigation notes section active, action buttons visible |
| Escalated to SAB | Referred to Safeguarding Adults Board | Status badge: "Escalated to SAB", SAB contact details shown, awaiting outcome |
| Resolved | Investigation complete, actions taken | Status badge: "Resolved", outcome documented, case closed |

**Data Requirements**:
- **Displays**:
  - **Report Summary**:
    - Report ID, date reported, severity, category
    - Reporter: Name, role, contact details
    - Reported user: Name, role, profile link
    - Report description (full text from reporter)
    - Evidence attachments (if any): Images, screenshots, documents
  - **Investigation Timeline** (timestamped log):
    - Report submitted (date/time)
    - Triaged by [Admin Name] (date/time)
    - Evidence reviewed (date/time)
    - Reporter contacted (date/time)
    - Reported user contacted (date/time) - if safe to do so
    - Escalated to SAB (date/time) - if applicable
    - Resolved (date/time)
  - **Investigation Notes** (admin-only, not visible to users):
    - Textarea for admin notes (timestamped, admin name attached)
    - All notes retained for audit trail
  - **Related Data**:
    - Booking history (if report relates to specific booking)
    - Message history (if report relates to messages)
    - Previous reports (if reported user has history)
  - **SAB Escalation Details** (if escalated):
    - Local authority safeguarding team contact
    - SAB reference number
    - SAB outcome (when received)
- **Inputs**:
  - **Triage** (if status = reported):
    - Severity (dropdown: Critical, High, Medium, Low)
    - Assigned investigator (dropdown: Safeguarding Officer list)
  - **Investigation Notes**:
    - Textarea for notes (unlimited chars, timestamped)
  - **Actions**:
    - Contact reporter (button) → Opens email template
    - Contact reported user (button) → Opens email template (with warning: "Only contact if safe to do so")
    - Suspend reported user (button) → Confirmation modal → Suspend account
    - Escalate to SAB (button) → SAB referral form modal
  - **Resolution** (if status = investigating):
    - Outcome (dropdown: No action, Warning issued, User suspended, User banned, Escalated to SAB, Referred to police)
    - Outcome notes (textarea, required, summary for audit)

**Primary Actions**:
- "Triage Report" → Assign severity and investigator, update status to `investigating`
- "Add Investigation Note" → Save timestamped note to investigation log
- "Contact Reporter" → Email template to request additional information
- "Contact Reported User" → Email template (with safeguarding caution)
- "Suspend User" → Confirmation modal → Suspend reported user account, notify user
- "Escalate to SAB" → SAB referral form modal (pre-filled with report details) → Submit to local authority
- "Resolve Report" → Outcome selection → Document outcome, close case, notify reporter (summary only)
- "Back to Queue" → SCR-ADM-014 (Safeguarding Reports Queue)

**Data Sensitivity**: Critical (safeguarding allegations, investigation notes, SAB referrals, audit trail)

**Related Screens**:
- Entry points: SCR-ADM-014 (Safeguarding Reports Queue)
- Exit points: SCR-ADM-014 (Reports Queue), User suspension flows, SAB referral external system

---

## Route Index

Alphabetical list of all routes:

| Route | Screen ID | Screen Name | User Roles |
|-------|-----------|-------------|------------|
| `/` | SCR-PUB-001 | Homepage | All visitors |
| `/admin` | SCR-ADM-001 | Admin Dashboard | Admin |
| `/admin/applications/:applicationId` | SCR-ADM-005 | Caregiver Application Review | Admin |
| `/admin/safeguarding` | SCR-ADM-014 | Safeguarding Reports Queue | Admin, Safeguarding Officer |
| `/admin/safeguarding/:reportId` | SCR-ADM-015 | Safeguarding Report Detail | Admin, Safeguarding Officer |
| `/admin/verifications/:verificationId` | SCR-ADM-007 | Verification Review | Admin |
| `/admin/verifications/dbs/:verificationId` | SCR-ADM-008 | DBS Review | Admin |
| `/bookings/:bookingId` | SCR-CR-008 | Booking Detail | Care Receiver, Family Member |
| `/bookings/new/:caregiverId` | SCR-CR-006 | Booking Request Form | Care Receiver, Family Member |
| `/caregiver/bookings/:bookingId` | SCR-CG-013 | Booking Request Detail | Caregiver |
| `/caregiver/dashboard` | SCR-CG-001 | Caregiver Dashboard | Caregiver |
| `/caregiver/earnings/setup` | SCR-CG-020 | Payout Setup | Caregiver |
| `/caregiver/onboarding` | SCR-CG-002 | Caregiver Onboarding | Caregiver (pending_verification) |
| `/caregiver/verify/dbs` | SCR-CG-010 | DBS Check Submission | Caregiver |
| `/caregiver/verify/identity` | SCR-CG-008 | Identity Verification | Caregiver |
| `/caregiver/verify/right-to-work` | SCR-CG-009 | Right to Work Verification | Caregiver |
| `/caregivers/:caregiverId` | SCR-CR-005 | Caregiver Profile | Care Receiver, Family Member |
| `/dashboard` | SCR-CR-001 | Care Receiver Dashboard | Care Receiver, Family Member |
| `/forgot-password` | SCR-AUTH-006 | Password Reset Request | All users |
| `/login` | SCR-AUTH-005 | Login | All users |
| `/privacy` | SCR-PUB-007 | Privacy Policy | All visitors |
| `/register/care-receiver` | SCR-AUTH-001 | Care Receiver Registration | Unauthenticated visitors |
| `/register/caregiver` | SCR-AUTH-003 | Caregiver Registration | Unauthenticated visitors |
| `/register/family` | SCR-AUTH-002 | Family Member Registration | Unauthenticated visitors |
| `/safeguarding-policy` | SCR-PUB-008 | Safeguarding Policy | All visitors |
| `/search` | SCR-CR-003 | Caregiver Search | Care Receiver, Family Member |
| `/settings/payment` | SCR-CR-013 | Payment Methods | Care Receiver, Family Member |
| `/terms` | SCR-PUB-006 | Terms of Service | All visitors |
| `/verify/phone` | SCR-AUTH-004 | Phone Verification | All users (pending_phone_verification) |

---

## Cross-Reference Matrix

Which screens link to which:

### From Authentication & Registration

| From | To | Action |
|------|-----|--------|
| SCR-AUTH-001 | SCR-AUTH-004 | Registration success |
| SCR-AUTH-001 | SCR-AUTH-005 | "Already have account" link |
| SCR-AUTH-002 | SCR-AUTH-004 | Registration success |
| SCR-AUTH-003 | SCR-AUTH-004 | Registration success |
| SCR-AUTH-004 (Care Receiver) | SCR-CR-001 | Phone verified |
| SCR-AUTH-004 (Caregiver) | SCR-CG-002 | Phone verified |
| SCR-AUTH-005 (Care Receiver) | SCR-CR-001 | Login success |
| SCR-AUTH-005 (Caregiver) | SCR-CG-001 | Login success |
| SCR-AUTH-005 (Admin) | SCR-ADM-001 | Login success |
| SCR-AUTH-005 | SCR-AUTH-006 | "Forgot password" link |
| SCR-AUTH-006 | SCR-AUTH-005 | "Remember password" link |

### From Public & Compliance

| From | To | Action |
|------|-----|--------|
| SCR-PUB-001 (unauthenticated) | SCR-AUTH-001 | "Find Care" button |
| SCR-PUB-001 (unauthenticated) | SCR-AUTH-003 | "Become a Caregiver" button |
| SCR-PUB-001 (authenticated CR) | SCR-CR-003 | "Find Care" button |
| SCR-PUB-001 (authenticated CG) | SCR-CG-001 | "Go to Dashboard" button |
| SCR-PUB-001 | SCR-AUTH-005 | "Log In" link |

### From Care Receiver Flows

| From | To | Action |
|------|-----|--------|
| SCR-CR-001 | SCR-CR-003 | "Find Caregivers" button |
| SCR-CR-001 | SCR-CR-008 | "View Details" on booking card |
| SCR-CR-001 | SCR-CR-013 | "Manage Payment Methods" link |
| SCR-CR-003 | SCR-CR-005 | "View Profile" on caregiver card |
| SCR-CR-003 | SCR-CR-006 | "Request Booking" on caregiver card |
| SCR-CR-005 | SCR-CR-006 | "Request Booking" button |
| SCR-CR-006 | SCR-CR-013 | "Add Payment Method" (if none) |
| SCR-CR-006 | SCR-CR-008 | "Send Request" success |
| SCR-CR-008 | SCR-CR-003 | "Search for another caregiver" (if declined) |

### From Caregiver Flows

| From | To | Action |
|------|-----|--------|
| SCR-CG-001 | SCR-CG-013 | "View Details" on booking request card |
| SCR-CG-001 | SCR-CR-008 | "View Details" on booking card |
| SCR-CG-001 | SCR-CG-020 | "View Earnings" link |
| SCR-CG-002 | SCR-CG-008 | Step 5 verification |
| SCR-CG-002 | SCR-CG-009 | Step 5 verification |
| SCR-CG-002 | SCR-CG-010 | Step 5 verification |
| SCR-CG-008 | SCR-CG-002 | "Back to Onboarding" |
| SCR-CG-009 | SCR-CG-002 | "Back to Onboarding" |
| SCR-CG-010 | SCR-CG-002 | "Back to Onboarding" or "Skip" |
| SCR-CG-013 | SCR-CG-001 | "Accept" or "Decline" success |

### From Admin Operations

| From | To | Action |
|------|-----|--------|
| SCR-ADM-001 | SCR-ADM-005 | "Caregiver Verifications" card |
| SCR-ADM-001 | SCR-ADM-014 | "Safeguarding Reports" card |
| SCR-ADM-005 | SCR-ADM-007 | "Review ID" or "Review Right to Work" |
| SCR-ADM-005 | SCR-ADM-008 | "Review DBS" |
| SCR-ADM-005 | SCR-ADM-001 | "Approve" or "Reject" success |
| SCR-ADM-007 | SCR-ADM-005 | "Approve" or "Reject" success |
| SCR-ADM-008 | SCR-ADM-005 | "Approve" or "Reject" success |
| SCR-ADM-014 | SCR-ADM-015 | "View Details" on report card |
| SCR-ADM-015 | SCR-ADM-014 | "Resolve" success or "Back to Queue" |

---

## Gaps and Open Questions

### 1. Dashboard Screens in R0 Scope

**GAP**: R0 launch scope document lists 26 screens but does NOT explicitly include SCR-CR-001 (Care Receiver Dashboard) or SCR-CG-001 (Caregiver Dashboard) in the 26-screen list. However, build sequence document lists them as Phase 12 items.

**DECISION NEEDED**:
- Are dashboards critical for R0 or can users navigate directly to search/bookings via navigation menu?
- If dashboards are deferred, what is the post-login landing page?
  - Option A: Care Receiver lands on SCR-CR-003 (Search) directly
  - Option B: Care Receiver lands on booking list (subset of dashboard functionality)
  - Option C: Include dashboards in R0 (adds 2 screens to 26-screen count = 28 total)

**RECOMMENDATION**: Include dashboards in R0 (Option C). Elderly users need a clear "home base" for navigation. Deferring dashboards creates poor UX for repeat users.

### 2. Messaging Screens in R0 Scope

**GAP**: R0 document states messaging can be handled via email at low volume, but messaging screens (SCR-CR-011 Message Inbox, SCR-CR-012 Message Thread) are listed as "Can Be Email/Phone at Low Volume" (deferred from R0).

**DECISION NEEDED**:
- If messaging is deferred to post-R0, how do care receivers and caregivers communicate?
  - Option A: Email-only (platform sends booking details via email, users reply via email)
  - Option B: Minimal in-app messaging (basic chat, no threading or advanced features)
  - Option C: Full messaging system in R0 (adds 2 screens to 26-screen count)

**RECOMMENDATION**: Defer messaging to post-R0 (Option A). Email is sufficient for R0 volume (<50 bookings/month). Add messaging when volume scales beyond 100 bookings/month.

### 3. Review Screens in R0 Scope

**GAP**: R0 document lists SCR-CR-015 (Leave Review) as "Can Be Email/Phone at Low Volume" (deferred from R0). However, reviews are critical for caregiver trust signals and quality monitoring.

**DECISION NEEDED**:
- If review submission is deferred, how do care receivers leave reviews?
  - Option A: Email survey link (Google Form or Typeform)
  - Option B: Manual admin entry (admin calls care receiver, enters review on their behalf)
  - Option C: Include review screen in R0 (adds 1 screen to 26-screen count)

**RECOMMENDATION**: Defer review submission screen to post-R0 (Option A - email survey). Admin can manually enter reviews into platform. Add in-app review submission when volume scales beyond 50 bookings/month.

### 4. Cancellation Screen in R0 Scope

**GAP**: R0 document lists SCR-CR-009 (Booking Cancellation) as deferred ("Admin processes cancellations manually"). However, cancellation is a key user need and high-volume action.

**DECISION NEEDED**:
- If cancellation screen is deferred, how do users cancel bookings?
  - Option A: Email or phone (admin processes manually)
  - Option B: Cancellation button on SCR-CR-008 (Booking Detail) with inline confirmation modal (NOT a separate screen)
  - Option C: Separate cancellation screen (adds 1 screen to 26-screen count)

**RECOMMENDATION**: Option B - cancellation as inline action on Booking Detail screen (NOT a separate screen). This maintains 26-screen count while enabling self-service cancellation.

### 5. Safeguarding Report Screen in R0 Scope

**GAP**: R0 document lists SCR-CR-020 (Safeguarding Report) as deferred ("Email/phone reporting works initially"). However, safeguarding is Care Act 2014 legal requirement and must be accessible.

**DECISION NEEDED**:
- If safeguarding report screen is deferred, how do users report concerns?
  - Option A: Email + phone (24/7 safeguarding hotline)
  - Option B: Simple report button that opens email client (mailto: link)
  - Option C: Include safeguarding report screen in R0 (adds 1 screen to 26-screen count)

**RECOMMENDATION**: Option A for R0 (email + phone). Add in-app reporting screen post-R0 when volume scales. However, "Report Concern" buttons should be visible throughout platform (linked to email/phone instructions).

### 6. Account Settings Screen

**GAP**: Account settings screen (SCR-CR-017) is NOT documented in R0 scope. Users cannot change email, phone, password, or delete account.

**DECISION NEEDED**:
- Are account settings critical for R0 or can admin handle via support?
  - Option A: Admin handles all account changes via email/phone
  - Option B: Password change only (SCR-AUTH-007 Password Change screen)
  - Option C: Full account settings screen (adds 1 screen to 26-screen count)

**RECOMMENDATION**: Option A for R0 (admin support handles account changes). Add account settings screen post-R0.

### 7. Caregiver Profile Management Screen

**GAP**: Caregiver profile management screen (SCR-CG-003) is NOT documented in R0 scope. Caregivers cannot edit bio, photo, rate, or availability after initial onboarding.

**DECISION NEEDED**:
- Can caregivers edit profile after onboarding in R0?
  - Option A: No editing (admin handles via support)
  - Option B: Inline editing on dashboard (not a separate screen)
  - Option C: Full profile management screen (adds 1 screen to 26-screen count)

**RECOMMENDATION**: Option A for R0 (admin support handles profile edits). Add profile management screen post-R0. This is acceptable at low volume (<50 caregivers).

### 8. Missing State: Booking "In Progress" Emergency Contact Display

**QUESTION**: When a booking is "in progress" (start time reached), SCR-CR-008 (Booking Detail) should display emergency contact prominently. Is there a separate "Emergency Protocol" screen or is it inline?

**RECOMMENDATION**: Inline emergency contact display on Booking Detail screen (NOT a separate screen). No additional screen needed.

### 9. Payment Authorization vs Capture Timing

**QUESTION**: Booking Request Form (SCR-CR-006) states "payment authorization (card hold)" on request submission. When does capture occur?

**CLARIFICATION**: Per state-maps.md Booking Flow:
- **Requested state**: Payment AUTHORIZED (card hold, NOT charged)
- **Accepted state**: Payment CAPTURED (charged to care receiver, held in escrow)
- **Completed state**: Payment RELEASED (paid out to caregiver 48 hours after completion)

This is correctly documented. No gap.

### 10. DBS Verification Status on Public Profile

**QUESTION**: If caregiver voluntarily submits DBS at Tier 1, is "DBS Verified" badge displayed on public profile (SCR-CR-005) ONLY if admin approves, or is it displayed immediately upon submission?

**CLARIFICATION**: Per verification workflow in state-maps.md:
- DBS badge displayed ONLY after admin approval (status: `verified`)
- Submitted but not reviewed = NO badge
- Rejected = NO badge

This is correctly documented. No gap.

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-02 | Product Team (AI-assisted) | Initial canonical screen inventory for Tier 1 R0 launch (26 screens) |

---

**END OF DOCUMENT**

---

## Next Steps for Design & Engineering Teams

1. **Design Team**: Use this inventory as the specification for wireframes and visual designs. Each screen's "Key States" section defines all UI states that must be designed.

2. **Engineering Team**: Use this inventory as the specification for route definitions, page components, and state management. Each screen's "Data Requirements" and "Primary Actions" sections define API contracts.

3. **QA Team**: Use this inventory as the test surface. Each screen and state must have test coverage.

4. **Product Team**: Resolve "Gaps and Open Questions" section decisions before design/engineering work begins on affected screens.

5. **Compliance Team**: Verify all screens with "Data Sensitivity: High" or "Critical" have appropriate security controls and audit logging.

---

**Document References**:
- Source: `/docs/tiers/tier1/planning/r0-launch-scope.md`
- Source: `/docs/tiers/tier1/features.md`
- Source: `/docs/tiers/common/spec/feature-map.md`
- Source: `/docs/tiers/common/spec/state-maps.md`
- Source: `/docs/tiers/common/spec/marketplace-spec.md`
- Source: `/docs/tiers/tier1/planning/build-sequence.md`
