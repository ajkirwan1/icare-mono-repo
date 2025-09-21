import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.jsx"),
route("how-it-works", "routes/how-it-works.jsx"),
route("who-we-are", "routes/who-we-are.jsx"),
route("icare-for-caregivers", "routes/icare-for-caregivers.jsx"),
route("icare-for-carereceivers", "routes/icare-for-carereceivers.jsx"),
route("privacy", "routes/privacy.jsx"),
route("caregiver-receiver-home", "routes/caregiver-receiver-home.jsx"),
route("register", "routes/register.jsx")
] satisfies RouteConfig;
