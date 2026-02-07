# ⚠️ DEPRECATED - Tier 1 Application: Design Readiness Roadmap

> **DEPRECATED**: 2026-02-07
> **Reason**: This roadmap has been superseded by `FIGMA_PRODUCTION_PLAN.md` (created 2026-02-06), which provides a more detailed, dashboard-first approach with explicit phase definitions, agent task assignments, and automated workflow options. The valuable "Design Readiness Criteria" section (Part 2) has been extracted and merged into FIGMA_PRODUCTION_PLAN.md as Appendix B.
> **Superseded By**: `FIGMA_PRODUCTION_PLAN.md` (includes design readiness criteria)
> **Status**: ARCHIVED - Use FIGMA_PRODUCTION_PLAN.md instead

---

# Tier 1 Application: Design Readiness Roadmap

**Document Purpose**: Comprehensive analysis and sequenced work plan to reach HIGH-FIDELITY FIGMA DESIGNS for the Tier 1 (Companionship Only) marketplace application.

**Document Owner**: Product Director
**Created**: 2026-02-02
**Last Updated**: 2026-02-06
**Status**: ~~CANONICAL PLANNING DOCUMENT~~ DEPRECATED (see header)

---

## Executive Summary

This document defines the logical sequence of work required to reach "design-ready" status for high-fidelity Figma mockups of the Tier 1 marketplace application. Design work should NOT proceed until all upstream product artifacts are complete and consistent.

**Current Assessment**: The repository is approximately **85% ready** for high-fidelity design work.

> **Update (2026-02-06)**: Significant progress made since initial assessment. Screen inventory, route map, and user flows now exist.

**Completed Items** (since 2026-02-02):
1. Screen Inventory document created (`/docs/tiers/tier1/draft-design-specs/screen-inventory.md`) - 30 R0 screens documented
2. Route Map document created (`/docs/tiers/tier1/draft-design-specs/route-map.md`) - Full navigation hierarchy
3. User Flow Diagrams created (`/docs/tiers/tier1/draft-design-specs/user-flows/`) - 5 core flows documented
4. R0 Launch Scope updated to 30 screens (CB decisions incorporated)
5. Consistency audit completed (12 of 27 issues resolved)

**Remaining Gaps**:
1. Content specifications (copy requirements, field labels, error messages, microcopy) - NOT STARTED
2. Component inventory (buttons, forms, cards, modals required across screens) - NOT STARTED
3. Detailed feature specifications (APP-005, APP-006, APP-007) - NOT STARTED
4. Accessibility requirements (WCAG 2.1 AA mapping per screen) - NOT STARTED
5. Pricing decision (FDR-008) - PENDING founder input

**Estimated Time to Design-Ready**: 2-3 weeks of focused specialist agent work (reduced from 3-4 weeks)

---

## Part 1: Current State Assessment

### 1.1 What EXISTS (Upstream Product Documentation)

| Artifact | File Path | Status | Design Relevance |
|----------|-----------|--------|------------------|
| **Marketplace Specification** | `/docs/tiers/common/spec/marketplace-spec.md` | COMPLETE | Defines product vision, user roles, services, platform model |
| **Feature Map** | `/docs/tiers/common/spec/feature-map.md` | COMPLETE | 22 systems with [T1] tier tags, detailed feature definitions |
| **State Maps** | `/docs/tiers/common/spec/state-maps.md` | COMPLETE | 7 critical flows with state diagrams (booking, registration, safeguarding, etc.) |
| **Tier 1 Features** | `/docs/tiers/tier1/features.md` | COMPLETE | 73 Tier 1 features across 11 systems |
| **MVP Classification** | `/docs/tiers/common/planning/mvp-classification.md` | COMPLETE | MVP vs Post-MVP system classification |
| **Build Sequence** | `/docs/tiers/tier1/planning/build-sequence.md` | COMPLETE | 12-phase development plan with acceptance criteria |
| **R0 Launch Scope** | `/docs/tiers/tier1/planning/r0-launch-scope.md` | COMPLETE | 30 launch-critical screens defined with routes and rationale (updated 2026-02-06) |
| **Comprehensive Analysis** | `/docs/tiers/tier1/TIER1_COMPREHENSIVE_ANALYSIS.md` | COMPLETE | 85% readiness assessment, user journeys documented |
| **Gaps Analysis** | `/docs/tiers/GAPS_ANALYSIS.md` | COMPLETE | Documentation gaps identified |
| **Legal Framework** | `/docs/compliance/legal-framework.md` | COMPLETE | Compliance requirements mapped |
| **Founder Decisions** | `/docs/governance/founder-decisions-responses.md` | COMPLETE | FDR-001, FDR-002, FDR-003 strategic decisions |

### 1.2 What is MISSING (Required Before Design)

| Artifact | Expected Location | Priority | Blocking Agent | Status |
|----------|-------------------|----------|----------------|--------|
| **Screen Inventory** | `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` | CRITICAL | route-map-architect | **COMPLETE** (2026-02-02) |
| **Route Map** | `/docs/tiers/tier1/draft-design-specs/route-map.md` | CRITICAL | route-map-architect | **COMPLETE** (2026-02-02) |
| **User Flow Diagrams** | `/docs/tiers/tier1/draft-design-specs/user-flows/` | CRITICAL | route-map-architect | **COMPLETE** (2026-02-02) - 5 flows |
| **Feature Specifications** | `/docs/product/features/` | HIGH | product-requirements-specialist | NOT STARTED - APP-005, APP-006, APP-007 |
| **Content Specifications** | `/docs/tiers/tier1/spec/content/` | HIGH | content-architect | NOT STARTED |
| **Component Inventory** | `/docs/tiers/tier1/spec/components.md` | HIGH | elderly-care-ux-ui-designer | NOT STARTED |
| **Accessibility Requirements** | `/docs/tiers/tier1/spec/accessibility.md` | HIGH | elderly-care-ux-ui-designer | NOT STARTED |
| **Data Display Requirements** | `/docs/tiers/tier1/spec/data-display.md` | MEDIUM | product-requirements-specialist | NOT STARTED |
| **Empty/Loading/Error States** | `/docs/tiers/tier1/spec/ui-states.md` | MEDIUM | elderly-care-ux-ui-designer | NOT STARTED |
| **Responsive Breakpoints** | `/docs/tiers/tier1/spec/responsive.md` | MEDIUM | elderly-care-ux-ui-designer | NOT STARTED |

### 1.3 What is INCONSISTENT or INCOMPLETE

| Issue | Location | Resolution Required | Status |
|-------|----------|---------------------|--------|
| **Pricing Model Undefined** | FDR-008 pending | Commission %, fee structure needed before payment screens can be designed | PENDING - Using 15% placeholder |
| **Insurance Minimums Undefined** | GD-03 open | Affects caregiver verification flow copy | PENDING |
| **Screen IDs Inconsistent** | R0 document uses SCR-XXX-NNN but no master list | route-map-architect must generate canonical screen-inventory.md | **RESOLVED** - screen-inventory.md created |
| **User Journey 2 Missing Screen** | SCR-CG-013 (Booking Request Detail for Caregiver) referenced but not in R0 screen list | Needs clarification - is this separate from SCR-CR-008? | **RESOLVED** - SCR-CG-013 included in R0 |
| **Admin Screens Incomplete** | R0 has 6 admin screens, but feature-map describes more admin functions | Clarify which admin features are manual vs screen-based at R0 | **RESOLVED** - Per screen-inventory.md |
| **R0 Screen Count** | Previously 26 screens | Updated to 30 per CB decisions (CB-001, CB-002, CB-005, CB-006) | **RESOLVED** |

---

## Part 2: Definition of "Design Ready"

### 2.1 Design-Ready Criteria

A screen is **DESIGN-READY** when ALL of the following exist:

1. **Screen Definition** (from route-map-architect):
   - Screen ID (SCR-XXX-NNN)
   - Screen name and purpose
   - Route/URL path
   - Role-based access (RBAC)
   - Preconditions (what must be true to access)
   - Key states (loading, empty, error, success, edge cases)
   - Data sensitivity classification

2. **Feature Specification** (from product-requirements-specialist):
   - User stories with acceptance criteria
   - Functional requirements (what the screen must do)
   - Data requirements (what data displays, inputs, outputs)
   - Business rules (validation, calculations, constraints)
   - Error handling requirements

3. **User Flow Context** (from route-map-architect):
   - Entry points (how user arrives at this screen)
   - Exit points (where user can go from here)
   - Decision points (branches in the flow)
   - Error paths (what happens on failure)

4. **Content Specification** (from content-architect):
   - Page title and meta description
   - Heading hierarchy (H1, H2, H3)
   - Label text for all form fields
   - Button text and CTAs
   - Error message copy
   - Help text and tooltips
   - Empty state messaging
   - Success/confirmation messaging

5. **Accessibility Requirements** (from elderly-care-ux-ui-designer):
   - WCAG 2.1 AA compliance requirements
   - Focus order specification
   - Screen reader considerations
   - Touch target sizing
   - Color contrast requirements
   - Alternative text needs

6. **Compliance Callouts** (from compliance-specialist):
   - GDPR elements (consent checkboxes, data explanations)
   - Care Act elements (safeguarding notices)
   - Legal links required (terms, privacy, safeguarding policy)

### 2.2 Design-Ready Checklist Per Screen

```
SCREEN: [Screen ID] - [Screen Name]
Route: [URL path]

PRE-DESIGN CHECKLIST:
[ ] Screen definition complete (route-map-architect)
[ ] Feature specification written (product-requirements-specialist)
[ ] User flow diagram includes this screen (route-map-architect)
[ ] Content specification complete (content-architect)
[ ] Data requirements documented (product-requirements-specialist)
[ ] All states defined (loading, empty, error, success)
[ ] Accessibility requirements listed (elderly-care-ux-ui-designer)
[ ] Compliance elements identified (compliance-specialist)
[ ] All open questions resolved (product-director coordination)

STATUS: [ ] NOT READY | [ ] READY FOR DESIGN | [ ] DESIGN IN PROGRESS | [ ] DESIGN COMPLETE
```

---

## Part 3: Logical Steps to Design Readiness

### Phase 1: Foundation Artifacts (Week 1)

**Goal**: Generate the canonical screen inventory and route map from existing documentation.

**Prerequisite**: All source documents verified as complete and consistent.

#### Step 1.1: Screen Inventory Generation
**Agent**: route-map-architect
**Inputs**:
- `/docs/tiers/common/spec/feature-map.md`
- `/docs/tiers/tier1/features.md`
- `/docs/tiers/tier1/planning/r0-launch-scope.md`
- `/docs/tiers/common/spec/state-maps.md`
**Outputs**:
- `/docs/product/screen-inventory.md` (canonical screen list)
**Duration**: 1-2 days
**Blocked By**: Nothing

#### Step 1.2: Route Map Generation
**Agent**: route-map-architect
**Inputs**:
- Screen inventory (from Step 1.1)
- `/docs/tiers/tier1/planning/r0-launch-scope.md` (R0 scope)
**Outputs**:
- `/docs/product/route-map.md` (navigation hierarchy)
**Duration**: 1 day
**Blocked By**: Step 1.1

#### Step 1.3: User Flow Diagrams
**Agent**: route-map-architect
**Inputs**:
- Screen inventory
- Route map
- `/docs/tiers/common/spec/state-maps.md`
- User journeys from `/docs/tiers/tier1/TIER1_COMPREHENSIVE_ANALYSIS.md`
**Outputs**:
- `/docs/tiers/tier1/spec/user-flows/care-receiver-first-booking.md`
- `/docs/tiers/tier1/spec/user-flows/caregiver-onboarding.md`
- `/docs/tiers/tier1/spec/user-flows/admin-verification.md`
- `/docs/tiers/tier1/spec/user-flows/safeguarding-response.md`
- `/docs/tiers/tier1/spec/user-flows/family-proxy-booking.md`
**Duration**: 2-3 days
**Blocked By**: Steps 1.1, 1.2

---

### Phase 2: Feature Specifications (Week 1-2)

**Goal**: Create detailed feature specifications for all Tier 1 systems.

#### Step 2.1: Authentication & User Management Spec
**Agent**: product-requirements-specialist
**Inputs**:
- `/docs/tiers/common/spec/feature-map.md` (Section 1)
- `/docs/tiers/tier1/features.md`
- Screen inventory (screens SCR-AUTH-001 through SCR-AUTH-006)
**Outputs**:
- `/docs/tiers/tier1/spec/features/authentication-user-management.md`
**Duration**: 2 days
**Blocked By**: Step 1.1

#### Step 2.2: Caregiver Profiles & Verification Spec
**Agent**: product-requirements-specialist
**Inputs**:
- `/docs/tiers/common/spec/feature-map.md` (Sections 2, 10)
- `/docs/tiers/tier1/features.md`
- Screen inventory (screens SCR-CG-002 through SCR-CG-010)
**Outputs**:
- `/docs/tiers/tier1/spec/features/caregiver-profiles-verification.md`
**Duration**: 2 days
**Blocked By**: Step 1.1

#### Step 2.3: Discovery, Booking & Payment Spec
**Agent**: product-requirements-specialist
**Inputs**:
- `/docs/tiers/common/spec/feature-map.md` (Sections 4, 5, 7)
- `/docs/tiers/tier1/features.md`
- Screen inventory (screens SCR-CR-003 through SCR-CR-013, SCR-CG-020)
**Outputs**:
- `/docs/tiers/tier1/spec/features/discovery-booking-payment.md`
**Duration**: 3 days
**Blocked By**: Step 1.1, FDR-008 (pricing decision - can use placeholders)

#### Step 2.4: Messaging & Reviews Spec
**Agent**: product-requirements-specialist
**Inputs**:
- `/docs/tiers/common/spec/feature-map.md` (Sections 6, 8)
- `/docs/tiers/tier1/features.md`
- Screen inventory (messaging and review screens)
**Outputs**:
- `/docs/tiers/tier1/spec/features/messaging-reviews.md`
**Duration**: 1 day
**Blocked By**: Step 1.1

#### Step 2.5: Safeguarding & Admin Spec
**Agent**: product-requirements-specialist
**Inputs**:
- `/docs/tiers/common/spec/feature-map.md` (Sections 9, 12)
- `/docs/tiers/tier1/features.md`
- Screen inventory (SCR-ADM screens)
**Outputs**:
- `/docs/tiers/tier1/spec/features/safeguarding-admin.md`
**Duration**: 2 days
**Blocked By**: Step 1.1

---

### Phase 3: Content Specifications (Week 2)

**Goal**: Define all copy, labels, and messaging for each screen.

#### Step 3.1: Public Pages Content
**Agent**: content-architect
**Inputs**:
- Screen inventory (SCR-PUB screens)
- Feature specifications
- `/docs/tiers/tier1/website-content/` (existing marketing content for reference)
**Outputs**:
- `/docs/tiers/tier1/spec/content/public-pages.md`
**Duration**: 1 day
**Blocked By**: Step 1.1

#### Step 3.2: Authentication & Registration Content
**Agent**: content-architect
**Inputs**:
- Screen inventory (SCR-AUTH screens)
- Feature spec (Step 2.1)
- Compliance requirements (GDPR consent language)
**Outputs**:
- `/docs/tiers/tier1/spec/content/authentication-content.md`
**Duration**: 1 day
**Blocked By**: Steps 1.1, 2.1

#### Step 3.3: Caregiver Flow Content
**Agent**: content-architect
**Inputs**:
- Screen inventory (SCR-CG screens)
- Feature spec (Step 2.2)
- Self-employment language requirements (FDR-001)
**Outputs**:
- `/docs/tiers/tier1/spec/content/caregiver-content.md`
**Duration**: 2 days
**Blocked By**: Steps 1.1, 2.2

#### Step 3.4: Care Receiver Flow Content
**Agent**: content-architect
**Inputs**:
- Screen inventory (SCR-CR screens)
- Feature specs (Steps 2.3, 2.4)
- Elderly user language guidelines
**Outputs**:
- `/docs/tiers/tier1/spec/content/care-receiver-content.md`
**Duration**: 2 days
**Blocked By**: Steps 1.1, 2.3, 2.4

#### Step 3.5: Admin Dashboard Content
**Agent**: content-architect
**Inputs**:
- Screen inventory (SCR-ADM screens)
- Feature spec (Step 2.5)
**Outputs**:
- `/docs/tiers/tier1/spec/content/admin-content.md`
**Duration**: 1 day
**Blocked By**: Steps 1.1, 2.5

#### Step 3.6: Error Messages & Microcopy
**Agent**: content-architect
**Inputs**:
- All feature specifications
- State maps (error states)
**Outputs**:
- `/docs/tiers/tier1/spec/content/error-messages.md`
- `/docs/tiers/tier1/spec/content/microcopy-guidelines.md`
**Duration**: 1 day
**Blocked By**: Phase 2 complete

---

### Phase 4: UI Specifications (Week 3)

**Goal**: Define UI patterns, component requirements, and accessibility specifications.

#### Step 4.1: Component Inventory
**Agent**: elderly-care-ux-ui-designer
**Inputs**:
- Screen inventory
- Feature specifications
- Content specifications
**Outputs**:
- `/docs/tiers/tier1/spec/components.md` (list of all UI components needed)
**Duration**: 1 day
**Blocked By**: Phases 1, 2

#### Step 4.2: Accessibility Requirements Document
**Agent**: elderly-care-ux-ui-designer
**Inputs**:
- Screen inventory
- Feature specifications
- WCAG 2.1 AA guidelines
**Outputs**:
- `/docs/tiers/tier1/spec/accessibility.md`
**Duration**: 1 day
**Blocked By**: Step 1.1

#### Step 4.3: UI States Specification
**Agent**: elderly-care-ux-ui-designer
**Inputs**:
- Screen inventory
- State maps
- Feature specifications
**Outputs**:
- `/docs/tiers/tier1/spec/ui-states.md` (loading, empty, error, success states)
**Duration**: 1 day
**Blocked By**: Phases 1, 2

#### Step 4.4: Responsive Design Requirements
**Agent**: elderly-care-ux-ui-designer
**Inputs**:
- Screen inventory
- Device usage data (elderly user patterns)
**Outputs**:
- `/docs/tiers/tier1/spec/responsive.md`
**Duration**: 1 day
**Blocked By**: Step 1.1

---

### Phase 5: Design Readiness Validation (Week 3-4)

**Goal**: Validate all artifacts are complete and consistent before design work begins.

#### Step 5.1: Cross-Reference Validation
**Agent**: product-director
**Inputs**:
- All Phase 1-4 outputs
**Outputs**:
- `/docs/tiers/tier1/spec/design-readiness-validation.md`
**Actions**:
- Verify every screen in inventory has feature spec
- Verify every screen has content spec
- Verify every screen has accessibility requirements
- Verify all user flows are complete
- Identify remaining gaps or inconsistencies
**Duration**: 1 day
**Blocked By**: Phases 1-4 complete

#### Step 5.2: Blocker Resolution
**Agent**: product-director (coordination)
**Inputs**:
- Validation report (Step 5.1)
- Open questions log
**Outputs**:
- Resolution of all blocking items
**Actions**:
- Escalate pricing decision (FDR-008) if still pending
- Resolve insurance minimums (GD-03) if still open
- Clarify any ambiguous requirements
**Duration**: 1-3 days (depends on decision speed)
**Blocked By**: Step 5.1

#### Step 5.3: Design Brief Generation
**Agent**: elderly-care-ux-ui-designer
**Inputs**:
- All validated specifications
- Accessibility requirements
- Content specifications
**Outputs**:
- `/docs/tiers/tier1/spec/figma-design-brief.md`
**Contents**:
- Screen-by-screen design requirements summary
- Component requirements summary
- Accessibility checklist
- Content placeholders with character counts
- Priority order for design work
**Duration**: 1 day
**Blocked By**: Step 5.2

---

### Phase 6: Figma Design Production (Week 4+)

**Goal**: Create high-fidelity Figma mockups for all Tier 1 screens.

**NOTE**: This phase is OUTSIDE the scope of the agent system. Figma design work requires human designers using the Figma application. The agent system can only prepare specifications.

#### Step 6.1: Design System Foundation
**Human Designer** (external)
**Inputs**: Design brief, accessibility requirements
**Outputs**:
- Color palette (WCAG compliant)
- Typography scale (16px+ body text)
- Spacing system
- Component library (buttons, inputs, cards, modals)
**Duration**: 3-5 days

#### Step 6.2: Authentication & Registration Screens
**Human Designer** (external)
**Screens**: 6 screens (SCR-AUTH-001 through SCR-AUTH-006)
**Duration**: 2-3 days

#### Step 6.3: Caregiver Onboarding & Verification Screens
**Human Designer** (external)
**Screens**: 4 screens (SCR-CG-002, SCR-CG-008, SCR-CG-009, SCR-CG-010)
**Duration**: 2-3 days

#### Step 6.4: Discovery & Booking Screens
**Human Designer** (external)
**Screens**: 4 screens (SCR-CR-003, SCR-CR-005, SCR-CR-006, SCR-CR-008)
**Duration**: 3-4 days

#### Step 6.5: Payment & Payout Screens
**Human Designer** (external)
**Screens**: 2 screens (SCR-CR-013, SCR-CG-020)
**Duration**: 1-2 days

#### Step 6.6: Admin Dashboard Screens
**Human Designer** (external)
**Screens**: 6 screens (SCR-ADM-001, SCR-ADM-005, SCR-ADM-007, SCR-ADM-008, SCR-ADM-014, SCR-ADM-015)
**Duration**: 3-4 days

#### Step 6.7: Public & Compliance Pages
**Human Designer** (external)
**Screens**: 4 screens (SCR-PUB-001, SCR-PUB-006, SCR-PUB-007, SCR-PUB-008)
**Duration**: 2-3 days

**Total Figma Design Time**: 16-24 days (assumes 1 designer)

---

## Part 4: Agent Delegation Plan

### 4.1 Immediate Jobs (Week 1)

```
JOB 1: Generate Screen Inventory
  Agent: route-map-architect
  Goal: Create canonical screen inventory from existing documentation
  Inputs:
    - /docs/tiers/common/spec/feature-map.md
    - /docs/tiers/tier1/features.md
    - /docs/tiers/tier1/planning/r0-launch-scope.md
    - /docs/tiers/common/spec/state-maps.md
  Outputs:
    - /docs/product/screen-inventory.md
  Blocked by: Nothing
  Priority: CRITICAL - All other work depends on this

JOB 2: Generate Route Map
  Agent: route-map-architect
  Goal: Create navigation hierarchy and route tree
  Inputs:
    - Screen inventory (from JOB 1)
    - /docs/tiers/tier1/planning/r0-launch-scope.md
  Outputs:
    - /docs/product/route-map.md
  Blocked by: JOB 1
  Priority: CRITICAL

JOB 3: Generate User Flow Diagrams
  Agent: route-map-architect
  Goal: Document detailed step-by-step user flows
  Inputs:
    - Screen inventory (from JOB 1)
    - Route map (from JOB 2)
    - /docs/tiers/common/spec/state-maps.md
    - User journeys from TIER1_COMPREHENSIVE_ANALYSIS.md
  Outputs:
    - /docs/tiers/tier1/spec/user-flows/ (5 flow documents)
  Blocked by: JOB 1, JOB 2
  Priority: HIGH
```

### 4.2 Feature Specification Jobs (Week 1-2)

```
JOB 4: Authentication & User Management Feature Spec
  Agent: product-requirements-specialist
  Goal: Detailed specification for authentication system
  Inputs:
    - /docs/tiers/common/spec/feature-map.md (Section 1)
    - Screen inventory (JOB 1)
  Outputs:
    - /docs/tiers/tier1/spec/features/authentication-user-management.md
  Blocked by: JOB 1
  Priority: HIGH

JOB 5: Caregiver Profiles & Verification Feature Spec
  Agent: product-requirements-specialist
  Goal: Detailed specification for caregiver verification system
  Inputs:
    - /docs/tiers/common/spec/feature-map.md (Sections 2, 10)
    - Screen inventory (JOB 1)
  Outputs:
    - /docs/tiers/tier1/spec/features/caregiver-profiles-verification.md
  Blocked by: JOB 1
  Priority: HIGH

JOB 6: Discovery, Booking & Payment Feature Spec
  Agent: product-requirements-specialist
  Goal: Detailed specification for core transaction system
  Inputs:
    - /docs/tiers/common/spec/feature-map.md (Sections 4, 5, 7)
    - Screen inventory (JOB 1)
  Outputs:
    - /docs/tiers/tier1/spec/features/discovery-booking-payment.md
  Blocked by: JOB 1
  Priority: HIGH
  Note: Use placeholders for pricing if FDR-008 not resolved

JOB 7: Safeguarding & Admin Feature Spec
  Agent: product-requirements-specialist
  Goal: Detailed specification for safeguarding and admin systems
  Inputs:
    - /docs/tiers/common/spec/feature-map.md (Sections 9, 12)
    - Screen inventory (JOB 1)
  Outputs:
    - /docs/tiers/tier1/spec/features/safeguarding-admin.md
  Blocked by: JOB 1
  Priority: HIGH
```

### 4.3 Content Specification Jobs (Week 2)

```
JOB 8: All Screens Content Specification
  Agent: content-architect
  Goal: Define copy, labels, and messaging for all screens
  Inputs:
    - Screen inventory (JOB 1)
    - Feature specifications (JOBs 4-7)
    - Compliance requirements
  Outputs:
    - /docs/tiers/tier1/spec/content/public-pages.md
    - /docs/tiers/tier1/spec/content/authentication-content.md
    - /docs/tiers/tier1/spec/content/caregiver-content.md
    - /docs/tiers/tier1/spec/content/care-receiver-content.md
    - /docs/tiers/tier1/spec/content/admin-content.md
    - /docs/tiers/tier1/spec/content/error-messages.md
  Blocked by: JOBs 1, 4-7
  Priority: HIGH
```

### 4.4 UI Specification Jobs (Week 3)

```
JOB 9: Component Inventory & UI Specifications
  Agent: elderly-care-ux-ui-designer
  Goal: Define UI components, states, and accessibility requirements
  Inputs:
    - Screen inventory (JOB 1)
    - Feature specifications (JOBs 4-7)
    - Content specifications (JOB 8)
  Outputs:
    - /docs/tiers/tier1/spec/components.md
    - /docs/tiers/tier1/spec/accessibility.md
    - /docs/tiers/tier1/spec/ui-states.md
    - /docs/tiers/tier1/spec/responsive.md
  Blocked by: JOBs 1, 4-8
  Priority: HIGH
```

### 4.5 Validation Jobs (Week 3-4)

```
JOB 10: Design Readiness Validation
  Agent: product-director
  Goal: Validate all artifacts complete before design
  Inputs:
    - All outputs from JOBs 1-9
  Outputs:
    - /docs/tiers/tier1/spec/design-readiness-validation.md
  Blocked by: JOBs 1-9
  Priority: CRITICAL

JOB 11: Design Brief Generation
  Agent: elderly-care-ux-ui-designer
  Goal: Create final design brief for Figma work
  Inputs:
    - Validation report (JOB 10)
    - All specifications
  Outputs:
    - /docs/tiers/tier1/spec/figma-design-brief.md
  Blocked by: JOB 10
  Priority: HIGH
```

---

## Part 5: Agent Team Review

### 5.1 Current Agents

| Agent | Current Role Assessment | Design-Ready Contribution |
|-------|------------------------|---------------------------|
| **route-map-architect** | Responsible for screen inventory and route map - NOT YET INVOKED | CRITICAL - Must generate screen inventory before any other work |
| **product-requirements-specialist** | Responsible for feature specifications - Partially complete | HIGH - Must complete detailed specs per screen |
| **content-architect** | Responsible for content specifications - NOT YET INVOKED | HIGH - Must define all copy before design |
| **elderly-care-ux-ui-designer** | Responsible for UI specifications - NOT YET INVOKED | HIGH - Must define components, accessibility, states |
| **compliance-specialist** | Responsible for compliance callouts - Partially complete | MEDIUM - Must flag compliance elements per screen |
| **technical-architect** | Responsible for API/data specs - NOT YET INVOKED | MEDIUM - Data requirements inform design |
| **product-director** | Responsible for coordination and validation | CRITICAL - Must validate before design proceeds |

### 5.2 Gaps Identified

**Missing Agent Role**: No dedicated "information-architect" or "interaction-designer" agent exists. The route-map-architect handles screen inventory, but detailed interaction design (micro-interactions, animations, transitions) is not clearly owned.

**Recommendation**: The existing elderly-care-ux-ui-designer agent can absorb interaction design responsibilities. No new agent is required if the ui-designer scope is expanded to include:
- Interaction patterns (hover states, click feedback, transitions)
- Animation specifications (loading spinners, progress indicators)
- Touch gesture requirements (swipe, pinch for mobile)

### 5.3 Agent Sequencing

```
WEEK 1:
  route-map-architect (JOBs 1, 2, 3)
  |
  v
WEEK 1-2:
  product-requirements-specialist (JOBs 4, 5, 6, 7) - can start after JOB 1
  |
  v
WEEK 2:
  content-architect (JOB 8) - can start after JOBs 4-7
  |
  v
WEEK 3:
  elderly-care-ux-ui-designer (JOB 9) - can start after JOB 8
  |
  v
WEEK 3-4:
  product-director (JOB 10) - validation
  elderly-care-ux-ui-designer (JOB 11) - design brief
  |
  v
WEEK 4+:
  HUMAN DESIGNER - Figma work (outside agent system)
```

---

## Part 6: Blockers & Dependencies

### 6.1 Critical Blockers

```
BLOCKER 1: Screen Inventory Does Not Exist
  Impact: ALL downstream work blocked
  Resolution: Invoke route-map-architect (JOB 1) immediately
  Decision needed from: None - can proceed now
  Blocks: JOBs 2-11

BLOCKER 2: Pricing Model Undefined (FDR-008)
  Impact: Payment screens cannot be fully specified
  Resolution: Founder decision required on commission %, fee structure
  Decision needed from: Founder
  Blocks: JOB 6 (partial - can use placeholders), Figma design of payment screens
  Workaround: Use placeholders like "[X]% commission" in specs

BLOCKER 3: Insurance Minimums Undefined (GD-03)
  Impact: Caregiver verification content incomplete
  Resolution: Define minimum PL/PI insurance amounts
  Decision needed from: Founder or legal counsel
  Blocks: JOB 8 (partial - affects caregiver ToS copy)
  Workaround: Use placeholder "[minimum amount TBD]"
```

### 6.2 Dependencies

| Artifact | Depends On | Blocks |
|----------|-----------|--------|
| Screen Inventory | Source docs (complete) | Everything |
| Route Map | Screen Inventory | User Flows, Navigation Design |
| User Flows | Screen Inventory, Route Map | Feature Specs |
| Feature Specs | Screen Inventory | Content Specs, UI Specs |
| Content Specs | Feature Specs | UI Specs, Design Brief |
| UI Specs | Feature Specs, Content Specs | Design Brief |
| Design Brief | All Specs | Figma Design Work |
| Figma Designs | Design Brief | Development |

### 6.3 Open Questions

```
QUESTION 1: Should SCR-CG-013 (Caregiver Booking Request Detail) be a separate screen?
  Context: R0 document references this in Journey 2 but doesn't list it in the 26 screens
  Impact: Screen count may be 26 or 27
  Decision needed from: product-director
  Recommendation: Clarify if caregiver views booking requests on a shared SCR-CR-008 or dedicated screen

QUESTION 2: What is the exact cancellation policy?
  Context: Build sequence says ">24h = full refund, <24h = 50% refund" but feature-map has more detailed tiers
  Impact: Affects cancellation screen content and business logic
  Decision needed from: product-director
  Recommendation: Confirm cancellation policy in dedicated policy document

QUESTION 3: Are post-R0 screens (messaging, reviews) in scope for this design effort?
  Context: R0 excludes messaging and reviews, but they are in Tier 1 scope
  Impact: Affects total screen count for design (26 vs ~40 screens)
  Decision needed from: product-director
  Recommendation: Design R0 screens first, then expand to full MVP
```

---

## Part 7: Next Actions Checklist

### Immediate (This Week)

- [ ] **INVOKE route-map-architect** to generate screen inventory (JOB 1) - CRITICAL PATH
- [ ] **INVOKE route-map-architect** to generate route map (JOB 2) - after JOB 1
- [ ] **INVOKE route-map-architect** to generate user flows (JOB 3) - after JOB 2
- [ ] **ESCALATE FDR-008** (pricing decision) to founder if not yet decided
- [ ] **CLARIFY SCR-CG-013** - is it separate from SCR-CR-008?
- [ ] **CREATE** `/docs/tiers/tier1/spec/` folder structure for feature specs

### Week 2

- [ ] **INVOKE product-requirements-specialist** for feature specs (JOBs 4-7)
- [ ] **INVOKE content-architect** for content specs (JOB 8) - after feature specs
- [ ] **RESOLVE GD-03** (insurance minimums) if not yet decided
- [ ] **CONFIRM** cancellation policy details

### Week 3

- [ ] **INVOKE elderly-care-ux-ui-designer** for UI specs (JOB 9)
- [ ] **PRODUCT-DIRECTOR** validation of all artifacts (JOB 10)
- [ ] **GENERATE** final design brief (JOB 11)

### Week 4+

- [ ] **ENGAGE** human Figma designer with design brief
- [ ] **REVIEW** design outputs for specification compliance
- [ ] **ITERATE** on designs based on stakeholder feedback

---

## Part 8: Success Criteria

### Design-Ready Milestone Achieved When:

1. **Screen Inventory Complete**: All 26 R0 screens (minimum) documented with full schema
2. **Route Map Complete**: Navigation hierarchy documented and validated
3. **User Flows Complete**: All 5 major journeys documented with decision points
4. **Feature Specs Complete**: All Tier 1 systems have detailed specifications
5. **Content Specs Complete**: All screens have copy, labels, error messages defined
6. **UI Specs Complete**: Components, accessibility, states, responsive rules documented
7. **Validation Complete**: Cross-reference check passes, no blocking gaps
8. **Design Brief Complete**: Figma-ready summary document exists
9. **No Blockers**: FDR-008 (pricing) and GD-03 (insurance) resolved

### Quality Gates

| Gate | Criteria | Owner |
|------|----------|-------|
| Screen Inventory Quality | Every screen has: ID, route, roles, purpose, preconditions, states | route-map-architect |
| Feature Spec Quality | Every screen has: user stories, acceptance criteria, data requirements | product-requirements-specialist |
| Content Spec Quality | Every screen has: labels, CTAs, error messages, empty states | content-architect |
| Accessibility Quality | Every screen has: WCAG mapping, focus order, screen reader notes | elderly-care-ux-ui-designer |
| Cross-Reference Quality | 100% traceability between screens and feature map | product-director |

---

## Appendices

### Appendix A: R0 Screen List (26 Screens)

From `/docs/tiers/tier1/planning/r0-launch-scope.md`:

**Authentication & Registration (6)**
1. SCR-AUTH-001: Care Receiver Registration
2. SCR-AUTH-002: Family Member Registration
3. SCR-AUTH-003: Caregiver Registration
4. SCR-AUTH-004: Phone Verification
5. SCR-AUTH-005: Login
6. SCR-AUTH-006: Password Reset Request

**Public/Compliance (4)**
7. SCR-PUB-001: Homepage
8. SCR-PUB-006: Terms of Service
9. SCR-PUB-007: Privacy Policy
10. SCR-PUB-008: Safeguarding Policy

**Discovery & Booking (4)**
11. SCR-CR-003: Caregiver Search
12. SCR-CR-005: Caregiver Profile (Public View)
13. SCR-CR-006: Booking Request Form
14. SCR-CR-008: Booking Detail

**Payments (2)**
15. SCR-CR-013: Payment Methods
16. SCR-CG-020: Payout Setup

**Caregiver Onboarding (4)**
17. SCR-CG-002: Caregiver Onboarding
18. SCR-CG-008: Identity Verification
19. SCR-CG-009: Right to Work Verification
20. SCR-CG-010: DBS Check Submission (Voluntary)

**Admin Verification & Safeguarding (6)**
21. SCR-ADM-001: Admin Dashboard
22. SCR-ADM-005: Caregiver Application Review
23. SCR-ADM-007: Verification Review
24. SCR-ADM-008: DBS Review
25. SCR-ADM-014: Safeguarding Reports Queue
26. SCR-ADM-015: Safeguarding Report Detail

### Appendix B: Source Document Index

| Document | Path | Relevance |
|----------|------|-----------|
| Marketplace Spec | `/docs/tiers/common/spec/marketplace-spec.md` | Product vision |
| Feature Map | `/docs/tiers/common/spec/feature-map.md` | Feature definitions |
| State Maps | `/docs/tiers/common/spec/state-maps.md` | Critical flows |
| Tier 1 Features | `/docs/tiers/tier1/features.md` | Feature list |
| MVP Classification | `/docs/tiers/common/planning/mvp-classification.md` | Scope classification |
| Build Sequence | `/docs/tiers/tier1/planning/build-sequence.md` | Development phases |
| R0 Launch Scope | `/docs/tiers/tier1/planning/r0-launch-scope.md` | Launch screens |
| Comprehensive Analysis | `/docs/tiers/tier1/TIER1_COMPREHENSIVE_ANALYSIS.md` | Readiness assessment |
| Gaps Analysis | `/docs/tiers/GAPS_ANALYSIS.md` | Documentation gaps |
| Founder Decisions | `/docs/governance/founder-decisions-responses.md` | Strategic decisions |

### Appendix C: Agent Reference

| Agent | System Prompt Location | Primary Responsibility |
|-------|----------------------|------------------------|
| route-map-architect | `/.claude/agents/route-map-architect.md` | Screen inventory, route map, user flows |
| product-requirements-specialist | `/.claude/agents/product-requirements-specialist.md` | Feature specifications |
| content-architect | `/.claude/agents/content-architect.md` | Content specifications |
| elderly-care-ux-ui-designer | `/.claude/agents/elderly-care-ux-ui-designer.md` | UI specifications, accessibility, design brief |
| compliance-specialist | `/.claude/agents/compliance-specialist.md` | Compliance callouts |
| product-director | `/.claude/agents/product-director.md` | Coordination, validation |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-02 | Product Director | Initial design readiness roadmap |

---

## Part 9: Agent Execution Prompts

This section contains copy-paste ready prompts for executing each job in the Design Readiness Roadmap. All output paths use the draft location (`/docs/tiers/tier1/draft-design-specs/`) for review before final placement.

---

### JOB 1: Generate Screen Inventory

**Agent**: route-map-architect

**Prompt**:

```
# TASK: Generate Canonical Screen Inventory for Tier 1

## Objective

Create a comprehensive screen inventory document that serves as the canonical reference for all Tier 1 screens. This inventory will be the foundation for all downstream design and development work.

## Required Inputs

Read and analyze the following files:

1. `/docs/tiers/common/spec/feature-map.md` - Complete feature definitions with [T1] tier tags
2. `/docs/tiers/tier1/features.md` - 73 Tier 1 features across 11 systems
3. `/docs/tiers/tier1/planning/r0-launch-scope.md` - 26 R0 launch-critical screens with routes and rationale
4. `/docs/tiers/common/spec/state-maps.md` - 7 critical flows with state diagrams

## Output File

Write output to: `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`

## Output Format Requirements

For EACH screen, document the following schema:

```markdown
### SCR-[CATEGORY]-[NUMBER]: [Screen Name]

**Route**: `/path/to/screen`
**Purpose**: [One sentence describing what users accomplish on this screen]
**User Roles**: [Care Receiver | Family Member | Caregiver | Admin]
**Access Control**: [Authentication required? Role restrictions?]

**Preconditions** (what must be true to access this screen):
- [Condition 1]
- [Condition 2]

**Key States**:
| State | Description | Visual Indication |
|-------|-------------|-------------------|
| Loading | [Description] | [How it appears] |
| Empty | [Description] | [How it appears] |
| Populated | [Description] | [How it appears] |
| Error | [Description] | [How it appears] |
| [Other states] | | |

**Data Requirements**:
- **Displays**: [What data is shown]
- **Inputs**: [What data user provides]
- **Outputs**: [What data is created/modified]

**Primary Actions**: [What can user do here?]
- [Action 1] -> [Destination screen]
- [Action 2] -> [Destination screen]

**Data Sensitivity**: [None | Standard Personal Data | Sensitive]

**Related Screens**:
- Entry points: [Screens that link here]
- Exit points: [Screens user goes to from here]
```

## Quality Criteria

1. Every screen in R0 scope (26 screens) MUST be documented
2. Screen IDs must follow pattern: SCR-[CATEGORY]-[NUMBER] where CATEGORY is one of: AUTH, PUB, CR (Care Receiver), CG (Caregiver), ADM (Admin)
3. Every route must be valid URL path format
4. All user roles must match: Care Receiver, Family Member, Caregiver, Admin
5. States must include at minimum: Loading, Empty, Populated, Error
6. Data sensitivity must be classified for GDPR compliance

## Gap Handling

If you encounter gaps or ambiguities:
1. Document the gap clearly with [GAP: description]
2. Propose a reasonable default based on similar screens
3. Flag questions requiring product decision with [DECISION NEEDED: question]

## Cross-Reference Validation

After completing the inventory:
1. Verify all 26 R0 screens are documented
2. Verify screen IDs are unique
3. Verify all routes are unique
4. Verify entry/exit points create complete navigation graph
5. List any screens referenced but not defined (e.g., SCR-CG-013)

## Document Structure

1. Executive Summary (screen count by category, total)
2. Screen Inventory by Category (Auth, Public, Care Receiver, Caregiver, Admin)
3. Route Index (alphabetical list of all routes)
4. Cross-Reference Matrix (which screens link to which)
5. Gaps and Open Questions
```

---

### JOB 2: Generate Route Map

**Agent**: route-map-architect

**Prompt**:

```
# TASK: Generate Navigation Route Map for Tier 1

## Objective

Create a visual/textual route tree showing the complete navigation hierarchy of the Tier 1 application. This document defines how users navigate between screens.

## Required Inputs

Read and analyze the following files:

1. `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - Screen inventory from JOB 1
2. `/docs/tiers/tier1/planning/r0-launch-scope.md` - R0 scope with user journeys

## Output File

Write output to: `/docs/tiers/tier1/draft-design-specs/route-map.md`

## Output Format Requirements

### Section 1: Route Tree (ASCII Diagram)

```
/                               [SCR-PUB-001: Homepage]
|
+-- /login                      [SCR-AUTH-005: Login]
|   +-- /forgot-password        [SCR-AUTH-006: Password Reset]
|
+-- /register
|   +-- /care-receiver          [SCR-AUTH-001: Care Receiver Registration]
|   +-- /family                 [SCR-AUTH-002: Family Member Registration]
|   +-- /caregiver              [SCR-AUTH-003: Caregiver Registration]
|
+-- /verify/phone               [SCR-AUTH-004: Phone Verification]
|
+-- /search                     [SCR-CR-003: Caregiver Search]
|   +-- /caregivers/:id         [SCR-CR-005: Caregiver Profile]
|       +-- /bookings/new/:id   [SCR-CR-006: Booking Request Form]
|
[Continue for all routes...]
```

### Section 2: Navigation Matrix

| From Screen | To Screen | Trigger | User Role |
|-------------|-----------|---------|-----------|
| Homepage | Login | Click "Login" | All |
| Homepage | Care Receiver Registration | Click "Find Care" | Unauthenticated |
| [Continue...] | | | |

### Section 3: Role-Based Access Map

For each role, document which routes are accessible:

**Care Receiver Routes**:
- / (Homepage) - Public
- /search - Authenticated
- [Continue...]

**Caregiver Routes**:
- / (Homepage) - Public
- /caregiver/dashboard - Authenticated + Caregiver role
- [Continue...]

**Admin Routes**:
- /admin/* - Authenticated + Admin role
- [Continue...]

### Section 4: Authentication Boundaries

Document which routes require:
- No authentication (public)
- Authentication only (any logged-in user)
- Specific role + authentication
- Specific state (e.g., verified phone, approved profile)

### Section 5: Deep Link Support

List routes that should support deep linking (bookmarkable, shareable):
- /caregivers/:id (shareable profile link)
- /bookings/:id (booking reference link)
- [Continue...]

## Quality Criteria

1. Every screen in screen-inventory.md MUST appear in route tree
2. No orphan screens (screens with no entry point)
3. No dead-end screens (screens with no exit point except logout)
4. Authentication boundaries must be clearly marked
5. Role-based access must be consistent with screen-inventory.md

## Gap Handling

If you encounter gaps:
1. Document with [GAP: description]
2. Propose logical navigation path based on user journeys
3. Flag with [DECISION NEEDED: question] for unclear navigation

## Validation Checklist

- [ ] All 26 R0 screens mapped
- [ ] All routes are unique
- [ ] No circular navigation without exit
- [ ] Public vs authenticated clearly distinguished
- [ ] Role-based access matches feature-map.md RBAC definitions
```

---

### JOB 3: Generate User Flow Diagrams

**Agent**: route-map-architect

**Prompt**:

```
# TASK: Generate User Flow Diagrams for Tier 1

## Objective

Document detailed step-by-step user flows for the 5 major Tier 1 journeys. Each flow must show screen transitions, decision points, error paths, and success outcomes.

## Required Inputs

Read and analyze the following files:

1. `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - Screen inventory from JOB 1
2. `/docs/tiers/tier1/draft-design-specs/route-map.md` - Route map from JOB 2
3. `/docs/tiers/common/spec/state-maps.md` - State diagrams for critical flows
4. `/docs/tiers/tier1/TIER1_COMPREHENSIVE_ANALYSIS.md` - User journey documentation (Section 3)

## Output Files

Create 5 separate flow documents:

1. `/docs/tiers/tier1/draft-design-specs/user-flows/care-receiver-first-booking.md`
2. `/docs/tiers/tier1/draft-design-specs/user-flows/caregiver-onboarding.md`
3. `/docs/tiers/tier1/draft-design-specs/user-flows/admin-verification.md`
4. `/docs/tiers/tier1/draft-design-specs/user-flows/safeguarding-response.md`
5. `/docs/tiers/tier1/draft-design-specs/user-flows/family-proxy-booking.md`

## Output Format Requirements (Per Flow Document)

### 1. Flow Overview

```markdown
# User Flow: [Flow Name]

**Primary Actor**: [User Role]
**Goal**: [What user wants to accomplish]
**Preconditions**: [What must be true before flow starts]
**Success Outcome**: [What state indicates completion]
**Estimated Duration**: [How long this flow takes]
```

### 2. Flow Diagram (ASCII)

```
[START]
    |
    v
+-------------------+
| SCR-AUTH-001      |
| CR Registration   |
+-------------------+
    |
    | [User submits form]
    v
    /\
   /  \
  / Valid? \
  \      /
   \    /
    \  /
     \/
    / \
   /   \
  Yes   No
  |     |
  v     v
[Next]  [Error State: Show validation errors]
        |
        | [User corrects and resubmits]
        +---------> [Back to form]
```

### 3. Step-by-Step Narrative

| Step | Screen | User Action | System Response | Success Path | Error Path |
|------|--------|-------------|-----------------|--------------|------------|
| 1 | SCR-PUB-001 | Click "Find Care" | Navigate to registration | Step 2 | N/A |
| 2 | SCR-AUTH-001 | Enter registration details | Validate form | Step 3 | Show validation errors |
| [Continue...] | | | | | |

### 4. Decision Points

Document every branch in the flow:

| Decision Point | Question | Yes Path | No Path |
|----------------|----------|----------|---------|
| Email Valid? | Is email format correct and not already registered? | Continue to phone verification | Show error: "Invalid email" or "Email already registered" |
| [Continue...] | | | |

### 5. Error Paths

Document each error scenario:

| Error Scenario | Trigger | User Sees | Recovery Path |
|----------------|---------|-----------|---------------|
| Invalid email format | User enters malformed email | Inline error: "Please enter a valid email address" | User corrects email, form re-validates |
| [Continue...] | | | |

### 6. Data Captured Per Step

| Step | Data Input | Validation Rules | Where Stored |
|------|------------|------------------|--------------|
| 2 | Email | Valid format, unique | users.email |
| 2 | Password | Min 8 chars, complexity | users.password_hash |
| [Continue...] | | | |

### 7. Notifications Triggered

| Step | Notification Type | Recipient | Content Summary |
|------|-------------------|-----------|-----------------|
| 3 | Email | User | "Verify your email address" |
| 4 | SMS | User | "Your verification code is XXXXXX" |
| [Continue...] | | | |

## Quality Criteria

1. Every screen transition must be documented
2. Every decision point must have both Yes and No paths
3. Every error scenario must have a recovery path
4. Flow must start and end at defined states
5. Data captured must match screen-inventory.md data requirements
6. Notifications must match feature-map.md notification definitions

## Gap Handling

If you encounter gaps:
1. Document with [GAP: description]
2. Propose logical flow based on state-maps.md
3. Flag with [DECISION NEEDED: question] for unclear transitions

## Flow-Specific Requirements

### Flow 1: Care Receiver First Booking
- Must cover: Registration -> Verification -> Search -> Profile View -> Booking Request -> Payment Setup -> Confirmation
- Include: Payment authorization (Stripe), caregiver response waiting, contact detail sharing

### Flow 2: Caregiver Onboarding (Tier 1)
- Must cover: Registration -> Profile Setup -> ID Verification -> Right to Work -> Optional DBS -> Admin Review -> Profile Live
- Include: "Companionship Only" badge assignment, Stripe Connect setup

### Flow 3: Admin Verification Workflow
- Must cover: Login (2FA) -> Dashboard -> Application Queue -> Document Review -> Approve/Reject
- Include: Verification SLAs, rejection reasons, notification to caregiver

### Flow 4: Safeguarding Incident Response
- Must cover: Report Submission -> Admin Alert -> Triage -> Investigation -> Resolution/Escalation
- Include: Severity levels, escalation to SAB, user suspension paths

### Flow 5: Family Proxy Booking
- Must cover: Family Registration -> Consent Capture -> Care Receiver Details -> Booking on Behalf
- Include: Permission levels, shared visibility, proxy-specific UI elements
```

---

### JOB 4: Authentication and User Management Feature Spec

**Agent**: product-requirements-specialist

**Prompt**:

```
# TASK: Write Feature Specification - Authentication and User Management

## Objective

Create a comprehensive feature specification for the Authentication and User Management system. This spec will be the definitive reference for engineering implementation.

## Required Inputs

Read and analyze the following files:

1. `/docs/tiers/common/spec/feature-map.md` - Section 1: User Management & Authentication [TIER 1]
2. `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - Screens SCR-AUTH-001 through SCR-AUTH-006
3. `/docs/tiers/tier1/features.md` - Authentication features (8 features)
4. `/docs/tiers/common/spec/state-maps.md` - Section 1: Registration Flow
5. `/docs/tiers/tier1/TIER1_COMPREHENSIVE_ANALYSIS.md` - User role definitions

## Output File

Write output to: `/docs/tiers/tier1/draft-design-specs/features/authentication-user-management.md`

## Output Format Requirements

### Document Structure

```markdown
# Feature Specification: Authentication and User Management

**Document Version**: 1.0
**Status**: DRAFT
**Last Updated**: [Date]
**Owner**: Product Team

---

## 1. Overview

### 1.1 Purpose
[What this system does and why it exists]

### 1.2 Scope
[What is included and excluded at Tier 1]

### 1.3 User Roles Served
[Which roles interact with this system]

---

## 2. Feature List

### 2.1 Care Receiver Registration [T1]

**Feature ID**: AUTH-001
**Priority**: MVP (R0)
**Screen**: SCR-AUTH-001

#### User Stories

```gherkin
AS A care receiver (or family member registering on behalf)
I WANT TO create an account on the platform
SO THAT I can search for and book caregivers

ACCEPTANCE CRITERIA:
- GIVEN I am on the registration page
- WHEN I enter valid email, password, phone, and postcode
- AND I agree to terms of service
- THEN my account is created with status "pending_phone_verification"
- AND I receive an SMS with verification code
```

#### Functional Requirements

| ID | Requirement | Validation Rule | Error Message |
|----|-------------|-----------------|---------------|
| AUTH-001-01 | Email must be valid format | RFC 5322 compliant | "Please enter a valid email address" |
| AUTH-001-02 | Email must be unique | Not in users table | "This email is already registered" |
| AUTH-001-03 | Password minimum 8 characters | Length >= 8 | "Password must be at least 8 characters" |
| AUTH-001-04 | Phone must be UK mobile | Starts with 07, 11 digits | "Please enter a valid UK mobile number" |
| [Continue...] | | | |

#### Data Requirements

| Field | Type | Required | Validation | Storage |
|-------|------|----------|------------|---------|
| email | string | Yes | RFC 5322 | users.email |
| password | string | Yes | Min 8 chars | users.password_hash (bcrypt) |
| phone | string | Yes | UK mobile format | users.phone |
| postcode | string | Yes | UK postcode format | care_receiver_profiles.postcode |
| [Continue...] | | | | |

#### Business Rules

1. Duplicate email registration: Show login prompt with "Already have an account?" link
2. Password complexity: Minimum 8 characters, no specific complexity requirements (accessibility)
3. Phone uniqueness: Same phone can only be associated with one active account
4. [Continue...]

#### Error Handling

| Error Condition | System Response | User Experience |
|-----------------|-----------------|-----------------|
| Database connection failed | Log error, return 500 | "Something went wrong. Please try again." |
| Email service unavailable | Queue email for retry | Show success, email arrives later |
| [Continue...] | | |

---

[REPEAT THIS STRUCTURE FOR EACH FEATURE]:
- 2.2 Family Member Registration [T1]
- 2.3 Caregiver Registration [T1]
- 2.4 Phone Verification [T1]
- 2.5 Email Verification [T1]
- 2.6 Login [T1]
- 2.7 Password Reset [T1]
- 2.8 Session Management [T1]
- 2.9 Multi-Factor Authentication (Admin) [T1]
- 2.10 Role-Based Access Control [T1]

---

## 3. State Machine

[Include state diagram from state-maps.md Section 1, adapted for this spec]

---

## 4. Security Requirements

| Requirement | Implementation | Rationale |
|-------------|----------------|-----------|
| Password hashing | bcrypt, cost factor 12 | Industry standard |
| Session tokens | HTTP-only cookies, 30-day expiry | XSS protection |
| CSRF protection | Token per form submission | OWASP recommendation |
| Rate limiting | 10 login attempts per 10 minutes | Brute force protection |
| [Continue...] | | |

---

## 5. Compliance Requirements

| Regulation | Requirement | Implementation |
|------------|-------------|----------------|
| GDPR Article 7 | Consent for data processing | Checkbox: "I agree to Terms of Service" |
| GDPR Article 13 | Privacy notice | Link to Privacy Policy on registration |
| [Continue...] | | |

---

## 6. Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| Twilio | External | SMS OTP verification |
| SendGrid/SES | External | Email verification and notifications |
| PostgreSQL | Infrastructure | User data storage |
| [Continue...] | | |

---

## 7. Open Questions

[List any unresolved questions with [DECISION NEEDED] tag]

---

## 8. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | product-requirements-specialist | Initial draft |
```

## Quality Criteria

1. Every feature must have user stories in Gherkin format
2. Every input field must have validation rules and error messages
3. Every feature must trace back to feature-map.md [T1] tags
4. All screens referenced must exist in screen-inventory.md
5. State transitions must match state-maps.md
6. Security requirements must meet OWASP guidelines
7. GDPR compliance requirements must be explicit

## Gap Handling

If you encounter gaps:
1. Document with [GAP: description]
2. Propose reasonable default based on industry standards
3. Flag with [DECISION NEEDED: question] for product decisions
4. Reference feature-map.md for any unclear requirements
```

---

### JOB 5: Caregiver Profiles and Verification Feature Spec

**Agent**: product-requirements-specialist

**Prompt**:

```
# TASK: Write Feature Specification - Caregiver Profiles and Verification

## Objective

Create a comprehensive feature specification for the Caregiver Profile and Verification systems. This includes profile creation, verification workflows, and badge systems.

## Required Inputs

Read and analyze the following files:

1. `/docs/tiers/common/spec/feature-map.md` - Sections 2 (Caregiver Capability) and 10 (Identity & Background Verification)
2. `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - Screens SCR-CG-002, SCR-CG-008, SCR-CG-009, SCR-CG-010
3. `/docs/tiers/tier1/features.md` - Caregiver Profile System (7 features), Verification System (6 features)
4. `/docs/governance/founder-decisions-responses.md` - FDR-001 (self-employment), FDR-002 (Introduction Agency)

## Output File

Write output to: `/docs/tiers/tier1/draft-design-specs/features/caregiver-profiles-verification.md`

## Output Format Requirements

Follow the same document structure as JOB 4, with these specific sections:

### Feature List Required

1. **Profile Creation**
   - Professional profile (name, photo, bio)
   - Service type selection (companionship only at T1)
   - Hourly rate setting (caregiver-controlled)
   - Service radius configuration
   - Availability calendar setup

2. **Identity Verification**
   - Government ID upload
   - Selfie/liveness check
   - Address verification
   - Stripe Identity integration

3. **Right to Work Verification**
   - UK passport auto-verification
   - UKVI share code verification
   - Visa expiry tracking
   - Work restrictions checking

4. **Voluntary DBS Certificate Upload** (Tier 1 specific)
   - Certificate upload interface
   - Admin verification workflow
   - "DBS Verified" badge award
   - Certificate expiry tracking

5. **Admin Verification Workflow**
   - Verification queue management
   - Document review interface
   - Approve/reject with reasons
   - SLA tracking (48 hours)

6. **Badge System**
   - "Identity Verified" badge
   - "DBS Verified" badge (if submitted)
   - "Companionship Services Only" badge (Tier 1 default)
   - Badge display on profile

### Tier 1 Specific Notes

Document explicitly what is NOT included at Tier 1:
- Medical condition experience profile (Tier 3)
- Care skills profile (Tier 2)
- Mandatory DBS verification (Tier 2)
- Qualification verification (Tier 2)
- Insurance verification requirements [PLACEHOLDER: GD-03 pending]

### Self-Employment Compliance (FDR-001)

Include specific requirements that establish self-employment:
- Caregiver sets own rates (not platform-dictated)
- Caregiver controls availability (not assigned)
- Caregiver can decline bookings (no penalty for reasonable declinations)
- Substitution rights documented in Terms
- No equipment provided by platform

## Quality Criteria

1. Every verification type must have clear acceptance criteria
2. Verification workflow must include SLAs
3. Badge logic must be explicitly defined
4. Self-employment indicators must be documented per FDR-001
5. Tier 1 exclusions must be clearly stated
6. Admin actions must have audit trail requirements

## Gap Handling

If insurance requirements (GD-03) are undefined:
- Use placeholder: "[PLACEHOLDER: Insurance minimum TBD per GD-03]"
- Document that this section needs founder decision
```

---

### JOB 6: Discovery, Booking and Payment Feature Spec

**Agent**: product-requirements-specialist

**Prompt**:

```
# TASK: Write Feature Specification - Discovery, Booking and Payment

## Objective

Create a comprehensive feature specification for the core transaction flow: discovering caregivers, creating bookings, and processing payments.

## Required Inputs

Read and analyze the following files:

1. `/docs/tiers/common/spec/feature-map.md` - Sections 4 (Discovery), 5 (Booking System), 7 (Payment System)
2. `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - Screens SCR-CR-003, SCR-CR-005, SCR-CR-006, SCR-CR-008, SCR-CR-013, SCR-CG-020
3. `/docs/tiers/tier1/features.md` - Discovery (7), Booking (9), Payments (7) features
4. `/docs/tiers/common/spec/state-maps.md` - Section 2: Booking Flow

## Output File

Write output to: `/docs/tiers/tier1/draft-design-specs/features/discovery-booking-payment.md`

## Output Format Requirements

Follow the same document structure as JOB 4, with these specific sections:

### Feature List Required

**Discovery System**:
1. Location-based search (postcode + radius)
2. Filter by availability
3. Filter by hourly rate range
4. Filter by DBS verified status
5. Filter by gender (optional)
6. Caregiver profile cards (search results)
7. Saved searches and favorites

**Booking System**:
1. Booking request creation
2. Date/time selection
3. Duration selection (minimum 2 hours)
4. Special requests (500 char limit)
5. Emergency contact sharing
6. Caregiver accept/decline workflow
7. Booking lifecycle management (requested -> accepted -> in_progress -> completed)
8. Cancellation handling
9. No-show management

**Payment System**:
1. Care receiver payment method setup (Stripe)
2. Payment authorization (hold on request)
3. Payment capture (on acceptance)
4. Escrow management
5. Payout setup (Stripe Connect)
6. Payout release (on completion)
7. Refund processing

### Pricing Placeholders

Use these placeholders for pricing (FDR-008 pending):
- "[PLACEHOLDER: X% platform service fee - TBD per FDR-008]"
- "[PLACEHOLDER: Y% caregiver commission - TBD per FDR-008]"
- Document pricing placeholder locations clearly

### Cancellation Policy

Document the cancellation policy from state-maps.md:
- 48+ hours: Full refund
- 24-48 hours: 50% refund
- <24 hours: No refund

### Booking State Machine

Include complete state diagram from state-maps.md Section 2, with:
- All states: draft, requested, accepted, in_progress, completed, cancelled, declined, disputed, no_show
- All transitions with triggers and guards
- Timeout rules

### Payment Flow Diagram

Document the complete payment flow:
1. Authorization (booking request)
2. Capture (booking acceptance)
3. Hold (escrow during booking)
4. Release (booking completion)
5. Refund paths (cancellation, dispute)

## Quality Criteria

1. Every booking state must have entry/exit conditions
2. Payment flow must handle all edge cases (decline, cancel, no-show)
3. Cancellation policy must be explicit with refund calculations
4. Search filters must have clear filter logic
5. Pricing placeholders must be clearly marked
6. Stripe integration points must be identified

## Gap Handling

If pricing model (FDR-008) is undefined:
- Use placeholders throughout
- Document example calculations with X% and Y% variables
- Note that final values require founder decision
```

---

### JOB 7: Safeguarding and Admin Feature Spec

**Agent**: product-requirements-specialist

**Prompt**:

```
# TASK: Write Feature Specification - Safeguarding and Admin

## Objective

Create a comprehensive feature specification for the Safeguarding Incident Management system and Admin Operations dashboard.

## Required Inputs

Read and analyze the following files:

1. `/docs/tiers/common/spec/feature-map.md` - Sections 9 (Safeguarding & Incident Management), 12 (Admin Operations & Oversight)
2. `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - Screens SCR-ADM-001, SCR-ADM-005, SCR-ADM-007, SCR-ADM-008, SCR-ADM-014, SCR-ADM-015
3. `/docs/tiers/tier1/features.md` - Safeguarding (6), Admin (7) features
4. `/docs/tiers/common/spec/state-maps.md` - Sections 3 (Emergency Flow), 4 (Safeguarding Incident Flow), 6 (Account Suspension Flow)
5. `/docs/compliance/legal-framework.md` - Care Act 2014 compliance requirements

## Output File

Write output to: `/docs/tiers/tier1/draft-design-specs/features/safeguarding-admin.md`

## Output Format Requirements

Follow the same document structure as JOB 4, with these specific sections:

### Feature List Required

**Safeguarding System**:
1. Incident reporting form (users)
2. Incident categorization (safety, abuse, financial, conduct)
3. Severity classification (low, medium, high, critical)
4. Admin incident review queue
5. Investigation workflow
6. Escalation to SAB (Safeguarding Adults Board)
7. User suspension/ban system
8. Resolution and documentation

**Admin Dashboard**:
1. Dashboard overview (metrics, alerts, queues)
2. User management interface
3. Caregiver application review queue
4. Verification management
5. Booking oversight
6. Dispute resolution interface
7. Report management

### Care Act 2014 Compliance

Document explicitly how each safeguarding feature meets Care Act 2014 requirements:
- Section 42: Safeguarding duties
- Section 43: Safeguarding Adults Boards liaison
- Section 44: Safeguarding Adults Reviews

### SLA Requirements

| Action | SLA | Escalation |
|--------|-----|------------|
| Critical incident triage | 30 minutes | Immediate phone call to safeguarding team |
| High severity triage | 4 hours | SMS alert to on-call admin |
| Standard incident triage | 24 hours | Email notification |
| Caregiver verification | 48 hours | Admin queue alert |

### State Machines

Include state diagrams from state-maps.md:
- Safeguarding Incident Flow (Section 4)
- Account Suspension Flow (Section 6)

### External Escalation Procedures

Document:
- When to contact emergency services (999)
- When to contact Safeguarding Adults Board
- When to contact police
- SAB referral form requirements

### Admin Audit Trail Requirements

Every admin action must be logged:
- Who performed the action
- What action was taken
- When it occurred
- Why (reason/rationale)
- What was the outcome

## Quality Criteria

1. Every safeguarding scenario must have response procedure
2. SLAs must be explicit and measurable
3. Care Act 2014 compliance must be traceable
4. Escalation paths must be clear
5. Admin actions must have audit trail requirements
6. User communication templates must be included

## Gap Handling

If SAB contact details are not available:
- Note: "[PLACEHOLDER: Local SAB contact list to be compiled pre-launch]"
- Document the structure expected (name, phone, email, region)
```

---

### JOB 8: All Screens Content Specification

**Agent**: content-architect

**Prompt**:

```
# TASK: Create Content Specifications for All Tier 1 Screens

## Objective

Define all copy, labels, microcopy, and messaging for every Tier 1 screen. This specification ensures consistent tone, accessibility, and compliance across the application.

## Required Inputs

Read and analyze the following files:

1. `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - All 26 R0 screens
2. `/docs/tiers/tier1/draft-design-specs/features/authentication-user-management.md` - Auth feature spec
3. `/docs/tiers/tier1/draft-design-specs/features/caregiver-profiles-verification.md` - Caregiver feature spec
4. `/docs/tiers/tier1/draft-design-specs/features/discovery-booking-payment.md` - Booking feature spec
5. `/docs/tiers/tier1/draft-design-specs/features/safeguarding-admin.md` - Admin feature spec
6. `/docs/tiers/tier1/website-content/` - Existing marketing content for reference
7. `/docs/compliance/legal-framework.md` - Compliance language requirements

## Output Files

Create 6 content specification documents:

1. `/docs/tiers/tier1/draft-design-specs/content/public-pages.md`
2. `/docs/tiers/tier1/draft-design-specs/content/authentication-content.md`
3. `/docs/tiers/tier1/draft-design-specs/content/caregiver-content.md`
4. `/docs/tiers/tier1/draft-design-specs/content/care-receiver-content.md`
5. `/docs/tiers/tier1/draft-design-specs/content/admin-content.md`
6. `/docs/tiers/tier1/draft-design-specs/content/error-messages.md`

## Output Format Requirements (Per Screen)

```markdown
## SCR-[ID]: [Screen Name]

### Page Meta
- **Title Tag**: [60 chars max]
- **Meta Description**: [155 chars max]

### Headings
- **H1**: [Main heading - one per page]
- **H2**: [Section headings]
- **H3**: [Sub-section headings]

### Form Labels
| Field | Label | Placeholder | Help Text |
|-------|-------|-------------|-----------|
| email | Email address | you@example.com | We'll send verification to this email |
| [Continue...] | | | |

### Button Text
| Button | Primary Text | Loading Text | Disabled Text |
|--------|--------------|--------------|---------------|
| Submit | Create Account | Creating... | Complete all fields |
| [Continue...] | | | |

### CTAs (Call to Action)
- **Primary CTA**: [Button text]
- **Secondary CTA**: [Link text]

### Instructional Copy
[Explanatory text that guides users through the screen]

### Success Messages
| Action | Message |
|--------|---------|
| Form submit | "Account created! Check your phone for verification code." |
| [Continue...] | |

### Error Messages
| Error | Message |
|-------|---------|
| Invalid email | "Please enter a valid email address" |
| [Continue...] | |

### Empty States
[Copy shown when no data exists, e.g., "No bookings yet"]

### Tooltips/Info Icons
| Element | Tooltip Text |
|---------|--------------|
| DBS badge | "This caregiver has provided a valid DBS certificate" |
| [Continue...] | |

### Legal/Compliance Text
| Element | Text | Rationale |
|---------|------|-----------|
| Consent checkbox | "I agree to the Terms of Service and Privacy Policy" | GDPR Article 7 |
| [Continue...] | | |
```

## Content Guidelines

### Tone of Voice
- **Warm but professional**: Caring, trustworthy, not clinical
- **Clear and simple**: Accessible to elderly users (avoid jargon)
- **Reassuring**: Emphasize safety and verification
- **Respectful**: Never condescending or patronizing

### Accessibility Requirements
- Reading level: Aim for age 12 reading level (Flesch-Kincaid)
- Avoid idioms and cultural references
- Use active voice
- Keep sentences under 20 words where possible
- Use bullet points for lists

### Elderly User Considerations
- Larger text labels (no abbreviations)
- Clear, unambiguous language
- Avoid time pressure language ("Hurry!", "Limited time!")
- Provide reassurance ("Your information is secure")

### Self-Employment Language (FDR-001)
- Platform "connects" or "introduces" (never "provides" or "employs")
- Caregivers are "independent professionals" (never "our caregivers")
- "Request" bookings (not "order" or "purchase")

### GDPR Compliance Language
- Clear consent language for data collection
- Explain what data is collected and why
- Link to Privacy Policy at every data collection point

## Quality Criteria

1. Every screen must have complete content specification
2. All labels must be consistent across screens (same field = same label)
3. Error messages must be helpful, not just error codes
4. Empty states must guide users to take action
5. Legal text must be approved by compliance
6. Character limits must be specified for all text fields
7. All content must be appropriate for elderly users

## Gap Handling

If copy requirements are unclear:
1. Draft sensible placeholder text
2. Mark with [DRAFT: needs review]
3. Note any regulatory implications
4. Flag for compliance review if legal language involved
```

---

### JOB 9: Component Inventory and UI Specifications

**Agent**: elderly-care-ux-ui-designer

**Prompt**:

```
# TASK: Create Component Inventory and UI Specifications

## Objective

Define all UI components, accessibility requirements, UI states, and responsive design specifications needed for Tier 1 screens.

## Required Inputs

Read and analyze the following files:

1. `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - All 26 R0 screens
2. `/docs/tiers/tier1/draft-design-specs/features/*.md` - All feature specifications
3. `/docs/tiers/tier1/draft-design-specs/content/*.md` - All content specifications
4. `/docs/tiers/common/spec/feature-map.md` - Section 22: Technical Infrastructure (accessibility subsection)

## Output Files

Create 4 UI specification documents:

1. `/docs/tiers/tier1/draft-design-specs/components.md`
2. `/docs/tiers/tier1/draft-design-specs/accessibility.md`
3. `/docs/tiers/tier1/draft-design-specs/ui-states.md`
4. `/docs/tiers/tier1/draft-design-specs/responsive.md`

---

## Output 1: Component Inventory (/components.md)

### Format

```markdown
# UI Component Inventory

## 1. Buttons

### 1.1 Primary Button
- **Usage**: Main action on page (Submit, Continue, Confirm)
- **States**: Default, Hover, Active, Disabled, Loading
- **Minimum touch target**: 44x44px
- **Text**: 16px, semibold
- **Screens used**: [List all screens using this component]

### 1.2 Secondary Button
[Same format...]

## 2. Form Inputs

### 2.1 Text Input
- **Usage**: Single-line text entry
- **States**: Default, Focused, Error, Disabled, Readonly
- **Label position**: Above input
- **Error message position**: Below input
- **Minimum height**: 48px (touch accessibility)

### 2.2 Password Input
[Same format, include show/hide toggle...]

## 3. Cards

### 3.1 Caregiver Profile Card
- **Usage**: Search results, recommendations
- **Contents**: Photo, name, rating, hourly rate, service radius, badges
- **Click action**: Navigate to full profile

## 4. Modals

### 4.1 Confirmation Modal
- **Usage**: Destructive actions, important confirmations
- **Components**: Title, message, primary button, secondary button
- **Accessibility**: Focus trap, ESC to close, click outside to close

## 5. Navigation

### 5.1 Header Navigation
[Continue...]

## 6. Badges

### 6.1 DBS Verified Badge
- **Usage**: Caregiver profiles, search results
- **Visual**: Shield icon + "DBS Verified" text
- **Tooltip**: "This caregiver has provided a valid DBS certificate"

## 7. Alerts/Notifications

### 7.1 Success Alert
### 7.2 Error Alert
### 7.3 Warning Alert
### 7.4 Info Alert

## 8. Loading Indicators

### 8.1 Button Loading Spinner
### 8.2 Page Loading Skeleton
### 8.3 Inline Loading Spinner
```

---

## Output 2: Accessibility Requirements (/accessibility.md)

### Format

```markdown
# Accessibility Requirements (WCAG 2.1 AA)

## Global Requirements

### Color Contrast
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text (18px+)**: Minimum 3:1 contrast ratio
- **Interactive elements**: Minimum 3:1 against background

### Touch Targets
- **Minimum size**: 44x44px (iOS guideline)
- **Minimum spacing**: 8px between targets

### Focus Indicators
- **Visible focus**: 2px solid outline on all interactive elements
- **Focus order**: Logical tab order matching visual layout

### Screen Reader Support
- **ARIA labels**: All interactive elements
- **ARIA live regions**: Dynamic content updates
- **Heading hierarchy**: Proper H1 > H2 > H3 structure

## Per-Screen Requirements

### SCR-AUTH-001: Care Receiver Registration
| Element | ARIA Label | Focus Order | Notes |
|---------|------------|-------------|-------|
| Email input | "Email address, required" | 1 | |
| Password input | "Password, required, minimum 8 characters" | 2 | |
| Show password toggle | "Show password" / "Hide password" | 3 | State-dependent label |
| [Continue...] | | | |

### [Repeat for all 26 screens...]

## Keyboard Navigation

| Action | Key(s) | Context |
|--------|--------|---------|
| Submit form | Enter | When focused on form input |
| Close modal | Escape | When modal is open |
| Navigate options | Arrow keys | In dropdown/select |
| [Continue...] | | |

## Elderly User Adaptations

### Visual
- Minimum font size: 16px body, 14px captions
- High contrast mode support
- No color-only indicators (always include text/icon)

### Motor
- Large click/tap targets (minimum 44px)
- No hover-only interactions
- Generous click areas for links

### Cognitive
- Simple, consistent layouts
- Clear progress indicators
- Undo available for destructive actions
- No time limits on forms
```

---

## Output 3: UI States (/ui-states.md)

### Format

```markdown
# UI States Specification

## Global States

### Loading States
| Component | Loading Indicator | Duration Threshold | Fallback |
|-----------|-------------------|-------------------|----------|
| Page load | Skeleton screen | > 300ms | Show skeleton |
| Button action | Inline spinner | Immediate | Disable button |
| Data fetch | Inline spinner | > 500ms | Show spinner |

### Empty States
| Screen | Empty State Message | Action |
|--------|---------------------|--------|
| Search results | "No caregivers found in your area. Try expanding your search radius." | "Expand Search" button |
| Booking history | "No bookings yet. Find a caregiver to get started." | "Search Caregivers" button |
| [Continue...] | | |

### Error States
| Error Type | Visual Treatment | Message Pattern | Recovery Action |
|------------|------------------|-----------------|-----------------|
| Form validation | Inline error below field, red border | "[Field] is required" | Focus on first error |
| API error | Alert banner at top | "Something went wrong. Please try again." | Retry button |
| 404 | Full page | "Page not found" | "Go to Homepage" link |
| [Continue...] | | | |

### Success States
| Action | Visual Treatment | Message | Duration |
|--------|------------------|---------|----------|
| Form submit | Green success banner | "[Action] successful" | 5 seconds |
| [Continue...] | | | |

## Per-Screen States

### SCR-CR-003: Caregiver Search

| State | Trigger | Visual | User Action |
|-------|---------|--------|-------------|
| Initial | Page load, no search | Search form prominent | Enter postcode |
| Searching | Form submitted | Loading skeleton cards | Wait |
| Results | Search complete, >0 results | Caregiver cards grid | Browse/filter |
| No results | Search complete, 0 results | Empty state message | Adjust search |
| Error | API failure | Error banner | Retry |
```

---

## Output 4: Responsive Design (/responsive.md)

### Format

```markdown
# Responsive Design Specification

## Breakpoints

| Name | Min Width | Typical Devices |
|------|-----------|-----------------|
| Mobile | 320px | Small phones |
| Mobile Large | 375px | Standard phones |
| Tablet | 768px | Tablets, portrait |
| Desktop | 1024px | Laptops, tablets landscape |
| Desktop Large | 1440px | Desktop monitors |

## Layout Grids

### Mobile (320px - 767px)
- **Columns**: 4
- **Gutter**: 16px
- **Margin**: 16px

### Tablet (768px - 1023px)
- **Columns**: 8
- **Gutter**: 24px
- **Margin**: 32px

### Desktop (1024px+)
- **Columns**: 12
- **Gutter**: 24px
- **Margin**: 64px (max-width: 1200px)

## Component Adaptations

### Navigation
| Breakpoint | Behavior |
|------------|----------|
| Mobile | Hamburger menu, full-screen overlay |
| Tablet | Hamburger menu, side drawer |
| Desktop | Horizontal navigation bar |

### Caregiver Cards (Search Results)
| Breakpoint | Layout |
|------------|--------|
| Mobile | Single column, full width |
| Tablet | 2 columns |
| Desktop | 3 columns |

### Forms
| Breakpoint | Layout |
|------------|--------|
| Mobile | Single column, stacked labels |
| Desktop | Two columns where logical (address fields) |

## Typography Scale

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| H1 | 24px | 28px | 32px |
| H2 | 20px | 22px | 24px |
| Body | 16px | 16px | 16px |
| Caption | 14px | 14px | 14px |

## Touch vs Mouse Considerations

| Interaction | Touch (Mobile/Tablet) | Mouse (Desktop) |
|-------------|----------------------|-----------------|
| Primary button | 48px height | 40px height |
| Link spacing | 44px minimum | 32px minimum |
| Hover states | None (tap = click) | Hover effects |
```

## Quality Criteria

1. Every component must specify all states
2. Every screen must have accessibility requirements
3. All breakpoints must be covered
4. Elderly user adaptations must be explicit
5. WCAG 2.1 AA compliance must be verifiable
6. Touch targets must meet 44px minimum

## Gap Handling

If design patterns are unclear:
1. Propose pattern based on WCAG guidelines
2. Mark with [DESIGN DECISION NEEDED]
3. Provide rationale for recommendation
4. Reference elderly care UX best practices
```

---

### JOB 10: Design Readiness Validation

**Agent**: product-director

**Prompt**:

```
# TASK: Validate Design Readiness Across All Artifacts

## Objective

Perform comprehensive cross-reference validation of all design artifacts to ensure completeness and consistency before Figma design work begins.

## Required Inputs

Read and analyze ALL files in:
- `/docs/tiers/tier1/draft-design-specs/` (all outputs from JOBs 1-9)

## Output File

Write output to: `/docs/tiers/tier1/draft-design-specs/design-readiness-validation.md`

## Validation Checklist

### 1. Screen Coverage Validation

For each of the 26 R0 screens, verify existence of:

| Screen ID | Screen Inventory | Route Map | User Flow | Feature Spec | Content Spec | UI Spec | Status |
|-----------|------------------|-----------|-----------|--------------|--------------|---------|--------|
| SCR-AUTH-001 | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] READY / [ ] GAPS |
| [Continue for all 26...] | | | | | | | |

### 2. Cross-Reference Consistency

Check for mismatches between documents:

| Check | Document A | Document B | Match? | Issue |
|-------|------------|------------|--------|-------|
| Screen IDs | screen-inventory.md | route-map.md | Yes/No | [Describe mismatch] |
| Routes | screen-inventory.md | route-map.md | Yes/No | [Describe mismatch] |
| Field names | feature specs | content specs | Yes/No | [Describe mismatch] |
| Error messages | feature specs | content specs | Yes/No | [Describe mismatch] |
| [Continue...] | | | | |

### 3. Completeness Audit

For each document type, verify required sections exist:

**Screen Inventory**:
- [ ] All 26 screens documented
- [ ] Every screen has route
- [ ] Every screen has roles
- [ ] Every screen has states
- [ ] Every screen has data requirements

**Route Map**:
- [ ] Route tree complete
- [ ] Navigation matrix complete
- [ ] Role-based access defined
- [ ] Authentication boundaries clear

**User Flows**:
- [ ] 5 flows documented
- [ ] Each flow has decision points
- [ ] Each flow has error paths
- [ ] Each flow has data capture

**Feature Specs**:
- [ ] User stories for each feature
- [ ] Acceptance criteria defined
- [ ] Validation rules documented
- [ ] Error handling specified

**Content Specs**:
- [ ] All screens have content
- [ ] Labels consistent
- [ ] Error messages defined
- [ ] Empty states defined

**UI Specs**:
- [ ] Component inventory complete
- [ ] Accessibility requirements per screen
- [ ] UI states per screen
- [ ] Responsive breakpoints defined

### 4. Gap Identification

List all gaps found:

| Gap ID | Document | Description | Severity | Resolution |
|--------|----------|-------------|----------|------------|
| GAP-001 | [Document] | [Description] | HIGH/MEDIUM/LOW | [Who resolves] |
| [Continue...] | | | | |

### 5. Unresolved Decisions

List all [DECISION NEEDED] and [PLACEHOLDER] items:

| Decision ID | Document | Question | Impact | Deadline |
|-------------|----------|----------|--------|----------|
| DEC-001 | [Document] | [Question] | [What's blocked] | [When needed] |
| [Continue...] | | | | |

### 6. Design-Ready Status Per Screen

Final status assessment:

| Screen | Readiness % | Blockers | Ready for Design? |
|--------|-------------|----------|-------------------|
| SCR-AUTH-001 | 100% | None | YES |
| SCR-CR-006 | 80% | Pricing placeholder | YES (with placeholder) |
| [Continue...] | | | |

### 7. Summary

```
OVERALL DESIGN READINESS: [X]%

SCREENS READY: [N] of 26
SCREENS WITH BLOCKERS: [N] of 26
SCREENS NOT READY: [N] of 26

CRITICAL BLOCKERS:
1. [Blocker 1]
2. [Blocker 2]

RECOMMENDATION: [PROCEED / HOLD / PROCEED WITH CAVEATS]
```

## Quality Criteria

1. Every screen must be individually assessed
2. Every cross-reference must be validated
3. All gaps must be catalogued
4. All unresolved decisions must be listed
5. Clear recommendation must be provided

## Gap Handling

When gaps are found:
1. Assign severity (HIGH = blocks design, MEDIUM = needs resolution during design, LOW = can resolve after design)
2. Assign owner for resolution
3. Set deadline
4. Document workaround if available
```

---

### JOB 11: Design Brief Generation

**Agent**: elderly-care-ux-ui-designer

**Prompt**:

```
# TASK: Generate Figma Design Brief

## Objective

Create the final design brief that will be handed to human designers for high-fidelity Figma mockup creation. This document synthesizes all specifications into an actionable design guide.

## Required Inputs

Read and analyze the following files:

1. `/docs/tiers/tier1/draft-design-specs/design-readiness-validation.md` - Validation report from JOB 10
2. `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`
3. `/docs/tiers/tier1/draft-design-specs/route-map.md`
4. `/docs/tiers/tier1/draft-design-specs/components.md`
5. `/docs/tiers/tier1/draft-design-specs/accessibility.md`
6. `/docs/tiers/tier1/draft-design-specs/ui-states.md`
7. `/docs/tiers/tier1/draft-design-specs/responsive.md`
8. `/docs/tiers/tier1/draft-design-specs/content/*.md` - All content specs

## Output File

Write output to: `/docs/tiers/tier1/draft-design-specs/figma-design-brief.md`

## Output Format Requirements

```markdown
# Figma Design Brief: Tier 1 Elderly Care Marketplace

**Document Version**: 1.0
**Created**: [Date]
**Status**: READY FOR DESIGN

---

## 1. Executive Summary

### Project Overview
[Brief description of the platform and design goals]

### Target Users
- **Primary**: Elderly adults (65+) seeking companionship
- **Secondary**: Family members booking on behalf
- **Tertiary**: Independent caregivers

### Design Priorities
1. Accessibility (WCAG 2.1 AA)
2. Simplicity for elderly users
3. Trust and safety communication
4. Mobile-first (tablet primary device)

### Scope
- **Total Screens**: 26 (R0 launch)
- **Estimated Design Time**: 16-24 days
- **Delivery Format**: Figma frames with component library

---

## 2. Design System Requirements

### Color Palette

| Color | Usage | Hex | Contrast Requirement |
|-------|-------|-----|---------------------|
| Primary | Buttons, links | [TBD by designer] | 4.5:1 on white |
| Secondary | Accents, badges | [TBD by designer] | 4.5:1 on white |
| Success | Confirmations | [TBD by designer] | 4.5:1 on white |
| Error | Errors, warnings | [TBD by designer] | 4.5:1 on white |
| Neutral-100 | Background | [TBD by designer] | N/A |
| Neutral-900 | Body text | [TBD by designer] | 4.5:1 on Neutral-100 |

### Typography

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| H1 | [TBD] | 32px desktop / 24px mobile | Bold | 1.2 |
| H2 | [TBD] | 24px desktop / 20px mobile | Semibold | 1.3 |
| Body | [TBD] | 16px (minimum, no smaller) | Regular | 1.5 |
| Caption | [TBD] | 14px (minimum) | Regular | 1.4 |

**Font Requirements**:
- Highly legible at small sizes
- Clear distinction between similar characters (l, I, 1)
- Available in multiple weights
- Good language support (UK English)

### Spacing System

Base unit: 8px

| Token | Value | Usage |
|-------|-------|-------|
| space-xs | 4px | Tight spacing (within components) |
| space-sm | 8px | Default internal spacing |
| space-md | 16px | Between related elements |
| space-lg | 24px | Between sections |
| space-xl | 32px | Major section breaks |
| space-xxl | 48px | Page-level spacing |

### Touch Targets

- **Minimum button height**: 48px
- **Minimum touch target**: 44x44px
- **Minimum spacing between targets**: 8px

---

## 3. Screen-by-Screen Design Requirements

### Priority 1: Authentication & Registration (6 screens)

#### SCR-AUTH-001: Care Receiver Registration
**Route**: `/register/care-receiver`
**Priority**: HIGH (most users start here)

**Layout Requirements**:
- Single column form layout
- Progress indicator (optional, single step)
- Clear CTA button at bottom

**Content Summary**:
- H1: "Create your account"
- Fields: Email, Password, Phone, Postcode, Emergency Contact
- Primary CTA: "Create Account"
- Link: "Already have an account? Log in"

**Components Needed**:
- Text inputs (5)
- Password input with show/hide
- Primary button
- Link text
- Form validation errors

**States to Design**:
- Default (empty form)
- Partially filled
- Validation errors
- Submitting (loading)
- Success (redirect)

**Accessibility Notes**:
- All fields must have visible labels
- Error messages must be associated with fields (aria-describedby)
- Focus must move to first error on validation failure

**Character Limits**:
- Email: 254 chars
- Password: 128 chars
- Phone: 11 chars
- Postcode: 8 chars
- Emergency contact name: 100 chars
- Emergency contact phone: 11 chars

[CONTINUE THIS FORMAT FOR ALL 26 SCREENS...]

---

## 4. Component Library Requirements

### Required Components

List of all components that must be designed:

**Buttons**:
- [ ] Primary button (default, hover, active, disabled, loading)
- [ ] Secondary button (same states)
- [ ] Text button/link
- [ ] Icon button

**Inputs**:
- [ ] Text input (default, focus, error, disabled)
- [ ] Password input with toggle
- [ ] Textarea
- [ ] Select dropdown
- [ ] Checkbox
- [ ] Radio button group
- [ ] Date picker
- [ ] Time picker

**Cards**:
- [ ] Caregiver profile card
- [ ] Booking card
- [ ] Alert card (success, error, warning, info)

**Navigation**:
- [ ] Header (logged out)
- [ ] Header (logged in - care receiver)
- [ ] Header (logged in - caregiver)
- [ ] Header (admin)
- [ ] Mobile menu
- [ ] Footer

**Badges**:
- [ ] DBS Verified badge
- [ ] Identity Verified badge
- [ ] Companionship Only badge
- [ ] Status badges (Pending, Approved, etc.)

**Modals**:
- [ ] Confirmation modal
- [ ] Alert modal
- [ ] Full-screen modal (mobile)

**Other**:
- [ ] Loading spinner
- [ ] Skeleton screens
- [ ] Empty states
- [ ] Avatar/profile photo
- [ ] Star rating display
- [ ] Star rating input

---

## 5. Design Delivery Checklist

### Per Screen Deliverables

For each screen, deliver:
- [ ] Desktop layout (1440px)
- [ ] Tablet layout (768px)
- [ ] Mobile layout (375px)
- [ ] All states (loading, empty, populated, error)
- [ ] Hover states for interactive elements
- [ ] Focus states for keyboard navigation

### Component Library Deliverables

- [ ] Figma component library with variants
- [ ] Color styles
- [ ] Text styles
- [ ] Effect styles (shadows, etc.)
- [ ] Spacing tokens as variables

### Handoff Requirements

- [ ] All frames properly named (SCR-[ID]-[State]-[Breakpoint])
- [ ] Auto-layout used where possible
- [ ] Design tokens as Figma variables
- [ ] Annotations for developer handoff
- [ ] Prototype links for key user flows

---

## 6. Design Constraints

### Must-Have Requirements

1. **Minimum font size**: 16px for body, 14px for captions (accessibility)
2. **Minimum touch target**: 44px (elderly users)
3. **Minimum contrast ratio**: 4.5:1 (WCAG AA)
4. **No hover-only interactions** (touch devices)
5. **Clear focus indicators** (keyboard navigation)
6. **No time limits** on forms (cognitive accessibility)

### Recommended Guidelines

1. **Keep it simple**: Minimal visual complexity
2. **Generous whitespace**: Don't crowd elements
3. **Clear visual hierarchy**: Important elements prominent
4. **Consistent patterns**: Same action = same appearance everywhere
5. **Reassuring tone**: Visual design should feel safe and trustworthy

### Avoid

1. Tiny text or subtle colors
2. Complex gestures or interactions
3. Moving/animated content that can't be paused
4. CAPTCHA or complex verification
5. Dense information layouts
6. Ambiguous icons without labels

---

## 7. Reference Materials

### Input Documents
- Screen Inventory: `/docs/tiers/tier1/draft-design-specs/screen-inventory.md`
- Route Map: `/docs/tiers/tier1/draft-design-specs/route-map.md`
- Component Inventory: `/docs/tiers/tier1/draft-design-specs/components.md`
- Accessibility Requirements: `/docs/tiers/tier1/draft-design-specs/accessibility.md`
- UI States: `/docs/tiers/tier1/draft-design-specs/ui-states.md`
- Responsive Specs: `/docs/tiers/tier1/draft-design-specs/responsive.md`
- Content Specs: `/docs/tiers/tier1/draft-design-specs/content/`

### External References
- WCAG 2.1 AA Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- UK Government Design System: https://design-system.service.gov.uk/
- Nielsen Norman Group - UX for Seniors: https://www.nngroup.com/articles/usability-for-senior-citizens/

---

## 8. Open Items

### Placeholders to Resolve

| Item | Placeholder | Resolution Needed By |
|------|-------------|---------------------|
| Pricing display | "[X]% commission" | Before payment screens designed |
| Insurance requirements | "[TBD per GD-03]" | Before caregiver verification designed |
| SAB contact details | "[Local SAB TBD]" | Before safeguarding screens designed |

### Design Decisions for Designer

| Decision | Options | Recommendation |
|----------|---------|----------------|
| Primary color | Blue, Green, Teal | Teal (calming, trustworthy, accessible) |
| Card shadow | Subtle, None | Subtle (helps elderly users distinguish elements) |
| [Continue...] | | |

---

## 9. Timeline and Prioritization

### Recommended Design Order

| Phase | Screens | Duration | Priority |
|-------|---------|----------|----------|
| 1 | Design System Foundation | 3-5 days | Setup |
| 2 | Auth & Registration (6) | 2-3 days | Critical Path |
| 3 | Caregiver Onboarding (4) | 2-3 days | Critical Path |
| 4 | Discovery & Booking (4) | 3-4 days | Critical Path |
| 5 | Payments (2) | 1-2 days | High |
| 6 | Admin Dashboard (6) | 3-4 days | High |
| 7 | Public Pages (4) | 2-3 days | Medium |

**Total Estimated**: 16-24 days (1 designer)

---

**END OF DESIGN BRIEF**
```

## Quality Criteria

1. Brief must be actionable by a designer who hasn't read other documents
2. Every screen must have clear requirements
3. Component list must be complete
4. Accessibility requirements must be explicit
5. Placeholders must be clearly marked
6. Timeline must be realistic

## Gap Handling

If validation report shows gaps:
1. Document gaps clearly in "Open Items" section
2. Provide workaround or placeholder for design
3. Note when resolution is needed
4. Do not block design brief on minor gaps
```

---

**END OF PART 9: AGENT EXECUTION PROMPTS**

---

**END OF DOCUMENT**
