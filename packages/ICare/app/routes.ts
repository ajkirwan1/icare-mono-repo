import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [index("routes/home.jsx"),
route("how-it-works", "routes/how-it-works.jsx"),
route("who-we-are", "routes/who-we-are.jsx"),
route("icare-for-caregivers", "routes/icare-for-caregivers.jsx"),
route("icare-for-carereceivers", "routes/icare-for-carereceivers.jsx"),
route("privacy", "routes/privacy.jsx"),
route("caregiver", "routes/caregiver.jsx"),
route("carerecipient", "routes/carerecipient.jsx"),
route("register", "routes/register.jsx"),
layout("routes/caregiver/layout.jsx", [
  route("caregiver", "routes/caregiver/caregiver.jsx")

])
] satisfies RouteConfig;
