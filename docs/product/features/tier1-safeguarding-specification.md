# Tier 1 Safeguarding and Incident Management Specification

**Document Purpose**: Comprehensive feature specification for the Tier 1 safeguarding and incident management system for the UK elderly care marketplace.

**Document Owner**: Product Manager
**Created**: 2026-02-06
**Status**: ACTIVE - Tier 1 Launch Specification
**Tier**: Tier 1 (Companionship MVP)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Safeguarding Principles](#2-safeguarding-principles)
3. [User Stories](#3-user-stories)
4. [Incident Types and Categories](#4-incident-types-and-categories)
5. [Reporting Mechanisms](#5-reporting-mechanisms)
6. [Incident Workflow](#6-incident-workflow)
7. [Escalation Procedures](#7-escalation-procedures)
8. [Response SLAs](#8-response-slas)
9. [Safeguarding Lead Role](#9-safeguarding-lead-role)
10. [Documentation Requirements](#10-documentation-requirements)
11. [External Liaison](#11-external-liaison)
12. [Training Requirements](#12-training-requirements)
13. [Data Protection](#13-data-protection)
14. [Edge Cases](#14-edge-cases)
15. [Acceptance Criteria](#15-acceptance-criteria)
16. [Out of Scope](#16-out-of-scope)

---

## 1. Overview

### 1.1 Purpose

The Tier 1 safeguarding and incident management system provides the platform with comprehensive tools to protect vulnerable adults using companionship services. The system enables users to report concerns, admins to investigate incidents, and the platform to fulfill its Care Act 2014 safeguarding duties.

### 1.2 Regulatory Context

**Care Act 2014 Compliance**:
- Section 42: Duty to make safeguarding enquiries when adults at risk are experiencing abuse or neglect
- Section 43: Safeguarding Adults Boards (SABs) - duty to cooperate and share information
- Section 44: Safeguarding Adults Reviews (SARs) - duty to participate if serious case

**Introduction Agency Model** (FDR-002):
- Platform is NOT CQC-registered (not a care provider)
- Platform has safeguarding duties as marketplace serving vulnerable adults
- Caregivers are self-employed (not platform employees)
- Platform provides safeguarding infrastructure and reporting tools

**Data Protection**:
- Safeguarding data is special category data (GDPR Article 9)
- Lawful basis: Vital interests (Article 9(2)(c)), legal obligation (Article 9(2)(b))
- GDPR safeguarding exemption for information sharing with authorities (DPA 2018, Schedule 2)

### 1.3 Tier 1 Scope

**Services at Tier 1**: Companionship only (no personal care, no medical services)

**Safeguarding Capabilities**:
- User-facing incident reporting (in-app, email, phone)
- Admin incident triage and investigation workflows
- External escalation to Safeguarding Adults Boards and police
- Incident documentation and audit trails
- User suspension and banning tools
- Safeguarding case management

**Tier 1 Constraints**:
- No medical incident reporting (deferred to Tier 3)
- No clinical governance workflows (deferred to Tier 4)
- No care plan-related incidents (deferred to Tier 4)
- No DoLS violation reporting (deferred to Tier 3 when live-in care introduced)

### 1.4 Strategic Goals

**Primary Objectives**:
- Protect vulnerable adults from abuse, neglect, and harm
- Fulfill Care Act 2014 safeguarding duties
- Build trust with care receivers and families through responsive safeguarding
- Maintain platform reputation as safe marketplace
- Enable rapid incident response (<2 hours for urgent incidents)

**Success Metrics**:
- 100% of urgent incidents acknowledged within 2 hours
- 100% of Section 42 qualifying incidents escalated to SAB within 24 hours
- Zero serious safeguarding incidents resulting in harm due to delayed response
- <5% of incidents unresolved after 28 days

---

## 2. Safeguarding Principles

### 2.1 Six Safeguarding Principles (Care Act 2014)

The platform's safeguarding approach is guided by the six principles from Care Act 2014 Statutory Guidance:

**1. Empowerment**: People supported to make their own decisions with informed consent
- Care receivers choose their own caregivers
- We provide information about caregiver verification status
- We respect care receiver autonomy in reporting decisions

**2. Prevention**: Acting before harm occurs
- Identity verification and right to work checks for all caregivers
- Voluntary DBS verification (trust signal)
- Message monitoring for safeguarding keywords
- Profile moderation to prevent inappropriate content
- Caregiver safeguarding training (awareness of abuse types)

**3. Proportionality**: Least intrusive response appropriate to the risk
- Incident severity triage determines response level
- Minor concerns: warning or guidance
- Serious concerns: suspension and investigation
- Critical concerns: immediate escalation to authorities
- Balance safeguarding with individual freedom and choice

**4. Protection**: Support and representation for those in greatest need
- 24/7 safeguarding reporting channels
- Urgent incident response (<2 hours)
- Immediate user suspension when risk identified
- External escalation to SAB or police when appropriate
- Support referrals to victim services

**5. Partnership**: Local solutions through services working together
- Cooperation with 150+ local authority Safeguarding Adults Boards
- Information sharing with police and social services
- Family involvement in investigations (where appropriate)
- Collaboration with external safeguarding professionals

**6. Accountability**: Transparency in safeguarding practice
- All incidents documented with audit trails
- Incident outcomes tracked and reviewed
- Annual safeguarding reporting to SABs (if requested)
- Learning from incidents to improve policies
- Transparency about safeguarding process in published policy

### 2.2 Platform Safeguarding Duties

**What We Do**:
- Verify caregiver identity and right to work
- Provide safeguarding reporting tools (in-app, email, phone)
- Monitor messages for safeguarding keywords (abuse, harm, off-platform payments)
- Investigate safeguarding reports within documented SLAs
- Escalate qualifying incidents to Safeguarding Adults Boards
- Suspend or ban users when risk identified
- Maintain audit trails of all safeguarding actions
- Train staff on safeguarding recognition and response
- Cooperate with SAB and police investigations
- Provide support referrals to care receivers at risk

**What We Don't Do**:
- Provide care services (caregivers are self-employed)
- Supervise care delivery or control caregiver methods
- Conduct formal care assessments or risk assessments
- Perform clinical investigations or medical assessments
- Replace statutory safeguarding duties of local authorities
- Guarantee safety or prevent all abuse (we mitigate risk, not eliminate it)

### 2.3 Safeguarding vs. Customer Service

**Safeguarding Incidents** (escalate to Safeguarding Officer):
- Suspected abuse (physical, emotional, sexual, financial, neglect)
- Care receiver at risk of harm
- Vulnerable adult unable to protect themselves
- Criminal activity (assault, theft, fraud)
- Caregiver no-show leaving care receiver at risk
- Off-platform payments or financial exploitation
- Inappropriate conduct suggesting abuse

**Customer Service Issues** (handled by Operations Manager):
- Booking disputes (service quality, lateness)
- Refund requests
- Technical support
- General inquiries
- Caregiver no-show with alternative care arrangements (not abandonment)
- Profile questions or verification status inquiries

**When in Doubt**: Escalate to Safeguarding Officer. It's better to over-escalate than miss a serious concern.

---

## 3. User Stories

### 3.1 Reporting Safeguarding Concerns

**US-SAFE-REPORT-01: Care Receiver Reports Safeguarding Concern**
- **As a** care receiver
- **I want to** report a safeguarding concern about my caregiver quickly and confidentially
- **So that** I am protected from harm and the platform can investigate

**Acceptance Criteria**:
- [ ] "Report Safeguarding Concern" button visible on caregiver profile, booking page, and main menu
- [ ] Form captures: incident type, description, date/time, severity (urgent/non-urgent), evidence uploads
- [ ] Urgent incidents trigger immediate alert to on-call Safeguarding Officer (email + SMS)
- [ ] Confirmation message displays: acknowledgment, case reference number, response timeline, emergency contacts (999)
- [ ] Reporter notified via email within 24 hours (urgent) or 48 hours (non-urgent)
- [ ] Reporter identity kept confidential (not shared with reported caregiver unless legally required)

---

**US-SAFE-REPORT-02: Caregiver Reports Safeguarding Concern**
- **As a** caregiver
- **I want to** report safeguarding concerns about a care receiver (self-neglect, family abuse, unsafe environment)
- **So that** the care receiver receives appropriate support

**Acceptance Criteria**:
- [ ] "Report Safeguarding Concern" button visible on care receiver profile and booking page
- [ ] Form captures: incident type, description, date/time, care receiver's condition, evidence
- [ ] Guidance text: "If immediate danger, call 999 first, then report here"
- [ ] Urgent incidents trigger alert to Safeguarding Officer
- [ ] Confirmation message displays case reference number and response timeline
- [ ] Caregiver protected from retaliation (whistleblowing protection)

---

**US-SAFE-REPORT-03: Family Member Reports Concern**
- **As a** family member
- **I want to** report concerns about my elderly relative's caregiver
- **So that** my relative is protected from abuse or neglect

**Acceptance Criteria**:
- [ ] "Report Safeguarding Concern" link in footer (public access)
- [ ] Form accessible without login (public safeguarding reporting)
- [ ] Form captures: care receiver name, caregiver name (if known), concern description, contact details
- [ ] Urgent concerns flagged and triaged within 2 hours
- [ ] Reporter contacted by Safeguarding Officer within 24 hours for urgent, 48 hours for non-urgent

---

**US-SAFE-REPORT-04: Emergency Reporting (Immediate Danger)**
- **As a** user
- **I want to** know what to do if there is immediate danger
- **So that** I can get emergency help quickly

**Acceptance Criteria**:
- [ ] All safeguarding forms display emergency guidance: "If immediate danger, call 999 (Police/Ambulance)"
- [ ] Emergency contact numbers visible: 999 (emergency), platform safeguarding hotline (24/7)
- [ ] Guidance text explains when to call 999 vs. when to use platform reporting
- [ ] Platform reporting form includes "This is an emergency" checkbox triggering immediate alert

---

### 3.2 Admin Incident Management

**US-SAFE-ADMIN-01: View Safeguarding Incident Queue**
- **As a** Safeguarding Officer
- **I want to** see all pending safeguarding incidents prioritized by urgency
- **So that** I can respond to critical incidents within 2 hours

**Acceptance Criteria**:
- [ ] Safeguarding dashboard displays incident queue sorted by urgency and age
- [ ] Urgent incidents (red flag) appear at top
- [ ] SLA breaches highlighted (>2h for urgent, >48h for non-urgent)
- [ ] Queue columns: case ID, reporter, reported user, incident type, severity, age, status
- [ ] Click incident to open investigation interface
- [ ] Filter by: status (open/investigating/resolved), urgency, incident type, date range

---

**US-SAFE-ADMIN-02: Triage Safeguarding Incident**
- **As a** Safeguarding Officer
- **I want to** perform initial triage of a safeguarding report
- **So that** I can determine appropriate response level

**Acceptance Criteria**:
- [ ] Incident detail view displays: reporter details, reported user, incident description, evidence uploads
- [ ] Reported user's full history visible: bookings, messages, previous reports, verification status
- [ ] Triage checklist: Is there immediate danger? Are Section 42 criteria met? Is police notification required?
- [ ] Severity classification: Low (guidance), Medium (investigation), High (suspension + investigation), Critical (emergency escalation)
- [ ] Decision options: Dismiss (not safeguarding), Investigate, Suspend user immediately, Escalate to SAB, Escalate to police
- [ ] Triage decision logged with rationale (minimum 50 characters)
- [ ] Automated notifications based on decision (reporter acknowledgment, user suspension email, etc.)

---

**US-SAFE-ADMIN-03: Investigate Safeguarding Incident**
- **As a** Safeguarding Officer
- **I want to** conduct a thorough investigation of a safeguarding incident
- **So that** I can determine whether abuse or neglect occurred

**Acceptance Criteria**:
- [ ] Investigation interface displays all evidence: messages, booking history, uploaded documents, reporter statement
- [ ] Timeline view shows sequence of events
- [ ] Interview notes section: Record interviews with reporter, reported user, witnesses
- [ ] Evidence upload section: Add photos, documents, screenshots during investigation
- [ ] Witness contact section: Record external parties contacted (family, SAB, police)
- [ ] Assessment fields: Was abuse/neglect substantiated? Risk level to care receiver? Section 42 criteria met?
- [ ] Investigation status tracking: Open → Investigating → Awaiting external input → Resolved
- [ ] Investigation notes saved automatically with timestamps

---

**US-SAFE-ADMIN-04: Suspend or Ban User Immediately**
- **As a** Safeguarding Officer
- **I want to** suspend or ban users immediately when risk identified
- **So that** vulnerable adults are protected while investigation proceeds

**Acceptance Criteria**:
- [ ] "Suspend User" button on incident detail page
- [ ] Suspension options: Temporary (7/14/30 days), Pending investigation (indefinite), Permanent ban
- [ ] Suspension reason selection: Safeguarding concern, Policy violation, Investigation required
- [ ] Rationale text field (required, minimum 100 characters for bans)
- [ ] Immediate account lockout (user cannot log in)
- [ ] Active bookings cancelled automatically with refunds processed
- [ ] User notified via email with suspension reason, duration, appeal process
- [ ] Ban evasion prevention: Email, phone, IP address flagged to prevent re-registration
- [ ] Suspension logged in audit trail with admin name and timestamp

---

**US-SAFE-ADMIN-05: Escalate to Safeguarding Adults Board**
- **As a** Safeguarding Officer
- **I want to** escalate qualifying incidents to local authority Safeguarding Adults Boards
- **So that** the platform fulfills Care Act 2014 Section 42 duties

**Acceptance Criteria**:
- [ ] "Escalate to SAB" button on incident detail page
- [ ] Section 42 criteria checklist: Adult has care needs? Experiencing abuse/neglect? Unable to protect self?
- [ ] Local authority SAB contact list (150+ UK local authorities) with contact details
- [ ] Postcode lookup automatically identifies relevant local authority
- [ ] Escalation form captures: SAB contacted, contact person, referral method (phone/email/online), reference number
- [ ] Referral summary auto-generated from incident details (care receiver name, DOB, address, nature of concern, evidence)
- [ ] Referral sent via email to SAB with PDF attachment
- [ ] Follow-up reminders scheduled: 7 days, 14 days, 28 days
- [ ] SAB outcome field: Enquiry opened, No action required, Ongoing, Resolved
- [ ] Escalation logged in audit trail

---

**US-SAFE-ADMIN-06: Escalate to Police**
- **As a** Safeguarding Officer
- **I want to** escalate criminal incidents to police
- **So that** criminal activity is reported and investigated

**Acceptance Criteria**:
- [ ] "Escalate to Police" button on incident detail page
- [ ] Crime type selection: Assault, Sexual assault, Theft, Fraud, Financial abuse, Other
- [ ] Emergency vs. non-emergency: 999 (immediate danger) or 101 (non-emergency)
- [ ] Police force selection (postcode lookup identifies local force)
- [ ] Police escalation form captures: Force contacted, crime reference number, contact officer, date/time reported
- [ ] Evidence package generated: Incident summary, message logs, booking history, uploaded documents
- [ ] Escalation logged in audit trail
- [ ] Follow-up reminders scheduled for police outcome

---

**US-SAFE-ADMIN-07: Resolve Safeguarding Incident**
- **As a** Safeguarding Officer
- **I want to** document incident resolution and outcome
- **So that** the platform learns from incidents and notifies reporters

**Acceptance Criteria**:
- [ ] "Resolve Incident" button on incident detail page
- [ ] Investigation outcome selection: Substantiated, Unsubstantiated, Inconclusive
- [ ] Actions taken checklist: User suspended, User banned, External escalation, Support referral provided, Policy updated
- [ ] Outcome rationale field (required, minimum 100 characters)
- [ ] Lessons learned field: What can platform improve? (optional)
- [ ] Reporter notification: Email sent with outcome summary (substantiated/unsubstantiated), actions taken (to extent allowable)
- [ ] Reported user notification: If unsubstantiated, user notified and account restored (if suspended)
- [ ] Case closure date and admin name logged
- [ ] Incident moved to "Resolved" queue with option to reopen if new evidence emerges

---

### 3.3 Support and Referrals

**US-SAFE-SUPPORT-01: Provide Support Referrals to Care Receivers**
- **As a** Safeguarding Officer
- **I want to** refer care receivers to external support services
- **So that** they receive appropriate professional support beyond what the platform can provide

**Acceptance Criteria**:
- [ ] Referral resources section on incident detail page
- [ ] Resource categories: Local authority adult social care, Independent advocacy, Victim support, Hourglass (abuse helpline), Age UK, Citizens Advice
- [ ] Postcode lookup identifies local services
- [ ] Contact details and referral pathways displayed
- [ ] "Send Resources to Care Receiver" button emails resource list to care receiver/family
- [ ] Referral logged in incident record
- [ ] Follow-up option: Schedule reminder to check if care receiver accessed support

---

## 4. Incident Types and Categories

### 4.1 Incident Type Taxonomy

**Primary Incident Types** (aligned with Care Act 2014 abuse categories):

| Incident Type | Definition | Examples | Severity Range |
|---------------|------------|----------|----------------|
| **Physical Abuse** | Hitting, slapping, pushing, rough handling, restraint | Caregiver shoves care receiver; unexplained bruises | Medium-Critical |
| **Emotional/Psychological Abuse** | Verbal abuse, threats, intimidation, humiliation, isolation | Caregiver shouts at care receiver; isolates from family | Low-High |
| **Sexual Abuse** | Non-consensual sexual contact, harassment, indecent exposure | Inappropriate touching; sexual comments | High-Critical |
| **Financial Abuse** | Theft, fraud, exploitation, pressure to change will | Caregiver steals cash; requests off-platform payments; takes care receiver's bank card | Medium-Critical |
| **Neglect** | Failure to provide care, abandonment, untreated medical needs | Caregiver no-show; care receiver left without food/medication | Medium-Critical |
| **Discriminatory Abuse** | Abuse based on protected characteristics (age, disability, race, religion, gender, sexuality) | Racist or ageist comments; denial of service | Low-High |
| **Domestic Abuse** | Abuse from family member (physical, emotional, financial, sexual, controlling) | Family member controls care receiver's finances; isolation | Medium-Critical |
| **Self-Neglect** | Care receiver neglects hygiene, nutrition, medical care, living conditions | Severe malnutrition; hoarding; refusal of care | Low-High |
| **Institutional Abuse** | Platform-level safeguarding failure or systemic issue | Platform fails to escalate serious incident; inadequate verification | High-Critical |
| **Modern Slavery** | Human trafficking, forced labor, domestic servitude | Caregiver forced to work excessive hours without pay (rare but must be recognized) | Critical |

**Secondary Incident Types** (platform-specific):

| Incident Type | Definition | Examples | Severity Range |
|---------------|------------|----------|----------------|
| **Off-Platform Payments** | Requests to pay outside platform (bypasses safeguards, potential tax evasion) | Caregiver asks for cash payment; proposes direct bank transfer | Medium |
| **Inappropriate Conduct** | Unprofessional behavior not rising to abuse (boundary violations) | Caregiver discusses personal problems excessively; overfamiliar behavior | Low-Medium |
| **Policy Violation** | Breach of platform Terms of Service | Caregiver offers services outside scope (medical advice); fake profile | Low-High |
| **Service Quality Dispute** | Poor service quality or caregiver no-show (not safeguarding unless risk created) | Caregiver late; poor cleaning; cancellation | Low |
| **False Report** | Malicious or fabricated safeguarding report | Care receiver falsely accuses caregiver to avoid payment | Medium |

### 4.2 Severity Classification

**Severity Level Definitions**:

| Severity | Definition | Response Time | Examples | Actions |
|----------|------------|---------------|----------|---------|
| **Critical** | Immediate danger to life or limb; serious crime | <2 hours | Sexual assault, physical assault causing injury, abandonment with immediate risk, suicidal care receiver | Immediate suspension, emergency services (999), SAB escalation within 24h |
| **High** | Significant risk of harm; abuse likely; vulnerable adult at risk | <4 hours | Financial theft >£100, neglect causing distress, pattern of emotional abuse, discriminatory abuse | Immediate suspension pending investigation, SAB escalation if Section 42 met |
| **Medium** | Moderate concern; requires investigation; may constitute abuse | <24 hours | Single instance of verbal abuse, off-platform payment request, self-neglect concerns, minor financial irregularity | Investigation within 7 days, possible suspension, possible SAB escalation |
| **Low** | Minor concern; policy violation; guidance needed | <48 hours | Boundary confusion, unprofessional conduct, service quality issue escalated to safeguarding | Guidance to user, warning, no suspension unless repeated |

**Severity Escalation Triggers**:
- Pattern of incidents (3+ low severity incidents → Medium)
- Care receiver is particularly vulnerable (dementia, isolation, limited capacity)
- Criminal activity suspected
- External reporter raises concerns (family, healthcare professional)

### 4.3 Section 42 Criteria (SAB Escalation)

**Care Act 2014 Section 42 requires SAB escalation if ALL THREE criteria met**:

1. **Adult has needs for care and support** (or appears to)
   - Elderly person using care services
   - Person with disability, illness, or frailty
   - Platform users generally meet this criterion

2. **Adult is experiencing, or at risk of, abuse or neglect**
   - One of the 10 abuse types identified
   - Harm has occurred or is likely to occur

3. **Adult is unable to protect themselves as a result of their care needs**
   - Lacks mental capacity to understand risk
   - Physically unable to remove themselves from situation
   - Socially isolated with no support network
   - Dependent on alleged perpetrator for care

**Platform Assessment**:
- Safeguarding Officer completes Section 42 checklist during triage
- If all three criteria met: Escalate to SAB within 24 hours
- If criteria unclear: Escalate to SAB for their assessment (better to over-escalate)

---

## 5. Reporting Mechanisms

### 5.1 In-App Reporting

**Report Button Locations**:
- Caregiver profile page (visible to care receiver)
- Care receiver profile page (visible to caregiver - less common but possible)
- Booking detail page (visible to both parties)
- In-app messaging interface (next to block/report)
- Main navigation menu: "Safety & Support" → "Report Safeguarding Concern"
- Footer: "Report Safeguarding Concern" (public access without login)

**Report Form Fields**:

**Required Fields**:
- [ ] Incident type (dropdown: Physical abuse, Emotional abuse, Sexual abuse, Financial abuse, Neglect, Other)
- [ ] Who is at risk? (Care receiver name auto-populated if reporting about booking)
- [ ] Who is the concern about? (Caregiver name auto-populated if reporting about booking)
- [ ] What happened? (Textarea, minimum 50 characters)
- [ ] When did this happen? (Date and time picker)
- [ ] Is this an emergency? (Checkbox: "Yes, there is immediate danger" triggers urgent alert)

**Optional Fields**:
- [ ] Evidence uploads (photos, documents, screenshots - max 10 files, 5MB each)
- [ ] Witness information (name, contact details if someone else saw the incident)
- [ ] Has this happened before? (Yes/No - helps identify patterns)
- [ ] Your contact details (if reporting anonymously, provide at least email for follow-up)

**Submission Confirmation**:
- Case reference number displayed (e.g., SAF-2026-00123)
- Expected response timeline shown (2 hours for urgent, 48 hours for non-urgent)
- Emergency guidance: "If immediate danger, call 999 now"
- Email confirmation sent to reporter with case details

### 5.2 Email Reporting

**Dedicated Safeguarding Email**: safeguarding@[PLATFORM_DOMAIN]

**Auto-Reply Content**:
- Acknowledgment of receipt
- Case reference number assigned
- Expected response timeline
- Emergency contact guidance (999)
- Confidentiality statement

**Email Handling**:
- Safeguarding email inbox monitored 24/7 (on-call rota)
- Urgent keywords trigger SMS alert to on-call officer ("emergency", "danger", "immediate", "assault")
- Email content automatically imported into safeguarding case management system
- Attachments saved to secure evidence storage

### 5.3 Phone Reporting

**24/7 Safeguarding Hotline**: [SAFEGUARDING_PHONE_NUMBER]

**Call Handling Protocol**:
- Answered by on-call Safeguarding Officer (or voicemail if unavailable)
- Voicemail message: "This is the [Platform] safeguarding hotline. If this is an emergency, hang up and call 999. Otherwise, leave your name, contact number, and brief description of concern. We will call you back within 2 hours for urgent concerns, 24 hours for non-urgent."
- Call details logged in case management system
- Call recordings stored securely (with caller consent)
- Callback SLA: 2 hours (urgent), 24 hours (non-urgent)

### 5.4 Public Reporting (No Login Required)

**Website Footer Link**: "Report a Safeguarding Concern"

**Public Reporting Form**:
- Accessible without login (for family members, external professionals, public)
- Reduced fields (no access to booking/user data):
  - [ ] Care receiver name
  - [ ] Caregiver name (if known)
  - [ ] Your relationship to care receiver (Family, Friend, Healthcare professional, Concerned member of public)
  - [ ] What is your concern? (Textarea)
  - [ ] When did this happen? (Date)
  - [ ] Your contact details (Name, email, phone)
- Confirmation page with case reference number and follow-up timeline

### 5.5 External Reporting (Third Parties)

**Healthcare Professionals, Social Workers, Local Authority Contacts**:
- Dedicated contact point: safeguarding@[PLATFORM_DOMAIN]
- Phone: [SAFEGUARDING_PHONE_NUMBER]
- Secure information sharing portal (for SAB/police referrals) - Tier 2+
- Fast-track triage for external professional reports (treated as higher credibility)

---

## 6. Incident Workflow

### 6.1 Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          INCIDENT WORKFLOW                           │
└─────────────────────────────────────────────────────────────────────┘

1. REPORT RECEIVED
   ├─ In-app form submission
   ├─ Email to safeguarding inbox
   ├─ Phone call to hotline
   └─ Public/external report
           ↓
2. INITIAL TRIAGE (<2h for urgent, <48h for non-urgent)
   ├─ Auto-classification (keywords, severity indicators)
   ├─ Safeguarding Officer review
   ├─ Severity assessment (Critical/High/Medium/Low)
   └─ Decision: Dismiss, Investigate, Suspend, Escalate
           ↓
3. IMMEDIATE SAFEGUARDING ACTIONS (if required)
   ├─ Suspend reported user account
   ├─ Block contact between parties
   ├─ Call 999 if immediate danger
   └─ Notify care receiver/family if at risk
           ↓
4. INVESTIGATION (7 days for non-critical)
   ├─ Evidence gathering (messages, bookings, history)
   ├─ Interview reporter
   ├─ Interview reported user (if safe)
   ├─ Interview witnesses
   └─ Assessment: Substantiated, Unsubstantiated, Inconclusive
           ↓
5. EXTERNAL ESCALATION (if criteria met)
   ├─ Safeguarding Adults Board (Section 42 criteria)
   ├─ Police (criminal activity)
   ├─ CQC (if platform failures identified)
   └─ Other authorities (HMRC, ICO, etc.)
           ↓
6. OUTCOME AND ACTIONS
   ├─ User actions: Warning, Suspension, Ban
   ├─ Support referrals for care receiver
   ├─ Platform improvements (policy updates, training)
   └─ Documentation and learning
           ↓
7. RESOLUTION AND NOTIFICATION
   ├─ Close incident case
   ├─ Notify reporter of outcome
   ├─ Notify reported user (if unsubstantiated)
   └─ Archive incident with full audit trail
```

### 6.2 Workflow States

| State | Definition | Owner | Max Duration |
|-------|------------|-------|--------------|
| **New** | Report just received, not yet triaged | System | 2h (urgent), 48h (non-urgent) |
| **Triaging** | Safeguarding Officer performing initial assessment | Safeguarding Officer | 2h (urgent), 24h (non-urgent) |
| **Dismissed** | Not a safeguarding concern (customer service issue, false report) | Safeguarding Officer | N/A (terminal state) |
| **Investigating** | Evidence gathering and interviews underway | Safeguarding Officer | 7 days (Medium), 14 days (High/Critical) |
| **Suspended Pending Investigation** | User suspended while investigation proceeds | Safeguarding Officer | 30 days max |
| **Awaiting External Response** | Escalated to SAB/police, awaiting outcome | Safeguarding Officer | 28 days before follow-up |
| **Resolved - Substantiated** | Abuse/neglect confirmed, actions taken | Safeguarding Officer | N/A (terminal state) |
| **Resolved - Unsubstantiated** | No evidence of abuse/neglect | Safeguarding Officer | N/A (terminal state) |
| **Resolved - Inconclusive** | Insufficient evidence but concern remains | Safeguarding Officer | N/A (terminal state, can reopen) |
| **Reopened** | New evidence emerged after resolution | Safeguarding Officer | Start investigation again |

### 6.3 Automated Workflow Triggers

**Auto-Escalation Triggers**:
- SLA breach (e.g., urgent incident not triaged within 2 hours) → Email to Safeguarding Lead
- Critical severity incident → SMS + email to on-call officer immediately
- Repeat offender (3+ incidents against same user) → Auto-flag for Safeguarding Lead review
- High-value financial abuse (>£1,000) → Auto-escalate to High severity

**Auto-Actions**:
- Urgent incident with keywords ("assault", "rape", "stolen") → Immediate suspension of reported user pending investigation
- No-show + abandonment keywords → Auto-suspension of caregiver, full refund to care receiver
- Off-platform payment request → Auto-warning to reporter, flagged message, caregiver account reviewed

**Auto-Notifications**:
- Reporter: Acknowledgment within 1 hour, updates at key stages (investigation started, external escalation, resolution)
- Reported user: Suspension notification, investigation notification (unless risks contamination), resolution notification
- Safeguarding Officer: SLA breach alerts, urgent incident alerts, follow-up reminders

---

## 7. Escalation Procedures

### 7.1 Internal Escalation

**Level 1: Operations Manager** (handles non-safeguarding customer service issues)
- Booking disputes, refunds, verification questions
- Escalates to Safeguarding Officer if safeguarding indicators identified

**Level 2: Safeguarding Officer** (handles all safeguarding incidents)
- Receives all safeguarding reports
- Performs triage and investigation
- Decides on user actions (warnings, suspension, bans)
- Escalates to external authorities when criteria met
- Escalates to Safeguarding Lead for complex cases

**Level 3: Safeguarding Lead** (designated senior person with safeguarding training)
- Reviews complex or high-profile cases
- Makes final decisions on permanent bans
- Liaison with Safeguarding Adults Boards
- Escalation to police for criminal matters
- Annual safeguarding policy review and reporting

**Level 4: Legal Counsel** (external solicitor)
- Consulted for legal interpretation of complex cases
- Reviews cases with potential legal liability
- Advises on information sharing with authorities
- Represents platform in SAB investigations or legal proceedings

### 7.2 External Escalation: Safeguarding Adults Board (SAB)

**When to Escalate to SAB**:
- Section 42 criteria met (adult with care needs, experiencing abuse, unable to protect self)
- Serious physical harm or sexual abuse
- Financial exploitation >£1,000
- Pattern of abuse (multiple incidents suggesting systemic issue)
- Care receiver lacks mental capacity and is at risk
- Institutional abuse or platform safeguarding failure
- SAB requests information about user

**SAB Escalation Process**:

**Step 1: Identify Relevant Local Authority**
- Care receiver's postcode determines local authority
- Platform maintains contact database of 150+ local authority SABs
- Each SAB has own referral process (phone, email, online form)

**Step 2: Complete SAB Referral Form**
- Care receiver details: Name, DOB, address, contact details
- Nature of concern: Abuse type, description, dates, evidence
- Reporter information: Name, relationship to care receiver, contact details
- Alleged perpetrator: Caregiver name, contact details, relationship
- Current risk level: Immediate/High/Medium/Low
- Actions taken by platform: Investigation findings, user suspension, support provided
- Consent: Has care receiver consented to referral? (Not required if lacking capacity or risk of harm)

**Step 3: Send Referral**
- Preferred method: SAB online referral portal (if available)
- Alternative: Email to SAB safeguarding team with completed form
- Phone notification for urgent cases (followed by written referral)
- Referral must be made within 24 hours of identifying Section 42 criteria

**Step 4: SAB Response**
- SAB acknowledges referral (usually within 1-2 working days)
- SAB decides whether to open Section 42 enquiry
- SAB may request additional information from platform
- SAB may conduct investigation independently or ask platform to gather information

**Step 5: Ongoing Cooperation**
- Platform cooperates fully with SAB enquiry
- Share information lawfully (GDPR safeguarding exemption)
- Provide access to platform records (messages, bookings, verification documents)
- Attend safeguarding meetings if requested
- Implement SAB recommendations

**Step 6: Outcome and Learning**
- SAB communicates outcome (enquiry closed, ongoing support, no action)
- Platform documents SAB outcome in incident record
- Platform implements any recommended policy or process changes
- Platform participates in Safeguarding Adults Review (SAR) if serious case

**SAB Contact Information**:
- National: https://www.gov.uk/report-abuse-of-older-person
- Local SAB finder tool: https://www.gov.uk/find-local-council
- Platform maintains internal database of SAB contacts (updated annually)

### 7.3 External Escalation: Police

**When to Escalate to Police**:
- Criminal offence committed or suspected:
  - Assault (physical, sexual)
  - Theft or fraud
  - Coercive control or harassment
  - Modern slavery or human trafficking
  - Hate crime (discriminatory abuse)
- Immediate danger to life
- SAB advises police notification
- Care receiver requests police involvement

**Police Escalation Process**:

**Step 1: Determine Urgency**
- **Emergency (999)**: Immediate danger to life, crime in progress, medical emergency
- **Non-Emergency (101)**: Crime already occurred, no immediate danger, information to report

**Step 2: Report to Police**
- Call 999 or 101 (as appropriate)
- Provide: Care receiver name/address, nature of offence, suspect details (caregiver name), evidence available
- Obtain crime reference number
- Ask for officer contact details for follow-up

**Step 3: Share Evidence**
- Police may request:
  - Platform user data (caregiver and care receiver accounts)
  - Booking records and payment details
  - Message logs between parties
  - Uploaded evidence (photos, documents)
  - Verification documents (ID, DBS certificates)
- Platform shares lawfully (GDPR exemption for crime prevention/detection)
- Obtain written request from police for data disclosure (good practice)

**Step 4: Ongoing Cooperation**
- Provide statements if requested
- Attend court proceedings if subpoenaed
- Preserve evidence (do not delete accounts, messages, or booking data)
- Continue internal investigation in parallel (do not rely solely on police)

**Step 5: Outcome**
- Police communicate outcome (charges filed, no further action, ongoing investigation)
- Platform documents police outcome in incident record
- Platform actions taken regardless of police outcome (suspension/ban if safeguarding breach confirmed)

**Action Fraud** (for financial crimes):
- Phone: 0300 123 2040
- Online: https://www.actionfraud.police.uk
- Use for: Fraud, theft, financial exploitation

### 7.4 Other External Escalations

**Care Quality Commission (CQC)**:
- Platform is NOT CQC-registered (Introduction Agency model)
- However, CQC may investigate if:
  - Platform activities blur into "arranging" care (not just "introducing")
  - Systemic safeguarding failures identified
  - Public concern about platform safety
- If CQC contacts platform: Respond promptly, provide information, seek legal counsel

**Information Commissioner's Office (ICO)**:
- Escalate if data breach related to safeguarding incident
- Report within 72 hours if personal data breach likely to result in risk to individuals
- ICO contact: https://ico.org.uk/make-a-complaint/data-protection-complaints/

**HM Revenue & Customs (HMRC)**:
- Escalate if financial abuse includes tax fraud or benefits fraud
- Report to HMRC fraud hotline: 0800 788 887

**Local Authority Adult Social Care**:
- Separate from SAB (social care assessments vs. safeguarding enquiries)
- Refer care receivers needing care assessment or support
- Care receivers can self-refer or platform can refer (with consent)

---

## 8. Response SLAs

### 8.1 Platform Response SLAs

| Action | Critical Severity | High Severity | Medium Severity | Low Severity |
|--------|------------------|---------------|-----------------|--------------|
| **Initial Acknowledgment** | <2 hours | <4 hours | <24 hours | <48 hours |
| **Triage Completed** | <2 hours | <4 hours | <24 hours | <48 hours |
| **Investigation Started** | Immediate | <24 hours | <48 hours | <7 days |
| **Investigation Completed** | <7 days | <14 days | <21 days | <28 days |
| **External Escalation (if required)** | <2 hours (SAB/police) | <24 hours | <7 days | N/A |
| **Reporter Notification (outcome)** | <7 days | <14 days | <21 days | <28 days |

**SLA Measurement**:
- Clock starts when report received (timestamp in system)
- Clock pauses during external investigations (awaiting SAB/police response)
- SLA breaches trigger alerts to Safeguarding Lead
- SLA performance reported monthly in analytics dashboard

### 8.2 External Response Expectations

**Safeguarding Adults Board**:
- Acknowledgment: 1-2 working days
- Decision on Section 42 enquiry: 1-2 weeks
- Enquiry completion: 4-12 weeks (varies by complexity)
- SAB outcome notification: Within 28 days of enquiry completion

**Police**:
- Crime reference number: Immediate (999) or within 24 hours (101)
- Investigation progress updates: Varies (platform can request updates)
- Outcome notification: Weeks to months (depends on case complexity)

**Note**: Platform cannot control external timelines but should follow up regularly.

### 8.3 SLA Breach Protocol

**What Happens When SLA Breached**:
1. Automated alert sent to Safeguarding Officer (email + dashboard notification)
2. If officer does not respond within 1 hour, alert escalated to Safeguarding Lead
3. Safeguarding Lead reviews case and assigns resource to meet SLA
4. SLA breach logged and reviewed in monthly safeguarding performance review
5. Repeated SLA breaches trigger process review and resource allocation assessment

**Acceptable SLA Breach Reasons**:
- Awaiting external input (SAB, police, care receiver unavailable)
- Resource constraints (multiple critical incidents simultaneously)
- Case complexity exceeds standard investigation scope
- Legal counsel review required

**Unacceptable SLA Breach Reasons**:
- Staff forgot to action incident
- Incident not triaged due to oversight
- Staff unavailable and no backup assigned (on-call rota failure)

---

## 9. Safeguarding Lead Role

### 9.1 Role Definition

**Safeguarding Lead**: Designated senior person responsible for platform safeguarding strategy, oversight, and external liaison.

**Key Responsibilities**:
- Overall accountability for platform safeguarding compliance
- Liaison with Safeguarding Adults Boards and external authorities
- Review and approval of complex safeguarding cases
- Escalation point for SLA breaches and high-profile incidents
- Safeguarding policy development and annual review
- Safeguarding training for staff and caregivers
- SAB reporting and participation in Safeguarding Adults Reviews
- Incident trend analysis and learning implementation

### 9.2 Qualifications and Training

**Minimum Requirements**:
- Level 3 Safeguarding Adults training (nationally recognized qualification)
- Experience in adult social care, healthcare, or safeguarding roles
- Understanding of Care Act 2014, Mental Capacity Act 2005, and relevant legislation
- Communication skills for liaising with external authorities
- Impartiality and sound judgment

**Recommended Qualifications**:
- Social work background or healthcare professional
- Experience working with vulnerable adults
- Safeguarding Adults Manager training
- Mental Capacity Act training
- Multi-agency safeguarding experience

**Training Sources**:
- Local Safeguarding Adults Boards (offer free training)
- Social Care Institute for Excellence (SCIE)
- Skills for Care
- Local authority adult social care departments

### 9.3 Responsibilities by Tier

**Tier 1 (Companionship)**:
- Establish safeguarding infrastructure and reporting mechanisms
- Train admin staff on recognizing and responding to concerns
- Develop safeguarding policies and procedures
- Build SAB contact database (150+ local authorities)
- Respond to all critical and high severity incidents
- Conduct monthly safeguarding performance reviews

**Tier 2+ (Personal Care)**:
- Enhanced verification oversight (DBS, qualifications)
- Develop condition-specific safeguarding protocols (dementia, mobility issues)
- Expand SAB liaison (increased personal care means increased referrals)
- Train caregivers on safeguarding (mandatory training modules)
- Participate in SAB multi-agency meetings

**Tier 3+ (Condition-Specific)**:
- Clinical safety monitoring (medication errors, falls, deterioration)
- Mental Capacity Act compliance oversight (capacity assessments, LPA verification)
- DoLS compliance (live-in care deprivation of liberty assessments)
- Enhanced SAB liaison (more complex cases)

**Tier 4+ (Care Coordination)**:
- Multi-caregiver safeguarding coordination
- NHS/LA safeguarding alignment
- Safeguarding Adults Review (SAR) participation
- Annual safeguarding reporting to commissioners

### 9.4 On-Call Requirements

**24/7 On-Call Rota**:
- Safeguarding Officer or Lead must be contactable 24/7 (phone, SMS, email)
- On-call rota covers nights, weekends, public holidays
- Response time: 2 hours for urgent/critical incidents
- On-call officer has access to case management system remotely
- Escalation to Safeguarding Lead if on-call officer unavailable

**On-Call Compensation**:
- On-call allowance (flat rate per day on-call)
- Call-out fee (if called out of hours)
- Time off in lieu (TOIL) for extended out-of-hours work

---

## 10. Documentation Requirements

### 10.1 Incident Documentation

**Required Documentation for Every Incident**:
- [ ] Incident report form (completed by reporter)
- [ ] Initial triage assessment (completed by Safeguarding Officer)
- [ ] Severity classification and rationale
- [ ] Evidence collected (messages, photos, documents, witness statements)
- [ ] Investigation notes (interviews, findings, assessment)
- [ ] Section 42 criteria checklist (if applicable)
- [ ] External escalations (SAB, police) with reference numbers and outcomes
- [ ] User actions taken (warnings, suspensions, bans)
- [ ] Support referrals provided to care receiver
- [ ] Resolution outcome (substantiated, unsubstantiated, inconclusive)
- [ ] Reporter notification (date and method)
- [ ] Lessons learned and platform improvements implemented

### 10.2 Audit Trail Requirements

**Audit Logging** (automatically captured by system):
- Incident creation timestamp and reporter
- Every status change with timestamp and admin user
- All admin actions (suspensions, escalations, resolutions) with timestamp and rationale
- All evidence uploads and downloads
- All notifications sent (to reporter, reported user, external authorities)
- All edits to incident record with change history

**Retention Period**:
- Safeguarding incidents: 7 years (recommended for safeguarding records)
- Evidence files: 7 years
- Resolved incidents: 7 years (cannot be deleted, archived only)
- User accounts with safeguarding history: Retained indefinitely (even if user deleted, safeguarding records retained)

### 10.3 Confidentiality and Access Controls

**Who Can Access Safeguarding Records**:
- Safeguarding Officer: Full access to all incidents
- Safeguarding Lead: Full access to all incidents
- Super Admin: Full access (for technical/system purposes)
- Operations Manager: Read-only access to non-urgent incidents (for learning)
- Customer Support: No access (not involved in safeguarding)

**External Access**:
- Safeguarding Adults Boards: Access upon written request (GDPR-compliant information sharing)
- Police: Access upon written request (crime prevention/detection exemption)
- CQC: Access upon written request (if investigation)
- Legal counsel: Access for specific cases under attorney-client privilege

**Data Protection**:
- Safeguarding data is special category data (GDPR Article 9)
- Encrypted at rest and in transit
- Access logged (who accessed what, when)
- Cannot be exported or printed without Safeguarding Lead approval
- Reporter identity protected (not shared with reported user unless legally required)

### 10.4 SAB Reporting Requirements

**Annual Safeguarding Report** (provided to SABs upon request):
- Number of safeguarding incidents reported (by severity, type, outcome)
- Number of incidents escalated to SAB (by local authority)
- Number of incidents escalated to police
- Safeguarding trends and patterns identified
- Platform improvements implemented in response to incidents
- Training provided to staff and caregivers
- Compliance with Care Act 2014 duties

**Ad-Hoc SAB Requests**:
- SAB may request information about specific users or incidents
- Platform provides information lawfully (GDPR safeguarding exemption)
- Written request from SAB preferred (for audit trail)
- Information shared within 7 working days

---

## 11. External Liaison

### 11.1 Safeguarding Adults Boards (SABs)

**What is a SAB?**
- Statutory multi-agency body established under Care Act 2014 Section 43
- Membership: Local authority, police, NHS, care providers, housing, advocacy groups
- Purpose: Coordinate safeguarding across agencies, conduct SARs, develop local policies

**Platform Relationship with SABs**:
- Platform is NOT a statutory SAB member (Introduction Agency, not care provider)
- Platform cooperates voluntarily with SAB enquiries and investigations
- Platform may be invited to SAB meetings for specific cases
- Platform participates in Safeguarding Adults Reviews (SARs) if serious case review required

**150+ Local Authority SABs**:
- England has 152 local authorities (unitary, county, borough)
- Each has own SAB with own referral process
- Platform maintains database of SAB contacts (updated annually)

**SAB Communication Protocol**:
- Primary contact: Email to SAB safeguarding team with referral form
- Urgent cases: Phone notification followed by written referral
- Follow-up: Email or phone every 14 days if no response from SAB
- Escalation: If no SAB response after 28 days, escalate to SAB manager or local authority Director of Adult Social Services

### 11.2 Police Liaison

**Police Forces in UK**:
- 43 territorial police forces in England and Wales
- Platform liaisons with relevant force based on care receiver location
- Use 999 (emergency) or 101 (non-emergency) depending on urgency

**Information Sharing with Police**:
- GDPR exemption for crime prevention/detection (Article 6(1)(e), Article 9(2)(f))
- Share information upon written request (best practice)
- Can share without request if immediate danger or crime in progress
- Evidence: User data, messages, bookings, verification documents

**Police Investigation Cooperation**:
- Provide statements if requested
- Attend interviews or court proceedings if required
- Preserve evidence (do not delete user accounts, messages, or bookings)
- Continue internal investigation in parallel (do not assume police investigation resolves safeguarding duty)

### 11.3 Care Quality Commission (CQC)

**CQC Relationship**:
- Platform is NOT CQC-registered (Introduction Agency model per FDR-002)
- CQC may investigate platform if concerns raised about care quality or safeguarding
- CQC has power to require information (Health and Social Care Act 2008)

**If CQC Contacts Platform**:
- Respond within deadline specified (usually 28 days)
- Seek legal counsel immediately (CQC investigations can lead to enforcement)
- Provide information requested (cooperative approach recommended)
- Document all CQC communications
- Implement any recommendations or requirements

### 11.4 Other External Bodies

**Information Commissioner's Office (ICO)**:
- Contact if data breach involving safeguarding data
- Report within 72 hours if breach likely to result in risk to individuals
- ICO may investigate platform's data protection practices

**Local Authority Adult Social Care**:
- Distinct from SAB (care assessments vs. safeguarding)
- Refer care receivers needing care assessment
- Provide support referrals

**Independent Advocacy Services**:
- Care Act 2014 requires advocacy for vulnerable adults in safeguarding enquiries
- Platform can refer care receivers to local advocacy services
- Advocates support care receivers through SAB enquiries

**Hourglass (Older Persons Abuse Helpline)**:
- National charity supporting victims of elder abuse
- Platform can refer care receivers for emotional support and guidance
- Helpline: 0808 808 8141

**Age UK**:
- National charity supporting older people
- Provide advice, support, and advocacy
- Platform can refer care receivers for wider support

---

## 12. Training Requirements

### 12.1 Admin Staff Training

**Safeguarding Officer Training** (MANDATORY before performing role):
- [ ] Level 3 Safeguarding Adults (nationally recognized qualification) - 2-3 days
- [ ] Care Act 2014 overview - 1 day
- [ ] Mental Capacity Act 2005 awareness - 1 day
- [ ] GDPR and information sharing for safeguarding - 0.5 days
- [ ] Platform safeguarding policies and procedures - 1 day
- [ ] Case management system training - 0.5 days
- [ ] Total: 5-6 days initial training

**Safeguarding Lead Training** (MANDATORY before performing role):
- [ ] All Safeguarding Officer training (above)
- [ ] Safeguarding Adults Manager/Lead training - 3 days
- [ ] SAB liaison and multi-agency working - 1 day
- [ ] Safeguarding Adults Review (SAR) participation - 0.5 days
- [ ] Advanced Mental Capacity Act and DoLS - 1 day
- [ ] Total: 10-11 days initial training

**Operations Manager Training** (MANDATORY):
- [ ] Safeguarding awareness training - 1 day
- [ ] Recognizing signs of abuse - 0.5 days
- [ ] Platform safeguarding policies and escalation procedures - 0.5 days
- [ ] Total: 2 days initial training

**Super Admin Training** (MANDATORY):
- [ ] Safeguarding awareness training - 1 day
- [ ] Confidentiality and data protection for safeguarding - 0.5 days
- [ ] Total: 1.5 days initial training

**Refresher Training** (MANDATORY):
- All admin staff: Annual safeguarding refresher (0.5 days)
- Safeguarding Officer/Lead: Level 3 refresher every 3 years (1 day)

### 12.2 Caregiver Training

**Tier 1 Caregiver Training** (RECOMMENDED, not mandatory):
- [ ] Safeguarding vulnerable adults awareness (online module, 30 minutes)
- [ ] Recognizing signs of abuse (online module, 20 minutes)
- [ ] How to report safeguarding concerns (online module, 10 minutes)
- [ ] Professional boundaries (online module, 20 minutes)
- [ ] Total: 80 minutes (optional at Tier 1, mandatory at Tier 2+)

**Training Delivery**:
- Platform learning management system (LMS)
- Self-paced online modules
- Quiz at end of each module (80% pass required)
- Certificate issued upon completion
- Badge on profile: "Safeguarding Trained" (trust signal for care receivers)

**Training Content Sources**:
- Social Care Institute for Excellence (SCIE) open resources
- Local SAB training materials (many freely available)
- Platform-specific content (reporting procedures, policies)

### 12.3 Care Receiver and Family Training

**Optional Resources** (available on website):
- [ ] "What is Safeguarding?" explainer video (5 minutes)
- [ ] "How to Recognize Abuse" guide (downloadable PDF)
- [ ] "How to Report Concerns" step-by-step guide
- [ ] "Your Rights" explainer (Care Act 2014 safeguarding principles)

**Embedded Training**:
- Onboarding flow includes safeguarding information and reporting options
- First booking confirmation email includes safeguarding resources
- Regular platform emails include safeguarding tips

---

## 13. Data Protection

### 13.1 GDPR Classification

**Safeguarding Data is Special Category Data** (GDPR Article 9):
- Incident reports often reveal health conditions, disabilities, or vulnerabilities
- Allegations of abuse may reveal information about mental capacity, care needs
- Safeguarding data requires enhanced protection and lawful basis for processing

**Lawful Bases for Processing Safeguarding Data**:
- **Vital interests** (Article 9(2)(c)): Processing necessary to protect vital interests of data subject who is physically or legally incapable of giving consent (e.g., care receiver at immediate risk)
- **Legal obligation** (Article 9(2)(b)): Processing necessary for compliance with Care Act 2014 safeguarding duties
- **Substantial public interest** (Article 9(2)(g)): Safeguarding vulnerable adults is substantial public interest under DPA 2018 Schedule 1

**No Consent Required**:
- Care Act 2014 allows information sharing for safeguarding WITHOUT consent if:
  - Person lacks capacity to consent
  - Seeking consent would increase risk to person
  - Seeking consent would prejudice investigation
- Platform documents lawful basis for each incident (no blanket consent required)

### 13.2 Information Sharing with External Authorities

**GDPR Safeguarding Exemption** (DPA 2018 Schedule 2, Part 1, Paragraph 2):
- Personal data can be shared with SABs, police, and other authorities without consent if necessary for safeguarding
- Exemption applies to:
  - Protecting vital interests (preventing death or serious harm)
  - Preventing, detecting, or prosecuting crime
  - Safeguarding children or vulnerable adults

**Information Sharing Principles**:
- Share information only when necessary for safeguarding
- Share minimum information required (proportionality)
- Share with appropriate authorities only (SAB, police, not general public)
- Document reason for sharing (lawful basis)
- Inform data subject if safe to do so (not always required)

**Information Sharing Protocol**:
- SAB requests information → Verify SAB identity, provide information within 7 days, log disclosure
- Police request information → Obtain crime reference number, provide information, log disclosure
- CQC request information → Seek legal counsel, provide information within deadline, log disclosure

### 13.3 Data Subject Rights and Safeguarding

**Right to Access (Subject Access Request)**:
- Care receivers and caregivers can request their safeguarding data
- Platform must provide within 1 month
- **Exemption**: Can refuse if disclosure would prejudice safeguarding investigation or put another person at risk (DPA 2018 Schedule 2, Part 2)

**Right to Erasure**:
- Care receivers/caregivers can request deletion of their data
- **Exemption**: Safeguarding data cannot be deleted if needed for legal obligation, public interest, or defending legal claims
- Retention: 7 years for safeguarding records (standard practice)

**Right to Rectification**:
- Users can correct inaccurate information in safeguarding records
- Platform must not rectify if changes would alter evidence or investigation findings (note added to record instead)

### 13.4 Confidentiality and Anonymization

**Reporter Confidentiality**:
- Reporter identity not shared with reported user unless legally required (court order, police investigation)
- Reporter contact details stored separately from incident record (access controlled)
- Anonymous reporting accepted (but harder to investigate)

**Care Receiver Confidentiality**:
- Care receiver information shared with SAB/police only (not public)
- Care receiver name and details removed from aggregated safeguarding reports
- Media inquiries handled by Safeguarding Lead (do not disclose care receiver details)

**Staff Confidentiality**:
- Admin staff sign confidentiality agreements (breach = misconduct)
- Safeguarding records must not be discussed outside authorized personnel
- No sharing on social media or with family/friends

---

## 14. Edge Cases

### 14.1 False or Malicious Reports

**Scenario**: Care receiver falsely accuses caregiver of abuse to avoid payment or get revenge.

**Detection Indicators**:
- No corroborating evidence (messages, witnesses, previous incidents)
- Reporter has history of disputes or false reports
- Reported user has clean history with positive reviews
- Timing suspicious (report filed after payment dispute, late cancellation)

**Response**:
- Investigate thoroughly (do not dismiss immediately)
- Interview both parties
- Review all evidence (messages, booking history)
- If unsubstantiated: Close incident, notify reporter that concern could not be substantiated
- If malicious: Warn reporter about false reporting, potential suspension if repeated

**Protecting Reported User**:
- Unsubstantiated incidents not displayed on user profile
- Suspension lifted immediately if unsubstantiated
- Reported user notified of outcome and apology if appropriate

### 14.2 Historical Abuse (Non-Platform)

**Scenario**: Care receiver reports abuse that occurred BEFORE using platform or with non-platform caregiver.

**Response**:
- Thank care receiver for trusting platform with disclosure
- Explain platform's jurisdiction (only platform users)
- Refer to Safeguarding Adults Board for external abuse
- Provide SAB contact details and guidance on making referral
- Offer support resources (Hourglass, Age UK, local advocacy)
- Document report (even if outside platform scope - shows care receiver vulnerability)

**If Current Platform Caregiver Involved in Historical Abuse**:
- Investigate fully (historical abuse relevant to current caregiver status)
- Escalate to SAB (care receiver may be re-victimized)
- Consider caregiver suspension pending investigation

### 14.3 Self-Neglect Reports

**Scenario**: Caregiver reports care receiver is self-neglecting (refusing care, malnutrition, hoarding, unsafe home).

**Section 42 Criteria**:
- Self-neglect is recognized abuse type under Care Act 2014
- Criteria met if: Care receiver has care needs, self-neglecting, unable to protect self due to care needs

**Response**:
- Assess severity: Mild (guidance to care receiver/family), Moderate-Severe (SAB referral)
- Mental capacity consideration: Does care receiver have capacity to make decisions? (MCA 2005 presumption of capacity)
- If capacity: Care receiver has right to make unwise decisions (cannot force care)
- If lacking capacity: SAB referral for best interests assessment and possible intervention
- Support referrals: Local authority adult social care, GP, community mental health team

**Platform Role**:
- Document caregiver's concerns
- Notify family (if care receiver consents or lacks capacity)
- Refer to SAB if risk of serious harm
- Do not terminate care receiver account (they need support, not exclusion)

### 14.4 Cross-Platform Abuse

**Scenario**: Care receiver reports that caregiver (verified on platform) met them through another platform or offline and abused them outside platform bookings.

**Jurisdiction**:
- Abuse occurred outside platform (no booking record, no message evidence)
- BUT caregiver is platform user (safeguarding duty applies)

**Response**:
- Investigate as platform safeguarding incident (caregiver's conduct on/off platform affects suitability)
- Interview care receiver and gather evidence
- Interview caregiver (may deny or admit)
- Escalate to police if criminal offence suspected
- Caregiver suspension pending investigation
- If substantiated: Permanent ban from platform + SAB referral
- If unsubstantiated: Insufficient evidence, incident remains on caregiver's confidential record

### 14.5 Abuse by Family Member (Domestic Abuse)

**Scenario**: Caregiver reports that care receiver is being abused by family member (financial, emotional, physical).

**Care Act 2014 Applies**:
- Domestic abuse is recognized abuse type under Care Act 2014
- Section 42 criteria apply (care receiver with care needs, experiencing abuse, unable to protect self)

**Response**:
- Safeguarding incident opened
- Assess immediate risk: Is care receiver safe at home?
- Escalate to SAB (domestic abuse requires multi-agency response)
- Refer to domestic abuse services: National Domestic Abuse Helpline (0808 2000 247), local IDVA (Independent Domestic Violence Advocate)
- Do NOT contact alleged abuser (family member) - may increase risk
- Support care receiver's choices (victim-led approach)

**Platform Considerations**:
- Family member may be authorized user on care receiver's account (has access to bookings, messages)
- Consider revoking family member's account access if they are alleged abuser
- Protect caregiver (alleged abuser may retaliate against caregiver for reporting)

### 14.6 Caregiver Reports Being Exploited by Platform

**Scenario**: Caregiver reports feeling exploited by platform (low pay, excessive commission, unfair treatment).

**Not a Safeguarding Issue** (usually):
- Commercial dispute, not abuse of vulnerable adult
- Escalate to Operations Manager or customer service

**When It Becomes Safeguarding**:
- If caregiver claims platform is engaging in modern slavery (forced labor, excessive control)
- If caregiver claims discrimination (Equality Act 2010 breach)
- If pattern of complaints suggests institutional abuse

**Response**:
- Investigate complaints seriously
- Review platform policies and commission structure
- Seek legal counsel if modern slavery or discrimination alleged
- If substantiated: Platform policy changes, potential external reporting (HMRC, ICO, CQC)

### 14.7 External Professional Reports Concern

**Scenario**: GP, social worker, or local authority contacts platform with concern about care receiver or caregiver.

**Credibility**:
- External professionals have higher credibility (trained in recognizing abuse)
- Fast-track triage (treat as High severity minimum)

**Response**:
- Thank professional for reporting
- Gather detailed information (professional's concerns, evidence, has SAB been notified?)
- Open safeguarding incident immediately
- Investigate and cooperate with professional
- If professional has already notified SAB: Coordinate with SAB (avoid duplicating investigations)
- Follow up with professional on outcome (to extent confidentiality allows)

### 14.8 Incident Involves Minor (Child Safeguarding)

**Scenario**: Care receiver has child in household, child safeguarding concern raised (e.g., child witnesses abuse of elderly grandparent, child is neglected).

**Platform Scope**:
- Platform serves adults only (no child care services)
- BUT if child safeguarding concern arises, platform has duty to report

**Response**:
- Escalate to local authority Children's Safeguarding Board (NOT Safeguarding Adults Board)
- Contact local authority children's social care immediately
- Provide information to children's social care (GDPR exemption for child protection)
- Continue adult safeguarding investigation in parallel
- Document child safeguarding referral in incident record

**Children's Safeguarding Contacts**:
- Local authority children's social care: https://www.gov.uk/report-child-abuse-to-local-council
- NSPCC helpline: 0808 800 5000

---

## 15. Acceptance Criteria

### 15.1 Reporting Mechanisms

**Functional Requirements**:
- [ ] "Report Safeguarding Concern" button visible on caregiver profile, care receiver profile, booking page, main menu, footer
- [ ] Public reporting form accessible without login
- [ ] Safeguarding email inbox (safeguarding@[DOMAIN]) with 24/7 monitoring
- [ ] 24/7 safeguarding phone hotline with voicemail fallback
- [ ] Emergency guidance displayed: "If immediate danger, call 999"

**Report Form Requirements**:
- [ ] Incident type dropdown (10+ abuse types)
- [ ] Severity selection: "This is an emergency" checkbox
- [ ] Description textarea (minimum 50 characters required)
- [ ] Date/time picker for incident occurrence
- [ ] Evidence upload (max 10 files, 5MB each)
- [ ] Case reference number generated on submission (e.g., SAF-2026-00123)
- [ ] Email confirmation sent to reporter within 1 hour
- [ ] Urgent incidents trigger SMS + email to on-call Safeguarding Officer

**Success Metrics**:
- 95%+ of urgent incidents acknowledged within 2 hours
- 100% of incidents receive case reference number on submission
- Zero lost reports (all submissions logged in database)

### 15.2 Admin Incident Management

**Functional Requirements**:
- [ ] Safeguarding dashboard displays incident queue sorted by urgency and age
- [ ] SLA breach alerts (>2h for urgent, >48h for non-urgent)
- [ ] Incident detail view displays: reporter, reported user, description, evidence, user history
- [ ] Triage interface with severity classification (Critical/High/Medium/Low)
- [ ] Investigation interface with evidence collection, interview notes, assessment fields
- [ ] User suspension/ban functionality with immediate account lockout
- [ ] External escalation tools: SAB referral form, police escalation form
- [ ] Resolution interface with outcome selection (substantiated/unsubstantiated/inconclusive)
- [ ] Reporter notification system (automated emails at key stages)

**Workflow Requirements**:
- [ ] Incident workflow states: New → Triaging → Investigating → Escalated → Resolved
- [ ] Automated status updates (e.g., SLA breach → alert escalates to Safeguarding Lead)
- [ ] Audit trail captures all actions with timestamps and admin user
- [ ] Incident reopening capability if new evidence emerges

**Success Metrics**:
- 100% of incidents triaged within SLA
- 100% of Section 42 qualifying incidents escalated to SAB within 24 hours
- 95%+ of incidents resolved within 28 days
- Zero incidents lost or unactioned due to system failures

### 15.3 External Liaison

**Functional Requirements**:
- [ ] SAB contact database (150+ UK local authorities) with postcode lookup
- [ ] SAB referral form auto-generates PDF with incident details
- [ ] Police escalation form captures crime reference number and officer details
- [ ] Follow-up reminder system (7, 14, 28 days for external escalations)
- [ ] External escalation audit trail (when escalated, to whom, reference number, outcome)

**Documentation Requirements**:
- [ ] SAB referral PDF includes: care receiver details, incident description, evidence summary, platform actions
- [ ] Police referral includes: crime type, suspect details, evidence available, contact person
- [ ] All external communications logged in incident record

**Success Metrics**:
- 100% of SAB escalations include completed referral form
- 100% of police escalations include crime reference number
- 90%+ of external escalations have documented outcome within 28 days

### 15.4 Training and Compliance

**Training Requirements**:
- [ ] Safeguarding Officer completes Level 3 Safeguarding Adults before performing role
- [ ] Safeguarding Lead completes Safeguarding Adults Manager training
- [ ] All admin staff complete safeguarding awareness training
- [ ] Training records maintained (certificates, completion dates)
- [ ] Annual refresher training scheduled automatically

**Compliance Requirements**:
- [ ] Published Safeguarding Policy accessible on website
- [ ] Safeguarding Policy reviewed annually
- [ ] Incident data retained for 7 years
- [ ] GDPR-compliant data protection for safeguarding records
- [ ] Annual safeguarding report available for SABs upon request

**Success Metrics**:
- 100% of admin staff trained before handling safeguarding incidents
- Zero data protection breaches involving safeguarding data
- Annual safeguarding report completed by March each year

### 15.5 Data Protection

**Functional Requirements**:
- [ ] Safeguarding data encrypted at rest and in transit
- [ ] Access controls: Only Safeguarding Officer, Lead, Super Admin can access
- [ ] Access logging: All safeguarding record access logged (who, when, what)
- [ ] Reporter identity protected (not shared with reported user unless legally required)
- [ ] Data subject rights interface for Subject Access Requests (with safeguarding exemptions)

**Information Sharing Requirements**:
- [ ] Information sharing protocol documented (when, how, to whom)
- [ ] GDPR lawful basis documented for each incident
- [ ] External disclosure log (who received information, when, why)

**Success Metrics**:
- Zero unauthorized access to safeguarding records
- 100% of external disclosures logged and documented
- 100% of Subject Access Requests processed within 1 month (with exemptions applied appropriately)

---

## 16. Out of Scope

### 16.1 Out of Scope for Tier 1

The following features are deferred to future tiers:

**Tier 2 (Personal Care)**:
- Clinical incident reporting (falls, injuries during personal care)
- Medication error reporting
- Enhanced DBS verification workflows
- Qualification-based safeguarding (e.g., unqualified caregiver providing personal care)

**Tier 3 (Condition-Specific)**:
- Medical condition-related safeguarding (dementia-specific incidents, MCA violations)
- Deprivation of Liberty Safeguards (DoLS) reporting and compliance
- Advanced clinical safety monitoring
- Health data breach safeguarding

**Tier 4 (Care Coordination)**:
- Multi-caregiver safeguarding coordination
- Care plan violation reporting
- NHS/LA safeguarding integration
- Safeguarding Adults Review (SAR) participation workflows

### 16.2 External Safeguarding Responsibilities

The platform does NOT:
- Conduct formal care assessments or risk assessments (local authority responsibility)
- Provide clinical governance or medical oversight (GP/NHS responsibility)
- Replace statutory safeguarding duties of local authorities (SAB leads investigations)
- Supervise caregivers during care delivery (caregivers are self-employed)
- Guarantee safety or prevent all abuse (platform mitigates risk, does not eliminate it)

### 16.3 Caregiver Employment Issues

**Not Safeguarding**:
- Caregiver complaints about low earnings (commercial dispute)
- Caregiver complaints about commission structure (commercial dispute)
- Caregiver disputes with care receivers about payment (booking dispute, not safeguarding unless financial abuse)
- Caregiver technical issues or verification delays (customer service issue)

**When It Becomes Safeguarding**:
- If exploitation rises to modern slavery (forced labor, excessive control)
- If discrimination involved (Equality Act breach)

---

## Related Documents

- `/docs/ROADMAP.md` - Tiered Market Entry Strategy (FDR-003)
- `/docs/tiers/tier1/compliance.md` - Tier 1 Compliance Requirements
- `/docs/compliance/legal-framework.md` - Care Act 2014, Safeguarding Duties
- `/docs/product/features/tier1-admin-specification.md` - Admin Dashboard (integrates with safeguarding tools)
- `/docs/tiers/tier1/website-content/legal/safeguarding-policy.md` - Published Safeguarding Policy
- `/docs/governance/founder-decisions-responses.md` - FDR-002 (no CQC registration)

---

**Document Status**: ACTIVE - Ready for Development
**Last Updated**: 2026-02-06

---

**END OF SPECIFICATION**
