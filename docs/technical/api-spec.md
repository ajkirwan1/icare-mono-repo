# API Specification

> **PLACEHOLDER** - Requires technical-architect agent (JOB 9).

## Status

**BLOCKED** - Requires story-screen traceability and R0 wireframes completion.

## Purpose

Defines the REST/GraphQL API specification for the UK elderly care marketplace.

## Scope

API endpoints for:
- Authentication
- User management
- Caregiver profiles
- Care receiver profiles
- Search and discovery
- Bookings
- Payments
- Messaging
- Reviews
- Safeguarding
- Admin operations

## Format

> TODO: Choose OpenAPI 3.0 or GraphQL schema

## Endpoint Categories

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/verify-phone
POST /api/auth/forgot-password
```

### Users
```
GET    /api/users/me
PUT    /api/users/me
DELETE /api/users/me
```

### Caregivers
```
GET    /api/caregivers
GET    /api/caregivers/:id
PUT    /api/caregivers/:id/profile
GET    /api/caregivers/:id/availability
```

### Bookings
```
POST   /api/bookings
GET    /api/bookings
GET    /api/bookings/:id
PUT    /api/bookings/:id
DELETE /api/bookings/:id
```

> TODO: Complete endpoint specification

## Related Documents

- [Screen Inventory](../product/ui/screen-inventory.md)
- [State Maps](../product/spec/state-maps.md)
- [Integrations](integrations.md)
