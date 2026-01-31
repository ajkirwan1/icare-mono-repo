# Third-Party Integrations

> **PLACEHOLDER** - Requires technical-architect agent (JOB 10).

## Status

**BLOCKED** - Requires API specification and provider selection decisions.

## Purpose

Documents all third-party service integrations for the UK elderly care marketplace.

## Required Integrations

### Payment Processing
- **Provider**: Stripe (assumed)
- **Features**: Payments, payouts, escrow, disputes
- **Status**: PENDING - Confirm provider selection

### Identity Verification
- **Provider**: TBD (Onfido / Stripe Identity / Yoti)
- **Features**: ID document verification, liveness check
- **Status**: BLOCKED - Provider selection required

### DBS Checks
- **Provider**: TBD (Trustid / UKCBC / DBS Update Service)
- **Features**: Enhanced DBS, Basic DBS, Update Service
- **Status**: BLOCKED - Provider selection required

### Email Service
- **Provider**: TBD (SendGrid / Mailgun / AWS SES)
- **Features**: Transactional email, notifications
- **Status**: PENDING

### SMS Service
- **Provider**: TBD (Twilio / MessageBird)
- **Features**: Phone verification, notifications
- **Status**: PENDING

### Cloud Infrastructure
- **Provider**: TBD (AWS / GCP / Azure)
- **Features**: Hosting, database, storage, CDN
- **Status**: PENDING

## Integration Specifications

> TODO: For each integration, document:
> - API endpoints used
> - Authentication method
> - Data flows
> - Error handling
> - Compliance considerations

## Related Documents

- [API Specification](api-spec.md)
- [Feature Map](../product/spec/feature-map.md)
