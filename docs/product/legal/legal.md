# Legal & Regulatory Considerations - UK Elderly Care Marketplace

**Document Purpose**: Track legal requirements, regulatory compliance obligations, and open legal questions for the platform.

**Document Owner**: Product Team (requires legal counsel review)
**Last Updated**: 2026-01-31
**Status**: DRAFT - Requires Legal Review

---

## CRITICAL PRE-LAUNCH LEGAL DECISIONS

### 1. CQC (Care Quality Commission) Registration Requirement (URGENT)

**Issue**: Does the platform require CQC registration?

**Legal Test** (Health and Social Care Act 2008):
CQC registration required if platform is:
1. Providing a **regulated activity**, OR
2. **Arranging** a regulated activity

**Regulated Activities** that platform supports:
- Personal care (washing, dressing, toileting) ✓
- Accommodation with nursing or personal care (live-in care) ✓

**Platform Role**:
- Platform connects care receivers with independent caregivers
- Platform processes payments (escrow)
- Platform verifies caregiver qualifications
- Platform monitors care quality (reviews, incident reports)
- Platform has safeguarding oversight

**Legal Question**:
Does "arranging" personal care through a digital marketplace constitute a regulated activity requiring CQC registration?

**CQC Guidance** (Digital Care Marketplace Position):
- If platform merely "introduces" and has no ongoing involvement: Likely NO registration required
- If platform verifies caregivers, handles payments, monitors quality, has safeguarding oversight: Likely YES registration required

**Platform Reality**: Platform has ongoing involvement, quality oversight, safeguarding duties, payment control.

**Conclusion**: **HIGH PROBABILITY CQC registration required**

**Action Required**:
- [ ] Obtain legal opinion from healthcare law specialist (URGENT)
- [ ] If YES: Begin CQC registration process (3-6 months lead time)
- [ ] If NO: Document legal rationale for non-registration
- [ ] Contact CQC directly for informal guidance

**Timeline**: Must resolve BEFORE MVP launch

**CQC Registration Implications**:
- Designated Registered Manager required (named individual, qualifications)
- Annual CQC inspections
- CQC fundamental standards compliance (safe, effective, caring, responsive, well-led)
- Statement of Purpose and Service User Guide
- Notification of incidents to CQC
- Display CQC rating on website
- Ongoing CQC compliance monitoring

---

### 2. Insurance Requirements & Liability (URGENT)

**Issue**: What insurance is required for caregivers and platform?

**Caregiver Insurance Requirements**:
- **Public Liability Insurance** (minimum £1M): Covers injury to care receiver or damage to property during care
  - Status: ✓ Mentioned in feature map (Section 10.7)
  - Required: YES (industry standard for self-employed care workers)

- **Professional Indemnity Insurance** (minimum £1M): Covers claims arising from professional negligence (e.g., improper transfer causing injury)
  - Status: ✗ NOT mentioned in feature map
  - Required: YES (likely required for personal care providers)

- **Employers Liability Insurance**: NOT applicable (caregivers are self-employed)

**Platform Insurance Requirements**:
- **Professional Indemnity Insurance** (£5M+): Platform's own liability for negligence in vetting caregivers, safeguarding failures
- **Cyber Liability Insurance**: Data breach, GDPR violations
- **Errors & Omissions Insurance**: Platform errors causing harm
- **Directors & Officers Insurance**: Protection for company directors

**Open Legal Questions**:
1. Is public liability insurance sufficient, or is professional indemnity also required?
2. What minimum coverage amounts are legally required vs. recommended?
3. Does platform have vicarious liability for caregiver actions?
4. Does escrow payment model create additional liability?

**Action Required**:
- [ ] Legal review of insurance requirements by healthcare law specialist
- [ ] Obtain insurance broker advice (specialist in care sector)
- [ ] Define mandatory insurance requirements for caregiver verification
- [ ] Obtain platform insurance policies BEFORE launch
- [ ] Document insurance requirements in caregiver terms of service

**Timeline**: Must resolve BEFORE MVP launch

---

### 3. Medication Assistance Legal Boundaries (CRITICAL)

**Issue**: What medication assistance can caregivers legally provide?

**Legal Framework**:
- **Medication prompting** (reminding someone to take medication): ✓ Legal, no training required
- **Handing medication to person** from pre-filled box: ✓ Legal (grey area, but generally accepted)
- **Administering medication** (giving medication directly, applying creams, etc.): Regulated activity, requires training

**Platform Feature** (Section 11.1):
- "Caregivers can prompt medication (non-clinical, not administer)"
- "Medication prompting logged in booking notes"

**Risk**: Caregiver crosses line into medication administration without realizing, causing harm (wrong medication, wrong dose, allergic reaction).

**Who is Liable?**:
- Caregiver (primary liability as self-employed)
- Care receiver/family (consented to arrangement)
- Platform (if failed to clarify boundaries, inadequate caregiver training)

**Action Required**:
- [ ] Define exact medication assistance boundaries in policy (CLEAR definitions)
- [ ] Mandatory caregiver training module on medication assistance limits
- [ ] Care receiver informed consent: "Caregiver will NOT administer medication"
- [ ] Warning in booking flow if care receiver requires medication administration
- [ ] Exclude medication administration from platform services (if not regulated properly)

**Clinical Governance**:
- Consider requiring caregivers offering medication assistance to complete specific training (e.g., RQF Level 2 Safe Handling of Medicines)
- Document medication assistance policy and get clinical review

**Timeline**: Must resolve BEFORE MVP launch

---

### 4. Mental Capacity Act 2005 Compliance (CRITICAL)

**Issue**: Platform will serve users with dementia, cognitive impairment, and other conditions affecting mental capacity. How does platform comply with Mental Capacity Act?

**Legal Principles** (Mental Capacity Act 2005):
1. **Presumption of capacity**: Assume person has capacity unless proven otherwise
2. **Right to make unwise decisions**: Capacity is decision-specific, not global
3. **Best interests**: Decisions for those lacking capacity must be in their best interests
4. **Least restrictive option**: Choose option that restricts rights and freedoms least
5. **Lasting Power of Attorney (LPA)**: Legal authority to make decisions on behalf of person lacking capacity

**Platform Scenarios**:
1. **Care receiver with dementia registers account**: Does care receiver have capacity to consent to care arrangements?
2. **Family member books care on behalf of cognitively impaired parent**: Does family member have legal authority? (LPA for health and welfare?)
3. **Care receiver with fluctuating capacity** (e.g., dementia): Capacity may vary day-to-day

**Current Gap in Feature Map**:
- Section 16.2 (Family Member Registration) captures "relationship to care receiver" but does NOT verify legal authority
- No mention of LPA verification
- No process for assessing mental capacity
- No best interests decision-making framework

**Action Required**:
- [ ] Add Mental Capacity Act compliance to legal framework
- [ ] Verify family member legal authority if care receiver has cognitive impairment:
  - Request LPA registration number (verify with Office of Public Guardian)
  - If no LPA, document that family member is acting informally (with care receiver's consent if they have capacity)
- [ ] Document best interests decision-making process for users lacking capacity
- [ ] Train admin team on Mental Capacity Act principles
- [ ] Add safeguarding alert if care receiver with cognitive impairment registers account (admin checks family oversight)

**Legal Risk**: Platform facilitates care arrangements for person lacking capacity without proper legal authority. Family member could be challenged by other family members or local authority.

**Timeline**: Must resolve BEFORE MVP launch (especially if targeting dementia care)

---

### 5. Deprivation of Liberty Safeguards (DoLS) - Live-In Care (CRITICAL IF LIVE-IN IN MVP)

**Issue**: Live-in care arrangements may constitute "deprivation of liberty" if care receiver lacks mental capacity.

**Legal Test** (Supreme Court "Cheshire West" judgment 2014):
Deprivation of liberty occurs if:
1. Person is under continuous supervision and control, AND
2. Person is not free to leave, AND
3. Person lacks capacity to consent to arrangements

**Live-In Care Risk**:
- Caregiver lives in care receiver's home (continuous supervision) ✓
- Care receiver may have dementia, limited mobility (not free to leave) ✓
- Care receiver may lack capacity to consent ✓

**Legal Requirement**:
If live-in care amounts to deprivation of liberty, and care receiver lacks capacity, DoLS authorization required from local authority.

**Platform Role**:
- Platform is not responsible for obtaining DoLS authorization (family's responsibility)
- BUT platform should:
  1. Warn families that DoLS may be required
  2. Require families to confirm care receiver consents OR has DoLS authorization
  3. Provide guidance on when DoLS is needed

**Action Required** (if live-in care in MVP):
- [ ] Legal review of live-in care arrangements and DoLS risk
- [ ] Add DoLS warning in live-in care booking flow
- [ ] Require family to confirm: "Care receiver consents to this arrangement, or appropriate legal authorization (DoLS) is in place"
- [ ] Provide DoLS guidance (link to local authority DoLS teams)
- [ ] Consider excluding live-in care from MVP until DoLS process defined

**Alternative**: Launch with hourly/daily care only, add live-in care post-MVP after DoLS process resolved.

**Timeline**: Must resolve BEFORE live-in care launched

---

### 6. Safeguarding Adults Boards (SABs) Liaison (REQUIRED)

**Issue**: Care Act 2014 requires collaboration with local authority Safeguarding Adults Boards. How does platform comply?

**Legal Requirement** (Care Act 2014, Section 43):
- Duty to report safeguarding concerns to local authority
- Duty to participate in safeguarding adult reviews (SARs) if serious case
- Duty to share information with SABs as appropriate (within GDPR limits)

**Current Feature Map**:
- Section 9.3 mentions "referral to local authority safeguarding team" ✓
- But: No specific process for SAB liaison

**Action Required**:
- [ ] Define SAB liaison procedures:
  - When to report safeguarding concerns to local authority (immediate danger, suspected abuse, neglect)
  - How to report (phone, email, online form - varies by local authority)
  - Information sharing protocols (balance safeguarding duty with GDPR confidentiality)
- [ ] Identify SAB contacts for each local authority in England (150+ local authorities)
- [ ] Document information sharing legal basis (GDPR Article 6(1)(d) - vital interests, or Article 9(2)(h) - health or social care)
- [ ] Train safeguarding team on SAB reporting
- [ ] Annual safeguarding report shared with relevant SABs (if requested)

**Timeline**: Must resolve BEFORE MVP launch

---

### 7. Right to Work Verification - Visa Restrictions (REQUIRED)

**Issue**: UKVI share code verification confirms visa exists, but NOT work restrictions (hours, job type). Platform liable if caregiver works illegally.

**Legal Requirement** (Immigration Act 2014):
- Employers (or platforms arranging work) must verify right to work
- Liability for civil penalty (up to £20,000 per illegal worker) if fail to verify
- Criminal liability if knowingly employ illegal worker

**Right to Work Check**:
- UK/Irish citizens: Passport or birth certificate (no restrictions)
- Settled status (ILR, EU settled status): No restrictions
- Visa holders: Check visa conditions (hours, job type, sponsor requirements)

**Visa Restrictions Example**:
- **Student visa**: 20 hours/week during term time, full-time during holidays
- **Graduate visa**: No restrictions (2-3 years)
- **Skilled Worker visa**: Can only work for sponsoring employer (NOT self-employed)
- **Health and Care Worker visa**: Can work in health/social care only

**Current Feature Map** (Section 10.3):
- "Share code entered, checked via UKVI service" ✓
- "Work restriction checks (full-time, part-time, hours limited)" ✓ Mentioned
- BUT: No detail on HOW restrictions are enforced

**Gap**: Caregiver on student visa works 40 hours/week. Platform facilitates illegal working.

**Action Required**:
- [ ] Manual admin review of visa conditions (not just automated share code check)
- [ ] Caregiver declares visa restrictions during registration:
  - Hours per week limit?
  - Job type restrictions?
  - Sponsor requirements?
- [ ] System tracks caregiver hours to prevent visa violations (if hours limit declared)
- [ ] Alert if caregiver approaches hours limit
- [ ] Annual re-verification of right to work (visa conditions may change)

**Timeline**: Must resolve BEFORE MVP launch

---

### 8. Data Protection Impact Assessment (DPIA) - MANDATORY

**Issue**: GDPR Article 35 requires DPIA for high-risk data processing. Platform triggers DPIA requirement.

**GDPR Article 35 Triggers** (DPIA required if processing involves):
1. Systematic monitoring of publicly accessible areas (e.g., CCTV)
2. Processing sensitive data (health data) on large scale ✓
3. Processing data of vulnerable individuals (elderly, children) ✓

**Platform triggers 2 and 3**: Processing health data (medical conditions) of vulnerable adults (elderly).

**DPIA is MANDATORY before launch.**

**DPIA Components**:
1. **Description of processing**: What data is collected, how, why, who has access
2. **Necessity and proportionality**: Why is processing necessary? Is it proportionate to purpose?
3. **Risk assessment**: What are risks to data subjects? (breach, discrimination, harm)
4. **Mitigation measures**: How are risks mitigated? (encryption, access controls, audit logs)
5. **Consultation**: Consult Data Protection Officer (DPO) or ICO if high risk

**Action Required**:
- [ ] Appoint Data Protection Officer (DPO) or data protection advisor
- [ ] Complete DPIA with DPO/advisor (2-4 weeks)
- [ ] Document DPIA and mitigation measures
- [ ] Submit to ICO if high residual risk identified (ICO may require changes before launch)
- [ ] Review DPIA annually or when processing changes

**Timeline**: Must complete BEFORE MVP launch (GDPR legal requirement)

---

### 9. Cookie Consent - PECR Compliance (REQUIRED)

**Issue**: Privacy and Electronic Communications Regulations (PECR) requires consent for non-essential cookies. Platform uses Google Analytics (tracking cookies).

**Legal Requirement** (PECR Regulation 6):
- **Essential cookies**: No consent required (authentication, security, user preferences)
- **Analytics cookies**: Consent required BEFORE placing cookie (Google Analytics, Mixpanel)
- **Marketing cookies**: Consent required

**Current Feature Map** (Section 13.2):
- "Cookie consent banner (analytics cookies require consent)" ✓ Mentioned
- Section 20.2 mentions Google Analytics and Mixpanel

**Compliant Cookie Consent**:
- Banner appears BEFORE analytics cookies placed
- Opt-in (not opt-out) - user must actively consent
- Clear explanation of cookie purposes
- Link to cookie policy
- Granular consent (accept all, reject all, customize)
- Easy to withdraw consent

**Action Required**:
- [ ] Implement PECR-compliant cookie consent banner (Cookiebot, OneTrust, or custom)
- [ ] Only place analytics cookies AFTER user consents (not on page load)
- [ ] Document essential vs. analytics vs. marketing cookies
- [ ] Publish cookie policy
- [ ] Respect user's cookie preferences across sessions

**Timeline**: Must implement BEFORE MVP launch (legal requirement)

---

### 10. Equality Act 2010 - Gender Preferences for Caregivers (SENSITIVE)

**Issue**: Platform allows care receivers to filter caregivers by gender (Section 4.2). Is this legal under Equality Act 2010?

**Equality Act 2010**:
- Prohibits discrimination based on protected characteristics (age, sex, race, religion, disability, etc.)
- Exceptions: Occupational requirements (Schedule 9)

**Occupational Requirement Exception**:
Gender preference may be lawful if:
1. Being a particular sex is an occupational requirement (genuine business need)
2. Requirement is proportionate means of achieving legitimate aim

**Examples**:
- **Lawful**: Muslim woman requires female caregiver for intimate personal care (religious/cultural reasons) ✓
- **Lawful**: Male care receiver with dementia prefers male caregiver for personal care (dignity, comfort) ✓
- **Unlawful**: Care receiver prefers female caregiver for companionship "because women are nicer" ✗ (discriminatory stereotype)

**Current Feature Map** (Section 4.2):
- "Filter by gender (if requested by care receiver for personal care)"

**This is reasonable**, but needs safeguards.

**Action Required**:
- [ ] Legal review of gender filtering feature by employment law specialist
- [ ] Require care receiver to justify gender preference:
  - Reason: Religious/cultural, dignity for personal care, dementia behavior, other
  - Only allow gender filter if justified reason provided
- [ ] Do NOT allow blanket gender preferences without justification
- [ ] Document legitimate reasons for gender preferences (policy)
- [ ] Caregiver terms of service: "Requests for specific genders may be made for personal care due to religious/cultural reasons or dignity considerations. This is lawful under Equality Act occupational requirement exception."

**Timeline**: Must resolve BEFORE MVP launch (gender filtering feature included)

---

## UK REGULATORY FRAMEWORK - SUMMARY

### Primary Legislation

1. **Health and Social Care Act 2008** (CQC registration, regulated activities)
2. **Care Act 2014** (safeguarding adults, wellbeing principle, duty to report)
3. **Mental Capacity Act 2005** (capacity, best interests, LPA, DoLS)
4. **Safeguarding Vulnerable Groups Act 2006** (DBS checks)
5. **Protection of Freedoms Act 2012** (DBS Update Service)
6. **GDPR / Data Protection Act 2018** (data protection, privacy, DPIA)
7. **Privacy and Electronic Communications Regulations 2003** (cookie consent)
8. **Immigration Act 2014** (right to work verification)
9. **Equality Act 2010** (non-discrimination, occupational requirements)
10. **Consumer Rights Act 2015** (clear service descriptions, cancellation, refunds)
11. **Payment Services Regulations 2017** (payment handling, escrow)
12. **Health and Safety at Work Act 1974** (duty of care, risk assessments)

### Regulatory Bodies

1. **CQC (Care Quality Commission)**: Healthcare regulator (if registration required)
2. **ICO (Information Commissioner's Office)**: Data protection regulator
3. **HMRC**: Tax compliance (self-employed caregivers, VAT if applicable)
4. **FCA (Financial Conduct Authority)**: If payment services regulated (Stripe handles this)
5. **Advertising Standards Authority (ASA)**: Marketing claims compliance
6. **Local Authority Safeguarding Adults Boards**: Safeguarding oversight (150+ local authorities)

---

## OPEN LEGAL QUESTIONS (REQUIRE LEGAL COUNSEL)

### High Priority (Must Resolve Before MVP)

1. **CQC Registration**: Does platform require CQC registration? (URGENT - 3-6 month lead time)
2. **Insurance Requirements**: What insurance is required for caregivers and platform? (URGENT)
3. **Medication Assistance**: What boundaries for medication assistance? (CRITICAL - clinical governance)
4. **Mental Capacity Act**: How to verify family member legal authority (LPA)? (CRITICAL - dementia care)
5. **Deprivation of Liberty**: DoLS risk for live-in care? (CRITICAL if live-in in MVP)
6. **Safeguarding Adults Boards**: SAB liaison procedures? (REQUIRED)
7. **Right to Work**: How to enforce visa restrictions? (REQUIRED)
8. **DPIA**: Complete DPIA? (MANDATORY - GDPR)
9. **Cookie Consent**: Implement PECR-compliant consent? (REQUIRED)
10. **Gender Preferences**: Equality Act compliant gender filtering? (REQUIRED)

### Medium Priority (Resolve Pre-Launch or Early Post-Launch)

11. **VAT**: Is platform liable for VAT on care services? (Services exempt, but platform fee may be taxable)
12. **IR35**: Are caregivers genuinely self-employed? (Off-payroll working rules)
13. **Vicarious Liability**: Is platform liable for caregiver actions? (Tort law, employment status)
14. **Terms of Service**: Legal review of caregiver and care receiver terms?
15. **Complaints Procedure**: Legal requirements for complaints handling?
16. **Advertising**: ASA compliance for marketing claims (e.g., "verified caregivers")?

### Low Priority (Post-Launch)

17. **International Expansion**: If expanding beyond UK, what regulations apply? (EU, US, etc.)
18. **Partnerships**: Legal structure for partnerships with care agencies, NHS, local authorities?
19. **Telecare Integration**: If adding remote monitoring, what medical device regulations apply?

---

## LEGAL COUNSEL ENGAGEMENT PLAN

### Phase 1: Pre-MVP Legal Review (URGENT - 8-12 weeks)

**Scope**:
1. CQC registration requirement assessment
2. Insurance requirements review
3. Medication assistance boundaries (clinical governance review)
4. Mental Capacity Act compliance framework
5. Deprivation of Liberty risk assessment (if live-in care)
6. Safeguarding Adults Boards liaison procedures
7. Right to work verification process
8. DPIA completion (with DPO or data protection lawyer)
9. Cookie consent PECR compliance
10. Gender preferences Equality Act review

**Deliverables**:
- Legal opinion on CQC registration (written advice)
- Insurance requirements specification
- Medication assistance policy (clinical governance approved)
- Mental Capacity Act compliance procedures
- DoLS risk assessment and guidance (if live-in care)
- SAB liaison procedures
- Right to work verification process documentation
- Completed DPIA (signed by DPO)
- Cookie consent implementation specification
- Gender filtering policy (Equality Act compliant)

**Legal Counsel Required**:
- Healthcare law specialist (CQC, clinical governance, medication)
- Data protection lawyer or DPO (DPIA, GDPR, PECR)
- Employment law specialist (IR35, Equality Act, right to work)
- Insurance broker (specialist in care sector)

**Budget Estimate**: £15,000 - £30,000 (depending on complexity)

**Timeline**: 8-12 weeks (excluding CQC registration process if required)

---

### Phase 2: CQC Registration (IF REQUIRED - 3-6 months)

**Process**:
1. Submit CQC registration application
2. Appoint Registered Manager (named individual, qualifications required)
3. Prepare Statement of Purpose and Service User Guide
4. Submit policies and procedures (safeguarding, quality assurance, complaints, etc.)
5. CQC desktop review
6. CQC inspection (if required)
7. CQC registration granted

**Cost**: £3,500 - £5,000 (CQC registration fee + legal support)

**Timeline**: 3-6 months (CQC target: 4 months)

---

### Phase 3: Ongoing Legal Compliance (Post-Launch)

**Annual Legal Reviews**:
- Terms of Service review (annual)
- Privacy Policy review (annual or when GDPR guidance changes)
- Compliance audit (annual)
- DPIA review (annual or when processing changes)

**Ad-Hoc Legal Support**:
- Safeguarding incident legal advice (as needed)
- Dispute resolution legal support (as needed)
- Regulatory inquiries response (CQC, ICO, HMRC)

**Budget Estimate**: £5,000 - £10,000 per year (retainer + ad-hoc advice)

---

## COMPLIANCE CHECKLIST - MVP LAUNCH

**Cannot launch until ALL items checked**:

### Regulatory Compliance
- [ ] CQC registration obtained (if required) OR legal opinion confirming not required
- [ ] ICO data protection registration completed
- [ ] DPIA completed and signed
- [ ] Safeguarding Adults Boards liaison procedures documented

### Verification & Safety
- [ ] DBS partner organization contract signed (Trustid, UKCBC, etc.)
- [ ] Identity verification service integrated (Onfido, Stripe Identity, Yoti)
- [ ] Right to work verification process implemented (UKVI share code checks)
- [ ] Insurance requirements defined (public liability + professional indemnity)

### Legal Agreements
- [ ] Care receiver Terms of Service (legal review complete)
- [ ] Caregiver Terms of Service (legal review complete, self-employed status clear)
- [ ] Privacy Policy (GDPR compliant, legal review complete)
- [ ] Cookie Policy (PECR compliant)
- [ ] Acceptable Use Policy
- [ ] Safeguarding Policy (Care Act 2014 aligned)
- [ ] Complaints Policy
- [ ] Cancellation & Refund Policy (Consumer Rights Act compliant)

### Data Protection
- [ ] Cookie consent banner (PECR compliant, opt-in for analytics)
- [ ] Data subject rights interface ("Download My Data", "Delete My Account")
- [ ] Data retention policy documented
- [ ] Data processing agreements signed with third parties (Stripe, email provider, SMS)
- [ ] GDPR-compliant data storage (UK/EU servers)

### Mental Capacity & Safeguarding
- [ ] Mental Capacity Act compliance procedures (LPA verification)
- [ ] Medication assistance boundaries policy (clinical governance approved)
- [ ] Deprivation of Liberty risk assessment (if live-in care)
- [ ] Safeguarding incident reporting workflow
- [ ] Emergency escalation protocols

### Employment & Equality
- [ ] IR35 compliance (self-employed status clear in caregiver terms)
- [ ] Right to work verification (visa restrictions tracking)
- [ ] Gender preference policy (Equality Act compliant, occupational requirement justified)
- [ ] Accessibility compliance (WCAG 2.1 AA)

### Financial & Tax
- [ ] Payment Services Regulations compliance (escrow, refunds, dispute resolution)
- [ ] VAT assessment (exempt services vs taxable platform fee)
- [ ] Caregiver tax guidance (self-assessment, HMRC registration)
- [ ] Platform insurance obtained (professional indemnity, cyber liability)

---

## LEGAL RISK REGISTER

### Critical Risks (Cannot Launch Without Mitigation)

| Risk | Impact | Likelihood | Mitigation | Status |
|------|--------|------------|------------|--------|
| Launch without required CQC registration | Criminal prosecution, platform shutdown | High | Obtain legal opinion, register with CQC if required | OPEN |
| GDPR breach (no DPIA) | ICO fine (up to £17.5M or 4% revenue), reputational damage | High | Complete DPIA before launch | OPEN |
| Unqualified caregiver causes harm | Negligence claim, safeguarding failure, CQC action | Medium | Robust verification, qualification checks, skill matching | OPEN |
| Mental Capacity Act breach (family member no authority) | Legal challenge, safeguarding concern | Medium | LPA verification, Mental Capacity Act procedures | OPEN |
| Medication error causing harm | Negligence claim, caregiver liability, platform reputation | Medium | Clear medication boundaries, caregiver training | OPEN |

### High Risks (Mitigate Before Scale)

| Risk | Impact | Likelihood | Mitigation | Status |
|------|--------|------------|------------|--------|
| Caregiver not self-employed (IR35 challenge) | Back-taxes, NI contributions, employment rights | Medium | Clear self-employed terms, legal review | OPEN |
| Right to work breach (visa violations) | Civil penalty £20k per violation, criminal liability | Low | Visa restrictions tracking, admin review | OPEN |
| Cookie consent non-compliance (PECR) | ICO enforcement, fine up to £500k | Low | Implement opt-in cookie banner | OPEN |
| Gender preference discrimination claim | Equality tribunal, reputational damage | Low | Justified reasons only, legal review | OPEN |
| Deprivation of Liberty (live-in care) | MCA breach, safeguarding concern | Low | DoLS guidance, family confirmation | OPEN |

---

## NEXT STEPS

### Immediate Actions (Week 1-2)

1. **Engage legal counsel** (healthcare law specialist, data protection lawyer, employment law specialist)
2. **CQC registration legal opinion** (URGENT - may require 3-6 months)
3. **DPIA initiation** (appoint DPO or data protection advisor)
4. **Insurance requirements review** (contact specialist insurance broker)

### Short-Term Actions (Week 3-8)

5. Complete DPIA
6. Medication assistance policy (clinical governance review)
7. Mental Capacity Act compliance procedures
8. Right to work verification process
9. Cookie consent implementation
10. Gender preference policy (Equality Act review)

### Medium-Term Actions (Week 9-12)

11. Safeguarding Adults Boards liaison procedures
12. Deprivation of Liberty risk assessment (if live-in care)
13. Terms of Service legal review (caregiver and care receiver)
14. Privacy Policy legal review
15. All legal agreements finalized

### Long-Term Actions (If CQC Registration Required)

16. CQC registration application (3-6 months)
17. Registered Manager appointment
18. CQC policies and procedures preparation
19. CQC inspection preparation

---

**Document Status**: DRAFT - Requires Legal Review

**Legal Disclaimer**: This document identifies legal considerations and open questions. It does NOT constitute legal advice. All legal matters must be reviewed by qualified legal counsel specializing in healthcare law, data protection, and employment law before launch.

---

**END OF DOCUMENT**
