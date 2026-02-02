# Pre-Launch Email Capture: Minimal GDPR Requirements

**Document Purpose**: Practical GDPR compliance guide for pre-launch email capture (waitlist and newsletter).

**Document Owner**: UK Healthcare Compliance Specialist
**Created**: 2026-02-01
**Status**: ACTIVE - Implementation Required

---

## Context

**What we're doing**: Collecting emails via signup forms for waitlist ("Join the Waitlist") and newsletter ("Care Guidance").

**Data collected**:
- Email address (mandatory)
- Name (optional)
- Role preference: Family/Caregiver (optional)

**Legal requirements**: UK GDPR and Privacy and Electronic Communications Regulations (PECR).

**Goal**: Minimal compliance for pre-launch. Full DPIA deferred to Tier 1 marketplace launch.

---

## 1. Legal Basis for Processing

### Recommendation: CONSENT

**Why consent, not legitimate interest?**

For email marketing (newsletter) and waitlist management, **consent** is the clearest and safest legal basis:

| Legal Basis | Pre-Launch Email Capture |
|-------------|--------------------------|
| **Consent** | Yes - User actively chooses to receive emails |
| **Legitimate Interest** | Risky - ICO requires balancing test; harder to justify for marketing |
| **Contract** | No - No contractual relationship exists pre-launch |

**Consent benefits**:
- Clear and unambiguous
- Satisfies PECR requirements for marketing emails
- Easy to explain to users
- Simple withdrawal mechanism (unsubscribe)

**Consent requirements**:
- Freely given
- Specific and informed
- Unambiguous indication (affirmative action)
- Easy to withdraw

---

## 2. Required Consent Language

### Copy-Paste Text for Signup Forms

#### Waitlist Signup Form

**Fields**:
- Email address (required)
- Name (optional)
- Role: Family / Caregiver (optional radio buttons)

**Consent checkbox** (required, unchecked by default):

```
[ ] I agree to receive updates about iCare's launch, including priority access
    notifications and platform news. I can unsubscribe at any time.
```

**Below form, before submit button**:

```
By joining the waitlist, you agree to our Privacy Policy. We'll only use your
email to send you launch updates and priority access information. No spam,
unsubscribe anytime.
```

**Privacy Policy link**: Must be present and functional.

---

#### Newsletter Signup Form ("Care Guidance")

**Fields**:
- Email address (required)
- Name (optional)

**Consent checkbox** (required, unchecked by default):

```
[ ] I agree to receive the Care Guidance newsletter with articles, tips, and
    resources about elderly care. I can unsubscribe at any time.
```

**Below form**:

```
By subscribing, you agree to our Privacy Policy. We send one email per week
with care guidance content. Unsubscribe anytime.
```

---

### Copy Requirements

**All consent mechanisms must**:
- Use an **opt-in checkbox** (unchecked by default)
- Use clear, plain English
- Specify what user will receive
- Include frequency where known
- Link to Privacy Policy
- State "unsubscribe anytime"

**Do NOT**:
- Pre-check consent boxes (non-compliant)
- Hide consent in Terms and Conditions
- Use confusing negative framing ("Uncheck to opt out")
- Bundle multiple consents into one checkbox

---

## 3. What Data Can Be Collected

### Field-by-Field Guidance

| Field | Status | Legal Basis | Data Minimisation Notes |
|-------|--------|-------------|-------------------------|
| **Email address** | Mandatory | Consent | Essential for communication purpose |
| **Name** | Optional | Consent | Improves personalisation but not required |
| **Role (Family/Caregiver)** | Optional | Consent | Allows segmented communication; acceptable |
| **Phone number** | Not recommended | - | Not needed for email capture; deferred |
| **Postcode** | Not recommended | - | Not needed pre-launch; collect later |
| **Medical information** | Prohibited | - | Special category data; requires Article 9 basis |
| **Care needs** | Prohibited | - | Health-inferring data; deferred to Tier 1+ |

**Data minimisation principle**: Collect only what is necessary for the stated purpose (sending emails). More data can be collected during onboarding when product launches.

---

## 4. Data Retention Policy

### Retention Schedule

| Email List | Retention Period | Deletion Trigger |
|------------|------------------|------------------|
| **Waitlist (active)** | Until platform launch + 6 months | User converts to platform user OR requests deletion |
| **Waitlist (inactive)** | 24 months maximum | No engagement with emails for 12 months + deletion after further 12 months |
| **Newsletter** | Indefinite (while subscribed) | User unsubscribes OR requests deletion |
| **Unsubscribed users** | 30 days | Retain email on suppression list to prevent re-subscription, then delete other data |

**Automated deletion**: Implement automated processes to delete inactive waitlist emails after 24 months.

**Re-engagement campaign**: At 12 months of inactivity, send re-engagement email: "Still interested? Click to stay on the list or we'll remove you in 30 days."

**Privacy Policy statement**:

```
We retain waitlist emails until you convert to a user or for a maximum of 24
months if inactive. Newsletter subscribers remain on the list until they
unsubscribe. You can request deletion at any time.
```

---

## 5. Email Marketing Requirements (PECR)

### PECR Compliance Checklist

**Privacy and Electronic Communications Regulations** require:

1. **Consent for marketing emails**: Obtained via opt-in checkbox (covered above)

2. **Identify sender clearly**: Every email must show it's from iCare

3. **Unsubscribe mechanism**: Every email must include working unsubscribe link

4. **Valid contact address**: Footer must include valid postal or email address

5. **No deceptive subject lines**: Subject must reflect email content

**Email footer template**:

```
You're receiving this email because you joined the iCare waitlist/newsletter.

Unsubscribe | Update Preferences | Privacy Policy

iCare Ltd
[Registered Address]
Contact: hello@icare.co.uk
```

**Subject line guidance**:
- Honest representation of content
- No clickbait or deceptive claims
- Include [iCare] or company name for brand recognition

---

## 6. Double Opt-In Recommendation

### Recommendation: NO (Single Opt-In Acceptable)

**Single opt-in**: User submits form, immediately added to list, receives confirmation email.

**Double opt-in**: User submits form, receives confirmation email, must click link to confirm before being added.

**Analysis**:

| Factor | Single Opt-In | Double Opt-In |
|--------|---------------|---------------|
| **GDPR requirement** | Not required | Not required |
| **PECR requirement** | Not required | Not required |
| **Data quality** | Lower (possible typos) | Higher (verified emails) |
| **Conversion rate** | Higher (no friction) | Lower (extra step) |
| **Spam complaints** | Slightly higher risk | Lower risk |
| **Implementation** | Simple | More complex |

**Decision**: Single opt-in is legally compliant and reduces friction for pre-launch list building.

**Mitigation for single opt-in risks**:
- Send immediate welcome email confirming subscription
- Include unsubscribe link in first email
- Monitor bounce rates and remove invalid emails

**Confirmation email** (sent immediately after signup):

```
Subject: Welcome to the iCare Waitlist

Thanks for joining! You're now on our priority list for early access.

You'll receive updates as we get closer to launch, including:
- Exclusive early access before public launch
- Behind-the-scenes updates
- The chance to shape what we build

Didn't sign up? Unsubscribe here.

Questions? Reply to this email.
```

---

## 7. Privacy Notice Requirements

### What Must Be Displayed at Signup

**Minimum privacy information** (can be via link to full Privacy Policy):

1. **Identity**: Who is collecting data (iCare Ltd)
2. **Purpose**: Why we're collecting email (waitlist updates, newsletter)
3. **Legal basis**: Consent
4. **Recipients**: Who receives data (email service provider)
5. **Retention**: How long we keep data (see section 4)
6. **Rights**: Right to access, delete, withdraw consent
7. **Contact**: How to exercise rights (email address)

**At signup form** (inline or linked):

```
Privacy Notice Summary

We collect your email to send waitlist updates [or newsletter]. We use
[Email Provider] to send emails. You can unsubscribe or request deletion
anytime by emailing privacy@icare.co.uk.

Full Privacy Policy: [link]
```

**Full Privacy Policy**: Create lightweight privacy policy (500-800 words) covering email capture only. Full DPIA-backed policy deferred to marketplace launch.

**See**: `/docs/tiers/tier1/website-content/legal/privacy-policy.md` for template.

---

## 8. Third-Party Processor Requirements

### Email Service Provider Compliance

**Likely providers**: Mailchimp, ConvertKit, SendGrid, or similar.

**GDPR requirements for processors**:

1. **Data Processing Agreement (DPA)**: Must have written contract specifying processor obligations.

2. **Processor location**: If outside UK/EEA, must have adequate safeguards (Standard Contractual Clauses).

3. **Security measures**: Processor must implement appropriate technical and organizational measures.

**Checklist before choosing provider**:

- [ ] Provider offers GDPR-compliant DPA (most major providers do)
- [ ] DPA covers UK GDPR (not just EU GDPR)
- [ ] Provider has security certifications (ISO 27001, SOC 2)
- [ ] Provider allows data export (for data portability requests)
- [ ] Provider supports deletion requests
- [ ] Provider is UK/EEA based OR has Standard Contractual Clauses

**Recommended providers** (GDPR-compliant):
- Mailchimp (US-based, has SCCs, good GDPR support)
- ConvertKit (US-based, has SCCs, creator-friendly)
- SendGrid (US-based, has SCCs, transactional + marketing)
- MailerLite (EU-based, GDPR-native)

**Do NOT** use:
- Custom-built email system without security audit
- Providers without clear GDPR compliance documentation
- Providers that don't offer DPAs

---

## 9. Right to Erasure Process

### Simple Deletion Request Process

**User rights under GDPR**:
- Right to access data
- Right to rectification
- Right to erasure ("right to be forgotten")
- Right to withdraw consent

**Deletion request process**:

1. **Request channels**:
   - Email: privacy@icare.co.uk
   - Unsubscribe link in every email (for list removal)
   - Privacy Policy page (contact information)

2. **Response timeline**: 30 days maximum (GDPR requirement: "without undue delay")

3. **Verification**: Confirm identity (reply to email from registered address, or verify via other means if different email)

4. **Deletion scope**:
   - Remove from email list (waitlist or newsletter)
   - Delete associated data (name, role preference)
   - Retain email on suppression list (prevent accidental re-subscription)

5. **Confirmation**: Send confirmation email to user confirming deletion

**Template response**:

```
Subject: Data Deletion Confirmed

We've deleted your data from our records as requested. You have been
removed from our [waitlist/newsletter].

We've kept your email on a suppression list to prevent accidental
re-subscription. If you'd like this removed too, let us know.

If you change your mind, you're always welcome back.
```

**Suppression list**: Maintain list of unsubscribed/deleted emails to prevent:
- Accidental import from other sources
- Re-subscription via form without new consent
- GDPR requirement: demonstrate compliance with deletion requests

---

## 10. Unsubscribe Requirements

### What Every Email Must Include

**PECR requirement**: Every marketing email must provide easy opt-out.

**Unsubscribe mechanism**:

1. **Unsubscribe link**:
   - Clearly visible in footer
   - One-click unsubscribe (no login required)
   - Process immediately (no "allow 10 days")
   - Confirmation page after unsubscribe

2. **Email footer template**:

```
-------------------------------------------------------
You're receiving this because you joined the iCare [waitlist/newsletter].

Unsubscribe | Update Email Preferences | Privacy Policy

iCare Ltd | [Address] | hello@icare.co.uk
-------------------------------------------------------
```

3. **Unsubscribe confirmation page**:

```
You've Been Unsubscribed

You won't receive further emails from us.

Changed your mind? Re-subscribe here.

Questions? Contact privacy@icare.co.uk
```

4. **List-Unsubscribe header**: Include technical header for email clients

```
List-Unsubscribe: <mailto:unsubscribe@icare.co.uk?subject=unsubscribe>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

**Preference center** (optional but recommended):
- Allow users to choose email frequency
- Segment preferences (waitlist vs newsletter vs both)
- Update email address
- Useful for re-engagement

---

## Implementation Checklist

### Pre-Launch Email Capture Setup

**Legal Documents**:
- [ ] Create lightweight Privacy Policy for email capture
- [ ] Draft consent checkbox language
- [ ] Draft welcome email templates
- [ ] Draft unsubscribe confirmation

**Technical Setup**:
- [ ] Choose GDPR-compliant email service provider
- [ ] Sign Data Processing Agreement with provider
- [ ] Configure signup forms with opt-in checkboxes (unchecked by default)
- [ ] Implement unsubscribe mechanism
- [ ] Set up suppression list
- [ ] Configure automated deletion for inactive users (24 months)
- [ ] Add List-Unsubscribe headers to emails

**Email Templates**:
- [ ] Welcome email (waitlist)
- [ ] Welcome email (newsletter)
- [ ] Re-engagement email (12 months inactive)
- [ ] Footer template with unsubscribe link

**Processes**:
- [ ] Document data retention policy
- [ ] Create deletion request process
- [ ] Assign responsibility for privacy requests (privacy@icare.co.uk)
- [ ] Set calendar reminder for 12-month re-engagement campaign

**Testing**:
- [ ] Test signup flow
- [ ] Test welcome emails
- [ ] Test unsubscribe link
- [ ] Verify consent checkboxes are unchecked by default
- [ ] Verify Privacy Policy link works
- [ ] Test deletion request process

---

## Common Mistakes to Avoid

| Mistake | Why Non-Compliant | Correct Approach |
|---------|-------------------|------------------|
| **Pre-checked consent box** | Not freely given consent | Unchecked by default, user must actively check |
| **No Privacy Policy link** | Fails "informed consent" | Link at signup and in every email |
| **No unsubscribe link** | PECR violation | Include in every marketing email |
| **Keeping data indefinitely** | Fails data minimisation | Delete inactive waitlist emails after 24 months |
| **No Data Processing Agreement** | GDPR Article 28 violation | Sign DPA with email provider before collecting data |
| **Bundled consent** | Not "specific" consent | Separate consent for waitlist vs newsletter |
| **Slow deletion response** | GDPR timeline violation | Respond within 30 days |

---

## When to Escalate

**Seek legal counsel if**:
- ICO contacts you about a complaint
- You receive a Subject Access Request (SAR) you're unsure how to handle
- You experience a data breach (email list leaked)
- You want to use emails for purposes beyond original consent (new product line)
- You're unsure whether a particular email constitutes "marketing" under PECR

**Legal counsel NOT required for**:
- Standard signup form implementation (use this guide)
- Routine unsubscribe requests
- Choosing email service provider (if GDPR-compliant)
- Writing welcome emails

---

## Summary

**Minimum requirements for compliant email capture**:

1. Use consent as legal basis
2. Obtain consent via opt-in checkbox (unchecked by default)
3. Provide clear information about what user will receive
4. Link to Privacy Policy at signup
5. Delete inactive waitlist emails after 24 months
6. Include unsubscribe link in every email
7. Use GDPR-compliant email service provider with DPA
8. Respond to deletion requests within 30 days
9. Include contact information and sender identity in emails
10. Use honest subject lines

**Timeline**: This can be implemented in 1-2 weeks with standard email service providers.

**Cost**: 0-500 GBP (most email providers include GDPR features; legal review optional for this minimal use case).

**Risk level**: LOW - Email capture is the lowest-risk data processing activity. Full DPIA deferred to marketplace launch.

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-01 | UK Healthcare Compliance Specialist | Initial document created |

---

**END OF DOCUMENT**
