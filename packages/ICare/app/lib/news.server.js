import { sanity } from "./sanity.server";

const NEWS_LIST_QUERY = /* groq */ `
  *[_type == "newsPost" && defined(slug.current)]
  | order(publishedAt desc)[0...20]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt
  }
`;

const NEWS_BY_SLUG_QUERY = /* groq */ `
  *[_type == "newsPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body
  }
`;

export async function getNewsList() {
  return sanity.fetch(NEWS_LIST_QUERY);
}

export async function getNewsBySlug(slug) {
  return sanity.fetch(NEWS_BY_SLUG_QUERY, { slug });
}
