import imageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "./sanity.public";

const builder = imageUrlBuilder(sanityConfig);

export function urlFor(source) {
  return builder.image(source);
}
