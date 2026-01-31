# Gating Decisions for Platform Launch

**Document Purpose**: Catalog all regulatory, legal, and policy decisions that MUST be resolved before platform launch. Each decision blocks critical systems and presents legal or safeguarding risk if unresolved.

**Document Owner**: Product & Legal Teams
**Last Updated**: 2026-01-31
**Status**: BLOCKING LAUNCH

---

## Critical Gating Decisions

### GD-01: CQC Registration Requirement

**Decision Needed**: Does the platform require CQC (Care Quality Commission) registration to operate legally?

**Owner**: Legal (external regulatory counsel recommended)

**Why It Blocks Launch**:
- If CQC registration is required and we launch without it, we are operating illegally and face:
  - Prosecution under Health and Social Care Act 2008
  - Fines up to £50,000 and/or criminal prosecution
  - Immediate shutdown order
  - Reputational destruction
- CQC registration process takes 3-6 months minimum
- If required, registration must begin IMMEDIATELY

**Regulated Activities That May Trigger CQC**:
- Personal care (washing, dressing, toileting) - ✓ Platform supports this
- Accommodation with nursing or personal care - ✓ Live-in care may trigger this
- Arranging regulated activities - ✓ Platform arranges personal care between parties

**Systems Affected**:
- SYS-02: Caregiver Capability & Verification System
- SYS-03: Medical Condition & Care Skills Matching
- SYS-05: Booking System (personal care bookings)
- SYS-09: Safeguarding & Incident Management
- SYS-10: Identity & Background Verification
- SYS-11: Clinical Safety Monitoring
- SYS-13: Compliance & Audit System

**Recommended Action**:
1. Obtain legal opinion from regulatory solicitor with CQC expertise (1-2 weeks)
2. If YES: Begin CQC registration application immediately (3-6 months timeline)
3. If NO: Document legal rationale and prepare defense if CQC challenges later
4. Consider "Introduction Agency" model vs. "Service Provider" model to avoid CQC requirement

**Timeline Criticality**: URGENT - BLOCKS ALL DEVELOPMENT
**Decision Deadline**: Week 1 (immediate)
**Impact If Delayed**: Entire launch timeline at risk; potential 6-month delay

---

### GD-02: Data Protection Impact Assessment (DPIA) Completion

**Decision Needed**: Complete mandatory DPIA for processing vulnerable adult health data and submit to ICO if high risk identified.

**Owner**: Legal/DPO (Data Protection Officer)

**Why It Blocks Launch**:
- GDPR Article 35 REQUIRES DPIA for:
  - Systematic monitoring ✓ Platform monitors care interactions
  - Processing sensitive data (health) on large scale ✓ Medical conditions, care needs
  - Processing vulnerable individuals' data ✓ Elderly, disabled users
- Operating without DPIA = GDPR breach
- ICO can fine up to £17.5 million or 4% of annual turnover (whichever is higher)
- DPIA must be completed BEFORE processing begins (before launch)

**Systems Affected**:
- SYS-01: User Management & Authentication (data processing foundation)
- SYS-03: Medical Condition & Care Skills Matching (health data processing)
- SYS-06: Messaging & Communication (monitoring for safeguarding)
- SYS-09: Safeguarding & Incident Management (incident data processing)
- SYS-11: Clinical Safety Monitoring (health incident data)
- SYS-13: Compliance & Audit System (audit trail of all processing)
- SYS-18: Care Receiver Dashboard (displays health data)

**Recommended Action**:
1. Engage qualified DPO or data protection solicitor (immediate)
2. Complete DPIA using ICO template (2-3 weeks)
3. Identify and mitigate high risks
4. Submit to ICO if residual high risk (add 4-6 weeks for ICO review)
5. Document DPIA and make available to ICO on request

**Timeline Criticality**: URGENT
**Decision Deadline**: Week 2
**Impact If Delayed**: Cannot legally process user data; launch blocked

---

### GD-03: Insurance Requirements for Caregivers

**Decision Needed**: Define mandatory insurance types, minimum coverage amounts, and verification process for caregivers.

**Owner**: Legal + Risk Management

**Why It Blocks Launch**:
- Caregivers without adequate insurance create liability risk for platform
- If caregiver injures care receiver (e.g., during transfer, hoisting), who pays?
- Platform may be liable if we allowed uninsured caregiver to operate
- Insurance verification is part of caregiver onboarding (SYS-10)

**Required Insurance Types (Need Confirmation)**:
- Public Liability Insurance (minimum £1M) - ✓ Likely required
- Professional Indemnity Insurance (minimum £?M) - ✓ Likely required for personal care
- Personal Accident Insurance - ? Depends on self-employed status
- Employers Liability Insurance - X Not applicable (self-employed)

**Systems Affected**:
- SYS-02: Caregiver Capability & Verification System (insurance as capability requirement)
- SYS-10: Identity & Background Verification (insurance verification workflow)
- SYS-12: Admin Operations (admin verifies insurance certificates)
- SYS-17: Caregiver Dashboard (upload insurance documents)

**Recommended Action**:
1. Legal review of insurance requirements (1 week)
2. Consult insurance broker for typical care sector requirements
3. Define minimum coverage amounts for each policy type
4. Specify verification process (upload certificate, admin review, expiry tracking)
5. Document platform's own liability insurance (PI, cyber, D&O)

**Timeline Criticality**: HIGH
**Decision Deadline**: Week 3
**Impact If Delayed**: Cannot onboard caregivers; supply side blocked

---

### GD-04: Mental Capacity Act Compliance Framework

**Decision Needed**: How does platform verify family member has legal authority to book care on behalf of cognitively impaired care receiver? How does platform recognize Lasting Power of Attorney (LPA)?

**Owner**: Legal + Safeguarding Lead

**Why It Blocks Launch**:
- Mental Capacity Act 2005 requires:
  - Presumption of capacity unless proven otherwise
  - Best interests decisions for those lacking capacity
  - LPA holders have legal authority; family members without LPA do NOT
- Risk: Family member without legal authority books care for dementia patient who objects
- Risk: Platform facilitates care against person's wishes (false imprisonment, assault)
- Platform MUST verify legal authority if care receiver lacks capacity

**Key Questions**:
1. Does platform require family members to declare whether care receiver has capacity?
2. If care receiver lacks capacity, must family member upload LPA certificate?
3. Does platform require care receiver consent for family account creation?
4. How does platform handle conflicting instructions from care receiver vs. family member?

**Systems Affected**:
- SYS-16: Family & Multi-User Accounts (legal authority verification)
- SYS-01: User Management (consent tracking)
- SYS-03: Medical Condition Matching (cognitive impairment flags)
- SYS-09: Safeguarding & Incident Management (capacity concerns)
- SYS-13: Compliance & Audit System (MCA compliance documentation)

**Recommended Action**:
1. Legal opinion on MCA compliance requirements (1-2 weeks)
2. Define capacity assessment process (self-declaration vs. professional assessment)
3. Create LPA verification workflow (upload certificate, admin review)
4. Document best interests decision-making framework
5. Train safeguarding team on MCA principles

**Timeline Criticality**: URGENT
**Decision Deadline**: Week 2
**Impact If Delayed**: Cannot safely serve dementia/cognitive impairment users; major market segment blocked

---

### GD-05: Medication Assistance Boundaries

**Decision Needed**: Define exact legal boundaries for caregiver medication assistance. What is permitted vs. prohibited? What constitutes "administration" vs. "prompting"?

**Owner**: Clinical Governance Lead + Legal

**Why It Blocks Launch**:
- Unclear boundaries = caregivers cross line into medication administration
- Medication administration without qualification = unlawful, dangerous
- If caregiver gives wrong medication or dose, who is liable?
- Care receivers may expect caregivers to administer medication (platform must set expectations)

**Legal Boundaries (Need Confirmation)**:
- ✓ Prompting/reminding to take medication - LAWFUL (no training required)
- ? Handing medication to person - GREY AREA (depends on person's capacity)
- X Administering medication - UNLAWFUL without qualification/training
- X Crushing tablets, measuring liquid doses - UNLAWFUL without training

**Systems Affected**:
- SYS-02: Caregiver Capability & Verification (medication assistance as skill)
- SYS-03: Medical Condition Matching (medication prompting flagged)
- SYS-05: Booking System (medication assistance requests)
- SYS-11: Clinical Safety Monitoring (medication incidents)
- SYS-21: Content Management (caregiver training resources)

**Recommended Action**:
1. Clinical governance review of medication assistance boundaries (1 week)
2. Legal review of liability (1 week)
3. Define permitted vs. prohibited actions in policy
4. Create caregiver training module on medication assistance limits
5. Add warnings to booking flow when medication assistance requested
6. Require care receiver informed consent that caregiver will NOT administer medication

**Timeline Criticality**: HIGH
**Decision Deadline**: Week 3
**Impact If Delayed**: Cannot support medication assistance requests; care matching limited

---

### GD-06: Deprivation of Liberty Risk (Live-In Care)

**Decision Needed**: Does live-in care create deprivation of liberty risk? Should live-in care be excluded from MVP until DoLS process defined?

**Owner**: Legal + Safeguarding Lead

**Why It Blocks Launch (If Live-In Care in MVP)**:
- Live-in care for dementia patients may constitute "deprivation of liberty" if:
  - Person lacks capacity to consent to care arrangements
  - Arrangements involve constant supervision, restricted movement, no freedom to leave
- DoLS authorization required from local authority BEFORE care begins
- Platform facilitating unlawful deprivation of liberty = criminal offence
- Care Act 2014 safeguarding duty breached

**Key Questions**:
1. Should live-in care be included in MVP at all?
2. If yes, must family confirm care receiver consents OR has DoLS authorization?
3. Does platform need to report live-in care arrangements to local authority?
4. What safeguards prevent unlawful deprivation of liberty?

**Systems Affected**:
- SYS-05: Booking System (live-in care booking type)
- SYS-09: Safeguarding & Incident Management (DoLS monitoring)
- SYS-16: Family & Multi-User Accounts (DoLS consent verification)
- SYS-13: Compliance & Audit System (DoLS documentation)

**Recommended Action**:
1. Legal opinion on DoLS risk for live-in care (1 week)
2. **RECOMMENDED**: Exclude live-in care from MVP; launch with hourly/daily only
3. If live-in care in MVP: Require DoLS consent verification workflow
4. Document DoLS reporting procedures to local authority

**Timeline Criticality**: HIGH (if live-in care in MVP)
**Decision Deadline**: Week 2
**Impact If Delayed**: Live-in care feature blocked; potentially entire MVP blocked if live-in required

---

### GD-07: Safeguarding Adults Board Liaison Procedures

**Decision Needed**: Define procedures for reporting safeguarding concerns to local authority Safeguarding Adults Boards (SABs). Identify SAB contacts for each local authority.

**Owner**: Safeguarding Lead + Legal

**Why It Blocks Launch**:
- Care Act 2014 requires collaboration with local authority SABs
- Platform must report safeguarding concerns to SABs (statutory duty)
- Platform must participate in safeguarding adult reviews (SARs) if requested
- Operating without SAB liaison = Care Act non-compliance
- Cannot respond to safeguarding incidents without SAB contact procedures

**Key Questions**:
1. Which local authorities will platform operate in at launch? (Defines SAB list)
2. What threshold triggers SAB referral? (Immediate danger? All concerns?)
3. How does platform share information with SABs while respecting GDPR?
4. Who is authorized to make SAB referrals on behalf of platform?

**Systems Affected**:
- SYS-09: Safeguarding & Incident Management (external referral workflow)
- SYS-12: Admin Operations (admin initiates SAB referrals)
- SYS-13: Compliance & Audit System (SAB referral audit trail)
- SYS-14: Emergency Escalation (SAB may be emergency contact)

**Recommended Action**:
1. Define geographic scope of MVP (which local authorities)
2. Identify SAB contact for each local authority (1 week research)
3. Document SAB referral procedure (who, when, how)
4. Create information sharing protocol (GDPR-compliant)
5. Train safeguarding team on SAB liaison

**Timeline Criticality**: HIGH
**Decision Deadline**: Week 4
**Impact If Delayed**: Cannot respond to safeguarding incidents; Care Act breach

---

### GD-08: Right to Work Verification Process

**Decision Needed**: Define process for verifying caregiver right to work in UK, including manual review of visa conditions (not just share code check).

**Owner**: Compliance Lead + Legal

**Why It Blocks Launch**:
- Immigration Act 2014 requires employers to verify right to work
- Platform may be "employer" or "introducer" (legal status unclear - see GD-01)
- UKVI share code confirms visa exists but NOT work restrictions:
  - Student visa: 20 hours/week limit
  - Skilled Worker visa: Specific employer/role restrictions
  - Visitor visa: No work permitted
- Platform liable if caregiver works beyond visa restrictions (£20,000 fine per illegal worker)

**Key Questions**:
1. Is platform "employer" or "introducer" for right to work purposes?
2. Must platform track caregiver hours to prevent visa violations?
3. What process verifies visa conditions beyond share code?
4. Does platform require caregivers to self-declare visa restrictions?

**Systems Affected**:
- SYS-10: Identity & Background Verification (right to work verification)
- SYS-12: Admin Operations (admin reviews visa conditions)
- SYS-17: Caregiver Dashboard (caregiver declares visa restrictions)
- SYS-15: Calendar & Availability (track hours for visa compliance)

**Recommended Action**:
1. Legal opinion on platform's right to work obligations (1 week)
2. Define verification process: share code + manual admin review of visa conditions
3. Require caregivers to declare visa restrictions during onboarding
4. Track caregiver booking hours if visa limits apply
5. Block caregivers from accepting bookings if visa limit reached

**Timeline Criticality**: HIGH
**Decision Deadline**: Week 3
**Impact If Delayed**: Cannot onboard non-UK caregivers; supply side limited

---

### GD-09: Cookie Consent & PECR Compliance

**Decision Needed**: Implement PECR-compliant cookie consent banner (opt-in for analytics cookies before placement).

**Owner**: Engineering + Legal

**Why It Blocks Launch**:
- Privacy and Electronic Communications Regulations (PECR) requires:
  - Consent BEFORE placing non-essential cookies (analytics, marketing)
  - Clear cookie policy
  - Opt-out mechanism
- Analytics tools like Google Analytics cannot be used without prior consent
- ICO enforcement action for PECR breaches (£500,000 fines possible)

**Systems Affected**:
- SYS-20: Analytics & Reporting (Google Analytics, Mixpanel)
- SYS-21: Content Management (cookie policy page)
- SYS-22: Technical Infrastructure (cookie consent banner)

**Recommended Action**:
1. Implement cookie consent banner with opt-in for analytics (1 week)
2. Separate essential cookies (authentication) from analytics cookies
3. Publish cookie policy page
4. Test that analytics scripts only load after consent

**Timeline Criticality**: MEDIUM
**Decision Deadline**: Week 6
**Impact If Delayed**: Cannot use analytics tools; must launch without user tracking

---

### GD-10: Equality Act - Caregiver Gender Preferences

**Decision Needed**: Define legal basis for allowing care receivers to filter caregivers by gender. When is gender preference lawful vs. discriminatory?

**Owner**: Legal + Product

**Why It Blocks Launch**:
- Equality Act 2010 prohibits discrimination based on sex
- Gender preference for caregivers may be:
  - **Lawful**: Occupational requirement (e.g., intimate personal care for Muslim woman requires female caregiver)
  - **Unlawful**: Discriminatory preference without justification
- Platform enabling unlawful discrimination = platform liable
- Must balance care receiver dignity/cultural needs vs. caregiver discrimination

**Key Questions**:
1. Does platform allow blanket gender filtering or only for personal care bookings?
2. Must care receiver justify gender preference (religious/cultural reasons)?
3. Does platform require evidence of legitimate need (e.g., religious affiliation)?
4. Are male caregivers disadvantaged by gender filtering feature?

**Systems Affected**:
- SYS-04: Discovery & Advanced Search (gender filtering)
- SYS-03: Medical Condition Matching (personal care requires gender match)
- SYS-05: Booking System (gender preference on booking request)

**Recommended Action**:
1. Legal review of Equality Act gender preference case law (1 week)
2. Define legitimate reasons for gender preferences (religious, cultural, intimate care)
3. Require care receiver to justify gender preference (not default filter)
4. Document occupational requirement exception
5. Allow caregivers to challenge discriminatory preferences

**Timeline Criticality**: MEDIUM
**Decision Deadline**: Week 5
**Impact If Delayed**: Gender filtering feature blocked; personal care matching limited

---

## Summary: Gating Decision Timeline

| Decision | Owner | Criticality | Deadline | MVP Systems Blocked |
|----------|-------|-------------|----------|---------------------|
| GD-01: CQC Registration | Legal | URGENT | Week 1 | ALL (potential 6-month delay) |
| GD-02: DPIA Completion | Legal/DPO | URGENT | Week 2 | SYS-01, 03, 06, 09, 11, 13, 18 |
| GD-03: Insurance Requirements | Legal/Risk | HIGH | Week 3 | SYS-02, 10, 12, 17 |
| GD-04: Mental Capacity Act | Legal/Safeguarding | URGENT | Week 2 | SYS-01, 03, 09, 13, 16 |
| GD-05: Medication Boundaries | Clinical/Legal | HIGH | Week 3 | SYS-02, 03, 05, 11, 21 |
| GD-06: DoLS Risk (Live-In) | Legal/Safeguarding | HIGH | Week 2 | SYS-05, 09, 13, 16 |
| GD-07: SAB Liaison | Safeguarding/Legal | HIGH | Week 4 | SYS-09, 12, 13, 14 |
| GD-08: Right to Work | Compliance/Legal | HIGH | Week 3 | SYS-10, 12, 15, 17 |
| GD-09: Cookie Consent | Engineering/Legal | MEDIUM | Week 6 | SYS-20, 21, 22 |
| GD-10: Gender Preferences | Legal/Product | MEDIUM | Week 5 | SYS-03, 04, 05 |

**Critical Path**: GD-01 (CQC Registration) is the single biggest launch blocker. If CQC registration required, add 3-6 months to launch timeline.

**Immediate Actions (Week 1)**:
1. Engage regulatory solicitor for CQC opinion (GD-01)
2. Engage DPO for DPIA (GD-02)
3. Legal review of Mental Capacity Act requirements (GD-04)

**Contingency Plans**:
- If CQC registration required: Delay launch 6 months OR restructure as "introduction agency" to avoid CQC
- If live-in care creates DoLS risk: Remove live-in care from MVP
- If insurance requirements too onerous: Provide platform-level insurance to caregivers (increases costs)

---

**Document Status**: Complete
**Next Review**: Weekly until all decisions resolved
**Escalation**: Any decision delayed beyond deadline escalates to CEO/Board
