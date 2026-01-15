import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";

if (!projectId || !dataset) {
  throw new Error("Missing SANITY_PROJECT_ID or SANITY_DATASET env vars");
}

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true // fast for published content
});
