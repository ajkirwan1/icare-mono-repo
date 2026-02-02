# User Flow: Safeguarding Incident Response

**Primary Actor**: Admin / Safeguarding Officer (with safeguarding role permissions)
**Goal**: Receive, triage, investigate, and resolve safeguarding concerns to protect vulnerable adults
**Preconditions**:
- Admin has valid admin account with 2FA enabled and safeguarding officer role assigned
- Safeguarding concern reported by user (care receiver, family member, caregiver, or public) OR detected by platform monitoring
- Care Act 2014 safeguarding duty of care applies

**Success Outcome**: Safeguarding concern investigated, appropriate action taken (user warning, suspension, ban, external escalation to SAB/police), vulnerable adult protected, reporter notified (within confidentiality limits)
**Estimated Duration**: 1-4 hours (urgent concerns), 24-48 hours (standard concerns), 7-14 days (complex investigations requiring external escalation)

---

## Flow Diagram (ASCII)

```
[START: Safeguarding concern reported OR detected]
    |
    v
    /\
   /  \
  / How was concern identified? \
  \      /
   \    /
    \  /
     \/
    / | | \
   /  | |  \
User  Platform  External  Emergency
Report  Detection  Referral  Call
  |     |      |      |
  |     |      |      v
  |     |      |    [999 called during booking]
  |     |      |    [Emergency protocol activated]
  |     |      |    [Admin alerted IMMEDIATELY]
  |     |      |    [Skip to: CRITICAL severity]
  |     |      |        |
  |     |      |        +---------> [Continue below]
  |     |      |
  |     |      v
  |     |    [External source reports concern (email/phone)]
  |     |    [Admin manually creates incident record]
  |     |        |
  |     |        +---------> [Continue below]
  |     |
  |     v
  |   [Platform detection:]
  |   - Message flagged for safeguarding keywords (abuse, exploit, steal)
  |   - Low rating (1-2 stars) with concerning review text
  |   - Multiple user reports against same caregiver
  |   - Caregiver no-show pattern (vulnerable adult left without care)
  |        |
  |        v
  |   [Auto-create incident record]
  |   [Auto-assign to safeguarding officer queue]
  |        |
  |        +---------> [Continue below]
  |
  v
+-------------------+
| User Report:      |
| SCR-CR-020        |
| (future feature)  |
| OR                |
| Email/Phone Report|
+-------------------+
    |
    | [User clicks "Report Concern" button on:]
    | - Caregiver profile (SCR-CR-005)
    | - Booking detail screen (SCR-CR-008)
    | - Message thread (future)
    |
    | [User selects concern category:]
    | - [ ] Safety concern (e.g., unsafe conditions, fall risk)
    | - [ ] Suspected abuse (physical, emotional, sexual, financial)
    | - [ ] Financial exploitation (e.g., caregiver asks for cash payment)
    | - [ ] Professional conduct violation (e.g., intoxicated, inappropriate behavior)
    | - [ ] Neglect (e.g., caregiver did not provide agreed services)
    | - [ ] Other (free text)
    |
    | [User enters description (1000 chars max)]
    | [User uploads optional evidence (photos, documents, max 3 files, 5MB each)]
    |
    v
[User clicks "Submit Report"]
  |
  v
[Incident record created]
[Status: REPORTED]
[Timestamp logged]
[Reporter details captured (user_id, report_source)]
  |
  v
+-------------------+
| TRIAGE            |
| (Auto + Human)    |
+-------------------+
    |
    | [Auto-assign severity based on keywords:]
    | - CRITICAL keywords: "abuse", "hit", "struck", "sexual", "emergency", "danger", "threat"
    | - HIGH keywords: "steal", "money", "exploit", "neglect", "unsafe", "refuse"
    | - MEDIUM keywords: "concern", "worry", "uncomfortable", "unprofessional"
    | - LOW keywords: "late", "complaint", "rude"
    |
    v
    /\
   /  \
  / Severity auto-assigned \
  \      /
   \    /
    \  /
     \/
    / | | \
   /  | |  \
CRITICAL HIGH MEDIUM LOW
  |     |    |    |
  |     |    |    v
  |     |    |  [Assign to safeguarding queue]
  |     |    |  [SLA: Review within 7 days]
  |     |    |    |
  |     |    |    +---------> [Continue to safeguarding officer review]
  |     |    |
  |     |    v
  |     |  [Assign to safeguarding queue]
  |     |  [SLA: Review within 24 hours]
  |     |    |
  |     |    +---------> [Continue to safeguarding officer review]
  |     |
  |     v
  |   [Assign to safeguarding queue]
  |   [SLA: Review within 4 hours]
  |   [Email + SMS alert to safeguarding officer]
  |     |
  |     +---------> [Continue to safeguarding officer review]
  |
  v
[CRITICAL severity]
[IMMEDIATE alert: SMS + Phone call to safeguarding officer]
[SLA: Review within 1 hour]
  |
  v
+-------------------+
| Send Notification |
+-------------------+
    |
    | [Email safeguarding officer: "URGENT: Safeguarding concern reported"]
    | [SMS safeguarding officer: "URGENT safeguarding concern. Log in immediately."]
    | [Phone call (if CRITICAL): Auto-dial safeguarding officer on-call phone]
    |
    | [Email reporter (acknowledgement):]
    | "Thank you for reporting. Reference number: [ID]. We'll investigate and update you."
    |
    v
+-------------------+
| SCR-ADM-014       |
| Safeguarding      |
| Reports Queue     |
+-------------------+
    |
    | [Safeguarding officer logs in (2FA required)]
    | [Views queue:]
    | - CRITICAL incidents (RED, flashing, top of list)
    | - HIGH incidents (AMBER, urgent banner)
    | - MEDIUM incidents (YELLOW)
    | - LOW incidents (GREEN)
    |
    | [SLA indicators displayed:]
    | - CRITICAL: "57 minutes remaining" (1h SLA)
    | - HIGH: "3 hours remaining" (4h SLA)
    | - MEDIUM: "22 hours remaining" (24h SLA)
    | - LOW: "6 days remaining" (7d SLA)
    |
    v
[Safeguarding officer selects incident from queue]
  |
  v
+-------------------+
| SCR-ADM-015       |
| Safeguarding      |
| Incident Detail   |
+-------------------+
    |
    | [Display incident details:]
    | - Reporter: [Name/Role] (anonymized if external)
    | - Reported user: [Caregiver Name] OR [Care Receiver Name]
    | - Incident category: [Category selected by reporter]
    | - Description: [Full text]
    | - Evidence: [Uploaded files - view/download]
    | - Related booking: [Booking ID, date, status] (if applicable)
    | - User history: [Previous incidents, warnings, ratings]
    | - Timestamp: [When reported]
    | - Severity: [CRITICAL/HIGH/MEDIUM/LOW]
    | - SLA countdown: [Time remaining]
    |
    v
[Safeguarding officer reviews incident]
  |
  v
+-------------------+
| INVESTIGATION     |
+-------------------+
    |
    | [Safeguarding officer actions:]
    | 1. Review evidence (photos, messages, booking notes)
    | 2. Review reported user's full profile and history
    | 3. Check for pattern of behavior (other complaints, low ratings)
    | 4. Contact reporter for more details (if safe to do so)
    | 5. Review messages between care receiver and caregiver (if booking-related)
    | 6. Document investigation notes (timestamped audit trail)
    |
    v
[Safeguarding officer updates incident status]
[Status: INVESTIGATING]
  |
  v
[Safeguarding officer documents investigation notes]
[Notes logged: Timestamped, cannot be edited (audit trail)]
  |
  v
    /\
   /  \
  / Contact reported user? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  |     v
  |   [Skip to risk assessment]
  |     |
  |     +---------> [Continue below]
  |
  v
[Safeguarding officer contacts reported user]
[Methods: Phone call (preferred), email, in-app message]
  |
  v
  /\
 /  \
/ User responds? \
\      /
 \    /
  \  /
   \/
  / \
 /   \
Yes   No
|     |
|     v
|   [Log: "User did not respond after 3 contact attempts"]
|   [Proceed with investigation based on available evidence]
|     |
|     +---------> [Continue to risk assessment]
|
v
[Safeguarding officer documents user's response]
[Response logged in investigation notes]
  |
  v
+-------------------+
| RISK ASSESSMENT   |
+-------------------+
    |
    | [Safeguarding officer assesses risk to vulnerable adults:]
    | - Immediate danger? (e.g., abuse ongoing, pattern of exploitation)
    | - Pattern of behavior? (e.g., multiple complaints, previous warnings)
    | - Severity of incident? (e.g., physical harm, financial loss, emotional distress)
    | - Vulnerability of affected adult? (e.g., cognitive impairment, isolated, financially vulnerable)
    | - Evidence strength? (e.g., photos, witnesses, admission by reported user)
    |
    v
[Safeguarding officer selects risk level]
  |
  v
    /\
   /  \
  / Risk level? \
  \      /
   \    /
    \  /
     \/
    / | | \
   /  | |  \
Immediate  High  Medium  Low
Danger
  |     |    |    |
  |     |    |    v
  |     |    |  [No action OR User warning OR Monitoring]
  |     |    |    |
  |     |    |    +---------> [Continue to outcome]
  |     |    |
  |     |    v
  |     |  [Temporary suspension + Investigation + Possible ban]
  |     |    |
  |     |    +---------> [Continue to outcome]
  |     |
  |     v
  |   [Temporary suspension + External escalation (SAB) + Possible ban]
  |     |
  |     +---------> [Continue to outcome]
  |
  v
[IMMEDIATE DANGER]
[Escalate to emergency protocol]
  |
  v
+-------------------+
| IMMEDIATE DANGER  |
| PROTOCOL          |
+-------------------+
    |
    | [Safeguarding officer takes immediate action:]
    | 1. Call 999 if life-threatening (e.g., ongoing assault, medical emergency)
    | 2. Permanently ban reported user immediately (account locked, profile hidden)
    | 3. Contact local authority Safeguarding Adults Board (SAB) immediately
    | 4. Contact police if criminal act suspected (e.g., assault, theft, fraud)
    | 5. Contact affected vulnerable adult's emergency contact
    | 6. Document all actions taken (timestamped audit trail)
    |
    v
[Incident status: ESCALATED (EMERGENCY)]
[Reported user status: BANNED]
  |
  v
[Send notifications]
[Email banned user: "Account permanently banned. Serious safeguarding violation."]
[Email SAB: "Safeguarding concern escalated. Details: [X]. Contact: [Safeguarding Officer]"]
[Call affected adult's emergency contact: "Safeguarding concern. Your family member may be at risk."]
  |
  v
[Continue to outcome documentation]
  |
  +---------> [Skip to outcome]

+-------------------+
| HIGH RISK         |
| ESCALATION        |
+-------------------+
    |
    | [Safeguarding officer actions:]
    | 1. Temporarily suspend reported user (pending investigation)
    | 2. Contact local authority Safeguarding Adults Board (SAB) same day
    | 3. Complete SAB referral form (Section 42 enquiry)
    | 4. Document evidence (screenshots, messages, photos, witness statements)
    | 5. Notify affected vulnerable adult (if safe to do so)
    | 6. Monitor situation closely (daily check-ins)
    |
    v
+-------------------+
| SAB REFERRAL      |
+-------------------+
    |
    | [Safeguarding officer completes SAB referral form:]
    | - Adult at risk details: Name, DOB, address, capacity status
    | - Nature of concern: Abuse type, severity, evidence
    | - Alleged perpetrator: Name, relationship to adult, details
    | - Actions taken by platform: User suspension, investigation
    | - Contact details: Safeguarding officer name, email, phone
    |
    v
[Submit referral to local authority SAB]
[Methods: Email, online portal, phone call (followed by email)]
  |
  v
[SAB acknowledges receipt (within 24 hours)]
[SAB conducts Section 42 enquiry (if statutory threshold met)]
  |
  v
[Incident status: ESCALATED (SAB)]
[Reported user status: SUSPENDED (pending SAB outcome)]
  |
  v
[WAIT: SAB investigation (typically 1-4 weeks)]
  |
  v
[SAB provides outcome]
  |
  v
    /\
   /  \
  / SAB outcome? \
  \      /
   \    /
    \  /
     \/
    / | \
   /  |  \
Substantiated  Not Substantiated  No Further Action
  |      |       |
  |      |       v
  |      |     [SAB determines concern not substantiated OR no safeguarding issue]
  |      |     [Safeguarding officer reviews SAB report]
  |      |       |
  |      |       v
  |      |     [Reinstate reported user OR Issue warning (depending on evidence)]
  |      |       |
  |      |       +---------> [Continue to outcome]
  |      |
  |      v
  |    [SAB determines concern not substantiated]
  |    [Safeguarding officer reviews SAB report]
  |      |
  |      v
  |    [Reinstate reported user with apology]
  |    [Email user: "Investigation complete. No violation found. Account reinstated."]
  |      |
  |      +---------> [Continue to outcome]
  |
  v
[SAB confirms safeguarding violation]
[SAB provides recommendations (e.g., ban user, training, referral to police)]
  |
  v
[Safeguarding officer implements SAB recommendations]
  |
  v
    /\
   /  \
  / SAB recommendation? \
  \      /
   \    /
    \  /
     \/
    / | \
   /  |  \
Permanent  Temporary  Retraining
Ban        Ban        Required
  |     |      |
  |     |      v
  |     |    [Issue final warning + Retraining requirement]
  |     |    [User must complete safeguarding training before reinstatement]
  |     |      |
  |     |      +---------> [Continue to outcome]
  |     |
  |     v
  |   [Temporary ban (e.g., 30 days) + Monitoring]
  |   [User reinstated after ban period if no further incidents]
  |     |
  |     +---------> [Continue to outcome]
  |
  v
[Permanent ban]
[Account permanently terminated]
[Email user: "Account permanently banned following safeguarding investigation."]
  |
  v
[Continue to outcome]

+-------------------+
| MEDIUM/LOW RISK   |
| INTERNAL RESOLUTION|
+-------------------+
    |
    | [Safeguarding officer determines no external escalation needed]
    | [Investigation complete, evidence reviewed]
    |
    v
    /\
   /  \
  / Outcome? \
  \      /
   \    /
    \  /
     \/
    / | | \
   /  | |  \
No Action  Warning  Suspension  Ban
  |     |    |    |
  |     |    |    v
  |     |    |  [Permanent ban (platform decision)]
  |     |    |  [Reasons: Pattern of behavior, multiple violations, high risk]
  |     |    |    |
  |     |    |    +---------> [Continue to outcome]
  |     |    |
  |     |    v
  |     |  [Temporary suspension (7-30 days)]
  |     |  [User must appeal OR wait for ban period to end]
  |     |    |
  |     |    +---------> [Continue to outcome]
  |     |
  |     v
  |   [Issue formal warning]
  |   [Email user: "Formal warning. Violation: [X]. Future violations may result in suspension/ban."]
  |   [Warning logged on user profile (visible to admins)]
  |   [User status: ACTIVE (with warning flag)]
  |     |
  |     +---------> [Continue to outcome]
  |
  v
[No action required]
[Concern not substantiated OR minor issue resolved]
[Email reporter: "Investigation complete. No violation found OR issue resolved."]
[Log outcome for audit trail]
  |
  v
[Continue to outcome]

+-------------------+
| OUTCOME &         |
| DOCUMENTATION     |
+-------------------+
    |
    | [Safeguarding officer documents final outcome:]
    | - Outcome: [No action / Warning / Suspension / Ban / Escalated]
    | - Actions taken: [Summary of investigation and decisions]
    | - Evidence reviewed: [List of documents/messages/witness statements]
    | - Risk assessment: [Immediate danger / High / Medium / Low]
    | - SAB referral: [Yes / No] [If yes: SAB reference number, outcome]
    | - Police referral: [Yes / No] [If yes: crime reference number]
    | - Lessons learned: [Platform improvements, policy changes]
    | - Follow-up required: [Yes / No] [If yes: follow-up date and actions]
    |
    v
[Incident status: RESOLVED]
[Incident closed (cannot be reopened, preserved for audit trail)]
  |
  v
+-------------------+
| NOTIFICATIONS     |
+-------------------+
    |
    | [Send notifications to relevant parties:]
    |
    | [Reporter:]
    | "Investigation complete. Outcome: [Summary within confidentiality limits]. Thank you for reporting."
    |
    | [Reported user (if action taken):]
    | - Warning: "Formal warning issued. Violation: [X]. Future violations may result in suspension/ban."
    | - Suspension: "Account suspended for [X] days. Reason: [Y]. Appeal via [email]."
    | - Ban: "Account permanently banned. Reason: [Y]."
    |
    | [Affected vulnerable adult (if appropriate):]
    | "Safeguarding concern addressed. Outcome: [Summary]. Your safety is our priority."
    |
    | [SAB (if escalated):]
    | "Platform outcome: [Summary]. Actions taken: [X]. SAB reference: [Y]."
    |
    v
[Update admin dashboard]
[Remove incident from queue]
[Log completion time for SLA tracking]
  |
  v
+-------------------+
| FOLLOW-UP         |
| (if required)     |
+-------------------+
    |
    | [If follow-up required:]
    | - Monitor reported user for X days/weeks (pattern detection)
    | - Contact affected vulnerable adult for welfare check
    | - Review platform policies (e.g., update safeguarding policy)
    | - Update caregiver training materials (lessons learned)
    |
    v
[Set follow-up reminder]
[Safeguarding officer notified when follow-up due]
  |
  v
[Incident archived]
[Retained for 7 years (Care Act 2014 compliance)]
  |
  v
[END]
```

---

## Step-by-Step Narrative

| Step | Screen | Safeguarding Officer Action | System Response | Success Path | Error Path |
|------|--------|----------------------------|-----------------|--------------|------------|
| 1 | User Report / Platform Detection / External Referral | Incident reported OR system detects concern | Create incident record (status: REPORTED), timestamp logged | Auto-triage → Step 2 | N/A |
| 2 | Auto-Triage | System assigns severity based on keywords (CRITICAL/HIGH/MEDIUM/LOW) | Assign to safeguarding queue, set SLA timer, send notifications | Step 3 | N/A |
| 3 | Notification | System sends alert to safeguarding officer (email + SMS if CRITICAL, email if HIGH/MEDIUM/LOW) | Display notification in safeguarding officer inbox | Officer clicks notification → Step 4 | Officer misses notification → SLA breach alert |
| 4 | SCR-ADM-014 (Queue) | Officer logs in (2FA), views safeguarding queue (sorted by severity + SLA time remaining) | Display queue with color-coded severity indicators | Officer selects incident → Step 5 | N/A |
| 5 | SCR-ADM-015 (Detail) | Officer views incident details (reporter, reported user, category, description, evidence, user history) | Display full incident details | Officer begins investigation → Step 6 | N/A |
| 6 | Investigation | Officer reviews evidence, profile history, messages, booking notes, documents investigation notes | Log investigation notes (timestamped, audit trail) | Step 7 | N/A |
| 7 | Contact Reporter (optional) | Officer contacts reporter for more details (if safe and needed) | Log reporter response in investigation notes | Step 8 | Reporter does not respond → Log "No response" → Continue investigation |
| 8 | Contact Reported User (optional) | Officer contacts reported user for their side of story | Log user response in investigation notes | Step 9 | User does not respond → Log "No response" → Proceed with available evidence |
| 9 | Risk Assessment | Officer assesses risk level (Immediate Danger / High / Medium / Low) based on evidence and investigation | Update incident risk level | Step 10 | N/A |
| 10a | Immediate Danger Protocol | Officer calls 999 (if needed), bans user immediately, contacts SAB immediately, contacts police (if criminal), contacts emergency contact | Ban user (status: BANNED), escalate to SAB, log all actions | Skip to Step 13 (Outcome) | N/A |
| 10b | High Risk Escalation | Officer suspends user temporarily, contacts SAB same day, completes SAB referral form | Suspend user (status: SUSPENDED), create SAB referral, update incident status: ESCALATED (SAB) | Step 11 (SAB Referral) | N/A |
| 10c | Medium/Low Risk Resolution | Officer determines internal resolution (no external escalation), decides outcome (No Action / Warning / Suspension / Ban) | Update incident status, apply outcome to user account | Step 13 (Outcome) | N/A |
| 11 | SAB Referral | Officer completes SAB referral form (adult details, concern nature, evidence, actions taken), submits to local authority SAB | Submit referral (email/portal/phone), await SAB acknowledgement (within 24h) | Step 12 (Wait for SAB) | SAB does not respond within 24h → Officer follows up by phone |
| 12 | Wait for SAB Outcome | Officer waits for SAB investigation (1-4 weeks), may provide additional evidence if requested by SAB | Log SAB communications, monitor case progress | SAB provides outcome → Step 12a/12b/12c | SAB investigation exceeds 4 weeks → Officer requests status update |
| 12a | SAB: Substantiated | SAB confirms violation, provides recommendations (ban, training, police referral), officer implements recommendations | Implement SAB recommendations (ban user, issue warning, refer to police), log SAB outcome | Step 13 (Outcome) | N/A |
| 12b | SAB: Not Substantiated | SAB determines concern not substantiated, officer reviews SAB report, decides internal outcome | Reinstate user OR issue warning (depending on platform policy), log SAB outcome | Step 13 (Outcome) | N/A |
| 12c | SAB: No Further Action | SAB determines no safeguarding issue, officer reinstates user with apology | Reinstate user (status: ACTIVE), email apology, log SAB outcome | Step 13 (Outcome) | N/A |
| 13 | Outcome Documentation | Officer documents final outcome (actions taken, evidence, risk assessment, SAB referral, lessons learned) | Update incident status: RESOLVED, log completion timestamp | Step 14 (Notifications) | N/A |
| 14 | Notifications | System sends outcome notifications (reporter, reported user, affected adult, SAB if applicable) | Send emails with outcome summary (within confidentiality limits) | Step 15 (Dashboard Update) | N/A |
| 15 | Dashboard Update | System removes incident from queue, updates SLA compliance metrics | Dashboard reflects completed investigation | Step 16 (Follow-up if needed) OR END | N/A |
| 16 | Follow-Up (optional) | Officer sets follow-up reminder (monitor user, welfare check, policy review), system schedules reminder | Create follow-up task with due date | Follow-up completed → Incident archived → END | N/A |

---

## Decision Points

| Decision Point | Question | Yes Path | No Path |
|----------------|----------|----------|---------|
| Contact reporter? | Is it safe and necessary to contact reporter for more details? | Contact reporter (Step 7) | Skip to user contact or risk assessment (Step 8) |
| Reporter responds? | Does reporter provide additional information when contacted? | Log response, proceed with investigation | Log "No response", proceed with available evidence |
| Contact reported user? | Is it appropriate to get reported user's side of story? | Contact user (Step 8) | Skip to risk assessment (Step 9) - evidence sufficient or unsafe to contact |
| User responds? | Does reported user respond to inquiry? | Log response, proceed with investigation | Log "No response", proceed with available evidence |
| Risk level? | What is the assessed risk to vulnerable adults? | Immediate Danger (Step 10a) / High (Step 10b) / Medium/Low (Step 10c) | N/A |
| SAB outcome? | What did SAB conclude after investigation? | Substantiated (Step 12a) / Not Substantiated (Step 12b) / No Further Action (Step 12c) | N/A |
| Internal resolution outcome? | If no SAB escalation, what is platform outcome? | No Action / Warning / Suspension / Ban (Step 10c) | N/A |
| Follow-up required? | Does this case require ongoing monitoring or welfare checks? | Set follow-up reminder (Step 16) | Archive incident immediately (END) |

---

## Error Paths

| Error Scenario | Trigger | Safeguarding Officer Sees | Recovery Path |
|----------------|---------|--------------------------|---------------|
| SLA breach (urgent) | CRITICAL incident not reviewed within 1 hour | RED flashing alert, escalation email to senior safeguarding officer | Senior officer takes over, documents reason for delay |
| SLA breach (standard) | HIGH incident not reviewed within 4 hours | AMBER alert, escalation email to senior safeguarding officer | Senior officer reviews, documents reason for delay |
| Reporter does not respond | Officer contacts reporter 3 times, no response | Investigation note: "Reporter unresponsive. Proceeding with available evidence." | Proceed with investigation based on initial report + evidence |
| Reported user does not respond | Officer contacts user 3 times, no response | Investigation note: "User unresponsive. Proceeding with available evidence." | Proceed with investigation without user's statement |
| SAB does not acknowledge referral | SAB does not acknowledge within 24 hours | System alert: "SAB acknowledgement overdue" | Officer follows up by phone, documents contact |
| SAB investigation exceeds 4 weeks | SAB investigation ongoing > 4 weeks | System alert: "SAB investigation exceeds expected timeline" | Officer requests status update from SAB, documents delay |
| Evidence files corrupt or inaccessible | Officer cannot open uploaded evidence files | Error: "File corrupt or inaccessible. Contact reporter for re-upload." | Officer contacts reporter, requests evidence re-upload |
| Reported user appeals ban | Banned user submits appeal | Appeal notification in safeguarding officer inbox | Senior safeguarding officer reviews appeal, upholds ban OR overturns (rare) |
| Multiple incidents against same user | System detects 3+ incidents against same caregiver | Auto-alert: "Pattern detected: [User] has 3 open incidents. Review for permanent ban." | Officer reviews all incidents, makes consolidated decision (often: permanent ban) |
| Emergency contact unreachable | Officer tries to contact affected adult's emergency contact, no answer | Investigation note: "Emergency contact unreachable. Attempted 3 times." | Officer escalates to SAB for welfare check by local authority |

---

## Data Captured Per Step

| Step | Data Input | Validation Rules | Where Stored |
|------|------------|------------------|--------------|
| 1 | Incident category | Required, dropdown selection | safeguarding_incidents.category |
| 1 | Description | Required, 1000 chars max | safeguarding_incidents.description |
| 1 | Evidence uploads | Optional, max 3 files, 5MB each, JPG/PNG/PDF | safeguarding_incidents.evidence_urls (array) |
| 1 | Reporter details | Auto-captured (user_id, IP, timestamp) | safeguarding_incidents.reporter_user_id, safeguarding_incidents.reported_at |
| 1 | Reported user | Auto-captured OR manually entered | safeguarding_incidents.reported_user_id |
| 2 | Auto-assigned severity | System-assigned based on keywords | safeguarding_incidents.severity |
| 6 | Investigation notes | Timestamped, cannot be edited (audit trail) | safeguarding_incident_notes.note_text, safeguarding_incident_notes.created_at, safeguarding_incident_notes.officer_id |
| 7 | Reporter response | Logged in investigation notes | safeguarding_incident_notes.note_text |
| 8 | Reported user response | Logged in investigation notes | safeguarding_incident_notes.note_text |
| 9 | Risk assessment | Immediate Danger / High / Medium / Low | safeguarding_incidents.risk_level |
| 10a | Immediate actions taken | Free text summary | safeguarding_incidents.actions_taken |
| 11 | SAB referral form | Structured data (adult details, concern, evidence, actions) | safeguarding_incidents.sab_referral_form (JSON), safeguarding_incidents.sab_reference_number |
| 12 | SAB outcome | Substantiated / Not Substantiated / NFA + SAB recommendations | safeguarding_incidents.sab_outcome, safeguarding_incidents.sab_recommendations |
| 13 | Final outcome | No Action / Warning / Suspension / Ban / Escalated | safeguarding_incidents.outcome, safeguarding_incidents.resolved_at |
| 13 | Lessons learned | Free text (platform improvements, policy changes) | safeguarding_incidents.lessons_learned |
| 16 | Follow-up task | Due date, action required | safeguarding_incidents.follow_up_due_date, safeguarding_incidents.follow_up_actions |

---

## Notifications Triggered

| Step | Notification Type | Recipient | Content Summary | Trigger |
|------|-------------------|-----------|-----------------|---------|
| 1 | Email (Acknowledgement) | Reporter | "Thank you for reporting. Reference: [ID]. We'll investigate and update you (within confidentiality limits)." | Incident reported |
| 2 (CRITICAL) | SMS + Phone Call | Safeguarding Officer (on-call) | "URGENT safeguarding concern. Log in immediately. Reference: [ID]" | CRITICAL severity assigned |
| 2 (HIGH) | Email + SMS | Safeguarding Officer | "HIGH priority safeguarding concern. Review within 4 hours. Reference: [ID]" | HIGH severity assigned |
| 2 (MEDIUM/LOW) | Email | Safeguarding Officer | "Safeguarding concern reported. Review within [SLA]. Reference: [ID]" | MEDIUM/LOW severity assigned |
| 10a | Email | Banned User | "Account permanently banned due to serious safeguarding violation. Decision is final." | Immediate ban |
| 10a | Email | SAB | "URGENT: Safeguarding concern escalated. Immediate danger to vulnerable adult. Details: [X]" | Immediate SAB escalation |
| 10a | Phone Call | Emergency Contact | "Safeguarding concern regarding your family member. They may be at risk. Contact us urgently." | Immediate danger protocol |
| 10b | Email | Suspended User | "Account temporarily suspended pending safeguarding investigation. You'll be updated when investigation complete." | Temporary suspension |
| 10b | Email | SAB | "Safeguarding concern referral. Details: [X]. SAB reference: [Y]. Contact: [Officer]" | SAB referral submitted |
| 10c | Email | Warned User | "Formal warning issued. Violation: [X]. Future violations may result in suspension/ban." | Warning issued |
| 12 | Email | Safeguarding Officer | "SAB investigation complete. Outcome: [X]. Reference: [Y]" | SAB provides outcome |
| 14 | Email | Reporter | "Investigation complete. Outcome: [Summary within confidentiality limits]. Thank you for reporting." | Incident resolved |
| 14 | Email | Reported User (if action taken) | Outcome-specific message (warning, suspension, ban) | Incident resolved with action |
| 14 | Email | Affected Adult (if appropriate) | "Safeguarding concern addressed. Outcome: [Summary]. Your safety is our priority." | Incident resolved |

---

## Edge Cases & Alternative Paths

### Edge Case 1: Reporter is Anonymous (External Source)
**Trigger**: Concern reported via anonymous email or phone call
**System Behavior**:
- Safeguarding officer manually creates incident record
- Reporter details: "External (anonymous)"
- Cannot send acknowledgement email (no email address)
- Investigation proceeds as normal, outcome notification sent to SAB/police if escalated (no reporter to notify)

### Edge Case 2: Multiple Incidents Against Same User Reported Simultaneously
**Trigger**: 3 different care receivers report same caregiver within 24 hours
**System Behavior**:
- System auto-detects pattern: "Multiple incidents against [Caregiver Name]. Pattern alert."
- Auto-escalate all 3 incidents to HIGH severity (even if individually MEDIUM/LOW)
- Safeguarding officer reviews all 3 incidents together, makes consolidated decision
- Typical outcome: Permanent ban (pattern of behavior indicates high risk)

### Edge Case 3: Reported User Deletes Account During Investigation
**Trigger**: Caregiver realizes they're being investigated, deletes account (GDPR right to erasure)
**System Behavior**:
- Account deletion request BLOCKED if safeguarding investigation ongoing (legal hold per GDPR Article 17(3)(e) - legal defense)
- User sees: "Account deletion request on hold pending investigation. Contact support."
- Investigation proceeds, outcome logged, THEN account deleted (if appropriate) after investigation complete

### Edge Case 4: SAB Requests More Evidence Mid-Investigation
**Trigger**: SAB contacts safeguarding officer: "Need more evidence to proceed with Section 42 enquiry"
**System Behavior**:
- Officer updates incident status: "Awaiting evidence for SAB"
- Officer contacts reporter, other users, reviews more messages/bookings
- Officer submits additional evidence to SAB, documents in investigation notes
- SAB resumes investigation with new evidence

### Edge Case 5: Police Investigation Opened (Criminal Act)
**Trigger**: Safeguarding officer identifies criminal act (assault, theft, fraud), refers to police
**System Behavior**:
- Officer logs police referral (crime reference number)
- Account suspension continues until police investigation complete
- Platform cooperates with police (provides evidence, user data, messages)
- Police outcome determines platform outcome (ban if convicted, reinstate if acquitted)

### Edge Case 6: Affected Vulnerable Adult Refuses Help
**Trigger**: Safeguarding officer contacts affected care receiver, they say "I'm fine, no problem"
**System Behavior**:
- Officer documents: "Adult declined intervention"
- Officer assesses capacity: Can adult make informed decision?
- If capacity concerns → Escalate to SAB for capacity assessment + best interests decision
- If capacity intact → Respect adult's decision BUT continue to monitor situation

### Edge Case 7: Caregiver Claims False Accusation
**Trigger**: Reported caregiver responds: "This is false. Care receiver is making it up."
**System Behavior**:
- Officer documents caregiver's denial
- Officer reviews evidence objectively (messages, photos, witness statements, pattern of behavior)
- If evidence weak + pattern absent → Outcome: "Not substantiated"
- If evidence strong OR pattern present → Outcome: Warning, suspension, or ban (despite denial)

### Edge Case 8: Care Receiver Has Dementia (Unreliable Reporter)
**Trigger**: Care receiver reports concern, but booking notes indicate advanced dementia
**System Behavior**:
- Officer considers cognitive impairment (may affect reliability of report)
- Officer seeks corroborating evidence (messages, caregiver notes, family input)
- If corroborated → Proceed with investigation
- If uncorroborated + no pattern → Outcome: "Insufficient evidence" (but log for pattern detection)

### Edge Case 9: Safeguarding Officer Has Conflict of Interest
**Trigger**: Officer realizes they know reported user personally (family friend, colleague)
**System Behavior**:
- Officer declares conflict of interest, recuses themselves
- Incident reassigned to different safeguarding officer (or senior officer)
- Original officer's investigation notes preserved, but new officer makes final decision

### Edge Case 10: Media Inquiry About Safeguarding Incident
**Trigger**: Journalist contacts platform: "We heard about a safeguarding incident. Can you comment?"
**System Behavior**:
- Safeguarding officer does NOT comment (GDPR confidentiality)
- Incident escalated to senior management + legal counsel
- Platform issues generic statement: "We take safeguarding seriously. All concerns are investigated. We cannot comment on individual cases."

---

## Compliance & Safeguarding Checkpoints

### Care Act 2014 (Section 42 - Safeguarding Duties)

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| Duty to report concerns | Platform provides "Report Concern" button + email/phone reporting | Step 1 (User Report) |
| Duty to investigate | Safeguarding officer investigates all concerns (evidence review, user contact, risk assessment) | Step 6-9 (Investigation) |
| Duty to take action | Officer takes appropriate action (warning, suspension, ban, SAB escalation) | Step 10 (Risk Assessment + Action) |
| Section 42 enquiry threshold | If adult at risk + abuse suspected + unable to protect themselves → SAB referral required | Step 10b (SAB Referral) |
| Duty to cooperate with SAB | Platform provides evidence, user data, ongoing cooperation with SAB investigations | Step 11-12 (SAB Process) |
| Safeguarding Adults Review (SAR) | If serious case (death, serious harm) → Platform participates in SAR | Step 10a (Immediate Danger) + SAR participation |

### GDPR (Data Protection in Safeguarding Context)

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| Lawful basis for processing | Vital interests (Article 6(1)(d)) - protection of vulnerable adult's life or safety | Step 1 (Incident creation) |
| No consent required | Safeguarding processing does NOT require consent (vital interests + legal obligation) | Throughout |
| Data sharing with SAB/police | Legal basis: Legal obligation (Article 6(1)(c)) + vital interests | Step 10a-10b (External escalation) |
| Right to erasure exception | Account deletion blocked during safeguarding investigation (Article 17(3)(e) - legal defense) | Edge Case 3 (Deletion blocked) |
| Data retention | Safeguarding incident records retained for 7 years (Care Act 2014 compliance) | Step 16 (Archive for 7 years) |
| Confidentiality | Reporter and affected adult identities protected (only disclosed to SAB/police if required) | Step 14 (Notifications - confidentiality limits) |

### Safeguarding Adults Boards (Care Act 2014 Section 43)

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| SAB contact maintained | Platform maintains contact list of local authority SABs (by region) | Step 10b (SAB Referral) |
| SAB referral process | Structured referral form (adult details, concern, evidence, actions taken) | Step 11 (SAB Referral Form) |
| SAB cooperation | Platform provides ongoing cooperation (evidence, updates, participation in enquiries) | Step 12 (SAB Investigation) |
| SAB recommendations | Platform implements SAB recommendations (ban, training, policy changes) | Step 12a (Implement recommendations) |
| Safeguarding Adult Reviews (SARs) | If serious case → Platform participates in multi-agency SAR | Step 10a (Immediate Danger) + SAR participation |

### Police Referral (Criminal Acts)

| Requirement | Implementation | Flow Stage |
|-------------|----------------|-----------|
| Mandatory police referral | If criminal act suspected (assault, theft, fraud, sexual offence) → Police must be contacted | Step 10a (Police Referral) |
| Crime reference number | Police provide crime reference number, officer logs in incident record | Step 10a (Police Referral) |
| Evidence preservation | Platform preserves evidence (messages, photos, booking data) for police investigation | Step 6 (Investigation) + Legal hold |
| Cooperation with police | Platform provides evidence, user data, witness statements to police | Throughout police investigation |

---

## Success Metrics

| Metric | Target | Measurement Point |
|--------|--------|------------------|
| SLA compliance rate (CRITICAL) | 95% (reviewed within 1 hour) | Step 2 (Triage) → Step 4 (Officer review) |
| SLA compliance rate (HIGH) | 90% (reviewed within 4 hours) | Step 2 (Triage) → Step 4 (Officer review) |
| SLA compliance rate (MEDIUM) | 85% (reviewed within 24 hours) | Step 2 (Triage) → Step 4 (Officer review) |
| SLA compliance rate (LOW) | 80% (reviewed within 7 days) | Step 2 (Triage) → Step 4 (Officer review) |
| Average investigation time (CRITICAL) | < 4 hours (report to outcome) | Step 1 → Step 13 (Outcome) |
| Average investigation time (HIGH) | < 3 days (report to outcome) | Step 1 → Step 13 (Outcome) |
| Average investigation time (MEDIUM/LOW) | < 7 days (report to outcome) | Step 1 → Step 13 (Outcome) |
| SAB escalation rate | 10-15% (of all incidents escalated to SAB) | Step 10b (SAB Referral) / Total incidents |
| Permanent ban rate | 5-10% (of all incidents result in permanent ban) | Step 10a (Immediate Ban) + Step 12a (SAB Ban) / Total incidents |
| Reporter satisfaction | 80% (reporters satisfied with outcome communication) | Post-resolution survey (Step 14) |
| Pattern detection rate | 70% (of serious incidents detected via pattern analysis) | Edge Case 2 (Multiple incidents) |

---

## Product Gaps Identified

### GAP 1: User-Facing Safeguarding Report Screen Not in R0
**Issue**: Step 1 shows SCR-CR-020 (User Report Screen), but deferred from R0
**Current R0 Solution**: "Report Concern" button opens email template (mailto: safeguarding@icare.com) OR phone number
**Impact**: Higher friction, lower report rate, no structured data capture
**Recommendation**: Prioritize SCR-CR-020 for R1 (essential for safeguarding compliance at scale)

### GAP 2: Pattern Detection Algorithm Not Implemented
**Issue**: Edge Case 2 mentions auto-detection of multiple incidents against same user, but algorithm not documented
**Recommendation**: Implement background job (runs daily): Query safeguarding_incidents for users with 2+ open incidents, auto-escalate + alert officer

### GAP 3: SAB Contact Database Not Documented
**Issue**: Step 10b mentions "local authority SAB contact list" but no database documented
**Recommendation**: Create SAB contact database (safeguarding_adults_boards table): Region, SAB name, email, phone, online portal URL, update quarterly

### GAP 4: Safeguarding Officer On-Call Rotation Not Documented
**Issue**: CRITICAL incidents require immediate phone call, but no on-call rotation system documented
**Recommendation**: Document on-call rotation (weekly schedule), integrate with phone system (auto-dial on-call officer for CRITICAL incidents)

### GAP 5: Follow-Up Reminder System Not Implemented
**Issue**: Step 16 mentions follow-up reminders, but no reminder system documented
**Recommendation**: Implement reminder system (safeguarding_follow_ups table): Create follow-up task with due date, email officer when due, mark complete when actioned

### GAP 6: Safeguarding Dashboard (Analytics) Not Implemented
**Issue**: No visibility into safeguarding trends (incident volume, categories, outcomes, SLA compliance)
**Recommendation**: Create SCR-ADM-016: Safeguarding Analytics Dashboard (incidents per week, SLA compliance %, outcomes breakdown, pattern alerts)

### GAP 7: Reporter Feedback Loop Not Implemented
**Issue**: Step 14 mentions outcome notification to reporter, but no feedback mechanism documented
**Recommendation**: Add "Was this helpful?" survey link in outcome email (3-question survey: satisfied with response time, outcome communication, would report again?)

---

## Next Steps for Engineering

### Frontend Implementation
1. Build safeguarding reports queue screen (SCR-ADM-014) with color-coded severity + SLA indicators
2. Build safeguarding incident detail screen (SCR-ADM-015) with evidence viewer, investigation notes, risk assessment
3. Build investigation notes editor (timestamped, cannot edit after save - audit trail)
4. Build risk assessment form (dropdown: Immediate Danger / High / Medium / Low)
5. Build SAB referral form (structured fields: adult details, concern nature, evidence, actions)
6. Build outcome documentation form (outcome, actions taken, lessons learned, follow-up required)
7. Build user-facing safeguarding report screen (SCR-CR-020) with category dropdown, description, evidence upload (R1)

### Backend Implementation
1. Safeguarding incident creation API (auto-triage, assign severity, send notifications)
2. Keyword-based severity assignment algorithm (CRITICAL/HIGH/MEDIUM/LOW)
3. Investigation notes API (create note, fetch notes, enforce immutability - audit trail)
4. Risk assessment API (update risk level, trigger escalation workflows)
5. User suspension/ban API (update user status, invalidate sessions, hide profile, send notifications)
6. SAB referral API (create referral record, send email/portal submission, log SAB response)
7. Pattern detection background job (query incidents by reported_user_id, auto-escalate if 2+ open incidents)
8. SLA monitoring background job (check SLA timers, send breach alerts, escalate to senior officer)
9. Follow-up reminder system (create follow-up task, schedule reminder email, mark complete)
10. CRITICAL incident phone call system (integrate with Twilio - auto-dial on-call officer)

### QA Test Cases
1. Happy path: User reports concern → Officer investigates → Internal resolution (warning) → Outcome notification (end-to-end)
2. High-risk path: User reports abuse → Officer escalates to SAB → SAB investigation → Ban user → Outcome notification
3. Immediate danger path: 999 called during booking → Emergency protocol → Immediate ban → SAB + police notified
4. SLA breach: CRITICAL incident not reviewed within 1 hour → Auto-escalate to senior officer → Senior reviews
5. Pattern detection: 3 reports against same caregiver → Auto-escalate to HIGH → Officer reviews all 3 incidents
6. SAB referral: Officer completes SAB form → Submit to SAB → Wait for outcome → Implement recommendations
7. Account deletion blocked: User tries to delete account during investigation → Show error: "Deletion on hold pending investigation"
8. Multiple incidents: Officer reviews multiple open incidents against same user → Consolidated decision (ban)
9. Accessibility: Keyboard navigation, screen reader support (WCAG 2.1 AA)
10. Performance: Incident detail load < 2 sec, evidence file display < 3 sec

---

**Document Status**: COMPLETE
**Last Updated**: 2026-02-02
**Version**: 1.0
**Source Documents**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`
- `/docs/tiers/tier1/draft-design-specs/route-map.md`
- `/docs/tiers/common/spec/state-maps.md` (Safeguarding Incident Flow)
- `/docs/tiers/tier1/TIER1_COMPREHENSIVE_ANALYSIS.md` (Journey 5)
- `/docs/compliance/legal-framework.md` (Care Act 2014, GDPR, Safeguarding requirements)
