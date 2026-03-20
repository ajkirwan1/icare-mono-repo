import imageUrlBuilder from "@sanity/image-url";

const DEFAULT_CAREGIVER_PHOTO_BY_NAME = {
  aiza: "/images/Aiza.jpeg",
  beauty: "/images/Beauty.jpeg",
  diana: "/images/Di.jpeg",
  di: "/images/Di.jpeg",
  eva: "/images/Eva.jpeg",
  faye: "/images/Faye.jpeg",
  karolina: "/images/Karolina.jpeg",
  kinga: "/images/Kinga.png",
  lynn: "/images/Lynn1.jpeg",
  priscilla: "/images/Priscilla.jpeg",
  renata: "/images/Renata.jpeg",
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
    _id: "fallback-di",
    name: "Diana",
    slug: "di",
    photoPosition: "center 30%",
    photoAlt: "Diana caregiver profile photo",
    location: "London & Essex (Loughton)",
    shortBio: "Senior carer with 14+ years of experience supporting companionship, personal care, complex needs, and long day or night shifts.",
    fullBio:
      "Diana has over 14 years of experience in care, supporting people with a wide range of needs, from companionship and daily support to more complex situations. She began her career working with individuals living with dementia, Alzheimer's and end-of-life care, and over time developed strong experience supporting people with more advanced conditions. Diana is calm, highly capable, and brings a reassuring presence into the home. She supports with personal care, daily routines, and creating a safe, comfortable environment where clients feel respected and understood. In recent years, she has also worked as a senior carer, supporting and guiding other caregivers and helping maintain high standards of care. She is someone families can truly rely on, not only for her experience, but for her warmth and professionalism.",
    experienceYears: 14,
    careTypes: ["Companionship", "Personal care", "Dementia support", "Alzheimer's support", "End-of-life care"],
    availability: "Hourly, including long day and night shifts",
    workType: "Hourly care",
    languages: ["English", "Lithuanian", "Russian", "Polish"],
    hasDrivingLicence: true,
    hasCar: true,
    dbsStatus: "DBS checked",
    referencesAvailable: true,
    areasCovered: ["London", "Essex", "Loughton"]
  },
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
    dbsStatus: "DBS checked",
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
    _id: "fallback-kinga",
    name: "Kinga",
    slug: "kinga",
    photoUrl: "/images/Kinga.png",
    photoAlt: "Kinga caregiver profile photo",
    location: "Across the UK",
    shortBio: "Live-in caregiver with 7 years of experience supporting older people with daily routines, mobility, companionship, and memory-related needs.",
    fullBio:
      "Kinga has 7 years of experience working as a live-in caregiver, mainly supporting older people in their own homes. She has experience caring for individuals who need support with daily life, mobility, and companionship, including those living with memory difficulties. Kinga focuses on creating a calm, respectful, and comfortable environment where people feel safe and well looked after. She works exclusively in live-in roles. As she is based in Poland, she usually works in the UK in longer placements of around 2 to 3 months at a time, returning home between assignments. She is mainly looking for placements in the south of England, from London downwards on both the east and west sides, with previous experience working in Salisbury and surrounding areas. Kinga is comfortable in homes with pets, including cats and dogs, and is known for her calm, reliable nature and for building trusting, supportive relationships with the people she cares for.",
    experienceYears: 7,
    careTypes: ["Live-in care", "Companionship", "Mobility support", "Dementia support"],
    availability: "Available for longer live-in placements of around 2 to 3 months",
    workType: "Live-in care",
    languages: ["English", "Polish"],
    hasDrivingLicence: true,
    hasCar: false,
    dbsStatus: "DBS checked",
    referencesAvailable: true,
    areasCovered: ["South of England", "London", "Salisbury", "Surrounding areas"]
  },
  {
    _id: "fallback-aiza",
    name: "Aiza",
    slug: "aiza",
    photoUrl: "/images/Aiza.jpeg",
    photoAlt: "Aiza caregiver profile photo",
    photoPosition: "center 62%",
    location: "London",
    shortBio: "Experienced caregiver since 2009, offering visiting care, companionship, and calm day-to-day support at home.",
    fullBio:
      "Aiza has been working as a caregiver since 2009, with experience in care homes, private care, and both live-in and live-out roles. She has supported elderly individuals with a range of needs, including mobility support, wheelchair use, dementia, and Parkinson's. Aiza also provides companionship, focusing on creating a calm, respectful, and supportive environment. She is currently looking for visiting care work, ideally in the mornings through to early afternoon, and is dedicated to helping people feel safe, comfortable, and treated with dignity in their own home.",
    experienceYears: 17,
    careTypes: ["Visiting care", "Companionship", "Dementia support", "Parkinson's support", "Mobility support"],
    availability: "Available for visiting care, ideally mornings to early afternoon",
    workType: "Visiting care / Companionship",
    languages: ["English"],
    hasDrivingLicence: false,
    hasCar: false,
    dbsStatus: "Enhanced DBS checked",
    referencesAvailable: true,
    areasCovered: []
  },
  {
    _id: "fallback-renata",
    name: "Renata",
    slug: "renata",
    photoUrl: "/images/Renata.jpeg",
    photoAlt: "Renata caregiver profile photo",
    photoPosition: "center 70%",
    location: "Berkshire (Reading area), London (North/West), open to other locations",
    shortBio: "Experienced caregiver offering calm, respectful support with routines, personal care, companionship, and healthy meals.",
    fullBio:
      "Renata is an experienced caregiver specialising in supporting older adults, including those living with dementia and Alzheimer's. She offers calm, respectful support with daily routines, personal care, companionship, and preparing healthy meals. Renata focuses on creating a safe, comfortable environment where clients feel understood and at ease. She is reliable, warm, and attentive, and brings the kind of steady presence families can genuinely trust.",
    experienceYears: null,
    careTypes: ["Companionship", "Personal care", "Dementia support", "Alzheimer's support", "Meal preparation"],
    availability: "Please ask about availability",
    workType: "Companionship / Personal care",
    languages: ["English"],
    hasDrivingLicence: null,
    hasCar: null,
    dbsStatus: "DBS checked",
    referencesAvailable: true,
    areasCovered: ["Berkshire", "Reading area", "North London", "West London", "Open to other locations"]
  },
  {
    _id: "fallback-faye",
    name: "Faye",
    slug: "faye",
    isHidden: true,
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
    languages: ["English"],
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
    hasDrivingLicence: true,
    hasCar: false,
    dbsStatus: "Enhanced DBS checked",
    referencesAvailable: true,
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
    hasDrivingLicence: true,
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
    hasDrivingLicence: true,
    hasCar: false,
    dbsStatus: "DBS checked",
    referencesAvailable: true,
    areasCovered: ["Reading", "Berkshire", "Nearby areas"]
  },
  {
    _id: "fallback-karolina",
    name: "Karolina",
    slug: "karolina",
    photoUrl: "/images/Karolina.jpeg",
    photoAlt: "Karolina caregiver profile photo",
    photoPosition: "center 68%",
    location: "Across the UK",
    shortBio: "Experienced live-in caregiver offering calm companionship and supportive help at home.",
    fullBio:
      "Karolina is an experienced live-in caregiver with nearly 7 years of experience supporting older adults and people with complex conditions. She has worked with clients living with dementia, Parkinson's disease, MND, as well as providing companionship and everyday support at home. Karolina particularly enjoys live-in roles in quieter, rural locations, where she can focus on providing calm, attentive care. She is known for her warm and thoughtful approach and naturally builds trusting relationships with the people she supports. She is also very comfortable around pets and often helps care for them as part of the household routine, something many families greatly appreciate.",
    experienceYears: 7,
    careTypes: ["Live-in care", "Companionship", "Dementia support", "Parkinson's support"],
    availability: "Available for live-in placements",
    workType: "Live-in care / Companionship",
    languages: ["English"],
    hasDrivingLicence: true,
    hasCar: false,
    dbsStatus: "DBS checked",
    referencesAvailable: true,
    areasCovered: ["Across the UK", "Rural and countryside locations"]
  }
];

const REQUIRED_CAREGIVER_FALLBACKS = FALLBACK_CAREGIVERS.filter(
  (caregiver) => ["renata", "di"].includes(String(caregiver?.slug || "").trim().toLowerCase())
);

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

function prioritizeKarolina(caregivers) {
  const preferredOrder = ["karolina", "lynn", "kinga", "eva", "aiza"];

  return [...caregivers].sort((a, b) => {
    const aSlug = String(a?.slug || "").trim().toLowerCase();
    const bSlug = String(b?.slug || "").trim().toLowerCase();
    const aIndex = preferredOrder.indexOf(aSlug);
    const bIndex = preferredOrder.indexOf(bSlug);

    if (aIndex === -1 && bIndex === -1) {
      return 0;
    }

    if (aIndex === -1) {
      return 1;
    }

    if (bIndex === -1) {
      return -1;
    }

    return aIndex - bIndex;
  });
}

function mergeRequiredFallbackCaregivers(caregivers) {
  if (!Array.isArray(caregivers)) {
    return [];
  }

  const mergedCaregivers = [...caregivers];
  const existingSlugs = new Set(
    mergedCaregivers.map((caregiver) => String(caregiver?.slug || "").trim().toLowerCase())
  );

  for (const fallbackCaregiver of REQUIRED_CAREGIVER_FALLBACKS) {
    const normalizedSlug = String(fallbackCaregiver?.slug || "").trim().toLowerCase();

    if (!existingSlugs.has(normalizedSlug)) {
      mergedCaregivers.push(fallbackCaregiver);
      existingSlugs.add(normalizedSlug);
    }
  }

  return mergedCaregivers;
}

function normalizeCaregiver(caregiver, index, builder) {
  const name = String(caregiver?.name || `Caregiver ${index + 1}`).trim();
  const slug = normalizeSlug(caregiver?.slug, name, index);
  const shortBio = toPlainText(caregiver?.shortBio);
  const fullBio = toPlainText(caregiver?.fullBio) || shortBio;
  const careTypes = normalizeList(caregiver?.careTypes);
  const languages = normalizeList(caregiver?.languages);
  const areasCovered = normalizeList(caregiver?.areasCovered);
  const isKarolina = slug === "karolina";

  return {
    _id: caregiver?._id || `caregiver-${slug}`,
    name,
    slug,
    isHidden: Boolean(caregiver?.isHidden),
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
    hasDrivingLicence: isKarolina ? true : Boolean(caregiver?.hasDrivingLicence),
    hasCar: Boolean(caregiver?.hasCar),
    dbsStatus: String(caregiver?.dbsStatus || "Status available on request").trim(),
    referencesAvailable: isKarolina ? true : Boolean(caregiver?.referencesAvailable),
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

export async function getCaregivers({ includeHidden = false } = {}) {
  const sanity = await getSanityClient();
  const builder = getBuilder();
  const filterHidden = (caregiver) => includeHidden || !caregiver?.isHidden;

  if (!sanity) {
    return prioritizeKarolina(FALLBACK_CAREGIVERS
      .map((caregiver, index) => normalizeCaregiver(caregiver, index, builder))
      .filter(filterHidden));
  }

  try {
    const caregivers = await sanity.fetch(SANITY_CAREGIVERS_QUERY);
    const caregiversWithRequiredFallbacks = mergeRequiredFallbackCaregivers(caregivers);

    if (!Array.isArray(caregivers) || caregivers.length === 0) {
      return prioritizeKarolina(FALLBACK_CAREGIVERS
        .map((caregiver, index) => normalizeCaregiver(caregiver, index, builder))
        .filter(filterHidden));
    }

    return prioritizeKarolina(caregiversWithRequiredFallbacks
      .map((caregiver, index) => normalizeCaregiver(caregiver, index, builder))
      .filter(filterHidden));
  } catch (error) {
    console.error("Failed to fetch caregivers from Sanity:", error);
    return prioritizeKarolina(FALLBACK_CAREGIVERS
      .map((caregiver, index) => normalizeCaregiver(caregiver, index, builder))
      .filter(filterHidden));
  }
}

export async function getCaregiverBySlug(slug) {
  const caregivers = await getCaregivers({ includeHidden: true });
  return caregivers.find((caregiver) => caregiver.slug === slug) || null;
}
