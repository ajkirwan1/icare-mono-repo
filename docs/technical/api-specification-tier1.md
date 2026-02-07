# Tier 1 REST API Specification

**Document Purpose**: Complete REST API specification for the Tier 1 UK elderly care marketplace (companionship-only services).

**Document Owner**: Technical Architect
**Created**: 2026-02-06
**Status**: CANONICAL
**Tier**: Tier 1 (Companionship MVP)
**Backend**: Express.js with PostgreSQL
**Authentication**: JWT Bearer tokens
**Payment**: Stripe for payments, Stripe Connect for payouts

---

## Table of Contents

1. [API Overview](#1-api-overview)
2. [Authentication Endpoints](#2-authentication-endpoints)
3. [User Endpoints](#3-user-endpoints)
4. [Caregiver Endpoints](#4-caregiver-endpoints)
5. [Care Receiver Endpoints](#5-care-receiver-endpoints)
6. [Booking Endpoints](#6-booking-endpoints)
7. [Messaging Endpoints](#7-messaging-endpoints)
8. [Verification Endpoints](#8-verification-endpoints)
9. [Payment Endpoints](#9-payment-endpoints)
10. [Admin Endpoints](#10-admin-endpoints)
11. [Safeguarding Endpoints](#11-safeguarding-endpoints)
12. [WebSocket Events](#12-websocket-events)
13. [Error Handling](#13-error-handling)
14. [Pagination](#14-pagination)
15. [Rate Limiting](#15-rate-limiting)
16. [Scheduled Tasks (Background Jobs)](#16-scheduled-tasks-background-jobs)

---

## 1. API Overview

### 1.1 Base URL Structure

**Production**: `https://api.icare.co.uk`
**Staging**: `https://api-staging.icare.co.uk`
**Development**: `http://localhost:3000`

**API Version**: `/api/v1`

**Full Base URL**: `{environment}/api/v1`

Example: `https://api.icare.co.uk/api/v1/auth/login`

### 1.2 Versioning Strategy

**Approach**: URL-based versioning (`/api/v1/`, `/api/v2/`)

**Rationale**:
- Clear separation between API versions
- Allows running multiple versions simultaneously during migration
- Tier 1 uses `/api/v1/`
- Tier 2+ may introduce `/api/v2/` if breaking changes required

**Version Lifecycle**:
- Minimum 6-month support for deprecated versions
- Deprecation warnings in response headers: `X-API-Deprecated: true`, `X-API-Sunset: 2026-12-31`

### 1.3 Authentication

**Method**: JWT (JSON Web Tokens) with Bearer scheme

**Header Format**:
```
Authorization: Bearer <JWT_TOKEN>
```

**Token Structure**:
```json
{
  "sub": "user-id-uuid",
  "email": "user@example.com",
  "role": "care_receiver | caregiver | admin",
  "iat": 1609459200,
  "exp": 1609545600
}
```

**Token Expiry**:
- Access token: 24 hours
- Refresh token: 7 days (stored in httpOnly cookie)

**Security**:
- Tokens signed with RS256 (asymmetric keys)
- Refresh tokens stored in httpOnly, secure cookies (prevent XSS)
- Access tokens stored in memory (client-side)

### 1.4 Request/Response Format

**Content-Type**: `application/json` (all requests and responses)

**Request Headers**:
```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
Accept: application/json
```

**Standard Response Structure**:

**Success Response (2xx)**:
```json
{
  "success": true,
  "data": {
    // Response payload
  },
  "meta": {
    "timestamp": "2026-02-06T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

**Error Response (4xx, 5xx)**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-02-06T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

### 1.5 HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| **200** | OK | Successful GET, PUT, PATCH request |
| **201** | Created | Successful POST request (resource created) |
| **204** | No Content | Successful DELETE request |
| **400** | Bad Request | Validation error, malformed request |
| **401** | Unauthorized | Missing or invalid authentication token |
| **403** | Forbidden | Authenticated but lacks permission |
| **404** | Not Found | Resource does not exist |
| **409** | Conflict | Resource conflict (e.g., email already registered) |
| **422** | Unprocessable Entity | Semantic validation error |
| **429** | Too Many Requests | Rate limit exceeded |
| **500** | Internal Server Error | Server error |
| **503** | Service Unavailable | Temporary outage (maintenance) |

### 1.6 Rate Limiting

**Default Limits**:
- Public endpoints: 100 requests/15 minutes per IP
- Authenticated endpoints: 1000 requests/15 minutes per user
- Admin endpoints: 5000 requests/15 minutes per admin

**Rate Limit Headers**:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1609545600
```

**Rate Limit Exceeded Response** (429):
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again in 15 minutes.",
    "retryAfter": 900
  }
}
```

---

## 2. Authentication Endpoints

### 2.1 POST /auth/register

**Purpose**: Register new user (care receiver, family member, or caregiver)

**Access**: Public

**Request Body**:
```json
{
  "userType": "care_receiver | family | caregiver",
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "Sarah",
  "lastName": "Johnson",
  "phone": "+447700900000",
  "phoneCountryCode": "+44",
  "dateOfBirth": "1960-05-15",
  "gdprConsent": true,
  "marketingConsent": false
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "email": "user@example.com",
    "userType": "care_receiver",
    "emailVerificationSent": true,
    "phoneVerificationSent": true
  }
}
```

**Validation Rules**:
- Email: Valid format, unique
- Password: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
- Phone: Valid UK format (+447...)
- Date of birth: Care receivers must be 18+ (65+ recommended)
- GDPR consent: Required (true)

**Errors**:
- `400`: Validation error
- `409`: Email already registered

---

### 2.2 POST /auth/login

**Purpose**: Authenticate user and issue JWT tokens

**Access**: Public

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_uuid",
    "expiresIn": 86400,
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "userType": "care_receiver",
      "firstName": "Sarah",
      "lastName": "Johnson",
      "emailVerified": true,
      "phoneVerified": true
    }
  }
}
```

**Security**:
- Refresh token set as httpOnly, secure cookie
- Access token returned in response body
- Failed login attempts logged, account locked after 5 failures

**Errors**:
- `401`: Invalid credentials
- `403`: Account locked (too many failed attempts)
- `403`: Account suspended or banned

---

### 2.3 POST /auth/logout

**Purpose**: Invalidate refresh token and log out user

**Access**: Authenticated

**Request**: No body required (JWT in header)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

**Implementation**: Blacklist refresh token, clear httpOnly cookie

---

### 2.4 POST /auth/refresh

**Purpose**: Refresh access token using refresh token

**Access**: Public (refresh token in httpOnly cookie)

**Request**: No body required (refresh token in cookie)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

**Errors**:
- `401`: Refresh token expired or invalid

---

### 2.5 POST /auth/forgot-password

**Purpose**: Request password reset email

**Access**: Public

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "message": "If an account with that email exists, a password reset link has been sent."
  }
}
```

**Security**: Generic response to prevent email enumeration

---

### 2.6 POST /auth/reset-password

**Purpose**: Reset password using token from email

**Access**: Public

**Request Body**:
```json
{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePassword123!"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "message": "Password reset successfully. Please log in with your new password."
  }
}
```

**Errors**:
- `400`: Token expired or invalid
- `400`: Password validation failed

---

### 2.7 POST /auth/verify-email

**Purpose**: Verify email address using token from email

**Access**: Public

**Request Body**:
```json
{
  "token": "email_verification_token"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "email": "user@example.com",
    "emailVerified": true
  }
}
```

---

### 2.8 POST /auth/verify-phone

**Purpose**: Verify phone number using SMS OTP

**Access**: Authenticated

**Request Body**:
```json
{
  "otp": "123456"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "phone": "+447700900000",
    "phoneVerified": true
  }
}
```

**Errors**:
- `400`: Invalid OTP
- `429`: Too many verification attempts (rate limit)

---

### 2.9 POST /auth/resend-phone-otp

**Purpose**: Resend phone verification OTP

**Access**: Authenticated

**Request**: No body required

**Response** (200):
```json
{
  "success": true,
  "data": {
    "message": "OTP sent to +447700900000",
    "expiresIn": 600
  }
}
```

**Rate Limit**: Max 3 OTPs per 15 minutes

---

## 3. User Endpoints

### 3.1 GET /users/me

**Purpose**: Get current authenticated user's profile

**Access**: Authenticated

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "userType": "care_receiver",
    "firstName": "Sarah",
    "lastName": "Johnson",
    "phone": "+447700900000",
    "phoneVerified": true,
    "emailVerified": true,
    "dateOfBirth": "1960-05-15",
    "accountStatus": "active",
    "gdprConsent": true,
    "marketingConsent": false,
    "createdAt": "2026-01-15T10:00:00Z",
    "lastLoginAt": "2026-02-06T09:30:00Z"
  }
}
```

---

### 3.2 PUT /users/me

**Purpose**: Update current user's profile

**Access**: Authenticated

**Request Body**:
```json
{
  "firstName": "Sarah",
  "lastName": "Johnson-Smith",
  "phone": "+447700900001",
  "marketingConsent": true
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "firstName": "Sarah",
    "lastName": "Johnson-Smith",
    "phone": "+447700900001",
    "phoneVerified": false,
    "marketingConsent": true,
    "updatedAt": "2026-02-06T10:30:00Z"
  }
}
```

**Note**: Changing phone number resets `phoneVerified` to false, requires re-verification

---

### 3.3 DELETE /users/me

**Purpose**: Delete user account (GDPR right to erasure)

**Access**: Authenticated

**Request Body**:
```json
{
  "confirmPassword": "CurrentPassword123!",
  "reason": "No longer need service"
}
```

**Response** (204): No content

**Implementation**:
- Soft delete: Set `deleted_at` timestamp
- Anonymize PII after 30-day grace period
- Retain booking/audit data (pseudonymized)
- Cancel active bookings, refund care receivers
- 30-day account recovery window

---

## 4. Caregiver Endpoints

### 4.1 GET /caregivers (Search Caregivers)

**Purpose**: Search for caregivers based on location, availability, filters

**Access**: Authenticated (Family/Care Receiver), Public for browsing

**Query Parameters**:
```
postcode=SW1A1AA             (required)
radius=10                     (5|10|15|20|30 miles, default: 10)
services=companionship,light_housework  (multi-select, AND logic)
rateMin=15                    (GBP/hour)
rateMax=25                    (GBP/hour)
days=monday,wednesday,friday  (multi-select)
times=morning,afternoon       (morning|afternoon|evening)
dbsVerified=true              (boolean)
languages=english,polish      (multi-select, AND logic)
gender=female                 (male|female|no_preference)
minRating=4.0                 (0-5)
sort=distance                 (distance|rating|price_low|price_high|newest)
page=1                        (default: 1)
limit=12                      (default: 12)
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "caregivers": [
      {
        "id": "uuid",
        "firstName": "Sarah",
        "lastInitial": "M",
        "profilePhotoUrl": "https://s3.amazonaws.com/...",
        "bio": "Experienced caregiver with 5 years...",
        "servicesOffered": ["companionship", "light_housework", "shopping"],
        "hourlyRate": 20.00,
        "averageRating": 4.8,
        "totalReviews": 24,
        "distance": 1.2,
        "distanceUnit": "miles",
        "languagesSpoken": ["english", "polish"],
        "gender": "female",
        "verification": {
          "idVerified": true,
          "rightToWorkVerified": true,
          "dbsVerified": true,
          "phoneVerified": true
        },
        "availability": {
          "monday": ["morning", "afternoon"],
          "wednesday": ["morning"],
          "friday": ["afternoon", "evening"]
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "totalPages": 3,
      "totalCount": 32
    },
    "searchSummary": {
      "postcode": "SW1A1AA",
      "radius": 10,
      "filtersApplied": {
        "services": ["companionship", "light_housework"],
        "dbsVerified": true
      }
    }
  }
}
```

**Errors**:
- `400`: Invalid postcode format
- `404`: Postcode not found

---

### 4.2 GET /caregivers/:id (Caregiver Profile)

**Purpose**: Get detailed caregiver profile

**Access**: Public (for browsing), Authenticated for booking

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "firstName": "Sarah",
    "lastName": "M",
    "profilePhotoUrl": "https://s3.amazonaws.com/...",
    "bio": "Full bio text...",
    "yearsExperience": 5,
    "servicesOffered": ["companionship", "light_housework", "shopping", "meal_prep"],
    "hourlyRate": 20.00,
    "platformCommissionRate": 15.00,
    "postcode": "SW1A",
    "serviceRadiusMiles": 15,
    "languagesSpoken": ["english", "polish"],
    "gender": "female",
    "hasVehicle": true,
    "averageRating": 4.8,
    "totalReviews": 24,
    "verification": {
      "idVerified": true,
      "idVerifiedDate": "2026-01-10T10:00:00Z",
      "rightToWorkVerified": true,
      "rightToWorkVerifiedDate": "2026-01-10T10:00:00Z",
      "dbsVerified": true,
      "dbsVerifiedDate": "2026-01-12T14:00:00Z",
      "dbsLevel": "enhanced",
      "dbsCertificateNumber": "001234567890",
      "dbsIssueDate": "2025-12-01",
      "phoneVerified": true
    },
    "availability": {
      "recurring": [
        {
          "dayOfWeek": 1,
          "startTime": "09:00",
          "endTime": "17:00"
        }
      ],
      "unavailable": [
        {
          "date": "2026-02-15",
          "reason": "holiday"
        }
      ]
    },
    "reviews": {
      "averageRating": 4.8,
      "totalCount": 24,
      "distribution": {
        "5": 18,
        "4": 5,
        "3": 1,
        "2": 0,
        "1": 0
      },
      "recent": [
        {
          "id": "uuid",
          "rating": 5,
          "reviewText": "Wonderful companion, very patient...",
          "reviewerName": "Margaret S.",
          "reviewDate": "2026-02-01T10:00:00Z",
          "serviceTypes": ["companionship"],
          "caregiverResponse": "Thank you for the kind words...",
          "caregiverResponseDate": "2026-02-02T09:00:00Z"
        }
      ]
    },
    "profileStatus": "approved",
    "profileApprovedDate": "2026-01-15T10:00:00Z",
    "createdAt": "2026-01-08T10:00:00Z"
  }
}
```

---

### 4.3 PUT /caregivers/me (Update Own Profile)

**Purpose**: Update caregiver's own profile

**Access**: Authenticated (Caregiver)

**Request Body**:
```json
{
  "bio": "Updated bio text...",
  "servicesOffered": ["companionship", "light_housework", "shopping"],
  "hourlyRate": 22.00,
  "languagesSpoken": ["english", "polish", "welsh"],
  "hasVehicle": true,
  "serviceRadiusMiles": 20
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "bio": "Updated bio text...",
    "hourlyRate": 22.00,
    "serviceRadiusMiles": 20,
    "updatedAt": "2026-02-06T10:30:00Z"
  }
}
```

**Validation**:
- Bio: Max 500 characters
- Hourly rate: 10-100 GBP
- Service radius: 5-30 miles
- Services offered: Companionship types only at Tier 1

---

### 4.4 POST /caregivers/me/availability

**Purpose**: Set caregiver availability (recurring and one-off)

**Access**: Authenticated (Caregiver)

**Request Body**:
```json
{
  "recurring": [
    {
      "dayOfWeek": 1,
      "startTime": "09:00",
      "endTime": "17:00"
    },
    {
      "dayOfWeek": 3,
      "startTime": "09:00",
      "endTime": "17:00"
    }
  ],
  "oneOff": [
    {
      "date": "2026-02-10",
      "startTime": "10:00",
      "endTime": "14:00"
    }
  ],
  "unavailable": [
    {
      "startDate": "2026-02-15",
      "endDate": "2026-02-20",
      "reason": "holiday"
    }
  ]
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "availability": {
      "recurring": [...],
      "oneOff": [...],
      "unavailable": [...]
    },
    "totalHoursPerWeek": 32,
    "profileVisible": true
  }
}
```

**Business Rules**:
- Minimum 10 hours/week required for profile visibility
- Conflicting time slots rejected (validation error)

---

### 4.5 GET /caregivers/me/bookings

**Purpose**: Get caregiver's bookings (all statuses)

**Access**: Authenticated (Caregiver)

**Query Parameters**:
```
status=requested,accepted     (multi-select)
startDate=2026-02-01          (filter by booking date)
endDate=2026-02-28
page=1
limit=25
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "uuid",
        "status": "requested",
        "careReceiverName": "Margaret S.",
        "bookingDate": "2026-02-10",
        "startTime": "2026-02-10T14:00:00Z",
        "endTime": "2026-02-10T17:00:00Z",
        "durationHours": 3,
        "serviceTypes": ["companionship", "light_housework"],
        "hourlyRate": 20.00,
        "totalEarnings": 51.00,
        "platformCommission": 9.00,
        "caregiverEarnings": 51.00,
        "distance": 2.5,
        "requestedAt": "2026-02-05T10:00:00Z",
        "responseDeadline": "2026-02-06T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 25,
      "totalPages": 2,
      "totalCount": 48
    }
  }
}
```

---

### 4.6 GET /caregivers/me/earnings

**Purpose**: Get caregiver earnings summary and payout history

**Access**: Authenticated (Caregiver)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalEarnings": 1250.00,
      "thisMonth": 420.00,
      "pending": 120.00,
      "paid": 1130.00
    },
    "pendingPayouts": [
      {
        "bookingId": "uuid",
        "amount": 51.00,
        "expectedPayoutDate": "2026-02-10",
        "status": "awaiting_confirmation"
      }
    ],
    "payoutHistory": [
      {
        "id": "uuid",
        "amount": 255.00,
        "status": "paid",
        "paidAt": "2026-02-05T10:00:00Z",
        "stripeTransferId": "tr_abc123",
        "bookings": [
          {
            "bookingId": "uuid",
            "amount": 51.00
          }
        ]
      }
    ]
  }
}
```

---

## 5. Care Receiver Endpoints

### 5.1 PUT /care-receivers/me

**Purpose**: Update care receiver profile

**Access**: Authenticated (Family/Care Receiver)

**Request Body**:
```json
{
  "isFamilyMember": true,
  "careReceiverName": "Elizabeth Smith",
  "relationship": "daughter",
  "postcode": "SW1A 1AA",
  "addressLine1": "10 Downing Street",
  "city": "London",
  "emergencyContactName": "Margaret Smith",
  "emergencyContactPhone": "+447700900000",
  "emergencyContactRelationship": "daughter",
  "preferredServices": ["companionship", "light_housework"],
  "preferredCaregiverGender": "female",
  "preferredLanguages": ["english"],
  "maxHourlyRate": 25.00
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "isFamilyMember": true,
    "careReceiverName": "Elizabeth Smith",
    "postcode": "SW1A 1AA",
    "updatedAt": "2026-02-06T10:30:00Z"
  }
}
```

---

### 5.2 GET /care-receivers/me/bookings

**Purpose**: Get care receiver's bookings

**Access**: Authenticated (Family/Care Receiver)

**Query Parameters**: Same as caregiver bookings

**Response** (200): Similar structure to caregiver bookings

---

## 6. Booking Endpoints

### 6.1 POST /bookings (Create Booking Request)

**Purpose**: Create new booking request

**Access**: Authenticated (Family/Care Receiver)

**Request Body**:
```json
{
  "caregiverId": "uuid",
  "bookingDate": "2026-02-10",
  "startTime": "2026-02-10T14:00:00Z",
  "endTime": "2026-02-10T17:00:00Z",
  "durationHours": 3,
  "serviceTypes": ["companionship", "light_housework"],
  "specialRequests": "Would like help organizing photo albums",
  "paymentMethodId": "pm_abc123"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "requested",
    "caregiver": {
      "id": "uuid",
      "firstName": "Sarah",
      "lastInitial": "M"
    },
    "bookingDate": "2026-02-10",
    "startTime": "2026-02-10T14:00:00Z",
    "endTime": "2026-02-10T17:00:00Z",
    "pricing": {
      "hourlyRate": 20.00,
      "durationHours": 3,
      "subtotal": 60.00,
      "platformServiceFee": 3.00,
      "totalCharge": 63.00,
      "caregiverEarnings": 51.00
    },
    "paymentStatus": "authorized",
    "paymentIntentId": "pi_abc123",
    "responseDeadline": "2026-02-06T10:00:00Z",
    "requestedAt": "2026-02-05T10:00:00Z"
  }
}
```

**Business Rules**:
- Minimum duration: 2 hours
- Maximum duration: 8 hours (Tier 1)
- Minimum advance notice: 2 hours
- Payment authorized (held, not charged) until caregiver accepts

**Errors**:
- `400`: Invalid date/time or duration
- `400`: Caregiver not available at selected time
- `400`: Payment authorization failed
- `404`: Caregiver not found

---

### 6.2 GET /bookings/:id

**Purpose**: Get booking details

**Access**: Authenticated (booking party or admin)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "accepted",
    "careReceiver": {
      "id": "uuid",
      "name": "Margaret S.",
      "phone": "+447700900000",
      "emergencyContact": {
        "name": "John Smith",
        "phone": "+447700900001",
        "relationship": "son"
      }
    },
    "caregiver": {
      "id": "uuid",
      "firstName": "Sarah",
      "lastName": "M",
      "phone": "+447700900002"
    },
    "bookingDate": "2026-02-10",
    "startTime": "2026-02-10T14:00:00Z",
    "endTime": "2026-02-10T17:00:00Z",
    "durationHours": 3,
    "serviceTypes": ["companionship", "light_housework"],
    "specialRequests": "Would like help organizing photo albums",
    "location": {
      "postcode": "SW1A 1AA",
      "fullAddress": "10 Downing Street, London SW1A 1AA"
    },
    "pricing": {
      "hourlyRate": 20.00,
      "totalCareReceiverCharge": 63.00,
      "caregiverEarnings": 51.00,
      "platformCommission": 9.00
    },
    "paymentStatus": "captured",
    "paymentIntentId": "pi_abc123",
    "timeline": {
      "requestedAt": "2026-02-05T10:00:00Z",
      "acceptedAt": "2026-02-05T14:00:00Z",
      "startedAt": null,
      "completedAt": null
    }
  }
}
```

**Note**: Full contact details only shared after booking accepted

---

### 6.3 PUT /bookings/:id/accept (Caregiver Accepts)

**Purpose**: Caregiver accepts booking request

**Access**: Authenticated (Caregiver, booking recipient)

**Request**: No body required

**Response** (200):
```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "accepted",
    "acceptedAt": "2026-02-06T10:30:00Z",
    "paymentStatus": "captured",
    "careReceiverContact": {
      "name": "Margaret Smith",
      "phone": "+447700900000",
      "address": "10 Downing Street, London SW1A 1AA"
    }
  }
}
```

**Side Effects**:
- Payment captured (charged to care receiver)
- Calendar blocked for caregiver
- Both parties notified via email/SMS
- Contact details shared

---

### 6.4 PUT /bookings/:id/decline (Caregiver Declines)

**Purpose**: Caregiver declines booking request

**Access**: Authenticated (Caregiver, booking recipient)

**Request Body**:
```json
{
  "reason": "scheduling_conflict",
  "message": "I have a prior commitment that day. Sorry!"
}
```

**Decline Reasons**: `scheduling_conflict`, `too_far`, `outside_scope`, `rate_too_low`, `other`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "declined",
    "declinedAt": "2026-02-06T10:30:00Z",
    "declineReason": "scheduling_conflict",
    "paymentStatus": "authorization_released"
  }
}
```

**Side Effects**:
- Payment authorization released
- Care receiver notified

---

### 6.5 PUT /bookings/:id/cancel (Cancel Booking)

**Purpose**: Cancel booking (care receiver or caregiver)

**Access**: Authenticated (booking party)

**Request Body**:
```json
{
  "reason": "schedule_change",
  "details": "Family emergency, need to reschedule"
}
```

**Cancellation Reasons**: `schedule_change`, `no_longer_needed`, `emergency`, `other`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "cancelled",
    "cancelledAt": "2026-02-06T10:30:00Z",
    "cancelledBy": "care_receiver",
    "refund": {
      "amount": 31.50,
      "percentage": 50,
      "reason": "Cancelled 36 hours before start",
      "processedAt": "2026-02-06T10:30:00Z"
    }
  }
}
```

**Refund Policy** (Care Receiver):
- 48+ hours: 100% refund
- 24-48 hours: 50% refund
- <24 hours: 0% refund

**Caregiver Cancellation**: Always 100% refund, late cancellation (<24h) triggers warning

---

### 6.6 PUT /bookings/:id/complete (Mark Complete)

**Purpose**: Caregiver marks booking complete

**Access**: Authenticated (Caregiver)

**Request Body**:
```json
{
  "sessionNotes": "Enjoyed conversation about gardening. Helped organize photos from 1970s."
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "completed",
    "completedAt": "2026-02-10T17:00:00Z",
    "confirmationDeadline": "2026-02-12T17:00:00Z",
    "paymentReleaseDate": "2026-02-12T17:00:00Z"
  }
}
```

**Side Effects**:
- Status changed to `completed`
- Care receiver notified to confirm or dispute within 48 hours
- Auto-confirm after 48 hours if no action

---

### 6.7 PUT /bookings/:id/confirm (Care Receiver Confirms)

**Purpose**: Care receiver confirms booking completion

**Access**: Authenticated (Care Receiver)

**Request**: No body required

**Response** (200):
```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "payment_released",
    "confirmedAt": "2026-02-10T18:00:00Z",
    "paymentReleasedAt": "2026-02-10T18:00:00Z"
  }
}
```

**Side Effects**:
- Payment released to caregiver
- Review prompt sent to care receiver

---

### 6.8 PUT /bookings/:id/dispute (Raise Dispute)

**Purpose**: Care receiver disputes booking completion

**Access**: Authenticated (Care Receiver)

**Request Body**:
```json
{
  "reason": "duration_shorter",
  "description": "Caregiver left after 2 hours instead of 3 due to emergency",
  "evidenceUrls": ["https://s3.amazonaws.com/evidence1.jpg"]
}
```

**Dispute Reasons**: `service_not_provided`, `duration_shorter`, `quality_below_standard`, `safety_concern`, `other`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "bookingId": "uuid",
    "status": "disputed",
    "disputeId": "uuid",
    "disputeRaisedAt": "2026-02-10T18:00:00Z",
    "adminReviewDeadline": "2026-02-17T18:00:00Z"
  }
}
```

**Side Effects**:
- Payment held (not released to caregiver)
- Admin notified for investigation

---

### 6.9 POST /bookings/:id/review (Leave Review)

**Purpose**: Care receiver leaves review after booking

**Access**: Authenticated (Care Receiver)

**Request Body**:
```json
{
  "rating": 5,
  "reviewText": "Wonderful companionship, very patient with photo organizing!",
  "reviewTags": ["punctual", "friendly", "reliable", "professional"]
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "reviewId": "uuid",
    "bookingId": "uuid",
    "rating": 5,
    "reviewText": "Wonderful companionship, very patient...",
    "createdAt": "2026-02-12T10:00:00Z",
    "status": "published"
  }
}
```

**Business Rules**:
- Review window: 14 days after booking completion
- Rating: 1-5 stars (required)
- Review text: Max 500 characters (optional)
- One review per booking

---

## 7. Messaging Endpoints

### 7.1 GET /conversations

**Purpose**: Get user's conversation list

**Access**: Authenticated

**Query Parameters**:
```
page=1
limit=25
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "id": "uuid",
        "bookingId": "uuid",
        "otherParty": {
          "id": "uuid",
          "name": "Sarah M.",
          "profilePhotoUrl": "https://s3.amazonaws.com/..."
        },
        "lastMessage": {
          "id": "uuid",
          "senderName": "Sarah M.",
          "text": "Looking forward to our session on Tuesday!",
          "sentAt": "2026-02-06T10:00:00Z",
          "read": false
        },
        "unreadCount": 2,
        "createdAt": "2026-02-05T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 25,
      "totalPages": 1,
      "totalCount": 8
    }
  }
}
```

---

### 7.2 GET /conversations/:id/messages

**Purpose**: Get messages in conversation thread

**Access**: Authenticated (conversation participant)

**Query Parameters**:
```
page=1
limit=50
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "conversationId": "uuid",
    "bookingId": "uuid",
    "messages": [
      {
        "id": "uuid",
        "senderId": "uuid",
        "senderName": "Margaret S.",
        "text": "Hi Sarah, looking forward to Tuesday!",
        "sentAt": "2026-02-05T10:00:00Z",
        "readAt": "2026-02-05T10:05:00Z",
        "isSystemMessage": false,
        "isFlagged": false
      },
      {
        "id": "uuid",
        "senderId": "uuid",
        "senderName": "Sarah M.",
        "text": "Me too! See you at 2pm.",
        "sentAt": "2026-02-05T10:10:00Z",
        "readAt": null,
        "isSystemMessage": false,
        "isFlagged": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "totalPages": 1,
      "totalCount": 12
    }
  }
}
```

---

### 7.3 POST /conversations/:id/messages

**Purpose**: Send message in conversation

**Access**: Authenticated (conversation participant)

**Request Body**:
```json
{
  "text": "Looking forward to our session on Tuesday!"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "messageId": "uuid",
    "conversationId": "uuid",
    "text": "Looking forward to our session on Tuesday!",
    "sentAt": "2026-02-06T10:30:00Z",
    "isFlagged": false
  }
}
```

**Content Filtering**:
- Max length: 2000 characters
- Contact info (email, phone) redacted automatically
- Profanity filtered
- Off-platform payment keywords flagged for admin review

**Errors**:
- `400`: Message exceeds 2000 characters
- `403`: Conversation not accessible (not participant)

---

### 7.4 PUT /messages/:id/read

**Purpose**: Mark message as read

**Access**: Authenticated (message recipient)

**Request**: No body required

**Response** (200):
```json
{
  "success": true,
  "data": {
    "messageId": "uuid",
    "readAt": "2026-02-06T10:30:00Z"
  }
}
```

---

## 8. Verification Endpoints

### 8.1 POST /verification/identity (Stripe Identity)

**Purpose**: Submit identity verification documents

**Access**: Authenticated (Caregiver)

**Request**: Multipart form data (file upload)

```
documentType: passport | driving_license | eu_id_card
documentFront: <file>
documentBack: <file> (driving license only)
selfie: <file>
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "verificationId": "uuid",
    "status": "pending",
    "stripeVerificationId": "vi_abc123",
    "estimatedReviewTime": "24-48 hours",
    "submittedAt": "2026-02-06T10:30:00Z"
  }
}
```

**Implementation**: Stripe Identity API integration for automated verification

---

### 8.2 POST /verification/dbs (Voluntary DBS)

**Purpose**: Submit DBS certificate for verification

**Access**: Authenticated (Caregiver)

**Request**: Multipart form data

```
certificateFile: <file>
certificateNumber: "001234567890"
issueDate: "2025-12-01"
level: basic | standard | enhanced
updateServiceSubscribed: true | false
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "verificationId": "uuid",
    "status": "pending_admin_review",
    "certificateNumber": "001234567890",
    "estimatedReviewTime": "48 hours",
    "submittedAt": "2026-02-06T10:30:00Z"
  }
}
```

**Note**: DBS is voluntary at Tier 1, becomes mandatory at Tier 2

---

### 8.3 POST /verification/right-to-work

**Purpose**: Submit right to work verification

**Access**: Authenticated (Caregiver)

**Request Body**:
```json
{
  "nationality": "British | EU | Other",
  "ukviShareCode": "ABC123456",
  "dateOfBirth": "1990-05-15"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "verificationId": "uuid",
    "status": "pending_admin_check",
    "estimatedReviewTime": "24 hours",
    "submittedAt": "2026-02-06T10:30:00Z"
  }
}
```

**Business Rules**:
- UK passport holders: Auto-approved (no UKVI check)
- Non-UK: Admin checks UKVI online service

---

### 8.4 GET /verification/status

**Purpose**: Get caregiver's verification status

**Access**: Authenticated (Caregiver)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "identity": {
      "verified": true,
      "verifiedAt": "2026-01-10T10:00:00Z",
      "method": "stripe_identity"
    },
    "rightToWork": {
      "verified": true,
      "verifiedAt": "2026-01-10T10:00:00Z",
      "visaType": "Skilled Worker",
      "visaExpiryDate": "2028-01-10"
    },
    "dbs": {
      "verified": true,
      "verifiedAt": "2026-01-12T14:00:00Z",
      "certificateNumber": "001234567890",
      "level": "enhanced",
      "issueDate": "2025-12-01",
      "recommendedRenewalDate": "2028-12-01"
    },
    "phone": {
      "verified": true,
      "verifiedAt": "2026-01-08T12:00:00Z"
    },
    "profileApproved": true,
    "profileVisibleInSearch": true
  }
}
```

---

## 9. Payment Endpoints

### 9.1 POST /payments/setup-intent

**Purpose**: Create Stripe SetupIntent for adding payment method

**Access**: Authenticated (Care Receiver)

**Request**: No body required

**Response** (201):
```json
{
  "success": true,
  "data": {
    "clientSecret": "seti_abc123_secret_xyz",
    "setupIntentId": "seti_abc123"
  }
}
```

**Implementation**: Client-side Stripe.js uses clientSecret to add payment method

---

### 9.2 GET /payments/methods

**Purpose**: Get user's saved payment methods

**Access**: Authenticated (Care Receiver)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "paymentMethods": [
      {
        "id": "pm_abc123",
        "type": "card",
        "card": {
          "brand": "visa",
          "last4": "4242",
          "expMonth": 12,
          "expYear": 2027
        },
        "isDefault": true,
        "createdAt": "2026-01-15T10:00:00Z"
      }
    ],
    "defaultPaymentMethodId": "pm_abc123"
  }
}
```

---

### 9.3 DELETE /payments/methods/:id

**Purpose**: Remove payment method

**Access**: Authenticated (Care Receiver)

**Request**: No body required

**Response** (204): No content

**Business Rules**:
- Cannot delete default payment method if active bookings exist
- Must have alternative payment method before deleting default

---

### 9.4 POST /webhooks/stripe

**Purpose**: Stripe webhook handler (payment events)

**Access**: Public (Stripe signature verification)

**Request**: Stripe webhook payload

**Events Handled**:
- `payment_intent.succeeded`: Payment captured successfully
- `payment_intent.payment_failed`: Payment failed (notify user, cancel booking)
- `transfer.created`: Payout initiated to caregiver
- `transfer.failed`: Payout failed (retry or notify caregiver)
- `charge.refunded`: Refund processed
- `charge.dispute.created`: Chargeback initiated (admin investigation)

**Response** (200):
```json
{
  "received": true
}
```

**Security**: Stripe signature verification required

---

## 10. Admin Endpoints

### 10.1 GET /admin/users

**Purpose**: Admin search/view all users

**Access**: Admin

**Query Parameters**:
```
userType=care_receiver|caregiver|admin
status=active|suspended|banned|deactivated
search=email or name
page=1
limit=50
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid",
        "email": "user@example.com",
        "userType": "caregiver",
        "firstName": "Sarah",
        "lastName": "Johnson",
        "phone": "+447700900000",
        "accountStatus": "active",
        "createdAt": "2026-01-08T10:00:00Z",
        "lastLoginAt": "2026-02-06T09:00:00Z",
        "bookingCount": 24,
        "averageRating": 4.8
      }
    ],
    "pagination": {...}
  }
}
```

---

### 10.2 GET /admin/verifications

**Purpose**: Admin verification queue

**Access**: Admin (Operations Manager)

**Query Parameters**:
```
status=pending|approved|rejected
type=identity|right_to_work|dbs
overdue=true (>48 hours pending)
assignedTo=adminId
page=1
limit=25
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "verifications": [
      {
        "id": "uuid",
        "caregiverId": "uuid",
        "caregiverName": "Sarah Johnson",
        "type": "identity",
        "status": "pending",
        "submittedAt": "2026-02-05T10:00:00Z",
        "daysPending": 1,
        "slaBreached": false,
        "assignedTo": null,
        "documents": [
          {
            "type": "passport",
            "url": "https://s3.amazonaws.com/...",
            "uploadedAt": "2026-02-05T10:00:00Z"
          }
        ],
        "stripeVerificationResult": {
          "status": "verified",
          "checks": {
            "documentValid": true,
            "faceMatch": true,
            "liveness": true
          }
        }
      }
    ],
    "pagination": {...}
  }
}
```

---

### 10.3 PUT /admin/verifications/:id/approve

**Purpose**: Admin approves verification

**Access**: Admin (Operations Manager)

**Request Body**:
```json
{
  "notes": "ID verified, all checks passed"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "verificationId": "uuid",
    "status": "approved",
    "approvedBy": "admin-uuid",
    "approvedAt": "2026-02-06T10:30:00Z"
  }
}
```

**Side Effects**:
- Caregiver notified via email
- Profile may go live if all verifications complete

---

### 10.4 PUT /admin/verifications/:id/reject

**Purpose**: Admin rejects verification

**Access**: Admin (Operations Manager)

**Request Body**:
```json
{
  "reason": "id_expired",
  "notes": "Passport expired on 2025-12-31. Please upload current ID."
}
```

**Rejection Reasons**: `id_expired`, `id_unclear`, `name_mismatch`, `selfie_mismatch`, `suspected_fake`, `other`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "verificationId": "uuid",
    "status": "rejected",
    "rejectedBy": "admin-uuid",
    "rejectedAt": "2026-02-06T10:30:00Z",
    "reason": "id_expired"
  }
}
```

**Side Effects**: Caregiver notified with resubmission instructions

---

### 10.5 GET /admin/bookings

**Purpose**: Admin view all bookings

**Access**: Admin

**Query Parameters**:
```
status=requested|accepted|completed|disputed
startDate=2026-02-01
endDate=2026-02-28
disputedOnly=true
highValue=true (>£100)
search=booking ID or user name
page=1
limit=50
```

**Response** (200): Similar structure to user booking endpoints

---

### 10.6 PUT /admin/users/:id/suspend

**Purpose**: Admin suspends user account

**Access**: Admin (Safeguarding Officer)

**Request Body**:
```json
{
  "reason": "multiple_complaints",
  "duration": 7,
  "notes": "Suspended pending investigation of 3 safeguarding reports"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "accountStatus": "suspended",
    "suspensionEndDate": "2026-02-13T10:30:00Z",
    "suspendedBy": "admin-uuid",
    "suspendedAt": "2026-02-06T10:30:00Z"
  }
}
```

**Side Effects**:
- Profile hidden from search
- Active bookings cancelled (refunded)
- User notified

---

### 10.7 GET /admin/safeguarding

**Purpose**: Admin safeguarding reports queue

**Access**: Admin (Safeguarding Officer)

**Query Parameters**:
```
status=open|investigating|resolved
urgency=urgent|standard
incidentType=physical_abuse|emotional_abuse|...
slaBreached=true
page=1
limit=25
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "reports": [
      {
        "id": "uuid",
        "reportedUserId": "uuid",
        "reportedUserName": "John Doe",
        "reportedUserType": "caregiver",
        "reportedBy": "uuid",
        "reporterName": "Margaret S.",
        "incidentType": "off_platform_payment",
        "severity": "high",
        "status": "open",
        "incidentDescription": "Caregiver requested cash payment...",
        "evidenceUrls": ["https://s3.amazonaws.com/..."],
        "reportedAt": "2026-02-06T08:00:00Z",
        "assignedTo": null,
        "slaBreached": false
      }
    ],
    "pagination": {...}
  }
}
```

---

### 10.8 POST /admin/safeguarding

**Purpose**: Admin creates safeguarding report (manual)

**Access**: Admin (Safeguarding Officer)

**Request Body**:
```json
{
  "reportedUserId": "uuid",
  "incidentType": "off_platform_payment",
  "severity": "high",
  "incidentDescription": "Care receiver reported caregiver requested cash payment",
  "evidenceUrls": ["https://s3.amazonaws.com/..."]
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "reportId": "uuid",
    "status": "open",
    "createdAt": "2026-02-06T10:30:00Z"
  }
}
```

---

## 11. Safeguarding Endpoints

### 11.1 POST /safeguarding/report

**Purpose**: User reports safeguarding concern

**Access**: Authenticated

**Request Body**:
```json
{
  "reportedUserId": "uuid",
  "incidentType": "off_platform_payment",
  "severity": "urgent",
  "incidentDescription": "Caregiver asked me to pay cash directly instead of through platform",
  "incidentDate": "2026-02-05",
  "evidenceUrls": ["https://s3.amazonaws.com/screenshot.jpg"]
}
```

**Incident Types**: `physical_abuse`, `emotional_abuse`, `sexual_abuse`, `financial_abuse`, `neglect`, `discriminatory_abuse`, `domestic_abuse`, `self_neglect`, `institutional_abuse`, `modern_slavery`, `off_platform_payment`, `inappropriate_conduct`, `policy_violation`

**Severity**: `urgent`, `high`, `medium`, `low`

**Response** (201):
```json
{
  "success": true,
  "data": {
    "reportId": "uuid",
    "caseNumber": "SF-2026-0012",
    "status": "open",
    "urgency": "urgent",
    "reportedAt": "2026-02-06T10:30:00Z",
    "acknowledgment": "Your report has been received. If this is an emergency, call 999 immediately."
  }
}
```

**Side Effects**:
- Admin notified immediately (urgent cases: Slack alert)
- Reported user may be auto-suspended (off-platform payment = immediate suspension)

---

## 12. WebSocket Events

### 12.1 WebSocket Connection

**Endpoint**: `wss://api.icare.co.uk/ws`

**Authentication**: JWT token in connection query parameter
```
wss://api.icare.co.uk/ws?token=<JWT_TOKEN>
```

### 12.2 Real-Time Messaging Events

**Event: new_message**

Sent when new message received in conversation

```json
{
  "event": "new_message",
  "data": {
    "conversationId": "uuid",
    "messageId": "uuid",
    "senderId": "uuid",
    "senderName": "Sarah M.",
    "text": "Looking forward to Tuesday!",
    "sentAt": "2026-02-06T10:30:00Z"
  }
}
```

**Event: message_read**

Sent when counterparty reads your message

```json
{
  "event": "message_read",
  "data": {
    "conversationId": "uuid",
    "messageId": "uuid",
    "readAt": "2026-02-06T10:35:00Z"
  }
}
```

### 12.3 Booking Status Updates

**Event: booking_status_changed**

```json
{
  "event": "booking_status_changed",
  "data": {
    "bookingId": "uuid",
    "oldStatus": "requested",
    "newStatus": "accepted",
    "timestamp": "2026-02-06T10:30:00Z"
  }
}
```

### 12.4 Typing Indicators

**Event: user_typing**

```json
{
  "event": "user_typing",
  "data": {
    "conversationId": "uuid",
    "userId": "uuid",
    "userName": "Sarah M.",
    "isTyping": true
  }
}
```

---

## 13. Error Handling

### 13.1 Standard Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format",
        "code": "INVALID_FORMAT"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-02-06T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

### 13.2 Error Codes

| Code | HTTP Status | Meaning | Example |
|------|-------------|---------|---------|
| `VALIDATION_ERROR` | 400 | Request validation failed | Invalid email format |
| `AUTHENTICATION_REQUIRED` | 401 | No valid auth token | Missing Authorization header |
| `INVALID_CREDENTIALS` | 401 | Login failed | Wrong password |
| `FORBIDDEN` | 403 | Authenticated but not authorized | Not booking party |
| `RESOURCE_NOT_FOUND` | 404 | Resource does not exist | Caregiver ID not found |
| `RESOURCE_CONFLICT` | 409 | Resource conflict | Email already registered |
| `UNPROCESSABLE_ENTITY` | 422 | Semantic validation error | Booking date in past |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests | Try again in 15 minutes |
| `INTERNAL_SERVER_ERROR` | 500 | Server error | Database connection failed |
| `SERVICE_UNAVAILABLE` | 503 | Temporary outage | Maintenance mode |

### 13.3 Field-Level Validation Errors

**Example: Multiple validation errors**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format",
        "code": "INVALID_FORMAT"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters",
        "code": "TOO_SHORT"
      },
      {
        "field": "dateOfBirth",
        "message": "Must be 18 years or older",
        "code": "INVALID_AGE"
      }
    ]
  }
}
```

---

## 14. Pagination

### 14.1 Standard Pagination Parameters

**Query Parameters**:
```
page=1        (default: 1)
limit=25      (default: 25, max: 100)
```

### 14.2 Pagination Response Format

```json
{
  "success": true,
  "data": {
    "results": [...],
    "pagination": {
      "page": 1,
      "limit": 25,
      "totalPages": 10,
      "totalCount": 248,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

### 14.3 Pagination Headers

Response includes pagination metadata in headers:

```
X-Pagination-Page: 1
X-Pagination-Limit: 25
X-Pagination-Total-Pages: 10
X-Pagination-Total-Count: 248
Link: <https://api.icare.co.uk/api/v1/caregivers?page=2>; rel="next"
```

---

## 15. Rate Limiting

### 15.1 Rate Limit Tiers

| Endpoint Category | Limit | Window | Scope |
|------------------|-------|--------|-------|
| Public (no auth) | 100 requests | 15 minutes | Per IP |
| Authenticated | 1000 requests | 15 minutes | Per user |
| Admin | 5000 requests | 15 minutes | Per admin |
| Webhooks | Unlimited | - | Stripe signature verified |

### 15.2 Rate Limit Headers

Every response includes rate limit headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 995
X-RateLimit-Reset: 1609545600
```

### 15.3 Rate Limit Exceeded Response

**HTTP 429 Too Many Requests**:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again in 15 minutes.",
    "retryAfter": 900
  },
  "meta": {
    "timestamp": "2026-02-06T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

**Headers**:
```
Retry-After: 900
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1609545600
```

---

## 16. Scheduled Tasks (Background Jobs)

### 16.1 Overview

The platform uses scheduled background tasks to automate booking lifecycle transitions and system maintenance. These tasks run independently of user actions.

**Scheduler**: Node-cron or AWS CloudWatch Events
**Execution**: AWS Lambda or dedicated worker process
**Monitoring**: CloudWatch Logs + alerts for failures

### 16.2 Booking Status Automation

#### TASK-001: Auto-Transition Accepted to In-Progress

**Schedule**: Every 1 minute
**Purpose**: Automatically transition bookings from `accepted` to `in_progress` when start time is reached

**Logic**:
```javascript
// Pseudocode
SELECT * FROM bookings
WHERE status = 'accepted'
  AND start_time <= NOW()

FOR EACH booking:
  UPDATE bookings SET status = 'in_progress', started_at = NOW()
  INSERT INTO booking_state_history (booking_id, from_status, to_status, trigger_reason)
  VALUES (booking_id, 'accepted', 'in_progress', 'SYSTEM: Scheduled auto-start at booking start time')

  // Send WebSocket event
  EMIT booking_status_changed { bookingId, oldStatus: 'accepted', newStatus: 'in_progress' }
```

**Notifications**:
- WebSocket event to both parties
- No email (user already has 24h reminder)

#### TASK-002: Auto-Expire Booking Requests

**Schedule**: Every 5 minutes
**Purpose**: Automatically decline booking requests if caregiver does not respond within 24 hours

**Logic**:
```javascript
SELECT * FROM bookings
WHERE status = 'requested'
  AND requested_at < NOW() - INTERVAL '24 hours'

FOR EACH booking:
  UPDATE bookings SET status = 'expired', declined_at = NOW()
  RELEASE payment_authorization(booking.payment_intent_id)
  NOTIFY care_receiver: "Your booking request has expired. The caregiver did not respond."
  NOTIFY caregiver: "You missed a booking request."
```

#### TASK-003: Auto-Confirm Completed Bookings

**Schedule**: Every 15 minutes
**Purpose**: Automatically confirm booking completion and release payment if care receiver does not respond within 48 hours

**Logic**:
```javascript
SELECT * FROM bookings
WHERE status = 'completed'
  AND completed_at < NOW() - INTERVAL '48 hours'
  AND dispute_raised_at IS NULL

FOR EACH booking:
  UPDATE bookings SET status = 'payment_released', confirmed_at = NOW(), payment_released_at = NOW()
  TRIGGER Stripe transfer to caregiver
  NOTIFY caregiver: "Payment released for booking."
  NOTIFY care_receiver: "Booking auto-confirmed. Please leave a review."
```

#### TASK-004: No-Show Detection Alert

**Schedule**: Every 5 minutes
**Purpose**: Alert care receiver if booking has not transitioned to `in_progress` 30 minutes after start time

**Logic**:
```javascript
SELECT * FROM bookings
WHERE status = 'accepted'
  AND start_time < NOW() - INTERVAL '30 minutes'
  AND no_show_alert_sent = FALSE

FOR EACH booking:
  UPDATE bookings SET no_show_alert_sent = TRUE
  NOTIFY care_receiver: "Your caregiver hasn't marked the session as started. Are they running late?"
```

### 16.3 Notification Jobs

#### TASK-005: 24-Hour Booking Reminders

**Schedule**: Daily at 08:00 GMT
**Purpose**: Send reminder emails for bookings starting in the next 24 hours

**Logic**:
```javascript
SELECT * FROM bookings
WHERE status = 'accepted'
  AND start_time BETWEEN NOW() AND NOW() + INTERVAL '24 hours'
  AND reminder_24h_sent = FALSE

FOR EACH booking:
  SEND email to care_receiver and caregiver
  UPDATE bookings SET reminder_24h_sent = TRUE
```

#### TASK-006: Review Prompt

**Schedule**: Hourly
**Purpose**: Send review prompt email 24 hours after booking completion

**Logic**:
```javascript
SELECT * FROM bookings
WHERE status = 'payment_released'
  AND payment_released_at < NOW() - INTERVAL '24 hours'
  AND review_prompt_sent = FALSE

FOR EACH booking:
  IF NOT EXISTS (SELECT 1 FROM reviews WHERE booking_id = booking.id):
    SEND email to care_receiver: "How was your experience? Leave a review."
    UPDATE bookings SET review_prompt_sent = TRUE
```

### 16.4 Caregiver Response Window Reminders

#### TASK-007: 12-Hour Reminder

**Schedule**: Every 30 minutes
**Purpose**: Remind caregivers to respond to booking requests at 12-hour mark

**Logic**:
```javascript
SELECT * FROM bookings
WHERE status = 'requested'
  AND requested_at BETWEEN NOW() - INTERVAL '12 hours 30 minutes' AND NOW() - INTERVAL '12 hours'
  AND reminder_12h_sent = FALSE

FOR EACH booking:
  NOTIFY caregiver: "Booking request expires in 12 hours. Respond now."
  UPDATE bookings SET reminder_12h_sent = TRUE
```

#### TASK-008: 2-Hour Reminder

**Schedule**: Every 15 minutes
**Purpose**: Urgent reminder to caregivers at 2-hour mark before expiry

**Logic**:
```javascript
SELECT * FROM bookings
WHERE status = 'requested'
  AND requested_at BETWEEN NOW() - INTERVAL '22 hours 15 minutes' AND NOW() - INTERVAL '22 hours'
  AND reminder_2h_sent = FALSE

FOR EACH booking:
  NOTIFY caregiver: "URGENT: Booking request expires in 2 hours. Respond now."
  UPDATE bookings SET reminder_2h_sent = TRUE
```

### 16.5 Verification and Compliance Jobs

#### TASK-009: Visa Expiry Reminders

**Schedule**: Daily at 09:00 GMT
**Purpose**: Alert caregivers and admins when visa/right-to-work is expiring

**Triggers**:
- 60 days before expiry: Email to caregiver
- 30 days before expiry: Email to caregiver + admin alert
- 7 days before expiry: Urgent email + admin escalation

#### TASK-010: DBS Renewal Reminders

**Schedule**: Daily at 09:00 GMT
**Purpose**: Remind caregivers to renew DBS checks (3-year best practice)

**Triggers**:
- 60 days before 3-year anniversary: Email to caregiver
- 30 days before: Follow-up email

### 16.6 Task Configuration

| Task ID | Schedule | Timeout | Retry Policy | Alert on Failure |
|---------|----------|---------|--------------|------------------|
| TASK-001 | */1 * * * * | 30s | 3 retries | Yes (Slack) |
| TASK-002 | */5 * * * * | 60s | 3 retries | Yes (Slack) |
| TASK-003 | */15 * * * * | 60s | 3 retries | Yes (Slack) |
| TASK-004 | */5 * * * * | 30s | 3 retries | Yes (Slack) |
| TASK-005 | 0 8 * * * | 5m | 3 retries | Yes (Email) |
| TASK-006 | 0 * * * * | 2m | 3 retries | No |
| TASK-007 | */30 * * * * | 30s | 3 retries | No |
| TASK-008 | */15 * * * * | 30s | 3 retries | No |
| TASK-009 | 0 9 * * * | 5m | 3 retries | Yes (Email) |
| TASK-010 | 0 9 * * * | 5m | 3 retries | No |

---

## Appendix A: API Design Principles

### A.1 RESTful Design

**Resource-Oriented**:
- Endpoints represent resources (`/caregivers`, `/bookings`)
- HTTP methods map to CRUD operations (GET, POST, PUT, DELETE)
- URLs are nouns, not verbs (`/bookings` not `/createBooking`)

**HTTP Methods**:
- `GET`: Retrieve resource(s) (idempotent, safe)
- `POST`: Create resource
- `PUT`: Update resource (full replacement, idempotent)
- `PATCH`: Partial update (not used in Tier 1)
- `DELETE`: Delete resource (idempotent)

**Status Codes**:
- `2xx`: Success
- `4xx`: Client error (user's fault)
- `5xx`: Server error (our fault)

### A.2 Security Best Practices

**Authentication**:
- JWT tokens (stateless, scalable)
- Refresh tokens in httpOnly cookies (XSS protection)
- Access tokens short-lived (24 hours)
- Refresh tokens longer-lived (7 days)

**Authorization**:
- Role-based access control (RBAC)
- Resource-level permissions (booking party, admin)
- Least privilege principle

**Input Validation**:
- Validate all inputs server-side (never trust client)
- Sanitize HTML/SQL (prevent injection attacks)
- Rate limiting (prevent abuse)

**Data Protection**:
- HTTPS only (TLS 1.2+)
- Sensitive data encrypted at rest
- PII minimization (return only needed fields)
- GDPR compliance (right to erasure)

### A.3 Performance Optimization

**Caching**:
- Cache search results (5 minutes)
- Cache caregiver profiles (10 minutes)
- ETags for conditional requests

**Pagination**:
- Always paginate lists (default 25 items)
- Limit max page size (100 items)
- Cursor-based pagination for large datasets (future)

**Database Optimization**:
- Indexes on frequently queried fields
- Avoid N+1 queries (eager loading)
- Query result caching (Redis)

### A.4 Versioning & Backwards Compatibility

**Version Strategy**:
- URL-based versioning (`/api/v1/`)
- Maintain 2 versions simultaneously during migration
- Deprecation warnings 6 months before sunset

**Breaking Changes**:
- Removing fields from responses
- Changing field types
- Changing endpoint URLs
- Changing authentication methods

**Non-Breaking Changes** (allowed in same version):
- Adding new optional fields
- Adding new endpoints
- Adding new query parameters (optional)
- More permissive validation

---

## Appendix B: Related Documents

**Strategic Context**:
- [Tiered Market Entry Roadmap](/docs/ROADMAP.md) - FDR-003: Tier definitions
- [Database Schema Tier 1](/docs/technical/database-schema-tier1.md) - Data model

**Product Specifications**:
- [Tier 1 Route Map](/docs/product/tier1-route-map.md) - Frontend routes
- [Booking Specification](/docs/product/features/tier1-booking-specification.md)
- [Verification Specification](/docs/product/features/tier1-verification-specification.md)
- [Search Specification](/docs/product/features/tier1-search-specification.md)
- [Messaging Specification](/docs/product/features/tier1-messaging-specification.md)
- [Admin Specification](/docs/product/features/tier1-admin-specification.md)
- [Safeguarding Specification](/docs/product/features/tier1-safeguarding-specification.md)

**Compliance**:
- [DPIA](/docs/compliance/dpia.md) - Data protection requirements
- [Legal Framework](/docs/compliance/legal-framework.md) - UK regulations

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-06 | Technical Architect | Initial Tier 1 REST API specification |

---

**END OF DOCUMENT**
