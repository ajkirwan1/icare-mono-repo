import { type RouteConfig, index, route, prefix, layout } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("how-it-works", "routes/website/how-it-works.jsx"),
    route("who-we-are", "routes/website/who-we-are.jsx"),
    route("icare-for-caregivers", "routes/website/icare-for-caregivers.jsx"),
    route("icare-for-carereceivers", "routes/website/icare-for-carereceivers.jsx"),
    route("privacy", "routes/website/privacy.jsx"),
    route("terms", "routes/website/terms.jsx"),
    route("carerecipient", "routes/carerecipient.jsx"),
    route("safety-commitment", "routes/website/safety-commitment.jsx"),
    route("trust-and-safety", "routes/website/trust-and-safety.jsx"),
    route("contact-us", "routes/website/contact-us.jsx"),
    route("frequently-asked-questions", "routes/website/faqs.jsx"),

    // News and articles
    route("care-knowledge", "routes/website/news-and-articles/news-and-articles.jsx"),
    route("care-knowledge/:slug", "routes/website/news-and-articles/news-item.jsx"),
    route("care-knowledge/tags/:tag", "routes/website/news-and-articles/news-tag.jsx"),
    route("newsletter/confirmed", "routes/website/news-and-articles/newsletter-confirmed.jsx"),
    route("newsletter/invalid", "routes/website/news-and-articles/newsletter-invalid.jsx"),
    route("newsletter/unsubscribed", "routes/website/news-and-articles/newsletter-unsubscribed.jsx"),
    route("newsletter/resend", "routes/website/news-and-articles/newsletter-resend.jsx"),

    // Not found
    route("*", "routes/not-found.jsx"),


    // Auth
    route("login", "routes/auth/login.jsx"),
    route("forgot-password", "routes/auth/forgot-password.jsx"),
    route("reset-password", "routes/auth/reset-password.jsx"),
    route("register", "routes/register.jsx"),

    // SEC
    route("sitemap.xml", "routes/sitemap[.]xml.jsx"),

    // Action routes
    route("register-interest", "routes/website/register-interest.jsx"),
    route("newsletter/subscribe", "routes/website/actions/newsletter.subscribe.jsx"),
    route("newsletter/resend-action", "routes/website/actions/newsletter.resend.jsx"),
    route("waitinglist", "routes/website/actions/waitinglist.jsx"),
    route("contact", "routes/website/actions/contact.jsx"),
    route("rr-api/conversations/:id", "routes/api/conversations-id.jsx"),
    route("rr-api/conversations/:id/messages", "routes/api/conversations-id-messages.jsx"),
    route("api/v1/payments/methods", "routes/api/v1/payments-methods.jsx"),
    route("api/v1/webhooks/stripe", "routes/api/v1/webhooks-stripe.jsx"),
    route("settings/payment", "routes/carereceiver/carereceiver-settings-payment-alias.jsx"),

    // Admin
    ...prefix("admin", [
        layout("routes/admin/layout.jsx", [
            index("routes/admin/dashboard-admin.jsx"),
            route("dashboard", "routes/admin/dashboard-admin-alias.jsx"),
            route("verifications", "routes/admin/verifications.jsx"),
            route("adm-verification-queue", "routes/admin/adm-verification-queue.jsx"),
            route("verifications/:verificationId", "routes/admin/verification-id.jsx"),
            route("verifications/verificationId", "routes/admin/verification-id-alias.jsx"),
            route("verifications/dbs/:verificationId", "routes/admin/dbs-verification-id.jsx"),
            route("verifications/dbs-verificationId", "routes/admin/dbs-verification-id-alias.jsx"),
            route("applications", "routes/admin/admin-applications.jsx"),
            route("applications/:applicationId", "routes/admin/application-id.jsx"),
            route("bookings", "routes/admin/bookings.jsx"),
            route("adm-booking-management", "routes/admin/adm-booking-management.jsx"),
            route("disputes", "routes/admin/disputes.jsx"),
            route("adm-dispute-queue", "routes/admin/adm-dispute-queue.jsx"),
            route("safegaurding", "routes/admin/safegaurding-alias.jsx"),
            route("safegaurding/:reportId", "routes/admin/safegaurding-report-alias.jsx"),
            route("safeguarding", "routes/admin/safeguarding.jsx"),
            route("safeguarding/:reportId", "routes/admin/safeguarding-report-id.jsx"),
            route("users", "routes/admin/users.jsx"),
            route("adm-user-management", "routes/admin/adm-user-management.jsx"),
            route("users/:userId", "routes/admin/user-id.jsx"),
            route("adm-user-detail", "routes/admin/adm-user-detail.jsx"),
            route("incidents", "routes/admin/incidents.jsx"),
            route("adm-incident-reports", "routes/admin/adm-incident-reports.jsx"),
            route("analytics", "routes/admin/analytics.jsx"),
            route("adm-analytics-dashboard", "routes/admin/adm-analytics-dashboard.jsx"),
            route("audit-log", "routes/admin/adm-audit-log.jsx"),
            route("reported-issues", "routes/admin/adm-reported-issues.jsx"),
            route("settings", "routes/admin/admin-settings-alias.jsx"),
            route("system-settings", "routes/admin/adm-system-settings.jsx")
        ])
    ]),

    route("carerecipient/account/my-account", "routes/app/carerecipient/account/my-account.jsx"),
    route("bookings/new/:caregiverId", "routes/app/carerecipient/booking-request-form.jsx"),
    route("bookings/:bookingId", "routes/app/carerecipient/booking-detail.jsx"),
    route("carereceiver/bookings/new/:caregiverId", "routes/carereceiver/carereceiver-booking-request-form.jsx"),
    route("carereceiver/bookings/:bookingId", "routes/carereceiver/carereceiver-booking-detail.jsx"),

    // Caregiver
    ...prefix("caregiver", [
        layout("routes/caregiver/layout.jsx", [
            index("routes/caregiver/caregiver-dashboard.jsx"),
            route("dashboard", "routes/caregiver/caregiver-dashboard-redirect.jsx"),
            route("bookings", "routes/caregiver/caregiver-bookings.jsx"),
            route("bookings/:bookingId", "routes/caregiver/caregiver-booking-detail.jsx"),
            route("messages", "routes/caregiver/caregiver-messages.jsx"),
            route("messages/:conversationId", "routes/caregiver/caregiver-message-thread.jsx"),
            route("onboarding", "routes/caregiver/caregiver-onboarding.jsx"),
            route("onboarding/identity-verification", "routes/caregiver/caregiver-onboarding-identity-verification.jsx"),
            route("onboarding/right-to-work", "routes/caregiver/caregiver-onboarding-right-to-work.jsx"),
            route("onboarding/dbs-submission", "routes/caregiver/caregiver-onboarding-dbs-submission.jsx"),
            route("payout-setup", "routes/caregiver/caregiver-payout-setup.jsx"),
            route("earnings/setup", "routes/caregiver/caregiver-earnings-setup-alias.jsx"),
            route("profile", "routes/caregiver/caregiver-profile-edit.jsx"),
            route("profile/edit", "routes/caregiver/caregiver-profile-edit-alias.jsx"),
            route("verify/identity", "routes/caregiver/caregiver-verify-identity-alias.jsx"),
            route("verify/right-to-work", "routes/caregiver/caregiver-verify-right-to-work-alias.jsx"),
            route("verify/dbs", "routes/caregiver/caregiver-verify-dbs-alias.jsx"),
            route("profile/preview", "routes/caregiver/caregiver-profile-preview.jsx")
        ])
    ]),

    // Carereceiver
    ...prefix("carereceiver", [
        layout("routes/carereceiver/layout.jsx", [
            index("routes/carereceiver/carereceiver-dashboard.jsx"),
            route("dashboard", "routes/carereceiver/carereceiver-dashboard-redirect.jsx"),
            route("bookings", "routes/carereceiver/carereceiver-bookings.jsx"),
            route("booking", "routes/carereceiver/carereceiver-bookings-alias.jsx"),
            route("bookin", "routes/carereceiver/carereceiver-bookings-alias.jsx"),
            route("messages", "routes/carereceiver/carereceiver-messages.jsx"),
            route("messages/:conversationId", "routes/carereceiver/carereceiver-message-thread.jsx"),
            route("search", "routes/carereceiver/carereceiver-search.jsx"),
            route("favorites", "routes/carereceiver/carereceiver-favorites.jsx"),
            route("caregivers/:caregiverId", "routes/carereceiver/carereceiver-caregiver-profile.jsx"),
            route("settings", "routes/carereceiver/carereceiver-settings.jsx"),
            route("settings/payment", "routes/carereceiver/carereceiver-payment-methods.jsx"),
            route("settings/notifications", "routes/carereceiver/carereceiver-settings-notifications.jsx"),
            route("settings/security", "routes/carereceiver/carereceiver-settings-security.jsx"),
            route("bookings/:bookingId/review", "routes/carereceiver/carereceiver-leave-review.jsx")
        ])
    ])



    // ICare App routes
    // ...prefix("carerecipient", [
    //   layout("routes/app/carerecipient/layout.jsx", [
    //     index("routes/app/carerecipient/care-receiver-home.jsx"),
    //     route("c", "routes/app/carerecipient/carerecipient.jsx"),

    //     ...prefix("caregivers", [
    //       index("routes/app/carerecipient/caregivers.jsx"),
    //       route(":caregiverId", "routes/app/carerecipient/single-caregiver.jsx")
    //     ]),

    //     ...prefix("documents", [
    //       index("routes/app/carerecipient/documents.jsx")
    //     ]),

    //     ...prefix("care-requests", [
    //       index("routes/app/carerecipient/care-requests.jsx")
    //     ]),

    //     ...prefix("contacts", [
    //       route("home", "routes/app/carerecipient/contacts/home.jsx"),
    //       route(":contactId", "routes/app/carerecipient/contacts/messages.jsx")
    //     ]),

    //     ...prefix("profile", [
    //       layout("routes/app/carerecipient/profile/my-profile-layout.jsx", [
    //         route("personal-details", "routes/app/carerecipient/profile/personal-details.jsx")
    //       ])
    //     ])
    //   ])
    // ]),

    // ...prefix("caregiver", [
    //   layout("routes/app/caregiver/layout.jsx", [
    //     index("routes/app/caregiver/caregiver-home.jsx"),
    //     route("available-care-roles", "routes/app/caregiver/available-care-roles.jsx")
    //   ])
    // ]
    // )


    // ...prefix("carerecipient", [
    //   layout("routes/carerecipient/layout.jsx", [
    //     index("routes/carerecipient/carerecipient.jsx"),

    //     ...prefix("caregivers", [
    //       index("routes/carerecipient/caregivers.jsx"),
    //       route(":caregiverId", "routes/carerecipient/single-caregiver.jsx"),
    //       route(":caregiverId/resume", "routes/carerecipient/resume.jsx"),
    //       route(":caregiverId/messages", "routes/carerecipient/messages.jsx")
    //     ]),

    //     ...prefix("contacts", [
    //       layout("routes/carerecipient/contacts/contacts-layout.jsx", [
    //         route("home", "routes/carerecipient/contacts/home.jsx"),
    //         route("", "routes/carerecipient/_redirect-messages.jsx"), // catch base and redirect
    //         route(":contactId", "routes/carerecipient/contacts/messages.jsx"),
    //         route(":contactId/diary", "routes/carerecipient/contacts/diary.jsx")
    //       ])
    //     ]),
    //     ...prefix("profile", [
    //       layout("routes/carerecipient/profile/my-profile-layout.jsx", [
    //         route("", "routes/carerecipient/profile/_redirect-messages.jsx"),
    //         route("personal-details", "routes/carerecipient/profile/personal-details.jsx"),
    //         route("medical-information", "routes/carerecipient/profile/medical-information.jsx"),
    //         route("security-settings", "routes/carerecipient/profile/security-settings.jsx"),
    //         route("notification-settings", "routes/carerecipient/profile/notification-settings.jsx")
    //       ])
    //     ]),
    //     ...prefix("diary", [
    //       index("routes/carerecipient/diary/carerecipient-diary.jsx")
    //     ]),
    //     ...prefix("my-account", [
    //       index("routes/carerecipient/account/my-account.jsx")
    //     ])
    //   ])
    // ]
    // )
] satisfies RouteConfig;
