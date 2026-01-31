# Caregiver Dashboard Design Specification
# UK Elderly Companionship Marketplace

**Last Updated**: 2026-01-30
**Document Owner**: Product Team
**Version**: 1.0
**Status**: Draft for Review

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [User Context & Workflows](#2-user-context--workflows)
3. [Information Architecture](#3-information-architecture)
4. [MVP Dashboard Specification](#4-mvp-dashboard-specification)
5. [Phase 2 Enhancements](#5-phase-2-enhancements)
6. [Detailed Component Specifications](#6-detailed-component-specifications)
7. [Responsive Design Guidelines](#7-responsive-design-guidelines)
8. [Empty States & Edge Cases](#8-empty-states--edge-cases)
9. [User Stories & Acceptance Criteria](#9-user-stories--acceptance-criteria)
10. [Success Metrics](#10-success-metrics)
11. [Accessibility Requirements](#11-accessibility-requirements)
12. [Technical Considerations](#12-technical-considerations)

---

## 1. Executive Summary

### Purpose
The caregiver dashboard is the primary workspace for individual caregivers offering companionship services to elderly care receivers. It must balance immediate action requirements (responding to booking requests) with longer-term needs (availability management, earnings tracking) while being accessible to users with varying levels of digital literacy.

### Design Principles
1. **Action-First**: Most urgent tasks prominently displayed above the fold
2. **Clarity Over Complexity**: Simple, scannable layout with clear information hierarchy
3. **Trust-Building**: Transparent earnings, clear expectations, responsive platform communication
4. **Mobile-First**: 70% of caregivers expected to access primarily via mobile devices
5. **Encouragement**: Positive reinforcement for profile completion and quality service

### Key Dashboard Objectives
- **Primary**: Enable caregivers to respond to booking requests within 24-hour window
- **Secondary**: Manage availability calendar to maximize booking opportunities
- **Tertiary**: Track earnings and upcoming bookings
- **Quaternary**: Maintain profile quality and complete verification steps

---

## 2. User Context & Workflows

### 2.1 Caregiver Personas

#### New Caregiver (Just Registered)
- **State**: Profile incomplete, pending admin approval
- **Primary Need**: Complete onboarding checklist to activate profile
- **Emotional State**: Motivated but potentially overwhelmed by requirements
- **Dashboard Focus**: Onboarding checklist, guidance, progress tracking

#### Approved Caregiver (No Bookings Yet)
- **State**: Profile approved, availability set, waiting for first booking request
- **Primary Need**: Understand how to get discovered, optimize profile
- **Emotional State**: Eager, potentially anxious about earning income
- **Dashboard Focus**: Profile optimization tips, availability coverage, "How to Get Bookings" guidance

#### Active Caregiver (Regular Bookings)
- **State**: Multiple bookings per week, established routine
- **Primary Need**: Manage schedule, respond to requests, track earnings
- **Emotional State**: Confident, focused on efficiency
- **Dashboard Focus**: Upcoming bookings, pending requests, quick calendar access, earnings summary

#### Inactive Caregiver (No Recent Bookings)
- **State**: Previously active but no bookings in 30+ days
- **Primary Need**: Understand why bookings dropped, re-engage
- **Emotional State**: Concerned, potentially disengaged
- **Dashboard Focus**: Re-engagement prompts (update availability, refresh profile), platform updates

### 2.2 Core Workflows

#### Workflow 1: Responding to Booking Request
**Frequency**: Variable (could be multiple per day for popular caregivers)
**Time Sensitivity**: 24-hour response window (critical)
**Success Path**:
1. Notification received (email + dashboard alert)
2. Caregiver logs into dashboard
3. Sees booking request prominently displayed
4. Clicks "View Request"
5. Reviews booking details (date, time, care receiver profile, special requests)
6. Checks calendar for conflicts
7. Clicks "Accept" or "Decline" with optional reason
8. Confirmation displayed, email sent to care receiver

**Dashboard Requirements**:
- Booking requests must be visible immediately on login (above the fold)
- Countdown timer showing response deadline
- One-click access to booking request details
- Clear accept/decline CTAs

#### Workflow 2: Managing Availability
**Frequency**: Weekly or bi-weekly adjustments
**Time Sensitivity**: Low (but impacts future bookings)
**Success Path**:
1. Caregiver navigates to Calendar or Availability section
2. Views current availability pattern
3. Edits recurring schedule or blocks specific dates
4. Saves changes
5. Confirmation displayed

**Dashboard Requirements**:
- Quick link to Calendar/Availability from dashboard
- Visual summary of current availability coverage (e.g., "20 hours available this week")
- Gentle prompts if availability appears low

#### Workflow 3: Checking Earnings
**Frequency**: Daily for active caregivers, weekly for less active
**Time Sensitivity**: Low
**Success Path**:
1. Caregiver views earnings summary on dashboard
2. Clicks "View Earnings" for detailed breakdown
3. Reviews completed bookings, pending payouts, total earned

**Dashboard Requirements**:
- Current earnings visible on dashboard without navigation
- Breakdown: Total earned (all time), This month, Pending payouts
- Link to full Earnings page

#### Workflow 4: Completing Onboarding
**Frequency**: One-time for new caregivers
**Time Sensitivity**: High (cannot receive bookings until complete)
**Success Path**:
1. New caregiver logs in to dashboard
2. Sees onboarding checklist prominently
3. Completes steps sequentially or in preferred order
4. Submits for admin review
5. Waits for approval (receives notification)
6. First booking request arrives

**Dashboard Requirements**:
- Onboarding checklist visible until all steps complete
- Clear progress indicator (5 of 7 complete)
- Each step links to relevant page
- Celebratory messaging on completion

---

## 3. Information Architecture

### 3.1 Dashboard Hierarchy (MVP)

**Priority 1: Immediate Action Required**
- Pending booking requests (countdown timer)
- Overdue tasks (e.g., update expired document)

**Priority 2: Upcoming Events**
- Next booking (date, time, care receiver name)
- Bookings today or this week

**Priority 3: Key Metrics**
- Earnings summary
- Profile stats (views this week, acceptance rate)

**Priority 4: Guidance & Prompts**
- Onboarding checklist (if incomplete)
- Profile optimization suggestions
- Availability coverage indicator

**Priority 5: Quick Actions**
- View All Bookings
- Manage Calendar
- Update Profile
- View Earnings

### 3.2 Navigation Structure

**Primary Navigation (Persistent)**
- Dashboard (home icon)
- Bookings
- Calendar
- Messages
- Earnings
- Profile
- Settings

**Secondary Access (from Dashboard)**
- Help Center
- Support Contact
- Logout

---

## 4. MVP Dashboard Specification

### 4.1 Layout Overview (Desktop)

```
+--------------------------------------------------------------------+
|  HEADER: Logo | Navigation | Notifications (bell icon) | Profile   |
+--------------------------------------------------------------------+
|                                                                    |
|  +-------------------------------------------------------------+  |
|  | URGENT ACTIONS SECTION                                       |  |
|  | - Pending booking requests (if any)                          |  |
|  | - Countdown timers                                           |  |
|  | - Prominent Accept/Decline buttons                           |  |
|  +-------------------------------------------------------------+  |
|                                                                    |
|  +------------------------------+  +---------------------------+  |
|  | UPCOMING BOOKINGS            |  | EARNINGS SUMMARY          |  |
|  | - Next booking (large card)  |  | - Total earned: £1,234    |  |
|  | - List of upcoming           |  | - This month: £340        |  |
|  |   (date, time, name)         |  | - Pending: £80            |  |
|  | - "View All" link            |  | - Link: View Earnings     |  |
|  +------------------------------+  +---------------------------+  |
|                                                                    |
|  +-------------------------------------------------------------+  |
|  | ONBOARDING CHECKLIST (if incomplete)                         |  |
|  | - Progress bar: 5 of 7 steps complete                        |  |
|  | - List of remaining steps with CTAs                          |  |
|  +-------------------------------------------------------------+  |
|                                                                    |
|  +------------------------------+  +---------------------------+  |
|  | AVAILABILITY STATUS          |  | PROFILE PERFORMANCE       |  |
|  | - Hours available this week  |  | - Profile views: 23       |  |
|  | - "Manage Calendar" link     |  | - Acceptance rate: 85%    |  |
|  | - Low availability warning   |  | - Avg response: 4 hours   |  |
|  +------------------------------+  +---------------------------+  |
|                                                                    |
|  +-------------------------------------------------------------+  |
|  | QUICK ACTIONS                                                |  |
|  | [View All Bookings] [Manage Calendar] [Update Profile]       |  |
|  +-------------------------------------------------------------+  |
|                                                                    |
+--------------------------------------------------------------------+
|  FOOTER: Help | Terms | Privacy | Contact Support                  |
+--------------------------------------------------------------------+
```

### 4.2 Section-by-Section Breakdown

#### Section 1: Urgent Actions (Pending Booking Requests)

**Purpose**: Ensure caregivers never miss a booking request deadline

**Visibility**:
- Only visible when pending requests exist
- Positioned at very top of page (above all other content)
- Distinct visual treatment (orange/amber background for urgency without alarm)

**Content**:
```
+---------------------------------------------------------------+
| ! New Booking Request                        [Expires in 18h] |
|                                                                |
| Margaret Thompson                            Tuesday, Feb 4    |
| 2:00 PM - 5:00 PM (3 hours)                  Earnings: £51.00 |
|                                                                |
| Location: Chiswick, London (4.2 miles from you)               |
| Special requests: Prefers conversation about gardening        |
|                                                                |
| [View Full Details]           [Accept Booking] [Decline]      |
+---------------------------------------------------------------+
```

**Interactions**:
- Clicking "View Full Details" opens booking request modal or dedicated page
- "Accept Booking" shows confirmation prompt, then processes acceptance
- "Decline" shows reason selection dropdown, then processes decline
- Multiple pending requests stack vertically (max 3 visible, then "View 2 more" link)

**Mobile Adaptation**:
- Condense to single column
- Booking cards become full-width
- Accept/Decline buttons stack vertically

---

#### Section 2: Next Booking (Upcoming)

**Purpose**: Remind caregiver of imminent bookings and enable quick access to details

**Visibility**:
- Always visible if caregiver has confirmed bookings
- Shows next upcoming booking (within 7 days)
- If booking is today, special visual treatment (green accent)

**Content** (Large Card Format):
```
+--------------------------------+
| YOUR NEXT BOOKING              |
+--------------------------------+
| TODAY at 2:00 PM               |  [If today, bold + green accent]
|                                |
| Margaret Thompson              |  [Profile photo thumbnail]
| 3-hour session                 |
| 2:00 PM - 5:00 PM              |
|                                |
| Chiswick, London               |
| 12 Oak Tree Lane, W4 5RG       |  [Address revealed after acceptance]
| Phone: 020 7946 XXXX           |  [Emergency contact visible]
|                                |
| [View Booking Details]         |
| [Message Margaret]             |
+--------------------------------+
```

**Below Large Card**: List of Next 3-4 Bookings
```
Tomorrow, Feb 2 | 10:00 AM | John Davies | 2 hours
Thu, Feb 6      | 3:00 PM  | Sarah Miller | 3 hours
Sat, Feb 8      | 1:00 PM  | Margaret T.  | 3 hours (Recurring)
```

**Interactions**:
- Click "View Booking Details" to see full booking page
- Click "Message [Name]" to open in-app messaging thread
- Click booking in list to expand details or navigate to booking page

**Empty State** (No Upcoming Bookings):
```
+--------------------------------+
| NO UPCOMING BOOKINGS           |
|                                |
| Keep your calendar up to date  |
| to receive booking requests.   |
|                                |
| [Manage Availability]          |
+--------------------------------+
```

---

#### Section 3: Earnings Summary

**Purpose**: Provide immediate financial transparency and motivation

**Visibility**:
- Always visible (top-right quadrant on desktop, below bookings on mobile)
- Updates in real-time when booking completes

**Content**:
```
+---------------------------+
| YOUR EARNINGS             |
+---------------------------+
| Total Earned              |
| £1,234.50                 | [Large, bold]
|                           |
| This Month                |
| £340.00                   |
|                           |
| Pending Payouts           |
| £80.00 (2 bookings)       | [Link: "View details"]
|                           |
| Next Payout               |
| Feb 7 - £80.00            |
|                           |
| [View Full Earnings]      |
+---------------------------+
```

**Interactions**:
- Click "View Full Earnings" to navigate to Earnings page (FEAT-027)
- Click "Pending Payouts" link to see breakdown
- Hover/tap on amounts for tooltip with additional context

**Safeguarding Note**:
- Platform commission clearly shown on Earnings page (not dashboard summary)
- No surprises about take-home pay

---

#### Section 4: Onboarding Checklist (Conditional)

**Purpose**: Guide new caregivers through setup to profile activation

**Visibility**:
- Only visible when onboarding incomplete (7 steps defined in FEAT-038)
- Dismissible but returns on next login
- Removed permanently once all steps complete

**Content**:
```
+-------------------------------------------------------------+
| COMPLETE YOUR PROFILE TO START RECEIVING BOOKINGS          |
+-------------------------------------------------------------+
| Progress: 5 of 7 steps complete                  [71%] ████▢▢
|                                                             |
| ✓ Email verified                                            |
| ✓ Profile created                                           |
| ✓ Services & rates set                                      |
| ✓ Bank account added                                        |
| ✓ Availability configured                                   |
| ⧗ Identity verification - In Review (1-2 days typically)    |
| ⚬ First booking accepted - Waiting for booking request     |
|                                                             |
| [Continue Setup]                         [Dismiss for now]  |
+-------------------------------------------------------------+
```

**Interactions**:
- Click "Continue Setup" to navigate to next incomplete step
- Click specific step to jump directly to that task
- "Dismiss for now" hides checklist until next login
- Step 6 (Identity verification) shows "Pending approval" status, not actionable
- Step 7 (First booking) auto-completes when caregiver accepts first booking

**Mobile Adaptation**:
- Collapse completed steps (show count only)
- Expand only pending/current steps

---

#### Section 5: Availability Status

**Purpose**: Encourage caregivers to maintain sufficient availability for bookings

**Visibility**:
- Always visible
- Warning state if availability drops below threshold (e.g., <10 hours/week)

**Content** (Normal State):
```
+------------------------------+
| AVAILABILITY                 |
+------------------------------+
| This Week                    |
| 24 hours available           | [Green indicator]
|                              |
| You're visible to care       |
| receivers searching for      |
| companionship in your area.  |
|                              |
| [Manage Calendar]            |
+------------------------------+
```

**Content** (Low Availability Warning):
```
+------------------------------+
| AVAILABILITY                 |
+------------------------------+
| This Week                    |
| 6 hours available            | [Amber/orange indicator]
|                              |
| ⚠ Low availability may       |
| reduce booking requests.     |
| Add more hours to increase   |
| your visibility.             |
|                              |
| [Add Availability]           |
+------------------------------+
```

**Interactions**:
- Click "Manage Calendar" or "Add Availability" to open Calendar page
- Tooltip on hours available explains calculation (total available slots minus confirmed bookings)

---

#### Section 6: Profile Performance

**Purpose**: Provide caregivers with feedback on profile effectiveness

**Visibility**:
- Always visible
- Metrics update weekly (not real-time to reduce server load)

**Content**:
```
+---------------------------+
| PROFILE PERFORMANCE       |
+---------------------------+
| This Week                 |
|                           |
| Profile Views: 23         | [Trend: ↑ +5 from last week]
| Booking Requests: 4       |
| Acceptance Rate: 85%      | [Good/Needs Improvement indicator]
| Avg Response Time: 4h     |
|                           |
| [Improve Your Profile]    | [Link to optimization tips]
+---------------------------+
```

**Metrics Definitions**:
- **Profile Views**: Number of times care receivers viewed full profile
- **Booking Requests**: Number of booking requests received (accepted + declined)
- **Acceptance Rate**: % of booking requests accepted (target: >70%)
- **Avg Response Time**: Average time from request to response (target: <6 hours)

**Interactions**:
- Click "Improve Your Profile" for contextual tips based on metrics
- Example tips:
  - Low acceptance rate: "Consider accepting more bookings to build your reputation"
  - Slow response time: "Enable email notifications to respond faster"
  - Low profile views: "Add more detail to your bio to appear in more searches"

---

#### Section 7: Quick Actions

**Purpose**: Provide one-click navigation to most common caregiver tasks

**Visibility**:
- Always visible at bottom of dashboard
- Horizontal button row on desktop, stacked on mobile

**Content**:
```
+-------------------------------------------------------------+
| QUICK ACTIONS                                                |
+-------------------------------------------------------------+
| [📅 View All Bookings] [🗓️ Manage Calendar] [👤 Update Profile] |
| [💬 Messages (2)]      [💰 View Earnings]    [❓ Help Center]    |
+-------------------------------------------------------------+
```

**Interactions**:
- Each button navigates to respective page
- Messages button shows unread count badge
- Consistent iconography across platform

---

### 4.3 Header & Navigation

**Header Components**:
```
+--------------------------------------------------------------------+
| [Logo]  Dashboard | Bookings | Calendar | Messages (2) | Earnings |
|                                                                    |
|                                   [🔔 Notifications] [Profile ▾]   |
+--------------------------------------------------------------------+
```

**Navigation Items**:
- **Dashboard**: Home (always returns here)
- **Bookings**: List of all bookings (pending, upcoming, completed, cancelled)
- **Calendar**: Full calendar view with availability management
- **Messages**: In-app messaging (badge shows unread count)
- **Earnings**: Detailed earnings breakdown and payout history

**Right Side**:
- **Notifications Bell**: Dropdown with recent notifications (booking requests, messages, admin updates)
- **Profile Dropdown**: Quick access to Profile, Settings, Help, Logout

**Mobile Navigation**:
- Hamburger menu with same items
- Bottom navigation bar for primary 4-5 items
- Notifications and profile in top-right

---

### 4.4 Notification Bell Dropdown

**Purpose**: Centralize all platform communications and alerts

**Content**:
```
+----------------------------------------+
| NOTIFICATIONS                    [⚙️]   |
+----------------------------------------+
| New booking request                    |
| Margaret Thompson                      |
| Tue, Feb 4 at 2:00 PM | Expires: 18h   |
| [View Request]                    1h   |
+----------------------------------------+
| Message from John Davies               |
| "Looking forward to tomorrow's..."     |
| [Reply]                           3h   |
+----------------------------------------+
| Payout completed                       |
| £80.00 deposited to your account       |
| [View Earnings]                   1d   |
+----------------------------------------+
| [View All Notifications]               |
+----------------------------------------+
```

**Badge Logic**:
- Badge shows count of unread notifications
- Urgent notifications (booking requests) highlighted in amber
- Clicking notification marks as read and navigates to relevant page

---

## 5. Phase 2 Enhancements

### 5.1 Smart Scheduling Assistant
**Feature**: AI-powered suggestions for availability optimization
**Benefit**: Help caregivers maximize bookings based on demand patterns

**Dashboard Integration**:
```
+---------------------------+
| SCHEDULING INSIGHTS       |
+---------------------------+
| 💡 Tuesday afternoons are |
| in high demand in your    |
| area. Add availability to |
| increase bookings by 30%. |
|                           |
| [Add Tuesday Availability]|
+---------------------------+
```

### 5.2 Recurring Booking Management
**Feature**: Consolidated view of recurring booking series (FEAT-039)
**Benefit**: Easier management of long-term care relationships

**Dashboard Integration**:
```
Recurring Series:
Margaret T. - Every Tuesday 2-5pm (8 weeks remaining)
John D. - Every Friday 10am-12pm (Ongoing)
```

### 5.3 Achievement Badges & Gamification
**Feature**: Recognition for quality service milestones
**Benefit**: Motivate caregivers, build trust with care receivers

**Dashboard Integration**:
```
+---------------------------+
| YOUR ACHIEVEMENTS         |
+---------------------------+
| 🏆 10 Bookings Completed  |
| ⭐ 5-Star Rating (10x)    |
| ⚡ Quick Responder         |
|                           |
| Next: 25 Bookings Badge   |
+---------------------------+
```

### 5.4 Enhanced Earnings Analytics
**Feature**: Detailed income reports, tax year summaries, forecasting
**Benefit**: Better financial planning for self-employed caregivers

**Dashboard Integration**:
- Monthly earnings chart (line graph)
- Projected earnings based on current bookings
- Tax year summary (Jan-April prominence)

### 5.5 Care Receiver Preferences Learning
**Feature**: Track preferences from completed bookings (tea preferences, conversation topics)
**Benefit**: Personalized care, repeat bookings

**Dashboard Integration**:
```
Upcoming Booking: Margaret T.
💡 Notes from previous sessions:
- Enjoys discussing gardening
- Prefers tea with milk, no sugar
- Hard of hearing (speak clearly)
```

### 5.6 Push Notifications (Mobile App)
**Feature**: Real-time mobile push for booking requests (FEAT-036)
**Benefit**: Faster response times, higher acceptance rates

**Implementation**: Once native mobile app developed (Phase 2)

---

## 6. Detailed Component Specifications

### 6.1 Booking Request Card

**States**:
1. New (unread notification)
2. Viewed (caregiver has opened details)
3. Expiring Soon (<6 hours remaining, red accent)
4. Expired (auto-declined, greyed out)

**Full Booking Request Modal**:
```
+----------------------------------------------------------+
| BOOKING REQUEST FROM MARGARET THOMPSON            [× Close]
+----------------------------------------------------------+
|                                                          |
| [Profile Photo]  Margaret Thompson                       |
|                  Member since Dec 2025                   |
|                  12 completed bookings                   |
|                  4.8 ★★★★★ (8 reviews)                  |
|                                                          |
| SESSION DETAILS                                          |
| Date: Tuesday, February 4, 2026                          |
| Time: 2:00 PM - 5:00 PM                                  |
| Duration: 3 hours                                        |
| Location: Chiswick, London W4 (4.2 miles from you)       |
|                                                          |
| YOUR EARNINGS                                            |
| Session rate: £17/hour × 3 hours = £51.00               |
| Platform fee (15%): -£7.65                              |
| Your payout: £43.35                                     |
|                                                          |
| SPECIAL REQUESTS                                         |
| "I enjoy having conversations about gardening and would  |
| love to hear about your experiences. I prefer gentle     |
| companionship and light housework help."                 |
|                                                          |
| CALENDAR CHECK                                           |
| ✓ You're available on Tuesday, Feb 4 from 2-5pm         |
|                                                          |
| RESPONSE REQUIRED BY: Tuesday, Jan 28 at 3:00 PM        |
| [Countdown: 18 hours, 23 minutes remaining]             |
|                                                          |
| [Accept Booking]                          [Decline]      |
+----------------------------------------------------------+
```

**Accept Flow**:
1. Click "Accept Booking"
2. Confirmation modal: "Accept booking with Margaret Thompson for Tue, Feb 4 at 2:00 PM? Payment will be collected from the care receiver."
3. [Confirm] or [Cancel]
4. Success message: "Booking accepted! Margaret has been notified. You'll receive a confirmation email shortly."
5. Booking moves to "Upcoming Bookings" section
6. Calendar automatically blocks this time slot

**Decline Flow**:
1. Click "Decline"
2. Reason selection modal:
   - Dropdown: "Not available at this time" | "Too far to travel" | "Outside my service area" | "Other"
   - Optional message to care receiver (max 200 chars)
3. [Confirm Decline] or [Cancel]
4. Confirmation: "Booking declined. Margaret will be notified and can request another caregiver."
5. Request removed from dashboard

---

### 6.2 Upcoming Booking Card (Detailed View)

**Booking Detail Page** (Accessed from dashboard card):
```
+----------------------------------------------------------+
| < Back to Dashboard                              [⋮ Menu] |
+----------------------------------------------------------+
|                                                          |
| BOOKING WITH MARGARET THOMPSON                           |
| Status: Confirmed                              [Green dot]
|                                                          |
| DATE & TIME                                              |
| Tuesday, February 4, 2026                                |
| 2:00 PM - 5:00 PM (3 hours)                              |
| [Add to Calendar]                                        |
|                                                          |
| LOCATION                                                 |
| Margaret Thompson                                        |
| 12 Oak Tree Lane                                         |
| Chiswick, London W4 5RG                                  |
| [Open in Maps]                                           |
|                                                          |
| CONTACT                                                  |
| Phone: 020 7946 1234                                     |
| [Call] [Message in App]                                  |
|                                                          |
| SERVICES REQUESTED                                       |
| - Companionship conversation                             |
| - Light housework                                        |
|                                                          |
| SPECIAL NOTES                                            |
| "I enjoy conversations about gardening and would love    |
| to hear about your experiences."                         |
|                                                          |
| YOUR EARNINGS                                            |
| Session rate: £51.00                                     |
| Platform fee: -£7.65                                     |
| Your payout: £43.35                                      |
| (Paid 2-3 business days after completion)                |
|                                                          |
| ACTIONS                                                  |
| [Cancel Booking] [Report Issue] [Get Directions]         |
+----------------------------------------------------------+
```

**Post-Session Actions** (After booking end time):
- "Mark Complete" button appears
- Optional session notes field (visible only to admin unless disputed)
- Prompt to encourage review (not required)

---

### 6.3 Earnings Summary Component (Expandable)

**Dashboard Summary** (Collapsed):
```
+---------------------------+
| YOUR EARNINGS             |
+---------------------------+
| Total Earned: £1,234.50   |
| This Month: £340.00       |
| Pending: £80.00           |
|                           |
| [View Full Earnings]      |
+---------------------------+
```

**Dashboard Summary** (Expanded - Click to reveal):
```
+---------------------------+
| YOUR EARNINGS             |
+---------------------------+
| Total Earned              |
| £1,234.50                 |
|                           |
| This Month: £340.00       |
| Last Month: £290.00       |
|                           |
| Pending Payouts           |
| £80.00 (2 bookings)       |
| ├─ £43.35 - Margaret T.   | Payout: Feb 7
| └─ £36.65 - John D.       | Payout: Feb 9
|                           |
| Completed This Week       |
| 3 sessions | £128.00      |
|                           |
| [View Full Earnings Page] |
+---------------------------+
```

**Full Earnings Page** (Separate page, accessed via link):
- Detailed transaction history (all completed bookings)
- Payout status tracking (Pending → Processing → Paid)
- Filters by date range, care receiver
- Export to CSV for tax purposes
- Annual summary (Jan prominence for tax year)
- Platform commission breakdown per booking

---

### 6.4 Onboarding Checklist Component

**Visual Design**:
- Progress bar at top showing overall completion percentage
- Checklist items with clear status icons:
  - ✓ Complete (green checkmark)
  - ⧗ In Progress / Pending (amber clock icon)
  - ⚬ Not Started (grey circle)

**Checklist Steps** (FEAT-038):
1. ✓ Email verified (auto-completed during registration)
2. ✓ Profile created (photo, bio, services, rates)
3. ✓ Identity verified (admin review, 1-2 day wait)
4. ✓ Bank account added (Stripe Connect)
5. ✓ Availability set (at least 10 hours/week recommended)
6. ⧗ Profile approved by admin (waiting state)
7. ⚬ First booking accepted (locked until profile approved)

**Interactions**:
- Clicking completed step shows checkmark animation (positive reinforcement)
- Clicking pending step navigates to relevant page with context
- "Continue Setup" button jumps to next incomplete step
- Dismissible but returns until 100% complete
- Celebratory modal on 100% completion: "Congratulations! Your profile is now live and visible to care receivers in your area."

---

### 6.5 Availability Status Component

**Calculation Logic**:
- Available Hours = Total availability slots (recurring weekly schedule) - Confirmed bookings
- Example: Caregiver sets availability Mon-Fri 9am-5pm (40 hours/week)
- They have 16 hours of confirmed bookings this week
- Available Hours This Week: 24 hours

**Thresholds**:
- **Healthy**: ≥15 hours available (green indicator, positive messaging)
- **Low**: 5-14 hours available (amber indicator, gentle prompt to add availability)
- **Critical**: <5 hours available (red indicator, stronger prompt)

**Visual Indicators**:
```
Healthy:   ████████▓▓ 24 hours (Green)
Low:       ████▓▓▓▓▓▓ 10 hours (Amber)
Critical:  ██▓▓▓▓▓▓▓▓ 3 hours (Red)
```

**Messaging**:
- Healthy: "You're highly visible to care receivers searching in your area."
- Low: "Add more availability to receive more booking requests."
- Critical: "Your profile visibility is reduced due to low availability. Add hours to increase bookings."

---

### 6.6 Profile Performance Component

**Metrics Display**:
```
+---------------------------+
| PROFILE PERFORMANCE       |
+---------------------------+
| Past 7 Days               |
|                           |
| Profile Views             |
| 23 [↑ +5 vs last week]    | [Green up arrow]
|                           |
| Booking Requests          |
| 4 [↓ -1 vs last week]     | [Amber down arrow]
|                           |
| Acceptance Rate           |
| 85% [Good ✓]              | [Green checkmark]
|                           |
| Response Time             |
| 4 hours [Excellent ✓]     | [Green checkmark]
|                           |
| [Tips to Improve]         |
+---------------------------+
```

**Benchmarks & Indicators**:
- **Acceptance Rate**:
  - Excellent: ≥85% (green checkmark)
  - Good: 70-84% (amber checkmark)
  - Needs Improvement: <70% (red warning)

- **Response Time**:
  - Excellent: <6 hours (green)
  - Good: 6-12 hours (amber)
  - Needs Improvement: >12 hours (red)

**Contextual Tips** (Shown when "Tips to Improve" clicked):
- Low acceptance rate: "Accepting more bookings builds your reputation and increases future requests. Only decline when absolutely necessary."
- Slow response time: "Enable email and SMS notifications to respond faster. Caregivers who respond within 6 hours get 40% more bookings."
- Low profile views: "Add more detail to your bio, list additional services, and ensure your profile photo is clear and welcoming."

---

## 7. Responsive Design Guidelines

### 7.1 Mobile Layout (320px - 767px)

**Key Principles**:
- Single column layout
- Larger tap targets (minimum 44px × 44px)
- Sticky header with hamburger menu
- Bottom navigation bar for primary actions
- Collapsible sections to reduce scrolling

**Mobile Dashboard Stack Order**:
1. Pending Booking Requests (urgent)
2. Next Booking (large card)
3. Earnings Summary (collapsed by default)
4. Onboarding Checklist (if incomplete)
5. Upcoming Bookings List (next 3 visible, "View All" link)
6. Availability Status (collapsed)
7. Profile Performance (collapsed)
8. Quick Actions (bottom navigation bar)

**Mobile-Specific Components**:
```
+---------------------+
| 🔔 iCare      [☰]   |  <- Header with hamburger menu
+---------------------+
|                     |
| [Booking Request]   |  <- Full-width urgent card
|                     |
+---------------------+
|                     |
| NEXT BOOKING        |  <- Large touch-friendly card
| TODAY at 2:00 PM    |
| Margaret Thompson   |
| [View Details]      |
|                     |
+---------------------+
| EARNINGS ▾          |  <- Collapsed, tap to expand
+---------------------+
| UPCOMING (3) ▾      |  <- Shows count, tap to expand
+---------------------+
|                     |
| [Bottom Nav Bar]    |  <- Sticky bottom navigation
| 📅 🗓️ 💬 💰 ⋮      |
+---------------------+
```

### 7.2 Tablet Layout (768px - 1023px)

**Hybrid Approach**:
- Two-column layout where appropriate
- Expanded navigation (visible, not hamburger)
- Booking requests still full-width at top
- Side-by-side: Upcoming Bookings | Earnings Summary
- Side-by-side: Availability | Profile Performance

### 7.3 Desktop Layout (1024px+)

**Full Layout** (as shown in Section 4.1):
- Three-column grid where appropriate
- Sidebar navigation (persistent)
- Maximum content width: 1400px (centered)
- Hover states for interactive elements
- Tooltips for additional context

---

## 8. Empty States & Edge Cases

### 8.1 New Caregiver (No Data Yet)

**Dashboard Appearance**:
```
+-------------------------------------------------------------+
| Welcome to iCare, Sarah! 👋                                 |
+-------------------------------------------------------------+
| Complete your profile to start receiving booking requests.  |
|                                                             |
| [ONBOARDING CHECKLIST]                                      |
| Progress: 2 of 7 steps complete                             |
| ... (full checklist shown) ...                              |
+-------------------------------------------------------------+
|                                                             |
| NO BOOKINGS YET                                             |
|                                                             |
| Once your profile is approved, care receivers in your area  |
| will be able to discover and book your services.            |
|                                                             |
| [Continue Setup]                                            |
+-------------------------------------------------------------+
```

**Tone**: Encouraging, clear next steps, no sense of urgency

### 8.2 Approved But No Bookings (Waiting State)

**Dashboard Appearance**:
```
+-------------------------------------------------------------+
| YOUR PROFILE IS LIVE! 🎉                                    |
+-------------------------------------------------------------+
| Care receivers in your area can now discover and book you.  |
|                                                             |
| NO BOOKING REQUESTS YET                                     |
|                                                             |
| It can take a few days to receive your first request. Here  |
| are ways to increase your visibility:                       |
|                                                             |
| ✓ Add more availability (currently 24 hours/week)           |
| ✓ Lower your rate to be more competitive (current: £17/hr)  |
| ✓ Add more services to your profile                         |
| ✓ Update your bio with more detail                          |
|                                                             |
| [Optimize Your Profile]                                     |
+-------------------------------------------------------------+
|                                                             |
| EARNINGS: £0.00                                             |
| Your earnings will appear here once you complete bookings.  |
+-------------------------------------------------------------+
```

**Tone**: Celebratory (profile approval) but actionable (optimization tips)

### 8.3 Inactive Caregiver (No Bookings in 30+ Days)

**Dashboard Appearance**:
```
+-------------------------------------------------------------+
| We miss you! Your profile is less visible due to inactivity.|
+-------------------------------------------------------------+
|                                                             |
| NO RECENT BOOKINGS                                          |
| Last booking: January 5, 2026 (25 days ago)                 |
|                                                             |
| Reactivate your profile by:                                 |
| - Updating your availability for the coming weeks           |
| - Refreshing your profile photo or bio                      |
| - Confirming your service area is still accurate            |
|                                                             |
| [Update Availability] [Refresh Profile]                     |
+-------------------------------------------------------------+
```

**Tone**: Re-engagement without guilt, clear path to reactivation

### 8.4 No Upcoming Bookings

**Section Appearance**:
```
+--------------------------------+
| UPCOMING BOOKINGS              |
+--------------------------------+
| No bookings scheduled          |
|                                |
| When you accept booking        |
| requests, they'll appear here. |
|                                |
| [View Past Bookings]           |
+--------------------------------+
```

### 8.5 Profile Pending Admin Review

**Onboarding Checklist Shows**:
```
⧗ Identity verification - In Review
  Your profile is being reviewed by our team.
  This typically takes 1-2 business days.
  We'll email you once approved.

  Status: Submitted January 27 at 2:34 PM

  [Contact Support if urgent]
```

**Dashboard Banner**:
```
+-------------------------------------------------------------+
| ⧗ Profile Under Review                                      |
|----------------------------------------------------------------
| Your profile is being reviewed by our team (typically 1-2    |
| business days). You'll receive an email once approved.       |
|                                                             |
| Submitted: Jan 27 at 2:34 PM                                |
+-------------------------------------------------------------+
```

### 8.6 Profile Rejected by Admin

**Dashboard Banner** (Red accent, urgent):
```
+-------------------------------------------------------------+
| ⚠️ Profile Approval Required                                 |
|----------------------------------------------------------------
| We couldn't approve your profile due to: Photo not clear    |
|                                                             |
| Please update your profile and resubmit for review:         |
| - Upload a clear photo with your face visible               |
| - Ensure the photo is well-lit and recent                   |
|                                                             |
| [Update Profile] [Contact Support]                          |
+-------------------------------------------------------------+
```

**Tone**: Clear feedback, actionable next steps, supportive (not punitive)

### 8.7 Booking Request Expired (Auto-Declined)

**Notification in Dashboard**:
```
+-------------------------------------------------------------+
| ⚠️ Missed Booking Request                                    |
|----------------------------------------------------------------
| A booking request from Margaret Thompson expired because    |
| you didn't respond within 24 hours.                         |
|                                                             |
| Enable email/SMS notifications to respond faster and avoid  |
| missing future opportunities.                               |
|                                                             |
| [Update Notification Settings]        [Dismiss]             |
+-------------------------------------------------------------+
```

**Analytics Impact**: Flagged in Profile Performance (response time metric)

### 8.8 Low Acceptance Rate Warning

**Profile Performance Component Shows**:
```
+---------------------------+
| PROFILE PERFORMANCE       |
+---------------------------+
| Acceptance Rate           |
| 45% [⚠️ Needs Improvement] |
|                           |
| Declining too many        |
| bookings reduces your     |
| visibility to care        |
| receivers.                |
|                           |
| [Why This Matters]        |
+---------------------------+
```

**Modal on "Why This Matters"**:
- Explains how acceptance rate affects search ranking
- Suggests only declining when truly unavailable
- Links to guidelines on appropriate reasons to decline

---

## 9. User Stories & Acceptance Criteria

### User Story 1: Responding to Booking Requests

**As a caregiver**, I want to see pending booking requests immediately when I log in, so that I can respond quickly and not miss opportunities.

**Acceptance Criteria**:
- [ ] Pending booking requests displayed at the very top of dashboard (above all other content)
- [ ] Countdown timer shows time remaining to respond (hours and minutes)
- [ ] Visual urgency indicator when <6 hours remaining (red/amber accent)
- [ ] Request includes all essential information: care receiver name, date, time, duration, location, distance, earnings
- [ ] One-click access to full booking details
- [ ] Accept and Decline buttons prominent and clearly labeled
- [ ] Mobile-optimized layout (full-width cards, large tap targets)
- [ ] Email notification sent when new request received (<2 minutes)
- [ ] Request auto-declines if no response within 24 hours, with notification to caregiver

**Success Metrics**:
- Average response time: <6 hours (target from FEAT-008)
- Acceptance rate: >70% (target from FEAT-008)
- Missed requests (auto-declined): <10%

---

### User Story 2: Viewing Upcoming Bookings

**As a caregiver**, I want to easily see my upcoming bookings so that I can plan my schedule and prepare for sessions.

**Acceptance Criteria**:
- [ ] Next booking displayed prominently on dashboard (large card format)
- [ ] Booking today highlighted with distinct visual treatment (green accent, "TODAY" label)
- [ ] Essential information visible: care receiver name, date, time, duration, location
- [ ] Phone number and address visible for confirmed bookings (after acceptance)
- [ ] Quick action buttons: "View Details", "Message [Name]"
- [ ] List of next 3-4 bookings below main card
- [ ] "View All Bookings" link for complete list
- [ ] Empty state messaging when no upcoming bookings
- [ ] Mobile-optimized card layout

**Success Metrics**:
- Dashboard engagement: >80% of caregivers view dashboard before sessions
- Booking detail page views: >60% of caregivers check details day before booking
- No-show rate: <2% (indicates caregivers are prepared)

---

### User Story 3: Tracking Earnings

**As a caregiver**, I want to see my earnings summary on the dashboard so that I can track my income without navigating away.

**Acceptance Criteria**:
- [ ] Earnings summary visible on dashboard without scrolling (above the fold on desktop, top section on mobile)
- [ ] Total earned (all time) displayed prominently (large, bold)
- [ ] This month earnings shown separately
- [ ] Pending payouts with breakdown (number of bookings, total amount)
- [ ] Next payout date and amount shown
- [ ] Platform commission not shown on dashboard summary (only on full Earnings page for clarity)
- [ ] "View Full Earnings" link to detailed page
- [ ] Mobile-friendly compact layout

**Success Metrics**:
- Earnings page views: >50% of caregivers per month
- Earnings-related support tickets: <1% of users (indicates clarity)

---

### User Story 4: Completing Onboarding

**As a new caregiver**, I want clear guidance on completing my profile setup so that I can start receiving bookings quickly.

**Acceptance Criteria**:
- [ ] Onboarding checklist visible on dashboard until all steps complete
- [ ] Progress bar shows completion percentage (e.g., 5 of 7 steps = 71%)
- [ ] Each step has clear status icon (✓ complete, ⧗ pending, ⚬ not started)
- [ ] Clicking step navigates to relevant page
- [ ] "Continue Setup" button jumps to next incomplete step
- [ ] Pending admin review step shows estimated wait time (1-2 business days)
- [ ] Dismissible but returns on next login until 100% complete
- [ ] Celebratory messaging on completion ("Your profile is now live!")
- [ ] Mobile-optimized checklist (collapsed completed steps)

**Success Metrics**:
- Onboarding completion rate: >65% (target from FEAT-038)
- Time to profile approval: <48 hours median (target from FEAT-038)
- Drop-off analysis: Identify highest drop-off step (optimize that step)

---

### User Story 5: Managing Availability

**As a caregiver**, I want to see my current availability status on the dashboard so that I know if I need to add more hours to receive bookings.

**Acceptance Criteria**:
- [ ] Availability summary shows hours available this week
- [ ] Visual indicator (green/amber/red) based on availability level
- [ ] Healthy availability (≥15 hours): Green indicator, positive messaging
- [ ] Low availability (5-14 hours): Amber indicator, gentle prompt to add hours
- [ ] Critical availability (<5 hours): Red indicator, stronger prompt
- [ ] "Manage Calendar" button links to Calendar page
- [ ] Tooltip explains how availability is calculated
- [ ] Mobile-optimized compact layout

**Success Metrics**:
- Caregivers with ≥15 hours availability: >70% of active caregivers
- Calendar page visits from dashboard link: >30% of caregivers per week
- Correlation: Higher availability = more booking requests (data validation)

---

### User Story 6: Monitoring Profile Performance

**As a caregiver**, I want to understand how my profile is performing so that I can optimize it to receive more bookings.

**Acceptance Criteria**:
- [ ] Profile performance summary visible on dashboard
- [ ] Metrics shown: Profile views, booking requests, acceptance rate, response time
- [ ] Trend indicators (↑↓) comparing to previous week
- [ ] Visual indicators (checkmarks, warnings) based on performance thresholds
- [ ] "Improve Your Profile" link to contextual optimization tips
- [ ] Tips personalized based on metrics (e.g., slow response time → enable notifications)
- [ ] Metrics update weekly (not real-time)
- [ ] Mobile-optimized compact layout

**Success Metrics**:
- Profile optimization tips viewed: >40% of caregivers per month
- Caregivers taking action after viewing tips: >50%
- Correlation: Higher acceptance rate & faster response time = more bookings

---

### User Story 7: Accessing Quick Actions

**As a caregiver**, I want one-click access to common tasks so that I can navigate the platform efficiently.

**Acceptance Criteria**:
- [ ] Quick Actions section at bottom of dashboard
- [ ] Buttons: View All Bookings, Manage Calendar, Update Profile, Messages, View Earnings, Help Center
- [ ] Horizontal button row on desktop (3-4 buttons per row)
- [ ] Stacked buttons on mobile (full-width)
- [ ] Consistent iconography across platform
- [ ] Messages button shows unread count badge
- [ ] Mobile: Quick actions also in bottom navigation bar for key tasks

**Success Metrics**:
- Quick Actions usage: >50% of dashboard visits include clicking at least one quick action
- Most used: Manage Calendar (30%+), View All Bookings (25%+), View Earnings (20%+)

---

## 10. Success Metrics

### 10.1 Primary Metrics (Dashboard-Specific)

**Engagement Metrics**:
- **Dashboard visits per week**: Target 7+ for active caregivers (daily check-in habit)
- **Time on dashboard**: Target 1-2 minutes median (efficient, not overwhelming)
- **Mobile vs desktop usage**: Expected 70% mobile, 30% desktop

**Action Metrics**:
- **Booking request response rate**: >90% (measured: responded within 24 hours)
- **Average response time**: <6 hours median (critical for acceptance rate)
- **Acceptance rate**: >70% (measured: accepted / total requests)
- **Onboarding completion rate**: >65% (new caregivers completing all 7 steps)

**Conversion Metrics**:
- **Time to first booking accepted**: <14 days median (after profile approval)
- **Dashboard → Calendar clicks**: >30% weekly (availability management engagement)
- **Dashboard → Earnings clicks**: >50% monthly (financial transparency interest)
- **Dashboard → Profile clicks**: >20% monthly (ongoing optimization)

### 10.2 Secondary Metrics (Platform Health)

**Quality Metrics**:
- **Caregiver satisfaction with dashboard**: >4.0/5.0 (quarterly survey)
- **Dashboard-related support tickets**: <2% of caregivers per month
- **Feature discovery**: >70% of caregivers use at least 3 dashboard features weekly

**Business Metrics**:
- **Active caregivers (1+ booking per month)**: Correlated with dashboard engagement
- **Caregiver retention (3+ months)**: >60% retention for caregivers with high dashboard engagement
- **Earnings per caregiver**: Higher for caregivers who check dashboard daily

### 10.3 Dashboard Performance (Technical)

- **Page load time**: <2 seconds on 4G mobile
- **Time to interactive**: <3 seconds
- **Dashboard API response time**: <500ms for critical data (booking requests, earnings)
- **Mobile usability score**: >90 (Google PageSpeed Insights)
- **Accessibility score**: 100 (Lighthouse audit, WCAG 2.1 AA compliance)

---

## 11. Accessibility Requirements

### 11.1 WCAG 2.1 AA Compliance

**Visual Design**:
- Color contrast ratio: Minimum 4.5:1 for normal text, 3:1 for large text
- Urgent states (booking requests expiring) must not rely solely on color (use icons + text labels)
- Font size: Minimum 16px for body text (many elderly caregivers, legibility critical)
- Line height: Minimum 1.5 for body text
- Interactive elements (buttons, links): Minimum 44px × 44px touch target on mobile

**Keyboard Navigation**:
- All interactive elements accessible via Tab key
- Logical tab order (top to bottom, left to right)
- Visible focus indicators (outline, highlight)
- Keyboard shortcuts for common actions:
  - `A` - Accept booking request
  - `D` - Decline booking request
  - `C` - View Calendar
  - `E` - View Earnings
  - `/` - Search/navigate

**Screen Reader Support**:
- Semantic HTML (headings, landmarks, lists)
- ARIA labels for icons and interactive elements
- Announcements for dynamic content updates (e.g., "New booking request received")
- Skip navigation link at top of page ("Skip to main content")
- Alt text for all images (profile photos, icons)

**Cognitive Accessibility**:
- Clear, simple language (avoid jargon)
- Consistent layout across sessions
- Predictable interactions (buttons do what they say)
- Error prevention (confirmation modals for destructive actions)
- Helpful error messages with clear recovery paths

### 11.2 Assistive Technology Testing

**Required Testing**:
- JAWS (Windows screen reader)
- NVDA (Windows screen reader, free)
- VoiceOver (macOS/iOS screen reader)
- TalkBack (Android screen reader)
- Keyboard-only navigation (no mouse)
- High contrast mode (Windows)
- Zoom up to 200% (text remains readable, layout intact)

---

## 12. Technical Considerations

### 12.1 Data Fetching & Performance

**Dashboard API Endpoints**:
```
GET /api/caregiver/dashboard
Response:
{
  "pendingRequests": [...],           // Booking requests needing response
  "nextBooking": {...},                // Nearest upcoming booking
  "upcomingBookings": [...],           // Next 7 days
  "earnings": {
    "totalAllTime": 1234.50,
    "thisMonth": 340.00,
    "pendingPayouts": [...]
  },
  "availability": {
    "hoursThisWeek": 24,
    "status": "healthy"
  },
  "profilePerformance": {
    "viewsThisWeek": 23,
    "bookingRequestsThisWeek": 4,
    "acceptanceRate": 0.85,
    "avgResponseTime": "4 hours"
  },
  "onboarding": {
    "complete": false,
    "steps": [...]
  },
  "notifications": [...]              // Recent unread notifications
}
```

**Caching Strategy**:
- Pending booking requests: No cache (real-time critical)
- Upcoming bookings: 5-minute cache
- Earnings: 1-hour cache (acceptable delay)
- Profile performance: 24-hour cache (updates daily)
- Onboarding checklist: 5-minute cache

**Real-Time Updates**:
- WebSocket connection for booking requests (instant notification)
- Fallback: Long polling every 30 seconds if WebSocket unavailable
- Visual + audio notification when new booking request arrives

### 12.2 State Management

**Dashboard State**:
- Use Redux or similar state management for complex dashboard state
- Separate slices: bookings, earnings, availability, profile, notifications
- Optimistic updates for user actions (accept/decline booking)
- Rollback on API failure with clear error messaging

**Session State**:
- Persist collapsed/expanded sections in localStorage (user preference)
- Remember notification preferences
- Cache dashboard data for offline viewing (service worker)

### 12.3 Error Handling

**API Failure Scenarios**:
1. **Dashboard data fetch fails**:
   - Show cached data with "Data may be outdated" banner
   - Retry button available
   - Log error to monitoring system

2. **Booking acceptance fails**:
   - Rollback optimistic UI update
   - Clear error message: "We couldn't accept this booking. Please try again or contact support if the issue persists."
   - Offer "Retry" button
   - Preserve booking request in dashboard (don't disappear)

3. **Partial data failure**:
   - Show available sections, grey out unavailable sections
   - Example: Earnings section shows "Unable to load earnings. Try again."
   - Don't block entire dashboard if one section fails

**User-Facing Error Messages**:
- Avoid technical jargon ("Server error 500")
- Explain impact: "We couldn't load your earnings right now"
- Provide action: "Refresh the page or try again in a few minutes"
- Offer support: "If this continues, contact support@icare.com"

### 12.4 Analytics & Tracking

**Dashboard Events to Track**:
```javascript
// Page views
trackEvent('Dashboard Viewed', {
  caregiverId: userId,
  hasPendingRequests: boolean,
  onboardingComplete: boolean
});

// Actions
trackEvent('Booking Request Accepted', {
  caregiverId: userId,
  bookingId: bookingId,
  responseTime: duration
});

trackEvent('Booking Request Declined', {
  caregiverId: userId,
  bookingId: bookingId,
  reason: string
});

trackEvent('Dashboard Section Clicked', {
  caregiverId: userId,
  section: 'earnings' | 'calendar' | 'profile' | etc.
});

// Engagement
trackEvent('Onboarding Step Completed', {
  caregiverId: userId,
  step: number,
  stepName: string
});
```

**Dashboard Heatmap Analysis**:
- Use Hotjar or similar to understand where caregivers click most
- Identify unused sections (candidates for removal or optimization)
- A/B test different layouts based on heatmap data

### 12.5 Responsive Breakpoints

```css
/* Mobile (default) */
@media (min-width: 320px) { ... }

/* Tablet */
@media (min-width: 768px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }

/* Large desktop */
@media (min-width: 1440px) {
  max-width: 1400px; /* Don't stretch content too wide */
  margin: 0 auto;    /* Center content */
}
```

### 12.6 Component Library & Design System

**Reusable Components**:
- Card (base component for booking cards, earnings summary, etc.)
- Button (primary, secondary, danger variants)
- Badge (notification counts, status indicators)
- ProgressBar (onboarding checklist)
- Modal (booking details, confirmations)
- Countdown Timer (booking request deadlines)
- Avatar (care receiver profile photos)

**Design Tokens**:
```javascript
// Colors
--color-primary: #2E5B6C;     // iCare brand blue
--color-success: #4CAF50;     // Green for positive states
--color-warning: #FF9800;     // Amber for caution
--color-danger: #F44336;      // Red for urgent/error
--color-neutral: #757575;     // Grey for secondary info

// Spacing
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;

// Typography
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 24px;
--font-size-2xl: 32px;
```

---

## 13. Implementation Roadmap

### Phase 1: MVP Dashboard (Sprint 1-3)

**Sprint 1**: Core Layout & Booking Requests
- Dashboard shell with responsive layout
- Pending booking requests section (highest priority)
- Accept/Decline functionality
- Basic navigation header

**Sprint 2**: Upcoming Bookings & Earnings
- Next booking card
- Upcoming bookings list
- Earnings summary component
- Quick actions section

**Sprint 3**: Onboarding & Polish
- Onboarding checklist component
- Availability status component
- Profile performance component
- Empty states and error handling
- Mobile optimization

**Acceptance Gate**:
- All P0 features functional
- Mobile usability score >85
- Accessibility audit passing (WCAG 2.1 AA)
- User testing with 5 caregivers (success rate >80% for core tasks)

### Phase 2: Enhancements (Sprint 4-6)

**Sprint 4**: Smart Features
- Scheduling insights
- Contextual tips and optimization suggestions
- Push notifications (if mobile app ready)

**Sprint 5**: Advanced Analytics
- Enhanced earnings charts
- Recurring booking management
- Care receiver preferences learning

**Sprint 6**: Gamification & Engagement
- Achievement badges
- Profile completion score
- Leaderboard (optional, if competitive culture desired)

---

## 14. Open Questions & Assumptions

### Open Questions Requiring Validation

1. **Notification Preferences**: Should caregivers be able to customize which notifications appear on dashboard vs email-only? (Test with pilot users)

2. **Earnings Visibility**: Should dashboard show gross earnings (before commission) or net earnings (after commission) by default? (Financial transparency vs simplicity trade-off)

3. **Calendar Integration**: How important is "Add to Calendar" (Google Calendar, iCal) functionality for MVP? (User interviews needed)

4. **Booking Request Stacking**: If caregiver has 5+ pending requests, should dashboard show all or paginate? (Performance vs visibility trade-off)

5. **Profile Performance Comparison**: Should caregivers see how they rank compared to others in their area? (Motivation vs discouragement risk)

6. **Auto-Refresh**: Should dashboard auto-refresh every X minutes, or rely on manual refresh + WebSocket for critical updates? (Balance between freshness and server load)

7. **Dark Mode**: Is dark mode important for elderly caregivers, or lower priority? (Accessibility consideration)

### Assumptions to Test

1. **Assumption**: Caregivers will check dashboard at least daily if actively seeking bookings.
   **Test**: Track dashboard visit frequency in pilot phase.

2. **Assumption**: Most caregivers will access dashboard via mobile (70%), not desktop.
   **Test**: Analytics on device type during beta.

3. **Assumption**: Countdown timer on booking requests creates urgency without anxiety.
   **Test**: User interviews about emotional response to timer.

4. **Assumption**: Onboarding checklist encourages completion (vs overwhelming new users).
   **Test**: Completion rate comparison (with checklist vs without in A/B test).

5. **Assumption**: Earnings transparency builds trust and reduces disputes.
   **Test**: Monitor earnings-related support tickets (should be <1%).

6. **Assumption**: Profile performance metrics motivate optimization (vs discouragement if metrics are low).
   **Test**: User surveys on emotional response to metrics.

---

## 15. Appendix: User Testing Plan

### 15.1 Usability Testing Protocol

**Participants**: 10 caregivers (5 new, 5 experienced)

**Tasks**:
1. Accept a booking request (time to completion, success rate)
2. Find next upcoming booking details (time, success rate)
3. Check total earnings this month (time, success rate)
4. Add availability for next week (time, success rate)
5. Complete next onboarding step (new caregivers only)

**Success Criteria**:
- Task completion rate: >85%
- Average time per task: <2 minutes
- User satisfaction: >4.0/5.0
- Critical issues identified: <3
- Severity 1 bugs: 0

**Observation Points**:
- Where do users look first on dashboard?
- Do they understand the onboarding checklist?
- Are urgent actions (booking requests) noticed immediately?
- Do they understand earnings breakdown (gross vs net)?
- Mobile vs desktop experience differences

### 15.2 A/B Testing Opportunities

**Test 1**: Onboarding Checklist Position
- Variant A: Checklist at top of dashboard (blocks other content)
- Variant B: Checklist in collapsible section below urgent actions
- Metric: Onboarding completion rate

**Test 2**: Earnings Display
- Variant A: Show net earnings (after commission) by default
- Variant B: Show gross earnings (before commission) by default
- Metric: Earnings-related support tickets, user satisfaction

**Test 3**: Booking Request Visual Treatment
- Variant A: Orange/amber background (urgency)
- Variant B: Blue brand color with countdown timer emphasis
- Metric: Response time, caregiver anxiety (survey)

---

## 16. Revision History

| Version | Date       | Author       | Changes                          |
|---------|------------|--------------|----------------------------------|
| 1.0     | 2026-01-30 | Product Team | Initial draft for review         |

---

## 17. Approval & Sign-Off

**Document Status**: Draft
**Next Review Date**: 2026-02-06

**Stakeholders**:
- [ ] Product Manager (Owner)
- [ ] Design Lead
- [ ] Engineering Lead
- [ ] Safeguarding Officer
- [ ] Customer Support Manager

**Approval Process**:
1. Internal review (Product, Design, Engineering)
2. User testing with 10 caregivers
3. Iterate based on feedback
4. Final approval by Product Manager
5. Handoff to design and engineering

---

**END OF SPECIFICATION**

For questions or feedback, contact: product@icare.com
