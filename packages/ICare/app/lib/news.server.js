import { sanity } from "./sanity.server";

const NEWS_LIST_QUERY = `
  *[_type == "newsPost" && defined(slug.current)]
  | order(isFeatured desc, publishedAt desc)[0...20]{
    _id,
    title,
    subtitle,
    "slug": slug.current,
    publishedAt,
    excerpt,
    heroImage,
    tags,
    featuredQuote
  }
`;


const NEWS_BY_SLUG_QUERY = /* groq */ `
  *[_type == "newsPost" && slug.current == $slug][0]{
    _id,
    title,
    subtitle,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    excerpt,
    metaDescription,
    heroImage,
    tags,
    body
  }
`;

const RELATED_NEWS_QUERY = `
*[
  _type == "newsPost" &&
  _id != $id &&
  count(tags[@ in $tags]) > 0 &&
  defined(slug.current)
]
| order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  heroImage
}
`;


export async function getNewsList() {
  return sanity.fetch(NEWS_LIST_QUERY);
}

export async function getNewsBySlug(slug) {
  return sanity.fetch(NEWS_BY_SLUG_QUERY, { slug });
}

export async function getRelatedNews({ id, tags }) {
  if (!tags?.length) { return []; }
  return sanity.fetch(RELATED_NEWS_QUERY, { id, tags });
}
