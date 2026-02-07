# Dashboard Shared Components Inventory

**Document Purpose**: Comprehensive catalog of reusable UI components extracted from the three completed dashboard wireframes (Jobs 1-3) to establish the foundation for the design system.

**Document Owner**: UX/UI Design Team
**Created**: 2026-02-07
**Status**: READY FOR FIGMA DESIGN SYSTEM
**Source Wireframes**:
- Care Receiver Dashboard (SCR-CR-001)
- Caregiver Dashboard (SCR-CG-001)
- Admin Dashboard (SCR-ADM-001)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Component Classification (Atomic Design)](#2-component-classification-atomic-design)
3. [Global Navigation Components](#3-global-navigation-components)
4. [Layout Components](#4-layout-components)
5. [Content Display Components](#5-content-display-components)
6. [Interactive Components](#6-interactive-components)
7. [Form Components](#7-form-components)
8. [Data Display Components](#8-data-display-components)
9. [Design Token Mapping](#9-design-token-mapping)
10. [Figma Component Recommendations](#10-figma-component-recommendations)
11. [Cross-Dashboard Component Usage Matrix](#11-cross-dashboard-component-usage-matrix)

---

## 1. Executive Summary

### 1.1 Component Extraction Overview

This document catalogs **28 distinct components** extracted from the three dashboard wireframes:

| Category | Component Count | Reusability |
|----------|----------------|-------------|
| Global Navigation | 6 | All 47 screens |
| Layout | 5 | All authenticated screens |
| Content Display | 8 | All dashboards + booking/profile screens |
| Interactive | 6 | All screens |
| Form | 3 | 15+ screens |
| Data Display | 5 | Dashboards + admin screens |

### 1.2 Strategic Component Priorities

**Tier 1 (Critical - Build First)**:
1. **Booking Card** - Most complex, used in CR and CG dashboards, search results, booking lists
2. **Status Badge** - Universal component for booking/verification statuses across all user types
3. **Button** - Primary interaction element across all 47 screens
4. **Header Navigation** - Global component for all authenticated screens
5. **Alert Banner** - Critical for account status, verification warnings, safeguarding alerts

**Tier 2 (High Priority)**:
6. Countdown Timer - Unique to marketplace (24h response windows)
7. Empty State - Required for all "no data" scenarios
8. User Avatar - Profile photos across cards, headers, menus
9. Metric Card - Admin dashboard, caregiver earnings
10. Activity Feed Item - Admin dashboard, recent activity displays

**Tier 3 (Secondary)**:
11. Quick Action Button, Progress Bar, Toggle Switch, Toast Notification, Footer

### 1.3 Design System Foundation

These dashboard components establish the complete design language:
- **Color system**: Status colors (green/yellow/red), brand colors (sage green, terracotta)
- **Typography**: 5-level heading hierarchy + body variants
- **Spacing**: 8px grid system with consistent padding/margins
- **Component states**: Hover, active, disabled, loading, error for all interactive elements
- **Responsive patterns**: Mobile/tablet/desktop variants for cards, navigation, layouts

---

## 2. Component Classification (Atomic Design)

### 2.1 Atomic Design Hierarchy

```
ATOMS (Basic building blocks)
├── Icon
├── Badge / Pill
├── Avatar
├── Divider
└── Spinner (loading indicator)

MOLECULES (Simple combinations)
├── Button (with icon + text)
├── Status Badge (icon + text + color)
├── User Avatar + Name
├── Countdown Timer (icon + time text + urgency color)
├── Metric Display (label + value + trend)
└── Link with Icon

ORGANISMS (Complex combinations)
├── Booking Card (avatar + name + datetime + status + actions)
├── Alert Banner (icon + title + message + CTA + dismiss)
├── Navigation Header (logo + menu + search + notifications + user menu)
├── Metric Card (title + metric display + subtext + link)
├── Empty State (icon + heading + message + CTA)
├── Activity Feed Item (timestamp + actor + action + subject)
└── Quick Actions Section (heading + action buttons)

TEMPLATES (Page sections)
├── Dashboard Widget Container
├── Two-Column Layout (main content + sidebar)
├── Content Grid (1/2/3 column responsive)
└── Section Container (heading + content + footer)
```

### 2.2 Component Dependency Map

```
Navigation Header
├── Logo (atom)
├── Nav Menu (molecule)
│   └── Nav Link (atom)
├── Search Bar (molecule)
│   ├── Input Field (atom)
│   └── Search Icon (atom)
├── Notification Bell (molecule)
│   ├── Icon (atom)
│   └── Badge (atom) - if unread count
└── User Menu (molecule)
    ├── Avatar (atom)
    ├── User Name (atom)
    └── Dropdown (organism)

Booking Card
├── User Avatar (molecule)
├── User Name + Photo (molecule)
├── Date/Time Display (atom)
├── Duration Display (atom)
├── Location Display (atom)
├── Service Types Icons (atoms)
├── Status Badge (molecule)
├── Countdown Timer (molecule) - conditional
├── Earnings Display (molecule) - CG only
├── Primary Button (molecule)
└── Secondary Button (molecule) - conditional
```

---

## 3. Global Navigation Components

### Component 3.1: Navigation Header (Authenticated Users)

**Component ID**: `NAV-HEADER-AUTH`
**Type**: Organism
**Used In**: All 3 dashboards (CR, CG, Admin) + all 44 authenticated screens

**Purpose**: Consistent global navigation and user context across all authenticated screens

**Variants**:
- `role: "care-receiver"` - Care Receiver navigation menu
- `role: "caregiver"` - Caregiver navigation menu
- `role: "admin"` - Admin navigation menu

**Props / Content Slots**:
```typescript
{
  logo: ImageURL,                    // Platform logo (link to dashboard)
  navigation_items: Array<{
    label: string,                   // "Dashboard", "Search", "Bookings", etc.
    route: string,                   // "/dashboard", "/search", etc.
    is_active: boolean,              // Highlight current page
    badge?: number                   // Unread count (e.g., Messages: 2)
  }>,
  search_enabled: boolean,           // Admin has search, users don't
  notifications: {
    unread_count: number,            // Badge count on bell icon
    notifications: Array<Notification>
  },
  user: {
    name: string,                    // "Sarah", "Admin Sarah"
    avatar_url?: string,             // User photo
    role_badge?: string,             // "Operations Manager" (admin only)
    dropdown_items: Array<{
      label: string,                 // "Settings", "Logout"
      route: string
    }>
  }
}
```

**States**:
- Default: All navigation visible
- Mobile: Hamburger menu (≤767px)
- Tablet: Condensed navigation (768-1023px)
- Desktop: Full horizontal navigation (≥1024px)
- Search focused: Search bar expanded (admin only)
- User menu open: Dropdown visible

**Design Tokens**:
- Background: `$primary-colour` (#ffffff)
- Text: `$txt` (#0f172a)
- Border bottom: `$border-soft` (rgba(0,0,0,0.06))
- Height: `$nav-bar-height` (12vh, min 64px)
- Padding: `$space-16` horizontal, `$space-12` vertical
- Logo height: 36px
- Nav link spacing: `$space-24` between items
- Font size: `$fs-base` (1.05rem)
- Active link: Bold (`$fw-bold` 600), underline accent (`$secondary-colour`)

**Accessibility Requirements**:
- ARIA landmark: `role="banner"`
- Skip navigation link: "Skip to main content" (hidden until focused)
- Keyboard navigation: Tab through all links, Enter to activate
- User menu: Arrow keys to navigate dropdown items
- Notifications: ARIA live region for count updates
- Focus indicators: 3px solid border (`$focus-border`)
- Touch targets: 48x48px minimum (mobile/tablet)

**Figma Component Recommendation**: **Master Component** with role variants
- Create 3 role-specific instances (Care Receiver, Caregiver, Admin)
- Share base structure, override navigation items per role
- Responsive breakpoints: Mobile, Tablet, Desktop variants

**Usage Notes**:
- Navigation items differ by user role (see cross-dashboard matrix)
- Admin navigation includes search bar (users navigate via dedicated search screen)
- Unread message badge appears on "Messages" nav item
- User avatar falls back to initials if no photo uploaded

**Cross-References**:
- CR Dashboard wireframe: Lines 77-93
- CG Dashboard wireframe: Lines 136-148
- Admin Dashboard wireframe: Lines 175-189, 269-283

---

### Component 3.2: Footer (Global)

**Component ID**: `FOOTER-GLOBAL`
**Type**: Organism
**Used In**: All 3 dashboards + all 47 screens

**Purpose**: Legal links, support access, and secondary navigation

**Variants**:
- `layout: "full"` - Desktop: Horizontal link list with copyright
- `layout: "condensed"` - Tablet: 2-line layout
- `layout: "compact"` - Mobile: Vertical list or accordion

**Props / Content Slots**:
```typescript
{
  links: Array<{
    label: string,                   // "About Us", "Terms of Service"
    route: string,                   // "/about", "/terms"
    external?: boolean               // Opens in new tab if true
  }>,
  copyright_text: string,            // "© 2026 Platform Name. All rights reserved."
  version?: string                   // "v1.0.0" (admin only)
}
```

**States**:
- Default: All links visible
- Link hover: Underline appears
- Link focus: Focus indicator visible

**Design Tokens**:
- Background: `$bg` (#f7f7f2) or transparent
- Text: `$muted` (rgba(15,23,42,0.72))
- Link hover: `$txt` (#0f172a)
- Border top: `$border-soft` (rgba(0,0,0,0.06))
- Padding: `$space-32` vertical, `$space-24` horizontal
- Font size: `$fs-sm` (0.95rem)
- Line height: `$lh-body` (1.6)
- Link spacing: `$space-24` horizontal (desktop), `$space-12` vertical (mobile)

**Accessibility Requirements**:
- ARIA landmark: `role="contentinfo"`
- Link text clear (not "click here")
- External links: `rel="noopener noreferrer"`, ARIA label includes "opens in new tab"
- Keyboard navigable: Tab order logical
- Touch targets: 44x44px minimum

**Figma Component Recommendation**: **Master Component** with layout variants
- Responsive variants: Desktop (horizontal), Tablet (2-line), Mobile (vertical)

**Usage Notes**:
- Link order consistent across all screens: About | How It Works | Safety | Terms | Privacy | Safeguarding | Contact
- Admin footer adds version number (for internal tracking)
- Mobile footer may collapse to accordion ("Legal", "Support") to save space

**Cross-References**:
- CR Dashboard wireframe: Lines 196-207
- CG Dashboard wireframe: Lines 199-203
- Admin Dashboard wireframe: Lines 696-697

---

### Component 3.3: Skip to Main Content Link

**Component ID**: `SKIP-LINK`
**Type**: Atom
**Used In**: All authenticated screens (accessibility requirement)

**Purpose**: Allow keyboard users to bypass navigation and jump directly to main content

**Props**:
```typescript
{
  target_id: string                  // Element ID to focus (e.g., "main-content")
}
```

**States**:
- Hidden: Default (visually hidden, not `display: none`)
- Focused: Visible at top-left corner, high z-index

**Design Tokens**:
- Position: Fixed, top 0, left 0, z-index 9999
- Background: `$secondary-colour` (#b0c47f)
- Text: `$txt` (#0f172a)
- Padding: `$space-8` vertical, `$space-16` horizontal
- Border radius: `$radius-sm` (12px) on bottom-right corner
- Font size: `$fs-base` (1.05rem)
- Font weight: `$fw-semibold` (500)
- Focus border: 3px solid `$focus-border`

**Accessibility Requirements**:
- WCAG 2.1 AA requirement (bypass blocks)
- First focusable element on page (Tab from address bar)
- Visually hidden until keyboard focus
- Click or Enter activates

**Figma Component Recommendation**: **Shared Component** (low priority for visual design)

**Usage Notes**:
- Appears on all authenticated screens
- Target element (`<main id="main-content">`) must exist
- Desktop-only feature (mobile doesn't need since navigation is condensed)

---

## 4. Layout Components

### Component 4.1: Page Container

**Component ID**: `LAYOUT-PAGE-CONTAINER`
**Type**: Template
**Used In**: All 3 dashboards + all authenticated screens

**Purpose**: Consistent page structure with header, main content, and footer

**Structure**:
```
┌─────────────────────────────────────┐
│ Navigation Header (sticky)          │
├─────────────────────────────────────┤
│ Main Content Area                   │
│ (flexible height, min-height 100vh) │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

**Props**:
```typescript
{
  background_color: string,          // Page background ($bg or custom)
  max_width?: number,                // Content max-width (1200px, 1440px, or none)
  sidebar_enabled?: boolean,         // Two-column layout if true
  sidebar_width?: string             // "30%", "300px", etc.
}
```

**Design Tokens**:
- Background: `$bg` (#f7f7f2)
- Max width: 1200px (standard), 1440px (wide), none (admin)
- Padding: `$space-24` horizontal (mobile), `$space-32` (tablet), `$space-48` (desktop)
- Min height: 100vh (full viewport height)

**Figma Component Recommendation**: **Template** (frame structure, not component)

---

### Component 4.2: Content Grid (1-column, 2-column, 3-column)

**Component ID**: `LAYOUT-CONTENT-GRID`
**Type**: Template
**Used In**: All dashboards, search results, booking lists

**Purpose**: Responsive grid layout for cards, widgets, metrics

**Variants**:
- `columns: 1` - Single column (mobile, narrow content)
- `columns: 2` - Two columns (tablet, admin metrics)
- `columns: 3` - Three columns (desktop, quick actions)

**Props**:
```typescript
{
  columns: 1 | 2 | 3,
  gap: string,                       // "$gap-grid-fluid" or custom
  item_min_width?: string            // Auto-fit: minmax(280px, 1fr)
}
```

**Responsive Behavior**:
- Mobile (320-767px): 1 column (forced)
- Tablet (768-1023px): 2 columns (3-col grids collapse to 2)
- Desktop (1024+): Specified column count

**Design Tokens**:
- Grid gap: `$gap-grid-fluid` (clamp(26px, 3.4vw, 52px))
- Item min width: 280px (cards), 200px (metrics)

**Figma Component Recommendation**: **Auto Layout Frame** with variants

---

### Component 4.3: Section Card / Widget Container

**Component ID**: `LAYOUT-WIDGET-CONTAINER`
**Type**: Molecule
**Used In**: All 3 dashboards (wraps booking lists, metrics, activity feeds)

**Purpose**: Consistent container styling for dashboard widgets

**Props**:
```typescript
{
  title: string,                     // "Pending Requests", "Earnings Summary"
  subtitle?: string,                 // "Awaiting caregiver response"
  header_action?: {                  // "View All" link in header
    label: string,
    route: string
  },
  footer_action?: {                  // CTA button at bottom
    label: string,
    variant: "primary" | "secondary"
  }
}
```

**States**:
- Default: Standard card styling
- Loading: Skeleton placeholder content
- Empty: Empty state displayed in content area
- Error: Error message with retry button

**Design Tokens**:
- Background: `$card-glass` (rgba(255,255,255,0.55))
- Border: `$card-border` (rgba(15,23,42,0.10))
- Border radius: `$radius-lg` (18px)
- Padding: `$space-24` (mobile), `$space-32` (desktop)
- Shadow: `$shadow-card-soft` (0 10px 26px rgba(15,23,42,0.05))
- Title font size: `$fs-h2-fluid` (clamp(1.85rem, 2.8vw, 2.25rem))
- Title font weight: `$fw-bold` (600)
- Subtitle font size: `$fs-base` (1.05rem)
- Subtitle color: `$muted` (rgba(15,23,42,0.72))

**Accessibility Requirements**:
- Semantic HTML: `<section>` or `<article>`
- Heading: H2 for title
- ARIA label if title not visible
- Focus order: Header action → Content items → Footer action

**Figma Component Recommendation**: **Master Component** with header/footer variants
- Variant: With header action | Without header action
- Variant: With footer action | Without footer action

**Cross-References**:
- CR Dashboard: Blocks 5 (Pending Requests), 6 (Upcoming Bookings), 7 (Recent Activity)
- CG Dashboard: Blocks 4 (Pending Requests), 5 (Upcoming Bookings), 6 (Earnings Summary)
- Admin Dashboard: Blocks 3 (Verification Queue), 4 (Safeguarding Reports), 8 (Recent Activity)

---

### Component 4.4: Two-Column Layout (Main Content + Sidebar)

**Component ID**: `LAYOUT-TWO-COLUMN`
**Type**: Template
**Used In**: Admin Dashboard (desktop), future profile screens

**Purpose**: Primary content area (70%) with secondary sidebar (30%)

**Structure**:
```
Desktop (1024px+):
┌───────────────────────┬─────────┐
│ Main Content (70%)    │ Sidebar │
│                       │ (30%)   │
└───────────────────────┴─────────┘

Tablet/Mobile:
┌───────────────────────┐
│ Main Content (100%)   │
├───────────────────────┤
│ Sidebar (100%)        │
│ (stacked below)       │
└───────────────────────┘
```

**Props**:
```typescript
{
  main_width: string,                // "70%", "65%", etc.
  sidebar_width: string,             // "30%", "35%", etc.
  gap: string,                       // Spacing between columns
  sidebar_sticky?: boolean           // Sidebar scrolls with content or fixed
}
```

**Responsive Behavior**:
- Desktop: Side-by-side columns
- Tablet/Mobile: Stacked vertically (sidebar below main content)

**Design Tokens**:
- Gap: `$space-32` (desktop), `$space-24` (tablet/mobile)
- Main width: 70% (standard), 65% (narrow sidebar)
- Sidebar width: 30% (standard), 35% (wide sidebar)

**Figma Component Recommendation**: **Auto Layout Frame** (horizontal → vertical on mobile)

**Cross-References**:
- Admin Dashboard wireframe: Lines 169-174 (two-column structure)

---

### Component 4.5: Divider / Separator

**Component ID**: `DIVIDER`
**Type**: Atom
**Used In**: Widget containers, list items, admin activity feed

**Purpose**: Visual separation between content sections or list items

**Variants**:
- `orientation: "horizontal"` - Full-width horizontal line
- `orientation: "vertical"` - Vertical line (between columns)
- `style: "solid"` - Standard border
- `style: "dashed"` - Dashed border (less prominent)

**Design Tokens**:
- Color: `$border-soft` (rgba(0,0,0,0.06))
- Thickness: 1px
- Margin: `$space-16` vertical, 0 horizontal

**Figma Component Recommendation**: **Line element** with color style

---

## 5. Content Display Components

### Component 5.1: Booking Card (Multi-Variant)

**Component ID**: `BOOKING-CARD`
**Type**: Organism
**Used In**: CR Dashboard, CG Dashboard, Search Results, Booking Lists, Booking Detail

**Purpose**: Display booking information with caregiver/care receiver details, status, and actions

**THIS IS THE MOST COMPLEX AND CRITICAL COMPONENT IN THE SYSTEM**

**Variants**:
- `type: "pending-request-cr"` - Care Receiver pending request (countdown timer, "Cancel Request")
- `type: "pending-request-cg"` - Caregiver pending request (earnings, countdown timer, "View Details")
- `type: "upcoming-cr"` - Care Receiver upcoming booking ("Confirmed" status, "View Details", "Message")
- `type: "upcoming-cg"` - Caregiver upcoming booking ("Confirmed" status, "View Details")
- `type: "in-progress"` - Currently happening ("In Progress" status, "Emergency Contact")
- `type: "completed"` - Past booking ("Completed" status, "Leave Review")
- `type: "search-result"` - Caregiver profile card in search results

**Props / Content Slots**:
```typescript
{
  // User information
  user: {
    name: string,                    // "Margaret S." (first name + initial for privacy)
    photo_url?: string,              // User profile photo
    verification_badges?: Array<     // Caregiver only
      "identity_verified" |
      "right_to_work_verified" |
      "dbs_verified"
    >
  },

  // Booking details
  booking: {
    id: string,                      // Booking ID (for navigation)
    date: string,                    // "Tuesday, 10 February 2026"
    start_time: string,              // "14:00" or "2:00 PM"
    end_time: string,                // "17:00" or "5:00 PM"
    duration_hours: number,          // 3
    status: BookingStatus,           // "requested", "accepted", "in_progress", "completed", "cancelled"
    location: {
      postcode: string,              // "SW1A 1AA"
      distance_miles?: number        // 2.3 (caregiver view only)
    },
    service_types: Array<string>,    // ["companionship", "light_housework"]
    special_requests?: string,       // Truncated preview (first 50 chars)
    caregiver_earnings?: number      // 51.00 (caregiver view only)
  },

  // Countdown timer (pending requests only)
  countdown?: {
    hours_remaining: number,         // 18
    urgency: "ok" | "warning" | "urgent"  // >6h, 2-6h, <2h
  },

  // Actions
  actions: {
    primary: {
      label: string,                 // "View Details", "Accept Request"
      action: string                 // Route or onClick handler
    },
    secondary?: {
      label: string,                 // "Message Caregiver", "Cancel Request"
      action: string,
      variant: "default" | "destructive"  // Red for cancel/decline
    }
  }
}
```

**States**:
- Default: All information visible
- Hover (desktop): Subtle shadow increase, card elevates
- Loading: Skeleton placeholder (gray boxes where content appears)
- Countdown urgency states:
  - OK (>6h): Green timer, standard card border
  - Warning (2-6h): Yellow timer, yellow left border (4px)
  - Urgent (<2h): Red timer, red left border (4px), subtle pulsing animation

**Design Tokens**:
- Background: `$card-glass` (rgba(255,255,255,0.55))
- Hover background: `$card-glass-hover` (rgba(255,255,255,0.62))
- Border: `$card-border` (rgba(15,23,42,0.10))
- Border radius: `$radius-lg` (18px)
- Padding: `$space-24` (mobile), `$space-32` (desktop)
- Shadow (default): `$shadow-card-soft`
- Shadow (hover): `$shadow-card` (0 14px 40px rgba(15,23,42,0.10))
- Avatar size: 48px (mobile), 56px (desktop)
- Avatar border radius: `$radius-pill` (999px)
- Title (name) font size: `$fs-lg` (1.22rem)
- Title font weight: `$fw-bold` (600)
- DateTime font size: `$fs-base` (1.05rem)
- DateTime color: `$muted` (rgba(15,23,42,0.72))
- Service icons size: 20px
- Service icon spacing: `$space-8` between icons
- Countdown timer colors:
  - OK: `#16a34a` (green)
  - Warning: `#ca8a04` (yellow-orange)
  - Urgent: `#dc2626` (red)

**Responsive Behavior**:
- Desktop (1024px+): Horizontal layout (photo left, details center, actions right)
- Tablet (768-1023px): Horizontal layout, slightly condensed
- Mobile (320-767px): Vertical stack (photo top, details middle, actions bottom full-width buttons)

**Accessibility Requirements**:
- Card wrapper: `role="article"`, `aria-labelledby="booking-[id]-title"`
- Entire card clickable (navigates to booking detail), not just "View Details" button
- Keyboard navigation: Tab to card, Enter to open detail, Tab again to action buttons
- Countdown timer: `aria-live="polite"`, updates every 30 minutes (not every second to avoid screen reader spam)
- Status badge: `aria-label` describes status (e.g., "Booking status: Confirmed")
- Touch targets: 48x48px minimum (mobile)
- Focus indicator: 3px solid border around card
- Photo alt text: "[User name] profile photo"

**Figma Component Recommendation**: **Master Component** with multiple variants
- Property: `card_type` (pending-request-cr, pending-request-cg, upcoming-cr, upcoming-cg, in-progress, completed)
- Property: `countdown_urgency` (ok, warning, urgent) - conditional
- Boolean: `show_earnings` (caregiver view only)
- Boolean: `show_verification_badges` (search results only)
- Responsive variants: Desktop, Tablet, Mobile

**Usage Notes**:
- This component appears in 10+ screens across all user types
- Caregiver earnings displayed AFTER platform commission (not gross amount)
- Special requests truncated to 50 characters with "..." (full text in booking detail)
- Countdown timer only visible for pending requests (disappears after caregiver accepts/declines)
- Service type icons use emoji or custom icons (design decision pending)
- Distance calculation requires caregiver's home postcode + booking location postcode

**Cross-References**:
- CR Dashboard wireframe: Lines 135-175 (pending requests), 156-175 (upcoming bookings)
- CG Dashboard wireframe: Lines 208-250 (pending request card), 252-289 (upcoming booking card)
- Admin Dashboard wireframe: N/A (admin sees list view, not cards)

---

### Component 5.2: Status Badge

**Component ID**: `STATUS-BADGE`
**Type**: Molecule
**Used In**: All 3 dashboards, booking cards, verification screens, admin queues

**Purpose**: Visual indicator of booking status, verification status, or system status

**Variants - Booking Statuses**:
- `status: "requested"` - Orange/yellow, "⏳ Awaiting Response"
- `status: "accepted"` - Blue, "✓ Confirmed"
- `status: "in_progress"` - Blue, "● In Progress"
- `status: "completed"` - Green, "✓ Completed"
- `status: "payment_released"` - Green, "✓ Paid"
- `status: "cancelled"` - Gray, "✗ Cancelled"
- `status: "disputed"` - Red, "⚠ Disputed"

**Variants - Verification Statuses**:
- `status: "verified"` - Green, "✓ Verified"
- `status: "pending"` - Gray/yellow, "⏳ Pending Review"
- `status: "rejected"` - Red, "✗ Rejected"

**Variants - Admin SLA Statuses**:
- `status: "on_track"` - Green, "✓ On Track"
- `status: "approaching_sla"` - Yellow, "⚠ Approaching SLA"
- `status: "breached"` - Red, "🚨 SLA Breached"

**Props**:
```typescript
{
  status: string,                    // Status key (maps to variant)
  label: string,                     // Display text (overrides default if needed)
  icon?: string,                     // Icon override (emoji or icon component)
  size?: "sm" | "md" | "lg"          // 24px, 32px, 40px height
}
```

**States**:
- Default: Standard badge styling
- Hover: Slight opacity change (if clickable/linked)
- Disabled: Reduced opacity (0.6)

**Design Tokens**:
- Padding: `$space-8` horizontal, `$space-4` vertical (sm), `$space-12`/`$space-7` (md)
- Border radius: `$radius-pill` (999px)
- Font size: `$fs-xs` (0.99rem) for sm, `$fs-base` (1.05rem) for md
- Font weight: `$fw-semibold` (500)
- Icon size: 16px (sm), 20px (md)
- Gap between icon and text: `$space-4`

**Color Mapping** (background / text):
- Requested: `#fef3c7` / `#92400e` (yellow bg, brown text)
- Accepted: `#dbeafe` / `#1e40af` (light blue bg, blue text)
- In Progress: `#dbeafe` / `#1e40af` (light blue bg, blue text)
- Completed: `#dcfce7` / `#166534` (light green bg, dark green text)
- Cancelled: `#f3f4f6` / `#6b7280` (light gray bg, gray text)
- Disputed: `#fee2e2` / `#991b1b` (light red bg, dark red text)
- Verified: `#dcfce7` / `#166534` (light green bg, dark green text)
- Pending: `#fef3c7` / `#92400e` (yellow bg, brown text)
- Rejected: `#fee2e2` / `#991b1b` (light red bg, dark red text)
- On Track: `#dcfce7` / `#166534` (green)
- Approaching SLA: `#fef3c7` / `#92400e` (yellow)
- SLA Breached: `#fee2e2` / `#991b1b` (red)

**Accessibility Requirements**:
- ARIA label: "Booking status: Confirmed" (not just "Confirmed")
- Color is NOT the only indicator (icon + text both present)
- Color contrast: 4.5:1 minimum for text
- Screen reader announces full status meaning, not just visual label

**Figma Component Recommendation**: **Master Component** with status property
- Property: `status` (dropdown with all status options)
- Property: `size` (sm, md, lg)
- Auto-swap background color, text color, icon based on status

**Usage Notes**:
- Icon is decorative only (ARIA hidden), text carries semantic meaning
- Use semantic naming (not "green badge" but "confirmed status badge")
- Booking statuses reused across CR, CG, and Admin views
- Verification statuses unique to CG and Admin views

**Cross-References**:
- CR Dashboard: Lines 161 ("✓ CONFIRMED"), 432 ("● IN PROGRESS")
- CG Dashboard: Lines 560 ("🟡 URGENT"), 569 ("🟢 OK"), 584 ("✅ CONFIRMED")
- Admin Dashboard: Lines 646 (SLA status "⚠️ 3 over 48h SLA")

---

### Component 5.3: Countdown Timer

**Component ID**: `COUNTDOWN-TIMER`
**Type**: Molecule
**Used In**: CG Dashboard (pending requests), CR Dashboard (pending requests), Admin Dashboard (SLA monitoring)

**Purpose**: Display time remaining for time-sensitive actions (caregiver response deadline, SLA compliance)

**Variants**:
- `urgency: "ok"` - Green text, >6 hours remaining
- `urgency: "warning"` - Yellow/orange text, 2-6 hours remaining
- `urgency: "urgent"` - Red text, <2 hours remaining, optional pulsing animation

**Props**:
```typescript
{
  hours_remaining: number,           // 18.5
  urgency: "ok" | "warning" | "urgent",
  format?: "long" | "short",         // "18 hours remaining" vs "18h left"
  show_icon?: boolean,               // Clock icon before text
  animate_urgent?: boolean           // Pulsing animation if urgent
}
```

**States**:
- Default: Static text display
- Urgent (<2h): Pulsing animation (subtle, 2s interval)
- Expired: Displays "Expired" in red (or hidden if booking auto-cancelled)

**Display Format**:
- >24 hours: "[N] hours left" (e.g., "18 hours left")
- <24 hours: "[H]h [M]m left" (e.g., "6h 30m left")
- <1 hour: "[M] minutes left" (e.g., "45 minutes left")
- <30 minutes: "URGENT: [M] min left" (red, bold, pulsing)

**Design Tokens**:
- Font size: `$fs-base` (1.05rem)
- Font weight: `$fw-semibold` (500) for urgent, `$fw-normal` (400) otherwise
- OK color: `#16a34a` (green)
- Warning color: `#f59e0b` (yellow-orange)
- Urgent color: `#dc2626` (red)
- Icon size: 20px
- Gap between icon and text: `$space-4`

**Animation** (urgent only):
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
animation: pulse 2s infinite;
```

**Accessibility Requirements**:
- ARIA live region: `aria-live="polite"` (announces updates without interrupting)
- Update frequency: Every 30 minutes (not every second to avoid screen reader spam)
- Manual refresh: On page focus/visibility change
- ARIA label: "Time remaining: 18 hours" (not just "18 hours")
- Urgency conveyed via text, not just color: "URGENT: 45 min left"

**Figma Component Recommendation**: **Component** with urgency variants
- Property: `urgency` (ok, warning, urgent)
- Auto-swap text color based on urgency
- Urgent variant includes pulsing animation notation

**Usage Notes**:
- Timer updates client-side (JavaScript) but refreshes from server on page load
- Countdown calculated from `requested_at` timestamp + 24 hours (server-side)
- If caregiver doesn't respond within 24h, booking auto-cancels (backend logic)
- Admin SLA countdown shows time pending, not time remaining (different semantics)

**Cross-References**:
- CR Dashboard: Line 144 ("⏱️ 20 hours, 15 minutes remaining")
- CG Dashboard: Line 247 ("18 hours left"), Line 494 ("⏱️ 20 hours, 15 minutes remaining")
- Admin Dashboard: Line 646 ("3 over 48h SLA")

---

### Component 5.4: Empty State

**Component ID**: `EMPTY-STATE`
**Type**: Organism
**Used In**: All 3 dashboards (no bookings, no requests, no activity), all list/grid views

**Purpose**: Guide users when no data exists, provide next action

**Variants**:
- `type: "no-bookings"` - No upcoming bookings (CR/CG dashboard)
- `type: "no-requests"` - No pending requests (CR/CG dashboard)
- `type: "no-activity"` - No recent activity (all dashboards)
- `type: "no-results"` - Search returned no results
- `type: "no-messages"` - No messages in inbox
- `type: "setup-incomplete"` - Account setup not complete

**Props / Content Slots**:
```typescript
{
  icon: string,                      // Emoji or icon component (📅, ✓, 📭)
  heading: string,                   // "No upcoming bookings"
  message: string,                   // "Find a caregiver to get started"
  cta?: {                            // Optional action button
    label: string,                   // "Find a Caregiver"
    action: string,                  // Route or onClick
    variant: "primary" | "secondary"
  },
  illustration?: ImageURL            // Optional illustration (vs icon)
}
```

**States**:
- Default: Centered content with icon/illustration
- With CTA: Action button below message
- Without CTA: Message only (neutral state)

**Design Tokens**:
- Container padding: `$space-48` vertical, `$space-32` horizontal
- Icon size: 64px (emoji) or 80px (illustration)
- Icon margin bottom: `$space-24`
- Heading font size: `$fs-xl` (1.3rem)
- Heading font weight: `$fw-bold` (600)
- Heading color: `$txt` (#0f172a)
- Heading margin bottom: `$space-12`
- Message font size: `$fs-base` (1.05rem)
- Message color: `$muted` (rgba(15,23,42,0.72))
- Message max width: 42ch (readable line length)
- CTA margin top: `$space-24`

**Accessibility Requirements**:
- Heading: H3 or H4 (depending on page hierarchy)
- Message: Paragraph tag
- Text alignment: Center
- CTA button: Clearly labeled action (not "click here")
- Screen reader: Announces empty state when list loads empty

**Figma Component Recommendation**: **Master Component** with type variants
- Property: `type` (no-bookings, no-requests, etc.)
- Boolean: `show_cta` (with/without action button)
- Auto-swap icon, heading, message based on type

**Usage Notes**:
- Tone: Helpful and encouraging, not alarming
- Icon choice: Matches the content type (calendar for bookings, envelope for messages)
- CTA present when user can take action to resolve empty state
- No CTA when empty state is neutral (e.g., "No recent activity" is fine)

**Cross-References**:
- CR Dashboard wireframe: Lines 343-360 (no pending requests), Lines 353-360 (no upcoming bookings), Lines 363-368 (no recent activity)
- CG Dashboard wireframe: Lines 642-647 (no pending requests), Lines 650-653 (no upcoming bookings), Lines 656-662 (earnings empty state)
- Admin Dashboard wireframe: Lines 769-776 (verification queue empty), Lines 781-791 (safeguarding reports empty)

---

### Component 5.5: Alert Banner

**Component ID**: `ALERT-BANNER`
**Type**: Organism
**Used In**: All 3 dashboards (account status, verification warnings, safeguarding alerts)

**Purpose**: Display urgent or important messages requiring user attention

**Variants**:
- `severity: "info"` - Blue background, informational message
- `severity: "warning"` - Yellow/amber background, action needed
- `severity: "error"` - Red background, critical issue
- `severity: "success"` - Green background, positive confirmation

**Props / Content Slots**:
```typescript
{
  severity: "info" | "warning" | "error" | "success",
  icon: string,                      // Icon component (⚠️, ✓, ⚠️, ℹ️)
  title: string,                     // "Add a payment method to request bookings"
  message: string,                   // Detailed explanation
  cta?: {                            // Primary action button
    label: string,                   // "Add Payment Method"
    action: string                   // Route or onClick
  },
  dismissible: boolean,              // Show X button to dismiss
  persistent?: boolean               // Reappears on page reload if not resolved
}
```

**States**:
- Default: Visible at top of content area (below header)
- Dismissed: Hidden (stored in session/localStorage)
- Hover (CTA): Button hover state

**Design Tokens**:
- Padding: `$space-16` vertical, `$space-24` horizontal
- Border radius: `$radius-sm` (12px)
- Border left: 4px solid (severity color)
- Icon size: 24px
- Gap between elements: `$space-12` horizontal
- Title font size: `$fs-lg` (1.22rem)
- Title font weight: `$fw-bold` (600)
- Message font size: `$fs-base` (1.05rem)
- Dismiss button size: 32x32px (touch target 48x48px with padding)

**Color Mapping** (background / border / text):
- Info: `#dbeafe` / `#3b82f6` / `#1e40af` (light blue bg, blue border/text)
- Warning: `#fef3c7` / `#f59e0b` / `#92400e` (light yellow bg, orange border, brown text)
- Error: `#fee2e2` / `#dc2626` / `#991b1b` (light red bg, red border/text)
- Success: `#dcfce7` / `#22c55e` / `#166534` (light green bg, green border/text)

**Accessibility Requirements**:
- ARIA role: `role="alert"` (critical), `role="status"` (info)
- ARIA live: `aria-live="assertive"` (error/warning), `aria-live="polite"` (info/success)
- Focus management: Focus moves to CTA button when alert appears (if critical)
- Keyboard: Tab to CTA button, Tab to dismiss button, Enter/Space to activate
- Dismiss button: `aria-label="Dismiss alert"`
- Screen reader: Announces full alert text when appears

**Figma Component Recommendation**: **Master Component** with severity variants
- Property: `severity` (info, warning, error, success)
- Boolean: `show_cta` (with/without action button)
- Boolean: `dismissible` (with/without close X button)
- Auto-swap background, border, icon based on severity

**Usage Notes**:
- Maximum 1 alert banner visible at a time (highest severity wins)
- Error/Warning alerts cannot be dismissed until issue resolved
- Success alerts auto-dismiss after 5 seconds (or user dismisses)
- Info alerts user-dismissible, may persist across sessions if important
- Alert appears BELOW navigation header, ABOVE main content

**Cross-References**:
- CR Dashboard wireframe: Lines 102-117 (account status banner: payment method missing)
- CG Dashboard wireframe: Lines 149-157 (verification pending banner)
- Admin Dashboard wireframe: Lines 715-717 (urgent safeguarding alert), Lines 742-752 (SLA breach alert)

---

### Component 5.6: User Avatar / Profile Photo

**Component ID**: `USER-AVATAR`
**Type**: Atom
**Used In**: All dashboards (header, booking cards, profile screens), navigation menu

**Purpose**: Display user profile photo or initials fallback

**Variants**:
- `size: "sm"` - 32px (navigation dropdown, small lists)
- `size: "md"` - 48px (booking cards mobile, user menu)
- `size: "lg"` - 56px (booking cards desktop)
- `size: "xl"` - 80px (profile detail pages)
- `size: "2xl"` - 120px (profile edit screens)

**Props**:
```typescript
{
  photo_url?: string,                // User uploaded photo
  initials: string,                  // "MS" (fallback if no photo)
  alt_text: string,                  // "Mary Smith profile photo"
  size: "sm" | "md" | "lg" | "xl" | "2xl",
  border?: boolean,                  // Optional border
  status_indicator?: "online" | "offline" | "away"  // Future feature
}
```

**States**:
- With photo: Display image
- Without photo: Display initials on colored background
- Loading: Gray placeholder circle
- Error (photo failed to load): Fallback to initials

**Design Tokens**:
- Size sm: 32px diameter
- Size md: 48px diameter
- Size lg: 56px diameter
- Size xl: 80px diameter
- Size 2xl: 120px diameter
- Border radius: `$radius-pill` (999px, circular)
- Border: 2px solid `$border-soft` (if enabled)
- Initials font size: 0.4 × diameter
- Initials font weight: `$fw-semibold` (500)
- Initials background: `$secondary-colour` (#b0c47f) or auto-generated from name hash
- Initials text color: `$txt` (#0f172a)

**Accessibility Requirements**:
- Alt text: "[User name] profile photo" (if photo exists)
- Alt text: "[User initials]" (if initials shown)
- Image element or div with background-image + role="img"
- No text alternative if purely decorative in list (name appears adjacent)

**Figma Component Recommendation**: **Master Component** with size variants
- Property: `size` (sm, md, lg, xl, 2xl)
- Boolean: `has_photo` (swaps between photo layer and initials layer)
- Text override: `initials` (for initials layer)

**Usage Notes**:
- Initials: First letter of first name + first letter of last name
- Background color: Auto-generated from user ID hash (consistent color per user)
- Photo uploaded via profile settings, stored in cloud storage
- Lazy loading for photo URLs (skeleton placeholder during load)
- Accessibility: Photo alt text includes user name for context

**Cross-References**:
- CR Dashboard wireframe: Lines 82 (header user menu), 412 (booking card avatar)
- CG Dashboard wireframe: Lines 138 (header user menu), 560 (booking card avatar)
- Admin Dashboard wireframe: Lines 277 (header user menu)

---

### Component 5.7: Metric Card / Stat Widget

**Component ID**: `METRIC-CARD`
**Type**: Organism
**Used In**: CG Dashboard (earnings summary), Admin Dashboard (platform health, user activity)

**Purpose**: Display a single metric with label, value, trend, and optional link

**Variants**:
- `type: "simple"` - Label + value only
- `type: "trend"` - Label + value + trend indicator (↑5%, ↓2%)
- `type: "detailed"` - Label + value + subtext + link

**Props / Content Slots**:
```typescript
{
  label: string,                     // "Total Bookings", "This Month Earnings"
  value: string,                     // "£450.00", "127", "45 in progress"
  trend?: {                          // Optional trend indicator
    direction: "up" | "down" | "neutral",
    percentage: number,              // 5.2
    label: string                    // "from last month"
  },
  subtext?: string,                  // "2 bookings awaiting completion"
  link?: {                           // Optional action link
    label: string,                   // "View Full Earnings"
    action: string                   // Route
  },
  icon?: string,                     // Optional icon (📅, 💰, 👥)
  status?: "ok" | "warning" | "error"  // Optional status indicator
}
```

**States**:
- Default: Standard card styling
- Loading: Skeleton placeholder (gray boxes)
- Link hover: Link underline appears
- Status indicator: Green/yellow/red dot or border accent

**Design Tokens**:
- Background: `$card-glass` (rgba(255,255,255,0.55))
- Border: `$card-border` (rgba(15,23,42,0.10))
- Border radius: `$radius-lg` (18px)
- Padding: `$space-24` (mobile), `$space-32` (desktop)
- Shadow: `$shadow-card-soft`
- Label font size: `$fs-base` (1.05rem)
- Label color: `$muted` (rgba(15,23,42,0.72))
- Label font weight: `$fw-normal` (400)
- Value font size: `$fs-2xl` (2.4rem) or `$fs-xl` (1.3rem) for smaller cards
- Value font weight: `$fw-bold` (600)
- Value color: `$txt` (#0f172a)
- Trend font size: `$fs-sm` (0.95rem)
- Trend up color: `#22c55e` (green)
- Trend down color: `#dc2626` (red)
- Trend neutral color: `$muted`
- Subtext font size: `$fs-sm` (0.95rem)
- Subtext color: `$muted`
- Link font size: `$fs-base` (1.05rem)
- Link color: `$link-bg` (rgb(119,141,67))

**Accessibility Requirements**:
- Card wrapper: `<article>` or `<section>`
- Label: H3 or `<dt>` (definition term)
- Value: `<dd>` (definition description) or emphasized text
- Trend: ARIA label "Up 5% from last month" (not just "↑5%")
- Link: Clear link text (not "click here")
- Status indicator: Text + color (not color alone)

**Figma Component Recommendation**: **Master Component** with type variants
- Property: `type` (simple, trend, detailed)
- Boolean: `show_icon` (with/without icon)
- Boolean: `show_trend` (with/without trend indicator)
- Boolean: `show_link` (with/without action link)

**Usage Notes**:
- Metrics real-time or cached (depends on data source)
- Trend calculated server-side (not client-side)
- Currency formatting: £1,234.56 (UK locale)
- Number formatting: 1,234 (thousands separator)
- Admin metrics update every 5 minutes (not real-time)

**Cross-References**:
- CG Dashboard wireframe: Lines 296-323 (earnings summary widget)
- Admin Dashboard wireframe: Lines 415-463 (platform health metrics), Lines 467-507 (user activity metrics)

---

### Component 5.8: Activity Feed Item

**Component ID**: `ACTIVITY-FEED-ITEM`
**Type**: Molecule
**Used In**: Admin Dashboard (recent activity log), future CR/CG dashboards (booking history)

**Purpose**: Display a single activity/event in a chronological list

**Variants**:
- `type: "booking"` - Booking created, accepted, completed
- `type: "verification"` - Verification submitted, approved, rejected
- `type: "safeguarding"` - Safeguarding report submitted, resolved
- `type: "admin"` - Admin action (approval, suspension, etc.)
- `type: "user"` - User registration, profile update

**Props / Content Slots**:
```typescript
{
  timestamp: string,                 // "Today, 14:32" or "2 hours ago"
  actor: {                           // Who performed the action
    name: string,                    // "Admin Sarah", "John Smith"
    role?: string,                   // "admin", "caregiver", "care_receiver"
    link?: string                    // Link to user profile
  },
  action: string,                    // "approved caregiver verification"
  subject?: {                        // What was acted upon
    label: string,                   // "John Smith (#4523)"
    link?: string                    // Link to subject detail
  },
  metadata?: string,                 // Additional context (e.g., "ID expired")
  icon?: string                      // Action type icon
}
```

**States**:
- Default: Single line or wrapped text
- Hover: Subject link underline appears
- Unread: Bold text or accent border (future feature)

**Design Tokens**:
- Padding: `$space-12` vertical, 0 horizontal
- Border bottom: 1px solid `$border-soft` (between items)
- Icon size: 20px
- Icon margin right: `$space-8`
- Timestamp font size: `$fs-xs` (0.99rem)
- Timestamp color: `$muted` (rgba(15,23,42,0.72))
- Timestamp font weight: `$fw-normal` (400)
- Actor/action font size: `$fs-base` (1.05rem)
- Actor font weight: `$fw-semibold` (500)
- Action font weight: `$fw-normal` (400)
- Subject link color: `$link-bg` (rgb(119,141,67))
- Metadata font size: `$fs-sm` (0.95rem)
- Metadata color: `$muted`

**Accessibility Requirements**:
- List item: `<li>` in `<ul>` or `<ol>`
- Timestamp: `<time>` element with `datetime` attribute
- Actor link: Clear link text (not just name if ambiguous)
- Subject link: Clear link text
- Screen reader: Entire item announced as single sentence

**Figma Component Recommendation**: **Master Component** with type variants
- Property: `type` (booking, verification, safeguarding, admin, user)
- Boolean: `show_icon` (with/without action icon)
- Auto-swap icon based on type

**Usage Notes**:
- Timestamp relative for recent items (<24h): "2 hours ago"
- Timestamp absolute for older items: "Feb 6, 14:32"
- Activity feed sorted descending (newest first)
- Admin activity log shows last 10 items, link to full audit log
- Truncate long action descriptions with "..."

**Cross-References**:
- Admin Dashboard wireframe: Lines 540-580 (recent activity log widget)

---

## 6. Interactive Components

### Component 6.1: Button

**Component ID**: `BUTTON`
**Type**: Molecule
**Used In**: All 47 screens

**Purpose**: Primary interaction element for actions (submit forms, navigate, trigger events)

**Variants**:
- `variant: "primary"` - Main CTAs (Find Caregiver, Save, Submit)
- `variant: "secondary"` - Secondary actions (Cancel, View Details, Message)
- `variant: "destructive"` - Dangerous actions (Delete, Cancel Booking, Reject)
- `variant: "ghost"` - Minimal actions (Close, Skip, Not Now)
- `variant: "link"` - Text-only button styled as link

**Props**:
```typescript
{
  label: string,                     // Button text
  icon?: string,                     // Optional icon (left or right)
  icon_position?: "left" | "right",  // Icon placement
  variant: "primary" | "secondary" | "destructive" | "ghost" | "link",
  size: "sm" | "md" | "lg",          // 36px, 44px, 56px height
  full_width?: boolean,              // 100% width (mobile)
  disabled?: boolean,                // Disabled state
  loading?: boolean,                 // Loading spinner
  action: string                     // Route or onClick handler
}
```

**States**:
- Default: Standard button styling
- Hover: Background darkens slightly, shadow increases
- Active/Pressed: Background darker, shadow decreases
- Focused: 3px border outline (`$focus-border`)
- Disabled: Opacity 0.5, cursor not-allowed
- Loading: Spinner replaces label, disabled

**Design Tokens**:

**Primary Button**:
- Background: `$secondary-colour` (#b0c47f)
- Text: `$txt` (#0f172a)
- Hover background: Darken by 10% (#9db36c)
- Shadow: `$shadow-cta` (0 8px 22px rgba(0,0,0,0.12))
- Shadow hover: `$shadow-btn` (0 16px 30px rgba(15,23,42,0.16))

**Secondary Button**:
- Background: `$primary-colour` (#ffffff)
- Border: 2px solid `$border-strong` (rgba(15,23,42,0.14))
- Text: `$txt` (#0f172a)
- Hover background: `$bg` (#f7f7f2)
- Shadow: `$shadow-xs` (0 2px 6px rgba(0,0,0,0.06))

**Destructive Button**:
- Background: `#dc2626` (red)
- Text: `#ffffff` (white)
- Hover background: `#b91c1c` (darker red)
- Shadow: Same as primary

**Ghost Button**:
- Background: Transparent
- Text: `$txt` (#0f172a)
- Hover background: `rgba(0,0,0,0.05)`
- No shadow

**Size Variants**:
- Small: Height 36px, padding `$space-12` horizontal, font size `$fs-sm` (0.95rem)
- Medium: Height 44px, padding `$space-16` horizontal, font size `$fs-base` (1.05rem)
- Large: Height 56px, padding `$space-24` horizontal, font size `$fs-lg` (1.22rem)

**Common Tokens**:
- Border radius: `$radius-sm` (12px)
- Font weight: `$fw-semibold` (500)
- Transition: `$transition-ui` (all 0.25s ease)

**Accessibility Requirements**:
- Touch target: 48x48px minimum (mobile)
- Focus indicator: 3px solid border, high contrast
- Disabled: `aria-disabled="true"`, cursor not-allowed
- Loading: `aria-busy="true"`, announces "Loading" to screen reader
- Icon-only buttons: `aria-label` required (e.g., "Close")
- Type attribute: `type="button"` (not submit unless in form)

**Figma Component Recommendation**: **Master Component** with variant properties
- Property: `variant` (primary, secondary, destructive, ghost, link)
- Property: `size` (sm, md, lg)
- Boolean: `has_icon_left` (show left icon layer)
- Boolean: `has_icon_right` (show right icon layer)
- Boolean: `loading` (swap label with spinner)
- Boolean: `disabled` (apply opacity)

**Usage Notes**:
- Primary button: Maximum 1 per screen/section (hierarchy)
- Secondary buttons: Multiple allowed
- Destructive actions: Always require confirmation modal
- Full-width on mobile for primary CTAs (better touch target)
- Loading state prevents double-click submissions

**Cross-References**:
- CR Dashboard: Lines 122 ("Find a Caregiver"), 220 ("View Details"), 248 ("Cancel Request")
- CG Dashboard: Lines 397 ("Manage Availability"), 1386 ("Review Queue")
- Admin Dashboard: Multiple CTAs throughout

---

### Component 6.2: Link

**Component ID**: `LINK`
**Type**: Atom
**Used In**: All screens (navigation, in-content links, card links)

**Purpose**: Navigate to another page or section

**Variants**:
- `type: "inline"` - Within paragraph text (underlined)
- `type: "standalone"` - Standalone link (no underline until hover)
- `type: "nav"` - Navigation menu link
- `type: "card"` - Entire card clickable

**Props**:
```typescript
{
  label: string,                     // Link text
  href: string,                      // Destination URL
  external?: boolean,                // Opens in new tab
  icon?: string,                     // Optional icon (e.g., external link arrow)
  variant: "inline" | "standalone" | "nav" | "card"
}
```

**States**:
- Default: Styled based on variant
- Hover: Underline appears (or darkens if always underlined)
- Visited: Slightly darker color (optional)
- Focused: 3px border outline
- Active: Color darkens

**Design Tokens**:
- Color: `$link-bg` (rgb(119,141,67))
- Hover color: Darken by 15%
- Underline: 1px solid, offset 2px
- Font size: Inherits from parent (inline) or `$fs-base` (standalone)
- Font weight: `$fw-normal` (400) inline, `$fw-semibold` (500) standalone
- Transition: `$transition-ui`

**Accessibility Requirements**:
- Clear link text (not "click here")
- External links: `rel="noopener noreferrer"`, icon or text indicates new tab
- Keyboard: Tab to focus, Enter to activate
- Focus indicator: 3px border, high contrast
- Visited color: Optional but recommended for long content pages

**Figma Component Recommendation**: **Text Style** with variants (not component)
- Define as text styles: Link Inline, Link Standalone, Link Nav

**Usage Notes**:
- Inline links: Underlined by default (web convention)
- Standalone links: No underline until hover (cleaner look)
- Card links: Entire card wrapper clickable, no visible underline
- External links: Icon or text "(opens in new tab)" for clarity

---

### Component 6.3: Icon Button

**Component ID**: `ICON-BUTTON`
**Type**: Atom
**Used In**: Navigation (hamburger menu), modals (close X), alerts (dismiss), user menu (dropdown trigger)

**Purpose**: Button with icon only, no text label

**Variants**:
- `type: "default"` - Standard icon button
- `type: "close"` - X button (modals, alerts)
- `type: "menu"` - Hamburger menu (mobile navigation)
- `type: "notification"` - Bell icon (with badge count)

**Props**:
```typescript
{
  icon: string,                      // Icon component or emoji
  aria_label: string,                // Required (no visible text)
  variant: "default" | "close" | "menu" | "notification",
  size: "sm" | "md" | "lg",          // 32px, 40px, 48px
  badge?: number                     // Count badge (notification only)
}
```

**States**:
- Default: Icon visible
- Hover: Background appears (subtle gray)
- Active: Background darker
- Focused: 3px border outline
- Disabled: Opacity 0.5

**Design Tokens**:
- Size sm: 32x32px
- Size md: 40x40px
- Size lg: 48x48px (mobile touch target)
- Icon size: 20px (sm), 24px (md), 28px (lg)
- Border radius: `$radius-sm` (12px)
- Hover background: `rgba(0,0,0,0.05)`
- Active background: `rgba(0,0,0,0.1)`
- Transition: `$transition-ui`

**Accessibility Requirements**:
- ARIA label: Required (describes action, e.g., "Close modal")
- Touch target: 48x48px minimum (mobile)
- Focus indicator: 3px border, high contrast
- Keyboard: Tab to focus, Enter/Space to activate

**Figma Component Recommendation**: **Master Component** with variant property
- Property: `variant` (default, close, menu, notification)
- Property: `size` (sm, md, lg)
- Auto-swap icon based on variant

**Usage Notes**:
- Always requires ARIA label (no visible text)
- Notification badge: Red dot if count >0, number if count ≤99, "99+" if >99
- Close buttons: Consistent X icon across all modals/alerts
- Hamburger menu: Three horizontal lines icon (☰)

---

### Component 6.4: Toggle Switch

**Component ID**: `TOGGLE-SWITCH`
**Type**: Molecule
**Used In**: CG Dashboard (profile visibility toggle), settings screens, future preference toggles

**Purpose**: Binary on/off control for settings

**Variants**:
- `size: "sm"` - 32px wide (compact settings)
- `size: "md"` - 40px wide (standard)
- `size: "lg"` - 48px wide (prominent toggles)

**Props**:
```typescript
{
  label: string,                     // "Profile Visibility"
  description?: string,              // "Your profile is visible in search results"
  checked: boolean,                  // On/off state
  disabled?: boolean,                // Cannot toggle
  size: "sm" | "md" | "lg",
  onChange: Function                 // Callback when toggled
}
```

**States**:
- Off: Gray track, white knob left
- On: Green track, white knob right
- Disabled: Gray track, reduced opacity
- Focused: 3px border outline around track

**Design Tokens**:
- Track width sm: 32px, height 18px
- Track width md: 40px, height 22px
- Track width lg: 48px, height 26px
- Knob size: Track height - 4px (white circle)
- Track off color: `#d1d5db` (gray)
- Track on color: `$secondary-colour` (#b0c47f) or `#22c55e` (green)
- Track border radius: `$radius-pill` (999px)
- Knob shadow: `$shadow-xs`
- Transition: `$transition-ui` (0.25s ease)

**Accessibility Requirements**:
- Role: `role="switch"`, `aria-checked` (true/false)
- Label: Associated with toggle via `<label>` or `aria-label`
- Description: `aria-describedby` links to description text
- Keyboard: Tab to focus, Space to toggle
- Focus indicator: 3px border around track
- Disabled: `aria-disabled="true"`, cannot interact

**Figma Component Recommendation**: **Master Component** with boolean property
- Property: `checked` (boolean, swaps knob position and track color)
- Property: `size` (sm, md, lg)
- Property: `disabled` (boolean, applies opacity)

**Usage Notes**:
- Toggle state persists (saved to server/localStorage)
- Label placement: Left of toggle (desktop), above toggle (mobile)
- Instant feedback: No "Save" button needed (auto-saves on toggle)
- Disabled state: Tooltip explains why disabled (e.g., "Complete profile to enable")

**Cross-References**:
- CG Dashboard wireframe: Lines 374-389 (profile visibility toggle)

---

### Component 6.5: Dropdown Menu

**Component ID**: `DROPDOWN-MENU`
**Type**: Organism
**Used In**: Navigation (user menu), filters (admin activity feed), future dropdowns

**Purpose**: Display a list of options in a popup menu

**Variants**:
- `type: "user-menu"` - User avatar dropdown (Settings, Logout)
- `type: "filter"` - Filter options (All, My Actions, etc.)
- `type: "actions"` - Contextual actions menu

**Props**:
```typescript
{
  trigger: {                         // Element that opens dropdown
    label?: string,                  // Text label
    icon?: string,                   // Icon component
    avatar?: string                  // User avatar (user menu only)
  },
  items: Array<{
    label: string,                   // Menu item text
    icon?: string,                   // Optional icon
    action: string,                  // Route or onClick
    divider_after?: boolean,         // Divider line after this item
    destructive?: boolean            // Red text (e.g., Logout, Delete)
  }>,
  position: "left" | "right" | "center",  // Dropdown alignment
  type: "user-menu" | "filter" | "actions"
}
```

**States**:
- Closed: Dropdown hidden
- Open: Dropdown visible below trigger
- Item hover: Background gray
- Item focused: Background gray, focus outline
- Trigger focused: 3px border outline

**Design Tokens**:
- Background: `$primary-colour` (#ffffff)
- Border: 1px solid `$border-soft`
- Border radius: `$radius-sm` (12px)
- Shadow: `$shadow-elev` (0 4px 12px rgba(0,0,0,0.12))
- Padding: `$space-8` vertical
- Item padding: `$space-12` vertical, `$space-16` horizontal
- Item hover background: `$bg` (#f7f7f2)
- Item font size: `$fs-base` (1.05rem)
- Item height: 40px minimum (touch target)
- Divider: 1px solid `$border-soft`, margin `$space-8` vertical
- Destructive text color: `#dc2626` (red)

**Accessibility Requirements**:
- Trigger button: `aria-haspopup="true"`, `aria-expanded` (true when open)
- Dropdown: `role="menu"`, `aria-labelledby` (trigger ID)
- Menu items: `role="menuitem"`
- Keyboard: Arrow keys to navigate items, Enter to select, Escape to close
- Focus trap: Focus stays within dropdown when open
- Focus return: Returns to trigger when closed

**Figma Component Recommendation**: **Master Component** with open/closed variants
- Property: `open` (boolean, shows/hides dropdown layer)
- Property: `type` (user-menu, filter, actions)
- Component variant: Item (with icon, without icon, divider, destructive)

**Usage Notes**:
- Click outside dropdown to close
- Escape key to close
- Selecting item closes dropdown (unless multi-select filter)
- Dropdown positioning: Auto-adjust if too close to edge of screen
- User menu: Avatar + name on left, dropdown arrow on right

**Cross-References**:
- CR Dashboard wireframe: Lines 85-93 (user menu dropdown)
- Admin Dashboard wireframe: Lines 554-561 (activity filter dropdown)

---

### Component 6.6: Modal / Dialog

**Component ID**: `MODAL`
**Type**: Organism
**Used In**: Confirmations (cancel booking, delete), forms (edit profile), alerts, image lightbox

**Purpose**: Display content in an overlay, requiring user interaction to dismiss

**Variants**:
- `type: "confirmation"` - Confirm/cancel actions (e.g., "Cancel Booking?")
- `type: "form"` - Modal with form (e.g., "Edit Profile")
- `type: "alert"` - Alert message (e.g., "Payment Failed")
- `type: "lightbox"` - Image or media viewer

**Props**:
```typescript
{
  title: string,                     // Modal heading
  content: string | ReactNode,       // Body content
  actions: Array<{                   // Footer buttons
    label: string,                   // Button text
    variant: "primary" | "secondary" | "destructive",
    action: Function                 // onClick handler
  }>,
  type: "confirmation" | "form" | "alert" | "lightbox",
  size: "sm" | "md" | "lg",          // 400px, 600px, 800px width
  dismissible: boolean,              // Can close via X or clicking overlay
  onClose: Function                  // Callback when closed
}
```

**States**:
- Opening: Fade in + scale animation (200ms)
- Open: Modal visible, overlay visible, background blurred/darkened
- Closing: Fade out + scale animation (200ms)
- Closed: Modal hidden

**Design Tokens**:
- Overlay background: `rgba(0,0,0,0.5)` (darkened)
- Modal background: `$primary-colour` (#ffffff)
- Modal border radius: `$radius-xl` (24px)
- Modal shadow: `$shadow-card` (0 14px 40px rgba(15,23,42,0.10))
- Modal padding: `$space-32`
- Size sm: 400px max width
- Size md: 600px max width
- Size lg: 800px max width
- Title font size: `$fs-xl` (1.3rem)
- Title font weight: `$fw-bold` (600)
- Content font size: `$fs-base` (1.05rem)
- Footer margin top: `$space-24`
- Footer button spacing: `$space-12` between buttons

**Accessibility Requirements**:
- Role: `role="dialog"`, `aria-modal="true"`
- Heading: `aria-labelledby` (title ID)
- Description: `aria-describedby` (content ID)
- Focus trap: Tab cycles through modal elements only
- Initial focus: First focusable element (usually close X or first button)
- Focus return: Returns to trigger element when closed
- Keyboard: Escape to close (if dismissible)
- Overlay click: Closes modal (if dismissible)

**Figma Component Recommendation**: **Master Component** with type variants
- Property: `type` (confirmation, form, alert, lightbox)
- Property: `size` (sm, md, lg)
- Layer: Overlay (50% black, blurred background)
- Layer: Modal card (white background, shadow)
- Boolean: `dismissible` (shows/hides close X button)

**Usage Notes**:
- Destructive confirmations: Always use destructive button variant + confirmation text
- Form modals: Submit button primary, cancel button secondary
- Alert modals: Single "OK" button (primary)
- Overlay blur: Use CSS `backdrop-filter: blur(4px)` for background
- Animation: Smooth fade + scale (not jarring)

---

## 7. Form Components

### Component 7.1: Input Field

**Component ID**: `INPUT-FIELD`
**Type**: Molecule
**Used In**: Admin search bar, future form screens (login, registration, profile edit)

**Purpose**: Single-line text input for forms

**Variants**:
- `type: "text"` - Standard text input
- `type: "email"` - Email input (validation)
- `type: "password"` - Password input (hidden characters)
- `type: "search"` - Search input (with search icon, clear X)
- `type: "number"` - Number input (optional spinners)
- `type: "tel"` - Phone number input

**Props**:
```typescript
{
  label: string,                     // "Email Address", "Search users..."
  placeholder?: string,              // Placeholder text
  value: string,                     // Current input value
  type: "text" | "email" | "password" | "search" | "number" | "tel",
  required?: boolean,                // Required field indicator
  disabled?: boolean,                // Disabled state
  error?: string,                    // Error message
  help_text?: string,                // Help text below field
  icon?: string,                     // Icon (left or right)
  clearable?: boolean,               // Show clear X button (search)
  onChange: Function                 // Input change handler
}
```

**States**:
- Empty: Placeholder visible
- Filled: Value displayed
- Focused: Border color changes, focus ring appears
- Error: Red border, error message below
- Disabled: Gray background, cannot type

**Design Tokens**:
- Height: 44px (md), 48px (lg for mobile touch targets)
- Padding: `$space-12` vertical, `$space-16` horizontal
- Border: 1px solid `$form-border` (rgba(15,23,42,0.12))
- Border radius: `$radius-sm` (12px)
- Background: `$primary-colour` (#ffffff)
- Font size: `$fs-base` (1.05rem)
- Font weight: `$fw-normal` (400)
- Label font size: `$fs-sm` (0.95rem)
- Label font weight: `$fw-semibold` (500)
- Label margin bottom: `$space-8`
- Placeholder color: `$muted` (rgba(15,23,42,0.72))
- Focus border: 2px solid `$focus-border` (rgba(31,171,31,0.55))
- Focus ring: `$focus-ring` (rgba(31,171,31,0.14))
- Error border: 2px solid `$error-border` (rgba(239,68,68,0.55))
- Error ring: `$error-ring` (rgba(239,68,68,0.12))
- Error text color: `$error-text` (rgba(185,122,87,0.95))
- Disabled background: `$bg` (#f7f7f2)

**Accessibility Requirements**:
- Label: Associated with input via `<label for="input-id">`
- Required: `aria-required="true"`, asterisk (*) in label
- Error: `aria-invalid="true"`, `aria-describedby` (error message ID)
- Help text: `aria-describedby` (help text ID)
- Disabled: `disabled` attribute, `aria-disabled="true"`
- Placeholder: Not a replacement for label (label always visible)

**Figma Component Recommendation**: **Master Component** with state variants
- Property: `state` (empty, filled, focused, error, disabled)
- Boolean: `required` (shows asterisk)
- Boolean: `has_icon` (shows icon layer)
- Boolean: `has_error` (shows error message)

**Usage Notes**:
- Always include visible label (not just placeholder)
- Error messages: Specific, helpful (not "Invalid input" but "Email must include @")
- Help text: Appears below input (e.g., "We'll never share your email")
- Clear X button: Only for search inputs, clears entire field
- Number inputs: No spinners on mobile (better UX)

---

### Component 7.2: Text Area

**Component ID**: `TEXTAREA`
**Type**: Molecule
**Used In**: Booking request form (special requests), admin notes, message compose

**Purpose**: Multi-line text input for longer content

**Props**:
```typescript
{
  label: string,
  placeholder?: string,
  value: string,
  rows?: number,                     // Initial height (default 4)
  max_length?: number,               // Character limit
  required?: boolean,
  disabled?: boolean,
  error?: string,
  help_text?: string,
  resizable?: boolean,               // User can resize vertically
  onChange: Function
}
```

**Design Tokens**:
- Padding: `$space-12`
- Border: Same as input field
- Font size: `$fs-base` (1.05rem)
- Line height: `$lh-body` (1.6)
- Min height: 100px (4 rows)
- Max height: 400px (if resizable)

**Accessibility Requirements**:
- Same as input field
- Character counter: `aria-live="polite"` announces remaining characters

**Figma Component Recommendation**: **Component** with error variant

---

### Component 7.3: Checkbox

**Component ID**: `CHECKBOX`
**Type**: Atom
**Used In**: Registration forms (terms acceptance), settings (email preferences), filters

**Purpose**: Single on/off option

**Props**:
```typescript
{
  label: string,                     // "I agree to the Terms of Service"
  checked: boolean,
  disabled?: boolean,
  required?: boolean,
  onChange: Function
}
```

**States**:
- Unchecked: Empty box
- Checked: Checkmark icon inside box
- Focused: Focus ring around box
- Disabled: Gray box, cannot check

**Design Tokens**:
- Box size: 20px × 20px (desktop), 24px × 24px (mobile)
- Border: 2px solid `$form-border`
- Border radius: `$radius-sm` (12px) for rounded checkbox (or 4px for square)
- Checked background: `$secondary-colour` (#b0c47f) or `#22c55e` (green)
- Checked icon: White checkmark (✓)
- Label font size: `$fs-base` (1.05rem)
- Label margin left: `$space-8`

**Accessibility Requirements**:
- Checkbox input: `type="checkbox"`, `aria-checked`
- Label: Associated via `<label for="checkbox-id">`
- Required: `aria-required="true"`
- Keyboard: Tab to focus, Space to toggle

**Figma Component Recommendation**: **Component** with checked boolean

---

## 8. Data Display Components

### Component 8.1: Progress Bar

**Component ID**: `PROGRESS-BAR`
**Type**: Molecule
**Used In**: CG Dashboard (profile completion), file uploads, multi-step forms

**Purpose**: Display completion percentage visually

**Props**:
```typescript
{
  percentage: number,                // 0-100
  label?: string,                    // "85% complete"
  show_label: boolean,               // Display percentage text
  color?: string,                    // Bar color (default green)
  height?: "sm" | "md" | "lg"        // 8px, 12px, 16px
}
```

**States**:
- 0%: Empty bar
- 1-99%: Partially filled
- 100%: Fully filled, color green

**Design Tokens**:
- Track background: `#e5e7eb` (light gray)
- Bar background: `$secondary-colour` (#b0c47f) or `#22c55e` (green)
- 100% bar color: `#22c55e` (green)
- Border radius: `$radius-pill` (999px)
- Height sm: 8px
- Height md: 12px
- Height lg: 16px
- Label font size: `$fs-sm` (0.95rem)
- Label margin bottom: `$space-4`

**Accessibility Requirements**:
- Role: `role="progressbar"`
- ARIA attributes: `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- Label: Visible or `aria-label` if label hidden

**Figma Component Recommendation**: **Component** with percentage property

**Cross-References**:
- CG Dashboard wireframe: Lines 329-342 (profile completion progress bar)

---

### Component 8.2: Badge / Pill (Count Badge)

**Component ID**: `BADGE-COUNT`
**Type**: Atom
**Used In**: Navigation (unread messages count), notifications, admin counts

**Purpose**: Display small count or label

**Props**:
```typescript
{
  count: number,                     // 1-99, "99+" if >99
  variant: "default" | "primary" | "error"
}
```

**Design Tokens**:
- Size: 20px diameter (if single digit), auto-width if 2+ digits
- Padding: `$space-4` horizontal (if 2+ digits)
- Background default: `#6b7280` (gray)
- Background primary: `$secondary-colour` (#b0c47f)
- Background error: `#dc2626` (red)
- Text: `#ffffff` (white)
- Font size: `$fs-xxs` (0.86rem)
- Font weight: `$fw-bold` (600)
- Border radius: `$radius-pill` (999px)

**Accessibility Requirements**:
- Screen reader: "3 unread messages" (not just "3")
- If decorative: `aria-hidden="true"`

**Figma Component Recommendation**: **Component** with variant property

---

### Component 8.3: Tag / Label

**Component ID**: `TAG`
**Type**: Atom
**Used In**: Service types on booking cards, filters, categories

**Purpose**: Label content with category or attribute

**Props**:
```typescript
{
  label: string,                     // "Companionship", "Light Housework"
  color?: string,                    // Background color
  removable?: boolean,               // Show X to remove (filter chips)
  onRemove?: Function
}
```

**Design Tokens**:
- Padding: `$space-8` horizontal, `$space-4` vertical
- Background: `$tag-glass` (rgba(255,255,255,0.58)) or color-coded
- Border: 1px solid `$border-soft`
- Border radius: `$radius-sm` (12px)
- Font size: `$fs-xs` (0.99rem)
- Font weight: `$fw-normal` (400)

**Accessibility Requirements**:
- Removable tags: Remove button has `aria-label="Remove [label]"`

**Figma Component Recommendation**: **Component** with removable boolean

---

### Component 8.4: List Item

**Component ID**: `LIST-ITEM`
**Type**: Molecule
**Used In**: Activity feed, settings lists, navigation lists

**Purpose**: Single item in a vertical list

**Props**:
```typescript
{
  title: string,
  description?: string,
  icon?: string,
  action?: {                         // Right-side action
    label: string,
    action: Function
  },
  divider?: boolean                  // Show divider line below
}
```

**Design Tokens**:
- Padding: `$space-12` vertical, `$space-16` horizontal
- Border bottom: 1px solid `$border-soft` (if divider true)
- Hover background: `$bg` (#f7f7f2)

**Figma Component Recommendation**: **Component** with divider boolean

---

### Component 8.5: Table Row (Admin)

**Component ID**: `TABLE-ROW`
**Type**: Molecule
**Used In**: Admin dashboard (verification queue table, user lists)

**Purpose**: Single row in data table

**Props**:
```typescript
{
  cells: Array<string | ReactNode>,  // Table cell content
  clickable?: boolean,               // Entire row clickable
  onClick?: Function,
  striped?: boolean                  // Alternate row background
}
```

**Design Tokens**:
- Padding: `$space-12` vertical, `$space-16` horizontal (per cell)
- Border bottom: 1px solid `$border-soft`
- Striped background: `$bg` (#f7f7f2) every other row
- Hover background: `rgba(0,0,0,0.02)` if clickable

**Accessibility Requirements**:
- Table: `<table>` with `<thead>`, `<tbody>`
- Row: `<tr>`
- Cells: `<th>` (header), `<td>` (data)
- If clickable: `role="button"`, keyboard accessible

**Figma Component Recommendation**: **Component** with striped boolean

---

## 9. Design Token Mapping

### 9.1 Color Tokens

| Component | Property | Token | Value |
|-----------|----------|-------|-------|
| **Navigation Header** | Background | `$primary-colour` | #ffffff |
| **Navigation Header** | Text | `$txt` | #0f172a |
| **Navigation Header** | Border | `$border-soft` | rgba(0,0,0,0.06) |
| **Button Primary** | Background | `$secondary-colour` | #b0c47f |
| **Button Primary** | Text | `$txt` | #0f172a |
| **Button Destructive** | Background | Custom | #dc2626 |
| **Booking Card** | Background | `$card-glass` | rgba(255,255,255,0.55) |
| **Booking Card** | Border | `$card-border` | rgba(15,23,42,0.10) |
| **Status Badge Confirmed** | Background | Custom | #dbeafe |
| **Status Badge Confirmed** | Text | Custom | #1e40af |
| **Countdown Timer OK** | Text | Custom | #16a34a |
| **Countdown Timer Urgent** | Text | Custom | #dc2626 |
| **Alert Banner Warning** | Background | Custom | #fef3c7 |
| **Alert Banner Warning** | Border | Custom | #f59e0b |
| **Empty State** | Text | `$muted` | rgba(15,23,42,0.72) |
| **Footer** | Text | `$muted` | rgba(15,23,42,0.72) |
| **Page Background** | Background | `$bg` | #f7f7f2 |

### 9.2 Typography Tokens

| Component | Element | Font Size Token | Font Weight Token |
|-----------|---------|----------------|-------------------|
| **Navigation** | Nav Link | `$fs-base` (1.05rem) | `$fw-normal` (400) |
| **Booking Card** | Name | `$fs-lg` (1.22rem) | `$fw-bold` (600) |
| **Booking Card** | DateTime | `$fs-base` (1.05rem) | `$fw-normal` (400) |
| **Widget Container** | Title | `$fs-h2-fluid` | `$fw-bold` (600) |
| **Button Primary** | Label | `$fs-base` (1.05rem) | `$fw-semibold` (500) |
| **Status Badge** | Label | `$fs-xs` (0.99rem) | `$fw-semibold` (500) |
| **Empty State** | Heading | `$fs-xl` (1.3rem) | `$fw-bold` (600) |
| **Alert Banner** | Title | `$fs-lg` (1.22rem) | `$fw-bold` (600) |
| **Metric Card** | Value | `$fs-2xl` (2.4rem) | `$fw-bold` (600) |
| **Footer** | Link | `$fs-sm` (0.95rem) | `$fw-normal` (400) |

### 9.3 Spacing Tokens

| Component | Property | Token | Value |
|-----------|----------|-------|-------|
| **Widget Container** | Padding (mobile) | `$space-24` | 24px |
| **Widget Container** | Padding (desktop) | `$space-32` | 32px |
| **Booking Card** | Padding (mobile) | `$space-24` | 24px |
| **Booking Card** | Padding (desktop) | `$space-32` | 32px |
| **Button** | Padding horizontal (md) | `$space-16` | 16px |
| **Content Grid** | Gap | `$gap-grid-fluid` | clamp(26px, 3.4vw, 52px) |
| **Alert Banner** | Padding vertical | `$space-16` | 16px |
| **Alert Banner** | Padding horizontal | `$space-24` | 24px |
| **List Item** | Padding vertical | `$space-12` | 12px |

### 9.4 Radius Tokens

| Component | Property | Token | Value |
|-----------|----------|-------|-------|
| **Booking Card** | Border radius | `$radius-lg` | 18px |
| **Widget Container** | Border radius | `$radius-lg` | 18px |
| **Button** | Border radius | `$radius-sm` | 12px |
| **Status Badge** | Border radius | `$radius-pill` | 999px |
| **Avatar** | Border radius | `$radius-pill` | 999px |
| **Modal** | Border radius | `$radius-xl` | 24px |
| **Input Field** | Border radius | `$radius-sm` | 12px |

### 9.5 Shadow Tokens

| Component | Property | Token | Value |
|-----------|----------|-------|-------|
| **Booking Card** | Shadow (default) | `$shadow-card-soft` | 0 10px 26px rgba(15,23,42,0.05) |
| **Booking Card** | Shadow (hover) | `$shadow-card` | 0 14px 40px rgba(15,23,42,0.10) |
| **Button Primary** | Shadow | `$shadow-cta` | 0 8px 22px rgba(0,0,0,0.12) |
| **Button Primary** | Shadow (hover) | `$shadow-btn` | 0 16px 30px rgba(15,23,42,0.16) |
| **Modal** | Shadow | `$shadow-card` | 0 14px 40px rgba(15,23,42,0.10) |
| **Dropdown Menu** | Shadow | `$shadow-elev` | 0 4px 12px rgba(0,0,0,0.12) |

---

## 10. Figma Component Recommendations

### 10.1 Master Components vs Instances

**Master Components** (Create once, reuse everywhere):
1. **Button** - With variant properties (primary/secondary/destructive), size properties
2. **Status Badge** - With status property (auto-swaps colors)
3. **Navigation Header** - With role property (CR/CG/Admin)
4. **Booking Card** - With type property (pending/upcoming/in-progress)
5. **Alert Banner** - With severity property (info/warning/error)
6. **Empty State** - With type property (no-bookings/no-requests)
7. **Metric Card** - With type property (simple/trend/detailed)
8. **User Avatar** - With size property, has_photo boolean
9. **Widget Container** - With header/footer variants
10. **Modal** - With type property (confirmation/form/alert)

**Instances** (Use master component, override content):
- All dashboard screens use instances of master components
- Override text, images, data in each instance
- Do NOT detach from master (maintain design system link)

### 10.2 Component Organization Strategy

**Figma File Structure**:
```
iCare Design System
├── 📄 Cover Page
├── 📁 Design Tokens
│   ├── Colors (styles)
│   ├── Typography (text styles)
│   ├── Spacing (variables)
│   ├── Radii (variables)
│   └── Shadows (effects)
├── 📁 Components
│   ├── Atoms
│   │   ├── Icon
│   │   ├── Badge
│   │   ├── Avatar
│   │   ├── Divider
│   │   └── Spinner
│   ├── Molecules
│   │   ├── Button
│   │   ├── Status Badge
│   │   ├── Countdown Timer
│   │   ├── Input Field
│   │   ├── Toggle Switch
│   │   └── Link
│   └── Organisms
│       ├── Booking Card
│       ├── Navigation Header
│       ├── Alert Banner
│       ├── Empty State
│       ├── Metric Card
│       ├── Activity Feed Item
│       ├── Modal
│       └── Dropdown Menu
├── 📁 Templates
│   ├── Page Container
│   ├── Widget Container
│   ├── Content Grid
│   └── Two-Column Layout
└── 📁 Screens
    ├── Dashboards
    │   ├── Care Receiver Dashboard
    │   ├── Caregiver Dashboard
    │   └── Admin Dashboard
    └── [Other screens...]
```

### 10.3 Component Naming Convention

**Format**: `[Category]/[Component Name]/[Variant]`

**Examples**:
- `Atoms/Avatar/Large`
- `Molecules/Button/Primary`
- `Organisms/Booking Card/Pending Request CR`
- `Templates/Widget Container/With Header Action`

### 10.4 Variant Properties Best Practices

**Use Variant Properties for**:
- Different visual styles (primary/secondary button)
- Different sizes (sm/md/lg)
- Different states (default/hover/focused/disabled)
- Different content types (booking statuses, alert severities)

**Use Boolean Properties for**:
- Show/hide elements (has_icon, show_cta, dismissible)
- State toggles (checked, disabled, loading)

**Use Text Properties for**:
- Labels, headings, body text (allows content override)

**Use Instance Swap for**:
- Icons (swap between different icon components)
- Avatars (swap between photo and initials)

---

## 11. Cross-Dashboard Component Usage Matrix

### 11.1 Component Usage by Dashboard

| Component | SCR-CR-001 (CR) | SCR-CG-001 (CG) | SCR-ADM-001 (Admin) | Other Screens |
|-----------|-----------------|-----------------|---------------------|---------------|
| **Navigation Header** | ✅ CR variant | ✅ CG variant | ✅ Admin variant | ✅ All authenticated screens |
| **Footer** | ✅ | ✅ | ✅ | ✅ All screens |
| **Booking Card** | ✅ Pending + Upcoming | ✅ Pending + Upcoming | ❌ (uses table) | ✅ Search, Booking Detail |
| **Status Badge** | ✅ Confirmed, In Progress | ✅ All booking statuses | ✅ SLA statuses, verification statuses | ✅ All booking screens |
| **Countdown Timer** | ✅ Pending requests | ✅ Pending requests | ✅ SLA monitoring | ❌ |
| **Alert Banner** | ✅ Payment method warning | ✅ Verification pending | ✅ Safeguarding alerts | ✅ Error states across site |
| **Empty State** | ✅ No bookings, No requests | ✅ No requests, No bookings | ✅ No verifications, No reports | ✅ All list/grid views |
| **User Avatar** | ✅ Header, booking cards | ✅ Header, booking cards | ✅ Header | ✅ Profile screens |
| **Widget Container** | ✅ All widgets | ✅ All widgets | ✅ All widgets | ❌ |
| **Button** | ✅ Primary CTAs, actions | ✅ Primary CTAs, actions | ✅ Primary CTAs, actions | ✅ All screens |
| **Metric Card** | ❌ | ✅ Earnings summary | ✅ Platform health, user activity | ❌ |
| **Activity Feed Item** | ✅ Recent activity | ❌ | ✅ Recent activity log | ❌ |
| **Modal** | ❌ (future: cancel confirmation) | ❌ (future: decline request) | ❌ (future: approve/reject) | ✅ Confirmations, forms |
| **Progress Bar** | ❌ | ✅ Profile completion | ❌ | ✅ File uploads, multi-step forms |
| **Toggle Switch** | ❌ | ✅ Profile visibility | ❌ | ✅ Settings screens |
| **Dropdown Menu** | ✅ User menu | ✅ User menu | ✅ User menu, filter dropdown | ✅ Filters, actions |

### 11.2 Component Reuse Across All 47 Screens

**Universal Components** (Used in 30+ screens):
1. Navigation Header (all authenticated screens)
2. Footer (all screens)
3. Button (all screens)
4. Alert Banner (error states, warnings across site)
5. Empty State (all list/grid views)

**High Reuse Components** (Used in 15-29 screens):
6. Status Badge (all booking-related screens, verification screens)
7. User Avatar (profile screens, booking screens, search results)
8. Modal (confirmations, forms across site)
9. Input Field (all form screens)
10. Booking Card (dashboards, search, booking lists)

**Medium Reuse Components** (Used in 5-14 screens):
11. Countdown Timer (dashboards, booking request screens)
12. Metric Card (dashboards, analytics screens)
13. Widget Container (dashboards, profile screens)
14. Toggle Switch (settings screens)
15. Dropdown Menu (filters, actions across site)

**Low Reuse Components** (Used in 1-4 screens):
16. Activity Feed Item (admin dashboard, user activity screens)
17. Progress Bar (profile completion, file uploads)
18. Table Row (admin screens only)

---

## 12. Open Questions & Design Decisions

### OQ-001: View Earnings Navigation Ambiguity

**Issue**: Conflicting navigation targets for "View Earnings" link/button in Caregiver Dashboard.

**Source Documents**:
- **FIGMA_PRODUCTION_PLAN.md** (line 102): States "View Full Earnings" → SCR-CG-015 (Earnings Dashboard)
- **tier1-route-map.md** (line 177): SCR-CG-020 (Payout Setup) at `/caregiver/earnings/setup` (R0)
- **tier1-route-map.md** (line 211): SCR-CG-015 (Earnings Dashboard) at `/caregiver/earnings` (R1)

**Analysis**:
- SCR-CG-015 is the primary earnings dashboard (R1 feature)
- SCR-CG-020 is the payout setup flow (R0 feature, prerequisite)
- Navigation should go to SCR-CG-015 by default
- If caregiver has not set up payouts, SCR-CG-015 should display a banner linking to SCR-CG-020

**Recommended Resolution**:
- **"View Full Earnings" link** → `/caregiver/earnings` (SCR-CG-015)
- **"View Earnings" quick action button** → `/caregiver/earnings` (same destination)
- **If payouts not configured**: SCR-CG-015 displays alert banner "Set up payouts to receive earnings" with link to `/caregiver/earnings/setup` (SCR-CG-020)

**Impact on Component Design**:
- Earnings Summary Widget: Link destination = `/caregiver/earnings`
- Quick Actions Section: "View Earnings" button destination = `/caregiver/earnings`
- No component changes needed if this resolution is approved

**Status**: **PENDING PRODUCT TEAM APPROVAL**

**Action Required**: Product team to confirm navigation hierarchy and update route map if needed.

---

### OQ-002: Service Type Icons (Emoji vs Custom Icons)

**Issue**: Should service types on booking cards use emoji (💬, 🏠, 🛒, 🍳) or custom icon components?

**Current Usage in Wireframes**:
- CR Dashboard: Uses emoji in wireframes (💬 Companionship, 🏠 Light housework)
- CG Dashboard: Uses emoji in wireframes (💬, 🏠, 🛒, 🍳)

**Options**:
1. **Emoji** (e.g., 💬, 🏠): Simple, no design work needed, accessibility concerns, inconsistent across platforms
2. **Custom Icons** (SVG): Consistent across platforms, professional, requires design work, better accessibility

**Accessibility Concerns with Emoji**:
- Screen readers may not announce emoji consistently
- Emoji appearance varies by OS (iOS vs Android vs Windows)
- Some elderly users may not recognize emoji meanings

**Recommended Resolution**:
- **Phase 1 (R0 launch)**: Use emoji for speed (acceptable for MVP)
- **Phase 2 (R1+)**: Replace with custom icon set designed in Figma
- **Accessibility fix**: Add text labels adjacent to icons/emoji (not relying on icon alone)

**Impact on Component Design**:
- Booking Card component: Icon slot can accept emoji string OR icon component
- Future-proof design allows easy swap from emoji to custom icons

**Status**: **DESIGN DECISION PENDING**

---

### OQ-003: Avatar Initials Background Color Strategy

**Issue**: How to generate consistent background colors for avatar initials fallback?

**Options**:
1. **Single color** (e.g., sage green `$secondary-colour`): Simple, consistent, boring
2. **User ID hash**: Hash user ID to generate color from palette, consistent per user, visually distinct
3. **Name hash**: Hash user name to generate color, consistent per name, may change if name changes

**Recommended Resolution**:
- **User ID hash** with predefined color palette (8-10 colors, all accessible)
- Ensures same user always gets same color
- Visual distinction helps identify users in lists

**Color Palette** (recommended, all WCAG AA compliant):
- Sage Green: #b0c47f
- Terracotta: #e79961
- Sky Blue: #7db5e8
- Lavender: #b59ed7
- Coral: #e89f7d
- Mint: #7dd4a8
- Peach: #f5b895
- Periwinkle: #9baae8

**Impact on Component Design**:
- User Avatar component: `background_color` prop accepts color string (generated server-side)
- Figma: Show 3-4 color variants in component examples

**Status**: **DESIGN DECISION PENDING**

---

### OQ-004: Responsive Breakpoints Standardization

**Issue**: Wireframes reference different breakpoints. Need to standardize.

**Current References**:
- CR Dashboard: 320px-767px (mobile), 768px-1439px (tablet), 1440px+ (desktop)
- CG Dashboard: Same breakpoints
- Admin Dashboard: Same breakpoints

**Recommended Resolution**:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop Small**: 1024px - 1439px
- **Desktop Large**: 1440px+

**Design System Breakpoints**:
- Mobile: Single column layouts, hamburger menu, 48px touch targets
- Tablet: 2-column grids, condensed navigation, 44px touch targets
- Desktop Small: 3-column grids, full navigation, 40px click targets
- Desktop Large: Wider max-width containers, more white space

**Status**: **APPROVED** (standard breakpoints documented)

---

## 13. Document Summary

### 13.1 Total Component Count

**By Category**:
- **Global Navigation**: 3 components (Header, Footer, Skip Link)
- **Layout**: 5 components (Page Container, Content Grid, Widget Container, Two-Column Layout, Divider)
- **Content Display**: 8 components (Booking Card, Status Badge, Countdown Timer, Empty State, Alert Banner, User Avatar, Metric Card, Activity Feed Item)
- **Interactive**: 6 components (Button, Link, Icon Button, Toggle Switch, Dropdown Menu, Modal)
- **Form**: 3 components (Input Field, Text Area, Checkbox)
- **Data Display**: 5 components (Progress Bar, Badge, Tag, List Item, Table Row)

**Total**: **33 distinct components** documented

### 13.2 Critical Components for Immediate Design

**Phase 1 (Dashboards - Week 1)**:
1. Navigation Header (3 role variants)
2. Footer
3. Booking Card (7 type variants) - MOST COMPLEX
4. Status Badge (15+ status variants)
5. Countdown Timer (3 urgency variants)
6. Alert Banner (4 severity variants)
7. Empty State (6+ type variants)
8. User Avatar (5 size variants)
9. Widget Container (4 variants)
10. Button (5 variants, 3 sizes)

**Phase 2 (Remaining Components - Week 2)**:
11. Metric Card
12. Activity Feed Item
13. Toggle Switch
14. Progress Bar
15. Dropdown Menu
16. Modal
17. Input Field
18. All remaining components

### 13.3 Design System Readiness

**Ready for Figma Handoff**:
- ✅ All 33 components documented with full specifications
- ✅ Variants, states, props, design tokens mapped
- ✅ Accessibility requirements documented
- ✅ Responsive behavior defined
- ✅ Cross-dashboard usage matrix complete
- ✅ Figma component recommendations provided
- ✅ Component dependency map documented
- ✅ Atomic design hierarchy established

**Next Steps**:
1. **Product team review**: Approve component specifications, resolve open questions
2. **Figma designer**: Create master components based on these specs
3. **Engineering**: Reference this document for component implementation
4. **QA**: Use accessibility requirements for testing

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-07 | UX/UI Design Team | Initial component inventory extracted from dashboard wireframes (Jobs 1-3) |

---

**END OF DOCUMENT**

**Status**: ✅ **READY FOR FIGMA HANDOFF**

**File Location**: `/docs/tiers/tier1/draft-design-specs/components/dashboard-shared-components.md`

**Next Job**: Figma designer creates master components and dashboard high-fidelity designs (Phase 2 of Figma Production Plan)

