# Tier 1 Documentation Guide

**Document Purpose**: Comprehensive navigation guide to all Tier 1 (Companionship MVP) documentation.

**Document Owner**: Product Director
**Created**: 2026-02-06
**Last Updated**: 2026-02-07
**Status**: CANONICAL

---

## 1. Executive Summary

### What is Tier 1?

Tier 1 represents the **Minimum Viable Product (MVP)** for the UK elderly care marketplace, focusing exclusively on **companionship services**. This tier validates product-market fit with the lowest possible compliance burden and investment risk.

**Key Characteristics**:
- **Services**: Companionship, light housework, shopping, meal preparation, transportation
- **Data Scope**: Standard personal data only (NO special category health data)
- **Verification**: ID, right to work, phone, email (DBS voluntary)
- **CQC Status**: NOT required (Introduction Agency model per FDR-002)
- **Timeline**: Months 1-6
- **Investment**: 15,000-25,000 GBP

### Current Readiness Status

| Metric | Status |
|--------|--------|
| **Overall Readiness** | 85% |
| **Website Content** | 92% complete (12/13 tasks) |
| **Feature Specifications** | 100% complete (6 specs) |
| **Technical Specifications** | 100% complete (3 docs) |
| **Legal Document Drafts** | 100% complete (5 docs) |
| **Legal Review** | NOT STARTED (blocker) |
| **R0 Screens Defined** | 30 screens |
| **R1 Screens Defined** | 47 screens |

### Key Blockers

1. **FDR-008**: Pricing/Commission decision - PENDING founder input
2. **Legal Counsel**: Not yet engaged for document review
3. **ICO Registration**: Not completed (required before launch)
4. **Platform Insurance**: Not procured

---

## 2. Document Map

### Visual Hierarchy

```
docs/tiers/tier1/
|
+-- DOCUMENTATION_GUIDE.md          <-- YOU ARE HERE
|
+-- CORE DOCUMENTS
|   +-- _index.md                   Overview and navigation hub
|   +-- features.md                 77 Tier 1 features across 11 systems
|   +-- compliance.md               Regulatory requirements
|
+-- STATUS & TRACKING
|   +-- TIER1_STATUS_LOG.md         **PRIMARY** - Comprehensive status tracking
|   +-- CONSISTENCY_AUDIT.md        Cross-document consistency check
|   +-- DOCUMENTATION_GUIDE.md      This document - navigation guide
|   +-- FIGMA_PRODUCTION_PLAN.md    Design production roadmap
|
+-- PREVENTION SYSTEMS (NEW - 2026-02-07)
|   +-- PRE_WORK_CHECKLIST.md       **MANDATORY** - 30-second safety checks (automated by product-director)
|   +-- decision-impact-log.md      CB decision tracking and artifact impact
|   +-- PREVENTION_SYSTEM_SPEC.md   Automated warning/prompt system specification
|   +-- WEEKLY_CHECKLIST.md         Manual consistency check checklist
|
+-- PLANNING
|   +-- planning/
|       +-- build-sequence.md       12-phase development roadmap
|       +-- launch-checklist.md     Launch readiness requirements
|       +-- r0-launch-scope.md      30 launch-critical screens
|       +-- r1-launch-scope.md      47 full MVP screens
|
+-- DESIGN SPECIFICATIONS
|   +-- draft-design-specs/
|       +-- screen-inventory.md     30 R0 screen definitions
|       +-- r0-financial-analysis.md Financial projections
|       +-- user-flows/
|           +-- care-receiver-first-booking.md
|           +-- caregiver-onboarding.md
|           +-- family-proxy-booking.md
|           +-- admin-verification.md
|           +-- safeguarding-response.md
|
+-- WEBSITE CONTENT
|   +-- website-content/
|       +-- _index.md               Content status tracker
|       +-- homepage.md             WEB-001
|       +-- how-it-works-families.md    WEB-002
|       +-- how-it-works-caregivers.md  WEB-003
|       +-- trust-and-safety.md     WEB-004
|       +-- pricing.md              WEB-005 (BLOCKED on FDR-008)
|       +-- about-us.md             WEB-006
|       +-- faq.md                  WEB-007 (80+ questions)
|       +-- contact.md              WEB-013
|       +-- CONTENT_SUMMARY.md
|       +-- legal/
|           +-- _index.md           Legal docs status
|           +-- LEGAL_SUMMARY.md    Risk analysis
|           +-- terms-care-receivers.md   WEB-008
|           +-- terms-caregivers.md       WEB-009
|           +-- privacy-policy.md         WEB-010
|           +-- safeguarding-policy.md    WEB-011
|           +-- cookie-policy.md          WEB-012
|       +-- pre-launch/
|           +-- CONTENT_STRATEGY_BRIEF.md
|           +-- DEVELOPER_HANDOFF.md
|           +-- articles/
|           +-- compliance/
|           +-- pages/

EXTERNAL TIER 1 DOCUMENTS (in other directories)
|
+-- docs/product/
|   +-- tier1-route-map.md          47 screens with routes and access control
|   +-- features/
|       +-- tier1-booking-specification.md
|       +-- tier1-verification-specification.md
|       +-- tier1-search-specification.md
|       +-- tier1-messaging-specification.md
|       +-- tier1-admin-specification.md
|       +-- tier1-safeguarding-specification.md
|
+-- docs/technical/
|   +-- database-schema-tier1.md    PostgreSQL schema
|   +-- api-specification-tier1.md  REST API endpoints
|   +-- stripe-integration-spec.md  Payment integration
|
+-- docs/compliance/
|   +-- legal-framework.md          UK regulatory requirements
|   +-- dpia.md                     Data Protection Impact Assessment
|   +-- policies/
|       +-- privacy-policy.md
|       +-- safeguarding-policy.md
|       +-- terms-of-service.md
|
+-- docs/governance/
    +-- founder-decisions-responses.md  FDR-001 through FDR-010
    +-- founder-decisions-strategic-analysis.md
    +-- gating-decisions.md         GD-01 through GD-11
    +-- pricing-decisions-status.md
    +-- product-decisions.md        DEC-001 through DEC-XXX
```

---

## 3. Document Inventory

### 3.1 Core Tier 1 Documents (in /docs/tiers/tier1/)

| File Path | Purpose | Audience | Status | Last Updated |
|-----------|---------|----------|--------|--------------|
| `_index.md` | Overview and navigation hub for Tier 1 | All stakeholders | Approved | 2026-02-06 |
| `features.md` | Complete list of 77 Tier 1 features across 11 systems | Product, Developer | Approved | 2026-02-06 |
| `compliance.md` | Regulatory and legal compliance requirements for Tier 1 | Legal, Founder, Compliance | Approved | 2026-02-06 |
| `TIER1_STATUS_LOG.md` | **PRIMARY** - Comprehensive status tracking with file inventory and task completion | Product Director, PM | Approved | 2026-02-07 |
| `CONSISTENCY_AUDIT.md` | Cross-document consistency check (12/27 issues resolved) | Product Team | Approved | 2026-02-06 |
| `DOCUMENTATION_GUIDE.md` | This document - navigation guide to all 57+ Tier 1 documents | All stakeholders | Approved | 2026-02-07 |
| `FIGMA_PRODUCTION_PLAN.md` | Dashboard-first design production roadmap with automation workflow | Product, Designer | Approved | 2026-02-07 |

### 3.2 Planning Documents (in /docs/tiers/tier1/planning/)

| File Path | Purpose | Audience | Status | Last Updated |
|-----------|---------|----------|--------|--------------|
| `build-sequence.md` | 12-phase development roadmap with acceptance criteria | Developer, Product | Approved | 2026-02-01 |
| `launch-checklist.md` | Pre-launch requirements checklist | Founder, Product, Legal | Approved | 2026-02-01 |
| `r0-launch-scope.md` | 30 launch-critical screens (minimum viable launch) | Product, Developer | Approved | 2026-02-06 |
| `r1-launch-scope.md` | 47 full Tier 1 MVP screens | Product, Developer | Approved | 2026-02-06 |

### 3.2.5 Prevention System (NEW - 2026-02-07) (in /docs/tiers/tier1/)

**Purpose**: Prevent stale deliverables and inconsistencies when upstream decisions change.

| File Path | Purpose | Audience | Status | Last Updated |
|-----------|---------|----------|--------|--------------|
| `PRE_WORK_CHECKLIST.md` | **MANDATORY** - 30-second automated safety checks (product-director agent runs before delegation) | Product Director Agent | Active | 2026-02-07 |
| `decision-impact-log.md` | **CRITICAL** - Track CB decisions and identify affected artifacts | Product Director, All Agents | Active | 2026-02-07 |
| `PREVENTION_SYSTEM_SPEC.md` | Specification for automated warning/prompt system (weekly checks, decision logging) | Product Director, Technical | Specification | 2026-02-07 |
| `WEEKLY_CHECKLIST.md` | **ACTION REQUIRED** - Manual consistency checklist (until automated) | Product Director | Active | 2026-02-07 |

**⚠️ IMPORTANT**:
- `PRE_WORK_CHECKLIST.md` is automatically run by product-director agent before ANY delegation
- Review `WEEKLY_CHECKLIST.md` every 7 days (next due: 2026-02-14)
- Update `decision-impact-log.md` immediately when CB decisions are made
- Check `TIER1_STATUS_LOG.md` Section 8 for pending updates before new work

**Root Cause**: These files were created after QA-1, QA-2, QA-3 fixes identified that CB decisions (CB-001, CB-002, CB-005, CB-006) updated r0-launch-scope.md but did NOT trigger updates to tier1-route-map.md, screen-inventory.md, or FIGMA_PRODUCTION_PLAN.md, resulting in stale deliverables.

### 3.3 Draft Design Specifications (in /docs/tiers/tier1/draft-design-specs/)

| File Path | Purpose | Audience | Status | Last Updated |
|-----------|---------|----------|--------|--------------|
| `screen-inventory.md` | 30 R0 screen definitions with components and states | Designer, Developer | Approved | 2026-02-02 |
| `r0-financial-analysis.md` | Financial projections for R0 launch | Founder, Business | Approved | 2026-02-02 |
| `user-flows/care-receiver-first-booking.md` | End-to-end care receiver journey | Designer, Developer | Approved | 2026-02-02 |
| `user-flows/caregiver-onboarding.md` | End-to-end caregiver journey | Designer, Developer | Approved | 2026-02-02 |
| `user-flows/family-proxy-booking.md` | Family member proxy journey | Designer, Developer | Approved | 2026-02-02 |
| `user-flows/admin-verification.md` | Admin verification workflow | Designer, Developer | Approved | 2026-02-02 |
| `user-flows/safeguarding-response.md` | Safeguarding incident response | Designer, Developer, Legal | Approved | 2026-02-02 |

> **Note**: `route-map.md` has been superseded by the canonical route map at `/docs/product/tier1-route-map.md` (47 screens).

### 3.4 Website Content (in /docs/tiers/tier1/website-content/)

| File Path | Purpose | Audience | Status | Last Updated |
|-----------|---------|----------|--------|--------------|
| `homepage.md` | Homepage copy (WEB-001) | Marketing, Developer | Complete | 2026-02-01 |
| `how-it-works-families.md` | How It Works for families (WEB-002) | Marketing, Developer | Complete | 2026-02-01 |
| `how-it-works-caregivers.md` | How It Works for caregivers (WEB-003) | Marketing, Developer | Complete | 2026-02-01 |
| `trust-and-safety.md` | Trust and safety page (WEB-004) | Marketing, Legal, Developer | Complete | 2026-02-01 |
| `pricing.md` | Pricing page (WEB-005) | Marketing, Founder, Developer | **PARTIAL** (FDR-008 pending) | 2026-02-01 |
| `about-us.md` | About us page (WEB-006) | Marketing, Developer | Complete | 2026-02-01 |
| `faq.md` | FAQ page with 80+ questions (WEB-007) | Marketing, Developer | Complete | 2026-02-01 |
| `contact.md` | Contact page (WEB-013) | Marketing, Developer | Complete | 2026-02-01 |
| `CONTENT_SUMMARY.md` | Summary of all website content | Marketing, Product | Complete | 2026-02-01 |

### 3.5 Legal Documents (in /docs/tiers/tier1/website-content/legal/)

| File Path | Purpose | Audience | Status | Last Updated |
|-----------|---------|----------|--------|--------------|
| `_index.md` | Legal document overview and review requirements | Legal, Founder | Complete | 2026-02-01 |
| `LEGAL_SUMMARY.md` | Risk analysis and legal review recommendations | Legal, Founder | Complete | 2026-02-01 |
| `terms-care-receivers.md` | Terms of Service for families (WEB-008) | Legal, Developer | **DRAFT** - Legal review required | 2026-02-01 |
| `terms-caregivers.md` | Terms of Service for caregivers (WEB-009) | Legal, Developer | **DRAFT** - IR35 review required | 2026-02-01 |
| `privacy-policy.md` | GDPR Privacy Policy (WEB-010) | Legal, Developer | **DRAFT** - Legal review required | 2026-02-01 |
| `safeguarding-policy.md` | Care Act 2014 Safeguarding Policy (WEB-011) | Legal, Developer | **DRAFT** - Legal review required | 2026-02-01 |
| `cookie-policy.md` | PECR Cookie Policy (WEB-012) | Legal, Developer | **DRAFT** - Legal review required | 2026-02-01 |

### 3.6 Feature Specifications (in /docs/product/features/)

| File Path | Purpose | Audience | Status | Last Updated |
|-----------|---------|----------|--------|--------------|
| `tier1-booking-specification.md` | Booking system specification (APP-005) | Developer, Product | Approved | 2026-02-06 |
| `tier1-verification-specification.md` | Verification system specification (APP-006) | Developer, Product | Approved | 2026-02-06 |
| `tier1-search-specification.md` | Search and discovery specification (APP-007) | Developer, Product | Approved | 2026-02-06 |
| `tier1-messaging-specification.md` | Messaging system specification (APP-008) | Developer, Product | Approved | 2026-02-06 |
| `tier1-admin-specification.md` | Admin dashboard specification (APP-009) | Developer, Product | Approved | 2026-02-06 |
| `tier1-safeguarding-specification.md` | Safeguarding system specification (APP-010) | Developer, Product, Legal | Approved | 2026-02-06 |

### 3.7 Technical Specifications (in /docs/technical/)

| File Path | Purpose | Audience | Status | Last Updated |
|-----------|---------|----------|--------|--------------|
| `database-schema-tier1.md` | PostgreSQL database schema (APP-001) | Developer | Approved | 2026-02-06 |
| `api-specification-tier1.md` | REST API endpoints (APP-002) | Developer | Approved | 2026-02-06 |
| `stripe-integration-spec.md` | Stripe payment integration (APP-003) | Developer | Approved | 2026-02-06 |

### 3.8 Route Map (in /docs/product/)

| File Path | Purpose | Audience | Status | Last Updated |
|-----------|---------|----------|--------|--------------|
| `tier1-route-map.md` | 47 screens with routes, access control, and states (APP-004) | Developer, Designer, Product | Approved | 2026-02-06 |

### 3.9 Compliance Documents (in /docs/compliance/)

| File Path | Purpose | Audience | Status | Last Updated |
|-----------|---------|----------|--------|--------------|
| `legal-framework.md` | UK regulatory requirements overview | Legal, Founder | Approved | 2026-02-06 |
| `dpia.md` | Data Protection Impact Assessment (Tier 1 simplified) | Legal, DPO | Approved | 2026-02-06 |
| `policies/privacy-policy.md` | Privacy policy (may duplicate website-content version) | Legal | Approved | 2026-02-06 |
| `policies/safeguarding-policy.md` | Safeguarding policy (may duplicate website-content version) | Legal | Approved | 2026-02-06 |
| `policies/terms-of-service.md` | Terms of service (may duplicate website-content version) | Legal | Approved | 2026-02-06 |

### 3.10 Governance Documents (in /docs/governance/)

| File Path | Purpose | Audience | Status | Last Updated |
|-----------|---------|----------|--------|--------------|
| `founder-decisions-responses.md` | FDR-001 through FDR-010 with responses and implications | Founder, Product | Active | 2026-02-02 |
| `founder-decisions-strategic-analysis.md` | Strategic analysis of founder decisions | Founder, Product | Approved | 2026-02-01 |
| `gating-decisions.md` | GD-01 through GD-11 tier gating decisions | Product | Approved | 2026-02-06 |
| `pricing-decisions-status.md` | Pricing and commission decision tracking | Founder, Product | Active | 2026-02-06 |
| `product-decisions.md` | DEC-001 through DEC-XXX product decisions | Product | Approved | 2026-02-06 |

---

## 4. Reading Order

### 4.1 Start Here (Overview Documents)

Read these first to understand the Tier 1 scope and status:

1. **`/docs/tiers/tier1/_index.md`** - Tier 1 overview and navigation
2. **`/docs/tiers/tier1/TIER1_COMPREHENSIVE_ANALYSIS.md`** - 85% readiness assessment
3. **`/docs/tiers/tier1/features.md`** - 77 Tier 1 features
4. **`/docs/tiers/tier1/compliance.md`** - Regulatory requirements

### 4.2 Then Read (Feature Specifications)

Understand what each system does:

5. **`/docs/product/features/tier1-booking-specification.md`** - Core booking flow
6. **`/docs/product/features/tier1-verification-specification.md`** - Caregiver verification
7. **`/docs/product/features/tier1-search-specification.md`** - Discovery and search
8. **`/docs/product/features/tier1-messaging-specification.md`** - Messaging system
9. **`/docs/product/features/tier1-admin-specification.md`** - Admin dashboard
10. **`/docs/product/features/tier1-safeguarding-specification.md`** - Safeguarding

### 4.3 Then Read (Technical Specifications)

Understand how systems are built:

11. **`/docs/product/tier1-route-map.md`** - All 47 screens with routes
12. **`/docs/technical/database-schema-tier1.md`** - Database structure
13. **`/docs/technical/api-specification-tier1.md`** - API endpoints
14. **`/docs/technical/stripe-integration-spec.md`** - Payment integration

### 4.4 Reference as Needed (Detailed Specs)

Consult when working on specific areas:

- **Planning**: `/docs/tiers/tier1/planning/build-sequence.md`
- **Launch**: `/docs/tiers/tier1/planning/launch-checklist.md`
- **R0 Scope**: `/docs/tiers/tier1/planning/r0-launch-scope.md`
- **User Flows**: `/docs/tiers/tier1/draft-design-specs/user-flows/`
- **Website Content**: `/docs/tiers/tier1/website-content/`
- **Legal Documents**: `/docs/tiers/tier1/website-content/legal/`
- **Governance**: `/docs/governance/founder-decisions-responses.md`

---

## 5. Document Relationships

### 5.1 Source of Truth Hierarchy

The following documents are **authoritative sources** for their respective domains:

| Domain | Source of Truth | Derived Documents |
|--------|-----------------|-------------------|
| **Tier Definitions** | `/docs/ROADMAP.md` | All tier-specific docs |
| **Founder Decisions** | `/docs/governance/founder-decisions-responses.md` | compliance.md, legal docs |
| **Feature Scope** | `/docs/tiers/tier1/features.md` | Feature specs, route map |
| **Screen Inventory** | `/docs/product/tier1-route-map.md` | screen-inventory.md, r0-launch-scope.md |
| **Database Schema** | `/docs/technical/database-schema-tier1.md` | API spec, feature specs |
| **Booking Flow** | `/docs/product/features/tier1-booking-specification.md` | route-map, screen-inventory |
| **Compliance** | `/docs/compliance/legal-framework.md` | compliance.md, legal policies |

### 5.2 Dependency Graph

```
ROADMAP.md (Tier Definitions)
    |
    v
founder-decisions-responses.md (FDR-001, FDR-002, FDR-003)
    |
    +---> features.md (77 Tier 1 Features)
    |         |
    |         +---> tier1-booking-specification.md
    |         +---> tier1-verification-specification.md
    |         +---> tier1-search-specification.md
    |         +---> tier1-messaging-specification.md
    |         +---> tier1-admin-specification.md
    |         +---> tier1-safeguarding-specification.md
    |                   |
    |                   v
    |         tier1-route-map.md (47 Screens)
    |                   |
    |                   +---> r0-launch-scope.md (30 R0 Screens)
    |                   +---> screen-inventory.md
    |                   +---> user-flows/*.md
    |
    +---> compliance.md
    |         |
    |         +---> legal-framework.md
    |         +---> dpia.md
    |         +---> website-content/legal/*.md
    |
    +---> database-schema-tier1.md
              |
              +---> api-specification-tier1.md
              +---> stripe-integration-spec.md
```

### 5.3 Change Cascade Matrix

When updating a source document, these downstream documents may need updates:

| If You Update | Also Check |
|---------------|------------|
| `features.md` | Feature specs, route-map, screen-inventory |
| `tier1-route-map.md` | r0-launch-scope, r1-launch-scope, screen-inventory, user-flows |
| `database-schema-tier1.md` | api-specification-tier1.md, feature specs |
| `founder-decisions-responses.md` | compliance.md, legal docs, pricing.md |
| `compliance.md` | legal docs, safeguarding-policy.md |
| `r0-launch-scope.md` | r1-launch-scope.md, screen-inventory.md |

---

## 6. Quick Reference

### "What screens exist?"

**Primary**: `/docs/product/tier1-route-map.md` (47 screens with full details)

**Supporting**:
- `/docs/tiers/tier1/planning/r0-launch-scope.md` (30 R0 launch-critical screens)
- `/docs/tiers/tier1/planning/r1-launch-scope.md` (47 full MVP screens)
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` (30 R0 screen definitions)

### "What features are in scope?"

**Primary**: `/docs/tiers/tier1/features.md` (77 features across 11 systems)

**Supporting**:
- `/docs/tiers/common/spec/feature-map.md` (master feature map with tier tags)
- `/docs/tiers/common/planning/mvp-classification.md` (MVP vs Post-MVP)

### "What's the database structure?"

**Primary**: `/docs/technical/database-schema-tier1.md`

### "What are the API endpoints?"

**Primary**: `/docs/technical/api-specification-tier1.md`

### "How does booking work?"

**Primary**: `/docs/product/features/tier1-booking-specification.md`

### "How does verification work?"

**Primary**: `/docs/product/features/tier1-verification-specification.md`

### "What are the compliance requirements?"

**Primary**: `/docs/tiers/tier1/compliance.md`

**Supporting**:
- `/docs/compliance/legal-framework.md`
- `/docs/compliance/dpia.md`

### "What decisions has the founder made?"

**Primary**: `/docs/governance/founder-decisions-responses.md`

**Supporting**:
- `/docs/governance/gating-decisions.md`
- `/docs/governance/product-decisions.md`

### "What website content exists?"

**Primary**: `/docs/tiers/tier1/website-content/_index.md` (content status tracker)

**Individual Pages**: `/docs/tiers/tier1/website-content/*.md`

### "What legal documents exist?"

**Primary**: `/docs/tiers/tier1/website-content/legal/_index.md`

**Individual Documents**: `/docs/tiers/tier1/website-content/legal/*.md`

### "What user flows are documented?"

**Primary**: `/docs/tiers/tier1/draft-design-specs/user-flows/`

**Flows Available**:
- Care Receiver First Booking
- Caregiver Onboarding
- Family Proxy Booking
- Admin Verification
- Safeguarding Response

### "What's blocking progress?"

**Primary**: `/docs/tiers/tier1/TIER1_STATUS_LOG.md` (Section 4: Blockers & Dependencies)

**Supporting**:
- `/docs/tiers/tier1/PRIORITY_ACTIONS.md`
- `/docs/governance/founder-decisions-responses.md` (pending FDR-008)

---

## 7. Document Categories

### 7.1 Strategic/Planning Documents

| Document | Description |
|----------|-------------|
| `/docs/ROADMAP.md` | Tiered Market Entry Strategy (Tier 1-4) |
| `/docs/governance/founder-decisions-responses.md` | Founder strategic decisions |
| `/docs/tiers/tier1/_index.md` | Tier 1 overview |
| `/docs/tiers/tier1/planning/build-sequence.md` | 12-phase development plan |
| `/docs/tiers/tier1/planning/launch-checklist.md` | Pre-launch requirements |

### 7.2 Feature Specifications

| Document | System |
|----------|--------|
| `/docs/product/features/tier1-booking-specification.md` | Booking System |
| `/docs/product/features/tier1-verification-specification.md` | Verification System |
| `/docs/product/features/tier1-search-specification.md` | Search & Discovery |
| `/docs/product/features/tier1-messaging-specification.md` | Messaging System |
| `/docs/product/features/tier1-admin-specification.md` | Admin Dashboard |
| `/docs/product/features/tier1-safeguarding-specification.md` | Safeguarding |

### 7.3 Technical Specifications

| Document | Scope |
|----------|-------|
| `/docs/product/tier1-route-map.md` | 47 screens with routes and access control |
| `/docs/technical/database-schema-tier1.md` | PostgreSQL schema |
| `/docs/technical/api-specification-tier1.md` | REST API endpoints |
| `/docs/technical/stripe-integration-spec.md` | Payment integration |

### 7.4 Design/UX Documents

| Document | Purpose |
|----------|---------|
| `/docs/tiers/tier1/design-readiness-roadmap.md` | Design phase work plan |
| `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` | 30 R0 screen definitions |
| `/docs/tiers/tier1/draft-design-specs/route-map.md` | Navigation hierarchy |
| `/docs/tiers/tier1/draft-design-specs/user-flows/*.md` | 5 core user journeys |

### 7.5 Compliance/Legal Documents

| Document | Purpose |
|----------|---------|
| `/docs/tiers/tier1/compliance.md` | Tier 1 compliance overview |
| `/docs/compliance/legal-framework.md` | UK regulatory framework |
| `/docs/compliance/dpia.md` | Data Protection Impact Assessment |
| `/docs/tiers/tier1/website-content/legal/*.md` | Draft legal policies |

### 7.6 Status/Tracking Documents

| Document | Purpose |
|----------|---------|
| `/docs/tiers/tier1/TIER1_STATUS_LOG.md` | Comprehensive status tracking |
| `/docs/tiers/tier1/PRIORITY_ACTIONS.md` | Agent execution plan |
| `/docs/tiers/tier1/CONSISTENCY_AUDIT.md` | Cross-document consistency |
| `/docs/tiers/tier1/TIER1_COMPREHENSIVE_ANALYSIS.md` | Readiness assessment |

---

## 8. Pending Decisions

### Critical Blockers

| Decision | Status | Impact | Owner | Document |
|----------|--------|--------|-------|----------|
| **FDR-008: Pricing/Commission** | PENDING | Blocks Terms of Service, pricing page, Stripe config | Founder | `/docs/governance/founder-decisions-responses.md` |
| **Legal Counsel Engagement** | NOT STARTED | Blocks all legal document finalization | Founder | `/docs/tiers/tier1/website-content/legal/_index.md` |
| **ICO Registration** | NOT STARTED | Blocks launch (GDPR requirement) | Founder | `/docs/tiers/tier1/compliance.md` |
| **Platform Insurance** | NOT STARTED | Blocks launch | Founder | `/docs/tiers/tier1/compliance.md` |
| **Safeguarding Lead** | NOT DESIGNATED | Blocks launch (Care Act requirement) | Founder | `/docs/tiers/tier1/compliance.md` |

### Open Questions

| Question | Location | Decision Needed From |
|----------|----------|---------------------|
| Insurance minimum amounts for caregivers (GD-03) | `/docs/governance/gating-decisions.md` | Founder + Insurance Broker |
| Geographic scope for initial launch | Product decisions | Founder |
| Early adopter incentives | Pricing decisions | Founder |
| 2FA scope (admin-only or all users?) | `/docs/tiers/tier1/CONSISTENCY_AUDIT.md` (INC-017) | Product |

### Decision Logs

- **Founder Decisions**: `/docs/governance/founder-decisions-responses.md`
- **Gating Decisions**: `/docs/governance/gating-decisions.md`
- **Product Decisions**: `/docs/governance/product-decisions.md`
- **Pricing Decisions**: `/docs/governance/pricing-decisions-status.md`

---

## 9. How to Update Documents

### 9.1 Document Ownership

| Document Type | Primary Owner | Approval Required |
|---------------|---------------|-------------------|
| Feature specifications | Product Requirements Specialist | Product Director |
| Technical specifications | Technical Architect | Product Director |
| Legal documents | Compliance Specialist | Legal Counsel + Founder |
| Website content | Content Architect | Product Director |
| Governance documents | Product Director | Founder |
| Status/tracking | Product Director | None (self-updating) |

### 9.2 Update Process

1. **Identify Source Document**: Determine which document is the source of truth for your change
2. **Check Dependencies**: Use the Change Cascade Matrix (Section 5.3) to identify downstream impacts
3. **Make Updates**: Update the source document first, then cascade to dependent documents
4. **Update Timestamps**: Always update the "Last Updated" date
5. **Log Changes**: For significant changes, add to document's change log
6. **Run Consistency Check**: After major changes, review `/docs/tiers/tier1/CONSISTENCY_AUDIT.md`

### 9.3 Keeping Documents in Sync

When making updates that affect multiple documents:

1. **Start with Source of Truth**: Update the authoritative document first
2. **Follow Dependency Chain**: Update documents in dependency order
3. **Cross-Reference Check**: Verify terminology and values are consistent
4. **Update Status Log**: Record changes in `/docs/tiers/tier1/TIER1_STATUS_LOG.md`

### 9.4 Version Control

All documents should include:

- **Last Updated**: Date of most recent change
- **Status**: Draft, Active, Approved, Deprecated
- **Document Owner**: Role responsible for maintenance
- **Change Log**: For major documents, a history of significant changes

---

## 9.4 Archived Documents

**Archive Location**: `/docs/tiers/tier1/archive/`

The following documents have been deprecated and moved to the archive directory as of 2026-02-07:

| Archived File | Reason | Superseded By |
|---------------|--------|---------------|
| `TIER1_COMPREHENSIVE_ANALYSIS.md` | Pre-dates feature/technical spec completion; outdated readiness data | `TIER1_STATUS_LOG.md`, `CONSISTENCY_AUDIT.md` |
| `PRIORITY_ACTIONS.md` | All defined tasks (APP-001 to APP-010, WEB-001 to WEB-013) complete | `TIER1_STATUS_LOG.md` (Section 3) |
| `design-readiness-roadmap.md` | Work plan superseded by dashboard-first approach; design criteria extracted | `FIGMA_PRODUCTION_PLAN.md` (includes Appendix B with criteria) |
| `status/implementation-status.md` | 2026-02-01 snapshot not maintained | `TIER1_STATUS_LOG.md` |
| `draft-design-specs/route-map.md` | Draft route map (30 R0 screens only) | `/docs/product/tier1-route-map.md` (CANONICAL, 47 screens) |
| `draft-design-specs/phase1-analysis-and-blockers.md` | Gating document - all critical blockers resolved | `CONSISTENCY_AUDIT.md` (remaining items tracked) |

All archived files contain `⚠️ DEPRECATED` headers with:
- Deprecation date
- Reason for archival
- Pointer to replacement document(s)

**Note**: Archived documents are retained for historical reference but should not be used for current work.

---

## 10. Document Statistics

### Total Document Count

| Category | Count |
|----------|-------|
| Core Tier 1 Documents | 6 |
| Prevention System Documents | 4 |
| Planning Documents | 4 |
| Draft Design Specs | 7 |
| Website Content (Marketing) | 9 |
| Legal Documents | 7 |
| Feature Specifications | 6 |
| Technical Specifications | 3 |
| Route Map | 1 |
| Compliance Documents | 5 |
| Governance Documents | 5 |
| Archived Documents | 6 |
| **Total Active** | **55 documents** |
| **Total (incl. archive)** | **61 documents** |

### Word Count Estimates

| Category | Estimated Words |
|----------|-----------------|
| Website Content (Marketing) | ~25,000 |
| Legal Documents | ~38,000 |
| Feature Specifications | ~45,000 |
| Technical Specifications | ~30,000 |
| Planning & Status | ~20,000 |
| **Total** | **~158,000 words** |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Product Director | Initial documentation guide created |
| 1.1 | 2026-02-07 | Product Director | Updated for file archival: Removed 6 deprecated documents from inventory, added archive directory section (9.4), updated file tree, updated document counts (51 active, 6 archived), updated tables to remove archived files and add FIGMA_PRODUCTION_PLAN.md and DOCUMENTATION_GUIDE.md |
| 1.2 | 2026-02-07 | Product Director | **Prevention Systems**: Added section 3.2.5 documenting prevention system files (decision-impact-log.md, PREVENTION_SYSTEM_SPEC.md, WEEKLY_CHECKLIST.md); updated file tree, document counts (54 active, 60 total); added prevention system to visual hierarchy |
| 1.3 | 2026-02-07 | Product Director | **Pre-Work Safety Checks**: Added PRE_WORK_CHECKLIST.md to section 3.2.5; updated product-director agent to run automated checks before delegation; document counts updated (55 active, 61 total) |

---

**END OF DOCUMENTATION GUIDE**
