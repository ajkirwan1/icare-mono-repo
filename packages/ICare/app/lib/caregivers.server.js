import imageUrlBuilder from "@sanity/image-url";

const DEFAULT_CAREGIVER_PHOTO_BY_NAME = {
  beauty: "/images/Beauty.jpeg",
  eva: "/images/Eva.jpeg",
  faye: "/images/Faye.jpeg",
  lynn: "/images/Lynn1.jpeg",
  priscilla: "/images/Priscilla.jpeg",
  sandeep: "/images/Sandeep.jpeg",
  taslima: "/images/tasmina.jpeg"
};

const SANITY_CAREGIVERS_QUERY = `
  *[_type == "caregiverProfile" && defined(slug.current)]
  | order(name asc){
    _id,
    name,
    "slug": slug.current,
    photo,
    location,
    shortBio,
    fullBio,
    experienceYears,
    careTypes,
    availability,
    workType,
    languages,
    hasDrivingLicence,
    hasCar,
    dbsStatus,
    referencesAvailable,
    areasCovered
  }
`;

const FALLBACK_CAREGIVERS = [
  {
    _id: "fallback-lynn",
    name: "Lynn",
    slug: "lynn",
    photoUrl: "/images/Lynn1.jpeg",
    photoAlt: "Lynn smiling in her caregiver profile photo",
    location: "Across the UK",
    shortBio: "Calm, experienced support focused on companionship, routines, and helping people feel settled at home.",
    fullBio:
      "Lynn has nearly 20 years of experience supporting older adults in their own homes. She brings a calm, steady presence and takes time to understand routines, preferences, and the small details that help someone feel comfortable. Families value her for her patience, reliability, and clear communication. Throughout her career she has received exceptional feedback and references from families she has supported, reflecting the trust and reassurance she brings to everyday care.",
    experienceYears: 19,
    careTypes: ["Companionship", "Dementia support", "Live-in care"],
    availability: "Available from April 2026",
    workType: "Live-in / Companionship",
    languages: ["English"],
    hasDrivingLicence: true,
    hasCar: false,
    dbsStatus: "Enhanced DBS checked",
    referencesAvailable: true,
    areasCovered: ["Across the UK"]
  },
  {
    _id: "fallback-eva",
    name: "Eva",
    slug: "eva",
    photoUrl: "/images/Eva.jpeg",
    photoAlt: "Eva caregiver profile photo",
    location: "London and surrounding areas",
    shortBio: "Compassionate companionship support with a patient, empathetic approach and around five years of experience.",
    fullBio:
      "Eva is a compassionate companion with around five years of experience supporting older adults. Originally from Slovakia, she has been living in the UK for over 12 years. Eva describes herself as empathetic and patient, with a natural willingness to help seniors feel comfortable and supported in everyday life. She enjoys spending time with older people, offering companionship, conversation and help with daily routines. Eva also holds a driving licence, which can be helpful for local errands or outings.",
    experienceYears: 5,
    careTypes: ["Companionship", "Hourly care"],
    availability: "Please ask about availability",
    workType: "Companionship / Hourly",
    languages: ["English", "Slovak"],
    hasDrivingLicence: true,
    hasCar: false,
    dbsStatus: "Enhanced DBS checked",
    referencesAvailable: true,
    areasCovered: ["London", "Surrounding areas"]
  },
  {
    _id: "fallback-faye",
    name: "Faye",
    slug: "faye",
    photoUrl: "/images/Faye.jpeg",
    photoAlt: "Faye caregiver profile portrait",
    location: "West Yorkshire",
    shortBio: "Warm and practical care with a strong background in daily support, companionship, and building trust.",
    fullBio:
      "Faye has over 16 years of experience supporting people in their daily lives and helping them feel safe, respected, and at ease at home. Her background includes nursing and health and social care training, and her approach is person-led, kind, and dependable. She enjoys creating a reassuring atmosphere where people feel heard and supported.",
    experienceYears: 16,
    careTypes: ["Hourly care", "Companionship", "Mobility support"],
    availability: "Open to new hourly placements",
    workType: "Hourly / Companionship",
    languages: ["English"],
    hasDrivingLicence: true,
    hasCar: false,
    dbsStatus: "DBS checked",
    referencesAvailable: true,
    areasCovered: ["West Yorkshire"]
  },
  {
    _id: "fallback-priscilla",
    name: "Priscilla",
    slug: "priscilla",
    photoUrl: "/images/Priscilla.jpeg",
    photoAlt: "Priscilla caregiver profile portrait",
    photoPosition: "center 22%",
    location: "Midlands and Yorkshire",
    shortBio: "Reliable live-in and companionship support with thoughtful dementia care experience.",
    fullBio:
      "Priscilla is known for her calm, practical style and her ability to settle into a home with sensitivity and respect. She has experience supporting individuals living with dementia and values routines, dignity, and meaningful connection. Her work combines reassurance, companionship, and hands-on everyday support.",
    experienceYears: 9,
    careTypes: ["Live-in care", "Companionship", "Dementia support"],
    availability: "Available for live-in placements",
    workType: "Live-in",
    languages: ["English", "Yoruba"],
    hasDrivingLicence: true,
    hasCar: true,
    dbsStatus: "Enhanced DBS checked",
    referencesAvailable: true,
    areasCovered: ["Birmingham", "Coventry", "Sheffield"]
  },
  {
    _id: "fallback-sandeep",
    name: "Sandeep",
    slug: "sandeep",
    photoUrl: "/images/Sandeep.jpeg",
    photoAlt: "Sandeep caregiver profile photo",
    location: "Across the UK",
    shortBio: "Compassionate companionship support focused on helping older adults feel comfortable, respected, and settled at home.",
    fullBio:
      "Sandeep offers calm, respectful companionship support for older adults who value consistency, kindness, and a steady presence. She focuses on helping people feel comfortable at home, supporting day-to-day routines, conversation, and reassurance in a way that respects personal preferences and independence.",
    experienceYears: null,
    careTypes: ["Companionship", "Hourly care"],
    availability: "Please ask about availability",
    workType: "Companionship / Hourly",
    languages: ["English"],
    hasDrivingLicence: false,
    hasCar: false,
    dbsStatus: "Enhanced DBS checked",
    referencesAvailable: false,
    areasCovered: ["Across the UK"]
  },
  {
    _id: "fallback-taslima",
    name: "Taslima",
    slug: "taslima",
    photoUrl: "/images/tasmina.jpeg",
    photoAlt: "Taslima caregiver profile portrait",
    location: "London",
    shortBio: "Compassionate support for people needing reassurance, meaningful conversation, and gentle daily help.",
    fullBio:
      "Taslima offers calm, respectful companionship and comfort-focused support for people who benefit from reassurance and a patient, familiar presence. She has experience supporting individuals living with memory loss and brings a thoughtful, person-centred approach to communication, routines, and wellbeing.",
    experienceYears: 7,
    careTypes: ["Companionship", "Hourly care", "Disability support"],
    availability: "Weekday and weekend availability",
    workType: "Hourly / Companionship",
    languages: ["English", "Bengali"],
    hasDrivingLicence: false,
    hasCar: false,
    dbsStatus: "DBS checked",
    referencesAvailable: true,
    areasCovered: ["North London", "East London", "Essex border"]
  },
  {
    _id: "fallback-beauty",
    name: "Beauty",
    slug: "beauty",
    photoUrl: "/images/Beauty.jpeg",
    photoAlt: "Beauty caregiver profile photo",
    location: "Reading / Berkshire, UK",
    shortBio: "Experienced live-in caregiver offering compassionate support for dementia, mobility, disability, and palliative care needs.",
    fullBio:
      "Beauty is an experienced caregiver currently available for live-in care placements. She has experience supporting clients with dementia, mobility limitations, disabilities and palliative care needs. She is known for her patient and compassionate approach, providing both practical support and companionship.",
    experienceYears: null,
    careTypes: ["Live-in care", "Dementia support", "Mobility support", "Disability support", "Palliative care"],
    availability: "Available for live-in care placements",
    workType: "Live-in care",
    languages: ["English"],
    hasDrivingLicence: false,
    hasCar: false,
    dbsStatus: "DBS checked",
    referencesAvailable: true,
    areasCovered: ["Reading", "Berkshire", "Nearby areas"]
  }
];

function toPlainText(value) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (!Array.isArray(value)) {
    return "";
  }

  return value
    .flatMap((block) => {
      if (!Array.isArray(block?.children)) {
        return [];
      }

      return block.children.map((child) => child?.text || "");
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeSlug(value, fallbackName, index = 0) {
  const source = value || fallbackName || `caregiver-${index + 1}`;

  return String(source)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getDefaultPhotoUrl(name) {
  const normalizedName = String(name || "").trim().toLowerCase();
  return DEFAULT_CAREGIVER_PHOTO_BY_NAME[normalizedName] || "/images/avatars/female.webp";
}

function normalizeCaregiver(caregiver, index, builder) {
  const name = String(caregiver?.name || `Caregiver ${index + 1}`).trim();
  const slug = normalizeSlug(caregiver?.slug, name, index);
  const shortBio = toPlainText(caregiver?.shortBio);
  const fullBio = toPlainText(caregiver?.fullBio) || shortBio;
  const careTypes = normalizeList(caregiver?.careTypes);
  const languages = normalizeList(caregiver?.languages);
  const areasCovered = normalizeList(caregiver?.areasCovered);

  return {
    _id: caregiver?._id || `caregiver-${slug}`,
    name,
    slug,
    photo: caregiver?.photo || null,
    photoUrl:
      caregiver?.photoUrl ||
      (caregiver?.photo && builder
        ? builder.image(caregiver.photo).width(900).height(900).fit("crop").url()
        : getDefaultPhotoUrl(name)),
    photoAlt: caregiver?.photoAlt || `${name} caregiver profile photo`,
    photoPosition: caregiver?.photoPosition || "center center",
    location: String(caregiver?.location || "").trim(),
    shortBio,
    fullBio,
    experienceYears:
      typeof caregiver?.experienceYears === "number"
        ? caregiver.experienceYears
        : Number.parseInt(caregiver?.experienceYears, 10) || null,
    careTypes,
    availability: String(caregiver?.availability || "Please ask about availability").trim(),
    workType:
      String(caregiver?.workType || careTypes.slice(0, 2).join(" / ") || "Companionship").trim(),
    languages,
    hasDrivingLicence: Boolean(caregiver?.hasDrivingLicence),
    hasCar: Boolean(caregiver?.hasCar),
    dbsStatus: String(caregiver?.dbsStatus || "Status available on request").trim(),
    referencesAvailable: Boolean(caregiver?.referencesAvailable),
    areasCovered
  };
}

async function getSanityClient() {
  try {
    const { sanity } = await import("./sanity.server");
    return sanity;
  } catch (error) {
    console.warn("Caregivers loader falling back to local data:", error);
    return null;
  }
}

function getBuilder() {
  if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_DATASET) {
    return null;
  }

  return imageUrlBuilder({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET
  });
}

export async function getCaregivers() {
  const sanity = await getSanityClient();
  const builder = getBuilder();

  if (!sanity) {
    return FALLBACK_CAREGIVERS.map((caregiver, index) => normalizeCaregiver(caregiver, index, builder));
  }

  try {
    const caregivers = await sanity.fetch(SANITY_CAREGIVERS_QUERY);

    if (!Array.isArray(caregivers) || caregivers.length === 0) {
      return FALLBACK_CAREGIVERS.map((caregiver, index) => normalizeCaregiver(caregiver, index, builder));
    }

    return caregivers.map((caregiver, index) => normalizeCaregiver(caregiver, index, builder));
  } catch (error) {
    console.error("Failed to fetch caregivers from Sanity:", error);
    return FALLBACK_CAREGIVERS.map((caregiver, index) => normalizeCaregiver(caregiver, index, builder));
  }
}

export async function getCaregiverBySlug(slug) {
  const caregivers = await getCaregivers();
  return caregivers.find((caregiver) => caregiver.slug === slug) || null;
}
