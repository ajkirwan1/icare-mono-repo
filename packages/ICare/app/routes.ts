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
      ...prefix("messages", [
        index("routes/carerecipient/messages-home.jsx")
        // route("carereceiverId", "routes/carerecipient/message-caregiver.jsx")
      ])
    ])
  ]
  )
] satisfies RouteConfig;
