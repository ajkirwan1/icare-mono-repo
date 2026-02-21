import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityConfig } from "./sanity.public";

const builder = createImageUrlBuilder(sanityConfig);

export function urlFor(source) {
  return builder.image(source);
}
