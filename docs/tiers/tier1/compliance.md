# Tier 1 Compliance Requirements

**Document Purpose**: Regulatory and legal compliance requirements for Tier 1 launch.

**Status**: ACTIVE
**Last Updated**: 2026-02-06

---

## Overview

Tier 1 compliance is designed to be the **minimum legally viable** posture for companionship-only services. We do not over-invest in compliance before business validation, but we never under-comply.

---

## Regulatory Classification

### CQC Registration
- **Status**: NOT REQUIRED
- **Rationale**: Introduction Agency model (platform facilitates, doesn't employ)
- **Evidence**: FDR-002 decision, legal opinion required

### DPIA Classification
- **Tier**: Tier 1 (Minimal)
- **Data Type**: Standard personal data only
- **Special Category Data**: NONE
- **ICO Prior Consultation**: Unlikely required

---

## Required Legal Documents

| Document | Status | Priority | Cost | Timeline |
|----------|--------|----------|------|----------|
| Privacy Policy | REQUIRED | BLOCKER | 1,000-2,000 GBP | 1 week |
| Terms of Service (CR) | REQUIRED | BLOCKER | 2,000-3,000 GBP | 1 week |
| Terms of Service (CG) | REQUIRED | BLOCKER | Included above | 1 week |
| Cookie Policy | REQUIRED | BLOCKER | 500-1,000 GBP | 1 week |
| Safeguarding Policy | REQUIRED | BLOCKER | Included in legal | 1-2 weeks |
| Legal Opinion (CQC) | RECOMMENDED | HIGH | 3,000-5,000 GBP | 1-2 weeks |

---

## Regulatory Registrations

| Registration | Status | Cost | Timeline |
|--------------|--------|------|----------|
| ICO Registration | REQUIRED | 40-60 GBP | 1 day |
| CQC Registration | NOT REQUIRED | N/A | N/A |
| DBS Umbrella Body | VOLUNTARY | N/A | N/A |

---

## Data Protection Requirements

### GDPR Compliance

| Requirement | Tier 1 Status |
|-------------|---------------|
| Privacy Policy | Required |
| Consent Mechanism | Required |
| Data Subject Rights | Required |
| Data Retention Policy | Required |
| Data Breach Procedure | Required |
| DPIA | Required (simplified) |
| DPO | Optional (consultant OK) |

### Data Collected at Tier 1

| Data Type | Purpose | Legal Basis | Classification |
|-----------|---------|-------------|----------------|
| Name, email, phone | Account creation | Contract | Standard |
| Postcode | Location search | Contract | Standard |
| Service preferences | Basic matching | Legitimate interest | Standard |
| Professional details | Profile creation | Contract | Standard |
| Payment information | Transactions | Contract | Standard (via Stripe) |

### Data NOT Collected at Tier 1

| Data Type | Why Restricted | Available From |
|-----------|----------------|----------------|
| Medical conditions | Special category | Tier 3 |
| Health-related skills | May infer health | Tier 2 |
| Care plans | Health data | Tier 4 |
| Risk assessments | Health inference | Tier 3 |

---

## Safeguarding Requirements

### Care Act 2014 Compliance

| Requirement | Tier 1 Approach |
|-------------|-----------------|
| Safeguarding Policy | Published, companionship-scope |
| Reporting Mechanism | User-facing report form |
| Admin Response | 24-hour SLA, documented workflow |
| SAB Liaison | Contact list maintained |
| Emergency Escalation | 999 guidance documented |

### Verification Requirements

| Verification | Tier 1 Status | Notes |
|--------------|---------------|-------|
| ID Verification | MANDATORY | Stripe Identity |
| Right to Work | MANDATORY | UKVI share code |
| Phone Verification | MANDATORY | SMS OTP |
| Email Verification | MANDATORY | Double opt-in |
| DBS Check | VOLUNTARY | Trust signal only |
| Qualifications | NOT REQUIRED | Deferred to Tier 2 |
| Insurance | NOT REQUIRED | Deferred to Tier 2 |

---

## Insurance Requirements

### Platform Insurance

| Type | Status | Coverage |
|------|--------|----------|
| Public Liability | REQUIRED | Platform operations |
| Cyber Insurance | REQUIRED | Data breach |
| Professional Indemnity | REQUIRED | Platform services |
| D&O Insurance | RECOMMENDED | Directors/Officers |

**Estimated Cost**: 3,000-6,000 GBP/year

### Caregiver Insurance

| Type | Tier 1 Status | Notes |
|------|---------------|-------|
| Public Liability | NOT VERIFIED | Self-declaration |
| Professional Indemnity | NOT VERIFIED | Deferred to Tier 2 |

---

## Compliance Checklist

### Pre-Launch BLOCKERS

- [ ] Privacy Policy drafted and legally reviewed
- [ ] Terms of Service drafted and legally reviewed
- [ ] Safeguarding Policy published
- [ ] Cookie consent mechanism implemented
- [ ] ICO registration completed
- [ ] Tier 1 DPIA completed
- [ ] Platform insurance procured
- [ ] Legal opinion on CQC position obtained

### Operational Requirements

- [ ] Admin safeguarding training completed
- [ ] Incident response plan documented
- [ ] Data breach procedure documented
- [ ] SAB contacts identified
- [ ] Emergency escalation procedure documented

---

## Cost Summary

| Category | Cost (GBP) |
|----------|------------|
| Legal Setup | 6,000-10,000 |
| DPIA | 2,000-4,000 |
| ICO Registration | 40-60 |
| Insurance (annual) | 3,000-6,000 |
| Contingency (20%) | 2,000-4,000 |
| **TOTAL** | **15,000-25,000** |

---

## Related Documents

- [Legal Framework](/docs/compliance/legal-framework.md)
- [DPIA](/docs/compliance/dpia.md)
- [Tiered Market Entry Roadmap](/docs/ROADMAP.md)
- [Gating Decisions](/docs/governance/gating-decisions.md)
- [Founder Decisions](/docs/governance/founder-decisions-responses.md)

---

**Last Updated**: 2026-02-06
