import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("how-it-works", "routes/how-it-works.jsx"),
  route("who-we-are", "routes/who-we-are.jsx"),
  route("icare-for-caregivers", "routes/icare-for-caregivers.jsx"),
  route("icare-for-carereceivers", "routes/icare-for-carereceivers.jsx"),
  route("privacy", "routes/privacy.jsx"),
  route("carerecipient", "routes/carerecipient.jsx"),
  route("register", "routes/register.jsx"),

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
      ...prefix("my-profile", [
        index("routes/carerecipient/profile/my-profile.jsx")
      ]),
      ...prefix("diary", [
        index("routes/carerecipient/diary/carerecipient-diary.jsx")
      ])
    ])
  ]
  )
] satisfies RouteConfig;
