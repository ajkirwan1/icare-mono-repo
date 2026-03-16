import { sanity } from "./sanity.server";
import imageUrlBuilder from "@sanity/image-url";

const DEFAULT_HOME_FEATURED_PHOTO_BY_NAME = {
  beauty: "/images/Beauty.jpeg",
  eva: "/images/Eva.jpeg",
  faye: "/images/Faye.jpeg",
  karolina: "/images/Karolina.jpeg",
  lynn: "/images/Lynn1.jpeg",
  priscilla: "/images/Priscilla.jpeg",
  sandeep: "https://cdn.sanity.io/images/08fr3nyq/production/37e8dc7acc8bf6a0b0e2709bc243d534616689ed-1173x1564.jpg?fit=crop&h=900&rect=0%2C196%2C1173%2C1173&w=900",
  taslima: "/images/tasmina.jpeg"
};

const REQUIRED_HOME_FEATURED_CARERS = [
  {
    _id: "fallback-home-featured-karolina",
    name: "Karolina",
    location: "Across the UK",
    description:
      "Karolina is an experienced live-in caregiver with nearly 7 years of experience supporting older adults and people with complex conditions. She brings a calm, thoughtful presence and is especially well suited to companionship and day-to-day support.",
    photoUrl: "/images/Karolina.jpeg",
    photoAlt: "Karolina caregiver profile photo",
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
  const preferredOrder = ["karolina", "lynn", "eva"];

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
