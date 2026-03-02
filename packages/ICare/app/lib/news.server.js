import { sanity } from "./sanity.server";

const NEWS_LIST_PAGED_QUERY = `
  *[_type == "newsPost" && defined(slug.current)]
  | order(isFeatured desc, publishedAt desc)[$offset...$end]{
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
| order(publishedAt desc)[0...5]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  heroImage
}
`;

const NEWS_BY_TAG_QUERY = `
  *[
    _type == "newsPost" &&
    defined(slug.current) &&
    $tag in tags
  ]
  | order(isFeatured desc, publishedAt desc)[0...50]{
    _id,
    title,
    subtitle,
    "slug": slug.current,
    publishedAt,
    excerpt,
    heroImage,
    tags
  }
`;

const TAGS_WITH_COUNTS_QUERY = `
{
  "tags": *[_type == "newsPost" && defined(tags)]{
    tags
  }
}
`;

const NEWS_COUNT_QUERY = `
  count(*[_type == "newsPost" && defined(slug.current)])
`;

const PINNED_INDEPENDENT_NEWS_QUERY = `
  *[
    _type == "newsPost" &&
    defined(slug.current) &&
    (
      title match "*Working as an independent*" ||
      title match "*working as an independent*"
    )
  ]
  | order(isFeatured desc, publishedAt desc)[0]{
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

export async function getNewsByTag(tag) {
  return sanity.fetch(NEWS_BY_TAG_QUERY, { tag });
}


export async function getNewsListPaged({ offset = 0, limit = 2 }) {
  const end = offset + limit;
  return sanity.fetch(NEWS_LIST_PAGED_QUERY, { offset, end });
}

export async function getNewsBySlug(slug) {
  return sanity.fetch(NEWS_BY_SLUG_QUERY, { slug });
}

export async function getRelatedNews({ id, tags }) {
  if (!tags?.length) { return []; }
  return sanity.fetch(RELATED_NEWS_QUERY, { id, tags });
}

export async function getTagCounts() {
  const res = await sanity.fetch(TAGS_WITH_COUNTS_QUERY);
  const counts = new Map();

  for (const doc of res.tags) {
    for (const t of doc.tags || []) {
      counts.set(t, (counts.get(t) || 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getNewsCount() {
  return sanity.fetch(NEWS_COUNT_QUERY);
}

export async function getPinnedIndependentNews() {
  return sanity.fetch(PINNED_INDEPENDENT_NEWS_QUERY);
}
