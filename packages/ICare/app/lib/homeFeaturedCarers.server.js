import { sanity } from "./sanity.server";
import imageUrlBuilder from "@sanity/image-url";

const DEFAULT_HOME_FEATURED_PHOTO_BY_NAME = {
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

const REQUIRED_HOME_FEATURED_CARERS = [
  {
    _id: "fallback-home-featured-di",
    name: "Diana",
    location: "London & Essex (Loughton)",
    description:
      "Diana has over 14 years of experience in care, supporting people with a wide range of needs from companionship and daily support to more complex situations. She offers calm, highly capable support with personal care, daily routines, and a reassuring presence at home.",
    photoAlt: "Diana caregiver profile photo",
  },
  {
    _id: "fallback-home-featured-karolina",
    name: "Karolina",
    location: "Across the UK",
    description:
      "Karolina is an experienced live-in caregiver with nearly 7 years of experience supporting older adults and people with complex conditions. She brings a calm, thoughtful presence and is especially well suited to companionship and day-to-day support.",
    photoUrl: "/images/Karolina.jpeg",
    photoAlt: "Karolina caregiver profile photo",
  },
  {
    _id: "fallback-home-featured-kinga",
    name: "Kinga",
    location: "Across the UK",
    description:
      "Kinga has 7 years of experience as a live-in caregiver, supporting older people with daily routines, mobility, companionship, and memory-related needs. She works exclusively in live-in roles and is looking for longer placements, with previous experience in Salisbury and nearby areas.",
    photoUrl: "/images/Kinga.png",
    photoAlt: "Kinga caregiver profile photo",
  },
  {
    _id: "fallback-home-featured-aiza",
    name: "Aiza",
    location: "London",
    description:
      "Aiza has been working as a caregiver since 2009, with experience in care homes, private care, and both live-in and live-out roles. She has supported elderly individuals with mobility needs, wheelchair use, dementia, and Parkinson's, and is currently looking for visiting care work, ideally in the mornings through to early afternoon.",
    photoUrl: "/images/Aiza.jpeg",
    photoAlt: "Aiza caregiver profile photo",
  },
  {
    _id: "fallback-home-featured-renata",
    name: "Renata",
    location: "Berkshire (Reading area), London (North/West), open to other locations",
    description:
      "Renata is an experienced caregiver specialising in supporting older adults, including those living with dementia and Alzheimer's. She offers calm, respectful support with daily routines, personal care, companionship, and preparing healthy meals.",
    photoUrl: "/images/Renata.jpeg",
    photoAlt: "Renata caregiver profile photo",
    photoPosition: "center 70%",
  },
];

const builder = imageUrlBuilder({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
});

const HOME_FEATURED_CARERS_QUERY = `
  *[_type == "homeFeaturedCarer"]
  | order(sortOrder asc, _createdAt asc){
    _id,
    name,
    location,
    description,
    photo,
    "photoAlt": coalesce(photo.alt, name),
    whatsAppNumber,
    whatsAppMessage
  }
`;

function getDefaultPhotoUrl(name) {
  const normalizedName = String(name || "").trim().toLowerCase();
  return DEFAULT_HOME_FEATURED_PHOTO_BY_NAME[normalizedName] || null;
}

function prioritizeKarolina(carers) {
  const preferredOrder = ["karolina", "lynn", "kinga", "aiza", "eva", "renata", "diana", "sandeep"];

  return [...carers].sort((a, b) => {
    const aName = String(a?.name || "").trim().toLowerCase();
    const bName = String(b?.name || "").trim().toLowerCase();
    const aIndex = preferredOrder.indexOf(aName);
    const bIndex = preferredOrder.indexOf(bName);

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

export async function getHomeFeaturedCarers() {
  const carers = await sanity.fetch(HOME_FEATURED_CARERS_QUERY);
  const normalizedCarers = carers.map((carer) => ({
    ...carer,
    photoUrl: carer.photo
      ? builder.image(carer.photo).width(600).height(600).fit("crop").url()
      : getDefaultPhotoUrl(carer.name),
  }));
  const existingNames = new Set(
    normalizedCarers.map((carer) => String(carer?.name || "").trim().toLowerCase())
  );

  for (const fallbackCarer of REQUIRED_HOME_FEATURED_CARERS) {
    const normalizedName = String(fallbackCarer.name || "").trim().toLowerCase();
    if (!existingNames.has(normalizedName)) {
      normalizedCarers.push(fallbackCarer);
    }
  }

  return prioritizeKarolina(normalizedCarers);
}
