import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("how-it-works", "routes/website/how-it-works.jsx"),
  route("who-we-are", "routes/website/who-we-are.jsx"),
  route("icare-for-caregivers", "routes/website/icare-for-caregivers.jsx"),
  route("icare-for-carereceivers", "routes/website/icare-for-carereceivers.jsx"),
  route("privacy", "routes/website/privacy.jsx"),
  route("carerecipient", "routes/carerecipient.jsx"),
  route("safety-commitment", "routes/website/safety-commitment.jsx"),
  route("trust-and-safety", "routes/website/trust-and-safety.jsx"),
  route("contact-us", "routes/website/contact-us.jsx"),
  route("frequently-asked-questions", "routes/website/faqs.jsx"),

  // News and articles
  route("care-guidance", "routes/website/news-and-articles/news-and-articles.jsx"),
  route("care-guidance/:slug", "routes/website/news-and-articles/news-item.jsx"),
  route("care-guidance/tags/:tag", "routes/website/news-and-articles/news-tag.jsx"),
  route("newsletter/confirmed", "routes/website/news-and-articles/newsletter-confirmed.jsx"),
  route("newsletter/invalid", "routes/website/news-and-articles/newsletter-invalid.jsx"),
  route("newsletter/unsubscribed", "routes/website/news-and-articles/newsletter-unsubscribed.jsx"),
  route("newsletter/resend", "routes/website/news-and-articles/newsletter-resend.jsx"),

  // Not found
  route("*", "routes/not-found.jsx"),


  // Auth
  // route("login", "routes/auth/login.jsx"),

  // SEC
  route("sitemap.xml", "routes/sitemap[.]xml.jsx"),

  // Action routes
  route("register-interest", "routes/website/register-interest.jsx"),
  route("newsletter/subscribe", "routes/website/actions/newsletter.subscribe.jsx"),
  route("newsletter/resend-action", "routes/website/actions/newsletter.resend.jsx"),
  route("waitinglist", "routes/website/actions/waitinglist.jsx"),
  route("contact", "routes/website/actions/contact.jsx")


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
