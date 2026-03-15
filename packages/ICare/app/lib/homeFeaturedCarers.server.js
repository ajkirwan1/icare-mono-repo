import { sanity } from "./sanity.server";
import imageUrlBuilder from "@sanity/image-url";

const DEFAULT_HOME_FEATURED_PHOTO_BY_NAME = {
  beauty: "/images/Beauty.jpeg",
  eva: "/images/Eva.jpeg",
  faye: "/images/Faye.jpeg",
  lynn: "/images/Lynn1.jpeg",
  priscilla: "/images/Priscilla.jpeg",
  sandeep: "/images/Sandeep.jpeg",
  taslima: "/images/tasmina.jpeg"
};

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

export async function getHomeFeaturedCarers() {
  const carers = await sanity.fetch(HOME_FEATURED_CARERS_QUERY);

  return carers.map((carer) => ({
    ...carer,
    photoUrl: carer.photo
      ? builder.image(carer.photo).width(600).height(600).fit("crop").url()
      : getDefaultPhotoUrl(carer.name),
  }));
}
