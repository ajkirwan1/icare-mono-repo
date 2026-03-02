import { sanity } from "./sanity.server";
import imageUrlBuilder from "@sanity/image-url";

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

export async function getHomeFeaturedCarers() {
  const carers = await sanity.fetch(HOME_FEATURED_CARERS_QUERY);

  return carers.map((carer) => ({
    ...carer,
    photoUrl: carer.photo
      ? builder.image(carer.photo).width(600).height(600).fit("crop").url()
      : null,
  }));
}
