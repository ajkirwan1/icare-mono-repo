# Caregiver Dashboard Concept B: Timeline/Feed Dashboard

**Design Philosophy**: Chronological activity stream presenting dashboard as a living timeline where past, present, and future events flow naturally. Inspired by social media feeds but optimized for work/productivity context.

**Target User**: Active caregivers who want a holistic view of their caregiver journey and prefer scrolling through a narrative flow rather than scanning multiple sections.

**Key Differentiator**: Time-centric organization with past achievements, current actions, and future bookings in one continuous feed.

---

## Desktop Layout (1440px width)

```
+------------------------------------------------------------------------------+
| [iCare Logo]    Timeline  Bookings  Calendar  Messages(2)  Earnings         |
|                                                         [🔔3] [Profile ▾]     |
+------------------------------------------------------------------------------+
|                                                                              |
|  ┌────────────────────────────┐  ┌──────────────────────────────────────┐  |
|  │ FILTER TIMELINE            │  │ YOUR WEEK AT A GLANCE                │  |
|  ├────────────────────────────┤  ├──────────────────────────────────────┤  |
|  │ ☑ Action Required          │  │                                      │  |
|  │ ☑ Upcoming Events           │  │  M  T  W  T  F  S  S                │  |
|  │ ☑ Achievements              │  │  ─  ●  ─  ●  ─  ●  ─               │  |
|  │ ☐ Past Bookings             │  │                                      │  |
|  │                            │  │  3 bookings this week                │  |
|  │ ─────────────────────────  │  │  £128.00 earnings                    │  |
|  │                            │  │                                      │  |
|  │ QUICK STATS                │  │  24h available                       │  |
|  │                            │  │  4 requests pending                  │  |
|  │ Total Earned               │  │                                      │  |
|  │ £1,234.50                  │  │  [View Full Calendar]                │  |
|  │                            │  │                                      │  |
|  │ This Month                 │  └──────────────────────────────────────┘  |
|  │ £340.00                    │                                             |
|  │                            │                                             |
|  │ Profile Views              │                                             |
|  │ 23 this week ↑             │                                             |
|  │                            │                                             |
|  │ Response Time              │                                             |
|  │ 4 hours avg ✓              │                                             |
|  │                            │                                             |
|  │ [View Full Stats]          │                                             |
|  └────────────────────────────┘                                             |
|                                                                              |
+------------------------------------------------------------------------------+
|                      TIMELINE FEED (Main Content Area)                       |
+------------------------------------------------------------------------------+
|                                                                              |
|  ┌────────────────────────────────────────────────────────────────────────┐ |
|  │ ⚡ ACTION REQUIRED · Expires in 4h 23m                                  │ |
|  ├────────────────────────────────────────────────────────────────────────┤ |
|  │                                                                        │ |
|  │  [Photo] New booking request from Margaret Thompson · 4.8★            │ |
|  │                                                                        │ |
|  │  📅 Tuesday, 4 February                                                │ |
|  │  ⏰ 2:00 PM - 5:00 PM (3 hours)                                        │ |
|  │  📍 Chiswick W4 · 4.2 miles away                                       │ |
|  │  💷 You'll earn £43.35                                                 │ |
|  │                                                                        │ |
|  │  💬 "I enjoy conversations about gardening and would love to hear     │ |
|  │     about your experiences. I prefer gentle companionship..."         │ |
|  │                                                                        │ |
|  │  [View Margaret's Full Profile]                                       │ |
|  │                                                                        │ |
|  │  [✓ ACCEPT BOOKING]                              [Decline with reason]│ |
|  │                                                                        │ |
|  │  🕐 Received 20 minutes ago                                            │ |
|  └────────────────────────────────────────────────────────────────────────┘ |
|                                                                              |
|  ┌────────────────────────────────────────────────────────────────────────┐ |
|  │ ⚡ ACTION REQUIRED · Expires in 18h 12m                                 │ |
|  ├────────────────────────────────────────────────────────────────────────┤ |
|  │ [Photo] New booking request from John Davies · 4.9★                    │ |
|  │ Thu 6 Feb · 3:00-6:00 PM · Hammersmith W6 · 3.1 mi · £51.00           │ |
|  │ [Quick Accept] [View Details]                                          │ |
|  │ 🕐 Received 2 hours ago                                                 │ |
|  └────────────────────────────────────────────────────────────────────────┘ |
|                                                                              |
|  ─────────── TODAY ───────────                                              |
|                                                                              |
|  ┌───────────────��────────────────────────────────────────────────────────┐ |
|  │ 🟢 UPCOMING TODAY · Starts in 3 hours                                  │ |
|  ├────────────────────────────────────────────────────────────────────────┤ |
|  │                                                                        │ |
|  │  [Large Photo] Session with Margaret Thompson                         │ |
|  │                                                                        │ |
|  │  ⏰ 2:00 PM - 5:00 PM (3 hours)                                        │ |
|  │  📍 12 Oak Tree Lane, Chiswick, London W4 5RG                          │ |
|  │  📞 020 7946 1234                                                      │ |
|  │  💷 You'll earn £43.35                                                 │ |
|  │                                                                        │ |
|  │  📝 Notes from last session:                                           │ |
|  │  "Enjoyed discussing rose varieties. Mentioned grandchildren visiting │ |
|  │   next month. Hard of hearing - speak clearly."                       │ |
|  │                                                                        │ |
|  │  [Get Directions] [Message Margaret] [View Full Booking]              │ |
|  │                                                                        │ |
|  └────────────────────────────────────────────────────────────────────────┘ |
|                                                                              |
|  ─────────── TOMORROW ───────────                                           |
|                                                                              |
|  ┌────────────────────────────────────────────────────────────────────────┐ |
|  │ 📅 UPCOMING · Tomorrow at 10:00 AM                                     │ |
|  ├────────────────────────────────────────────────────────────────────────┤ |
|  │ [Photo] Session with John Davies · 2 hours · £34.00                    │ |
|  │ Richmond TW9 · 6.2 miles                                               │ |
|  │ [Message] [View Details]                                               │ |
|  └────────────────────────────────────────────────────────────────────────┘ |
|                                                                              |
|  ─────────── THIS WEEK ───────────                                          |
|                                                                              |
|  ┌────────────────────────────────────────────────────────────────────────┐ |
|  │ 📅 Thu 6 Feb at 3:00 PM                                                │ |
|  ├────────────────────────────────────────────────────────────────────────┤ |
|  │ [Photo] Session with Sarah Miller · 3 hours · £43.35                   │ |
|  │ [View Details]                                                         │ |
|  └────────────────────────────────────────────────────────────────────────┘ |
|                                                                              |
|  ┌────────────────────────────────────────────────────────────────────────┐ |
|  │ 📅 Sat 8 Feb at 1:00 PM                                                │ |
|  ├────────────────────────────────────────────────────────────────────────┤ |
|  │ [Photo] Session with Margaret T. (Recurring) · 3 hours · £43.35        │ |
|  │ Week 3 of 8 · [View Series]                                            │ |
|  └────────────────────────────────────────────────────────────────────────┘ |
|                                                                              |
|  ─────────── YESTERDAY ───────────                                          |
|                                                                              |
|  ┌────────────────────────────────────────────────────────────────────────┐ |
|  │ ✅ COMPLETED · Yesterday at 2:00 PM                                    │ |
|  ├────────────────────────────────────────────────────────────────────────┤ |
|  │ [Photo] Session with Elizabeth Moore · 2 hours · £34.00                │ |
|  │ ⭐ You received a 5-star review!                                        │ |
|  │ "Sarah was wonderful company. Very attentive and kind."                │ |
|  │ [View Review] [Thank Elizabeth]                                        │ |
|  └────────────────────────────────────────────────────────────────────────┘ |
|                                                                              |
|  ─────────── THIS WEEK ───────────                                          |
|                                                                              |
|  ┌────────────────────────────────────────────────────────────────────────┐ |
|  │ 🎉 MILESTONE REACHED · 3 days ago                                      │ |
|  ├────────────────────────────────────────────────────────────────────────┤ |
|  │ 🏆 You completed your 10th booking!                                    │ |
|  │ Your profile now displays the "Experienced Caregiver" badge.           │ |
|  │ [View Your Achievements]                                               │ |
|  └─────────────────────────────────────────────────────────��──────────────┘ |
|                                                                              |
|  ┌────────────────────────────────────────────────────────────────────────┐ |
|  │ 💰 PAYMENT RECEIVED · 4 days ago                                       │ |
|  ├────────────────────────────────────────────────────────────────────────┤ |
|  │ £80.00 deposited to your bank account                                  │ |
|  │ From 2 bookings completed last week                                    │ |
|  │ [View Transaction Details]                                             │ |
|  └────────────────────────────────────────────────────────────────────────┘ |
|                                                                              |
|  [Load More Past Events...]                                                 |
|                                                                              |
+------------------------------------------------------------------------------+
| Help · Terms · Privacy · Contact Support                                    |
+------------------------------------------------------------------------------+
```

---

## Mobile Layout (375px width)

```
+-----------------------------------+
| 🔔3  iCare            [☰]  [👤]   |
+-----------------------------------+
| YOUR WEEK                         |
| ┌───────────────────────────────┐ |
| │  M  T  W  T  F  S  S          │ |
| │  ─  ●  ─  ●  ─  ●  ─         │ |
| │                               │ |
| │  3 bookings · £128 earned     │ |
| │  24h available · 4 pending    │ |
| └───────────────────────────────┘ |
|                                   |
| [Filter: All ▾]  [Stats ▾]        |
|                                   |
| ═══════════════════════════════   |
| TIMELINE FEED                     |
| ═══════════════════════════════   |
|                                   |
| ⚡ EXPIRES IN 4h 23m               |
| ┌───────────────────────────────┐ |
| │ NEW REQUEST                   │ |
| │                               │ |
| │ [Photo] Margaret Thompson     │ |
| │         4.8★ (12 bookings)    │ |
| │                               │ |
| │ 📅 Tue 4 Feb                  │ |
| │ ⏰ 2:00-5:00 PM (3h)          │ |
| │ 📍 Chiswick W4 · 4.2 mi       │ |
| │ 💷 Earn £43.35                │ |
| │                               │ |
| │ 💬 "Enjoys gardening          │ |
| │    conversations..."          │ |
| │                               │ |
| │ [View Profile]                │ |
| │                               │ |
| │ [✓ ACCEPT]                    │ |
| │ [Decline]                     │ |
| │                               │ |
| │ 🕐 20 min ago                 │ |
| └───────────────────────────────┘ |
|                                   |
| ⚡ EXPIRES IN 18h                 |
| ┌───────────────────────────────┐ |
| │ [Photo] John Davies           │ |
| │ Thu 6 Feb · 3-6 PM            │ |
| │ Hammersmith · £51             │ |
| │ [Quick Accept] [Details]      │ |
| │ 🕐 2h ago                     │ |
| └───────────────────────────────┘ |
|                                   |
| ──────── TODAY ─────────          |
|                                   |
| 🟢 STARTS IN 3 HOURS              |
| ┌───────────────────────────────┐ |
| │ [Large Photo]                 │ |
| │ Margaret Thompson             │ |
| │                               │ |
| │ ⏰ 2:00-5:00 PM (3h)          │ |
| │ 📍 12 Oak Tree Lane           │ |
| │    Chiswick W4 5RG            │ |
| │ 📞 020 7946 1234              │ |
| │ 💷 £43.35                     │ |
| │                               │ |
| │ 📝 Last time: Discussed       │ |
| │    roses, grandchildren       │ |
| │    visiting. Hard of hearing. │ |
| │                               │ |
| │ [Directions] [Message]        │ |
| └───────────────────────────────┘ |
|                                   |
| ─────── TOMORROW ──────           |
|                                   |
| 📅 10:00 AM                       |
| ┌───────────────────────────────┐ |
| │ [Photo] John Davies           │ |
| │ 2h · Richmond · £34           │ |
| │ [Details]                     │ |
| └───────────────────────────────┘ |
|                                   |
| ──── THIS WEEK ────               |
|                                   |
| 📅 Thu 6 Feb 3:00 PM              |
| [Photo] Sarah Miller · 3h         |
|                                   |
| 📅 Sat 8 Feb 1:00 PM              |
| [Photo] Margaret T. · 3h          |
| (Recurring - Week 3/8)            |
|                                   |
| ───── YESTERDAY ─────             |
|                                   |
| ✅ COMPLETED                      |
| ┌───────────────────────────────┐ |
| │ [Photo] Elizabeth Moore       │ |
| │ 2h · £34                      │ |
| │ ⭐ 5-star review received!    │ |
| │ "Wonderful company..."        │ |
| │ [View] [Thank]                │ |
| └───────────────────────────────┘ |
|                                   |
| 🎉 3 days ago                     |
| 10th booking milestone!           |
|                                   |
| 💰 4 days ago                     |
| £80 payment received              |
|                                   |
| [Load More...]                    |
|                                   |
+-----------------------------------+
| [Timeline] [📅] [💬2] [💰] [⋮]    |
+-----------------------------------+
```

---

## Component Specifications

### Timeline Card (Base Component)
- **Background**: White
- **Border**: 1px solid `#E0E0E0`
- **Border Radius**: 12px (more rounded than Concept A)
- **Padding**: 20px
- **Margin Bottom**: 16px
- **Shadow**: `0 2px 8px rgba(0, 0, 0, 0.08)`
- **Hover**: Shadow lifts to `0 4px 16px rgba(0, 0, 0, 0.12)`
- **Transition**: All 200ms ease

### Timeline Card Header
- **Height**: 40px
- **Background**: Varies by card type
- **Border Radius**: 12px 12px 0 0 (top corners only)
- **Padding**: 12px 20px
- **Font**: Inter SemiBold, 14px
- **Display**: Flex with space-between

Card Type Colors:
- **Action Required**: `#FF6F00` (urgent orange)
- **Upcoming Today**: `#4CAF50` (success green)
- **Upcoming**: `#1976D2` (info blue)
- **Completed**: `#4CAF50` with checkmark
- **Milestone**: `#F9A825` with trophy icon
- **Payment**: `#6A1B9A` with money icon

### Timeline Date Divider
- **Margin**: 32px 0 16px
- **Font**: Inter Bold, 16px uppercase
- **Color**: `#757575`
- **Border Top**: 2px solid `#E0E0E0`
- **Padding Top**: 16px
- **Letter Spacing**: 1px
- **Text Align**: Center

### Week-at-a-Glance Calendar
- **Background**: `#F5F5F5`
- **Border**: 1px solid `#E0E0E0`
- **Border Radius**: 8px
- **Padding**: 16px
- **Day Indicators**:
  - Circle: 32px diameter
  - Inactive: `#E0E0E0`
  - Active (has booking): `#2E5B6C`
  - Today: `#4CAF50` with pulse animation

### Timeline Action Card (Urgent)
- **Border Left**: 4px solid `#FF6F00`
- **Background**: White with `#FFF3E0` subtle gradient
- **Header Background**: `#FF6F00`
- **Header Color**: White
- **Icon**: ⚡ Lightning bolt
- **Pulse Animation**: Gentle glow every 3 seconds

### Timeline Upcoming Card (Today)
- **Border Left**: 4px solid `#4CAF50`
- **Background**: White with `#E8F5E9` subtle gradient
- **Profile Photo**: 80px circle (larger for emphasis)
- **Badge**: "STARTS IN Xh" in top-right corner

### Timeline Completed Card
- **Border Left**: 4px solid `#4CAF50`
- **Background**: White
- **Checkmark**: 24px green checkmark icon
- **Star Rating**: Display inline with name
- **Review Quote**: Italic text, `#616161`

### Timeline Milestone Card
- **Border Left**: 4px solid `#F9A825`
- **Background**: White with `#FFF9C4` subtle gradient
- **Icon**: 🏆 Trophy, 32px
- **Achievement Badge**: Display with animation

### Filter Pills (Mobile)
- **Background**: `#F5F5F5`
- **Selected Background**: `#2E5B6C`
- **Color**: `#616161`
- **Selected Color**: White
- **Padding**: 8px 16px
- **Border Radius**: 20px (pill shape)
- **Font**: Inter Medium, 14px
- **Margin**: 4px

---

## Color Palette

```
Primary:          #2E5B6C (iCare Blue)
Action:           #FF6F00 (Urgent Orange)
Success:          #4CAF50 (Success Green)
Info:             #1976D2 (Info Blue)
Achievement:      #F9A825 (Achievement Gold)
Payment:          #6A1B9A (Payment Purple)

Gradient Tints:
  Action Tint:    linear-gradient(180deg, #FFF3E0 0%, #FFFFFF 100%)
  Success Tint:   linear-gradient(180deg, #E8F5E9 0%, #FFFFFF 100%)
  Info Tint:      linear-gradient(180deg, #E3F2FD 0%, #FFFFFF 100%)

Neutrals:
  N900:           #212121 (Primary text)
  N700:           #616161 (Secondary text)
  N500:           #9E9E9E (Tertiary text)
  N300:           #E0E0E0 (Borders)
  N100:           #F5F5F5 (Backgrounds)
  N000:           #FFFFFF (Cards)

Shadows:
  Card:           0 2px 8px rgba(0, 0, 0, 0.08)
  Card Hover:     0 4px 16px rgba(0, 0, 0, 0.12)
  Lifted:         0 8px 24px rgba(0, 0, 0, 0.15)
```

---

## Typography

```
Font Family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif

Timeline Headers:
  Card Title: Inter SemiBold, 18px, line-height 1.3
  Date Divider: Inter Bold, 16px, uppercase, letter-spacing 1px
  Timestamp: Inter Regular, 12px, color #9E9E9E

Timeline Content:
  Primary: Inter Regular, 16px, line-height 1.5
  Secondary: Inter Regular, 14px, line-height 1.5
  Caption: Inter Medium, 12px, line-height 1.4

Icons:
  Emoji: 24px (consistent size for all timeline icons)
  Status Icons: 20px
```

---

## Key Interactions

### 1. Infinite Scroll Timeline
- Load initial 10 cards
- Detect scroll position: When user reaches 80% of page
- Lazy load next 10 cards with skeleton placeholders
- Smooth transition as new cards appear (fade-in 300ms)
- "Loading more..." indicator at bottom

### 2. Card Expansion
- Click anywhere on timeline card (except buttons)
- Card expands vertically to show full details (400ms ease)
- Other cards shift down smoothly
- Click again or click "Close" to collapse
- Preference saved: Expanded cards remain expanded on refresh

### 3. Quick Actions from Timeline
- Hover over card: Quick action buttons appear
- Actions: Message, Directions, View Profile, Share
- Buttons slide in from right (200ms)
- Mobile: Always visible (no hover state)

### 4. Filter Timeline
- Click filter pills at top
- Timeline cards animate out (fade + slide up, 300ms)
- Filtered cards animate in (fade + slide down, 300ms)
- Smooth transition, no jarring layout shifts
- Filter state persisted to localStorage

### 5. Real-Time Updates
- New booking request: Card slides in from top
- Push down existing cards with animation
- Notification badge updates
- Browser/push notification if enabled
- Gentle sound (optional)

### 6. Week-at-a-Glance Interaction
- Click day circle: Timeline scrolls to that day's section
- Smooth scroll animation (800ms ease-in-out)
- Highlight target section briefly (pulse animation)
- Mobile: Horizontal swipe to change week

---

## Accessibility Features

### WCAG 2.1 AA Compliance
- **Color Contrast**:
  - Timeline headers on colored backgrounds: 4.5:1 minimum
  - Card text on white: 4.5:1 for body, 3:1 for large text
  - Date dividers: 4.5:1 on white background

- **Focus Management**:
  - Focus moves to newly loaded cards when infinite scroll triggers
  - Skip links: "Skip to today" and "Skip to action items"
  - Focus trapped in expanded cards until closed

- **Screen Reader**:
  - Timeline announced as "Feed" with aria-label
  - Each card is an article with proper heading hierarchy
  - Timestamps in `<time>` elements with machine-readable format
  - Live region for new booking requests: `aria-live="assertive"`

### Screen Reader Example
```html
<div role="feed" aria-label="Caregiver activity timeline" aria-busy="false">
  <article aria-posinset="1" aria-setsize="20">
    <header>
      <h3>Action required: New booking request from Margaret Thompson</h3>
      <time datetime="2026-02-01T14:30:00">Expires in 4 hours 23 minutes</time>
    </header>
    <div class="timeline-content">
      <p><strong>When:</strong> Tuesday, 4 February at 2:00 PM for 3 hours</p>
      <p><strong>Where:</strong> Chiswick W4, 4.2 miles away</p>
      <p><strong>Earnings:</strong> £43.35</p>
      <blockquote>"I enjoy conversations about gardening..."</blockquote>
    </div>
    <div class="timeline-actions">
      <button aria-label="Accept booking request from Margaret Thompson">
        Accept
      </button>
      <button aria-label="Decline booking request from Margaret Thompson">
        Decline
      </button>
    </div>
    <footer>
      <time datetime="2026-02-01T14:10:00">Received 20 minutes ago</time>
    </footer>
  </article>
</div>
```

### Keyboard Navigation
- **Tab Order**: Filters → Week calendar → Timeline cards (newest first)
- **Keyboard Shortcuts**:
  - `J` / `K` - Next/Previous card
  - `T` - Jump to Today section
  - `A` - Accept first action-required booking
  - `E` - Expand/collapse focused card
  - `F` - Toggle filters
  - `/` - Focus search/filter
  - `Home` - Scroll to top
  - `End` - Scroll to bottom

---

## Responsive Breakpoints

```css
/* Mobile Small */
@media (min-width: 320px) {
  .timeline-container { padding: 8px; }
  .timeline-card {
    border-radius: 8px;
    padding: 16px;
  }
  .sidebar { display: none; }
  .week-glance { display: block; }
}

/* Mobile Large */
@media (min-width: 414px) {
  .timeline-container { padding: 12px; }
  .timeline-card { padding: 20px; }
}

/* Tablet */
@media (min-width: 768px) {
  .dashboard-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 24px;
    padding: 24px;
  }
  .sidebar { display: block; }
  .week-glance {
    display: none; /* Moves to sidebar */
  }
  .timeline-feed {
    max-width: 700px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .dashboard-layout {
    grid-template-columns: 320px 1fr 280px; /* Left sidebar, feed, right panel */
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px;
  }
  .timeline-card {
    border-radius: 12px;
  }
}

/* Large Desktop */
@media (min-width: 1440px) {
  .dashboard-layout {
    max-width: 1600px;
  }
  .timeline-feed {
    max-width: 800px;
  }
}
```

---

## Concept B: Pros & Cons

### Pros
✅ **Natural Mental Model**: Timeline mirrors how people think about work (past, present, future)
✅ **Narrative Flow**: Tells the story of caregiver journey, building emotional connection
✅ **Mobile-Optimized**: Infinite scroll works beautifully on mobile
✅ **Motivation**: Showing completed bookings and achievements builds confidence
✅ **Reduced Overwhelm**: One item at a time, less visual noise
✅ **Contextual Information**: Past notes visible when viewing upcoming bookings
✅ **Engagement**: Social media-style feed encourages frequent checking

### Cons
⚠️ **Requires Scrolling**: Action items may be missed if user doesn't scroll
⚠️ **Performance**: Infinite scroll with rich content can be heavy
⚠️ **Learning Curve**: Less familiar than traditional dashboard
⚠️ **Filter Dependency**: Users must learn to filter to find specific items
⚠️ **Desktop Underutilized**: Wide screens have lots of empty space
⚠️ **Information Scent**: Harder to scan for specific information quickly
⚠️ **Elderly Accessibility**: Infinite scroll may confuse less tech-savvy users

---

## Best Use Cases

**Ideal For**:
- Active caregivers with multiple bookings per week
- Mobile-first users who prefer scrolling to clicking
- Caregivers who want to see their progress and achievements
- Users who check dashboard multiple times per day

**Less Ideal For**:
- New caregivers with little activity (timeline will be sparse)
- Users who prefer at-a-glance overview
- Desktop-primary users
- Elderly caregivers with limited tech literacy

---

## Implementation Notes

### Performance Optimization
- **Virtual Scrolling**: Use react-window or similar for large timelines
- **Image Lazy Loading**: Load profile photos only when in viewport
- **API Pagination**: Fetch 10 cards per request
- **Skeleton Loading**: Show card skeletons while loading
- **Caching**: Cache timeline data for 5 minutes

### State Management
```javascript
const timelineState = {
  cards: [],
  filters: {
    actionRequired: true,
    upcoming: true,
    achievements: false,
    past: false
  },
  pagination: {
    page: 1,
    hasMore: true,
    loading: false
  },
  expandedCards: new Set()
};
```

### Real-Time Updates Strategy
- WebSocket connection for new booking requests
- Prepend new cards to timeline (slide from top)
- Badge notification on timeline icon in nav
- Gentle notification sound (user preference)
- Desktop: Browser notification if tab inactive

### Accessibility Testing Checklist
- [ ] Screen reader announces timeline correctly
- [ ] Keyboard shortcuts work as expected
- [ ] Focus management during infinite scroll
- [ ] Color contrast meets WCAG AA
- [ ] Cards are navigable with keyboard only
- [ ] Skip links function properly
- [ ] Timestamps are machine-readable
- [ ] Live regions announce new booking requests
