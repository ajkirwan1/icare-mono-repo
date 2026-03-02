# System Settings Wireframe (SCR-ADM-028)

**Document Purpose**: Complete wireframe specification and element inventory for the Admin System Settings screen, enabling super admins to configure platform-wide settings including commission rates, verification requirements, notification templates, and feature flags.

**Screen ID**: SCR-ADM-028
**Screen Name**: System Settings
**Route**: `/admin/settings`
**User Roles**: Admin (Super Admin only)
**R0/R1**: R0 (launch-critical configuration interface)

**Document Owner**: UX/UI Design Team
**Created**: 2026-02-11
**Status**: READY FOR FIGMA HANDOFF

---

## Table of Contents

1. [Screen Purpose](#1-screen-purpose)
2. [Entry Points and Navigation](#2-entry-points-and-navigation)
3. [Content Blocks and Hierarchy](#3-content-blocks-and-hierarchy)
4. [Complete Element Inventory](#4-complete-element-inventory)
5. [ASCII Wireframes](#5-ascii-wireframes)
6. [State Coverage](#6-state-coverage)
7. [Responsive Design Notes](#7-responsive-design-notes)
8. [Accessibility Requirements](#8-accessibility-requirements)
9. [Component Reuse](#9-component-reuse)
10. [Design Notes for Figma](#10-design-notes-for-figma)

---

## 1. Screen Purpose

### 1.1 Primary Purpose

The System Settings screen provides super admins with a centralized interface to:
- Configure platform-wide business rules (commission rates, service fees)
- Manage verification requirements and auto-approval rules
- Customize notification templates and frequency settings
- Control feature flags for gradual rollout or emergency disabling
- Audit configuration changes (who changed what, when)

### 1.2 Key User Tasks

**Primary Tasks**:
1. Update commission rate for caregiver earnings (15% placeholder)
2. Update service fee charged to care receivers (15% placeholder)
3. Configure required verification documents (ID, DBS, Right to Work)
4. Set verification expiry periods (e.g., DBS expires after 3 years)
5. Enable/disable platform features (messaging, reviews, booking)
6. Edit notification email templates
7. Set payment provider credentials (Stripe API keys - masked)
8. Configure payout schedule (weekly, bi-weekly, monthly)

**Context of Use**:
- Super admin performs initial platform configuration before R0 launch
- Super admin adjusts commission rates based on business performance
- Super admin disables features during maintenance or incidents
- Super admin updates verification requirements based on compliance changes
- Operations manager reviews current settings (read-only access)

### 1.3 Critical Business Context

**IMPORTANT - Commission Rate Placeholder**:
- Current placeholder: **15% caregiver commission + 15% care receiver service fee**
- This is NOT the final rate (FDR-008 decision pending from founder)
- Settings interface must support easy rate changes
- Historical rate changes must be audited and logged

**Security Considerations**:
- Changing commission rates affects all future bookings (not retroactive)
- Feature flag changes take effect immediately (can disable booking system)
- Stripe credentials must be encrypted at rest and masked in UI
- Only super admin role can modify settings (operations managers read-only)

### 1.4 Relationship to Other Admin Screens

**Within Admin Section**:
- **SCR-ADM-001** (Admin Dashboard): Links to this screen via "Settings" in user menu or sidebar
- **SCR-ADM-015** (Platform Analytics): Displays effects of commission rate changes on revenue
- **SCR-ADM-007/008** (Verification Review): Uses verification requirements defined here

**Navigation Pattern**: Admin Dashboard → User Menu → System Settings

---

## 2. Entry Points and Navigation

### 2.1 Entry Points

**How admins arrive at this screen**:
- From Admin Dashboard (SCR-ADM-001): Click "System Settings" in admin user menu dropdown
- From Admin Navigation: Click "Settings" in global admin sidebar (super admin only)
- Direct URL navigation: `/admin/settings` (requires super admin role)
- From Platform Analytics (SCR-ADM-015): Click "View Commission Settings" link in revenue widget

**Preconditions**:
- User authenticated as Admin role with super_admin permission
- 2FA enabled (mandatory for admin accounts)
- Super admin flag verified (operations managers see "Access Denied" error)

### 2.2 Navigation Exits

**From This Screen**:

| Element | Destination | Screen ID |
|---------|------------|-----------|
| Admin Dashboard link (breadcrumb) | Admin Dashboard | SCR-ADM-001 |
| "Discard Changes" button | Returns to previous page | Previous screen or SCR-ADM-001 |
| "Save Changes" button (success) | Remains on settings page with success toast | SCR-ADM-028 (refresh) |
| Verification Review link (sidebar) | Verification Queue | SCR-ADM-007 |
| Analytics link (sidebar) | Platform Analytics | SCR-ADM-015 (future) |
| Logout (user menu) | Login | SCR-AUTH-005 |

**Global Admin Navigation** (sidebar):
- Dashboard (SCR-ADM-001)
- Users (SCR-ADM-025)
- Verifications (SCR-ADM-026)
- Safeguarding (SCR-ADM-014)
- Settings (this screen, SCR-ADM-028 - super admin only)
- Audit Log (future)

---

## 3. Content Blocks and Hierarchy

### 3.1 Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ TOP: Admin Navigation Header (super admin variant)             │
├─────────────────────────────────────────────────────────────────┤
│ BREADCRUMB: Dashboard > System Settings                         │
├─────────────────────────────────────────────────────────────────┤
│ PAGE TITLE: System Settings                                     │
│ SUBTITLE: Configure platform-wide settings and business rules   │
├─────────────────────────────────────────────────────────────────┤
│ TWO-COLUMN LAYOUT:                                              │
│ ┌──────────────────────┬────────────────────────────────────┐  │
│ │ LEFT: Settings Nav   │ RIGHT: Settings Content Section    │  │
│ │ (Category sidebar)   │ (Form fields for selected category)│  │
│ │                      │                                    │  │
│ │ - General            │ [Section-specific form fields]     │  │
│ │ - Payments           │                                    │  │
│ │ - Verification       │ [Save/Discard buttons at bottom]   │  │
│ │ - Notifications      │                                    │  │
│ │ - Features           │ [Change Audit Log]                 │  │
│ └──────────────────────┴────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER: Standard global footer                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Content Block Breakdown

**Block 1: Admin Navigation Header** (shared component)
- **Purpose**: Global admin navigation with super admin context
- **Priority**: PRIMARY (always visible)
- **Elements**: Logo, global search, notifications bell, super admin user menu
- **Component Reference**: `NAV-HEADER-AUTH` with `role: "admin"`, `user.role_badge: "Super Admin"`

**Block 2: Breadcrumb Navigation**
- **Purpose**: Show navigation path, allow quick return to Dashboard
- **Priority**: SECONDARY (context)
- **Elements**: "Dashboard" link > "System Settings" (current page)

**Block 3: Page Title & Subtitle**
- **Purpose**: Clearly identify screen purpose and scope
- **Priority**: PRIMARY
- **Elements**:
  - H1: "System Settings"
  - Subtitle: "Configure platform-wide settings and business rules"
  - Warning badge: "SUPER ADMIN ONLY" (orange badge)

**Block 4: Settings Category Sidebar** (left column)
- **Purpose**: Navigate between settings categories
- **Priority**: PRIMARY (navigation)
- **Elements**: Vertical navigation menu with 5 categories
  - General (platform name, support email, maintenance mode)
  - Payments (commission, service fee, Stripe config, payout schedule)
  - Verification (required docs, expiry periods, auto-approval rules)
  - Notifications (email templates, frequency settings)
  - Features (feature flags/toggles)
- **Behavior**: Active category highlighted, smooth scroll to section on mobile

**Block 5: Settings Content Section** (right column)
- **Purpose**: Display and edit settings for selected category
- **Priority**: PRIMARY (core content)
- **Elements**: Form fields, input groups, toggle switches, save/discard buttons
- **Variants**: Different form fields per category (see section 4)

**Block 6: Change Audit Log** (bottom of content section)
- **Purpose**: Track who changed settings and when (compliance audit trail)
- **Priority**: SECONDARY (transparency)
- **Elements**: Table with columns: Date/Time, Admin User, Category, Field Changed, Old Value, New Value
- **Display**: Last 20 changes, "View Full Audit Log" link

**Block 7: Unsaved Changes Warning** (modal overlay)
- **Purpose**: Prevent accidental loss of unsaved changes
- **Priority**: PRIMARY (error prevention)
- **Elements**: Modal dialog "You have unsaved changes. Discard or Save?" with buttons

**Block 8: Footer**
- **Purpose**: Legal links and support contact
- **Priority**: TERTIARY
- **Elements**: About | Privacy | Terms | Support | Version

---

## 4. Complete Element Inventory

### 4.1 Block 1: Admin Navigation Header

**Component Reference**: See Admin Dashboard (SCR-ADM-001) for full specification.

**Super Admin Variant**:
- Logo: iCare logo (link to /admin)
- Search Bar: Global search for users, bookings, verifications
- Notifications Bell: Unread count badge
- Admin User Menu: Avatar, name, **role badge: "Super Admin"** (orange), dropdown (Settings [this screen], Logout)

---

### 4.2 Block 2: Breadcrumb Navigation

**Elements**:
- **Link 1**: "Dashboard" (link to /admin)
- **Separator**: ">" (non-interactive)
- **Current Page**: "System Settings" (plain text, not a link)

**Accessibility**:
- `<nav aria-label="Breadcrumb">`
- `<ol>` list structure
- Current page has `aria-current="page"`

**Design Tokens**:
- Typography: 14px regular
- Color: Links (#2563EB blue), Current page (#6B7280 gray)
- Spacing: 8px horizontal padding between items

---

### 4.3 Block 3: Page Title & Subtitle

**Elements**:
- **H1 Title**: "System Settings"
  - Typography: 32px bold
  - Color: `$txt` (#0F172A)
- **Subtitle**: "Configure platform-wide settings and business rules"
  - Typography: 16px regular
  - Color: `$txt-muted` (rgba(15,23,42,0.72))
- **Warning Badge**: "SUPER ADMIN ONLY"
  - Background: Orange (#F59E0B)
  - Text: White (#FFFFFF)
  - Border radius: 4px
  - Padding: 4px 8px
  - Typography: 12px bold uppercase

**Spacing**:
- Title: 16px margin-bottom
- Subtitle: 8px margin-bottom
- Badge: Inline after title, 8px margin-left

---

### 4.4 Block 4: Settings Category Sidebar

**Layout**: Sticky sidebar, fixed width 240px (desktop), full-width (mobile)

**Elements**:

**Category Navigation Menu** (vertical):
1. **General**
   - Icon: Gear icon (left)
   - Label: "General"
   - Active state: Blue background (#EFF6FF), bold text
   - Badge: None

2. **Payments**
   - Icon: Credit card icon (left)
   - Label: "Payments"
   - Active state: Blue background, bold text
   - Badge: "Updated 2d ago" (gray text, 12px)

3. **Verification**
   - Icon: Shield check icon (left)
   - Label: "Verification"
   - Active state: Blue background, bold text
   - Badge: None

4. **Notifications**
   - Icon: Bell icon (left)
   - Label: "Notifications"
   - Active state: Blue background, bold text
   - Badge: None

5. **Features**
   - Icon: Toggle icon (left)
   - Label: "Features"
   - Active state: Blue background, bold text
   - Badge: "2 disabled" (yellow badge)

**Behavior**:
- Click category: Load corresponding settings form in right column
- Active category persists until another is clicked
- Unsaved changes warning: If user clicks different category with unsaved changes, show modal

**Accessibility**:
- `<nav aria-label="Settings Categories">`
- `<ul>` list structure
- Active category: `aria-current="page"`
- Keyboard navigation: Arrow keys to move between categories, Enter to select

**Design Tokens**:
- Background: `$bg-subtle` (#F8FAFC)
- Border right: `$border-soft` (rgba(0,0,0,0.06))
- Item padding: 12px 16px
- Active background: `$primary-soft` (#EFF6FF)
- Active text: `$primary` (#2563EB)

---

### 4.5 Block 5: Settings Content Section - General

**Category**: General Settings

**Elements**:

**Section Header**:
- H2: "General Settings"
- Subtitle: "Basic platform configuration"

**Form Fields**:

**1. Platform Name**:
- Label: "Platform Name"
- Input type: Text
- Current value: "iCare"
- Help text: "Displayed in browser title, emails, and navigation header"
- Character limit: 50 characters
- Validation: Required, alphanumeric + spaces only

**2. Support Email**:
- Label: "Support Email Address"
- Input type: Email
- Current value: "support@icare-platform.co.uk"
- Help text: "Displayed in footer and notification emails"
- Validation: Required, valid email format

**3. Support Phone**:
- Label: "Support Phone Number"
- Input type: Tel
- Current value: "+44 20 1234 5678"
- Help text: "Displayed in footer for urgent user inquiries"
- Validation: Required, UK phone format

**4. Maintenance Mode**:
- Label: "Maintenance Mode"
- Input type: Toggle switch
- Current value: OFF
- Help text: "Disable all user-facing features and display maintenance banner. Admin functions remain active."
- Warning: "CAUTION: Enabling this will prevent all user bookings and logins"
- Confirmation required: If toggled ON, show modal "Are you sure? This will immediately disable the platform for all users."

**5. Maintenance Banner Message**:
- Label: "Maintenance Banner Message"
- Input type: Textarea
- Current value: "We're performing scheduled maintenance. The platform will be back online shortly."
- Help text: "Displayed to users when maintenance mode is enabled"
- Character limit: 200 characters
- Conditional: Only visible if Maintenance Mode is ON

**Action Buttons** (bottom of section):
- **Save General Settings** (primary button, enabled only if changes detected)
- **Discard Changes** (secondary button, enabled only if changes detected)

---

### 4.6 Block 5: Settings Content Section - Payments

**Category**: Payments Settings

**Elements**:

**Section Header**:
- H2: "Payments Settings"
- Subtitle: "Configure commission rates, service fees, and payment provider"

**Alert Banner** (top of section):
- Type: Warning (yellow background)
- Icon: Info circle
- Message: "Commission rate changes affect all FUTURE bookings only. Existing bookings retain their original rate."

**Form Fields**:

**Commission Rate Section**:

**1. Caregiver Commission Rate**:
- Label: "Caregiver Commission (%)"
- Input type: Number (decimal, 2 places)
- Current value: "15.00"
- Help text: "Percentage deducted from caregiver earnings (e.g., 15% means caregiver receives 85% of booking total)"
- Validation: Required, 0-50% range (max 50% safeguard)
- Min: 0, Max: 50, Step: 0.25
- Warning badge: "PLACEHOLDER - FDR-008 PENDING" (orange)

**2. Care Receiver Service Fee**:
- Label: "Care Receiver Service Fee (%)"
- Input type: Number (decimal, 2 places)
- Current value: "15.00"
- Help text: "Percentage added to booking total charged to care receiver (e.g., 15% means care receiver pays 115% of caregiver rate)"
- Validation: Required, 0-25% range
- Min: 0, Max: 25, Step: 0.25
- Warning badge: "PLACEHOLDER - FDR-008 PENDING" (orange)

**3. Combined Platform Revenue**:
- Label: "Total Platform Revenue per Booking"
- Display: Read-only calculation
- Current value: "30.00%" (15% commission + 15% service fee)
- Format: Bold text, larger font (20px)
- Help text: "This is the effective take rate on each booking"

**Example Calculation** (info box):
```
Example Booking Calculation:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Caregiver hourly rate: £20.00
Booking duration: 3 hours
Booking subtotal: £60.00

Care Receiver service fee (15%): +£9.00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Charged to Care Receiver: £63.00

Caregiver Commission (15%): -£9.00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Caregiver Earnings (Payout): £51.00

Platform Revenue: £12.00 (20% effective rate)
```

**Payment Provider Section**:

**4. Payment Provider**:
- Label: "Payment Provider"
- Input type: Dropdown (read-only in R0)
- Current value: "Stripe"
- Options: Stripe (only option for R0)
- Help text: "Payment processing provider (R0 supports Stripe only)"

**5. Stripe Publishable Key**:
- Label: "Stripe Publishable Key"
- Input type: Text (masked)
- Current value: "pk_live_••••••••••••••••••••5678"
- Help text: "Public key for Stripe client-side integration"
- Validation: Must start with "pk_live_" or "pk_test_"
- Button: "Reveal" (shows full key), "Copy" (copies to clipboard)

**6. Stripe Secret Key**:
- Label: "Stripe Secret Key"
- Input type: Password (fully masked)
- Current value: "sk_live_••••••••••••••••••••••••••••••••"
- Help text: "Secret key for Stripe server-side API calls (stored encrypted)"
- Validation: Must start with "sk_live_" or "sk_test_"
- Button: "Reveal" (requires 2FA re-authentication), "Test Connection" (validates key)
- Security warning: "Never share this key. Stored encrypted in database."

**7. Stripe Webhook Secret**:
- Label: "Stripe Webhook Secret"
- Input type: Password (fully masked)
- Current value: "whsec_••••••••••••••••••••••••••"
- Help text: "Webhook signing secret for verifying Stripe event authenticity"
- Validation: Must start with "whsec_"
- Button: "Reveal" (requires 2FA), "Copy" (copies to clipboard)

**Payout Schedule Section**:

**8. Caregiver Payout Frequency**:
- Label: "Caregiver Payout Schedule"
- Input type: Dropdown
- Current value: "Weekly"
- Options: Daily (R1+), Weekly, Bi-weekly, Monthly
- Help text: "How often caregivers receive payouts for completed bookings"
- Warning: "Changing this affects payout timing for all caregivers"

**9. Payout Day of Week** (conditional - only if "Weekly" selected):
- Label: "Payout Day"
- Input type: Dropdown
- Current value: "Friday"
- Options: Monday, Tuesday, Wednesday, Thursday, Friday
- Help text: "Payouts processed on this day each week (3-5pm)"

**Action Buttons** (bottom of section):
- **Save Payment Settings** (primary button, enabled only if changes detected)
- **Discard Changes** (secondary button, enabled only if changes detected)

**Security Confirmation Modal** (if Stripe keys changed):
- Title: "Confirm Payment Provider Changes"
- Message: "Changing payment provider credentials will affect all future transactions. This change will be audited and logged. Enter your password to confirm."
- Input: Password field
- Buttons: "Confirm Changes" (primary), "Cancel" (secondary)

---

### 4.7 Block 5: Settings Content Section - Verification

**Category**: Verification Settings

**Elements**:

**Section Header**:
- H2: "Verification Requirements"
- Subtitle: "Configure required documents and verification rules for caregivers"

**Form Fields**:

**Required Documents Checklist**:

**1. Identity Verification Required**:
- Label: "Identity Verification (Photo ID)"
- Input type: Toggle switch
- Current value: ON (mandatory, cannot be disabled in R0)
- Help text: "Caregivers must upload government-issued photo ID (passport, driver's license)"
- Disabled in R0: Toggle is read-only, displays "Required by CQC regulations"

**2. Right to Work Verification Required**:
- Label: "Right to Work Verification"
- Input type: Toggle switch
- Current value: ON (mandatory, cannot be disabled in R0)
- Help text: "Caregivers must prove legal right to work in UK (passport, work visa, share code)"
- Disabled in R0: Toggle is read-only, displays "Required by UK employment law"

**3. DBS Check Required**:
- Label: "DBS Check (Voluntary)"
- Input type: Toggle switch
- Current value: ON (recommended, can be disabled)
- Help text: "Caregivers can voluntarily upload DBS certificate (not mandatory for companionship services)"
- Warning: "Disabling this reduces safeguarding protections. Care receivers value DBS-checked caregivers."

**Verification Expiry Periods**:

**4. Identity Document Expiry**:
- Label: "Identity Document Validity Period"
- Input type: Number + dropdown
- Current value: "5 years"
- Options: 1 year, 2 years, 3 years, 5 years, Never expires
- Help text: "How long identity verification remains valid before re-verification required"
- Validation: Required

**5. Right to Work Expiry**:
- Label: "Right to Work Validity Period"
- Input type: Number + dropdown
- Current value: "1 year"
- Options: 6 months, 1 year, 2 years, Never expires
- Help text: "How long right to work verification remains valid (recommend 1 year for visa holders)"
- Validation: Required

**6. DBS Expiry**:
- Label: "DBS Certificate Validity Period"
- Input type: Number + dropdown
- Current value: "3 years"
- Options: 1 year, 2 years, 3 years, 5 years
- Help text: "How long DBS certificate remains valid (UK government recommends 3 years)"
- Validation: Required

**Auto-Approval Rules** (future R1+ feature):

**7. Auto-Approve Simple Cases**:
- Label: "Automatic Approval for Low-Risk Applications"
- Input type: Toggle switch
- Current value: OFF (R0 - all applications require manual admin review)
- Help text: "Automatically approve caregiver applications if identity + right to work pass automated checks (future feature)"
- Disabled in R0: Greyed out with label "R1 Feature - Coming Soon"

**Action Buttons** (bottom of section):
- **Save Verification Settings** (primary button, enabled only if changes detected)
- **Discard Changes** (secondary button, enabled only if changes detected)

---

### 4.8 Block 5: Settings Content Section - Notifications

**Category**: Notification Settings

**Elements**:

**Section Header**:
- H2: "Notification Settings"
- Subtitle: "Configure email templates and notification frequency"

**Form Fields**:

**Email Template Management**:

**1. Welcome Email (Care Receiver)**:
- Label: "Care Receiver Welcome Email"
- Input type: Textarea (rich text editor)
- Current value: Default welcome email template
- Help text: "Sent when care receiver completes registration"
- Variables available: `{{user_name}}`, `{{platform_name}}`, `{{support_email}}`
- Button: "Preview Email" (opens modal with sample rendering)
- Button: "Reset to Default" (restores original template)

**2. Welcome Email (Caregiver)**:
- Label: "Caregiver Welcome Email"
- Input type: Textarea (rich text editor)
- Current value: Default caregiver welcome template
- Help text: "Sent when caregiver completes registration"
- Variables available: `{{user_name}}`, `{{verification_status}}`, `{{onboarding_link}}`

**3. Booking Request Notification (Caregiver)**:
- Label: "New Booking Request Notification"
- Input type: Textarea (rich text editor)
- Current value: Default booking notification template
- Help text: "Sent when care receiver sends booking request to caregiver"
- Variables available: `{{caregiver_name}}`, `{{care_receiver_name}}`, `{{booking_date}}`, `{{booking_duration}}`, `{{countdown_timer}}`, `{{booking_link}}`

**4. Booking Confirmation Email (Care Receiver)**:
- Label: "Booking Confirmation Email"
- Input type: Textarea (rich text editor)
- Current value: Default confirmation template
- Help text: "Sent when caregiver accepts booking request"
- Variables available: `{{care_receiver_name}}`, `{{caregiver_name}}`, `{{booking_date}}`, `{{booking_time}}`, `{{total_cost}}`, `{{booking_link}}`

**Notification Frequency Settings**:

**5. Digest Email Frequency**:
- Label: "Activity Digest Email Frequency"
- Input type: Dropdown
- Current value: "Daily"
- Options: Off, Daily, Weekly
- Help text: "How often users receive summary emails of platform activity (bookings, messages)"

**6. Reminder Email Timing**:
- Label: "Booking Reminder Email Timing"
- Input type: Number + dropdown
- Current value: "24 hours before"
- Options: 1 hour before, 3 hours before, 24 hours before, 48 hours before
- Help text: "When to send reminder email before booking start time"

**7. SLA Breach Notifications**:
- Label: "Admin SLA Breach Alerts"
- Input type: Toggle switch
- Current value: ON
- Help text: "Send email to admins when verification queue exceeds 48-hour SLA"
- Email recipients: admins@icare-platform.co.uk (configurable in future)

**Action Buttons** (bottom of section):
- **Save Notification Settings** (primary button, enabled only if changes detected)
- **Discard Changes** (secondary button, enabled only if changes detected)

---

### 4.9 Block 5: Settings Content Section - Features

**Category**: Feature Flags

**Elements**:

**Section Header**:
- H2: "Feature Flags"
- Subtitle: "Enable or disable platform features (takes effect immediately)"

**Alert Banner** (top of section):
- Type: Warning (yellow background)
- Icon: Warning triangle
- Message: "Feature flag changes take effect IMMEDIATELY for all users. Disabling core features may disrupt active bookings."

**Form Fields**:

**Core Platform Features**:

**1. Booking System Enabled**:
- Label: "Booking System"
- Input type: Toggle switch
- Current value: ON
- Help text: "Allow users to create, accept, and manage bookings"
- Warning: "CRITICAL: Disabling this prevents all booking activity"
- Confirmation required: If toggled OFF, show modal "Are you sure? This will immediately disable booking creation for all users."

**2. Messaging System Enabled**:
- Label: "Messaging System"
- Input type: Toggle switch
- Current value: ON
- Help text: "Allow booking-related messages between care receivers and caregivers"
- Warning: "Disabling prevents users from communicating about bookings"

**3. Reviews System Enabled**:
- Label: "Reviews & Ratings"
- Input type: Toggle switch
- Current value: ON
- Help text: "Allow care receivers to leave reviews after completed bookings"
- Warning: "Disabling prevents new reviews (existing reviews remain visible)"

**4. Search & Discovery Enabled**:
- Label: "Caregiver Search"
- Input type: Toggle switch
- Current value: ON
- Help text: "Allow care receivers to search for caregivers by postcode"
- Warning: "Disabling prevents care receivers from finding new caregivers"

**5. New Registrations Enabled**:
- Label: "New User Registrations"
- Input type: Toggle switch
- Current value: ON
- Help text: "Allow new users to create accounts (care receivers and caregivers)"
- Use case: "Disable temporarily during capacity constraints or incidents"

**Safeguarding Features** (cannot be disabled):

**6. Safeguarding Reporting Enabled**:
- Label: "Safeguarding Reporting"
- Input type: Toggle switch (read-only, always ON)
- Current value: ON (mandatory, cannot be disabled)
- Help text: "Safeguarding reporting is always enabled for legal compliance (Care Act 2014)"
- Disabled: Toggle is greyed out with lock icon

**7. Verification System Enabled**:
- Label: "Caregiver Verification System"
- Input type: Toggle switch (read-only, always ON)
- Current value: ON (mandatory, cannot be disabled)
- Help text: "Caregiver verification is always enabled for safeguarding compliance"
- Disabled: Toggle is greyed out with lock icon

**Action Buttons** (bottom of section):
- **Save Feature Flags** (primary button, enabled only if changes detected)
- **Discard Changes** (secondary button, enabled only if changes detected)

**Confirmation Modal** (if disabling critical features):
- Title: "Confirm Feature Disable"
- Message: "You are about to disable [Feature Name]. This will immediately affect all users. Enter your password to confirm."
- Input: Password field
- Buttons: "Confirm Disable" (primary, red), "Cancel" (secondary)

---

### 4.10 Block 6: Change Audit Log

**Purpose**: Track all settings changes for compliance and debugging

**Elements**:

**Section Header**:
- H3: "Recent Changes"
- Subtitle: "Last 20 settings modifications"

**Table**:
- **Columns**:
  1. Date/Time (e.g., "11 Feb 2026, 14:32")
  2. Admin User (e.g., "Sarah Johnson (Super Admin)")
  3. Category (e.g., "Payments")
  4. Field Changed (e.g., "Caregiver Commission Rate")
  5. Old Value (e.g., "15.00%")
  6. New Value (e.g., "12.00%")
- **Rows**: 20 most recent changes
- **Sorting**: Newest first (descending by date)
- **Styling**: Alternating row colors for readability

**Sample Data**:
```
Date/Time          | Admin User            | Category      | Field Changed           | Old Value | New Value
───────────────────|──────────────────────|───────────────|─────────────────────────|───────────|──────────
11 Feb 2026, 14:32 | Sarah (Super Admin)   | Payments      | Caregiver Commission    | 15.00%    | 12.00%
10 Feb 2026, 09:15 | Mike (Super Admin)    | Features      | Messaging System        | ON        | OFF
09 Feb 2026, 16:45 | Sarah (Super Admin)   | Verification  | DBS Expiry Period       | 5 years   | 3 years
08 Feb 2026, 11:22 | Mike (Super Admin)    | General       | Maintenance Mode        | OFF       | ON
07 Feb 2026, 08:30 | Sarah (Super Admin)   | Payments      | Service Fee             | 15.00%    | 17.00%
```

**Action Link**:
- **"View Full Audit Log"** (link to future screen: SCR-ADM-023 Audit Log)
- Label: "View Full Audit Log →"
- Destination: Future R1 screen showing complete audit history with filters

**Accessibility**:
- Table: `<table>` with `<caption>Recent Settings Changes</caption>`
- Headers: `<th scope="col">` for each column
- Responsive: Horizontal scroll on mobile (table width >viewport)

---

### 4.11 Block 7: Unsaved Changes Warning Modal

**Trigger**: User attempts to navigate away (click different category, breadcrumb, or browser back) with unsaved changes

**Elements**:

**Modal Overlay**:
- Semi-transparent black background (rgba(0,0,0,0.5))
- Modal dialog centered on screen

**Modal Content**:
- **Icon**: Warning triangle (orange)
- **Title**: "Unsaved Changes"
- **Message**: "You have unsaved changes to [Category Name] settings. What would you like to do?"
- **Button 1**: "Discard Changes" (secondary, gray)
  - Action: Close modal, discard changes, navigate away
- **Button 2**: "Save Changes" (primary, blue)
  - Action: Save settings, close modal, navigate to selected destination
- **Button 3**: "Cancel" (secondary, white)
  - Action: Close modal, stay on current page

**Keyboard Behavior**:
- Escape key: Same as "Cancel" button
- Enter key: Same as "Save Changes" button (default action)

**Accessibility**:
- Focus trap: Keyboard focus cannot leave modal until dismissed
- ARIA: `role="alertdialog"`, `aria-labelledby="modal-title"`, `aria-describedby="modal-message"`
- Focus management: Focus moves to "Save Changes" button on modal open

---

## 5. ASCII Wireframes

### 5.1 Desktop Layout (1440px) - General Settings Category

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ [iCare Logo]         [Search: users, bookings...]  [🔔 3]  [SA ▾ Sarah (Super Admin)]│
├──────────────────────────────────────────────────────────────────────────────────────┤
│ Dashboard > System Settings                                                           │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  System Settings  [SUPER ADMIN ONLY]                                                 │
│  Configure platform-wide settings and business rules                                 │
│                                                                                       │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  ┌──────────────────┬───────────────────────────────────────────────────────────┐   │
│  │ SETTINGS NAV     │ GENERAL SETTINGS                                           │   │
│  │                  │ Basic platform configuration                               │   │
│  │ [⚙] General      │                                                            │   │
│  │     (active)     │ Platform Name                                              │   │
│  │                  │ [iCare                                             ]       │   │
│  │ [$] Payments     │ Displayed in browser title, emails, and navigation header  │   │
│  │     Updated 2d   │                                                            │   │
│  │                  │ Support Email Address                                      │   │
│  │ [🛡] Verification │ [support@icare-platform.co.uk                      ]       │   │
│  │                  │ Displayed in footer and notification emails                │   │
│  │ [🔔] Notifications│                                                            │   │
│  │                  │ Support Phone Number                                       │   │
│  │ [⚡] Features     │ [+44 20 1234 5678                                  ]       │   │
│  │     2 disabled   │ Displayed in footer for urgent user inquiries              │   │
│  │                  │                                                            │   │
│  │                  │ Maintenance Mode                                           │   │
│  │                  │ [ OFF ○────● ]                                            │   │
│  │                  │ Disable all user-facing features and display maintenance   │   │
│  │                  │ banner. Admin functions remain active.                     │   │
│  │                  │ ⚠ CAUTION: Enabling will prevent all user bookings/logins  │   │
│  │                  │                                                            │   │
│  │                  │ [Discard Changes]  [Save General Settings]                 │   │
│  │                  │                                                            │   │
│  │                  ├────────────────────────────────────────────────────────────┤   │
│  │                  │ RECENT CHANGES                                             │   │
│  │                  │ Last 20 settings modifications                             │   │
│  │                  │                                                            │   │
│  │                  │ Date/Time    │ Admin       │ Category │ Field     │ Old→New│   │
│  │                  │──────────────│─────────────│──────────│───────────│────────│   │
│  │                  │ 11 Feb 14:32 │ Sarah (SA)  │ Payments │ Comm Rate │15%→12% │   │
│  │                  │ 10 Feb 09:15 │ Mike (SA)   │ Features │ Messaging │ ON→OFF │   │
│  │                  │ 09 Feb 16:45 │ Sarah (SA)  │ Verify   │ DBS Expiry│ 5y→3y  │   │
│  │                  │ ... (17 more rows) ...                                     │   │
│  │                  │                                                            │   │
│  │                  │ View Full Audit Log →                                      │   │
│  └──────────────────┴───────────────────────────────────────────────────────────┘   │
│                                                                                       │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ About │ Privacy │ Terms │ Support │ v1.0.0                                           │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Desktop Layout - Payments Settings Category

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ [iCare Logo]         [Search: users, bookings...]  [🔔 3]  [SA ▾ Sarah (Super Admin)]│
├──────────────────────────────────────────────────────────────────────────────────────┤
│ Dashboard > System Settings                                                           │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  System Settings  [SUPER ADMIN ONLY]                                                 │
│                                                                                       │
├──────────────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┬───────────────────────────────────────────────────────────┐   │
│  │ SETTINGS NAV     │ PAYMENTS SETTINGS                                          │   │
│  │                  │ Configure commission rates, service fees, payment provider │   │
│  │ [⚙] General      │                                                            │   │
│  │                  │ ⚠ Commission rate changes affect all FUTURE bookings only. │   │
│  │ [$] Payments     │   Existing bookings retain their original rate.            │   │
│  │     (active)     │                                                            │   │
│  │                  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│  │ [🛡] Verification │ Caregiver Commission (%)  [PLACEHOLDER - FDR-008 PENDING]  │   │
│  │                  │ [15.00                ]                                    │   │
│  │ [🔔] Notifications│ Percentage deducted from caregiver earnings                │   │
│  │                  │                                                            │   │
│  │ [⚡] Features     │ Care Receiver Service Fee (%)  [PLACEHOLDER - FDR-008]     │   │
│  │     2 disabled   │ [15.00                ]                                    │   │
│  │                  │ Percentage added to booking total charged to care receiver │   │
│  │                  │                                                            │   │
│  │                  │ Total Platform Revenue per Booking                         │   │
│  │                  │ 30.00%  (15% commission + 15% service fee)                 │   │
│  │                  │ This is the effective take rate on each booking            │   │
│  │                  │                                                            │   │
│  │                  │ ┌─────────────────────────────────────────────────────┐   │   │
│  │                  │ │ Example Booking Calculation:                        │   │   │
│  │                  │ │ Caregiver rate: £20/hr × 3hrs = £60                │   │   │
│  │                  │ │ Care Receiver service fee (15%): +£9.00             │   │   │
│  │                  │ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │   │
│  │                  │ │ Total Charged to Care Receiver: £63.00             │   │   │
│  │                  │ │                                                     │   │   │
│  │                  │ │ Caregiver Commission (15%): -£9.00                 │   │   │
│  │                  │ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │   │
│  │                  │ │ Caregiver Earnings: £51.00                         │   │   │
│  │                  │ │ Platform Revenue: £12.00 (20% effective)           │   │   │
│  │                  │ └─────────────────────────────────────────────────────┘   │   │
│  │                  │                                                            │   │
│  │                  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│  │                  │ Payment Provider                                           │   │
│  │                  │ [Stripe ▾] (R0 supports Stripe only)                      │   │
│  │                  │                                                            │   │
│  │                  │ Stripe Publishable Key                                     │   │
│  │                  │ [pk_live_••••••••••••••••5678] [Reveal] [Copy]            │   │
│  │                  │ Public key for Stripe client-side integration              │   │
│  │                  │                                                            │   │
│  │                  │ Stripe Secret Key                                          │   │
│  │                  │ [sk_live_••••••••••••••••••••••] [Reveal] [Test Connect]  │   │
│  │                  │ 🔒 Never share. Stored encrypted. Reveal requires 2FA.     │   │
│  │                  │                                                            │   │
│  │                  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│  │                  │ Caregiver Payout Schedule                                  │   │
│  │                  │ [Weekly ▾]   Payout Day: [Friday ▾]                       │   │
│  │                  │ Payouts processed on this day each week (3-5pm)            │   │
│  │                  │                                                            │   │
│  │                  │ [Discard Changes]  [Save Payment Settings]                 │   │
│  └──────────────────┴───────────────────────────────────────────────────────────┘   │
│                                                                                       │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ About │ Privacy │ Terms │ Support │ v1.0.0                                           │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Desktop Layout - Features Settings Category

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ [iCare Logo]         [Search: users, bookings...]  [🔔 3]  [SA ▾ Sarah (Super Admin)]│
├──────────────────────────────────────────────────────────────────────────────────────┤
│ Dashboard > System Settings                                                           │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  System Settings  [SUPER ADMIN ONLY]                                                 │
│                                                                                       │
├──────────────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┬───────────────────────────────────────────────────────────┐   │
│  │ SETTINGS NAV     │ FEATURE FLAGS                                              │   │
│  │                  │ Enable or disable platform features (takes effect now)     │   │
│  │ [⚙] General      │                                                            │   │
│  │                  │ ⚠ Feature flag changes take effect IMMEDIATELY for all     │   │
│  │ [$] Payments     │   users. Disabling core features may disrupt bookings.     │   │
│  │                  │                                                            │   │
│  │ [🛡] Verification │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│  │                  │ Core Platform Features                                     │   │
│  │ [🔔] Notifications│                                                            │   │
│  │                  │ Booking System                                             │   │
│  │ [⚡] Features     │ [ ON ●────○ ]                                             │   │
│  │     (active)     │ Allow users to create, accept, and manage bookings         │   │
│  │                  │ ⚠ CRITICAL: Disabling prevents all booking activity        │   │
│  │                  │                                                            │   │
│  │                  │ Messaging System                                           │   │
│  │                  │ [ ON ●────○ ]                                             │   │
│  │                  │ Allow booking-related messages between users               │   │
│  │                  │                                                            │   │
│  │                  │ Reviews & Ratings                                          │   │
│  │                  │ [ ON ●────○ ]                                             │   │
│  │                  │ Allow care receivers to leave reviews after bookings       │   │
│  │                  │                                                            │   │
│  │                  │ Caregiver Search                                           │   │
│  │                  │ [ ON ●────○ ]                                             │   │
│  │                  │ Allow care receivers to search for caregivers by postcode  │   │
│  │                  │                                                            │   │
│  │                  │ New User Registrations                                     │   │
│  │                  │ [ ON ●────○ ]                                             │   │
│  │                  │ Allow new users to create accounts (all roles)             │   │
│  │                  │                                                            │   │
│  │                  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│  │                  │ Safeguarding Features (Cannot be disabled)                 │   │
│  │                  │                                                            │   │
│  │                  │ Safeguarding Reporting                                     │   │
│  │                  │ [ ON ●────○ ] 🔒 Always enabled (legal requirement)       │   │
│  │                  │                                                            │   │
│  │                  │ Caregiver Verification System                              │   │
│  │                  │ [ ON ●────○ ] 🔒 Always enabled (compliance)              │   │
│  │                  │                                                            │   │
│  │                  │ [Discard Changes]  [Save Feature Flags]                    │   │
│  └──────────────────┴───────────────────────────────────────────────────────────┘   │
│                                                                                       │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ About │ Privacy │ Terms │ Support │ v1.0.0                                           │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Mobile Layout (375px) - General Settings

```
┌─────────────────────────────────────┐
│ [☰]  iCare         [🔔 3]  [SA ▾]  │
├─────────────────────────────────────┤
│ ← Dashboard                          │
├─────────────────────────────────────┤
│                                     │
│ System Settings                     │
│ [SUPER ADMIN ONLY]                  │
│                                     │
│ Configure platform settings         │
│                                     │
├─────────────────────────────────────┤
│ [Settings Categories ▾]             │
│ General (selected)                  │
├─────────────────────────────────────┤
│                                     │
│ GENERAL SETTINGS                    │
│ Basic platform configuration        │
│                                     │
│ Platform Name                       │
│ [iCare                          ]   │
│ Displayed in browser title          │
│                                     │
│ Support Email Address               │
│ [support@icare-platform.co.uk ]    │
│ Displayed in footer                 │
│                                     │
│ Support Phone Number                │
│ [+44 20 1234 5678              ]   │
│ Displayed in footer                 │
│                                     │
│ Maintenance Mode                    │
│ [ OFF ○────● ]                     │
│ Disable all user features           │
│ ⚠ Prevents all user logins          │
│                                     │
│ [Discard]  [Save Settings]          │
│                                     │
├─────────────────────────────────────┤
│ RECENT CHANGES                      │
│                                     │
│ 11 Feb 14:32                        │
│ Sarah (Super Admin)                 │
│ Payments > Commission Rate          │
│ 15% → 12%                           │
│ ─────────────────────────────────   │
│ 10 Feb 09:15                        │
│ Mike (Super Admin)                  │
│ Features > Messaging System         │
│ ON → OFF                            │
│ ─────────────────────────────────   │
│ ... (3 more changes) ...            │
│                                     │
│ View Full Audit Log →               │
│                                     │
├─────────────────────────────────────┤
│ About │ Privacy │ Terms │ Support   │
└─────────────────────────────────────┘
```

---

## 6. State Coverage

### 6.1 Default State

**Conditions**:
- Super admin authenticated and authorized
- General Settings category selected (default)
- No unsaved changes

**Display**:
- Settings category sidebar: General highlighted
- General Settings form: All fields populated with current values
- Save/Discard buttons: Disabled (grayed out)
- Change Audit Log: Displays last 20 changes

### 6.2 Editing State

**Conditions**:
- User has modified one or more field values
- Changes not yet saved

**Display**:
- Modified field(s): Value changed from current
- Save button: Enabled (blue, clickable)
- Discard button: Enabled (gray, clickable)
- Unsaved changes indicator: Orange dot next to category name in sidebar
- Browser warning: "You have unsaved changes. Are you sure you want to leave?"

**Interaction**:
- Click Save: Validate fields, send API request, show success toast, disable buttons
- Click Discard: Reset fields to original values, disable buttons, remove orange dot
- Click different category: Show "Unsaved Changes Warning Modal" (section 4.11)
- Click breadcrumb/navigation: Show "Unsaved Changes Warning Modal"

### 6.3 Saving State (Loading)

**Conditions**:
- User clicked "Save Settings" button
- API request in progress

**Display**:
- Save button: Disabled, shows spinner + "Saving..."
- Discard button: Disabled
- All form fields: Disabled (read-only during save)
- Loading overlay: Semi-transparent overlay on content section

**Duration**: Typically 1-2 seconds for API response

### 6.4 Save Success State

**Conditions**:
- API request completed successfully
- Settings updated in database

**Display**:
- Success toast notification (top-right):
  - Icon: Green checkmark
  - Message: "[Category] settings saved successfully"
  - Auto-dismiss: 3 seconds
- Form fields: Reset to new saved values
- Save/Discard buttons: Disabled (no unsaved changes)
- Orange dot: Removed from sidebar category
- Change Audit Log: Updated with new entry at top of table

**Side Effects**:
- If commission rate changed: All future bookings use new rate
- If feature flag changed: Feature immediately enabled/disabled platform-wide
- If Stripe keys changed: Payment processing uses new credentials

### 6.5 Save Error State

**Conditions**:
- API request failed (network error, validation error, server error)

**Display**:
- Error toast notification (top-right):
  - Icon: Red X
  - Message: "Failed to save settings: [error message]"
  - Auto-dismiss: 5 seconds
  - Action button: "Retry"
- Save button: Re-enabled
- Discard button: Re-enabled
- Form fields: Re-enabled, values retained
- Orange dot: Remains on sidebar category

**Error Messages** (examples):
- "Network error. Check your connection and try again."
- "Validation error: Commission rate must be between 0% and 50%"
- "Unauthorized. Your session may have expired. Please log in again."
- "Server error. Please try again later or contact support."

### 6.6 Unsaved Changes Warning Modal State

**Conditions**:
- User has unsaved changes
- User attempts to navigate away (different category, breadcrumb, browser back/close)

**Display**:
- Modal overlay: Semi-transparent black background
- Modal dialog: Centered on screen
- Modal content: Warning icon, title, message, 3 buttons (section 4.11)
- Focus trap: User cannot interact with page behind modal

**Actions**:
- Click "Discard Changes": Close modal, discard unsaved changes, navigate to selected destination
- Click "Save Changes": Save settings, close modal on success, navigate to destination
- Click "Cancel": Close modal, stay on current page, retain unsaved changes
- Press Escape: Same as "Cancel"
- Press Enter: Same as "Save Changes" (default action)

### 6.7 Access Denied State (Non-Super Admin)

**Conditions**:
- User is authenticated as Admin role
- User does NOT have super_admin permission (e.g., operations manager)

**Display**:
- Full-page error state:
  - Icon: Lock icon (red)
  - Heading: "Access Denied"
  - Message: "System Settings requires Super Admin privileges. Contact your administrator if you need access."
  - Button: "Return to Admin Dashboard" (links to SCR-ADM-001)
- No settings content visible
- No sidebar navigation visible

### 6.8 Maintenance Mode Active State

**Conditions**:
- Super admin has enabled "Maintenance Mode" toggle
- Settings saved successfully

**Display**:
- Alert banner at top of page (orange background):
  - Icon: Warning triangle
  - Message: "MAINTENANCE MODE ACTIVE: Platform is currently unavailable to users"
  - Button: "Disable Maintenance Mode" (quick action)
- Maintenance Mode toggle: ON position (blue)
- Maintenance Banner Message field: Visible and editable

**User Impact**:
- All non-admin users: See maintenance banner on all pages, cannot perform any actions
- Admin users: Full access to all admin screens (unaffected)

### 6.9 Feature Disabled State

**Conditions**:
- Super admin has disabled one or more core features (e.g., Booking System OFF, Messaging OFF)

**Display**:
- Alert banner at top of Features category (red background):
  - Icon: Warning triangle
  - Message: "2 features currently disabled: Booking System, Messaging System"
  - Button: "View Disabled Features" (scrolls to disabled toggles)
- Disabled feature toggles: OFF position (gray)
- Feature count badge on sidebar: "Features - 2 disabled" (red badge)

**User Impact**:
- Booking System OFF: Users cannot create new bookings, accept requests, or view booking details
- Messaging System OFF: Users cannot send/receive messages
- Reviews OFF: Users cannot leave new reviews (existing reviews still visible)

### 6.10 Confirmation Modal State (Critical Changes)

**Conditions**:
- User attempts to disable critical feature (Booking System, New Registrations)
- User attempts to enable Maintenance Mode
- User changes Stripe payment credentials

**Display**:
- Modal overlay: Semi-transparent black background
- Modal dialog: Centered on screen
- Modal content:
  - Icon: Warning triangle (red or orange)
  - Title: "Confirm [Action Name]"
  - Message: "You are about to [action]. This will immediately affect all users. Enter your password to confirm."
  - Input field: Password (masked)
  - Button 1: "Confirm [Action]" (primary, red for destructive actions)
  - Button 2: "Cancel" (secondary, gray)

**Actions**:
- Enter valid password + click Confirm: Execute action, close modal, show success toast
- Enter invalid password + click Confirm: Show error "Invalid password. Try again."
- Click Cancel: Close modal, revert toggle/field to original value
- Press Escape: Same as Cancel

---

## 7. Responsive Design Notes

### 7.1 Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | 320px - 767px | Single column, collapsed sidebar (dropdown), simplified tables |
| Tablet | 768px - 1023px | Two-column maintained, narrower sidebar (200px), scrollable tables |
| Desktop | 1024px+ | Full two-column (240px sidebar + 800px content), full tables |

### 7.2 Mobile Adaptations (≤767px)

**Settings Category Sidebar**:
- Transform: Vertical sidebar → Horizontal dropdown at top
- Label: "Settings Categories ▾"
- Selected category shown, click to expand full list
- Collapse after selection

**Form Fields**:
- Width: Full-width inputs (100% container width)
- Number inputs: Larger touch targets (min 48px height)
- Toggle switches: Larger hit area (min 48x48px)

**Change Audit Log Table**:
- Transform: Horizontal scroll table → Stacked card layout
- Each row becomes a card with vertical field display:
  ```
  ┌───────────────────────────────┐
  │ 11 Feb 2026, 14:32           │
  │ Sarah Johnson (Super Admin)   │
  │ Payments > Commission Rate    │
  │ 15.00% → 12.00%              │
  └───────────────────────────────┘
  ```

**Save/Discard Buttons**:
- Layout: Stack vertically (full-width buttons)
- Order: Save button on top (primary), Discard below

**Modals**:
- Width: 90% viewport width (instead of fixed 600px)
- Padding: Reduced to 16px (instead of 24px)

### 7.3 Tablet Adaptations (768px - 1023px)

**Settings Category Sidebar**:
- Width: Reduced to 200px (from 240px desktop)
- Font size: 14px (from 16px desktop)
- Icon size: 16px (from 20px desktop)

**Form Fields**:
- Width: Adjust to fit narrower content column (600px instead of 800px)
- Two-column layouts (e.g., Payout Schedule + Day): Stack vertically

**Change Audit Log Table**:
- Horizontal scroll enabled if table width > container width
- Columns: Reduce padding to fit more content

### 7.4 Desktop Optimizations (≥1024px)

**Settings Category Sidebar**:
- Width: Fixed 240px
- Position: Sticky (scrolls with content up to header)

**Content Section**:
- Max width: 800px (prevents overly wide form fields)
- Padding: 32px (generous white space)

**Two-Column Form Fields**:
- Example: Payout Frequency + Day of Week displayed side-by-side (50% width each)

**Change Audit Log Table**:
- Full 6-column table visible without scroll
- Alternating row colors for readability

---

## 8. Accessibility Requirements

### 8.1 WCAG 2.1 AA Compliance

#### Perceivable

**Text Alternatives**:
- All icons have ARIA labels (e.g., `aria-label="Settings category: General"`)
- Toggle switches include visible labels + OFF/ON state text (not icon-only)
- Form fields include visible labels (not placeholder-only)

**Color Contrast**:
- Form labels: 4.5:1 minimum (#0F172A on #FFFFFF)
- Help text: 4.5:1 minimum (rgba(15,23,42,0.72) on #FFFFFF)
- Warning badges: 3:1 minimum (orange #F59E0B on white)
- Alert banners: 4.5:1 minimum (text on colored background)
- Disabled fields: 3:1 minimum (gray text on light gray background)

**Resizable Text**:
- All text remains readable at 200% zoom
- No horizontal scrolling required at 200% zoom (mobile exception)
- Form fields expand to accommodate larger text

#### Operable

**Keyboard Accessible**:
- All form fields: Tab to focus, Enter to submit
- Toggle switches: Tab to focus, Space to toggle
- Sidebar navigation: Tab to focus, Enter to select category
- Modal dialogs: Tab cycles through buttons, Escape to close
- Dropdown menus: Arrow keys to navigate options, Enter to select

**Focus Order**:
1. Skip navigation link ("Skip to settings content")
2. Admin navigation header (logo, search, notifications, user menu)
3. Breadcrumb links
4. Settings category sidebar (General → Payments → Verification → Notifications → Features)
5. Form fields (top to bottom order within selected category)
6. Save button
7. Discard button
8. Change Audit Log table (row by row)

**Focus Indicators**:
- Visible outline: 2px solid blue (#2563EB) on focus
- Contrast: 3:1 minimum against background
- Toggle switches: Blue glow around switch handle on focus

**No Keyboard Traps**:
- Modal dialogs: Focus trapped inside modal until dismissed
- No infinite loops in tab order

#### Understandable

**Language Declared**:
- `<html lang="en-GB">` (British English)

**Predictable Navigation**:
- Settings categories in consistent order (never change)
- Save/Discard buttons always at bottom of form
- Breadcrumb always at top of page

**Input Assistance**:
- Inline validation: Error messages appear below field on blur
- Error prevention: Confirmation modals for destructive actions
- Help text: Explanatory text below each field
- Required fields: Asterisk (*) + ARIA required attribute

**Error Identification**:
- Validation errors: Red border + red text + error icon
- Error messages: Specific and actionable (e.g., "Commission rate must be between 0% and 50%")
- Error summary: If multiple errors, list at top of form with links to fields

#### Robust

**Valid HTML**:
- Semantic HTML5 elements (`<nav>`, `<main>`, `<form>`, `<label>`, `<button>`)
- ARIA attributes used correctly (no redundant roles)

**Assistive Technology Compatible**:
- Form fields: `<label>` associated with `<input>` via `for` attribute
- Toggle switches: Custom component with ARIA role="switch", aria-checked="true/false"
- Modals: `role="alertdialog"`, `aria-labelledby`, `aria-describedby`
- Tables: `<table>` with `<caption>`, `<th scope="col">`

### 8.2 Screen Reader Announcements

**Settings Category Navigation**:
- Active category: "General settings, current page"
- Inactive category: "Payments settings, link"
- Badge: "Features settings, 2 features disabled, link"

**Form Fields**:
- Text input: "[Label] edit text, [current value]"
- Toggle switch: "[Label] switch, currently [on/off], [help text]"
- Dropdown: "[Label] dropdown, currently selected [value]"
- Number input: "[Label] spin button, value [number], minimum [min], maximum [max]"

**Save Button**:
- Enabled: "Save [category] settings button"
- Disabled: "Save settings button, disabled, no changes to save"
- Loading: "Saving settings, please wait"

**Success Toast**:
- "Success: [Category] settings saved successfully"

**Error Toast**:
- "Error: Failed to save settings: [error message]. Retry button available."

**Unsaved Changes Modal**:
- On open: "Alert dialog: Unsaved changes. You have unsaved changes to [category] settings. What would you like to do?"
- Buttons: "Discard changes button", "Save changes button", "Cancel button"

**Audit Log Table**:
- Caption: "Recent settings changes, last 20 modifications"
- Header row: "Date and time, Admin user, Category, Field changed, Old value, New value"
- Data row: "11 February 2026 14:32, Sarah Johnson Super Admin, Payments, Caregiver commission rate, 15 percent, 12 percent"

### 8.3 Touch Target Sizes

**Minimum 48x48px** (WCAG 2.5.5 Target Size):
- Toggle switches: 48px height
- Dropdown selectors: 48px height
- Buttons (Save, Discard): 48px height
- Sidebar category links: 48px height
- Modal buttons: 48px height

**Spacing Between Targets**:
- Minimum 8px gap between adjacent interactive elements
- Save and Discard buttons: 16px horizontal gap

---

## 9. Component Reuse

### 9.1 Existing Components (from dashboard-shared-components.md)

**Navigation**:
- `NAV-HEADER-AUTH` (role: "admin", user.role_badge: "Super Admin") - Block 1

**Forms**:
- `BUTTON` (primary, secondary variants) - Save/Discard buttons
- `INPUT-FIELD` (text, email, tel, number, password types) - All form fields
- `TEXTAREA` (multiline text) - Maintenance Banner Message, Email Templates
- `DROPDOWN-MENU` (select) - Payment Provider, Payout Schedule, Expiry Periods
- `TOGGLE-SWITCH` (on/off) - Maintenance Mode, Feature Flags

**Feedback**:
- `TOAST-NOTIFICATION` (success, error variants) - Save success/error messages
- `ALERT-BANNER` (warning variant) - Commission rate warning, Feature flags warning
- `MODAL-DIALOG` (alertdialog variant) - Unsaved Changes Modal, Confirmation Modal

**Data Display**:
- `TABLE` (with sortable headers) - Change Audit Log
- `BADGE` (pill variant) - "SUPER ADMIN ONLY", "PLACEHOLDER - FDR-008 PENDING", "2 disabled"

**Layout**:
- `TWO-COLUMN-LAYOUT` (sidebar + content) - Overall page layout
- `SECTION-CONTAINER` (heading + content) - Each settings category section

### 9.2 New Components (to be added to component library)

**Settings Category Sidebar Navigation**:
- **Component ID**: `SETTINGS-SIDEBAR-NAV`
- **Type**: Organism
- **Props**: `categories: Array<{id, label, icon, badge, isActive}>`, `onSelectCategory: function`
- **Variants**: Desktop (vertical sidebar), Mobile (horizontal dropdown)
- **Used In**: This screen (SCR-ADM-028)

**Password Confirmation Input**:
- **Component ID**: `PASSWORD-CONFIRM-INPUT`
- **Type**: Molecule
- **Props**: `label: string`, `value: string`, `onSubmit: function`, `error: string`
- **Used In**: Stripe key change confirmation, Feature disable confirmation
- **Includes**: Masked password input, "Show password" toggle, validation

**Calculation Info Box**:
- **Component ID**: `INFO-BOX-CALCULATION`
- **Type**: Molecule
- **Props**: `title: string`, `calculation: Array<{label, value, style}>` (style: normal, subtotal, total)
- **Used In**: Commission rate example calculation (section 4.6)
- **Styling**: Bordered box, monospace font for numbers, divider lines between sections

---

## 10. Design Notes for Figma

### 10.1 Visual Hierarchy

**Primary Elements** (highest prominence):
- Page title "System Settings" (32px bold)
- Save button (primary blue)
- Warning badges ("SUPER ADMIN ONLY", commission placeholders)
- Alert banners (yellow/red backgrounds)
- Unsaved changes modal (overlay + centered dialog)

**Secondary Elements** (supporting information):
- Category sidebar navigation (16px regular, blue on active)
- Form field labels (14px medium)
- Help text below fields (13px regular, muted color)
- Change Audit Log section (14px regular)

**Tertiary Elements** (low emphasis):
- Breadcrumb (14px regular, muted)
- Discard button (secondary gray)
- Footer links (12px regular)

### 10.2 Color Palette

**Status Colors** (commission rate warnings):
- Orange: #F59E0B (PLACEHOLDER badges)
- Yellow: #FEF3C7 (Alert banner background)
- Red: #EF4444 (Error states, destructive actions)
- Green: #10B981 (Success states, checkmarks)

**Neutral Grays**:
- Text primary: #0F172A (headings, labels)
- Text muted: rgba(15,23,42,0.72) (help text, subtitles)
- Border: rgba(0,0,0,0.06) (dividers, input borders)
- Background subtle: #F8FAFC (sidebar background)

**Brand Colors**:
- Primary blue: #2563EB (active states, primary button)
- Primary soft: #EFF6FF (active category background)

### 10.3 Typography Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Page Title) | 32px | Bold (700) | 40px |
| H2 (Section Heading) | 24px | Semibold (600) | 32px |
| H3 (Subsection) | 18px | Semibold (600) | 24px |
| Form Label | 14px | Medium (500) | 20px |
| Input Text | 16px | Regular (400) | 24px |
| Help Text | 13px | Regular (400) | 18px |
| Button Text | 16px | Medium (500) | 24px |
| Badge | 12px | Bold (700) | 16px |
| Table Cell | 14px | Regular (400) | 20px |

**Font Family**: Inter (all weights) or system font stack (San Francisco, Segoe UI, Roboto)

### 10.4 Spacing System (8px Grid)

**Vertical Spacing**:
- Page title → Subtitle: 8px
- Subtitle → Content: 24px
- Section heading → Form fields: 16px
- Form field → Form field: 24px
- Form section → Save buttons: 32px
- Save buttons → Audit Log: 48px

**Horizontal Spacing**:
- Sidebar width: 240px (desktop), 200px (tablet)
- Content padding: 32px (desktop), 24px (tablet), 16px (mobile)
- Button gap: 16px (horizontal), 12px (vertical)

**Component Internal Padding**:
- Input fields: 12px vertical, 16px horizontal
- Buttons: 12px vertical, 24px horizontal
- Alert banners: 16px all sides
- Modal dialog: 24px all sides

### 10.5 Interaction States

**Toggle Switch**:
- OFF: Gray handle on left, light gray track
- ON: Blue handle on right, blue track
- Hover: Subtle shadow on handle
- Focus: Blue glow around entire switch
- Disabled: Gray handle, gray track, reduced opacity

**Primary Button (Save)**:
- Default: Blue background (#2563EB), white text
- Hover: Darker blue (#1D4ED8)
- Active (pressed): Even darker blue (#1E40AF)
- Disabled: Light gray background, gray text, cursor not-allowed
- Loading: Spinner inside button, text "Saving...", disabled state

**Secondary Button (Discard)**:
- Default: White background, gray border, dark text
- Hover: Light gray background (#F8FAFC)
- Active: Slightly darker gray background
- Disabled: Light gray border, gray text, cursor not-allowed

**Input Field**:
- Default: White background, gray border, black text
- Focus: Blue border (#2563EB), blue glow
- Error: Red border (#EF4444), red text below field
- Disabled: Light gray background, gray border, gray text

**Modal Overlay**:
- Background: rgba(0,0,0,0.5) semi-transparent black
- Backdrop filter: Blur(4px) for depth

### 10.6 Figma Layer Structure (Recommended)

```
📁 SCR-ADM-028 System Settings
├── 🖼️ Frame: Desktop (1440x900+)
│   ├── 📦 Component Instance: NAV-HEADER-AUTH (admin variant)
│   ├── 📦 Component: Breadcrumb
│   ├── 📦 Component: Page Title + Badge
│   ├── 📁 Group: Two-Column Layout
│   │   ├── 📦 Component: Settings Sidebar Nav
│   │   └── 📦 Component: Settings Content (General)
│   │       ├── 📦 Component: Section Header
│   │       ├── 📦 Component: Input Field (Platform Name)
│   │       ├── 📦 Component: Input Field (Support Email)
│   │       ├── 📦 Component: Input Field (Support Phone)
│   │       ├── 📦 Component: Toggle Switch (Maintenance Mode)
│   │       ├── 📦 Component: Textarea (Maintenance Message)
│   │       ├── 📁 Group: Action Buttons
│   │       │   ├── 📦 Component: Button (Discard)
│   │       │   └── 📦 Component: Button (Save)
│   │       └── 📦 Component: Change Audit Log Table
│   └── 📦 Component Instance: Footer
├── 🖼️ Frame: Desktop - Payments Category
├── 🖼️ Frame: Desktop - Features Category
├── 🖼️ Frame: Tablet (768x1024)
├── 🖼️ Frame: Mobile (375x812)
└── 🖼️ Frame: Modal - Unsaved Changes
```

### 10.7 Prototype Interactions (Figma Prototype Mode)

**Category Sidebar Navigation**:
- Click "Payments" → Navigate to Frame "Desktop - Payments Category"
- Click "Features" → Navigate to Frame "Desktop - Features Category"
- If unsaved changes exist → Show Frame "Modal - Unsaved Changes" first

**Form Field Editing**:
- Click input field → Show cursor, enable editing (prototype limitation: simulated)
- Change value → Enable Save/Discard buttons (change button from disabled to enabled variant)

**Save Button**:
- Click Save → Show loading state (3 sec delay) → Show success toast → Reset to default state

**Toggle Switch**:
- Click toggle → Animate handle from left to right (or vice versa)
- If critical feature (Booking System) → Show confirmation modal before toggling

**Unsaved Changes Modal**:
- Click "Discard Changes" → Close modal, navigate away
- Click "Save Changes" → Show loading → Success → Navigate away
- Click "Cancel" → Close modal, stay on current page

---

## 11. Cross-References

### 11.1 Source Documents

**Product Specifications**:
- `/docs/product/tier1-route-map.md` - Route definition for `/admin/settings`
- `/docs/tiers/tier1/draft-design-specs/screen-inventory.md` - Screen definition (SCR-ADM-028)
- `/docs/product/features/tier1-admin-specification.md` - Admin analytics dashboard (section 9.1)

**Design System**:
- `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md` - Reusable components
- `/packages/ICare/app/styles/_tokens.scss` - Design tokens (colors, typography, spacing)

**Related Wireframes**:
- `/docs/tiers/tier1/draft-design-specs/wireframes/dashboards/adm-dashboard-scr-adm-001.md` - Admin Dashboard
- `/docs/tiers/tier1/draft-design-specs/wireframes/admin/scr-adm-025-user-management.md` - User Management (admin screen format reference)
- `/docs/tiers/tier1/draft-design-specs/wireframes/admin/scr-adm-020-platform-analytics.md` - Platform Analytics

### 11.2 Related Screens

**Admin Screens**:
- **SCR-ADM-001** (Admin Dashboard): Entry point via user menu
- **SCR-ADM-025** (User Management): Uses verification requirements defined here
- **SCR-ADM-026** (Verification Queue): Uses verification expiry periods defined here
- **SCR-ADM-020** (Platform Analytics): Displays effects of commission rate changes
- **SCR-ADM-023** (Audit Log, R1): Full audit log viewer

**Feature Screens**:
- All booking screens (SCR-CR-006, SCR-CR-008, SCR-CG-013): Use commission rates defined here
- All payment screens (SCR-CR-013, SCR-CG-020): Use Stripe credentials defined here

### 11.3 Compliance Requirements

**GDPR Considerations**:
- Stripe API keys: Stored encrypted, masked in UI, audit logged on change
- Admin actions: Full audit trail (who, what, when, old value, new value)
- Password confirmation: Required for critical changes (payment credentials, feature disables)

**Care Act 2014 Compliance**:
- Safeguarding features: Cannot be disabled (legal requirement)
- Verification system: Cannot be disabled (safeguarding compliance)

**UK Employment Law**:
- Right to Work verification: Mandatory for all caregivers (cannot be disabled in R0)

### 11.4 Open Questions / Design Gaps

**Product Gaps**:
1. **Screen ID Assignment**: RESOLVED -- Assigned SCR-ADM-028 (2026-02-12 gap analysis reconciliation).

2. **Commission Rate Final Decision**: FDR-008 pending from founder. Current placeholder (15% caregiver commission + 15% service fee) may change before R0 launch. Settings interface designed to accommodate easy changes.

3. **Email Template Editor**: Notification settings section assumes basic textarea for email templates. R1+ may require rich text editor (WYSIWYG) for formatting. Defer to R1.

4. **Audit Log Viewer**: "View Full Audit Log" link points to future screen (SCR-ADM-023, R1 scope). R0 shows last 20 changes only.

5. **Multi-Admin Notification**: SLA breach notifications currently sent to single email (admins@icare-platform.co.uk). R1 may support per-admin notification preferences.

**Technical Questions**:
1. **2FA Re-Authentication**: How long before 2FA expires and requires re-entry for Stripe key reveal? (Recommend 15-minute session timeout)

2. **Real-Time Updates**: If another admin changes settings while user is viewing this page, should page show stale data or live-update? (Recommend stale data + "Settings have been updated by another admin. Refresh to see changes." banner)

3. **Feature Flag Rollback**: If disabling a feature causes issues, is there a quick rollback mechanism? (Recommend audit log shows rollback button for last N changes)

---

**DOCUMENT STATUS**: READY FOR FIGMA HANDOFF

**Next Steps**:
1. ~~Assign correct screen ID~~ DONE -- SCR-ADM-028 assigned (2026-02-12)
2. Figma designer: Create low-fidelity mockups for all 5 settings categories (General, Payments, Verification, Notifications, Features)
3. Finalize commission rate decision (FDR-008) and update placeholder badges
4. Implement audit logging backend (capture all settings changes with old/new values)
5. Product team: Define 2FA re-authentication timeout policy for Stripe key reveals
