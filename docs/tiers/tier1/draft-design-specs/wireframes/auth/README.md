# Authentication & Registration Wireframes - Complete Set

**Document Purpose**: Index and overview of all 6 authentication screen wireframes for Tier 1 R0 scope

**Created**: 2026-02-08
**Status**: ✅ COMPLETE - ALL 6 WIREFRAMES READY FOR FIGMA HANDOFF

---

## Overview

This directory contains comprehensive ASCII wireframes and element inventories for all 6 authentication and registration screens in the Tier 1 (Companionship MVP) elderly care marketplace platform.

**Total Screens**: 6 (all R0 launch-critical)
**Quality Standard**: Matches dashboard wireframe depth and format
**Figma Handoff Ready**: Yes - all screens include desktop/mobile layouts, element inventories, accessibility specs, and UI states

---

## Complete Screen List

### 1. SCR-AUTH-001: Care Receiver Registration
**File**: `scr-auth-001-care-receiver-registration.md`
**Route**: `/register/care-receiver`
**Purpose**: Enable care receivers (65+) to create accounts
**Key Features**:
- Personal information capture
- Age verification (65+ or documented care needs)
- Emergency contact capture
- GDPR consent (Terms, Privacy, marketing opt-in)
- → Phone verification (SCR-AUTH-004)

---

### 2. SCR-AUTH-002: Family Member Registration
**File**: `scr-auth-002-family-member-registration.md`
**Route**: `/register/family`
**Purpose**: Enable family members to register on behalf of care receiver (proxy access)
**Key Features**:
- Dual account creation (family member + care receiver)
- Relationship documentation
- Proxy consent attestation
- Emergency contact options (use my details OR different contact)
- → Phone verification (SCR-AUTH-004)

**Critical Difference**: Creates two linked accounts - family member has proxy access to care receiver's bookings/messages

---

### 3. SCR-AUTH-003: Caregiver Registration
**File**: `scr-auth-003-caregiver-registration.md`
**Route**: `/register/caregiver`
**Purpose**: Enable professional caregivers to create accounts to offer companionship services
**Key Features**:
- Simplified form (fewer fields than care receiver registration)
- Self-employed status acknowledgment (legal requirement)
- Commission rate transparency (15% shown upfront)
- "Companionship Services Only" badge
- → Phone verification (SCR-AUTH-004) → Caregiver onboarding (SCR-CG-002)

**Critical Difference**: Self-employed contractor relationship, not employee. No emergency contact or age verification required.

---

### 4. SCR-AUTH-004: Phone Verification
**File**: `scr-auth-004-phone-verification.md`
**Route**: `/verify/phone`
**Purpose**: Verify user phone number via SMS OTP (6-digit code)
**Key Features**:
- 6-digit OTP input (6 separate boxes OR single masked input)
- Countdown timer (10 minutes until code expires)
- Masked phone number (last 4 digits visible: "****1234")
- Rate limiting (max 3 resend requests per hour)
- Failed attempt tracking (max 3 attempts per code)
- → Role-based redirect (dashboard for care receivers, onboarding for caregivers)

**Safeguarding Critical**: Mandatory verification prevents bot/spam accounts and ensures contact reachability for emergencies.

---

### 5. SCR-AUTH-005: Login
**File**: `scr-auth-005-login.md`
**Route**: `/login`
**Purpose**: Authenticate returning users to access their accounts
**Key Features**:
- Email + password authentication
- "Remember me" option (30-day persistent session)
- "Forgot password?" link → SCR-AUTH-006
- Account lockout after 5 failed attempts (10-minute cooldown)
- Generic error messages (security: "Invalid email or password")
- Role-based redirect (dashboard, onboarding, or admin panel)

**Account States Handled**: Active, locked, suspended, banned

---

### 6. SCR-AUTH-006: Password Reset Request
**File**: `scr-auth-006-password-reset.md`
**Route**: `/forgot-password`
**Purpose**: Enable users to reset forgotten passwords via email link
**Key Features**:
- Single email field (request reset link)
- Generic success message (security: always shows "Check your email" even if account doesn't exist)
- Rate limiting (max 3 requests per email per hour)
- Help text for users who can't remember email
- Reset link valid for 1 hour (one-time use)

**Security Design**: Prevents account enumeration attacks. Same success message whether email exists or not.

**Note**: The actual password reset form (from email link) is NOT in R0 scope - handled via email service or future R1 screen.

---

## Wireframe Quality Standards

Each wireframe document includes:

### 1. Complete Element Inventory
- Content blocks with purpose and priority
- All interactive elements with states
- Validation rules with error messages
- Data display elements (static and dynamic)
- Navigation context (entry/exit points)

### 2. ASCII Wireframes
- **Desktop layout** (1440px+)
- **Mobile layout** (320px-767px)
- **Multiple states**: Default, loading, error, success, empty
- Box-drawing characters for visual clarity

### 3. Responsive Behavior
- Breakpoint definitions (mobile, tablet, desktop)
- Layout changes per viewport
- Touch target sizes (minimum 48x48px, 56px for primary actions)

### 4. UI States Documentation
- Loading states (spinner, disabled fields)
- Success states (banners, redirects)
- Error states (inline, banner, server errors)
- Conditional states (rate limits, expired codes, locked accounts)

### 5. Accessibility Requirements (WCAG 2.1 AA)
- **Perceivable**: Text alternatives, distinguishable content, color contrast
- **Operable**: Keyboard accessible, focus order, touch targets
- **Understandable**: Clear labels, predictable behavior, input assistance
- **Robust**: Semantic markup, ARIA attributes, screen reader announcements

### 6. Navigation & Interactions
- Primary user flows (happy path)
- Alternative flows (error recovery, cancellation)
- Interaction patterns (auto-advance, countdown timers, validation timing)

### 7. Compliance & GDPR
- Consent mechanisms (Terms, Privacy, marketing opt-in)
- Proxy consent (family member registration)
- Self-employed status acknowledgment (caregiver registration)
- Data processing transparency

---

## Design Principles Applied

All 6 wireframes follow these elderly-care-specific design principles:

### 1. Simplicity & Clarity
- One-column layouts (no visual clutter)
- Clear section headings
- Plain language labels (no jargon)
- Progressive disclosure (show only necessary fields)

### 2. Accessibility First
- Large input fields (56px height on mobile)
- High contrast colors (4.5:1 minimum)
- Large touch targets (48x48px minimum, 56px for primary CTAs)
- Icons paired with text labels (not icons alone)
- Screen reader support throughout

### 3. Trust-Building
- Transparent consent checkboxes
- Clear explanations (helper text for every field)
- Safeguarding transparency (emergency contacts, phone verification)
- "Companionship Services Only" badges (set expectations)

### 4. Error Prevention
- Inline validation (immediate feedback on blur)
- Real-time indicators (password strength, countdown timers)
- Clear error messages with recovery instructions
- Example formats in placeholders (e.g., "07xxx xxxxxx")

### 5. Cognitive Load Reduction
- One primary action per screen
- Generous white space (24px+ between sections)
- Familiar UI patterns (standard forms, buttons)
- Auto-focus on first field (elderly-friendly)

---

## Component Reuse

### Shared Components (Across All 6 Screens)

**From Dashboard Design System**:
- **Header** (minimal public variant: logo + login/signup link)
- **Footer** (public variant: legal links + copyright)
- **Button** (primary, secondary, disabled states)
- **Input Field** (text, email, password, tel, date types)
- **Checkbox** (with label and helper text)
- **Alert Banner** (info, warning, error, success variants)

**New Auth-Specific Components**:
- **Password Strength Indicator** (real-time validation feedback)
- **OTP Input** (6-box numeric input with auto-advance)
- **Countdown Timer** (real-time updating timer for expiry/cooldown)
- **Radio Button Group** (emergency contact toggle)
- **Info Box** (commission rate, service scope explanations)

---

## Navigation Flow

```
                    SCR-PUB-001 (Homepage)
                            |
              +-------------+-------------+
              |                           |
         (Find Care)              (Become Caregiver)
              |                           |
              v                           v
    SCR-AUTH-001 (CR Reg)        SCR-AUTH-003 (CG Reg)
              |                           |
              +-------------+-------------+
                            |
                            v
                 SCR-AUTH-004 (Phone Verify)
                            |
              +-------------+-------------+
              |                           |
         (Care Receiver)             (Caregiver)
              |                           |
              v                           v
       SCR-CR-001 (Dashboard)    SCR-CG-002 (Onboarding)


              SCR-AUTH-005 (Login) ──────> Role-based redirect
                     |
                     | (Forgot password?)
                     v
              SCR-AUTH-006 (Password Reset)
                     |
                     | (Email link - not R0)
                     v
            [Password Reset Form - Future R1]


         SCR-AUTH-002 (Family Reg) ──────> SCR-AUTH-004 (Phone Verify)
                                                   |
                                                   v
                                          SCR-CR-001 (Dashboard - proxy)
```

---

## Cross-References

### Source Documents

**Route Map**:
- `/docs/product/tier1-route-map.md` - All 6 screen definitions (Section 4.1)

**Screen Inventory**:
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - Detailed specs (lines 52-323)

**User Flows**:
- `/docs/tiers/tier1/draft-design-specs/user-flows/care-receiver-first-booking.md` - Care receiver registration context
- `/docs/tiers/tier1/draft-design-specs/user-flows/caregiver-onboarding.md` - Caregiver registration context

**Compliance**:
- `/docs/tiers/tier1/compliance.md` - GDPR consent requirements, proxy consent, self-employed status

**Dashboard Wireframes** (format reference):
- `/docs/tiers/tier1/draft-design-specs/wireframes/dashboards/cr-dashboard-scr-cr-001.md`
- `/docs/tiers/tier1/draft-design-specs/wireframes/dashboards/cg-dashboard-scr-cg-001.md`
- `/docs/tiers/tier1/draft-design-specs/wireframes/dashboards/adm-dashboard-scr-adm-001.md`

**Design System**:
- `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md` - Reusable components
- `/packages/ICare/app/styles/_tokens.scss` - Design tokens (264 lines)

---

## Figma Handoff Checklist

**For Figma Designer - All 6 Screens**:

- [x] **Desktop wireframes** (1440px+) provided with ASCII mockups
- [x] **Mobile wireframes** (320px-767px) provided with responsive layouts
- [x] **Element inventories** complete (every UI element documented)
- [x] **Validation rules** specified (client-side and server-side)
- [x] **Error states** defined (inline, banner, server errors)
- [x] **Success states** defined (banners, redirects)
- [x] **Loading states** defined (spinners, disabled fields)
- [x] **Accessibility specs** complete (WCAG 2.1 AA compliance notes)
- [x] **Focus order** documented (tab order for keyboard navigation)
- [x] **Screen reader announcements** specified
- [x] **Touch target sizes** defined (56px height minimum on mobile)
- [x] **Component reuse** identified (shared components from dashboard design system)
- [x] **Navigation flows** mapped (entry/exit points per screen)
- [x] **Compliance notes** documented (GDPR consent, proxy consent, self-employed status)

**Ready for**:
1. Low-fidelity Figma mockups (grayscale, structure focus)
2. High-fidelity Figma mockups (brand colors, typography, imagery)
3. Interactive prototype (clickable flows for user testing)
4. Engineering handoff (component specifications, API contracts)

---

## Key Design Decisions

### 1. Registration Segmentation
**Decision**: Separate registration flows for care receivers, family members, and caregivers
**Rationale**:
- Different data requirements (e.g., caregivers need self-employed attestation, care receivers need emergency contacts)
- Clear user journey (users know which registration type they need)
- Compliance (proxy consent for family members, self-employed status for caregivers)

### 2. Phone Verification Mandatory
**Decision**: All users must verify phone number via SMS OTP before accessing account
**Rationale**:
- Safeguarding (prevents bot/spam accounts)
- Emergency contact reachability (critical for vulnerable adults)
- UK mobile number validation (required for SMS notifications)

### 3. Generic Password Reset Success Message
**Decision**: Always show "Check your email" message, even if email doesn't exist in database
**Rationale**:
- Security (prevents account enumeration attacks)
- Consistent user experience (no user confusion about why email wasn't sent)
- Industry best practice for password reset flows

### 4. Self-Employed Status Checkbox
**Decision**: Mandatory checkbox for caregivers acknowledging self-employed status
**Rationale**:
- Legal requirement (platform is introduction agency, not employer)
- IR35 compliance (caregivers are contractors, not employees)
- Audit trail (stored timestamp + IP address for employment status disputes)

### 5. Proxy Consent Attestation
**Decision**: Family members must check box confirming care receiver's consent to proxy access
**Rationale**:
- Safeguarding (ensures care receiver is aware of proxy arrangement)
- Audit trail (stored for disputes)
- Mental capacity consideration (assumes care receiver has capacity to consent; LPA not required at registration)

### 6. Commission Rate Transparency
**Decision**: Show 15% commission rate during caregiver registration
**Rationale**:
- GDPR transparency requirement (fees disclosed upfront)
- Trust-building (no hidden fees)
- Expectation setting (caregiver knows platform costs before completing onboarding)

---

## Next Steps (Post-Wireframe Phase)

### Immediate (Week 1)
1. **Product team review**: Approve wireframes, resolve any gaps or questions
2. **Figma designer review**: Understand wireframe structure, ask clarifying questions
3. **Engineering review**: Validate technical feasibility of interaction patterns (OTP input, countdown timers, etc.)

### Short-term (Week 2-3)
4. **Figma low-fidelity mockups**: Create grayscale mockups for all 6 screens
5. **User testing**: Test low-fidelity flows with elderly users (validate simplicity, clarity)
6. **Iteration**: Refine wireframes based on user feedback

### Medium-term (Week 4-6)
7. **Figma high-fidelity mockups**: Apply brand colors, typography, imagery
8. **Design system integration**: Ensure auth screens use same components as dashboards
9. **Interactive prototype**: Clickable prototype for stakeholder review
10. **Engineering handoff**: Component specifications, API contracts, accessibility requirements

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-08 | UX Designer | Initial wireframe set complete (all 6 screens) |

---

**END OF DOCUMENT**

**Status**: ✅ ALL 6 AUTHENTICATION WIREFRAMES COMPLETE AND READY FOR FIGMA HANDOFF

**Total Pages**: 6 wireframe documents + 1 README (this file)
**Total Word Count**: ~35,000 words across all documents
**Quality Bar**: Matches dashboard wireframe depth and format
**Accessibility**: WCAG 2.1 AA compliant throughout
**Figma Readiness**: 100% - All screens have desktop/mobile layouts, element inventories, and UI states
