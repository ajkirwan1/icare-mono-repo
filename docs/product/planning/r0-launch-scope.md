# R0 Launch-Critical Screen Subset

**Document Purpose**: Define the absolute minimum 20-30 screens required for a safe, compliant, revenue-generating launch at low volume.

**Document Owner**: Product Team
**Last Updated**: 2026-01-31
**Status**: Canonical - R0 Launch Definition

---

## R0 Selection Criteria

A screen is R0 launch-critical if it meets **ALL** of these conditions:
1. **Safeguarding**: Required to protect vulnerable adults from immediate harm
2. **Regulatory Compliance**: Required by law (Care Act 2014, GDPR, DBS, CQC readiness)
3. **Core Economic Loop**: Essential for Discovery → Booking → Payment → Care → Review
4. **Cannot Be Manually Handled**: At any volume, this screen is required (vs. admin workaround)

**R0 Philosophy**: Ruthlessly minimal. Any screen that can be replaced with manual admin action, email, or phone call is excluded from R0.

---

## R0 Launch Screens (28 screens)

### Authentication & Registration (6 screens) - REQUIRED FOR ALL USERS

#### SCR-AUTH-001: Care Receiver Registration
**Route**: `/register/care-receiver`
**Why R0**: Core economic loop - demand side cannot exist without this
**Without This**: No care receivers can register. Platform non-functional.
**Manual Alternative**: NONE - registration must be self-service

#### SCR-AUTH-002: Family Member Registration
**Route**: `/register/family`
**Why R0**: Safeguarding - family oversight is critical for vulnerable adults
**Without This**: Cognitively impaired users have no proxy management
**Manual Alternative**: NONE - proxy users are essential for dementia care

#### SCR-AUTH-003: Caregiver Registration
**Route**: `/register/caregiver`
**Why R0**: Core economic loop - supply side cannot exist without this
**Without This**: No caregivers can register. Platform non-functional.
**Manual Alternative**: NONE - registration must be self-service

#### SCR-AUTH-004: Phone Verification
**Route**: `/verify/phone`
**Why R0**: Safeguarding - identity verification prevents fraud
**Without This**: Fake accounts access vulnerable adults
**Manual Alternative**: NONE - automated verification required at scale

#### SCR-AUTH-005: Login
**Route**: `/login`
**Why R0**: Core economic loop - users must authenticate
**Without This**: No access to platform features
**Manual Alternative**: NONE - authentication must be self-service

#### SCR-AUTH-006: Password Reset Request
**Route**: `/forgot-password`
**Why R0**: Operational viability - elderly users forget passwords frequently
**Without This**: Support overwhelmed with password reset requests
**Manual Alternative**: Could do manually BUT high volume makes this R0

---

### Public/Compliance Pages (4 screens) - LEGALLY REQUIRED

#### SCR-PUB-006: Terms of Service
**Route**: `/terms`
**Why R0**: Regulatory compliance - Consumer Rights Act requires clear terms
**Without This**: Legally required to display terms before booking
**Manual Alternative**: NONE - legal requirement

#### SCR-PUB-007: Privacy Policy
**Route**: `/privacy`
**Why R0**: Regulatory compliance - GDPR requires privacy policy publication
**Without This**: GDPR breach, ICO enforcement action
**Manual Alternative**: NONE - legal requirement

#### SCR-PUB-008: Safeguarding Policy
**Route**: `/safeguarding-policy`
**Why R0**: Regulatory compliance - Care Act 2014 requires safeguarding policy publication
**Without This**: Care Act breach, cannot demonstrate safeguarding commitment
**Manual Alternative**: NONE - legal requirement

#### SCR-PUB-001: Homepage
**Route**: `/`
**Why R0**: Core economic loop - entry point for all users
**Without This**: No way to explain platform or drive registration
**Manual Alternative**: NONE - user acquisition depends on this

---

### Discovery & Booking (4 screens) - CORE ECONOMIC LOOP

#### SCR-CR-003: Caregiver Search
**Route**: `/search`
**Why R0**: Core economic loop - discovery is step 1
**Without This**: Care receivers cannot find caregivers
**Manual Alternative**: NONE - manual matching doesn't scale beyond 10 users

#### SCR-CR-005: Caregiver Profile (Public View)
**Route**: `/caregivers/:caregiverId`
**Why R0**: Core economic loop - care receivers assess caregiver suitability
**Without This**: No way to evaluate caregiver qualifications and experience
**Manual Alternative**: NONE - profile is core trust mechanism

#### SCR-CR-006: Booking Request Form
**Route**: `/bookings/new/:caregiverId`
**Why R0**: Core economic loop - booking is the transaction
**Without This**: No way to request care services
**Manual Alternative**: NONE - booking automation is core value proposition

#### SCR-CR-008: Booking Detail
**Route**: `/bookings/:bookingId`
**Why R0**: Core economic loop - users manage bookings here
**Without This**: No way to view booking status, emergency contacts, or confirm completion
**Manual Alternative**: NONE - booking management must be self-service

---

### Payments (2 screens) - REVENUE CRITICAL

#### SCR-CR-013: Payment Methods
**Route**: `/settings/payment`
**Why R0**: Core economic loop - care receivers must add payment method
**Without This**: Cannot capture payments
**Manual Alternative**: NONE - payment setup must be automated

#### SCR-CG-020: Payout Setup (Stripe Connect)
**Route**: `/caregiver/earnings/setup`
**Why R0**: Core economic loop - caregivers must receive payouts
**Without This**: Caregivers cannot be paid, supply side collapses
**Manual Alternative**: NONE - Stripe Connect onboarding must be automated

---

### Caregiver Onboarding & Verification (6 screens) - SAFEGUARDING CRITICAL

#### SCR-CG-002: Caregiver Onboarding
**Route**: `/caregiver/onboarding`
**Why R0**: Safeguarding - guides caregivers through verification requirements
**Without This**: Caregivers don't know what documents to submit
**Manual Alternative**: NONE - verification workflow must be guided

#### SCR-CG-004: Medical Condition Experience
**Route**: `/caregiver/profile/conditions`
**Why R0**: Safeguarding - condition-specific matching prevents dangerous mismatches
**Without This**: Parkinson's patient matched with caregiver with no neurological experience
**Manual Alternative**: NONE - matching depends on this data

#### SCR-CG-005: Care Skills Profile
**Route**: `/caregiver/profile/skills`
**Why R0**: Safeguarding - skill-based matching prevents harm (e.g., hoisting without training)
**Without This**: Care receivers request skills caregiver cannot safely provide
**Manual Alternative**: NONE - matching depends on this data

#### SCR-CG-008: Identity Verification (Caregiver)
**Route**: `/caregiver/verify/identity`
**Why R0**: Safeguarding - know who has access to vulnerable adults
**Without This**: Unknown individuals access vulnerable adults' homes
**Manual Alternative**: NONE - identity verification is legal requirement

#### SCR-CG-009: Right to Work Verification
**Route**: `/caregiver/verify/right-to-work`
**Why R0**: Regulatory compliance - Immigration Act requires right to work verification
**Without This**: Platform facilitates illegal working (£20k fine per violation)
**Manual Alternative**: NONE - legal requirement

#### SCR-CG-010: DBS Check Submission
**Route**: `/caregiver/verify/dbs`
**Why R0**: Safeguarding - DBS checks are non-negotiable for vulnerable adult access
**Without This**: Criminals and barred individuals access vulnerable adults
**Manual Alternative**: NONE - legal and safeguarding requirement

---

### Admin Verification & Safeguarding (6 screens) - CANNOT LAUNCH WITHOUT

#### SCR-ADM-001: Admin Dashboard
**Route**: `/admin`
**Why R0**: Operational viability - admin needs overview of pending tasks
**Without This**: Admin cannot prioritize verification and safeguarding tasks
**Manual Alternative**: NONE - task management requires dashboard

#### SCR-ADM-005: Caregiver Application Review
**Route**: `/admin/applications/:applicationId`
**Why R0**: Safeguarding - admin must review caregiver documents before allowing profile visibility
**Without This**: Unverified caregivers visible to vulnerable adults
**Manual Alternative**: NONE - verification workflow is safeguarding requirement

#### SCR-ADM-007: Verification Review
**Route**: `/admin/verifications/:verificationId`
**Why R0**: Safeguarding - admin verifies identity, qualifications, skills
**Without This**: Fraudulent qualifications not detected
**Manual Alternative**: NONE - verification is core safeguarding control

#### SCR-ADM-008: DBS Review
**Route**: `/admin/verifications/dbs/:verificationId`
**Why R0**: Safeguarding - admin verifies DBS certificate authenticity
**Without This**: Fake DBS certificates not detected, barred individuals access vulnerable adults
**Manual Alternative**: NONE - DBS verification is safeguarding requirement

#### SCR-ADM-014: Safeguarding Reports Queue
**Route**: `/admin/safeguarding`
**Why R0**: Regulatory compliance - Care Act 2014 requires safeguarding response
**Without This**: Safeguarding concerns not triaged or responded to
**Manual Alternative**: Could use email BUT Care Act requires documented workflow

#### SCR-ADM-015: Safeguarding Report Detail
**Route**: `/admin/safeguarding/:reportId`
**Why R0**: Regulatory compliance - Care Act 2014 requires investigation and documentation
**Without This**: Safeguarding incidents not investigated properly
**Manual Alternative**: Could use email/spreadsheet BUT audit trail required by law

---

## Screens Excluded from R0 (But MVP)

These screens are MVP but can be handled manually or via workarounds at low volume (0-100 bookings/month):

### Can Be Email/Phone at Low Volume
- **SCR-CR-011: Message Inbox** - Use email for messaging at low volume
- **SCR-CR-012: Message Thread** - Email threads work for R0
- **SCR-CR-015: Leave Review** - Email form submission works for R0
- **SCR-CR-020: Safeguarding Report** - Email/phone reporting works initially
- **SCR-CG-011: Availability Calendar** - Manual coordination via email for R0

### Admin Can Handle Manually
- **SCR-CR-009: Booking Cancellation** - Admin processes cancellations manually
- **SCR-ADM-010: Booking Management** - Spreadsheet works at low volume
- **SCR-ADM-012: Dispute Queue** - Manual dispute tracking in R0
- **SCR-ADM-019: Incident Reports** - Manual logging initially

### Profile Management (Post-First-Booking)
- **SCR-CR-002: Care Needs Profile** - Captured in booking form, separate profile not critical for R0
- **SCR-CR-017: Account Settings** - Support handles setting changes in R0
- **SCR-CG-003: Profile Management** - Initial profile sufficient, edits via support

### Dashboards (Nice-to-Have)
- **SCR-CR-001: Care Receiver Dashboard** - Users can navigate directly to booking list
- **SCR-CG-001: Caregiver Dashboard** - Notifications via email work for R0

---

## R0 User Journeys (End-to-End)

### Journey 1: Care Receiver Registration to First Booking
1. SCR-PUB-001: Homepage → Click "Find Care"
2. SCR-AUTH-001: Care Receiver Registration → Submit form
3. SCR-AUTH-004: Phone Verification → Verify SMS code
4. SCR-CR-003: Caregiver Search → Enter postcode, search
5. SCR-CR-005: Caregiver Profile → Review qualifications, DBS status
6. SCR-CR-006: Booking Request Form → Select date, specify care needs, submit
7. SCR-CR-013: Payment Methods → Add payment card (if not already done)
8. SCR-CR-008: Booking Detail → View pending request status
9. (Caregiver accepts via SCR-CG-013)
10. SCR-CR-008: Booking Detail → View accepted booking, emergency contact shared

**Screens Used**: 8 unique screens (6 care receiver, 2 public)

---

### Journey 2: Caregiver Registration to First Booking Acceptance
1. SCR-PUB-001: Homepage → Click "Become a Caregiver"
2. SCR-AUTH-003: Caregiver Registration → Submit form
3. SCR-AUTH-004: Phone Verification → Verify SMS code
4. SCR-CG-002: Caregiver Onboarding → Guided profile setup
5. SCR-CG-004: Medical Condition Experience → Select conditions with experience
6. SCR-CG-005: Care Skills Profile → Select care skills
7. SCR-CG-008: Identity Verification → Upload photo ID
8. SCR-CG-009: Right to Work Verification → Enter UKVI share code (or upload passport)
9. SCR-CG-010: DBS Check Submission → Upload DBS certificate
10. (Admin reviews via SCR-ADM-005, SCR-ADM-007, SCR-ADM-008)
11. (Caregiver profile goes live)
12. SCR-CG-013: Booking Request Detail → Review and accept first booking
13. SCR-CG-020: Payout Setup → Complete Stripe Connect onboarding

**Screens Used**: 10 unique screens (8 caregiver, 1 public, 1 admin review)

---

### Journey 3: Admin Verification Workflow
1. SCR-AUTH-005: Login (admin account with 2FA)
2. SCR-ADM-001: Admin Dashboard → View pending caregiver applications (count: 5)
3. SCR-ADM-005: Caregiver Application Review → Review application #1
4. SCR-ADM-007: Verification Review → Verify identity documents
5. SCR-ADM-008: DBS Review → Verify DBS certificate (check cert number, date, level)
6. SCR-ADM-007: Verification Review → Verify qualifications (NVQ certificate)
7. SCR-ADM-005: Caregiver Application Review → Approve application
8. (Repeat for next application)

**Screens Used**: 5 unique screens (all admin)

---

### Journey 4: Safeguarding Incident Response
1. (User reports concern via email/phone in R0 - no self-service screen yet)
2. SCR-AUTH-005: Login (admin account)
3. SCR-ADM-001: Admin Dashboard → Safeguarding alert (red badge)
4. SCR-ADM-014: Safeguarding Reports Queue → View new report
5. SCR-ADM-015: Safeguarding Report Detail → Investigate concern, contact reporter, document actions
6. (If escalation needed, admin contacts SAB via phone/email - external system)
7. SCR-ADM-015: Safeguarding Report Detail → Close report with outcome

**Screens Used**: 4 unique screens (1 auth, 3 admin)

---

## What Happens If R0 Screens Are Missing?

### Missing SCR-CG-010 (DBS Check Submission)
**Impact**: No way to verify DBS checks
**Consequence**: Safeguarding failure. Criminals access vulnerable adults. Cannot launch legally.
**Manual Workaround**: NONE - DBS verification is non-negotiable

### Missing SCR-CR-006 (Booking Request Form)
**Impact**: No way to create bookings
**Consequence**: Core economic loop broken. Platform non-functional.
**Manual Workaround**: Could take bookings via phone/email, but defeats platform purpose

### Missing SCR-ADM-015 (Safeguarding Report Detail)
**Impact**: No way to investigate safeguarding concerns
**Consequence**: Care Act 2014 breach. No audit trail of safeguarding actions.
**Manual Workaround**: Could use spreadsheet, but Care Act requires documented workflow

### Missing SCR-PUB-007 (Privacy Policy)
**Impact**: GDPR requirement not met
**Consequence**: ICO enforcement action. GDPR breach.
**Manual Workaround**: NONE - legal requirement to publish

### Missing SCR-CG-004 (Medical Condition Experience)
**Impact**: No condition-specific matching
**Consequence**: Parkinson's patient matched with caregiver with no neurological experience. Safeguarding failure.
**Manual Workaround**: NONE - matching is core safety mechanism

---

## R0 Launch Volume Assumptions

**R0 is designed for**:
- 10-50 care receivers
- 20-100 caregivers
- 5-50 bookings per month
- 1-2 admin team members
- Manual processes acceptable for low-frequency actions (disputes, account settings, advanced features)

**R0 is NOT designed for**:
- Scaling beyond 100 bookings/month (messaging, dashboards become critical)
- Self-service support (support handles most account management)
- Complex features (recurring bookings, live-in care, analytics)

---

## Post-R0 Immediate Priorities (Screens 29-40)

Once R0 is stable and user feedback validates core flows, add:

1. **SCR-CR-011 + SCR-CR-012**: Messaging (in-app communication scales better than email)
2. **SCR-CR-015**: Leave Review (close feedback loop for quality monitoring)
3. **SCR-CG-011**: Availability Calendar (manual scheduling doesn't scale)
4. **SCR-CR-001**: Care Receiver Dashboard (UX improvement for repeat users)
5. **SCR-CG-001**: Caregiver Dashboard (UX improvement for active caregivers)
6. **SCR-ADM-010**: Booking Management (admin needs booking oversight at scale)
7. **SCR-CR-020**: Safeguarding Report (self-service reporting required at scale)
8. **SCR-ADM-019**: Incident Reports (clinical incident tracking required for CQC)
9. **SCR-CR-009**: Booking Cancellation (self-service cancellation required at scale)
10. **SCR-ADM-023**: Audit Log (compliance requirement for CQC/GDPR audit)

---

## R0 Screen Dependency Map

```
Authentication Layer (Foundation)
├── SCR-AUTH-001: Care Receiver Registration
├── SCR-AUTH-002: Family Member Registration
├── SCR-AUTH-003: Caregiver Registration
├── SCR-AUTH-004: Phone Verification
├── SCR-AUTH-005: Login
└── SCR-AUTH-006: Password Reset

Public/Compliance Layer (Legal Foundation)
├── SCR-PUB-001: Homepage
├── SCR-PUB-006: Terms of Service
├── SCR-PUB-007: Privacy Policy
└── SCR-PUB-008: Safeguarding Policy

Caregiver Verification Layer (Safeguarding Foundation)
├── SCR-CG-002: Caregiver Onboarding
├── SCR-CG-004: Medical Condition Experience
├── SCR-CG-005: Care Skills Profile
├── SCR-CG-008: Identity Verification
├── SCR-CG-009: Right to Work Verification
└── SCR-CG-010: DBS Check Submission

Admin Verification Layer (Trust Foundation)
├── SCR-ADM-001: Admin Dashboard
├── SCR-ADM-005: Caregiver Application Review
├── SCR-ADM-007: Verification Review
└── SCR-ADM-008: DBS Review

Core Transaction Layer (Economic Loop)
├── SCR-CR-003: Caregiver Search
├── SCR-CR-005: Caregiver Profile
├── SCR-CR-006: Booking Request Form
├── SCR-CR-008: Booking Detail
├── SCR-CR-013: Payment Methods
└── SCR-CG-020: Payout Setup

Safeguarding Response Layer (Care Act Compliance)
├── SCR-ADM-014: Safeguarding Reports Queue
└── SCR-ADM-015: Safeguarding Report Detail
```

---

## R0 Engineering Build Order

**Phase 1: Authentication Foundation (Week 1-2)**
1. SCR-AUTH-001, SCR-AUTH-002, SCR-AUTH-003 (user registration)
2. SCR-AUTH-004 (phone verification with Twilio)
3. SCR-AUTH-005 (login + session management)
4. SCR-AUTH-006 (password reset)

**Phase 2: Public Pages & Compliance (Week 2)**
5. SCR-PUB-001 (homepage)
6. SCR-PUB-006, SCR-PUB-007, SCR-PUB-008 (legal pages)

**Phase 3: Caregiver Onboarding (Week 3-4)**
7. SCR-CG-002 (onboarding wizard)
8. SCR-CG-004, SCR-CG-005 (profile data capture)
9. SCR-CG-008, SCR-CG-009, SCR-CG-010 (verification document uploads)

**Phase 4: Admin Verification (Week 4-5)**
10. SCR-ADM-001 (admin dashboard)
11. SCR-ADM-005, SCR-ADM-007, SCR-ADM-008 (verification workflows)

**Phase 5: Discovery & Booking (Week 5-6)**
12. SCR-CR-003 (search with filters)
13. SCR-CR-005 (caregiver profile display)
14. SCR-CR-006 (booking request form)
15. SCR-CR-008 (booking detail + status management)

**Phase 6: Payments (Week 6-7)**
16. SCR-CR-013 (Stripe payment method setup)
17. SCR-CG-020 (Stripe Connect onboarding)
18. Payment capture + escrow logic (backend)

**Phase 7: Safeguarding (Week 7-8)**
19. SCR-ADM-014, SCR-ADM-015 (safeguarding incident workflow)
20. Admin safeguarding training and procedures

**Total R0 Build Time**: 8 weeks (assumes 2 engineers, backend + frontend)

---

## R0 Success Metrics

**R0 is successful if**:
1. **Safeguarding**: Zero safeguarding incidents due to platform failures (verification gaps, matching errors)
2. **Compliance**: Zero regulatory violations (GDPR, Care Act, DBS)
3. **Economic Loop**: 80%+ caregiver acceptance rate for booking requests
4. **Trust**: 90%+ care receivers satisfied with caregiver verification transparency
5. **Operations**: Admin can verify caregivers and handle safeguarding incidents within SLA (24 hours)

**R0 fails if**:
1. Unverified caregiver accesses vulnerable adult (verification workflow breach)
2. Safeguarding concern not responded to within 24 hours (Care Act breach)
3. Payment failures prevent booking completion (revenue loss)
4. Manual processes overwhelm admin team (not scalable to 100 bookings/month)

---

## Document Maintenance

**Review Triggers**:
- User feedback identifies missing critical screen
- Regulatory change requires new screen (e.g., CQC registration adds screens)
- Manual process breaks down at low volume (needs automation earlier than expected)

**Ownership**: Product Manager reviews R0 definition before any new screen added to R0 scope

---

**END OF DOCUMENT**
