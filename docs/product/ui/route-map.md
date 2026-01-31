# Route Map

> **PLACEHOLDER** - Route architecture documentation.

## Purpose

Defines the complete URL structure and routing architecture for the application.

## Route Tree

```
/                                   # Public homepage
├── /auth/                          # Authentication routes
│   ├── /login
│   ├── /register
│   ├── /forgot-password
│   └── /verify
├── /caregiver/                     # Caregiver routes
│   ├── /dashboard
│   ├── /profile
│   ├── /bookings
│   └── /earnings
├── /family/                        # Care receiver/family routes
│   ├── /dashboard
│   ├── /search
│   ├── /bookings
│   └── /payments
└── /admin/                         # Admin routes
    ├── /dashboard
    ├── /users
    ├── /verification
    └── /safeguarding
```

## Route Parameters

> TODO: Document route parameters and their validation

## Route Guards

> TODO: Document RBAC and preconditions per route

## See Also

- [Screen Inventory](screen-inventory.md)
- [Story-Screen Map](../backlog/story-screen-map.md)
