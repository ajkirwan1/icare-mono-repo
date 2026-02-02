# R0 Financial Analysis: Revenue Projections and Payment Models

**Document Purpose**: Financial analysis of the 15% commission model for R0 launch, including revenue projections, user requirements, and alternative payment model recommendations.

**Document Owner**: Product Director
**Document Status**: DRAFT - For Business Planning
**Last Updated**: 2026-02-02
**Version**: 1.0

---

## 1. Executive Summary

This document analyzes the financial viability of the Tier 1 (Companionship) marketplace under the proposed 15% commission model. It provides revenue projections, user acquisition targets, and alternative payment model recommendations.

**Key Findings**:
- At 15% commission, the platform requires approximately **667 booking hours per month** to generate £1,000 gross revenue
- To achieve **£10,000 monthly revenue**, approximately **50-100 active caregivers** and **200-400 care receivers** are needed
- Alternative models (subscription, hybrid) may provide more predictable revenue with lower transaction friction

---

## 2. Base Assumptions

### 2.1 Market Assumptions

| Parameter | Value | Source/Rationale |
|-----------|-------|------------------|
| Average caregiver hourly rate | £15.00 | UK living wage + margin for self-employed |
| Minimum booking duration | 2 hours | Tier 1 feature spec |
| Average booking duration | 3 hours | Industry average for companionship |
| Bookings per active care receiver per month | 4 | Weekly companionship visit |
| Hours per booking | 3 | Average session length |
| Caregiver utilization rate | 40% | Part-time, self-employed model |
| Platform commission | 15% | [PLACEHOLDER - FDR-008 pending] |

### 2.2 Cost Assumptions (Excluding Staff)

| Cost Category | Monthly Cost | Notes |
|---------------|--------------|-------|
| **Payment Processing** | | |
| Stripe fees (2.9% + 20p per transaction) | ~3.2% of GMV | Includes Connect payout fees |
| **Infrastructure** | | |
| Cloud hosting (AWS/GCP) | £200-500 | Scales with users |
| Database (managed PostgreSQL) | £50-150 | |
| CDN/Storage | £20-50 | |
| **Third-Party Services** | | |
| SMS verification (Twilio) | £0.04/SMS | ~£0.12 per user onboarding |
| Email service (SendGrid) | £0-50 | Free tier available |
| ID verification (Stripe Identity) | £1.50/verification | One-time per caregiver |
| **Compliance** | | |
| Insurance (platform liability) | £100-300 | Estimated |
| Legal/accounting | £200-500 | Monthly retainer |
| **Marketing** | | |
| Digital marketing | Variable | Customer acquisition |

### 2.3 Net Revenue Calculation

```
Gross Merchandise Value (GMV) = Total booking value
Platform Gross Revenue = GMV × 15%
Payment Processing Cost = GMV × 3.2%
Net Revenue = Platform Gross Revenue - Payment Processing Cost
Net Revenue = GMV × (15% - 3.2%) = GMV × 11.8%
```

**Effective Net Margin on GMV**: 11.8% (after payment processing)

---

## 3. Revenue Projections by User Volume

### 3.1 Revenue Table: 15% Commission Model

| Monthly GMV | Gross Revenue (15%) | Payment Fees (~3.2%) | Net Revenue | Required Booking Hours* |
|-------------|---------------------|----------------------|-------------|------------------------|
| £1,000 | £150 | £32 | £118 | 67 hours |
| £2,500 | £375 | £80 | £295 | 167 hours |
| £5,000 | £750 | £160 | £590 | 333 hours |
| £10,000 | £1,500 | £320 | £1,180 | 667 hours |
| £25,000 | £3,750 | £800 | £2,950 | 1,667 hours |
| £50,000 | £7,500 | £1,600 | £5,900 | 3,333 hours |
| £100,000 | £15,000 | £3,200 | £11,800 | 6,667 hours |
| £250,000 | £37,500 | £8,000 | £29,500 | 16,667 hours |
| £500,000 | £75,000 | £16,000 | £59,000 | 33,333 hours |

*At £15/hour average rate

### 3.2 User Volume Requirements

| Target Net Revenue | GMV Required | Active Care Receivers* | Active Caregivers** | Booking Hours/Month |
|-------------------|--------------|----------------------|--------------------|--------------------|
| £500/month | £4,237 | 24 | 6 | 282 |
| £1,000/month | £8,475 | 47 | 12 | 565 |
| £2,500/month | £21,186 | 118 | 30 | 1,412 |
| £5,000/month | £42,373 | 235 | 59 | 2,825 |
| £10,000/month | £84,746 | 471 | 118 | 5,650 |
| £25,000/month | £211,864 | 1,177 | 294 | 14,124 |
| £50,000/month | £423,729 | 2,354 | 589 | 28,249 |

*Assumes 4 bookings/month × 3 hours × £15/hour = £180 GMV per active care receiver
**Assumes 4:1 care receiver to caregiver ratio, 40% utilization

### 3.3 Break-Even Analysis (Fixed Costs Only)

Assuming minimum monthly fixed costs of **£1,000** (infrastructure, compliance, basic services):

| Fixed Cost Level | GMV Required | Booking Hours | Care Receivers |
|------------------|--------------|---------------|----------------|
| £500/month | £4,237 | 282 | 24 |
| £1,000/month | £8,475 | 565 | 47 |
| £2,000/month | £16,949 | 1,130 | 94 |
| £3,000/month | £25,424 | 1,695 | 141 |
| £5,000/month | £42,373 | 2,825 | 235 |

---

## 4. Revenue by Hours Worked

### 4.1 Caregiver Hour Economics

For each hour worked by a caregiver:

| Item | Amount | Recipient |
|------|--------|-----------|
| Care receiver pays | £15.00 | Platform (escrow) |
| Platform commission (15%) | £2.25 | Platform |
| Payment processing (~3.2%) | £0.48 | Stripe |
| Caregiver receives | £12.27 | Caregiver (via Connect) |
| **Platform net per hour** | **£1.77** | Platform |

### 4.2 Hours Required for Revenue Targets

| Target Monthly Revenue | Hours Required | Equivalent Full-Time Caregivers* |
|-----------------------|----------------|----------------------------------|
| £500 | 282 hours | 1.8 FTE |
| £1,000 | 565 hours | 3.5 FTE |
| £2,500 | 1,412 hours | 8.8 FTE |
| £5,000 | 2,825 hours | 17.7 FTE |
| £10,000 | 5,650 hours | 35.3 FTE |
| £25,000 | 14,124 hours | 88.3 FTE |
| £50,000 | 28,249 hours | 176.6 FTE |

*1 FTE = 160 hours/month (40 hours/week × 4 weeks)

### 4.3 Realistic Caregiver Utilization

Most caregivers on the platform will be part-time. Assuming average 20 hours/week (80 hours/month):

| Target Revenue | Platform Hours | Caregivers Needed (80 hrs/mo) | Caregivers Needed (40 hrs/mo) |
|---------------|----------------|-------------------------------|-------------------------------|
| £1,000 | 565 | 7 | 14 |
| £2,500 | 1,412 | 18 | 35 |
| £5,000 | 2,825 | 35 | 71 |
| £10,000 | 5,650 | 71 | 141 |
| £25,000 | 14,124 | 177 | 353 |

---

## 5. Alternative Payment Models

### 5.1 Model Comparison Matrix

| Model | Revenue Predictability | User Friction | Scalability | Alignment with Value |
|-------|----------------------|---------------|-------------|---------------------|
| **Transaction Commission (Current)** | Low | Medium | High | High |
| **Caregiver Subscription** | High | High | Medium | Medium |
| **Care Receiver Subscription** | High | High | Medium | Low |
| **Hybrid (Sub + Commission)** | Medium | Medium | High | High |
| **Freemium + Premium** | Medium | Low | High | Medium |
| **Lead Generation Fee** | Medium | Low | Medium | Low |

### 5.2 Model A: Transaction Commission (Current - 15%)

**How it works**: Platform takes 15% of each booking value

**Pros**:
- Aligns platform success with user success
- No upfront cost barrier for users
- Scales linearly with GMV
- Simple to understand

**Cons**:
- Revenue unpredictable month-to-month
- Incentivizes off-platform transactions
- High commission may deter price-sensitive users

**Best for**: Marketplaces with high transaction frequency and low trust for off-platform transactions

**Revenue projection at scale**:
- 1,000 active care receivers × 4 bookings × £45 (3 hrs × £15) = £180,000 GMV
- Platform revenue: £27,000/month gross, ~£21,240/month net

---

### 5.3 Model B: Caregiver Subscription

**How it works**: Caregivers pay monthly fee for platform access; care receivers book free

**Pricing options**:
| Tier | Monthly Fee | Features |
|------|-------------|----------|
| Basic | £29/month | Profile listing, 10 booking requests/month |
| Professional | £49/month | Unlimited bookings, featured placement, analytics |
| Premium | £79/month | Priority support, calendar sync, instant booking |

**Pros**:
- Predictable recurring revenue
- No transaction friction for care receivers
- Caregivers self-select (serious professionals only)
- No incentive for off-platform transactions

**Cons**:
- Barrier to caregiver supply acquisition
- Doesn't scale with booking volume
- Caregivers may churn if bookings don't justify cost

**Revenue projection**:
- 100 caregivers × £49 average = £4,900/month
- 500 caregivers × £49 average = £24,500/month
- Lower payment processing costs (subscription only)

**Break-even comparison**:
- Transaction model: Need £42,000 GMV for £5,000 net revenue
- Subscription model: Need ~102 caregivers at £49/month for £5,000 revenue

---

### 5.4 Model C: Care Receiver Subscription

**How it works**: Care receivers pay monthly fee for platform access; caregivers list free

**Pricing options**:
| Tier | Monthly Fee | Features |
|------|-------------|----------|
| Basic | £9.99/month | Search and contact 3 caregivers/month |
| Family | £19.99/month | Unlimited searches, family sharing, booking management |
| Premium | £29.99/month | Priority matching, dedicated support, background check visibility |

**Pros**:
- Very predictable revenue
- Low barrier for caregiver supply
- Attracts committed care seekers

**Cons**:
- High barrier for care receivers (vulnerable population)
- Doesn't scale with actual care delivered
- May feel exploitative to elderly/families

**Revenue projection**:
- 500 care receivers × £19.99 = £9,995/month
- 2,000 care receivers × £19.99 = £39,980/month

**Not recommended** for elderly care marketplace due to perception issues.

---

### 5.5 Model D: Hybrid (Subscription + Reduced Commission)

**How it works**: Lower commission rate combined with optional subscription tiers

**Structure**:
| User Type | Free Tier | Subscription Tier |
|-----------|-----------|-------------------|
| Care Receiver | 10% commission | £9.99/month + 5% commission |
| Caregiver | 10% commission deducted | £29/month + 5% commission |

**Pros**:
- Revenue from both transaction and subscription
- Choice reduces friction (users self-select)
- Subscription users are more engaged
- Lower commission for subscribers increases competitiveness

**Cons**:
- More complex pricing to communicate
- Revenue forecasting more difficult
- May cannibalize commission revenue

**Revenue projection (blended)**:
- 30% subscribers: £29 × 30 caregivers + £9.99 × 150 care receivers = £2,368/month subscriptions
- 70% free tier at 10%: £126,000 GMV × 10% = £12,600/month commissions
- Combined: ~£14,968/month (vs £15,000 pure commission at 15%)

**Recommended** as future evolution once market position established.

---

### 5.6 Model E: Freemium + Premium Features

**How it works**: Basic functionality free; premium features require payment

**Premium features for caregivers**:
| Feature | One-Time/Monthly | Price |
|---------|------------------|-------|
| Featured profile placement | Monthly | £19.99 |
| Instant booking capability | Monthly | £9.99 |
| Analytics dashboard | Monthly | £14.99 |
| Priority verification | One-time | £29.99 |
| Background check badge display | One-time | £9.99 |

**Premium features for care receivers**:
| Feature | One-Time/Monthly | Price |
|---------|------------------|-------|
| Advanced search filters | Monthly | £4.99 |
| Booking history export | One-time | £9.99 |
| Priority support | Monthly | £9.99 |

**Pros**:
- Low barrier to entry
- Users pay for value they perceive
- Can test feature value before pricing

**Cons**:
- Revenue highly variable
- May feel "nickel and diming"
- Core functionality must remain compelling when free

**Revenue projection**:
- Highly variable; typically 2-5% of users convert to paid features
- 1,000 users × 3% conversion × £15 average = £450/month (supplementary only)

**Not recommended** as primary model, but good for supplementary revenue.

---

### 5.7 Model F: Lead Generation / Connection Fee

**How it works**: Platform charges fee when care receiver and caregiver connect (not per booking)

**Pricing**:
- Connection fee: £5-15 per successful match
- Care receiver pays to unlock caregiver contact details

**Pros**:
- Simple, one-time payment
- No ongoing transaction monitoring needed
- Works for off-platform relationships

**Cons**:
- No ongoing revenue from successful matches
- Harder to maintain quality (no booking visibility)
- Safeguarding concerns (lose visibility of interactions)

**Not recommended** for regulated care marketplace due to safeguarding requirements.

---

## 6. Recommendations

### 6.1 R0 Launch Recommendation

**Proceed with 15% Transaction Commission** for R0 launch:

1. **Simplicity**: Easiest model to implement and explain
2. **Alignment**: Revenue grows with platform value delivered
3. **Data**: Transaction data enables future pricing optimization
4. **Flexibility**: Can adjust commission rate based on market feedback

### 6.2 Commission Rate Analysis

| Commission Rate | Platform Net/Hour | GMV for £10k Revenue | Competitiveness |
|-----------------|-------------------|---------------------|-----------------|
| 10% | £1.02 | £147,059 | High |
| 12% | £1.32 | £113,636 | High |
| 15% | £1.77 | £84,746 | Medium |
| 18% | £2.22 | £67,568 | Medium |
| 20% | £2.52 | £59,524 | Low |
| 25% | £3.27 | £45,872 | Low |

**Recommendation**: 15% is reasonable for launch. Consider reducing to 12% if competitor pressure increases or to incentivize early adopter growth.

### 6.3 Future Model Evolution

**Phase 1 (R0 Launch)**: 15% transaction commission
- Simple, proven model
- Collect transaction data
- Build user base

**Phase 2 (6-12 months)**: Introduce optional subscription tiers
- Caregiver subscription for power users (£29-49/month + reduced 8% commission)
- Care receiver subscription for families (£9.99/month + reduced 8% commission)
- Free tier remains at 15%

**Phase 3 (12-24 months)**: Premium features and services
- Featured placement for caregivers
- Advanced matching algorithms
- Background check upsells
- Insurance products

### 6.4 Additional Revenue Streams to Consider

| Revenue Stream | Potential | Timeline | Notes |
|----------------|-----------|----------|-------|
| **Caregiver training courses** | £50-200 per course | Phase 2 | Partner with training providers |
| **Insurance upsell** | 5-10% of premium | Phase 2 | White-label care insurance |
| **DBS check facilitation** | £20-40 per check | Phase 2 | Partnership with umbrella body |
| **Payroll services (Tier 2+)** | £5-10/month per caregiver | Tier 2 | When personal care requires PAYE |
| **Agency partnerships (Tier 4)** | 3-5% of contract value | Tier 4 | B2B care agency referrals |
| **Data/insights products** | Variable | Phase 3 | Anonymized market data |

---

## 7. Financial Targets Summary

### 7.1 R0 Launch Targets (First 6 Months)

| Metric | Month 1 | Month 3 | Month 6 |
|--------|---------|---------|---------|
| Active Care Receivers | 20 | 75 | 200 |
| Active Caregivers | 10 | 25 | 60 |
| Monthly GMV | £3,600 | £13,500 | £36,000 |
| Gross Revenue (15%) | £540 | £2,025 | £5,400 |
| Net Revenue (after Stripe) | £425 | £1,594 | £4,248 |
| Booking Hours | 240 | 900 | 2,400 |

### 7.2 Year 1 Projections

| Quarter | Care Receivers | Caregivers | GMV | Net Revenue |
|---------|---------------|------------|-----|-------------|
| Q1 | 75 | 25 | £40,500 | £4,779 |
| Q2 | 200 | 60 | £108,000 | £12,744 |
| Q3 | 400 | 120 | £216,000 | £25,488 |
| Q4 | 700 | 200 | £378,000 | £44,604 |
| **Year 1 Total** | - | - | **£742,500** | **£87,615** |

### 7.3 Cost Coverage Analysis

| Monthly Fixed Costs | GMV Required | Care Receivers Required |
|--------------------|--------------|------------------------|
| £1,000 (minimal) | £8,475 | 47 |
| £2,500 (basic ops) | £21,186 | 118 |
| £5,000 (with marketing) | £42,373 | 235 |
| £10,000 (scaled ops) | £84,746 | 471 |

---

## 8. Key Metrics to Track

### 8.1 Financial Health Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| GMV | Total value of bookings | Growing MoM |
| Take Rate | Gross revenue / GMV | 15% |
| Net Take Rate | Net revenue / GMV | 11.8% |
| ARPU (Care Receiver) | Revenue per active care receiver | £15-25/month |
| ARPU (Caregiver) | Revenue per active caregiver | £60-100/month |
| LTV:CAC | Lifetime value / acquisition cost | >3:1 |

### 8.2 Unit Economics

| Metric | Calculation | Target |
|--------|-------------|--------|
| Revenue per booking hour | Net revenue / total hours | £1.77 |
| Cost per acquisition (Care Receiver) | Marketing spend / new CRs | <£50 |
| Cost per acquisition (Caregiver) | Marketing spend / new CGs | <£100 |
| Caregiver churn rate | Caregivers lost / total | <10%/month |
| Care receiver churn rate | CRs lost / total | <15%/month |

---

## 9. Risk Factors

### 9.1 Revenue Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Off-platform transactions | High | Strong messaging features, escrow protection, trust badges |
| Price competition | Medium | Focus on trust/safety differentiation, not price |
| Caregiver supply shortage | High | Competitive payout rates, flexible working, good UX |
| Low booking frequency | Medium | Engagement features, reminders, subscription incentives |
| High payment processing costs | Low | Volume discounts, alternative processors |

### 9.2 Sensitivity Analysis

**If commission rate changes**:
| Scenario | Commission | Impact on £10k Revenue Target |
|----------|------------|-------------------------------|
| Baseline | 15% | £84,746 GMV required |
| Price war | 10% | £147,059 GMV required (+73%) |
| Premium positioning | 20% | £59,524 GMV required (-30%) |

**If average hourly rate changes**:
| Scenario | Avg Rate | Hours for £10k Revenue |
|----------|----------|------------------------|
| Lower rates | £12/hour | 7,062 hours (+25%) |
| Baseline | £15/hour | 5,650 hours |
| Higher rates | £18/hour | 4,708 hours (-17%) |

---

## 10. Conclusion

The 15% commission model is viable for R0 launch with the following conditions:

1. **Minimum viable scale**: ~50 active care receivers generating ~£9,000 GMV to cover basic fixed costs
2. **Growth trajectory**: Must reach ~200 active care receivers within 6 months to achieve sustainable unit economics
3. **Future evolution**: Plan for subscription tier introduction at 6-12 months to improve revenue predictability

**Recommendation**: Proceed with 15% commission for R0. Collect transaction data to inform future pricing decisions. Plan hybrid model introduction for Phase 2.

---

**Document Status**: DRAFT
**Last Updated**: 2026-02-02
**Version**: 1.0
**Next Review**: After R0 launch metrics available (Month 3)

---

**END OF DOCUMENT**
