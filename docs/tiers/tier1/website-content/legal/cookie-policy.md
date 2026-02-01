# Cookie Policy

**Effective Date**: [EFFECTIVE_DATE]
**Last Updated**: [LAST_UPDATED_DATE]

---

## IMPORTANT NOTICE

**THIS IS A DRAFT COOKIE POLICY REQUIRING LEGAL COUNSEL REVIEW**

This document is a draft created by the compliance specialist agent based on Privacy and Electronic Communications Regulations (PECR) requirements. This document MUST be reviewed and finalized by a qualified UK data protection solicitor before publication.

**[LEGAL REVIEW REQUIRED]**: All sections marked with this tag require specific legal counsel review.

---

## 1. Introduction

This Cookie Policy explains how [COMPANY_NAME] ("we," "us," or "our") uses cookies and similar tracking technologies on [PLATFORM_NAME] ("Platform").

**What are cookies?**

Cookies are small text files stored on your device (computer, tablet, or mobile phone) when you visit a website. Cookies help websites remember information about your visit, such as your preferences and login status.

**Why do we use cookies?**

We use cookies to:
- Keep you logged in to your account
- Remember your preferences
- Improve website performance and functionality
- Analyze how you use the Platform
- Ensure security and prevent fraud

**Your consent matters.** Some cookies require your consent under the Privacy and Electronic Communications Regulations (PECR). This policy explains which cookies require consent and how to manage your preferences.

**Reference**: Privacy and Electronic Communications Regulations 2003 (PECR), Regulation 6

---

## 2. Types of Cookies We Use

### 2.1 Essential Cookies (No Consent Required)

**What are essential cookies?**

Essential cookies are strictly necessary for the Platform to function. They enable core features like account login, security, and payment processing. Without these cookies, the Platform cannot operate properly.

**You CANNOT disable essential cookies** because they are required for the Platform to work.

**Essential cookies we use**:

| Cookie Name | Purpose | Duration | Third Party? |
|-------------|---------|----------|--------------|
| `session_id` | Maintains your login session | Session (deleted when you close browser) | No |
| `auth_token` | Verifies your identity and keeps you logged in | 30 days (or until logout) | No |
| `csrf_token` | Prevents Cross-Site Request Forgery (security) | Session | No |
| `load_balancer` | Distributes traffic across servers (performance) | Session | No |
| `cookie_consent` | Remembers your cookie preferences | 12 months | No |
| `stripe_mid` | Stripe fraud detection (payment security) | 1 year | Yes (Stripe) |
| `stripe_sid` | Stripe session ID (payment processing) | 30 minutes | Yes (Stripe) |

**Legal Basis**: PECR Regulation 6(4) - Essential cookies do not require consent.

### 2.2 Functional Cookies (Can Be Disabled)

**What are functional cookies?**

Functional cookies enhance your experience by remembering your preferences (e.g., language, interface settings). These cookies are helpful but NOT strictly necessary for the Platform to function.

**You CAN disable functional cookies** via cookie preferences, but this may affect your experience.

**Functional cookies we use**:

| Cookie Name | Purpose | Duration | Third Party? |
|-------------|---------|----------|--------------|
| `language_preference` | Remembers your language choice (English, Welsh, etc.) | 12 months | No |
| `ui_preferences` | Remembers your interface preferences (dark mode, font size) | 12 months | No |
| `location_consent` | Remembers if you consented to location services | 12 months | No |

**Legal Basis**: PECR Regulation 6 - Consent required (you can opt in or opt out).

### 2.3 Analytics Cookies (Require Consent) **[LEGAL REVIEW REQUIRED]**

**What are analytics cookies?**

Analytics cookies help us understand how you use the Platform (pages visited, time spent, features used). We use this information to improve the Platform and fix problems.

**You MUST consent to analytics cookies** before they are set. You can opt in via the cookie consent banner.

**Analytics cookies we use** (if you consent):

| Cookie Name | Purpose | Duration | Third Party? |
|-------------|---------|----------|--------------|
| `_ga` | Google Analytics: Tracks anonymous user behavior | 2 years | Yes (Google) |
| `_gid` | Google Analytics: Distinguishes users | 24 hours | Yes (Google) |
| `_gat` | Google Analytics: Throttles request rate | 1 minute | Yes (Google) |
| `platform_analytics` | Platform-specific usage tracking (anonymized) | 12 months | No |

**How we use analytics data**:
- Identify popular features and pages
- Detect bugs and performance issues
- Understand user flows and drop-off points
- Improve search and matching algorithms

**Data is anonymized**: We do NOT link analytics data to your identity. Google Analytics IP anonymization is enabled.

**Legal Basis**: PECR Regulation 6 - Consent required.

**Google Analytics Privacy Policy**: https://policies.google.com/privacy

### 2.4 Marketing Cookies (Require Consent)

**What are marketing cookies?**

Marketing cookies track your activity across websites to deliver targeted advertisements. They may also be used by third-party advertisers to show you relevant ads.

**You MUST consent to marketing cookies** before they are set. You can opt in via the cookie consent banner.

**At Tier 1 launch, we do NOT currently use marketing cookies.** If we introduce marketing cookies in the future, we will:
- Update this Cookie Policy
- Request your consent via the cookie banner
- Provide opt-out options

**Examples of marketing cookies** (if used in future):
- Google Ads conversion tracking
- Facebook Pixel
- LinkedIn Insight Tag

**Legal Basis**: PECR Regulation 6 - Consent required.

---

## 3. Third-Party Cookies **[LEGAL REVIEW REQUIRED]**

### 3.1 What are third-party cookies?

Third-party cookies are set by external services we use (e.g., Stripe for payments, Google for analytics). These cookies are governed by the third party's privacy policy, not ours.

### 3.2 Third-party services that set cookies:

**Stripe** (Payment Processing and ID Verification):
- Stripe sets cookies for fraud detection and secure payment processing
- Stripe Privacy Policy: https://stripe.com/privacy
- Stripe cookies: `__stripe_mid`, `__stripe_sid`, `m`

**Google Analytics** (if you consent):
- Google sets cookies to track anonymized usage data
- Google Privacy Policy: https://policies.google.com/privacy
- Google Analytics Opt-Out: https://tools.google.com/dlpage/gaoptout

**Other third parties** (if used at Tier 1):
- [LIST ANY OTHER THIRD-PARTY SERVICES THAT SET COOKIES]

**We do NOT control third-party cookies.** You should review their privacy policies to understand how they use cookies.

---

## 4. Cookie Consent Banner **[LEGAL REVIEW REQUIRED]**

### 4.1 How Cookie Consent Works

When you first visit the Platform, you will see a **cookie consent banner** that:
- Explains what cookies we use
- Allows you to accept or reject non-essential cookies
- Provides a link to this Cookie Policy
- Provides a link to manage cookie preferences

**Until you make a choice**, we ONLY set essential cookies (no consent required).

### 4.2 Consent Options

You can choose:
- **Accept All**: Allow all cookies (essential, functional, analytics, marketing)
- **Reject Non-Essential**: Only allow essential cookies (functional, analytics, marketing blocked)
- **Customize**: Choose which cookie categories to allow (functional, analytics, marketing)

Your choice is stored in a `cookie_consent` cookie (12-month duration).

### 4.3 Changing Your Mind

You can change your cookie preferences at any time via:
- **Account Settings**: Go to "Privacy & Cookies" settings
- **Footer Link**: Click "Cookie Preferences" in the website footer
- **Re-trigger Banner**: Delete the `cookie_consent` cookie in your browser to see the banner again

**Effect of withdrawing consent**: If you withdraw consent for analytics or marketing cookies, those cookies will be deleted and no new cookies will be set.

**Reference**: PECR Regulation 6 (consent must be specific, informed, freely given, and easily withdrawn)

---

## 5. How to Manage Cookies via Browser Settings

### 5.1 Browser Cookie Controls

All modern browsers allow you to control cookies via browser settings. You can:
- **Block all cookies** (may prevent the Platform from functioning)
- **Block third-party cookies** (blocks Google Analytics, Stripe fraud detection)
- **Delete existing cookies**
- **Set cookies to be deleted when you close the browser**

**Browser-specific instructions**:

**Google Chrome**:
1. Settings → Privacy and Security → Cookies and other site data
2. Choose: Block all cookies, Block third-party cookies, or Allow all cookies

**Mozilla Firefox**:
1. Settings → Privacy & Security → Cookies and Site Data
2. Choose: Standard, Strict, or Custom blocking

**Safari** (Mac/iOS):
1. Settings → Privacy → Manage Website Data
2. Block or remove cookies

**Microsoft Edge**:
1. Settings → Cookies and site permissions → Cookies and site data
2. Choose: Block all, Block third-party, or Allow all

### 5.2 Impact of Blocking Cookies

**If you block essential cookies**:
- You will NOT be able to log in
- The Platform will NOT function properly
- Payment processing will fail

**If you block functional cookies**:
- Your preferences (language, UI settings) will NOT be saved
- You will need to re-enter preferences each visit

**If you block analytics cookies**:
- We will NOT track your usage (anonymously)
- Platform functionality is NOT affected

**If you block marketing cookies**:
- You will NOT see targeted ads (if we use them in future)
- Platform functionality is NOT affected

### 5.3 Do Not Track (DNT) Signals

Some browsers send "Do Not Track" (DNT) signals to websites. The Platform respects DNT signals:
- If DNT is enabled, we treat it as **opting out of analytics and marketing cookies**
- Essential and functional cookies are still used (required for Platform operation)

**Note**: DNT is NOT a legal requirement, and not all websites honor DNT signals.

---

## 6. Other Tracking Technologies

### 6.1 Web Beacons (Pixel Tags)

We may use web beacons (also called pixel tags or clear GIFs) in emails to track:
- Whether you opened an email
- Which links you clicked

This helps us understand email effectiveness and improve communication.

**You can disable web beacons** by disabling images in your email client or opting out of marketing emails.

### 6.2 Local Storage

We use browser **local storage** to store non-sensitive data locally on your device (e.g., interface preferences, draft messages). Local storage is similar to cookies but:
- Stores more data
- Does NOT automatically expire
- Is NOT sent to the server with every request

You can clear local storage via browser settings (same location as cookies).

### 6.3 Session Storage

We use **session storage** for temporary data (e.g., booking form progress). Session storage is deleted when you close your browser tab.

---

## 7. Cookie Inventory **[LEGAL REVIEW REQUIRED]**

### 7.1 Complete Cookie Table

| Cookie Name | Category | Purpose | Duration | Third Party | Consent Required? |
|-------------|----------|---------|----------|-------------|-------------------|
| `session_id` | Essential | Login session | Session | No | No |
| `auth_token` | Essential | Authentication | 30 days | No | No |
| `csrf_token` | Essential | Security (CSRF protection) | Session | No | No |
| `load_balancer` | Essential | Traffic distribution | Session | No | No |
| `cookie_consent` | Essential | Cookie preferences | 12 months | No | No |
| `__stripe_mid` | Essential | Stripe fraud detection | 1 year | Yes (Stripe) | No (essential for payments) |
| `__stripe_sid` | Essential | Stripe session | 30 minutes | Yes (Stripe) | No (essential for payments) |
| `language_preference` | Functional | Language choice | 12 months | No | Yes |
| `ui_preferences` | Functional | Interface settings | 12 months | No | Yes |
| `location_consent` | Functional | Location services consent | 12 months | No | Yes |
| `_ga` | Analytics | Google Analytics user tracking | 2 years | Yes (Google) | Yes |
| `_gid` | Analytics | Google Analytics user distinction | 24 hours | Yes (Google) | Yes |
| `_gat` | Analytics | Google Analytics rate limiting | 1 minute | Yes (Google) | Yes |
| `platform_analytics` | Analytics | Platform usage tracking | 12 months | No | Yes |

**This table will be updated** if we add or remove cookies.

---

## 8. Children's Privacy

The Platform is NOT intended for children under 18. We do NOT knowingly set cookies on devices used by children.

If you are a parent and believe your child has used the Platform, please contact us at [DATA_PROTECTION_EMAIL].

---

## 9. Changes to This Cookie Policy

### 9.1 Updates

We may update this Cookie Policy to reflect:
- Changes in cookies used
- Changes in legal requirements (PECR, UK GDPR)
- New features or services

### 9.2 Notification

We will notify you of material changes by:
- Email notification to your registered email address
- Prominent notice on the Platform
- Updated "Last Updated" date at top of policy
- Re-trigger of cookie consent banner (if cookie categories change)

### 9.3 Continued Use

Continued use of the Platform after changes constitutes acceptance of updated Cookie Policy.

If you do not agree to changes, you can withdraw consent for non-essential cookies or delete your account.

---

## 10. Contact Us

**For cookie or privacy queries**:
- Email: [DATA_PROTECTION_EMAIL]
- Postal Address: [REGISTERED_ADDRESS]

**For general support**:
- Email: [SUPPORT_EMAIL]

**Information Commissioner's Office** (to complain):
- Website: https://ico.org.uk
- Helpline: 0303 123 1113

---

## 11. Related Policies

- **Privacy Policy**: [PRIVACY_POLICY_URL]
- **Terms of Service**: [TERMS_URL]

---

## 12. Regulatory References

- **Privacy and Electronic Communications Regulations 2003 (PECR)**: Regulation 6 (cookies and similar technologies)
- **UK GDPR**: Article 6 (lawful basis for processing), Article 7 (consent)
- **Data Protection Act 2018**: UK implementation of GDPR
- **ICO Guidance on Cookies**: https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/

---

**END OF COOKIE POLICY**

---

## Legal Review Checklist

- [ ] Reviewed by qualified UK data protection solicitor
- [ ] PECR Regulation 6 compliance confirmed
- [ ] Cookie categories correctly classified (essential vs. non-essential)
- [ ] Consent mechanism PECR-compliant (specific, informed, freely given, easily withdrawn)
- [ ] Third-party cookies identified and privacy policies linked
- [ ] Cookie consent banner implementation meets legal standards
- [ ] Browser controls accurately described
- [ ] Do Not Track (DNT) handling compliant
- [ ] Cookie inventory complete and accurate
- [ ] All placeholders replaced with actual values
- [ ] Plain English and accessibility review completed

---

## Implementation Notes for Development Team

**Cookie Consent Banner Requirements**:
1. Display on first visit (before setting non-essential cookies)
2. Provide clear explanation of cookie categories
3. Allow granular consent (accept all, reject all, customize)
4. Link to this Cookie Policy
5. Remember consent choice in `cookie_consent` cookie (12 months)
6. Provide "Manage Preferences" option in footer/account settings
7. Re-trigger banner if cookie categories change
8. Respect DNT signals (treat as opt-out of analytics/marketing)

**Cookie Implementation**:
1. Set essential cookies immediately (no consent required)
2. ONLY set functional/analytics/marketing cookies AFTER consent obtained
3. Delete non-essential cookies if consent withdrawn
4. Use `SameSite=Lax` or `SameSite=Strict` for security
5. Use `Secure` flag for HTTPS-only cookies
6. Set appropriate expiry times per cookie table above

**Analytics Integration**:
1. ONLY load Google Analytics script if consent obtained
2. Enable IP anonymization: `ga('set', 'anonymizeIp', true);`
3. Respect opt-out: https://tools.google.com/dlpage/gaoptout

---

**Document Status**: DRAFT - Requires Legal Counsel Review
**Document Owner**: Compliance Specialist
**Created**: 2026-02-01
**For**: Tier 1 Launch
