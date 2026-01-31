# MVP Build Sequence: Thin-Slice Approach

**Document Purpose**: Define the implementation sequence for MVP using thin-slice methodology. Each slice delivers an end-to-end capability that is deployable, testable, and builds toward the complete economic loop: Discovery → Booking → Payment → Care → Review.

**Document Owner**: Product & Engineering Teams
**Last Updated**: 2026-01-31
**Status**: Ready for Implementation

---

## Build Philosophy

**Goal**: Achieve a safe, compliant, end-to-end marketplace loop as quickly as possible while maintaining safeguarding integrity at every step.

**Principles**:
1. Every slice must be deployable and testable in production
2. Every slice must maintain safeguarding standards (no "we'll add security later")
3. Each slice builds on previous slices (dependencies clear)
4. Focus on happy path first, then add edge cases
5. Prioritize compliance blockers identified in Gating Decisions (GD-XX)
6. Manual admin processes acceptable if they unblock progress (automate later)

**Anti-Patterns to Avoid**:
- Building entire systems before testing end-to-end
- "We'll make it secure in the next sprint"
- Feature bloat in early slices
- Skipping compliance requirements "temporarily"

---

## Pre-Development: Legal & Compliance Foundations

**Timeline**: Weeks 1-4 (parallel to Slice 1 development)

**Critical Gating Decisions** (MUST RESOLVE BEFORE LAUNCH):
- GD-01: CQC Registration Legal Opinion (Week 1 - URGENT)
- GD-02: DPIA Completion (Week 2 - MANDATORY)
- GD-04: Mental Capacity Act Compliance Framework (Week 2 - URGENT)
- GD-03: Insurance Requirements (Week 3)
- GD-05: Medication Assistance Boundaries (Week 3)
- GD-06: DoLS Risk Assessment for Live-In Care (Week 2)
- GD-07: SAB Liaison Procedures (Week 4)
- GD-08: Right to Work Verification Process (Week 3)
- GD-09: Cookie Consent (Week 6 - can launch without analytics temporarily)
- GD-10: Gender Preferences Legal Review (Week 5)

**Parallel Activities**:
- Legal document drafting (Terms of Service, Privacy Policy, Safeguarding Policy)
- CQC registration application (if GD-01 determines it's required - 3-6 months)
- Stripe account setup (business verification, Connect application)
- AWS infrastructure setup (S3, RDS, hosting)

**Outcome**: Legal framework approved, compliance infrastructure documented, technical infrastructure provisioned.

---

## Slice 1: Foundation - User Registration & Authentication

**Timeline**: Weeks 1-2
**Goal**: Users can securely register, verify identity, and log in.

**Stories Included**:
- STORY-01-01: Care Receiver Registration
- STORY-01-02: Family Member Registration
- STORY-01-03: Caregiver Registration
- STORY-01-04: Phone Verification
- STORY-01-05: Secure Login
- STORY-01-06: Password Reset
- STORY-01-07: Role-Based Access Control
- STORY-01-08: Session Management
- STORY-22-01: Database Architecture
- STORY-22-02: API Architecture
- STORY-22-03: Authentication & Security
- STORY-22-04: File Storage (S3 for future profile photos)
- STORY-22-05: Email Service (for verification codes, password resets)
- STORY-22-08: Accessibility (WCAG 2.1 AA foundation)
- STORY-22-09: Mobile Responsiveness
- STORY-22-10: Hosting & Infrastructure
- STORY-21-01: Public Website Content (Homepage, How It Works)
- STORY-21-02: Terms of Service
- STORY-21-03: Privacy Policy
- STORY-13-01: Comprehensive Audit Trail (foundation)
- STORY-13-02: GDPR Consent Management

**What It Enables**:
- Care receivers, family members, and caregivers can register accounts
- Phone number verification ensures identity assurance
- Secure login and session management
- GDPR consent captured at registration
- Role-based access control foundation (prevents unauthorized actions)
- Public website explains platform value proposition

**Safeguarding/Compliance Addressed**:
- GDPR: Consent captured, Privacy Policy displayed, audit trail started
- Safeguarding: Phone verification prevents fake accounts
- Security: Passwords encrypted, sessions secure, HTTPS enforced
- Care Act: Audit trail foundation for compliance documentation

**Exit Criteria**:
- [ ] Care receiver can register, verify phone, log in, log out
- [ ] Caregiver can register, verify phone, log in (account marked "pending_verification")
- [ ] Family member can register, verify phone, log in (cannot yet link to care receiver - Slice 3)
- [ ] All users must accept Terms and Privacy Policy before registration completes
- [ ] Password reset flow works via email
- [ ] All actions logged in audit trail
- [ ] Public website live (Homepage, How It Works, Terms, Privacy Policy)
- [ ] Accessibility tested with keyboard navigation and screen reader
- [ ] Mobile responsive tested on iOS and Android

**Dependencies on Gating Decisions**:
- GD-02: DPIA must be completed before processing user data (MANDATORY)
- Legal documents (Terms, Privacy Policy) must be finalized

**Technical Deliverables**:
- PostgreSQL database with user, session, audit_log tables
- RESTful API with authentication endpoints
- Frontend pages: Register, Login, Password Reset, Homepage, How It Works, Terms, Privacy Policy
- Email service configured (SendGrid or AWS SES)
- AWS S3 bucket configured
- Hosting environment live (staging + production)

---

## Slice 2: Caregiver Verification & Identity Checks

**Timeline**: Weeks 3-4
**Goal**: Caregivers can upload verification documents and admin can approve them.

**Stories Included**:
- STORY-10-01: Care Receiver Identity Verification (basic - upload ID)
- STORY-10-02: Caregiver Enhanced Identity Verification
- STORY-10-03: Right to Work Verification
- STORY-10-04: DBS Check Verification
- STORY-10-05: Qualification Verification
- STORY-10-06: Verification Badge System
- STORY-12-01: Admin Dashboard Overview
- STORY-12-02: User Search & Management
- STORY-12-03: Caregiver Application Review Workflow
- STORY-12-04: Verification Queue Management
- STORY-12-07: Admin Audit Log
- STORY-17-05: Profile Management (Caregiver - upload documents)
- STORY-01-07: Role-Based Access Control (admin role)

**What It Enables**:
- Caregivers can upload ID, proof of address, DBS certificate, qualifications
- Admin can log in and review verification documents
- Admin can approve or reject verifications with reasons
- Verified caregivers receive verification badges
- Unverified caregivers cannot be discovered in search (foundation for Slice 4)

**Safeguarding/Compliance Addressed**:
- DBS: Enhanced DBS certificates verified before caregivers can accept bookings
- Identity Verification: Prevents fraudsters from accessing vulnerable adults
- Right to Work: Immigration Act compliance (prevents illegal working)
- Safeguarding: Only verified caregivers visible to care receivers
- Care Act: Due diligence in caregiver vetting documented

**Exit Criteria**:
- [ ] Caregiver can upload photo ID, proof of address, DBS certificate, qualifications
- [ ] Admin can log in and access admin dashboard
- [ ] Admin can view pending verification queue
- [ ] Admin can view uploaded documents (zoom, download)
- [ ] Admin can approve or reject each verification with reason
- [ ] Rejected verifications trigger email to caregiver with feedback
- [ ] Approved verifications show "Verified" badge on caregiver profile
- [ ] Caregiver profile shows verification status (Identity: Verified, DBS: Pending, etc.)
- [ ] Admin actions logged in audit trail
- [ ] RBAC prevents caregivers from accessing admin dashboard

**Dependencies on Gating Decisions**:
- GD-03: Insurance requirements definition (not blocking - can add insurance verification later)
- GD-08: Right to Work verification process defined (REQUIRED)

**Technical Deliverables**:
- File upload API (S3 presigned URLs)
- Admin dashboard frontend (verification queue, user search)
- Admin authentication and RBAC
- Document viewer component (display uploaded PDFs/images)
- Verification status tracking (database fields: identity_verified, dbs_verified, etc.)

---

## Slice 3: Caregiver Profiles & Care Matching Setup

**Timeline**: Weeks 5-6
**Goal**: Caregivers can build profiles with capabilities; care receivers can document care needs.

**Stories Included**:
- STORY-02-01: Medical Condition Experience Profile
- STORY-02-02: Care Skills Profile
- STORY-02-03: Qualifications & Training Registry (already uploaded in Slice 2, now linked to capabilities)
- STORY-02-04: Service Type Definition
- STORY-02-05: Capability Verification Workflow (Admin)
- STORY-02-06: Capability-Based Search Indexing
- STORY-03-01: Care Receiver Care Needs Profile
- STORY-03-02: Medical Condition Matching Engine
- STORY-03-03: Care Skills Matching Engine
- STORY-03-04: Qualification Requirement Enforcement
- STORY-17-05: Profile Management (Caregiver - bio, photo, hourly rate, capabilities)
- STORY-18-02: Care Needs Profile Management (Care Receiver)
- STORY-16-01: Family Member Invitation (allow family to help care receiver)
- STORY-16-02: Family Member Permissions
- STORY-16-03: Family Account Safeguarding

**What It Enables**:
- Caregivers can specify medical condition experience, care skills, service types
- Admin can verify caregiver capabilities (prevents fraud)
- Care receivers can document medical conditions and care needs
- Family members can be invited to help care receiver (important for digital literacy)
- Matching engine foundation: caregivers matched only if capabilities verified and aligned with care receiver needs

**Safeguarding/Compliance Addressed**:
- Safeguarding: Prevents unqualified caregivers from offering services they cannot safely provide
- Care Act: Documented caregiver competencies (CQC alignment)
- Mental Capacity Act: Family members can assist cognitively impaired care receivers
- Safeguarding: Admin verification prevents false capability claims

**Exit Criteria**:
- [ ] Caregiver can select medical conditions with years of experience
- [ ] Caregiver can select care skills (personal care, companionship, etc.)
- [ ] Caregiver can upload qualifications (already uploaded in Slice 2, now tagged to skills)
- [ ] Admin can approve or reject caregiver capabilities with reason
- [ ] Care receiver can document medical conditions and required care skills
- [ ] Care receiver can invite family member via email
- [ ] Family member can accept invitation and link to care receiver account
- [ ] Care receiver can set family member permissions (view only, booking, payment, full access)
- [ ] Caregiver profile displays verified capabilities with badges
- [ ] Care receiver care needs profile saved securely (encrypted health data)
- [ ] Matching engine logic implemented (caregivers matched only if verified capabilities align with care needs)

**Dependencies on Gating Decisions**:
- GD-04: Mental Capacity Act compliance framework (family accounts) - REQUIRED
- GD-05: Medication assistance boundaries (defines which skills require verification)

**Technical Deliverables**:
- Caregiver capability tables (medical_conditions, care_skills, qualifications linkage)
- Care receiver care needs table (encrypted health data)
- Family account linkage (family_members table, permissions)
- Matching engine logic (filter caregivers by verified capabilities)
- Admin capability verification queue

---

## Slice 4: Discovery & Search

**Timeline**: Weeks 7-8
**Goal**: Care receivers can search for and discover verified caregivers.

**Stories Included**:
- STORY-04-01: Location-Based Caregiver Search
- STORY-04-02: Advanced Filtering
- STORY-04-03: Caregiver Profile Visibility Rules
- STORY-04-04: Caregiver Profile View
- STORY-22-07: Geolocation Services (Google Maps API)
- STORY-18-01: Care Receiver Dashboard Overview
- STORY-18-03: Caregiver Search & Discovery
- STORY-17-01: Caregiver Dashboard Overview
- STORY-15-01: Caregiver Availability Configuration (required for search results)

**What It Enables**:
- Care receivers can search for caregivers by location (postcode + radius)
- Care receivers can filter by medical condition experience, care skills, DBS status, availability, gender
- Search results show only verified caregivers (safeguarding enforcement)
- Care receivers can view caregiver profiles (ratings placeholder - Slice 7)
- Caregivers can set availability (required for search visibility)

**Safeguarding/Compliance Addressed**:
- Safeguarding: Only verified caregivers visible in search results
- DBS: Search results show DBS verification status
- Transparency: Care receivers see caregiver qualifications and experience
- Equality Act: Gender filtering implemented per legal guidance (GD-10)

**Exit Criteria**:
- [ ] Care receiver can search caregivers by postcode and radius
- [ ] Search results display caregivers sorted by distance
- [ ] Care receiver can filter by medical conditions, care skills, DBS status, availability
- [ ] Search results exclude unverified caregivers (identity, DBS not verified)
- [ ] Care receiver can view full caregiver profile (bio, photo, capabilities, hourly rate, verification badges)
- [ ] Caregiver can set recurring availability (weekly schedule)
- [ ] Caregiver can block specific dates as unavailable
- [ ] Caregiver availability reflected in search results (unavailable caregivers excluded)
- [ ] Care receiver dashboard shows search shortcut and recent searches
- [ ] Caregiver dashboard shows profile completion status (encourage full profile)

**Dependencies on Gating Decisions**:
- GD-10: Gender filtering legal review (if not resolved, exclude gender filter for MVP)

**Technical Deliverables**:
- Search API with geolocation (PostGIS or Google Maps Distance Matrix API)
- Search filters (medical conditions, skills, DBS status, availability)
- Caregiver profile page (frontend)
- Availability calendar component (caregiver sets working hours)
- Care receiver dashboard (frontend)
- Caregiver dashboard (frontend)

---

## Slice 5: Messaging & Communication

**Timeline**: Weeks 9-10
**Goal**: Care receivers and caregivers can communicate to discuss care needs before booking.

**Stories Included**:
- STORY-06-01: In-App Messaging
- STORY-06-02: Content Filtering for Off-Platform Payments
- STORY-06-03: Content Filtering for Abuse Keywords
- STORY-06-04: Message Reporting
- STORY-17-06: Message Center (Caregiver)
- STORY-18-05: Message Center (Care Receiver)
- STORY-19-01: Transactional Email Notifications (message notifications)
- STORY-19-02: In-App Notifications (new message alerts)

**What It Enables**:
- Care receivers can message caregivers to discuss care needs, availability, logistics
- Caregivers can respond to messages (clarify experience, ask questions)
- Messages filtered for off-platform payment keywords (safeguarding)
- Messages flagged for abuse keywords (safeguarding escalation)
- Users can report inappropriate messages

**Safeguarding/Compliance Addressed**:
- Safeguarding: Off-platform payment attempts blocked (prevents financial exploitation)
- Safeguarding: Abuse keywords flagged for admin review (early detection of concerns)
- Care Act: Communication monitoring fulfills safeguarding duty
- GDPR: Messages encrypted and retained per data retention policy

**Exit Criteria**:
- [ ] Care receiver can initiate message thread from caregiver profile
- [ ] Caregiver receives email notification of new message
- [ ] Caregiver can reply to message (via email link or in-app)
- [ ] Messages displayed in threaded conversation view
- [ ] Messages containing payment keywords blocked before sending (sender shown warning)
- [ ] Messages containing safeguarding keywords flagged for admin review (message still sent)
- [ ] User can report message (reason selection, notes)
- [ ] Reported messages appear in admin queue (basic queue - full admin workflow in Slice 8)
- [ ] In-app notification shows unread message count
- [ ] Message history persists for audit purposes

**Dependencies on Gating Decisions**:
- None (core safeguarding feature, cannot be delayed)

**Technical Deliverables**:
- Messaging API (create thread, send message, fetch messages)
- Content filtering service (keyword detection)
- Message reporting API
- Message center UI (care receiver and caregiver)
- Email notifications for new messages
- In-app notification system (bell icon + count)

---

## Slice 6: Booking System (Core Loop)

**Timeline**: Weeks 11-13
**Goal**: Care receivers can request bookings; caregivers can accept; bookings tracked through lifecycle.

**Stories Included**:
- STORY-05-01: Hourly Booking Request Creation
- STORY-05-02: Booking Request Review by Caregiver
- STORY-05-03: Booking Acceptance & Payment Authorization (payment integration next slice)
- STORY-05-04: Booking In-Progress and Completion
- STORY-05-05: Booking Cancellation by Care Receiver
- STORY-05-06: Booking Cancellation by Caregiver
- STORY-05-07: No-Show Management
- STORY-15-02: Real-Time Availability Sync (prevent double-booking)
- STORY-15-03: Care Receiver Calendar View
- STORY-15-04: Caregiver Calendar View
- STORY-17-02: Booking Request Management (Caregiver dashboard)
- STORY-17-03: Upcoming Bookings Management (Caregiver dashboard)
- STORY-18-04: Booking Management (Care receiver dashboard)
- STORY-19-01: Transactional Email Notifications (booking confirmations)
- STORY-19-02: In-App Notifications (booking request alerts)

**What It Enables**:
- Care receivers can request hourly care bookings (date, time, care needs, emergency contact)
- Caregivers receive booking requests and can accept or decline
- Accepted bookings shown on both parties' calendars
- Caregivers can mark bookings "in_progress" and "completed"
- Both parties can cancel bookings (per cancellation policy)
- No-show management (care receiver can report caregiver no-show)
- Double-booking prevention (availability synced in real-time)

**Safeguarding/Compliance Addressed**:
- Safeguarding: Emergency contact captured at booking (required for emergencies)
- Safeguarding: Care needs documented per booking (admin can review if incident occurs)
- Consumer Rights: Cancellation policy enforced (clear refund rules)
- Safeguarding: No-show management protects care receivers from unreliable caregivers

**Exit Criteria**:
- [ ] Care receiver can request hourly booking (select date, time, care needs, emergency contact)
- [ ] Booking request shows total cost (hourly rate × hours + platform fee placeholder)
- [ ] Caregiver receives email + in-app notification of booking request
- [ ] Caregiver can view booking details and accept or decline with reason
- [ ] Accepted bookings appear on both parties' calendars
- [ ] Caregiver availability blocked when booking accepted (prevents double-booking)
- [ ] Caregiver can mark booking "in_progress" (button enabled at start time)
- [ ] Caregiver can mark booking "completed" (button enabled after start time)
- [ ] Care receiver can cancel booking (cancellation policy enforced - full refund if 24+ hours, fees if less)
- [ ] Caregiver can cancel booking (care receiver notified, admin flagged if late cancellation)
- [ ] Care receiver can report caregiver no-show (triggers admin review)
- [ ] Both parties receive email confirmations for booking status changes
- [ ] Calendar exports to iCal format

**Dependencies on Gating Decisions**:
- None (payment integration next slice, but booking lifecycle can function without it for testing)

**Technical Deliverables**:
- Booking API (create, accept, decline, cancel, mark in_progress, mark completed)
- Booking lifecycle state machine (requested → accepted → in_progress → completed)
- Cancellation policy logic (calculate refund based on cancellation time)
- Availability sync logic (lock availability when booking accepted)
- Calendar view components (month, week, list views)
- iCal export functionality
- No-show reporting API

**Note**: Payment authorization in STORY-05-03 placeholder for Slice 7. Bookings function without payment in Slice 6 (testing only).

---

## Slice 7: Payment System & Escrow

**Timeline**: Weeks 14-16
**Goal**: Payment flow end-to-end: care receiver pays, funds held in escrow, caregiver receives payout.

**Stories Included**:
- STORY-07-01: Care Receiver Payment Method Setup
- STORY-07-02: Payment Authorization on Booking Acceptance
- STORY-07-03: Payment Capture on Booking Completion
- STORY-07-04: Caregiver Payout Setup (Stripe Connect)
- STORY-07-05: Refund Processing
- STORY-07-06: Dispute Resolution & Payment Holds
- STORY-22-06: Payment Processing (Stripe)
- STORY-17-04: Earnings Dashboard (Caregiver)
- STORY-18-06: Payment & Transaction History (Care Receiver)
- STORY-12-05: Booking Oversight & Dispute Resolution (Admin)
- STORY-13-06: Payment Services Regulations Compliance

**What It Enables**:
- Care receivers can add payment card (Stripe Elements)
- Payment authorized when caregiver accepts booking (funds held)
- Payment captured when booking completed (funds to escrow)
- Funds released to caregiver after 48 hours (dispute period)
- Caregivers can set up Stripe Connect account (receive payouts)
- Refunds processed per cancellation policy
- Admin can hold payments for disputes

**Safeguarding/Compliance Addressed**:
- Safeguarding: On-platform payments prevent off-platform financial exploitation
- Payment Services Regulations: Stripe integration ensures compliance (FCA-authorized)
- Consumer Rights: Refund policy enforced
- Safeguarding: Dispute period allows admin review before releasing funds

**Exit Criteria**:
- [ ] Care receiver can add payment card (Stripe Elements, card details never stored on platform)
- [ ] Payment method verified via £1 authorization (refunded immediately)
- [ ] When caregiver accepts booking, payment authorized for total amount (hold funds)
- [ ] When caregiver marks booking completed, payment captured (funds to escrow)
- [ ] Funds held in escrow for 48 hours (dispute period)
- [ ] After 48 hours, funds transferred to caregiver's Stripe Connect account
- [ ] Caregiver can initiate Stripe Connect onboarding (link bank account, provide tax info)
- [ ] Caregiver cannot receive payouts until Stripe Connect verified
- [ ] Care receiver can view transaction history (bookings paid, refunds received)
- [ ] Caregiver can view earnings dashboard (pending payouts, payout history)
- [ ] Refunds processed automatically per cancellation policy
- [ ] Admin can hold payment if dispute reported (admin can refund, release, or split)
- [ ] All payment events logged in audit trail (Stripe transaction IDs recorded)

**Dependencies on Gating Decisions**:
- None (Stripe integration critical for MVP, cannot be delayed)

**Technical Deliverables**:
- Stripe integration (Stripe Elements, Payment Intents, Stripe Connect)
- Payment authorization API (create PaymentIntent, authorize amount)
- Payment capture API (capture PaymentIntent after booking completion)
- Escrow hold logic (48-hour delay before payout)
- Payout API (transfer to Stripe Connect account)
- Refund API (Stripe Refunds)
- Stripe webhook handlers (payment succeeded, payment failed, payout completed)
- Earnings dashboard (caregiver frontend)
- Transaction history (care receiver frontend)
- Admin dispute resolution interface

---

## Slice 8: Reviews, Ratings & Safeguarding Reporting

**Timeline**: Weeks 17-18
**Goal**: Close feedback loop with reviews; enable safeguarding reporting.

**Stories Included**:
- STORY-08-01: Post-Booking Review Creation
- STORY-08-02: Caregiver Ratings & Reputation Score
- STORY-08-03: Low Rating Escalation to Admin
- STORY-09-01: Safeguarding Concern Reporting by Users
- STORY-09-02: Safeguarding Incident Investigation Workflow
- STORY-09-03: External Referral to Safeguarding Adults Board
- STORY-09-04: User Suspension & Ban System
- STORY-09-05: Safeguarding Audit Trail
- STORY-12-06: Safeguarding Report Management (Admin)
- STORY-21-04: Safeguarding Policy (publish on website)

**What It Enables**:
- Care receivers can leave reviews after booking completion (star rating, written comment)
- Caregiver ratings aggregated and displayed on profile
- Low ratings (2 stars or below) escalate to admin for quality review
- Users can report safeguarding concerns (abuse, neglect, exploitation)
- Admin can investigate safeguarding reports and take action (suspend, ban, refer to SAB)
- Safeguarding policy published (demonstrates Care Act compliance)

**Safeguarding/Compliance Addressed**:
- Safeguarding: Reviews identify low-quality or dangerous caregivers
- Care Act: Safeguarding reporting system fulfills legal duty
- Care Act: SAB referral process documented
- Safeguarding: User suspension/ban system protects vulnerable adults from dangerous users
- CQC: Quality monitoring via review system

**Exit Criteria**:
- [ ] Care receiver can leave review within 14 days of booking completion
- [ ] Review includes star rating (1-5) and optional written comment
- [ ] Review published immediately on caregiver profile
- [ ] Caregiver profile shows average rating and total review count
- [ ] Ratings of 2 stars or below trigger admin notification
- [ ] Admin can review low-rated bookings and contact parties
- [ ] User can report safeguarding concern from any page (header/footer button)
- [ ] Safeguarding report captures concern type, details, evidence (optional file upload)
- [ ] Admin receives immediate notification of safeguarding report (email + SMS if critical)
- [ ] Admin can assign report to safeguarding team member
- [ ] Admin can add investigation notes to report
- [ ] Admin can suspend or ban user from safeguarding report
- [ ] Admin can refer report to Safeguarding Adults Board (SAB) with form generation
- [ ] Safeguarding policy published on website (accessible from all pages)
- [ ] All safeguarding activities logged in immutable audit trail

**Dependencies on Gating Decisions**:
- GD-07: SAB liaison procedures (REQUIRED) - must define SAB contact process before implementing referral

**Technical Deliverables**:
- Review API (create review, fetch reviews, calculate average rating)
- Review display component (caregiver profile)
- Low rating alert system (admin notification)
- Safeguarding report API (create report, fetch reports, assign, update status)
- Safeguarding report form (user-facing)
- Admin safeguarding queue (prioritized by severity)
- User suspension/ban API (block login, cancel bookings)
- SAB referral form generator (PDF export)
- Safeguarding policy page (static content)

---

## Slice 9: Clinical Safety & Emergency Response

**Timeline**: Weeks 19-20
**Goal**: Handle emergencies and clinical incidents during care.

**Stories Included**:
- STORY-11-01: Falls & Injury Reporting by Caregiver
- STORY-11-02: Emergency Button During Active Booking
- STORY-11-03: Medical Emergency Protocol
- STORY-11-04: Clinical Incident Audit Trail
- STORY-14-01: Emergency Contact Registration
- STORY-14-02: Emergency Button During Booking (Caregiver)
- STORY-14-03: Emergency Services Coordination (999)
- STORY-14-04: Emergency Escalation Matrix
- STORY-14-05: Emergency Preparedness Training (Caregivers)
- STORY-19-03: Emergency Notifications (SMS)

**What It Enables**:
- Caregivers can report falls, injuries, medical emergencies during bookings
- Caregivers can press emergency button during booking (triggers immediate notifications)
- Family emergency contacts notified automatically
- Admin on-call notified for immediate response
- Emergency protocol displayed to caregiver (call 999, first aid, stay with care receiver)
- Clinical incidents logged for CQC compliance

**Safeguarding/Compliance Addressed**:
- Safeguarding: Emergency response protects vulnerable adults from harm
- Health & Safety: Emergency protocols reduce risk during care
- CQC: Incident reporting demonstrates clinical safety monitoring
- Care Act: Duty to respond to urgent needs fulfilled

**Exit Criteria**:
- [ ] Care receiver can add emergency contacts during registration or later
- [ ] Emergency contacts verified via SMS code
- [ ] Active booking page shows prominent "Emergency" button (red, always visible)
- [ ] Emergency button triggers immediate SMS to family emergency contacts + admin on-call
- [ ] Emergency notification includes care receiver address, caregiver phone, booking details
- [ ] Caregiver shown emergency protocol (call 999, administer first aid if trained, stay with care receiver)
- [ ] Caregiver can report incident from active booking page (fall, injury, medical emergency, other)
- [ ] Incident report captures details (what happened, actions taken, witness present)
- [ ] Incident report flagged to admin immediately (email + SMS)
- [ ] Admin can review incident and add follow-up notes
- [ ] All incidents logged in immutable audit trail (7-year retention)
- [ ] Caregiver onboarding includes emergency preparedness training (quiz with 80% pass mark)
- [ ] Emergency response times tracked (admin response within 5 minutes for critical emergencies)

**Dependencies on Gating Decisions**:
- None (emergency response is critical safeguarding feature)

**Technical Deliverables**:
- Emergency button component (visible on active booking page)
- Emergency notification service (SMS via Twilio or AWS SNS)
- Incident reporting API (create incident, fetch incidents, add notes)
- Incident reporting form (caregiver-facing)
- Admin incident queue (prioritized by severity)
- Emergency preparedness training module (quiz, certificate generation)
- Emergency protocol display (step-by-step instructions)

---

## Slice 10: Compliance Finalization & Launch Preparation

**Timeline**: Weeks 21-22
**Goal**: Finalize all compliance requirements and prepare for launch.

**Stories Included**:
- STORY-13-03: GDPR Data Subject Rights Interface
- STORY-13-04: Data Retention Policy Enforcement
- STORY-13-05: Care Act 2014 Safeguarding Compliance
- STORY-13-07: Consumer Rights Act Compliance
- STORY-13-08: Equality Act 2010 Compliance
- STORY-13-09: Terms of Service & Privacy Policy (final review and version control)
- STORY-20-01: Platform Metrics Dashboard (Admin)
- STORY-20-02: Safeguarding Reports Tracking
- STORY-09-06 to STORY-09-10: Enhanced safeguarding features (if time permits, otherwise post-MVP)

**What It Enables**:
- Users can exercise GDPR rights (data export, account deletion, data correction)
- Data retention policy enforced automatically (delete data after 7 years)
- Compliance documentation complete (Care Act, Consumer Rights, Equality Act)
- Admin can monitor platform health metrics
- Platform ready for regulatory audit

**Safeguarding/Compliance Addressed**:
- GDPR: Data subject rights interface (mandatory)
- GDPR: Data retention policy (mandatory)
- Care Act: Safeguarding compliance documented
- Consumer Rights: Clear service descriptions and refund policies
- Equality Act: Non-discrimination policy enforced

**Exit Criteria**:
- [ ] User can request data export (all personal data in JSON format)
- [ ] Data export delivered within 30 days (GDPR SLA)
- [ ] User can request account deletion (right to erasure)
- [ ] Account deletion anonymizes user data (retains bookings/reviews with anonymized user)
- [ ] Data retention policy automated (scheduled job deletes data after 7 years)
- [ ] Safeguarding policy published and linked from all pages
- [ ] Admin can view platform metrics (users, bookings, revenue, safeguarding reports)
- [ ] Compliance documentation complete and reviewed by legal team
- [ ] All gating decisions resolved (GD-01 through GD-10)
- [ ] Terms and Privacy Policy version control implemented
- [ ] Cookie consent banner implemented (GD-09)
- [ ] Accessibility audit complete (WCAG 2.1 AA)

**Dependencies on Gating Decisions**:
- ALL gating decisions (GD-01 through GD-10) must be resolved before launch
- If GD-01 (CQC Registration) requires registration, registration must be approved before launch

**Technical Deliverables**:
- Data export API (generate JSON export of user data)
- Account deletion API (anonymize user data)
- Data retention automated job (monthly cleanup)
- Admin metrics dashboard (frontend)
- Cookie consent banner (PECR compliance)
- Compliance checklist documentation
- Legal document version control system

---

## Post-Launch: Continuous Improvement & Monitoring

**Timeline**: Ongoing (post-launch)

**Activities**:
1. **User Feedback Collection**: Gather feedback from care receivers, caregivers, family members
2. **Safeguarding Monitoring**: Weekly review of safeguarding reports and incidents
3. **Quality Monitoring**: Monthly review of low ratings and booking disputes
4. **Compliance Audits**: Quarterly compliance reviews (GDPR, Care Act, CQC if applicable)
5. **Performance Optimization**: Monitor platform performance and optimize as user base grows
6. **Feature Enhancements**: Implement post-MVP features based on user feedback and data

**Key Metrics to Monitor**:
- Safeguarding reports (count, severity, response times)
- Clinical incidents (count, type, response times)
- User retention (care receivers booking 2+ times, caregivers accepting 2+ bookings)
- Booking completion rate (bookings completed vs. cancelled)
- Payment success rate (authorization success, payout success)
- Verification approval rate (% of caregivers approved vs. rejected)
- Low rating escalations (count, admin actions taken)

**Continuous Compliance**:
- SAB reporting (ongoing as incidents occur)
- ICO compliance (respond to data subject requests within 30 days)
- CQC compliance (if registered, quarterly quality reports)
- HMRC reporting (annual tax reporting for caregiver earnings)

---

## Risk Mitigation & Contingency Plans

### Risk 1: CQC Registration Required (GD-01)

**Impact**: If CQC registration required, 3-6 month delay before launch.

**Mitigation**:
- Start CQC application immediately upon legal opinion (Week 1)
- Consider launching as "introduction agency" model to avoid CQC (legal review required)
- Launch in limited geographic area to reduce scope (single local authority)

**Contingency**: If CQC required and application delayed, consider soft launch with manual caregiver vetting and close supervision (higher admin overhead).

---

### Risk 2: DPIA Identifies High Risks (GD-02)

**Impact**: If DPIA identifies unmitigated high risks, ICO may require changes before launch.

**Mitigation**:
- Engage qualified DPO early (Week 1)
- Implement all recommended mitigations from DPIA
- Submit to ICO for review if residual high risk (add 4-6 weeks)

**Contingency**: If ICO requires changes, prioritize changes and delay launch until resolved (cannot launch without GDPR compliance).

---

### Risk 3: Caregiver Supply Insufficient

**Impact**: If insufficient caregivers verified and available, care receivers cannot find matches.

**Mitigation**:
- Start caregiver recruitment before launch (Weeks 5-10)
- Streamline verification process (admin prioritization)
- Offer onboarding incentives (reduced platform fees for first month)

**Contingency**: Launch in limited geographic area (single city) to concentrate caregiver supply.

---

### Risk 4: Payment Integration Challenges

**Impact**: If Stripe integration complex or delayed, payment flow blocked.

**Mitigation**:
- Start Stripe account setup early (Week 1)
- Use Stripe's test environment for development (Week 14)
- Engage Stripe support for integration questions

**Contingency**: If Stripe integration delayed, launch with manual payment processing (admin processes payments via Stripe dashboard - not scalable but unblocks launch).

---

### Risk 5: Legal Document Delays

**Impact**: If Terms, Privacy Policy, or Safeguarding Policy delayed, cannot launch (legal requirement).

**Mitigation**:
- Engage legal team early (Week 1)
- Provide legal team with detailed requirements (this document + gating decisions)
- Review drafts iteratively (Weeks 2-4)

**Contingency**: Use template legal documents as starting point (customized by legal team).

---

## Success Criteria for MVP Launch

**MVP is launch-ready when ALL criteria met**:

### Functional Criteria:
- [ ] Care receiver can register, verify identity, log in
- [ ] Care receiver can document care needs (medical conditions, care skills)
- [ ] Care receiver can search for caregivers (location, filters)
- [ ] Care receiver can view verified caregiver profiles
- [ ] Care receiver can message caregiver
- [ ] Care receiver can request booking (hourly care)
- [ ] Care receiver can add payment card and pay for booking
- [ ] Care receiver can view upcoming bookings and calendar
- [ ] Care receiver can cancel booking per cancellation policy
- [ ] Care receiver can leave review after booking completion
- [ ] Care receiver can report safeguarding concern

- [ ] Caregiver can register, upload verification documents (ID, DBS, qualifications)
- [ ] Caregiver can build profile (bio, photo, capabilities, hourly rate)
- [ ] Caregiver can set availability (recurring schedule, block dates)
- [ ] Caregiver can receive and respond to messages
- [ ] Caregiver can receive and accept/decline booking requests
- [ ] Caregiver can view upcoming bookings and calendar
- [ ] Caregiver can mark bookings in_progress and completed
- [ ] Caregiver can cancel booking with reason
- [ ] Caregiver can report falls/injuries during booking
- [ ] Caregiver can press emergency button during booking
- [ ] Caregiver can set up Stripe Connect account and receive payouts

- [ ] Family member can register, link to care receiver, manage bookings on behalf

- [ ] Admin can log in and access admin dashboard
- [ ] Admin can verify caregiver documents (ID, DBS, qualifications, capabilities)
- [ ] Admin can review and investigate safeguarding reports
- [ ] Admin can suspend or ban users
- [ ] Admin can refer safeguarding concerns to SAB
- [ ] Admin can review low ratings and booking disputes
- [ ] Admin can hold or release payments for disputes
- [ ] Admin can view platform metrics

### Compliance Criteria:
- [ ] All gating decisions resolved (GD-01 through GD-10)
- [ ] DPIA completed and approved
- [ ] CQC registration approved (if GD-01 requires it)
- [ ] Terms of Service, Privacy Policy, Safeguarding Policy published
- [ ] GDPR consent captured at registration
- [ ] Audit trail logging all user and admin actions
- [ ] Data retention policy implemented
- [ ] Data subject rights interface implemented
- [ ] Safeguarding reporting and response system operational
- [ ] Emergency response system operational
- [ ] Payment Services Regulations compliance (Stripe integration)
- [ ] Cookie consent banner implemented (PECR compliance)
- [ ] Accessibility audit complete (WCAG 2.1 AA)

### Safeguarding Criteria:
- [ ] Only verified caregivers visible in search (DBS, identity verified)
- [ ] Caregiver capabilities verified by admin before matching
- [ ] Safeguarding reporting accessible from all pages
- [ ] Admin on-call for emergency response (24/7)
- [ ] Emergency contacts notified automatically during emergencies
- [ ] Off-platform payment attempts blocked (message filtering)
- [ ] Abuse keyword detection flagging messages for review
- [ ] SAB liaison procedures documented and tested
- [ ] User suspension/ban system operational
- [ ] Clinical incident reporting operational

### Technical Criteria:
- [ ] All systems tested end-to-end (unit tests, integration tests, user acceptance tests)
- [ ] Performance tested (load testing for expected traffic)
- [ ] Security tested (penetration testing, vulnerability scanning)
- [ ] Accessibility tested (keyboard navigation, screen reader)
- [ ] Mobile tested (iOS Safari, Android Chrome)
- [ ] Backup and disaster recovery tested
- [ ] Monitoring and alerting configured (uptime, errors, performance)
- [ ] Production environment stable (staging environment matches production)

---

## Post-MVP Roadmap (Phase 2)

**Features to implement after successful MVP launch**:

1. **Live-In Care Support** (if not included in MVP - see GD-06)
2. **Recurring Bookings** (automated rebooking for regular care)
3. **Advanced Analytics** (user behavior, cohort analysis, A/B testing)
4. **SMS Notifications** (booking reminders, emergency alerts)
5. **Push Notifications** (mobile app - Phase 3)
6. **Intelligent Matching Algorithm** (AI-based caregiver recommendations)
7. **Caregiver Reviews** (caregivers can review care receivers privately)
8. **Message Templates** (caregivers can save and reuse common messages)
9. **Automated Behavioral Monitoring** (pattern detection for safeguarding concerns)
10. **Proactive Clinical Monitoring** (medication tracking, welfare check-ins)
11. **Content Marketing & SEO** (blog, educational resources)
12. **Insurance Verification** (admin verifies caregiver insurance certificates)
13. **Professional Reference Checks** (enhanced due diligence for caregivers)
14. **24/7 Safeguarding Hotline** (dedicated phone line for urgent concerns)
15. **Multi-Factor Authentication** (enhanced security for admin users)

---

## Summary: Build Timeline

| Slice | Timeline | Goal | Key Deliverables | Gating Decisions |
|-------|----------|------|------------------|------------------|
| Pre-Dev | Weeks 1-4 | Legal & Compliance Foundations | DPIA, CQC opinion, legal documents, Stripe setup | GD-01, GD-02, GD-04 |
| Slice 1 | Weeks 1-2 | User Registration & Authentication | User registration, login, RBAC, website | GD-02 |
| Slice 2 | Weeks 3-4 | Verification & Identity Checks | Caregiver verification workflow, admin dashboard | GD-08 |
| Slice 3 | Weeks 5-6 | Profiles & Matching Setup | Caregiver capabilities, care needs, family accounts | GD-04, GD-05 |
| Slice 4 | Weeks 7-8 | Discovery & Search | Location search, filters, caregiver profiles | GD-10 |
| Slice 5 | Weeks 9-10 | Messaging & Communication | In-app messaging, content filtering, reporting | None |
| Slice 6 | Weeks 11-13 | Booking System | Booking lifecycle, calendar, cancellations | None |
| Slice 7 | Weeks 14-16 | Payment System & Escrow | Stripe integration, payments, payouts, refunds | None |
| Slice 8 | Weeks 17-18 | Reviews & Safeguarding Reporting | Reviews, ratings, safeguarding reports, SAB referral | GD-07 |
| Slice 9 | Weeks 19-20 | Clinical Safety & Emergency Response | Incident reporting, emergency button, 999 protocol | None |
| Slice 10 | Weeks 21-22 | Compliance Finalization | GDPR rights, data retention, compliance docs | ALL (GD-01 to GD-10) |

**Total MVP Timeline**: 22 weeks (5.5 months) assuming no major blockers.

**Critical Path**: GD-01 (CQC Registration) - if required, add 3-6 months to timeline (CQC registration runs in parallel but must be approved before launch).

---

**Document Status**: Complete and ready for implementation
**Next Steps**:
1. Resolve all gating decisions (Weeks 1-4)
2. Begin Slice 1 development (Week 1)
3. Start caregiver recruitment (Week 5)
4. Weekly progress reviews with product and engineering teams
5. Launch readiness review at Week 20 (confirm all success criteria met)

---

**END OF DOCUMENT**
