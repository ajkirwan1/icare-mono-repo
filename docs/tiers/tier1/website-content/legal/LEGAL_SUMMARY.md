# Legal Documents Summary - Tier 1 Launch

**Created**: 2026-02-01
**Status**: DRAFT - All Documents Require Legal Counsel Review
**Author**: Compliance Specialist Agent

---

## Executive Summary

This directory contains **DRAFT** legal documents for Tier 1 launch of the elderly care marketplace. All documents are based on:
- **FDR-001**: Platform is a technology marketplace connecting self-employed independent professionals
- **FDR-002**: Platform does NOT require CQC registration (Introduction Agency model)
- **FDR-003**: Tiered market entry strategy (Tier 1: companionship services only, NO special category health data)

**CRITICAL**: These are drafts created by the compliance specialist agent. They MUST be reviewed and finalized by a qualified UK solicitor before publication.

---

## Document Inventory

| Document | Purpose | Word Count (approx.) | Priority | Status |
|----------|---------|----------------------|----------|--------|
| **terms-care-receivers.md** | Terms of Service for families booking care | 7,500 | CRITICAL | DRAFT |
| **terms-caregivers.md** | Terms of Service for self-employed caregivers | 8,500 | CRITICAL | DRAFT |
| **privacy-policy.md** | GDPR privacy notice (Tier 1 data only) | 6,000 | CRITICAL | DRAFT |
| **safeguarding-policy.md** | Care Act 2014 safeguarding policy | 7,000 | CRITICAL | DRAFT |
| **cookie-policy.md** | PECR cookie compliance | 3,500 | HIGH | DRAFT |

**Total**: ~32,500 words of legal documentation

---

## 1. Terms of Service - Care Receivers

**File**: `terms-care-receivers.md`

### Summary

Legal contract between Platform and care receivers (or their families) using the marketplace to find companionship services.

### Key Provisions

**Introduction Agency Model**:
- Explicit statement that Platform is NOT a care provider
- Caregivers are self-employed (NOT Platform employees)
- Platform is NOT CQC-registered
- Platform does NOT guarantee care quality

**Tier 1 Service Scope**:
- Companionship, light housework, shopping, meal preparation ONLY
- NO personal care services at Tier 1
- Clear explanation of regulatory classification (non-regulated activities)

**Verification Transparency**:
- What Platform verifies (ID, right to work, voluntary DBS)
- What verification does NOT guarantee (care quality, competence)
- DBS is voluntary at Tier 1 (not mandatory for companionship)

**Liability Limitations**:
- Platform liable for: payment processing, data protection, verification accuracy
- Platform NOT liable for: care quality, caregiver conduct, care outcomes
- Liability cap (total fees paid in 12 months)
- Consumer Rights Act compliance (no exclusion of statutory rights)

**Mental Capacity Act Compliance**:
- Family members booking on behalf of others must have lawful authority (LPA or best interests)
- Platform does NOT verify legal authority (user responsibility)

**Safeguarding Duties**:
- Care Act 2014 compliance
- Reporting obligations
- Cooperation with Safeguarding Adults Boards

**Payment Terms**:
- Escrow model (payment held until booking completion)
- Commission structure (placeholder: 10% until FDR-008 finalized)
- Cancellation and refund policy (>24h full refund, <24h 50% refund)

### Legal Risks Identified

| Risk | Severity | Mitigation |
|------|----------|------------|
| **CQC challenges Introduction Agency position** | HIGH | Legal opinion required; FDR-001 and FDR-002 documented; voluntary CQC-aligned policies |
| **Liability limitations unenforceable (Consumer Rights Act)** | MEDIUM | Legal review required; comply with unfair contract terms legislation |
| **Mental Capacity Act compliance gaps** | MEDIUM | Add LPA verification at Tier 2+; provide MCA guidance to families |
| **Cancellation policy challenged** | LOW | Complies with Consumer Rights Act 2015 (distance selling) |

### Sections Requiring Legal Review (High Priority)

1. **Section 3: Platform Model: Introduction Agency** - Core legal classification
2. **Section 11: Limitation of Liability** - Consumer Rights Act compliance
3. **Section 7: Payment Terms** - Commission structure, pricing transparency
4. **Section 5.2: Booking on Behalf of Others** - Mental Capacity Act compliance
5. **Section 12: Indemnification** - Enforceability under UK law

### Placeholders to Replace

- `[PLATFORM_NAME]`
- `[COMPANY_NAME]`
- `[COMPANY_NUMBER]`
- `[REGISTERED_ADDRESS]`
- `[CONTACT_EMAIL]`, `[SUPPORT_EMAIL]`, `[SAFEGUARDING_EMAIL]`, `[DATA_PROTECTION_EMAIL]`
- `[ICO_NUMBER]`
- `[PLACEHOLDER: 10%]` (commission - awaiting FDR-008)
- `[EFFECTIVE_DATE]`, `[LAST_UPDATED_DATE]`

---

## 2. Terms of Service - Caregivers

**File**: `terms-caregivers.md`

### Summary

Legal contract between Platform and self-employed caregivers offering companionship services. CRITICAL for establishing genuine self-employment status and avoiding IR35 challenges.

### Key Provisions

**Self-Employment Status** (IR35 Protection):
- Explicit self-employed declaration (NOT employee, worker, or agent)
- No mutuality of obligation (no guaranteed work, no obligation to accept)
- Control over work performance (caregivers determine HOW to deliver care)
- Substitution rights (caregivers can send qualified substitutes)
- Rate-setting autonomy (caregivers set own hourly rates)
- Right to decline bookings (absolute discretion, no penalties)
- No employment rights (no minimum wage, holiday pay, sick pay, pension)

**Tax and Insurance Obligations**:
- HMRC self-assessment responsibility
- Income Tax and National Insurance responsibility
- Public Liability Insurance mandatory (£1M minimum)
- Professional Indemnity Insurance recommended (£1M minimum)

**Tier 1 Service Scope**:
- Companionship, light housework, shopping, meal preparation ONLY
- NO personal care at Tier 1
- Clear boundaries (what caregivers CAN and CANNOT offer)

**Platform Role**:
- What Platform provides (marketplace infrastructure, payment processing, verification)
- What Platform does NOT provide (employment benefits, supervision, clinical governance)

**Verification Requirements**:
- Mandatory: ID, right to work, phone, email
- Voluntary: DBS certificate upload (for "DBS Verified" badge)
- Explanation of why DBS is voluntary at Tier 1 (companionship is NOT regulated activity)

**Payment and Commission**:
- Caregivers set own rates
- Platform commission (placeholder: 10% until FDR-008 finalized)
- Payout timeline (2 business days after completion)
- Tax invoicing responsibility

**Liability and Indemnification**:
- Caregivers independently liable for care quality and outcomes
- Caregivers indemnify Platform for professional conduct claims
- Insurance coverage (Public Liability and Professional Indemnity)

### Legal Risks Identified

| Risk | Severity | Mitigation |
|------|----------|------------|
| **IR35 challenge (disguised employment)** | HIGH | IR35-compliant language throughout; legal review by employment law specialist required |
| **HMRC questions self-employment status** | MEDIUM | Genuine autonomy (rate-setting, booking acceptance, substitution); no excessive control |
| **Employment tribunal claim (worker/employee status)** | MEDIUM | No mutuality of obligation; no employment-like benefits; indemnification clause |
| **Caregiver challenges liability for care quality** | LOW | Clear Terms; insurance requirements; self-employment status |

### Sections Requiring Legal Review (High Priority - IR35 Critical)

1. **Section 3: SELF-EMPLOYMENT STATUS** - IR35 compliance foundation
2. **Section 4: KEY SELF-EMPLOYMENT INDICIA** - Employment status tests (mutuality, control, substitution)
3. **Section 8: Payment and Commission** - Ensure payment model supports self-employment
4. **Section 12: Liability and Indemnification** - Enforceability and fairness
5. **Section 20: Acceptance of Terms** - Self-employment acknowledgment checkboxes

### Placeholders to Replace

- `[PLATFORM_NAME]`
- `[COMPANY_NAME]`
- `[COMPANY_NUMBER]`
- `[REGISTERED_ADDRESS]`
- `[CONTACT_EMAIL]`, `[SUPPORT_EMAIL]`, `[SAFEGUARDING_EMAIL]`, `[DATA_PROTECTION_EMAIL]`
- `[ICO_NUMBER]`
- `[PLACEHOLDER: 10%]` (commission - awaiting FDR-008)
- `[EFFECTIVE_DATE]`, `[LAST_UPDATED_DATE]`

### IR35 Specialist Review Required

This document requires review by a solicitor specializing in:
- Employment law (IR35, off-payroll working rules)
- Self-employment classification
- HMRC status tests (control, substitution, mutuality of obligation)

**Case Law References**: Uber BV v Aslam [2021] UKSC 5, Pimlico Plumbers Ltd v Smith [2018] UKSC 29, Addison Lee Ltd v Gascoigne [2018]

---

## 3. Privacy Policy

**File**: `privacy-policy.md`

### Summary

GDPR and Data Protection Act 2018 compliant privacy notice explaining how Platform collects, uses, stores, and protects personal data at Tier 1 (standard personal data only, NO special category health data).

### Key Provisions

**Data Controller Information**:
- Company details and ICO registration number
- Data protection contact
- ICO complaint procedure

**Tier 1 Data Scope**:
- Standard personal data ONLY (name, email, phone, postcode, service preferences)
- NO special category data (no medical conditions, health data, care plans)
- Explanation of Tier 1 limitations (companionship only)

**Lawful Basis for Processing** (UK GDPR Article 6):
- Contract performance (account creation, bookings, payments)
- Legitimate interest (ID verification for safeguarding)
- Legal obligation (right to work verification, safeguarding reporting)
- Vital interests (emergency contacts)
- Consent (marketing communications)

**Data Sharing**:
- Other users (caregiver profiles, contact details after booking)
- Third parties (Stripe for payments, Google Analytics if consent)
- Safeguarding authorities (SABs, police if required)
- No selling of data to third parties

**Data Retention**:
- Active accounts: While active + 7 years (legal claims period)
- Deleted accounts: 30 days (pseudonymized) then 7 years (anonymized)
- Booking records: 7 years (financial and safeguarding compliance)
- Safeguarding reports: 7 years minimum (Care Act 2014)

**Data Subject Rights** (GDPR Articles 15-21):
- Access (Subject Access Request)
- Rectification
- Erasure (right to be forgotten, subject to legal retention)
- Restriction, Portability, Objection
- Withdraw consent
- Complain to ICO

**Data Security**:
- Encryption at rest (AES-256) and in transit (HTTPS/TLS)
- Role-based access control
- Audit logging
- Incident response plan
- Breach notification (72 hours to ICO if required)

**International Transfers**:
- UK-only platform (no routine international transfers)
- Third parties (Stripe) may process in EEA (adequacy decision)

**Cookies**:
- Reference to Cookie Policy
- Essential vs. non-essential cookies
- Consent mechanism

### Legal Risks Identified

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Lawful basis incorrectly identified** | MEDIUM | Legal review required; ensure all processing has valid Article 6 basis |
| **Data retention periods non-compliant** | MEDIUM | Legal review of retention periods vs. HMRC, Care Act, limitation period requirements |
| **Third-party processors non-compliant** | LOW | Ensure Stripe and other processors have Data Processing Agreements (DPAs) |
| **Data breach notification process inadequate** | MEDIUM | Implement breach response plan; test notification procedures |
| **Subject Access Request process unclear** | LOW | Document SAR procedure; train staff |

### Sections Requiring Legal Review (High Priority)

1. **Section 6: How We Use Your Data (Lawful Basis)** - Ensure Article 6 bases are correctly identified
2. **Section 7: Data Sharing and Recipients** - Lawful sharing for safeguarding (Article 6(1)(e), GDPR exemptions)
3. **Section 8: Data Retention** - Compliance with HMRC, Care Act, limitation periods
4. **Section 9: Your Data Protection Rights** - Accurate description of GDPR rights and limitations
5. **Section 10: Data Security** - Adequate technical and organizational measures

### Placeholders to Replace

- `[COMPANY_NAME]`, `[COMPANY_NUMBER]`, `[REGISTERED_ADDRESS]`
- `[ICO_NUMBER]` (MUST obtain before launch)
- `[DATA_PROTECTION_EMAIL]`, `[CONTACT_EMAIL]`, `[SUPPORT_EMAIL]`
- `[PRIVACY_POLICY_URL]`, `[COOKIE_POLICY_URL]`, `[SAFEGUARDING_POLICY_URL]`
- `[PROVIDER_NAME]` (email, SMS, hosting providers)
- `[EFFECTIVE_DATE]`, `[LAST_UPDATED_DATE]`

### GDPR Compliance Checklist

- [ ] ICO registration completed (mandatory before launch)
- [ ] Data Protection Officer (DPO) or consultant engaged
- [ ] Data Processing Agreements (DPAs) signed with all third-party processors
- [ ] Subject Access Request (SAR) procedure documented
- [ ] Data breach response plan in place
- [ ] Staff training on GDPR and data protection

---

## 4. Safeguarding Policy

**File**: `safeguarding-policy.md`

### Summary

Care Act 2014 compliant safeguarding policy outlining Platform's commitment to protecting vulnerable adults from abuse, neglect, and harm. Defines reporting procedures, investigation workflows, and Safeguarding Adults Board (SAB) liaison.

### Key Provisions

**Care Act 2014 Compliance**:
- Section 42 duties (safeguarding adults at risk)
- Six safeguarding principles (empowerment, prevention, proportionality, protection, partnership, accountability)
- SAB cooperation and information sharing

**Types of Abuse Defined** (Care Act 2014 Section 14.17):
- Physical, emotional/psychological, sexual, financial, neglect, discriminatory, domestic, modern slavery, institutional, self-neglect

**Reporting Mechanisms**:
- In-app safeguarding reporting
- Email: [SAFEGUARDING_EMAIL]
- Phone: [SAFEGUARDING_PHONE] (24/7 for urgent concerns)
- Anonymous reporting accepted

**Response and Investigation**:
- Acknowledgment within 24 hours (immediate for urgent)
- Investigation within 7 days (non-critical)
- Evidence gathering, assessment, decision (substantiated/unsubstantiated/inconclusive)

**Escalation to Safeguarding Adults Board (SAB)**:
- Section 42 criteria met (adult has care needs, experiencing abuse, unable to protect themselves)
- Serious harm (physical, sexual, financial exploitation >£1,000)
- Pattern of abuse
- Criminal activity suspected

**SAB Liaison Process**:
- Referral to local authority SAB
- Written referral with all evidence
- Cooperation with SAB enquiries
- Information sharing (GDPR safeguarding exemption)

**Actions Against Users**:
- Caregivers: Warning, suspension, termination, ban
- Care receivers: Warning, suspension, termination (if perpetrator)
- Support to victims (referral to adult social care, advocacy services)

**Mental Capacity Act Considerations**:
- Capacity presumption
- Best interests decision-making
- LPA recognition
- DoLS (Deprivation of Liberty Safeguards) for live-in care at Tier 3+

**Information Sharing (GDPR-Compliant)**:
- Article 6(1)(d) - Vital interests (life-threatening)
- Article 6(1)(e) - Public interest (safeguarding duties)
- Data Protection Act 2018, Section 10(3) - Safeguarding exemption

**Record Keeping**:
- All safeguarding reports logged
- Audit trail of actions and decisions
- Retention: 7 years minimum (Care Act 2014)

**Training and Awareness**:
- Staff safeguarding training (Level 3 for Safeguarding Lead)
- Caregiver safeguarding resources
- Care receiver/family guidance

### Legal Risks Identified

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Failure to escalate to SAB (Care Act breach)** | HIGH | Clear escalation criteria; staff training; audit of safeguarding reports |
| **Inadequate investigation (failure to protect)** | HIGH | Documented investigation procedure; evidence gathering; timely response |
| **Unlawful information sharing (GDPR breach)** | MEDIUM | Legal review of sharing basis; Data Protection Act 2018 safeguarding exemption |
| **Safeguarding Lead not adequately trained** | MEDIUM | Designate Safeguarding Lead with Level 3 training before launch |
| **Inadequate record keeping (accountability failure)** | MEDIUM | Implement safeguarding case management system; 7-year retention |

### Sections Requiring Legal Review (High Priority)

1. **Section 2: Legal and Regulatory Framework** - Care Act 2014 duties accurately reflected
2. **Section 8.3: Escalation to Safeguarding Adults Board** - Section 42 criteria correct
3. **Section 11: Information Sharing and Confidentiality** - Lawful basis for sharing (GDPR exemptions)
4. **Section 9.1: Mental Capacity and Consent** - Mental Capacity Act compliance
5. **Section 12: Record Keeping and Audit** - Retention periods and audit requirements

### Placeholders to Replace

- `[COMPANY_NAME]`, `[PLATFORM_NAME]`
- `[SAFEGUARDING_LEAD_NAME]`, `[SAFEGUARDING_LEAD_EMAIL]`
- `[SAFEGUARDING_EMAIL]`, `[SAFEGUARDING_PHONE]`
- `[CONTACT_EMAIL]`, `[SUPPORT_EMAIL]`, `[DATA_PROTECTION_EMAIL]`
- `[PRIVACY_POLICY_URL]`, `[TERMS_CARE_RECEIVERS_URL]`, `[TERMS_CAREGIVERS_URL]`, `[MCA_GUIDANCE_URL]`
- `[EFFECTIVE_DATE]`, `[LAST_UPDATED_DATE]`, `[ANNUAL_REVIEW_DATE]`

### Safeguarding Lead Requirements

**MUST designate a Safeguarding Lead before launch**:
- Name, role, contact details
- Level 3 Safeguarding Adults training (or equivalent)
- Authority to escalate to SAB
- Responsibility for safeguarding case management and audit

---

## 5. Cookie Policy

**File**: `cookie-policy.md`

### Summary

Privacy and Electronic Communications Regulations (PECR) compliant cookie policy explaining cookie use, consent requirements, and management options.

### Key Provisions

**Cookie Categories**:
- **Essential** (no consent required): Session, authentication, security, payment (Stripe)
- **Functional** (consent required): Language, UI preferences
- **Analytics** (consent required): Google Analytics (if used), platform analytics
- **Marketing** (consent required): NOT used at Tier 1 launch (placeholder for future)

**Cookie Consent Banner**:
- Displayed on first visit (before non-essential cookies set)
- Options: Accept All, Reject Non-Essential, Customize
- Link to Cookie Policy
- Consent stored in `cookie_consent` cookie (12 months)
- Re-trigger if cookie categories change

**Third-Party Cookies**:
- Stripe (payment processing, fraud detection) - essential
- Google Analytics (if user consents) - analytics
- Privacy policies linked

**Cookie Management**:
- Browser settings instructions (Chrome, Firefox, Safari, Edge)
- Account settings (manage cookie preferences)
- Do Not Track (DNT) signal honored (treat as opt-out of analytics/marketing)

**Cookie Inventory Table**:
- Complete list of cookies with name, purpose, duration, third party, consent requirement

### Legal Risks Identified

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Non-essential cookies set before consent (PECR breach)** | HIGH | Implement cookie consent banner correctly; ONLY set essential cookies before consent |
| **Consent mechanism not PECR-compliant** | MEDIUM | Legal review of consent banner; ensure consent is specific, informed, freely given, easily withdrawn |
| **Third-party cookies not disclosed** | MEDIUM | Complete cookie audit; identify all third-party cookies; link to their privacy policies |
| **Analytics cookies set without consent** | MEDIUM | ONLY load Google Analytics script AFTER consent obtained |

### Sections Requiring Legal Review (High Priority)

1. **Section 2: Types of Cookies We Use** - Correct classification (essential vs. non-essential)
2. **Section 4: Cookie Consent Banner** - PECR-compliant consent mechanism
3. **Section 3: Third-Party Cookies** - Complete disclosure of third-party cookies
4. **Section 7: Cookie Inventory** - Accurate and complete cookie table

### Placeholders to Replace

- `[COMPANY_NAME]`, `[PLATFORM_NAME]`
- `[DATA_PROTECTION_EMAIL]`, `[SUPPORT_EMAIL]`, `[REGISTERED_ADDRESS]`
- `[PRIVACY_POLICY_URL]`, `[COOKIE_POLICY_URL]`, `[TERMS_URL]`
- `[PROVIDER_NAME]` (list any additional third parties)
- `[EFFECTIVE_DATE]`, `[LAST_UPDATED_DATE]`

### Implementation Requirements

**Development team must implement**:
1. Cookie consent banner (display on first visit)
2. Granular consent options (accept all, reject all, customize)
3. Cookie management in account settings
4. ONLY set non-essential cookies AFTER consent
5. Delete non-essential cookies if consent withdrawn
6. Respect DNT signals (opt out of analytics/marketing)

---

## Legal Counsel Engagement Recommendations

### 1. Solicitor Selection

**Specializations Required**:

**Primary Legal Review** (All Documents):
- UK healthcare/social care law
- Adult social care regulation (Care Act 2014)
- Data protection (GDPR, Data Protection Act 2018)
- Consumer law (Consumer Rights Act 2015)

**Employment Law Specialist** (Caregiver Terms):
- IR35 and off-payroll working rules
- Self-employment classification
- HMRC status tests
- Employment Rights Act 1996

**Recommended Firms**:
- National firms with healthcare and employment law departments
- Specialist healthcare law firms (e.g., Hempsons, Capsticks, Bevan Brittan)
- Data protection boutique firms (GDPR/PECR compliance)

### 2. Scope of Legal Review

**Critical Path (Pre-Launch)**:

| Task | Estimated Cost | Timeline | Priority |
|------|----------------|----------|----------|
| **Legal opinion on Introduction Agency status** | £3,000-5,000 | 1-2 weeks | CRITICAL |
| **Review and finalize all 5 legal documents** | £5,000-8,000 | 2-3 weeks | CRITICAL |
| **IR35 compliance review (Caregiver Terms)** | £2,000-3,000 | 1 week | CRITICAL |
| **GDPR compliance audit** | £3,000-5,000 | 1-2 weeks | CRITICAL |
| **TOTAL PRE-LAUNCH LEGAL** | **£13,000-21,000** | **3-4 weeks** | - |

**Post-Launch (Ongoing)**:

| Task | Estimated Cost | Frequency |
|------|----------------|-----------|
| **Fractional legal counsel retainer** | £2,000-4,000/month | Ongoing |
| **Safeguarding policy review** | £1,500-2,500 | Annual |
| **Terms of Service updates** | £1,000-2,000 | As needed |
| **Compliance audit** | £5,000-10,000 | Annual |

### 3. Legal Review Priorities

**Tier 1 (Week 1-2) - Foundation**:
1. **Legal opinion on Introduction Agency status** (supports CQC position)
2. **IR35 compliance review** (caregiver self-employment status)
3. **Liability limitations review** (Consumer Rights Act enforceability)

**Tier 2 (Week 2-3) - Finalization**:
4. **Review and finalize all 5 legal documents**
5. **GDPR compliance audit** (data processing, lawful bases, DPAs)
6. **Cookie consent banner review** (PECR compliance)

**Tier 3 (Week 3-4) - Pre-Launch Checks**:
7. **Final legal sign-off** on all documents
8. **Placeholder replacement verification**
9. **Accessibility and plain English review**

### 4. Legal Risks Summary

**High-Severity Risks** (MUST address before launch):

1. **CQC challenges Introduction Agency classification**:
   - Mitigation: Legal opinion; FDR-001/FDR-002 documentation; voluntary CQC alignment
   - Cost: £3,000-5,000 (legal opinion)

2. **IR35 challenge to caregiver self-employment status**:
   - Mitigation: IR35-compliant Terms; employment law specialist review; genuine autonomy features
   - Cost: £2,000-3,000 (IR35 review)

3. **Failure to escalate safeguarding concerns to SAB (Care Act breach)**:
   - Mitigation: Clear escalation criteria; Safeguarding Lead training; audit trail
   - Cost: £1,500-2,500 (Safeguarding Lead training) + ongoing oversight

4. **Non-essential cookies set before consent (PECR breach)**:
   - Mitigation: Cookie consent banner implementation; legal review
   - Cost: Included in document review

**Medium-Severity Risks** (Should address before launch):

5. **Liability limitations unenforceable (Consumer Rights Act)**:
   - Mitigation: Legal review; comply with unfair contract terms legislation
   - Cost: Included in document review

6. **Mental Capacity Act compliance gaps**:
   - Mitigation: LPA verification at Tier 2+; MCA guidance for families
   - Cost: Guidance development (internal)

7. **GDPR lawful basis incorrectly identified**:
   - Mitigation: GDPR compliance audit; DPO review
   - Cost: £3,000-5,000 (GDPR audit)

### 5. Pre-Launch Legal Checklist

**Before launching Platform, ensure**:

- [ ] All 5 legal documents reviewed and finalized by qualified UK solicitor
- [ ] Legal opinion on Introduction Agency status obtained and documented
- [ ] IR35 compliance confirmed by employment law specialist
- [ ] All placeholders replaced with actual company details, emails, ICO number
- [ ] ICO registration completed (Data Controller registration)
- [ ] Safeguarding Lead designated and trained (Level 3 Safeguarding Adults)
- [ ] Data Processing Agreements (DPAs) signed with Stripe and other third parties
- [ ] Cookie consent banner implemented and tested (PECR-compliant)
- [ ] Subject Access Request (SAR) procedure documented
- [ ] Data breach response plan documented and tested
- [ ] Safeguarding case management system implemented
- [ ] Staff training completed (GDPR, safeguarding, platform policies)
- [ ] Accessibility and plain English review of all legal documents
- [ ] Legal documents published on website with effective dates
- [ ] Terms acceptance flow implemented (checkboxes, electronic signature logging)

---

## Key Decisions Pending

**FDR-008: Pricing & Commission Structure** (URGENT):

All documents contain placeholder commission rate of **10%**. This MUST be finalized before launch to:
- Update Terms of Service (care receivers and caregivers)
- Update Privacy Policy (if commission affects data processing)
- Update pricing page content
- Implement commission calculation in payment system

**Timeline**: Resolve before completing legal review (commission structure affects Terms of Service).

---

## Regulatory Compliance Summary

### Legislation Addressed

| Legislation | Compliance Status | Documents |
|-------------|------------------|-----------|
| **Care Act 2014** | COMPLIANT (Tier 1) | Safeguarding Policy, Terms (both) |
| **UK GDPR / Data Protection Act 2018** | COMPLIANT (Tier 1 - standard data only) | Privacy Policy, Safeguarding Policy |
| **PECR (Cookies)** | COMPLIANT | Cookie Policy |
| **Consumer Rights Act 2015** | COMPLIANT | Terms (care receivers) |
| **Equality Act 2010** | COMPLIANT | Terms (both), Safeguarding Policy |
| **Mental Capacity Act 2005** | ADDRESSED (guidance, not enforcement) | Terms (care receivers), Safeguarding Policy |
| **Immigration Act 2014** | COMPLIANT (right to work verification) | Terms (caregivers), Privacy Policy |
| **Safeguarding Vulnerable Groups Act 2006** | COMPLIANT (voluntary DBS at Tier 1) | Terms (both), Safeguarding Policy |
| **Employment Rights Act 1996** | COMPLIANT (self-employment status) | Terms (caregivers) - IR35 review required |
| **Health and Social Care Act 2008** | N/A (CQC registration not required) | Terms (both) |

### Regulatory Bodies

| Body | Registration/Notification Required? | Status |
|------|-----------------------------------|--------|
| **Information Commissioner's Office (ICO)** | YES - Data Controller registration | PENDING (MUST complete before launch) |
| **Care Quality Commission (CQC)** | NO (Introduction Agency model) | N/A (FDR-002) |
| **HMRC** | NO (platform is NOT employer) | N/A (caregivers are self-employed) |
| **Safeguarding Adults Boards (SABs)** | NO (not a local authority, but must cooperate) | Liaison procedures in place |

---

## Next Steps

### Immediate Actions (This Week)

1. **Engage legal counsel** (healthcare law specialist with employment and data protection expertise)
2. **Provide legal counsel with**:
   - All 5 draft legal documents
   - FDR-001, FDR-002, FDR-003 (founder decisions)
   - Tier 1 feature scope and DPIA
   - Marketplace specification and technical architecture
3. **Complete ICO registration** (Data Controller) - £40-60 GBP annual fee
4. **Designate Safeguarding Lead** and arrange Level 3 training
5. **Resolve FDR-008** (Pricing & Commission Structure) to finalize Terms of Service

### Week 1-2

6. **Legal opinion on Introduction Agency status** (CQC position)
7. **IR35 compliance review** (caregiver self-employment)
8. **GDPR compliance audit** (data processing, lawful bases, third-party DPAs)

### Week 2-3

9. **Review and finalize all legal documents** based on legal counsel feedback
10. **Implement cookie consent banner** (PECR-compliant)
11. **Develop Subject Access Request (SAR) procedure**
12. **Develop data breach response plan**

### Week 3-4

13. **Replace all placeholders** with actual company details
14. **Accessibility and plain English review** of finalized documents
15. **Publish legal documents** on website (with effective dates)
16. **Implement Terms acceptance flow** (checkboxes, electronic signature logging)
17. **Staff training** (GDPR, safeguarding, platform policies)
18. **Final legal sign-off** before launch

---

## Conclusion

The 5 legal documents in this directory provide a comprehensive legal framework for Tier 1 launch, addressing:
- Introduction Agency model (Introduction Agency, NOT care provider)
- Self-employed caregiver status (IR35-compliant)
- GDPR data protection (standard personal data only)
- Care Act 2014 safeguarding (vulnerable adult protection)
- PECR cookie compliance (consent mechanism)

**CRITICAL**: These are DRAFT documents. Legal counsel review is MANDATORY before publication.

**Estimated Legal Investment**: £13,000-21,000 (pre-launch)
**Timeline**: 3-4 weeks (legal review and finalization)

**Contact**: For questions about these documents, contact the compliance specialist agent or legal counsel.

---

**Document Status**: SUMMARY COMPLETE
**Created**: 2026-02-01
**Author**: Compliance Specialist Agent
