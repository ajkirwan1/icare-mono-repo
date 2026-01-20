import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

import { pool } from "../db.js";

const roles = [
  {
    title: "Live-in Caregiver",
    description: "Provide full-time in-home care and companionship.",
    location: "Dublin",
    hourly_rate: 20
  },
  {
    title: "Elderly Day Care Assistant",
    description: "Assist seniors with daily activities during daytime hours.",
    location: "Cork",
    hourly_rate: 18
  },
  {
    title: "Post-Surgery Home Support",
    description: "Short-term recovery support after surgery.",
    location: "Galway",
    hourly_rate: 22
  },
  {
    title: "Night Care Assistant",
    description: "Overnight care and supervision.",
    location: "Limerick",
    hourly_rate: 21
  },
  {
    title: "Dementia Care Specialist",
    description: "Specialized care for individuals living with dementia or Alzheimer’s.",
    location: "Dublin",
    hourly_rate: 24
  },
  {
    title: "Home Care Assistant",
    description: "General in-home assistance with daily living activities.",
    location: "Cork",
    hourly_rate: 17
  },
  {
    title: "Respite Care Provider",
    description: "Short-term care to give family caregivers a break.",
    location: "Galway",
    hourly_rate: 19
  },
  {
    title: "Palliative Care Assistant",
    description: "Support for patients with serious or life-limiting illnesses.",
    location: "Limerick",
    hourly_rate: 25
  },
  {
    title: "Disability Support Worker",
    description: "Assist individuals with physical or intellectual disabilities.",
    location: "Waterford",
    hourly_rate: 21
  },
  {
    title: "Live-out Caregiver",
    description: "Daily scheduled care visits without overnight stays.",
    location: "Dublin",
    hourly_rate: 18
  },
  {
    title: "Stroke Recovery Support",
    description: "Rehabilitation-focused care following stroke recovery.",
    location: "Kilkenny",
    hourly_rate: 23
  },
  {
    title: "Mobility Assistance Aide",
    description: "Support with movement, transfers, and mobility aids.",
    location: "Dundalk",
    hourly_rate: 20
  },
  {
    title: "Companion Care Assistant",
    description: "Provide companionship, conversation, and light household help.",
    location: "Sligo",
    hourly_rate: 16
  },
  {
    title: "Medication Support Assistant",
    description: "Assist with medication reminders and adherence.",
    location: "Dublin",
    hourly_rate: 19
  },
  {
    title: "Parkinson’s Care Assistant",
    description: "Specialized support for people living with Parkinson’s disease.",
    location: "Cork",
    hourly_rate: 24
  },
  {
    title: "End-of-Life Caregiver",
    description: "Compassionate care during end-of-life stages.",
    location: "Galway",
    hourly_rate: 26
  },
  {
    title: "Post-Hospital Discharge Support",
    description: "Transitional care following hospital discharge.",
    location: "Limerick",
    hourly_rate: 22
  },
  {
    title: "Weekend Care Assistant",
    description: "Care support provided exclusively on weekends.",
    location: "Dublin",
    hourly_rate: 20
  },
  {
    title: "Overnight Care Supervisor",
    description: "Overnight supervision and emergency assistance.",
    location: "Wexford",
    hourly_rate: 23
  },
  {
    title: "Chronic Illness Support Worker",
    description: "Long-term support for individuals with chronic conditions.",
    location: "Athlone",
    hourly_rate: 21
  },
  {
    title: "Personal Care Assistant",
    description: "Hands-on personal care including hygiene and dressing.",
    location: "Cork",
    hourly_rate: 18
  },
  {
    title: "Rehabilitation Support Assistant",
    description: "Assist patients undergoing physical rehabilitation.",
    location: "Galway",
    hourly_rate: 22
  },
  {
    title: "Senior Companion (Part-Time)",
    description: "Part-time companionship and wellbeing support for seniors.",
    location: "Dublin",
    hourly_rate: 16
  },
  {
    title: "Home Support Worker (Evenings)",
    description: "Evening support with meals, routines, and personal care.",
    location: "Limerick",
    hourly_rate: 19
  }
];

async function seed() {
  try {
    console.log("🌱 Seeding care_giving_roles...");

    for (const role of roles) {
      await pool.query(
        `
        INSERT INTO care_giving_roles (title, description, location, hourly_rate)
        VALUES ($1, $2, $3, $4)
        `,
        [role.title, role.description, role.location, role.hourly_rate]
      );
    }

    console.log("✅ Seed complete");
  } catch (err) {
    console.error("❌ Seed failed:", err);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

seed();
