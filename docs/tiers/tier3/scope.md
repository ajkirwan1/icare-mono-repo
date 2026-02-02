# Tier 3 Scope Document

**Document Purpose**: Define the scope, features, and compliance requirements for Tier 3 (Condition-Specific Matching).

**Status**: FUTURE (Triggered by Tier 2 success metrics)
**Last Updated**: 2026-02-01

---

## Overview

Tier 3 enables **condition-specific matching** and **live-in care** with explicit consent for health data processing. This represents a significant compliance step as it requires processing special category data under GDPR Article 9.

---

## Trigger Criteria (Gate 2)

Tier 3 development begins when ALL of these are met:

| Metric | Target | Status |
|--------|--------|--------|
| Monthly Active Users | 2,000+ | Pending |
| Personal Care Bookings | 300+/month | Pending |
| Verified Caregivers | 200+ | Pending |
| Monthly Revenue | 20,000+ GBP | Pending |
| Repeat Booking Rate | 40%+ | Pending |
| Caregiver Retention | 80%+ after 6 months | Pending |
| Condition-Specific Demand | 30%+ of care receivers | Pending |

---

## Services Added at Tier 3

| Service Type | Tier 2 | Tier 3 |
|--------------|--------|--------|
| Live-in care | No | **Yes** |
| Dementia-specific care | No | **Yes** |
| End-of-life support | No | **Yes** |
| Condition-specific matching | No | **Yes** |
| Clinical safety monitoring | No | **Yes** |

---

## New Data Collected at Tier 3

| Data Type | Purpose | Classification |
|-----------|---------|----------------|
| Health-inferring skill requirements | Condition matching | **Special category** |
| Risk assessment information | Safeguarding | **Special category** |
| Care complexity indicators | Matching, pricing | **Special category** |
| Emergency health information | Safety | **Special category** |

---

## Tier 3 Feature Summary

### Care Receiver Features (New)
- Medical condition profile (explicit consent)
- Condition-specific caregiver matching
- Risk assessment capture
- Care complexity indication
- Live-in care bookings
- Emergency information storage

### Caregiver Features (New)
- Medical condition experience profile
- Condition-specific training verification
- Live-in care availability
- Clinical safety logging

### Admin Features (New)
- Clinical safety monitoring dashboard
- Condition-specific safeguarding protocols
- Live-in care DoLS guidance workflow
- SAB liaison tools

### Clinical Safety Features (New)
- Medication prompting logging
- Falls and injury reporting
- Behavioral change flags
- Emergency escalation workflows

---

## Compliance Requirements (Incremental)

| Requirement | Cost | Timeline |
|-------------|------|----------|
| Full DPIA (Special Category) | 8,000-15,000 GBP | 4-6 weeks |
| ICO Prior Consultation | Included in DPIA | 4-8 weeks |
| Explicit Consent Mechanism | Development | 2 weeks |
| Enhanced Data Security | Development + audit | 4-6 weeks |
| DoLS Guidance Framework | 2,000-3,000 GBP | 2-3 weeks |
| Mental Capacity Act Policy | 2,000-3,000 GBP | 2-3 weeks |
| **TOTAL (Incremental)** | **40,000-60,000 GBP** | - |

---

## Key Compliance Considerations

### GDPR Article 9 (Special Category Data)
- Requires **explicit consent** for health data processing
- ICO prior consultation may be required
- Enhanced security measures mandatory
- Clear retention and deletion policies

### Mental Capacity Act 2005
- Capacity assessment considerations
- Best interests framework
- DoLS guidance for live-in care

### Care Act 2014
- Enhanced safeguarding for vulnerable adults
- SAB liaison procedures
- Condition-specific incident response

---

## Open Questions for Tier 3

1. **ICO consultation**: Will our DPIA trigger mandatory prior consultation?
2. **Consent granularity**: How granular should condition disclosure consent be?
3. **DoLS verification**: How do we verify family attestation for live-in care?
4. **Clinical governance**: Do we need a clinical governance structure?

---

## Agent Task

**To complete this document, assign**:
- **Agent**: product-requirements-specialist
- **Task**: Create TASK-XXX-tier3-scope.md
- **Output**: Complete Tier 3 scope with user stories and acceptance criteria

---

**Last Updated**: 2026-02-01
