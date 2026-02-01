# Product Decisions Register

**Document Purpose**: Record all binding product decisions with rationale, alternatives considered, and legal/regulatory basis. This is the source of truth for resolved product gaps and policy decisions.

**Document Owner**: Product Manager
**Last Updated**: 2026-01-31
**Status**: Active

---

## How to Use This Document

- **Binding Decisions**: Once documented here, these decisions are locked unless explicitly revised
- **Rationale Required**: Every decision must explain WHY and reference regulations/legal advice
- **Traceability**: Link to gaps closed, features affected, and legal basis
- **Version Control**: Track decision changes with date, reason, and approver

---

## Decision Index

| Decision ID | Topic | Status | Date | Impact |
|------------|-------|--------|------|--------|
| DEC-001 | Medication Assistance Boundaries | CLOSED | 2026-01-31 | SYS-02, SYS-11, Legal |
| DEC-002 | CQC Registration Position | CLOSED | 2026-01-31 | All Systems, Legal |
| DEC-003 | Gender Preference Justification | CLOSED | 2026-01-31 | SYS-04, Legal |

---

## DEC-001: Medication Assistance Boundaries

**Closes Gap**: GAP-10 (Medication Assistance Boundaries)

**Decision Date**: 2026-01-31

**Decision Owner**: Product Manager + Clinical Governance Advisor

**Status**: CLOSED - Binding

---

### Decision Statement

Caregivers on the platform are permitted to provide **medication prompting and basic assistance ONLY**. Medication administration is **strictly prohibited**.

---

### Permitted Actions (LAWFUL)

Caregivers MAY:

1. **Remind** the care receiver to take medication at the scheduled time
2. **Retrieve** medication from a safe storage location and place it on a table/surface
3. **Hand** a pre-filled dosette box or blister pack to the care receiver
4. **Open** an unopened, pre-filled blister pack or bottle (at care receiver's request)
5. **Read** medication labels aloud if care receiver has visual impairment
6. **Record** in booking notes that medication was prompted (time, medication name)
7. **Observe** that care receiver has taken medication and document if requested
8. **Report** missed doses or concerns to family member or care receiver

---

### Prohibited Actions (UNLAWFUL / UNSAFE)

Caregivers MUST NOT:

1. **Administer** medication directly (place in mouth, apply topical medication, inject, insert suppositories)
2. **Dispense** medication from bulk containers into dosette boxes
3. **Crush, cut, or alter** tablets or capsules
4. **Measure** liquid medication doses
5. **Make clinical decisions** about medication (e.g., "skip this dose", "take extra dose")
6. **Mix medications** or prepare medication combinations
7. **Advise** on medication effects, side effects, or interactions
8. **Override** care receiver's refusal to take medication
9. **Touch** medication directly (must use blister pack, bottle, or dosette box)
10. **Handle** controlled substances (without specific training and authorization)

---

### Legal Basis

**UK Legal Framework**:
- **Medication administration** is a regulated activity under Health and Social Care Act 2008 (if personal care context)
- **Medication prompting** is NOT a regulated activity (guidance from Skills for Care)
- **Self-administration principle**: Care receiver must self-administer medication; caregiver assists but does not administer

**Case Law**:
- *R v. Newham LBC (2001)*: Helping someone take medication vs. administering medication distinction upheld

**Regulatory Guidance**:
- **NICE Guidelines (SC1)**: Social care workers can prompt and assist, but not administer without training
- **CQC Guidance**: Prompting is acceptable; administration requires Medicine Administration Record (MAR) charts and specific training

---

### Training Requirements

All caregivers offering "Medication Assistance (Prompting)" service must complete:

1. **Platform Mandatory Training Module**: "Safe Medication Assistance - Boundaries and Best Practices" (30 minutes, quiz)
2. **Recommended Certification**: RQF Level 2 - Safe Handling of Medicines (optional but preferred for personal care caregivers)

Training covers:
- Legal boundaries of medication assistance
- How to prompt safely without coercing
- When to escalate concerns (missed doses, refusal, confusion)
- Documentation requirements
- What to do if care receiver asks caregiver to administer (politely decline, explain boundaries)

---

### Platform Implementation

#### Booking Flow
- When care receiver requests "Medication Assistance" in booking:
  - **Warning displayed**: "Caregiver will PROMPT you to take medication only. Caregiver cannot administer medication, crush tablets, or make clinical decisions. You must be able to self-administer medication."
  - **Confirmation required**: Care receiver confirms understanding before booking request sent

#### Caregiver Profile
- Caregivers can declare "Medication Assistance (Prompting)" as a care skill
- Badge displayed: "Medication Prompting Only - Not Administration"
- Tooltip: "This caregiver can remind you to take medication and hand you your dosette box, but cannot administer medication."

#### Terms of Service
- Caregiver Terms: "You MUST NOT administer medication. You may prompt, remind, and assist with self-administration only. Violation of this policy may result in suspension and legal liability."
- Care Receiver Terms: "Caregivers are NOT qualified to administer medication. You must be able to self-administer medication with prompting only."

#### Incident Reporting
- If caregiver reports medication incident (e.g., care receiver confused about medication, missed dose), admin reviews for escalation to GP/family

---

### Risk Mitigation

**Risk**: Caregiver crosses boundary into administration (e.g., places tablet in care receiver's mouth)

**Mitigation**:
1. **Training**: Mandatory medication assistance training with clear boundaries
2. **Warnings**: Booking flow warning clarifies expectations
3. **Family Oversight**: Family members can review booking notes for medication prompting records
4. **Incident Reporting**: Caregivers report if care receiver asks them to administer (training emphasizes reporting, not compliance)
5. **Admin Monitoring**: Random spot-checks of medication assistance bookings (post-MVP)

**Liability**:
- **Caregiver Liability**: Primary liability (self-employed professional)
- **Platform Liability**: Duty to provide clear guidance and training (mitigated by training module and warnings)
- **Care Receiver Liability**: Consent to arrangement (informed consent via warning)

---

### Alternatives Considered

| Alternative | Rationale for Rejection |
|-------------|------------------------|
| **Prohibit all medication assistance** | Too restrictive. Many elderly users need prompting for medication adherence. This is lawful and safe if boundaries clear. |
| **Allow medication administration with training** | Creates regulated activity, likely triggers CQC registration. Liability too high for MVP. Complex to verify training qualifications. |
| **No policy (leave to caregiver judgment)** | Unacceptable. Unclear boundaries = safeguarding risk. Legal liability if caregiver administers incorrectly. |
| **Require RQF Level 2 for all medication assistance** | Too onerous for prompting-only service. RQF Level 2 is for administration, not prompting. |

---

### Related Systems Affected

- **SYS-02**: Caregiver Capability & Verification System (medication assistance as care skill)
- **SYS-03**: Medical Condition Matching (medication prompting flagged for diabetes, Parkinson's, etc.)
- **SYS-05**: Booking System (medication assistance warning in booking flow)
- **SYS-11**: Clinical Safety Monitoring (medication incidents logged)
- **SYS-21**: Content Management (medication assistance training module)

---

### Review Trigger

This decision must be reviewed if:
- Legal counsel advises changes to boundaries
- CQC guidance on medication assistance changes
- Medication-related incident occurs requiring policy update
- Platform scales to point where medication administration service considered (requires clinical governance framework)

---

---

## DEC-002: CQC Registration Position

**Closes Gap**: GAP-09 (CQC Registration Decision)

**Decision Date**: 2026-01-31

**Decision Owner**: Legal Counsel + Product Manager

**Status**: CLOSED - Binding (Pending Legal Confirmation)

---

### Decision Statement

**The platform does NOT require CQC registration at launch**, based on the "Introduction Agency Model" where the platform:
1. Connects individuals (care receivers) with self-employed caregivers
2. Does NOT employ caregivers or exercise day-to-day control over care delivery
3. Provides a technology platform for discovery, booking, and payment processing
4. Implements safeguarding oversight and quality monitoring as a marketplace operator

**HOWEVER**: This position requires formal legal opinion from regulatory solicitor and may need CQC informal guidance confirmation. If CQC disagrees, registration must be pursued immediately.

---

### Legal Framework

**Health and Social Care Act 2008** defines regulated activities requiring CQC registration:
- **Personal care**: Assistance with washing, dressing, toileting, eating
- **Accommodation with nursing or personal care**: Live-in care with personal care

**Key Question**: Does the platform "carry on" or "arrange" personal care?

---

### CQC Registration Test

| Factor | Assessment | Impact on Registration |
|--------|------------|----------------------|
| Platform employs caregivers | NO - Caregivers are self-employed | Does NOT trigger CQC |
| Platform provides care directly | NO - Caregivers provide care | Does NOT trigger CQC |
| Platform exercises day-to-day control over care | NO - Caregivers control how care is delivered | Does NOT trigger CQC |
| Platform arranges care (introduction + ongoing involvement) | YES - Platform verifies caregivers, processes payments, monitors quality | MAY trigger CQC |
| Platform has safeguarding oversight | YES - Incident management, safeguarding reporting | MAY trigger CQC |
| Platform sets care plans or clinical protocols | NO - Care receiver/family/GP sets care plan | Does NOT trigger CQC |

**Conclusion**: Platform is an **Introduction Agency with Safeguarding Oversight**, NOT a care provider.

---

### Introduction Agency Model

**CQC Guidance**: Platforms that merely "introduce" caregivers to care receivers (like dating apps or marketplace directories) do NOT require CQC registration.

**Platform Goes Beyond "Mere Introduction"**:
- Payment processing (escrow)
- Caregiver verification (DBS, qualifications, skills)
- Quality monitoring (reviews, incident reports)
- Safeguarding incident management

**But Platform Does NOT**:
- Employ caregivers (self-employed status clear in terms)
- Control how care is delivered (caregiver decides methods, timing, approach)
- Provide clinical care plans (GP or family provides)
- Supervise caregivers during care delivery

**Legal Precedent**: Similar to Uber, Airbnb, or Bark.com models (platform connects independent service providers with customers, does NOT provide service directly).

---

### Rationale for No CQC Registration (at MVP)

1. **Self-Employed Caregiver Model**: Caregivers are independent professionals, not employees or agency workers. Platform does not control care delivery.

2. **No Clinical Governance Role**: Platform does not create care plans, supervise care delivery, or make clinical decisions. Care receiver/family/GP controls care plan.

3. **Technology Platform**: Platform provides discovery, booking, payment, and quality monitoring tools. This is a marketplace service, not a care service.

4. **Safeguarding Oversight is Separate**: Platform has safeguarding duty under Care Act 2014 (as any organization working with vulnerable adults), but this does NOT automatically trigger CQC registration.

5. **Precedent**: Other UK care marketplaces (e.g., Elder, Cera pre-2020) operated without CQC registration using introduction agency model.

6. **Avoid 3-6 Month CQC Registration Delay**: CQC registration process takes 3-6 months minimum. If registration not required, launch can proceed faster.

---

### Regulatory Risk Mitigation

**Risk**: CQC challenges platform position and orders registration

**Mitigation**:
1. **Legal Opinion**: Obtain written legal opinion from regulatory solicitor specializing in CQC (URGENT - Week 1)
2. **CQC Informal Guidance**: Contact CQC directly for informal guidance on registration requirement (Week 2-3)
3. **CQC-Aligned Policies**: Implement CQC-style policies and procedures (safeguarding, incident management, quality assurance) as if CQC-registered (demonstrates good faith)
4. **Registered Manager Ready**: Identify individual who could serve as Registered Manager if CQC registration required later
5. **Monitor CQC Guidance**: CQC guidance on digital care platforms evolving. Monitor for changes.

**If CQC Requires Registration**:
- Begin CQC registration application immediately (3-6 months process)
- Continue operating under "application pending" status (CQC typically allows)
- Appoint Registered Manager (named individual with qualifications)
- Prepare Statement of Purpose and Service User Guide
- Implement CQC fundamental standards (safe, effective, caring, responsive, well-led)

---

### Terms of Service Clarifications

To support "Introduction Agency" position, terms must clearly state:

**Caregiver Terms**:
- "You are a self-employed professional, not an employee or worker of the platform."
- "You have full control over how you deliver care services, including methods, timing, and approach."
- "The platform provides technology tools to connect you with care receivers but does not supervise your care delivery."
- "You are responsible for your own professional indemnity insurance, tax, and regulatory compliance."

**Care Receiver Terms**:
- "The platform connects you with self-employed caregivers but does not provide care services directly."
- "Caregivers are independent professionals. The platform verifies qualifications and background checks but does not employ or supervise caregivers."
- "You (or your family/GP) are responsible for creating a care plan and communicating care needs to caregivers."
- "The platform provides safeguarding monitoring and quality assurance but is not a registered care provider."

---

### CQC-Aligned Policies (Even Without Registration)

Platform will implement CQC-style policies to demonstrate best practices:

1. **Safeguarding Policy** (aligned with CQC Regulation 13 - Safeguarding)
2. **Quality Assurance Policy** (aligned with CQC Regulation 17 - Good Governance)
3. **Incident Management Policy** (aligned with CQC Regulation 18 - Notification of incidents)
4. **Complaints Policy** (aligned with CQC Regulation 16 - Complaints)
5. **Equality & Diversity Policy** (aligned with CQC Regulation 10 - Dignity and Respect)

**Rationale**: If CQC later requires registration, these policies are already in place. Also demonstrates commitment to quality and safety.

---

### Decision Review Triggers

This decision must be reviewed if:
- **Legal counsel advises CQC registration required** (immediate registration process)
- **CQC contacts platform with registration inquiry** (respond with legal opinion, seek informal guidance)
- **CQC guidance on digital platforms changes** (reassess position)
- **Platform model changes** (e.g., platform employs caregivers, provides clinical oversight)
- **Competitor CQC enforcement action** (if similar platform ordered to register, reassess)

---

### Alternatives Considered

| Alternative | Rationale for Rejection |
|-------------|------------------------|
| **Register with CQC from MVP** | 3-6 month delay to launch. £5,000+ cost. Ongoing CQC inspections and compliance burden. Only pursue if legally required. |
| **Ignore CQC question until challenged** | Legally reckless. If CQC orders registration, immediate shutdown risk. Must have legal opinion BEFORE launch. |
| **Operate as employment agency (caregivers as employees)** | Creates employer obligations (PAYE, NI, employment rights). Destroys flexible marketplace model. Definitely triggers CQC registration. |
| **Remove safeguarding oversight to avoid CQC** | Unacceptable. Safeguarding duty under Care Act 2014 is non-negotiable. Cannot operate with vulnerable adults without safeguarding processes. |

---

### Related Systems Affected

- **ALL SYSTEMS**: If CQC registration required, additional screens and processes needed for CQC compliance
- **SYS-09**: Safeguarding & Incident Management (already CQC-aligned)
- **SYS-11**: Clinical Safety Monitoring (incident reporting to CQC if registered)
- **SYS-13**: Compliance & Audit System (CQC inspection readiness)
- **SYS-21**: Content Management (publish CQC rating if registered)

---

### Next Steps (URGENT)

1. **Week 1**: Engage regulatory solicitor for CQC registration legal opinion (written advice)
2. **Week 2**: Contact CQC for informal guidance (phone or email inquiry)
3. **Week 3**: Review legal opinion and CQC feedback, finalize registration decision
4. **If Registration Required**: Begin CQC application immediately (3-6 month timeline)
5. **If Registration Not Required**: Document legal basis and proceed with launch

---

---

## DEC-003: Gender Preference Justification

**Closes Gap**: GAP-03 (Gender Preference Justification - Equality Act 2010)

**Decision Date**: 2026-01-31

**Decision Owner**: Legal Counsel + Product Manager

**Status**: CLOSED - Binding

---

### Decision Statement

**Gender filtering is PERMITTED** for caregivers when the care receiver provides a **legitimate justification** based on:
1. **Personal care requirements** (intimate care for dignity/comfort)
2. **Religious or cultural beliefs** (e.g., Muslim woman requires female caregiver for personal care)
3. **Dementia-related behavioral needs** (e.g., male care receiver with dementia more comfortable with male caregiver)
4. **Safeguarding concerns** (e.g., trauma history, abuse survivor)

**Gender filtering is NOT PERMITTED** for companionship or non-personal care services without legitimate justification.

---

### Legal Framework

**Equality Act 2010** (Section 13):
- Prohibits direct discrimination based on protected characteristics (including sex/gender)
- Applies to provision of goods and services

**Equality Act 2010 (Schedule 3, Part 7)**:
- **Occupational Requirement Exception**: Gender preference lawful if:
  1. Being a particular sex is an occupational requirement
  2. Requirement is proportionate means of achieving legitimate aim

**Schedule 9, Para 1** (Employment context, but analogous):
- Gender preference lawful for:
  - Privacy/decency (personal care)
  - Religious/cultural reasons (authenticity, ethos)
  - Health and safety (if genuinely required)

---

### Legitimate Reasons for Gender Preference

| Justification Category | Example | Lawfulness | Rationale |
|----------------------|---------|------------|-----------|
| **Personal Care (Privacy/Dignity)** | Elderly woman requests female caregiver for washing and dressing | LAWFUL | Personal care involves intimate bodily contact. Gender preference for privacy/dignity is legitimate. |
| **Religious/Cultural Beliefs** | Muslim woman requests female caregiver due to Islamic modesty requirements | LAWFUL | Equality Act protects religious beliefs. Gender preference proportionate to respect religious practice. |
| **Dementia Behavioral Needs** | Male care receiver with dementia exhibits aggression toward female caregivers, requires male caregiver | LAWFUL | Safeguarding and behavior management. Gender match improves care safety and quality. |
| **Trauma/Abuse History** | Female care receiver is abuse survivor, uncomfortable with male caregivers | LAWFUL | Safeguarding and trauma-informed care. Gender preference necessary for psychological safety. |
| **Language/Communication** | Care receiver prefers female caregiver "because women are better listeners" | UNLAWFUL | Discriminatory stereotype. No legitimate occupational requirement. |
| **Companionship Only** | Care receiver wants male caregiver for companionship "to talk about football" | UNLAWFUL (unless specific reason) | Companionship does not involve personal care or privacy. Gender preference must be justified (e.g., shared interests for dementia engagement). |

---

### Platform Implementation

#### Search Filtering
- **Gender filter hidden by default**
- **Gender filter revealed ONLY IF**:
  1. Care receiver selects "Personal Care" service type in care needs profile, OR
  2. Care receiver clicks "Request Gender Preference" and provides justification

#### Gender Preference Justification Flow

**Step 1**: Care receiver clicks "Filter by Gender" in search
**Step 2**: Modal appears:

```
Why do you need a caregiver of a specific gender?

This information helps us ensure your request complies with equality law. Gender preferences are only permitted for legitimate reasons.

Select reason:
[ ] Personal care (washing, dressing, toileting) - I prefer a caregiver of my same/specific gender for privacy and dignity
[ ] Religious or cultural beliefs - My faith requires a caregiver of a specific gender for personal care
[ ] Behavioral or dementia needs - A specific gender caregiver is needed for safety or comfort
[ ] Trauma or safeguarding concerns - I have experienced trauma and need a caregiver of a specific gender for psychological safety
[ ] Other (please explain) [text field, 500 char limit]

[Cancel] [Confirm and Filter]
```

**Step 3**: Care receiver selects reason and confirms
**Step 4**: Gender filter applied to search results
**Step 5**: Justification logged in audit trail (GDPR compliant - legitimate interest in preventing discrimination)

---

### Caregiver Protection

**Caregiver Rights**:
- Caregivers can challenge discriminatory gender preferences via "Report Concern" on booking request
- Admin reviews reported gender preferences for legitimacy
- If gender preference unjustified, admin contacts care receiver to explain Equality Act requirements
- Repeated unjustified gender preferences = care receiver account warning

**Transparency**:
- Booking request shown to caregiver includes justification category (e.g., "Personal Care Privacy")
- Caregiver can decline booking request if they believe gender preference is discriminatory (without penalty)

---

### Admin Review Process

**Admin Flags for Review**:
- Gender preference selected without "Personal Care" service type
- "Other" justification text contains potentially discriminatory language (keyword filtering)
- Caregiver reports discriminatory gender preference

**Admin Actions**:
1. Review justification and booking context
2. If legitimate: Approve (no action)
3. If questionable: Contact care receiver for clarification
4. If discriminatory: Remove gender filter, educate care receiver on Equality Act, warn that future violations may result in suspension

---

### Terms of Service

**Care Receiver Terms**:
- "Gender preferences for caregivers are only permitted for legitimate reasons (personal care privacy, religious beliefs, dementia behavioral needs, safeguarding concerns). Discriminatory gender preferences violate the Equality Act 2010 and are prohibited. The platform may remove gender filters that are not justified."

**Caregiver Terms**:
- "Care receivers may request caregivers of a specific gender for legitimate reasons (personal care, religious beliefs, dementia care, safeguarding). These requests are lawful under the Equality Act 2010 occupational requirement exception. You may decline booking requests if you believe a gender preference is discriminatory."

---

### Legal Basis Documentation

**Equality Act 2010 Compliance**:
- **Section 13 (Direct Discrimination)**: Gender filtering IS direct discrimination on the basis of sex
- **Schedule 3, Part 7 (Occupational Requirement Exception)**: Discrimination is LAWFUL if:
  1. Being a particular sex is an occupational requirement for the service (personal care, religious context, dementia behavior management)
  2. Application of requirement is proportionate means of achieving legitimate aim (privacy, dignity, religious practice, safeguarding)

**Proportionality Test**:
- **Legitimate Aim**: Protecting care receiver's privacy, dignity, religious beliefs, psychological safety
- **Proportionate Means**: Gender preference is narrow (applies to specific caregiver role, not blanket discrimination), necessary (no less discriminatory alternative), and balanced (care receiver's rights vs. caregiver's rights)

**Case Law**:
- *Ladele v. London Borough of Islington (2009)*: Religious beliefs can justify differential treatment if proportionate
- *Eweida v. UK (2013)*: Balancing religious rights with non-discrimination requires case-by-case assessment

---

### Risk Mitigation

**Risk**: Caregiver brings Equality Act discrimination claim

**Mitigation**:
1. **Justification Requirement**: Care receiver must justify gender preference (not arbitrary)
2. **Occupational Requirement Exception**: Legal basis documented and defensible
3. **Admin Monitoring**: Discriminatory preferences flagged and removed
4. **Caregiver Right to Decline**: Caregivers can reject discriminatory requests
5. **Audit Trail**: All gender preferences logged with justification for legal defense

**Risk**: Care receiver challenges removal of unjustified gender preference

**Mitigation**:
1. **Terms of Service**: Care receiver agreed to Equality Act compliance
2. **Education**: Admin explains legal requirement, offers alternative (e.g., search by experience, qualifications)
3. **Escalation**: Legal counsel review if care receiver disputes

---

### Alternatives Considered

| Alternative | Rationale for Rejection |
|-------------|------------------------|
| **Prohibit all gender filtering** | Overly restrictive. Care receivers have legitimate need for gender-matched caregivers for personal care and religious reasons. Prohibiting this reduces care quality and access. |
| **Allow unrestricted gender filtering** | Unlawful. Enables discrimination in violation of Equality Act 2010. Platform liable for facilitating unlawful discrimination. |
| **Require evidence of justification (e.g., GP letter)** | Too onerous. Self-declaration with monitoring strikes balance between preventing discrimination and respecting care receiver autonomy. |
| **Limit gender filtering to personal care only** | Too narrow. Religious and dementia behavioral justifications also legitimate, even if not strictly "personal care". |

---

### Related Systems Affected

- **SYS-04**: Discovery & Advanced Search (gender filtering UI and justification flow)
- **SYS-03**: Medical Condition Matching (personal care flag triggers gender preference option)
- **SYS-05**: Booking System (gender preference shown to caregiver with justification)
- **SYS-09**: Safeguarding & Incident Management (caregiver reports discriminatory preferences)
- **SYS-13**: Compliance & Audit System (gender preference justifications logged)

---

### Review Triggers

This decision must be reviewed if:
- **Equality Act case law changes** (new precedent on occupational requirements)
- **Caregiver discrimination claim filed** (assess whether policy defended claim successfully)
- **Equality and Human Rights Commission guidance changes** (monitor EHRC updates)
- **High volume of unjustified gender preferences** (policy may need tightening)

---

---

## Redundancy Notes

### Task 5: Redundancy Check

No redundancy identified in Task 1-4. The following documents serve distinct purposes:

- **r0-launch-screens.md** (Task 1): Defines minimal 28-screen subset for low-volume launch (NEW - did not exist)
- **decisions.md** (Task 2): Closes product gaps with binding decisions (NEW - did not exist)
- **state-maps.md** (Task 3): Documents state machines for high-risk flows (will be created next)
- **gating-decisions.md**: Tracks regulatory/legal decisions blocking launch (EXISTING - different from decisions.md which records resolved product policy decisions)
- **screen-inventory.md**: Complete 89-screen inventory with metadata (EXISTING - r0-launch-screens.md is a filtered subset)

No tasks were skipped due to redundancy. All deliverables are necessary and non-overlapping.

---

**END OF DOCUMENT**
