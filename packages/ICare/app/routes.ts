import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("how-it-works", "routes/how-it-works.jsx"),
  route("who-we-are", "routes/website/who-we-are.jsx"),
  route("icare-for-caregivers", "routes/icare-for-caregivers.jsx"),
  route("icare-for-carereceivers", "routes/icare-for-carereceivers.jsx"),
  route("privacy", "routes/privacy.jsx"),
  route("carerecipient", "routes/carerecipient.jsx"),
  route("register", "routes/register.jsx"),
  route("login", "routes/login.jsx"),

  ...prefix("carerecipient", [
    layout("routes/carerecipient/layout.jsx", [
      index("routes/carerecipient/carerecipient.jsx"),

      ...prefix("caregivers", [
        index("routes/carerecipient/caregivers.jsx"),
        route(":caregiverId", "routes/carerecipient/single-caregiver.jsx"),
        route(":caregiverId/resume", "routes/carerecipient/resume.jsx"),
        route(":caregiverId/messages", "routes/carerecipient/messages.jsx")
      ]),

      ...prefix("contacts", [
        layout("routes/carerecipient/contacts/contacts-layout.jsx", [
          route("home", "routes/carerecipient/contacts/home.jsx"),
          route("", "routes/carerecipient/_redirect-messages.jsx"), // catch base and redirect
          route(":contactId", "routes/carerecipient/contacts/messages.jsx"),
          route(":contactId/diary", "routes/carerecipient/contacts/diary.jsx")
        ])
      ]),
      ...prefix("profile", [
        layout("routes/carerecipient/profile/my-profile-layout.jsx", [
          route("", "routes/carerecipient/profile/_redirect-messages.jsx"),
          route("personal-details", "routes/carerecipient/profile/personal-details.jsx"),
          route("medical-information", "routes/carerecipient/profile/medical-information.jsx"),
          route("security-settings", "routes/carerecipient/profile/security-settings.jsx"),
          route("notification-settings", "routes/carerecipient/profile/notification-settings.jsx")
        ])
      ]),
      ...prefix("diary", [
        index("routes/carerecipient/diary/carerecipient-diary.jsx")
      ]),
      ...prefix("my-account", [
        index("routes/carerecipient/account/my-account.jsx")
      ])
    ])
  ]
  )
] satisfies RouteConfig;
