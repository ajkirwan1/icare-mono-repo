import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

console.log("ENV CHECK", {
  PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL,
  PUBLIC_API_URL: process.env.PUBLIC_API_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY ? "set" : "missing"
});

console.log("wqeqweqweqwe", {
  PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL,
  PUBLIC_API_URL: process.env.PUBLIC_API_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY ? "set" : "missing"
});
const PORT = 4001;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
