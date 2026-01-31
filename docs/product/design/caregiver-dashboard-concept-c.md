# Caregiver Dashboard Concept C: Widget/Card Dashboard

**Design Philosophy**: Modular, customizable dashboard where caregivers can arrange widgets based on personal preference. Inspired by macOS widgets, Windows live tiles, and modern productivity apps. Power-user optimized.

**Target User**: Tech-comfortable caregivers who want control over their workspace and prefer information density over simplicity. Best for experienced caregivers who have established workflow patterns.

**Key Differentiator**: Drag-and-drop customization, widget resize options, and personalized dashboard layouts. Each caregiver's dashboard looks different based on their priorities.

---

## Desktop Layout (1440px width) - Default Configuration

```
+------------------------------------------------------------------------------+
| [iCare Logo]    Dashboard  Bookings  Calendar  Messages(2)  Earnings        |
|                                     [🔔3] [Customize] [Profile ▾]           |
+------------------------------------------------------------------------------+
|                                                                              |
|  ┌──────────────────────────────────┬──────────────────┬─────────────────┐  |
|  │ URGENT ACTIONS (Drag to move ⋮⋮) │ NEXT BOOKING ⋮⋮  │ EARNINGS ⋮⋮     │  |
|  ├──────────────────────────────────┼──────────────────┼─────────────────┤  |
|  │ 🔴 2 Booking Requests            │ TODAY at 2:00 PM │ £1,234.50       │  |
|  │                                  │                  │ Total Earned    │  |
|  │ ┌──────────────────────────────┐ │ [Photo]          │                 │  |
|  │ │Margaret T.  ⏰ 4h 23m left   │ │ Margaret T.      │ This Month      │  |
|  │ │Tue 4 Feb · 2-5 PM            │ │ 3h · 2-5 PM      │ £340.00         │  |
|  │ │£43.35 · 4.2 mi               │ │                  │                 │  |
|  │ │[✓ Accept] [Details]          │ │ Chiswick W4 5RG  │ Pending         │  |
|  │ └──────────────────────────────┘ │ 📞 020 7946 1234 │ £80.00          │  |
|  │                                  │                  │                 │  |
|  │ ┌──────────────────────────────┐ │ [Message] [Nav]  │ [Full View]     │  |
|  │ │John D.  ⏰ 18h 12m left      │ │                  │                 │  |
|  │ │Thu 6 Feb · 3-6 PM            │ │ UPCOMING         │                 │  |
|  │ │£51.00 · 3.1 mi               │ │ ───────────────  │                 │  |
|  │ │[✓ Accept] [Details]          │ │ Tomorrow 10:00AM │                 │  |
|  │ └──────────────────────────────┘ │ John D. · 2h     │                 │  |
|  │                                  │                  │                 │  |
|  │ [View All Requests]              │ Thu 6 Feb 3:00PM │                 │  |
|  │                                  │ Sarah M. · 3h    │                 │  |
|  └──────────────────────────────────┴──────────────────┴─────────────────┘  |
|                                                                              |
|  ┌────────────────────┬─────────────────────┬──────────────────────────────┐ |
|  │ AVAILABILITY ⋮⋮    │ PROFILE STATS ⋮⋮    │ THIS WEEK'S SCHEDULE ⋮⋮      │ |
|  ├────────────────────┼─────────────────────┼──────────────────────────────┤ |
|  │ This Week          │ Past 7 Days         │                              │ |
|  │ 24h available 🟢   │                     │ M  T  W  T  F  S  S          │ |
|  │                    │ Views: 23 ↑ +5      │ ─  ●  ─  ●  ─  ●  ─         │ |
|  │ ████████▓▓         │ Requests: 4         │                              │ |
|  │                    │ Accept: 85% ✓       │ 3 bookings                   │ |
|  │ You're highly      │ Response: 4h ✓      │ £128.00 earnings             │ |
|  │ visible to care    │                     │                              │ |
|  │ receivers          │ [Tips to Improve]   │ Mon: Available 9AM-5PM       │ |
|  │                    │                     │ Tue: Margaret T. 2-5PM ●     │ |
|  │ [Manage Calendar]  │                     │ Wed: Available 9AM-5PM       │ |
|  │                    │                     │ Thu: Sarah M. 3-6PM ●        │ |
|  └────────────────────┴─────────────────────┴──────────────────────────────┘ |
|                                                                              |
|  ┌───────────────────────────────┬────────────────────────────────────────┐  |
|  │ ONBOARDING CHECKLIST ⋮⋮       │ QUICK ACTIONS ⋮⋮                       │  |
|  ├───────────────────────────────┼────────────────────────────────────────┤  |
|  │ Complete Your Profile         │ [📅 All Bookings] [🗓️ Calendar]       │  |
|  │ 5 of 7 steps ████▢▢ 71%       │ [👤 Edit Profile] [💬 Messages (2)]   │  |
|  │                               │ [💰 Full Earnings] [❓ Help Center]    │  |
|  │ ✓ Email, Profile, Services    │ [📊 Analytics] [⚙️ Settings]          │  |
|  │ ✓ Bank, Availability          │                                        │  |
|  │ ⧗ ID Verification (In Review) │                                        │  |
|  │ ○ First Booking Pending       │                                        │  |
|  │                               │                                        │  |
|  │ [Continue Setup] [Dismiss]    │                                        │  |
|  └───────────────────────────────┴────────────────────────────────────────┘  |
|                                                                              |
|  ┌──────────────────────────────────────────────────────────────────────┐    |
|  │ RECENT ACTIVITY ⋮⋮                                                   │    |
|  ├──────────────────────────────────────────────────────────────────────┤    |
|  │ ✅ Yesterday: Completed session with Elizabeth M. · ⭐ 5-star review  │    |
|  │ 🎉 3 days ago: Reached 10 bookings milestone                          │    |
|  │ 💰 4 days ago: £80.00 payment received                                │    |
|  │ [View Full Activity]                                                  │    |
|  └──────────────────────────────────────────────────────────────────────┘    |
|                                                                              |
|  [+ Add Widget] [⚙️ Customize Layout] [↻ Reset to Default]                  |
|                                                                              |
+------------------------------------------------------------------------------+
| Help · Terms · Privacy · Contact Support                                    |
+------------------------------------------------------------------------------+
```

---

## Customization Mode (When "Customize" Clicked)

```
+------------------------------------------------------------------------------+
| [Exit Customize Mode]                                [Save Layout] [Cancel]  |
+------------------------------------------------------------------------------+
|                                                                              |
|  ┌──────────────────────────────────────────────────────────────────────┐   |
|  │ 📐 CUSTOMIZE YOUR DASHBOARD                                           │   |
|  ├──────────────────────────────────────────────────────────────────────┤   |
|  │ Drag widgets to rearrange · Click resize handles to change size      │   |
|  │ Click [×] to hide widgets · Click [+ Add Widget] to add more         │   |
|  └──────────────────────────────────────────────────────────────────────┘   |
|                                                                              |
|  ┌────────────────────┐  ┌────────────────┐  ┌───────────────┐            |
|  │ URGENT ACTIONS [×] │  │ NEXT BOOKING[×]│  │ EARNINGS [×]  │            |
|  │ [Draggable ⋮⋮⋮⋮]  │  │ [Draggable ⋮⋮] │  │ [Draggable ⋮⋮]│            |
|  │                    │  │                │  │               │            |
|  │ [Resize Handle ⊞]  │  │ [Resize ⊞]     │  │ [Resize ⊞]    │            |
|  └────────────────────┘  └────────────────┘  └───────────────┘            |
|                                                                              |
|  Grid overlay visible (8px grid snapping)                                   |
|  Widgets show dotted outline when dragging                                  |
|                                                                              |
|  +────────────────────────────────────────────────────────────────────+     |
|  │ AVAILABLE WIDGETS (Click to add)                                     │     |
|  +────────────────────────────────────────────────────────────────────+     |
|  │ [+] Urgent Actions      [+] Next Booking       [+] Earnings          │     |
|  │ [+] Availability        [+] Profile Stats      [+] Weekly Schedule   │     |
|  │ [+] Onboarding          [+] Quick Actions      [+] Recent Activity   │     |
|  │ [+] Messages Preview    [+] Achievements       [+] Payment History   │     |
|  │ [+] Care Receiver Notes [+] Distance Tracker   [+] Hours This Month  │     |
|  +────────────────────────────────────────────────────────────────────+     |
|                                                                              |
|  LAYOUT PRESETS:                                                            |
|  [○ Default]  [○ Action-First]  [○ Earnings-Focus]  [○ Minimal]            |
|                                                                              |
+------------------------------------------------------------------------------+
```

---

## Mobile Layout (375px width) - Default Configuration

```
+-----------------------------------+
| 🔔3  iCare     [Customize]  [👤]  |
+-----------------------------------+
| ⚙️ Tap "Customize" to rearrange   |
| widgets and personalize your      |
| dashboard                         |
+-----------------------------------+
|                                   |
| URGENT ACTIONS [⋮⋮]               |
| ┌───────────────────────────────┐ |
| │ 🔴 2 BOOKING REQUESTS         │ |
| │                               │ |
| │ Margaret T. · 4h 23m left     │ |
| │ Tue 4 Feb 2-5 PM · £43.35     │ |
| │ [✓ Accept] [Details]          │ |
| │                               │ |
| │ John D. · 18h left            │ |
| │ Thu 6 Feb 3-6 PM · £51.00     │ |
| │ [✓ Accept] [Details]          │ |
| └───────────────────────────────┘ |
|                                   |
| NEXT BOOKING [⋮⋮]                 |
| ┌───────────────────────────────┐ |
| │ TODAY at 2:00 PM              │ |
| │ [Photo] Margaret Thompson     │ |
| │ 3h · Chiswick W4 5RG          │ |
| │ 📞 020 7946 1234              │ |
| │ [Message] [Navigate]          │ |
| └───────────────────────────────┘ |
|                                   |
| EARNINGS [⋮⋮]                     |
| ┌───────────────────────────────┐ |
| │ £1,234.50 Total               │ |
| │ £340 This Month               │ |
| │ £80 Pending                   │ |
| │ [View Full]                   │ |
| └───────────────────────────────┘ |
|                                   |
| AVAILABILITY [⋮⋮]                 |
| ┌───────────────────────────────┐ |
| │ 24h available 🟢              │ |
| │ ████████▓▓                    │ |
| │ [Manage Calendar]             │ |
| └───────────────────────────────┘ |
|                                   |
| PROFILE STATS [⋮⋮]                |
| ┌───────────────────────────────┐ |
| │ Views: 23 · Requests: 4       │ |
| │ Accept: 85% · Response: 4h    │ |
| │ [Improve Tips]                │ |
| ��───────────────────────────────┘ |
|                                   |
| WEEK SCHEDULE [⋮⋮]                |
| ┌───────────────────────────────┐ |
| │ M  T  W  T  F  S  S           │ |
| │ ─  ●  ─  ●  ─  ●  ─          │ |
| │ 3 bookings · £128             │ |
| └───────────────────────────────┘ |
|                                   |
| + Tap widgets to expand           |
| + Long-press to rearrange         |
|                                   |
| [+ Add Widget]                    |
|                                   |
+-----------------------------------+
| [Dashboard] [📅] [💬] [💰] [⋮]    |
+-----------------------------------+
```

---

## Mobile Customization Mode

```
+-----------------------------------+
| [Done]  Customize    [Save] [×]   |
+-----------------------------------+
| Drag widgets to rearrange         |
| Tap [×] to hide · Tap [+] to add  |
+-----------------------------------+
|                                   |
| URGENT ACTIONS [×]                |
| ┌─────────[Drag Handle ⋮⋮]──────┐ |
| │ Preview of widget content     │ |
| │                               │ |
| │ [↕ Move Up] [↕ Move Down]     │ |
| └───────────────────────────────┘ |
|                                   |
| NEXT BOOKING [×]                  |
| ┌─────────[Drag Handle ⋮⋮]──────┐ |
| │ ...                           │ |
| │ [↕ Move Up] [↕ Move Down]     │ |
| └───────────────────────────────┘ |
|                                   |
| EARNINGS [×]                      |
| ┌─────────[Drag Handle ⋮⋮]──────┐ |
| │ ...                           │ |
| └───────────────────────────────┘ |
|                                   |
| ────────────────────────────────  |
|                                   |
| HIDDEN WIDGETS (Tap to show)      |
| [+] Onboarding                    |
| [+] Quick Actions                 |
| [+] Recent Activity               |
| [+] Messages Preview              |
|                                   |
| ────────────────────────────────  |
|                                   |
| LAYOUT PRESETS:                   |
| [Default] [Action-First] [Minimal]|
|                                   |
+-----------------------------------+
```

---

## Widget Library & Specifications

### Core Widgets (Always Available)

#### 1. Urgent Actions Widget
- **Default Size**: Large (2 columns × 3 rows)
- **Min Size**: Medium (2 columns × 2 rows)
- **Max Size**: Large (2 columns × 4 rows)
- **Resize**: Vertical only
- **Content**: Pending booking requests with countdown
- **Priority**: Critical (cannot be hidden)
- **Update**: Real-time via WebSocket

#### 2. Next Booking Widget
- **Default Size**: Medium (1 column × 3 rows)
- **Min Size**: Small (1 column × 2 rows)
- **Max Size**: Large (1 column × 4 rows)
- **Resize**: Vertical only
- **Content**: Upcoming booking with details
- **Empty State**: "No upcoming bookings"
- **Update**: Every 5 minutes

#### 3. Earnings Widget
- **Default Size**: Small (1 column × 2 rows)
- **Min Size**: Tiny (1 column × 1 row) - Shows total only
- **Max Size**: Medium (1 column × 3 rows) - Shows breakdown
- **Resize**: Vertical only
- **Content**: Total, this month, pending, next payout
- **Update**: Hourly

#### 4. Availability Widget
- **Default Size**: Small (1 column × 2 rows)
- **Min Size**: Tiny (1 column × 1 row) - Hours only
- **Max Size**: Small (1 column × 2 rows)
- **Content**: Hours available, visual indicator
- **Update**: On calendar changes

#### 5. Profile Stats Widget
- **Default Size**: Small (1 column × 2 rows)
- **Min Size**: Tiny (1 column × 1 row) - Key metrics only
- **Max Size**: Medium (1 column × 3 rows) - With trends
- **Content**: Views, requests, acceptance, response time
- **Update**: Daily

#### 6. Week Schedule Widget
- **Default Size**: Medium (2 columns × 2 rows)
- **Min Size**: Small (1 column × 2 rows)
- **Max Size**: Large (2 columns × 3 rows) - Shows day details
- **Content**: Visual week calendar with bookings
- **Interaction**: Click day to view details
- **Update**: On calendar/booking changes

#### 7. Onboarding Checklist Widget
- **Default Size**: Medium (2 columns × 2 rows)
- **Visibility**: Auto-hide when completed
- **Content**: Progress, remaining steps
- **Priority**: High for new users
- **Update**: On checklist changes

#### 8. Quick Actions Widget
- **Default Size**: Medium (2 columns × 2 rows)
- **Min Size**: Small (1 column × 2 rows)
- **Max Size**: Large (2 columns × 3 rows)
- **Content**: Button grid for common actions
- **Customizable**: Users can add/remove actions
- **Update**: Static

#### 9. Recent Activity Widget
- **Default Size**: Large (3 columns × 2 rows)
- **Min Size**: Medium (2 columns × 2 rows)
- **Content**: Last 3-5 timeline events
- **Update**: Real-time

### Premium Widgets (Added Later or Unlocked)

#### 10. Messages Preview Widget
- **Size**: Medium (2 columns × 2 rows)
- **Content**: Last 3 messages, unread badge
- **Interaction**: Click to open full messages

#### 11. Achievements Widget
- **Size**: Small (1 column × 2 rows)
- **Content**: Recent badges, next milestone
- **Gamification**: Progress to next achievement

#### 12. Payment History Widget
- **Size**: Medium (2 columns × 2 rows)
- **Content**: Last 5 payments with dates
- **Filter**: By date range

#### 13. Care Receiver Notes Widget
- **Size**: Medium (2 columns × 2 rows)
- **Content**: Quick notes from past bookings
- **Search**: By care receiver name

#### 14. Distance Tracker Widget
- **Size**: Tiny (1 column × 1 row)
- **Content**: Miles traveled this month
- **Gamification**: Mileage milestones

#### 15. Hours This Month Widget
- **Size**: Tiny (1 column × 1 row)
- **Content**: Total hours worked
- **Visualization**: Circular progress bar

---

## Grid System

### Desktop Grid
- **Columns**: 4
- **Rows**: Auto (flexible)
- **Gap**: 16px
- **Cell Size**: ~280px × 160px
- **Breakpoints**:
  - 1024-1279px: 3 columns
  - 1280-1439px: 4 columns
  - 1440px+: 4 columns (wider cells)

### Mobile Grid
- **Columns**: 1 (stacked)
- **Rows**: Auto
- **Gap**: 12px
- **Widget Width**: 100% (minus padding)

### Widget Sizes
```
Tiny:   1 column × 1 row   (~280px × 160px)
Small:  1 column × 2 rows  (~280px × 336px)
Medium: 2 columns × 2 rows (~576px × 336px)
Large:  2 columns × 3 rows (~576px × 512px)
XLarge: 3 columns × 2 rows (~872px × 336px)
```

---

## Component Specifications

### Widget Container
- **Background**: White
- **Border**: 1px solid `#E0E0E0`
- **Border Radius**: 12px
- **Padding**: 20px
- **Shadow**: `0 2px 8px rgba(0, 0, 0, 0.06)`
- **Hover**: Shadow lifts to `0 4px 12px rgba(0, 0, 0, 0.1)`
- **Transition**: All 200ms ease

### Widget Header
- **Display**: Flex (space-between)
- **Margin Bottom**: 16px
- **Title**: Inter SemiBold, 16px, `#212121`
- **Actions**: Icon buttons (24px)
  - Drag handle: ⋮⋮ (visible in customize mode only)
  - Close: × (visible in customize mode only)
  - Expand: ⤢ (opens widget in modal)

### Widget Body
- **Content Area**: Flexible height
- **Overflow**: Auto (scrollable if content exceeds)
- **Typography**: Inter Regular, 14-16px
- **Spacing**: Consistent 12px between elements

### Widget Footer (Optional)
- **Border Top**: 1px solid `#F5F5F5`
- **Padding Top**: 12px
- **Margin Top**: 12px
- **Content**: "View More" link or action buttons

### Drag & Drop Indicators
- **Drag Handle**: ⋮⋮ icon, `#9E9E9E`, cursor grab
- **Dragging State**:
  - Widget opacity: 0.6
  - Cursor: grabbing
  - Dotted outline: 2px dashed `#2E5B6C`
- **Drop Zone**:
  - Background: `#E3F2FD`
  - Border: 2px dashed `#1976D2`
  - Animation: Pulse (500ms infinite)

### Resize Handle
- **Icon**: ⊞ in bottom-right corner
- **Color**: `#BDBDBD`
- **Hover**: `#757575`
- **Cursor**: nwse-resize
- **Size**: 20px × 20px

---

## Color Palette

```
Primary:          #2E5B6C (iCare Blue)
Widget Background:#FFFFFF (White)
Widget Border:    #E0E0E0 (Light Grey)
Widget Shadow:    rgba(0, 0, 0, 0.06)

Drag/Drop:
  Active Zone:    #E3F2FD (Light Blue)
  Active Border:  #1976D2 (Blue)
  Drag Handle:    #9E9E9E (Medium Grey)

Status Colors:
  Urgent:         #FF6F00 (Orange)
  Success:        #4CAF50 (Green)
  Info:           #1976D2 (Blue)
  Warning:        #F9A825 (Yellow)

Text:
  Primary:        #212121
  Secondary:      #616161
  Tertiary:       #9E9E9E

Backgrounds:
  Page:           #F5F5F5
  Widget:         #FFFFFF
  Hover:          #FAFAFA
```

---

## Typography

```
Font Family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif

Widget Titles:
  H3: Inter SemiBold, 16px, line-height 1.4

Widget Content:
  Primary: Inter Regular, 16px, line-height 1.5
  Secondary: Inter Regular, 14px, line-height 1.5
  Caption: Inter Medium, 12px, line-height 1.4, color #9E9E9E

Metrics/Numbers:
  Large: Inter Bold, 28px (for earnings totals)
  Medium: Inter SemiBold, 20px
  Small: Inter Medium, 16px
```

---

## Key Interactions

### 1. Drag & Drop Reordering (Desktop)
- Click and hold drag handle (⋮⋮)
- Widget becomes semi-transparent (opacity 0.6)
- Cursor changes to 'grabbing'
- Grid shows drop zones with blue dashed borders
- Move widget: Other widgets automatically shift
- Release: Widget snaps to grid position (100ms ease)
- Layout auto-saves to user preferences

### 2. Long-Press Reorder (Mobile)
- Long-press widget (600ms)
- Haptic feedback (vibrate 50ms)
- Widget lifts with shadow (0 8px 24px)
- Drag to reorder: Other widgets shift smoothly
- Release: Widget settles into position
- "Move Up/Move Down" buttons as alternative

### 3. Widget Resize (Desktop Only)
- Hover bottom-right corner: Resize handle appears
- Click and drag: Widget resizes in real-time
- Snaps to grid increments
- Adjacent widgets reflow automatically
- Min/max size constraints enforced
- Release: Layout saves

### 4. Widget Expand/Collapse
- Click expand icon (⤢) in widget header
- Widget opens in modal overlay (400ms ease)
- Modal shows full widget content without space constraints
- Click outside or [×] to close (300ms ease)
- Mobile: Expands to full-screen

### 5. Add Widget
- Click "+ Add Widget" button
- Dropdown/modal shows available widgets
- Click widget to add: Fades in at bottom (300ms)
- Auto-scrolls to new widget
- Snackbar confirmation: "Widget added"

### 6. Remove Widget
- Click [×] in customize mode
- Confirmation: "Hide widget? You can add it back later"
- Widget fades out and slides away (300ms)
- Surrounding widgets reflow
- Snackbar with undo option (5 seconds)

### 7. Layout Presets
- Click preset button: "Action-First", "Earnings-Focus", etc.
- Modal: "Apply this layout? Your current layout will be replaced"
- Confirm: All widgets animate to new positions (600ms stagger)
- Smooth, choreographed transition

---

## Accessibility Features

### WCAG 2.1 AA Compliance
- **Color Contrast**: All widget text meets 4.5:1 minimum
- **Touch Targets**:
  - Widget action buttons: 44px × 44px minimum
  - Drag handles: 48px × 48px touch area (mobile)
- **Focus Indicators**:
  - Widgets: 2px solid `#2E5B6C` outline on focus
  - Keyboard navigation: Visible focus ring

### Screen Reader Support
```html
<div role="region" aria-label="Urgent Actions Widget" aria-live="polite">
  <header>
    <h3 id="urgent-actions-title">Urgent Actions</h3>
    <button aria-label="Drag to move widget" aria-describedby="drag-instructions">
      ⋮⋮
    </button>
    <button aria-label="Remove widget" aria-describedby="remove-instructions">
      ×
    </button>
  </header>
  <div role="article">
    <!-- Widget content -->
  </div>
</div>

<div id="drag-instructions" hidden>
  Press space to pick up, arrow keys to move, space to drop
</div>
```

### Keyboard Navigation
- **Tab Order**: Widgets in visual order (left-to-right, top-to-bottom)
- **Keyboard Shortcuts**:
  - `C` - Enter/Exit customize mode
  - `Space` - Pick up/drop widget when focused
  - `Arrow Keys` - Move widget in customize mode
  - `+` - Add widget menu
  - `-` - Remove focused widget
  - `R` - Resize focused widget (then arrow keys)
  - `Esc` - Cancel drag/resize, exit customize mode
  - `S` - Save layout
  - `Ctrl/Cmd + Z` - Undo last layout change

### Reduced Motion
- Users with `prefers-reduced-motion`: Instant transitions (no animations)
- Drag & drop: No lift animation, immediate position change
- Widget adds/removes: Fade only, no slide animations

---

## Responsive Breakpoints

```css
/* Mobile Small */
@media (min-width: 320px) {
  .dashboard-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px;
  }
  .widget {
    width: 100%;
    min-height: 120px;
  }
  .resize-handle { display: none; }
}

/* Tablet */
@media (min-width: 768px) {
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 24px;
  }
  .widget-size-medium {
    grid-column: span 2;
  }
  .resize-handle { display: block; }
}

/* Desktop */
@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(3, 1fr);
    padding: 32px;
  }
}

/* Desktop Large */
@media (min-width: 1280px) {
  .dashboard-grid {
    grid-template-columns: repeat(4, 1fr);
    max-width: 1600px;
    margin: 0 auto;
  }
}
```

---

## Layout Presets

### 1. Default Layout (Balanced)
```
Row 1: [Urgent Actions 2×3] [Next Booking 1×3] [Earnings 1×3]
Row 2: [Availability 1×2] [Profile Stats 1×2] [Week Schedule 2×2]
Row 3: [Onboarding 2×2] [Quick Actions 2×2]
Row 4: [Recent Activity 4×2]
```

### 2. Action-First Layout (For busy caregivers)
```
Row 1: [Urgent Actions 3×4]
Row 2: [Next Booking 2×3] [Quick Actions 2×3]
Row 3: [Week Schedule 2×2] [Earnings 1×2] [Availability 1×2]
```

### 3. Earnings-Focus Layout (Financial priority)
```
Row 1: [Earnings 2×3] [Payment History 2×3]
Row 2: [Hours This Month 1×2] [Distance Tracker 1×2] [Week Schedule 2×2]
Row 3: [Urgent Actions 2×3] [Next Booking 2×3]
```

### 4. Minimal Layout (Clean, essential only)
```
Row 1: [Urgent Actions 2×3] [Next Booking 2×3]
Row 2: [Earnings 2×2] [Quick Actions 2×2]
```

---

## Concept C: Pros & Cons

### Pros
✅ **Personalization**: Each caregiver creates their ideal workspace
✅ **Power User Friendly**: Advanced features for tech-comfortable users
✅ **Information Density**: See more at a glance (adjustable)
✅ **Future-Proof**: Easy to add new widgets without redesigning
✅ **Desktop Optimized**: Makes excellent use of large screens
✅ **Workflow Optimization**: Caregivers arrange by personal workflow
✅ **Accessibility**: Keyboard-driven customization available
✅ **Scalability**: Widget system scales from MVP to advanced features

### Cons
⚠️ **Complexity**: Customization options may overwhelm some users
⚠️ **Learning Curve**: Requires understanding widget concept
⚠️ **Initial Setup**: Caregivers must configure before optimal use
⚠️ **Mobile Limitations**: Drag & drop less intuitive on small screens
⚠️ **Maintenance**: More code complexity for developers
⚠️ **Performance**: Many widgets = more API calls & re-renders
⚠️ **Elderly Users**: May struggle with customization concept
⚠️ **Paralysis by Choice**: Too many options can reduce engagement

---

## Best Use Cases

**Ideal For**:
- Tech-savvy caregivers (comfort with computers/apps)
- Experienced caregivers with established workflows
- Desktop-primary users
- Caregivers who want control over their interface
- Power users who check dashboard frequently

**Less Ideal For**:
- New caregivers (needs more guidance)
- Elderly caregivers with limited tech experience
- Mobile-only users
- Caregivers who prefer simplicity over flexibility
- Users who want "it just works" without setup

---

## Implementation Notes

### Technical Requirements

#### State Management
```javascript
const dashboardLayoutState = {
  widgets: [
    {
      id: 'urgent-actions',
      type: 'urgent-actions',
      position: { x: 0, y: 0 },
      size: { w: 2, h: 3 },
      visible: true,
      minimizable: false, // Critical widget
    },
    {
      id: 'earnings-1',
      type: 'earnings',
      position: { x: 3, y: 0 },
      size: { w: 1, h: 2 },
      visible: true,
      minimizable: true,
    },
    // ... more widgets
  ],
  customizeMode: false,
  activePreset: 'default', // or 'custom'
};
```

#### Drag & Drop Library
- **Recommended**: react-grid-layout or react-dnd
- **Features Needed**:
  - Grid snapping
  - Collision detection
  - Resize handles
  - Touch support
  - Keyboard navigation
  - Persist layout to backend

#### Performance Optimization
- **Lazy Load Widgets**: Load widget content only when visible
- **Virtualization**: For widgets with lists (recent activity)
- **Debounce**: Layout changes debounced (300ms) before saving
- **Memoization**: React.memo on widget components
- **Code Splitting**: Load widget code on demand

#### Persistence
```javascript
// Save layout to backend
POST /api/caregiver/dashboard-layout
{
  "layout": {
    "widgets": [...],
    "preset": "custom"
  }
}

// Sync across devices
- Save on change (debounced)
- Load on login
- Merge conflicts: Server wins (with notification)
```

#### Analytics Tracking
```javascript
// Track widget usage
trackEvent('Widget Interacted', {
  widgetType: 'earnings',
  action: 'expand',
  position: { x: 3, y: 0 }
});

// Track layout changes
trackEvent('Dashboard Customized', {
  widgetsVisible: 8,
  widgetsHidden: 3,
  preset: 'custom',
  layoutChanges: 5
});

// A/B test default layouts
// Measure engagement by preset
```

---

## Future Enhancements

### Phase 2 Features
1. **Shared Layouts**: Export/import layouts, community presets
2. **Widget Themes**: Color customization per widget
3. **Advanced Filters**: Widget-level data filtering
4. **Third-Party Widgets**: API for developers to create widgets
5. **AI Layout Suggestions**: ML-based optimal layout recommendations
6. **Multi-Dashboard**: Different layouts for different contexts (morning, evening)

### Potential Premium Features
- Custom widget creation (advanced users)
- Unlimited widgets (free tier: max 12)
- Premium widget library (advanced analytics, forecasting)
- Dark mode per-widget

---

## Accessibility Testing Checklist

- [ ] All widgets keyboard-navigable
- [ ] Drag & drop works with keyboard (Space + Arrows)
- [ ] Screen reader announces widget moves
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible on all interactive elements
- [ ] Reduced motion respected (no animations)
- [ ] Touch targets minimum 44px × 44px
- [ ] Works with Windows High Contrast mode
- [ ] Zoom to 200% without layout breaking
- [ ] Screen reader announces customize mode entry/exit
